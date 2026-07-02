# Deployment Setup

The codebase is ready for a production-style Vercel deployment, but these external services must be configured by the repository owner.

## 1. Merge framework PRs

Merge the frontend framework PR first, then merge the backend platform PR.

## 2. Create PostgreSQL

Use one of:

- Vercel Postgres
- Neon
- Supabase

Copy the pooled production connection string into:

```txt
DATABASE_URL
```

## 3. Configure Auth.js

Create a GitHub OAuth App:

```txt
Homepage URL: https://fastvocabenlarge.vercel.app
Authorization callback URL: https://fastvocabenlarge.vercel.app/api/auth/callback/github
```

Set these Vercel environment variables:

```txt
AUTH_SECRET
AUTH_URL=https://fastvocabenlarge.vercel.app
GITHUB_CLIENT_ID
GITHUB_CLIENT_SECRET
```

Generate `AUTH_SECRET` locally:

```bash
openssl rand -base64 32
```

## 4. Configure AI API

When content generation begins, set:

```txt
OPENAI_API_KEY
```

Keep all AI calls server-side under `app/api/ai/*` or `lib/ai/*`.

## 5. Configure Sentry

Create a Sentry project for Next.js and set:

```txt
SENTRY_DSN
NEXT_PUBLIC_SENTRY_DSN
```

## 6. Run database migrations

After `DATABASE_URL` is set:

```bash
npm run db:deploy
```

For local development:

```bash
npm run db:migrate
npm run db:seed
```

## 7. Vercel

The project is already deployed at:

```txt
https://fastvocabenlarge.vercel.app
```

Vercel should deploy:

- `main` as Production
- pull requests as Preview deployments
