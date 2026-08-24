const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-web-security'],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');

  // Remove webdriver detection
  await page.evaluateOnNewDocument(() => {
    Object.defineProperty(navigator, 'webdriver', { get: () => false });
    window.chrome = { runtime: {} };
    Object.defineProperty(navigator, 'plugins', { get: () => [1, 2, 3] });
  });

  const url = 'https://www.freepik.com/premium-photo/businessman-analyzing-financial-data-tablet_281161339.htm';
  console.log('Loading:', url);

  // Log all network requests to img.freepik.com
  page.on('response', (resp) => {
    if (resp.url().includes('freepik')) {
      console.log(`[NET] ${resp.status()} ${resp.url().substring(0, 120)}`);
    }
  });

  await page.goto(url, { waitUntil: 'networkidle2', timeout: 45000 });
  await new Promise(r => setTimeout(r, 5000));

  const finalUrl = page.url();
  console.log('\nFinal URL:', finalUrl);

  // Check for og:image
  const ogImage = await page.$eval('meta[property="og:image"]', el => el.content).catch(() => 'none');
  console.log('og:image:', ogImage);

  // Count all imgs
  const imgCount = await page.evaluate(() => document.querySelectorAll('img').length);
  console.log('Total <img> elements:', imgCount);

  // List all img srcs
  const imgSrcs = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('img')).slice(0, 20).map(i => i.src.substring(0, 150));
  });
  console.log('\nImage sources:');
  imgSrcs.forEach(s => console.log(' ', s));

  // Save HTML
  const html = await page.content();
  fs.writeFileSync('debug-resource.html', html);
  console.log('\nHTML saved to debug-resource.html (' + (html.length/1024).toFixed(0) + ' KB)');

  // Check if page has challenge/captcha
  const bodyText = await page.evaluate(() => document.body.innerText.substring(0, 500));
  console.log('\nPage text preview:', bodyText.substring(0, 300));

  await browser.close();
})();
