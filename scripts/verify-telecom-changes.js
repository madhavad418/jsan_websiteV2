import puppeteer from 'puppeteer';
import { mkdir } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const delay = (ms) => new Promise(r => setTimeout(r, ms));

const BASE = process.env.BASE_URL || 'http://localhost:3000';

(async () => {
  const out = join(__dirname, '../screenshots/telecom-changes');
  await mkdir(out, { recursive: true });

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  const errors = [];
  page.on('pageerror', e => errors.push('PAGE: ' + e.message));
  page.on('console', m => { if (m.type() === 'error') errors.push('CONSOLE: ' + m.text()); });

  // Home page slider
  console.log('→ home');
  await page.goto(BASE + '/', { waitUntil: 'networkidle2', timeout: 60000 });
  await delay(1500);
  await page.evaluate(() => {
    const el = document.querySelector('section[aria-label="Our Services"]');
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
  });
  await delay(800);
  await page.screenshot({ path: join(out, '01-home-slider.png'), clip: { x: 0, y: 0, width: 1440, height: 800 } });
  const titles = await page.evaluate(() => {
    const slider = document.querySelector('section[aria-label="Our Services"]');
    return [...(slider?.querySelectorAll('h3') || [])].map(h => h.innerText);
  });
  console.log('   slider services:', titles);

  // Location Intelligence page
  console.log('→ /services/location-intelligence');
  await page.goto(BASE + '/services/location-intelligence', { waitUntil: 'networkidle2', timeout: 60000 });
  await delay(1500);
  await page.screenshot({ path: join(out, '02-li-page-top.png'), fullPage: false });
  // Scroll to sub-services grid
  await page.evaluate(() => {
    const h3s = [...document.querySelectorAll('h2')];
    const subs = h3s.find(h => h.innerText.includes('Sub')) || document.querySelector('section.bg-gray-50');
    if (subs) subs.scrollIntoView({ behavior: 'instant', block: 'start' });
  });
  await delay(800);
  await page.screenshot({ path: join(out, '03-li-subservices.png'), fullPage: false });
  const subTitles = await page.evaluate(() => {
    return [...document.querySelectorAll('h2')].map(h => h.innerText.slice(0, 50));
  });
  console.log('   LI page H2s:', subTitles);

  // Telecom Network Intelligence page
  console.log('→ /services/telecom-network-intelligence');
  await page.goto(BASE + '/services/telecom-network-intelligence', { waitUntil: 'networkidle2', timeout: 60000 });
  await delay(1500);
  await page.screenshot({ path: join(out, '04-telecom-page.png'), fullPage: false });
  const telecomH1 = await page.evaluate(() => document.querySelector('h1')?.innerText);
  console.log('   telecom H1:', telecomH1);

  if (errors.length) {
    console.log('\nERRORS:');
    errors.forEach(e => console.log(' -', e));
  } else {
    console.log('\nNo runtime errors.');
  }
  await browser.close();
})();
