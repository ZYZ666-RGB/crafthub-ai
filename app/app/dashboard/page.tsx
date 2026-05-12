import { FolderKanban, Sparkles, Image, Boxes } from 'lucide-react';
import { PageHeader } from '@/components/page-header';
import { StatCard } from '@/components/stat-card';

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Dashboard"
        description="Overview of your creative workspace"
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Projects" value={4} icon={FolderKanban} description="+2 this week" />
        <StatCard title="Generations" value={28} icon={Sparkles} description="12 completed" />
        <StatCard title="Assets" value={56} icon={Image} description="3.2 GB used" />
        <StatCard title="Favorite Models" value={8} icon={Boxes} description="2 new" />
      </div>
    </div>
  );
}
