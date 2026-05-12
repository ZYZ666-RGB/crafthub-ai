# Architecture

## System Overview

CraftHub AI is a full-stack web application built with Next.js App Router. It follows a server-first architecture where data fetching and mutations happen on the server via Server Actions.

## Data Flow

```
Browser → Next.js App Router → Server Actions → Prisma → MySQL
                                     ↓
                              AI Provider Registry → Mock/Real Providers
```

## Key Design Decisions

### Server Actions over API Routes
- Colocation of data logic with UI
- Type-safe end-to-end
- Automatic revalidation

### Provider Abstraction
- `AiGenerationProvider` interface defines the contract
- `MockProvider` for development without real API keys
- Registry pattern for easy provider swapping
- Real providers (OpenAI, Replicate, etc.) can be added without changing business logic

### Permission Model
- Role-based: USER and ADMIN
- Resource ownership: users can only access their own data
- Admin override: admins can access all resources
- Middleware protects /app/* routes

### Encryption
- AES-256-GCM for API key storage
- Keys never exposed to frontend (masked display only)
- Encryption key from environment variable

## Database Schema

8 models with proper relations:
- User → Projects, Prompts, Generations, Assets, Favorites, ApiKeys
- Project → Prompts, Generations, Assets
- AiModel → Generations
- Generation → results stored as JSON URLs

## Task Queue (Simplified)

Current implementation uses a simplified polling approach:
1. User submits generation → status = QUEUED
2. Mock provider simulates time-based transitions
3. Frontend polls for status updates

Production improvement: use a proper job queue (BullMQ, Inngest, etc.)
