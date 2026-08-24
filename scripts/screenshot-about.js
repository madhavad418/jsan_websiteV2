import puppeteer from 'puppeteer';
import { mkdir } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function captureScreenshots() {
  const screenshotsDir = join(__dirname, '../screenshots/about');
  await mkdir(screenshotsDir, { recursive: true });

  console.log('Launching browser...');
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    defaultViewport: { width: 1920, height: 1080 }
  });

  const page = await browser.newPage();

  console.log('Navigating to About page...');
  await page.goto('http://localhost:3000/about', {
    waitUntil: 'networkidle2',
    timeout: 60000
  });

  await delay(3000);

  console.log('Taking full page screenshot...');
  await page.screenshot({
    path: join(screenshotsDir, '01-about-fullpage.png'),
    fullPage: true
  });

  console.log('Taking hero screenshot...');
  await page.screenshot({
    path: join(screenshotsDir, '02-about-hero.png'),
    fullPage: false
  });

  // Scroll through sections
  const scrollPositions = [
    { name: '03-stats', scroll: 600 },
    { name: '04-vision-mission', scroll: 1000 },
    { name: '05-leadership', scroll: 1600 },
    { name: '06-expertise', scroll: 2200 },
    { name: '07-philosophy', scroll: 2800 },
    { name: '08-values', scroll: 3400 },
    { name: '09-global', scroll: 4000 },
  ];

  for (const pos of scrollPositions) {
    console.log(`Capturing ${pos.name}...`);
    await page.evaluate((y) => window.scrollTo(0, y), pos.scroll);
    await delay(800);
    await page.screenshot({
      path: join(screenshotsDir, `${pos.name}.png`),
      fullPage: false
    });
  }

  await browser.close();
  console.log('\nAbout page screenshots saved to:', screenshotsDir);
}

captureScreenshots().catch(console.error);
