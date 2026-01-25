import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export const proxy = withAuth(
  function proxy(req) {
    const token = req.nextauth.token;

    // Check role-based access
    if (req.nextUrl.pathname.startsWith('/player')) {
      if (token?.role !== 'PLAYER') {
        return NextResponse.redirect(new URL('/auth/login', req.url));
      }
    }

    if (req.nextUrl.pathname.startsWith('/admin')) {
      if (token?.role !== 'ADMIN') {
        return NextResponse.redirect(new URL('/auth/login', req.url));
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: ['/player/:path*', '/admin/:path*'],
};
