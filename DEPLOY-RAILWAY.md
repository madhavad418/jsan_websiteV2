# Deploying to Railway

The site is a Vite + React SPA. Railway builds it with Nixpacks and runs `server.js`,
a small zero-dependency Node server that serves `dist/` with SPA fallback.

## Deploy

1. Push this repo to GitHub.
2. In Railway: **New Project → Deploy from GitHub repo**, pick the repo.
3. Railway reads [`railway.json`](railway.json) and needs no further build setup:
   - build: `npm run build` (runs `tsc` then `vite build`)
   - start: `npm start` (runs `node server.js`)
   - healthcheck: `GET /healthz`
4. **Settings → Networking → Generate Domain** to get a public URL, or attach your
   own domain.

Railway injects `PORT`; the server binds it automatically on `0.0.0.0`. Nothing else
is required for the site to come up.

## Environment variables

Set these under **Variables** on the service. Both are optional — the site builds and
runs without them.

| Variable | Purpose |
| --- | --- |
| `VITE_API_BASE` | Absolute URL of the PHP content API, e.g. `https://www.jsanconsulting.com/api`. See "The API" below. |
| `VITE_MAPTILER_KEY` | MapTiler key for the interactive world map. Falls back to the key currently hardcoded in `WorldMap.tsx`. |

These are build-time variables (Vite inlines `VITE_*` at build). After changing one,
**redeploy** — restarting alone will not pick it up.

## The API — read this before going live

`public/api/` contains **PHP** endpoints (`blogs.php`, `jobs.php`, `auth.php`,
`upload.php`). Railway's Node runtime cannot execute PHP, so on Railway:

- The **public site works fully.** Blogs and job listings fall back to the data
  bundled into the build (`src/data/blogs.ts`, `src/data/jobs.ts`), which is what
  `useContent.ts` already does whenever the API is unreachable.
- **`/admin` will not work** — login, editing and uploads all need the PHP endpoints.

Three ways to handle it:

1. **Keep PHP where it is.** Leave the PHP API on the existing cPanel host and set
   `VITE_API_BASE=https://<that-host>/api`. The Railway front end then reads live
   content from it. The API must send CORS headers allowing the Railway origin.
2. **Static content only.** Set nothing, edit `src/data/*.ts` and redeploy when
   content changes. Simplest, but no admin panel.
3. **Port the API.** Rewrite the four endpoints as a Node service (a second Railway
   service, or the same one) and point `VITE_API_BASE` at it. Most work, single host.

## Local check

Reproduce exactly what Railway runs:

```bash
npm ci
npm run build
npm start          # http://localhost:8080
```

`npm run serve` does both steps in one go.

## What the server does

[`server.js`](server.js) is deliberately dependency-free:

- **SPA fallback** — unknown paths return `index.html`, so `/services/...`,
  `/capabilities/...` and `/blogs/...` survive a hard refresh or a shared link.
  Paths that look like files (they have an extension) return a real 404 instead, so a
  missing script never gets served as HTML.
- **Cache headers** — `/assets/*` is fingerprinted by Vite and served
  `immutable, max-age=1y`; `index.html` is `no-cache`, so a deploy is visible at once.
- **gzip** for HTML, JS, CSS, JSON, SVG and XML (the largest chunk drops from ~1.2 MB
  to ~350 KB).
- **`/healthz`** returns `{"status":"ok"}` for the Railway healthcheck.
- **Path traversal** is rejected before touching the filesystem.
- **SIGTERM** closes the server cleanly so in-flight requests finish on redeploy.

## Notes

- `.nvmrc` pins Node 20; `engines.node` is `>=20`.
- `puppeteer-extra` and `puppeteer-extra-plugin-stealth` were moved to
  `devDependencies` — they are only used by `scripts/`, and shipping them made the
  deploy install much larger.
- `vercel.json` and `scripts/cpanel-deploy.js` are untouched; deploying to Railway
  does not affect either of those paths.
