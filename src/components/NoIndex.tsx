import { useEffect } from 'react'

/**
 * Marks the current view as "do not index".
 *
 * A client-rendered SPA cannot change the HTTP status of a page it has already been
 * served, so a missing job, article or capability would otherwise be a soft 404: 200 OK
 * with "Not Found" in the body, which search engines may index.
 *
 * Two defences, and both are needed:
 *   1. this component, which adds <meta name="robots" content="noindex, follow"> while
 *      the not-found view is mounted and removes it again on the way out;
 *   2. the server, which returns a real 404/410 for paths it knows are gone  see
 *      redirects.config.mjs and the /careers handling in server.js.
 *
 * `status` is also written to window.__PAGE_STATUS__ so a prerenderer or crawl script can
 * assert on it without parsing the DOM.
 */
export default function NoIndex({ status = 404 }: { status?: 404 | 410 }) {
  useEffect(() => {
    const el = document.createElement('meta')
    el.name = 'robots'
    el.content = 'noindex, follow'
    el.dataset.seo = 'noindex'
    document.head.appendChild(el)
    ;(window as unknown as { __PAGE_STATUS__?: number }).__PAGE_STATUS__ = status

    return () => {
      el.remove()
      delete (window as unknown as { __PAGE_STATUS__?: number }).__PAGE_STATUS__
    }
  }, [status])

  return null
}
