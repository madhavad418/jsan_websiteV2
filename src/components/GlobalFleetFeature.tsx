import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  Truck,
  Route,
  MapPinned,
  Users,
  Database,
  AlertTriangle,
  type LucideIcon,
} from 'lucide-react'

/**
 * GLOBAL FLEET & FIELD OPERATIONS
 *
 * Put the map image at:
 *   public/images/operational-regions-map.png
 *
 * The figures below are REPRESENTATIVE DEMO DATA.
 * Replace them with approved/live metrics when available.
 */

const operationalRegionsMap = '/pillars/route_optimization.webp'

type OperationalCard = {
  icon: LucideIcon
  label: string
  value: string
  detail: string
}

type AnimatedVehicleData = {
  id: string
  label: string
  region: string
  status: string
  programme: string
  progress: string
  path: string
  duration: number
  delay: number
  staticX: number
  staticY: number
}

type HubPulseData = {
  id: string
  label: string
  x: number
  y: number
  delay: number
}

type ActivityPointData = {
  x: number
  y: number
  delay: number
}

const operationalCards: OperationalCard[] = [
  {
    icon: Truck,
    label: 'Vehicles Active',
    value: '128',
    detail: 'across 6 active programmes',
  },
  {
    icon: Route,
    label: 'Routes Planned',
    value: '1,940',
    detail: 'scheduled this week',
  },
  {
    icon: MapPinned,
    label: 'Coverage Completed',
    value: '87%',
    detail: 'of the current cycle',
  },
  {
    icon: Users,
    label: 'Crew Status',
    value: '96%',
    detail: 'on shift and reporting',
  },
  {
    icon: Database,
    label: 'Data Captured',
    value: '24 PB',
    detail: 'imagery and LiDAR, 30 days',
  },
  {
    icon: AlertTriangle,
    label: 'Operational Exceptions',
    value: '7',
    detail: 'open, all triaged',
  },
]

/**
 * SVG coordinate system: 1365 × 1099
 *
 * Vehicles deliberately move only within their operational region.
 * They do not visually travel across oceans.
 */
const animatedVehicles: AnimatedVehicleData[] = [
  {
    id: 'americas-us-01',
    label: 'Collection Vehicle A-14',
    region: 'Americas',
    status: 'Vehicle active',
    programme: 'Road imagery collection',
    progress: '68%',
    path: 'M78 550 C116 505 173 487 245 545',
    duration: 12,
    delay: 0,
    staticX: 165,
    staticY: 515,
  },
  {
    id: 'americas-latam-02',
    label: 'Collection Vehicle A-27',
    region: 'Americas',
    status: 'Vehicle active',
    programme: 'Field verification',
    progress: '44%',
    path: 'M298 874 C321 817 307 748 273 684',
    duration: 14,
    delay: 3.2,
    staticX: 285,
    staticY: 770,
  },
  {
    id: 'emea-europe-01',
    label: 'Collection Vehicle E-08',
    region: 'EMEA',
    status: 'Vehicle active',
    programme: 'Mobile mapping',
    progress: '81%',
    path: 'M575 560 C606 520 642 500 670 531',
    duration: 11,
    delay: 1.5,
    staticX: 620,
    staticY: 530,
  },
  {
    id: 'emea-africa-02',
    label: 'Collection Vehicle E-19',
    region: 'EMEA',
    status: 'Vehicle active',
    programme: 'Asset verification',
    progress: '57%',
    path: 'M748 740 C719 703 695 649 670 620',
    duration: 13,
    delay: 5,
    staticX: 705,
    staticY: 680,
  },
  {
    id: 'apac-asia-01',
    label: 'Collection Vehicle P-22',
    region: 'APAC',
    status: 'Vehicle active',
    programme: 'Street-data collection',
    progress: '73%',
    path: 'M1008 606 C1041 574 1067 589 1080 629',
    duration: 12.5,
    delay: 2.4,
    staticX: 1042,
    staticY: 603,
  },
  {
    id: 'apac-au-02',
    label: 'Collection Vehicle P-31',
    region: 'APAC',
    status: 'Vehicle active',
    programme: 'Road-network survey',
    progress: '36%',
    path: 'M1248 882 C1222 850 1195 833 1178 822',
    duration: 14.5,
    delay: 6.5,
    staticX: 1210,
    staticY: 850,
  },
]

