import { Newspaper } from 'lucide-react'
import { useEffect, useState } from 'react'
import type { NewsUpdate } from '../data/newsUpdates'
import { fetchNewsUpdates } from '../lib/api'
import { newsArticles } from '../data/news'

// Existing published announcements keep the ticker useful before the API is deployed.
const bundledUpdates: NewsUpdate[] = newsArticles.map((article) => {
  const date = new Date(article.date)
  return {
    title: article.title,
    date: `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`,
    href: `/news/${article.slug}`,
    published: true,
  }
})

/** Turns "2026-06-12" or "January 12, 2026" into a short "Jun 12, 2026" label. */
function shortDate(value: string) {
  const parsed = new Date(`${value}T00:00:00`)
  if (Number.isNaN(parsed.getTime())) return value
  return parsed.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

/** Published announcements are controlled through Admin > News updates. */
export default function NewsTicker() {
  const [updates, setUpdates] = useState<NewsUpdate[]>([])
  useEffect(() => {
    let active = true
    let pending = false
    let receivedFeed = false
    const refresh = async () => {
      if (pending) return
      pending = true
      try {
        const data = await fetchNewsUpdates()
        if (active) {
          receivedFeed = true
          setUpdates(data)
        }
      } catch {
        // A successful empty feed is authoritative: do not revive unpublished updates.
        if (active && !receivedFeed) setUpdates(bundledUpdates)
      } finally { pending = false }
    }
    void refresh()
    const timer = window.setInterval(() => { if (!document.hidden) void refresh() }, 60000)
    const onFocus = () => { void refresh() }
    window.addEventListener('focus', onFocus)
    return () => { active = false; window.clearInterval(timer); window.removeEventListener('focus', onFocus) }
  }, [])
  const today = new Date().toISOString().slice(0, 10)
  const highlights = updates
    .filter((item) => item.published && item.date <= today && /^\/(?![\/\\])/.test(item.href))
    .sort((a, b) => b.date.localeCompare(a.date) || (b.id ?? 0) - (a.id ?? 0))
    .slice(0, 6)
  const loop = [...highlights, ...highlights]

  return (
    <div className="news-ticker news-ticker--header" role="region" aria-label="Latest JSAN news and updates">
      <div className="news-ticker__label">
        <Newspaper className="w-4 h-4" />
        News
      </div>
      <div className="news-ticker__viewport">
        <div className="news-ticker__track" style={!highlights.length ? { animation: 'none' } : undefined}>
          {!highlights.length && <a className="news-ticker__item" href="/insights">Explore JSAN news and insights</a>}
          {loop.map((item, index) => {
            return (
              <a
                key={`${item.href}-${index}`}
                href={item.href}
                className="news-ticker__item"
                aria-hidden={index >= highlights.length}
                tabIndex={index >= highlights.length ? -1 : 0}
              >
                <time className="news-ticker__date" dateTime={item.date}>{shortDate(item.date)}</time>
                {item.title}
              </a>
            )
          })}
        </div>
      </div>
    </div>
  )
}
