import type { LinkedInPost } from '../data/newsUpdates'

/**
 * Latest LinkedIn company posts, read from the Elfsight LinkedIn Feed widget the site
 * already subscribes to (the same data the feed on /insights renders).
 *
 * LinkedIn itself cannot be read from a browser, and its own API needs an approved app
 * and a token that expires. Elfsight is already authorised against the company page, so
 * the ticker reuses it: no credentials live in this repo, and nothing has to be pasted in
 * by hand. Two public calls, in the order the widget makes them:
 *
 *   1. /p/boot/?w=<widget id>  ->  the widget's public token + the LinkedIn source id
 *   2. /api/posts              ->  the posts, with that token in x-widget-token
 *
 * Results are cached per browser tab so the header does not refetch on every navigation.
 * Every failure path returns an empty list; the caller falls back to its own content.
 */
export const ELFSIGHT_LINKEDIN_WIDGET_ID = '80727f8b-5c8c-4506-b8db-cf6011de8828'

const BOOT_URL = 'https://core.service.elfsight.com/p/boot/?w='
const POSTS_URL = 'https://widget-data.service.elfsight.com/api/posts'
const CACHE_KEY = 'jsan.linkedin.posts.v1'
const CACHE_TTL = 30 * 60 * 1000
const MAX_POSTS = 20
const MAX_TITLE = 120

type ElfsightBoot = {
  data?: {
    widgets?: Record<string, {
      data?: {
        public_widget_token?: string
        settings?: { sources?: { sourcePID?: string }[] }
      }
    }>
  }
}

type ElfsightPost = { caption?: string; publishedAt?: string; link?: string }

/** The first real line of a post, without hashtag trails, trimmed to ticker length. */
export function postHeadline(caption: string) {
  for (const rawLine of caption.split(/\r?\n/)) {
    const line = rawLine
      .replace(/#[\p{L}\p{N}_]+/gu, '')
      .replace(/https?:\/\/\S+/g, '')
      .replace(/\s+/g, ' ')
      .trim()
    // Skip pins, dates and other decoration-only lines.
    if (line.replace(/[^\p{L}\p{N}]/gu, '').length < 12) continue
    if (line.length <= MAX_TITLE) return line
    return line.slice(0, MAX_TITLE - 1).replace(/[\s\p{P}]+\S*$/u, '') + '…'
  }
  return ''
}

function readCache(): LinkedInPost[] | null {
  try {
    const raw = sessionStorage.getItem(CACHE_KEY)
    if (!raw) return null
    const cached = JSON.parse(raw) as { at: number; posts: LinkedInPost[] }
    if (!cached || Date.now() - cached.at > CACHE_TTL || !Array.isArray(cached.posts)) return null
    return cached.posts
  } catch {
    return null
  }
}

function writeCache(posts: LinkedInPost[]) {
  try {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify({ at: Date.now(), posts }))
  } catch {
    // Private browsing or a full quota: the feed simply refetches next time.
  }
}

async function getJson<T>(url: string, headers?: HeadersInit): Promise<T> {
  const controller = new AbortController()
  const timer = window.setTimeout(() => controller.abort(), 8000)
  try {
    const response = await fetch(url, { headers, signal: controller.signal })
    if (!response.ok) throw new Error(`HTTP ${response.status}`)
    return (await response.json()) as T
  } finally {
    window.clearTimeout(timer)
  }
}

export async function fetchLinkedInPostsFromWidget(
  widgetId = ELFSIGHT_LINKEDIN_WIDGET_ID
): Promise<LinkedInPost[]> {
  const cached = readCache()
  if (cached) return cached

  const boot = await getJson<ElfsightBoot>(BOOT_URL + encodeURIComponent(widgetId))
  const widget = boot.data?.widgets?.[widgetId]?.data
  const token = widget?.public_widget_token
  const pid = widget?.settings?.sources?.[0]?.sourcePID
  if (!token || !pid) return []

  const sources = JSON.stringify({ pid, filters: [{ type: 'exclude', post_type: 'repost' }] })
  const query = `?sources[]=${encodeURIComponent(sources)}&limit=${MAX_POSTS}`
  const feed = await getJson<{ payload?: ElfsightPost[] }>(POSTS_URL + query, { 'x-widget-token': token })

  const posts: LinkedInPost[] = (feed.payload ?? [])
    .map((post) => ({
      title: postHeadline(String(post.caption ?? '')),
      date: String(post.publishedAt ?? '').slice(0, 10),
      href: typeof post.link === 'string' && post.link.startsWith('https://www.linkedin.com/')
        ? post.link
        : 'https://www.linkedin.com/company/jsan-consulting-group/posts/?feedView=all',
    }))
    .filter((post) => post.title && /^\d{4}-\d{2}-\d{2}$/.test(post.date))
    .sort((a, b) => b.date.localeCompare(a.date))

  writeCache(posts)
  return posts
}
