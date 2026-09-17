/**
 * Generates every host's redirect configuration from redirects.config.mjs, plus the
 * route manifest the server uses to tell a real job listing from a made-up URL.
 *
 * Writes:
 *   vercel.json                 -> "redirects" array (Vercel)
 *   public/.htaccess            -> the block between the GENERATED markers (cPanel/Apache)
 *   public/route-manifest.json  -> valid /careers/<id> ids, read by server.js
 *
 * server.js reads redirects.config.mjs directly, so it needs nothing generated.
 * Run by `npm run build` via the prebuild hook; safe to run by hand at any time.
 */
import { promises as fs } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { build } from 'esbuild'
import { redirects, gone } from '../redirects.config.mjs'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')

/** Windows paths need converting before import(); the cache-buster forces a fresh read. */
const toFileUrl = (p) => 'file://' + p.replace(/\\/g, '/') + `?t=${Date.now()}`
const START = '# ===== GENERATED REDIRECTS (scripts/sync-redirects.mjs) - do not edit by hand ====='
const END = '# ===== END GENERATED REDIRECTS ====='

/* ------------------------------------------------------------------ vercel.json */

async function writeVercel() {
  const file = join(ROOT, 'vercel.json')
  const config = JSON.parse(await fs.readFile(file, 'utf8'))

  config.redirects = redirects.map((r) => ({
    source: r.from.endsWith('/*') ? r.from.slice(0, -2) + '/:path*' : r.from,
    destination: r.to.replace('$1', ':path*'),
    permanent: (r.status ?? 301) === 301,
  }))

  // Vercel has no 410; a gone path is at least kept out of the SPA fallback so it can be
  // answered by a function or a static 410 page rather than a soft 404.
  if (gone.length > 0) {
    config.redirects.push(
      ...gone.map((g) => ({ source: g.path, destination: '/410.html', permanent: false }))
    )
  }

  await fs.writeFile(file, JSON.stringify(config, null, 2) + '\n')
  return config.redirects.length
}

/* -------------------------------------------------------------------- .htaccess */

/**
 * Sections whose pages come only from bundled data. Blogs and careers are left out: the
 * admin API can publish ids the build has never seen, and those must not 404.
 */
const STATIC_SECTIONS = ['news', 'work', 'technologies']

function apacheRules(sections) {
  const lines = [START, '']

  const escape = (path) => path.replace(/[.+?^${}()|[\]\\]/g, (c) => '\\' + c)

  for (const r of redirects) {
    const status = r.status ?? 301
    if (r.from === '/index.html') {
      // RedirectMatch would also see the internal SPA rewrite to index.html and loop, so
      // only a client that literally asked for /index.html is redirected.
      lines.push('RewriteEngine On')
      lines.push('RewriteCond %{THE_REQUEST} \\s/index\\.html[\\s?] [NC]')
      lines.push(`RewriteRule ^index\\.html$ ${r.to} [R=${status},L]`)
    } else if (r.from.endsWith('.html')) {
      // Legacy static-site URLs were indexed in more than one casing. mod_rewrite, not
      // RedirectMatch: it runs first, so the .html 404 rule below cannot pre-empt it.
      lines.push(`RewriteRule ^${escape(r.from.slice(1))}$ ${r.to} [R=${status},NC,L]`)
    } else if (r.from.endsWith('/*')) {
      const prefix = r.from.slice(0, -2)
      lines.push(`RedirectMatch ${status} ^${prefix}(/.*)?$ ${r.to.replace('$1', '$1')}`)
    } else {
      // RedirectMatch with an anchored pattern, NOT Redirect: Redirect matches by prefix,
      // so `/blogs` would drag every `/blogs/<article>` along with it.
      lines.push(`RedirectMatch ${status} ^${r.from}/?$ ${r.to}`)
    }
  }

  // A slug the build does not know is a real 404, not 200 + "Article not found". The
  // SPA still renders its NotFound page through ErrorDocument 404.
  lines.push('', '# Unknown ids in data-driven sections: real 404 (ErrorDocument serves the SPA).')
  lines.push('RewriteEngine On')
  for (const section of STATIC_SECTIONS) {
    const ids = sections[section] ?? []
    if (!ids.length) continue
    lines.push(`RewriteCond %{REQUEST_URI} ^/${section}/[^/]+/?$`)
    lines.push(`RewriteCond %{REQUEST_URI} !^/${section}/(${ids.map((id) => escape(id)).join('|')})/?$`)
    lines.push('RewriteRule ^ - [R=404,L]')
  }
  // Any other legacy .html URL that is not a real file.
  lines.push('RewriteCond %{REQUEST_FILENAME} !-f')
  lines.push('RewriteRule \\.html$ - [R=404,L]')

  if (gone.length > 0) {
    lines.push('', '# Removed content: 410 tells crawlers to drop the URL, not retry it.')
    for (const g of gone) lines.push(`Redirect gone ${g.path}`)
  }

  lines.push('', END)
  return lines.join('\n')
}

