import puppeteer from 'puppeteer'
const b = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] })
const p = await b.newPage()
await p.setViewport({ width: 320, height: 900, isMobile: true, hasTouch: true, deviceScaleFactor: 2 })
await p.goto('http://localhost:3001/contact', { waitUntil: 'networkidle0', timeout: 60000 })
await new Promise(r => setTimeout(r, 2000))
const res = await p.evaluate(() => {
  const grid = document.querySelector('[class*="col-span-3"]')
  const info = document.querySelector('[class*="col-span-2"]')
  const probe = (root) => {
    const out = []
    for (const el of root.querySelectorAll('*')) {
      if (!el.getBoundingClientRect().width) continue
      const prev = el.style.width
      el.style.width = 'min-content'
      const mc = el.getBoundingClientRect().width
      el.style.width = prev
      if (mc > 290) out.push({ tag: el.tagName.toLowerCase(), cls: (typeof el.className==='string'?el.className:'').slice(0,70), mc: Math.round(mc), text: (el.textContent||'').trim().slice(0,55) })
    }
    return out.sort((a,b)=>b.mc-a.mc).slice(0,5)
  }
  const pInfo = (el) => { const g = el.parentElement; const cs = getComputedStyle(g); return { cls:(typeof g.className==='string'?g.className:'').slice(0,90), display: cs.display, cols: cs.gridTemplateColumns, gap: cs.columnGap, w: Math.round(g.getBoundingClientRect().width) } }
  return { gridParent: pInfo(grid), form: probe(grid), info: probe(info),
           formW: Math.round(grid.getBoundingClientRect().width), infoW: Math.round(info.getBoundingClientRect().width) }
})
console.log('grid parent:', JSON.stringify(res.gridParent, null, 1))
console.log(`form col width ${res.formW}px, info col width ${res.infoW}px`)
console.log('\nform widest min-content:'); res.form.forEach(o=>console.log(`  ${o.mc}px <${o.tag}> ${o.cls}\n      "${o.text}"`))
console.log('\ninfo widest min-content:'); res.info.forEach(o=>console.log(`  ${o.mc}px <${o.tag}> ${o.cls}\n      "${o.text}"`))
await b.close()
