# CraftHub AI

AI-powered creative productivity platform. Create projects, manage prompts, explore models, and generate assets — all in one workspace.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **Database**: MySQL + Prisma ORM
- **Auth**: NextAuth.js
- **Validation**: Zod
- **Forms**: React Hook Form
- **Testing**: Vitest + Playwright
- **CI/CD**: GitHub Actions

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

# Start development server
npm run dev
```

### Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Run TypeScript type checking |
| `npm run test` | Run tests |
| `npm run format` | Format code with Prettier |

## Project Structure

```
crafthub-ai/
├── app/              # Next.js App Router pages
├── components/       # React components
│   └── ui/           # shadcn/ui components
├── lib/              # Utility functions
├── hooks/            # Custom React hooks
├── server/           # Server-side logic
├── prisma/           # Database schema and migrations
├── tests/            # Test files
├── docs/             # Documentation
└── public/           # Static assets
```

## Environment Variables

See `.env.example` for all required environment variables.

## License

MIT
