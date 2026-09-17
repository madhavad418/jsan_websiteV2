/**
 * Builds src/data/page-meta.json: the title and description for every indexable URL.
 *
 *   node scripts/generate-page-meta.mjs
 *
 * Sources, in the same precedence the router uses:
 *   - src/data/staticPageMeta.ts          pages whose copy lives in a component
 *   - capability pillars, deep dives, capabilities, work, blogs, news and jobs data
 *
 * Seo.tsx applies the result to <title>, the meta description and the Open Graph /
 * Twitter tags on every navigation.
 *
 * The build fails when:
 *   - a URL in public/sitemap.xml has no metadata, or a data-driven page is missing
 *     from the sitemap (so a new page cannot ship unindexed or untitled);
 *   - a title or description is duplicated, empty or too long;
 *   - retired positioning ("Global IT Partner") appears anywhere in the output.
 */
import { promises as fs } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { build } from 'esbuild'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const toFileUrl = (p) => 'file://' + p.replace(/\\/g, '/') + `?t=${Date.now()}`

async function importData(relPath) {
  const tmp = join(ROOT, `node_modules/.cache/page-meta-${relPath.replace(/[^a-z0-9]/gi, '-')}.mjs`)
  await fs.mkdir(dirname(tmp), { recursive: true })
  await build({ entryPoints: [join(ROOT, relPath)], outfile: tmp, bundle: true, format: 'esm', platform: 'node', logLevel: 'silent' })
  return import(toFileUrl(tmp))
}

const MAX_TITLE = 70
const MAX_DESCRIPTION = 165
const RETIRED = [/global it partner/i, /welcome to jsan consulting ltd/i]

const clean = (text = '') => text.replace(/\s+/g, ' ').trim()

/** Shorten to a search-snippet length, preferring a sentence end, then a word boundary. */
function snippet(text) {
  const t = clean(text)
  if (t.length <= 160) return t
  const sentence = t.slice(0, 160).match(/^(.*[.!?])\s/)
  if (sentence && sentence[1].length >= 80) return sentence[1]
  return t.slice(0, 157).replace(/[\s,;:—–-]+\S*$/, '') + '…'
}

const { staticPageMeta } = await importData('src/data/staticPageMeta.ts')
const { capabilityPillars } = await importData('src/data/capabilityPillars.ts')
const { deepDivePages } = await importData('src/data/capabilityDeepDives.ts')
const { capabilities } = await importData('src/data/capabilities.ts')
const { caseStudies } = await importData('src/data/work.ts')
const blogsModule = await importData('src/data/blogs.ts')
const { newsArticles } = await importData('src/data/news.ts')
const { jobs } = await importData('src/data/jobs.ts')

const meta = {}
const dataDriven = new Set()
/** Long article titles shed the section and then the brand suffix rather than truncate. */
const fitTitle = (title) => {
  const [name, ...suffix] = clean(title).split(' | ')
  for (let n = suffix.length; n >= 0; n--) {
    const candidate = [name, ...suffix.slice(suffix.length - n)].join(' | ')
    if (candidate.length <= MAX_TITLE) return candidate
  }
  return name
}
const put = (path, title, description, fromData = true) => {
  if (meta[path]) return // first source wins, matching route order in App.tsx
  meta[path] = { title: fromData ? fitTitle(title) : clean(title), description: snippet(description) }
  if (fromData) dataDriven.add(path)
}

for (const [path, m] of Object.entries(staticPageMeta)) put(path, m.title, m.description, false)
for (const p of capabilityPillars) put(`/capabilities/${p.slug}`, `${p.name} | JSAN`, p.summary || p.description)
for (const p of deepDivePages) put(`/capabilities/${p.slug}`, `${p.title} | JSAN`, p.description || p.subtitle)
for (const c of capabilities) put(`/capabilities/${c.slug}`, `${c.title} | JSAN`, c.description || c.subtitle)
for (const w of caseStudies) put(`/work/${w.slug}`, `${w.title} | Case Study | JSAN`, w.summary)
for (const b of blogsModule.default ?? blogsModule.blogs ?? []) {
  if (!b.hidden) put(`/blogs/${b.slug}`, `${b.title} | JSAN Insights`, b.excerpt)
}
for (const n of newsArticles) put(`/news/${n.slug}`, `${n.title} | JSAN News`, n.description)
for (const j of jobs) put(`/careers/${j.id}`, `${j.title} | Careers at JSAN`, j.description)

/* ------------------------------------------------------------------ validation */

const errors = []
const sitemap = await fs.readFile(join(ROOT, 'public/sitemap.xml'), 'utf8')
const sitemapPaths = new Set(
  [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname.replace(/(.)\/$/, '$1'))
)

for (const path of sitemapPaths) if (!meta[path]) errors.push(`sitemap URL has no metadata: ${path}`)

// Retired or redirected capability slugs keep their data entries so old links resolve;
// they are not pages in their own right.
const { consolidatedCapabilityRedirects = [] } = await importData('src/data/capabilityDeepDives.ts')
const { redirects } = await import(toFileUrl(join(ROOT, 'redirects.config.mjs')))
const redirected = new Set([
  ...redirects.map((r) => r.from),
  ...consolidatedCapabilityRedirects.map((r) => `/capabilities/${r.from}`),
])
for (const path of dataDriven) {
  if (!sitemapPaths.has(path) && !redirected.has(path)) errors.push(`page missing from sitemap: ${path}`)
}
for (const path of redirected) delete meta[path]

const seen = new Map()
for (const [path, { title, description }] of Object.entries(meta)) {
  if (!title) errors.push(`empty title: ${path}`)
  if (!description) errors.push(`empty description: ${path}`)
  if (title.length > MAX_TITLE) errors.push(`title over ${MAX_TITLE} chars (${title.length}): ${path}`)
  if (description.length > MAX_DESCRIPTION) errors.push(`description over ${MAX_DESCRIPTION} chars (${description.length}): ${path}`)
  if (/\s{2,}| [,.;:]/.test(title + ' ' + description)) errors.push(`spacing defect: ${path}`)
  for (const re of RETIRED) if (re.test(title + ' ' + description)) errors.push(`retired positioning "${re.source}": ${path}`)
  if (seen.has(title)) errors.push(`duplicate title "${title}": ${path} and ${seen.get(title)}`)
  seen.set(title, path)
}

if (errors.length) {
  console.error(`page metadata check failed:\n  ${errors.join('\n  ')}`)
  process.exit(1)
}

const out = Object.fromEntries(Object.entries(meta).sort(([a], [b]) => a.localeCompare(b)).map(([p, m]) => [p, [m.title, m.description]]))
await fs.writeFile(join(ROOT, 'src/data/page-meta.json'), JSON.stringify(out) + '\n')
console.log(`page metadata: ${Object.keys(out).length} pages, ${sitemapPaths.size} sitemap URLs covered`)
