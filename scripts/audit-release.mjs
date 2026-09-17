/**
 * Pre-release sanity check against a running production build (node server.js).
 *
 *   PORT=8091 node server.js & node scripts/audit-release.mjs http://localhost:8091
 *
 * For every sitemap URL at phone, tablet and desktop widths:
 *   - renders an H1, no uncaught errors, no horizontal overflow
 *   - <title>, meta description, og:* and canonical match src/data/page-meta.json
 * Across the site:
 *   - every internal link (header, footer, CTAs) lands on a real page, not NotFound
 *   - unknown URLs render the noindex NotFound page with a 404 status
 *   - legacy .html URLs answer 301 to their replacement
 *   - contact, service enquiry and careers application forms render with their
 *     required fields and endpoint. Nothing is submitted.
 * Writes docs/release-audit.json and exits non-zero on any failure.
 */
import fs from 'node:fs/promises'
import puppeteer from 'puppeteer'

const BASE = process.argv[2] ?? 'http://localhost:8091'
const SITE = 'https://www.jsanconsulting.com'
const VIEWPORTS = [
  { name: 'phone', width: 390, height: 844 },
  { name: 'tablet', width: 820, height: 1180 },
  { name: 'desktop', width: 1440, height: 900 },
]

const meta = JSON.parse(await fs.readFile('src/data/page-meta.json', 'utf8'))
const sitemap = await fs.readFile('public/sitemap.xml', 'utf8')
const routes = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname)

const failures = []
const fail = (where, what) => failures.push({ where, what })
const internalLinks = new Map()

const browser = await puppeteer.launch({ headless: true })

async function newPage(viewport) {
  const page = await browser.newPage()
  await page.setViewport({ width: viewport.width, height: viewport.height })
  await page.setRequestInterception(true)
  page.on('request', (request) => {
    const url = request.url()
    if (url.includes('/api/')) return request.respond({ status: 200, contentType: 'application/json', body: '[]' })
    // Third parties (fonts, maps, translate widget) are out of scope and slow the run.
    if (!url.startsWith(BASE) && !url.startsWith('data:') && !url.startsWith('blob:')) return request.abort()
    request.continue()
  })
  return page
}

async function settle(page) {
  try { await page.waitForSelector('#main-content h1', { timeout: 15000 }) } catch {}
  // Seo applies metadata after the lazily loaded page-meta chunk arrives.
  await page.waitForFunction(() => document.title && !document.title.startsWith('JSAN | Global') || location.pathname === '/', { timeout: 5000 }).catch(() => {})
  await new Promise((r) => setTimeout(r, 300))
}

