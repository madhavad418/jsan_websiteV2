#!/usr/bin/env node
/**
 * Freepik Premium Downloader
 *
 * Usage:
 *   node download.cjs <url> <filename>          Download single image
 *   node download.cjs <url>                     Auto-name from URL
 *   node download.cjs --batch                   Download all from config.json
 *
 * First run: log in manually in the browser window (session persists after).
 */

const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

const fs = require('fs');
const path = require('path');

const CONFIG_PATH = path.join(__dirname, 'config.json');
const OUTPUT_DIR = path.resolve(__dirname, '../../public/pillars');
const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const PROFILE_DIR = path.join(__dirname, 'chrome-session');

function parseArgs() {
  const args = process.argv.slice(2);

  if (args.length === 0 || args.includes('--help') || args.includes('-h')) {
    console.log('Freepik Premium Downloader\n');
    console.log('Usage:');
    console.log('  node download.cjs <url> <filename>       Download single image');
    console.log('  node download.cjs <url>                  Auto-name from URL');
    console.log('  node download.cjs --batch                Download all from config.json');
    console.log('  node download.cjs -o <dir> <url> <name>  Custom output directory');
    console.log('\nExamples:');
    console.log('  node download.cjs https://www.freepik.com/premium-photo/... hero.jpg');
    console.log('  node download.cjs --batch');
    process.exit(0);
  }

  if (args.includes('--batch')) {
    // Support --batch <config-file> for custom config
    const batchIdx = args.indexOf('--batch');
    const customConfig = args[batchIdx + 1] && !args[batchIdx + 1].startsWith('-') ? path.resolve(args[batchIdx + 1]) : CONFIG_PATH;
    const config = JSON.parse(fs.readFileSync(customConfig, 'utf8'));
    return { images: config.images, outputDir: OUTPUT_DIR };
  }

  // Parse -o flag for custom output dir
  let outputDir = OUTPUT_DIR;
  const oIdx = args.indexOf('-o');
  if (oIdx !== -1 && args[oIdx + 1]) {
    outputDir = path.resolve(args[oIdx + 1]);
    args.splice(oIdx, 2);
  }

  const url = args[0];
  if (!url || !url.includes('freepik.com')) {
    console.error('Error: First argument must be a Freepik URL');
    process.exit(1);
  }

  const cleanUrl = url.split('#')[0];

  let filename = args[1];
  if (!filename) {
    const slug = cleanUrl.match(/\/([^/]+?)(?:_\d+)?\.htm/)?.[1] || 'freepik-download';
    filename = slug.substring(0, 80).replace(/[^a-zA-Z0-9-_]/g, '-') + '.jpg';
  }
  if (!/\.\w+$/.test(filename)) filename += '.jpg';

  return { images: [{ url: cleanUrl, filename }], outputDir };
}

async function ensureLoggedIn(page) {
  console.log('[…] Checking login...');
  await page.goto('https://www.freepik.com/', { waitUntil: 'networkidle2', timeout: 60000 });
  await new Promise(r => setTimeout(r, 5000));

  let loggedIn = await page.evaluate(() => {
    const els = document.querySelectorAll('a, button, span');
    for (const el of els) {
      if ((el.textContent || '').trim() === 'Sign in' && el.offsetParent !== null) return false;
    }
    return true;
  });

  if (loggedIn) { console.log('[✓] Logged in'); return true; }

  console.log('[!] Not logged in. Opening login page...\n');
  await page.goto('https://www.freepik.com/log-in?client_id=freepik&lang=en', {
    waitUntil: 'networkidle2', timeout: 30000
  });
  console.log('  Log in manually in the browser. Session persists for future runs.');
  console.log('  Waiting 60 seconds...\n');

  for (let i = 0; i < 60; i++) {
    await new Promise(r => setTimeout(r, 1000));
    const url = page.url();
    if (url.includes('freepik.com') && !url.includes('log-in') && !url.includes('id.freepik')) {
      loggedIn = true; break;
    }
    if (i % 15 === 14) console.log(`  Waiting... (${60 - i}s left)`);
  }

  if (!loggedIn) {
    await page.goto('https://www.freepik.com/', { waitUntil: 'networkidle2', timeout: 20000 });
    await new Promise(r => setTimeout(r, 3000));
    loggedIn = await page.evaluate(() => {
      const els = document.querySelectorAll('a, button, span');
      for (const el of els) {
        if ((el.textContent || '').trim() === 'Sign in' && el.offsetParent !== null) return false;
      }
      return true;
    });
  }

  console.log(loggedIn ? '[✓] Logged in' : '[✗] Not logged in');
  return loggedIn;
}

