import { Link } from 'react-router-dom'
import type { LucideIcon } from 'lucide-react'
import { ArrowRight, CheckCircle } from 'lucide-react'
import Header from './Header'
import Footer from './Footer'
import MobileNav from './MobileNav'

/**
 * One customer story per industry, rather than making the visitor work out which
 * service applies to them. The page walks the JSAN operating model  Operate, Map,
 * Intelligence, Engineer  as it applies to that industry, then links the capabilities
 * that actually deliver it.
 *
 * Hero styling matches ServiceHero and the rest of the site: white, brand wash, no scrim.
 */

export type IndustryJourneyProps = {
  breadcrumb: string
  eyebrow: string
  eyebrowIcon?: LucideIcon
  title: string
  subtitle: string
  description: string
  stats?: { value: string; label: string }[]
  image: string
  imageAlt: string
  /** What this industry is up against, in its own terms. */
  challenges: { title: string; description: string }[]
  /** The operating model applied to this industry, stage by stage. */
  journey: { stage: string; title: string; description: string; icon: LucideIcon }[]
  /** Capabilities that deliver the journey; each links to a real capability page. */
  capabilities: { name: string; href: string }[]
  outcomes: string[]
  /** Flat service list, shown above the capability links where an industry has one. */
  services?: string[]
  /**
   * Scope boundary. Where an industry is regulated, this states plainly what JSAN does
   * NOT do, so the page cannot be read as claiming an authority JSAN does not hold.
   */
  scopeNote?: string
}

