import { Search, Target, Rocket, ArrowRight } from 'lucide-react'

const steps = [
  {
    number: '01',
    icon: Search,
    title: 'Discovery & Analysis',
    description:
      'We begin by understanding your business challenges, goals, and current technology landscape to develop a comprehensive strategy.',
  },
  {
    number: '02',
    icon: Target,
    title: 'Strategic Planning',
    description:
      'Our experts develop tailored solutions and roadmaps that align with your business objectives and industry best practices.',
  },
  {
    number: '03',
    icon: Rocket,
    title: 'Implementation & Support',
    description:
      'We execute with precision and provide ongoing support to ensure sustainable success and continuous improvement.',
  },
]

export default function Methodology() {
  return (
    <section
      className="relative overflow-hidden py-20 lg:py-28"
      style={{ background: 'linear-gradient(120deg, #012f62, #0055b4)' }}
    >
      {/* Depth: faint grid + accent glows, matching the stats strip */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.7) 1px, transparent 1px)',
          backgroundSize: '56px 56px',
        }}
      />
      <div
        className="pointer-events-none absolute -right-32 -top-40 h-[460px] w-[460px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(0,212,255,0.18), transparent 65%)' }}
      />
      <div
        className="pointer-events-none absolute -bottom-48 -left-24 h-[520px] w-[520px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(0,212,255,0.12), transparent 65%)' }}
      />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#00d4ff]">
            How We Work
          </span>
          <h2 className="text-[36px] lg:text-[42px] font-bold text-white mb-4 mt-4">
            Delivering Excellence at Every Step
          </h2>
          <p className="text-white/70 text-lg max-w-3xl mx-auto">
            Our proven methodology ensures consistent, high-quality outcomes for every engagement.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="group relative rounded-2xl border border-white/10 bg-white/[0.06] p-8 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#00d4ff]/40 hover:bg-white/[0.1] hover:shadow-[0_16px_36px_-16px_rgba(0,212,255,0.5)]"
            >
              {/* Accent hairline on hover */}
              <span className="pointer-events-none absolute inset-x-8 -top-px h-px bg-gradient-to-r from-transparent via-[#00d4ff] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              {/* Step number */}
              <div className="pointer-events-none absolute right-6 top-4 select-none text-[80px] font-bold leading-none text-white/10 transition-colors duration-300 group-hover:text-[#00d4ff]/20">
                {step.number}
              </div>

              {/* Icon */}
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl border border-white/10 bg-white/10 backdrop-blur-sm transition-all duration-300 group-hover:scale-110 group-hover:border-[#00d4ff]/40 group-hover:bg-[#00d4ff]/15">
                <step.icon className="h-7 w-7 text-[#00d4ff]" />
              </div>

              <h3 className="mb-3 text-xl font-bold text-white">{step.title}</h3>

              <p className="leading-relaxed text-white/70">{step.description}</p>

              {/* Connector arrow (not on last) */}
              {index < steps.length - 1 && (
                <div className="absolute top-1/2 -right-6 hidden md:flex items-center gap-1">
                  <span className="block h-px w-6 bg-gradient-to-r from-[#00d4ff]/60 to-transparent" />
                  <ArrowRight className="h-4 w-4 text-[#00d4ff]/60" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
