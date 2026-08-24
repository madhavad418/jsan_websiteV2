/**
 * Production static server for the built SPA.
 *
 * Railway needs a process that listens on $PORT, and `vite preview` is explicitly
 * not meant for production, so this serves dist/ directly. No dependencies — it
 * runs on the Node version Railway installs, nothing to keep patched.
 *
 * What it handles that a plain file server does not:
 *   - SPA fallback: unknown paths return index.html so client-side routes work on
 *     a hard refresh or a shared link (/services/..., /capabilities/..., /blogs/...)
 *   - cache headers: fingerprinted assets are immutable, index.html never cached,
 *     so a deploy is picked up immediately instead of being served stale
 *   - gzip for text payloads, which matters for the ~1.2MB maps chunk
 *   - /healthz for Railway's healthcheck
 *   - directory traversal is rejected before touching the filesystem
 */
import { createServer } from 'node:http'
import { createReadStream, promises as fsp } from 'node:fs'
import { createGzip } from 'node:zlib'
import { extname, join, normalize, sep } from 'node:path'
import { fileURLToPath } from 'node:url'
import { pipeline } from 'node:stream'

const ROOT = join(fileURLToPath(new URL('.', import.meta.url)), 'dist')
const PORT = Number(process.env.PORT) || 8080
const HOST = '0.0.0.0'

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.gif': 'image/gif',
  '.ico': 'image/x-icon',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.pdf': 'application/pdf',
  '.map': 'application/json; charset=utf-8',
}

const COMPRESSIBLE = new Set([
  '.html', '.js', '.mjs', '.css', '.json', '.svg', '.txt', '.xml', '.map',
])

/** Vite fingerprints everything under /assets, so those can be cached forever. */
const cacheControlFor = (pathname, ext) => {
  if (ext === '.html') return 'no-cache'
  if (pathname.startsWith('/assets/')) return 'public, max-age=31536000, immutable'
  return 'public, max-age=86400'
}

/** Resolve a URL path to a file inside dist/, or null if it escapes or is missing. */
async function resolveFile(pathname) {
  const decoded = decodeURIComponent(pathname)
  const candidate = normalize(join(ROOT, decoded))
  if (candidate !== ROOT && !candidate.startsWith(ROOT + sep)) return null
  try {
    const stat = await fsp.stat(candidate)
    if (stat.isDirectory()) return null
    return candidate
  } catch {
    return null
  }
}

function send(req, res, filePath, status = 200) {
  const ext = extname(filePath).toLowerCase()
  const type = MIME[ext] || 'application/octet-stream'
  const acceptsGzip = /\bgzip\b/.test(req.headers['accept-encoding'] || '')
  const gzip = acceptsGzip && COMPRESSIBLE.has(ext)

  res.writeHead(status, {
    'Content-Type': type,
    'Cache-Control': cacheControlFor(new URL(req.url, 'http://localhost').pathname, ext),
    'X-Content-Type-Options': 'nosniff',
    ...(gzip ? { 'Content-Encoding': 'gzip', Vary: 'Accept-Encoding' } : {}),
  })

  if (req.method === 'HEAD') return res.end()

  const stream = createReadStream(filePath)
  const done = (err) => {
    if (err && !res.writableEnded) res.destroy()
  }
  if (gzip) pipeline(stream, createGzip(), res, done)
  else pipeline(stream, res, done)
}

const server = createServer(async (req, res) => {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.writeHead(405, { Allow: 'GET, HEAD' }).end('Method Not Allowed')
    return
  }

  const { pathname } = new URL(req.url, `http://${req.headers.host || 'localhost'}`)

  if (pathname === '/healthz') {
    res.writeHead(200, { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' })
    res.end(JSON.stringify({ status: 'ok' }))
    return
  }

  const file = await resolveFile(pathname)
  if (file) {
    send(req, res, file)
    return
  }

  /*
   * Nothing on disk. A request that looks like a file (has an extension) is a
   * genuine 404 — returning index.html for a missing .js would hand the browser
   * HTML where it expects a script. Everything else is a client-side route.
   */
  if (extname(pathname)) {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'no-store' })
    res.end('Not Found')
    return
  }

  const index = join(ROOT, 'index.html')
  try {
    await fsp.access(index)
    send(req, res, index, 200)
  } catch {
    res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' })
    res.end('Build output missing. Run "npm run build" before starting the server.')
  }
})

server.listen(PORT, HOST, () => {
  console.log(`[jsan-web] serving ${ROOT} on http://${HOST}:${PORT}`)
})

/* Railway sends SIGTERM on redeploy; close cleanly so in-flight requests finish. */
for (const signal of ['SIGTERM', 'SIGINT']) {
  process.on(signal, () => {
    console.log(`[jsan-web] ${signal} received, shutting down`)
    server.close(() => process.exit(0))
    setTimeout(() => process.exit(0), 10_000).unref()
  })
}
