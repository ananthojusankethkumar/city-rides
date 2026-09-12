import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

async function resolveIdFromCtx(ctx: any) {
  const params = ctx?.params ?? {};
  const resolved = params instanceof Promise ? await params : params;
  return resolved?.id;
}

export async function GET(request: Request, ctx: any) {
  const id = await resolveIdFromCtx(ctx);
  const car = await prisma.car.findUnique({ where: { id }, include: { images: true } });
  if (!car) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(car);
}

export async function PUT(request: Request, ctx: any) {
  const id = await resolveIdFromCtx(ctx);
  const body = await request.json();
  const updated = await prisma.car.update({ where: { id }, data: body, include: { images: true } });
  return NextResponse.json(updated);
}

export async function DELETE(request: Request, ctx: any) {
  const id = await resolveIdFromCtx(ctx);
  await prisma.car.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
