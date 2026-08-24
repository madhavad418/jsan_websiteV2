// Scrape the same routes on localhost and diff body text against the live scrape.
const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const LIVE = 'https://www.jsanconsulting.com';
const LOCAL = 'http://localhost:3001';
const OUT = path.join(__dirname, '..', 'scrape-output');
const index = JSON.parse(fs.readFileSync(path.join(OUT, '_index.json'), 'utf8'));

// Normalize text: strip header/footer chrome + collapse whitespace.
const CHROME = [
  'Press release: JSAN expands operations to 5 new countries', 'Read more',
  'Home', 'Services', 'Technologies', 'Insights', 'In-House Apps', 'About',
  'Careers', 'Contact Us', 'Contact us', 'Our Brand', 'Our Leadership', 'News',
  'LinkedIn', 'Blogs', 'Industries', 'Events', 'Sitemap', 'Back to top',
  'Terms of Use', 'Accessibility', 'Privacy Policy', 'Cookie Notice', 'English',
];
function norm(t) {
  return t.split('\n').map((l) => l.trim())
    .filter((l) => l && !CHROME.includes(l) && !l.startsWith('© 2026'))
    .join('\n').replace(/\s+/g, ' ').trim();
}

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox'],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 1000 });

  const paths = index.filter((e) => e.url && !e.error).map((e) => e.url.replace(LIVE, ''));
  const report = [];

  for (const p of paths) {
    const liveFile = path.join(OUT, (p.replace(/^\//, '') || 'home').replace(/[\/?#:]+/g, '_') + '.txt');
    if (!fs.existsSync(liveFile)) { report.push(`SKIP (no live file): ${p}`); continue; }
    const liveBody = norm(fs.readFileSync(liveFile, 'utf8').split('=== BODY TEXT ===')[1] || '');

    let localBody = '';
    try {
      await page.goto(LOCAL + p, { waitUntil: 'networkidle2', timeout: 30000 });
      await new Promise((r) => setTimeout(r, 1200));
      localBody = norm(await page.evaluate(() => document.body.innerText));
    } catch (e) {
      report.push(`ERROR loading local ${p}: ${e.message}`);
      continue;
    }

    if (localBody === liveBody) {
      report.push(`MATCH  ${p}`);
    } else {
      // find first divergence
      const a = liveBody.split(' '), b = localBody.split(' ');
      let i = 0; while (i < a.length && i < b.length && a[i] === b[i]) i++;
      const ctx = (arr) => arr.slice(Math.max(0, i - 6), i + 14).join(' ');
      report.push(`DIFF   ${p}\n   live len ${liveBody.length} / local len ${localBody.length}; first diff @word ${i}\n   LIVE : ...${ctx(a)}...\n   LOCAL: ...${ctx(b)}...`);
    }
  }

  fs.writeFileSync(path.join(OUT, '_compare.txt'), report.join('\n'));
  console.log(report.join('\n'));
  await browser.close();
})();
