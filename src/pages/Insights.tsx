import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  Calendar,
  Clock,
  Linkedin,
  Globe,
  Users,
  Briefcase,
  MapPin,
  CalendarCheck,
  Handshake,
  CheckCircle2,
  Newspaper,
} from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import MobileNav from '../components/MobileNav'
import HeroBackdrop, { heroCopyColumn } from '../components/HeroBackdrop'
import LinkedInFeed from '../components/LinkedInFeed'
import StatsBand from '../components/StatsBand'
import NewsletterCTA from '../components/NewsletterCTA'
import { newsArticles } from '../data/news'
import { useBlogs } from '../lib/useContent'
import { totals } from '../config/countAllocations'
import { useCountUp, useInView, parseStat } from '../lib/useCountUp'

/**
 * /insights  one stream for everything JSAN publishes.
 *
 * This used to be two pages behind an Insights dropdown: /insights carried the articles
 * and /news carried company announcements, with the same content half-duplicated on both.
 * They are now a single page, and /news redirects here. Individual articles keep their own
 * URLs  /blogs/<slug> and /news/<slug>  and are still routed.
 *
 * The LinkedIn section stays because the header dropdown that used to link there is gone;
 * this is now the only route to the company page from the site chrome.
 */

const linkedInStats = [
  { icon: Users, number: '5K+', label: 'Followers' },
  { icon: Briefcase, number: '100+', label: 'Posts Yearly' },
  { icon: MapPin, number: '25+', label: 'Countries' },
  { icon: Globe, number: '24/7', label: 'Global Updates' },
]

const companyStats = [
  { number: '9+', label: 'Years in Operation', icon: CalendarCheck },
  { number: '50+', label: 'Global Clients', icon: Handshake },
  { number: '25+', label: 'Countries Served', icon: Globe },
  { number: totals.projects, label: 'Completed Projects', icon: CheckCircle2 },
]

/** One card in the stream, whichever source it came from. */
type Update = {
  kind: 'News' | 'Insight'
  title: string
  description: string
  image: string
  category: string
  date: string
  readTime?: string
  href: string
}

const FILTERS = ['All', 'News', 'Insight'] as const

const formatDate = (value: string) => {
  const parsed = new Date(value)
  if (Number.isNaN(parsed.getTime())) return value
  return parsed.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
}

function LinkedInStat({
  stat,
  index,
  start,
}: {
  stat: { icon: typeof Users; number: string; label: string }
  index: number
  start: boolean
}) {
  const { number, suffix } = parseStat(stat.number)
  const count = useCountUp(number, start, 1400 + index * 120)
  return (
    <div className="group rounded-lg border border-white/20 bg-white/10 p-6 text-center backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-white/40 hover:bg-white/20">
      <stat.icon className="mx-auto mb-4 h-10 w-10 text-white/80 transition-transform duration-300 group-hover:scale-110" />
      <div className="mb-2 text-4xl font-bold tabular-nums text-white">
        {count}
        <span>{suffix}</span>
      </div>
      <div className="text-white">{stat.label}</div>
    </div>
  )
}

