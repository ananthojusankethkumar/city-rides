import { NextResponse } from 'next/server';
import { initFirebaseAdmin } from '@/lib/firebaseAdmin';

initFirebaseAdmin();

export async function POST(request: Request) {
  const authHeader = request.headers.get('authorization') || '';
  const idToken = authHeader.replace(/^Bearer\s+/i, '');

  if (!idToken) return NextResponse.json({ error: 'Missing Authorization token' }, { status: 401 });

  try {
    const admin = (await import('firebase-admin')).default;
    const decoded = await admin.auth().verifyIdToken(idToken);
    return NextResponse.json({ ok: true, uid: decoded.uid, email: decoded.email });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || 'Invalid token' }, { status: 401 });
  }
}
