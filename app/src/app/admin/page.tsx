import Link from 'next/link';
import { formatCurrency } from '@/lib/utils';

const stats = [
  { label: 'Total cars', value: '128' },
  { label: 'Available cars', value: '64' },
  { label: 'Currently rented', value: '29' },
  { label: 'Total bookings', value: '412' },
  { label: 'Pending', value: '18' },
  { label: 'Confirmed', value: '247' },
  { label: 'Today pickups', value: '11' },
  { label: 'Today returns', value: '8' },
  { label: 'Customers', value: '912' },
  { label: 'Revenue', value: formatCurrency(84700) },
];

export default function AdminDashboardPage() {
  return (
    <main className="min-h-screen bg-slate-100 p-4 md:p-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8 flex flex-col gap-4 rounded-[28px] bg-slate-900 p-6 text-white md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-orange-400">Operations</p>
            <h1 className="mt-2 text-3xl font-black">Admin dashboard</h1>
          </div>
          <div className="flex gap-3">
            <Link href="/admin/cars" className="rounded-full bg-white px-4 py-2 font-medium text-slate-900">Manage cars</Link>
            <Link href="/admin/bookings" className="rounded-full border border-slate-700 px-4 py-2 font-medium text-white">Bookings</Link>
          </div>
        </header>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-sm text-slate-500">{stat.label}</p>
              <p className="mt-3 text-3xl font-black text-slate-900">{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-black text-slate-900">Monthly revenue</h2>
            <div className="mt-6 h-64 rounded-2xl bg-gradient-to-br from-orange-100 to-slate-100 p-4">
              <div className="flex h-full items-end gap-3">
                {[28,35,32,44,54,61,58,72,66,80,89,95].map((value, idx) => (
                  <div key={idx} className="flex flex-1 flex-col items-center gap-2">
                    <div className="w-full rounded-t-2xl bg-slate-900" style={{ height: `${value}%` }} />
                    <span className="text-[10px] uppercase tracking-[0.16em] text-slate-500">{['J','F','M','A','M','J','J','A','S','O','N','D'][idx]}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-black text-slate-900">Recent bookings</h2>
            <div className="mt-6 space-y-4">
              {[
                { id: 'BK-2041', customer: 'Ava Johnson', status: 'Confirmed' },
                { id: 'BK-2042', customer: 'Leo Martinez', status: 'Pending' },
                { id: 'BK-2043', customer: 'Mia Chen', status: 'Active' },
              ].map((item) => (
                <div key={item.id} className="rounded-2xl bg-slate-50 p-4">
                  <div className="flex items-center justify-between">
                    <strong>{item.id}</strong>
                    <span className="text-xs rounded-full bg-emerald-100 px-2 py-1 font-medium text-emerald-700">{item.status}</span>
                  </div>
                  <p className="mt-2 text-sm text-slate-600">{item.customer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
