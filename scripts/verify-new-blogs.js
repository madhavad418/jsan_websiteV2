import puppeteer from 'puppeteer';
import { mkdir } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const delay = (ms) => new Promise(r => setTimeout(r, ms));

const BASE = process.env.BASE_URL || 'http://localhost:3000';

const targets = [
  { name: '01-blogs-index', path: '/blogs' },
  { name: '02-poi-detail', path: '/blogs/poi-data-urban-navigation' },
  { name: '03-gis-detail', path: '/blogs/gis-critical-telecom-networks' },
  { name: '04-invisible-detail', path: '/blogs/invisible-infrastructure-digital-world' },
];

(async () => {
  const outDir = join(__dirname, '../screenshots/new-blogs');
  await mkdir(outDir, { recursive: true });

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    defaultViewport: { width: 1440, height: 900 },
  });
  const page = await browser.newPage();
  const errors = [];
  page.on('pageerror', e => errors.push('PAGE: ' + e.message));
  page.on('console', m => { if (m.type() === 'error') errors.push('CONSOLE: ' + m.text()); });

  for (const t of targets) {
    console.log('→', t.path);
    await page.goto(BASE + t.path, { waitUntil: 'networkidle2', timeout: 60000 });
    await delay(1500);
    await page.screenshot({ path: join(outDir, t.name + '.png'), fullPage: true });
    const title = await page.title();
    const h1 = await page.evaluate(() => document.querySelector('h1')?.innerText || '(no h1)');
    console.log('   title:', title, '| h1:', h1.slice(0, 80));
  }

  if (errors.length) {
    console.log('\nERRORS:');
    errors.forEach(e => console.log(' -', e));
  } else {
    console.log('\nNo runtime errors.');
  }

  await browser.close();
})();
