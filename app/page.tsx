export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-zinc-950 dark:to-zinc-900">
      <main className="flex flex-col items-center gap-8 px-6 text-center">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 text-white font-bold text-xl shadow-lg">
            C
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            CraftHub AI
          </h1>
        </div>
        <p className="max-w-lg text-lg text-zinc-600 dark:text-zinc-400">
          AI-powered creative productivity platform. Create projects, manage prompts, explore
          models, and generate assets — all in one workspace.
        </p>
        <div className="flex gap-4">
          <span className="rounded-full bg-violet-100 px-4 py-1.5 text-sm font-medium text-violet-700 dark:bg-violet-900/30 dark:text-violet-300">
            Next.js 16
          </span>
          <span className="rounded-full bg-indigo-100 px-4 py-1.5 text-sm font-medium text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300">
            TypeScript
          </span>
          <span className="rounded-full bg-sky-100 px-4 py-1.5 text-sm font-medium text-sky-700 dark:bg-sky-900/30 dark:text-sky-300">
            Tailwind CSS
          </span>
        </div>
      </main>
    </div>
  );
}
