import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Check } from 'lucide-react'

/**
 * Editorial split hero: statement copy and a checklist on the left, a portrait
 * card on the right with a dark quote panel overlapping its lower-left corner
 * and a pale offset block sitting behind it.
 *
 * The overlap only works where there is room for it, so below lg the quote
 * panel drops out of the corner and sits under the photograph instead  it
 * never covers the subject's face on a phone.
 *
 * Content is passed in; nothing page-specific belongs in here.
 */

type Cta = { label: string; href: string }

export type SplitQuoteHeroProps = {
  eyebrow?: string
  title: ReactNode
  description: string
  primaryCta: Cta
  secondaryCta?: Cta
  /** Short proof points, rendered with brand check marks. Three reads best. */
  bullets?: string[]
  image: string
  imageAlt: string
  /** CSS object-position for the portrait, e.g. "50% 30%". */
  imagePosition?: string
  /** The dark card. Leave `author` unset for a company statement. */
  quote?: { text: string; author?: string; role?: string }
}

export default function SplitQuoteHero({
  eyebrow,
  title,
  description,
  primaryCta,
  secondaryCta,
  bullets = [],
  image,
  imageAlt,
  imagePosition = '50% 30%',
  quote,
}: SplitQuoteHeroProps) {
  return (
    <section className="relative overflow-hidden bg-white pt-24 lg:pt-28" style={{ marginTop: '44px' }}>
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-5 pb-16 max-[359px]:px-[18px] sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.02fr)] lg:gap-16 lg:pb-24">
        {/* Copy */}
        <div className="animate-[fadeIn_0.45s_ease-out_both] motion-reduce:animate-none">
          {eyebrow && (
            <span className="mb-5 inline-block t-label text-gray-500">
              {eyebrow}
            </span>
          )}

          <h1 className="max-w-[620px] text-[clamp(38px,9vw,46px)] font-bold leading-[1.06] tracking-[-0.025em] text-[#0a1a3a] lg:text-[clamp(48px,4vw,62px)] lg:leading-[1.04]">
            {title}
          </h1>

          <p className="mt-6 max-w-[540px] text-lg leading-[1.65] text-gray-600 lg:text-[19px]">
            {description}
          </p>

          <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-5">
            <HeroCta cta={primaryCta} variant="primary" />
            {secondaryCta && <HeroCta cta={secondaryCta} variant="secondary" />}
          </div>

          {bullets.length > 0 && (
            <ul className="mt-10 space-y-3.5">
              {bullets.map((bullet) => (
                <li key={bullet} className="flex items-start gap-3.5">
                  <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#0050a9]" strokeWidth={3} aria-hidden="true" />
                  <span className="text-[17px] leading-snug text-[#0a1a3a]">{bullet}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Portrait, offset block and quote panel */}
        <div className="relative lg:pb-10">
          {/* Pale block sitting behind and outboard of the photograph */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-10 top-10 hidden h-[70%] w-[58%] rounded-2xl bg-[#eef4fb] lg:block xl:-right-16"
          />

          <div className="relative overflow-hidden rounded-3xl bg-gray-100 shadow-[0_28px_60px_-32px_rgba(1,47,98,0.55)]">
            <img
              src={image}
              alt={imageAlt}
              loading="eager"
              decoding="async"
              {...{ fetchpriority: 'high' }}
              style={{ objectPosition: imagePosition }}
              className="aspect-[4/3] w-full object-cover sm:aspect-[16/10] lg:aspect-auto lg:h-[540px] xl:h-[580px]"
            />
          </div>

          {quote && (
            <figure className="relative z-10 mt-6 lg:absolute lg:-left-8 lg:bottom-0 lg:mt-0 lg:w-[86%] xl:-left-12">
              {/* Oversized quote mark, tucked above the panel's top-left corner */}
              <span
                aria-hidden="true"
                className="block select-none pl-1 text-[64px] font-bold leading-[0.55] text-[#0050a9] lg:pl-2 lg:text-[76px]"
              >
                &ldquo;
              </span>
              <blockquote className="rounded-2xl bg-[#0a1a3a] p-6 shadow-[0_24px_50px_-28px_rgba(10,26,58,0.9)] lg:p-7">
                <p className="text-[15px] leading-relaxed text-white/90 lg:text-base">{quote.text}</p>
                {quote.author && (
                  <figcaption className="mt-4 border-t border-white/10 pt-4 text-sm">
                    <span className="font-semibold text-white">{quote.author}</span>
                    {quote.role && <span className="block text-white/60">{quote.role}</span>}
                  </figcaption>
                )}
              </blockquote>
            </figure>
          )}
        </div>
      </div>
    </section>
  )
}

function HeroCta({ cta, variant }: { cta: Cta; variant: 'primary' | 'secondary' }) {
  const className =
    variant === 'primary'
      ? 'group/cta inline-flex min-h-[52px] w-full items-center justify-center gap-2.5 whitespace-nowrap rounded-lg bg-[#0050a9] px-8 font-semibold text-white transition-colors duration-200 hover:bg-[#013e82] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0050a9] sm:w-auto'
      : 'group/cta inline-flex min-h-[52px] w-full items-center justify-center gap-2 whitespace-nowrap rounded-lg border-2 border-[#0050a9]/20 px-8 font-semibold text-[#0050a9] transition-colors duration-200 hover:border-[#0050a9] hover:bg-[#0050a9] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0050a9] sm:w-auto'

  return cta.href.startsWith('/') ? (
    <Link to={cta.href} className={className}>
      {cta.label}
    </Link>
  ) : (
    <a href={cta.href} className={className}>
      {cta.label}
    </a>
  )
}
