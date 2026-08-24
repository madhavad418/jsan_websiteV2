import type { LucideIcon } from 'lucide-react'

/**
 * Capability modules for the capability pages.
 *
 * Two shapes, one component:
 *  - plain: name + what it does
 *  - pipeline: adds Input -> Processing -> Output, which the GeoAI page requires so every
 *    capability shows a concrete chain rather than an abstract AI graphic.
 *
 * Calm and precise by design: no decorative gradients behind the cards, no floating
 * ornaments, one accent colour.
 */
export type CapabilityModule = {
  name: string
  description: string
  icon?: LucideIcon
  pipeline?: { input: string; processing: string; output: string }
}

type Props = {
  eyebrow: string
  heading: string
  intro?: string
  modules: CapabilityModule[]
  /** Set on a white section to alternate against the band above it. */
  tone?: 'white' | 'gray'
}

export default function CapabilityModules({ eyebrow, heading, intro, modules, tone = 'gray' }: Props) {
  return (
    <section className={tone === 'white' ? 'bg-white py-20 lg:py-24' : 'bg-gray-50 py-20 lg:py-24'}>
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-14 max-w-3xl">
          <span className="mb-4 inline-block text-[11px] font-bold uppercase tracking-[0.25em] text-[#00a3e0]">
            {eyebrow}
          </span>
          <h2 className="mb-4 text-[28px] font-bold leading-[1.12] tracking-tight text-[#0a1a3a] lg:text-[40px]">
            {heading}
          </h2>
          {intro && <p className="text-lg leading-relaxed text-gray-600">{intro}</p>}
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {modules.map((m) => (
            <div
              key={m.name}
              className="flex flex-col rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              {m.icon && (
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[#e8f4fc]">
                  <m.icon className="h-5 w-5 text-[#0050a9]" />
                </div>
              )}
              <h3 className="mb-2 text-base font-bold leading-tight text-[#0a1a3a]">{m.name}</h3>
              <p className="text-sm leading-relaxed text-gray-600">{m.description}</p>

              {m.pipeline && (
                <div className="mt-5 space-y-2.5 border-t border-gray-100 pt-4">
                  {[
                    { label: 'Input', value: m.pipeline.input },
                    { label: 'Processing', value: m.pipeline.processing },
                    { label: 'Output', value: m.pipeline.output },
                  ].map((row) => (
                    <div key={row.label} className="flex gap-2.5">
                      <span className="w-[68px] shrink-0 text-[10px] font-bold uppercase tracking-wider text-[#00a3e0]">
                        {row.label}
                      </span>
                      <span className="text-xs leading-snug text-gray-600">{row.value}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
