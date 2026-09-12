const customers = [
  { name: 'Ava Johnson', email: 'ava@example.com', status: 'Active' },
  { name: 'Leo Martinez', email: 'leo@example.com', status: 'Active' },
  { name: 'Mia Chen', email: 'mia@example.com', status: 'Pending' },
];

export default function AdminCustomersPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-600">Customers</p>
          <h1 className="mt-2 text-4xl font-black text-slate-900">Customers</h1>
        </div>
      </div>

      <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-slate-50 text-sm uppercase tracking-[0.16em] text-slate-500">
            <tr>
              <th className="px-6 py-4">Customer</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.email} className="border-t border-slate-200">
                <td className="px-6 py-4 font-bold text-slate-900">{customer.name}</td>
                <td className="px-6 py-4 text-slate-700">{customer.email}</td>
                <td className="px-6 py-4"><span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-700">{customer.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
