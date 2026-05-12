'use client';

import { useState } from 'react';
import { Trash2, Key } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { deleteApiKey } from '@/server/actions/api-keys';

interface ApiKeyItem {
  id: string;
  provider: string;
  maskedKey: string;
  createdAt: Date;
}

export function ApiKeyList({ apiKeys }: { apiKeys: ApiKeyItem[] }) {
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this API key?')) return;
    setDeletingId(id);
    try {
      await deleteApiKey(id);
    } catch (error) {
      console.error('Failed to delete:', error);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
      <div className="border-b border-zinc-200 px-6 py-4 dark:border-zinc-800">
        <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-50">Configured Keys</h3>
      </div>
      <div className="divide-y divide-zinc-200 dark:divide-zinc-800">
        {apiKeys.map((key) => (
          <div key={key.id} className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-800">
                <Key className="h-4 w-4 text-zinc-500" />
              </div>
              <div>
                <p className="text-sm font-medium capitalize text-zinc-900 dark:text-zinc-50">
                  {key.provider}
                </p>
                <p className="text-xs font-mono text-zinc-400">{key.maskedKey}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-zinc-400">
                {new Date(key.createdAt).toLocaleDateString()}
              </span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleDelete(key.id)}
                disabled={deletingId === key.id}
              >
                <Trash2 className="h-4 w-4 text-red-500" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
