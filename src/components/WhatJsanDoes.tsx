import { Link } from 'react-router-dom'
import { ArrowRight, Truck, Layers, Brain, Code } from 'lucide-react'
import SectionLabel from './SectionLabel'

/**
 * SECTION 03  OPERATE, MAP, INTELLIGENCE, ENGINEER
 *
 * The four stages of the operating model as large visual modules, alternating sides so
 * each one gets a full-width read rather than becoming a card grid.
 *
 * Visuals follow the brief: real fleet operations, road capture and point cloud, imagery
 * with detection overlay, and an actual JSAN dashboard UI. Swap for authentic photography
 * as rights allow.
 */
const modules = [
  {
    num: '01',
    stage: 'Operate',
    icon: Truck,
    title: 'Run complex field operations at scale.',
    description:
      'Fleet mobilisation, crew operations, dispatch, tracking, maintenance, logistics and program governance.',
    cta: { label: 'Explore Field Operations', href: '/services/global-fleet-collection-operations' },
    image: '/pillars/operate.png',
    imageAlt: 'JSAN fleet and field operations',
  },
  {
    num: '02',
    stage: 'Map',
    icon: Layers,
    title: 'Capture the world as structured geospatial data.',
    description:
      'Street imagery, LiDAR, roads, addresses, POIs, telecom infrastructure and field-verified spatial datasets.',
    cta: { label: 'Explore Geospatial', href: '/services/global-street-data-collection' },
    image: '/pillars/map.png',
    imageAlt: 'Street capture and 3D point cloud data',
  },
  {
    num: '03',
    stage: 'Intelligence',
    icon: Brain,
    title: 'Turn imagery and spatial data into actionable information.',
    description:
      'Computer vision, GeoAI, feature extraction, OCR, annotation, spatial analytics and human-validated QA.',
    cta: { label: 'Explore GeoAI', href: '/services/geoai-computer-vision' },
    image: '/pillars/Intelligence.png',
    imageAlt: 'Imagery with asset detection overlay',
  },
  {
    num: '04',
    stage: 'Engineer',
    icon: Code,
    title: 'Build the systems that operationalise the data.',
    description:
      'Web GIS, mobile applications, dashboards, enterprise platforms, APIs, cloud engineering and managed technology services.',
    cta: { label: 'Explore Digital Engineering', href: '/services/digital-engineering' },
    image: '/pillars/engineer.png',
    imageAlt: 'JSAN application dashboard',
  },
]

export default function WhatJsanDoes() {
  return (
    <section className="section-y bg-white">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-20 max-w-3xl lg:mb-28">
          <SectionLabel>Operate &bull; Map &bull; Intelligence &bull; Engineer</SectionLabel>
          <h2 className="t-section mb-7 text-[#0a1a3a]">
            From the field to decision-ready intelligence
          </h2>
          <p className="t-body measure text-gray-600">
            JSAN brings together field execution, geospatial engineering, data operations and enterprise
            technology under one delivery model.
          </p>
        </div>

        <div className="space-y-24 lg:space-y-36">
          {modules.map((m, i) => (
            <div
              key={m.num}
              className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16"
            >
              {/* Alternate sides so the page has rhythm rather than four identical rows */}
              <div className={i % 2 === 1 ? 'lg:order-2' : ''}>
                {/* Numeral, hairline, label  no filled tile, no coloured chip. */}
                <div className="flex items-center gap-4">
                  <span className="text-[40px] font-bold leading-none tracking-[-0.04em] text-[#868e9c] lg:text-[52px]">
                    {m.num}
                  </span>
                  <span aria-hidden="true" className="h-px w-8 bg-gray-300" />
                  <m.icon className="h-5 w-5 text-[#0050a9]" aria-hidden="true" />
                  <span className="t-label text-gray-500">{m.stage}</span>
                </div>

                <h3 className="t-sub mb-5 mt-7 text-[#0a1a3a]">{m.title}</h3>
                <p className="t-body mb-9 max-w-lg text-gray-600">{m.description}</p>

                <Link
                  to={m.cta.href}
                  className="group inline-flex min-h-[44px] items-center gap-2.5 border-b border-[#0a1a3a]/20 pb-1 font-semibold text-[#0a1a3a] transition-colors duration-300 hover:border-[#0050a9] hover:text-[#0050a9]"
                >
                  {m.cta.label}
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>

              <div className={i % 2 === 1 ? 'lg:order-1' : ''}>
                <div className="overflow-hidden rounded-2xl bg-gray-100">
                  <img
                    src={m.image}
                    alt={m.imageAlt}
                    width={1200}
                    height={800}
                    className="h-[280px] w-full object-cover transition-transform duration-[900ms] ease-out hover:scale-[1.03] lg:h-[440px]"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
