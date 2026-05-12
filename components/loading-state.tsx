export function LoadingState({ message = 'Loading...' }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-zinc-300 border-t-violet-600 dark:border-zinc-700 dark:border-t-violet-400" />
      <p className="mt-4 text-sm text-zinc-500 dark:text-zinc-400">{message}</p>
    </div>
  );
}
