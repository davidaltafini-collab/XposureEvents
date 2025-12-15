import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'your-secret-key-change-in-production-minimum-32-chars'
);

export async function middleware(request: NextRequest) {
  // Protejăm rutele de admin
  if (request.nextUrl.pathname.startsWith('/admin')) {
    
    // 1. Permitem accesul liber la pagina de login
    if (request.nextUrl.pathname === '/admin/login') {
      return NextResponse.next();
    }
    
    // 2. Verificăm cookie-ul de sesiune
    const sessionCookie = request.cookies.get('admin_session');
    
    if (!sessionCookie?.value) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
    
    // 3. Verificăm JWT-ul
    try {
      await jwtVerify(sessionCookie.value, JWT_SECRET);
      // JWT valid - permitem accesul
      return NextResponse.next();
    } catch (error) {
      // JWT invalid sau expirat - redirectăm la login
      console.error('Invalid or expired JWT:', error);
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
};