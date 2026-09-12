"use client";
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '@/lib/firebase';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  async function handleEmailLogin(e: React.FormEvent) {
    e.preventDefault();
    try {
      const cred = await signInWithEmailAndPassword(auth, email, password);
      const idToken = await cred.user.getIdToken();
      await fetch('/api/auth/session', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ idToken }) });
      router.push('/admin');
    } catch (err) {
      alert('Login failed');
    }
  }

  async function handleGoogleSignIn() {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const idToken = await result.user.getIdToken();
      await fetch('/api/auth/session', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ idToken }) });
      router.push('/admin');
    } catch (err) {
      alert('Google sign-in failed');
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-md rounded-[30px] border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-600">Welcome back</p>
        <h1 className="mt-2 text-3xl font-black text-slate-900">Customer login</h1>
        <form onSubmit={handleEmailLogin} className="mt-6 space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="w-full rounded-xl border border-slate-200 px-3 py-3" placeholder="you@example.com" />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Password</label>
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="w-full rounded-xl border border-slate-200 px-3 py-3" placeholder="••••••••" />
          </div>
          <button type="submit" className="w-full rounded-full bg-slate-900 px-5 py-3 font-semibold text-white">Login</button>
        </form>

        <div className="mt-4">
          <button onClick={handleGoogleSignIn} className="w-full rounded-full border px-4 py-3 flex items-center justify-center gap-2">
            <img src="/google-logo.png" alt="Google" className="h-5 w-5" />
            Sign in with Google
          </button>
        </div>

        <div className="mt-5 flex items-center justify-between text-sm text-slate-600">
          <Link href="/register">Create account</Link>
          <Link href="/">Forgot password?</Link>
        </div>
      </div>
    </main>
  );
}
