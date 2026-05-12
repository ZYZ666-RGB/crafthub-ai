import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import GitHub from 'next-auth/providers/github';
import bcrypt from 'bcryptjs';
import { db } from '@/lib/db';

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: { strategy: 'jwt' },
  pages: {
    signIn: '/login',
  },
  providers: [
    ...(process.env.GITHUB_ID && process.env.GITHUB_ID !== 'placeholder'
      ? [
          GitHub({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET!,
          }),
        ]
      : []),
    Credentials({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          const user = await db.user.findUnique({
            where: { email: credentials.email as string },
          });

          if (!user || !user.password) {
            return null;
          }

          const isValid = await bcrypt.compare(
            credentials.password as string,
            user.password
          );

          if (!isValid) {
            return null;
          }

          return {
            id: user.id,
            name: user.name,
            email: user.email,
            image: user.image,
          };
        } catch {
          // Database not available - return null
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        try {
          const dbUser = await db.user.findUnique({
            where: { email: token.email! },
            select: { id: true, role: true },
          });
          if (dbUser) {
            token.id = dbUser.id;
            token.role = dbUser.role;
          }
        } catch {
          // Database not available
          token.id = user.id || '';
          token.role = 'USER';
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = (token.role as string) || 'USER';
      }
      return session;
    },
  },
});
