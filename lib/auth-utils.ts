import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { db } from '@/lib/db';

export async function getCurrentUser() {
  const session = await auth();
  if (!session?.user?.id) {
    return null;
  }
  try {
    return await db.user.findUnique({
      where: { id: session.user.id },
    });
  } catch {
    // Database not available, return minimal user from session
    return {
      id: session.user.id,
      name: session.user.name || null,
      email: session.user.email || '',
      image: session.user.image || null,
      role: (session.user.role as 'USER' | 'ADMIN') || 'USER',
      password: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }
}

export async function requireUser() {
  const session = await auth();
  if (!session?.user) {
    redirect('/login');
  }

  try {
    const user = await db.user.findUnique({
      where: { id: session.user.id },
    });
    if (user) return user;
  } catch {
    // Database not available
  }

  // Return minimal user from session
  return {
    id: session.user.id || '',
    name: session.user.name || null,
    email: session.user.email || '',
    image: session.user.image || null,
    role: (session.user.role as 'USER' | 'ADMIN') || 'USER',
    password: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}

export async function requireAdmin() {
  const user = await requireUser();
  if (user.role !== 'ADMIN') {
    redirect('/unauthorized');
  }
  return user;
}
