import puppeteer from 'puppeteer';
import { mkdir } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const delay = (ms) => new Promise(r => setTimeout(r, ms));

const BASE = process.env.BASE_URL || 'http://localhost:3001';

(async () => {
  const out = join(__dirname, '../screenshots/slider-inspect');
  await mkdir(out, { recursive: true });

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  page.on('pageerror', e => console.log('PAGE ERROR:', e.message));
  page.on('console', m => { if (m.type() === 'error') console.log('CONSOLE ERROR:', m.text()); });

  await page.goto(BASE + '/', { waitUntil: 'networkidle2', timeout: 60000 });
  await delay(1500);

  // Find slider section, scroll to it, screenshot just it
  const box = await page.evaluate(() => {
    const el = document.querySelector('section[aria-label="Our Services"]');
    if (!el) return null;
    el.scrollIntoView({ behavior: 'instant', block: 'start' });
    const r = el.getBoundingClientRect();
    return { x: r.x, y: r.y, w: r.width, h: r.height };
  });
  console.log('slider box:', box);
  await delay(500);

  if (box) {
    // After scrollIntoView, the slider top is at viewport top
    await page.screenshot({
      path: join(out, '01-slider-full.png'),
      clip: { x: 0, y: 0, width: 1440, height: Math.min(box.h, 800) },
    });
  }

  // Dump the slider HTML structure
  const html = await page.evaluate(() => {
    const el = document.querySelector('section[aria-label="Our Services"]');
    if (!el) return 'NOT FOUND';
    // Simplify: show structure with depth
    const simplify = (node, depth = 0) => {
      if (node.nodeType !== 1) return '';
      const tag = node.tagName.toLowerCase();
      const cls = node.className?.toString?.().slice(0, 60) || '';
      const text = node.children.length === 0 ? (node.innerText || '').slice(0, 60).replace(/\n/g, ' ') : '';
      let s = '  '.repeat(depth) + '<' + tag + (cls ? ' class="' + cls + '..."' : '') + '>' + (text ? ' ' + text : '') + '\n';
      for (const c of node.children) s += simplify(c, depth + 1);
      return s;
    };
    return simplify(el);
  });
  console.log('\n=== SLIDER STRUCTURE ===\n' + html.slice(0, 4000));

  // Read positions of key elements
  const positions = await page.evaluate(() => {
    const slider = document.querySelector('section[aria-label="Our Services"]');
    if (!slider) return null;
    const sr = slider.getBoundingClientRect();
    const h2 = slider.querySelector('h2');
    const h3s = [...slider.querySelectorAll('h3')];
    return {
      slider: { top: sr.top, left: sr.left, width: sr.width, height: sr.height },
      h2: h2 ? { top: h2.getBoundingClientRect().top, left: h2.getBoundingClientRect().left, text: h2.innerText.slice(0, 60) } : null,
      h3s: h3s.map(h => ({
        text: h.innerText,
        top: h.getBoundingClientRect().top,
        left: h.getBoundingClientRect().left,
        bottom: h.getBoundingClientRect().bottom,
      })),
    };
  });
  console.log('\n=== POSITIONS ===');
  console.log(JSON.stringify(positions, null, 2));

  await browser.close();
})();
