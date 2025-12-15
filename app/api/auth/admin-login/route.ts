import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyAdminCredentials, setAdminSession } from '@/lib/auth';

// ========== RATE LIMITING ==========
interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const rateLimitMap = new Map<string, RateLimitEntry>();
const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000; // 15 minute

function getRateLimitKey(request: NextRequest): string {
  // Folosim IP-ul real din headers (pentru deployments cu proxy)
  const forwarded = request.headers.get('x-forwarded-for');
  const ip = forwarded ? forwarded.split(',')[0] : 
             request.headers.get('x-real-ip') || 
             'unknown';
  return `login:${ip}`;
}

function checkRateLimit(key: string): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const entry = rateLimitMap.get(key);
  
  // Dacă nu există entry sau window-ul a expirat, resetăm
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(key, {
      count: 1,
      resetAt: now + WINDOW_MS,
    });
    return { allowed: true, remaining: MAX_ATTEMPTS - 1 };
  }
  
  // Dacă am depășit limita
  if (entry.count >= MAX_ATTEMPTS) {
    return { allowed: false, remaining: 0 };
  }
  
  // Incrementăm counter-ul
  entry.count++;
  return { allowed: true, remaining: MAX_ATTEMPTS - entry.count };
}

// Cleanup periodic (la fiecare 30 minute)
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of rateLimitMap.entries()) {
    if (now > entry.resetAt) {
      rateLimitMap.delete(key);
    }
  }
}, 30 * 60 * 1000);

// ========== LOGIN HANDLER ==========

export async function POST(request: NextRequest) {
  try {
    // 1. Rate Limiting Check
    const rateLimitKey = getRateLimitKey(request);
    const { allowed, remaining } = checkRateLimit(rateLimitKey);
    
    if (!allowed) {
      return NextResponse.json(
        { error: 'Prea multe încercări de autentificare. Încearcă din nou în 15 minute.' },
        { status: 429 }
      );
    }
    
    // 2. Parse Request Body
    const body = await request.json();
    const { username, password } = body;
    
    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username și parolă sunt obligatorii' },
        { status: 400 }
      );
    }
    
    // 3. Verify Credentials
    const admin = await verifyAdminCredentials(username, password);
    
    if (!admin) {
      return NextResponse.json(
        { 
          error: 'Credențiale invalide',
          remaining: remaining - 1,
        },
        { status: 401 }
      );
    }
    
    // 4. Create Session (sets JWT cookie)
    await setAdminSession(admin.id, admin.username);
    
    // 5. Clear rate limit on successful login
    rateLimitMap.delete(rateLimitKey);
    
    return NextResponse.json({ 
      success: true,
      username: admin.username,
    });
    
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Eroare internă server' },
      { status: 500 }
    );
  }
}