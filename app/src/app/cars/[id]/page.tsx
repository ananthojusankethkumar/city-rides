import Link from 'next/link';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { formatCurrency } from '@/lib/utils';

export default async function CarDetailsPage({ params }: { params: { id: string } }) {
  const car = await prisma.car.findUnique({ where: { id: params.id }, include: { images: true } });

  if (!car) notFound();

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-center justify-between">
        <Link href="/cars" className="rounded-full border border-slate-200 bg-white px-4 py-2 font-medium text-slate-700">← Back to Cars Fleet</Link>
        <Link href={`/booking/${car.id}`} className="rounded-full bg-slate-900 px-4 py-2 font-medium text-white">Book now</Link>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <img src={car.images?.[0]?.url || '/favicon.ico'} alt={car.model} className="h-[420px] w-full rounded-[30px] object-cover" />
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {(car.images?.slice(0,3) || []).map((img, index) => (
              <img key={index} src={img.url} alt={`${car.model} ${index + 1}`} className="h-40 w-full rounded-[22px] object-cover" />
            ))}
          </div>
        </div>

        <aside className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-xs uppercase tracking-[0.18em] text-slate-500">{car.brand}</p>
          <h1 className="mt-2 text-4xl font-black">{car.model}</h1>
          <p className="mt-1 text-slate-600">{car.variant} • {car.year}</p>
          <div className="mt-5 flex items-baseline gap-2">
            <span className="text-4xl font-black">{formatCurrency(car.dailyPrice)}</span>
            <span className="text-slate-500">/ day</span>
          </div>
          <div className="mt-6 rounded-2xl bg-slate-50 p-4 text-sm text-slate-700">
            <div className="flex justify-between py-2"><span>Security deposit</span><strong>{formatCurrency(car.securityDeposit)}</strong></div>
            <div className="flex justify-between py-2"><span>Transmission</span><strong>{car.transmission}</strong></div>
            <div className="flex justify-between py-2"><span>Fuel type</span><strong>{car.fuelType}</strong></div>
            <div className="flex justify-between py-2"><span>Seats</span><strong>{car.seats}</strong></div>
            <div className="flex justify-between py-2"><span>Mileage</span><strong>{car.mileage.toLocaleString()} km</strong></div>
          </div>
          <div className="mt-6">
            <h2 className="text-lg font-bold">Features</h2>
            <ul className="mt-3 space-y-2 text-slate-600">
              <li>• Leather interior</li>
              <li>• GPS navigation</li>
              <li>• Cruise control</li>
              <li>• 360° camera</li>
            </ul>
          </div>
          <Link href={`/booking/${car.id}`} className="mt-8 inline-flex w-full items-center justify-center rounded-full bg-orange-500 px-5 py-3 font-semibold text-white">Reserve this car</Link>
        </aside>
      </div>
    </main>
  );
}
