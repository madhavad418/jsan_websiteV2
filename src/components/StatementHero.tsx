import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import HeroBackdrop, { heroCopyColumn } from './HeroBackdrop'

/**
 * The house hero: statement type on the left, a cut-out image floating off a deep
 * navy panel on the right, and a capability strip along the foot.
 *
 * The image is expected to be a transparent PNG  it is deliberately sized larger
 * than the panel so it breaks out past the edges rather than sitting inside it.
 *
 * Used by the home page and the capabilities/services landing page. Content is
 * passed in; nothing page-specific belongs in here.
 */

type Cta = { label: string; href: string }

export type StatementHeroProps = {
  /** Small uppercase line above the headline. */
  eyebrow: ReactNode
  title: ReactNode
  /** Supporting paragraph. Pass JSX to emphasise part of it. */
  description: ReactNode
  primaryCta: Cta
  secondaryCta?: Cta
  /** Keyword strip along the foot, separated by brand bullets. */
  strip?: string[]
  image: string
  imageAlt: string
  /**
   * How the image meets the panel.
   *  cutout    transparent PNG, sized past the panel so it breaks out (home)
   *  filled    ordinary photograph, cropped to fill the panel itself
   *  backdrop  no panel at all: the photograph is the hero background and the copy
   *            sits on it in white. For wide banner artwork that a 4:5 panel would
   *            crop to nothing. See the backdrop branch below.
   */
  imageStyle?: 'cutout' | 'filled' | 'backdrop'
  /** backdrop only: which half the copy sits on, so the other half of the photo stays clear. */
  copySide?: 'left' | 'right'
  /** Focal point for a filled photograph, e.g. "60% center". */
  imagePosition?: string
  /**
   * How far a cut-out spills past the panel. Portrait artwork breaks out on its
   * own at "default"; squarer artwork needs "large" to spill the same amount.
   */
  cutoutSize?: 'default' | 'large'
  /**
   * Hold the hero to roughly three quarters of the viewport on desktop and centre the
   * content in it. Premium without eating the whole first screen  the section below
   * stays visible at the fold, which a full 100vh hero never allows.
   */
  viewportHeight?: boolean
}

