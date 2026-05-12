# CraftHub AI

AI-powered creative productivity platform. Create projects, manage prompts, explore models, and generate assets — all in one workspace.

## Features

- **Project Workspace** — Organize creative work into projects with visibility controls
- **Prompt Library** — Create, tag, and reuse prompts with negative prompt support
- **Model Marketplace** — Browse AI models across image, video, audio, and text categories
- **Generation Queue** — Submit AI generation tasks and track status in real-time
- **Asset Library** — Manage generated assets with grid view, tags, and filtering
- **Provider Settings** — Connect multiple AI providers with encrypted API key storage
- **Authentication** — GitHub OAuth + credentials login with role-based permissions
- **Dark Mode** — Full light/dark theme support
- **Responsive** — Mobile-friendly with collapsible sidebar

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS 4 + shadcn/ui |
| Database | MySQL + Prisma 6 |
| Auth | NextAuth.js v5 |
| Validation | Zod 4 |
| Testing | Vitest + Testing Library |
| CI/CD | GitHub Actions |

## Getting Started

### Prerequisites

- Node.js 18.17+
- MySQL 8.0+
- npm 9+

### Installation

```bash
# Clone the repository
git clone https://github.com/ZYZ666-RGB/crafthub-ai.git
cd crafthub-ai

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local
# Edit .env.local with your values

# Generate Prisma client
npx prisma generate

# Push database schema
npx prisma db push

# Seed the database
npm run db:seed

# Start development server
npm run dev
```

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | MySQL connection string | Yes |
| `NEXTAUTH_URL` | App URL (http://localhost:3000) | Yes |
| `NEXTAUTH_SECRET` | Random secret for session encryption | Yes |
| `GITHUB_ID` | GitHub OAuth App ID | For GitHub login |
| `GITHUB_SECRET` | GitHub OAuth App Secret | For GitHub login |
| `ENCRYPTION_KEY` | 32+ char key for API key encryption | For provider settings |

### Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | TypeScript type checking |
| `npm run test` | Run unit tests |
| `npm run format` | Format code with Prettier |
| `npm run db:generate` | Generate Prisma client |
| `npm run db:migrate` | Run database migrations |
| `npm run db:push` | Push schema to database |
| `npm run db:seed` | Seed database with test data |
| `npm run db:studio` | Open Prisma Studio |

## Project Structure

```
crafthub-ai/
├── app/                    # Next.js App Router
│   ├── page.tsx            # Landing page
│   ├── login/              # Login page
│   ├── register/           # Registration page
│   ├── unauthorized/       # Access denied page
│   ├── api/auth/           # Auth API routes
│   └── app/                # Protected app routes
│       ├── dashboard/      # Dashboard with stats
│       ├── projects/       # Project CRUD
│       ├── prompts/        # Prompt management
│       ├── models/         # Model marketplace
│       ├── generations/    # Generation queue
│       ├── assets/         # Asset library
│       └── settings/       # Provider settings
├── components/             # React components
│   ├── ui/                 # shadcn/ui components
│   ├── layout/             # App shell (sidebar, header)
│   ├── projects/           # Project components
│   ├── prompts/            # Prompt components
│   ├── models/             # Model components
│   ├── generations/        # Generation components
│   ├── assets/             # Asset components
│   └── settings/           # Settings components
├── lib/                    # Utilities
│   ├── db.ts              # Prisma client singleton
│   ├── auth.ts            # NextAuth configuration
│   ├── auth-utils.ts      # Permission helpers
│   ├── encryption.ts      # AES-256-GCM encryption
│   └── utils.ts           # General utilities
├── server/                 # Server-side logic
│   ├── actions/            # Server Actions (CRUD)
│   └── ai/                # AI provider abstraction
│       ├── types.ts        # Provider interface
│       ├── registry.ts     # Provider registry
│       └── providers/      # Provider implementations
├── prisma/                 # Database
│   ├── schema.prisma      # Database schema
│   └── seed.ts            # Seed data
├── tests/                  # Test files
├── docs/                   # Documentation
├── .github/workflows/      # CI/CD
└── .env.example           # Environment template
```

## Development Workflow

This project follows a PR-based workflow with Conventional Commits:

- All features developed on feature branches
- PRs require lint, typecheck, test, and build to pass
- Squash merge to main
- 12 PRs merged during initial development

## License

MIT
