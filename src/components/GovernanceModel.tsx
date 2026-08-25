import { Building2, ShieldCheck, Truck, Database, Cpu, BadgeCheck, Server } from 'lucide-react'
import SectionLabel from './SectionLabel'
import Reveal from './Reveal'
import { useInView } from '../lib/useCountUp'

/**
 * Program governance structure: customer -> JSAN governance -> delivery functions ->
 * what comes back out. Drawn as a flow rather than a list, because the point is that
 * one governance layer sits between the customer and every delivery function.
 */
const functions = [
  { name: 'Field Operations', icon: Truck },
  { name: 'Data Operations', icon: Database },
  { name: 'Engineering', icon: Cpu },
  { name: 'QA', icon: BadgeCheck },
  { name: 'Technology', icon: Server },
]

const outputs = ['Dashboards', 'KPIs', 'Risks', 'Escalations', 'Deliverables']

/**
 * The line between two steps. It draws downward as it comes into view, so the diagram
 * assembles itself as you scroll rather than arriving finished.
 */
function Connector() {
  const { ref, inView } = useInView<HTMLDivElement>(0.5)

  return (
    <div ref={ref} className="flex justify-center py-4" aria-hidden="true">
      <div
        className={`w-px origin-top bg-gradient-to-b from-[#0050a9]/40 to-[#0050a9]/10 transition-transform duration-500 ease-out motion-reduce:!scale-y-100 motion-reduce:transition-none ${
          inView ? 'scale-y-100' : 'scale-y-0'
        }`}
        style={{ height: '2rem' }}
      />
    </div>
  )
}

export default function GovernanceModel() {
  return (
    <section className="section-y bg-[#f7f8fa]">
      <div className="mx-auto max-w-5xl px-6">
        <div className="mb-12 max-w-3xl lg:mb-14">
          <SectionLabel>Governance Model</SectionLabel>
          <h2 className="t-section text-[#0a1a3a]">
            One governance layer between you and delivery
          </h2>
        </div>

        {/* Customer */}
        {/* This one IS a diagram, so the boxes stay - but as hairlines, with colour
            only on the governance layer, which is the point being made. */}
        <Reveal className="mx-auto max-w-sm border border-gray-200 bg-white p-6 text-center">
          <Building2 className="mx-auto mb-2.5 h-5 w-5 text-[#0050a9]" aria-hidden="true" />
          <div className="font-bold text-[#0a1a3a]">Customer</div>
        </Reveal>

        <Connector />

        {/* Governance */}
        <Reveal className="mx-auto max-w-xl bg-[#0a1a3a] p-8 text-center">
          <ShieldCheck className="mx-auto mb-3 h-6 w-6 text-[#00d4ff]" aria-hidden="true" />
          <div className="t-sub text-white">JSAN Program Governance</div>
          <div className="mt-3 text-sm leading-relaxed text-white/65">
            Scope, risk, performance control and a single point of accountability
          </div>
        </Reveal>

        <Connector />

        {/* Delivery functions */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {functions.map((fn, i) => (
            <Reveal
              key={fn.name}
              delay={i * 90}
              className="border border-gray-200 bg-white p-4 text-center"
            >
              <fn.icon className="mx-auto mb-2 h-5 w-5 text-[#0050a9]" aria-hidden="true" />
              <div className="text-sm font-semibold text-[#0a1a3a]">{fn.name}</div>
            </Reveal>
          ))}
        </div>

        <Connector />

        {/* Outputs */}
        <div className="flex flex-wrap justify-center gap-2.5">
          {outputs.map((out, i) => (
            <Reveal
              key={out}
              delay={i * 80}
              className="rounded-full border border-gray-200 bg-white px-4 py-2 text-sm text-gray-700"
            >
              {out}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