export default function StatementHero({
  eyebrow,
  title,
  description,
  primaryCta,
  secondaryCta,
  strip = [],
  image,
  imageAlt,
  imageStyle = 'cutout',
  imagePosition = 'center center',
  cutoutSize = 'default',
  viewportHeight = false,
  copySide = 'left',
}: StatementHeroProps) {
  if (imageStyle === 'backdrop') {
    return (
      <BackdropHero
        eyebrow={eyebrow}
        title={title}
        description={description}
        primaryCta={primaryCta}
        secondaryCta={secondaryCta}
        strip={strip}
        image={image}
        imageAlt={imageAlt}
        imagePosition={imagePosition}
        copySide={copySide}
      />
    )
  }

  const isCutout = imageStyle === 'cutout'
  const cutoutWidth =
    cutoutSize === 'large' ? 'w-[112%] sm:w-[96%] lg:w-[112%]' : 'w-[100%] sm:w-[84%] lg:w-[96%]'
  return (
    <section
      className={`relative overflow-hidden bg-[#f7fafd] pt-24 lg:pt-28 ${
        viewportHeight ? 'lg:flex lg:min-h-[78vh] lg:max-h-[900px] lg:items-center lg:pb-8' : ''
      }`}
      style={{ marginTop: '44px' }}
    >
      {/* Soft brand wash behind the copy */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 w-[55%]"
        style={{
          background:
            'radial-gradient(55% 50% at 10% 15%, rgba(0,80,169,0.08) 0%, rgba(0,80,169,0) 100%), ' +
            'radial-gradient(45% 55% at 35% 95%, rgba(0,212,255,0.10) 0%, rgba(0,212,255,0) 100%)',
        }}
      />

      <div className="relative mx-auto w-full max-w-7xl px-5 max-[359px]:px-[18px] sm:px-6">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,1fr)] lg:gap-10">
          {/* Copy */}
          <div className="relative pb-4 pt-6 animate-[fadeIn_0.5s_ease-out_both] motion-reduce:animate-none lg:pb-12 lg:pt-0">
            <span className="block text-[11px] font-bold uppercase leading-relaxed tracking-[0.14em] text-[#0050a9]">
              {eyebrow}
            </span>

            <h1 className="mt-6 max-w-[620px] text-[clamp(38px,8.5vw,46px)] font-bold leading-[1.05] tracking-[-0.03em] text-[#0a1a3a] lg:text-[clamp(46px,4.4vw,64px)]">
              {title}
            </h1>

            <p className="mt-6 max-w-[520px] text-base leading-[1.7] text-gray-600 lg:text-[17px]">
              {description}
            </p>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
              <HeroCta cta={primaryCta} variant="primary" />
              {secondaryCta && <HeroCta cta={secondaryCta} variant="secondary" />}
            </div>

            {strip.length > 0 && (
              <ul className="mt-10 flex flex-wrap items-center gap-x-2.5 gap-y-2 border-t border-[#0a1a3a]/10 pt-7 lg:mt-12">
                {strip.map((item, i) => (
                  <li key={item} className="flex items-center gap-3">
                    <span className="text-[13px] font-semibold text-[#0a1a3a]/70">{item}</span>
                    {i < strip.length - 1 && (
                      <span className="text-[#0050a9]" aria-hidden="true">
                        &bull;
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Image and panel */}
          <div className="relative pb-12 lg:pb-16 lg:pt-6">
            <div
              className="relative ml-auto aspect-[4/5] w-[86%] overflow-hidden rounded-[2.5rem] sm:w-[70%] lg:w-[78%]"
              style={{ background: 'linear-gradient(150deg, #0a1a3a 0%, #012f62 55%, #0050a9 100%)' }}
            >
              {isCutout ? (
                /* Faint grid, so an empty panel does not read as flat colour */
                <div
                  aria-hidden="true"
                  className="absolute inset-0 opacity-[0.18]"
                  style={{
                    backgroundImage:
                      'linear-gradient(rgba(0,212,255,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.35) 1px, transparent 1px)',
                    backgroundSize: '46px 46px',
                    maskImage: 'radial-gradient(70% 60% at 50% 40%, #000 0%, transparent 100%)',
                    WebkitMaskImage: 'radial-gradient(70% 60% at 50% 40%, #000 0%, transparent 100%)',
                  }}
                />
              ) : (
                <>
                  <img
                    src={image}
                    alt={imageAlt}
                    loading="eager"
                    decoding="async"
                    width={1200}
                    height={1500}
                    {...{ fetchpriority: 'high' }}
                    style={{ objectPosition: imagePosition }}
                    className="h-full w-full object-cover"
                  />
                  {/* Brand tint so the photograph belongs to the panel */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-0"
                    style={{
                      background:
                        'linear-gradient(150deg, rgba(10,26,58,0.55) 0%, rgba(1,47,98,0.28) 45%, rgba(0,80,169,0.42) 100%)',
                    }}
                  />
                </>
              )}
            </div>

            {isCutout && (
              <img
                src={image}
                alt={imageAlt}
                loading="eager"
                decoding="async"
                width={1122}
                height={1402}
                {...{ fetchpriority: 'high' }}
                className={`pointer-events-none absolute left-1/2 top-1/2 max-w-none -translate-x-1/2 -translate-y-1/2 object-contain drop-shadow-[0_30px_60px_rgba(1,47,98,0.35)] ${cutoutWidth}`}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

/**
 * The backdrop variant: the photograph is the whole hero rather than a panel beside it.
 *
 * Two things it has to get right that the panel layout does not:
 *  - top-[77px] is the fixed header's height. The section slides under the header, so
 *    without it the top of the photograph is hidden behind an opaque white bar.
 *  - The scrim is directional, not flat. It goes opaque under the copy and clears on the
 *    other half, so the side of the picture that carries the subject stays readable.
 *    copySide picks which half is which.
 */
function BackdropHero({
  eyebrow,
  title,
  description,
  primaryCta,
  secondaryCta,
  strip = [],
  image,
  imageAlt,
  imagePosition,
  copySide,
}: Required<Pick<StatementHeroProps, 'eyebrow' | 'title' | 'description' | 'primaryCta' | 'image' | 'imageAlt' | 'imagePosition' | 'copySide'>> &
  Pick<StatementHeroProps, 'secondaryCta' | 'strip'>) {
  return (
    <section
      className="relative flex min-h-[500px] items-center overflow-hidden bg-[#03142d] pt-24 pb-12 sm:min-h-[560px] sm:pt-28 sm:pb-16 lg:min-h-[680px] lg:pt-32 lg:pb-20"
      style={{ marginTop: '44px' }}
    >
      <HeroBackdrop image={image} imageAlt={imageAlt} copySide={copySide} position={imagePosition} />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 max-[359px]:px-[18px] sm:px-6">
        <div className={heroCopyColumn(copySide)}>
          <span className="block text-[11px] font-bold uppercase leading-relaxed tracking-[0.14em] text-[#00d4ff]">
            {eyebrow}
          </span>

          <h1 className="mt-5 max-w-[620px] text-[clamp(27px,7.4vw,44px)] font-bold leading-[1.1] tracking-[-0.03em] text-white sm:mt-6 sm:leading-[1.05] lg:text-[clamp(46px,4.4vw,64px)]">
            {title}
          </h1>

          <p className="mt-5 max-w-[540px] text-[15px] leading-[1.65] text-white/75 sm:mt-6 sm:text-base lg:text-[17px]">
            {description}
          </p>

          <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
            <HeroCta cta={primaryCta} variant="onDarkPrimary" />
            {secondaryCta && <HeroCta cta={secondaryCta} variant="onDarkSecondary" />}
          </div>

          {strip.length > 0 && (
            <ul className="mt-10 flex flex-wrap items-center gap-x-2.5 gap-y-2 border-t border-white/20 pt-7 lg:mt-12">
              {strip.map((item, i) => (
                <li key={item} className="flex items-center gap-3">
                  <span className="text-[13px] font-semibold text-white/75">{item}</span>
                  {i < strip.length - 1 && (
                    <span className="text-[#00d4ff]" aria-hidden="true">
                      &bull;
                    </span>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  )
}

function HeroCta({
  cta,
  variant,
}: {
  cta: Cta
  variant: 'primary' | 'secondary' | 'onDarkPrimary' | 'onDarkSecondary'
}) {
  const primary =
    'group inline-flex min-h-[52px] items-center justify-center gap-3 rounded-full bg-[#0050a9] pl-6 pr-2.5 font-semibold text-white transition-colors duration-200 hover:bg-[#013e82] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0050a9]'
  const secondary =
    'group inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full border-2 border-[#0050a9]/25 px-6 font-semibold text-[#0050a9] transition-colors duration-200 hover:border-[#0050a9] hover:bg-[#0050a9] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0050a9]'
  /* Same shapes, inverted for the backdrop hero's photograph */
  const onDarkPrimary =
    'group inline-flex min-h-[52px] items-center justify-center gap-3 rounded-full bg-white pl-6 pr-2.5 font-semibold text-[#0050a9] transition-colors duration-200 hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white'
  const onDarkSecondary =
    'group inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full border-2 border-white/40 px-6 font-semibold text-white transition-colors duration-200 hover:border-white hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white'

  const isPrimary = variant === 'primary' || variant === 'onDarkPrimary'

  const content =
    isPrimary ? (
      <>
        {cta.label}
        <span className={`flex h-9 w-9 items-center justify-center rounded-full transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transform-none ${variant === 'onDarkPrimary' ? 'bg-[#0050a9]/12' : 'bg-white/15'}`}>
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </span>
      </>
    ) : (
      <>
        {cta.label}
        <ArrowRight
          className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transform-none"
          aria-hidden="true"
        />
      </>
    )

  const className =
    variant === 'primary'
      ? primary
      : variant === 'secondary'
        ? secondary
        : variant === 'onDarkPrimary'
          ? onDarkPrimary
          : onDarkSecondary

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
