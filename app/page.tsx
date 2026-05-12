import Link from 'next/link';
import { Sparkles, FolderKanban, Boxes, Image, Zap, Shield } from 'lucide-react';

const features = [
  {
    icon: FolderKanban,
    title: 'Project Workspace',
    description: 'Organize your creative work into projects with full CRUD management.',
  },
  {
    icon: Sparkles,
    title: 'AI Generation',
    description: 'Submit generation tasks with customizable parameters and track progress.',
  },
  {
    icon: Boxes,
    title: 'Model Marketplace',
    description: 'Browse and discover AI models across image, video, audio, and text.',
  },
  {
    icon: Image,
    title: 'Asset Library',
    description: 'Manage all your generated assets with tags, search, and favorites.',
  },
  {
    icon: Zap,
    title: 'Prompt Engineering',
    description: 'Create, organize, and reuse prompts with templates and tagging.',
  },
  {
    icon: Shield,
    title: 'Provider Abstraction',
    description: 'Connect multiple AI providers with encrypted API key management.',
  },
];

const workflow = [
  { step: '01', title: 'Create a Project', description: 'Set up your workspace' },
  { step: '02', title: 'Write Prompts', description: 'Craft your creative vision' },
  { step: '03', title: 'Choose a Model', description: 'Pick the right AI model' },
  { step: '04', title: 'Generate', description: 'Submit and watch the magic' },
];

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero */}
      <section className="flex flex-1 flex-col items-center justify-center px-6 py-24 text-center">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 text-white font-bold text-xl shadow-lg">
            C
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl">
            CraftHub AI
          </h1>
        </div>
        <p className="max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
          Your AI-powered creative productivity platform. Create projects, manage prompts, explore
          models, and generate stunning assets — all in one workspace.
        </p>
        <div className="mt-8 flex gap-4">
          <Link href="/app/dashboard" className="inline-flex h-9 items-center justify-center rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 px-4 text-sm font-medium text-white hover:from-violet-700 hover:to-indigo-700">
            Get Started
          </Link>
          <Link href="/app/models" className="inline-flex h-9 items-center justify-center rounded-lg border border-zinc-200 bg-white px-4 text-sm font-medium text-zinc-900 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 dark:hover:bg-zinc-900">
            Explore Models
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="border-t border-zinc-200 bg-zinc-50/50 px-6 py-24 dark:border-zinc-800 dark:bg-zinc-900/50">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center text-3xl font-bold text-zinc-900 dark:text-zinc-50">
            Everything you need to create
          </h2>
          <p className="mt-2 text-center text-zinc-500 dark:text-zinc-400">
            A complete toolkit for AI-powered creative workflows
          </p>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-xl border border-zinc-200 bg-white p-6 transition-shadow hover:shadow-md dark:border-zinc-800 dark:bg-zinc-950"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-100 dark:bg-violet-900/20">
                  <feature.icon className="h-5 w-5 text-violet-600 dark:text-violet-400" />
                </div>
                <h3 className="mt-4 text-base font-semibold text-zinc-900 dark:text-zinc-50">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Workflow */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-center text-3xl font-bold text-zinc-900 dark:text-zinc-50">
            Simple workflow
          </h2>
          <p className="mt-2 text-center text-zinc-500 dark:text-zinc-400">
            From idea to creation in four steps
          </p>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {workflow.map((item) => (
              <div key={item.step} className="text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 text-white font-bold">
                  {item.step}
                </div>
                <h3 className="mt-4 text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                  {item.title}
                </h3>
                <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-zinc-200 bg-gradient-to-r from-violet-600 to-indigo-600 px-6 py-16 text-center dark:border-zinc-800">
        <h2 className="text-2xl font-bold text-white sm:text-3xl">Ready to start creating?</h2>
        <p className="mt-2 text-violet-100">
          Jump into your workspace and bring your ideas to life.
        </p>
        <Link href="/app/dashboard" className="mt-6 inline-flex h-9 items-center justify-center rounded-lg bg-white px-4 text-sm font-medium text-violet-700 hover:bg-zinc-100">
          Open Workspace
        </Link>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-200 px-6 py-8 dark:border-zinc-800">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded bg-gradient-to-br from-violet-500 to-indigo-600 text-white text-xs font-bold">
              C
            </div>
            <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">CraftHub AI</span>
          </div>
          <p className="text-xs text-zinc-400 dark:text-zinc-500">
            Built with Next.js, Tailwind CSS, and shadcn/ui
          </p>
        </div>
      </footer>
    </div>
  );
}
