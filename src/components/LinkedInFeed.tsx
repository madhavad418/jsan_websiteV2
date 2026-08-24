import { useEffect, useRef, useState } from 'react'
import { Linkedin, ArrowRight } from 'lucide-react'

const ELFSIGHT_APP = 'elfsight-app-80727f8b-5c8c-4506-b8db-cf6011de8828'
const LINKEDIN_URL =
  'https://www.linkedin.com/company/jsan-consulting-group/posts/?feedView=all'

/**
 * Live LinkedIn feed (Elfsight). The widget is lazy and can take a few seconds,
 * so we show a branded skeleton until it injects its content, and fall back to
 * a follow panel if it never arrives.
 */
export default function LinkedInFeed() {
  const holder = useRef<HTMLDivElement>(null)
  const [loaded, setLoaded] = useState(false)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    const el = holder.current
    if (!el) return

    // Elfsight renders into the placeholder div; treat any injected markup as ready
    const isReady = () => (el.querySelector(`.${ELFSIGHT_APP}`)?.childElementCount ?? 0) > 0

    if (isReady()) {
      setLoaded(true)
      return
    }

    const observer = new MutationObserver(() => {
      if (isReady()) {
        setLoaded(true)
        observer.disconnect()
      }
    })
    observer.observe(el, { childList: true, subtree: true })

    const timer = setTimeout(() => {
      if (!isReady()) setFailed(true)
    }, 15000)

    return () => {
      observer.disconnect()
      clearTimeout(timer)
    }
  }, [])

  return (
    <div className="mt-16">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 backdrop-blur-sm">
            <Linkedin className="h-5 w-5 text-white" />
          </span>
          <div>
            <h3 className="text-lg font-bold text-white">Live from LinkedIn</h3>
            <p className="text-sm text-white/70">Straight from the JSAN company page</p>
          </div>
        </div>

        <a
          href={LINKEDIN_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group hidden items-center gap-2 rounded-xl border border-white/25 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-white/50 hover:bg-white/20 sm:inline-flex"
        >
          View all posts
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </a>
      </div>

      <div className="relative min-h-[320px] rounded-2xl border border-white/15 bg-white/[0.06] p-4 backdrop-blur-sm md:p-6">
        {/* The widget itself */}
        <div ref={holder} className={loaded ? 'opacity-100 transition-opacity duration-500' : 'opacity-0'}>
          <div className={ELFSIGHT_APP} data-elfsight-app-lazy />
        </div>

        {/* Skeleton while the feed loads */}
        {!loaded && !failed && (
          <div className="absolute inset-0 flex flex-col gap-4 p-4 md:p-6" aria-hidden="true">
            <div className="h-14 animate-pulse rounded-xl bg-white/15" />
            <div className="grid flex-1 grid-cols-1 gap-4 md:grid-cols-3">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="animate-pulse rounded-xl bg-white/10"
                  style={{ animationDelay: `${i * 150}ms` }}
                />
              ))}
            </div>
            <p className="text-center text-xs text-white/60">Loading the latest posts…</p>
          </div>
        )}

        {/* Fallback if the widget never loads (blocked scripts, offline, etc.) */}
        {failed && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-6 text-center">
            <Linkedin className="h-8 w-8 text-white/70" />
            <p className="max-w-md text-sm text-white/75">
              The live feed could not load here. You can see every JSAN update directly on LinkedIn.
            </p>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-[#0077b5] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
            >
              Open LinkedIn
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>
        )}
      </div>
    </div>
  )
}
