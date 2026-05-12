import { notFound } from 'next/navigation';
import { PageHeader } from '@/components/page-header';
import { Badge } from '@/components/ui/badge';
import { getPrompt } from '@/server/actions/prompts';

interface Props {
  params: Promise<{ promptId: string }>;
}

export default async function PromptDetailPage({ params }: Props) {
  const { promptId } = await params;
  const prompt = await getPrompt(promptId);

  if (!prompt) {
    notFound();
  }

  const tags = JSON.parse(prompt.tags) as string[];

  return (
    <div className="space-y-6">
      <PageHeader title={prompt.title}>
        {prompt.project && (
          <Badge variant="outline">{prompt.project.name}</Badge>
        )}
      </PageHeader>

      <div className="space-y-4">
        <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
          <h3 className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Prompt</h3>
          <p className="mt-2 whitespace-pre-wrap text-sm text-zinc-900 dark:text-zinc-50">
            {prompt.content}
          </p>
        </div>

        {prompt.negativePrompt && (
          <div className="rounded-xl border border-red-200 bg-red-50/50 p-6 dark:border-red-900/50 dark:bg-red-950/20">
            <h3 className="text-sm font-medium text-red-600 dark:text-red-400">Negative Prompt</h3>
            <p className="mt-2 whitespace-pre-wrap text-sm text-zinc-700 dark:text-zinc-300">
              {prompt.negativePrompt}
            </p>
          </div>
        )}

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Badge key={tag} variant="outline">
                {tag}
              </Badge>
            ))}
          </div>
        )}

        <div className="text-xs text-zinc-400 dark:text-zinc-500">
          Created {new Date(prompt.createdAt).toLocaleDateString()}
        </div>
      </div>
    </div>
  );
}
