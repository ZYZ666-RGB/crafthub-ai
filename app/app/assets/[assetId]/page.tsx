import { notFound } from 'next/navigation';
import { Download } from 'lucide-react';
import { PageHeader } from '@/components/page-header';
import { Badge } from '@/components/ui/badge';
import { getAsset } from '@/server/actions/assets';

interface Props {
  params: Promise<{ assetId: string }>;
}

export default async function AssetDetailPage({ params }: Props) {
  const { assetId } = await params;
  const asset = await getAsset(assetId);

  if (!asset) {
    notFound();
  }

  const tags = JSON.parse(asset.tags) as string[];
  const metadata = JSON.parse(asset.metadata) as Record<string, unknown>;

  return (
    <div className="space-y-6">
      <PageHeader title={asset.name}>
        <Badge variant="outline">{asset.type.toLowerCase()}</Badge>
        <a
          href={asset.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-8 items-center justify-center rounded-lg bg-violet-600 px-3 text-sm font-medium text-white hover:bg-violet-700"
        >
          <Download className="mr-1 h-4 w-4" />
          Download
        </a>
      </PageHeader>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          {asset.type === 'IMAGE' && (
            <div className="overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800">
              <img src={asset.url} alt={asset.name} className="w-full" />
            </div>
          )}
          {asset.type !== 'IMAGE' && (
            <div className="flex h-64 items-center justify-center rounded-xl border border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900">
              <p className="text-sm text-zinc-500">Preview not available for {asset.type.toLowerCase()} files</p>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
            <h3 className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Details</h3>
            <dl className="mt-3 space-y-2 text-sm">
              <div>
                <dt className="text-zinc-500">Type</dt>
                <dd className="text-zinc-900 dark:text-zinc-50">{asset.type}</dd>
              </div>
              {asset.project && (
                <div>
                  <dt className="text-zinc-500">Project</dt>
                  <dd className="text-zinc-900 dark:text-zinc-50">{asset.project.name}</dd>
                </div>
              )}
              <div>
                <dt className="text-zinc-500">Created</dt>
                <dd className="text-zinc-900 dark:text-zinc-50">
                  {new Date(asset.createdAt).toLocaleDateString()}
                </dd>
              </div>
            </dl>
          </div>

          {tags.length > 0 && (
            <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
              <h3 className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Tags</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <Badge key={tag} variant="outline">{tag}</Badge>
                ))}
              </div>
            </div>
          )}

          {Object.keys(metadata).length > 0 && (
            <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
              <h3 className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Metadata</h3>
              <pre className="mt-3 overflow-auto rounded bg-zinc-100 p-3 text-xs dark:bg-zinc-900">
                {JSON.stringify(metadata, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
