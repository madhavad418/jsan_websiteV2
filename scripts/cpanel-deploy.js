// cPanel deploy: builds the site and uploads dist/ to the FTP web root (public_html).
// Existing remote files (.htaccess, assets.zip, subdomain folders, cgi-bin, ...) are PRESERVED 
// this only overwrites/adds the freshly built files; it never deletes remote-only files.
//
// Usage:
//   cpanel --prod              build, then upload dist/ to production
//   cpanel --prod --no-build   skip the build, just upload the existing dist/
//   cpanel --prod --verbose    print the raw FTP protocol log
//
// Credentials can be overridden with env vars (FTP_HOST, FTP_PORT, FTP_USER,
// FTP_PASSWORD, FTP_SECURE, FTP_REMOTE_DIR); otherwise the defaults below are used.

import { Client } from 'basic-ftp'
import { spawnSync } from 'node:child_process'
import { existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const projectRoot = path.resolve(__dirname, '..')
const distDir = path.join(projectRoot, 'dist')

const cfg = {
  host: process.env.FTP_HOST || '92.205.175.216',
  port: Number(process.env.FTP_PORT || 21),
  user: process.env.FTP_USER || 'pavanjsan@jsanconsulting.com',
  password: process.env.FTP_PASSWORD || 'Jsanconsulting773!',
  secure: process.env.FTP_SECURE === 'true', // plain FTP by default (matches this server)
  remoteDir: process.env.FTP_REMOTE_DIR || '/', // FTP root == public_html
}

const args = process.argv.slice(2)
const isProd = args.includes('--prod') || args.includes('--production')
const skipBuild = args.includes('--no-build')
const verbose = args.includes('--verbose')

const log = (...a) => console.log('[cpanel]', ...a)

if (!isProd) {
  console.error('[cpanel] Refusing to deploy without --prod.')
  console.error('         Usage: cpanel --prod [--no-build] [--verbose]')
  process.exit(1)
}

// 1) Build ----------------------------------------------------------------
if (!skipBuild) {
  log('Building (npm run build) ...')
  const r = spawnSync('npm', ['run', 'build'], { cwd: projectRoot, stdio: 'inherit', shell: true })
  if (r.status !== 0) {
    console.error('[cpanel] Build failed  aborting deploy.')
    process.exit(r.status || 1)
  }
} else {
  log('Skipping build (--no-build).')
}

if (!existsSync(distDir)) {
  console.error('[cpanel] dist/ not found  nothing to upload. Run a build first.')
  process.exit(1)
}

// 2) Upload ---------------------------------------------------------------
const client = new Client(30000)
client.ftp.verbose = verbose

const seen = new Set()
client.trackProgress((info) => {
  if (info.name && !seen.has(info.name)) {
    seen.add(info.name)
    log('↑', info.name)
  }
})

try {
  log(`Connecting to ${cfg.host}:${cfg.port} as ${cfg.user} (secure=${cfg.secure}) ...`)
  await client.access({
    host: cfg.host,
    port: cfg.port,
    user: cfg.user,
    password: cfg.password,
    secure: cfg.secure,
  })

  if (cfg.remoteDir && cfg.remoteDir !== '/') {
    await client.ensureDir(cfg.remoteDir)
  } else {
    await client.cd('/')
  }

  log(`Uploading dist/ -> ${cfg.remoteDir}  (existing files like .htaccess are preserved)`)
  await client.uploadFromDir(distDir)
  client.trackProgress()

  log(`✅ Deploy complete  uploaded ${seen.size} file(s). Existing remote files were left untouched.`)
} catch (err) {
  console.error('[cpanel] ❌ Deploy failed:', err && err.message ? err.message : err)
  process.exitCode = 1
} finally {
  client.close()
}
