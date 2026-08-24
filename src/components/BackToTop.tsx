import { useEffect, useState } from 'react'
import { ArrowUp } from 'lucide-react'

/**
 * Floating scroll-to-top control. Stays hidden until the visitor is well down
 * the page so it never competes with hero content, and sits above the mobile
 * bottom nav.
 */
export default function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 700)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToTop = () => {
    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' })
  }

  return (
    <button
      onClick={scrollToTop}
      aria-label="Back to top"
      className={`fixed right-5 bottom-20 lg:bottom-8 z-[100] flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_24px_-8px_rgba(0,212,255,0.7)] ${
        visible ? 'opacity-100 translate-y-0 pointer-events-auto' : 'pointer-events-none translate-y-3 opacity-0'
      }`}
      style={{ background: 'linear-gradient(140deg, #012f62, #0055b4)' }}
    >
      <ArrowUp className="h-5 w-5" />
    </button>
  )
}
