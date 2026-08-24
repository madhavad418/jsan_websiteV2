import { useState } from 'react'
import {
  CheckCircle,
  Zap,
  DollarSign,
  Layers,
  Lightbulb,
  Globe,
  Settings,
  ShieldCheck,
} from 'lucide-react'

const valueProps = [
  {
    icon: CheckCircle,
    title: 'Better',
    subtitle: 'Quality Solutions',
  },
  {
    icon: Zap,
    title: 'Faster',
    subtitle: 'Agile Delivery',
  },
  {
    icon: DollarSign,
    title: 'Cost-Effective',
    subtitle: 'Maximum ROI',
  },
]

const features = [
  {
    icon: Layers,
    title: 'End-to-End Expertise',
    short: 'End-to-End',
    description:
      'Unlike niche providers, we cover the entire geospatial value chain  from field data collection to AI-powered analytics and custom software development  all under one roof.',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&auto=format&fit=crop',
  },
  {
    icon: Lightbulb,
    title: 'Engineering-Led Innovation',
    short: 'Engineering-Led',
    description:
      'Our solutions blend AI, IoT and cloud GIS with practical engineering rigor, ensuring scalable, future-ready systems.',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&auto=format&fit=crop',
  },
  {
    icon: Globe,
    title: 'Global Standards, Local Precision',
    short: 'Global Standards',
    description:
      'Trusted by clients in North America, Europe, and beyond, we combine international best practices with hyper-localized insights.',
    image: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=800&auto=format&fit=crop',
  },
  {
    icon: Settings,
    title: 'Turnkey Ownership',
    short: 'Turnkey',
    description:
      "We don't just deliver reports  we build, deploy, and optimize solutions tailored to your operational workflows.",
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop',
  },
  {
    icon: ShieldCheck,
    title: 'Ethical Data Leadership',
    short: 'Ethical Data',
    description:
      'Committed to secure, sustainable, and transparent geospatial practices aligned with GDPR and global norms.',
    image: 'https://images.unsplash.com/photo-1510511459019-5dda7724fd87?w=800&auto=format&fit=crop',
  },
]

export default function WhyChooseJSAN() {
  const [active, setActive] = useState(0)

  return (
    <section className="py-20 lg:py-28 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-10">
          <h2 className="text-[36px] lg:text-[42px] font-bold mb-4 text-gradient">
            Why Choose JSAN?
          </h2>
          <p className="text-gray-500 text-lg">
            We combine deep domain expertise with proven technology to deliver measurable business outcomes.
          </p>
        </div>

        {/* Better / Faster / Cost-Effective */}
        <div className="flex flex-wrap justify-center gap-5 lg:gap-8 mb-14">
          {valueProps.map((item, index) => (
            <div key={index} className="flex items-center gap-4 bg-[#0050a9] rounded-2xl px-7 py-5 shadow-lg group hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center group-hover:bg-[#00d4ff]/20 transition-colors">
                <item.icon className="w-6 h-6 text-[#00d4ff]" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">{item.title}</h3>
                <p className="text-white/50 text-sm">{item.subtitle}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop: expanding panels. Hover or focus a panel to open it. */}
        <div className="hidden h-[460px] gap-4 lg:flex">
          {features.map((feature, index) => {
            const isActive = active === index
            return (
              <div
                key={index}
                role="button"
                tabIndex={0}
                aria-expanded={isActive}
                onMouseEnter={() => setActive(index)}
                onFocus={() => setActive(index)}
                onClick={() => setActive(index)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    setActive(index)
                  }
                }}
                className={`group relative cursor-pointer overflow-hidden rounded-2xl outline-none ring-offset-2 transition-[flex-grow] duration-700 ease-out focus-visible:ring-2 focus-visible:ring-[#0050a9] ${
                  isActive ? 'flex-[3.2] shadow-2xl' : 'flex-[1.15] shadow-md'
                }`}
              >
                <img
                  src={feature.image}
                  alt={feature.title}
                  className={`absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-out ${
                    isActive ? 'scale-100' : 'scale-125'
                  }`}
                />

                {/* Collapsed panels sit darker so the open one draws the eye */}
                <div
                  className={`absolute inset-0 transition-all duration-700 ${
                    isActive
                      ? 'bg-gradient-to-t from-[#012f62] via-[#012f62]/65 to-[#012f62]/10'
                      : 'bg-gradient-to-t from-[#012f62] via-[#012f62]/85 to-[#012f62]/70'
                  }`}
                />

                {/* Cyan accent on the open panel */}
                <span
                  className={`pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-[#00d4ff] to-transparent transition-opacity duration-500 ${
                    isActive ? 'opacity-100' : 'opacity-0'
                  }`}
                />

                {/* Step number */}
                <span
                  className={`absolute right-5 top-5 text-sm font-bold tabular-nums transition-colors duration-500 ${
                    isActive ? 'text-[#00d4ff]' : 'text-white/40'
                  }`}
                >
                  0{index + 1}
                </span>

                {/* Icon */}
                <div
                  className={`absolute left-5 top-5 flex h-11 w-11 items-center justify-center rounded-xl border backdrop-blur-sm transition-all duration-500 ${
                    isActive
                      ? 'scale-110 border-[#00d4ff]/50 bg-[#00d4ff]/20'
                      : 'border-white/15 bg-white/10'
                  }`}
                >
                  <feature.icon className="h-5 w-5 text-white" />
                </div>

                {/* Collapsed: short label, read horizontally */}
                <div
                  className={`absolute inset-x-0 bottom-0 px-4 pb-6 text-center transition-opacity duration-300 ${
                    isActive ? 'pointer-events-none opacity-0' : 'opacity-100 delay-200'
                  }`}
                >
                  <span className="mx-auto mb-3 block h-0.5 w-8 bg-[#00d4ff]/70" />
                  <span className="block text-[13px] font-bold uppercase leading-tight tracking-wide text-white">
                    {feature.short}
                  </span>
                </div>

                {/* Expanded: title + description */}
                <div
                  className={`absolute bottom-0 left-0 right-0 p-7 transition-all duration-500 ${
                    isActive
                      ? 'translate-y-0 opacity-100 delay-200'
                      : 'pointer-events-none translate-y-4 opacity-0'
                  }`}
                >
                  <h3 className="mb-3 text-2xl font-bold text-white">
                    {feature.title}
                  </h3>
                  <span className="mb-4 block h-0.5 w-14 bg-[#00d4ff]" />
                  <p className="max-w-md text-sm leading-relaxed text-white/85">
                    {feature.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Mobile / tablet: stacked cards */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:hidden">
          {features.map((feature, index) => (
            <div key={index} className="group relative h-[280px] overflow-hidden rounded-2xl shadow-md">
              <img
                src={feature.image}
                alt={feature.title}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#012f62] via-[#012f62]/70 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 bg-white/15 backdrop-blur-sm">
                  <feature.icon className="h-5 w-5 text-white" />
                </div>
                <h3 className="mb-2 text-lg font-bold text-white">{feature.title}</h3>
                <p className="text-sm leading-relaxed text-white/80">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
