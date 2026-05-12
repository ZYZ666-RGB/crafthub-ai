import { LucideIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  description?: string;
}

export function StatCard({ title, value, icon: Icon, description }: StatCardProps) {
  return (
    <Card className="border-zinc-200 dark:border-zinc-800">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">{title}</p>
            <p className="mt-1 text-2xl font-bold text-zinc-900 dark:text-zinc-50">{value}</p>
            {description && (
              <p className="mt-1 text-xs text-zinc-400 dark:text-zinc-500">{description}</p>
            )}
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-100 dark:bg-violet-900/20">
            <Icon className="h-5 w-5 text-violet-600 dark:text-violet-400" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
