// Smoke-test the built site by loading every key route through Puppeteer.
// Reports console errors, failed network requests, JS exceptions, and
// whether the page actually rendered React content.

const puppeteer = require('puppeteer');

const BASE = process.env.BASE_URL || 'http://localhost:4173';

const ROUTES = [
  '/',
  '/about',
  '/contact',
  '/services',
  '/services/gis',
  '/services/geospatial',
  '/services/location-intelligence',
  '/services/technology-consultancy',
  '/services/business-advisory',
  '/services/program-management',
  '/services/staffing-solutions',
  '/services/erp',
  '/products',
  '/products/jsan-vts',
  '/products/poi-express',
  '/products/travel-desk',
  '/industries',
  '/industries/transport',
  '/industries/energy',
  '/industries/consulting',
  '/industries/smartcities',
  '/technologies',
  '/news',
  '/blogs',
  '/careers',
  '/in-house-apps',
  '/privacy-policy',
  // Deep link to verify SPA route works on direct load
  '/services/geospatial/digital-twins',
  '/services/geospatial/spatial-analytics',
  '/services/location-intelligence/smart-city',
  '/services/technology-consultancy/cloud-infrastructure',
  '/technologies/gis',
];

// Failures that don't matter for smoke testing
const IGNORE_URL_PATTERNS = [
  /favicon\.ico$/,        // never references it explicitly
  /api\.maptiler\.com/,   // requires API key, expected to 401 in dev
  /linkedin\.com/,        // LinkedIn embed often fails CORS
  /chrome-extension:/,
];

function shouldIgnore(url) {
  return IGNORE_URL_PATTERNS.some((re) => re.test(url));
}

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const results = [];
  let pageNum = 0;

  for (const route of ROUTES) {
    pageNum++;
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 });

    const consoleErrors = [];
    const pageErrors = [];
    const failedRequests = [];

    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        const text = msg.text();
        if (!shouldIgnore(text)) consoleErrors.push(text);
      }
    });

    page.on('pageerror', (err) => {
      pageErrors.push(`${err.name}: ${err.message}`);
    });

    page.on('requestfailed', (req) => {
      const url = req.url();
      if (shouldIgnore(url)) return;
      failedRequests.push(`${req.failure().errorText} -> ${url}`);
    });

    page.on('response', (res) => {
      const url = res.url();
      if (shouldIgnore(url)) return;
      if (res.status() >= 400) {
        failedRequests.push(`HTTP ${res.status()} -> ${url}`);
      }
    });

    const url = BASE + route;
    let loadErr = null;
    let renderedChars = 0;
    let title = '';

    try {
      await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
      // Give Suspense fallback time to resolve
      await new Promise((r) => setTimeout(r, 800));
      title = await page.title();
      renderedChars = await page.evaluate(() => {
        const root = document.querySelector('#root');
        return root ? root.innerText.length : 0;
      });
    } catch (e) {
      loadErr = e.message;
    }

    results.push({
      route,
      title,
      renderedChars,
      loadErr,
      consoleErrors,
      pageErrors,
      failedRequests,
    });

    process.stdout.write(
      `[${String(pageNum).padStart(2)}/${ROUTES.length}] ${route.padEnd(50)} ` +
        (loadErr ? `LOAD-ERR: ${loadErr}` : `${renderedChars} chars  ` +
          (consoleErrors.length ? `${consoleErrors.length} console-err  ` : '') +
          (pageErrors.length ? `${pageErrors.length} page-err  ` : '') +
          (failedRequests.length ? `${failedRequests.length} net-fail` : 'OK')) +
        '\n'
    );

    await page.close();
  }

  await browser.close();

  // Summary
  console.log('\n===== SUMMARY =====');
  let totalIssues = 0;
  for (const r of results) {
    const issues =
      (r.loadErr ? 1 : 0) +
      r.consoleErrors.length +
      r.pageErrors.length +
      r.failedRequests.length;
    if (issues === 0 && r.renderedChars > 100) continue;
    totalIssues += issues;
    console.log(`\n${r.route}`);
    if (r.loadErr) console.log(`  LOAD ERROR: ${r.loadErr}`);
    if (r.renderedChars <= 100)
      console.log(`  WARNING: only rendered ${r.renderedChars} chars of content`);
    for (const e of r.pageErrors) console.log(`  PAGE-ERR: ${e}`);
    for (const e of r.consoleErrors) console.log(`  CONSOLE-ERR: ${e.slice(0, 240)}`);
    for (const e of r.failedRequests) console.log(`  NET-FAIL:    ${e}`);
  }

  if (totalIssues === 0) {
    console.log(
      `\nAll ${ROUTES.length} routes loaded cleanly with rendered content. ✔`
    );
    process.exit(0);
  } else {
    console.log(`\n${totalIssues} issue(s) across ${ROUTES.length} routes.`);
    process.exit(1);
  }
})().catch((e) => {
  console.error('Smoke test crashed:', e);
  process.exit(2);
});
