import { NextResponse } from 'next/server';

const COOKIE_NAME = 'admin_session';

export async function POST() {
  try {
    const res = NextResponse.json({ success: true });

    // Ștergem cookie-ul pe response (cel mai sigur în serverless)
    res.cookies.set(COOKIE_NAME, '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 0,
      path: '/',
    });

    return res;
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json({ error: 'Logout failed' }, { status: 500 });
  }
}
