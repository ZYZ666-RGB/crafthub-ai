import Link from 'next/link';
import { Sparkles, Clock, Play, CheckCircle, XCircle, Ban } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const statusConfig = {
  QUEUED: { icon: Clock, color: 'bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400', label: 'Queued' },
  RUNNING: { icon: Play, color: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400', label: 'Running' },
  SUCCEEDED: { icon: CheckCircle, color: 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400', label: 'Succeeded' },
  FAILED: { icon: XCircle, color: 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400', label: 'Failed' },
  CANCELED: { icon: Ban, color: 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400', label: 'Canceled' },
};

interface GenerationCardProps {
  generation: {
    id: string;
    prompt: string;
    status: string;
    createdAt: Date;
    model: { id: string; name: string; category: string } | null;
    project: { id: string; name: string } | null;
  };
}

export function GenerationCard({ generation }: GenerationCardProps) {
  const config = statusConfig[generation.status as keyof typeof statusConfig] || statusConfig.QUEUED;
  const StatusIcon = config.icon;

  return (
    <Link href={`/app/generations/${generation.id}`}>
      <Card className="group border-zinc-200 transition-all hover:border-violet-300 hover:shadow-md dark:border-zinc-800 dark:hover:border-violet-700">
        <CardContent className="p-5">
          <div className="flex items-start justify-between">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-100 dark:bg-violet-900/20">
              <Sparkles className="h-4 w-4 text-violet-600 dark:text-violet-400" />
            </div>
            <Badge className={config.color}>
              <StatusIcon className="mr-1 h-3 w-3" />
              {config.label}
            </Badge>
          </div>
          <p className="mt-3 line-clamp-2 text-sm text-zinc-900 dark:text-zinc-50">
            {generation.prompt}
          </p>
          <div className="mt-3 flex items-center gap-2 text-xs text-zinc-400 dark:text-zinc-500">
            {generation.model && <span>{generation.model.name}</span>}
            {generation.project && (
              <>
                <span>•</span>
                <span>{generation.project.name}</span>
              </>
            )}
          </div>
          <p className="mt-1 text-[10px] text-zinc-400 dark:text-zinc-500">
            {new Date(generation.createdAt).toLocaleString()}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
