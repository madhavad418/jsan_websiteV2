import { Link } from 'react-router-dom'
import { ArrowRight, Truck, Layers, Brain, Code } from 'lucide-react'

/**
 * SECTION 03  WHAT JSAN DOES
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
    <section className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 max-w-3xl lg:mb-20">
          <span className="mb-4 inline-block text-[11px] font-bold uppercase tracking-[0.25em] text-[#00a3e0]">
            What JSAN Does
          </span>
          <h2 className="mb-5 text-[32px] font-bold leading-[1.1] tracking-tight text-[#0a1a3a] lg:text-[46px]">
            From the field to decision-ready intelligence
          </h2>
          <p className="text-lg leading-relaxed text-gray-600 lg:text-xl">
            JSAN brings together field execution, geospatial engineering, data operations and enterprise
            technology under one delivery model.
          </p>
        </div>

        <div className="space-y-14 lg:space-y-20">
          {modules.map((m, i) => (
            <div
              key={m.num}
              className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16"
            >
              {/* Alternate sides so the page has rhythm rather than four identical rows */}
              <div className={i % 2 === 1 ? 'lg:order-2' : ''}>
                <div className="flex items-center gap-4">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#012f62] to-[#0055b4] shadow-lg">
                    <m.icon className="h-6 w-6 text-white" />
                  </span>
                  <span className="text-[42px] font-bold leading-none text-[#0050a9]/15 lg:text-[56px]">
                    {m.num}
                  </span>
                  <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#00a3e0]">
                    {m.stage}
                  </span>
                </div>

                <h3 className="mb-4 mt-6 text-[24px] font-bold leading-tight text-[#0a1a3a] lg:text-[32px]">
                  {m.title}
                </h3>
                <p className="mb-7 max-w-lg text-base leading-relaxed text-gray-600 lg:text-lg">
                  {m.description}
                </p>

                <Link
                  to={m.cta.href}
                  className="group inline-flex items-center gap-2.5 rounded-lg px-7 py-3.5 font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_34px_-14px_rgba(0,80,169,0.9)]"
                  style={{ background: 'linear-gradient(120deg, #012f62, #0055b4)' }}
                >
                  {m.cta.label}
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>

              <div className={i % 2 === 1 ? 'lg:order-1' : ''}>
                <div className="overflow-hidden rounded-2xl bg-gray-100 shadow-xl ring-1 ring-black/5">
                  <img
                    src={m.image}
                    alt={m.imageAlt}
                    className="h-[260px] w-full object-cover transition-transform duration-[900ms] ease-out hover:scale-105 lg:h-[380px]"
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
