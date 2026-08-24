import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

type Item = {
  slug: string
  category: string
  title: string
  subtitle?: string
  bgImage: string
}

/**
 * "Explore the rest of this service" strip for sub-service pages, which
 * previously dead-ended with only a link back to the parent.
 */
export default function RelatedSubServices({
  items,
  basePath,
  currentSlug,
  parentName,
}: {
  items: Item[]
  basePath: string
  currentSlug: string
  parentName: string
}) {
  const others = items.filter((item) => item.slug !== currentSlug).slice(0, 3)
  if (others.length === 0) return null

  return (
    <section className="bg-gray-50 py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="mb-10 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#00d4ff]">
              Keep Exploring
            </span>
            <h2 className="text-gradient mt-3 text-[26px] font-bold md:text-[34px]">
              More from {parentName}
            </h2>
          </div>
          <Link
            to={basePath}
            className="group inline-flex shrink-0 items-center gap-2 rounded-xl border-2 border-[#0050a9] px-5 py-2.5 text-sm font-semibold text-[#0050a9] transition-all duration-300 hover:bg-[#0050a9] hover:text-white"
          >
            View the full service
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {others.map((item) => (
            <Link
              key={item.slug}
              to={`${basePath}/${item.slug}`}
              className="group relative flex h-[260px] flex-col justify-end overflow-hidden rounded-2xl shadow-md transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_28px_55px_-20px_rgba(1,47,98,0.7)]"
            >
              <img
                src={item.bgImage}
                alt={item.title}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#012f62] via-[#012f62]/70 to-[#012f62]/10 transition-all duration-500 group-hover:via-[#012f62]/80" />
              <span className="pointer-events-none absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-transparent via-[#00d4ff] to-transparent transition-transform duration-500 group-hover:scale-x-100" />

              <div className="relative p-6">
                <div className="mb-2 text-[10px] font-semibold tracking-wider text-[#00d4ff]">
                  {item.category}
                </div>
                <h3 className="mb-3 text-lg font-bold leading-snug text-white">{item.title}</h3>
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#00d4ff]">
                  Read more
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
