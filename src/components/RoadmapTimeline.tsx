import { useEffect, useRef, useState } from 'react'
import { CheckCircle, ChevronDown } from 'lucide-react'

export type RoadmapStep = {
  n: string
  title: string
  desc: string
  exit: string
}

/**
 * Implementation roadmap as a vertical timeline. A progress spine fills as the
 * section scrolls through the viewport, each step lights up when the progress
 * line passes it, and steps can be expanded to read the exit criteria.
 */
export default function RoadmapTimeline({ steps }: { steps: RoadmapStep[] }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)
  const [open, setOpen] = useState<number | null>(0)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      setProgress(1)
      return
    }

    let frame = 0
    const update = () => {
      frame = 0
      const rect = el.getBoundingClientRect()
      const viewport = window.innerHeight
      // 0 when the top reaches 85% down the viewport, 1 once the bottom passes 40%
      const start = viewport * 0.85
      const end = viewport * 0.4
      const travelled = (start - rect.top) / (rect.height + (start - end))
      setProgress(Math.min(1, Math.max(0, travelled)))
    }

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <div ref={containerRef} className="relative">
      {/* Spine */}
      <div className="absolute bottom-6 left-[27px] top-6 w-0.5 rounded-full bg-gray-200 md:left-[31px]" />
      <div
        className="absolute left-[27px] top-6 w-0.5 rounded-full bg-gradient-to-b from-[#0050a9] to-[#00d4ff] transition-[height] duration-300 ease-out md:left-[31px]"
        style={{ height: `calc(${progress * 100}% - 12px)` }}
      />

      <div className="space-y-4">
        {steps.map((step, i) => {
          // a step activates once the spine has reached it
          const active = progress >= (i + 0.5) / steps.length
          const isOpen = open === i

          return (
            <div key={i} className="relative pl-16 md:pl-20">
              {/* Node */}
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                className={`absolute left-0 top-4 flex h-14 w-14 items-center justify-center rounded-full text-sm font-bold transition-all duration-500 md:h-16 md:w-16 ${
                  active
                    ? 'scale-100 text-white shadow-[0_12px_28px_-10px_rgba(0,80,169,0.9)]'
                    : 'scale-90 border-2 border-gray-200 bg-white text-gray-400'
                }`}
                style={active ? { background: 'linear-gradient(140deg, #012f62, #0055b4)' } : undefined}
              >
                {step.n}
                {active && (
                  <span className="absolute inset-0 animate-ping rounded-full border border-[#00d4ff]/40 opacity-40" />
                )}
              </button>

              <div
                className={`group cursor-pointer rounded-2xl border bg-white p-6 transition-all duration-500 ${
                  active
                    ? 'border-[#0050a9]/20 shadow-[0_18px_40px_-24px_rgba(0,80,169,0.55)]'
                    : 'border-gray-100 opacity-70'
                }`}
                onClick={() => setOpen(isOpen ? null : i)}
              >
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-lg font-bold text-[#0050a9]">{step.title}</h3>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-[#0050a9] transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </div>

                <p className="mt-2 text-sm leading-relaxed text-gray-600">{step.desc}</p>

                <div
                  className={`grid transition-all duration-500 ${
                    isOpen ? 'mt-4 grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <span className="inline-flex items-center gap-2 rounded-lg border border-blue-100 bg-blue-50 px-3 py-2 text-xs font-medium text-[#0050a9]">
                      <CheckCircle className="h-4 w-4 shrink-0" />
                      {step.exit}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
