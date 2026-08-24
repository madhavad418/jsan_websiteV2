import type { LucideIcon } from 'lucide-react'
import { useCountUp, useInView, parseStat } from '../lib/useCountUp'

export type StatItem = {
  number: string
  label: string
  icon?: LucideIcon
}

function Stat({ item, index, start }: { item: StatItem; index: number; start: boolean }) {
  const { number, suffix } = parseStat(item.number)
  const count = useCountUp(number, start, 1400 + index * 120)
  const Icon = item.icon

  return (
    <div
      className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-7 text-center backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:border-[#00d4ff]/40 hover:bg-white/[0.1] hover:shadow-[0_14px_32px_-14px_rgba(0,212,255,0.55)] ${
        start ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
      }`}
      style={{ transitionDelay: `${index * 90}ms` }}
    >
      <span className="pointer-events-none absolute inset-x-6 -top-px h-px bg-gradient-to-r from-transparent via-[#00d4ff] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      {Icon && (
        <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/10 transition-all duration-300 group-hover:scale-110 group-hover:border-[#00d4ff]/40 group-hover:bg-[#00d4ff]/15">
          <Icon className="h-5 w-5 text-[#00d4ff]" />
        </div>
      )}

      <div className="mb-1.5 text-[30px] font-bold leading-none tracking-tight text-white tabular-nums lg:text-[38px]">
        {count}
        <span className="text-[#00d4ff]">{suffix}</span>
      </div>
      <div className="text-[11px] font-medium uppercase tracking-wider text-white/70">{item.label}</div>
    </div>
  )
}

/**
 * Full-width stats band with numbers that count up the first time the band
 * scrolls into view.
 */
export default function StatsBand({
  items,
  eyebrow,
}: {
  items: StatItem[]
  eyebrow?: string
}) {
  const { ref, inView } = useInView<HTMLDivElement>()

  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-14 lg:py-16"
      style={{ background: 'linear-gradient(120deg, #012f62, #0055b4)' }}
    >
      {/* Depth: faint grid + accent glows */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.7) 1px, transparent 1px)',
          backgroundSize: '56px 56px',
        }}
      />
      <div
        className="pointer-events-none absolute -left-32 -top-40 h-[420px] w-[420px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(0,212,255,0.18), transparent 65%)' }}
      />
      <div
        className="pointer-events-none absolute -bottom-44 -right-24 h-[480px] w-[480px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(0,212,255,0.12), transparent 65%)' }}
      />

      <div className="relative mx-auto max-w-7xl px-6">
        {eyebrow && (
          <div className="mb-9 text-center">
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#00d4ff]">
              {eyebrow}
            </span>
          </div>
        )}

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-5">
          {items.map((item, index) => (
            <Stat key={item.label} item={item} index={index} start={inView} />
          ))}
        </div>
      </div>
    </section>
  )
}
