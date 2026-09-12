const bookings = [
  { id: 'BK-2041', customer: 'Ava Johnson', car: 'BMW 3 Series', status: 'Confirmed' },
  { id: 'BK-2042', customer: 'Leo Martinez', car: 'Tesla Model 3', status: 'Pending' },
  { id: 'BK-2043', customer: 'Mia Chen', car: 'Audi Q5', status: 'Active' },
];

export default function AdminBookingsPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-600">Bookings</p>
          <h1 className="mt-2 text-4xl font-black text-slate-900">Manage bookings</h1>
        </div>
        <button className="rounded-full bg-slate-900 px-4 py-2 font-medium text-white">Export</button>
      </div>

      <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-slate-50 text-sm uppercase tracking-[0.16em] text-slate-500">
            <tr>
              <th className="px-6 py-4">ID</th>
              <th className="px-6 py-4">Customer</th>
              <th className="px-6 py-4">Car</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id} className="border-t border-slate-200">
                <td className="px-6 py-4 font-bold text-slate-900">{booking.id}</td>
                <td className="px-6 py-4 text-slate-700">{booking.customer}</td>
                <td className="px-6 py-4 text-slate-700">{booking.car}</td>
                <td className="px-6 py-4"><span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-700">{booking.status}</span></td>
                <td className="px-6 py-4"><div className="flex gap-2"><button className="rounded-full border border-slate-200 px-3 py-2 text-sm">Confirm</button><button className="rounded-full border border-slate-200 px-3 py-2 text-sm">Reject</button></div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
