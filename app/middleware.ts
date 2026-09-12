import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (!pathname.startsWith('/admin')) return NextResponse.next();

  // Read session cookie value
  const session = req.cookies.get('session')?.value;
  if (!session) return NextResponse.redirect(new URL('/login', req.url));

  try {
    // Avoid initializing firebase-admin from the Edge runtime.
    // Instead call the server API that performs verification.
    const verifyUrl = new URL('/api/auth/verify-session', req.url);
    const res = await fetch(verifyUrl.toString(), {
      method: 'POST',
      headers: {
        // forward only the session cookie for verification
        cookie: `session=${session}`,
      },
    });

    if (res.ok) return NextResponse.next();
    return NextResponse.redirect(new URL('/login', req.url));
  } catch (e) {
    return NextResponse.redirect(new URL('/login', req.url));
  }
}

export const config = {
  matcher: ['/admin/:path*'],
};
