import puppeteer from 'puppeteer';
import { mkdir, writeFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function captureScreenshots() {
  const screenshotsDir = join(__dirname, '../screenshots/cognizant');

  // Create screenshots directory
  await mkdir(screenshotsDir, { recursive: true });

  console.log('Launching browser...');
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    defaultViewport: { width: 1920, height: 1080 }
  });

  const page = await browser.newPage();

  console.log('Navigating to Cognizant US website...');
  await page.goto('https://www.cognizant.com/us/en', {
    waitUntil: 'networkidle2',
    timeout: 60000
  });

  // Wait for page to fully load
  await delay(5000);

  // Close any popups/modals if present
  try {
    const closeButton = await page.$('[aria-label="Close"]');
    if (closeButton) await closeButton.click();
    await delay(500);
  } catch (e) {}

  console.log('Taking full page screenshot...');
  await page.screenshot({
    path: join(screenshotsDir, '01-fullpage.png'),
    fullPage: true
  });

  // Capture viewport screenshot (above the fold)
  console.log('Taking hero section screenshot...');
  await page.evaluate(() => window.scrollTo(0, 0));
  await delay(1000);
  await page.screenshot({
    path: join(screenshotsDir, '02-hero-viewport.png'),
    fullPage: false
  });

  // Scroll and capture sections
  const sections = [
    { name: '03-header', scroll: 0 },
    { name: '04-hero', scroll: 100 },
    { name: '05-after-hero', scroll: 900 },
    { name: '06-services-area', scroll: 1800 },
    { name: '07-case-studies', scroll: 2700 },
    { name: '08-mid-section', scroll: 3600 },
    { name: '09-lower-section', scroll: 4500 },
    { name: '10-footer-area', scroll: 6000 },
  ];

  for (const section of sections) {
    console.log(`Capturing ${section.name}...`);
    await page.evaluate((scrollY) => window.scrollTo(0, scrollY), section.scroll);
    await delay(1500);
    await page.screenshot({
      path: join(screenshotsDir, `${section.name}.png`),
      fullPage: false
    });
  }

  // Get page styles and structure info
  console.log('Extracting design details...');
  const designInfo = await page.evaluate(() => {
    const getComputedStyleInfo = (selector) => {
      const el = document.querySelector(selector);
      if (!el) return null;
      const style = window.getComputedStyle(el);
      return {
        fontSize: style.fontSize,
        fontFamily: style.fontFamily,
        fontWeight: style.fontWeight,
        color: style.color,
        backgroundColor: style.backgroundColor,
        padding: style.padding,
        margin: style.margin,
        lineHeight: style.lineHeight,
        letterSpacing: style.letterSpacing,
      };
    };

    // Get all text content structure
    const headings = Array.from(document.querySelectorAll('h1, h2, h3')).slice(0, 10).map(h => ({
      tag: h.tagName,
      text: h.textContent?.trim().substring(0, 100),
      fontSize: window.getComputedStyle(h).fontSize,
      fontWeight: window.getComputedStyle(h).fontWeight,
    }));

    return {
      body: getComputedStyleInfo('body'),
      header: getComputedStyleInfo('header'),
      h1: getComputedStyleInfo('h1'),
      h2: getComputedStyleInfo('h2'),
      nav: getComputedStyleInfo('nav'),
      headings,
    };
  });

  // Save design info to file
  await writeFile(
    join(screenshotsDir, 'design-info.json'),
    JSON.stringify(designInfo, null, 2)
  );

  console.log('\nDesign Information extracted and saved.');
  console.log('Headings found:', designInfo.headings?.map(h => `${h.tag}: ${h.text?.substring(0, 50)}`));

  await browser.close();
  console.log('\nScreenshots saved to:', screenshotsDir);
}

captureScreenshots().catch(console.error);
