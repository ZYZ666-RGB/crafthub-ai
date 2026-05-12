import { Key } from 'lucide-react';
import { PageHeader } from '@/components/page-header';
import { EmptyState } from '@/components/empty-state';
import { getApiKeys } from '@/server/actions/api-keys';
import { AddApiKeyForm } from '@/components/settings/add-api-key-form';
import { ApiKeyList } from '@/components/settings/api-key-list';

export default async function ProvidersSettingsPage() {
  const apiKeys = await getApiKeys();

  return (
    <div className="space-y-6">
      <PageHeader
        title="Provider Settings"
        description="Manage your AI provider API keys"
      />

      <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-700 dark:border-amber-900/50 dark:bg-amber-950/30 dark:text-amber-400">
        <strong>Note:</strong> This is an MVP implementation. In production, use a proper secrets
        manager (AWS KMS, HashiCorp Vault, etc.) for API key storage.
      </div>

      <AddApiKeyForm />

      {apiKeys.length === 0 ? (
        <EmptyState
          icon={Key}
          title="No API keys configured"
          description="Add your provider API keys to use real AI models. The Mock provider works without any keys."
        />
      ) : (
        <ApiKeyList apiKeys={apiKeys} />
      )}
    </div>
  );
}
