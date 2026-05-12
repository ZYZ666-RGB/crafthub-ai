import Link from 'next/link';
import { Image as ImageIcon, Video, AudioLines, FileText } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const typeIcons = {
  IMAGE: ImageIcon,
  VIDEO: Video,
  AUDIO: AudioLines,
  DOCUMENT: FileText,
};

interface AssetCardProps {
  asset: {
    id: string;
    name: string;
    url: string;
    type: string;
    tags: string;
    project: { id: string; name: string } | null;
    createdAt: Date;
  };
}

export function AssetCard({ asset }: AssetCardProps) {
  const TypeIcon = typeIcons[asset.type as keyof typeof typeIcons] || ImageIcon;
  const tags = JSON.parse(asset.tags) as string[];

  return (
    <Link href={`/app/assets/${asset.id}`}>
      <Card className="group overflow-hidden border-zinc-200 transition-all hover:border-violet-300 hover:shadow-md dark:border-zinc-800 dark:hover:border-violet-700">
        {asset.type === 'IMAGE' && (
          <div className="aspect-square w-full overflow-hidden bg-zinc-100 dark:bg-zinc-800">
            <img
              src={asset.url}
              alt={asset.name}
              className="h-full w-full object-cover transition-transform group-hover:scale-105"
            />
          </div>
        )}
        <CardContent className="p-4">
          <div className="flex items-center gap-2">
            <TypeIcon className="h-4 w-4 text-zinc-400" />
            <h3 className="truncate text-sm font-medium text-zinc-900 dark:text-zinc-50">
              {asset.name}
            </h3>
          </div>
          {tags.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1">
              {tags.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="outline" className="text-[10px]">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
          {asset.project && (
            <p className="mt-2 text-[10px] text-zinc-400">{asset.project.name}</p>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
