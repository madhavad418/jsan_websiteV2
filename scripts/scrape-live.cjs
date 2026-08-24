// Scrape the live jsanconsulting.com SPA (rendered) and dump content + links.
const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const BASE = 'https://www.jsanconsulting.com';
const OUT = path.join(__dirname, '..', 'scrape-output');
fs.mkdirSync(OUT, { recursive: true });

// Seed routes the user explicitly cares about + discovery roots.
const SEED = ['/', '/services', '/blogs', '/careers'];

const slug = (u) => (u.replace(BASE, '').replace(/^\//, '') || 'home').replace(/[\/?#:]+/g, '_');

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox'],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 1000 });

  const seen = new Set();
  const queue = [...SEED.map((p) => BASE + p)];
  const index = [];

  while (queue.length) {
    const url = queue.shift();
    if (seen.has(url)) continue;
    seen.add(url);
    try {
      await page.goto(url, { waitUntil: 'networkidle2', timeout: 45000 });
      await new Promise((r) => setTimeout(r, 1500)); // let lazy content settle

      const data = await page.evaluate((BASE) => {
        const links = Array.from(document.querySelectorAll('a[href]'))
          .map((a) => a.getAttribute('href'))
          .filter(Boolean);
        const text = document.body.innerText;
        const title = document.title;
        const h = (sel) => Array.from(document.querySelectorAll(sel)).map((e) => e.innerText.trim()).filter(Boolean);
        return {
          title,
          headings: { h1: h('h1'), h2: h('h2'), h3: h('h3') },
          text,
          links,
        };
      }, BASE);

      const s = slug(url);
      fs.writeFileSync(path.join(OUT, s + '.txt'),
        `URL: ${url}\nTITLE: ${data.title}\n\n=== H1 ===\n${data.headings.h1.join('\n')}\n\n=== H2 ===\n${data.headings.h2.join('\n')}\n\n=== H3 ===\n${data.headings.h3.join('\n')}\n\n=== BODY TEXT ===\n${data.text}\n`);

      // discover internal links to enqueue (services/blogs/careers subpages)
      const internal = data.links
        .map((href) => {
          if (href.startsWith('http')) return href.startsWith(BASE) ? href : null;
          if (href.startsWith('/')) return BASE + href;
          return null;
        })
        .filter(Boolean)
        .map((u) => u.split('#')[0])
        .filter((u) => /\/(services|blogs|careers)/.test(u));

      for (const link of internal) if (!seen.has(link)) queue.push(link);

      index.push({ url, title: data.title, h1: data.headings.h1, links: [...new Set(internal)] });
      console.log('OK  ', url, '| h1:', data.headings.h1.join(' / ').slice(0, 60));
    } catch (e) {
      console.log('FAIL', url, e.message);
      index.push({ url, error: e.message });
    }
  }

  fs.writeFileSync(path.join(OUT, '_index.json'), JSON.stringify(index, null, 2));
  await browser.close();
  console.log('\nDone. Pages scraped:', seen.size, '-> scrape-output/');
})();
