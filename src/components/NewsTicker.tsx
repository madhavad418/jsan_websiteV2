import { Newspaper } from 'lucide-react'
import { newsArticles } from '../data/news'
import blogs from '../data/blogs'
import { closeProductPreview, openProductPreview } from '../lib/productPreview'

/** Turns "2026-06-12" or "January 12, 2026" into a short "Jun 12, 2026" label. */
function shortDate(value: string) {
  const parsed = new Date(value)
  if (Number.isNaN(parsed.getTime())) return value
  return parsed.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

/**
 * How far back the ticker reaches: the current month and this many before it.
 * 1 means "this month and last month".
 *
 * The ticker is the site's freshness signal, so it carries recent items only rather
 * than everything ever published. Raise this if the bar is emptying faster than the
 * newsroom fills it - it is the only number that needs changing.
 */
const MONTHS_BACK = 1

/**
 * The one item in the bar that previews itself. Resting a pointer on it opens the product
 * dialog; moving off closes it again. Matched on its path rather than on a flag in the
 * content, because this is a property of the product, not of the article.
 */
const PREVIEWS_PRODUCT = '/news/jsan-atlas-ops'

/** Months since year zero, so a window can be compared without date arithmetic. */
function monthIndex(value: string) {
  const parsed = new Date(value)
  if (Number.isNaN(parsed.getTime())) return null
  return parsed.getFullYear() * 12 + parsed.getMonth()
}

const now = new Date()
const OLDEST_MONTH = now.getFullYear() * 12 + now.getMonth() - MONTHS_BACK

/** Published this month or last. An unparseable date is kept rather than dropped. */
function isRecent(value: string) {
  const month = monthIndex(value)
  return month === null || month >= OLDEST_MONTH
}

/* Real published items only: company news and insights together, newest first. */
const published = [
  ...newsArticles.map((article) => ({
    raw: article.date,
    date: shortDate(article.date),
    title: article.title,
    href: `/news/${article.slug}`,
    tag: 'News',
  })),
  ...blogs
    .filter((blog) => !blog.hidden)
    .map((blog) => ({
      raw: blog.date,
      date: shortDate(blog.date),
      title: blog.title,
      href: `/blogs/${blog.slug}`,
      tag: 'Insight',
    })),
].sort((a, b) => new Date(b.raw).getTime() - new Date(a.raw).getTime())

const recent = published.filter((item) => isRecent(item.raw))

/**
 * What the bar actually carries.
 *
 * The window is the rule, but an empty result is not an option here: the bar is a fixed
 * 44px band in the header that every page offsets against, so nothing to show leaves a
 * blank blue strip across the whole site rather than no strip at all. When a quiet month
 * empties the window, the single newest item holds the space until the next one lands.
 *
 * Capped either way: past six it is a list, not a ticker.
 */
const highlights = (recent.length > 0 ? recent : published.slice(0, 1)).slice(0, 6)

export default function NewsTicker() {
  // Rendered twice so the marquee (which scrolls -50%) loops directly.
  const loop = [...highlights, ...highlights]

  if (highlights.length === 0) return null

  return (
    <div className="news-ticker news-ticker--header" role="region" aria-label="Latest JSAN news and insights">
      <div className="news-ticker__label">
        <Newspaper className="w-4 h-4" />
        News
      </div>
      <div className="news-ticker__viewport">
        <div className="news-ticker__track">
          {loop.map((item, index) => {
            const previews = item.href === PREVIEWS_PRODUCT
            return (
              <a
                key={`${item.href}-${index}`}
                href={item.href}
                className="news-ticker__item"
                aria-hidden={index >= highlights.length}
                /* Pointer only. A touch screen has no hover and a keyboard has no pointer,
                   and both already have the better route into the product: the link. */
                onMouseEnter={previews ? () => openProductPreview('hover') : undefined}
                onMouseLeave={previews ? () => closeProductPreview('hover') : undefined}
              >
                <span className="news-ticker__date">{item.date}</span>
                {item.title}
              </a>
            )
          })}
        </div>
      </div>
    </div>
  )
}
