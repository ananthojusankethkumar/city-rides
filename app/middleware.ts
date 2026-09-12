import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { initFirebaseAdmin } from './src/lib/firebaseAdmin';

initFirebaseAdmin();

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (!pathname.startsWith('/admin')) return NextResponse.next();

  const session = req.cookies.get('session')?.value;
  if (!session) return NextResponse.redirect(new URL('/login', req.url));

  try {
    const admin = (await import('firebase-admin')).default;
    await admin.auth().verifySessionCookie(session, true);
    return NextResponse.next();
  } catch (e) {
    return NextResponse.redirect(new URL('/login', req.url));
  }
}

export const config = {
  matcher: ['/admin/:path*'],
};
