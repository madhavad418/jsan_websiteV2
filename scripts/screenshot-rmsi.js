import puppeteer from 'puppeteer';
import { mkdir } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const delay = (ms) => new Promise(r => setTimeout(r, ms));

(async () => {
  const out = join(__dirname, '../screenshots/rmsi-reference');
  await mkdir(out, { recursive: true });

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  console.log('→ Loading rmsi.com');
  await page.goto('https://www.rmsi.com/', { waitUntil: 'networkidle2', timeout: 90000 });
  await delay(3000);

  // Dismiss cookie banner
  await page.evaluate(() => {
    const buttons = [...document.querySelectorAll('button')];
    const accept = buttons.find(b => /accept all|accept/i.test(b.textContent || ''));
    if (accept) accept.click();
  });
  await delay(1000);

  // Scroll to the industries slider
  const found = await page.evaluate(() => {
    const slider = document.querySelector('.industries-we-main');
    if (slider) {
      slider.scrollIntoView({ behavior: 'instant', block: 'start' });
      return true;
    }
    return false;
  });
  console.log('   slider found:', found);
  await delay(1500);

  await page.screenshot({ path: join(out, '01-initial.png') });

  // Click Next to see card 2 active
  const clicked = await page.evaluate(() => {
    const btn = document.querySelector('.slick-next');
    if (btn) { btn.click(); return true; }
    return false;
  });
  console.log('   clicked next:', clicked);
  await delay(1200);
  await page.screenshot({ path: join(out, '02-after-next.png') });

  // Click again
  await page.evaluate(() => document.querySelector('.slick-next')?.click());
  await delay(1200);
  await page.screenshot({ path: join(out, '03-after-2-next.png') });

  // Capture just the slider region
  const sliderBox = await page.evaluate(() => {
    const el = document.querySelector('.industries-we-main');
    if (!el) return null;
    const r = el.getBoundingClientRect();
    return { x: r.x, y: r.y, w: r.width, h: r.height };
  });
  if (sliderBox) {
    await page.evaluate((y) => window.scrollTo(0, window.scrollY + y - 20), sliderBox.y);
    await delay(500);
    await page.screenshot({
      path: join(out, '04-slider-only.png'),
      clip: { x: sliderBox.x, y: 20, width: sliderBox.w, height: Math.min(sliderBox.h, 800) },
    });
  }

  await browser.close();
})();
