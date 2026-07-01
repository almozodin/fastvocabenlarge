# Architecture

Fast Vocab Enlarge is currently a small Next.js application shell for a future vocabulary card product.

## Current scope

- No authentication
- No database
- No AI API calls
- No etymology provider integration
- No user progress persistence

The first goal is to keep the card experience stable while giving the project a clean framework for future modules.

## Stack

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- ESLint

This mirrors the lightweight core used across mature open-source Next.js starters without bringing in full SaaS features too early.

## Folders

```txt
app/
  layout.tsx        Global shell and metadata
  page.tsx          Main word-card route
  globals.css       Global styles and Tailwind entry
components/
  future-panel.tsx
  hero-section.tsx
  site-header.tsx
  word-card-workspace.tsx
lib/
  site-config.ts    Product name, metadata, navigation
  word-cards.ts     Temporary local card data
docs/
  architecture.md
```

## Next modules

- `lib/ai/` for AI API prompts and response shaping
- `lib/etymology/` for word-origin data providers
- `lib/storage/` for local storage first, then database-backed persistence
- `app/api/` once server-side API routes are needed
