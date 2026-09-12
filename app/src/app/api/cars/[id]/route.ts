import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const car = await prisma.car.findUnique({ where: { id }, include: { images: true } });
  if (!car) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(car);
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const body = await request.json();
  const updated = await prisma.car.update({ where: { id }, data: body, include: { images: true } });
  return NextResponse.json(updated);
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  await prisma.car.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
