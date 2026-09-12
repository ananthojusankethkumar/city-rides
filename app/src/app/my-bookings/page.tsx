import Link from 'next/link';
import { formatCurrency } from '@/lib/utils';

const bookings = [
  { id:'BK-1024', car:'BMW 3 Series', pickup:'Sep 12, 2026 • 10:00 AM', return:'Sep 15, 2026 • 10:00 AM', total: formatCurrency(285), status:'Confirmed' },
  { id:'BK-1088', car:'Tesla Model 3', pickup:'Sep 22, 2026 • 09:30 AM', return:'Sep 25, 2026 • 09:30 AM', total: formatCurrency(330), status:'Pending' },
];

export default function MyBookingsPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-600">Trips</p>
          <h1 className="mt-2 text-4xl font-black text-slate-900">My bookings</h1>
        </div>
        <Link href="/cars" className="rounded-full bg-slate-900 px-4 py-2 font-medium text-white">Book another car</Link>
      </div>

      <div className="space-y-4">
        {bookings.map((booking) => (
          <div key={booking.id} className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Booking ID {booking.id}</p>
                <h2 className="mt-2 text-2xl font-bold">{booking.car}</h2>
              </div>
              <span className="inline-flex w-fit rounded-full bg-emerald-100 px-3 py-1 text-sm font-semibold text-emerald-700">{booking.status}</span>
            </div>
            <div className="mt-5 grid gap-3 md:grid-cols-4 text-sm text-slate-700">
              <div><span className="block text-slate-500">Pickup</span><strong>{booking.pickup}</strong></div>
              <div><span className="block text-slate-500">Return</span><strong>{booking.return}</strong></div>
              <div><span className="block text-slate-500">Total</span><strong>{booking.total}</strong></div>
              <div className="flex items-end"><button className="rounded-full border border-slate-200 px-3 py-2 font-medium">View details</button></div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
