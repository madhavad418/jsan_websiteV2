import { useEffect, useRef } from 'react'
import type { CSSProperties, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import HeroRouteOverlay from './HeroRouteOverlay'

type Cta = { label: string; href: string }

export type ImageHeroProps = {
  eyebrow: ReactNode
  /** Pass HeroAccent around the final line to carry the animated gradient. */
  title: ReactNode
  description: ReactNode
  primaryCta: Cta
  secondaryCta?: Cta
  image: string
  /** The file's true pixel size, so the box is reserved before it loads. */
  imageSize: { width: number; height: number }
  /** object-position for the desktop crop. */
  focal?: string
  /** object-position for the taller phone crop. */
  focalMobile?: string
  /** Optional premium global-network treatment for the home hero only. */
  showNetworkOverlay?: boolean
  /** Colour the foot of the hero fades into. */
  fadeTo?: string
  /** Draw collection routes over the picture. For map-led imagery only. */
  routes?: boolean
}

/** Animated gradient treatment for a hero headline accent. */
export function HeroAccent({ children }: { children: ReactNode }) {
  return (
    <span
      className="jsan-hero-accent bg-clip-text text-transparent"
      style={{
        backgroundImage:
          'linear-gradient(90deg, #ffffff 0%, #c9efff 26%, #7fdcff 48%, #dff7ff 62%, #7fdcff 82%, #ffffff 100%)',
      }}
    >
      {children}
    </span>
  )
}

/**
 * Keeps each headline line independently animatable without forcing ImageHero to know
 * the page-specific wording. Use it inside the `title` prop.
 */
export function HeroTitleLine({
  children,
  delay = 0,
}: {
  children: ReactNode
  delay?: number
}) {
  return (
    <span className="block overflow-hidden">
      <span
        className="jsan-hero-reveal block"
        style={{ '--hero-delay': `${delay}ms` } as CSSProperties}
      >
        {children}
      </span>
    </span>
  )
}

function GlobalNetworkOverlay() {
  return (
    <svg
      aria-hidden="true"
      className="jsan-hero-network pointer-events-none absolute right-[2%] top-[4%] hidden h-[49%] w-[50%] lg:block"
      viewBox="0 0 900 420"
      fill="none"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <linearGradient id="jsan-route-gradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#7fdcff" stopOpacity="0.10" />
          <stop offset="45%" stopColor="#7fdcff" stopOpacity="0.78" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.18" />
        </linearGradient>
      </defs>

      {/* Europe -> North America */}
      <path
        pathLength="1"
        className="jsan-hero-route jsan-hero-route-a"
        d="M458 95C380 36 265 40 176 122"
        stroke="url(#jsan-route-gradient)"
        strokeWidth="1.4"
      />

      {/* Europe -> South / South-East Asia */}
      <path
        pathLength="1"
        className="jsan-hero-route jsan-hero-route-b"
        d="M462 99C518 118 576 145 632 184"
        stroke="url(#jsan-route-gradient)"
        strokeWidth="1.25"
      />

      {/* South Asia -> Australia */}
      <path
        pathLength="1"
        className="jsan-hero-route jsan-hero-route-c"
        d="M632 184C697 215 748 257 790 306"
        stroke="url(#jsan-route-gradient)"
        strokeWidth="1.35"
      />

      <g className="jsan-hero-pulse jsan-hero-pulse-a">
        <circle cx="462" cy="99" r="4" fill="#aeeaff" fillOpacity="0.92" />
        <circle cx="462" cy="99" r="10" stroke="#7fdcff" strokeOpacity="0.35" />
      </g>
      <g className="jsan-hero-pulse jsan-hero-pulse-b">
        <circle cx="632" cy="184" r="4" fill="#aeeaff" fillOpacity="0.92" />
        <circle cx="632" cy="184" r="10" stroke="#7fdcff" strokeOpacity="0.35" />
      </g>
      <g className="jsan-hero-pulse jsan-hero-pulse-c">
        <circle cx="790" cy="306" r="4" fill="#aeeaff" fillOpacity="0.92" />
        <circle cx="790" cy="306" r="10" stroke="#7fdcff" strokeOpacity="0.35" />
      </g>
    </svg>
  )
}

export default function ImageHero({
  eyebrow,
  title,
  description,
  primaryCta,
  secondaryCta,
  image,
  imageSize,
  focal = '68% 50%',
  focalMobile = '62% 50%',
  showNetworkOverlay = false,
  fadeTo,
  routes = false,
}: ImageHeroProps) {
  const sectionRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    document.body.dataset.hero = 'dark'

    const section = sectionRef.current
    if (!section) {
      return () => {
        delete document.body.dataset.hero
      }
    }

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)')

    let pointerFrame = 0
    let scrollFrame = 0

    const resetPointer = () => {
      section.style.setProperty('--hero-photo-x', '0px')
      section.style.setProperty('--hero-photo-y', '0px')
      section.style.setProperty('--hero-grid-x', '0px')
      section.style.setProperty('--hero-grid-y', '0px')
    }

    const onPointerMove = (event: PointerEvent) => {
      if (reducedMotion.matches || !finePointer.matches) return
      if (pointerFrame) cancelAnimationFrame(pointerFrame)

      pointerFrame = requestAnimationFrame(() => {
        const bounds = section.getBoundingClientRect()
        const x = (event.clientX - bounds.left) / bounds.width - 0.5
        const y = (event.clientY - bounds.top) / bounds.height - 0.5

        // Intentionally tiny values: enough to create depth, never enough to look game-like.
        section.style.setProperty('--hero-photo-x', `${x * 8}px`)
        section.style.setProperty('--hero-photo-y', `${y * 6}px`)
        section.style.setProperty('--hero-grid-x', `${x * -3}px`)
        section.style.setProperty('--hero-grid-y', `${y * -2}px`)
      })
    }

    const onScroll = () => {
      if (reducedMotion.matches) return
      if (scrollFrame) cancelAnimationFrame(scrollFrame)

      scrollFrame = requestAnimationFrame(() => {
        const bounds = section.getBoundingClientRect()
        const progress = Math.min(1, Math.max(0, -bounds.top / Math.max(bounds.height, 1)))
        section.style.setProperty('--hero-scroll-y', `${progress * -26}px`)
        section.style.setProperty('--hero-content-y', `${progress * -10}px`)
      })
    }

    if (finePointer.matches) {
      section.addEventListener('pointermove', onPointerMove)
      section.addEventListener('pointerleave', resetPointer)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()

    return () => {
      if (pointerFrame) cancelAnimationFrame(pointerFrame)
      if (scrollFrame) cancelAnimationFrame(scrollFrame)
      section.removeEventListener('pointermove', onPointerMove)
      section.removeEventListener('pointerleave', resetPointer)
      window.removeEventListener('scroll', onScroll)
      delete document.body.dataset.hero
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="jsan-hero relative isolate flex min-h-[calc(100svh-44px)] items-center overflow-hidden bg-[#03101f]"
      style={
        {
          marginTop: '44px',
          '--hero-focal': focal,
          '--hero-focal-mobile': focalMobile,
        } as CSSProperties
      }
      aria-labelledby="hero-heading"
    >
      {/*
        A slightly oversized shell prevents the edges from becoming visible while the
        photograph drifts and responds to the pointer.
      */}
      <div className="jsan-hero-photo-shell absolute -inset-[2.25%]">
        <img
          src={image}
          alt=""
          aria-hidden="true"
          width={imageSize.width}
          height={imageSize.height}
          loading="eager"
          decoding="async"
          {...{ fetchpriority: 'high' }}
          className="jsan-hero-photo h-full w-full object-cover object-[var(--hero-focal-mobile)] lg:object-[var(--hero-focal)]"
        />
      </div>

      {/* Mobile scrim: stronger because copy overlaps more of the photograph. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 lg:hidden"
        style={{
          background:
            'linear-gradient(180deg, rgba(3,16,31,0.90) 0%, rgba(3,16,31,0.80) 45%, rgba(3,16,31,0.92) 100%)',
        }}
      />

      {/* Desktop scrim: keeps the left editorial while preserving the map/operations image. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 hidden lg:block"
        style={{
          background:
            'linear-gradient(100deg, rgba(3,16,31,0.96) 0%, rgba(3,16,31,0.90) 31%, rgba(3,16,31,0.65) 54%, rgba(3,16,31,0.29) 78%, rgba(3,16,31,0.14) 100%)',
        }}
      />

      {/* Restrained JSAN brand wash. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 mix-blend-multiply"
        style={{
          background:
            'radial-gradient(72% 92% at 8% 40%, rgba(1,47,98,0.56) 0%, rgba(1,47,98,0) 70%), ' +
            'radial-gradient(62% 74% at 92% 85%, rgba(0,80,169,0.42) 0%, rgba(0,80,169,0) 72%)',
        }}
      />

      {/* Engineering/grid reference plane with extremely slow motion. */}
      <div
        aria-hidden="true"
        className="jsan-hero-grid absolute -inset-4 opacity-[0.065]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.85) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.85) 1px, transparent 1px)',
          backgroundSize: '52px 52px',
          maskImage: 'radial-gradient(120% 100% at 20% 50%, #000 0%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(120% 100% at 20% 50%, #000 0%, transparent 75%)',
        }}
      />

      {showNetworkOverlay && <GlobalNetworkOverlay />}

      {/* A restrained upper-right light veil helps the photographic map feel dimensional. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 hidden lg:block"
        style={{
          background:
            'radial-gradient(42% 40% at 76% 15%, rgba(188,234,255,0.11) 0%, rgba(188,234,255,0) 78%)',
        }}
      />

      {routes && <HeroRouteOverlay />}

      {fadeTo && (
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-32"
          style={{ background: `linear-gradient(180deg, transparent 0%, ${fadeTo} 100%)` }}
        />
      )}

      <div className="jsan-hero-content relative z-10 mx-auto w-full max-w-7xl px-6 py-12 sm:py-14 lg:py-16">
        <div className="max-w-[660px]">
          <span
            className="jsan-hero-reveal mb-7 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.22em] text-[#7fdcff]"
            style={{ '--hero-delay': '60ms' } as CSSProperties}
          >
            <span
              aria-hidden="true"
              className="h-px w-10 bg-gradient-to-r from-[#00d4ff] to-transparent"
            />
            {eyebrow}
          </span>

          <h1
            id="hero-heading"
            className="text-[clamp(34px,8.5vw,44px)] font-bold leading-[1.055] tracking-[-0.032em] text-white lg:text-[clamp(45px,4.35vw,64px)]"
          >
            {title}
          </h1>

          <p
            className="jsan-hero-reveal mt-8 max-w-[540px] text-base leading-[1.75] text-white/85 lg:text-[17px]"
            style={{ '--hero-delay': '720ms' } as CSSProperties}
          >
            {description}
          </p>

          <div
            className="jsan-hero-reveal mt-10 flex flex-col gap-3.5 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4"
            style={{ '--hero-delay': '940ms' } as CSSProperties}
          >
            <Link
              to={primaryCta.href}
              className="jsan-hero-cta-primary group inline-flex min-h-[54px] w-full items-center justify-center gap-3 rounded-full bg-white pl-7 pr-2.5 font-semibold text-[#0a1a3a] shadow-[0_18px_38px_-16px_rgba(0,0,0,0.85)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:w-auto"
            >
              {primaryCta.label}
              <span className="jsan-hero-cta-orb flex h-9 w-9 items-center justify-center rounded-full bg-[#0a1a3a]/10">
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </span>
            </Link>

            {secondaryCta && (
              <Link
                to={secondaryCta.href}
                className="jsan-hero-cta-secondary group inline-flex min-h-[54px] w-full items-center justify-center gap-2 rounded-full border-2 border-white/35 px-7 font-semibold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:w-auto"
              >
                {secondaryCta.label}
                <ArrowRight className="jsan-hero-secondary-arrow h-4 w-4" aria-hidden="true" />
              </Link>
            )}
          </div>
        </div>
      </div>

      {/*
        Kept local to the reusable hero so the animation does not require Tailwind config,
        GSAP, or a global stylesheet. If the project already has a design-motion file,
        these rules can be moved there unchanged.
      */}
      <style>{`
        .jsan-hero {
          --hero-photo-x: 0px;
          --hero-photo-y: 0px;
          --hero-grid-x: 0px;
          --hero-grid-y: 0px;
          --hero-scroll-y: 0px;
          --hero-content-y: 0px;
        }

        .jsan-hero-photo-shell {
          transform: translate3d(
            var(--hero-photo-x),
            calc(var(--hero-photo-y) + var(--hero-scroll-y)),
            0
          );
          will-change: transform;
          transition: transform 650ms cubic-bezier(.2,.75,.25,1);
        }

        .jsan-hero-photo {
          /* The photograph sits still. The slow ambient drift that used to run here was
             removed on request; it also fought the route overlay, which projects the
             map's coordinates assuming the image is untransformed. */
          transform-origin: 58% 50%;
        }

        .jsan-hero-grid {
          transform: translate3d(var(--hero-grid-x), var(--hero-grid-y), 0);
          animation: jsanHeroGridDrift 22s linear infinite alternate;
          will-change: transform, background-position;
          transition: transform 900ms cubic-bezier(.2,.75,.25,1);
        }

        .jsan-hero-content {
          transform: translate3d(0, var(--hero-content-y), 0);
          will-change: transform;
        }

        .jsan-hero-reveal {
          opacity: 0;
          transform: translate3d(0, 22px, 0);
          filter: blur(5px);
          animation: jsanHeroReveal 760ms cubic-bezier(.16,1,.3,1) forwards;
          animation-delay: var(--hero-delay, 0ms);
          will-change: opacity, transform, filter;
        }

        .jsan-hero-accent {
          background-size: 220% 100%;
          background-position: 8% 50%;
          animation: jsanHeroAccent 10s ease-in-out 1.8s infinite;
        }

        .jsan-hero-network {
          opacity: 0.64;
          mix-blend-mode: screen;
        }

        .jsan-hero-route {
          stroke-linecap: round;
          stroke-dasharray: 1;
          stroke-dashoffset: 1;
          opacity: 0;
          filter: drop-shadow(0 0 2px rgba(127,220,255,0.16));
        }

        .jsan-hero-route-a {
          animation: jsanHeroRoute 9s ease-in-out 1.6s infinite;
        }

        .jsan-hero-route-b {
          animation: jsanHeroRoute 9s ease-in-out 4.6s infinite;
        }

        .jsan-hero-route-c {
          animation: jsanHeroRoute 9s ease-in-out 7.6s infinite;
        }

        .jsan-hero-pulse {
          opacity: 0;
          transform-box: fill-box;
          transform-origin: center;
        }

        .jsan-hero-pulse-a {
          animation: jsanHeroPulse 9s ease-out 1.8s infinite;
        }

        .jsan-hero-pulse-b {
          animation: jsanHeroPulse 9s ease-out 4.8s infinite;
        }

        .jsan-hero-pulse-c {
          animation: jsanHeroPulse 9s ease-out 7.8s infinite;
        }

        .jsan-hero-cta-primary,
        .jsan-hero-cta-secondary,
        .jsan-hero-cta-orb,
        .jsan-hero-secondary-arrow {
          transition:
            transform 280ms cubic-bezier(.2,.75,.25,1),
            background-color 280ms ease,
            border-color 280ms ease,
            box-shadow 280ms ease;
        }

        @media (hover: hover) and (pointer: fine) {
          .jsan-hero-cta-primary:hover {
            transform: translateY(-1px);
            background: #eef8ff;
            box-shadow: 0 22px 42px -18px rgba(0,0,0,0.92);
          }

          .jsan-hero-cta-primary:hover .jsan-hero-cta-orb {
            transform: translateX(4px) rotate(16deg);
          }

          .jsan-hero-cta-secondary:hover {
            transform: translateY(-1px);
            border-color: rgba(255,255,255,0.78);
            background: rgba(255,255,255,0.09);
          }

          .jsan-hero-cta-secondary:hover .jsan-hero-secondary-arrow {
            transform: translateX(4px);
          }
        }

        @keyframes jsanHeroGridDrift {
          0% { background-position: 0 0, 0 0; }
          100% { background-position: 0 9px, 9px 0; }
        }

        @keyframes jsanHeroReveal {
          0% {
            opacity: 0;
            transform: translate3d(0, 22px, 0);
            filter: blur(5px);
          }
          100% {
            opacity: 1;
            transform: translate3d(0, 0, 0);
            filter: blur(0);
          }
        }

        @keyframes jsanHeroAccent {
          0%, 68%, 100% { background-position: 8% 50%; }
          82% { background-position: 92% 50%; }
        }

        @keyframes jsanHeroRoute {
          0%, 8% {
            stroke-dashoffset: 1;
            opacity: 0;
          }
          14% { opacity: 0.72; }
          38% {
            stroke-dashoffset: 0;
            opacity: 0.72;
          }
          52% {
            stroke-dashoffset: 0;
            opacity: 0;
          }
          100% {
            stroke-dashoffset: 0;
            opacity: 0;
          }
        }

        @keyframes jsanHeroPulse {
          0%, 9% {
            opacity: 0;
            transform: scale(0.72);
          }
          14% { opacity: 0.84; }
          30% {
            opacity: 0;
            transform: scale(1.65);
          }
          100% {
            opacity: 0;
            transform: scale(1.65);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .jsan-hero-photo-shell,
          .jsan-hero-photo,
          .jsan-hero-grid,
          .jsan-hero-content,
          .jsan-hero-reveal,
          .jsan-hero-accent,
          .jsan-hero-route,
          .jsan-hero-pulse,
          .jsan-hero-cta-primary,
          .jsan-hero-cta-secondary,
          .jsan-hero-cta-orb,
          .jsan-hero-secondary-arrow {
            animation: none !important;
            transition: none !important;
          }

          .jsan-hero-reveal {
            opacity: 1;
            transform: none;
            filter: none;
          }

          .jsan-hero-photo-shell,
          .jsan-hero-photo,
          .jsan-hero-grid,
          .jsan-hero-content {
            transform: none !important;
          }

          .jsan-hero-route,
          .jsan-hero-pulse {
            opacity: 0 !important;
          }
        }
      `}</style>
    </section>
  )
}