export default function Insights() {
  const blogs = useBlogs()
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>('All')
  const { ref: liStatsRef, inView: liStatsInView } = useInView<HTMLDivElement>()

  /* Both sources in one list, newest first. Blogs come from useBlogs so anything
     published through the admin appears here without a rebuild. */
  const updates = useMemo<Update[]>(
    () =>
      [
        ...newsArticles.map((a) => ({
          kind: 'News' as const,
          title: a.title,
          description: a.description,
          image: a.image,
          category: a.category,
          date: a.date,
          href: `/news/${a.slug}`,
        })),
        ...blogs
          .filter((b) => !b.hidden)
          .map((b) => ({
            kind: 'Insight' as const,
            title: b.title,
            description: b.excerpt,
            image: b.image,
            category: b.category,
            date: b.date,
            readTime: b.readTime,
            href: `/blogs/${b.slug}`,
          })),
      ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
    [blogs]
  )

  const featured = updates[0]
  const rest = updates.slice(1)
  const shown = filter === 'All' ? rest : rest.filter((u) => u.kind === filter)

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <section
        className="relative flex min-h-[440px] items-center overflow-hidden bg-[#03142d] pb-12 pt-24 sm:min-h-[500px] sm:pb-16 sm:pt-28 lg:min-h-[580px] lg:pb-20 lg:pt-32"
        style={{ marginTop: '44px' }}
      >
        <HeroBackdrop
          image="https://images.unsplash.com/photo-1432821596592-e2c18b78144f?w=1600&auto=format&fit=crop"
          imageAlt="JSAN insights and company news"
        />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-6">
          <div className={heroCopyColumn()}>
            <span className="mb-5 inline-flex items-center gap-2 t-label text-[#00d4ff]">
              <Newspaper className="h-4 w-4 text-[#00d4ff]" aria-hidden="true" />
              Insights
            </span>
            <h1 className="mb-4 text-[27px] font-bold leading-[1.14] tracking-tight text-white sm:mb-5 sm:text-[32px] sm:leading-[1.1] lg:text-[52px]">
              Insights &amp; Announcements
            </h1>
            <p className="max-w-2xl text-[15px] leading-relaxed text-white/75 sm:text-lg">
              Field perspectives on geospatial intelligence, digital transformation and
              enterprise innovation, alongside company news  in one place, newest first.
            </p>
          </div>
        </div>
      </section>

      {/* Featured  the newest thing published, whichever stream it came from */}
      {featured && (
        <section className="bg-white py-16">
          <div className="mx-auto max-w-7xl px-6">
            <Link
              to={featured.href}
              className="group flex flex-col overflow-hidden rounded-2xl border border-gray-100 shadow-lg lg:flex-row"
            >
              <div className="relative min-h-[260px] w-full overflow-hidden bg-gray-50 lg:max-h-[440px] lg:w-2/5">
                <img
                  src={featured.image}
                  alt={featured.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute left-4 top-4 flex items-center gap-2">
                  <span
                    className={`rounded-full px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider ${
                      featured.kind === 'News' ? 'bg-[#00d4ff] text-[#012f62]' : 'bg-[#0050a9] text-white'
                    }`}
                  >
                    {featured.kind}
                  </span>
                  <span className="rounded-full bg-white/90 px-3 py-1.5 text-[10px] font-semibold text-[#0050a9] backdrop-blur-md">
                    {featured.category}
                  </span>
                </div>
              </div>

              <div className="flex w-full flex-col justify-center p-8 lg:w-3/5 lg:p-12">
                <span className="mb-2 text-xs font-bold uppercase tracking-widest text-[#0050a9]">
                  Latest
                </span>
                <h2 className="mb-4 text-2xl font-bold leading-tight text-gray-900 transition-colors group-hover:text-[#0050a9] lg:text-3xl">
                  {featured.title}
                </h2>
                <p className="mb-5 leading-relaxed text-gray-600">{featured.description}</p>
                <div className="mb-6 flex items-center gap-4 text-sm text-gray-400">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-4 w-4" />
                    {formatDate(featured.date)}
                  </span>
                  {featured.readTime && (
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-4 w-4" />
                      {featured.readTime}
                    </span>
                  )}
                </div>
                <span className="inline-flex items-center gap-2 font-semibold text-[#0050a9] transition-all group-hover:gap-3">
                  {featured.kind === 'News' ? 'Read the story' : 'Read article'}
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* The stream */}
      <section id="newsroom" className="scroll-mt-28 bg-gray-50 py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-10 text-center">
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#00d4ff]">
              Newsroom
            </span>
            <h2 className="text-gradient mb-4 mt-4 text-[32px] font-bold lg:text-[42px]">
              Latest Updates
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              Company announcements and field insights, newest first.
            </p>
          </div>

          <div className="mb-10 flex flex-wrap justify-center gap-2.5">
            {FILTERS.map((f) => {
              const isActive = filter === f
              const count = f === 'All' ? rest.length : rest.filter((u) => u.kind === f).length
              return (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`inline-flex items-center gap-2 rounded-full border px-5 py-2 text-sm font-semibold transition-all duration-300 ${
                    isActive
                      ? 'border-transparent text-white shadow-[0_10px_24px_-12px_rgba(0,80,169,0.95)]'
                      : 'border-gray-200 bg-white text-[#0050a9] hover:-translate-y-0.5 hover:border-[#0050a9]/40 hover:shadow-md'
                  }`}
                  style={isActive ? { background: 'linear-gradient(120deg, #012f62, #0055b4)' } : undefined}
                >
                  {f === 'Insight' ? 'Insights' : f}
                  <span className={isActive ? 'text-[#00d4ff]' : 'text-gray-400'}>{count}</span>
                </button>
              )
            })}
          </div>

          <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
            {shown.map((update) => (
              <Link
                key={update.href}
                to={update.href}
                className="group relative flex h-[400px] flex-col justify-end overflow-hidden rounded-2xl shadow-md transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_28px_55px_-20px_rgba(1,47,98,0.7)]"
              >
                <img
                  src={update.image}
                  alt={update.title}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#012f62] via-[#012f62]/70 to-[#012f62]/10 transition-all duration-500 group-hover:via-[#012f62]/80" />
                <span className="pointer-events-none absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-transparent via-[#00d4ff] to-transparent transition-transform duration-500 group-hover:scale-x-100" />

                <div className="absolute left-5 top-5 flex items-center gap-2">
                  <span
                    className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${
                      update.kind === 'News'
                        ? 'bg-[#00d4ff] text-[#012f62]'
                        : 'border border-white/20 bg-white/15 text-white backdrop-blur-md'
                    }`}
                  >
                    {update.kind}
                  </span>
                  <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[10px] font-semibold text-white backdrop-blur-md">
                    {update.category}
                  </span>
                </div>

                <div className="relative p-6">
                  <div className="mb-3 flex items-center gap-4 text-[11px] text-white/70">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5" />
                      {formatDate(update.date)}
                    </span>
                    {update.readTime && (
                      <span className="flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5" />
                        {update.readTime}
                      </span>
                    )}
                  </div>

                  <h3 className="mb-3 text-xl font-bold leading-snug text-white">{update.title}</h3>
                  <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-white/75">
                    {update.description}
                  </p>
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#00d4ff]">
                    {update.kind === 'News' ? 'Read the story' : 'Read article'}
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {shown.length === 0 && (
            <p className="py-16 text-center text-gray-500">Nothing in this category yet.</p>
          )}
        </div>
      </section>

      <StatsBand items={companyStats} eyebrow="JSAN at a Glance" />

      {/* LinkedIn  the header dropdown that used to link here is gone, so this is it */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0077b5] to-[#005885] py-20">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <div className="mb-6 flex items-center gap-3">
                <Linkedin className="h-12 w-12 text-white" />
                <span className="text-2xl font-bold text-white">Follow Us on LinkedIn</span>
              </div>
              <h2 className="mb-6 text-[32px] font-bold leading-tight text-white lg:text-[42px]">
                Stay connected for the latest updates
              </h2>
              <p className="mb-8 text-xl leading-relaxed text-white/80">
                Join our growing community on LinkedIn for real-time updates on job
                opportunities, industry insights, project highlights, and company news from
                around the globe.
              </p>
              <a
                href="https://www.linkedin.com/company/jsan-consulting-group/posts/?feedView=all"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 rounded bg-white px-8 py-4 text-lg font-semibold text-[#0077b5] transition-colors hover:bg-gray-100"
              >
                <Linkedin className="h-6 w-6" />
                Follow JSAN
                <ArrowRight className="h-5 w-5" />
              </a>
            </div>

            <div ref={liStatsRef} className="grid grid-cols-2 gap-6">
              {linkedInStats.map((stat, index) => (
                <LinkedInStat key={stat.label} stat={stat} index={index} start={liStatsInView} />
              ))}
            </div>
          </div>

          <LinkedInFeed />
        </div>
      </section>

      <NewsletterCTA />

      <Footer />
      <MobileNav />
    </div>
  )
}
