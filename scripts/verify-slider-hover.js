import puppeteer from 'puppeteer';
import { mkdir } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const delay = (ms) => new Promise(r => setTimeout(r, ms));

const BASE = process.env.BASE_URL || 'http://localhost:3001';

async function captureAt(viewport, label) {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();
  await page.setViewport(viewport);
  const errors = [];
  page.on('pageerror', e => errors.push('PAGE: ' + e.message));
  page.on('console', m => { if (m.type() === 'error') errors.push('CONSOLE: ' + m.text()); });
  await page.goto(BASE + '/', { waitUntil: 'networkidle2', timeout: 60000 });
  await delay(1500);

  // Scroll to slider  use scrollIntoView with delay to ensure animation completes
  await page.evaluate(() => {
    const el = document.querySelector('section[aria-label="Our Services"]');
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
  });
  await delay(1000);

  const out = join(__dirname, '../screenshots/slider-hover');
  await mkdir(out, { recursive: true });

  // Full page screenshot (so we definitely capture what's rendered)
  await page.screenshot({ path: join(out, `${label}-fullpage.png`), fullPage: true });

  // Initial state at viewport
  await page.mouse.move(5, 5);
  await delay(300);
  await page.screenshot({ path: join(out, `${label}-00-initial.png`) });

  // Position of slider in current viewport
  const sliderY = await page.evaluate(() => {
    const el = document.querySelector('section[aria-label="Our Services"]');
    return el ? el.getBoundingClientRect().top : -1;
  });
  console.log(`[${label}] slider viewport y =`, sliderY);

  // Hover each column
  if (viewport.width >= 1024) {
    for (let i = 0; i < 6; i++) {
      const pos = await page.evaluate((idx) => {
        const slider = document.querySelector('section[aria-label="Our Services"]');
        const track = slider && [...slider.children].find(c => c.classList?.contains('z-10') && c.classList?.contains('flex'));
        const col = track && track.children[idx];
        if (!col) return null;
        const r = col.getBoundingClientRect();
        return { x: r.x + r.width / 2, y: r.y + r.height / 2, title: col.querySelector('h3')?.innerText };
      }, i);
      if (!pos) continue;
      await page.mouse.move(pos.x, pos.y);
      await delay(350);
      await page.screenshot({ path: join(out, `${label}-0${i + 1}-hover-${i}.png`) });
      console.log(`[${label}] hovered ${i} (${pos.title})`);
    }
  }

  if (errors.length) {
    console.log(`[${label}] ERRORS:`);
    errors.forEach(e => console.log(' -', e));
  }
  await browser.close();
}

(async () => {
  await captureAt({ width: 1440, height: 900 }, 'desktop');
  await captureAt({ width: 820, height: 1180 }, 'tablet');
  await captureAt({ width: 390, height: 844 }, 'mobile');
})();
