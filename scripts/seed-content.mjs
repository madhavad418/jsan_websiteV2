// Seed the live MySQL API with the current bundled blogs + jobs.
// Usage: node scripts/seed-content.mjs
import esbuild from 'esbuild'
import fs from 'node:fs'
import path from 'node:path'

const API = 'https://www.jsanconsulting.com/api'
const ADMIN = { username: 'jsanadmin', password: 'Jsan@2017' }

// Bundle the pure TS data modules to a temp ESM file, then import them.
const entry = path.join('scripts', '_seed-entry.ts')
fs.writeFileSync(entry, [
  "export { default as blogs } from '../src/data/blogs'",
  "export { jobs } from '../src/data/jobs'",
].join('\n'))
const outfile = path.join('scripts', '_seed-bundle.mjs')
await esbuild.build({ entryPoints: [entry], bundle: true, format: 'esm', platform: 'node', outfile, logLevel: 'silent' })
const { blogs, jobs } = await import('file://' + path.resolve(outfile))

// Login
const lr = await fetch(API + '/auth.php', {
  method: 'POST', headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(ADMIN),
})
const lj = await lr.json()
if (!lj.token) throw new Error('login failed: ' + JSON.stringify(lj))
console.log('logged in, seeding', blogs.length, 'blogs +', jobs.length, 'jobs')

// Seed via migrate.php (bulk upsert)
const sr = await fetch(API + '/migrate.php?token=0805ab5450b004bdba1bac122c661d7f', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', 'X-Auth-Token': lj.token },
  body: JSON.stringify({ blogs, jobs }),
})
console.log('seed result:', await sr.text())

// cleanup temp files
fs.unlinkSync(entry); fs.unlinkSync(outfile)

// verify counts via public endpoints
const b = await (await fetch(API + '/blogs.php?all=1')).json()
const j = await (await fetch(API + '/jobs.php')).json()
console.log('now in DB: blogs =', b.length, ', jobs =', j.length)
console.log('job order:', j.map((x) => x.id).join(', '))
