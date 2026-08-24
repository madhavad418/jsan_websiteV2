import { useState, useEffect, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { Cpu, Users, ClipboardList, Target, Lightbulb, Shield, BarChart3, ArrowRight, ChevronRight, ChevronLeft, Zap, MapPin, Truck, Briefcase, Network } from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import MobileNav from '../components/MobileNav'
import { useInView } from '../lib/useCountUp'

/* ── Scroll-triggered count-up animation (Amnex style) ── */
function useCountUp(end: number, duration = 2000, startOnView = true) {
  const [count, setCount] = useState(0)
  const [hasStarted, setHasStarted] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const start = useCallback(() => {
    if (hasStarted) return
    setHasStarted(true)
    const startTime = performance.now()
    const tick = (now: number) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      // ease-out cubic for smooth deceleration
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(eased * end))
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [end, duration, hasStarted])

  useEffect(() => {
    if (!startOnView || !ref.current) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) start() },
      { threshold: 0.3 },
    )
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [start, startOnView])

  return { count, ref }
}

function CountUpStat({ end, suffix, label, duration = 2000 }: { end: number; suffix: string; label: string; duration?: number }) {
  const { count, ref } = useCountUp(end, duration)
  return (
    <div ref={ref} className="bg-[#f0f7ff] rounded-2xl p-8 text-center hover:shadow-lg transition-shadow duration-300">
      <div className="text-[40px] lg:text-[48px] font-bold text-[#0050a9] leading-none mb-2">
        {count.toLocaleString()}{suffix}
      </div>
      <div className="text-gray-600 text-sm font-medium">{label}</div>
    </div>
  )
}


const stats = [
  { end: 7, suffix: '+', label: 'Years Domain Expertise', duration: 1200 },
  { end: 1500, suffix: '+', label: 'Employees Globally', duration: 2200 },
  { end: 100, suffix: '+', label: 'Projects Delivered', duration: 1800 },
  { end: 25, suffix: '+', label: 'Countries Worldwide', duration: 1500 },
]

const pillarCards = [
  {
    icon: MapPin,
    title: 'Location Intelligence',
    description: 'End-to-end location intelligence  from data capture and enhancement to advanced analytics and custom platform development.',
    link: '/services/location-intelligence',
    color: '#0050a9',
    image: '/pillars/location-intelligence.jpg',
  },
  {
    icon: Network,
    title: 'Telecom Network Intelligence',
    description: 'Spatial intelligence for modern telecom networks  RF propagation, 5G small-cell siting, tower and fiber asset mapping, and real-time network analytics.',
    link: '/services/telecom-network-intelligence',
    color: '#0891b2',
    image: '/pillars/utility-network.jpg',
  },
  {
    icon: Cpu,
    title: 'Technology Consultancy',
    description: 'Enterprise digital transformation, system integration, scalable architecture, and innovation-driven engineering.',
    link: '/services/technology-consultancy',
    color: '#e63946',
    image: '/pillars/technology-consultancy.jpg',
  },
  {
    icon: Users,
    title: 'Staffing & Workforce',
    description: 'Specialized global talent acquisition and deployment aligned to enterprise delivery goals.',
    link: '/services/staffing-solutions',
    color: '#e88c30',
    image: '/pillars/staffing-workforce.jpg',
  },
  {
    icon: ClipboardList,
    title: 'Program Management',
    description: 'Governance-driven execution frameworks ensuring transparency, risk mitigation, and measurable outcomes.',
    link: '/services/program-management',
    color: '#7b2d8e',
    image: '/pillars/program-management.jpg',
  },
]

