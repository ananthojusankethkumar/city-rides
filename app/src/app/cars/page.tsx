import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { formatCurrency } from '@/lib/utils';

export const dynamic = 'force-dynamic';

export default async function CarsPage() {
  const cars = await prisma.car.findMany({ include: { images: true } });

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <header className="mb-8 flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-600">Available fleet</p>
          <h1 className="mt-2 text-4xl font-black text-slate-900">Cars Fleet</h1>
        </div>
        <Link href="/" className="rounded-full border border-slate-200 bg-white px-4 py-2 font-medium text-slate-700">Back home</Link>
      </header>

      <div className="mb-8 grid gap-4 rounded-[28px] bg-slate-900 p-4 text-white md:grid-cols-5">
        <input className="rounded-xl border border-white/10 bg-slate-800 px-3 py-3" placeholder="Search brand/model" />
        <select className="rounded-xl border border-white/10 bg-slate-800 px-3 py-3"><option>All brands</option></select>
        <select className="rounded-xl border border-white/10 bg-slate-800 px-3 py-3"><option>All types</option></select>
        <select className="rounded-xl border border-white/10 bg-slate-800 px-3 py-3"><option>Any transmission</option></select>
        <button className="rounded-xl bg-orange-500 px-4 py-3 font-semibold">Search</button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {cars.map((car) => (
          <div key={car.id} className="overflow-hidden rounded-[28px] border border-slate-200 bg-white p-3 shadow-sm">
            <img src={car.images?.[0]?.url || '/favicon.ico'} alt={car.model} className="h-52 w-full rounded-[22px] object-cover" />
            <div className="p-4">
              <div className="mb-2 flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-500">{car.brand}</p>
                  <h3 className="text-2xl font-bold">{car.model}</h3>
                </div>
                <span className="rounded-full bg-emerald-100 px-2 py-1 text-xs font-semibold text-emerald-700">{car.status}</span>
              </div>
              <div className="mb-4 grid grid-cols-2 gap-2 text-sm text-slate-600">
                <span>Year: {car.year}</span>
                <span>Seats: {car.seats}</span>
                <span>{car.transmission}</span>
                <span>{car.fuelType}</span>
              </div>
              <div className="flex items-center justify-between border-t border-slate-200 pt-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Per day</p>
                  <p className="text-2xl font-black">{formatCurrency(car.dailyPrice)}</p>
                </div>
                <div className="flex gap-2">
                  <Link href={`/cars/${car.id}`} className="rounded-full border border-slate-200 px-3 py-2 text-sm">Details</Link>
                  <Link href={`/booking/${car.id}`} className="rounded-full bg-slate-900 px-3 py-2 text-sm text-white">Book now</Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
