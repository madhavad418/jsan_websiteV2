import { useState } from 'react'
import type { LucideIcon } from 'lucide-react'
import { ArrowDown, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

/**
 * Premium service hero (v2).
 *
 * Replaces the 50/50 white-panel-plus-photo split of ServiceHero with one
 * composition: the photograph owns the right 60% of the frame and a white-to-
 * transparent wash feathers it into the copy, so there is no vertical seam.
 *
 * Layout by breakpoint:
 *   < 768px   copy first, full-width photo beneath it (never text over photo)
 *   768–1023  copy 54% / photo 48%, typography stepped down
 *   >= 1024   copy 46% / photo 60%, cinematic height
 *
 * Every image sits at a different focal point, so the crop is configurable per
 * breakpoint via CSS custom properties (see `.svc-hero__img` in index.css)
 * rather than being baked into the component.
 *
 * Content is passed in  nothing service-specific belongs in here.
 */

type Cta = { label: string; href: string }
type Metric = { value: string; label: string }

export type ServiceHeroV2Props = {
  /** Current page name, shown after the parent crumb. */
  breadcrumb: string
  /** Defaults to Services / <breadcrumb>. */
  breadcrumbParent?: { label: string; href: string }
  eyebrow?: string
  eyebrowIcon?: LucideIcon
  /** The full service name  let it wrap over 2–3 lines. */
  title: string
  /** One-line value statement, set large under the H1. */
  tagline: string
  /** Short supporting line, roughly 20–35 words. */
  description: string
  primaryCta?: Cta
  /** Rendered as a quiet text link. An href starting with "#" gets a down arrow. */
  secondaryCta?: Cta
  /** Up to three; anything beyond that is ignored. */
  metrics?: Metric[]
  heroImage: string
  heroImageAlt: string
  /** Shown if heroImage 404s  useful while final artwork is pending. */
  fallbackImage?: string
  /** CSS object-position per breakpoint, e.g. "65% center". */
  heroPositionDesktop?: string
  heroPositionTablet?: string
  heroPositionMobile?: string
  /** Mobile crop. 4/3 suits most photos; 16/10 for wide landscapes. */
  mobileAspect?: '4/3' | '16/10'
}

export default function ServiceHeroV2({
  breadcrumb,
  breadcrumbParent = { label: 'Services', href: '/services' },
  eyebrow = 'Core Service',
  eyebrowIcon: EyebrowIcon,
  title,
  tagline,
  description,
  primaryCta = { label: 'Talk to Our Team', href: '/contact' },
  secondaryCta,
  metrics = [],
  heroImage,
  heroImageAlt,
  fallbackImage,
  heroPositionDesktop = 'center center',
  heroPositionTablet = 'center center',
  heroPositionMobile = 'center center',
  mobileAspect = '4/3',
}: ServiceHeroV2Props) {
  const [usingFallback, setUsingFallback] = useState(false)
  const [imageFailed, setImageFailed] = useState(false)

  const src = usingFallback && fallbackImage ? fallbackImage : heroImage
  const handleImageError = () => {
    if (!usingFallback && fallbackImage) setUsingFallback(true)
    else setImageFailed(true)
  }

  const shownMetrics = metrics.slice(0, 3)
  const isAnchor = secondaryCta?.href.startsWith('#')

  const media = imageFailed ? (
    /* Neutral placeholder until final artwork lands */
    <div
      className="h-full w-full bg-gray-100"
      style={{
        background:
          'linear-gradient(135deg, #f3f5f8 0%, #e8edf3 50%, #dfe6ee 100%)',
      }}
      role="img"
      aria-label={heroImageAlt}
    />
  ) : (
    <img
      src={src}
      alt={heroImageAlt}
      onError={handleImageError}
      loading="eager"
      decoding="async"
      {...{ fetchpriority: 'high' }}
      className="svc-hero__img h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.015] motion-reduce:transform-none motion-reduce:transition-none"
    />
  )

  return (
    <section
      className="relative isolate overflow-hidden bg-white"
      style={
        {
          marginTop: '44px',
          '--hero-pos-desktop': heroPositionDesktop,
          '--hero-pos-tablet': heroPositionTablet,
          '--hero-pos-mobile': heroPositionMobile,
        } as React.CSSProperties
      }
    >
      <div className="relative mx-auto w-full max-w-[1600px]">
        {/* Photograph  absolute from md up, in flow below the copy on mobile */}
        <div className="group absolute inset-y-0 right-0 hidden w-[48%] overflow-hidden md:block lg:w-[60%]">
          {media}
        </div>

        {/* Tonal transition from copy into photograph. Tablet and desktop carry
            different stops because the photo starts at a different column. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 hidden md:block lg:hidden"
          style={{
            background:
              'linear-gradient(90deg, #ffffff 0%, #ffffff 42%, rgba(255,255,255,0.94) 52%, rgba(255,255,255,0.6) 62%, rgba(255,255,255,0.18) 73%, transparent 84%)',
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 hidden lg:block"
          style={{
            background:
              'linear-gradient(90deg, #ffffff 0%, #ffffff 35%, rgba(255,255,255,0.92) 45%, rgba(255,255,255,0.5) 56%, rgba(255,255,255,0.14) 66%, transparent 76%)',
          }}
        />

        {/* Copy */}
        <div className="svc-hero__rail relative z-10 flex flex-col justify-center px-5 pb-12 pt-24 max-[359px]:px-[18px] md:min-h-[clamp(650px,76vh,820px)] md:w-[54%] md:py-16 md:pr-8 lg:w-[46%] lg:py-20 lg:pr-12">
          <div className="animate-[fadeIn_0.45s_ease-out_both] motion-reduce:animate-none">
            <nav aria-label="Breadcrumb">
              <ol className="flex flex-wrap items-center gap-2 text-[13px] text-gray-500 lg:text-sm">
                <li>
                  <Link
                    to={breadcrumbParent.href}
                    className="transition-colors duration-200 hover:text-[#0050a9] focus-visible:text-[#0050a9]"
                  >
                    {breadcrumbParent.label}
                  </Link>
                </li>
                <li aria-hidden="true" className="text-gray-300">
                  /
                </li>
                <li className="font-medium text-[#0050a9]" aria-current="page">
                  {breadcrumb}
                </li>
              </ol>
            </nav>

            {eyebrow && (
              <span className="mt-8 inline-flex items-center gap-2 text-[11px] font-bold uppercase leading-none tracking-[0.16em] text-[#0050a9] lg:mt-9 lg:text-xs">
                {EyebrowIcon && <EyebrowIcon className="h-3.5 w-3.5" aria-hidden="true" />}
                {eyebrow}
              </span>
            )}

            <h1 className="mt-6 max-w-[680px] text-[clamp(38px,10vw,48px)] font-bold leading-[1.05] tracking-[-0.025em] text-[#0a1a3a] md:text-[clamp(44px,5vw,58px)] md:leading-[1.03] lg:text-[clamp(50px,4.2vw,72px)] lg:leading-[1.02]">
              {title}
            </h1>

            <p className="mt-6 max-w-[620px] text-[21px] font-medium leading-[1.3] text-[#0050a9] lg:text-[clamp(24px,2vw,32px)] lg:leading-[1.25]">
              {tagline}
            </p>

            <p className="mt-5 max-w-[560px] text-base leading-[1.6] text-gray-600 lg:text-[17px] lg:leading-[1.65]">
              {description}
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-7 sm:gap-y-4 lg:mt-8">
              <CtaButton cta={primaryCta} />
              {secondaryCta && (
                <SecondaryLink cta={secondaryCta} isAnchor={Boolean(isAnchor)} />
              )}
            </div>

            {shownMetrics.length > 0 && (
              <ul className="mt-11 grid grid-cols-3 gap-x-4 gap-y-6 max-[359px]:grid-cols-2 sm:flex sm:flex-wrap sm:gap-0 lg:mt-12">
                {shownMetrics.map((metric, i) => (
                  <li
                    key={metric.label}
                    className={
                      i === 0
                        ? 'sm:pr-7'
                        : 'sm:border-l sm:border-gray-200/90 sm:pl-7 sm:pr-7'
                    }
                  >
                    <span className="block text-[24px] font-bold leading-none tabular-nums text-[#0a1a3a] lg:text-[28px]">
                      {metric.value}
                    </span>
                    <span className="mt-2 block text-[13px] font-medium leading-snug text-gray-500">
                      {metric.label}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Mobile photograph  below the copy, never behind it */}
        <div
          className={`group w-full overflow-hidden md:hidden ${
            mobileAspect === '16/10' ? 'aspect-[16/10]' : 'aspect-[4/3]'
          }`}
        >
          {media}
        </div>
      </div>
    </section>
  )
}

function CtaButton({ cta }: { cta: Cta }) {
  const className =
    'group/cta inline-flex min-h-[50px] w-full items-center justify-center gap-2.5 whitespace-nowrap rounded-lg bg-[#0050a9] px-[26px] font-semibold text-white transition-colors duration-200 hover:bg-[#013e82] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0050a9] sm:w-auto'
  const content = (
    <>
      {cta.label}
      <ArrowRight
        className="h-4 w-4 transition-transform duration-200 group-hover/cta:translate-x-[3px] motion-reduce:transform-none"
        aria-hidden="true"
      />
    </>
  )

  return cta.href.startsWith('/') ? (
    <Link to={cta.href} className={className}>
      {content}
    </Link>
  ) : (
    <a href={cta.href} className={className}>
      {content}
    </a>
  )
}

function SecondaryLink({ cta, isAnchor }: { cta: Cta; isAnchor: boolean }) {
  const className =
    'group/sec inline-flex items-center gap-2 self-start whitespace-nowrap text-[15px] font-semibold text-[#0050a9] transition-colors duration-200 hover:text-[#013e82] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0050a9]'
  const Icon = isAnchor ? ArrowDown : ArrowRight
  const content = (
    <>
      <span className="border-b border-transparent pb-0.5 transition-colors duration-200 group-hover/sec:border-[#013e82]">
        {cta.label}
      </span>
      <Icon
        className={`h-4 w-4 transition-transform duration-200 motion-reduce:transform-none ${
          isAnchor ? 'group-hover/sec:translate-y-[3px]' : 'group-hover/sec:translate-x-[3px]'
        }`}
        aria-hidden="true"
      />
    </>
  )

  return cta.href.startsWith('/') ? (
    <Link to={cta.href} className={className}>
      {content}
    </Link>
  ) : (
    <a href={cta.href} className={className}>
      {content}
    </a>
  )
}
