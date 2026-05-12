import { Image } from 'lucide-react';
import { PageHeader } from '@/components/page-header';
import { EmptyState } from '@/components/empty-state';
import { AssetCard } from '@/components/assets/asset-card';
import { getAssets } from '@/server/actions/assets';

interface Props {
  searchParams: Promise<{ search?: string; type?: string; projectId?: string }>;
}

export default async function AssetsPage({ searchParams }: Props) {
  const params = await searchParams;
  const assets = await getAssets(params.search, params.type, params.projectId);

  return (
    <div className="space-y-6">
      <PageHeader title="Assets" description="Browse your generated and uploaded assets" />

      {assets.length === 0 ? (
        <EmptyState
          icon={Image}
          title="No assets yet"
          description="Assets will appear here after successful generations or manual uploads."
        />
      ) : (
        <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {assets.map((asset) => (
            <AssetCard key={asset.id} asset={asset} />
          ))}
        </div>
      )}
    </div>
  );
}
