import { auth } from '@/lib/auth';
import { NextResponse } from 'next/server';

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const isLoggedIn = !!req.auth;

  // Protected routes
  if (pathname.startsWith('/app')) {
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL('/login', req.nextUrl));
    }
  }

  // Redirect logged-in users away from login
  if (pathname === '/login' || pathname === '/register') {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL('/app/dashboard', req.nextUrl));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/app/:path*', '/login', '/register'],
};
