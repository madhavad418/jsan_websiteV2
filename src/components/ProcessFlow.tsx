import type { LucideIcon } from 'lucide-react'
import { useInView } from '../lib/useCountUp'

export type ProcessStep = {
  icon: LucideIcon
  /** Either title (+ optional desc) or a single label */
  title?: string
  desc?: string
  label?: string
}

/**
 * Animated operating-model flow. Each stage pops into place after the one
 * before it and lifts on hover. Desktop shows a 3-column grid; narrow screens
 * fall back to a vertical timeline.
 *
 * `tone` matters: this was originally written for the deep navy band the service pages put
 * it in, with white type throughout. Dropped onto a white section it rendered as a row of
 * icons with invisible labels - a failure that looks like a layout quirk rather than a bug,
 * so it survived review. Pass tone="light" on a pale background.
 */
type Props = {
  steps: ProcessStep[]
  /** 'dark' for the navy band (default), 'light' for a white or near-white section. */
  tone?: 'dark' | 'light'
}

export default function ProcessFlow({ steps, tone = 'dark' }: Props) {
  const { ref, inView } = useInView<HTMLDivElement>()
  const light = tone === 'light'

  const card = light
    ? 'border-gray-200 bg-white shadow-sm hover:border-[#0050a9]/40 hover:shadow-[0_20px_40px_-22px_rgba(0,80,169,0.5)]'
    : 'border-white/15 bg-white/[0.08] backdrop-blur-sm hover:border-[#00d4ff]/40 hover:bg-white/[0.13] hover:shadow-[0_20px_40px_-18px_rgba(0,212,255,0.6)]'
  const tile = light
    ? 'border-[#0050a9]/20 bg-[#e8f4fc] group-hover:bg-[#d6ebf9]'
    : 'border-[#00d4ff]/30 bg-[#00d4ff]/15 group-hover:bg-[#00d4ff]/30'
  const iconColour = light ? 'text-[#0050a9]' : 'text-[#00d4ff]'
  const badge = light ? 'bg-[#0050a9] text-white' : 'bg-[#00d4ff] text-[#012f62]'
  const titleColour = light ? 'text-[#0a1a3a]' : 'text-white'
  const descColour = light ? 'text-gray-600' : 'text-white/70'
  const rail = light ? 'bg-gray-200' : 'bg-white/20'
  const railFill = light
    ? 'bg-gradient-to-b from-[#0050a9] to-[#0050a9]/20'
    : 'bg-gradient-to-b from-[#00d4ff] to-[#00d4ff]/20'

  return (
    <div ref={ref}>
      {/* Desktop */}
      <div className="relative hidden lg:block">
        <div className="relative grid grid-cols-3 gap-x-6 gap-y-10">
          {steps.map((step, i) => (
            <div
              key={i}
              className={`group rounded-2xl border p-5 transition-all duration-500 hover:-translate-y-1.5 ${card} ${
                inView ? 'animate-pop-in' : 'opacity-0'
              }`}
              style={{ animationDelay: `${i * 160}ms` }}
            >
              <div className="flex items-start gap-4">
                <div className="relative shrink-0">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-xl border transition-all duration-500 group-hover:scale-110 ${tile}`}
                  >
                    <step.icon className={`h-5 w-5 ${iconColour}`} />
                  </div>
                  <span
                    className={`absolute -left-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-bold transition-transform duration-500 group-hover:scale-110 ${badge}`}
                  >
                    {i + 1}
                  </span>
                </div>
                <div className="pt-0.5">
                  <p className={`font-bold leading-snug ${titleColour}`}>{step.title ?? step.label}</p>
                  {step.desc && (
                    <p className={`mt-1 text-sm leading-relaxed ${descColour}`}>{step.desc}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile / tablet timeline */}
      <div className="relative lg:hidden">
        <div className={`absolute bottom-2 left-6 top-2 w-px ${rail}`} />
        <div
          className={`absolute left-6 top-2 w-px origin-top transition-all duration-[1400ms] ease-out ${railFill} ${
            inView ? 'bottom-2' : 'bottom-full'
          }`}
        />
        <div className="space-y-4">
          {steps.map((step, i) => (
            <div
              key={i}
              className={`relative flex items-start gap-4 transition-all duration-700 ${
                inView ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              }`}
              style={{ transitionDelay: `${i * 140}ms` }}
            >
              <div className="relative z-10 shrink-0">
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl border ${tile}`}>
                  <step.icon className={`h-5 w-5 ${iconColour}`} />
                </div>
                <span
                  className={`absolute -left-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold ${badge}`}
                >
                  {i + 1}
                </span>
              </div>
              <div className={`flex-1 rounded-xl border p-4 ${card}`}>
                <p className={`font-bold leading-snug ${titleColour}`}>{step.title ?? step.label}</p>
                {step.desc && <p className={`mt-1 text-sm leading-relaxed ${descColour}`}>{step.desc}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
