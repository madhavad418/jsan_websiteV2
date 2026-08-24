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

  await page.goto(BASE + '/services/telecom-network-intelligence', { waitUntil: 'networkidle2', timeout: 60000 });
  await delay(1500);

  // Scroll to the capabilities section ("What We Deliver")
  await page.evaluate(() => {
    const headings = [...document.querySelectorAll('h2')];
    const t = headings.find(h => h.innerText.includes('Network Intelligence, From Tower'));
    if (t) t.scrollIntoView({ behavior: 'instant', block: 'start' });
  });
  await delay(800);
  await page.screenshot({ path: join(out, '05-telecom-capabilities-1.png'), clip: { x: 0, y: 0, width: 1440, height: 900 } });

  // Scroll further to see all 7 cards
  await page.evaluate(() => window.scrollBy(0, 500));
  await delay(500);
  await page.screenshot({ path: join(out, '06-telecom-capabilities-2.png'), clip: { x: 0, y: 0, width: 1440, height: 900 } });

  const cardTitles = await page.evaluate(() => {
    return [...document.querySelectorAll('section.bg-gray-50 h3')].map(h => h.innerText);
  });
  console.log('Telecom capability cards:', cardTitles);

  // Also verify the "Know More" buttons' hrefs
  const links = await page.evaluate(() => {
    return [...document.querySelectorAll('section.bg-gray-50 a')].map(a => ({ text: a.innerText, href: a.getAttribute('href') }));
  });
  console.log('Card links:');
  links.forEach(l => console.log(' -', l.text, '→', l.href));

  await browser.close();
})();
