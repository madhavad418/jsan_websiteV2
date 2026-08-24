import { Building2, ShieldCheck, Truck, Database, Cpu, BadgeCheck, Server } from 'lucide-react'

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

function Connector() {
  return (
    <div className="flex justify-center py-4" aria-hidden="true">
      <div className="h-8 w-px bg-gradient-to-b from-[#0050a9]/40 to-[#0050a9]/10" />
    </div>
  )
}

export default function GovernanceModel() {
  return (
    <section className="bg-gray-50 py-20 lg:py-24">
      <div className="mx-auto max-w-5xl px-6">
        <div className="mb-14 max-w-3xl">
          <span className="mb-4 inline-block text-[11px] font-bold uppercase tracking-[0.25em] text-[#00a3e0]">
            Governance Model
          </span>
          <h2 className="text-[28px] font-bold leading-[1.12] tracking-tight text-[#0a1a3a] lg:text-[40px]">
            One governance layer between you and delivery
          </h2>
        </div>

        {/* Customer */}
        <div className="mx-auto max-w-sm rounded-2xl border border-gray-200 bg-white p-5 text-center shadow-sm">
          <Building2 className="mx-auto mb-2 h-5 w-5 text-[#0050a9]" />
          <div className="font-bold text-[#0a1a3a]">Customer</div>
        </div>

        <Connector />

        {/* Governance */}
        <div
          className="mx-auto max-w-xl rounded-2xl p-6 text-center shadow-lg"
          style={{ background: 'linear-gradient(120deg, #012f62, #0055b4)' }}
        >
          <ShieldCheck className="mx-auto mb-2 h-6 w-6 text-[#00d4ff]" />
          <div className="text-lg font-bold text-white">JSAN Program Governance</div>
          <div className="mt-1 text-sm text-white/70">
            Scope, risk, performance control and a single point of accountability
          </div>
        </div>

        <Connector />

        {/* Delivery functions */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {functions.map((fn) => (
            <div
              key={fn.name}
              className="rounded-xl border border-gray-200 bg-white p-4 text-center shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
            >
              <fn.icon className="mx-auto mb-2 h-5 w-5 text-[#0050a9]" />
              <div className="text-sm font-semibold text-[#0a1a3a]">{fn.name}</div>
            </div>
          ))}
        </div>

        <Connector />

        {/* Outputs */}
        <div className="flex flex-wrap justify-center gap-2.5">
          {outputs.map((out) => (
            <span
              key={out}
              className="rounded-full border border-blue-100 bg-white px-4 py-2 text-sm font-medium text-[#0050a9]"
            >
              {out}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
