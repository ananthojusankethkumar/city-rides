import { formatCurrency } from '@/lib/utils';

import Link from 'next/link';
import { prisma } from '@/lib/prisma';

export default async function AdminCarsPage() {
  const cars = await prisma.car.findMany({ include: { images: true } });

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-600">Inventory</p>
          <h1 className="mt-2 text-4xl font-black text-slate-900">Manage Cars Fleet</h1>
        </div>
        <Link href="/admin/cars/new" className="rounded-full bg-slate-900 px-4 py-2 font-medium text-white">Add car</Link>
      </div>

      <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-slate-50 text-sm uppercase tracking-[0.16em] text-slate-500">
            <tr>
              <th className="px-6 py-4">Car</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Price</th>
              <th className="px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {cars.map((car) => (
              <tr key={car.id} className="border-t border-slate-200">
                <td className="px-6 py-4">
                  <div>
                    <p className="font-bold text-slate-900">{car.brand} {car.model}</p>
                    <p className="text-sm text-slate-500">{car.plateNumber}</p>
                  </div>
                </td>
                <td className="px-6 py-4"><span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-700">{car.status}</span></td>
                <td className="px-6 py-4 font-semibold text-slate-900">{car.dailyPrice}</td>
                <td className="px-6 py-4"><div className="flex gap-2"><Link href={`/admin/cars/${car.id}/edit`} className="rounded-full border border-slate-200 px-3 py-2 text-sm">Edit</Link><button data-id={car.id} className="rounded-full border border-slate-200 px-3 py-2 text-sm">Delete</button></div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
