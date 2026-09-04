import puppeteer from 'puppeteer'
const out = process.argv[2], w = Number(process.argv[3]||320), suffix = process.argv[4]||''
const b = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] })
const p = await b.newPage()
await p.setViewport({ width: w, height: 820, isMobile: true, hasTouch: true, deviceScaleFactor: 2 })
await p.goto('http://localhost:3001/contact', { waitUntil: 'networkidle0', timeout: 60000 })
await new Promise(r => setTimeout(r, 1500))
const shots = [['form','[class*="col-span-3"]'], ['info','[class*="col-span-2"]']]
for (const [name, sel] of shots) {
  await p.evaluate(s => { const e = document.querySelector(s); e.scrollIntoView({block:'start'}); window.scrollBy(0,-90) }, sel)
  await new Promise(r => setTimeout(r, 1600))
  await p.screenshot({ path: `${out}/c${w}${suffix}-${name}.png` })
  console.log(name, 'ok')
}
// info card lower part
await p.evaluate(() => { const els=[...document.querySelectorAll('div')].filter(d=>d.className&&typeof d.className==='string'&&d.className.includes('from-[#0050a9]')&&d.className.includes('rounded-2xl')); if(els[0]){els[0].scrollIntoView({block:'center'})} })
await new Promise(r => setTimeout(r, 1400))
await p.screenshot({ path: `${out}/c${w}${suffix}-statscard.png` })
await b.close()
