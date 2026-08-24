#!/usr/bin/env node
/**
 * Freepik Downloader v8 ,Simple approach
 * Uses a persistent Chrome profile so you only log in ONCE manually.
 * After that, sessions persist across runs.
 */

const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

const fs = require('fs');
const path = require('path');

const CONFIG_PATH = path.join(__dirname, 'config.json');
const OUTPUT_DIR = path.resolve(__dirname, '../../public/pillars');
const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const PROFILE_DIR = path.join(__dirname, 'chrome-session'); // persistent profile

function loadConfig() {
  return JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8'));
}

async function main() {
  const config = loadConfig();
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  console.log('=== Freepik Downloader v8 ===\n');

  const browser = await puppeteer.launch({
    headless: false,
    executablePath: CHROME_PATH,
    userDataDir: PROFILE_DIR,
    args: [
      '--no-sandbox',
      '--disable-blink-features=AutomationControlled',
      '--disable-infobars',
      '--window-size=1920,1080',
    ],
    ignoreDefaultArgs: ['--enable-automation'],
  });

  const page = (await browser.pages())[0] || await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });
  await page.evaluateOnNewDocument(() => {
    Object.defineProperty(navigator, 'webdriver', { get: () => false });
  });

  // Step 1: Check if logged in
  console.log('[1] Checking login status...');
  await page.goto('https://www.freepik.com/', { waitUntil: 'networkidle2', timeout: 60000 });
  await new Promise(r => setTimeout(r, 5000));

  let isLoggedIn = await page.evaluate(() => {
    const els = document.querySelectorAll('a, button, span');
    for (const el of els) {
      if ((el.textContent || '').trim() === 'Sign in' && el.offsetParent !== null) return false;
    }
    return true;
  });

  if (!isLoggedIn) {
    // Navigate to login page for user
    console.log('[!] Not logged in. Opening login page...');
    await page.goto('https://www.freepik.com/log-in?client_id=freepik&lang=en', {
      waitUntil: 'networkidle2', timeout: 30000
    });

    console.log('');
    console.log('╔═══════════════════════════════════════════════╗');
    console.log('║  Please LOG IN manually in the browser window ║');
    console.log('║  You have 60 seconds.                         ║');
    console.log('╚═══════════════════════════════════════════════╝');
    console.log('');

    // Wait and poll for login
    for (let i = 0; i < 60; i++) {
      await new Promise(r => setTimeout(r, 1000));
      const currentUrl = page.url();
      if (currentUrl.includes('freepik.com') && !currentUrl.includes('log-in') && !currentUrl.includes('id.freepik')) {
        // Redirected away from login = success
        isLoggedIn = true;
        break;
      }
      if (i % 10 === 9) console.log(`    Waiting... (${60 - i}s left)`);
    }

    if (!isLoggedIn) {
      // Final check on homepage
      await page.goto('https://www.freepik.com/', { waitUntil: 'networkidle2', timeout: 20000 });
      await new Promise(r => setTimeout(r, 3000));
      isLoggedIn = await page.evaluate(() => {
        const els = document.querySelectorAll('a, button, span');
        for (const el of els) {
          if ((el.textContent || '').trim() === 'Sign in' && el.offsetParent !== null) return false;
        }
        return true;
      });
    }

    if (!isLoggedIn) {
      console.log('[✗] Not logged in. Run again after logging in ,session will persist.');
      await browser.close();
      return;
    }
  }

  console.log('[✓] Logged in!\n');

  // Setup Chrome download dir
  const downloadDir = path.join(__dirname, 'downloads-tmp');
  fs.mkdirSync(downloadDir, { recursive: true });
  const client = await page.createCDPSession();
  await client.send('Page.setDownloadBehavior', {
    behavior: 'allow',
    downloadPath: downloadDir,
  });

  const results = [];

  // Download ALL images from config
  for (let idx = 0; idx < config.images.length; idx++) {
    const img = config.images[idx];
    const destPath = path.join(OUTPUT_DIR, img.filename);
    console.log(`\n[${'='.repeat(50)}]`);
    console.log(`[${idx + 1}/${config.images.length}] ${img.filename}`);
    console.log(`    URL: ${img.url}`);

    // Clear download dir
    for (const f of fs.readdirSync(downloadDir)) {
      try { fs.unlinkSync(path.join(downloadDir, f)); } catch (e) {}
    }

    // Navigate to resource page
    await page.goto(img.url, { waitUntil: 'networkidle2', timeout: 60000 });
    await new Promise(r => setTimeout(r, 3000));
    console.log(`    Title: "${await page.title()}"`);

    // Click download button
    const clicked = await page.evaluate(() => {
      const btn = document.querySelector('[data-cy="download-button"]');
      if (btn) { btn.click(); return 'data-cy'; }
      const btns = document.querySelectorAll('button');
      for (const el of btns) {
        const text = (el.textContent || '').trim().toLowerCase();
        if (text === 'download' && el.offsetParent !== null) {
          el.click();
          return 'text-match';
        }
      }
      return null;
    });

    if (!clicked) {
      console.log('    [✗] No download button found');
      results.push({ file: img.filename, status: 'FAIL', reason: 'no button' });
      continue;
    }

    // Wait for download
    await new Promise(r => setTimeout(r, 5000));

    // Check for upsell
    const state = await page.evaluate(() => {
      const text = document.body.innerText;
      if (text.includes('Unlock this asset') || text.includes('Go Premium') ||
          text.includes('Get more from Freepik') || text.includes('See all plans')) return 'upsell';
      return 'ok';
    });

    if (state === 'upsell') {
      console.log('    [✗] Upsell modal ,no premium access for this resource');
      results.push({ file: img.filename, status: 'FAIL', reason: 'upsell' });
      // Dismiss modal
      await page.evaluate(() => {
        const closeBtn = document.querySelector('[class*="modal"] button[aria-label="Close"], [role="dialog"] button[aria-label]');
        if (closeBtn) closeBtn.click();
      });
      await new Promise(r => setTimeout(r, 1000));
      continue;
    }

    // Wait for Chrome to finish downloading
    let downloaded = false;
    for (let i = 0; i < 30; i++) {
      await new Promise(r => setTimeout(r, 1000));
      const files = fs.existsSync(downloadDir) ? fs.readdirSync(downloadDir) : [];
      const complete = files.filter(f => !f.endsWith('.crdownload'));
      if (complete.length > 0) {
        const src = path.join(downloadDir, complete[0]);
        const sizeKB = Math.round(fs.statSync(src).size / 1024);
        fs.copyFileSync(src, destPath);
        console.log(`    [✓] ${sizeKB} KB → ${img.filename}`);
        results.push({ file: img.filename, status: 'OK', size: sizeKB });
        downloaded = true;
        break;
      }
    }

    if (!downloaded) {
      console.log('    [✗] Download timed out');
      results.push({ file: img.filename, status: 'FAIL', reason: 'timeout' });
    }

    // Small delay between downloads to avoid rate limiting
    await new Promise(r => setTimeout(r, 2000));
  }

  await browser.close();

  // Summary
  console.log(`\n${'='.repeat(50)}`);
  console.log('RESULTS:');
  console.log(`${'='.repeat(50)}`);
  for (const r of results) {
    if (r.status === 'OK') {
      console.log(`  [✓] ${r.file} (${r.size} KB)`);
    } else {
      console.log(`  [✗] ${r.file} ,${r.reason}`);
    }
  }
  const ok = results.filter(r => r.status === 'OK').length;
  console.log(`\n${ok}/${results.length} downloaded successfully`);

  // Cleanup
  if (fs.existsSync(downloadDir)) {
    for (const f of fs.readdirSync(downloadDir)) {
      try { fs.unlinkSync(path.join(downloadDir, f)); } catch (e) {}
    }
    try { fs.rmdirSync(downloadDir); } catch (e) {}
  }
}

main().catch(err => {
  console.error('Fatal:', err);
  process.exit(1);
});
