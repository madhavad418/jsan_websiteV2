import puppeteer from 'puppeteer';
import { mkdir } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function captureScreenshots() {
  const screenshotsDir = join(__dirname, '../screenshots/jsan');

  await mkdir(screenshotsDir, { recursive: true });

  console.log('Launching browser...');
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    defaultViewport: { width: 1920, height: 1080 }
  });

  const page = await browser.newPage();

  console.log('Navigating to JSAN website...');
  await page.goto('http://localhost:3000', {
    waitUntil: 'networkidle2',
    timeout: 60000
  });

  await delay(3000);

  console.log('Taking full page screenshot...');
  await page.screenshot({
    path: join(screenshotsDir, '01-fullpage.png'),
    fullPage: true
  });

  console.log('Taking hero section screenshot...');
  await page.evaluate(() => window.scrollTo(0, 0));
  await delay(1000);
  await page.screenshot({
    path: join(screenshotsDir, '02-hero-viewport.png'),
    fullPage: false
  });

  const sections = [
    { name: '03-header', scroll: 0 },
    { name: '04-hero', scroll: 100 },
    { name: '05-value-prop', scroll: 900 },
    { name: '06-featured-banner', scroll: 1200 },
    { name: '07-case-studies', scroll: 1800 },
    { name: '08-report-banner', scroll: 2600 },
    { name: '09-news', scroll: 3200 },
    { name: '10-careers', scroll: 4000 },
    { name: '11-contact', scroll: 4400 },
    { name: '12-footer', scroll: 5200 },
  ];

  for (const section of sections) {
    console.log(`Capturing ${section.name}...`);
    await page.evaluate((scrollY) => window.scrollTo(0, scrollY), section.scroll);
    await delay(1000);
    await page.screenshot({
      path: join(screenshotsDir, `${section.name}.png`),
      fullPage: false
    });
  }

  await browser.close();
  console.log('\nJSAN Screenshots saved to:', screenshotsDir);
}

captureScreenshots().catch(console.error);
