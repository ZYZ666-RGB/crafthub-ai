import { notFound } from 'next/navigation';
import { PageHeader } from '@/components/page-header';
import { Badge } from '@/components/ui/badge';
import { getGeneration } from '@/server/actions/generations';
import { CancelGenerationButton } from '@/components/generations/cancel-button';

interface Props {
  params: Promise<{ generationId: string }>;
}

export default async function GenerationDetailPage({ params }: Props) {
  const { generationId } = await params;
  const generation = await getGeneration(generationId);

  if (!generation) {
    notFound();
  }

  const parameters = JSON.parse(generation.parameters) as Record<string, unknown>;
  const resultUrls = JSON.parse(generation.resultUrls) as string[];

  return (
    <div className="space-y-6">
      <PageHeader title="Generation Details">
        <Badge variant="outline">{generation.status}</Badge>
        {(generation.status === 'QUEUED' || generation.status === 'RUNNING') && (
          <CancelGenerationButton generationId={generation.id} />
        )}
      </PageHeader>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-4">
          <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
            <h3 className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Prompt</h3>
            <p className="mt-2 text-sm text-zinc-900 dark:text-zinc-50">{generation.prompt}</p>
          </div>

          {generation.negativePrompt && (
            <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
              <h3 className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Negative Prompt</h3>
              <p className="mt-2 text-sm text-zinc-900 dark:text-zinc-50">{generation.negativePrompt}</p>
            </div>
          )}

          <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
            <h3 className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Details</h3>
            <dl className="mt-2 space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-zinc-500">Model</dt>
                <dd className="text-zinc-900 dark:text-zinc-50">{generation.model?.name || 'Unknown'}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-zinc-500">Provider</dt>
                <dd className="text-zinc-900 dark:text-zinc-50">{generation.provider || 'mock'}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-zinc-500">Created</dt>
                <dd className="text-zinc-900 dark:text-zinc-50">{new Date(generation.createdAt).toLocaleString()}</dd>
              </div>
              {Object.entries(parameters).map(([key, value]) => (
                <div key={key} className="flex justify-between">
                  <dt className="text-zinc-500 capitalize">{key}</dt>
                  <dd className="text-zinc-900 dark:text-zinc-50">{String(value)}</dd>
                </div>
              ))}
            </dl>
          </div>

          {generation.errorMessage && (
            <div className="rounded-xl border border-red-200 bg-red-50 p-6 dark:border-red-900/50 dark:bg-red-950/20">
              <h3 className="text-sm font-medium text-red-600 dark:text-red-400">Error</h3>
              <p className="mt-2 text-sm text-red-700 dark:text-red-300">{generation.errorMessage}</p>
            </div>
          )}
        </div>

        <div>
          {resultUrls.length > 0 && (
            <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
              <h3 className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Results</h3>
              <div className="mt-4 grid gap-4">
                {resultUrls.map((url, i) => (
                  <div key={i} className="overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-700">
                    <img src={url} alt={`Result ${i + 1}`} className="w-full" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
