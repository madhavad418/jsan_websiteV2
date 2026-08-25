import type { LucideIcon } from 'lucide-react'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import HeroStat from './HeroStat'

/**
 * The light hero used across the service pages, matching Careers, Contact and About.
 *
 * The photo bleeds off the right edge of the viewport and flares outward at the
 * bottom left. That flare is the fiddly part: an overlay can only ever bite INTO
 * the image, so the panel is widened 7rem past its visible edge and a white strip
 * masks the overhang. Because the strip's own bottom-right corner is rounded, it
 * peels away at the bottom and the photo sweeps out to the left. The strip width
 * and the radius must stay equal, or the arc stops being a clean quarter circle.
 *
 * The strip is painted flat white, so the hero background has to be flat white
 * underneath it too  the brand wash is kept inside a container that stops at 44%,
 * well clear of the panel at 48%, and fades to zero alpha on its own so there is no
 * hard cut at its edge either.
 */

type Cta = { label: string; href: string }

export type ServiceHeroProps = {
  /** Page name shown after "Services /" in the breadcrumb. */
  breadcrumb: string
  /** Small uppercase label above the headline, e.g. "Core Service". */
  eyebrow?: string
  eyebrowIcon?: LucideIcon
  title: string
  /** Second headline line, set in brand blue. */
  subtitle?: string
  description: string
  /** Rendered as chips under the copy; numeric values count up on first view. */
  stats?: { value: string; label?: string }[]
  image: string
  imageAlt: string
  primaryCta?: Cta
  secondaryCta?: Cta
}

export default function ServiceHero({
  breadcrumb,
  eyebrow = 'Core Service',
  eyebrowIcon: EyebrowIcon,
  title,
  subtitle,
  description,
  stats,
  image,
  imageAlt,
  primaryCta = { label: 'Talk to Our Team', href: '/contact' },
  secondaryCta = { label: 'All Services', href: '/services' },
}: ServiceHeroProps) {
  return (
    <section
      className="relative flex items-center overflow-hidden bg-white pt-24 lg:min-h-[700px] lg:pt-28 pb-16 lg:pb-20"
      style={{ marginTop: '44px' }}
    >
      {/* Brand wash  see the note above on why it must stay clear of the panel */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 w-[44%]"
        style={{
          background:
            'radial-gradient(50% 45% at 5% 10%, rgba(0,80,169,0.07) 0%, rgba(0,80,169,0) 100%), ' +
            'radial-gradient(45% 55% at 30% 95%, rgba(0,212,255,0.11) 0%, rgba(0,212,255,0) 100%)',
        }}
      />

      <div
        className="absolute inset-y-6 right-0 hidden w-[52%] bg-gray-100 bg-cover bg-center lg:block"
        style={{ backgroundImage: `url(${image})` }}
        role="img"
        aria-label={imageAlt}
      >
        <div className="absolute inset-y-0 left-0 w-28 rounded-br-[7rem] bg-white" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6">
        <div className="lg:w-1/2 lg:pr-12">
          <nav className="mb-4 flex items-center gap-2 text-sm text-gray-500">
            <Link to="/services" className="transition-colors hover:text-[#0050a9]">
              Services
            </Link>
            <span>/</span>
            <span className="font-medium text-[#0050a9]">{breadcrumb}</span>
          </nav>

          <span className="mb-5 inline-flex items-center gap-2 t-label text-gray-500">
            {EyebrowIcon && <EyebrowIcon className="h-4 w-4 text-[#0050a9]" aria-hidden="true" />}
            {eyebrow}
          </span>

          <h1 className="mb-3 text-[34px] font-bold leading-[1.08] text-[#0a1a3a] lg:text-[48px]">
            {title}
          </h1>

          {subtitle && (
            <p className="mb-6 text-[22px] font-semibold leading-tight text-[#0050a9] lg:text-[28px]">
              {subtitle}
            </p>
          )}

          <p className="mb-8 max-w-lg text-lg leading-relaxed text-gray-600">{description}</p>

          {stats && stats.length > 0 && (
            <div className="mb-8 flex flex-wrap gap-2.5">
              {stats.map((stat) => (
                <div
                  key={stat.value + (stat.label ?? '')}
                  className="rounded-lg border border-blue-100 bg-blue-50/70 px-4 py-2.5 text-center"
                >
                  <div className="text-base font-bold tabular-nums text-[#0050a9] lg:text-lg">
                    <HeroStat value={stat.value} />
                  </div>
                  {stat.label && <div className="text-[11px] text-[#0050a9]">{stat.label}</div>}
                </div>
              ))}
            </div>
          )}

          <div className="flex flex-wrap items-center gap-4">
            <a
              href={primaryCta.href}
              className="group inline-flex items-center gap-2.5 rounded-lg px-7 py-3.5 font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_34px_-14px_rgba(0,80,169,0.9)]"
              style={{ background: 'linear-gradient(120deg, #012f62, #0055b4)' }}
            >
              {primaryCta.label}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>

            <a
              href={secondaryCta.href}
              className="group inline-flex items-center gap-2 rounded-lg border-2 border-[#0050a9]/20 px-7 py-3.5 font-semibold text-[#0050a9] transition-all duration-300 hover:border-[#0050a9] hover:bg-[#0050a9] hover:text-white"
            >
              {secondaryCta.label}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>
        </div>

        {/* Below lg there is no room to bleed, so the photo stacks under the copy */}
        <div className="mt-12 overflow-hidden rounded-2xl bg-gray-100 shadow-xl lg:hidden">
          <img
            src={image}
            alt={imageAlt}
            className="h-[280px] w-full object-cover sm:h-[340px]"
            loading="eager"
          />
        </div>
      </div>
    </section>
  )
}
