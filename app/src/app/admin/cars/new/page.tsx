"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NewCarPage() {
  const [form, setForm] = useState({ brand: '', model: '', dailyPrice: '', plateNumber: '' });
  const router = useRouter();

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    await fetch('/api/cars', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...form, year: 2024, securityDeposit: 0, seats: 5, mileage: 0, fuelType: 'Petrol', transmission: 'Automatic', description: '', images: [] }) });
    router.push('/admin/cars');
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-2xl font-bold mb-4">Add new car</h1>
      <form onSubmit={submit} className="grid gap-4">
        <input value={form.brand} onChange={(e) => setForm({ ...form, brand: e.target.value })} placeholder="Brand" className="rounded border px-3 py-2" />
        <input value={form.model} onChange={(e) => setForm({ ...form, model: e.target.value })} placeholder="Model" className="rounded border px-3 py-2" />
        <input value={form.plateNumber} onChange={(e) => setForm({ ...form, plateNumber: e.target.value })} placeholder="Plate number" className="rounded border px-3 py-2" />
        <input value={form.dailyPrice} onChange={(e) => setForm({ ...form, dailyPrice: e.target.value })} placeholder="Daily price" className="rounded border px-3 py-2" />
        <div className="flex gap-2">
          <button className="rounded bg-slate-900 text-white px-4 py-2">Create</button>
          <button type="button" onClick={() => router.back()} className="rounded border px-4 py-2">Cancel</button>
        </div>
      </form>
    </main>
  );
}
