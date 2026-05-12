'use client';

import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';
import { MobileSidebar } from '@/components/layout/mobile-sidebar';

export function AppHeader() {
  return (
    <header className="flex h-16 items-center justify-between border-b border-zinc-200 bg-white/80 px-6 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-950/80">
      <div className="flex items-center gap-3">
        <MobileSidebar />
        <h2 className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Workspace</h2>
      </div>
      <div className="flex items-center gap-2">
        <ThemeToggle />
        <Button variant="ghost" size="sm" className="gap-2">
          <div className="h-6 w-6 rounded-full bg-gradient-to-br from-violet-400 to-indigo-500" />
          <span className="hidden text-sm sm:inline">User</span>
        </Button>
      </div>
    </header>
  );
}
