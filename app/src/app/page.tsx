import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { formatCurrency } from '@/lib/utils';
import { ArrowRight, CalendarCheck2, CarFront, MapPinned, ShieldCheck, Star, Users } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const featured = await prisma.car.findMany({ take: 3, include: { images: true } });
  const reviews = await prisma.review.findMany({ take: 3, include: { user: true } });

  return (
    <main className="min-h-screen text-slate-900">
      <header className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <nav className="card-surface flex items-center justify-between rounded-full px-5 py-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-lg font-bold text-white">C</div>
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Premium</p>
              <h1 className="text-lg font-bold">City Rides</h1>
            </div>
          </div>

          <div className="hidden items-center gap-8 text-sm font-medium text-slate-600 md:flex">
            <Link href="/">Home</Link>
            <Link href="/cars">Cars Fleet</Link>
            <Link href="/my-bookings">My Bookings</Link>
            <Link href="/admin/login">Admin</Link>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/login" className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium">Login</Link>
            <Link href="/register" className="rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white">Register</Link>
          </div>
        </nav>
      </header>

      <section className="mx-auto max-w-7xl px-4 pb-14 sm:px-6 lg:px-8">
        <div className="grid gap-8 overflow-hidden rounded-[32px] bg-slate-900 px-6 py-8 text-white shadow-2xl shadow-slate-900/20 lg:grid-cols-[1.15fr_0.85fr] lg:px-10 lg:py-10">
          <div className="pt-4">
            <span className="inline-flex rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-slate-200">
              Premium mobility
            </span>
            <h2 className="mt-6 max-w-xl text-4xl font-black leading-tight md:text-6xl">
              Rent Your <span className="gradient-text">Perfect Car</span>
            </h2>
            <p className="mt-4 max-w-lg text-base text-slate-300 md:text-lg">
              Reserve premium rides in minutes with flexible pickup, transparent pricing, and trusted service across top cities.
            </p>

            <div className="mt-8 grid gap-4 rounded-3xl bg-white/5 p-4 text-slate-200 backdrop-blur md:grid-cols-2 xl:grid-cols-4">
              <div>
                <label className="mb-2 block text-xs uppercase tracking-[0.2em] text-slate-300">Pickup</label>
                <input className="w-full rounded-xl border border-white/10 bg-slate-950/20 px-3 py-3 text-white outline-none placeholder:text-slate-400" placeholder="Location" />
              </div>
              <div>
                <label className="mb-2 block text-xs uppercase tracking-[0.2em] text-slate-300">Date</label>
                <input type="date" className="w-full rounded-xl border border-white/10 bg-slate-950/20 px-3 py-3 text-white outline-none" />
              </div>
              <div>
                <label className="mb-2 block text-xs uppercase tracking-[0.2em] text-slate-300">Return</label>
                <input type="date" className="w-full rounded-xl border border-white/10 bg-slate-950/20 px-3 py-3 text-white outline-none" />
              </div>
              <div className="flex items-end">
                <Link href="/cars" className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-orange-500 px-4 py-3 font-semibold text-white transition hover:bg-orange-400">Search Cars <ArrowRight size={16} /></Link>
              </div>
            </div>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="absolute -left-10 top-8 h-32 w-32 rounded-full bg-orange-500/30 blur-3xl" />
            <div className="absolute -right-10 bottom-10 h-40 w-40 rounded-full bg-blue-500/30 blur-3xl" />
            <img
              src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1200&q=80"
              alt="Luxury car"
              className="relative z-10 h-[420px] w-full rounded-[28px] object-cover shadow-2xl"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-600">Featured Fleet</p>
            <h3 className="mt-1 text-3xl font-black text-slate-900">Popular picks</h3>
          </div>
          <Link href="/cars" className="text-sm font-semibold text-slate-900">Browse all cars →</Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {featured.map((car) => (
            <div key={car.id} className="card-surface overflow-hidden rounded-[28px] p-3">
              <img src={car.images?.[0]?.url ?? '/placeholder.png'} alt={car.model} className="h-52 w-full rounded-[22px] object-cover" />
              <div className="p-4">
                <div className="mb-3 flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-slate-500">{car.brand}</p>
                    <h4 className="text-2xl font-bold">{car.model}</h4>
                  </div>
                  <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-700">{car.status}</span>
                </div>
                <p className="mb-4 text-sm text-slate-600">{car.description}</p>
                <div className="mb-4 grid grid-cols-2 gap-2 text-sm text-slate-600">
                  <span>Year: {car.year}</span>
                  <span>Seats: {car.seats}</span>
                  <span>Fuel: {car.fuelType}</span>
                  <span>Auto</span>
                </div>
                <div className="flex items-center justify-between border-t border-slate-200 pt-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-slate-500">From</p>
                    <p className="text-2xl font-black">{formatCurrency(car.dailyPrice)}<span className="text-sm font-medium text-slate-500">/day</span></p>
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
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { title: 'Luxury fleet', text: 'Curated premium models from top manufacturers.', icon: CarFront },
            { title: 'Flexible booking', text: 'Choose quick pickup, daily or weekly plans.', icon: CalendarCheck2 },
            { title: 'Trusted support', text: '24/7 assistance from booking to return.', icon: ShieldCheck },
          ].map(({ title, text, icon: Icon }) => (
            <div key={title} className="card-surface rounded-[28px] p-6">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-100 text-orange-600"><Icon size={26} /></div>
              <h4 className="text-xl font-bold">{title}</h4>
              <p className="mt-2 text-slate-600">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-600">How it works</p>
          <h3 className="mt-2 text-3xl font-black text-slate-900">Booking in just three steps</h3>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {['Choose your vehicle', 'Pick your dates & location', 'Confirm and drive'].map((step, index) => (
            <div key={step} className="card-surface rounded-[28px] p-6 text-center">
              <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-slate-900 text-lg font-bold text-white">{index + 1}</div>
              <p className="text-xl font-bold">{step}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-600">Customer love</p>
            <h3 className="mt-2 text-3xl font-black text-slate-900">What drivers say</h3>
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {reviews.map((r) => {
            const reviewerName = r.user?.name ?? 'Guest';
            return (
              <div key={r.id} className="card-surface rounded-[28px] p-6">
                <div className="mb-3 flex items-center gap-1 text-orange-500">{Array.from({ length: r.rating || 0 }).map((_, idx) => <Star key={idx} size={16} fill="currentColor" />)}</div>
                <p className="text-slate-700">“{r.comment}”</p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-sm font-bold text-white">{reviewerName[0]}</div>
                  <span className="font-semibold">{reviewerName}</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="card-surface rounded-[32px] px-6 py-8 lg:flex lg:items-center lg:justify-between lg:px-10">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-600">Contact</p>
            <h3 className="mt-2 text-3xl font-black text-slate-900">Need help planning your trip?</h3>
          </div>
          <div className="mt-6 flex flex-wrap gap-4 lg:mt-0">
            <div className="flex items-center gap-2 text-slate-700"><MapPinned size={18} className="text-orange-600" /> Mumbai, India</div>
            <div className="flex items-center gap-2 text-slate-700"><Users size={18} className="text-orange-600" /> +91 98765 43210</div>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-slate-900 text-slate-200">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-10 text-sm sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <p>© 2026 City Rides. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/cars">Cars Fleet</Link>
            <Link href="/my-bookings">My Bookings</Link>
            <Link href="/admin/login">Admin Login</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
