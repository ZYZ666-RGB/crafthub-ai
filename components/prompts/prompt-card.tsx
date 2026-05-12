import Link from 'next/link';
import { MessageSquareText, Copy } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface PromptCardProps {
  prompt: {
    id: string;
    title: string;
    content: string;
    tags: string;
    project: { id: string; name: string } | null;
    createdAt: Date;
  };
}

export function PromptCard({ prompt }: PromptCardProps) {
  const tags = JSON.parse(prompt.tags) as string[];

  return (
    <Link href={`/app/prompts/${prompt.id}`}>
      <Card className="group border-zinc-200 transition-all hover:border-violet-300 hover:shadow-md dark:border-zinc-800 dark:hover:border-violet-700">
        <CardContent className="p-5">
          <div className="flex items-start justify-between">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-100 dark:bg-indigo-900/20">
              <MessageSquareText className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
            </div>
            <Copy className="h-4 w-4 text-zinc-300 opacity-0 transition-opacity group-hover:opacity-100 dark:text-zinc-600" />
          </div>
          <h3 className="mt-3 text-sm font-semibold text-zinc-900 dark:text-zinc-50">
            {prompt.title}
          </h3>
          <p className="mt-1 line-clamp-2 text-xs text-zinc-500 dark:text-zinc-400">
            {prompt.content}
          </p>
          {tags.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1">
              {tags.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="outline" className="text-[10px]">
                  {tag}
                </Badge>
              ))}
              {tags.length > 3 && (
                <Badge variant="outline" className="text-[10px]">
                  +{tags.length - 3}
                </Badge>
              )}
            </div>
          )}
          {prompt.project && (
            <p className="mt-2 text-[10px] text-zinc-400 dark:text-zinc-500">
              {prompt.project.name}
            </p>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
