# Scaling Plan

Target: a production website that can comfortably handle 10,000 visits per day before content-processing complexity is added.

## Baseline architecture

```txt
Vercel Edge/CDN
  -> Next.js App Router
  -> Node.js API route handlers
  -> service layer
  -> repository layer
  -> pooled PostgreSQL
```

This traffic target does not require microservices. It does require clean boundaries, predictable API responses, database indexes, request tracing, and pooled database connections.

## API conventions

- Versioned APIs live under `/api/v1/*`.
- Legacy `/api/*` routes re-export the v1 handlers for compatibility.
- Every API response includes:
  - `data` or `error`
  - `meta.requestId`
  - `meta.durationMs`
- List endpoints support bounded pagination with `limit <= 100`.
- API routes run on `nodejs` runtime because Prisma requires Node.

## Database

Use pooled PostgreSQL in production. For Neon/Supabase/Vercel Postgres, set `DATABASE_URL` to the pooled connection string.

Hot paths already have indexes for:

- word lookup by language/status
- card lookup by word/status
- progress lookup by user/status/update time
- review logs by user/word/time
- AI jobs and import batches by status/time
- audit logs by actor/time and action

## Rate limiting

The current limiter is in-memory and suitable for early production on one runtime instance. Before heavy AI usage or multi-region writes, replace it with Redis/KV-backed rate limiting.

Recommended next step:

```txt
Upstash Redis or Vercel KV
```

## Observability

- `x-request-id` is attached to API responses.
- Sentry is initialized for server and edge runtimes.
- Health checks:
  - `/api/health/live`
  - `/api/health/ready`

## Upgrade triggers

Move beyond this architecture when one of these happens:

- database pool exhaustion appears in Vercel logs
- p95 API latency exceeds 500ms for ordinary reads
- AI generation starts competing with user-facing traffic
- background imports become long-running

Likely upgrades:

- Redis-backed rate limit and queues
- background workers for imports and AI generation
- cached read models for public word/book browsing
- separate admin job processor
