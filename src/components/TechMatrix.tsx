import type { LucideIcon } from 'lucide-react'

/**
 * "What we actually work on", as editorial panels rather than a paragraph.
 *
 * A support page lives or dies on whether a reader finds their own stack in it. Prose
 * buries that: someone running Oracle Spatial behind a Java service has to read three
 * sentences to find out whether we are relevant. One panel per area, with the products
 * named, answers it at a glance.
 *
 * The layout is the one /industries and /capabilities use for their pillars - a large
 * photograph on roughly 57% of the width, the detail beside it, sides alternating down the
 * page. Six equal cards would have said "here are six categories"; at this size each area
 * reads as a practice in its own right, which is closer to the truth.
 *
 * The counts are deliberate. They say "this is a real inventory, not a sample".
 */

export type TechGroup = {
  name: string
  icon: LucideIcon
  /** One line on how JSAN works with this part of the estate. */
  blurb: string
  items: string[]
  image: string
}

type Props = {
  eyebrow: string
  heading: string
  intro: string
  groups: TechGroup[]
}

export default function TechMatrix({ eyebrow, heading, intro, groups }: Props) {
  if (groups.length === 0) return null

  const total = groups.reduce((n, g) => n + g.items.length, 0)

  return (
    <section className="section-y bg-white">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="mb-12 max-w-3xl lg:mb-16">
          <span className="t-label text-[#00d4ff]">{eyebrow}</span>
          <h2 className="text-gradient mb-4 mt-3 text-[26px] font-bold leading-tight md:text-[34px] lg:text-[40px]">
            {heading}
          </h2>
          <p className="text-[15px] leading-relaxed text-gray-600 md:text-lg">{intro}</p>
        </div>

        <div className="space-y-16 lg:space-y-24">
          {groups.map((group, i) => {
            const imageFirst = i % 2 === 0
            const Icon = group.icon

            return (
              <article
                key={group.name}
                /* The wide column has to follow the image across the alternation, or the
                   photograph shrinks on every second panel. */
                className={`grid items-center gap-10 lg:gap-16 ${
                  imageFirst
                    ? 'lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]'
                    : 'lg:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)]'
                }`}
              >
                <div className={`overflow-hidden rounded-2xl bg-gray-100 ${imageFirst ? '' : 'lg:order-2'}`}>
                  <img
                    src={group.image}
                    alt=""
                    aria-hidden="true"
                    width={1200}
                    height={800}
                    loading="lazy"
                    decoding="async"
                    className="h-[260px] w-full object-cover sm:h-[300px] lg:h-[460px]"
                  />
                </div>

                <div className={imageFirst ? '' : 'lg:order-1'}>
                  <div className="mb-6 flex items-center gap-4">
                    <span className="text-[34px] font-bold leading-none tracking-[-0.04em] text-[#868e9c]">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span aria-hidden="true" className="h-px w-8 bg-gray-300" />
                    <Icon className="h-5 w-5 text-[#0050a9]" aria-hidden="true" />
                  </div>

                  <h3 className="t-sub mb-5 text-[#0a1a3a]">{group.name}</h3>

                  <p className="t-body mb-9 max-w-md text-gray-600">{group.blurb}</p>

                  {/* Two columns, because these lists run to a dozen or more names */}
                  <ul className="grid gap-x-8 gap-y-3 border-t border-gray-200 pt-7 sm:grid-cols-2">
                    {group.items.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-[15px] text-gray-700">
                        <span
                          aria-hidden="true"
                          className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-[#0050a9]"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            )
          })}
        </div>

        <p className="mt-14 max-w-2xl text-[15px] leading-relaxed text-gray-500">
          {total} technologies across {groups.length} areas. If yours is not listed it is still
          worth asking: the list is what we see most, not what we are limited to.
        </p>
      </div>
    </section>
  )
}
