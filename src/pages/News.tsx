import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Calendar, ArrowRight, ArrowLeft, Linkedin, Globe, Users, Briefcase, MapPin, CalendarCheck, Handshake, CheckCircle2 } from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import MobileNav from '../components/MobileNav'
import { newsArticles, type NewsArticle } from '../data/news'
import blogs from '../data/blogs'
import LinkedInFeed from '../components/LinkedInFeed'
import StatsBand from '../components/StatsBand'
import NewsletterCTA from '../components/NewsletterCTA'
import { useCountUp, useInView, parseStat } from '../lib/useCountUp'

const linkedInStats = [
  { icon: Users, number: '5K+', label: 'Followers' },
  { icon: Briefcase, number: '100+', label: 'Posts Yearly' },
  { icon: MapPin, number: '25+', label: 'Countries' },
  { icon: Globe, number: '24/7', label: 'Global Updates' },
]

const companyStats = [
  { number: '7+', label: 'Years in Operation', icon: CalendarCheck },
  { number: '50+', label: 'Global Clients', icon: Handshake },
  { number: '25+', label: 'Countries Served', icon: Globe },
  { number: '500+', label: 'Completed Projects', icon: CheckCircle2 },
]
export type { NewsArticle }
export { newsArticles }

const featuredNews = newsArticles.find((a) => a.featured) ?? newsArticles[0]


/* The newsroom stream: company announcements plus published insights, newest
   first. Without this the page shows a single article and a lot of white space. */
type Update = {
  kind: 'News' | 'Insight'
  title: string
  description: string
  image: string
  category: string
  date: string
  href: string
}

const updates: Update[] = [
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
      href: `/blogs/${b.slug}`,
    })),
].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

const updateFilters = ['All', 'News', 'Insight'] as const

const formatUpdateDate = (value: string) => {
  const parsed = new Date(value)
  if (Number.isNaN(parsed.getTime())) return value
  return parsed.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
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
      <div className="mb-2 text-4xl font-bold text-white tabular-nums">
        {count}
        <span>{suffix}</span>
      </div>
      <div className="text-white">{stat.label}</div>
    </div>
  )
}

