import { useState } from 'react'
import type { LucideIcon } from 'lucide-react'
import { Check, ChevronDown } from 'lucide-react'
import { useInView } from '../lib/useCountUp'

export type Gate = {
  g: string
  title: string
  desc: string
  icon?: LucideIcon
}

/**
 * Quality gates as an interactive pipeline. Each gate is a node on a rail:
 * selecting one shows its detail below, and every gate before it reads as
 * passed, which makes the sequential nature of the gates explicit.
 */
export default function QualityGates({ gates }: { gates: Gate[] }) {
  const [active, setActive] = useState(0)
  const { ref, inView } = useInView<HTMLDivElement>()

  if (gates.length === 0) return null

  const current = gates[active]
  const CurrentIcon = current.icon

  return (
    <div ref={ref}>
      {/* Rail (desktop) */}
      <div className="relative mb-10 hidden lg:block">
        <div className="absolute left-[8%] right-[8%] top-7 h-0.5 rounded-full bg-gray-200" />
        <div
          className="absolute left-[8%] top-7 h-0.5 rounded-full bg-gradient-to-r from-[#0050a9] to-[#00d4ff] transition-all duration-500"
          style={{ width: `${(active / Math.max(gates.length - 1, 1)) * 84}%` }}
        />

        <div className="relative flex items-start justify-between">
          {gates.map((gate, i) => {
            const passed = i < active
            const isActive = i === active
            const Icon = gate.icon
            return (
              <button
                key={gate.g}
                onClick={() => setActive(i)}
                onMouseEnter={() => setActive(i)}
                aria-current={isActive}
                className={`group flex w-[16%] flex-col items-center text-center transition-all duration-500 ${
                  inView ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                }`}
                style={{ transitionDelay: `${i * 90}ms` }}
              >
                <span
                  className={`relative flex h-14 w-14 items-center justify-center rounded-full border-2 text-sm font-bold transition-all duration-500 ${
                    isActive
                      ? 'scale-110 border-transparent text-white shadow-[0_12px_28px_-10px_rgba(0,80,169,0.95)]'
                      : passed
                        ? 'border-[#0050a9]/30 bg-[#0050a9]/10 text-[#0050a9]'
                        : 'border-gray-200 bg-white text-gray-400 group-hover:border-[#0050a9]/40'
                  }`}
                  style={isActive ? { background: 'linear-gradient(140deg, #012f62, #0055b4)' } : undefined}
                >
                  {passed ? <Check className="h-5 w-5" /> : Icon && isActive ? <Icon className="h-5 w-5" /> : gate.g}
                  {isActive && (
                    <span className="absolute inset-0 animate-ping rounded-full border border-[#00d4ff]/50 opacity-40" />
                  )}
                </span>

                <span
                  className={`mt-3 text-xs font-semibold leading-snug transition-colors duration-300 ${
                    isActive ? 'text-[#0050a9]' : 'text-gray-500 group-hover:text-[#0050a9]'
                  }`}
                >
                  {gate.title}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Detail panel (desktop) */}
      <div className="hidden overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-[0_18px_44px_-26px_rgba(0,80,169,0.6)] lg:block">
        <div key={active} className="animate-slide-up flex items-start gap-6 p-8">
          <span
            className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl text-lg font-bold text-white"
            style={{ background: 'linear-gradient(140deg, #012f62, #0055b4)' }}
          >
            {CurrentIcon ? <CurrentIcon className="h-7 w-7" /> : current.g}
          </span>

          <div className="flex-1">
            <div className="mb-2 flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-blue-50 px-3 py-1 text-[11px] font-bold tracking-wider text-[#0050a9]">
                {current.g}
              </span>
              <h3 className="text-xl font-bold text-[#0050a9]">{current.title}</h3>
            </div>
            <p className="leading-relaxed text-gray-600">{current.desc}</p>

            <div className="mt-5 flex items-center gap-3 text-xs text-gray-400">
              <span className="font-bold uppercase tracking-wider">
                Gate {active + 1} of {gates.length}
              </span>
              <span className="h-1 flex-1 overflow-hidden rounded-full bg-gray-100">
                <span
                  className="block h-full rounded-full bg-gradient-to-r from-[#0050a9] to-[#00d4ff] transition-all duration-500"
                  style={{ width: `${((active + 1) / gates.length) * 100}%` }}
                />
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile / tablet: accordion */}
      <div className="space-y-3 lg:hidden">
        {gates.map((gate, i) => {
          const isOpen = active === i
          const Icon = gate.icon
          return (
            <div
              key={gate.g}
              className={`overflow-hidden rounded-2xl border bg-white transition-all duration-300 ${
                isOpen ? 'border-[#0050a9]/25 shadow-lg' : 'border-gray-100'
              }`}
            >
              <button
                onClick={() => setActive(isOpen ? -1 : i)}
                aria-expanded={isOpen}
                className="flex w-full items-center gap-3 p-5 text-left"
              >
                <span
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-sm font-bold transition-colors ${
                    isOpen ? 'text-white' : 'bg-blue-50 text-[#0050a9]'
                  }`}
                  style={isOpen ? { background: 'linear-gradient(140deg, #012f62, #0055b4)' } : undefined}
                >
                  {Icon ? <Icon className="h-5 w-5" /> : gate.g}
                </span>
                <span className="flex-1">
                  <span className="block text-[10px] font-bold tracking-widest text-[#0050a9]/60">
                    {gate.g}
                  </span>
                  <span className="block font-bold text-[#0050a9]">{gate.title}</span>
                </span>
                <ChevronDown
                  className={`h-5 w-5 shrink-0 text-[#0050a9] transition-transform duration-300 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <div
                className={`grid transition-all duration-300 ${
                  isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                }`}
              >
                <div className="overflow-hidden">
                  <p className="px-5 pb-5 text-sm leading-relaxed text-gray-600">{gate.desc}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
