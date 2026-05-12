'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { db } from '@/lib/db';
import { requireUser } from '@/lib/auth-utils';
import { getProvider } from '@/server/ai/registry';

const createGenerationSchema = z.object({
  prompt: z.string().min(1, 'Prompt is required').max(4000),
  negativePrompt: z.string().max(2000).optional(),
  modelId: z.string().min(1),
  projectId: z.string().optional(),
  provider: z.string().default('mock'),
  parameters: z.record(z.string(), z.unknown()).default({}),
});

export async function getGenerations(status?: string) {
  const user = await requireUser();

  const where: Record<string, unknown> = { ownerId: user.id };
  if (status && status !== 'ALL') {
    where.status = status;
  }

  return db.generation.findMany({
    where,
    orderBy: { createdAt: 'desc' },
    include: {
      model: { select: { id: true, name: true, category: true } },
      project: { select: { id: true, name: true } },
    },
  });
}

export async function getGeneration(generationId: string) {
  const user = await requireUser();

  const generation = await db.generation.findUnique({
    where: { id: generationId },
    include: {
      model: { select: { id: true, name: true, category: true, slug: true } },
      project: { select: { id: true, name: true } },
    },
  });

  if (!generation) return null;
  if (generation.ownerId !== user.id && user.role !== 'ADMIN') return null;

  return generation;
}

export async function createGeneration(data: z.infer<typeof createGenerationSchema>) {
  const user = await requireUser();
  const validated = createGenerationSchema.parse(data);

  const providerInstance = getProvider(validated.provider);
  if (!providerInstance) {
    throw new Error(`Provider "${validated.provider}" not found`);
  }

  const generation = await db.generation.create({
    data: {
      prompt: validated.prompt,
      negativePrompt: validated.negativePrompt,
      status: 'QUEUED',
      provider: validated.provider,
      modelId: validated.modelId,
      projectId: validated.projectId || null,
      ownerId: user.id,
      parameters: JSON.stringify(validated.parameters),
    },
  });

  // Submit to provider (fire and forget for now)
  providerInstance.submitGeneration({
    prompt: validated.prompt,
    negativePrompt: validated.negativePrompt,
    parameters: validated.parameters,
    modelId: validated.modelId,
  });

  revalidatePath('/app/generations');
  return generation;
}

export async function cancelGeneration(generationId: string) {
  const user = await requireUser();

  const generation = await db.generation.findUnique({ where: { id: generationId } });
  if (!generation) throw new Error('Generation not found');
  if (generation.ownerId !== user.id && user.role !== 'ADMIN') {
    throw new Error('Unauthorized');
  }

  if (generation.status !== 'QUEUED' && generation.status !== 'RUNNING') {
    throw new Error('Cannot cancel a completed generation');
  }

  await db.generation.update({
    where: { id: generationId },
    data: { status: 'CANCELED' },
  });

  revalidatePath('/app/generations');
}

export async function retryGeneration(generationId: string) {
  const user = await requireUser();

  const generation = await db.generation.findUnique({ where: { id: generationId } });
  if (!generation) throw new Error('Generation not found');
  if (generation.ownerId !== user.id && user.role !== 'ADMIN') {
    throw new Error('Unauthorized');
  }

  // Create a new generation with same params
  const newGeneration = await db.generation.create({
    data: {
      prompt: generation.prompt,
      negativePrompt: generation.negativePrompt,
      status: 'QUEUED',
      provider: generation.provider,
      modelId: generation.modelId,
      projectId: generation.projectId,
      ownerId: user.id,
      parameters: generation.parameters,
    },
  });

  revalidatePath('/app/generations');
  return newGeneration;
}
