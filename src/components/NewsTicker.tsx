import { Linkedin, Newspaper } from 'lucide-react'
import { useEffect, useState } from 'react'
import type { LinkedInPost, NewsUpdate } from '../data/newsUpdates'
import { fetchLinkedInPosts, fetchNewsUpdates } from '../lib/api'
import { newsArticles } from '../data/news'

const LINKEDIN_URL = 'https://www.linkedin.com/company/jsan-consulting-group/posts/?feedView=all'

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

/** LinkedIn posts are all from this month, so the year adds nothing. */
function dayAndMonth(value: string) {
  const parsed = new Date(`${value}T00:00:00`)
  if (Number.isNaN(parsed.getTime())) return value
  return parsed.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

type Item = { title: string; date: string; href: string; external: boolean }

/**
 * Header news ticker.
 *
 * It shows this month's LinkedIn company posts whenever api/linkedin.php has a source
 * configured (see public/api/config.sample.php). With no LinkedIn source, nothing posted
 * this month, or LinkedIn unreachable, it falls back to the announcements managed in
 * Admin > News updates, so the strip is never empty.
 */
export default function NewsTicker() {
  const [updates, setUpdates] = useState<NewsUpdate[]>([])
  const [posts, setPosts] = useState<LinkedInPost[]>([])

  useEffect(() => {
    let active = true
    let pending = false
    let receivedFeed = false
    const refresh = async () => {
      if (pending) return
      pending = true
      // LinkedIn is optional: a failure there must not stop the announcements loading.
      const [linkedIn, news] = await Promise.allSettled([fetchLinkedInPosts(), fetchNewsUpdates()])
      if (active) {
        if (linkedIn.status === 'fulfilled') setPosts(linkedIn.value)
        if (news.status === 'fulfilled') {
          receivedFeed = true
          setUpdates(news.value)
        } else if (!receivedFeed) {
          // A successful empty feed is authoritative: do not revive unpublished updates.
          setUpdates(bundledUpdates)
        }
      }
      pending = false
    }
    void refresh()
    const timer = window.setInterval(() => { if (!document.hidden) void refresh() }, 60000)
    const onFocus = () => { void refresh() }
    window.addEventListener('focus', onFocus)
    return () => { active = false; window.clearInterval(timer); window.removeEventListener('focus', onFocus) }
  }, [])

  const now = new Date()
  const today = now.toISOString().slice(0, 10)
  const thisMonth = today.slice(0, 7)

  const linkedInItems: Item[] = posts
    .filter((post) => post.date.slice(0, 7) === thisMonth && post.date <= today)
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 6)
    .map((post) => ({ title: post.title, date: post.date, href: post.href, external: true }))

  const updateItems: Item[] = updates
    .filter((item) => item.published && item.date <= today && /^\/(?![\/\\])/.test(item.href))
    .sort((a, b) => b.date.localeCompare(a.date) || (b.id ?? 0) - (a.id ?? 0))
    .slice(0, 6)
    .map((item) => ({ title: item.title, date: item.date, href: item.href, external: false }))

  const showingLinkedIn = linkedInItems.length > 0
  const highlights = showingLinkedIn ? linkedInItems : updateItems
  const loop = [...highlights, ...highlights]

  return (
    <div
      className="news-ticker news-ticker--header"
      role="region"
      aria-label={showingLinkedIn ? 'Latest JSAN posts on LinkedIn' : 'Latest JSAN news and updates'}
    >
      <div className="news-ticker__label">
        {showingLinkedIn ? <Linkedin className="w-4 h-4" /> : <Newspaper className="w-4 h-4" />}
        {showingLinkedIn ? 'LinkedIn' : 'News'}
      </div>
      <div className="news-ticker__viewport">
        <div className="news-ticker__track" style={!highlights.length ? { animation: 'none' } : undefined}>
          {!highlights.length && <a className="news-ticker__item" href="/insights">Explore JSAN news and insights</a>}
          {loop.map((item, index) => {
            const duplicate = index >= highlights.length
            return (
              <a
                key={`${item.href}-${index}`}
                href={item.href}
                className="news-ticker__item"
                aria-hidden={duplicate}
                tabIndex={duplicate ? -1 : 0}
                {...(item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              >
                <time className="news-ticker__date" dateTime={item.date}>
                  {item.external ? dayAndMonth(item.date) : shortDate(item.date)}
                </time>
                {item.title}
              </a>
            )
          })}
        </div>
      </div>
      {showingLinkedIn && (
        <a
          className="news-ticker__all"
          href={LINKEDIN_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          All posts
        </a>
      )}
    </div>
  )
}
