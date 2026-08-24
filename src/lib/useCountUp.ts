import { useEffect, useRef, useState } from 'react'

/** Fires once when the element first scrolls into view. */
export function useInView<T extends HTMLElement>(threshold = 0.2) {
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (typeof IntersectionObserver === 'undefined') {
      setInView(true)
      return
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold, rootMargin: '0px 0px -10% 0px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return { ref, inView }
}

/** Counts 0 -> target on an ease-out curve, respecting reduced-motion. */
export function useCountUp(target: number, start: boolean, duration = 1600) {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (!start) return
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      setCurrent(target)
      return
    }
    let frame = 0
    const began = performance.now()
    const tick = (now: number) => {
      const progress = Math.min((now - began) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCurrent(Math.round(target * eased))
      if (progress < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [target, start, duration])

  return current
}

/**
 * Splits a display value such as "500+", "5K+", "24/7" or "4M+" into the number
 * to animate and the suffix to print after it.
 */
export function parseStat(value: string): { number: number; suffix: string } {
  const match = /^([\d.,]+)(.*)$/.exec(value.trim())
  if (!match) return { number: 0, suffix: value }
  return { number: Number(match[1].replace(/,/g, '')) || 0, suffix: match[2] }
}
