import puppeteer from 'puppeteer'
const url = process.argv[2], widths = process.argv.slice(3).map(Number)
const b = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] })
for (const w of widths) {
  const p = await b.newPage()
  await p.setViewport({ width: w, height: 800, isMobile: true, hasTouch: true, deviceScaleFactor: 2 })
  await p.goto(url, { waitUntil: 'networkidle0', timeout: 60000 })
  await new Promise(r => setTimeout(r, 2000))
  const res = await p.evaluate((vw) => {
    const doc = document.documentElement
    const out = []
    const seen = new Set()
    for (const el of document.querySelectorAll('*')) {
      const r = el.getBoundingClientRect()
      if (r.width === 0 && r.height === 0) continue
      const over = Math.round(r.right - vw)
      const left = Math.round(r.left)
      if (over > 1 || left < -1) {
        // Only report the outermost offender in each chain
        let anc = el.parentElement, covered = false
        while (anc) { if (seen.has(anc)) { covered = true; break } anc = anc.parentElement }
        if (covered) continue
        seen.add(el)
        out.push({
          tag: el.tagName.toLowerCase(),
          cls: (el.className && typeof el.className === 'string' ? el.className : '').slice(0, 110),
          text: (el.textContent || '').trim().slice(0, 40),
          left, right: Math.round(r.right), w: Math.round(r.width), over,
        })
      }
    }
    return {
      scrollW: doc.scrollWidth, clientW: doc.clientWidth,
      bodyScrollW: document.body.scrollWidth,
      offenders: out.slice(0, 14),
    }
  }, w)
  console.log(`\n===== ${w}px =====`)
  console.log(`scrollWidth ${res.scrollW}  clientWidth ${res.clientW}  overflow: ${res.scrollW - res.clientW}px`)
  for (const o of res.offenders) console.log(`  <${o.tag}> L${String(o.left).padStart(5)} R${String(o.right).padStart(5)} w${String(o.w).padStart(4)} over:${String(o.over).padStart(4)}  ${o.cls}\n        "${o.text}"`)
  await p.close()
}
await b.close()
