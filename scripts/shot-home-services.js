import puppeteer from 'puppeteer';
import { mkdir } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const delay = (ms) => new Promise(r => setTimeout(r, ms));
const BASE = process.env.BASE_URL || 'http://localhost:3000';

(async () => {
  const out = join(__dirname, '../screenshots/home-services');
  await mkdir(out, { recursive: true });
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const errors = [];

  for (const vp of [{ w: 1440, h: 900, name: 'desktop' }, { w: 390, h: 844, name: 'mobile' }]) {
    const page = await browser.newPage();
    await page.setViewport({ width: vp.w, height: vp.h });
    page.on('pageerror', e => errors.push(`${vp.name} PAGE: ` + e.message));
    page.on('console', m => { if (m.type() === 'error') errors.push(`${vp.name} CONSOLE: ` + m.text()); });
    await page.goto(BASE + '/', { waitUntil: 'networkidle2', timeout: 60000 });
    await delay(1200);
    await page.evaluate(() => {
      const h2 = [...document.querySelectorAll('h2')].find(h => h.innerText.includes('IT & Geo Spatial Services'));
      if (h2) h2.scrollIntoView({ behavior: 'instant', block: 'start' });
    });
    await delay(600);
    await page.screenshot({ path: join(out, `${vp.name}.png`), fullPage: false });
    const cardTitles = await page.evaluate(() =>
      [...document.querySelectorAll('section .grid h3')].map(h => h.innerText)
    );
    console.log(`[${vp.name}] cards:`, cardTitles);
    await page.close();
  }
  console.log(errors.length ? 'ERRORS:\n' + errors.join('\n') : 'No runtime errors.');
  await browser.close();
})();
