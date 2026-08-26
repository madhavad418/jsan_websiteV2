import { useEffect, useRef, useState } from 'react'

/**
 * Collection routes running over the map in the hero photograph.
 *
 * The routes sit on the continents, not across the whole section: each one is defined in
 * the source image's own coordinates - a drive over North America, one through Europe
 * into Asia, one down Africa, one through South America - and mapped onto the screen at
 * runtime.
 *
 * That mapping has to be computed rather than guessed. The photograph is object-fit:
 * cover with a focal point, so the crop changes with every window size; a route pinned to
 * fixed viewport coordinates would drift off the landmass as soon as the window changed
 * shape. Here the same maths the browser uses for `cover` is repeated in JS, so a route
 * that starts on Brazil stays on Brazil.
 *
 * Kept deliberately faint: white and cyan at low opacity, slow speeds, no glow. Hidden
 * below md, where the photograph is cropped too tight for the map to be in frame.
 *
 * Nothing animated renders under prefers-reduced-motion - SVG animation ignores that
 * media query on its own, so it has to be checked here.
 */

/** The hero photograph's intrinsic size, needed for the cover maths. */
const IMAGE = { width: 1916, height: 821 }

type Point = [number, number]

/**
 * Routes in image space, 0-1 on each axis, measured off the artwork itself. Each is one
 * cubic curve: start, two controls, end.
 */
type Route = {
  id: string
  start: Point
  c1: Point
  c2: Point
  end: Point
  /** Seconds for one traverse. Long, so nothing darts about. */
  duration: number
  delay: number
}

const ROUTES: Route[] = [
  {
    id: 'north-america',
    // Read off the artwork: the old start was in the Pacific, just off California.
    start: [0.631, 0.219],
    c1: [0.646, 0.197],
    c2: [0.661, 0.194],
    end: [0.674, 0.206],
    duration: 13,
    delay: 0,
  },
  {
    id: 'europe-asia',
    // Earlier attempts put this end in the Bay of Biscay, then the North Sea. It runs
    // Scandinavia to western Russia now, which is land the whole way.
    start: [0.7994, 0.1444],
    c1: [0.815, 0.155],
    c2: [0.835, 0.168],
    end: [0.858, 0.185],
    duration: 15,
    delay: 2.5,
  },
  {
    id: 'africa',
    // The old end fell in the Gulf of Guinea; this runs Sahara to southern Africa.
    start: [0.7825, 0.311],
    c1: [0.7956, 0.35],
    c2: [0.8087, 0.398],
    end: [0.8125, 0.437],
    duration: 17,
    delay: 5,
  },
  {
    id: 'south-america',
    start: [0.688, 0.37],
    c1: [0.706, 0.4],
    c2: [0.702, 0.435],
    end: [0.698, 0.451],
    duration: 14,
    delay: 7.5,
  },
]

/** Survey pings, also on land. */
const PINGS: { id: string; at: Point; delay: number }[] = [
  { id: 'ping-na', at: [0.64, 0.215], delay: 1.5 },
  { id: 'ping-africa', at: [0.795, 0.375], delay: 6 },
]

/** One vehicle, seen from above, drawn pointing along +x and centred on the origin. */
function Car({ path, duration, begin }: { path: string; duration: number; begin: number }) {
  return (
    <g>
      {/* Soft halo, so the car still reads against a busy photograph */}
      <circle r="8" fill="#7fdcff" fillOpacity="0.18" />

      {/* Body, cabin and headlights only: wheels just read as noise at this size. */}
      <g transform="translate(-10.5, -5)">
        <rect width="21" height="10" rx="3.2" fill="#eef8ff" fillOpacity="0.96" />
        <rect x="6" y="2" width="8" height="6" rx="1.9" fill="#0b2a4a" fillOpacity="0.72" />
        <rect x="19.3" y="1.6" width="1.5" height="2.1" rx="0.75" fill="#7fdcff" />
        <rect x="19.3" y="6.3" width="1.5" height="2.1" rx="0.75" fill="#7fdcff" />
      </g>

      {/* rotate="auto" turns the glyph to follow the path, so it corners properly. */}
      <animateMotion
        dur={`${duration}s`}
        begin={`${begin}s`}
        repeatCount="indefinite"
        path={path}
        rotate="auto"
        keyPoints="0;1"
        keyTimes="0;1"
        calcMode="linear"
      />
    </g>
  )
}