const advantages = [
  {
    icon: Target,
    title: 'Strategic Alignment with Business Goals',
    description:
      'Engagements start from your commercial objectives, not a technology catalogue, so delivery is measured against outcomes you already track.',
  },
  {
    icon: Lightbulb,
    title: 'Integrated Technology & Talent Model',
    description:
      'Platforms and people from one partner: engineers, field crews and delivery managers all working to a single plan.',
  },
  {
    icon: BarChart3,
    title: 'Scalable & Interoperable Solutions',
    description:
      'Built on open standards and documented interfaces, so what we deliver plugs into your estate and grows with it.',
  },
  {
    icon: Shield,
    title: 'Transparent Governance & Reporting',
    description:
      'Defined quality gates, named owners and reporting you can audit, from the first pilot through to steady state.',
  },
]

const processSteps = [
  { step: 'Discover', description: 'Understand challenges & opportunities' },
  { step: 'Design', description: 'Architect tailored solutions' },
  { step: 'Deploy', description: 'Execute with precision' },
  { step: 'Optimize', description: 'Refine for performance' },
  { step: 'Scale', description: 'Grow with confidence' },
]

const industries = [
  {
    name: 'Energy & Utilities',
    icon: Zap,
    href: '/industries/utilities',
    description: 'Smart grid, asset management and operational optimisation across energy networks.',
  },
  {
    name: 'Transport & Mobility',
    icon: Truck,
    href: '/industries/transportation-infrastructure',
    description: 'Fleet management, routing, real-time tracking and logistics intelligence.',
  },
  {
    name: 'Consulting',
    icon: Briefcase,
    href: '/industries/consulting',
    description: 'Resource augmentation, specialist expertise and delivery partnership.',
  },
  {
    name: 'Sustainability & Future Cities',
    icon: MapPin,
    href: '/industries/government-smart-cities',
    description: 'Urban analytics, traffic management, IoT infrastructure and digital twins.',
  },
]

