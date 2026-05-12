import { FolderKanban } from 'lucide-react';
import { PageHeader } from '@/components/page-header';
import { EmptyState } from '@/components/empty-state';
import { ProjectCard } from '@/components/projects/project-card';
import { CreateProjectDialog } from '@/components/projects/create-project-dialog';
import { getProjects } from '@/server/actions/projects';

interface Props {
  searchParams: Promise<{ search?: string; visibility?: string }>;
}

export default async function ProjectsPage({ searchParams }: Props) {
  const params = await searchParams;
  const projects = await getProjects(params.search, params.visibility);

  return (
    <div className="space-y-6">
      <PageHeader title="Projects" description="Manage your creative projects">
        <CreateProjectDialog />
      </PageHeader>

      {projects.length === 0 ? (
        <EmptyState
          icon={FolderKanban}
          title="No projects yet"
          description="Create your first project to start organizing your creative work."
        >
          <CreateProjectDialog />
        </EmptyState>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}
