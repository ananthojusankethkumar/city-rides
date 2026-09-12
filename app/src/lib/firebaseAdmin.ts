import * as admin from 'firebase-admin';

let adminApp: any;

function parseServiceAccountFromEnv(): any | undefined {
  const raw = process.env.FIREBASE_SERVICE_ACCOUNT || process.env.FIREBASE_ADMIN_SERVICE_ACCOUNT;
  if (!raw) return undefined;
  try {
    // Allow single-line JSON or base64 encoded JSON
    if (raw.trim().startsWith('{')) return JSON.parse(raw);
    const decoded = Buffer.from(raw, 'base64').toString('utf8');
    return JSON.parse(decoded);
  } catch (e) {
    console.warn('Failed to parse FIREBASE_SERVICE_ACCOUNT env var', e);
    return undefined;
  }
}

export function initFirebaseAdmin(serviceAccountJson?: admin.ServiceAccount) {
  // avoid re-initializing
  try {
    if ((admin as any).apps && (admin as any).apps.length) return (admin as any).apps[0];
  } catch (e) {}

  const sa = serviceAccountJson ?? parseServiceAccountFromEnv();

  // If no service account and no ADC path, skip initializing here (avoids build-time errors)
  if (!sa && !process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    return undefined;
  }

  const credential = sa ? (admin as any).credential.cert(sa) : (admin as any).credential.applicationDefault();

  adminApp = (admin as any).initializeApp({
    credential,
    storageBucket: process.env.FIREBASE_ADMIN_STORAGE_BUCKET || process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  });

  return adminApp;
}

export { adminApp };