/* ------------------------------------------------------------ page x viewport */
for (const viewport of VIEWPORTS) {
  const page = await newPage(viewport)
  let errors = []
  page.on('pageerror', (error) => errors.push(error.message))
  for (const route of routes) {
    errors = []
    const where = `${route} @${viewport.name}`
    try {
      await page.goto(BASE + route, { waitUntil: 'domcontentloaded', timeout: 30000 })
      await settle(page)
      const state = await page.evaluate(() => ({
        path: location.pathname,
        h1: document.querySelector('#main-content h1')?.textContent?.trim() ?? '',
        noindex: !!document.querySelector('meta[data-seo="noindex"]'),
        title: document.title,
        description: document.querySelector('meta[name="description"]')?.content,
        ogTitle: document.querySelector('meta[property="og:title"]')?.content,
        ogDescription: document.querySelector('meta[property="og:description"]')?.content,
        ogUrl: document.querySelector('meta[property="og:url"]')?.content,
        canonical: document.querySelector('link[rel="canonical"]')?.href,
        overflow: document.documentElement.scrollWidth - window.innerWidth,
        links: [...document.querySelectorAll('a[href^="/"]')].map((a) => a.getAttribute('href')),
        // In-page CTAs (#contact etc.) whose target section does not exist.
        deadAnchors: [...new Set([...document.querySelectorAll('a[href^="#"]')].map((a) => a.getAttribute('href')))]
          .filter((h) => h.length > 1 && h !== '#main-content' && !document.getElementById(decodeURIComponent(h.slice(1)))),
      }))
      if (state.path !== route) fail(where, `redirected to ${state.path}`)
      if (!state.h1) fail(where, 'no H1')
      if (state.noindex) fail(where, 'renders NotFound')
      if (state.overflow > 1) fail(where, `horizontal overflow ${state.overflow}px`)
      if (errors.length) fail(where, `page errors: ${errors.join(' | ')}`)
      if (state.deadAnchors.length) fail(where, `in-page links with no target: ${state.deadAnchors.join(', ')}`)
      const expected = meta[route]
      if (!expected) fail(where, 'no page-meta entry')
      else {
        if (state.title !== expected[0]) fail(where, `title "${state.title}" != "${expected[0]}"`)
        if (state.description !== expected[1]) fail(where, 'meta description mismatch')
        if (state.ogTitle !== expected[0] || state.ogDescription !== expected[1]) fail(where, 'og tags mismatch')
      }
      const canonical = SITE + (route === '/' ? '' : route)
      if (state.canonical !== canonical && state.canonical !== canonical + '/') fail(where, `canonical ${state.canonical}`)
      if (state.ogUrl !== canonical) fail(where, `og:url ${state.ogUrl}`)
      if (viewport.name === 'desktop' || viewport.name === 'phone') {
        for (const href of state.links) {
          const clean = href.split('#')[0].split('?')[0] || '/'
          if (!internalLinks.has(clean)) internalLinks.set(clean, route)
        }
      }
    } catch (error) {
      fail(where, error.message)
    }
  }
  await page.close()
  console.log(`checked ${routes.length} pages @${viewport.name}`)
}

/* ------------------------------------------------------------- internal links */
{
  const page = await newPage(VIEWPORTS[2])
  for (const [href, from] of internalLinks) {
    if (href.startsWith('/api/') || /\.(pdf|png|jpe?g|webp|svg|mp4|pptx)$/i.test(href)) {
      const res = await fetch(BASE + href, { method: 'HEAD', redirect: 'manual' })
      if (res.status >= 400) fail(`link ${href} (from ${from})`, `HTTP ${res.status}`)
      continue
    }
    await page.goto(BASE + href, { waitUntil: 'domcontentloaded', timeout: 30000 })
    await settle(page)
    const noindex = await page.evaluate(() => !!document.querySelector('meta[data-seo="noindex"]'))
    if (noindex) fail(`link ${href} (from ${from})`, 'lands on NotFound')
  }
  await page.close()
  console.log(`checked ${internalLinks.size} internal link targets`)
}

/* ---------------------------------------------------------- 404 and redirects */
for (const path of ['/this-page-does-not-exist', '/blogs/retired-article', '/news/retired-story', '/services/geospatial/retired-service']) {
  const res = await fetch(BASE + path, { redirect: 'manual' })
  const page = await newPage(VIEWPORTS[0])
  await page.goto(BASE + path, { waitUntil: 'domcontentloaded' })
  await settle(page)
  const state = await page.evaluate(() => ({
    noindex: !!document.querySelector('meta[data-seo="noindex"]'),
    title: document.title,
    footer: !!document.querySelector('footer'),
  }))
  await page.close()
  if (!state.noindex) fail(path, 'not marked noindex')
  if (state.title !== 'Page Not Found | JSAN') fail(path, `title "${state.title}"`)
  if (!state.footer) fail(path, 'NotFound page has no footer')
  // Blog ids can be published through the admin API after the build, and sub-service
  // slugs live inside page components, so those stay 200 and rely on noindex.
  const serverKnows = !path.startsWith('/blogs/') && !path.startsWith('/services/')
  if (serverKnows && res.status !== 404) fail(path, `HTTP ${res.status}, expected 404`)
}
for (const [from, to] of [['/Services.html', '/services'], ['/services.html', '/services'], ['/technologies/Cloud-Technologies.html', '/technologies/cloud'], ['/index.html', '/'], ['/company/About-Us.html', '/company']]) {
  const res = await fetch(BASE + from, { redirect: 'manual' })
  if (res.status !== 301 || res.headers.get('location') !== to) fail(from, `expected 301 -> ${to}, got ${res.status} ${res.headers.get('location')}`)
}

