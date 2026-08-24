import { Link, Navigate, useLocation, useParams } from 'react-router-dom'
import { ArrowRight, CheckCircle, ChevronRight } from 'lucide-react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import MobileNav from '../../components/MobileNav'
import { capabilityPillars, pillarBySlug } from '../../data/capabilityPillars'

/**
 * /capabilities/<pillar-slug>  one capability pillar, driven by src/data/capabilityPillars.ts.
 *
 * This is a hub, not a duplicate: it states what the pillar covers, which lifecycle stages
 * it owns and what it produces, then sends the reader to the existing detail pages. An
 * unknown slug falls through to the capability landing page.
 */
export default function CapabilityPillar() {
  // Each pillar is mounted on its own static path, which carries no route param, so the
  // slug comes from the URL itself. useParams still wins where a :slug route is used.
  const { slug } = useParams()
  const { pathname } = useLocation()
  const pillar = pillarBySlug(slug ?? pathname.split('/').filter(Boolean).pop())

  if (!pillar) return <Navigate to="/capabilities" replace />

  const others = capabilityPillars.filter((p) => p.slug !== pillar.slug)

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero */}
      <section
        className="relative flex items-center overflow-hidden bg-white pb-16 pt-24 lg:min-h-[560px] lg:pb-20 lg:pt-28"
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
            style={{ backgroundImage: `url(${pillar.image})` }}
            role="img"
            aria-label={pillar.imageAlt}
          />
          <div className="absolute inset-y-0 left-0 w-28 rounded-br-[7rem] bg-white" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-7xl px-6">
          <div className="lg:w-1/2 lg:pr-12">
            <nav className="mb-4 flex items-center gap-2 text-sm text-gray-500">
              <Link to="/capabilities" className="inline-flex min-h-[24px] items-center transition-colors hover:text-[#0050a9]">
                Capabilities
              </Link>
              <span>/</span>
              <span className="font-medium text-[#0050a9]">{pillar.name}</span>
            </nav>

            <span className="mb-5 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.25em] text-[#00a3e0]">
              <pillar.icon className="h-4 w-4" />
              Capability Pillar
            </span>

            <h1 className="mb-4 text-[34px] font-bold leading-[1.08] text-[#0a1a3a] lg:text-[46px]">
              {pillar.name}
            </h1>
            <p className="mb-6 text-[20px] font-semibold leading-tight text-[#0050a9] lg:text-[24px]">
              {pillar.summary}
            </p>
            <p className="mb-8 max-w-lg text-lg leading-relaxed text-gray-600">{pillar.description}</p>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                to="/contact"
                className="group inline-flex items-center gap-2.5 rounded-lg px-7 py-3.5 font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_34px_-14px_rgba(0,80,169,0.9)]"
                style={{ background: 'linear-gradient(120deg, #012f62, #0055b4)' }}
              >
                Discuss a Program
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                to="/work"
                className="group inline-flex items-center gap-2 rounded-lg border-2 border-[#0050a9]/20 px-7 py-3.5 font-semibold text-[#0050a9] transition-all duration-300 hover:border-[#0050a9] hover:bg-[#0050a9] hover:text-white"
              >
                See Our Work
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          <div className="mt-12 overflow-hidden rounded-2xl bg-gray-100 shadow-xl lg:hidden">
            <img
              src={pillar.image}
              alt={pillar.imageAlt}
              className="h-[260px] w-full object-cover sm:h-[320px]"
              loading="eager"
            />
          </div>
        </div>
      </section>

      {/* Where this pillar sits in the lifecycle */}
      <section className="border-y border-gray-100 bg-gray-50 py-10">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-5 text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400">
            Lifecycle stages owned
          </div>
          <div className="flex flex-col items-start gap-y-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-2.5">
            {pillar.stages.map((stage, i) => (
              <span
                key={stage}
                className="flex flex-col items-start gap-y-2 sm:flex-row sm:items-center sm:gap-x-2.5"
              >
                <span className="inline-flex items-center gap-2 rounded-xl border border-blue-100 bg-white px-4 py-2 text-base font-bold shadow-[0_10px_26px_-20px_rgba(0,80,169,0.85)]">
                  <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-br from-[#00d4ff] to-[#0050a9]" />
                  <span className="bg-gradient-to-r from-[#012f62] to-[#0a1a3a] bg-clip-text text-transparent">
                    {stage}
                  </span>
                </span>
                {i < pillar.stages.length - 1 && (
                  <ChevronRight className="ml-5 h-4 w-4 shrink-0 rotate-90 text-[#00a3e0] sm:ml-0 sm:rotate-0" />
                )}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* What it covers  each line is a real page */}
      <section className="bg-white py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 max-w-3xl">
            <span className="mb-3 inline-block text-[11px] font-bold uppercase tracking-[0.25em] text-[#00a3e0]">
              What It Covers
            </span>
            <h2 className="text-[28px] font-bold leading-tight text-[#0a1a3a] lg:text-[38px]">
              The work inside this pillar
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {pillar.services.map((service) => (
              <Link
                key={service.href}
                to={service.href}
                className="group rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#0050a9]/25 hover:shadow-lg"
              >
                <h3 className="mb-2 flex items-start justify-between gap-3 text-base font-bold leading-tight text-[#0a1a3a]">
                  {service.name}
                  <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-[#0050a9] transition-transform duration-300 group-hover:translate-x-1" />
                </h3>
                <p className="text-sm leading-relaxed text-gray-600">{service.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Outcomes + industries */}
      <section className="bg-gray-50 py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
            <div>
              <span className="mb-3 inline-block text-[11px] font-bold uppercase tracking-[0.25em] text-[#00a3e0]">
                Outcomes
              </span>
              <h2 className="mb-6 text-[26px] font-bold leading-tight text-[#0a1a3a] lg:text-[34px]">
                What you get
              </h2>
              <ul className="space-y-4">
                {pillar.outcomes.map((outcome) => (
                  <li key={outcome} className="flex items-start gap-3 text-gray-700">
                    <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-[#0050a9]" />
                    <span className="leading-relaxed">{outcome}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <span className="mb-3 inline-block text-[11px] font-bold uppercase tracking-[0.25em] text-[#00a3e0]">
                Where It Applies
              </span>
              <h2 className="mb-6 text-[26px] font-bold leading-tight text-[#0a1a3a] lg:text-[34px]">
                Industries this pillar serves
              </h2>
              <div className="mb-10 flex flex-wrap gap-2.5">
                {pillar.industries.map((industry) => (
                  <Link
                    key={industry.href}
                    to={industry.href}
                    className="group inline-flex items-center gap-1.5 rounded-full border border-blue-100 bg-white px-4 py-2 text-sm font-medium text-[#0050a9] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#0050a9] hover:shadow-sm"
                  >
                    {industry.name}
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </Link>
                ))}
              </div>

              <div className="mb-3 text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400">
                Other pillars
              </div>
              <div className="flex flex-wrap gap-2">
                {others.map((p) => (
                  <Link
                    key={p.slug}
                    to={`/capabilities/${p.slug}`}
                    className="rounded-lg border border-gray-200 bg-white px-3.5 py-1.5 text-sm text-gray-700 transition-colors hover:border-[#0050a9]/40 hover:text-[#0050a9]"
                  >
                    {p.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-24" style={{ background: 'linear-gradient(120deg, #012f62, #0055b4)' }}>
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="mb-5 text-[28px] font-bold text-white lg:text-[38px]">
            Let&rsquo;s scope the {pillar.name.toLowerCase()} you need
          </h2>
          <p className="mb-9 text-lg leading-relaxed text-white/75">
            Tell us the geography, the assets and the timelines. We will come back with a mobilisation
            plan, a delivery model and a costed approach.
          </p>
          <Link
            to="/contact"
            className="group inline-flex items-center gap-2.5 rounded-lg bg-white px-8 py-4 font-semibold text-[#0050a9] shadow-lg transition-all duration-300 hover:-translate-y-0.5"
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
