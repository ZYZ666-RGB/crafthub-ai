'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { db } from '@/lib/db';
import { requireUser } from '@/lib/auth-utils';

const createPromptSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100),
  content: z.string().min(1, 'Content is required').max(4000),
  negativePrompt: z.string().max(2000).optional(),
  tags: z.array(z.string()).max(10).default([]),
  projectId: z.string().optional(),
});

const updatePromptSchema = createPromptSchema.partial();

export async function getPrompts(search?: string, tag?: string, projectId?: string) {
  const user = await requireUser();

  try {
    const where: Record<string, unknown> = { ownerId: user.id };
    if (search) {
      where.OR = [
        { title: { contains: search } },
        { content: { contains: search } },
      ];
    }
    if (projectId) {
      where.projectId = projectId;
    }

    const prompts = await db.prompt.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      include: { project: { select: { id: true, name: true } } },
    });

    if (tag) {
      return prompts.filter((p) => {
        const tags = JSON.parse(p.tags) as string[];
        return tags.includes(tag);
      });
    }

    return prompts;
  } catch {
    return [];
  }
}

export async function getPrompt(promptId: string) {
  const user = await requireUser();

  const prompt = await db.prompt.findUnique({
    where: { id: promptId },
    include: { project: { select: { id: true, name: true } } },
  });

  if (!prompt) return null;
  if (prompt.ownerId !== user.id && user.role !== 'ADMIN') return null;

  return prompt;
}

export async function createPrompt(data: z.infer<typeof createPromptSchema>) {
  const user = await requireUser();
  const validated = createPromptSchema.parse(data);

  const prompt = await db.prompt.create({
    data: {
      title: validated.title,
      content: validated.content,
      negativePrompt: validated.negativePrompt,
      tags: JSON.stringify(validated.tags),
      projectId: validated.projectId || null,
      ownerId: user.id,
    },
  });

  revalidatePath('/app/prompts');
  return prompt;
}

export async function updatePrompt(
  promptId: string,
  data: z.infer<typeof updatePromptSchema>
) {
  const user = await requireUser();
  const validated = updatePromptSchema.parse(data);

  const prompt = await db.prompt.findUnique({ where: { id: promptId } });
  if (!prompt) throw new Error('Prompt not found');
  if (prompt.ownerId !== user.id && user.role !== 'ADMIN') {
    throw new Error('Unauthorized');
  }

  const updateData: Record<string, unknown> = {};
  if (validated.title !== undefined) updateData.title = validated.title;
  if (validated.content !== undefined) updateData.content = validated.content;
  if (validated.negativePrompt !== undefined) updateData.negativePrompt = validated.negativePrompt;
  if (validated.tags !== undefined) updateData.tags = JSON.stringify(validated.tags);
  if (validated.projectId !== undefined) updateData.projectId = validated.projectId || null;

  const updated = await db.prompt.update({
    where: { id: promptId },
    data: updateData,
  });

  revalidatePath('/app/prompts');
  return updated;
}

export async function deletePrompt(promptId: string) {
  const user = await requireUser();

  const prompt = await db.prompt.findUnique({ where: { id: promptId } });
  if (!prompt) throw new Error('Prompt not found');
  if (prompt.ownerId !== user.id && user.role !== 'ADMIN') {
    throw new Error('Unauthorized');
  }

  await db.prompt.delete({ where: { id: promptId } });
  revalidatePath('/app/prompts');
}