export default function HeroRouteOverlay() {
  const ref = useRef<HTMLDivElement>(null)
  const [animate, setAnimate] = useState(false)
  const [box, setBox] = useState<{ w: number; h: number } | null>(null)

  useEffect(() => {
    setAnimate(!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches)
  }, [])

  /* Track the hero's size; the cover maths depends on it. */
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const measure = () => setBox({ w: el.clientWidth, h: el.clientHeight })
    measure()
    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', measure)
      return () => window.removeEventListener('resize', measure)
    }
    const observer = new ResizeObserver(measure)
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  /**
   * Where a point of the photograph lands on screen, repeating what object-fit: cover
   * does. The focal point matches ImageHero: 42% across below lg, 58% at lg and up.
   */
  const project = ([nx, ny]: Point): Point => {
    if (!box) return [0, 0]
    const scale = Math.max(box.w / IMAGE.width, box.h / IMAGE.height)
    const drawnW = IMAGE.width * scale
    const drawnH = IMAGE.height * scale
    const focalX = box.w >= 1024 ? 0.58 : 0.42
    const offsetX = (box.w - drawnW) * focalX
    const offsetY = (box.h - drawnH) * 0.5
    return [offsetX + nx * drawnW, offsetY + ny * drawnH]
  }

  const pathFor = (route: Route) => {
    const [sx, sy] = project(route.start)
    const [c1x, c1y] = project(route.c1)
    const [c2x, c2y] = project(route.c2)
    const [ex, ey] = project(route.end)
    return `M ${sx.toFixed(1)} ${sy.toFixed(1)} C ${c1x.toFixed(1)} ${c1y.toFixed(1)}, ${c2x.toFixed(
      1
    )} ${c2y.toFixed(1)}, ${ex.toFixed(1)} ${ey.toFixed(1)}`
  }

  return (
    <div ref={ref} aria-hidden="true" className="pointer-events-none absolute inset-0 hidden md:block">
      {box && (
        <svg
          viewBox={`0 0 ${box.w} ${box.h}`}
          width={box.w}
          height={box.h}
          className="h-full w-full"
          fill="none"
          /* A safety net: if a narrow window pushes the map toward the copy, the routes
             fade out before they reach it. */
          style={{
            maskImage: 'linear-gradient(to right, transparent 0%, #000 42%, #000 100%)',
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, #000 42%, #000 100%)',
          }}
        >
          {ROUTES.map((route) => {
            const d = pathFor(route)
            return (
              <g key={route.id}>
                {/* The road itself */}
                <path
                  d={d}
                  stroke="#bfeaff"
                  strokeOpacity="0.3"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />

                {/* A brighter length of it, travelling: the drive in progress */}
                {animate && (
                  <path
                    d={d}
                    stroke="#7fdcff"
                    strokeOpacity="0.55"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeDasharray="40 900"
                  >
                    <animate
                      attributeName="stroke-dashoffset"
                      from="940"
                      to="0"
                      dur={`${route.duration}s`}
                      begin={`${route.delay}s`}
                      repeatCount="indefinite"
                    />
                  </path>
                )}

                {animate && <Car path={d} duration={route.duration} begin={route.delay} />}

                {/* Where the drive finishes */}
                <circle
                  cx={project(route.end)[0]}
                  cy={project(route.end)[1]}
                  r="2.6"
                  fill="#ffffff"
                  fillOpacity="0.35"
                />
              </g>
            )
          })}

          {/* Survey pings: a ring opening once and fading, slowly. */}
          {animate &&
            PINGS.map((ping) => {
              const [cx, cy] = project(ping.at)
              return (
                <circle key={ping.id} cx={cx} cy={cy} fill="none" stroke="#7fdcff" strokeWidth="1.2">
                  <animate
                    attributeName="r"
                    values="3;26"
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
              )
            })}
        </svg>
      )}
    </div>
  )
}
