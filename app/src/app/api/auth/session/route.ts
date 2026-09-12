import { NextResponse } from 'next/server';
import { initFirebaseAdmin } from '@/lib/firebaseAdmin';

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const idToken = body.idToken || null;
  if (!idToken) return NextResponse.json({ error: 'missing idToken' }, { status: 400 });

  try {
    // initialize admin with service account if available
    initFirebaseAdmin();
    const admin = await import('firebase-admin');
    const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days
    const sessionCookie = await (admin as any).auth().createSessionCookie(idToken, { expiresIn });

    const res = NextResponse.json({ ok: true });
    res.cookies.set({
      name: 'session',
      value: sessionCookie,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: expiresIn / 1000,
    });
    return res;
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'invalid token' }, { status: 401 });
  }
}
