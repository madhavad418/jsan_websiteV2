import { useEffect } from 'react'
import type { CSSProperties, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

/**
 * The full-bleed photographic hero: one image behind the whole section, one message on
 * top of it. No split panel, no cut-out, no carousel, no rotating headlines.
 *
 * Used by the home page and the capabilities landing. Everything page-specific is passed
 * in, so the two cannot drift apart.
 *
 * ----------------------------------------------------------------------------------
 * SWAPPING A BACKGROUND IMAGE
 *
 *   1. Drop the file in /public/pillars/ (or anywhere under /public).
 *   2. Point `image` at it in the page that renders this.
 *   3. Set `imageSize` to the file's real pixel dimensions. The browser reserves the
 *      right box before the image arrives, which is what keeps layout shift at zero.
 *   4. If the subject sits somewhere unusual, adjust `focal` / `focalMobile`. They are
 *      CSS object-position values: "68% 50%" means 68% across, centred vertically. The
 *      copy sits on the left, so keeping the subject right of centre lets both breathe.
 *
 * Supply a wide, high-resolution file  2000px or more on the long edge, landscape. The
 * scrims carry the text contrast, so the photograph does not need to be dark or empty on
 * the left; it only has to survive being cropped at both phone and desktop aspect ratios.
 * ----------------------------------------------------------------------------------
 */
type Cta = { label: string; href: string }

export type ImageHeroProps = {
  eyebrow: ReactNode
  /** Pass HeroAccent around the final line to carry the gradient. */
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
  /**
   * Colour the foot of the hero fades into, so it hands over to the next section rather
   * than stopping dead. Set it to whatever that section starts with; leave it off when
   * the next section is light, where a hard edge reads better than a coloured band.
   */
  fadeTo?: string
}

/** The gradient treatment for the last line of a hero headline. */
export function HeroAccent({ children }: { children: ReactNode }) {
  return (
    <span className="bg-gradient-to-r from-white via-[#bfeaff] to-[#7fdcff] bg-clip-text text-transparent">
      {children}
    </span>
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
  fadeTo,
}: ImageHeroProps) {
  /*
   * Tell the header it is sitting on a dark hero, so it can start transparent and only
   * turn solid once the visitor scrolls past. A body attribute rather than shared state:
   * the header is nowhere near this component in the tree, and any page that renders a
   * dark hero gets the behaviour without wiring anything up.
   */
  useEffect(() => {
    document.body.dataset.hero = 'dark'
    return () => {
      delete document.body.dataset.hero
    }
  }, [])

  return (
    <section
      className="relative isolate flex min-h-[calc(100svh-44px)] items-center overflow-hidden bg-[#03101f]"
      style={
        {
          marginTop: '44px',
          // A phone crops the picture tall and a desktop crops it wide, so the focal
          // point moves between them.
          '--hero-focal': focal,
          '--hero-focal-mobile': focalMobile,
        } as CSSProperties
      }
      aria-labelledby="hero-heading"
    >
      {/* The background photograph. Decorative: the headline carries the message, so
          describing the picture as well would only repeat it to a screen reader. */}
      <img
        src={image}
        alt=""
        aria-hidden="true"
        width={imageSize.width}
        height={imageSize.height}
        loading="eager"
        decoding="async"
        {...{ fetchpriority: 'high' }}
        className="absolute inset-0 h-full w-full object-cover object-[var(--hero-focal-mobile)] motion-safe:animate-hero-drift lg:object-[var(--hero-focal)]"
      />

      {/* Two scrims, because the copy sits in a different place at each size: vertical on
          a phone where it lies over the middle of the picture, horizontal on desktop where
          it sits to the left. Either way white text clears the AA contrast threshold
          whatever photograph is dropped in behind it. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 lg:hidden"
        style={{
          background:
            'linear-gradient(180deg, rgba(3,16,31,0.88) 0%, rgba(3,16,31,0.80) 45%, rgba(3,16,31,0.90) 100%)',
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 hidden lg:block"
        style={{
          background:
            'linear-gradient(100deg, rgba(3,16,31,0.95) 0%, rgba(3,16,31,0.89) 32%, rgba(3,16,31,0.64) 55%, rgba(3,16,31,0.30) 78%, rgba(3,16,31,0.18) 100%)',
        }}
      />

      {/* Brand wash: keeps the photograph inside JSAN's palette instead of letting its own
          colour temperature set the tone of the page. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 mix-blend-multiply"
        style={{
          background:
            'radial-gradient(70% 90% at 8% 40%, rgba(1,47,98,0.55) 0%, rgba(1,47,98,0) 70%), ' +
            'radial-gradient(60% 70% at 92% 85%, rgba(0,80,169,0.45) 0%, rgba(0,80,169,0) 70%)',
        }}
      />

      {/* The house grid, at the weight it carries on the dark sections further down. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.85) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.85) 1px, transparent 1px)',
          backgroundSize: '52px 52px',
          maskImage: 'radial-gradient(120% 100% at 20% 50%, #000 0%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(120% 100% at 20% 50%, #000 0%, transparent 75%)',
        }}
      />

      {/* Hands over to the section underneath, so the two read as one move rather than
          two stacked blocks. */}
      {fadeTo && (
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-32"
          style={{ background: `linear-gradient(180deg, transparent 0%, ${fadeTo} 100%)` }}
        />
      )}

            {/*
        The section is a minimum height, so any hero whose copy is taller than that
        minimum grows past it and stops matching the others. The padding is set low
        enough that the tallest copy on the site still fits inside the minimum; the
        content is centred anyway, so this changes the height, not the look.
      */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-12 sm:py-14 lg:py-16">
        <div className="max-w-[680px] animate-[fadeIn_0.6s_ease-out_both] motion-reduce:animate-none">
          <span className="mb-7 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.22em] text-[#7fdcff]">
            <span aria-hidden="true" className="h-px w-10 bg-gradient-to-r from-[#00d4ff] to-transparent" />
            {eyebrow}
          </span>

          <h1
            id="hero-heading"
            className="text-[clamp(34px,8.5vw,44px)] font-bold leading-[1.06] tracking-[-0.03em] text-white lg:text-[clamp(46px,4.6vw,66px)]"
          >
            {title}
          </h1>

          <p className="mt-7 max-w-[540px] text-base leading-[1.75] text-white/85 lg:text-[17px]">
            {description}
          </p>

          {/* Full width on a phone, natural width from sm up. */}
          <div className="mt-10 flex flex-col gap-3.5 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
            <Link
              to={primaryCta.href}
              className="group inline-flex min-h-[54px] w-full items-center justify-center gap-3 rounded-full bg-white pl-7 pr-2.5 font-semibold text-[#0a1a3a] shadow-[0_18px_38px_-16px_rgba(0,0,0,0.85)] transition-colors duration-200 hover:bg-[#e8f4fc] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:w-auto"
            >
              {primaryCta.label}
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0a1a3a]/10 transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transform-none">
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </span>
            </Link>

            {secondaryCta && (
              <Link
                to={secondaryCta.href}
                className="group inline-flex min-h-[54px] w-full items-center justify-center gap-2 rounded-full border-2 border-white/35 px-7 font-semibold text-white transition-colors duration-200 hover:border-white/80 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:w-auto"
              >
                {secondaryCta.label}
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transform-none"
                  aria-hidden="true"
                />
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
