import { CheckCircle } from 'lucide-react'
import { useInView } from '../lib/useCountUp'
import type { TechGroup } from './TechMatrix'

/**
 * "What we deliver" as four compact cards instead of TechMatrix's alternating photo panels.
 *
 * TechMatrix suits pages where a reader is hunting for their own stack in a long inventory.
 * For a service that is easy to picture - flying a drone, building a 3D model - a large photo
 * per area repeats what the hero already shows, so this layout keeps just the icon, the one
 * line on what the area is, and a short checklist. Images and the expandable technical detail
 * are deliberately ignored.
 */
type Props = {
  eyebrow: string
  heading: string
  intro: string
  groups: TechGroup[]
}

export default function DeliverableCards({ eyebrow, heading, intro, groups }: Props) {
  const { ref, inView } = useInView<HTMLDivElement>()
  if (groups.length === 0) return null

  return (
    <section className="section-y bg-white">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="mb-12 max-w-3xl lg:mb-14">
          <span className="t-label text-[#00d4ff]">{eyebrow}</span>
          <h2 className="text-gradient mb-4 mt-3 text-[26px] font-bold leading-tight md:text-[34px] lg:text-[40px]">
            {heading}
          </h2>
          <p className="text-[15px] leading-relaxed text-gray-600 md:text-lg">{intro}</p>
        </div>

        <div ref={ref} className="grid gap-6 md:grid-cols-2">
          {groups.map((group, i) => {
            const Icon = group.icon
            return (
              <article
                key={group.name}
                className={`group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#0050a9]/40 hover:shadow-[0_24px_48px_-26px_rgba(0,80,169,0.55)] md:p-8 ${
                  inView ? 'animate-pop-in' : 'opacity-0'
                }`}
                style={{ animationDelay: `${i * 120}ms` }}
              >
                {/* Brand hairline, revealed on hover */}
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-[#0050a9] to-[#00d4ff] transition-transform duration-500 group-hover:scale-x-100"
                />

                <div className="mb-5 flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#012f62] to-[#0055b4] shadow-[0_10px_22px_-12px_rgba(0,80,169,0.9)]">
                    <Icon className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  <span className="text-[30px] font-bold leading-none tracking-[-0.04em] text-gray-200 transition-colors duration-300 group-hover:text-[#0050a9]/25">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>

                <h3 className="mb-3 text-xl font-bold leading-snug text-[#0a1a3a]">{group.name}</h3>
                <p className="mb-6 text-[15px] leading-relaxed text-gray-600">{group.blurb}</p>

                <ul className="grid gap-x-6 gap-y-2.5 border-t border-gray-100 pt-5 sm:grid-cols-2">
                  {group.items.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-[14px] leading-snug text-gray-700">
                      <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-[#00a3cc]" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
