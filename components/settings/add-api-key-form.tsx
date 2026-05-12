'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { createApiKey } from '@/server/actions/api-keys';

const providers = [
  { value: 'openai', label: 'OpenAI' },
  { value: 'replicate', label: 'Replicate' },
  { value: 'stability', label: 'Stability AI' },
  { value: 'custom', label: 'Custom HTTP' },
];

export function AddApiKeyForm() {
  const [provider, setProvider] = useState('openai');
  const [apiKey, setApiKey] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      await createApiKey({ provider, apiKey });
      setApiKey('');
      setMessage('API key saved successfully');
    } catch (error) {
      setMessage('Failed to save API key');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
      <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-50">Add API Key</h3>
      <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-end">
        <div className="flex-1">
          <label htmlFor="provider" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Provider
          </label>
          <select
            id="provider"
            value={provider}
            onChange={(e) => setProvider(e.target.value)}
            className="mt-1 block w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50"
          >
            {providers.map((p) => (
              <option key={p.value} value={p.value}>{p.label}</option>
            ))}
          </select>
        </div>
        <div className="flex-[2]">
          <label htmlFor="apiKey" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
            API Key
          </label>
          <input
            id="apiKey"
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            required
            className="mt-1 block w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50"
            placeholder="sk-..."
          />
        </div>
        <Button type="submit" disabled={loading}>
          <Plus className="mr-1 h-4 w-4" />
          {loading ? 'Saving...' : 'Save'}
        </Button>
      </form>
      {message && (
        <p className="mt-2 text-sm text-green-600 dark:text-green-400">{message}</p>
      )}
    </div>
  );
}
