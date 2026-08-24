import puppeteer from 'puppeteer';
import { mkdir } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const delay = (ms) => new Promise(r => setTimeout(r, ms));

(async () => {
  const out = join(__dirname, '../screenshots/services-slider');
  await mkdir(out, { recursive: true });

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const errors = [];

  // Desktop view
  const desktop = await browser.newPage();
  await desktop.setViewport({ width: 1440, height: 900 });
  desktop.on('pageerror', e => errors.push('PAGE: ' + e.message));
  desktop.on('console', m => { if (m.type() === 'error') errors.push('CONSOLE: ' + m.text()); });

  console.log('→ desktop initial');
  await desktop.goto((process.env.BASE_URL || 'http://localhost:3000') + '/', { waitUntil: 'networkidle2', timeout: 60000 });
  await delay(1500);

  // Scroll to services section
  await desktop.evaluate(() => {
    const h2s = [...document.querySelectorAll('h2')];
    const target = h2s.find(h => h.innerText.includes('IT & Geo Spatial Services'));
    if (target) target.scrollIntoView({ behavior: 'instant', block: 'start' });
  });
  await delay(800);
  await desktop.screenshot({ path: join(out, '01-desktop-initial.png') });
  console.log('   active title:', await desktop.evaluate(() => {
    return document.querySelector('section h3')?.innerText || '?';
  }));

  // Click Next a couple of times
  for (let i = 0; i < 2; i++) {
    await desktop.click('button[aria-label="Next service"]');
    await delay(800);
  }
  await desktop.screenshot({ path: join(out, '02-desktop-after-2-next.png') });
  console.log('   active after 2 next:', await desktop.evaluate(() => {
    return document.querySelector('section h3')?.innerText || '?';
  }));

  // Click on a non-active card (3rd visible)
  await desktop.evaluate(() => {
    const cards = [...document.querySelectorAll('[role="button"][aria-pressed]')];
    if (cards[5]) cards[5].click();
  });
  await delay(800);
  await desktop.screenshot({ path: join(out, '03-desktop-last-card.png') });
  console.log('   active last:', await desktop.evaluate(() => {
    return document.querySelector('section h3')?.innerText || '?';
  }));

  // Tablet view
  console.log('→ tablet');
  const tablet = await browser.newPage();
  await tablet.setViewport({ width: 820, height: 1180 });
  await tablet.goto((process.env.BASE_URL || 'http://localhost:3000') + '/', { waitUntil: 'networkidle2', timeout: 60000 });
  await delay(1500);
  await tablet.evaluate(() => {
    const h2s = [...document.querySelectorAll('h2')];
    const target = h2s.find(h => h.innerText.includes('IT & GIS Consulting'));
    if (target) target.scrollIntoView({ behavior: 'instant', block: 'start' });
  });
  await delay(800);
  await tablet.screenshot({ path: join(out, '04-tablet.png') });

  // Mobile view
  console.log('→ mobile');
  const mobile = await browser.newPage();
  await mobile.setViewport({ width: 390, height: 844 });
  await mobile.goto((process.env.BASE_URL || 'http://localhost:3000') + '/', { waitUntil: 'networkidle2', timeout: 60000 });
  await delay(1500);
  await mobile.evaluate(() => {
    const h2s = [...document.querySelectorAll('h2')];
    const target = h2s.find(h => h.innerText.includes('IT & GIS Consulting'));
    if (target) target.scrollIntoView({ behavior: 'instant', block: 'start' });
  });
  await delay(800);
  await mobile.screenshot({ path: join(out, '05-mobile.png') });

  if (errors.length) {
    console.log('\nERRORS:');
    errors.forEach(e => console.log(' -', e));
  } else {
    console.log('\nNo runtime errors.');
  }
  await browser.close();
})();
