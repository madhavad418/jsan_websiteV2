import { Link } from 'react-router-dom'
import { ArrowRight, Briefcase } from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import MobileNav from '../components/MobileNav'
import StatementHero from '../components/StatementHero'
import { caseStudies } from '../data/work'

/**
 * /work  the case study index.
 *
 * Three programmes, each with its own URL, so a capability conversation with a prospect
 * can be sent as a link rather than as "scroll down the homepage".
 */
export default function Work() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <StatementHero
        eyebrow={<>Work &bull; Programmes &bull; Evidence</>}
        title="Operational capability, demonstrated."
        description={
          <>
            Programmes JSAN runs end to end  mobilisation through validated delivery. Shown{' '}
            <strong className="font-semibold text-[#0a1a3a]">anonymised</strong> where client naming
            permission is not yet in place.
          </>
        }
        primaryCta={{ label: 'Discuss a Program', href: '/contact' }}
        secondaryCta={{ label: 'Explore Capabilities', href: '/capabilities' }}
        image="/pillars/multi_country.png"
        imageAlt="JSAN collection programme running across multiple markets"
        imageStyle="filled"
      />

      {/*
        The flagship product sits above the case studies rather than inside them: it is not a
        programme JSAN ran for a client, it is a system JSAN built and operates, and putting it
        in the same list would quietly reframe it as one more engagement.
      */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/pillars/live_tracking.png"
            alt=""
            aria-hidden="true"
            width={1536}
            height={1024}
            loading="lazy"
            className="h-full w-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(105deg, rgba(4,15,34,0.96) 0%, rgba(6,26,58,0.92) 52%, rgba(0,64,138,0.72) 100%)',
            }}
          />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6 py-20 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:items-end lg:gap-20">
            <div>
              <span className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-white backdrop-blur-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-[#00d4ff]" />
                Industrial product
              </span>
              <h2 className="t-section mb-6 text-white">JSAN ATLAS Ops</h2>
              <p className="t-body mb-9 max-w-2xl text-white/70">
                Tracking that nobody has to start, distances matched to the roads they were actually
                driven on, and progress reported as a share of the network a client contracted for
                 not as kilometres with nothing to compare them against.
              </p>

              <Link
                to="/products/fleet-intelligence"
                className="group inline-flex min-h-[52px] items-center gap-2.5 rounded-lg bg-white px-8 font-semibold text-[#012f62] shadow-lg transition-all duration-300 hover:-translate-y-0.5"
              >
                Explore the platform
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>

            <ul className="grid gap-x-8 gap-y-6 border-t border-white/15 pt-9 sm:grid-cols-2 lg:grid-cols-1 lg:border-l lg:border-t-0 lg:pl-12 lg:pt-0">
              {[
                'Trips record themselves, with nothing for a driver to start',
                'Work carried out with no signal is never lost from the record',
                'Progress reported against the network a client contracted for',
                'Every road counted once, however many crews pass down it',
              ].map((point) => (
                <li key={point} className="flex gap-3.5 text-[15px] leading-relaxed text-white/70">
                  <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#00d4ff]" />
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section-y bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="space-y-12 lg:space-y-16">
            {caseStudies.map((cs) => (
              <Link
                key={cs.slug}
                to={`/work/${cs.slug}`}
                className="group grid overflow-hidden border-t border-gray-300 pt-10 transition-colors duration-300 hover:border-[#0050a9] lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-12"
              >
                <div className="relative h-64 overflow-hidden rounded-sm lg:h-full lg:min-h-[340px]">
                  <img
                    src={cs.image}
                    alt=""
                    aria-hidden="true"
                    width={1200}
                    height={800}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#05132b]/70 via-[#05132b]/20 to-transparent lg:bg-gradient-to-r" />
                </div>

                <div className="bg-white pt-8 lg:pt-2">
                  <div className="mb-4 t-label text-gray-500">Case Study {cs.number}</div>
                  <h2 className="t-section mb-5 text-[#0a1a3a]">{cs.title}</h2>
                  <p className="t-body mb-8 max-w-xl text-gray-600">{cs.summary}</p>

                  <div className="mb-7 flex flex-wrap gap-2">
                    {cs.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-gray-200 px-3.5 py-1.5 text-xs text-gray-600"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <span className="inline-flex items-center gap-2 font-semibold text-[#0a1a3a] transition-colors group-hover:text-[#0050a9]">
                    Read the case study
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y-sm bg-[#f7f8fa]">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-5 px-6 text-center">
          <Briefcase className="h-7 w-7 text-[#0050a9]" />
          <h2 className="t-section text-[#0a1a3a]">Working on something similar?</h2>
          <p className="max-w-2xl leading-relaxed text-gray-600">
            Tell us the geography, the assets and the timelines. We will come back with a mobilisation
            plan, a delivery model and a costed approach.
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