/* ----------------------------------------------------------------------- forms */
{
  const page = await newPage(VIEWPORTS[0])
  const formCheck = async (path, selector, expectAction) => {
    await page.goto(BASE + path, { waitUntil: 'domcontentloaded' })
    await settle(page)
    const form = await page.evaluate((selector) => {
      const f = document.querySelector(selector)
      if (!f) return null
      const box = f.getBoundingClientRect()
      return {
        action: f.getAttribute('action'),
        required: [...f.querySelectorAll('[required]')].map((e) => e.getAttribute('name') || e.id || e.type),
        submit: !!f.querySelector('button[type="submit"], input[type="submit"], button:not([type])'),
        width: box.width,
      }
    }, selector)
    if (!form) return fail(`${path} form`, 'form not rendered')
    if (expectAction && form.action !== expectAction) fail(`${path} form`, `action ${form.action}`)
    if (!form.submit) fail(`${path} form`, 'no submit button')
    if (!form.required.length) fail(`${path} form`, 'no required fields')
    if (form.width > 390) fail(`${path} form`, `wider than phone viewport (${form.width}px)`)
    return form
  }
  const contact = await formCheck('/contact', 'form[action*="formsubmit"]', 'https://formsubmit.co/info@jsanconsulting.com')
  const service = await formCheck('/services/geospatial/ai-ml-detection', 'form[action*="formsubmit"]', 'https://formsubmit.co/info@jsanconsulting.com')
  const job = routes.find((r) => r.startsWith('/careers/'))
  await page.goto(BASE + job, { waitUntil: 'domcontentloaded' })
  await settle(page)
  // The application form may sit behind an "Apply" button.
  await page.evaluate(() => {
    const apply = [...document.querySelectorAll('button, a')].find((el) => /apply/i.test(el.textContent || '') && !el.getAttribute('href')?.startsWith('http'))
    apply?.click()
  })
  await new Promise((r) => setTimeout(r, 500))
  const career = await page.evaluate(() => {
    const f = document.querySelector('form')
    return f && {
      required: [...f.querySelectorAll('[required]')].map((e) => e.getAttribute('name') || e.id || e.type),
      file: !!f.querySelector('input[type="file"]'),
    }
  })
  if (!career) fail(`${job} application form`, 'form not rendered')
  else if (!career.required.length) fail(`${job} application form`, 'no required fields')
  await page.close()
  console.log('forms:', JSON.stringify({ contact, service, career }))
}

/* ------------------------------------------------------------ footer externals */
{
  const page = await newPage(VIEWPORTS[2])
  await page.goto(BASE + '/', { waitUntil: 'domcontentloaded' })
  await settle(page)
  const external = await page.evaluate(() =>
    [...new Set([...document.querySelectorAll('footer a[href^="http"], footer a[href^="mailto:"], footer a[href^="tel:"]')].map((a) => a.href))]
  )
  await page.close()
  for (const href of external) {
    if (!href.startsWith('http')) continue
    try {
      const res = await fetch(href, { method: 'GET', redirect: 'follow', signal: AbortSignal.timeout(15000), headers: { 'User-Agent': 'Mozilla/5.0' } })
      // LinkedIn and some socials answer bots with 999/403; only a hard 404/410 is a broken link.
      if (res.status === 404 || res.status === 410) fail(`footer ${href}`, `HTTP ${res.status}`)
    } catch (error) {
      fail(`footer ${href}`, error.message)
    }
  }
  console.log(`checked ${external.length} footer external links`)
}

await browser.close()
await fs.mkdir('docs', { recursive: true })
await fs.writeFile('docs/release-audit.json', JSON.stringify({ base: BASE, routes: routes.length, failures }, null, 2))
console.log(JSON.stringify({ routes: routes.length, failures: failures.length }, null, 2))
for (const f of failures.slice(0, 80)) console.log(`FAIL ${f.where}: ${f.what}`)
if (failures.length) process.exitCode = 1
