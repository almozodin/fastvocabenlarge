# Fast Vocab Enlarge

A minimal word-card website shell for a future AI and etymology-powered vocabulary product.

The long-term goal is to combine AI and etymology to make memorizing English vocabulary easier.

## What is included

- Next.js App Router application shell
- TypeScript project structure
- Tailwind CSS entrypoint
- Prisma/PostgreSQL backend schema
- Auth.js GitHub OAuth scaffold
- API route skeleton for words, cards, progress, AI jobs, imports, and users
- Versioned `/api/v1/*` backend architecture with service/repository layers
- Admin and dashboard route shells
- GitHub Actions CI
- Sentry initialization
- Responsive word-card interface
- Mock card queue
- Reserved areas for AI notes and etymology
- Ready to deploy on Vercel

## Local preview

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Then visit:

```txt
http://localhost:3000
```

Build for production:

```bash
npm run build
```

Lint the project:

```bash
npm run lint
```

## Architecture

See `docs/architecture.md`.

Backend and deployment setup:

- `docs/backend-platform.md`
- `docs/deployment.md`
- `docs/scaling.md`

## Next steps

- Replace mock data with imported vocabulary content
- Add OpenAI API content generation
- Add etymology data source
- Add persistence for custom cards and learning state
- Migrate to Next.js when server-side API routes are needed
