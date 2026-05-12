import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { db } from '@/lib/db';

export async function getCurrentUser() {
  const session = await auth();
  if (!session?.user?.id) {
    return null;
  }
  return db.user.findUnique({
    where: { id: session.user.id },
  });
}

export async function requireUser() {
  const user = await getCurrentUser();
  if (!user) {
    redirect('/login');
  }
  return user;
}

export async function requireAdmin() {
  const user = await requireUser();
  if (user.role !== 'ADMIN') {
    redirect('/unauthorized');
  }
  return user;
}
