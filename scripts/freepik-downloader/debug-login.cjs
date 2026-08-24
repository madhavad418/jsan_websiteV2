const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');

  console.log('Going to login page...');
  await page.goto('https://www.freepik.com/log-in', { waitUntil: 'networkidle2', timeout: 30000 });
  await new Promise(r => setTimeout(r, 3000));

  const html = await page.content();
  fs.writeFileSync('login-page.html', html);
  console.log('Saved login-page.html');

  // Also try the direct login URL
  const url = page.url();
  console.log('Current URL:', url);

  // List all input elements
  const inputs = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('input')).map(i => ({
      type: i.type, name: i.name, id: i.id, placeholder: i.placeholder, class: i.className.substring(0, 80)
    }));
  });
  console.log('Inputs found:', JSON.stringify(inputs, null, 2));

  // List all buttons
  const buttons = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('button, a[role="button"]')).map(b => ({
      text: b.textContent.trim().substring(0, 50), type: b.type, class: b.className.substring(0, 80)
    }));
  });
  console.log('Buttons found:', JSON.stringify(buttons, null, 2));

  // Check for iframes
  const iframes = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('iframe')).map(f => ({ src: f.src, id: f.id }));
  });
  console.log('Iframes:', JSON.stringify(iframes, null, 2));

  await browser.close();
})();
