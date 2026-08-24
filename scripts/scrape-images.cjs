// Capture <img> srcs + meta for specific pages we are reconstructing.
const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const BASE = 'https://www.jsanconsulting.com';
const OUT = path.join(__dirname, '..', 'scrape-output');

const PAGES = process.argv.slice(2);
if (!PAGES.length) { console.error('pass page paths'); process.exit(1); }

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox'],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 1000 });
  const out = {};
  for (const p of PAGES) {
    const url = BASE + p;
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 45000 });
    await new Promise((r) => setTimeout(r, 1200));
    out[p] = await page.evaluate(() => {
      const imgs = Array.from(document.querySelectorAll('img'))
        .map((i) => ({ src: i.currentSrc || i.src, alt: i.alt }))
        .filter((i) => i.src && !i.src.startsWith('data:'));
      const bg = [];
      document.querySelectorAll('*').forEach((el) => {
        const b = getComputedStyle(el).backgroundImage;
        if (b && b !== 'none' && b.includes('url(')) bg.push(b);
      });
      return { imgs, bg: [...new Set(bg)].slice(0, 30) };
    });
    console.log('IMG', p, out[p].imgs.length, 'imgs');
  }
  fs.writeFileSync(path.join(OUT, '_images.json'), JSON.stringify(out, null, 2));
  await browser.close();
})();
