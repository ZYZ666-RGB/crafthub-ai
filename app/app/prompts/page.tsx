import { MessageSquareText } from 'lucide-react';
import { PageHeader } from '@/components/page-header';
import { EmptyState } from '@/components/empty-state';
import { PromptCard } from '@/components/prompts/prompt-card';
import { CreatePromptDialog } from '@/components/prompts/create-prompt-dialog';
import { getPrompts } from '@/server/actions/prompts';

interface Props {
  searchParams: Promise<{ search?: string; tag?: string; projectId?: string }>;
}

export default async function PromptsPage({ searchParams }: Props) {
  const params = await searchParams;
  const prompts = await getPrompts(params.search, params.tag, params.projectId);

  return (
    <div className="space-y-6">
      <PageHeader title="Prompts" description="Manage your prompt library">
        <CreatePromptDialog />
      </PageHeader>

      {prompts.length === 0 ? (
        <EmptyState
          icon={MessageSquareText}
          title="No prompts yet"
          description="Create your first prompt to start building your library."
        >
          <CreatePromptDialog />
        </EmptyState>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {prompts.map((prompt) => (
            <PromptCard key={prompt.id} prompt={prompt} />
          ))}
        </div>
      )}
    </div>
  );
}
