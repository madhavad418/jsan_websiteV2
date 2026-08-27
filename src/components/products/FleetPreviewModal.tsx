import { useCallback, useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ArrowRight, X } from 'lucide-react'
import {
  PRODUCT_PREVIEW_EVENT,
  type PreviewMode,
  type ProductPreviewDetail,
} from '../../lib/productPreview'

/**
 * The first-visit preview for JSAN Fleet Intelligence, shown on the homepage.
 *
 * It sits here rather than on the product page because its job is to introduce a product
 * a visitor does not yet know exists. Someone already reading /products/fleet-intelligence
 * has found it, and interrupting them with a summary of the page they are on is noise.
 *
 * Two ways in, and they are not the same thing:
 *
 *   - it opens itself on every load of the homepage. That one is a task: focus moves into
 *     it, the page behind cannot scroll, and it stays until it is dismissed. Dismissing it
 *     holds for the rest of that visit.
 *   - resting a pointer on the ATLAS Ops item in the news bar opens it as a preview. That
 *     one takes no focus and locks nothing, and it leaves when the pointer does. A pointer
 *     that travels onto the panel itself keeps it open, because a preview that vanishes
 *     while you are reading it is worse than no preview.
 *
 * Mounted once at the application root rather than on a page, so the news bar behaves the
 * same everywhere it appears. Only the homepage opens it unprompted.
 *
 * The interface on the left is an illustration of the product and is labelled as one. It is
 * drawn rather than screenshotted so it stays legible at this size, and its figures are
 * sample values - real programme volumes are client information and are not published.
 *
 * It is sized to fit without a scrollbar of its own. Once the two columns stack, a full
 * desktop panel cannot fit a phone, so the small layout is a shorter thing rather than a
 * squeezed one: the clip, the headline, the four claims as bare titles, and the two ways
 * out. The tabbed detail views are a wide-screen affordance and are not offered there.
 *
 * Accessibility: it is a modal dialog and behaves like one. Focus moves into it, Tab is
 * trapped inside it, Escape and the backdrop close it, focus returns where it came from,
 * the page behind cannot scroll, and every animation stops under prefers-reduced-motion.
 */

/** How long the page gets to settle before the dialog arrives. */
const OPEN_DELAY_MS = 900

type Metric = { value: string; label: string; bar?: number }

type Series = { label: string; colour: string; d: string }

type View = {
  id: string
  tab: string
  /** Which row of the illustrated side nav is lit for this view. */
  nav: string
  context: string
  /** Overview shows the product itself. The rest are drawn, for legibility at this size. */
  video?: string
  /** Painted before the clip has any frames, so the panel never opens on black. */
  poster?: string
  mediaLabel?: string
  metrics?: Metric[]
  series?: Series[]
}

const NAV = ['Overview', 'Live Map', 'Trips', 'Coverage', 'UKM', 'Health', 'Reports']

const GREEN = '#4ade80'
const BLUE = '#38bdf8'
const AMBER = '#fbbf24'

