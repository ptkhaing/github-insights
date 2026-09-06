# GitHub Insights

**[Live Demo](https://github-insights-ptk.netlify.app)**

Look up any public GitHub profile and see their activity at a glance — repo stats,
language breakdown, a 12-week commit trend, a recent activity feed, and an
AI-generated plain-English summary of their coding focus.

## Stack

- React 19 + Vite
- Recharts for data visualization
- GitHub REST API (no auth required for public data)
- Netlify Functions (serverless) + Google's Gemini API for the AI insight feature (free tier, no billing required)

## Why a serverless function for the AI feature?

The insight panel calls Gemini to summarize a profile's stats. That call needs an
API key, and API keys can never live in frontend code — anyone could open dev tools
and steal it. So the browser calls `/api/insight`, which is a small Netlify Function
that holds the real API key server-side, calls Gemini, and returns just the text.

Gemini's free tier (via Google AI Studio) was chosen deliberately: no credit card or
billing setup required, which keeps this project's running cost at $0. The tradeoff is
a modest rate limit (roughly 10 requests/minute, a few hundred/day) — more than enough
for a portfolio demo, but worth knowing if traffic ever spikes.

## Local development

```bash
npm install
cp .env.example .env.local   # then add your real GEMINI_API_KEY
```

Get a free key at https://aistudio.google.com/apikey — no billing account needed.

Two ways to run it locally:

- `npm run dev` — fastest, but the AI insight panel won't work (no function server)
- `npm run dev:full` — runs the app *and* the Netlify Function locally via Netlify CLI,
  so the full AI feature works. This is the one to use if you're testing the insight panel.
  (Uses `--offline` since Netlify CLI's site-linked mode can fail to pick up `.env.local`
  in some setups — offline mode reads local files directly and is more reliable for this.)

## Deployment (Netlify)

1. Push this repo to GitHub
2. Connect it on Netlify (build command `npm run build`, publish dir `dist` — already
   set in `netlify.toml`)
3. In Netlify's site settings → Environment variables, add `GEMINI_API_KEY`
4. Deploy — functions deploy automatically alongside the site

## Screenshots

<img width="738" height="806" alt="Screenshot 2026-09-07 at 12 30 36 AM" src="https://github.com/user-attachments/assets/5250c6d8-d407-4f58-8eae-5c70940b0e00" />

<img width="738" height="746" alt="Screenshot 2026-09-07 at 12 30 56 AM" src="https://github.com/user-attachments/assets/b9f16b6d-720a-45af-b979-a6b56338ee27" />

## Notes on GitHub API rate limits

Unauthenticated requests are capped at 60/hour per IP by GitHub. That's fine for
personal/demo use but worth knowing if you're testing repeatedly in a short window.
