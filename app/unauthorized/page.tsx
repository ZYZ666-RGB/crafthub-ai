import Link from 'next/link';
import { ShieldX } from 'lucide-react';

export default function UnauthorizedPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 px-4 dark:bg-zinc-950">
      <div className="text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
          <ShieldX className="h-8 w-8 text-red-600 dark:text-red-400" />
        </div>
        <h1 className="mt-4 text-2xl font-bold text-zinc-900 dark:text-zinc-50">
          Access Denied
        </h1>
        <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
          You don&apos;t have permission to access this page.
        </p>
        <Link
          href="/app/dashboard"
          className="mt-6 inline-flex h-9 items-center justify-center rounded-lg bg-violet-600 px-4 text-sm font-medium text-white hover:bg-violet-700"
        >
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
}
