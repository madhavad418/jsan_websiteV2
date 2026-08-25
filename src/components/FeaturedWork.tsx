import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import SectionLabel from './SectionLabel'
import { caseStudies } from '../data/work'

/**
 * SECTION 08  FEATURED WORK
 *
 * Three photographs, each one a link into its case study at /work/<slug>.
 *
 * The homepage used to carry the whole case study inline  challenge, role, operating
 * model, technology, scale and outcome, for whichever tab was selected. That is the case
 * study page's job. Here the picture and the programme name are enough to decide whether
 * to open it, and the page reads as work rather than as a document.
 *
 * Content comes from src/data/work.ts, so this and the case study pages cannot drift.
 */
export default function FeaturedWork() {
  return (
    <section className="section-y bg-white">
      <div className="mx-auto max-w-7xl px-6">
        {/* Heading left, the way through to everything else on the right. */}
        <div className="mb-10 flex flex-col gap-8 lg:mb-14 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
          <div className="max-w-3xl">
            <SectionLabel>Featured Work</SectionLabel>
            <h2 className="t-section mb-7 text-[#0a1a3a]">
              Operational capability demonstrated in the real world
            </h2>
            <p className="t-body measure text-gray-600">
              Programmes are shown anonymised where client naming permission is not yet in place.
            </p>
          </div>

          <Link
            to="/work"
            className="group inline-flex min-h-[52px] shrink-0 items-center gap-2.5 rounded-full bg-[#0050a9] px-8 font-semibold text-white transition-colors duration-300 hover:bg-[#013e82]"
          >
            All work
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {caseStudies.map((cs) => (
            <Link
              key={cs.slug}
              to={`/work/${cs.slug}`}
              className="group relative flex h-[380px] flex-col justify-end overflow-hidden rounded-2xl lg:h-[460px]"
            >
              <img
                src={cs.image}
                alt=""
                aria-hidden="true"
                width={1200}
                height={800}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]"
              />
              {/* The label sits on the photograph rather than under it, so the card stays
                  a picture and the type still has something to read against. */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#05132b] via-[#05132b]/55 to-transparent transition-colors duration-500 group-hover:from-[#05132b] group-hover:via-[#05132b]/70" />

              <div className="relative p-7">
                <div className="mb-3 t-label text-white/60">Case Study {cs.number}</div>
                <h3 className="t-sub mb-5 text-white">{cs.title}</h3>
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-white">
                  Read the case study
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
