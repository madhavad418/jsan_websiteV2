import { useState } from 'react'
import SectionLabel from './SectionLabel'
import { Link } from 'react-router-dom'
import { ArrowRight, MapPin, Truck, Layers, Mail } from 'lucide-react'
import WorldMap, { offices } from './WorldMap'

/**
 * SECTION 11  GLOBAL DELIVERY
 *
 * Location counts are derived from the real office list in WorldMap, never hardcoded, so
 * the number on screen cannot drift from the addresses actually published. If a region's
 * presence changes, edit the office list and this updates with it.
 *
 * Regional contact deliberately routes through the main contact route  no invented
 * regional phone numbers or mailboxes.
 */
const regionDetail = {
  EMEA: {
    label: 'Europe, Middle East & Africa',
    presence: 'Delivery and engineering teams across Western, Northern and Central Europe, supporting programmes in-region and cross-border.',
    fieldCapability: 'Collection crews, survey teams and vehicle operations mobilised per programme, with local permitting and access handled in country.',
    services: ['Street-Level Collection', 'Telecom & Utility GIS', 'GeoAI & Data Operations', 'Digital Engineering'],
  },
  Americas: {
    label: 'Americas',
    presence: 'North and South American delivery presence supporting mapping, mobility and infrastructure programmes.',
    fieldCapability: 'Field survey and collection operations mobilised against programme schedules, with regional crew and logistics support.',
    services: ['Field & Collection Operations', 'GIS Data Engineering', 'Program Management', 'Managed Technology Services'],
  },
  APAC: {
    label: 'Asia Pacific',
    presence: 'The largest concentration of delivery and data operations capacity, supporting global programmes around the clock.',
    fieldCapability: 'Collection fleets, field crews and large-scale data operations teams, including annotation and QA at production scale.',
    services: ['Collection Operations', 'Annotation & QA', 'GeoAI & Computer Vision', 'Enterprise Applications'],
  },
} as const

type RegionKey = keyof typeof regionDetail

const regionKeys = Object.keys(regionDetail) as RegionKey[]

export default function GlobalDelivery() {
  const [active, setActive] = useState<RegionKey>('EMEA')
  const detail = regionDetail[active]

  const locationsInRegion = offices.filter((o) => o.region === active)
  const countries = new Set(locationsInRegion.map((o) => o.country)).size

  return (
    <section className="section-y bg-white">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 max-w-3xl lg:mb-14">
          <SectionLabel>Global Delivery</SectionLabel>
          <h2 className="t-section mb-7 text-[#0a1a3a]">
            Global reach. Local execution. Central governance.
          </h2>
          <p className="t-body measure text-gray-600">
            {offices.length} registered locations across {regionKeys.length} delivery regions. Programmes are
            executed locally and governed centrally.
          </p>
        </div>

        <WorldMap />

        {/* Region selector */}
        {/* A segmented row, not three cards: only the current region carries colour. */}
        <div className="mt-10 grid gap-0 border-t border-gray-200 sm:grid-cols-3">
          {regionKeys.map((key) => {
            const count = offices.filter((o) => o.region === key).length
            const isOn = key === active
            return (
              <button
                key={key}
                type="button"
                onClick={() => setActive(key)}
                aria-current={isOn}
                className={`border-b-2 px-1 py-6 text-left transition-colors duration-300 ${
                  isOn ? 'border-[#0050a9]' : 'border-transparent hover:border-gray-300'
                }`}
              >
                <div className={`text-[17px] font-bold ${isOn ? 'text-[#0050a9]' : 'text-[#0a1a3a]'}`}>
                  {key}
                </div>
                <div className="mt-1.5 text-sm text-gray-500">
                  {count} {count === 1 ? 'location' : 'locations'}
                </div>
              </button>
            )
          })}
        </div>

        {/* Region detail */}
        <div className="mt-10 border-t border-gray-200 pt-9">
          <div className="mb-6 flex flex-wrap items-baseline gap-x-4 gap-y-1">
            <h3 className="text-xl font-bold text-[#0a1a3a] lg:text-2xl">{detail.label}</h3>
            <span className="text-sm text-gray-500">
              {locationsInRegion.length} locations &middot; {countries} {countries === 1 ? 'country' : 'countries'}
            </span>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <div className="mb-2 flex items-center gap-2 t-label text-gray-500">
                <MapPin className="h-3.5 w-3.5 text-[#0050a9]" aria-hidden="true" />
                Delivery Presence
              </div>
              <p className="text-sm leading-relaxed text-gray-600">{detail.presence}</p>
            </div>

            <div>
              <div className="mb-2 flex items-center gap-2 t-label text-gray-500">
                <Truck className="h-3.5 w-3.5" />
                Field Capability
              </div>
              <p className="text-sm leading-relaxed text-gray-600">{detail.fieldCapability}</p>
            </div>

            <div>
              <div className="mb-3 flex items-center gap-2 t-label text-gray-500">
                <Layers className="h-3.5 w-3.5" />
                Available Services
              </div>
              <div className="flex flex-wrap gap-2">
                {detail.services.map((service) => (
                  <span
                    key={service}
                    className="rounded-full border border-blue-100 bg-white px-3 py-1.5 text-xs font-medium text-[#0050a9]"
                  >
                    {service}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <div className="mb-3 flex items-center gap-2 t-label text-gray-500">
                <Mail className="h-3.5 w-3.5 text-[#0050a9]" aria-hidden="true" />
                Regional Contact
              </div>
              <Link
                to="/contact"
                className="group inline-flex min-h-[44px] items-center gap-2 text-sm font-semibold text-[#0050a9]"
              >
                Contact the {active} team
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