async function downloadImage(page, downloadDir, url, destPath) {
  // Clear download dir
  for (const f of fs.readdirSync(downloadDir)) {
    try { fs.unlinkSync(path.join(downloadDir, f)); } catch (e) {}
  }

  await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });
  await new Promise(r => setTimeout(r, 3000));

  // Handle Cloudflare
  const title = await page.title();
  if (title.toLowerCase().includes('verif') || title.toLowerCase().includes('just a moment')) {
    console.log('    Cloudflare ,waiting...');
    await new Promise(r => setTimeout(r, 15000));
  }

  // Click download button
  const clicked = await page.evaluate(() => {
    const btn = document.querySelector('[data-cy="download-button"]');
    if (btn) { btn.click(); return true; }
    const btns = document.querySelectorAll('button');
    for (const el of btns) {
      if ((el.textContent || '').trim().toLowerCase() === 'download' && el.offsetParent !== null) {
        el.click(); return true;
      }
    }
    return false;
  });

  if (!clicked) return { status: 'fail', reason: 'no download button found' };

  await new Promise(r => setTimeout(r, 5000));

  // Check upsell
  const upsell = await page.evaluate(() => {
    const text = document.body.innerText;
    return text.includes('Unlock this asset') || text.includes('Get more from Freepik') ||
           text.includes('See all plans') || text.includes('Go Premium');
  });

  if (upsell) {
    await page.keyboard.press('Escape');
    await new Promise(r => setTimeout(r, 500));
    return { status: 'fail', reason: 'premium upsell ,account may not cover this resource type' };
  }

  // Wait for Chrome download (up to 60s for large files)
  for (let i = 0; i < 60; i++) {
    await new Promise(r => setTimeout(r, 1000));
    const files = fs.readdirSync(downloadDir);
    const complete = files.filter(f => !f.endsWith('.crdownload'));
    if (complete.length > 0) {
      const src = path.join(downloadDir, complete[0]);
      const sizeKB = Math.round(fs.statSync(src).size / 1024);
      fs.copyFileSync(src, destPath);
      return { status: 'ok', size: sizeKB };
    }
    const inProgress = files.filter(f => f.endsWith('.crdownload'));
    if (inProgress.length > 0 && i % 10 === 9) {
      const partial = Math.round(fs.statSync(path.join(downloadDir, inProgress[0])).size / 1024);
      console.log(`    Downloading... ${partial} KB`);
    }
  }

  return { status: 'fail', reason: 'download timeout (60s)' };
}

async function main() {
  const opts = parseArgs();
  fs.mkdirSync(opts.outputDir, { recursive: true });

  console.log(`=== Freepik Downloader ===`);
  console.log(`Images: ${opts.images.length} | Output: ${opts.outputDir}\n`);

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

  const downloadDir = path.join(__dirname, 'downloads-tmp');
  fs.mkdirSync(downloadDir, { recursive: true });
  const client = await page.createCDPSession();
  await client.send('Page.setDownloadBehavior', {
    behavior: 'allow',
    downloadPath: downloadDir,
  });

  const loggedIn = await ensureLoggedIn(page);
  if (!loggedIn) {
    await browser.close();
    process.exit(1);
  }

  const results = [];
  for (let i = 0; i < opts.images.length; i++) {
    const img = opts.images[i];
    const destPath = path.join(opts.outputDir, img.filename);

    console.log(`\n[${i + 1}/${opts.images.length}] ${img.filename}`);
    console.log(`    ${img.url.substring(0, 120)}`);

    const result = await downloadImage(page, downloadDir, img.url, destPath);

    if (result.status === 'ok') {
      console.log(`    [✓] ${result.size} KB → ${img.filename}`);
    } else {
      console.log(`    [✗] ${result.reason}`);
    }

    results.push({ ...img, ...result });
    if (i < opts.images.length - 1) await new Promise(r => setTimeout(r, 2000));
  }

  await browser.close();

  // Summary
  const ok = results.filter(r => r.status === 'ok');
  const fail = results.filter(r => r.status !== 'ok');
  console.log('\n' + '='.repeat(50));
  for (const r of ok) console.log(`  [✓] ${r.filename} (${r.size} KB)`);
  for (const r of fail) console.log(`  [✗] ${r.filename} ,${r.reason}`);
  console.log(`\n${ok.length}/${results.length} downloaded`);

  if (ok.length > 0) {
    console.log('\nPaths for code:');
    for (const r of ok) console.log(`  /pillars/${r.filename}`);
  }

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
