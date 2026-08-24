// Deeper verification of the built site:
//  - Loads each route, then checks every <img> for naturalWidth === 0 (broken)
//  - Tests client-side navigation (clicking links → lazy chunks must load)
//  - Tests mobile viewport
//  - Captures screenshots to ./screenshots/verification/

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const BASE = process.env.BASE_URL || 'http://localhost:4173';
const SHOT_DIR = path.join(__dirname, '..', 'screenshots', 'verification');
fs.mkdirSync(SHOT_DIR, { recursive: true });

const ROUTES = [
  '/',
  '/about',
  '/services',
  '/services/geospatial',
  '/services/location-intelligence',
  '/products',
  '/products/jsan-vts',
  '/industries',
  '/industries/transport',
  '/technologies',
  '/contact',
  '/careers',
];

const IGNORE_URL_PATTERNS = [
  /favicon\.ico$/,
  /api\.maptiler\.com/,
  /linkedin\.com/,
  /chrome-extension:/,
];
const shouldIgnore = (u) => IGNORE_URL_PATTERNS.some((re) => re.test(u));

async function checkRoute(page, route, viewport, label) {
  const consoleErrors = [];
  const failedRequests = [];
  const pageErrors = [];

  const consoleHandler = (msg) => {
    if (msg.type() === 'error') {
      const t = msg.text();
      if (!shouldIgnore(t)) consoleErrors.push(t);
    }
  };
  const errHandler = (e) => pageErrors.push(`${e.name}: ${e.message}`);
  const reqFailHandler = (req) => {
    if (!shouldIgnore(req.url()))
      failedRequests.push(`${req.failure().errorText} -> ${req.url()}`);
  };
  const respHandler = (res) => {
    if (!shouldIgnore(res.url()) && res.status() >= 400)
      failedRequests.push(`HTTP ${res.status()} -> ${res.url()}`);
  };

  page.on('console', consoleHandler);
  page.on('pageerror', errHandler);
  page.on('requestfailed', reqFailHandler);
  page.on('response', respHandler);

  await page.setViewport(viewport);
  await page.goto(BASE + route, { waitUntil: 'networkidle2', timeout: 30000 });
  await new Promise((r) => setTimeout(r, 1200));

  const imgInfo = await page.evaluate(() => {
    const imgs = Array.from(document.querySelectorAll('img'));
    const broken = imgs
      .filter((i) => i.complete && i.naturalWidth === 0 && i.src && !i.src.startsWith('data:'))
      .map((i) => i.src);
    return {
      total: imgs.length,
      broken,
      withSrc: imgs.filter((i) => i.src && !i.src.startsWith('data:')).length,
    };
  });

  const safeName = (label + route).replace(/[^a-z0-9]+/gi, '_').replace(/^_+|_+$/g, '');
  const shotPath = path.join(SHOT_DIR, `${safeName}.png`);
  await page.screenshot({ path: shotPath, fullPage: false });

  page.off('console', consoleHandler);
  page.off('pageerror', errHandler);
  page.off('requestfailed', reqFailHandler);
  page.off('response', respHandler);

  return { route, viewport: viewport.width, imgInfo, consoleErrors, pageErrors, failedRequests, shotPath };
}

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const allResults = [];

  // Desktop pass
  console.log('=== Desktop (1280x800) ===');
  for (const route of ROUTES) {
    const page = await browser.newPage();
    const r = await checkRoute(page, route, { width: 1280, height: 800 }, 'desktop');
    allResults.push(r);
    const tag =
      (r.imgInfo.broken.length ? `BROKEN-IMG:${r.imgInfo.broken.length}  ` : '') +
      (r.consoleErrors.length ? `CONS-ERR:${r.consoleErrors.length}  ` : '') +
      (r.pageErrors.length ? `JS-ERR:${r.pageErrors.length}  ` : '') +
      (r.failedRequests.length ? `NET:${r.failedRequests.length}  ` : '') ||
      'OK';
    console.log(`  ${route.padEnd(40)} imgs=${r.imgInfo.withSrc}/${r.imgInfo.total}  ${tag.trim()}`);
    await page.close();
  }

  // Mobile pass
  console.log('\n=== Mobile (390x844, iPhone-like) ===');
  for (const route of ROUTES.slice(0, 6)) {
    const page = await browser.newPage();
    const r = await checkRoute(page, route, { width: 390, height: 844, isMobile: true }, 'mobile');
    allResults.push(r);
    const tag =
      (r.imgInfo.broken.length ? `BROKEN-IMG:${r.imgInfo.broken.length}  ` : '') +
      (r.consoleErrors.length ? `CONS-ERR:${r.consoleErrors.length}  ` : '') +
      (r.failedRequests.length ? `NET:${r.failedRequests.length}  ` : '') ||
      'OK';
    console.log(`  ${route.padEnd(40)} imgs=${r.imgInfo.withSrc}/${r.imgInfo.total}  ${tag.trim()}`);
    await page.close();
  }

  // Client-side navigation: load home, then click nav links and verify lazy chunks load
  console.log('\n=== Client-side navigation (lazy chunk loading) ===');
  const navPage = await browser.newPage();
  await navPage.setViewport({ width: 1280, height: 800 });
  const navIssues = [];
  navPage.on('pageerror', (e) => navIssues.push(`pageerror: ${e.message}`));
  navPage.on('requestfailed', (req) => {
    if (!shouldIgnore(req.url())) navIssues.push(`reqfail: ${req.url()}`);
  });

  await navPage.goto(BASE + '/', { waitUntil: 'networkidle2' });
  const targets = ['/about', '/services', '/products', '/industries', '/contact'];
  for (const target of targets) {
    try {
      const beforeUrl = await navPage.url();
      await navPage.evaluate((href) => {
        const link = Array.from(document.querySelectorAll('a[href]')).find(
          (a) => new URL(a.href).pathname === href
        );
        if (link) link.click();
      }, target);
      await new Promise((r) => setTimeout(r, 1500));
      const afterUrl = new URL(await navPage.url()).pathname;
      const charCount = await navPage.evaluate(() => document.querySelector('#root')?.innerText.length || 0);
      const ok = afterUrl === target && charCount > 200;
      console.log(`  ${beforeUrl ? '/' : ''} -> ${target.padEnd(15)}  landed=${afterUrl}  chars=${charCount}  ${ok ? 'OK' : 'FAIL'}`);
    } catch (e) {
      console.log(`  -> ${target}  FAIL  ${e.message}`);
      navIssues.push(`${target}: ${e.message}`);
    }
  }

  console.log('\n===== FINAL SUMMARY =====');
  let issues = 0;
  for (const r of allResults) {
    issues += r.imgInfo.broken.length + r.consoleErrors.length + r.pageErrors.length + r.failedRequests.length;
    if (r.imgInfo.broken.length) {
      console.log(`\n[${r.viewport}px] ${r.route} - broken images:`);
      r.imgInfo.broken.slice(0, 5).forEach((s) => console.log(`    ${s}`));
    }
    for (const e of r.pageErrors) console.log(`[${r.viewport}px] ${r.route}  JS-ERR: ${e}`);
    for (const e of r.consoleErrors) console.log(`[${r.viewport}px] ${r.route}  CONS-ERR: ${e.slice(0, 200)}`);
    for (const e of r.failedRequests) console.log(`[${r.viewport}px] ${r.route}  NET: ${e}`);
  }
  for (const e of navIssues) console.log(`NAV: ${e}`);

  console.log(`\nScreenshots: ${SHOT_DIR}`);
  if (issues === 0 && navIssues.length === 0) {
    console.log('PERFECT: no broken images, no JS errors, no failed requests, all navigation works.');
    process.exit(0);
  } else {
    console.log(`Found ${issues + navIssues.length} issue(s).`);
    process.exit(1);
  }

  await browser.close();
})().catch((e) => {
  console.error('Deep test crashed:', e);
  process.exit(2);
});
