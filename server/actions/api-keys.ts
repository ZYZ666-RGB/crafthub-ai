'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { db } from '@/lib/db';
import { requireUser } from '@/lib/auth-utils';
import { encryptSecret, maskApiKey } from '@/lib/encryption';

const createApiKeySchema = z.object({
  provider: z.string().min(1),
  apiKey: z.string().min(1),
});

export async function getApiKeys() {
  const user = await requireUser();

  try {
    const keys = await db.apiKey.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: 'desc' },
    });

    // Never return the actual encrypted key to the client
    return keys.map((key) => ({
      id: key.id,
      provider: key.provider,
      maskedKey: maskApiKey(key.encryptedKey.split(':').pop() || '****'),
      createdAt: key.createdAt,
      updatedAt: key.updatedAt,
    }));
  } catch {
    return [];
  }
}

export async function createApiKey(data: z.infer<typeof createApiKeySchema>) {
  const user = await requireUser();
  const validated = createApiKeySchema.parse(data);

  // Check if user already has a key for this provider
  const existing = await db.apiKey.findFirst({
    where: { userId: user.id, provider: validated.provider },
  });

  if (existing) {
    // Update existing key
    await db.apiKey.update({
      where: { id: existing.id },
      data: { encryptedKey: encryptSecret(validated.apiKey) },
    });
  } else {
    await db.apiKey.create({
      data: {
        userId: user.id,
        provider: validated.provider,
        encryptedKey: encryptSecret(validated.apiKey),
      },
    });
  }

  revalidatePath('/app/settings/providers');
}

export async function deleteApiKey(keyId: string) {
  const user = await requireUser();

  const key = await db.apiKey.findUnique({ where: { id: keyId } });
  if (!key) throw new Error('API key not found');
  if (key.userId !== user.id) throw new Error('Unauthorized');

  await db.apiKey.delete({ where: { id: keyId } });
  revalidatePath('/app/settings/providers');
}
