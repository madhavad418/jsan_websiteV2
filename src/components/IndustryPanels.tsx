import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

/**
 * SECTION 05  INDUSTRIES
 *
 * Six image panels, each opening a dedicated industry journey rather than dropping the
 * visitor into a service list to work out which part applies to them.
 */
const industries = [
  {
    name: 'Mapping & Location Platforms',
    description:
      'Collection, enrichment, verification and operational support for location platforms and mapping programs.',
    href: '/industries/mapping-location-platforms',
    image: '/pillars/mapping.png',
  },
  {
    name: 'Autonomous Mobility',
    description:
      'Field deployment, route readiness, mapping operations, fleet support, evidence collection and geospatial QA.',
    href: '/industries/autonomous-mobility',
    image: '/pillars/autonomous_mobilitynew.png',
  },
  {
    name: 'Telecommunications',
    description:
      'Field intelligence, network GIS, LiDAR engineering, fibre, pole loading, small cells and as-built validation.',
    href: '/industries/telecommunications',
    image: '/pillars/telecommunications.png',
  },
  {
    name: 'Transportation & Infrastructure',
    description:
      'Spatial data and field intelligence supporting roads, rail, infrastructure and asset operations.',
    href: '/industries/transportation-infrastructure',
    image: '/pillars/trasport.png',
  },
  {
    name: 'Utilities',
    description: 'Geospatial intelligence for electricity, water, gas and infrastructure asset networks.',
    href: '/industries/utilities',
    image: '/pillars/utilities.png',
  },
  {
    name: 'Government & Smart Cities',
    description:
      'Field data, GIS, infrastructure intelligence and managed programs supporting public-sector operations.',
    href: '/industries/government-smart-cities',
    image: '/pillars/smart_city.png',
  },
]

export default function IndustryPanels() {
  return (
    <section className="bg-gray-50 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-14 max-w-3xl lg:mb-16">
          <span className="mb-4 inline-block text-[11px] font-bold uppercase tracking-[0.25em] text-[#00a3e0]">
            Industries
          </span>
          <h2 className="text-[30px] font-bold leading-[1.1] tracking-tight text-[#0a1a3a] lg:text-[46px]">
            Built for operations where location matters
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {industries.map((industry) => (
            <Link
              key={industry.name}
              to={industry.href}
              className="group relative flex h-[340px] flex-col justify-end overflow-hidden rounded-2xl shadow-md transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl"
            >
              <img
                src={industry.image}
                alt=""
                aria-hidden="true"
                width={1200}
                height={900}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-110"
                loading="lazy"
              />
              {/* The panels sit on photography, so the overlay carries the contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#05132b] via-[#05132b]/75 to-[#05132b]/20" />

              <div className="relative p-7">
                <h3 className="mb-2.5 text-xl font-bold leading-tight text-white">{industry.name}</h3>
                <p className="mb-5 text-sm leading-relaxed text-white/75">{industry.description}</p>
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#00d4ff]">
                  Explore
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/industries"
            className="group inline-flex items-center gap-2.5 rounded-lg px-8 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_34px_-14px_rgba(0,80,169,0.9)]"
            style={{ background: 'linear-gradient(120deg, #012f62, #0055b4)' }}
          >
            Explore Industries
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  )
}