const hubPulses: HubPulseData[] = [
  {
    id: 'americas',
    label: 'Americas Operations Hub',
    x: 245,
    y: 545,
    delay: 0,
  },
  {
    id: 'emea',
    label: 'EMEA Operations Hub',
    x: 670,
    y: 531,
    delay: 1.2,
  },
  {
    id: 'apac',
    label: 'APAC Operations Hub',
    x: 1080,
    y: 629,
    delay: 2.4,
  },
]

const activityPoints: ActivityPointData[] = [
  { x: 155, y: 487, delay: 0.4 },
  { x: 286, y: 768, delay: 1.5 },
  { x: 322, y: 862, delay: 2.7 },

  { x: 619, y: 559, delay: 0.8 },
  { x: 702, y: 699, delay: 2 },
  { x: 748, y: 739, delay: 3.2 },

  { x: 1008, y: 607, delay: 1.1 },
  { x: 1178, y: 822, delay: 2.6 },
  { x: 1218, y: 884, delay: 3.8 },
]

function usePrefersReducedMotion(): boolean {
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return undefined

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')

    const updatePreference = () => {
      setReducedMotion(mediaQuery.matches)
    }

    updatePreference()

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', updatePreference)
      return () => mediaQuery.removeEventListener('change', updatePreference)
    }

    // Safari fallback.
    mediaQuery.addListener(updatePreference)
    return () => mediaQuery.removeListener(updatePreference)
  }, [])

  return reducedMotion
}

function VehicleIcon() {
  return (
    <>
      <circle
        r="17"
        fill="#0050a9"
        fillOpacity="0.52"
        stroke="#5fe6ff"
        strokeWidth="1"
        strokeOpacity="0.75"
      />

      <circle
        r="11"
        fill="#06366c"
        stroke="#bff8ff"
        strokeWidth="1"
      />

      <g transform="translate(-7 -6)">
        <rect
          x="2"
          y="4"
          width="12"
          height="7"
          rx="2"
          fill="#ffffff"
        />

        <path
          d="M4 4 L6 1.5 H10.5 L13 4 Z"
          fill="#ffffff"
        />

        <path
          d="M6.3 2.5h4.1L12.3 4H5.2Z"
          fill="#8eefff"
        />

        <circle cx="4.5" cy="11" r="1.5" fill="#04152e" />
        <circle cx="11.5" cy="11" r="1.5" fill="#04152e" />
      </g>
    </>
  )
}

type AnimatedVehicleProps = {
  vehicle: AnimatedVehicleData
  reducedMotion: boolean
}

function AnimatedVehicle({
  vehicle,
  reducedMotion,
}: AnimatedVehicleProps) {
  const [showTooltip, setShowTooltip] = useState(false)

  const handleToggle = () => {
    setShowTooltip((current) => !current)
  }

  const staticTransform = reducedMotion
    ? `translate(${vehicle.staticX} ${vehicle.staticY})`
    : undefined

  return (
    <g
      transform={staticTransform}
      className="fleet-vehicle"
      role="button"
      tabIndex={0}
      aria-label={`${vehicle.label}, ${vehicle.status}, ${vehicle.region}`}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      onFocus={() => setShowTooltip(true)}
      onBlur={() => setShowTooltip(false)}
      onClick={handleToggle}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault()
          handleToggle()
        }
      }}
      style={{
        cursor: 'pointer',
        outline: 'none',
      }}
    >
      {!reducedMotion && (
        <animateMotion
          dur={`${vehicle.duration}s`}
          begin={`${vehicle.delay}s`}
          repeatCount="indefinite"
          calcMode="paced"
          path={vehicle.path}
          rotate="0"
        />
      )}

      {/*
        The van glyph is ~14px across, well under the 24x24 CSS pixels WCAG 2.2 asks of a
        pointer target. This invisible disc enlarges the hit and focus area without
        changing what the map looks like or where the marker sits.
      */}
      <circle cx="0" cy="0" r="26" fill="transparent" />

      <VehicleIcon />

      {showTooltip && (
        <g
          className="fleet-tooltip"
          pointerEvents="none"
          transform="translate(22 -68)"
        >
          <rect
            width="195"
            height="74"
            rx="11"
            fill="#04152e"
            fillOpacity="0.97"
            stroke="#5fe6ff"
            strokeOpacity="0.5"
          />

          <circle
            cx="17"
            cy="18"
            r="4"
            fill="#42e8a5"
          />

          <text
            x="29"
            y="22"
            fill="#ffffff"
            fontSize="12"
            fontWeight="700"
          >
            {vehicle.status}
          </text>

          <text
            x="17"
            y="42"
            fill="#a9c1dc"
            fontSize="10.5"
            fontWeight="600"
          >
            {vehicle.label}
          </text>

          <text
            x="17"
            y="59"
            fill="#7895b4"
            fontSize="9.5"
          >
            {vehicle.programme}
          </text>

          <text
            x="174"
            y="59"
            fill="#5fe6ff"
            fontSize="9.5"
            fontWeight="700"
            textAnchor="end"
          >
            {vehicle.progress}
          </text>
        </g>
      )}
    </g>
  )
}

