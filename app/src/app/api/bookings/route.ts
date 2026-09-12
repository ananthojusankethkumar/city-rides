import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const bookings = await prisma.booking.findMany({ include: { car: true, user: true } });
  return NextResponse.json(bookings);
}

export async function POST(request: Request) {
  const body = await request.json();
  const { userId, carId, pickupLocationId, returnLocationId, pickupDateTime, returnDateTime, rentalDays, subtotal, taxes, additionalCharges, deposit, discount, total } = body;

  const created = await prisma.booking.create({
    data: {
      userId,
      carId,
      pickupLocationId: pickupLocationId || undefined,
      returnLocationId: returnLocationId || undefined,
      pickupDateTime: new Date(pickupDateTime),
      returnDateTime: new Date(returnDateTime),
      rentalDays: Number(rentalDays),
      subtotal: Number(subtotal),
      taxes: Number(taxes),
      additionalCharges: Number(additionalCharges || 0),
      deposit: Number(deposit || 0),
      discount: Number(discount || 0),
      total: Number(total),
      status: 'PENDING',
    },
  });

  return NextResponse.json(created, { status: 201 });
}
