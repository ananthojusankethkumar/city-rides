import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const cars = await prisma.car.findMany({ include: { images: true } });
  return NextResponse.json(cars);
}

export async function POST(request: Request) {
  const body = await request.json();
  const {
    brand,
    model,
    variant,
    year,
    plateNumber,
    description,
    dailyPrice,
    securityDeposit,
    fuelType,
    transmission,
    seats,
    mileage,
    features,
    status = 'AVAILABLE',
    availability = true,
    locationId,
    images = [],
  } = body;

  const created = await prisma.car.create({
    data: {
      brand,
      model,
      variant,
      year,
      plateNumber,
      description,
      dailyPrice: Number(dailyPrice),
      securityDeposit: Number(securityDeposit),
      fuelType,
      transmission,
      seats: Number(seats),
      mileage: Number(mileage),
      features,
      status,
      availability: Boolean(availability),
      locationId: locationId || undefined,
      images: {
        create: (images || []).map((url: string) => ({ url })),
      },
    },
    include: { images: true },
  });

  return NextResponse.json(created, { status: 201 });
}
