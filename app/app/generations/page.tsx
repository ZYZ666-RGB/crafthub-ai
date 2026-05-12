import { Sparkles } from 'lucide-react';
import { PageHeader } from '@/components/page-header';
import { EmptyState } from '@/components/empty-state';
import { GenerationCard } from '@/components/generations/generation-card';
import { getGenerations } from '@/server/actions/generations';

interface Props {
  searchParams: Promise<{ status?: string }>;
}

export default async function GenerationsPage({ searchParams }: Props) {
  const params = await searchParams;
  const generations = await getGenerations(params.status);

  return (
    <div className="space-y-6">
      <PageHeader title="Generations" description="Track your AI generation tasks" />

      {generations.length === 0 ? (
        <EmptyState
          icon={Sparkles}
          title="No generations yet"
          description="Submit your first generation task to see results here."
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {generations.map((generation) => (
            <GenerationCard key={generation.id} generation={generation} />
          ))}
        </div>
      )}
    </div>
  );
}