export default function News() {
  const [updateFilter, setUpdateFilter] = useState<(typeof updateFilters)[number]>('All')
  const { ref: liStatsRef, inView: liStatsInView } = useInView<HTMLDivElement>()


  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section
        className="relative flex min-h-[560px] items-center overflow-hidden pt-28 lg:pt-32 pb-20"
        style={{ marginTop: '44px' }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#012f62] via-[#0a1a3a] to-[#0055b4]">
          <div
            className="absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.7) 1px, transparent 1px)',
              backgroundSize: '56px 56px',
            }}
          />
          <div
            className="absolute -left-32 -top-32 h-[460px] w-[460px] rounded-full animate-pulse-slow"
            style={{ background: 'radial-gradient(circle, rgba(0,212,255,0.22), transparent 65%)' }}
          />
          <div
            className="absolute -bottom-40 right-0 h-[520px] w-[520px] rounded-full animate-pulse-slow"
            style={{ background: 'radial-gradient(circle, rgba(0,212,255,0.14), transparent 65%)' }}
          />
        </div>

        {/* Sub-header bar */}
        <div className="absolute top-0 left-0 right-0 bg-black/20 backdrop-blur-sm">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
            <span className="font-medium text-white/90">News &amp; Updates</span>
            <Link
              to="/contact"
              className="group flex items-center gap-2 rounded border border-white/30 bg-white/10 px-4 py-2 text-white transition-all duration-300 hover:border-white/60 hover:bg-white/20"
            >
              Contact
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-6 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#00d4ff]">
              JSAN Newsroom
            </span>
            <h1 className="mb-6 mt-4 text-[42px] font-bold leading-[1.1] text-white lg:text-[56px]">
              News &amp; Updates
            </h1>
            <p className="mb-8 max-w-xl text-lg leading-relaxed text-white/80">
              Innovations, partnerships and company milestones shaping the future of geospatial
              technology.
            </p>

            {/* Live counts + jump links */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-white backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00d4ff] opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#00d4ff]" />
                </span>
                {updates.length} updates published
              </span>
              <a
                href="#newsroom"
                className="group inline-flex items-center gap-2 rounded-full bg-white px-5 py-2 text-sm font-semibold text-[#0050a9] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_26px_-10px_rgba(0,212,255,0.9)]"
              >
                Browse the newsroom
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </div>
          </div>

          {/* Latest update preview */}
          {updates[0] && (
            <Link
              to={updates[0].href}
              className="group relative hidden overflow-hidden rounded-2xl border border-white/15 bg-white/[0.07] p-5 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1.5 hover:border-[#00d4ff]/40 hover:bg-white/[0.12] lg:col-span-5 lg:block"
            >
              <span className="mb-4 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-[#00d4ff]">
                Latest update
              </span>

              <div className="mb-4 h-40 overflow-hidden rounded-xl">
                <img
                  src={updates[0].image}
                  alt={updates[0].title}
                  className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-110"
                />
              </div>

              <div className="mb-2 flex items-center gap-3 text-[11px] text-white/60">
                <span className="rounded-full bg-[#00d4ff]/20 px-2.5 py-1 font-semibold text-[#00d4ff]">
                  {updates[0].kind}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" />
                  {formatUpdateDate(updates[0].date)}
                </span>
              </div>

              <h2 className="mb-3 text-lg font-bold leading-snug text-white">{updates[0].title}</h2>

              <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#00d4ff]">
                Read now
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
              </span>
            </Link>
          )}
        </div>
      </section>

      {/* Featured News */}
      {/* Featured story */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-6">
          <Link
            to={`/news/${featuredNews.slug}`}
            className="group relative flex min-h-[420px] flex-col justify-end overflow-hidden rounded-2xl shadow-lg transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_30px_60px_-22px_rgba(1,47,98,0.75)] lg:min-h-[480px]"
          >
            <img
              src={featuredNews.image}
              alt={featuredNews.title}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#012f62] via-[#012f62]/70 to-[#012f62]/10 lg:bg-gradient-to-r lg:from-[#012f62] lg:via-[#012f62]/80 lg:to-transparent" />
            <span className="pointer-events-none absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-transparent via-[#00d4ff] to-transparent transition-transform duration-500 group-hover:scale-x-100" />

            <div className="relative max-w-2xl p-8 lg:p-12">
              <div className="mb-4 flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-[#00d4ff] px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#012f62]">
                  Featured
                </span>
                <span className="rounded-full border border-white/20 bg-white/15 px-3 py-1 text-[11px] font-semibold text-white backdrop-blur-md">
                  {featuredNews.category}
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs text-white/70">
                  <Calendar className="h-3.5 w-3.5" />
                  {featuredNews.date}
                </span>
              </div>

              <h2 className="mb-4 text-3xl font-bold leading-tight text-white lg:text-[42px]">
                {featuredNews.title}
              </h2>
              <p className="mb-6 text-base leading-relaxed text-white/80 lg:text-lg">
                {featuredNews.description}
              </p>

              <span className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-[#0050a9] transition-all duration-300 group-hover:-translate-y-0.5 group-hover:shadow-[0_12px_26px_-10px_rgba(0,212,255,0.9)]">
                Read the full story
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </div>
          </Link>
        </div>
      </section>

      {/* Newsroom stream */}
      <section id="newsroom" className="scroll-mt-28 bg-gray-50 py-20">
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
            {updateFilters.map((filter) => {
              const isActive = updateFilter === filter
              const count =
                filter === 'All' ? updates.length : updates.filter((u) => u.kind === filter).length
              return (
                <button
                  key={filter}
                  onClick={() => setUpdateFilter(filter)}
                  className={`inline-flex items-center gap-2 rounded-full border px-5 py-2 text-sm font-semibold transition-all duration-300 ${
                    isActive
                      ? 'border-transparent text-white shadow-[0_10px_24px_-12px_rgba(0,80,169,0.95)]'
                      : 'border-gray-200 bg-white text-[#0050a9] hover:-translate-y-0.5 hover:border-[#0050a9]/40 hover:shadow-md'
                  }`}
                  style={isActive ? { background: 'linear-gradient(120deg, #012f62, #0055b4)' } : undefined}
                >
                  {filter === 'Insight' ? 'Insights' : filter}
                  <span className={isActive ? 'text-[#00d4ff]' : 'text-gray-400'}>{count}</span>
                </button>
              )
            })}
          </div>

          <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
            {updates
              .filter((u) => updateFilter === 'All' || u.kind === updateFilter)
              .map((update) => (
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
                    <span className="mb-3 inline-flex items-center gap-1.5 text-[11px] text-white/70">
                      <Calendar className="h-3.5 w-3.5" />
                      {formatUpdateDate(update.date)}
                    </span>
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
        </div>
      </section>

      <StatsBand items={companyStats} eyebrow="JSAN at a Glance" />

      {/* News Grid  only shown when there are non-featured stories */}
      {/* LinkedIn Section */}
      <section className="py-20 bg-gradient-to-br from-[#0077b5] to-[#005885] relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Linkedin className="w-12 h-12 text-white" />
                <span className="text-white text-2xl font-bold">Follow Us on LinkedIn</span>
              </div>
              <h2 className="text-white text-[32px] lg:text-[42px] font-bold leading-tight mb-6">
                Stay connected for the latest updates
              </h2>
              <p className="text-white/80 text-xl leading-relaxed mb-8">
                Join our growing community on LinkedIn for real-time updates on job opportunities, industry insights, project highlights, and company news from around the globe.
              </p>
              <a
                href="https://www.linkedin.com/company/jsan-consulting"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-white text-[#0077b5] px-8 py-4 rounded font-semibold text-lg hover:bg-gray-100 transition-colors"
              >
                <Linkedin className="w-6 h-6" />
                Follow JSAN
                <ArrowRight className="w-5 h-5" />
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

// Full-article view rendered at /news/:slug
export function NewsDetail() {
  const { slug } = useParams<{ slug: string }>()
  const article = newsArticles.find((a) => a.slug === slug)

  if (!article) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <section className="max-w-3xl mx-auto px-6 py-32 text-center" style={{ marginTop: '44px' }}>
          <h1 className="text-[#0050a9] text-3xl font-bold mb-4">Article not found</h1>
          <p className="text-gray-600 mb-8">
            The news article you are looking for may have moved or no longer exists.
          </p>
          <Link
            to="/news"
            className="inline-flex items-center gap-2 bg-[#0050a9] text-white px-6 py-3 rounded font-semibold hover:bg-[#153a62] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to News
          </Link>
        </section>
        <Footer />
        <MobileNav />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Article Hero */}
      <section className="relative overflow-hidden pt-28 lg:pt-32 pb-16 bg-gradient-to-br from-[#0050a9] via-[#0a1a3a] to-[#0050a9]" style={{ marginTop: '44px' }}>
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
        <div className="max-w-3xl mx-auto px-6 relative z-10">
          <Link to="/news" className="inline-flex items-center gap-2 text-white/80 hover:text-white text-sm font-medium mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to News
          </Link>
          <div className="flex items-center gap-4 mb-5">
            <span className="bg-white/15 text-white px-3 py-1 text-sm font-medium rounded">
              {article.category}
            </span>
            <span className="flex items-center gap-2 text-white/80 text-sm">
              <Calendar className="w-4 h-4" />
              {article.date}
            </span>
          </div>
          <h1 className="text-white text-[32px] lg:text-[44px] font-bold leading-[1.15]">
            {article.title}
          </h1>
        </div>
      </section>

      {/* Article Body */}
      <article className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <div className="relative overflow-hidden rounded-lg mb-10">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-[280px] lg:h-[400px] object-cover"
            />
          </div>
          <p className="text-gray-700 text-xl leading-relaxed mb-8 font-medium">
            {article.description}
          </p>
          <div className="space-y-6">
            {article.body.map((paragraph, index) => (
              <p key={index} className="text-gray-700 text-lg leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <Link to="/news" className="inline-flex items-center gap-2 text-[#0050a9] font-semibold hover:gap-3 transition-all">
              <ArrowLeft className="w-4 h-4" />
              Back to all news
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-[#0050a9] text-white px-6 py-3 rounded font-semibold hover:bg-[#153a62] transition-colors"
            >
              Contact Media Relations
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </article>

      <Footer />
      <MobileNav />
    </div>
  )
}
