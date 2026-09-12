import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { initFirebaseAdmin } from './src/lib/firebaseAdmin';

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (!pathname.startsWith('/admin')) return NextResponse.next();

  const session = req.cookies.get('session')?.value;
  if (!session) return NextResponse.redirect(new URL('/login', req.url));

  try {
    initFirebaseAdmin();
    const admin = await import('firebase-admin');
    await (admin as any).auth().verifySessionCookie(session, true);
    return NextResponse.next();
  } catch (e) {
    return NextResponse.redirect(new URL('/login', req.url));
  }
}

export const config = {
  matcher: ['/admin/:path*'],
};
