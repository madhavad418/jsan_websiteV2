import { Link, Navigate, useParams } from 'react-router-dom'
import { ArrowRight, ChevronRight } from 'lucide-react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import MobileNav from '../../components/MobileNav'
import { caseStudies, caseStudyBySlug } from '../../data/work'

/**
 * /work/<slug>  one case study, driven entirely by src/data/work.ts.
 *
 * The page answers the same six questions for every programme, in the same order, so
 * they can be read side by side: challenge, role, operating model, technology, scale,
 * outcome. An unknown slug goes back to the index rather than rendering an empty shell.
 */
export default function WorkDetail() {
  const { slug } = useParams()
  const study = caseStudyBySlug(slug)

  if (!study) return <Navigate to="/work" replace />

  const detail = [
    { label: 'Challenge', value: study.challenge },
    { label: 'JSAN Role', value: study.role },
    { label: 'Operating Model', value: study.operatingModel },
    { label: 'Technology', value: study.technology },
    { label: 'Scale', value: study.scale },
    { label: 'Outcome', value: study.outcome },
  ]

  const others = caseStudies.filter((cs) => cs.slug !== study.slug)

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden" style={{ marginTop: '44px' }}>
        <div className="absolute inset-0">
          <img
            src={study.image}
            alt=""
            aria-hidden="true"
            width={1200}
            height={800}
            className="h-full w-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(120deg, rgba(5,19,43,0.95) 0%, rgba(10,35,80,0.9) 55%, rgba(0,80,169,0.78) 100%)',
            }}
          />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6 pb-16 pt-28 lg:pb-24 lg:pt-36">
          <nav className="mb-5 flex items-center gap-2 text-sm text-white/60">
            <Link to="/work" className="inline-flex min-h-[24px] items-center transition-colors hover:text-white">
              Work
            </Link>
            <span>/</span>
            <span className="font-medium text-[#00d4ff]">{study.title}</span>
          </nav>

          <span className="mb-4 inline-block text-[11px] font-bold uppercase tracking-[0.25em] text-[#00d4ff]">
            Case Study {study.number}
          </span>
          <h1 className="mb-5 max-w-3xl text-[32px] font-bold leading-[1.08] text-white lg:text-[48px]">
            {study.title}
          </h1>
          <p className="mb-8 max-w-2xl text-lg leading-relaxed text-white/75">{study.summary}</p>

          <div className="flex flex-wrap gap-2">
            {study.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-[11px] font-medium text-white backdrop-blur-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Lifecycle stages this programme ran */}
      <section className="border-b border-gray-100 bg-white py-10">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-5 text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400">
            Lifecycle stages run
          </div>
          <div className="flex flex-col items-start gap-y-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-2.5">
            {study.stages.map((stage, i) => (
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
                {i < study.stages.length - 1 && (
                  <ChevronRight className="ml-5 h-4 w-4 shrink-0 rotate-90 text-[#00a3e0] sm:ml-0 sm:rotate-0" />
                )}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* The programme, answered the same way every time */}
      <section className="bg-white py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-x-14 gap-y-10 md:grid-cols-2">
            {detail.map((row) => (
              <div key={row.label}>
                <div className="mb-2.5 text-[11px] font-bold uppercase tracking-[0.2em] text-[#00a3e0]">
                  {row.label}
                </div>
                <p className="leading-relaxed text-gray-600">{row.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Where to go next */}
      <section className="bg-gray-50 py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
            <div>
              <span className="mb-3 inline-block text-[11px] font-bold uppercase tracking-[0.25em] text-[#00a3e0]">
                Capabilities Applied
              </span>
              <h2 className="mb-6 text-[24px] font-bold leading-tight text-[#0a1a3a] lg:text-[30px]">
                The parts of JSAN this programme used
              </h2>
              <div className="flex flex-wrap gap-2.5">
                {study.capabilities.map((cap) => (
                  <Link
                    key={cap.href}
                    to={cap.href}
                    className="group inline-flex items-center gap-1.5 rounded-full border border-blue-100 bg-white px-4 py-2 text-sm font-medium text-[#0050a9] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#0050a9] hover:shadow-sm"
                  >
                    {cap.name}
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </Link>
                ))}
                <Link
                  to={study.industry.href}
                  className="group inline-flex items-center gap-1.5 rounded-full border border-blue-100 bg-white px-4 py-2 text-sm font-medium text-[#0050a9] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#0050a9] hover:shadow-sm"
                >
                  {study.industry.name}
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>

            <div>
              <span className="mb-3 inline-block text-[11px] font-bold uppercase tracking-[0.25em] text-[#00a3e0]">
                More Work
              </span>
              <h2 className="mb-6 text-[24px] font-bold leading-tight text-[#0a1a3a] lg:text-[30px]">
                Other programmes
              </h2>
              <div className="space-y-3">
                {others.map((cs) => (
                  <Link
                    key={cs.slug}
                    to={`/work/${cs.slug}`}
                    className="group flex items-center justify-between gap-4 rounded-xl border border-gray-200 bg-white p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#0050a9]/30 hover:shadow-md"
                  >
                    <span>
                      <span className="mb-1 block text-[10px] font-bold tracking-[0.2em] text-[#00a3e0]">
                        CASE STUDY {cs.number}
                      </span>
                      <span className="font-bold text-[#0a1a3a]">{cs.title}</span>
                    </span>
                    <ArrowRight className="h-4 w-4 shrink-0 text-[#0050a9] transition-transform duration-300 group-hover:translate-x-1" />
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
            Planning a programme like this?
          </h2>
          <p className="mb-9 text-lg leading-relaxed text-white/75">
            Bring us the operating challenge. We will define the mobilisation, delivery, technology and
            governance model required to execute it at scale.
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
