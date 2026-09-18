import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Site-wide scroll reveal.
 *
 * Rather than annotating every section by hand, this walks the rendered page
 * and tags the content blocks it finds, then reveals them with an
 * IntersectionObserver as they scroll into view. Pages are lazy-loaded, so a
 * MutationObserver re-scans whenever new content mounts.
 *
 * It deliberately skips:
 *  - decorative layers (absolute / fixed / sticky / pointer-events-none)
 *  - blocks that already run their own entrance animation
 *  - the hero (first section on a page) and anything in the header/footer
 * so nothing animates twice and no background art gets displaced.
 */
export default function ScrollReveal() {
  const location = useLocation()

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return

    const reveal = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          entry.target.classList.add('is-visible')
          reveal.unobserve(entry.target)
        })
      },
      { threshold: 0.05, rootMargin: '0px 0px -6% 0px' }
    )

    const isDecorative = (el: Element) => {
      const cls = typeof el.className === 'string' ? el.className : ''
      if (/(^|\s)(absolute|fixed|sticky)(\s|$)/.test(cls)) return true
      if (cls.includes('pointer-events-none')) return true
      const position = getComputedStyle(el).position
      return position === 'absolute' || position === 'fixed' || position === 'sticky'
    }

    /** Blocks that already animate themselves */
    const hasOwnAnimation = (el: Element) =>
      /(^|\s)animate-/.test(typeof el.className === 'string' ? el.className : '') ||
      !!el.querySelector('[style*="transition-delay"], [style*="animation-delay"]')

    /**
     * Anything already on screen (or scrolled past) must never start hidden: the observer
     * would have nothing left to trigger on, and the block would stay blank until the
     * page was reloaded. Only content still below the fold animates in.
     */
    const observeOrShow = (el: Element) => {
      const rect = el.getBoundingClientRect()
      if (rect.top < window.innerHeight) {
        el.classList.add('is-visible')
        return
      }
      reveal.observe(el)
    }

    const scan = () => {
      const sections = Array.from(document.querySelectorAll('section')).filter(
        (section) => !section.closest('header') && !section.closest('footer')
      )

      sections.forEach((section, index) => {
        // The hero sits above the fold: let it render in place.
        const isHero = index === 0

        Array.from(section.children).forEach((child) => {
          if (child.classList.contains('reveal')) return
          if (child.hasAttribute('data-no-reveal')) return
          if (isDecorative(child) || hasOwnAnimation(child)) return
          if (isHero) return
          child.classList.add('reveal')
          observeOrShow(child)
        })

        section.querySelectorAll('.grid').forEach((grid) => {
          if (grid.classList.contains('reveal-stagger')) return
          if (grid.children.length < 2) return
          if (hasOwnAnimation(grid)) return
          if (Array.from(grid.children).some(hasOwnAnimation)) return
          grid.classList.add('reveal-stagger')
          observeOrShow(grid)
        })
      })
    }

    /**
     * Safety net. If an element is tagged and then never intersects - it was laid out
     * while off screen, the observer missed it, or the page grew around it - it would stay
     * invisible until a reload. This sweeps anything hidden that is on screen or above it.
     */
    const sweep = () => {
      document.querySelectorAll('.reveal:not(.is-visible), .reveal-stagger:not(.is-visible)').forEach((el) => {
        if (el.getBoundingClientRect().top < window.innerHeight) {
          el.classList.add('is-visible')
          reveal.unobserve(el)
        }
      })
    }

    let frame = 0
    let sweepTimer = 0
    const queueScan = () => {
      window.clearTimeout(frame)
      frame = window.setTimeout(scan, 90)
      window.clearTimeout(sweepTimer)
      sweepTimer = window.setTimeout(sweep, 1200)
    }

    // One sweep per frame at most: this runs on every scroll event.
    let sweepQueued = false
    const queueSweep = () => {
      if (sweepQueued) return
      sweepQueued = true
      requestAnimationFrame(() => {
        sweepQueued = false
        sweep()
      })
    }

    queueScan()
    window.addEventListener('scroll', queueSweep, { passive: true })
    window.addEventListener('resize', queueSweep)

    // Pages are lazy-loaded and lists render asynchronously, so re-scan when
    // new nodes arrive. Class changes are attribute mutations, so tagging
    // elements here does not re-trigger this observer.
    const mutations = new MutationObserver(queueScan)
    mutations.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.clearTimeout(frame)
      window.clearTimeout(sweepTimer)
      window.removeEventListener('scroll', queueSweep)
      window.removeEventListener('resize', queueSweep)
      mutations.disconnect()
      reveal.disconnect()
    }
  }, [location.pathname])

  return null
}
