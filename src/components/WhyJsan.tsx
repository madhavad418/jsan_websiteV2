import { Workflow, Globe2, BarChart3, ShieldCheck, Cpu, Shuffle } from 'lucide-react'

/**
 * SECTION 09  WHY JSAN
 *
 * Deliberately avoids "better", "faster" and "cost effective"  every competitor claims
 * those and none of them are demonstrable. Each point here describes something JSAN
 * actually does in delivery.
 */
const reasons = [
  {
    icon: Workflow,
    title: 'Field-to-Enterprise Ownership',
    description: 'From real-world collection through processing, QA and enterprise delivery.',
  },
  {
    icon: Globe2,
    title: 'Global Mobilisation',
    description: 'Flexible field, fleet and delivery models designed for multi-region programs.',
  },
  {
    icon: BarChart3,
    title: 'Operational Visibility',
    description: 'Structured reporting, dashboards, productivity measurement and escalation governance.',
  },
  {
    icon: ShieldCheck,
    title: 'Quality by Design',
    description: 'QA gates, evidence, traceability and human validation built into delivery workflows.',
  },
  {
    icon: Cpu,
    title: 'Engineering Depth',
    description: 'Geospatial, data, software and infrastructure expertise integrated into the delivery model.',
  },
  {
    icon: Shuffle,
    title: 'Flexible Delivery',
    description: 'On-site, offshore and hybrid execution aligned to program requirements.',
  },
]

export default function WhyJsan() {
  return (
    <section className="relative overflow-hidden py-20 lg:py-28">
      <div className="absolute inset-0">
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(120deg, #05132b 0%, #0a2350 55%, #0050a9 100%)' }}
        />
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.8) 1px, transparent 1px)',
            backgroundSize: '46px 46px',
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="mb-14 max-w-3xl lg:mb-16">
          <span className="mb-4 inline-block text-[11px] font-bold uppercase tracking-[0.25em] text-[#00d4ff]">
            Why JSAN
          </span>
          <h2 className="text-[30px] font-bold leading-[1.1] tracking-tight text-white lg:text-[46px]">
            Execution capability beyond the slide deck
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {reasons.map((reason) => (
            <div
              key={reason.title}
              className="group rounded-2xl border border-white/10 bg-white/[0.05] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[#00d4ff]/35 hover:bg-white/[0.09]"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#00d4ff]/12 ring-1 ring-[#00d4ff]/25 transition-transform duration-300 group-hover:scale-110">
                <reason.icon className="h-6 w-6 text-[#00d4ff]" />
              </div>
              <h3 className="mb-2.5 text-lg font-bold text-white">{reason.title}</h3>
              <p className="text-sm leading-relaxed text-white/70">{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
