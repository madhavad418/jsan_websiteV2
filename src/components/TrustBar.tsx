import { displayableMetrics } from '../config/companyMetrics'
import HeroStat from './HeroStat'

/**
 * SECTION 02  TRUST / SCALE BAR
 *
 * Figures come from src/config/companyMetrics.ts and nowhere else. Metrics without a
 * validated figure are absent from `displayableMetrics`, so they simply do not render 
 * the bar never shows an invented number to fill a slot.
 */
export default function TrustBar() {
  if (displayableMetrics.length === 0) return null

  return (
    <section className="border-b border-gray-100 bg-white py-14 lg:py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-2 gap-x-8 gap-y-10 md:grid-cols-3 lg:grid-cols-5">
          {displayableMetrics.map((m) => (
            <div key={m.id} className="text-center">
              <div className="text-[34px] font-bold leading-none tabular-nums text-[#0050a9] lg:text-[44px]">
                <HeroStat value={m.value as string} />
              </div>
              <div className="mt-2.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#0050a9]">
                {m.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
