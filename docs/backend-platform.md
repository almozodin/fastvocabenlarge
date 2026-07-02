# Backend Platform

This phase intentionally excludes vocabulary methodology and editorial content. It only establishes the system framework around future content.

## Included

- PostgreSQL schema with Prisma
- Auth.js GitHub OAuth integration
- User roles: `USER`, `ADMIN`, `SUPER_ADMIN`
- Admin API guards
- Zod request validation
- Standard JSON error format
- Study sessions and word progress data model
- AI generation job queue model
- Import batch model
- Audit log model
- Sentry initialization
- GitHub Actions CI

## API surface

```txt
GET  /api/health
GET  /api/words
POST /api/words
GET  /api/cards
POST /api/cards
GET  /api/word-books
POST /api/word-books
GET  /api/progress
POST /api/progress
GET  /api/study-sessions
POST /api/study-sessions
GET  /api/ai/jobs
POST /api/ai/jobs
GET  /api/admin/users
GET  /api/admin/imports
POST /api/admin/imports
```

## Manual owner setup

The owner still needs to create and configure:

- PostgreSQL database
- Vercel environment variables
- GitHub OAuth App
- Sentry project
- OpenAI API key when content generation starts
