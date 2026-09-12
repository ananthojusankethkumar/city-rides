import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';
import { initFirebaseAdmin } from '@/lib/firebaseAdmin';

const createCarSchema = z.object({
  brand: z.string(),
  model: z.string(),
  variant: z.string().optional().default('Standard'),
  year: z.number().int().optional().default(2024),
  plateNumber: z.string().optional().default(''),
  description: z.string().optional().default(''),
  dailyPrice: z.number(),
  securityDeposit: z.number().optional().default(0),
  fuelType: z.string().optional().default('Petrol'),
  transmission: z.string().optional().default('Automatic'),
  seats: z.number().int().optional().default(5),
  mileage: z.number().int().optional().default(0),
  features: z.union([z.string(), z.array(z.string())]).optional().default(''),
  status: z.string().optional().default('AVAILABLE'),
  availability: z.boolean().optional().default(true),
  locationId: z.string().nullable().optional(),
  images: z.array(z.string()).optional().default([]),
});

export async function GET() {
  const cars = await prisma.car.findMany({ include: { images: true } });
  return NextResponse.json(cars);
}

export async function POST(request: Request) {
  // Authorization: only admins can create cars
  const cookieHeader = request.headers.get('cookie') || '';
  const match = cookieHeader.match(/(?:^|; )session=([^;]+)/);
  const session = match?.[1];
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    initFirebaseAdmin();
    const admin = await import('firebase-admin');
    const decoded = await (admin as any).auth().verifySessionCookie(session, true);
    if (decoded?.role !== 'ADMIN' && decoded?.claims?.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }
  } catch (e) {
    return NextResponse.json({ error: 'Invalid session' }, { status: 401 });
  }

  const body = await request.json().catch(() => ({}));
  const parse = createCarSchema.safeParse(body);
  if (!parse.success) return NextResponse.json({ error: 'Invalid payload', details: parse.error.format() }, { status: 400 });
  const data = parse.data;

  const featuresStr = Array.isArray(data.features) ? data.features.join(', ') : data.features;

  const created = await prisma.car.create({
    data: {
      brand: data.brand,
      model: data.model,
      variant: data.variant,
      year: data.year,
      plateNumber: data.plateNumber || `${data.brand.slice(0,3).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`,
      description: data.description,
      dailyPrice: data.dailyPrice,
      securityDeposit: data.securityDeposit,
      fuelType: data.fuelType,
      transmission: data.transmission,
      seats: data.seats,
      mileage: data.mileage,
      features: featuresStr,
      status: data.status,
      availability: data.availability,
      locationId: data.locationId || undefined,
      images: {
        create: data.images.map((url: string) => ({ url })),
      },
    },
    include: { images: true },
  });

  return NextResponse.json(created, { status: 201 });
}
