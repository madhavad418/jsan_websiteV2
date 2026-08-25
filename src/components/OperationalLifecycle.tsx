import { useState } from 'react'
import SectionLabel from './SectionLabel'
import { ChevronRight } from 'lucide-react'

/**
 * SECTION 04  HOW JSAN DELIVERS  the signature operational lifecycle
 *
 * Mobilise -> Collect -> Operate -> Process -> Validate -> Deliver, run as one sequence
 * rather than six disconnected service cards. Horizontal on desktop, vertical on mobile.
 * Hovering or focusing a stage swaps the preview to a real supporting image for that
 * stage; on touch, tapping does the same.
 *
 * Below lg the horizontal rail becomes a vertical sequence with each stage carrying its
 * own visual, so nothing depends on hover on a phone.
 */
const stages = [
  {
    id: 'mobilise',
    name: 'Mobilise',
    items: ['Vehicles', 'Sensors', 'Crews', 'Permits'],
    image: '/pillars/mobilise.png',
    caption: 'Vehicles, sensor rigs and crews stood up in market',
  },
  {
    id: 'collect',
    name: 'Collect',
    items: ['Imagery', 'LiDAR', 'POIs', 'Network Assets'],
    image: '/pillars/collect.png',
    caption: 'Street-level imagery, LiDAR and asset capture on route',
  },
  {
    id: 'operate',
    name: 'Operate',
    items: ['Dispatch', 'Tracking', 'Safety', 'Maintenance'],
    image: '/pillars/operate.png',
    caption: 'Live dispatch and fleet tracking in JSAN VTS',
  },
  {
    id: 'process',
    name: 'Process',
    items: ['Ingestion', 'GIS', 'Annotation', 'Feature Extraction'],
    image: '/pillars/process.png',
    caption: 'Annotation and feature extraction from captured imagery',
  },
  {
    id: 'validate',
    name: 'Validate',
    items: ['QA/QC', 'Evidence', 'Accuracy', 'Compliance'],
    image: '/pillars/validate.png',
    caption: 'Quality control queue with reviewer evidence',
  },
  {
    id: 'deliver',
    name: 'Deliver',
    items: ['GIS', 'APIs', 'Dashboards', 'Enterprise Systems'],
    image: '/pillars/deliver.png',
    caption: 'Governed delivery into dashboards and enterprise systems',
  },
]

export default function OperationalLifecycle() {
  const [active, setActive] = useState(0)
  const current = stages[active]

  return (
    <section className="section-y relative overflow-hidden bg-[#05132b]">
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(120deg, #05132b 0%, #0a2350 55%, #0050a9 100%)' }}
        />
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.8) 1px, transparent 1px)',
            backgroundSize: '46px 46px',
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="mb-16 max-w-3xl lg:mb-20">
          <SectionLabel tone="dark">How JSAN Delivers</SectionLabel>
          <h2 className="t-section mb-7 text-white">
            Mobilise. Collect. Operate. Process. Validate. Deliver.
          </h2>
          <p className="t-body measure text-white/65">
            One sequence, one accountable owner. Every programme runs through the same six
            stages, whichever part of it you engage us for.
          </p>
        </div>

        {/* Desktop: preview above, interactive rail below */}
        <div className="hidden lg:block">
          <div className="mb-12 overflow-hidden rounded-sm">
            <div className="relative h-[420px]">
              {stages.map((stage, i) => (
                <img
                  key={stage.id}
                  src={stage.image}
                  width={1600}
                  height={900}
                  alt={i === active ? stage.caption : ''}
                  aria-hidden={i !== active}
                  className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
                    i === active ? 'opacity-100' : 'opacity-0'
                  }`}
                  loading="lazy"
                />
              ))}
              <div className="absolute inset-0 bg-gradient-to-t from-[#05132b] via-[#05132b]/25 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <div className="mb-2 text-[11px] font-bold uppercase tracking-[0.25em] text-[#00d4ff]">
                  {String(active + 1).padStart(2, '0')} &middot; {current.name}
                </div>
                <p className="text-lg font-medium text-white">{current.caption}</p>
              </div>
            </div>
          </div>

          <div className="flex items-stretch">
            {stages.map((stage, i) => (
              <div key={stage.id} className="flex flex-1 items-stretch">
                <button
                  type="button"
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                  aria-current={i === active}
                  /* A rule per stage rather than six boxes: only the selected one
                     carries colour. */
                  className={`flex-1 border-t-2 px-1 py-6 text-left transition-colors duration-300 ${
                    i === active
                      ? 'border-[#00d4ff]'
                      : 'border-white/15 hover:border-white/40'
                  }`}
                >
                  <div
                    className={`mb-2 text-xs font-bold tabular-nums ${
                      i === active ? 'text-[#00d4ff]' : 'text-white/35'
                    }`}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <div
                    className={`mb-4 text-[17px] font-bold ${
                      i === active ? 'text-white' : 'text-white/60'
                    }`}
                  >
                    {stage.name}
                  </div>
                  <ul className="space-y-1">
                    {stage.items.map((item) => (
                      <li
                        key={item}
                        className={`text-[13px] leading-snug ${i === active ? 'text-white/80' : 'text-white/45'}`}
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </button>

                {i < stages.length - 1 && (
                  <div className="flex w-8 shrink-0 items-center justify-center">
                    <ChevronRight className="h-5 w-5 text-white/25" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Mobile: vertical sequence, each stage carrying its own visual */}
        <div className="space-y-5 lg:hidden">
          {stages.map((stage, i) => (
            <div key={stage.id} className="overflow-hidden rounded-sm border-t-2 border-white/15">
              <div className="relative h-44">
                <img
                  src={stage.image}
                  alt={stage.caption}
                  width={1600}
                  height={900}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#05132b] via-[#05132b]/30 to-transparent" />
              </div>
              <div className="p-5">
                <div className="mb-1 text-[10px] font-bold tracking-[0.2em] text-[#00d4ff]">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <div className="mb-3 text-sm font-bold uppercase tracking-wider text-white">{stage.name}</div>
                <div className="flex flex-wrap gap-2">
                  {stage.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] text-white/80"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
