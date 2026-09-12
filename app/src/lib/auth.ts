import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { prisma } from './prisma';

export type SessionUser = {
  id: string;
  email: string;
  role: string;
  name: string;
};

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret';

export function signToken(user: SessionUser) {
  return jwt.sign(user, JWT_SECRET, { expiresIn: '7d' });
}

export async function getCurrentUser(): Promise<SessionUser | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get('city_rides_session')?.value;

  if (!token) return null;

  try {
    const payload = jwt.verify(token, JWT_SECRET) as SessionUser;
    const user = await prisma.user.findUnique({
      where: { id: payload.id },
      select: { id: true, email: true, role: true, name: true },
    });

    if (!user) return null;
    return user;
  } catch {
    return null;
  }
}

export async function requireCustomer() {
  const user = await getCurrentUser();
  if (!user || user.role !== 'CUSTOMER') {
    throw new Error('Unauthorized');
  }
  return user;
}

export async function requireAdmin() {
  const user = await getCurrentUser();
  if (!user || user.role !== 'ADMIN') {
    throw new Error('Unauthorized');
  }
  return user;
}