const VIEWS: View[] = [
  {
    id: 'overview',
    tab: 'Overview',
    nav: 'Overview',
    context: 'Programme: Live',
    video: '/pillars/atlas.mp4',
    poster: '/pillars/jsan_atlasops.png',
    mediaLabel:
      'A recording of the JSAN ATLAS Ops operations view, following a vehicle along its route',
  },
  {
    id: 'live',
    tab: 'Live Operations',
    nav: 'Live Map',
    context: 'Cycle: Active',
    metrics: [
      { value: '86', label: 'Vehicles active' },
      { value: '12', label: 'Crews on shift' },
      { value: '4', label: 'Field exceptions' },
    ],
    series: [
      { label: 'Completed', colour: GREEN, d: 'M 12 44 C 80 74, 132 150, 196 172 S 300 192, 348 196' },
      { label: 'In progress', colour: BLUE, d: 'M 12 188 C 68 172, 104 116, 148 148 S 224 58, 284 44 S 330 22, 348 16' },
      { label: 'Planned', colour: AMBER, d: 'M 12 152 C 78 142, 128 100, 180 106 S 262 84, 348 74' },
    ],
  },
  {
    id: 'coverage',
    tab: 'Coverage & UKM',
    nav: 'Coverage',
    context: 'View: Progress',
    metrics: [
      { value: '72%', label: 'Network completed', bar: 72 },
      { value: '18', label: 'Areas in progress' },
      { value: 'On plan', label: 'Priority areas' },
    ],
    series: [
      { label: 'Completed', colour: GREEN, d: 'M 12 190 C 72 176, 126 138, 182 112 S 288 62, 348 34' },
      { label: 'In progress', colour: BLUE, d: 'M 12 168 C 76 160, 130 140, 186 132 S 286 112, 348 96' },
      { label: 'Planned', colour: AMBER, d: 'M 12 60 C 84 66, 140 84, 194 104 S 292 140, 348 158' },
    ],
  },
  {
    id: 'trips',
    tab: 'Trip Evidence',
    nav: 'Trips',
    context: 'Layer: Matched route',
    metrics: [
      { value: 'Matched', label: 'Route layer' },
      { value: 'Kept', label: 'Recorded trace' },
      { value: 'Replay', label: 'As it happened' },
    ],
    series: [
      { label: 'Matched route', colour: GREEN, d: 'M 12 120 C 62 60, 108 60, 152 106 S 232 176, 284 132 S 330 74, 348 68' },
      { label: 'Recorded trace', colour: BLUE, d: 'M 12 134 C 60 76, 110 76, 154 120 S 230 190, 286 146 S 332 90, 348 84' },
      { label: 'Stops', colour: AMBER, d: 'M 12 196 C 90 196, 150 196, 214 196 S 300 196, 348 196' },
    ],
  },
  {
    id: 'health',
    tab: 'Field Health',
    nav: 'Health',
    context: 'Window: Today',
    metrics: [
      { value: 'Clear', label: 'Reporting state' },
      { value: '2', label: 'Out of signal' },
      { value: '1', label: 'Needs a check' },
    ],
    series: [
      { label: 'Reporting', colour: GREEN, d: 'M 12 40 C 90 40, 140 44, 196 42 S 300 38, 348 40' },
      { label: 'Recovered', colour: BLUE, d: 'M 12 130 C 76 130, 108 44, 150 128 S 236 132, 292 130 S 332 130, 348 130' },
      { label: 'Exception', colour: AMBER, d: 'M 12 186 C 88 186, 140 186, 196 186 S 268 186, 300 118 S 336 186, 348 186' },
    ],
  },
]

const FEATURES = [
  { title: 'Live operational state', body: 'Moving, stopped and out of contact, told apart.' },
  { title: 'Coverage, not just tracking', body: 'How much of the contracted network is finished.' },
  { title: 'Unique-road measurement', body: 'Repeated passes do not inflate progress.' },
  { title: 'Field resilience', body: 'Signal and power problems surface instead of hiding.' },
]

/** Elements inside the dialog that can hold focus, in document order. */
const FOCUSABLE =
  'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])'

