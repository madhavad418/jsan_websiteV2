import { Link } from 'react-router-dom'
import { ArrowRight, Zap, Route, Briefcase, Building2 } from 'lucide-react'

/* Mirrors the four industries on /industries, each with its own page. */
const industries = [
  {
    name: 'Energy & Utilities',
    icon: Zap,
    blurb: 'Smart grid, asset management and operational optimization for energy networks.',
    href: '/industries/utilities',
  },
  {
    name: 'Transport & Mobility',
    icon: Route,
    blurb: 'Fleet management, routing, real-time tracking and logistics intelligence.',
    href: '/industries/transportation-infrastructure',
  },
  {
    name: 'Consulting & Professional Services',
    icon: Briefcase,
    blurb: 'Resource augmentation, specialist expertise and delivery partnership.',
    href: '/industries/consulting',
  },
  {
    name: 'Sustainability & Future Cities',
    icon: Building2,
    blurb: 'Urban analytics, traffic management, IoT infrastructure and digital twins.',
    href: '/industries/government-smart-cities',
  },
]

export default function IndustriesStrip() {
  return (
    <section className="bg-gray-50 py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 text-center">
          <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#00d4ff]">
            Industries We Serve
          </span>
          <h2 className="text-gradient mb-4 mt-4 text-[36px] font-bold lg:text-[42px]">
            Domain Depth, Not Generic Delivery
          </h2>
          <p className="mx-auto max-w-3xl text-lg text-gray-600">
            Every engagement is shaped by the operating reality of the sector it serves.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {industries.map((industry) => (
            <Link
              key={industry.name}
              to={industry.href}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#0050a9]/20 hover:shadow-xl"
            >
              <span className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#0050a9] to-[#00d4ff] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              <div
                className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110"
                style={{ background: 'linear-gradient(140deg, #012f62, #0055b4)' }}
              >
                <industry.icon className="h-6 w-6 text-white" />
              </div>

              <h3 className="mb-2 text-base font-bold leading-snug text-[#0050a9]">{industry.name}</h3>
              <p className="mb-4 text-sm leading-relaxed text-gray-600">{industry.blurb}</p>

              <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-[#0050a9]">
                Learn more
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
