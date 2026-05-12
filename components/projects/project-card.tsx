import Link from 'next/link';
import { FolderKanban, MessageSquareText, Sparkles, Image } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface ProjectCardProps {
  project: {
    id: string;
    name: string;
    description: string | null;
    visibility: string;
    createdAt: Date;
    _count: {
      prompts: number;
      generations: number;
      assets: number;
    };
  };
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link href={`/app/projects/${project.id}`}>
      <Card className="group border-zinc-200 transition-all hover:border-violet-300 hover:shadow-md dark:border-zinc-800 dark:hover:border-violet-700">
        <CardContent className="p-5">
          <div className="flex items-start justify-between">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-100 dark:bg-violet-900/20">
              <FolderKanban className="h-5 w-5 text-violet-600 dark:text-violet-400" />
            </div>
            <Badge variant="outline" className="text-xs">
              {project.visibility.toLowerCase()}
            </Badge>
          </div>
          <h3 className="mt-3 text-base font-semibold text-zinc-900 group-hover:text-violet-700 dark:text-zinc-50 dark:group-hover:text-violet-300">
            {project.name}
          </h3>
          {project.description && (
            <p className="mt-1 line-clamp-2 text-sm text-zinc-500 dark:text-zinc-400">
              {project.description}
            </p>
          )}
          <div className="mt-4 flex items-center gap-4 text-xs text-zinc-400 dark:text-zinc-500">
            <span className="flex items-center gap-1">
              <MessageSquareText className="h-3 w-3" />
              {project._count.prompts}
            </span>
            <span className="flex items-center gap-1">
              <Sparkles className="h-3 w-3" />
              {project._count.generations}
            </span>
            <span className="flex items-center gap-1">
              <Image className="h-3 w-3" />
              {project._count.assets}
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
