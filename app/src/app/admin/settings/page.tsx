export default function AdminSettingsPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-600">Configuration</p>
        <h1 className="mt-2 text-4xl font-black text-slate-900">Business settings</h1>
      </div>

      <div className="grid gap-6 rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">Business name</label>
          <input className="w-full rounded-xl border border-slate-200 px-3 py-3" defaultValue="City Rides" />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">Email</label>
          <input className="w-full rounded-xl border border-slate-200 px-3 py-3" defaultValue="hello@cityrides.com" />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">Phone</label>
          <input className="w-full rounded-xl border border-slate-200 px-3 py-3" defaultValue="+1 555 010 9999" />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">Currency</label>
          <input className="w-full rounded-xl border border-slate-200 px-3 py-3" defaultValue="USD" />
        </div>
        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-medium text-slate-700">Address</label>
          <input className="w-full rounded-xl border border-slate-200 px-3 py-3" defaultValue="135 Market Street, New York, NY" />
        </div>
        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-medium text-slate-700">Cancellation policy</label>
          <textarea className="min-h-[120px] w-full rounded-xl border border-slate-200 px-3 py-3" defaultValue="Free cancellation up to 48 hours before pickup." />
        </div>
        <div className="md:col-span-2">
          <button className="rounded-full bg-slate-900 px-5 py-3 font-semibold text-white">Save settings</button>
        </div>
      </div>
    </main>
  );
}
