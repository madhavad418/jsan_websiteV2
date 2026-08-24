import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';

puppeteer.use(StealthPlugin());

const slugs = [
  // suburban-aerial search
  '-X_GwzO73r4', 'yfn7NHjBgck', 'jxpadpazkfw', 'HWN6p2iWR-Y',
  '4G7ZEDzH-6w', 'CNV8ytt7WD8', 'XCRMNZhsxNY',
  // fiber-internet search
  'd_sGH7NGoGI', 'JyRTi3LoQnc', '8bghKxNU1j0', '9Qq_G14hNC8',
  'RB76ECkJfvE', 'o0_n41P6HY8', 'mhA3QOXME5M',
];

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  for (const slug of slugs) {
    try {
      await page.goto(`https://unsplash.com/photos/${slug}`, { waitUntil: 'domcontentloaded', timeout: 30000 });
      await new Promise(r => setTimeout(r, 1500));
      const meta = await page.evaluate(() => {
        const ogImage = document.querySelector('meta[property="og:image"]')?.getAttribute('content');
        const title = document.querySelector('meta[property="og:title"]')?.getAttribute('content') || '';
        const desc = document.querySelector('meta[property="og:description"]')?.getAttribute('content') || '';
        return { ogImage, title, desc };
      });
      console.log(`${slug} | ${meta.title?.slice(0, 70)}`);
      console.log(`   ${meta.ogImage || '(none)'}`);
    } catch (e) {
      console.log(`${slug} ERROR: ${e.message}`);
    }
  }

  await browser.close();
})();
