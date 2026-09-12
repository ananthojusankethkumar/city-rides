Security checklist and next steps

1) Secrets handling
 - Do NOT commit `.env` to git. Use `.env.example` as a template.
 - Store secrets in your deployment platform's secret manager (Vercel/GCP/Netlify) or CI secrets.
 - For Firebase Admin, set `FIREBASE_SERVICE_ACCOUNT` to the service account JSON (single-line) or base64 encode it.

2) Firebase
 - Client keys (`NEXT_PUBLIC_...`) are public by design. Keep admin credentials server-side only.
 - Use `initFirebaseAdmin()` in server-only code and never expose `firebase-admin` to the browser.

3) Auth
 - Verify ID tokens on server routes using the provided `/api/auth/verify` POST endpoint.
 - Protect admin routes with middleware that verifies the token and checks user role.

4) HTTPS and headers
 - Ensure production runs behind HTTPS. Configure HSTS, CSP, and X-Frame-Options at your host.
 - Consider using `helmet` or platform settings to add security headers.

5) Rate limiting and input validation
 - Add request validation and rate limiting for public endpoints (e.g., login, register).

6) Database and backups
 - Protect your database file (dev.db) for production use migrate to managed DB and secure credentials.

If you want, I can:
 - Add a Next.js middleware to protect `/admin` routes using Firebase Admin token verification.
 - Add server-side role checks, rate limiting, and CSP headers.
