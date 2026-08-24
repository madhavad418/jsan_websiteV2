import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Calendar, Clock, User } from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import MobileNav from '../components/MobileNav'
import { type BlogBlock } from '../data/blogs'
import { useBlogs } from '../lib/useContent'

export default function BlogDetail() {
  const { slug } = useParams<{ slug: string }>()
  const blogs = useBlogs()
  const blog = blogs.find(b => b.slug === slug)

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]" style={{ marginTop: '88px' }}>
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Article Not Found</h1>
            <Link to="/blogs" className="text-[#0050a9] hover:underline">← Back to Blog</Link>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  const otherBlogs = blogs.filter(b => b.slug !== slug && !b.hidden).slice(0, 3)

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden pt-28 lg:pt-36 pb-20 lg:pb-28" style={{ marginTop: '44px' }}>
        <div className="absolute inset-0">
          <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(120deg, rgba(1,47,98,0.92), rgba(0,85,180,0.8))' }} />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <Link to="/blogs" className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-6 text-sm transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Blog
          </Link>
          <span className="inline-block bg-white/20 text-white text-xs font-bold px-3 py-1.5 rounded-full mb-4">{blog.category}</span>
          <h1 className="text-white text-[32px] md:text-[42px] lg:text-[48px] font-bold leading-[1.15] mb-6 tracking-tight">
            {blog.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-white/70 text-sm">
            <span className="flex items-center gap-1.5"><User className="w-4 h-4" />{blog.author}</span>
            <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" />{formatDate(blog.date)}</span>
            <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" />{blog.readTime}</span>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 relative overflow-hidden">
        {blog.backgroundImage && (
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `url(${blog.backgroundImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              opacity: 0.12,
            }}
          />
        )}
        <div className="max-w-3xl mx-auto px-6 relative z-10">
          {typeof blog.content === 'string' ? (
            <p className="text-gray-700 text-lg leading-relaxed text-justify mb-8">{blog.content}</p>
          ) : (
            blog.content.map((block: BlogBlock, idx: number) => {
              if (block.type === 'heading') {
                return (
                  <h2 key={idx} className="text-gray-900 text-2xl md:text-[28px] font-bold mt-10 mb-4 tracking-tight">
                    {block.text}
                  </h2>
                )
              }
              if (block.type === 'point') {
                return (
                  <p key={idx} className="text-gray-700 text-lg leading-relaxed text-justify mb-5">
                    <span className="font-semibold text-gray-900">{block.lead}:</span> {block.text}
                  </p>
                )
              }
              if (block.type === 'image') {
                return (
                  <figure key={idx} className="my-8">
                    <img
                      src={block.url}
                      alt={block.alt || block.caption || ''}
                      loading="lazy"
                      className="w-full rounded-xl shadow-md"
                    />
                    {block.caption && (
                      <figcaption className="text-center text-sm text-gray-500 mt-3">{block.caption}</figcaption>
                    )}
                  </figure>
                )
              }
              return (
                <p key={idx} className="text-gray-700 text-lg leading-relaxed text-justify mb-6">
                  {block.text}
                </p>
              )
            })
          )}
        </div>
      </section>

      {/* Related */}
      {otherBlogs.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-2xl font-bold text-gradient mb-10 text-center">More Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {otherBlogs.map((b, i) => (
                <Link
                  key={i}
                  to={`/blogs/${b.slug}`}
                  className="group bg-white rounded-2xl overflow-hidden shadow-md transition-all duration-500 border border-gray-100 hover:-translate-y-1.5 hover:border-[#0050a9]/25 hover:shadow-[0_24px_50px_-20px_rgba(0,80,169,0.55)]"
                >
                  <div className="h-40 overflow-hidden">
                    <img src={b.image} alt={b.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[900ms] ease-out" />
                  </div>
                  <div className="p-5">
                    <h3 className="text-base font-bold text-gray-900 mb-2 group-hover:text-[#0050a9] transition-colors leading-snug">{b.title}</h3>
                    <span className="text-gray-400 text-xs">{formatDate(b.date)}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
      <MobileNav />
    </div>
  )
}
