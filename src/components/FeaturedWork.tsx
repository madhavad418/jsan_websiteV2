import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { caseStudies } from '../data/work'

/**
 * SECTION 08  FEATURED WORK
 *
 * Three programmes, each with a real page at /work/<slug>. Content comes from
 * src/data/work.ts so the homepage summary and the case study page cannot drift apart.
 */
export default function FeaturedWork() {
  const [active, setActive] = useState(0)
  const study = caseStudies[active]

  const detail: { label: string; value: string }[] = [
    { label: 'Challenge', value: study.challenge },
    { label: 'JSAN Role', value: study.role },
    { label: 'Operating Model', value: study.operatingModel },
    { label: 'Technology', value: study.technology },
    { label: 'Scale', value: study.scale },
    { label: 'Outcome', value: study.outcome },
  ]

  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 max-w-3xl lg:mb-14">
          <span className="mb-4 inline-block text-[11px] font-bold uppercase tracking-[0.25em] text-[#00a3e0]">
            Featured Work
          </span>
          <h2 className="mb-5 text-[28px] font-bold leading-[1.12] tracking-tight text-[#0a1a3a] lg:text-[42px]">
            Operational capability demonstrated in the real world
          </h2>
          <p className="text-lg leading-relaxed text-gray-600">
            Programmes are shown anonymised where client naming permission is not yet in place.
          </p>
        </div>

        {/* Selector */}
        <div className="mb-8 grid gap-4 md:grid-cols-3">
          {caseStudies.map((cs, i) => (
            <button
              key={cs.slug}
              type="button"
              onClick={() => setActive(i)}
              aria-current={i === active}
              className={`rounded-2xl border p-6 text-left transition-all duration-300 ${
                i === active
                  ? 'border-[#0050a9] bg-[#f0f7ff] shadow-md'
                  : 'border-gray-100 bg-white hover:-translate-y-0.5 hover:border-[#0050a9]/30 hover:shadow-sm'
              }`}
            >
              <div className="mb-2 text-[11px] font-bold tracking-[0.2em] text-[#00a3e0]">
                CASE STUDY {cs.number}
              </div>
              <div className="mb-2 text-lg font-bold leading-tight text-[#0a1a3a]">{cs.title}</div>
              <p className="text-sm leading-relaxed text-gray-600">{cs.summary}</p>
            </button>
          ))}
        </div>

        {/* Detail */}
        <div className="overflow-hidden rounded-2xl border border-gray-100 shadow-lg">
          <div className="relative h-48 lg:h-64">
            <img
              key={study.image}
              src={study.image}
              alt={study.title}
              width={1200}
              height={800}
              className="h-full w-full animate-fade-in object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#05132b] via-[#05132b]/50 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-7">
              <h3 className="mb-3 text-xl font-bold text-white lg:text-2xl">{study.title}</h3>
              <div className="flex flex-wrap gap-2">
                {study.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-medium text-white backdrop-blur-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="grid gap-x-10 gap-y-7 bg-white p-7 md:grid-cols-2 lg:p-9">
            {detail.map((row) => (
              <div key={row.label}>
                <div className="mb-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#00a3e0]">
                  {row.label}
                </div>
                <p className="text-sm leading-relaxed text-gray-600">{row.value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Link
            to={`/work/${study.slug}`}
            className="group inline-flex items-center gap-2.5 rounded-lg px-7 py-3.5 font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_34px_-14px_rgba(0,80,169,0.9)]"
            style={{ background: 'linear-gradient(120deg, #012f62, #0055b4)' }}
          >
            Read the full case study
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
          <Link
            to="/work"
            className="group inline-flex items-center gap-2 rounded-lg border-2 border-[#0050a9]/20 px-7 py-3.5 font-semibold text-[#0050a9] transition-all duration-300 hover:border-[#0050a9] hover:bg-[#0050a9] hover:text-white"
          >
            All Work
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  )
}
