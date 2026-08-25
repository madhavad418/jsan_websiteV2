import { Link, useLocation } from 'react-router-dom'
import { ArrowRight, Compass } from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import MobileNav from '../components/MobileNav'
import NoIndex from '../components/NoIndex'

/**
 * The catch-all. Before this existed an unknown URL matched no route and rendered a blank
 * page  200 OK, no content, nothing to click. Now it says what happened, is marked
 * noindex, and offers the six destinations that cover the site.
 *
 * `gone` is passed by routes for content that has been removed rather than mistyped, so
 * the wording and the reported status match what the server sends.
 */
const destinations = [
  { name: 'Capabilities', href: '/capabilities', detail: 'What JSAN does, in six pillars' },
  { name: 'Industries', href: '/industries', detail: 'Programmes by sector' },
  { name: 'Work', href: '/work', detail: 'Case studies' },
  { name: 'Insights', href: '/insights', detail: 'Articles and company news' },
  { name: 'Careers', href: '/careers', detail: 'Open roles' },
  { name: 'Contact', href: '/contact', detail: 'Discuss a program' },
]

export default function NotFound({ gone = false }: { gone?: boolean }) {
  const { pathname } = useLocation()

  return (
    <div className="min-h-screen bg-white">
      <NoIndex status={gone ? 410 : 404} />
      <Header />

      <main className="px-6 pb-20 pt-32 lg:pb-28 lg:pt-40" style={{ marginTop: '44px' }}>
        <div className="mx-auto max-w-3xl">
          <span className="mb-4 inline-flex items-center gap-2 t-label text-gray-500">
            <Compass className="h-4 w-4" />
            {gone ? 'Page removed' : 'Page not found'}
          </span>

          <h1 className="mb-5 text-[34px] font-bold leading-[1.08] text-[#0a1a3a] lg:text-[46px]">
            {gone ? 'This page is no longer published.' : 'We could not find that page.'}
          </h1>

          <p className="mb-3 text-lg leading-relaxed text-gray-600">
            {gone
              ? 'The content that used to live here has been retired. Nothing has replaced it directly, so rather than send you somewhere misleading, here is the rest of the site.'
              : 'The link may be out of date, or the address may have a typo in it. Here is where everything lives now.'}
          </p>
          <p className="mb-12 break-all font-mono text-sm text-gray-400">{pathname}</p>

          <div className="grid gap-4 sm:grid-cols-2">
            {destinations.map((d) => (
              <Link
                key={d.href}
                to={d.href}
                className="group flex min-h-[44px] items-center justify-between gap-4 rounded-xl border border-gray-200 bg-white p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#0050a9]/30 hover:shadow-md"
              >
                <span>
                  <span className="block font-bold text-[#0a1a3a]">{d.name}</span>
                  <span className="text-sm text-gray-600">{d.detail}</span>
                </span>
                <ArrowRight className="h-4 w-4 shrink-0 text-[#0050a9] transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            ))}
          </div>
        </div>
      </main>

      <Footer />
      <MobileNav />
    </div>
  )
}
