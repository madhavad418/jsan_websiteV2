import { useEffect, useRef, useState } from 'react'
import { ListTree, X } from 'lucide-react'

/**
 * The floating section navigator.
 *
 * A short list of the page's landmarks with a dot rail beside it. The dot for whichever
 * section is currently on screen fills in, and clicking a line scrolls to it.
 *
 * Deliberately not every section: six landmarks is a map, eleven is a second navigation
 * bar. It sits on the left because the right edge already carries the contact tab, the
 * chat bubble and the back-to-top button.
 *
 * Two forms, because a phone has no page margin to put a rail in:
 *
 *   - from 1400px, where the margin is wide enough, it sits on the left as a rail and
 *     opens on hover;
 *   - below that, a small button above the bottom nav opens the same list as a panel and
 *     closes once you pick something. A permanent rail at 390px would sit on top of the
 *     words it is meant to help you reach.
 */
export type JumpItem = { id: string; label: string }

export default function JumpTo({ items }: { items: JumpItem[] }) {
  const [active, setActive] = useState(items[0]?.id ?? '')
  const [visible, setVisible] = useState(false)
  const [open, setOpen] = useState(false)
  const activeRef = useRef(active)
  activeRef.current = active

  /* Which section is on screen. The one whose top is nearest the top of the viewport,
     without having scrolled past it, wins  which is what the eye reads as "current". */
  useEffect(() => {
    let frame = 0

    const measure = () => {
      frame = 0
      const marker = window.innerHeight * 0.35
      let current = items[0]?.id ?? ''

      for (const item of items) {
        const el = document.getElementById(item.id)
        if (!el) continue
        if (el.getBoundingClientRect().top <= marker) current = item.id
      }

      if (current !== activeRef.current) setActive(current)

      // Out of the way at the very top of the page, where the hero should stand alone.
      setVisible(window.scrollY > window.innerHeight * 0.6)
    }

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure)
    }

    measure()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [items])

  const jump = (id: string) => {
    const el = document.getElementById(id)
    if (!el) return
    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    el.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' })
    setOpen(false)
  }

  /* Escape closes the small-screen panel, as it would any other overlay. */
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const list = (
    <ul className="relative">
      {/* The rail the dots sit on, drawn behind them. */}
      <span
        aria-hidden="true"
        className="absolute bottom-[18px] right-[11.5px] top-[18px] w-px bg-gray-300 transition-all duration-300 group-focus-within:right-[5.5px] group-hover:right-[5.5px] group-data-[always]:right-[5.5px] 2xl:right-[5.5px]"
      />

      {items.map((item) => {
        const isOn = item.id === active
        return (
          <li key={item.id}>
            <button
              type="button"
              onClick={() => jump(item.id)}
              aria-current={isOn ? 'true' : undefined}
              className="peer/row flex min-h-[36px] w-full min-w-[24px] items-center gap-0 py-1 text-left transition-all duration-300 group-focus-within:gap-6 group-hover:gap-6 group-data-[always]:gap-6 2xl:gap-6"
            >
              <span
                className={`hidden whitespace-nowrap text-sm transition-colors duration-200 group-focus-within:block group-hover:block group-data-[always]:block 2xl:block ${
                  isOn ? 'font-semibold text-[#0a1a3a]' : 'text-gray-500 hover:text-[#0a1a3a]'
                }`}
              >
                {item.label}
              </span>

              <span
                aria-hidden="true"
                className="relative z-10 mx-auto flex w-3 shrink-0 items-center justify-center transition-all duration-300 group-focus-within:ml-auto group-focus-within:mr-0 group-hover:ml-auto group-hover:mr-0 group-data-[always]:ml-auto group-data-[always]:mr-0 2xl:ml-auto 2xl:mr-0"
              >
                <span
                  className={`rounded-full transition-all duration-300 ${
                    isOn
                      ? 'h-[11px] w-[11px] bg-[#0050a9] ring-4 ring-[#0050a9]/15'
                      : 'h-[7px] w-[7px] bg-gray-300 peer-hover/row:bg-gray-500'
                  }`}
                />
              </span>
            </button>
          </li>
        )
      })}
    </ul>
  )

  return (
    <>
      {/* Desktop: the rail, in the page margin. */}
      <nav
        aria-label="Jump to section"
        className={`fixed left-6 top-1/2 z-40 hidden -translate-y-1/2 transition-all duration-500 min-[1400px]:block ${
          visible ? 'translate-x-0 opacity-100' : 'pointer-events-none -translate-x-4 opacity-0'
        }`}
      >
        <div className="group rounded-2xl bg-white/95 p-2.5 shadow-[0_20px_50px_-20px_rgba(10,26,58,0.45)] ring-1 ring-gray-200/80 backdrop-blur transition-all duration-300 focus-within:p-5 hover:p-5 2xl:p-5">
          <div className="mb-4 hidden pr-10 text-sm font-semibold text-[#0a1a3a] group-focus-within:block group-hover:block 2xl:block">
            Jump to:
          </div>
          {list}
        </div>
      </nav>

      {/* Small screens: a button above the bottom nav that opens the same list. Bottom
          left, because the chat bubble and back-to-top already hold the right. */}
      <div
        className={`fixed bottom-24 left-4 z-40 transition-all duration-300 min-[1400px]:hidden ${
          visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0'
        }`}
      >
        {open && (
          <nav
            aria-label="Jump to section"
            data-always
            className="group mb-3 w-[220px] rounded-2xl bg-white p-4 shadow-[0_20px_50px_-20px_rgba(10,26,58,0.55)] ring-1 ring-gray-200"
          >
            <div className="mb-3 pr-10 text-sm font-semibold text-[#0a1a3a]">Jump to:</div>
            {list}
          </nav>
        )}

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? 'Close section list' : 'Jump to section'}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0a1a3a] text-white shadow-[0_14px_30px_-12px_rgba(10,26,58,0.8)] transition-colors duration-300 hover:bg-[#0050a9]"
        >
          {open ? <X className="h-5 w-5" /> : <ListTree className="h-5 w-5" />}
        </button>
      </div>
    </>
  )
}
