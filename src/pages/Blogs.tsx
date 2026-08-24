import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Clock, Calendar } from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import MobileNav from '../components/MobileNav'
import { useBlogs } from '../lib/useContent'

export default function Blogs() {
  const blogs = useBlogs()
  const sorted = [...blogs]
    .filter(b => !b.hidden)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  const featured = sorted[0]
  const rest = sorted.slice(1)

  const [activeCategory, setActiveCategory] = useState('All')
  const categories = useMemo(
    () => ['All', ...Array.from(new Set(rest.map((b) => b.category)))],
    [rest]
  )
  const filtered = activeCategory === 'All' ? rest : rest.filter((b) => b.category === activeCategory)

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden pt-28 lg:pt-36 pb-20 lg:pb-28" style={{ marginTop: '44px' }}>
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1432821596592-e2c18b78144f?w=1600&auto=format&fit=crop"
            alt="Blog"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(120deg, rgba(1,47,98,0.92), rgba(0,85,180,0.8))' }} />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <span className="inline-block text-[#00d4ff] font-bold text-sm uppercase tracking-widest mb-4">Insights</span>
          <h1 className="text-white text-[36px] md:text-[48px] lg:text-[56px] font-bold leading-[1.1] mb-6 tracking-tight">
            Insights & Perspectives
          </h1>
          <p className="text-white/80 text-lg md:text-xl leading-relaxed max-w-3xl">
            Expert insights on technology, geospatial intelligence, digital transformation, and enterprise innovation from the JSAN team.
          </p>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row rounded-2xl overflow-hidden border border-gray-100 shadow-lg group">
            <div className="relative w-full lg:w-2/5 min-h-[260px] lg:max-h-[440px] overflow-hidden bg-gray-50">
              <img
                src={featured.image}
                alt={featured.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute top-4 left-4">
                <span className="bg-[#0050a9] text-white text-xs font-bold px-3 py-1.5 rounded-full">{featured.category}</span>
              </div>
            </div>
            <div className="w-full lg:w-3/5 p-8 lg:p-12 flex flex-col justify-center">
              <span className="text-[#0050a9] text-xs font-bold uppercase tracking-widest mb-2">Featured</span>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4 leading-tight group-hover:text-[#0050a9] transition-colors">
                {featured.title}
              </h2>
              <p className="text-gray-600 leading-relaxed mb-5">{featured.excerpt}</p>
              <div className="flex items-center gap-4 text-gray-400 text-sm mb-6">
                <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" />{formatDate(featured.date)}</span>
                <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" />{featured.readTime}</span>
              </div>
              <Link
                to={`/blogs/${featured.slug}`}
                className="inline-flex items-center gap-2 text-[#0050a9] font-semibold hover:gap-3 transition-all"
              >
                Read Article <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-[32px] lg:text-[42px] font-bold text-gradient">Latest Articles</h2>
          </div>
          {/* Category filters */}
          <div className="mb-10 flex flex-wrap justify-center gap-2.5">
            {categories.map((category) => {
              const isActive = activeCategory === category
              const count =
                category === 'All' ? rest.length : rest.filter((b) => b.category === category).length
              return (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-all duration-300 ${
                    isActive
                      ? 'border-transparent text-white shadow-[0_10px_24px_-12px_rgba(0,80,169,0.95)]'
                      : 'border-gray-200 bg-white text-[#0050a9] hover:-translate-y-0.5 hover:border-[#0050a9]/40 hover:shadow-md'
                  }`}
                  style={isActive ? { background: 'linear-gradient(120deg, #012f62, #0055b4)' } : undefined}
                >
                  {category}
                  <span className={isActive ? 'text-[#00d4ff]' : 'text-gray-400'}>{count}</span>
                </button>
              )
            })}
          </div>

          {/* Editorial cards: the image is the card, copy sits over it */}
          <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((blog, i) => (
              <Link
                key={i}
                to={`/blogs/${blog.slug}`}
                className="group relative flex h-[420px] flex-col justify-end overflow-hidden rounded-2xl shadow-md transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_28px_55px_-20px_rgba(1,47,98,0.7)]"
              >
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#012f62] via-[#012f62]/70 to-[#012f62]/10 transition-all duration-500 group-hover:from-[#012f62] group-hover:via-[#012f62]/80" />
                <span className="pointer-events-none absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-transparent via-[#00d4ff] to-transparent transition-transform duration-500 group-hover:scale-x-100" />

                <span className="absolute left-5 top-5 rounded-full border border-white/20 bg-white/15 px-3 py-1 text-[11px] font-semibold text-white backdrop-blur-md">
                  {blog.category}
                </span>

                <div className="relative p-6">
                  <div className="mb-3 flex items-center gap-4 text-[11px] text-white/70">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5" />
                      {formatDate(blog.date)}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5" />
                      {blog.readTime}
                    </span>
                  </div>

                  <h3 className="mb-3 text-xl font-bold leading-snug text-white">{blog.title}</h3>
                  <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-white/75">{blog.excerpt}</p>

                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#00d4ff]">
                    Read article
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="py-16 text-center text-gray-500">No articles in this category yet.</p>
          )}
        </div>
      </section>

      <Footer />
      <MobileNav />
    </div>
  )
}
