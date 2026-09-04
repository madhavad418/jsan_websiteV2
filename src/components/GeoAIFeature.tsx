import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Scan, Tags, ShieldCheck, MapPin, Share2 } from 'lucide-react'

/**
 * SECTION 07  GEOAI FEATURE
 *
 * Before/after comparison of raw capture against detected and classified assets.
 * The divider is driven by a range input rather than raw pointer maths, so it works with
 * mouse, touch and keyboard (arrow keys) without any extra handling.
 */
const detections = [
  'Road signs',
  'Poles',
  'Lane features',
  'Road furniture',
  'POIs',
  'Telecom assets',
  'Infrastructure assets',
]

const process = [
  { name: 'Detect', icon: Scan },
  { name: 'Classify', icon: Tags },
  { name: 'Validate', icon: ShieldCheck },
  { name: 'Geolocate', icon: MapPin },
  { name: 'Deliver', icon: Share2 },
]

export default function GeoAIFeature() {
  const [split, setSplit] = useState(50)

  return (
    <section className="section-y bg-[#f7f8fa]">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-14 max-w-3xl lg:mb-16">
          <span className="mb-4 inline-block t-label text-gray-500">
            GeoAI &amp; Computer Vision
          </span>
          <h2 className="mb-5 text-[28px] font-bold leading-[1.12] tracking-tight text-[#0a1a3a] lg:text-[42px]">
            Machine intelligence applied to imagery, LiDAR and map data at production scale.
          </h2>
          <p className="text-lg leading-relaxed text-gray-600">
            JSAN combines computer vision, geospatial analytics and human-in-the-loop validation to transform raw
            field data into governed, decision-ready spatial intelligence.
          </p>
        </div>

        {/* Before / after */}
        <div className="relative overflow-hidden rounded-sm bg-[#05132b]">
          <div className="relative h-[300px] select-none sm:h-[420px] lg:h-[520px]">
            {/* After  detected and classified */}
            <img
              src="/pillars/after.webp"
              alt="Detected and classified assets in street imagery"
              className="absolute inset-0 h-full w-full object-cover"
              loading="lazy"
            />

            {/* Before  raw capture, revealed from the left */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ clipPath: `inset(0 ${100 - split}% 0 0)` }}
            >
              <img
                src="/pillars/before.webp"
                alt="Raw street-level imagery before processing"
                className="absolute inset-0 h-full w-full object-cover"
                loading="lazy"
              />
            </div>

            {/* Labels */}
            <span className="pointer-events-none absolute left-4 top-4 rounded-full bg-black/55 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-white backdrop-blur-sm">
              Raw capture
            </span>
            <span className="pointer-events-none absolute right-4 top-4 rounded-full bg-[#00d4ff]/20 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-[#7ce8ff] ring-1 ring-[#00d4ff]/40 backdrop-blur-sm">
              Detected &amp; classified
            </span>

            {/* Divider */}
            <div
              className="pointer-events-none absolute inset-y-0 w-0.5 bg-[#00d4ff]"
              style={{ left: `${split}%` }}
            >
              <span className="absolute top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-[#00d4ff] bg-[#05132b] shadow-lg">
                <ArrowRight className="h-3.5 w-3.5 -translate-x-[3px] rotate-180 text-[#00d4ff]" />
                <ArrowRight className="h-3.5 w-3.5 translate-x-[3px] text-[#00d4ff]" />
              </span>
            </div>

            {/* The control itself: invisible, but fully accessible */}
            <input
              type="range"
              min={0}
              max={100}
              value={split}
              onChange={(e) => setSplit(Number(e.target.value))}
              aria-label="Reveal raw capture versus detected assets"
              className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
            />
          </div>
        </div>

        {/* Detections */}
        <div className="mt-10">
          <div className="mb-5 t-label text-gray-500">Example detections</div>
          <div className="flex flex-wrap gap-2.5">
            {detections.map((d) => (
              <span
                key={d}
                className="rounded-full border border-gray-200 bg-white px-4 py-2 text-sm text-gray-700"
              >
                {d}
              </span>
            ))}
          </div>
        </div>

        {/* Process */}
        {/* A sequence, not five cards: numerals and a rule carry the order. */}
        <div className="mt-16 grid grid-cols-2 gap-x-6 gap-y-10 border-t border-gray-200 pt-10 sm:grid-cols-3 lg:grid-cols-5">
          {process.map((step, i) => (
            <div key={step.name}>
              <div className="mb-3 text-[13px] font-bold tabular-nums text-[#868e9c]">
                {String(i + 1).padStart(2, '0')}
              </div>
              <step.icon className="mb-3 h-5 w-5 text-[#0050a9]" aria-hidden="true" />
              <div className="text-[15px] font-semibold text-[#0a1a3a]">{step.name}</div>
            </div>
          ))}
        </div>

        <div className="mt-10">
          <Link
            to="/services/geoai-computer-vision"
            className="group inline-flex min-h-[52px] items-center gap-2.5 rounded-full bg-[#0050a9] px-8 font-semibold text-white transition-colors duration-300 hover:bg-[#013e82]"
          >
            Explore GeoAI
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  )
}
