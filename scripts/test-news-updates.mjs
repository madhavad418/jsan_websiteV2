// Frontend regression test. Every API request is intercepted; no live writes.
import assert from 'node:assert/strict'
import puppeteer from 'puppeteer'

const base = process.env.TEST_BASE_URL || 'http://localhost:3000'
const browser = await puppeteer.launch({ headless: true, pipe: true })
let items = []
let rejectSave = false
let failRead = false
const errors = []
try {
  const page = await browser.newPage()
  page.on('pageerror', (error) => errors.push(error.message))
  page.on('dialog', (dialog) => dialog.accept())
  await page.setRequestInterception(true)
  page.on('request', async (request) => {
    const url = new URL(request.url())
    if (!url.pathname.startsWith('/api/')) return request.continue()
    const reply = (body, status = 200) => request.respond({ status, contentType: 'application/json', body: JSON.stringify(body) })
    if (!url.pathname.endsWith('/news-updates.php')) return reply([])
    const admin = url.searchParams.has('all') || request.method() !== 'GET'
    if (admin && request.headers()['x-auth-token'] !== 'mock-admin') return reply({ error: 'Unauthorized' }, 401)
    if (request.method() === 'GET') return failRead ? reply({ error: 'Unavailable' }, 503) : reply(items)
    if (rejectSave) return reply({ error: 'Simulated save failure' }, 500)
    if (url.searchParams.has('delete')) {
      items = items.filter((item) => item.id !== Number(url.searchParams.get('id')))
      return reply({ ok: true })
    }
    const update = JSON.parse(request.postData())
    update.id ??= 1
    items = [...items.filter((item) => item.id !== update.id), update]
    return reply({ ok: true })
  })
  await page.evaluateOnNewDocument(() => localStorage.setItem('jsan_admin_token', 'mock-admin'))
  const click = async (text) => {
    await page.waitForFunction((text) => [...document.querySelectorAll('button')].some((button) => button.textContent.trim() === text && !button.disabled), {}, text)
    await page.evaluate((text) => [...document.querySelectorAll('button')].find((button) => button.textContent.trim() === text).click(), text)
  }
  const openAdmin = async () => {
    await page.goto(`${base}/admin`, { waitUntil: 'domcontentloaded' })
    await click('News updates')
  }
  failRead = true
  await page.goto(`${base}/company`, { waitUntil: 'domcontentloaded' })
  await page.waitForSelector('.news-ticker time')
  const dates = await page.$$eval('.news-ticker a:not([aria-hidden="true"]) time', (elements) => elements.map((el) => el.dateTime))
  assert(dates.length > 0)
  assert.deepEqual(dates, [...dates].sort().reverse(), 'Latest dated news appears first')
  await page.mouse.move(500, 400)
  const transform = await page.$eval('.news-ticker__track', (el) => getComputedStyle(el).transform)
  await page.waitForFunction((before) => getComputedStyle(document.querySelector('.news-ticker__track')).transform !== before, { timeout: 5000 }, transform)
  failRead = false
  await openAdmin()
  await click('+ New update')
  await page.type('input[maxlength="180"]', 'JSAN test announcement')
  await click('Save update')
  await page.waitForSelector('[role="status"]')
  assert.equal(items.length, 1)
  assert.equal(items[0].published, false)

  await click('Edit')
  await page.click('input[type="checkbox"]')
  rejectSave = true
  await click('Save update')
  await page.waitForSelector('[role="alert"]')
  assert.equal(items[0].published, false, 'Failed save must not publish')
  assert(await page.$('form'), 'Failed save must preserve editor')
  rejectSave = false
  await click('Save update')
  await page.waitForSelector('[role="status"]')
  assert.equal(items[0].published, true)

  await page.goto(`${base}/company`, { waitUntil: 'domcontentloaded' })
  await page.waitForFunction(() => document.querySelector('.news-ticker')?.textContent.includes('JSAN test announcement'))
  const copies = await page.$$('.news-ticker__item')
  assert.equal(copies.length, 2)
  assert.equal(await copies[1].evaluate((el) => el.tabIndex), -1)
  items[0].title = 'Updated headline'
  await page.evaluate(() => window.dispatchEvent(new Event('focus')))
  await page.waitForFunction(() => document.querySelector('.news-ticker')?.textContent.includes('Updated headline'))
  failRead = true
  await page.evaluate(() => window.dispatchEvent(new Event('focus')))
  await page.waitForResponse((res) => res.url().includes('news-updates.php') && res.status() === 503)
  assert(await page.$eval('.news-ticker', (el) => el.textContent.includes('Updated headline')))
  failRead = false
  items[0].published = false
  await page.evaluate(() => window.dispatchEvent(new Event('focus')))
  await page.waitForFunction(() => document.querySelector('.news-ticker')?.textContent.includes('Explore JSAN news and insights'))
  assert(!await page.$eval('.news-ticker', (el) => el.textContent.includes('Updated headline')))
  items[0].published = true
  items[0].date = '2099-01-01'
  await page.evaluate(() => window.dispatchEvent(new Event('focus')))
  await page.waitForResponse((res) => res.url().includes('news-updates.php'))
  assert(!await page.$eval('.news-ticker', (el) => el.textContent.includes('Updated headline')))

  await openAdmin()
  await click('Delete')
  await page.waitForFunction(() => document.body.textContent.includes('No announcements yet'))
  assert.equal(items.length, 0)
  assert.deepEqual(errors, [])
  console.log('PASS: dated fallback scrolls newest-first; draft, publish, failed save, refresh, failed read, unpublish, future date, delete, empty feed and duplicate-link accessibility.')
} finally {
  await browser.close()
}
