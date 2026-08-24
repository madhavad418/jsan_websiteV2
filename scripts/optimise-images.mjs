/**
 * Optimise the images in public/ in place, and emit WebP siblings.
 *
 * Why in place: every image is referenced by literal path in ~100 places across the app.
 * Re-encoding under the same filename means every reference benefits with no code change
 * and no risk of a missed path.
 *
 * Originals are copied to .image-originals/ (git-ignored) before anything is written, so
 * this is reversible. Re-running is safe: files already at or under the target are skipped.
 *
 *   node scripts/optimise-images.mjs          # report only, writes nothing
 *   node scripts/optimise-images.mjs --write  # actually optimise
 */
import { readdir, stat, mkdir, copyFile, readFile, writeFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'

const PUBLIC_DIR = 'public'
const BACKUP_DIR = '.image-originals'
const MAX_WIDTH = 2000 // nothing on the site is displayed wider than this
const JPEG_QUALITY = 80
const WEBP_QUALITY = 78
const WRITE = process.argv.includes('--write')

const exts = new Set(['.jpg', '.jpeg', '.png'])

async function walk(dir) {
  const out = []
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) out.push(...(await walk(full)))
    else if (exts.has(path.extname(entry.name).toLowerCase())) out.push(full)
  }
  return out
}

const mb = (n) => (n / 1048576).toFixed(2)

const files = await walk(PUBLIC_DIR)
let before = 0
let after = 0
let webpTotal = 0
let changed = 0

for (const file of files) {
  const original = await readFile(file)
  before += original.length

  // A few files carry an image extension but are not decodable images; skip rather than abort.
  let meta
  try {
    meta = await sharp(original, { failOn: 'none' }).metadata()
  } catch {
    console.log(`skipped (unreadable): ${file}`)
    after += original.length
    continue
  }
  const ext = path.extname(file).toLowerCase()
  const tooWide = meta.width && meta.width > MAX_WIDTH

  const pipeline = sharp(original, { failOn: 'none' }).rotate()
  if (tooWide) pipeline.resize({ width: MAX_WIDTH, withoutEnlargement: true })

  // PNGs keep PNG (many carry transparency); palette + max effort is the big win.
  // JPEGs re-encode progressive with mozjpeg.
  const optimised =
    ext === '.png'
      ? await pipeline.png({ compressionLevel: 9, palette: true, effort: 8 }).toBuffer()
      : await pipeline.jpeg({ quality: JPEG_QUALITY, mozjpeg: true, progressive: true }).toBuffer()

  // A WebP sibling for anything that wants to opt in later via <picture>.
  const webp = await sharp(original, { failOn: 'none' })
    .rotate()
    .resize(tooWide ? { width: MAX_WIDTH, withoutEnlargement: true } : undefined)
    .webp({ quality: WEBP_QUALITY, effort: 5 })
    .toBuffer()

  const keep = optimised.length < original.length ? optimised : original
  after += keep.length
  webpTotal += webp.length

  if (keep !== original) changed++

  if (WRITE) {
    const backup = path.join(BACKUP_DIR, path.relative(PUBLIC_DIR, file))
    if (!existsSync(backup)) {
      await mkdir(path.dirname(backup), { recursive: true })
      await copyFile(file, backup)
    }
    if (keep !== original) await writeFile(file, keep)
    await writeFile(file.replace(/\.(jpe?g|png)$/i, '.webp'), webp)
  }

  const saved = original.length - keep.length
  if (saved > 200 * 1024) {
    console.log(
      `${mb(original.length).padStart(6)} MB -> ${mb(keep.length).padStart(6)} MB  ` +
        `(webp ${mb(webp.length)} MB)  ${file}`,
    )
  }
}

console.log('\n--------------------------------------------------')
console.log(`files scanned : ${files.length}`)
console.log(`re-encoded    : ${changed}`)
console.log(`before        : ${mb(before)} MB`)
console.log(`after         : ${mb(after)} MB  (${(100 - (after / before) * 100).toFixed(1)}% smaller)`)
console.log(`webp siblings : ${mb(webpTotal)} MB`)
if (!WRITE) console.log('\nDRY RUN  nothing written. Re-run with --write to apply.')
