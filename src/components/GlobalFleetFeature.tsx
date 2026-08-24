import { Link } from 'react-router-dom'
import { ArrowRight, Truck, Route, MapPinned, Users, Database, AlertTriangle } from 'lucide-react'

/**
 * SECTION 06  GLOBAL FLEET FEATURE
 *
 * The figures below are REPRESENTATIVE DEMO DATA, labelled as such on the panel. They are
 * illustrative of what an operations view shows, not JSAN's live numbers. Replace with
 * live figures only once they are approved, and drop the demo badge at the same time.
 * Validated company-wide statistics belong in src/config/companyMetrics.ts instead.
 */
const operationalCards = [
  { icon: Truck, label: 'Vehicles Active', value: '128', detail: 'across 6 active programmes' },
  { icon: Route, label: 'Routes Planned', value: '1,940', detail: 'scheduled this week' },
  { icon: MapPinned, label: 'Coverage Completed', value: '87%', detail: 'of the current cycle' },
  { icon: Users, label: 'Crew Status', value: '96%', detail: 'on shift and reporting' },
  { icon: Database, label: 'Data Captured', value: '24 TB', detail: 'imagery and LiDAR, 30 days' },
  { icon: AlertTriangle, label: 'Operational Exceptions', value: '7', detail: 'open, all triaged' },
]

/* Stylised operational regions  deliberately not the office map used elsewhere on the
   page, and no second map library on the homepage. */
const regions = [
  { id: 'emea', label: 'EMEA', cx: 196, cy: 150 },
  { id: 'americas', label: 'Americas', cx: 108, cy: 186 },
  { id: 'apac', label: 'APAC', cx: 268, cy: 196 },
]

export default function GlobalFleetFeature() {
  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-14 max-w-3xl lg:mb-16">
          <span className="mb-4 inline-block text-[11px] font-bold uppercase tracking-[0.25em] text-[#00a3e0]">
            Global Field Operations
          </span>
          <h2 className="mb-5 text-[28px] font-bold leading-[1.12] tracking-tight text-[#0a1a3a] lg:text-[42px]">
            The vehicles, crews and daily discipline behind every kilometre of data collected.
          </h2>
          <p className="text-lg leading-relaxed text-gray-600">
            JSAN establishes and operates collection fleets country by country &mdash; from vehicles, sensor rigs
            and local crews to drive planning, dispatch, tracking, maintenance, safety and operational reporting.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Regions */}
          <div
            className="relative overflow-hidden rounded-2xl p-8"
            style={{ background: 'linear-gradient(135deg, #05132b 0%, #0a2350 55%, #0050a9 100%)' }}
          >
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.07]"
              style={{
                backgroundImage:
                  'linear-gradient(rgba(255,255,255,.9) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.9) 1px, transparent 1px)',
                backgroundSize: '38px 38px',
              }}
            />

            <div className="relative">
              <div className="mb-2 text-[11px] font-bold uppercase tracking-[0.22em] text-[#00d4ff]">
                Operational Regions
              </div>
              <p className="mb-6 text-sm text-white/60">Collection programmes run out of three delivery regions.</p>

              <svg viewBox="0 0 380 300" className="w-full" role="img" aria-label="Globe showing JSAN operational regions">
                <defs>
                  <radialGradient id="globeFill" cx="38%" cy="32%">
                    <stop offset="0%" stopColor="#1b497b" stopOpacity="0.55" />
                    <stop offset="100%" stopColor="#05132b" stopOpacity="0.15" />
                  </radialGradient>
                </defs>

                <circle cx="190" cy="160" r="118" fill="url(#globeFill)" stroke="#7db8e8" strokeOpacity="0.35" />

                {/* Graticule */}
                {[-80, -40, 0, 40, 80].map((offset) => (
                  <ellipse
                    key={`m${offset}`}
                    cx="190"
                    cy="160"
                    rx={Math.abs(offset) === 80 ? 22 : Math.abs(offset) === 40 ? 68 : 118}
                    ry="118"
                    fill="none"
                    stroke="#7db8e8"
                    strokeOpacity="0.16"
                  />
                ))}
                {[-72, -36, 0, 36, 72].map((lat) => {
                  const y = 160 + lat
                  const half = Math.sqrt(Math.max(0, 118 * 118 - lat * lat))
                  return (
                    <line
                      key={`p${lat}`}
                      x1={190 - half}
                      y1={y}
                      x2={190 + half}
                      y2={y}
                      stroke="#7db8e8"
                      strokeOpacity="0.16"
                    />
                  )
                })}

                {/* Links between regions */}
                <path d="M108 186 Q150 120 196 150" fill="none" stroke="#00d4ff" strokeOpacity="0.4" strokeWidth="1.5" />
                <path d="M196 150 Q240 150 268 196" fill="none" stroke="#00d4ff" strokeOpacity="0.4" strokeWidth="1.5" />

                {regions.map((region, i) => (
                  <g key={region.id}>
                    <circle cx={region.cx} cy={region.cy} r="16" fill="#00d4ff" fillOpacity="0.12">
                      <animate
                        attributeName="r"
                        values="10;24;10"
                        dur="3.6s"
                        begin={`${i * 1.1}s`}
                        repeatCount="indefinite"
                      />
                      <animate
                        attributeName="fill-opacity"
                        values="0.2;0.02;0.2"
                        dur="3.6s"
                        begin={`${i * 1.1}s`}
                        repeatCount="indefinite"
                      />
                    </circle>
                    <circle cx={region.cx} cy={region.cy} r="5" fill="#00d4ff" />
                    <text
                      x={region.cx}
                      y={region.cy - 24}
                      textAnchor="middle"
                      className="fill-white text-[11px] font-semibold"
                    >
                      {region.label}
                    </text>
                  </g>
                ))}
              </svg>
            </div>
          </div>

          {/* Operational metrics */}
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-amber-700">
              <AlertTriangle className="h-3.5 w-3.5" />
              Demo data &mdash; illustrative, not live figures
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {operationalCards.map((card) => (
                <div
                  key={card.label}
                  className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
                >
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-[#e8f4fc]">
                    <card.icon className="h-5 w-5 text-[#0050a9]" />
                  </div>
                  <div className="text-2xl font-bold leading-none text-[#0050a9]">{card.value}</div>
                  <div className="mt-1.5 text-sm font-semibold text-[#0a1a3a]">{card.label}</div>
                  <div className="mt-0.5 text-xs text-gray-500">{card.detail}</div>
                </div>
              ))}
            </div>

            <Link
              to="/services/global-fleet-collection-operations"
              className="group mt-8 inline-flex items-center gap-2.5 rounded-lg px-7 py-3.5 font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_34px_-14px_rgba(0,80,169,0.9)]"
              style={{ background: 'linear-gradient(120deg, #012f62, #0055b4)' }}
            >
              Explore Global Fleet &amp; Field Operations
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
