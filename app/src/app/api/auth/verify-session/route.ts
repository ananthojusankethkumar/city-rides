import { NextResponse } from 'next/server';
import { initFirebaseAdmin } from '@/lib/firebaseAdmin';

export async function POST(request: Request) {
  const cookieHeader = request.headers.get('cookie') || '';
  const match = cookieHeader.match(/(?:^|; )session=([^;]+)/);
  const session = match?.[1];

  if (!session) return NextResponse.json({ error: 'Missing session cookie' }, { status: 401 });

  try {
    initFirebaseAdmin();
    const admin = await import('firebase-admin');
    const decoded = await (admin as any).auth().verifySessionCookie(session, true);
    return NextResponse.json({ ok: true, uid: decoded.uid, claims: decoded });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'Invalid session' }, { status: 401 });
  }
}
