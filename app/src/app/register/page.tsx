import Link from 'next/link';

export default function RegisterPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-xl rounded-[30px] border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-600">Create account</p>
        <h1 className="mt-2 text-3xl font-black text-slate-900">Register your profile</h1>
        <form className="mt-6 grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Full name</label>
            <input className="w-full rounded-xl border border-slate-200 px-3 py-3" placeholder="Jordan Smith" />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Phone</label>
            <input className="w-full rounded-xl border border-slate-200 px-3 py-3" placeholder="+1 555 123 4567" />
          </div>
          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-medium text-slate-700">Email</label>
            <input type="email" className="w-full rounded-xl border border-slate-200 px-3 py-3" placeholder="you@example.com" />
          </div>
          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-medium text-slate-700">Address</label>
            <input className="w-full rounded-xl border border-slate-200 px-3 py-3" placeholder="Your address" />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Password</label>
            <input type="password" className="w-full rounded-xl border border-slate-200 px-3 py-3" placeholder="••••••••" />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Confirm password</label>
            <input type="password" className="w-full rounded-xl border border-slate-200 px-3 py-3" placeholder="••••••••" />
          </div>
          <button className="md:col-span-2 w-full rounded-full bg-slate-900 px-5 py-3 font-semibold text-white">Create account</button>
        </form>
        <p className="mt-5 text-center text-sm text-slate-600">Already have an account? <Link href="/login" className="font-semibold text-slate-900">Login</Link></p>
      </div>
    </main>
  );
}
