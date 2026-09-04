import type { LucideIcon } from 'lucide-react'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import HeroStat from './HeroStat'
import HeroBackdrop, { heroCopyColumn } from './HeroBackdrop'

/**
 * The hero used across the service and capability pages.
 *
 * It used to crop the photograph into a panel on the right, behind a curved white flare.
 * That panel showed roughly a third of any wide photograph, so the hero now runs the
 * picture full width and puts the copy on it instead  see HeroBackdrop for the scrim and
 * the header offset that make that readable.
 *
 * copySide has to be read off each photograph: it decides which half the scrim darkens.
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
  /** Which half the copy sits on. Read it off the photograph, not off taste. */
  copySide?: 'left' | 'right'
  /** background-position for the photograph, e.g. '50% 60%'. */
  imagePosition?: string
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
  copySide = 'left',
  imagePosition = '50% 50%',
  primaryCta = { label: 'Talk to Our Team', href: '/contact' },
  secondaryCta = { label: 'All Services', href: '/services' },
}: ServiceHeroProps) {
  return (
    <section
      className="relative flex min-h-[500px] items-center overflow-hidden bg-[#03142d] pt-24 sm:min-h-[560px] sm:pt-28 lg:min-h-[680px] lg:pt-32 pb-12 sm:pb-16 lg:pb-20"
      style={{ marginTop: '44px' }}
    >
      <HeroBackdrop image={image} imageAlt={imageAlt} copySide={copySide} position={imagePosition} />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6">
        <div className={heroCopyColumn(copySide)}>
          <nav className="mb-3 flex items-center gap-2 text-[13px] text-white/60 sm:mb-4 sm:text-sm">
            <Link to="/services" className="transition-colors hover:text-white">
              Services
            </Link>
            <span>/</span>
            <span className="font-medium text-white">{breadcrumb}</span>
          </nav>

          <span className="mb-5 inline-flex items-center gap-2 t-label text-[#00d4ff]">
            {EyebrowIcon && <EyebrowIcon className="h-4 w-4 text-[#00d4ff]" aria-hidden="true" />}
            {eyebrow}
          </span>

          <h1 className="mb-3 text-[26px] font-bold leading-[1.12] text-white sm:text-[30px] sm:leading-[1.08] lg:text-[48px]">
            {title}
          </h1>

          {subtitle && (
            <p className="mb-5 text-[17px] font-semibold leading-snug text-[#7cc6ff] sm:mb-6 sm:text-[20px] lg:text-[28px]">
              {subtitle}
            </p>
          )}

          <p className="mb-7 max-w-lg text-[15px] leading-relaxed text-white/75 sm:mb-8 sm:text-lg">{description}</p>

          {stats && stats.length > 0 && (
            <div className="mb-7 flex flex-wrap gap-2 sm:mb-8 sm:gap-2.5">
              {stats.map((stat) => (
                <div
                  key={stat.value + (stat.label ?? '')}
                  className="rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-center backdrop-blur-sm sm:px-4 sm:py-2.5"
                >
                  <div className="text-sm font-bold tabular-nums text-white sm:text-base lg:text-lg">
                    <HeroStat value={stat.value} />
                  </div>
                  {stat.label && <div className="text-[10px] text-white/70 sm:text-[11px]">{stat.label}</div>}
                </div>
              ))}
            </div>
          )}

          <div className="flex flex-wrap items-center gap-4">
            <a
              href={primaryCta.href}
              className="group inline-flex items-center gap-2.5 rounded-lg bg-white px-5 py-3 text-[15px] font-semibold sm:px-7 sm:py-3.5 sm:text-base text-[#0050a9] shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-100"
            >
              {primaryCta.label}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>

            <a
              href={secondaryCta.href}
              className="group inline-flex items-center gap-2 rounded-lg border-2 border-white/40 px-5 py-3 text-[15px] font-semibold sm:px-7 sm:py-3.5 sm:text-base text-white transition-all duration-300 hover:border-white hover:bg-white/10"
            >
              {secondaryCta.label}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
