import { useState } from 'react'
import type { LucideIcon } from 'lucide-react'
import { ArrowRight } from 'lucide-react'

export type ShowcaseItem = {
  category?: string
  cardTitle: string
  /** Longer headline shown inside the panel; falls back to cardTitle */
  title?: string
  description: string
  /** Optional: some pages define capabilities without an icon */
  icon?: LucideIcon
  bgImage: string
  highlights?: string[]
  /** Sub-service page slug, appended to basePath */
  slug?: string
  /** Explicit link that overrides the slug */
  customHref?: string
}

type Props = {
  items: ShowcaseItem[]
  /** e.g. "/services/utility-network-intelligence" */
  basePath?: string
  /** Anchor used when an item has no page of its own */
  fallbackHref?: string
}

/**
 * Tabbed capability showcase. Replaces the old card grids on service pages:
 * one large panel at a time, driven by a tab strip, so a page with two
 * capabilities and a page with ten both read well.
 */
export default function CapabilityShowcase({ items, basePath, fallbackHref = '#contact' }: Props) {
  const [active, setActive] = useState(0)

  if (items.length === 0) return null

  const current = items[Math.min(active, items.length - 1)]
  const hasPage = Boolean(current.customHref || (basePath && current.slug))
  const href = current.customHref ?? (basePath && current.slug ? `${basePath}/${current.slug}` : fallbackHref)
  const CurrentIcon = current.icon

  return (
    <div>
      {/* Tab strip */}
      <div role="tablist" aria-label="Capabilities" className="mb-8 flex flex-wrap justify-center gap-2.5">
        {items.map((item, index) => {
          const isActive = index === active
          const TabIcon = item.icon
          return (
            <button
              key={item.cardTitle}
              role="tab"
              aria-selected={isActive}
              onClick={() => setActive(index)}
              className={`group inline-flex items-center gap-2.5 rounded-xl border px-4 py-2.5 text-sm font-semibold transition-all duration-300 ${
                isActive
                  ? 'border-transparent text-white shadow-[0_10px_24px_-12px_rgba(0,80,169,0.95)]'
                  : 'border-gray-200 bg-white text-[#0050a9] hover:-translate-y-0.5 hover:border-[#0050a9]/40 hover:shadow-md'
              }`}
              style={isActive ? { background: 'linear-gradient(120deg, #012f62, #0055b4)' } : undefined}
            >
              {TabIcon && (
                <TabIcon className={`h-4 w-4 ${isActive ? 'text-[#00d4ff]' : 'text-[#0050a9]'}`} />
              )}
              {item.cardTitle}
            </button>
          )
        })}
      </div>

      {/* Detail panel */}
      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xl">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Visual */}
          <div className="relative h-64 overflow-hidden lg:h-auto lg:min-h-[420px]">
            {items.map((item, index) => (
              <img
                key={item.cardTitle}
                src={item.bgImage}
                alt={item.cardTitle}
                className={`absolute inset-0 h-full w-full object-cover transition-all duration-700 ease-out ${
                  index === active ? 'scale-100 opacity-100' : 'scale-105 opacity-0'
                }`}
              />
            ))}
            <div className="absolute inset-0 bg-gradient-to-t from-[#012f62]/90 via-[#012f62]/25 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-[#012f62]/10 lg:to-[#012f62]/30" />

            {CurrentIcon && (
              <div className="absolute left-6 top-6 flex h-12 w-12 items-center justify-center rounded-xl border border-white/20 bg-white/15 backdrop-blur-md">
                <CurrentIcon className="h-6 w-6 text-white" />
              </div>
            )}

            {current.category && (
              <span className="absolute bottom-6 left-6 rounded-full bg-[#012f62]/80 px-3 py-1.5 text-[10px] font-semibold tracking-widest text-[#00d4ff] backdrop-blur-md">
                {current.category}
              </span>
            )}
          </div>

          {/* Copy. Keyed so it re-animates on every tab change. */}
          <div key={active} className="animate-slide-up p-8 lg:p-10">
            <h3 className="mb-4 text-2xl font-bold leading-snug text-[#0050a9] lg:text-[28px]">
              {current.title ?? current.cardTitle}
            </h3>
            <span className="mb-5 block h-1 w-14 rounded bg-[#00d4ff]" />

            <p className="mb-6 text-base leading-relaxed text-gray-600">{current.description}</p>

            {current.highlights && current.highlights.length > 0 && (
              <div className="mb-8 flex flex-wrap gap-2">
                {current.highlights.map((highlight) => (
                  <span
                    key={highlight}
                    className="rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-xs text-[#0050a9]"
                  >
                    {highlight}
                  </span>
                ))}
              </div>
            )}

            <a
              href={href}
              className="group inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_26px_-10px_rgba(0,80,169,0.85)]"
              style={{ background: 'linear-gradient(120deg, #012f62, #0055b4)' }}
            >
              {hasPage ? 'Know More' : 'Discuss This'}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </div>

      {/* Progress dots */}
      <div className="mt-6 flex items-center justify-center gap-2">
        {items.map((item, index) => (
          <button
            key={item.cardTitle}
            onClick={() => setActive(index)}
            aria-label={`Show ${item.cardTitle}`}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              index === active ? 'w-8 bg-[#0050a9]' : 'w-2.5 bg-gray-300 hover:bg-[#0050a9]/50'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
