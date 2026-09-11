import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import NotFound from '../NotFound'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import MobileNav from '../../components/MobileNav'
import ServiceHero from '../../components/ServiceHero'
import TechMatrix from '../../components/TechMatrix'
import ScenarioExplorer from '../../components/ScenarioExplorer'
import ProcessFlow from '../../components/ProcessFlow'
import { deepDiveBySlug, deepDivePages, groupLabel } from '../../data/capabilityDeepDives'

/**
 * The four Technology Support pages: /capabilities/application-support and its siblings.
 *
 * These get a layout of their own rather than the shared CapabilityDetail template, because
 * they are read by a different person for a different reason. Everywhere else on the site
 * the reader is being told what JSAN does; here they are checking two specific things -
 * do you work with my stack, and have you met my problem - and a page of prose answers
 * neither quickly. Hence the two interactive blocks, which are the point of the page:
 * a browsable technology inventory and a set of situations in the customer's own words.
 *
 * One component drives all four. The pages differ only in content, and four near-identical
 * files would have drifted apart within a month.
 */
export default function CapabilityDeepDive({ slug }: { slug: string }) {
  /* The routes are static paths rather than /:slug, so the slug arrives as a prop. */
  const page = deepDiveBySlug(slug)

  if (!page) return <NotFound />

  const siblings = deepDivePages.filter((p) => p.group === page.group && p.slug !== page.slug)

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <ServiceHero
        breadcrumb={page.title}
        eyebrow={groupLabel[page.group]}
        eyebrowIcon={page.eyebrowIcon}
        title={page.title}
        subtitle={page.subtitle}
        description={page.description}
        image={page.image}
        imageAlt={page.imageAlt}
        copySide={page.copySide}
        imagePosition={page.imagePosition}
        secondaryCta={{ label: 'All Capabilities', href: '/capabilities' }}
      />

      {/* Positioning. Three claims, no figures - see the note in technologySupport.ts. */}
      <section className="border-b border-gray-100 bg-[#f7f8fa] py-14 md:py-16">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="grid gap-8 md:grid-cols-3 md:gap-10">
            {page.positioning.map((item) => (
              <div key={item.title}>
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[#0050a9]">
                  <item.icon className="h-5 w-5 text-white" aria-hidden="true" />
                </div>
                <h3 className="mb-2.5 text-[17px] font-bold leading-snug text-[#0a1a3a]">
                  {item.title}
                </h3>
                <p className="text-[15px] leading-relaxed text-gray-600">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <TechMatrix
        eyebrow={page.tech.eyebrow}
        heading={page.tech.heading}
        intro={page.tech.intro}
        groups={page.tech.groups}
      />

      <ScenarioExplorer
        eyebrow={page.scenarios.eyebrow}
        heading={page.scenarios.heading}
        intro={page.scenarios.intro}
        scenarios={page.scenarios.items}
      />

      {/* How the work runs */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="mb-10 max-w-3xl md:mb-12">
            <span className="t-label text-[#00d4ff]">How it runs</span>
            <h2 className="text-gradient mb-4 mt-3 text-[26px] font-bold leading-tight md:text-[34px] lg:text-[40px]">
              {page.workflow.heading}
            </h2>
            <p className="text-[15px] leading-relaxed text-gray-600 md:text-lg">
              {page.workflow.intro}
            </p>
          </div>

          <ProcessFlow steps={page.workflow.steps} tone="light" />
        </div>
      </section>

      {/* Engagement models */}
      <section className="bg-[#f7f8fa] py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="mb-10 max-w-3xl md:mb-12">
            <span className="t-label text-[#00d4ff]">Engagement</span>
            <h2 className="text-gradient mb-4 mt-3 text-[26px] font-bold leading-tight md:text-[34px] lg:text-[40px]">
              {page.engagement.heading}
            </h2>
            <p className="text-[15px] leading-relaxed text-gray-600 md:text-lg">
              {page.engagement.intro}
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {page.engagement.models.map((model) => (
              <div
                key={model.name}
                className="flex flex-col rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg md:p-7"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[#e8f4fc]">
                  <model.icon className="h-5 w-5 text-[#0050a9]" aria-hidden="true" />
                </div>
                <h3 className="mb-2.5 text-lg font-bold text-[#0a1a3a]">{model.name}</h3>
                <p className="text-[15px] leading-relaxed text-gray-600">{model.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Siblings, so the group is navigable without going back to the menu */}
      {siblings.length > 0 && (
      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <span className="t-label text-gray-500">More in {groupLabel[page.group]}</span>
          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {siblings.map((sibling) => (
              <Link
                key={sibling.slug}
                to={`/capabilities/${sibling.slug}`}
                className="group flex items-start gap-4 rounded-2xl border border-gray-200 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#0050a9]/40 hover:shadow-md"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#e8f4fc]">
                  <sibling.eyebrowIcon className="h-4 w-4 text-[#0050a9]" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="mb-1 font-bold text-[#0a1a3a] transition-colors group-hover:text-[#0050a9]">
                    {sibling.navLabel}
                  </h3>
                  <p className="line-clamp-2 text-sm leading-relaxed text-gray-600">
                    {sibling.subtitle}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      )}

      <section className="py-16 md:py-20" style={{ background: 'linear-gradient(120deg, #012f62, #0055b4)' }}>
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 px-6 text-center">
          <h2 className="text-[26px] font-bold leading-tight text-white md:text-[36px]">
            Tell us what you are running, and what it is doing
          </h2>
          <p className="text-[15px] leading-relaxed text-white/75 md:text-lg">
            We will tell you whether it is something we support, what taking it on would
            involve, and where the risk actually sits. No obligation to buy anything.
          </p>
          <Link
            to="/contact"
            className="group inline-flex items-center gap-2.5 rounded-lg bg-white px-5 py-3 text-[15px] font-semibold text-[#0050a9] shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-100 sm:px-7 sm:py-3.5 sm:text-base"
          >
            Talk to Our Team
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </section>

      <Footer />
      <MobileNav />
    </div>
  )
}
