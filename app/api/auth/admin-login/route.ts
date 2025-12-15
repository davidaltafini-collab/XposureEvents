import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyAdminCredentials, createAdminToken } from '@/lib/auth';

// ========== RATE LIMITING ==========
interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const rateLimitMap = new Map<string, RateLimitEntry>();
const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000; // 15 minute

function getRateLimitKey(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const ip =
    (forwarded ? forwarded.split(',')[0].trim() : null) ||
    request.headers.get('x-real-ip') ||
    'unknown';
  return `login:${ip}`;
}

function checkRateLimit(key: string): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const entry = rateLimitMap.get(key);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return { allowed: true, remaining: MAX_ATTEMPTS - 1 };
  }

  if (entry.count >= MAX_ATTEMPTS) {
    return { allowed: false, remaining: 0 };
  }

  entry.count++;
  return { allowed: true, remaining: MAX_ATTEMPTS - entry.count };
}

// ========== LOGIN HANDLER ==========
const COOKIE_NAME = 'admin_session';

export async function POST(request: NextRequest) {
  try {
    // 1) Rate Limiting Check
    const rateLimitKey = getRateLimitKey(request);
    const { allowed, remaining } = checkRateLimit(rateLimitKey);

    if (!allowed) {
      return NextResponse.json(
        { error: 'Prea multe încercări de autentificare. Încearcă din nou în 15 minute.' },
        { status: 429 }
      );
    }

    // 2) Parse Request Body
    const body = await request.json().catch(() => null);
    const username = body?.username;
    const password = body?.password;

    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username și parolă sunt obligatorii' },
        { status: 400 }
      );
    }

    // 3) Verify Credentials
    const admin = await verifyAdminCredentials(username, password);

    if (!admin) {
      return NextResponse.json(
        {
          error: 'Credențiale invalide',
          remaining: Math.max(0, remaining - 1),
        },
        { status: 401 }
      );
    }

    // 4) Create JWT token
    const token = await createAdminToken(admin.id, admin.username);

    // 5) Build response + set cookie on response
    const res = NextResponse.json({
      success: true,
      username: admin.username,
    });

    res.cookies.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24, // 24 ore
      path: '/',
    });

    // 6) Clear rate limit on successful login
    rateLimitMap.delete(rateLimitKey);

    return res;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Eroare internă server' }, { status: 500 });
  }
}
