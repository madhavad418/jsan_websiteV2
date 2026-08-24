import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

/**
 * SECTION 08  FEATURED WORK
 *
 * Anonymised until client naming permission is in place. Swap `client` in once approved.
 *
 * NO INVENTED NUMBERS. Scale and Outcome are written qualitatively on purpose  every
 * numerical claim has to be verified before it appears here. Where a figure is approved,
 * add it to the `scale` / `outcome` copy and record the source in the case study brief.
 */
type CaseStudy = {
  id: string
  number: string
  title: string
  summary: string
  tags: string[]
  image: string
  challenge: string
  role: string
  operatingModel: string
  technology: string
  scale: string
  outcome: string
}

const caseStudies: CaseStudy[] = [
  {
    id: 'multi-country-mapping',
    number: '01',
    title: 'Multi-Country Mapping Operations',
    summary:
      'Mobilising field teams, collection vehicles, route operations, data logistics and QA for large-scale street-level mapping.',
    tags: ['Field Operations', 'Fleet', 'Mapping', 'QA'],
    image: '/pillars/multi_country.png',
    challenge:
      'A mapping programme needed consistent street-level coverage across several countries, where addressing conventions, permitting and local access rules differ at every border, and where earlier collection had produced uneven quality between markets.',
    role: 'End-to-end delivery partner for mobilisation, collection, data logistics and quality assurance.',
    operatingModel:
      'Mobilise and Collect, running into Process and Validate. Vehicles, sensor rigs and local crews stood up market by market, with drive planning, dispatch and daily operational reporting against coverage targets.',
    technology:
      'Panoramic and street-level imagery capture, LiDAR runs, GIS data engineering, annotation tooling and a QA workflow with reviewer calibration.',
    scale: 'Multi-country programme run across more than one delivery region, on a recurring refresh cycle rather than one-off capture.',
    outcome:
      'Consistent capture specification and QA standard applied across every market, with coverage and productivity reported per drive and per cycle.',
  },
  {
    id: 'lidar-infrastructure',
    number: '02',
    title: 'LiDAR & Infrastructure Intelligence',
    summary:
      'Processing LiDAR and panoramic imagery into validated engineering and GIS-ready asset intelligence.',
    tags: ['LiDAR', 'Computer Vision', 'GIS', 'Infrastructure'],
    image: '/pillars/lidar_infrastructure.png',
    challenge:
      'Raw LiDAR and imagery held the asset detail engineering teams needed, but not in a form they could plan against  features were unextracted, unclassified and unreconciled with the existing asset record.',
    role: 'Data operations partner for feature extraction, classification, validation and GIS delivery.',
    operatingModel:
      'Process and Validate. Automated extraction paired with human-in-the-loop review, so accuracy rests on reviewer calibration and sampling rather than model confidence alone.',
    technology:
      'LiDAR feature extraction, computer vision and OCR, controlled-ontology annotation, spatial analytics and GIS data engineering.',
    scale: 'Production-scale processing pipeline operating continuously rather than as a fixed-term extraction project.',
    outcome:
      'Engineering-grade asset intelligence delivered into GIS with classification, positional quality and evidence attached to each feature.',
  },
  {
    id: 'telecom-network',
    number: '03',
    title: 'Telecom Network Engineering',
    summary:
      'Combining field evidence, GIS and engineering workflows to support telecom network planning and infrastructure validation.',
    tags: ['Telecom', 'GIS', 'Engineering', 'Field Operations'],
    image: '/pillars/telecom_network_engineering.png',
    challenge:
      'As-built network records had drifted from design across an active build programme, leaving planning teams working from a network view that no longer matched what was physically installed.',
    role: 'Field survey, network GIS and as-built validation partner alongside the operator’s engineering function.',
    operatingModel:
      'Operate, Map and Validate. Survey crews mobilised against live build schedules, capture reconciled to design, and exceptions raised rather than absorbed into the record.',
    technology:
      'Telecom GIS, pole and asset survey, fibre planning workflows, LiDAR where clearance mattered, and operational dashboards for planning teams.',
    scale: 'Sustained programme support spanning survey, validation and the systems planning teams work in daily.',
    outcome:
      'A network record reconciled against design, with attribute and coordinate quality checked before entering the system of record.',
  },
]

export default function FeaturedWork() {
  const [active, setActive] = useState(0)
  const study = caseStudies[active]

  const detail: { label: string; value: string }[] = [
    { label: 'Challenge', value: study.challenge },
    { label: 'JSAN Role', value: study.role },
    { label: 'Operating Model', value: study.operatingModel },
    { label: 'Technology', value: study.technology },
    { label: 'Scale', value: study.scale },
    { label: 'Outcome', value: study.outcome },
  ]

  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 max-w-3xl lg:mb-14">
          <span className="mb-4 inline-block text-[11px] font-bold uppercase tracking-[0.25em] text-[#00a3e0]">
            Featured Work
          </span>
          <h2 className="mb-5 text-[28px] font-bold leading-[1.12] tracking-tight text-[#0a1a3a] lg:text-[42px]">
            Operational capability demonstrated in the real world
          </h2>
          <p className="text-lg leading-relaxed text-gray-600">
            Programmes are shown anonymised where client naming permission is not yet in place.
          </p>
        </div>

        {/* Selector */}
        <div className="mb-8 grid gap-4 md:grid-cols-3">
          {caseStudies.map((cs, i) => (
            <button
              key={cs.id}
              type="button"
              onClick={() => setActive(i)}
              aria-current={i === active}
              className={`rounded-2xl border p-6 text-left transition-all duration-300 ${
                i === active
                  ? 'border-[#0050a9] bg-[#f0f7ff] shadow-md'
                  : 'border-gray-100 bg-white hover:-translate-y-0.5 hover:border-[#0050a9]/30 hover:shadow-sm'
              }`}
            >
              <div className="mb-2 text-[11px] font-bold tracking-[0.2em] text-[#00a3e0]">
                CASE STUDY {cs.number}
              </div>
              <div className="mb-2 text-lg font-bold leading-tight text-[#0a1a3a]">{cs.title}</div>
              <p className="text-sm leading-relaxed text-gray-600">{cs.summary}</p>
            </button>
          ))}
        </div>

        {/* Detail */}
        <div className="overflow-hidden rounded-2xl border border-gray-100 shadow-lg">
          <div className="relative h-48 lg:h-64">
            <img
              key={study.image}
              src={study.image}
              alt={study.title}
              className="h-full w-full animate-fade-in object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#05132b] via-[#05132b]/50 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-7">
              <h3 className="mb-3 text-xl font-bold text-white lg:text-2xl">{study.title}</h3>
              <div className="flex flex-wrap gap-2">
                {study.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-medium text-white backdrop-blur-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="grid gap-x-10 gap-y-7 bg-white p-7 md:grid-cols-2 lg:p-9">
            {detail.map((row) => (
              <div key={row.label}>
                <div className="mb-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#00a3e0]">
                  {row.label}
                </div>
                <p className="text-sm leading-relaxed text-gray-600">{row.value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10">
          <Link
            to="/contact"
            className="group inline-flex items-center gap-2.5 rounded-lg px-7 py-3.5 font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_34px_-14px_rgba(0,80,169,0.9)]"
            style={{ background: 'linear-gradient(120deg, #012f62, #0055b4)' }}
          >
            Discuss a Similar Program
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  )
}
