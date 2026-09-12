import Link from 'next/link';

export default function AdminLoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-4">
      <div className="w-full max-w-md rounded-[30px] border border-slate-800 bg-slate-900 p-8 shadow-2xl shadow-slate-950/40">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-400">Secure admin area</p>
        <h1 className="mt-2 text-3xl font-black text-white">Admin login</h1>
        <form className="mt-6 space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">Email</label>
            <input type="email" className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-3 text-white" placeholder="admin@cityrides.com" />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">Password</label>
            <input type="password" className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-3 text-white" placeholder="••••••••" />
          </div>
          <button className="w-full rounded-full bg-orange-500 px-5 py-3 font-semibold text-white">Login to dashboard</button>
        </form>
        <div className="mt-5 text-sm text-slate-400">
          <Link href="/" className="text-orange-300">Return to customer site</Link>
        </div>
      </div>
    </main>
  );
}