export default function FleetPreviewModal() {
  const [open, setOpen] = useState(false)
  const [mode, setMode] = useState<PreviewMode>('auto')
  const [active, setActive] = useState(0)
  const [animate, setAnimate] = useState(true)

  const panelRef = useRef<HTMLDivElement>(null)
  const returnFocusTo = useRef<Element | null>(null)
  /* Lets a pointer cross the gap between the news item and the panel. */
  const leaveTimer = useRef<number | null>(null)

  const { pathname } = useLocation()
  const view = VIEWS[active]

  /* The homepage opens it unprompted, once the page has had a moment to paint. */
  useEffect(() => {
    setAnimate(!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches)
    if (pathname !== '/') return

    const timer = window.setTimeout(() => {
      returnFocusTo.current = document.activeElement
      setMode('auto')
      setOpen(true)
    }, OPEN_DELAY_MS)

    return () => window.clearTimeout(timer)
  }, [pathname])

  /* Hover requests from the news bar. */
  useEffect(() => {
    const onRequest = (event: Event) => {
      const detail = (event as CustomEvent<ProductPreviewDetail>).detail
      if (!detail) return

      if (detail.open) {
        if (leaveTimer.current) window.clearTimeout(leaveTimer.current)
        setMode(detail.mode)
        setOpen(true)
        return
      }

      /* A deliberate dialog is not dismissed by a pointer wandering off a link. */
      setOpen((wasOpen) => {
        if (!wasOpen) return wasOpen
        if (leaveTimer.current) window.clearTimeout(leaveTimer.current)
        leaveTimer.current = window.setTimeout(() => setOpen(false), 160)
        return wasOpen
      })
    }

    window.addEventListener(PRODUCT_PREVIEW_EVENT, onRequest)
    return () => {
      window.removeEventListener(PRODUCT_PREVIEW_EVENT, onRequest)
      if (leaveTimer.current) window.clearTimeout(leaveTimer.current)
    }
  }, [])

  /* A route change should never leave a preview hanging over the new page. */
  useEffect(() => {
    setOpen(false)
  }, [pathname])

  const close = useCallback(() => {
    setOpen(false)
    if (leaveTimer.current) window.clearTimeout(leaveTimer.current)
    const target = returnFocusTo.current
    if (target instanceof HTMLElement) target.focus()
  }, [])

  /*
   * Escape closes either way. The rest - taking focus, trapping Tab, freezing the page
   * behind - belongs to the deliberate dialog. Doing any of it to a hover preview would
   * hijack a pointer that is only passing through.
   */
  useEffect(() => {
    if (!open) return

    const isTask = mode === 'auto'
    const previousOverflow = document.body.style.overflow
    if (isTask) document.body.style.overflow = 'hidden'

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        close()
        return
      }
      if (event.key !== 'Tab' || !isTask) return

      const panel = panelRef.current
      if (!panel) return
      const items = [...panel.querySelectorAll<HTMLElement>(FOCUSABLE)].filter(
        (el) => el.offsetParent !== null
      )
      if (!items.length) return

      const first = items[0]
      const last = items[items.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    /* Once the entry animation is under way, so focus does not fight the transform.
       The panel takes it rather than the close button, so the first thing a screen reader
       reads is the dialog's own name and the first Tab lands on the close control. */
    const focusTimer = isTask ? window.setTimeout(() => panelRef.current?.focus(), 80) : null

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      if (focusTimer) window.clearTimeout(focusTimer)
      if (isTask) document.body.style.overflow = previousOverflow
    }
  }, [open, close, mode])

  if (!open) return null

  const veil = animate ? 'jsan-preview-veil' : ''
  const panelIn = animate ? 'jsan-preview-panel' : ''
  const rise = animate ? 'jsan-preview-rise' : ''
  const trace = animate ? 'jsan-preview-trace' : ''
  const bar = animate ? 'jsan-preview-bar' : ''

  const isTask = mode === 'auto'

  return (
    <div
      /*
        The same treatment either way - a preview that arrived on hover should not look
        like a lesser thing than the one that opens itself.

        pointer-events-none is the only difference, and it is not a visual one: the veil
        is painted but not hit-tested, so the pointer can travel back to the news bar
        without the backdrop catching it and closing the very thing it is over.
      */
      className={`fixed inset-0 z-[200] flex items-center justify-center bg-[#04101f]/45 p-3 backdrop-blur-[3px] sm:p-6 ${veil} ${
        isTask ? '' : 'pointer-events-none'
      }`}
      onMouseDown={(event) => {
        if (isTask && event.target === event.currentTarget) close()
      }}
    >
      <div
        ref={panelRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby="fleet-preview-title"
        aria-describedby="fleet-preview-description"
        /* Translucent over the page rather than a solid slab, with a heavy blur behind it
           so the copy still has something even to sit on. */
        onMouseEnter={() => {
          if (leaveTimer.current) window.clearTimeout(leaveTimer.current)
        }}
        onMouseLeave={() => {
          if (!isTask) setOpen(false)
        }}
        className={`jsan-preview pointer-events-auto flex max-h-[95vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-white/15 bg-[#0a1424]/88 shadow-[0_40px_120px_-30px_rgba(0,0,0,0.9)] backdrop-blur-2xl focus:outline-none ${panelIn}`}
      >
        {/* Header */}
        <header className="flex shrink-0 items-start justify-between gap-5 border-b border-white/10 px-5 py-3.5 sm:px-6 sm:py-4">
          <div className="flex items-center gap-4">
            {/* The JSAN mark on its own, in white. Decorative: the title beside it already
                names the product, so a screen reader gains nothing by reading this too.
                Cropped out of logo-white.png so it carries no second wordmark next to a
                heading that already says JSAN. */}
            <img
              src="/jsan-mark-white.png"
              alt=""
              aria-hidden="true"
              width={104}
              height={104}
              className="hidden h-9 w-9 shrink-0 object-contain sm:block"
            />
            <span>
              <span className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.2em] text-[#5cb3ff] sm:text-[11px]">
                Industrial product &bull; Built in-house
              </span>
              <span
                id="fleet-preview-title"
                className="block text-[17px] font-bold leading-tight text-white sm:text-[19px]"
              >
                JSAN ATLAS Ops
              </span>
            </span>
          </div>

          <button
            type="button"
            onClick={close}
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors duration-200 hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5cb3ff]"
          >
            <X className="h-5 w-5" aria-hidden="true" />
            <span className="sr-only">Close the product preview</span>
          </button>
        </header>

        {/* Body */}
        <div className="jsan-preview-scroll grid min-h-0 flex-1 grid-cols-1 overflow-y-auto lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1fr)]">
          {/* The illustrated interface */}
          <div className="flex min-w-0 flex-col justify-center gap-3.5 border-b border-white/10 p-3.5 sm:p-4 lg:border-b-0 lg:border-r lg:p-5">
            <div className="overflow-hidden rounded-xl border border-white/10 bg-[#0d1a2d]/80">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 border-b border-white/10 px-4 py-2.5 text-[12px]">
                <span className="font-semibold text-white">Fleet Intelligence</span>
                <span aria-hidden="true" className="text-white/25">
                  /
                </span>
                <span className="text-white/45">{view.context}</span>
                <span className="ml-auto rounded-full border border-white/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/40">
                  Sample interface
                </span>
              </div>

              <div className="grid grid-cols-[minmax(0,1fr)] sm:grid-cols-[92px_minmax(0,1fr)]">
                {/* Side nav, illustrative: the active row follows the chosen tab. */}
                <ul aria-hidden="true" className="hidden border-r border-white/10 p-2.5 sm:block">
                  {NAV.map((item) => (
                    <li
                      key={item}
                      className={`rounded-md px-2 py-[5px] text-[11px] transition-colors duration-500 ${
                        item === view.nav
                          ? 'bg-[#123a63] font-semibold text-white'
                          : 'text-white/45'
                      }`}
                    >
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="jsan-preview-stage grid min-w-0 content-start grid-cols-1 gap-3 p-3 min-h-0 lg:min-h-[284px]">
                  {view.video ? (
                    /*
                      Fixed height so the panel does not resize as tabs are switched.

                      The clip is muted, inline and looping, which is what browsers require
                      before they will start one on their own. It is only in the tree while
                      this tab is chosen, so switching away stops it rather than leaving it
                      playing behind a chart, and nothing downloads until the dialog opens.

                      Under prefers-reduced-motion it does not start itself; it shows its
                      poster frame and offers controls, so the visitor decides.
                    */
                    <div
                      key={view.id}
                      className={`jsan-preview-media relative h-[160px] overflow-hidden rounded-lg border border-white/10 bg-[#08111e] lg:h-[260px] ${rise}`}
                    >
                      <video
                        src={view.video}
                        poster={view.poster}
                        aria-label={view.mediaLabel}
                        width={1672}
                        height={941}
                        muted
                        playsInline
                        preload="metadata"
                        autoPlay={animate}
                        loop={animate}
                        controls={!animate}
                        className="absolute inset-0 h-full w-full object-cover"
                      />
                    </div>
                  ) : (
                    <>
                  {/* Chart. Redrawn whenever the tab changes, which is the point of it. */}
                  <div className="min-w-0">
                    <svg
                      key={view.id}
                      viewBox="0 0 360 210"
                      className="h-[104px] w-full sm:h-[116px]"
                      role="img"
                      aria-label={`Illustrative ${view.tab.toLowerCase()} chart`}
                    >
                      <defs>
                        <pattern id="fleet-grid" width="45" height="42" patternUnits="userSpaceOnUse">
                          <path d="M 45 0 L 0 0 0 42" fill="none" stroke="#ffffff" strokeOpacity="0.05" strokeWidth="1" />
                        </pattern>
                      </defs>
                      <rect width="360" height="210" fill="url(#fleet-grid)" />
                      {view.series?.map((line, i) => (
                        <path
                          key={line.label}
                          d={line.d}
                          fill="none"
                          stroke={line.colour}
                          strokeWidth="2.6"
                          strokeLinecap="round"
                          pathLength={1}
                          className={trace}
                          style={animate ? { animationDelay: `${180 + i * 120}ms` } : undefined}
                        />
                      ))}
                    </svg>

                    <ul className="mt-1 flex flex-wrap gap-x-3.5 gap-y-1">
                      {view.series?.map((line) => (
                        <li key={line.label} className="flex items-center gap-2 text-[11px] text-white/55">
                          <span
                            aria-hidden="true"
                            className="h-[3px] w-4 rounded-full"
                            style={{ background: line.colour }}
                          />
                          {line.label}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Metrics */}
                  <div className="grid grid-cols-3 gap-2">
                    {view.metrics?.map((metric, i) => (
                      <div
                        key={metric.label}
                        className={`rounded-lg border border-white/10 bg-[#101f34]/80 p-2.5 ${rise}`}
                        style={animate ? { animationDelay: `${240 + i * 90}ms` } : undefined}
                      >
                        <div className="text-[16px] font-bold leading-none text-white sm:text-[17px]">
                          {metric.value}
                        </div>
                        <div className="mt-1.5 text-[10px] leading-snug text-white/45 sm:text-[11px]">
                          {metric.label}
                        </div>
                        {metric.bar !== undefined && (
                          <div className="mt-2.5 h-1 overflow-hidden rounded-full bg-white/10">
                            <div
                              className={`h-full rounded-full bg-[#38bdf8] ${bar}`}
                              style={{
                                width: `${metric.bar}%`,
                                ...(animate ? { animationDelay: '420ms' } : {}),
                              }}
                            />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* The interactive part: each tab redraws the panel above. */}
            {/* Wide screens only: at phone width these four would cost more height than
                the whole compact panel can spare, and Overview already carries the point. */}
            <div
              className="hidden grid-cols-2 gap-2 lg:grid"
              role="group"
              aria-label="Choose a view of the platform"
            >
              {VIEWS.map((option, i) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-pressed={i === active}
                  className={`inline-flex min-h-[34px] items-center justify-center whitespace-nowrap rounded-full border px-3 text-[11px] font-semibold transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5cb3ff] ${
                    i === 0 ? 'col-span-2 ' : ''
                  }${
                    i === active
                      ? 'border-[#1d6fc4] bg-[#123a63] text-white'
                      : 'border-white/12 text-white/55 hover:border-white/30 hover:text-white'
                  }`}
                >
                  {option.tab}
                </button>
              ))}
            </div>

            <p className="hidden text-[11px] leading-relaxed text-white/35 lg:block">
              Product interface. The figures in the drawn views are sample values.
            </p>
          </div>

          {/* The copy */}
          <div className="flex min-w-0 flex-col p-3.5 sm:p-4 lg:p-6">
            <span
              className={`mb-3 block text-[10.5px] font-bold uppercase tracking-[0.2em] text-[#5cb3ff] ${rise}`}
              style={animate ? { animationDelay: '120ms' } : undefined}
            >
              Product preview
            </span>

            <h2
              className={`mb-3 text-[19px] font-bold leading-[1.15] tracking-tight text-white sm:text-[21px] lg:text-[25px] ${rise}`}
              style={animate ? { animationDelay: '180ms' } : undefined}
            >
              Every kilometre driven, matched to the road it belongs to.
            </h2>

            <p
              id="fleet-preview-description"
              className={`jsan-preview-lead mb-4 text-[13px] leading-relaxed text-white/60 lg:mb-5 lg:text-[14px] ${rise}`}
              style={animate ? { animationDelay: '240ms' } : undefined}
            >
              JSAN builds and runs its own field platform. Fleet tracking reports kilometres
              travelled; this reports how much of the job is done.
            </p>

            <ul className="jsan-preview-claims mb-5 space-y-2.5 border-t border-white/10 pt-4 lg:mb-6 lg:space-y-3 lg:pt-5">
              {FEATURES.map((feature, i) => (
                <li
                  key={feature.title}
                  className={`flex gap-3.5 ${rise}`}
                  style={animate ? { animationDelay: `${300 + i * 90}ms` } : undefined}
                >
                  <span
                    aria-hidden="true"
                    className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#38bdf8]"
                  />
                  <span>
                    <span className="block text-[14px] font-bold text-white">{feature.title}</span>
                    <span className="jsan-preview-detail mt-0.5 hidden text-[12.5px] leading-relaxed text-white/50 lg:block">
                      {feature.body}
                    </span>
                  </span>
                </li>
              ))}
            </ul>

            <div
              className={`mt-auto flex flex-col gap-3 sm:flex-row ${rise}`}
              style={animate ? { animationDelay: '660ms' } : undefined}
            >
              <Link
                to="/products/fleet-intelligence"
                onClick={close}
                className="group inline-flex min-h-[44px] flex-1 items-center justify-center gap-2.5 whitespace-nowrap rounded-lg bg-[#0a63c9] px-4 text-[13.5px] font-semibold text-white transition-colors duration-300 hover:bg-[#0050a9] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5cb3ff]"
              >
                Explore product
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>

              <Link
                to="/contact"
                onClick={close}
                className="inline-flex min-h-[44px] flex-1 items-center justify-center gap-2.5 whitespace-nowrap rounded-lg border border-white/25 px-4 text-[13.5px] font-semibold text-white transition-colors duration-300 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5cb3ff]"
              >
                Talk to our team
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
