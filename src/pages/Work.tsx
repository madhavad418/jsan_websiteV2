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
            Programmes JSAN runs end to end &mdash; mobilisation through validated delivery. Shown{' '}
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

      <section className="bg-white py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="space-y-8">
            {caseStudies.map((cs) => (
              <Link
                key={cs.slug}
                to={`/work/${cs.slug}`}
                className="group grid overflow-hidden rounded-2xl border border-gray-100 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-[#0050a9]/25 hover:shadow-[0_28px_55px_-24px_rgba(1,47,98,0.6)] lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]"
              >
                <div className="relative h-56 overflow-hidden lg:h-full lg:min-h-[300px]">
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

                <div className="bg-white p-7 lg:p-10">
                  <div className="mb-3 text-[11px] font-bold tracking-[0.2em] text-[#00a3e0]">
                    CASE STUDY {cs.number}
                  </div>
                  <h2 className="mb-3 text-[24px] font-bold leading-tight text-[#0a1a3a] lg:text-[30px]">
                    {cs.title}
                  </h2>
                  <p className="mb-6 max-w-xl text-base leading-relaxed text-gray-600">{cs.summary}</p>

                  <div className="mb-7 flex flex-wrap gap-2">
                    {cs.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-blue-100 bg-[#f0f7ff] px-3 py-1 text-[11px] font-medium text-[#0050a9]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <span className="inline-flex items-center gap-2 font-semibold text-[#0050a9]">
                    Read the case study
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-5 px-6 text-center">
          <Briefcase className="h-7 w-7 text-[#0050a9]" />
          <h2 className="text-[26px] font-bold leading-tight text-[#0a1a3a] lg:text-[34px]">
            Working on something similar?
          </h2>
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
