import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';
import { initFirebaseAdmin } from '@/lib/firebaseAdmin';

const createBookingSchema = z.object({
  userId: z.string().optional(),
  carId: z.string(),
  pickupLocationId: z.string().optional(),
  returnLocationId: z.string().optional(),
  pickupDateTime: z.string(),
  returnDateTime: z.string(),
  rentalDays: z.number().int().optional(),
  subtotal: z.number(),
  taxes: z.number().optional(),
  additionalCharges: z.number().optional(),
  deposit: z.number().optional(),
  discount: z.number().optional(),
  total: z.number(),
});

async function getSessionUser(request: Request) {
  const cookieHeader = request.headers.get('cookie') || '';
  const match = cookieHeader.match(/(?:^|; )session=([^;]+)/);
  const session = match?.[1];
  if (!session) return null;

  try {
    initFirebaseAdmin();
    const admin = await import('firebase-admin');
    const decoded = await (admin as any).auth().verifySessionCookie(session, true);
    return decoded;
  } catch (e) {
    return null;
  }
}

export async function GET(request: Request) {
  const decoded = await getSessionUser(request);
  if (!decoded) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const isAdmin = decoded.role === 'ADMIN' || decoded.claims?.role === 'ADMIN';

  const whereClause = isAdmin ? {} : { userId: decoded.uid };

  const bookings = await prisma.booking.findMany({
    where: whereClause,
    include: { car: { include: { images: true } }, user: true },
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json(bookings);
}

export async function POST(request: Request) {
  const decoded = await getSessionUser(request);
  if (!decoded) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await request.json().catch(() => ({}));
  const parse = createBookingSchema.safeParse(body);
  if (!parse.success) {
    return NextResponse.json({ error: 'Invalid payload', details: parse.error.format() }, { status: 400 });
  }

  const data = parse.data;
  const userId = decoded.uid;

  try {
    const created = await prisma.booking.create({
      data: {
        userId,
        carId: data.carId,
        pickupLocationId: data.pickupLocationId || undefined,
        returnLocationId: data.returnLocationId || undefined,
        pickupDateTime: new Date(data.pickupDateTime),
        returnDateTime: new Date(data.returnDateTime),
        rentalDays: Number(data.rentalDays || 1),
        subtotal: Number(data.subtotal),
        taxes: Number(data.taxes || 0),
        additionalCharges: Number(data.additionalCharges || 0),
        deposit: Number(data.deposit || 0),
        discount: Number(data.discount || 0),
        total: Number(data.total),
        status: 'PENDING',
      },
      include: { car: true },
    });

    return NextResponse.json(created, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: 'Failed to create booking' }, { status: 500 });
  }
}