type AnimatedCollectionRouteProps = {
  vehicle: AnimatedVehicleData
  reducedMotion: boolean
}

function AnimatedCollectionRoute({
  vehicle,
  reducedMotion,
}: AnimatedCollectionRouteProps) {
  return (
    <g>
      {/* Permanent faint route */}
      <path
        d={vehicle.path}
        fill="none"
        stroke="#19cdf3"
        strokeWidth="2"
        strokeOpacity="0.2"
        strokeLinecap="round"
      />

      {/* Ambient route glow */}
      <path
        d={vehicle.path}
        fill="none"
        stroke="#00d4ff"
        strokeWidth="8"
        strokeOpacity="0.05"
        strokeLinecap="round"
        filter="url(#fleetRouteGlow)"
      />

      {/* Route-completion glow */}
      <path
        d={vehicle.path}
        pathLength="100"
        fill="none"
        stroke="#69edff"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeDasharray="100"
        strokeDashoffset={reducedMotion ? 0 : 100}
        opacity={reducedMotion ? 0.65 : 1}
        filter="url(#fleetRouteGlow)"
      >
        {!reducedMotion && (
          <>
            <animate
              attributeName="stroke-dashoffset"
              values="100;0;0;100"
              keyTimes="0;0.82;0.94;1"
              dur={`${vehicle.duration}s`}
              begin={`${vehicle.delay}s`}
              repeatCount="indefinite"
            />

            <animate
              attributeName="stroke-opacity"
              values="0.12;0.95;0.95;0.08"
              keyTimes="0;0.25;0.9;1"
              dur={`${vehicle.duration}s`}
              begin={`${vehicle.delay}s`}
              repeatCount="indefinite"
            />
          </>
        )}
      </path>

      <AnimatedVehicle
        vehicle={vehicle}
        reducedMotion={reducedMotion}
      />
    </g>
  )
}

type HubPulseProps = {
  hub: HubPulseData
  reducedMotion: boolean
}

function HubPulse({
  hub,
  reducedMotion,
}: HubPulseProps) {
  return (
    <g aria-label={hub.label}>
      <circle
        cx={hub.x}
        cy={hub.y}
        r="18"
        fill="none"
        stroke="#00d4ff"
        strokeWidth="2"
        strokeOpacity={reducedMotion ? 0.28 : 0.45}
      >
        {!reducedMotion && (
          <>
            <animate
              attributeName="r"
              values="18;36;18"
              dur="4.8s"
              begin={`${hub.delay}s`}
              repeatCount="indefinite"
            />

            <animate
              attributeName="stroke-opacity"
              values="0.55;0.02;0.55"
              dur="4.8s"
              begin={`${hub.delay}s`}
              repeatCount="indefinite"
            />
          </>
        )}
      </circle>

      <circle
        cx={hub.x}
        cy={hub.y}
        r="12"
        fill="#00d4ff"
        fillOpacity="0.1"
        stroke="#00d4ff"
        strokeOpacity="0.3"
      />

      <circle
        cx={hub.x}
        cy={hub.y}
        r="5.5"
        fill="#53edff"
        stroke="#d9fbff"
        strokeWidth="1.5"
      >
        {!reducedMotion && (
          <animate
            attributeName="opacity"
            values="0.7;1;0.7"
            dur="2.8s"
            begin={`${hub.delay}s`}
            repeatCount="indefinite"
          />
        )}
      </circle>
    </g>
  )
}

type ActivityPulseProps = {
  point: ActivityPointData
  reducedMotion: boolean
}

