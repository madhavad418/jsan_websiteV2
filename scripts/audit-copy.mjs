/**
 * Copy-quality gate: reads the text a visitor actually sees, not the source.
 *
 *   node scripts/audit-copy.mjs [baseUrl]
 *
 * Source-level checks miss defects that only appear once data files, template literals and
 * JSX fragments are rendered together  "platforms ,from" was exactly that kind of bug.
 * This walks the rendered DOM of every page in the sitemap and flags:
 *
 *   - a space before , . ; : ! ?
 *   - a comma or full stop with no space after it
 *   - double spaces inside a sentence
 *   - doubled punctuation and spaced-out brackets
 *   - a word repeated twice in a row
 *
 * Exits non-zero on any hit, so CI can gate a deploy on it.
 */
import { readFile } from 'node:fs/promises'
import puppeteer from 'puppeteer'

const BASE = process.argv[2] ?? 'http://localhost:8099'

const CHECKS = [
  { label: 'space before punctuation', re: /[A-Za-z0-9)] +[,.;:!?](?:\s|$)/g },
  { label: 'missing space after comma', re: /[a-z],[A-Za-z]/g },
  { label: 'missing space after full stop', re: /[a-z]\.[A-Z][a-z]{2,}/g },
  { label: 'double space', re: /[A-Za-z0-9,.)]  +[A-Za-z0-9(]/g },
  { label: 'doubled punctuation', re: /[,;:]{2,}|\.\.(?!\.)/g },
  { label: 'spaced bracket', re: /\( | \)/g },
  { label: 'repeated word', re: /\b([A-Za-z]{3,})\s+\1\b/gi },
]

/* Known-good text that would otherwise trip a check. */
const ALLOW = [
  /\.\.\./, // ellipsis in placeholders
  /e\.g\./,
  /i\.e\./,
  /\d\.\d/, // version and decimal numbers
]

const urls = (await readFile(new URL('../public/sitemap.xml', import.meta.url), 'utf8'))
  .match(/<loc>([^<]+)<\/loc>/g)
  .map((tag) => tag.replace(/<\/?loc>/g, ''))
  .map((absolute) => new URL(absolute).pathname)

const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] })
const page = await browser.newPage()

let total = 0

for (const path of urls) {
  await page.goto(BASE + path, { waitUntil: 'networkidle0', timeout: 60000 })
  await new Promise((r) => setTimeout(r, 350))

  const text = await page.evaluate(() => {
    // Skip the translate widget and anything visually hidden.
    const strip = document.querySelectorAll('.skiptranslate, [class*="gt_"], script, style, .sr-only')
    strip.forEach((el) => el.remove())
    return document.body.innerText
  })

  /*
   * Check line by line. innerText puts a newline between block elements, so scanning the
   * whole page at once reports a "repeated word" every time a breadcrumb ends with the
   * same word the heading below it starts with - noise, not a defect.
   */
  const hits = []
  for (const line of text.split(/\r?\n/)) {
    const sentence = line.trim()
    if (sentence.length < 12) continue
    for (const { label, re } of CHECKS) {
      for (const match of sentence.matchAll(re)) {
        const context = sentence
          .slice(Math.max(0, match.index - 40), match.index + 50)
          .replace(/\s+/g, ' ')
        if (ALLOW.some((ok) => ok.test(match[0]) || ok.test(context))) continue
        hits.push(`${label}: ...${context}...`)
      }
    }
  }

  const unique = [...new Set(hits)]
  if (unique.length) {
    total += unique.length
    console.log(`\n${path}`)
    for (const hit of unique.slice(0, 8)) console.log('  ' + hit)
  }
}

await browser.close()

console.log(
  total === 0
    ? `\nPASS: ${urls.length} pages, no copy defects in rendered text`
    : `\nFAIL: ${total} copy defect(s) across ${urls.length} pages`
)
process.exit(total === 0 ? 0 : 1)
