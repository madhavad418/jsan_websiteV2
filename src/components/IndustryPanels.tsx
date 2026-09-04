import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import SectionLabel from './SectionLabel'

/**
 * SECTION 05  INDUSTRIES
 *
 * Image panels, each opening a dedicated industry journey rather than dropping the
 * visitor into a service list to work out which part applies to them.
 *
 * The homepage shows three; /industries carries the full set. All six stay defined here
 * so changing which ones are featured is a one-line edit to FEATURED below, not a
 * rewrite  and so the copy for the others does not have to be reconstructed later.
 */
const industries = [
  {
    name: 'Mapping & Location Platforms',
    description:
      'Collection, enrichment, verification and operational support for location platforms and mapping programs.',
    href: '/industries/mapping-location-platforms',
    image: '/pillars/mapping.webp',
  },
  {
    name: 'Autonomous Mobility',
    description:
      'Field deployment, route readiness, mapping operations, fleet support, evidence collection and geospatial QA.',
    href: '/industries/autonomous-mobility',
    image: '/pillars/autonomous_mobilitynew.webp',
  },
  {
    name: 'Telecommunications',
    description:
      'Field intelligence, network GIS, LiDAR engineering, fibre, pole loading, small cells and as-built validation.',
    href: '/industries/telecommunications',
    image: '/pillars/telecommunications.webp',
  },
  {
    name: 'Transportation & Infrastructure',
    description:
      'Spatial data and field intelligence supporting roads, rail, infrastructure and asset operations.',
    href: '/industries/transportation-infrastructure',
    image: '/pillars/trasport.webp',
  },
  {
    name: 'Utilities',
    description: 'Geospatial intelligence for electricity, water, gas and infrastructure asset networks.',
    href: '/industries/utilities',
    image: '/pillars/utilities.webp',
  },
  {
    name: 'Government & Smart Cities',
    description:
      'Field data, GIS, infrastructure intelligence and managed programs supporting public-sector operations.',
    href: '/industries/government-smart-cities',
    image: '/pillars/smart_city.webp',
  },
]

/** The three shown on the homepage, in the order they appear. */
const FEATURED = [
  '/industries/mapping-location-platforms',
  '/industries/utilities',
  '/industries/government-smart-cities',
]

const featuredIndustries = FEATURED.map(
  (href) => industries.find((industry) => industry.href === href)
).filter((industry): industry is (typeof industries)[number] => Boolean(industry))

export default function IndustryPanels() {
  return (
    <section className="section-y bg-[#f7f8fa]">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 max-w-3xl lg:mb-14">
          <SectionLabel>Industries</SectionLabel>
          <h2 className="t-section text-[#0a1a3a]">
            Built for operations where location matters
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {featuredIndustries.map((industry) => (
            <Link
              key={industry.name}
              to={industry.href}
              className="group relative flex h-[360px] flex-col justify-end overflow-hidden rounded-sm transition-all duration-500 lg:h-[420px]"
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
              <div className="absolute inset-0 bg-gradient-to-t from-[#05132b] via-[#05132b]/70 to-transparent transition-opacity duration-500 group-hover:from-[#05132b]" />

              <div className="relative p-8">
                <h3 className="t-sub mb-3 text-white">{industry.name}</h3>
                <p className="mb-6 max-w-sm text-[15px] leading-relaxed text-white/70">
                  {industry.description}
                </p>
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-white">
                  Explore
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10">
          <Link
            to="/industries"
            className="group inline-flex min-h-[52px] items-center gap-2.5 rounded-full bg-[#0050a9] px-8 font-semibold text-white transition-colors duration-300 hover:bg-[#013e82]"
          >
            Explore Industries
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  )
}
