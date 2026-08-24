import { Link } from 'react-router-dom'
import { ArrowRight, Calendar, Clock } from 'lucide-react'
import blogs from '../data/blogs'
import { newsArticles } from '../data/news'

function formatDate(value: string) {
  const parsed = new Date(value)
  if (Number.isNaN(parsed.getTime())) return value
  return parsed.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

const latestBlogs = blogs
  .filter((blog) => !blog.hidden)
  .slice()
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  .slice(0, 3)

const latestNews = newsArticles[0]
const lead = latestBlogs[0]
const others = latestBlogs.slice(1)

export default function InsightsTeaser() {
  if (latestBlogs.length === 0) return null

  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#00d4ff]">
              Insights
            </span>
            <h2 className="text-gradient mb-3 mt-4 text-[36px] font-bold lg:text-[42px]">
              Insights from the field
            </h2>
            <p className="max-w-2xl text-lg text-gray-600">
              What our teams are learning across geospatial delivery, network intelligence and workforce programmes.
            </p>
          </div>
          <Link
            to="/blogs"
            className="group inline-flex shrink-0 items-center gap-2 rounded-xl border-2 border-[#0050a9] px-6 py-3 text-sm font-semibold text-[#0050a9] transition-all duration-300 hover:bg-[#0050a9] hover:text-white"
          >
            All Insights
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Magazine layout: one lead story, the rest as compact rows */}
        <div className="grid grid-cols-1 gap-7 lg:grid-cols-12">
          {lead && (
            <Link
              to={`/blogs/${lead.slug}`}
              className="group relative flex h-[420px] flex-col justify-end overflow-hidden rounded-2xl shadow-md transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_28px_55px_-20px_rgba(1,47,98,0.7)] lg:col-span-7 lg:h-[460px]"
            >
              <img
                src={lead.image}
                alt={lead.title}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#012f62] via-[#012f62]/65 to-[#012f62]/5 transition-all duration-500 group-hover:via-[#012f62]/80" />
              <span className="pointer-events-none absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-transparent via-[#00d4ff] to-transparent transition-transform duration-500 group-hover:scale-x-100" />

              <span className="absolute left-6 top-6 rounded-full border border-white/20 bg-white/15 px-3 py-1 text-[11px] font-semibold text-white backdrop-blur-md">
                {lead.category}
              </span>

              <div className="relative p-7 lg:p-9">
                <div className="mb-3 flex items-center gap-4 text-xs text-white/70">
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5" />
                    {formatDate(lead.date)}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5" />
                    {lead.readTime}
                  </span>
                </div>

                <h3 className="mb-3 text-2xl font-bold leading-snug text-white lg:text-3xl">
                  {lead.title}
                </h3>
                <p className="mb-5 line-clamp-2 max-w-xl text-sm leading-relaxed text-white/80">
                  {lead.excerpt}
                </p>

                <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#00d4ff]">
                  Read article
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
                </span>
              </div>
            </Link>
          )}

          <div className="flex flex-col gap-5 lg:col-span-5">
            {others.map((blog) => (
              <Link
                key={blog.slug}
                to={`/blogs/${blog.slug}`}
                className="group flex flex-1 items-stretch gap-5 overflow-hidden rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-[#0050a9]/25 hover:shadow-[0_20px_40px_-18px_rgba(0,80,169,0.55)]"
              >
                <div className="relative w-32 shrink-0 overflow-hidden rounded-xl sm:w-40">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-110"
                  />
                </div>

                <div className="flex min-w-0 flex-1 flex-col justify-center py-1">
                  <span className="mb-2 text-[10px] font-bold uppercase tracking-widest text-[#00d4ff]">
                    {blog.category}
                  </span>
                  <h3 className="mb-2 line-clamp-2 text-base font-bold leading-snug text-[#0050a9] transition-colors group-hover:text-[#012f62]">
                    {blog.title}
                  </h3>
                  <div className="mb-3 flex items-center gap-4 text-[11px] text-gray-500">
                    <span className="inline-flex items-center gap-1.5">
                      <Calendar className="h-3 w-3" />
                      {formatDate(blog.date)}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Clock className="h-3 w-3" />
                      {blog.readTime}
                    </span>
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0050a9]">
                    Read article
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Latest company news */}
        {latestNews && (
          <Link
            to={`/news/${latestNews.slug}`}
            className="group mt-8 flex flex-col items-start gap-4 rounded-2xl border border-blue-100 bg-blue-50/60 p-6 transition-all duration-300 hover:border-[#0050a9]/30 hover:bg-blue-50 md:flex-row md:items-center"
          >
            <span className="rounded-full bg-[#0050a9] px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white">
              Latest News
            </span>
            <span className="flex-1 font-semibold text-[#0050a9]">{latestNews.title}</span>
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#0050a9]">
              Read
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </Link>
        )}
      </div>
    </section>
  )
}
