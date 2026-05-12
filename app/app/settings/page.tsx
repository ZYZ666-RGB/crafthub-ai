import Link from 'next/link';
import { Key, User, Palette } from 'lucide-react';
import { PageHeader } from '@/components/page-header';
import { Card, CardContent } from '@/components/ui/card';

const settingsItems = [
  {
    title: 'Provider Settings',
    description: 'Manage your AI provider API keys',
    href: '/app/settings/providers',
    icon: Key,
  },
  {
    title: 'Profile',
    description: 'Update your name, email, and avatar',
    href: '/app/settings/providers',
    icon: User,
  },
  {
    title: 'Appearance',
    description: 'Theme, language, and display preferences',
    href: '/app/settings/providers',
    icon: Palette,
  },
];

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Settings" description="Manage your account and preferences" />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {settingsItems.map((item) => (
          <Link key={item.title} href={item.href}>
            <Card className="group border-zinc-200 transition-all hover:border-violet-300 hover:shadow-md dark:border-zinc-800 dark:hover:border-violet-700">
              <CardContent className="p-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-800">
                  <item.icon className="h-5 w-5 text-zinc-600 dark:text-zinc-400" />
                </div>
                <h3 className="mt-4 text-base font-semibold text-zinc-900 group-hover:text-violet-700 dark:text-zinc-50 dark:group-hover:text-violet-300">
                  {item.title}
                </h3>
                <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                  {item.description}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
