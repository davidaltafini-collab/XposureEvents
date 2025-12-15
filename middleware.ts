import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const COOKIE_NAME = 'admin_session';

const JWT_SECRET_RAW =
  process.env.JWT_SECRET || ''; // IMPORTANT: fără fallback în middleware

const JWT_SECRET = new TextEncoder().encode(JWT_SECRET_RAW);

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Matcher-ul deja filtrează /admin/:path*, dar păstrăm logica clară
  if (!pathname.startsWith('/admin')) {
    return NextResponse.next();
  }

  // 1) Permitem acces la login (și eventual subrute)
  if (pathname === '/admin/login' || pathname.startsWith('/admin/login/')) {
    return NextResponse.next();
  }

  // 2) Dacă nu ai setat JWT_SECRET în env (mai ales pe Vercel), blocăm admin complet
  // (altfel riști să validezi cu un secret fallback și să creezi breșe)
  if (!JWT_SECRET_RAW || JWT_SECRET_RAW.length < 32) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  // 3) Verificăm cookie-ul
  const sessionCookie = request.cookies.get(COOKIE_NAME);
  if (!sessionCookie?.value) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  // 4) Verificăm JWT-ul (valid + ne-expirat)
  try {
    await jwtVerify(sessionCookie.value, JWT_SECRET);
    return NextResponse.next();
  } catch {
    // JWT invalid/expirat => redirect
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }
}

export const config = {
  matcher: ['/admin/:path*'],
};
