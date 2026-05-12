# Deployment Guide

## Vercel Deployment

1. Push your code to GitHub
2. Import the repository in [Vercel](https://vercel.com)
3. Set environment variables in Vercel dashboard
4. Deploy

### Required Environment Variables

```
DATABASE_URL=mysql://user:pass@host:3306/crafthub_ai
NEXTAUTH_URL=https://your-domain.vercel.app
NEXTAUTH_SECRET=<generate with: openssl rand -base64 32>
GITHUB_ID=<from GitHub OAuth App>
GITHUB_SECRET=<from GitHub OAuth App>
ENCRYPTION_KEY=<32+ character random string>
```

## Database Setup

### Option 1: PlanetScale (Recommended for Vercel)
- Create a database at planetscale.com
- Use the connection string as DATABASE_URL

### Option 2: Railway
- Create a MySQL service at railway.app
- Copy the connection string

### Option 3: Self-hosted
- Install MySQL 8.0+
- Create database: `CREATE DATABASE crafthub_ai;`
- Run migrations: `npx prisma db push`

## Post-Deployment

```bash
# Push schema to production database
npx prisma db push

# Optionally seed with demo data
npm run db:seed
```

## Production Considerations

- [ ] Replace Credentials auth with OAuth-only
- [ ] Use proper secrets manager (AWS KMS / Vault) for API keys
- [ ] Add rate limiting
- [ ] Add proper job queue for generation tasks
- [ ] Add file storage (S3/R2) for real asset uploads
- [ ] Add monitoring and error tracking (Sentry)
- [ ] Configure CDN for static assets