export default function About() {
  const { ref: advantageRef, inView: advantageInView } = useInView<HTMLElement>()
  const { ref: industriesRef, inView: industriesInView } = useInView<HTMLElement>()
  const [activeTab, setActiveTab] = useState(0)
  const [pillarIndex, setPillarIndex] = useState(0)
  const pillarCount = pillarCards.length

  // Autoplay carousel (5s)
  useEffect(() => {
    const timer = setInterval(() => {
      setPillarIndex(prev => (prev + 1) % pillarCount)
    }, 5000)
    return () => clearInterval(timer)
  }, [pillarCount])

  const goToPillar = (dir: 'prev' | 'next') => {
    setPillarIndex(prev =>
      dir === 'next' ? (prev + 1) % pillarCount : (prev - 1 + pillarCount) % pillarCount
    )
  }

  // Responsive card width (smaller  shows neighbors)
  const [pillarCardWidth, setPillarCardWidth] = useState(38)
  useEffect(() => {
    const updateWidth = () => {
      if (window.innerWidth >= 1280) setPillarCardWidth(32)
      else if (window.innerWidth >= 1024) setPillarCardWidth(38)
      else if (window.innerWidth >= 768) setPillarCardWidth(55)
      else setPillarCardWidth(80)
    }
    updateWidth()
    window.addEventListener('resize', updateWidth)
    return () => window.removeEventListener('resize', updateWidth)
  }, [])

  const brandPillars = [
    {
      title: 'VISION',
      bg: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&auto=format&fit=crop',
      content: (
        <>
          <p>JSAN wants to lead in GIS, AI-enabled IT, and people services through innovation and quality.</p>
          <p className="mt-2">We aim to bridge AI-driven intelligence, talent, and technology to solve complex business challenges.</p>
          <p className="mt-2">Our focus is on sustainable growth, operational excellence, and customer success.</p>
          <p className="mt-2">We aspire to be a preferred partner across global markets.</p>
        </>
      ),
    },
    {
      title: 'MISSION',
      bg: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600&auto=format&fit=crop',
      content: (
        <p>We unlock transformative growth by building partnerships grounded in trust, domain expertise, and an entrepreneurial spirit.</p>
      ),
    },
    {
      title: 'VALUES',
      bg: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1600&auto=format&fit=crop',
      content: (
        <ul>
          <li>Integrity<span>The courage to uphold principles and the conviction to choose honesty over convenience.</span></li>
          <li>Quality<span>Ensuring every action, every deliverable, and every experience reflects our promise to do things well.</span></li>
          <li>Care<span>It begins with the dignity of our people, extends to respect for our clients, and finds its purpose in serving communities.</span></li>
        </ul>
      ),
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* ── 1. HERO SECTION ── */}
      <section
        className="relative flex items-center overflow-hidden bg-white pt-24 lg:min-h-[700px] lg:pt-28 pb-16 lg:pb-20"
        style={{ marginTop: '44px' }}
      >
        {/* Brand wash. It has to stay clear of the video panel: the masking strip below is
            painted flat white, so any tint underneath it shows as a seam along its edge and
            a mismatched patch around the curve. The panel starts at 48%, this container
            stops at 44%, and both gradients reach zero alpha by ~33%  so nothing reaches
            the strip and there is no hard cut at the container edge either. */}
        <div
          className="pointer-events-none absolute inset-y-0 left-0 w-[44%]"
          style={{
            background:
              'radial-gradient(50% 45% at 5% 10%, rgba(0,80,169,0.07) 0%, rgba(0,80,169,0) 100%), ' +
              'radial-gradient(45% 55% at 30% 95%, rgba(0,212,255,0.11) 0%, rgba(0,212,255,0) 100%)',
          }}
        />

        {/* Same treatment as the Careers and Contact heroes, except the panel holds the
            video rather than a background image  a video cannot be a CSS background, so it
            fills the panel and the white strip simply overlays it. The strip masks the 7rem
            overhang and, because its own bottom-right corner is rounded, peels away at the
            bottom so the video sweeps out to the left. Radius and strip width must match. */}
        <div className="absolute inset-y-6 right-0 hidden w-[52%] overflow-hidden bg-[#071a36] lg:block">
          <video
            className="h-full w-full object-cover"
            src="/about-hero-video.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden="true"
          />
          <div className="absolute inset-y-0 left-0 w-28 rounded-br-[7rem] bg-white" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-7xl px-6">
          <div className="lg:w-1/2 lg:pr-12">
            <span className="mb-5 inline-block text-[11px] font-bold uppercase tracking-[0.25em] text-[#00a3e0]">
              About JSAN
            </span>
            <h1 className="mb-3 text-[38px] font-bold leading-[1.08] text-[#0a1a3a] lg:text-[54px]">
              Engineering intelligence.
            </h1>
            <p className="mb-6 text-[24px] font-semibold leading-tight text-[#0050a9] lg:text-[32px]">
              Delivering impact.
            </p>
            <p className="mb-9 max-w-lg text-lg leading-relaxed text-gray-600">
              We thrive on change. Not change for its own sake, but change that pairs technology with
              human insight to create experiences that matter and last.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                to="/services"
                className="group inline-flex items-center gap-2.5 rounded-lg px-7 py-3.5 font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_34px_-14px_rgba(0,80,169,0.9)]"
                style={{ background: 'linear-gradient(120deg, #012f62, #0055b4)' }}
              >
                Explore Our Services
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>

              <Link
                to="/contact"
                className="group inline-flex items-center gap-2 rounded-lg border-2 border-[#0050a9]/20 px-7 py-3.5 font-semibold text-[#0050a9] transition-all duration-300 hover:border-[#0050a9] hover:bg-[#0050a9] hover:text-white"
              >
                Get in Touch
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* Below lg there is no room to bleed, so the video stacks under the copy */}
          <div className="mt-12 overflow-hidden rounded-2xl bg-[#071a36] shadow-xl lg:hidden">
            <video
              className="h-[280px] w-full object-cover sm:h-[340px]"
              src="/about-hero-video.mp4"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-hidden="true"
            />
          </div>
        </div>
      </section>

      {/* ── 2. WHO WE ARE  TechM style 50/50 split ── */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div>
            <span className="inline-block text-[#0050a9] font-bold text-sm uppercase tracking-widest mb-4"></span>
            <h2 className="text-[32px] lg:text-[42px] font-bold leading-tight mb-6 text-gradient">
              Who We Are
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              JSAN is a global technology consultancy integrating digital engineering, geospatial intelligence, strategic workforce solutions, and structured program management.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              We operate at the intersection of innovation and execution, helping enterprises navigate complexity, optimize operations, and build sustainable competitive advantage.
            </p>
          </div>

          {/* Key Metrics  below the split, full width */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-16">
            {stats.map((stat, i) => (
              <CountUpStat key={i} end={stat.end} suffix={stat.suffix} label={stat.label} duration={stat.duration} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Sticky Background Image Break ── */}
      <section
        className="relative h-[50vh] lg:h-[60vh]"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1552664730-d307ca884978?w=1920&auto=format&fit=crop)',
          backgroundAttachment: 'fixed',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0" style={{ background: 'linear-gradient(120deg, rgba(1,47,98,0.5), rgba(0,80,169,0.4))' }} />
      </section>

      {/* ── 3. OUR STRATEGIC PILLARS  Compact Center-mode Carousel ── */}
      <section className="py-20 lg:py-24 bg-gradient-to-b from-gray-50 via-white to-gray-50 relative overflow-hidden">
        {/* Ambient glow blobs */}
        <div className="absolute top-1/2 left-0 w-[500px] h-[500px] -translate-y-1/2 bg-[#0050a9]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 right-0 w-[500px] h-[500px] -translate-y-1/2 bg-[#00d4ff]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 mb-12 text-center relative">
          <span className="inline-block text-[#0050a9] font-bold text-sm uppercase tracking-widest mb-3">
            What We Do
          </span>
          <h2 className="text-[32px] lg:text-[42px] font-bold text-gradient mb-4">
            Our Strategic Pillars
          </h2>
          <p className="text-gray-600 text-base lg:text-lg max-w-2xl mx-auto">
            Five integrated practices that power how we deliver value  from intelligence and engineering to talent and governance.
          </p>
        </div>

        {/* Center-mode Carousel */}
        <div className="relative" style={{ perspective: '1800px' }}>
          <div className="overflow-hidden py-6">
            <div
              className="flex items-center pillar-track"
              style={{
                transform: `translateX(${-(pillarIndex * pillarCardWidth) + (50 - pillarCardWidth / 2)}%)`,
              }}
            >
              {pillarCards.map((card, i) => {
                const isActive = i === pillarIndex
                const offset = i - pillarIndex
                const Icon = card.icon
                return (
                  <div
                    key={i}
                    className="pillar-card px-2 md:px-3"
                    style={{
                      opacity: isActive ? 1 : 0.45,
                      transform: isActive
                        ? 'scale(1) rotateY(0deg)'
                        : `scale(0.82) rotateY(${offset > 0 ? -12 : 12}deg)`,
                      filter: isActive ? 'none' : 'blur(1px)',
                      transformStyle: 'preserve-3d',
                    }}
                  >
                    <Link
                      to={card.link}
                      className="block relative rounded-2xl overflow-hidden group cursor-pointer transition-all duration-500"
                      style={{
                        height: '360px',
                        boxShadow: isActive
                          ? `0 30px 60px -15px ${card.color}66, 0 0 0 1px ${card.color}33`
                          : '0 10px 30px -10px rgba(0,0,0,0.3)',
                      }}
                    >
                      {/* Background Image */}
                      <img
                        src={card.image}
                        alt={card.title}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1200ms] ease-out"
                      />

                      {/* Color-tinted gradient overlay using card color */}
                      <div
                        className="absolute inset-0 transition-opacity duration-500"
                        style={{
                          background: `linear-gradient(165deg, ${card.color}00 0%, ${card.color}30 50%, ${card.color}ee 100%)`,
                        }}
                      />
                      {/* Dark base for legibility */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

                      {/* Shine sweep on hover */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                        <div
                          className="absolute inset-y-0 -left-1/2 w-1/2 skew-x-[-20deg] group-hover:translate-x-[300%] transition-transform duration-1000 ease-out"
                          style={{
                            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent)',
                          }}
                        />
                      </div>

                      {/* Top: Icon chip */}
                      <div className="absolute top-5 left-5 z-10">
                        <div
                          className="w-11 h-11 rounded-xl flex items-center justify-center backdrop-blur-md border border-white/30 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500"
                          style={{ background: `${card.color}cc` }}
                        >
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                      </div>

                      {/* Top-right active indicator dot */}
                      {isActive && (
                        <div className="absolute top-6 right-6 z-10">
                          <span className="relative flex h-2.5 w-2.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00d4ff] opacity-75" />
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#00d4ff]" />
                          </span>
                        </div>
                      )}

                      {/* Bottom content */}
                      <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-7 z-10">
                        <span className="inline-block text-[#00d4ff] text-[10px] font-bold uppercase tracking-[0.2em] mb-2">
                          {card.title === 'Location Intelligence'
                            ? 'Spatial Intelligence'
                            : card.title === 'Technology Consultancy'
                            ? 'Digital Engineering'
                            : card.title === 'Staffing & Workforce'
                            ? 'Talent Solutions'
                            : 'Governance & Delivery'}
                        </span>
                        <h3 className="text-white text-xl lg:text-[22px] font-bold leading-tight mb-2 group-hover:text-[#00d4ff] transition-colors duration-300">
                          {card.title}
                        </h3>
                        <p className="text-white/75 text-xs leading-relaxed mb-3 line-clamp-2">
                          {card.description}
                        </p>
                        <span className="inline-flex items-center gap-1.5 text-white font-semibold text-xs group-hover:text-[#00d4ff] group-hover:gap-2.5 transition-all duration-300">
                          Read More <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      </div>

                      {/* Bottom accent bar */}
                      <div
                        className="absolute bottom-0 left-0 right-0 h-1 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
                        style={{ background: `linear-gradient(90deg, ${card.color}, #00d4ff)` }}
                      />
                    </Link>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Left Arrow */}
          <button
            onClick={() => goToPillar('prev')}
            className="absolute left-4 lg:left-12 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/95 backdrop-blur shadow-xl flex items-center justify-center hover:bg-white hover:scale-110 hover:shadow-2xl transition-all duration-300 border border-[#0050a9]/10"
            aria-label="Previous pillar"
          >
            <ChevronLeft className="w-5 h-5 text-[#0050a9]" />
          </button>

          {/* Right Arrow */}
          <button
            onClick={() => goToPillar('next')}
            className="absolute right-4 lg:right-12 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/95 backdrop-blur shadow-xl flex items-center justify-center hover:bg-white hover:scale-110 hover:shadow-2xl transition-all duration-300 border border-[#0050a9]/10"
            aria-label="Next pillar"
          >
            <ChevronRight className="w-5 h-5 text-[#0050a9]" />
          </button>
        </div>

        {/* Dot Navigation */}
        <div className="flex justify-center gap-2 mt-8">
          {pillarCards.map((_, i) => (
            <button
              key={i}
              onClick={() => setPillarIndex(i)}
              className={`h-2 rounded-full transition-all duration-500 ${
                i === pillarIndex ? 'w-10 bg-gradient-to-r from-[#0050a9] to-[#00d4ff]' : 'w-2 bg-[#0050a9]/25 hover:bg-[#0050a9]/50'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </section>

      {/* ── 4. PURPOSE / PROMISE / MISSION / VALUES  TechM Tabbed Section ── */}
      <section
        className="vm-section"
        style={{ backgroundImage: `url(${brandPillars[activeTab].bg})` }}
      >
        <div className="vm-overlay" />
        <div className="max-w-7xl mx-auto px-6 w-full h-full">
          <div className="vm-tabs">
            {brandPillars.map((pillar, i) => (
              <div
                key={pillar.title}
                className={`vm-tab ${activeTab === i ? 'active' : ''}`}
                onClick={() => setActiveTab(i)}
              >
                <h3>{pillar.title}</h3>
                <div className="vm-tab-content">
                  <div style={{ marginTop: '1rem', maxWidth: '480px' }}>
                    {pillar.content}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Leadership Quote ── */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="bg-[#f0f7ff] rounded-2xl p-10 lg:p-14 relative overflow-hidden">
            <svg className="absolute top-6 left-8 w-16 h-16 text-[#0050a9]/10" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
            <p className="relative z-10 text-[#0050a9] text-xl lg:text-2xl font-light italic leading-relaxed pl-8 lg:pl-12">
              "Sustainable growth demands precision, accountability, and intelligent execution."
            </p>
          </div>
        </div>
      </section>

      {/* ── 5. THE JSAN ADVANTAGE ── */}
      <section
        ref={advantageRef}
        className="relative overflow-hidden py-20 lg:py-28"
        style={{ background: 'linear-gradient(120deg, #012f62, #0055b4)' }}
      >
        {/* Depth: grid texture + accent glows */}
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
          style={{ background: 'radial-gradient(circle, rgba(0,212,255,0.2), transparent 65%)' }}
        />
        <div
          className="pointer-events-none absolute -bottom-48 -right-24 h-[520px] w-[520px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(0,212,255,0.12), transparent 65%)' }}
        />

        <div className="relative mx-auto max-w-7xl px-6">
          <div className="mb-14 text-center">
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#00d4ff]">
              Why JSAN
            </span>
            <h2 className="mb-4 mt-4 text-[32px] font-bold text-white lg:text-[42px]">
              The JSAN Advantage
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-white/70">
              Four commitments that shape how every JSAN programme is scoped, staffed and reported.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {advantages.map((adv, i) => (
              <div
                key={i}
                className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.07] p-7 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1.5 hover:border-[#00d4ff]/40 hover:bg-white/[0.12] hover:shadow-[0_22px_44px_-18px_rgba(0,212,255,0.55)] ${
                  advantageInView ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
                }`}
                style={{ transitionDelay: `${i * 110}ms` }}
              >
                {/* Cyan hairline sweep */}
                <span className="pointer-events-none absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-transparent via-[#00d4ff] to-transparent transition-transform duration-500 group-hover:scale-x-100" />

                {/* Step number */}
                <span className="absolute right-6 top-6 text-2xl font-bold leading-none text-white/10 transition-colors duration-500 group-hover:text-[#00d4ff]/30">
                  0{i + 1}
                </span>

                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/15 bg-white/10 transition-all duration-500 group-hover:scale-110 group-hover:border-[#00d4ff]/40 group-hover:bg-[#00d4ff]/20">
                  <adv.icon className="h-7 w-7 text-[#00d4ff]" />
                </div>

                <h3 className="mb-3 text-base font-bold leading-snug text-white">{adv.title}</h3>
                <span className="mb-4 block h-0.5 w-10 rounded bg-[#00d4ff]/60 transition-all duration-500 group-hover:w-16" />
                <p className="text-sm leading-relaxed text-white/70">{adv.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. OUR APPROACH  Timeline Style ── */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 lg:mb-20">
            <span className="inline-block text-[#0050a9]/60 font-bold text-sm uppercase tracking-widest mb-2">How We Work</span>
            <h2 className="text-[32px] lg:text-[42px] font-bold text-[#0050a9] mb-4">
              Our Approach
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              A structured engagement model that ensures clarity, efficiency, and measurable business outcomes.
            </p>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Horizontal connecting line  desktop */}
            <div className="hidden lg:block absolute top-[52px] left-[10%] right-[10%] h-[2px]" style={{ background: 'linear-gradient(90deg, transparent, rgba(0,80,169,0.15), rgba(0,80,169,0.3), rgba(0,80,169,0.15), transparent)' }} />

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-4">
              {processSteps.map((step, i) => (
                <div key={i} className="relative group h-full">
                  {/* Vertical connector  mobile */}
                  {i < processSteps.length - 1 && (
                    <div className="md:hidden absolute left-1/2 -translate-x-1/2 top-[104px] h-8 w-[2px] bg-[#0050a9]/20" />
                  )}

                  <div className="flex h-full flex-col items-center text-center">
                    {/* Number circle */}
                    <div className="relative mb-6">
                      <div className="absolute inset-0 rounded-full bg-[#0050a9]/10 blur-xl scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="relative w-[72px] h-[72px] rounded-full flex items-center justify-center text-white font-bold text-xl border-2 border-[#0050a9]/20 group-hover:border-[#0050a9] transition-all duration-500 group-hover:scale-110 bg-[#0050a9]">
                        {String(i + 1).padStart(2, '0')}
                      </div>
                      {/* Dot on the line */}
                      <div className="hidden lg:block absolute -bottom-[10px] left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[#0050a9] border-2 border-white" />
                    </div>

                    {/* Card */}
                    <div className="flex w-full flex-1 flex-col justify-center rounded-2xl border border-[#0050a9]/10 bg-[#f0f7ff] p-6 transition-all duration-500 group-hover:-translate-y-1 group-hover:border-[#0050a9]/25 group-hover:shadow-lg">
                      <h4 className="text-[#0050a9] font-bold text-lg mb-2">{step.step}</h4>
                      <p className="text-gray-500 text-sm leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 7. INDUSTRIES WE SUPPORT ── */}
      <section
        ref={industriesRef}
        className="relative overflow-hidden py-20 lg:py-28"
        style={{ background: 'linear-gradient(120deg, #012f62, #0055b4)' }}
      >
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
          style={{ background: 'radial-gradient(circle, rgba(0,212,255,0.2), transparent 65%)' }}
        />
        <div
          className="pointer-events-none absolute -bottom-48 -left-24 h-[520px] w-[520px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(0,212,255,0.12), transparent 65%)' }}
        />

        <div className="relative mx-auto max-w-7xl px-6">
          <div className="mb-14 text-center">
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#00d4ff]">
              Domain Expertise
            </span>
            <h2 className="mb-4 mt-4 text-[32px] font-bold text-white lg:text-[42px]">
              Industries We Support
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-white/70">
              Sector knowledge shapes how every engagement is scoped and delivered.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {industries.map((ind, i) => (
              <Link
                key={i}
                to={ind.href}
                className={`group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.07] p-7 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1.5 hover:border-[#00d4ff]/40 hover:bg-white/[0.12] hover:shadow-[0_22px_44px_-18px_rgba(0,212,255,0.55)] ${
                  industriesInView ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
                }`}
                style={{ transitionDelay: `${i * 110}ms` }}
              >
                <span className="pointer-events-none absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-transparent via-[#00d4ff] to-transparent transition-transform duration-500 group-hover:scale-x-100" />

                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/15 bg-white/10 transition-all duration-500 group-hover:scale-110 group-hover:border-[#00d4ff]/40 group-hover:bg-[#00d4ff]/20">
                  <ind.icon className="h-6 w-6 text-[#00d4ff]" />
                </div>

                <h4 className="mb-3 text-base font-bold leading-snug text-white">{ind.name}</h4>
                <p className="mb-5 flex-1 text-sm leading-relaxed text-white/70">{ind.description}</p>

                <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#00d4ff]">
                  Explore sector
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. CLOSING CTA ── */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-[32px] lg:text-[42px] font-bold text-[#0050a9] mb-6 leading-tight">
            Partnering for Long-Term Impact.
          </h2>
          <p className="text-gray-500 text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
            JSAN combines global expertise, disciplined execution, and future-ready technology to help enterprises lead in an era of rapid transformation.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-10 py-4 bg-[#0050a9] text-white font-semibold rounded-full hover:bg-[#003d82] hover:shadow-xl hover:shadow-[#0050a9]/20 transition-all text-lg"
          >
            Start a Conversation
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      <Footer />
      <MobileNav />
    </div>
  )
}
