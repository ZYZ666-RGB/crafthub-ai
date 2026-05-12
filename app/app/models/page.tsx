import { Boxes } from 'lucide-react';
import { PageHeader } from '@/components/page-header';
import { EmptyState } from '@/components/empty-state';
import { ModelCard } from '@/components/models/model-card';
import { getModels } from '@/server/actions/models';

interface Props {
  searchParams: Promise<{ search?: string; category?: string; provider?: string }>;
}

export default async function ModelsPage({ searchParams }: Props) {
  const params = await searchParams;
  const models = await getModels(params.search, params.category, params.provider);

  return (
    <div className="space-y-6">
      <PageHeader title="Model Marketplace" description="Browse and discover AI models" />

      {models.length === 0 ? (
        <EmptyState
          icon={Boxes}
          title="No models available"
          description="Models will appear here once they are added by an administrator."
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {models.map((model) => (
            <ModelCard key={model.id} model={model} />
          ))}
        </div>
      )}
    </div>
  );
}
