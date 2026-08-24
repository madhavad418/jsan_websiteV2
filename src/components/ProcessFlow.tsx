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
 */
export default function ProcessFlow({ steps }: { steps: ProcessStep[] }) {
  const { ref, inView } = useInView<HTMLDivElement>()

  return (
    <div ref={ref}>
      {/* Desktop */}
      <div className="relative hidden lg:block">
        <div className="relative grid grid-cols-3 gap-x-6 gap-y-10">
          {steps.map((step, i) => (
            <div
              key={i}
              className={`group rounded-2xl border border-white/15 bg-white/[0.08] p-5 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1.5 hover:border-[#00d4ff]/40 hover:bg-white/[0.13] hover:shadow-[0_20px_40px_-18px_rgba(0,212,255,0.6)] ${
                inView ? 'animate-pop-in' : 'opacity-0'
              }`}
              style={{ animationDelay: `${i * 160}ms` }}
            >
              <div className="flex items-start gap-4">
                <div className="relative shrink-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#00d4ff]/30 bg-[#00d4ff]/15 transition-all duration-500 group-hover:scale-110 group-hover:bg-[#00d4ff]/30">
                    <step.icon className="h-5 w-5 text-[#00d4ff]" />
                  </div>
                  <span className="absolute -left-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-[#00d4ff] text-[11px] font-bold text-[#012f62] transition-transform duration-500 group-hover:scale-110">
                    {i + 1}
                  </span>
                </div>
                <div className="pt-0.5">
                  <p className="font-bold leading-snug text-white">{step.title ?? step.label}</p>
                  {step.desc && (
                    <p className="mt-1 text-sm leading-relaxed text-white/70">{step.desc}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile / tablet timeline */}
      <div className="relative lg:hidden">
        <div className="absolute bottom-2 left-6 top-2 w-px bg-white/20" />
        <div
          className={`absolute left-6 top-2 w-px origin-top bg-gradient-to-b from-[#00d4ff] to-[#00d4ff]/20 transition-all duration-[1400ms] ease-out ${
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
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#00d4ff]/30 bg-[#00d4ff]/15 backdrop-blur-sm">
                  <step.icon className="h-5 w-5 text-[#00d4ff]" />
                </div>
                <span className="absolute -left-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#00d4ff] text-[10px] font-bold text-[#012f62]">
                  {i + 1}
                </span>
              </div>
              <div className="flex-1 rounded-xl border border-white/15 bg-white/[0.08] p-4 backdrop-blur-sm">
                <p className="font-bold leading-snug text-white">{step.title ?? step.label}</p>
                {step.desc && <p className="mt-1 text-sm leading-relaxed text-white/70">{step.desc}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
