import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Boxes } from 'lucide-react';
import { PageHeader } from '@/components/page-header';
import { Badge } from '@/components/ui/badge';
import { getModelBySlug } from '@/server/actions/models';

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function ModelDetailPage({ params }: Props) {
  const { slug } = await params;
  const model = await getModelBySlug(slug);

  if (!model) {
    notFound();
  }

  const parameters = JSON.parse(model.parameters) as Record<string, unknown>;

  return (
    <div className="space-y-6">
      <PageHeader title={model.name} description={model.description || undefined}>
        <Badge variant="outline">{model.category.toLowerCase()}</Badge>
        <Badge variant="outline">{model.provider}</Badge>
        {model.isFeatured && <Badge className="bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300">Featured</Badge>}
      </PageHeader>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
          <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-50">Parameters</h3>
          {Object.keys(parameters).length > 0 ? (
            <dl className="mt-4 space-y-3">
              {Object.entries(parameters).map(([key, value]) => (
                <div key={key}>
                  <dt className="text-sm font-medium text-zinc-500 dark:text-zinc-400 capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </dt>
                  <dd className="mt-0.5 text-sm text-zinc-900 dark:text-zinc-50">
                    {JSON.stringify(value)}
                  </dd>
                </div>
              ))}
            </dl>
          ) : (
            <p className="mt-4 text-sm text-zinc-500">No configurable parameters.</p>
          )}
        </div>

        <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
          <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-50">Quick Start</h3>
          <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
            Use this model to generate content. Select it when creating a new generation task.
          </p>
          <Link
            href="/app/generations"
            className="mt-4 inline-flex h-9 items-center justify-center rounded-lg bg-violet-600 px-4 text-sm font-medium text-white hover:bg-violet-700"
          >
            <Boxes className="mr-2 h-4 w-4" />
            Generate with this model
          </Link>
        </div>
      </div>
    </div>
  );
}
