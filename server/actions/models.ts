'use server';

import { db } from '@/lib/db';
import { requireUser, requireAdmin } from '@/lib/auth-utils';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

export async function getModels(search?: string, category?: string, provider?: string) {
  try {
    const where: Record<string, unknown> = {};
    if (search) {
      where.OR = [
        { name: { contains: search } },
        { description: { contains: search } },
      ];
    }
    if (category && category !== 'ALL') {
      where.category = category;
    }
    if (provider && provider !== 'ALL') {
      where.provider = provider;
    }

    return db.aiModel.findMany({
      where,
      orderBy: [{ isFeatured: 'desc' }, { createdAt: 'desc' }],
    });
  } catch {
    return [];
  }
}

export async function getModelBySlug(slug: string) {
  return db.aiModel.findUnique({ where: { slug } });
}

const createModelSchema = z.object({
  name: z.string().min(1).max(100),
  slug: z.string().min(1).max(100),
  description: z.string().max(1000).optional(),
  provider: z.string().min(1),
  category: z.enum(['IMAGE', 'VIDEO', 'AUDIO', 'TEXT']),
  isFeatured: z.boolean().default(false),
  parameters: z.string().default('{}'),
});

export async function createModel(data: z.infer<typeof createModelSchema>) {
  await requireAdmin();
  const validated = createModelSchema.parse(data);

  const model = await db.aiModel.create({ data: validated });
  revalidatePath('/app/models');
  return model;
}

export async function deleteModel(modelId: string) {
  await requireAdmin();
  await db.aiModel.delete({ where: { id: modelId } });
  revalidatePath('/app/models');
}

export async function toggleFavorite(targetType: 'MODEL' | 'ASSET' | 'PROMPT', targetId: string) {
  const user = await requireUser();

  const existing = await db.favorite.findUnique({
    where: {
      userId_targetType_targetId: {
        userId: user.id,
        targetType,
        targetId,
      },
    },
  });

  if (existing) {
    await db.favorite.delete({ where: { id: existing.id } });
    return { favorited: false };
  } else {
    await db.favorite.create({
      data: { userId: user.id, targetType, targetId },
    });
    return { favorited: true };
  }
}

export async function isFavorited(targetType: 'MODEL' | 'ASSET' | 'PROMPT', targetId: string) {
  const user = await requireUser();
  const fav = await db.favorite.findUnique({
    where: {
      userId_targetType_targetId: {
        userId: user.id,
        targetType,
        targetId,
      },
    },
  });
  return !!fav;
}
