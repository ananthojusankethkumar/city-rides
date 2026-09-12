import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';
import { initFirebaseAdmin } from '@/lib/firebaseAdmin';

const updateCarSchema = z.object({
  brand: z.string().optional(),
  model: z.string().optional(),
  variant: z.string().optional(),
  year: z.number().int().optional(),
  plateNumber: z.string().optional(),
  description: z.string().optional(),
  dailyPrice: z.number().optional(),
  securityDeposit: z.number().optional(),
  fuelType: z.string().optional(),
  transmission: z.string().optional(),
  seats: z.number().optional(),
  mileage: z.number().optional(),
  features: z.string().optional(),
  status: z.string().optional(),
  availability: z.boolean().optional(),
  locationId: z.string().nullable().optional(),
});

async function resolveIdFromCtx(ctx: any) {
  const params = ctx?.params ?? {};
  const resolved = params instanceof Promise ? await params : params;
  return resolved?.id;
}

async function verifyAdminSession(request: Request) {
  const cookieHeader = request.headers.get('cookie') || '';
  const match = cookieHeader.match(/(?:^|; )session=([^;]+)/);
  const session = match?.[1];
  if (!session) return { error: 'Unauthorized', status: 401 };

  try {
    initFirebaseAdmin();
    const admin = await import('firebase-admin');
    const decoded = await (admin as any).auth().verifySessionCookie(session, true);
    if (decoded?.role !== 'ADMIN' && decoded?.claims?.role !== 'ADMIN') {
      return { error: 'Forbidden', status: 403 };
    }
    return { ok: true, decoded };
  } catch (e) {
    return { error: 'Invalid session', status: 401 };
  }
}

export async function GET(request: Request, ctx: any) {
  const id = await resolveIdFromCtx(ctx);
  if (!id) return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
  const car = await prisma.car.findUnique({ where: { id }, include: { images: true } });
  if (!car) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(car);
}

export async function PUT(request: Request, ctx: any) {
  const auth = await verifyAdminSession(request);
  if ('error' in auth) return NextResponse.json({ error: auth.error }, { status: auth.status });

  const id = await resolveIdFromCtx(ctx);
  if (!id) return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });

  const body = await request.json().catch(() => ({}));
  const parse = updateCarSchema.safeParse(body);
  if (!parse.success) {
    return NextResponse.json({ error: 'Invalid payload', details: parse.error.format() }, { status: 400 });
  }

  try {
    const updated = await prisma.car.update({
      where: { id },
      data: parse.data,
      include: { images: true },
    });
    return NextResponse.json(updated);
  } catch (e) {
    return NextResponse.json({ error: 'Failed to update car' }, { status: 500 });
  }
}

export async function DELETE(request: Request, ctx: any) {
  const auth = await verifyAdminSession(request);
  if ('error' in auth) return NextResponse.json({ error: auth.error }, { status: auth.status });

  const id = await resolveIdFromCtx(ctx);
  if (!id) return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });

  try {
    await prisma.car.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: 'Failed to delete car' }, { status: 500 });
  }
}