async function writeHtaccess(sections) {
  const file = join(ROOT, 'public/.htaccess')
  let text = await fs.readFile(file, 'utf8')
  const block = apacheRules(sections)

  if (text.includes(START)) {
    const before = text.slice(0, text.indexOf(START))
    const after = text.slice(text.indexOf(END) + END.length)
    text = before + block + after
  } else {
    // Redirects must run before the SPA rewrite, or index.html answers first.
    const anchor = '<IfModule mod_rewrite.c>'
    text = text.replace(anchor, block + '\n\n' + anchor)
  }

  await fs.writeFile(file, text)
}

/* --------------------------------------------------------------- route manifest */

/**
 * Ids that actually exist, per section.
 *
 * Data modules are bundled and imported rather than scraped, because ids like the
 * per-country Vehicle Mapping Operator listings are built from template literals and a
 * regex would miss them. Sections whose data still lives inside a page component are read
 * with a narrow regex instead, noted per entry.
 *
 * The server answers /<section>/<id> with 404 when the id is absent, which is what stops
 * a removed job listing being served as 200 OK with "Job Not Found" in the body.
 */
async function importData(relPath) {
  const name = relPath.replace(/[^a-z0-9]/gi, '-')
  const tmp = join(ROOT, `node_modules/.cache/jsan-${name}.mjs`)
  await fs.mkdir(dirname(tmp), { recursive: true })
  await build({
    entryPoints: [join(ROOT, relPath)],
    outfile: tmp,
    bundle: true,
    format: 'esm',
    platform: 'node',
    logLevel: 'silent',
  })
  return import(toFileUrl(tmp))
}

const idsOf = (collection) =>
  (Array.isArray(collection) ? collection : Object.keys(collection ?? {}))
    .map((entry) => (typeof entry === 'string' ? entry : entry.id ?? entry.slug))
    .filter(Boolean)

async function sectionIds() {
  const jobs = await importData('src/data/jobs.ts')
  const blogs = await importData('src/data/blogs.ts')
  const news = await importData('src/data/news.ts')
  const work = await importData('src/data/work.ts')
  const caps = await importData('src/data/capabilities.ts')
  const pillars = await importData('src/data/capabilityPillars.ts')

  // Technology pages keep their data inside the page component, so read the slugs out.
  const techSource = await fs.readFile(
    join(ROOT, 'src/pages/technologies/TechnologyDetail.tsx'),
    'utf8'
  )
  const technologies = [...techSource.matchAll(/slug:\s*'([^']+)'/g)].map((m) => m[1])

  return {
    careers: idsOf(jobs.jobs ?? jobs.default),
    blogs: idsOf(blogs.default ?? blogs.blogs),
    news: idsOf(news.newsArticles),
    work: idsOf(work.caseStudies),
    // Both layers live under /capabilities: the six pillars and the detail pages.
    capabilities: [
      ...idsOf(caps.capabilities),
      ...idsOf(pillars.capabilityPillars),
    ],
    technologies: [...new Set(technologies)],
  }
}

async function writeRouteManifest(sections) {

  const manifest = {
    generated: new Date().toISOString(),
    ...Object.fromEntries(
      Object.entries(sections).map(([key, ids]) => [key, [...new Set(ids)].sort()])
    ),
    gone: gone.map((g) => g.path),
    routes: await routePatterns(),
  }

  await fs.writeFile(
    join(ROOT, 'public/route-manifest.json'),
    JSON.stringify(manifest, null, 2) + '\n'
  )
  return Object.fromEntries(Object.entries(sections).map(([k, v]) => [k, v.length]))
}

/**
 * Every path the router can actually serve, as anchored regex sources.
 *
 * Read straight out of App.tsx (the `path="..."` literals) plus the capability pillar
 * paths, which are generated from data. The server uses this to answer an unknown URL
 * with 404 instead of 200; parsing the router rather than keeping a second hand-written
 * list means a new route cannot be forgotten here.
 */
async function routePatterns() {
  const app = await fs.readFile(join(ROOT, 'src/App.tsx'), 'utf8')
  const literal = [...app.matchAll(/path="([^"]+)"/g)]
    .map((m) => m[1])
    .filter((p) => p !== '*')

  const tmp = join(ROOT, 'node_modules/.cache/jsan-pillars.mjs')
  await build({
    entryPoints: [join(ROOT, 'src/data/capabilityPillars.ts')],
    outfile: tmp,
    bundle: true,
    format: 'esm',
    platform: 'node',
    logLevel: 'silent',
  })
  const { capabilityPillars = [] } = await import(toFileUrl(tmp))
  const pillars = capabilityPillars.map((p) => `/capabilities/${p.slug}`)

  const toPattern = (path) =>
    '^' +
    path
      .replace(/[.+?^${}()|[\]\\]/g, '\\$&')
      .replace(/:[A-Za-z0-9_]+/g, '[^/]+')
      .replace(/\\\*/g, '.*') +
    '/?$'

  return [...new Set([...literal, ...pillars])].sort().map(toPattern)
}

/* -------------------------------------------------------------------------- run */

const vercelCount = await writeVercel()
const sections = await sectionIds()
await writeHtaccess(sections)
const counts = await writeRouteManifest(sections)

console.log(
  `redirects synced: ${redirects.length} rule(s), ${gone.length} gone, ${vercelCount} vercel entries`
)
console.log('route manifest:', Object.entries(counts).map(([k, n]) => `${k}=${n}`).join(' '))
