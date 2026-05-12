import Link from 'next/link';
import { Boxes, Star, Image, Video, AudioLines, Type } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const categoryIcons = {
  IMAGE: Image,
  VIDEO: Video,
  AUDIO: AudioLines,
  TEXT: Type,
};

interface ModelCardProps {
  model: {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    provider: string;
    category: string;
    isFeatured: boolean;
  };
}

export function ModelCard({ model }: ModelCardProps) {
  const CategoryIcon = categoryIcons[model.category as keyof typeof categoryIcons] || Boxes;

  return (
    <Link href={`/app/models/${model.slug}`}>
      <Card className="group border-zinc-200 transition-all hover:border-violet-300 hover:shadow-md dark:border-zinc-800 dark:hover:border-violet-700">
        <CardContent className="p-5">
          <div className="flex items-start justify-between">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sky-100 dark:bg-sky-900/20">
              <CategoryIcon className="h-5 w-5 text-sky-600 dark:text-sky-400" />
            </div>
            {model.isFeatured && (
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
            )}
          </div>
          <h3 className="mt-3 text-sm font-semibold text-zinc-900 group-hover:text-violet-700 dark:text-zinc-50 dark:group-hover:text-violet-300">
            {model.name}
          </h3>
          {model.description && (
            <p className="mt-1 line-clamp-2 text-xs text-zinc-500 dark:text-zinc-400">
              {model.description}
            </p>
          )}
          <div className="mt-3 flex items-center gap-2">
            <Badge variant="outline" className="text-[10px]">
              {model.category.toLowerCase()}
            </Badge>
            <Badge variant="outline" className="text-[10px]">
              {model.provider}
            </Badge>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
