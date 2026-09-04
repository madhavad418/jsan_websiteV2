import { Link } from 'react-router-dom'
import SectionLabel from './SectionLabel'
import type { LucideIcon } from 'lucide-react'
import { ArrowRight, CheckCircle } from 'lucide-react'
import HeroBackdrop, { heroCopyColumn } from './HeroBackdrop'
import Header from './Header'
import Footer from './Footer'
import MobileNav from './MobileNav'

/**
 * One customer story per industry, rather than making the visitor work out which
 * service applies to them. The page walks the JSAN operating model  Operate, Map,
 * Intelligence, Engineer  as it applies to that industry, then links the capabilities
 * that actually deliver it.
 *
 * Hero styling matches ServiceHero and the rest of the site: the photograph runs full
 * width behind the copy, under the shared HeroBackdrop scrim.
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
  /**
   * Which half of the hero the copy sits on. The photograph is full-bleed and the scrim
   * only darkens the copy's half, so this really answers "which half of this picture must
   * stay readable". Set it from the image, not from taste.
   */
  copySide?: 'left' | 'right'
  /**
   * Vertical focal point for the hero photograph, e.g. '50% 70%'. These images are 3:2 and
   * 4:3 while the hero is far wider, so cover trims top and bottom  this says what to keep.
   */
  imagePosition?: string
  /** What this industry is up against, in its own terms. */
  challenges: { title: string; description: string }[]
  /**
   * This industry's delivery sequence, stage by stage. Each stage renders as a full-width
   * row  one visual, one statement, the specific work  alternating sides down the page,
   * rather than as a row of interchangeable cards.
   *
   * `image` is optional: stages without one fall back to a compact card.
   */
  journey: {
    stage: string
    title: string
    description: string
    icon: LucideIcon
    image?: string
    imageAlt?: string
    /** The concrete work inside the stage. Four to six lines reads best. */
    points?: string[]
  }[]
  /** Real situations this industry brings to JSAN. Shown against one supporting visual. */
  useCases?: { title: string; detail: string }[]
  useCasesImage?: string
  useCasesImageAlt?: string
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
  copySide = 'left',
  imagePosition = '50% 50%',
  challenges,
  journey,
  capabilities,
  outcomes,
  services,
  scopeNote,
  useCases,
  useCasesImage,
  useCasesImageAlt,
}: IndustryJourneyProps) {

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero  full-bleed photograph, matching the technology and work heroes.
          top-[77px] is the fixed header's height: the section slides under the header, so
          without it the top of every photograph is hidden behind an opaque white bar. */}
      <section
        className="relative flex min-h-[500px] items-center overflow-hidden bg-[#03142d] pt-24 pb-12 sm:min-h-[560px] sm:pt-28 sm:pb-16 lg:min-h-[680px] lg:pt-32 lg:pb-20"
        style={{ marginTop: '44px' }}
      >
        <HeroBackdrop image={image} imageAlt={imageAlt} copySide={copySide} position={imagePosition} />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-6">
          <div className={heroCopyColumn(copySide)}>
            <nav className="mb-3 flex items-center gap-2 text-[13px] text-white/60 sm:mb-4 sm:text-sm">
              <Link to="/industries" className="inline-flex min-h-[24px] items-center transition-colors hover:text-white">
                Industries
              </Link>
              <span>/</span>
              <span className="font-medium text-white">{breadcrumb}</span>
            </nav>

            <span className="mb-5 inline-flex items-center gap-2 t-label text-[#00d4ff]">
              {EyebrowIcon && <EyebrowIcon className="h-4 w-4 text-[#00d4ff]" aria-hidden="true" />}
              {eyebrow}
            </span>

            <h1 className="mb-3 text-[26px] font-bold leading-[1.12] text-white sm:text-[30px] sm:leading-[1.08] lg:text-[48px]">{title}</h1>
            <p className="mb-5 text-[17px] font-semibold leading-snug text-[#7cc6ff] sm:mb-6 sm:text-[20px] lg:text-[28px]">{subtitle}</p>
            <p className="mb-7 max-w-lg text-[15px] leading-relaxed text-white/75 sm:mb-8 sm:text-lg">{description}</p>

            {stats && stats.length > 0 && (
              <div className="mb-7 flex flex-wrap gap-x-7 gap-y-4 sm:mb-8 sm:gap-x-10 sm:gap-y-5">
                {stats.map((stat) => (
                  <div key={stat.label}>
                    <div className="text-xl font-bold text-white sm:text-2xl lg:text-3xl">{stat.value}</div>
                    <div className="mt-0.5 text-xs text-white/60">{stat.label}</div>
                  </div>
                ))}
              </div>
            )}

            <div className="flex flex-wrap items-center gap-4">
              <Link
                to="/contact"
                className="group inline-flex items-center gap-2.5 rounded-lg bg-white px-5 py-3 text-[15px] font-semibold sm:px-7 sm:py-3.5 sm:text-base text-[#0050a9] shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-100"
              >
                Talk to JSAN
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                to="/industries"
                className="group inline-flex items-center gap-2 rounded-lg border-2 border-white/40 px-5 py-3 text-[15px] font-semibold sm:px-7 sm:py-3.5 sm:text-base text-white transition-all duration-300 hover:border-white hover:bg-white/10"
              >
                All Industries
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Challenges */}
      <section className="section-y bg-[#f7f8fa]">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 max-w-3xl lg:mb-14">
            <SectionLabel>The Challenge</SectionLabel>
            <h2 className="t-section text-[#0a1a3a]">What makes this hard</h2>
          </div>

          {/* Three paragraphs, not three cards. A rule above each is enough to separate
              them, and the text can then be read at a comfortable size. */}
          <div className="grid gap-x-12 gap-y-12 md:grid-cols-3">
            {challenges.map((c) => (
              <div key={c.title} className="border-t border-gray-300 pt-7">
                <h3 className="mb-3.5 text-[20px] font-bold leading-snug text-[#0a1a3a]">{c.title}</h3>
                <p className="leading-relaxed text-gray-600">{c.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The operating model, applied */}
      <section className="section-y bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 lg:mb-16">
            <SectionLabel>How JSAN Delivers</SectionLabel>

            {/*
              The sequence is told by the numbered stage rows below, each with its own
              visual. A chip chain repeating those same stage names here added nothing but
              height, so the heading is a plain statement.
            */}
            <h2 className="t-section mb-7 text-[#0a1a3a]">
              How a {breadcrumb.toLowerCase()} programme runs
            </h2>

            <p className="t-body measure text-gray-600">
              One accountable operating model, from mobilising crews in the field through to the systems your
              teams run every day.
            </p>
          </div>

          <div className="space-y-16 lg:space-y-24">
            {journey.map((step, i) => (
              <div
                key={step.stage}
                className={
                  step.image
                    ? 'grid items-center gap-8 lg:grid-cols-2 lg:gap-16'
                    : 'grid items-center gap-8'
                }
              >
                {/* Sides alternate so the sequence reads as a story rather than a table */}
                <div className={i % 2 === 1 ? 'lg:order-2' : ''}>
                  <div className="flex items-center gap-4">
                    <span className="text-[40px] font-bold leading-none tracking-[-0.04em] text-[#868e9c] lg:text-[52px]">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span aria-hidden="true" className="h-px w-8 bg-gray-300" />
                    <step.icon className="h-5 w-5 text-[#0050a9]" aria-hidden="true" />
                    <span className="t-label text-gray-500">{step.stage}</span>
                  </div>

                  <h3 className="t-sub mb-5 mt-7 text-[#0a1a3a]">{step.title}</h3>
                  <p className="t-body max-w-lg text-gray-600">{step.description}</p>

                  {step.points && step.points.length > 0 && (
                    <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                      {step.points.map((point) => (
                        <li key={point} className="flex items-start gap-2.5 text-[15px] text-gray-600">
                          <span className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-gray-400" />
                          <span className="leading-relaxed">{point}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {step.image && (
                  <div className={i % 2 === 1 ? 'lg:order-1' : ''}>
                    <div className="overflow-hidden rounded-sm bg-gray-100">
                      <img
                        src={step.image}
                        alt={step.imageAlt ?? ''}
                        width={1200}
                        height={800}
                        className="h-[240px] w-full object-cover transition-transform duration-[900ms] ease-out hover:scale-105 lg:h-[360px]"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Where this actually gets used  one visual, one list, no card grid */}
      {useCases && useCases.length > 0 && (
        <section className="section-y bg-[#05132b]">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-16">
              {useCasesImage && (
                <div className="overflow-hidden rounded-2xl shadow-2xl ring-1 ring-white/10">
                  <img
                    src={useCasesImage}
                    alt={useCasesImageAlt ?? ''}
                    width={1200}
                    height={900}
                    className="h-[280px] w-full object-cover lg:h-[440px]"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              )}

              <div>
                <SectionLabel tone="dark">Use Cases</SectionLabel>
                <h2 className="t-section mb-10 text-white">
                  What {breadcrumb.toLowerCase()} teams bring us
                </h2>

                <ol className="space-y-6">
                  {useCases.map((useCase, i) => (
                    <li key={useCase.title} className="flex gap-5">
                      <span className="mt-0.5 text-[13px] font-bold tabular-nums text-[#00d4ff]">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span>
                        <span className="mb-1.5 block font-bold text-white">{useCase.title}</span>
                        <span className="block text-sm leading-relaxed text-white/70">
                          {useCase.detail}
                        </span>
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Capabilities + outcomes */}
      <section className="section-y bg-[#f7f8fa]">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
            <div>
              <SectionLabel>Capabilities Applied</SectionLabel>
              <h2 className="t-section mb-8 text-[#0a1a3a]">
                The parts of JSAN this programme uses
              </h2>
              {services && services.length > 0 && (
                <div className="mb-8">
                  <div className="mb-3 t-label text-gray-500">
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
              <SectionLabel>Outcomes</SectionLabel>
              <h2 className="t-section mb-8 text-[#0a1a3a]">What you get</h2>
              <ul className="space-y-4">
                {outcomes.map((o) => (
                  <li key={o} className="flex items-start gap-3 text-gray-700">
                    <CheckCircle className="mt-1 h-5 w-5 shrink-0 text-[#0050a9]" aria-hidden="true" />
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
      <section className="section-y" style={{ background: 'linear-gradient(120deg, #012f62, #0055b4)' }}>
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
