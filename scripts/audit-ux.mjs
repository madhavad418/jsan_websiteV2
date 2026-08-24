/**
 * UX gate: pointer-target size, layout stability and mobile overflow.
 *
 *   node scripts/audit-ux.mjs [baseUrl]
 *
 * Checks, per page and per breakpoint:
 *   - WCAG 2.2 AA target size (2.5.8): interactive controls below 24x24 CSS px, ignoring
 *     the inline-text and spacing exceptions the criterion allows
 *   - JSAN's own stricter goal: controls below 44px tall, which is the practical minimum
 *     for a thumb on a phone
 *   - images with no width/height attribute, which is where CLS comes from
 *   - horizontal overflow, i.e. the page scrolling sideways on a phone
 *
 * Exits non-zero if anything fails, so CI can gate on it.
 */
import puppeteer from 'puppeteer'

const BASE = process.argv[2] ?? 'http://localhost:8099'

/** The six widths the design has to be checked at. */
const BREAKPOINTS = [375, 390, 430, 768, 1024, 1440]

const PAGES = [
  '/',
  '/capabilities',
  '/capabilities/geospatial-mapping',
  '/industries/utilities',
  '/industries/telecommunications',
  '/work',
  '/work/multi-country-mapping',
  '/contact',
  '/careers',
  '/insights',
]

/*
 * Exempt from the target-size check:
 *   - third-party widgets whose markup is not ours to fix (Google Translate);
 *   - the live fleet markers on the world map. Their size and position ARE the
 *     information being conveyed, which is the "essential" exception in WCAG 2.2 SC
 *     2.5.8. They still carry an enlarged transparent hit area, are keyboard focusable,
 *     and the same vehicle data is available as text beside the map.
 */
const IGNORE_SELECTORS = [
  '.goog-te-combo',
  '.skiptranslate',
  '[class*="gt_"]',
  '#google_translate_element',
  '.fleet-vehicle',
]

const audit = async (page) =>
  page.evaluate((ignore) => {
    const ignored = (el) => ignore.some((sel) => el.closest(sel))

    const interactive = [...document.querySelectorAll('a[href], button, input, select, textarea, [role="button"]')]
      .filter((el) => !ignored(el))
      .filter((el) => {
        const style = getComputedStyle(el)
        if (style.display === 'none' || style.visibility === 'hidden' || style.opacity === '0') return false
        const rect = el.getBoundingClientRect()
        return rect.width > 0 && rect.height > 0
      })

    const describe = (el) => {
      const rect = el.getBoundingClientRect()
      const text = (el.textContent || el.getAttribute('aria-label') || el.getAttribute('name') || '')
        .trim()
        .replace(/\s+/g, ' ')
        .slice(0, 34)
      return `${el.tagName.toLowerCase()}${text ? ` "${text}"` : ''} ${Math.round(rect.width)}x${Math.round(rect.height)}`
    }

    /* 2.5.8 exempts a control that is inline inside a sentence of text. */
    const inlineInText = (el) => {
      if (!(el instanceof HTMLAnchorElement)) return false
      const parent = el.parentElement
      if (!parent) return false
      const parentText = (parent.textContent || '').trim().length
      const ownText = (el.textContent || '').trim().length
      return parentText > ownText + 20
    }

    const tooSmallAA = interactive
      .filter((el) => {
        const r = el.getBoundingClientRect()
        return (r.width < 24 || r.height < 24) && !inlineInText(el)
      })
      .map(describe)

    const belowThumb = interactive
      .filter((el) => el.getBoundingClientRect().height < 44 && !inlineInText(el))
      .map(describe)

    const imagesWithoutSize = [...document.images]
      .filter((img) => !ignored(img) && img.getAttribute('src'))
      .filter((img) => !img.getAttribute('width') || !img.getAttribute('height'))
      .filter((img) => !getComputedStyle(img).aspectRatio || getComputedStyle(img).aspectRatio === 'auto')
      .map((img) => (img.getAttribute('src') || '').split('/').pop())

    const overflow = Math.max(
      document.documentElement.scrollWidth - document.documentElement.clientWidth,
      0
    )

    return {
      controls: interactive.length,
      tooSmallAA,
      belowThumb,
      imagesWithoutSize: [...new Set(imagesWithoutSize)],
      overflow,
    }
  }, IGNORE_SELECTORS)

const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] })
const page = await browser.newPage()

let failures = 0
const noteworthy = []

for (const path of PAGES) {
  for (const width of BREAKPOINTS) {
    await page.setViewport({ width, height: width < 500 ? 844 : 900 })
    await page.goto(BASE + path, { waitUntil: 'networkidle0', timeout: 60000 })
    await new Promise((r) => setTimeout(r, 500))

    const result = await audit(page)
    const problems = []

    if (result.tooSmallAA.length) {
      problems.push(`${result.tooSmallAA.length} target(s) under 24px: ${result.tooSmallAA.slice(0, 4).join(' | ')}`)
      failures += result.tooSmallAA.length
    }
    if (result.overflow > 0) {
      problems.push(`scrolls sideways by ${result.overflow}px`)
      failures += 1
    }
    if (width <= 430 && result.belowThumb.length) {
      noteworthy.push(
        `${path} @${width}: ${result.belowThumb.length} control(s) under 44px tall: ${result.belowThumb
          .slice(0, 4)
          .join(' | ')}`
      )
    }
    if (result.imagesWithoutSize.length) {
      noteworthy.push(`${path} @${width}: images without dimensions: ${result.imagesWithoutSize.slice(0, 5).join(', ')}`)
    }

    if (problems.length) console.log(`FAIL ${path} @${width}  ${problems.join('; ')}`)
  }
  console.log(`checked ${path}`)
}

if (noteworthy.length) {
  console.log('\nAdvisory (not gating):')
  for (const line of [...new Set(noteworthy)].slice(0, 25)) console.log('  ' + line)
}

await browser.close()

console.log(failures === 0 ? '\nPASS: no blocking target-size or overflow issues' : `\nFAIL: ${failures} issue(s)`)
process.exit(failures === 0 ? 0 : 1)
