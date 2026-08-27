import { Link } from 'react-router-dom'
import SectionLabel from '../components/SectionLabel'
import { ArrowRight } from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import MobileNav from '../components/MobileNav'
import ImageHero, { HeroAccent } from '../components/ImageHero'
import OperationalLifecycle from '../components/OperationalLifecycle'
import { capabilityPillars } from '../data/capabilityPillars'

/**
 * /capabilities  the capability landing page.
 *
 * Six pillars, each with its own URL. The lifecycle section is shared with the homepage
 * so the sequence is stated once and reused, not rewritten per page.
 */
export default function Capabilities() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Same full-bleed treatment as the home page; only the content differs. */}
      <ImageHero
        image="/pillars/feildops.png"
        imageSize={{ width: 1916, height: 821 }}
        focal="62% 55%"
        focalMobile="58% 55%"
        eyebrow={<>Capabilities &bull; Operating Model &bull; Delivery</>}
        title={
          <>
            What JSAN
            <br />
            <HeroAccent>actually does.</HeroAccent>
          </>
        }
        description={
          <>
            Six capability pillars, run as{' '}
            <strong className="font-semibold text-white">one operating model</strong> rather than six
            separate suppliers  from mobilising crews in the field to the systems your teams work in
            every day.
          </>
        }
        primaryCta={{ label: 'Discuss a Program', href: '/contact' }}
        secondaryCta={{ label: 'See Our Work', href: '/work' }}
      />

      {/* The six pillars, as editorial panels rather than a card grid */}
      <section className="section-y bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 max-w-3xl lg:mb-16">
            <SectionLabel>Capability Pillars</SectionLabel>
            <h2 className="t-section text-[#0a1a3a]">Six pillars, one accountable programme</h2>
          </div>

          {/*
            One panel per pillar: a large documentary photograph on roughly 57% of the
            width, a short positioning statement beside it, the four things it actually
            covers, and one way in. Sides alternate down the page.

            Six equal cards said "here are six things". At this size each pillar reads as
            a business in its own right, which is closer to the truth.
          */}
          <div className="space-y-16 lg:space-y-24">
            {capabilityPillars.map((pillar, i) => {
              const imageFirst = i % 2 === 0

              return (
                <article
                  key={pillar.slug}
                  /* The wide column has to follow the image across the alternation, or the
                     photograph shrinks on every second panel. */
                  className={`grid items-center gap-10 lg:gap-16 ${
                    imageFirst
                      ? 'lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]'
                      : 'lg:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)]'
                  }`}
                >
                  <Link
                    to={`/capabilities/${pillar.slug}`}
                    aria-hidden="true"
                    tabIndex={-1}
                    className={`group block overflow-hidden rounded-2xl bg-gray-100 ${
                      imageFirst ? '' : 'lg:order-2'
                    }`}
                  >
                    <img
                      src={pillar.image}
                      alt=""
                      width={1200}
                      height={800}
                      loading="lazy"
                      decoding="async"
                      className="h-[300px] w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.03] lg:h-[460px]"
                    />
                  </Link>

                  <div className={imageFirst ? '' : 'lg:order-1'}>
                    <div className="mb-6 flex items-center gap-4">
                      <span className="text-[34px] font-bold leading-none tracking-[-0.04em] text-[#868e9c]">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span aria-hidden="true" className="h-px w-8 bg-gray-300" />
                      <pillar.icon className="h-5 w-5 text-[#0050a9]" aria-hidden="true" />
                    </div>

                    <h3 className="t-sub mb-5 text-[#0a1a3a]">{pillar.name}</h3>

                    <p className="t-body mb-9 max-w-md text-gray-600">{pillar.summary}</p>

                    {/* The four things this pillar actually covers. */}
                    <ul className="mb-10 space-y-3 border-t border-gray-200 pt-7">
                      {pillar.services.slice(0, 4).map((service) => (
                        <li key={service.href} className="flex items-start gap-3 text-[15px] text-gray-700">
                          <span aria-hidden="true" className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-[#0050a9]" />
                          {service.name}
                        </li>
                      ))}
                    </ul>

                    <Link
                      to={`/capabilities/${pillar.slug}`}
                      className="group inline-flex min-h-[44px] items-center gap-2.5 border-b border-[#0a1a3a]/20 pb-1 font-semibold text-[#0a1a3a] transition-colors duration-300 hover:border-[#0050a9] hover:text-[#0050a9]"
                    >
                      Explore capability
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <OperationalLifecycle />

      {/* CTA */}
      <section className="section-y-sm bg-[#f7f8fa]">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-5 px-6 text-center">
          <h2 className="t-section text-[#0a1a3a]">Not sure which pillar your programme needs?</h2>
          <p className="max-w-2xl leading-relaxed text-gray-600">
            Most programmes use several. Tell us the operating challenge and we will map it to the
            stages, capabilities and governance required to run it.
          </p>
          <Link
            to="/contact"
            className="group mt-2 inline-flex items-center gap-2.5 rounded-lg px-8 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5"
            style={{ background: 'linear-gradient(120deg, #012f62, #0055b4)' }}
          >
            Discuss a Program
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </section>

      <Footer />
      <MobileNav />
    </div>
  )
}
