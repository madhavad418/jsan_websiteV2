import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';

puppeteer.use(StealthPlugin());

const targets = [
  // user typed "magnific.com" but these are freepik URLs (the structure matches)
  {
    blog: 'gis-telecom',
    pageUrl: 'https://www.freepik.com/premium-photo/telecommunication-tower-colorful-abstract-background-with-waves-vector-illustration_268659064.htm',
  },
  {
    blog: 'poi',
    pageUrl: 'https://www.freepik.com/free-photo/side-view-hands-holding-smartphone_32879764.htm',
  },
];

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  for (const t of targets) {
    console.log('→', t.blog, t.pageUrl);
    try {
      await page.goto(t.pageUrl, { waitUntil: 'domcontentloaded', timeout: 60000 });
      // wait a bit for any client-side hydration
      await new Promise(r => setTimeout(r, 2000));

      const meta = await page.evaluate(() => {
        const ogImage = document.querySelector('meta[property="og:image"]')?.getAttribute('content');
        const ogImageSecure = document.querySelector('meta[property="og:image:secure_url"]')?.getAttribute('content');
        const twitterImage = document.querySelector('meta[name="twitter:image"]')?.getAttribute('content');
        const mainImg = document.querySelector('img[itemprop="image"], main img, [data-hook="image"] img')?.getAttribute('src');
        const title = document.querySelector('h1')?.innerText || document.title;
        return { ogImage, ogImageSecure, twitterImage, mainImg, title };
      });
      console.log('   title:', meta.title?.slice(0, 80));
      console.log('   og:image:', meta.ogImage);
      console.log('   og:image:secure_url:', meta.ogImageSecure);
      console.log('   twitter:image:', meta.twitterImage);
      console.log('   main img:', meta.mainImg);
    } catch (e) {
      console.log('   ERROR:', e.message);
    }
  }

  await browser.close();
})();
