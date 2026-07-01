# Fast Vocab Enlarge

A minimal word-card website shell for a future AI and etymology-powered vocabulary product.

The long-term goal is to combine AI and etymology to make memorizing English vocabulary easier.

## What is included

- Static, dependency-free web app
- Responsive word-card interface
- Mock card queue
- Reserved areas for AI notes and etymology
- Ready to deploy on Vercel, GitHub Pages, Netlify, or any static host

## Local preview

Open `index.html` in a browser.

For a local server:

```bash
python3 -m http.server 3000
```

Then visit:

```txt
http://localhost:3000
```

## Next steps

- Replace mock data with imported vocabulary content
- Add OpenAI API content generation
- Add etymology data source
- Add persistence for custom cards and learning state
- Migrate to Next.js when server-side API routes are needed
