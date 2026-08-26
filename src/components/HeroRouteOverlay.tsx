import { useEffect, useState } from 'react'

/**
 * Collection routes running across the hero.
 *
 * Thin route geometry over the map side of the photograph, with collection vehicles
 * driving along it and the occasional survey ping. It is the work the company actually does -
 * drives being run and coverage being captured - rather than decoration.
 *
 * Kept deliberately faint: white and cyan at low opacity, slow speeds, no glow. It sits
 * on the right so it never crosses the headline, and it is hidden below md where the
 * photograph is cropped tight and there is no room for it.
 *
 * Nothing renders at all under prefers-reduced-motion - SVG animation ignores that media
 * query on its own, so it has to be checked here.
 */
type Route = {
  d: string
  /** Seconds for one traverse. Long, so nothing darts about. */
  duration: number
  delay: number
  /** Where the drive finishes, marked with a quiet dot. */
  end: [number, number]
}

const ROUTES: Route[] = [
  { d: 'M 40 300 C 150 250, 210 190, 330 150 S 500 110, 560 60', duration: 15, delay: 0, end: [560, 60] },
  { d: 'M 20 120 C 120 140, 190 210, 300 235 S 470 260, 575 220', duration: 19, delay: 3.5, end: [575, 220] },
  { d: 'M 120 380 C 210 330, 250 300, 360 300 S 500 320, 585 290', duration: 23, delay: 7, end: [585, 290] },
]

/** Where a survey ping fires, on the same geometry. */
const PINGS = [
  { cx: 330, cy: 150, delay: 1.5 },
  { cx: 300, cy: 235, delay: 6 },
]

export default function HeroRouteOverlay() {
  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    setAnimate(!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches)
  }, [])

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-y-0 right-0 hidden w-[52%] md:block"
      /*
       * The gradient on the route stroke was not enough: the moving vehicles and the
       * travelling segment are solid, so they showed up over the headline. Masking the
       * whole layer fades every part of it out before it reaches the copy.
       */
      style={{
        maskImage: 'linear-gradient(to right, transparent 0%, #000 34%, #000 100%)',
        WebkitMaskImage: 'linear-gradient(to right, transparent 0%, #000 34%, #000 100%)',
      }}
    >
      <svg
        viewBox="0 0 600 400"
        preserveAspectRatio="xMidYMid slice"
        className="h-full w-full"
        fill="none"
      >
        <defs>
          {/* The routes fade out toward the copy so nothing competes with the headline. */}
          <linearGradient id="route-fade" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
            <stop offset="35%" stopColor="#ffffff" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#7fdcff" stopOpacity="0.32" />
          </linearGradient>
        </defs>

        {ROUTES.map((route, i) => (
          <g key={route.d}>
            {/* The route itself */}
            <path d={route.d} stroke="url(#route-fade)" strokeWidth="1.1" strokeLinecap="round" />

            {/* A brighter length of it, travelling: the drive in progress */}
            {animate && (
              <path
                d={route.d}
                stroke="#7fdcff"
                strokeOpacity="0.5"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeDasharray="34 900"
              >
                <animate
                  attributeName="stroke-dashoffset"
                  from="934"
                  to="0"
                  dur={`${route.duration}s`}
                  begin={`${route.delay}s`}
                  repeatCount="indefinite"
                />
              </path>
            )}

            {/*
              The vehicle, seen from above. Drawn pointing along +x and centred on the
              origin, because animateMotion's rotate="auto" turns the glyph to follow the
              direction of travel - so it corners with the route.
            */}
            {animate && (
              <g>
                {/* Soft halo, so the car still reads against a busy photograph */}
                <circle r="4.2" fill="#7fdcff" fillOpacity="0.18" />

                {/*
                  Body, cabin and headlights only. Wheels were in here at first and just
                  read as noise: the whole vehicle is about 20px on screen.
                */}
                <g transform="translate(-5.5, -2.6)">
                  <rect width="11" height="5.2" rx="1.7" fill="#eef8ff" fillOpacity="0.96" />
                  <rect
                    x="3.1"
                    y="1.05"
                    width="4.2"
                    height="3.1"
                    rx="1"
                    fill="#0b2a4a"
                    fillOpacity="0.72"
                  />
                  <rect x="10.1" y="0.85" width="0.8" height="1.1" rx="0.4" fill="#7fdcff" />
                  <rect x="10.1" y="3.25" width="0.8" height="1.1" rx="0.4" fill="#7fdcff" />
                </g>

                <animateMotion
                  dur={`${route.duration}s`}
                  begin={`${route.delay}s`}
                  repeatCount="indefinite"
                  path={route.d}
                  rotate="auto"
                  keyPoints="0;1"
                  keyTimes="0;1"
                  calcMode="linear"
                />
              </g>
            )}

            {/* Where each route ends, a quiet marker */}
            <circle cx={route.end[0]} cy={route.end[1]} r="2" fill="#ffffff" fillOpacity={0.25 - i * 0.05} />
          </g>
        ))}

        {/* Survey pings: a ring opening once and fading, slowly. */}
        {animate &&
          PINGS.map((ping) => (
            <circle
              key={`${ping.cx}-${ping.cy}`}
              cx={ping.cx}
              cy={ping.cy}
              fill="none"
              stroke="#7fdcff"
              strokeWidth="0.9"
            >
              <animate
                attributeName="r"
                values="2;16"
                dur="4.5s"
                begin={`${ping.delay}s`}
                repeatCount="indefinite"
              />
              <animate
                attributeName="stroke-opacity"
                values="0.5;0"
                dur="4.5s"
                begin={`${ping.delay}s`}
                repeatCount="indefinite"
              />
            </circle>
          ))}
      </svg>
    </div>
  )
}
