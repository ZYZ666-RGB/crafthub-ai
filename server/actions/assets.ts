'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { db } from '@/lib/db';
import { requireUser } from '@/lib/auth-utils';

const createAssetSchema = z.object({
  name: z.string().min(1).max(200),
  url: z.string().url(),
  type: z.enum(['IMAGE', 'VIDEO', 'AUDIO', 'DOCUMENT']),
  projectId: z.string().optional(),
  tags: z.array(z.string()).max(10).default([]),
});

export async function getAssets(search?: string, type?: string, projectId?: string) {
  const user = await requireUser();

  const where: Record<string, unknown> = { ownerId: user.id };
  if (search) {
    where.name = { contains: search };
  }
  if (type && type !== 'ALL') {
    where.type = type;
  }
  if (projectId) {
    where.projectId = projectId;
  }

  return db.asset.findMany({
    where,
    orderBy: { createdAt: 'desc' },
    include: { project: { select: { id: true, name: true } } },
  });
}

export async function getAsset(assetId: string) {
  const user = await requireUser();

  const asset = await db.asset.findUnique({
    where: { id: assetId },
    include: { project: { select: { id: true, name: true } } },
  });

  if (!asset) return null;
  if (asset.ownerId !== user.id && user.role !== 'ADMIN') return null;

  return asset;
}

export async function createAsset(data: z.infer<typeof createAssetSchema>) {
  const user = await requireUser();
  const validated = createAssetSchema.parse(data);

  const asset = await db.asset.create({
    data: {
      name: validated.name,
      url: validated.url,
      type: validated.type,
      projectId: validated.projectId || null,
      ownerId: user.id,
      tags: JSON.stringify(validated.tags),
    },
  });

  revalidatePath('/app/assets');
  return asset;
}

export async function deleteAsset(assetId: string) {
  const user = await requireUser();

  const asset = await db.asset.findUnique({ where: { id: assetId } });
  if (!asset) throw new Error('Asset not found');
  if (asset.ownerId !== user.id && user.role !== 'ADMIN') {
    throw new Error('Unauthorized');
  }

  await db.asset.delete({ where: { id: assetId } });
  revalidatePath('/app/assets');
}
