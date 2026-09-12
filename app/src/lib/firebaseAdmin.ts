import admin from 'firebase-admin';

let adminApp: admin.app.App | undefined;

function parseServiceAccountFromEnv(): admin.ServiceAccount | undefined {
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
  if (admin.apps.length) return admin.apps[0];

  const sa = serviceAccountJson ?? parseServiceAccountFromEnv();
  const credential = sa ? admin.credential.cert(sa) : admin.credential.applicationDefault();

  adminApp = admin.initializeApp({
    credential,
    storageBucket: process.env.FIREBASE_ADMIN_STORAGE_BUCKET || process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  });

  return adminApp;
}

export { adminApp };
