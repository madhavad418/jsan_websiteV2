import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import MobileNav from '../components/MobileNav'
import StatementHero from '../components/StatementHero'
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

      <StatementHero
        eyebrow={<>Capabilities &bull; Operating Model &bull; Delivery</>}
        title="What JSAN actually does."
        description={
          <>
            Six capability pillars, run as{' '}
            <strong className="font-semibold text-[#0a1a3a]">one operating model</strong> rather than six
            separate suppliers &mdash; from mobilising crews in the field to the systems your teams work in
            every day.
          </>
        }
        primaryCta={{ label: 'Discuss a Program', href: '/contact' }}
        secondaryCta={{ label: 'See Our Work', href: '/work' }}
        image="/pillars/all_services.png"
        imageAlt="JSAN capability model across field operations, mapping, GeoAI and engineering"
        imageStyle="filled"
      />

      {/* The six pillars */}
      <section className="bg-white py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-14 max-w-3xl">
            <span className="mb-3 inline-block text-[11px] font-bold uppercase tracking-[0.25em] text-[#00a3e0]">
              Capability Pillars
            </span>
            <h2 className="text-[30px] font-bold leading-tight text-[#0a1a3a] lg:text-[42px]">
              Six pillars, one accountable programme
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {capabilityPillars.map((pillar) => (
              <Link
                key={pillar.slug}
                to={`/capabilities/${pillar.slug}`}
                className="group flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-[#0050a9]/25 hover:shadow-[0_26px_50px_-24px_rgba(1,47,98,0.55)]"
              >
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={pillar.image}
                    alt=""
                    aria-hidden="true"
                    width={1200}
                    height={800}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#05132b]/85 via-[#05132b]/35 to-transparent" />
                  <span className="absolute bottom-4 left-5 flex h-11 w-11 items-center justify-center rounded-xl bg-white/15 backdrop-blur-sm">
                    <pillar.icon className="h-5 w-5 text-white" />
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <h3 className="mb-2.5 text-lg font-bold leading-tight text-[#0a1a3a]">{pillar.name}</h3>
                  <p className="mb-5 flex-1 text-sm leading-relaxed text-gray-600">{pillar.summary}</p>
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#0050a9]">
                    Explore
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <OperationalLifecycle />

      {/* CTA */}
      <section className="bg-gray-50 py-16 lg:py-20">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-5 px-6 text-center">
          <h2 className="text-[26px] font-bold leading-tight text-[#0a1a3a] lg:text-[34px]">
            Not sure which pillar your programme needs?
          </h2>
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
