import { Newspaper } from 'lucide-react'
import { newsArticles } from '../data/news'
import blogs from '../data/blogs'

/** Turns "2026-06-12" or "January 12, 2026" into a short "Jun 12, 2026" label. */
function shortDate(value: string) {
  const parsed = new Date(value)
  if (Number.isNaN(parsed.getTime())) return value
  return parsed.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

/* Real published items only: company news first, then the latest insights. */
const highlights = [
  ...newsArticles.map((article) => ({
    date: shortDate(article.date),
    title: article.title,
    href: `/news/${article.slug}`,
    tag: 'News',
  })),
  ...blogs
    .filter((blog) => !blog.hidden)
    .slice()
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 4)
    .map((blog) => ({
      date: shortDate(blog.date),
      title: blog.title,
      href: `/blogs/${blog.slug}`,
      tag: 'Insight',
    })),
]

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
          {loop.map((item, index) => (
            <a
              key={`${item.href}-${index}`}
              href={item.href}
              className="news-ticker__item"
              aria-hidden={index >= highlights.length}
            >
              <span className="news-ticker__date">{item.date}</span>
              {item.title}
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