function ActivityPulse({
  point,
  reducedMotion,
}: ActivityPulseProps) {
  return (
    <g>
      <circle
        cx={point.x}
        cy={point.y}
        r="3.4"
        fill="#8ef4ff"
        opacity={reducedMotion ? 0.7 : 1}
      />

      <circle
        cx={point.x}
        cy={point.y}
        r="5"
        fill="none"
        stroke="#00d4ff"
        strokeWidth="1.2"
        strokeOpacity="0.35"
      >
        {!reducedMotion && (
          <>
            <animate
              attributeName="r"
              values="4;13;4"
              dur="3.6s"
              begin={`${point.delay}s`}
              repeatCount="indefinite"
            />

            <animate
              attributeName="stroke-opacity"
              values="0.48;0.02;0.48"
              dur="3.6s"
              begin={`${point.delay}s`}
              repeatCount="indefinite"
            />
          </>
        )}
      </circle>
    </g>
  )
}

function OperationalRegionsVisual() {
  const reducedMotion = usePrefersReducedMotion()

  const wrapperRef = useRef<HTMLDivElement | null>(null)
  const svgRef = useRef<SVGSVGElement | null>(null)

  /**
   * Pause SVG/SMIL animation when the map is off-screen.
   * This lowers CPU/GPU use on long pages.
   */
  useEffect(() => {
    if (reducedMotion || typeof window === 'undefined') return undefined

    const wrapper = wrapperRef.current
    const svg = svgRef.current

    if (!wrapper || !svg || !('IntersectionObserver' in window)) {
      return undefined
    }

    const svgAnimationControls = svg as SVGSVGElement & {
      pauseAnimations?: () => void
      unpauseAnimations?: () => void
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        try {
          if (entry.isIntersecting) {
            svgAnimationControls.unpauseAnimations?.()
          } else {
            svgAnimationControls.pauseAnimations?.()
          }
        } catch {
          // Some browsers do not expose SMIL pause APIs.
        }
      },
      {
        threshold: 0.08,
      }
    )

    observer.observe(wrapper)

    return () => observer.disconnect()
  }, [reducedMotion])

  return (
    <div
      ref={wrapperRef}
      className="relative overflow-hidden rounded-2xl border border-[#0d3565]/20"
      style={{
        background:
          'linear-gradient(135deg, #031027 0%, #061b3b 58%, #07386f 100%)',
      }}
    >
      {/* Header */}
      <div className="relative z-20 px-7 pb-3 pt-7 lg:px-8 lg:pt-8">
        <div className="flex items-start justify-between gap-5">
          <div className="min-w-0">
            <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#00d4ff]">
              Operational Regions
            </div>

            <p className="mt-2 max-w-md text-sm leading-relaxed text-white/60">
              Active vehicles, regional hubs and collection routes across three
              delivery regions.
            </p>
          </div>

          <div className="hidden shrink-0 items-center gap-2 rounded-full border border-cyan-300/15 bg-cyan-300/[0.06] px-3 py-2 sm:flex">
            <span className="relative flex h-2 w-2">
              {!reducedMotion && (
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#5fe6ff] opacity-40" />
              )}

              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#5fe6ff]" />
            </span>

            <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#aeeeff]/70">
              Operations View
            </span>
          </div>
        </div>
      </div>

      {/* Map */}
      <div className="relative aspect-[1365/1099] w-full overflow-hidden">
        {/* Exact background image */}
        <img
          src={operationalRegionsMap}
          alt=""
          aria-hidden="true"
          draggable={false}
          className="pointer-events-none absolute inset-0 h-full w-full select-none object-contain object-center"
        />

        {/* Subtle premium darkening */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(3,16,39,0.01) 0%, rgba(3,16,39,0.07) 75%, rgba(3,16,39,0.13) 100%)',
          }}
        />

        {/* Ambient map glow */}
        <div
          className="pointer-events-none absolute inset-[18%]"
          style={{
            background:
              'radial-gradient(circle, rgba(0,212,255,.07), transparent 70%)',
          }}
        />

        {/* Animation overlay */}
        <svg
          ref={svgRef}
          viewBox="0 0 1365 1099"
          preserveAspectRatio="xMidYMid meet"
          className="absolute inset-0 h-full w-full"
          role="img"
          aria-label="Global operations map with animated regional collection vehicles"
        >
          <defs>
            <filter
              id="fleetRouteGlow"
              x="-50%"
              y="-50%"
              width="200%"
              height="200%"
            >
              <feGaussianBlur
                stdDeviation="3"
                result="blur"
              />

              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <filter
              id="fleetVehicleGlow"
              x="-100%"
              y="-100%"
              width="300%"
              height="300%"
            >
              <feGaussianBlur
                stdDeviation="4"
                result="vehicleBlur"
              />

              <feMerge>
                <feMergeNode in="vehicleBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <radialGradient id="fleetCoverage">
              <stop
                offset="0%"
                stopColor="#00d4ff"
                stopOpacity="0.13"
              />

              <stop
                offset="70%"
                stopColor="#00d4ff"
                stopOpacity="0.04"
              />

              <stop
                offset="100%"
                stopColor="#00d4ff"
                stopOpacity="0"
              />
            </radialGradient>
          </defs>

          {/* Regional activity areas */}
          <ellipse
            cx="238"
            cy="590"
            rx="205"
            ry="175"
            fill="url(#fleetCoverage)"
          />

          <ellipse
            cx="675"
            cy="625"
            rx="190"
            ry="190"
            fill="url(#fleetCoverage)"
          />

          <ellipse
            cx="1083"
            cy="680"
            rx="220"
            ry="190"
            fill="url(#fleetCoverage)"
          />

          {/* Smooth moving vehicles + route completion */}
          {animatedVehicles.map((vehicle) => (
            <AnimatedCollectionRoute
              key={vehicle.id}
              vehicle={vehicle}
              reducedMotion={reducedMotion}
            />
          ))}

          {/* Regional hub pulses */}
          {hubPulses.map((hub) => (
            <HubPulse
              key={hub.id}
              hub={hub}
              reducedMotion={reducedMotion}
            />
          ))}

          {/* Collection activity points */}
          {activityPoints.map((point, index) => (
            <ActivityPulse
              key={`${point.x}-${point.y}-${index}`}
              point={point}
              reducedMotion={reducedMotion}
            />
          ))}
        </svg>

        {reducedMotion && (
          <div className="absolute bottom-4 right-4 rounded-full border border-white/10 bg-[#03152f]/80 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.14em] text-white/45 backdrop-blur">
            Static operations view
          </div>
        )}
      </div>
    </div>
  )
}

