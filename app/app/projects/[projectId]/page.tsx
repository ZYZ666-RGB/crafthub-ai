import { notFound } from 'next/navigation';
import { MessageSquareText, Sparkles, Image } from 'lucide-react';
import { PageHeader } from '@/components/page-header';
import { StatCard } from '@/components/stat-card';
import { Badge } from '@/components/ui/badge';
import { getProject } from '@/server/actions/projects';
import { DeleteProjectButton } from '@/components/projects/delete-project-button';

interface Props {
  params: Promise<{ projectId: string }>;
}

export default async function ProjectDetailPage({ params }: Props) {
  const { projectId } = await params;
  const project = await getProject(projectId);

  if (!project) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <PageHeader title={project.name} description={project.description || undefined}>
        <Badge variant="outline">{project.visibility.toLowerCase()}</Badge>
        <DeleteProjectButton projectId={project.id} />
      </PageHeader>

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard title="Prompts" value={project._count.prompts} icon={MessageSquareText} />
        <StatCard title="Generations" value={project._count.generations} icon={Sparkles} />
        <StatCard title="Assets" value={project._count.assets} icon={Image} />
      </div>

      <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
        <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-50">Project Details</h3>
        <dl className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <dt className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Created</dt>
            <dd className="mt-1 text-sm text-zinc-900 dark:text-zinc-50">
              {new Date(project.createdAt).toLocaleDateString()}
            </dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Visibility</dt>
            <dd className="mt-1 text-sm text-zinc-900 dark:text-zinc-50">{project.visibility}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
