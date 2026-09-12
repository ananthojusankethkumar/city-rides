import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { formatCurrency } from '@/lib/utils';

export default async function BookingPage({ params }: { params: { id: string } }) {
  const car = await prisma.car.findUnique({ where: { id: params.id }, include: { images: true } });

  if (!car) {
    return <main className="mx-auto max-w-4xl px-4 py-16 text-center">Car not found.</main>;
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-600">Booking</p>
          <h1 className="mt-2 text-4xl font-black text-slate-900">Reserve {car.brand} {car.model}</h1>
        </div>
        <Link href={`/cars/${car.id}`} className="rounded-full border border-slate-200 bg-white px-4 py-2 font-medium text-slate-700">Back to details</Link>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Pickup location</label>
              <input className="w-full rounded-xl border border-slate-200 px-3 py-3" defaultValue="Downtown Hub" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Return location</label>
              <input className="w-full rounded-xl border border-slate-200 px-3 py-3" defaultValue="City Center" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Pickup date</label>
              <input type="date" className="w-full rounded-xl border border-slate-200 px-3 py-3" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Pickup time</label>
              <input type="time" className="w-full rounded-xl border border-slate-200 px-3 py-3" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Return date</label>
              <input type="date" className="w-full rounded-xl border border-slate-200 px-3 py-3" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Return time</label>
              <input type="time" className="w-full rounded-xl border border-slate-200 px-3 py-3" />
            </div>
          </div>

          <div className="mt-8 rounded-2xl bg-slate-50 p-4">
            <h2 className="text-lg font-bold">Booking summary</h2>
            <div className="mt-4 space-y-2 text-sm text-slate-700">
              <div className="flex items-center justify-between"><span>Rental subtotal</span><strong>{formatCurrency(car.dailyPrice * 3)}</strong></div>
              <div className="flex items-center justify-between"><span>Taxes</span><strong>{formatCurrency(car.dailyPrice * 3 * 0.1)}</strong></div>
              <div className="flex items-center justify-between"><span>Additional charges</span><strong>{formatCurrency(25)}</strong></div>
              <div className="flex items-center justify-between"><span>Security deposit</span><strong>{formatCurrency(car.securityDeposit)}</strong></div>
              <div className="flex items-center justify-between"><span>Coupon</span><strong>-{formatCurrency(50)}</strong></div>
            </div>
            <div className="mt-4 flex items-center justify-between border-t border-slate-200 pt-4 text-lg font-black">
              <span>Total</span>
              <span>{formatCurrency(car.dailyPrice * 3 + car.dailyPrice * 3 * 0.1 + 25 + car.securityDeposit - 50)}</span>
            </div>
          </div>
        </section>

        <aside className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm">
          <img src={car.images?.[0]?.url || '/favicon.ico'} alt={car.model} className="h-52 w-full rounded-[22px] object-cover" />
          <div className="mt-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-slate-500">{car.brand}</p>
                <h2 className="text-3xl font-black">{car.model}</h2>
              </div>
              <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-700">{car.status}</span>
            </div>
            <p className="mt-3 text-slate-600">{car.description}</p>
            <div className="mt-5 space-y-2 text-sm text-slate-700">
              <div className="flex justify-between"><span>Year</span><strong>{car.year}</strong></div>
              <div className="flex justify-between"><span>Transmission</span><strong>{car.transmission}</strong></div>
              <div className="flex justify-between"><span>Fuel</span><strong>{car.fuelType}</strong></div>
              <div className="flex justify-between"><span>Seats</span><strong>{car.seats}</strong></div>
            </div>
            <button className="mt-8 w-full rounded-full bg-orange-500 px-5 py-3 font-semibold text-white">Confirm booking</button>
          </div>
        </aside>
      </div>
    </main>
  );
}