export default function GlobalFleetFeature() {
  return (
    <section className="section-y bg-white">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section intro */}
        <div className="mb-14 max-w-3xl lg:mb-16">
          <span className="mb-4 inline-block t-label text-gray-500">
            Global Field Operations
          </span>

          <h2 className="mb-5 text-[28px] font-bold leading-[1.12] tracking-tight text-[#0a1a3a] lg:text-[42px]">
            The vehicles, crews and daily discipline behind every kilometre of
            data collected.
          </h2>

          <p className="text-lg leading-relaxed text-gray-600">
            JSAN establishes and operates collection fleets country by country
             from vehicles, sensor rigs and local crews to drive planning,
            dispatch, tracking, maintenance, safety and operational reporting.
          </p>
        </div>

        {/* Map + operational metrics */}
        <div className="grid items-start gap-8 lg:grid-cols-2 lg:gap-12">
          <OperationalRegionsVisual />

          <div>
            {/* Six operating figures. They were six bordered cards with a blue icon
                tile each; as plain numbers on hairlines they read faster and stop the
                column competing with the map beside it. */}
            <div className="grid gap-x-10 gap-y-9 sm:grid-cols-2">
              {operationalCards.map((card) => {
                const Icon = card.icon

                return (
                  <div key={card.label} className="border-t border-gray-200 pt-5">
                    <Icon className="mb-4 h-5 w-5 text-[#0050a9]" aria-hidden="true" />

                    <div className="text-[34px] font-bold leading-none tracking-[-0.03em] text-[#0a1a3a]">
                      {card.value}
                    </div>

                    <div className="mt-3 t-label text-gray-500">{card.label}</div>

                    <div className="mt-2 text-sm leading-relaxed text-gray-500">
                      {card.detail}
                    </div>
                  </div>
                )
              })}
            </div>

            <Link
              to="/services/global-fleet-collection-operations"
              className="group mt-12 inline-flex min-h-[52px] items-center gap-2.5 rounded-full px-8 font-semibold text-white transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0050a9] focus-visible:ring-offset-2"
              style={{
                background: '#0050a9',
              }}
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
