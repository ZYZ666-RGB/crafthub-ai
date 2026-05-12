'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { db } from '@/lib/db';
import { requireUser } from '@/lib/auth-utils';

const createProjectSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  description: z.string().max(500).optional(),
  visibility: z.enum(['PRIVATE', 'TEAM', 'PUBLIC']).default('PRIVATE'),
});

const updateProjectSchema = createProjectSchema.partial();

export async function getProjects(search?: string, visibility?: string) {
  const user = await requireUser();

  try {
    const where: Record<string, unknown> = { ownerId: user.id };
    if (search) {
      where.name = { contains: search };
    }
    if (visibility && visibility !== 'ALL') {
      where.visibility = visibility;
    }

    return db.project.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      include: {
        _count: {
          select: { prompts: true, generations: true, assets: true },
        },
      },
    });
  } catch {
    return [];
  }
}

export async function getProject(projectId: string) {
  const user = await requireUser();

  const project = await db.project.findUnique({
    where: { id: projectId },
    include: {
      _count: {
        select: { prompts: true, generations: true, assets: true },
      },
    },
  });

  if (!project) return null;
  if (project.ownerId !== user.id && user.role !== 'ADMIN') return null;

  return project;
}

export async function createProject(data: z.infer<typeof createProjectSchema>) {
  const user = await requireUser();
  const validated = createProjectSchema.parse(data);

  const project = await db.project.create({
    data: {
      ...validated,
      ownerId: user.id,
    },
  });

  revalidatePath('/app/projects');
  return project;
}

export async function updateProject(
  projectId: string,
  data: z.infer<typeof updateProjectSchema>
) {
  const user = await requireUser();
  const validated = updateProjectSchema.parse(data);

  const project = await db.project.findUnique({ where: { id: projectId } });
  if (!project) throw new Error('Project not found');
  if (project.ownerId !== user.id && user.role !== 'ADMIN') {
    throw new Error('Unauthorized');
  }

  const updated = await db.project.update({
    where: { id: projectId },
    data: validated,
  });

  revalidatePath('/app/projects');
  revalidatePath(`/app/projects/${projectId}`);
  return updated;
}

export async function deleteProject(projectId: string) {
  const user = await requireUser();

  const project = await db.project.findUnique({ where: { id: projectId } });
  if (!project) throw new Error('Project not found');
  if (project.ownerId !== user.id && user.role !== 'ADMIN') {
    throw new Error('Unauthorized');
  }

  await db.project.delete({ where: { id: projectId } });

  revalidatePath('/app/projects');
}
