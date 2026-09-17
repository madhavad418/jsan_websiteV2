// Non-destructive, content-addressed derivatives for images referenced by the site.
// Remote stock/CDN images (Unsplash, Gamma) are downloaded once and served locally, so
// they get the same responsive WebP variants and long-lived caching as local files.
import fs from 'node:fs/promises'
import path from 'node:path'
import { createHash } from 'node:crypto'
import sharp from 'sharp'

const REMOTE = /["'`(](https:\/\/(?:images\.unsplash\.com|cdn\.gamma\.app|img\.freepik\.com|img\.magnific\.com)\/[^"'`\s)]+)["'`)]/g
const REMOTE_CACHE = 'node_modules/.cache/remote-images'

const sources = (await fs.readdir('src', { recursive: true })).filter(f => /\.(tsx?|json)$/.test(f) && !f.includes('responsive-images.json'))
const referenced = new Set()
const remote = new Set()
for (const file of sources) {
  const text = await fs.readFile(path.join('src', file), 'utf8')
  // Spaces are allowed: several /pillars/ source files have them in their names.
  for (const match of text.matchAll(/["'`](\/[^"'`{}\n]+\.(?:png|jpe?g|webp))["'`]/gi)) referenced.add(match[1])
  // Commented-out references are not rendered, so they are not worth downloading.
  const live = text.split('\n').filter(line => !/^\s*(\/\/|\*)/.test(line)).join('\n')
  for (const match of live.matchAll(REMOTE)) remote.add(match[1].replace(/&amp;/g, '&'))
}

async function readRemote(url) {
  const cached = path.join(REMOTE_CACHE, createHash('sha256').update(url).digest('hex').slice(0, 16))
  try { return await fs.readFile(cached) } catch {}
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(30000) })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const bytes = Buffer.from(await res.arrayBuffer())
    await fs.mkdir(REMOTE_CACHE, { recursive: true })
    await fs.writeFile(cached, bytes)
    return bytes
  } catch (error) {
    // Offline builds keep working: the page simply falls back to the remote URL.
    console.warn(`[images] skipped ${url}: ${error.message}`)
    return null
  }
}

await fs.mkdir('public/optimized', { recursive: true })
const manifest = {}
let before = 0, after = 0
const jobs = [...[...referenced].sort().map(src => ({ src, remote: false })), ...[...remote].sort().map(src => ({ src, remote: true }))]
for (const { src, remote: isRemote } of jobs) {
  let input
  if (isRemote) input = await readRemote(src)
  else try { input = await fs.readFile(path.join('public', src)) } catch {}
  if (!input || (!isRemote && input.length < 12000)) continue
  let meta
  try { meta = await sharp(input).metadata() } catch { continue }
  if (!meta.width || !meta.height || (meta.pages ?? 1) > 1) continue
  const hash = createHash('sha256').update(input).update('responsive-v1-q82').digest('hex').slice(0, 12)
  const maxWidth = Math.min(meta.width, 1920)
  const widths = [...new Set([480, 960, 1600, maxWidth].filter(w => w <= maxWidth))].sort((a,b) => a-b)
  const variants = []
  for (const width of widths) {
    const url = `/optimized/${hash}-${width}.webp`
    const dest = path.join('public', url)
    try { await fs.access(dest) } catch {
      await sharp(input).resize({ width, withoutEnlargement: true }).webp({ quality: 82, effort: 4 }).toFile(dest)
    }
    // Never replace an already well-compressed local source with a heavier derivative.
    // Remote sources always use the local copy: it avoids a third-party connection.
    const bytes = (await fs.stat(dest)).size
    if (isRemote || bytes < input.length) variants.push([url, width])
  }
  if (!variants.length || variants.at(-1)[1] < maxWidth) variants.push([src, meta.width])
  const largest = variants.at(-1)[0]
  const height = Math.round(meta.height * Math.min(1, maxWidth / meta.width))
  manifest[src] = { width: isRemote ? maxWidth : meta.width, height: isRemote ? height : meta.height, src: largest, srcSet: variants.map(([url,w]) => `${encodeURI(url)} ${w}w`).join(', ') }
  before += input.length
  after += (await fs.stat(path.join('public', largest))).size
}
await fs.writeFile('src/data/responsive-images.json', JSON.stringify(manifest))
console.log(JSON.stringify({ images: Object.keys(manifest).length, remote: jobs.filter(j => j.remote && manifest[j.src]).length, sourceBytes: before, largestVariantBytes: after }))
