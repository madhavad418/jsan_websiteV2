import type { LucideIcon } from 'lucide-react'
import { useCountUp, useInView, parseStat } from '../lib/useCountUp'

export type StatItem = {
  number: string
  label: string
  /** Accepted for compatibility; the band no longer draws icons  see the note below. */
  icon?: LucideIcon
}

/**
 * The large-numbers moment.
 *
 * Previously four bordered, blurred, hover-lifting tiles with an icon in each  four cards
 * saying what four numbers could say on their own. Now the numbers ARE the design: set
 * large, separated by hairlines, on a plain deep-navy field. No boxes, no icons, no
 * hover state, nothing competing with the figures.
 */
function Stat({ item, index, start }: { item: StatItem; index: number; start: boolean }) {
  const { number, suffix } = parseStat(item.number)
  const count = useCountUp(number, start, 1400 + index * 120)

  return (
    <div
      className={`px-2 py-6 text-center transition-all duration-700 sm:px-6 lg:py-2 lg:text-left ${
        start ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'
      }`}
      style={{ transitionDelay: `${index * 90}ms` }}
    >
      <div className="text-[clamp(2.5rem,1.6rem+3.4vw,4rem)] font-bold leading-none tracking-[-0.04em] text-white tabular-nums">
        {count}
        <span className="text-white/45">{suffix}</span>
      </div>
      <div className="mt-4 t-label text-white/55">{item.label}</div>
    </div>
  )
}

export default function StatsBand({
  items,
  eyebrow,
  topRule = false,
}: {
  items: StatItem[]
  eyebrow?: string
  /**
   * Draw a lit hairline along the top edge. For where this band sits directly under the
   * bright home hero: the two meet on a hard cut, and this is what marks the join.
   *
   * It has to live here rather than at the foot of the hero, because cyan needs a dark
   * ground to register - over the last row of a daylight photograph the same line is
   * invisible at 1x. Held to the same max-w-7xl column as the eyebrow below it, so it
   * reads as a drawn rule rather than a border.
   */
  topRule?: boolean
}) {
  const { ref, inView } = useInView<HTMLDivElement>()

  return (
    <section ref={ref} className="section-y-sm relative overflow-hidden bg-[#0a1a3a]">
      {topRule && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 mx-auto w-full max-w-7xl px-6"
        >
          <div
            className="h-px w-full"
            style={{
              background:
                'linear-gradient(90deg, rgba(0,212,255,0.95) 0%, rgba(0,212,255,0.8) 34%, rgba(0,212,255,0.3) 66%, rgba(0,212,255,0) 100%)',
            }}
          />
        </div>
      )}
      {/* One quiet accent, bottom right, instead of a grid plus two glows. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -right-24 h-[420px] w-[420px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(0,212,255,0.10), transparent 65%)' }}
      />

      <div className="relative mx-auto max-w-7xl px-6">
        {eyebrow && (
          <div className="mb-10 t-label text-white/45 lg:mb-14">{eyebrow}</div>
        )}

        {/* Hairline dividers rather than boxes: the separation is implied, not drawn. */}
        <div
          className={`grid grid-cols-2 divide-white/10 lg:divide-x [&>*+*]:border-t [&>*+*]:border-white/10 sm:[&>*+*]:border-t-0 ${
            items.length === 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-4'
          }`}
        >
          {items.map((item, index) => (
            <Stat key={item.label} item={item} index={index} start={inView} />
          ))}
        </div>
      </div>
    </section>
  )
}
