import { Globe, MapPin, Users, CalendarCheck, Flag, Server, Truck, Route } from 'lucide-react'
import WorldMap from './WorldMap'
import { useCountUp, useInView } from '../lib/useCountUp'

/* value/suffix are kept separate so the number can be counted up on scroll */
const stats = [
  { icon: CalendarCheck, value: 7, suffix: '+', label: 'Years of Domain Expertise' },
  { icon: Users, value: 1500, suffix: '+', label: 'Onshore + Offshore Employees' },
  { icon: Globe, value: 100, suffix: '+', label: 'Projects Delivered' },
  { icon: MapPin, value: 25, suffix: '+', label: 'Offices Worldwide' },
  { icon: Flag, value: 40, suffix: '+', label: 'Countries with Field Operations' },
  { icon: Server, value: 10, suffix: '', label: 'Dedicated Data Centers' },
  { icon: Truck, value: 800, suffix: '+', label: 'Survey Vehicles' },
  { icon: Route, value: 4, suffix: 'M+', label: 'KM Collected per Year' },
]

function StatCard({ stat, index, start }: { stat: (typeof stats)[number]; index: number; start: boolean }) {
  const count = useCountUp(stat.value, start, 1400 + index * 60)

  return (
    <div
      className={`group relative w-[calc(50%-10px)] sm:w-[calc(33.333%-13.4px)] lg:w-[calc(25%-15px)] rounded-2xl border border-white/10 bg-white/[0.06] px-3 py-6 md:px-4 text-center backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:border-[#00d4ff]/40 hover:bg-white/[0.1] hover:shadow-[0_12px_30px_-12px_rgba(0,212,255,0.45)] ${
        start ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
      style={{ transitionDelay: `${index * 70}ms` }}
    >
      {/* Accent hairline on hover */}
      <span className="pointer-events-none absolute inset-x-6 -top-px h-px bg-gradient-to-r from-transparent via-[#00d4ff] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/10 transition-all duration-300 group-hover:scale-110 group-hover:border-[#00d4ff]/40 group-hover:bg-[#00d4ff]/15">
        <stat.icon className="h-5 w-5 text-[#00d4ff]" />
      </div>

      <div className="mb-1.5 text-[26px] font-bold tracking-tight text-white tabular-nums lg:text-[34px]">
        {count}
        <span className="text-[#00d4ff]">{stat.suffix}</span>
      </div>

      <div className="text-[11px] font-medium uppercase leading-snug tracking-wider text-white/70">
        {stat.label}
      </div>
    </div>
  )
}

export default function WorldwideNetwork() {
  const { ref, inView } = useInView<HTMLDivElement>()

  return (
    <section className="relative pt-20 lg:pt-28 bg-white overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="text-center mb-8">
          <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#00d4ff]">
            Global Presence
          </span>
          <h2 className="text-gradient mb-4 mt-4 text-[36px] font-bold lg:text-[42px]">
            Our Worldwide Network
          </h2>
          <p className="mx-auto max-w-2xl text-base text-gray-600 md:text-lg">
            Registered offices across four continents, connected by the delivery links that move work
            between our regional hubs.
          </p>
        </div>

        {/* World Map */}
        <WorldMap />
      </div>

      {/* Stats, full-width brand strip */}
      <div
        ref={ref}
        className="relative mt-16 overflow-hidden"
        style={{ background: 'linear-gradient(120deg, #012f62, #0055b4)' }}
      >
        {/* Depth: faint grid + two accent glows */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.7) 1px, transparent 1px)',
            backgroundSize: '56px 56px',
          }}
        />
        <div
          className="pointer-events-none absolute -left-32 -top-40 h-[460px] w-[460px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(0,212,255,0.18), transparent 65%)' }}
        />
        <div
          className="pointer-events-none absolute -bottom-48 -right-24 h-[520px] w-[520px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(0,212,255,0.12), transparent 65%)' }}
        />

        <div className="relative max-w-7xl mx-auto px-6 py-14 lg:py-16">
          <div className="mb-10 text-center">
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#00d4ff]">
              JSAN by the Numbers
            </span>
          </div>

          <div className="flex flex-wrap justify-center gap-5">
            {stats.map((stat, index) => (
              <StatCard key={stat.label} stat={stat} index={index} start={inView} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