export default function IndustryJourney({
  breadcrumb,
  eyebrow,
  eyebrowIcon: EyebrowIcon,
  title,
  subtitle,
  description,
  stats,
  image,
  imageAlt,
  challenges,
  journey,
  capabilities,
  outcomes,
  services,
  scopeNote,
}: IndustryJourneyProps) {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero */}
      <section
        className="relative flex items-center overflow-hidden bg-white pt-24 lg:min-h-[640px] lg:pt-28 pb-16 lg:pb-20"
        style={{ marginTop: '44px' }}
      >
        <div className="pointer-events-none absolute inset-y-0 left-0 w-[44%]">
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(50% 45% at 5% 10%, rgba(0,80,169,0.07) 0%, rgba(0,80,169,0) 100%), ' +
                'radial-gradient(45% 55% at 30% 95%, rgba(0,212,255,0.11) 0%, rgba(0,212,255,0) 100%)',
            }}
          />
        </div>

        <div className="absolute inset-y-6 right-0 hidden w-[52%] lg:block">
          <div
            className="absolute inset-0 bg-gray-100 bg-cover bg-center"
            style={{ backgroundImage: `url(${image})` }}
            role="img"
            aria-label={imageAlt}
          />
          <div className="absolute inset-y-0 left-0 w-28 rounded-br-[7rem] bg-white" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-7xl px-6">
          <div className="lg:w-1/2 lg:pr-12">
            <nav className="mb-4 flex items-center gap-2 text-sm text-gray-500">
              <Link to="/industries" className="transition-colors hover:text-[#0050a9]">
                Industries
              </Link>
              <span>/</span>
              <span className="font-medium text-[#0050a9]">{breadcrumb}</span>
            </nav>

            <span className="mb-5 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.25em] text-[#00a3e0]">
              {EyebrowIcon && <EyebrowIcon className="h-4 w-4" />}
              {eyebrow}
            </span>

            <h1 className="mb-3 text-[34px] font-bold leading-[1.08] text-[#0a1a3a] lg:text-[48px]">{title}</h1>
            <p className="mb-6 text-[22px] font-semibold leading-tight text-[#0050a9] lg:text-[28px]">{subtitle}</p>
            <p className="mb-8 max-w-lg text-lg leading-relaxed text-gray-600">{description}</p>

            {stats && stats.length > 0 && (
              <div className="mb-8 flex flex-wrap gap-x-10 gap-y-5">
                {stats.map((stat) => (
                  <div key={stat.label}>
                    <div className="text-2xl font-bold text-[#0050a9] lg:text-3xl">{stat.value}</div>
                    <div className="mt-0.5 text-xs text-[#0050a9]">{stat.label}</div>
                  </div>
                ))}
              </div>
            )}

            <div className="flex flex-wrap items-center gap-4">
              <Link
                to="/contact"
                className="group inline-flex items-center gap-2.5 rounded-lg px-7 py-3.5 font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_34px_-14px_rgba(0,80,169,0.9)]"
                style={{ background: 'linear-gradient(120deg, #012f62, #0055b4)' }}
              >
                Talk to JSAN
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                to="/industries"
                className="group inline-flex items-center gap-2 rounded-lg border-2 border-[#0050a9]/20 px-7 py-3.5 font-semibold text-[#0050a9] transition-all duration-300 hover:border-[#0050a9] hover:bg-[#0050a9] hover:text-white"
              >
                All Industries
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          <div className="mt-12 overflow-hidden rounded-2xl bg-gray-100 shadow-xl lg:hidden">
            <img src={image} alt={imageAlt} className="h-[280px] w-full object-cover sm:h-[340px]" loading="eager" />
          </div>
        </div>
      </section>

      {/* Challenges */}
      <section className="bg-gray-50 py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-14 max-w-3xl">
            <span className="mb-3 inline-block text-[11px] font-bold uppercase tracking-[0.25em] text-[#00a3e0]">
              The Challenge
            </span>
            <h2 className="text-[30px] font-bold leading-tight text-[#0a1a3a] lg:text-[40px]">
              What makes this hard
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {challenges.map((c) => (
              <div key={c.title} className="rounded-2xl border border-gray-100 bg-white p-7 shadow-sm">
                <h3 className="mb-2.5 text-lg font-bold text-[#0050a9]">{c.title}</h3>
                <p className="text-sm leading-relaxed text-gray-600">{c.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The operating model, applied */}
      <section className="bg-white py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-14 max-w-3xl">
            <span className="mb-3 inline-block text-[11px] font-bold uppercase tracking-[0.25em] text-[#00a3e0]">
              How JSAN Delivers
            </span>
            <h2 className="mb-4 text-[30px] font-bold leading-tight text-[#0a1a3a] lg:text-[40px]">
              Operate &rarr; Map &rarr; Intelligence &rarr; Engineer
            </h2>
            <p className="text-lg leading-relaxed text-gray-600">
              One accountable operating model, from mobilising crews in the field through to the systems your
              teams run every day.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {journey.map((step, i) => (
              <div
                key={step.stage}
                className="group relative rounded-2xl border border-gray-100 bg-gradient-to-b from-white to-gray-50 p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <span className="absolute right-6 top-5 text-3xl font-bold text-[#0050a9]/10">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#012f62] to-[#0055b4] shadow-lg">
                  <step.icon className="h-6 w-6 text-white" />
                </div>
                <div className="mb-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-[#00a3e0]">
                  {step.stage}
                </div>
                <h3 className="mb-2 text-lg font-bold text-[#0a1a3a]">{step.title}</h3>
                <p className="text-sm leading-relaxed text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities + outcomes */}
      <section className="bg-gray-50 py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
            <div>
              <span className="mb-3 inline-block text-[11px] font-bold uppercase tracking-[0.25em] text-[#00a3e0]">
                Capabilities Applied
              </span>
              <h2 className="mb-6 text-[28px] font-bold leading-tight text-[#0a1a3a] lg:text-[36px]">
                The parts of JSAN this programme uses
              </h2>
              {services && services.length > 0 && (
                <div className="mb-8">
                  <div className="mb-3 text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400">
                    Services
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {services.map((service) => (
                      <span
                        key={service}
                        className="rounded-lg border border-gray-200 bg-white px-3.5 py-1.5 text-sm text-gray-700"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex flex-wrap gap-2.5">
                {capabilities.map((cap) => (
                  <Link
                    key={cap.name}
                    to={cap.href}
                    className="group inline-flex items-center gap-1.5 rounded-full border border-blue-100 bg-white px-4 py-2 text-sm font-medium text-[#0050a9] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#0050a9] hover:shadow-sm"
                  >
                    {cap.name}
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <span className="mb-3 inline-block text-[11px] font-bold uppercase tracking-[0.25em] text-[#00a3e0]">
                Outcomes
              </span>
              <h2 className="mb-6 text-[28px] font-bold leading-tight text-[#0a1a3a] lg:text-[36px]">
                What you get
              </h2>
              <ul className="space-y-4">
                {outcomes.map((o) => (
                  <li key={o} className="flex items-start gap-3 text-gray-700">
                    <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-[#0050a9]" />
                    <span className="leading-relaxed">{o}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {scopeNote && (
        <section className="bg-white pb-4 pt-16">
          <div className="mx-auto max-w-7xl px-6">
            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6 lg:p-7">
              <div className="mb-2 text-[11px] font-bold uppercase tracking-[0.2em] text-gray-500">
                Scope of Services
              </div>
              <p className="text-sm leading-relaxed text-gray-600">{scopeNote}</p>
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-20 lg:py-24" style={{ background: 'linear-gradient(120deg, #012f62, #0055b4)' }}>
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="mb-5 text-[30px] font-bold text-white lg:text-[40px]">
            Let&rsquo;s scope your {breadcrumb.toLowerCase()} programme
          </h2>
          <p className="mb-9 text-lg leading-relaxed text-white/75">
            Tell us the geography, the assets and the timelines. We will come back with a mobilisation plan, a
            delivery model and a costed approach.
          </p>
          <Link
            to="/contact"
            className="group inline-flex items-center gap-2.5 rounded-lg bg-white px-8 py-4 font-semibold text-[#0050a9] shadow-lg transition-all duration-300 hover:-translate-y-0.5"
          >
            Talk to JSAN
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </section>

      <Footer />
      <MobileNav />
    </div>
  )
}
