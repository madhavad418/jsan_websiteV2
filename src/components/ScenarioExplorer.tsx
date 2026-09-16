import { useState } from 'react'
import { ArrowRight, CheckCircle } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

/**
 * "Here is your situation, here is what we do about it."
 *
 * Support is bought by people with a specific problem, not by people shopping for a
 * category. So the page opens on the problem in their words  a slow map service, an
 * inherited application, an interface nobody documented  and only then says what the work
 * is. Picking your own situation off a list is faster than reading six of them.
 *
 * Each scenario carries the same three beats deliberately: the situation, the concrete
 * actions, and what changes. Anything that cannot fill all three is not a scenario, it is
 * a feature, and belongs in the technology matrix instead.
 */

export type Scenario = {
  /** How a customer would describe it, not how we would bill it. */
  title: string
  icon: LucideIcon
  situation: string
  actions: string[]
  outcome: string
}

type Props = {
  eyebrow: string
  heading: string
  intro: string
  scenarios: Scenario[]
  collections?: { name: string; items: Scenario[] }[]
}

export default function ScenarioExplorer({ eyebrow, heading, intro, scenarios, collections }: Props) {
  const [active, setActive] = useState(0)
  const [collection, setCollection] = useState(0)
  const visibleScenarios = collections?.[collection]?.items ?? scenarios
  if (visibleScenarios.length === 0) return null

  const current = visibleScenarios[Math.min(active, visibleScenarios.length - 1)]

  return (
    <section className="py-16 md:py-24" style={{ background: 'linear-gradient(120deg, #012f62, #0055b4)' }}>
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="mb-10 max-w-3xl md:mb-12">
          <span className="t-label text-[#00d4ff]">{eyebrow}</span>
          <h2 className="mb-4 mt-3 text-[26px] font-bold leading-tight text-white md:text-[34px] lg:text-[40px]">
            {heading}
          </h2>
          <p className="text-[15px] leading-relaxed text-white/70 md:text-lg">{intro}</p>
        </div>

        {collections && collections.length > 1 && (
          <label className="mb-7 flex max-w-md flex-col gap-2 text-sm font-medium text-white/80">
            Explore a service area
            <select value={collection} onChange={(event) => { setCollection(Number(event.target.value)); setActive(0) }} className="w-full rounded-lg border border-white/25 bg-white px-4 py-3 text-sm font-semibold text-[#0a1a3a]">
              {collections.map((item, index) => <option key={item.name} value={index}>{item.name}</option>)}
            </select>
          </label>
        )}
        <div className="grid gap-6 lg:grid-cols-[minmax(0,340px)_minmax(0,1fr)] lg:gap-10">
          <div role="tablist" aria-label="Situations" className="flex flex-col gap-1.5">
            {visibleScenarios.map((scenario, i) => {
              const isActive = i === active
              const Icon = scenario.icon
              return (
                <button
                  key={scenario.title}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActive(i)}
                  className={`group flex items-center gap-3 rounded-xl border px-4 py-3.5 text-left text-sm font-semibold transition-all duration-300 ${
                    isActive
                      ? 'border-white/25 bg-white/15 text-white backdrop-blur-sm'
                      : 'border-white/10 bg-white/[0.04] text-white/70 hover:border-white/25 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <Icon
                    className={`h-4 w-4 shrink-0 ${isActive ? 'text-[#00d4ff]' : 'text-white/50'}`}
                    aria-hidden="true"
                  />
                  <span className="flex-1">{scenario.title}</span>
                  <ArrowRight
                    className={`h-4 w-4 shrink-0 transition-all duration-300 ${
                      isActive ? 'text-[#00d4ff]' : 'text-transparent group-hover:text-white/40'
                    }`}
                    aria-hidden="true"
                  />
                </button>
              )
            })}
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.07] p-6 backdrop-blur-sm md:p-8">
            <span className="t-label text-[#00d4ff]">The situation</span>
            <p className="mb-7 mt-3 text-[17px] leading-relaxed text-white md:text-xl">
              {current.situation}
            </p>

            <div className="border-t border-white/15 pt-7">
              <span className="t-label text-white/50">What we do</span>
              <ul className="mb-7 mt-4 grid gap-3 sm:grid-cols-2">
                {current.actions.map((action) => (
                  <li key={action} className="flex items-start gap-2.5">
                    <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-[#00d4ff]" aria-hidden="true" />
                    <span className="text-[14px] leading-relaxed text-white/80">{action}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border border-[#00d4ff]/25 bg-[#00d4ff]/10 p-5">
              <span className="t-label text-[#00d4ff]">What changes</span>
              <p className="mt-2 text-[15px] leading-relaxed text-white">{current.outcome}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
