import { Link } from 'react-router-dom'
import { Play } from 'lucide-react'

// Mirrors the canonical article(s) in src/pages/News.tsx.
// `slug` values must match the articles there so "Know more" opens the story.
const newsItems = [
  {
    slug: 'jsan-launches-modern-vehicle-tracking-platform',
    date: 'Jan 12, 2026',
    type: 'Product Update',
    title: 'JSAN Launches Modern Vehicle Tracking Platform',
    description: 'The new JSAN VTS release adds AI-powered route optimization and real-time fleet analytics for enterprise mobility operators.',
    featured: true,
  },
]

export default function News() {
  const featuredNews = newsItems.find((item) => item.featured)
  const otherNews = newsItems.filter((item) => !item.featured)

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-[40px] lg:text-[47px] font-semibold text-[#0050a9] mb-10">
          News
        </h2>

        <div className={`grid gap-8 ${otherNews.length > 0 ? 'lg:grid-cols-2' : 'lg:grid-cols-1'}`}>
          {/* Featured News */}
          {featuredNews && (
            <div className="border border-gray-200 p-8">
              <div className="flex items-center justify-center h-48 mb-6 bg-gray-50">
                <img
                  src="/jsan_consulting_group_logo.jpg"
                  alt="JSAN"
                  className="h-20 w-auto"
                />
              </div>
              <p className="text-gray-500 text-sm mb-2">
                {featuredNews.type}: {featuredNews.date}
              </p>
              <Link to={`/news/${featuredNews.slug}`}>
                <h3 className="text-2xl font-semibold text-[#0050a9] mb-4 hover:underline cursor-pointer">
                  {featuredNews.title}
                </h3>
              </Link>
              <p className="text-gray-600 mb-4">
                {featuredNews.description}
              </p>
              <Link to={`/news/${featuredNews.slug}`} className="btn-link">
                Know more
                <Play className="w-4 h-4" />
              </Link>
            </div>
          )}

          {/* Other News */}
          {otherNews.length > 0 && (
          <div className="space-y-6">
            {otherNews.map((item) => (
              <div key={item.slug} className="border-b border-gray-200 pb-6">
                <p className="text-gray-500 text-sm mb-2">
                  {item.type}: {item.date}
                </p>
                <Link to={`/news/${item.slug}`}>
                  <h3 className="text-xl font-semibold text-[#0050a9] mb-3 hover:underline cursor-pointer">
                    {item.title}
                  </h3>
                </Link>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {item.description}
                </p>
                <Link to={`/news/${item.slug}`} className="btn-link text-sm">
                  Know more
                  <Play className="w-3 h-3" />
                </Link>
              </div>
            ))}
          </div>
          )}
        </div>

        {/* See All News Link */}
        <div className="mt-10">
          <Link
            to="/news"
            className="inline-flex items-center gap-2 px-6 py-3 border border-gray-300 text-[#0050a9] font-semibold hover:border-[#0050a9] transition-colors"
          >
            See all JSAN news
          </Link>
        </div>
      </div>
    </section>
  )
}
