// Audit every sitemap URL plus generated detail routes against a running production build.
// External providers are excluded so their availability cannot hide local regressions.
import fs from 'node:fs/promises'
import puppeteer from 'puppeteer'

const base = process.env.AUDIT_BASE_URL || 'http://localhost:8080'
const manifest = JSON.parse(await fs.readFile('public/route-manifest.json', 'utf8'))
const sitemap = await fs.readFile('public/sitemap.xml', 'utf8')
const routes = new Set([...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => new URL(m[1]).pathname))
for (const group of ['careers', 'blogs', 'news', 'work', 'capabilities', 'technologies']) {
  for (const slug of manifest[group]) routes.add(`/${group}/${slug}`)
}
for (const pattern of manifest.routes) {
  if (!pattern.includes('[')) routes.add(pattern.replace(/^\^/, '').replace(/\/\?\$$/, ''))
}
routes.delete('/admin')
const browser = await puppeteer.launch({ headless: true, pipe: true })
const results = []
try {
  const queue = [...routes].flatMap(route => [390, 1440].map(width => ({ route, width })))
  await Promise.all(Array.from({ length: 3 }, async () => {
    const page = await browser.newPage()
    await page.setRequestInterception(true)
    page.on('request', request => {
      const url = request.url()
      if (url.includes('/api/')) return request.respond({ status: 200, contentType: 'application/json', body: '[]' })
      if (!url.startsWith(base) && !url.startsWith('data:') && !url.startsWith('blob:')) return request.abort()
      return request.continue()
    })
    let errors = []
    page.on('pageerror', error => errors.push(error.message))
    while (queue.length) {
      const { route, width } = queue.shift()
      errors = []
      try {
        await page.setViewport({ width, height: 900, deviceScaleFactor: 1 })
        await page.goto(base + route, { waitUntil: 'domcontentloaded' })
        await page.waitForSelector('h1', { timeout: 15000 })
        // Explicitly load every image, including content below the fold.
        await page.evaluate(async () => {
          const local = [...document.images].filter(i => new URL(i.currentSrc || i.src).origin === location.origin)
          await Promise.all(local.map(async i => { i.loading = 'eager'; try { await i.decode() } catch {} }))
        })
        const result = await page.evaluate(() => ({
          title: document.querySelector('h1')?.textContent,
          images: [...document.images].filter(i => new URL(i.currentSrc || i.src).origin === location.origin).map(i => ({ src: i.currentSrc || i.src, ok: i.complete && i.naturalWidth > 0 })),
          hero: [...document.images].filter(i => i.getAttribute('fetchpriority') === 'high').map(i => ({ src: i.currentSrc, loading: i.loading })),
        }))
        results.push({ route, width, ...result, errors: [...errors] })
      } catch (error) { results.push({ route, width, errors: [error.message] }) }
      if (results.length % 30 === 0) console.log(`Checked ${results.length} page/viewport combinations`)
    }
    await page.close()
  }))
} finally { await browser.close() }
await fs.mkdir('docs', { recursive: true })
await fs.writeFile('docs/image-audit.json', JSON.stringify(results, null, 2))
const failures = results.filter(r => r.errors.length || r.images?.some(i => !i.ok))
console.log(JSON.stringify({ routes: routes.size, checks: results.length, failures }, null, 2))
if (failures.length) process.exitCode = 1
