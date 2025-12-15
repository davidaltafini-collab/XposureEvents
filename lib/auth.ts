import { cookies } from 'next/headers';
import { SignJWT, jwtVerify } from 'jose';
import bcrypt from 'bcryptjs';
import { prisma } from './prisma';

const COOKIE_NAME = 'admin_session';
const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'your-secret-key-change-in-production-minimum-32-chars'
);

export interface AdminSession {
  userId: string;
  username: string;
  iat: number;
  exp: number;
}

// ========== JWT FUNCTIONS ==========

/**
 * Creează un JWT token pentru admin
 */
export async function createAdminToken(userId: string, username: string): Promise<string> {
  const token = await new SignJWT({ userId, username })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(JWT_SECRET);

  return token;
}

/**
 * Verifică și decodează un JWT token
 */
export async function verifyAdminToken(token: string): Promise<AdminSession | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);

    // jose returnează JWTPayload; validăm runtime câmpurile de care avem nevoie
    const userId = (payload as Record<string, unknown>).userId;
    const username = (payload as Record<string, unknown>).username;

    if (typeof userId !== 'string' || typeof username !== 'string') {
      return null;
    }

    // iat/exp pot fi undefined; le normalizăm
    const iat = typeof payload.iat === 'number' ? payload.iat : 0;
    const exp = typeof payload.exp === 'number' ? payload.exp : 0;

    return { userId, username, iat, exp };
  } catch (error) {
    return null;
  }
}

// ========== SESSION MANAGEMENT ==========

/**
 * Setează session cookie cu JWT
 */
export async function setAdminSession(userId: string, username: string) {
  const token = await createAdminToken(userId, username);
  const cookieStore = await cookies();

  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24, // 24 ore
    path: '/',
  });
}

/**
 * Șterge session cookie
 */
export async function clearAdminSession() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

/**
 * Verifică dacă utilizatorul este admin (folosit în API routes și pages)
 */
export async function isAdmin(): Promise<boolean> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(COOKIE_NAME);

  if (!sessionCookie?.value) {
    return false;
  }

  const session = await verifyAdminToken(sessionCookie.value);
  return !!session;
}

/**
 * Obține sesiunea curentă a admin-ului
 */
export async function getAdminSession(): Promise<AdminSession | null> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(COOKIE_NAME);

  if (!sessionCookie?.value) {
    return null;
  }

  return verifyAdminToken(sessionCookie.value);
}

// ========== AUTH FUNCTIONS ==========

/**
 * Verifică credențialele admin-ului din baza de date
 */
export async function verifyAdminCredentials(
  username: string,
  password: string
): Promise<{ id: string; username: string } | null> {
  try {
    const admin = await prisma.admin.findUnique({
      where: { username },
    });

    if (!admin) {
      return null;
    }

    const isValid = await bcrypt.compare(password, admin.passwordHash);

    if (!isValid) {
      return null;
    }

    return {
      id: admin.id,
      username: admin.username,
    };
  } catch (error) {
    console.error('Error verifying admin credentials:', error);
    return null;
  }
}

/**
 * Creează un admin nou (pentru seed script)
 */
export async function createAdmin(username: string, password: string) {
  const passwordHash = await bcrypt.hash(password, 12);

  const admin = await prisma.admin.upsert({
    where: { username },
    update: { passwordHash },
    create: {
      username,
      passwordHash,
    },
  });

  return admin;
}
