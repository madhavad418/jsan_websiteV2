import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Play, Shield, Zap, Globe, Award, Map, Network, BarChart3, Cloud, Lock, Database, GitBranch, Bot, Server, Code } from 'lucide-react'
import { totals } from '../config/countAllocations'
import Header from '../components/Header'
import Footer from '../components/Footer'
import MobileNav from '../components/MobileNav'

const technologies = [
  {
    title: 'GIS',
    icon: Map,
    group: 'data',
    slug: '/technologies/gis',
    description: 'Harness geographic data with our Geographic Information System solutions for spatial analysis and mapping.',
    image: '/pillars/tech-gis.webp',
    tags: ['QGIS', 'PostGIS', 'Mapbox'],
  },
  {
    title: 'API Integration',
    icon: Network,
    group: 'apps',
    slug: '/technologies/api-integration',
    description: 'Connect systems, applications, and data sources with our expert API integration services.',
    image: '/pillars/tech-api.webp',
    tags: ['REST APIs', 'GraphQL', 'Microservices'],
  },
  {
    title: 'Analytics & Information Management',
    icon: BarChart3,
    group: 'data',
    slug: '/technologies/analytics',
    description: 'Transform raw data into actionable insights with advanced analytics and information management solutions.',
    image: '/pillars/tech-analytics.webp',
    tags: ['Power BI', 'Tableau', 'Big Data'],
  },
  {
    title: 'Cloud Technologies',
    icon: Cloud,
    group: 'cloud',
    slug: '/technologies/cloud',
    description: 'Leverage the power of cloud computing with our AWS, Azure, and Google Cloud expertise.',
    image: '/pillars/tech-cloud.webp',
    tags: ['AWS', 'Azure', 'Google Cloud'],
  },
  {
    title: 'Cyber Security',
    icon: Lock,
    group: 'cloud',
    slug: '/technologies/cyber-security',
    description: 'Protect your digital assets with comprehensive cybersecurity solutions and threat management.',
    image: '/pillars/tech-cybersecurity.webp',
    tags: ['SIEM', 'Zero Trust', 'Compliance'],
  },
  {
    title: 'Data Warehouse',
    icon: Database,
    group: 'data',
    slug: '/technologies/data-warehouse',
    description: 'Build scalable data warehouse solutions for efficient storage, retrieval, and analysis of enterprise data.',
    image: '/pillars/tech-datawarehouse.webp',
    tags: ['Snowflake', 'Redshift', 'BigQuery'],
  },
  {
    title: 'DevOps',
    icon: GitBranch,
    group: 'cloud',
    slug: '/technologies/devops',
    description: 'Accelerate software delivery with our DevOps practices, CI/CD pipelines, and automation expertise.',
    image: '/pillars/tech-devops.webp',
    tags: ['CI/CD', 'Kubernetes', 'Docker'],
  },
  {
    title: 'Intelligent Automation & Robotics',
    icon: Bot,
    group: 'apps',
    slug: '/technologies/automation',
    description: 'Transform business processes with RPA, AI-powered automation, and intelligent robotics solutions.',
    image: '/pillars/tech-automation.webp',
    tags: ['RPA', 'UiPath', 'AI/ML'],
  },
  {
    title: 'IT Infrastructure & Managed Services',
    icon: Server,
    group: 'cloud',
    slug: '/technologies/it-infrastructure',
    description: 'Build and manage robust IT infrastructure with our comprehensive managed services solutions.',
    image: '/pillars/tech-infrastructure.webp',
    tags: ['NOC', '24/7 Support', 'Cloud Infra'],
  },
  {
    title: 'Web Technologies',
    icon: Code,
    group: 'apps',
    slug: '/technologies/web',
    description: 'Create powerful web applications with modern frameworks, responsive design, and current, well-supported technologies.',
    image: '/pillars/tech-web.webp',
    tags: ['React', 'Node.js', 'TypeScript'],
  },
]

const stats = [
  { value: '11+', label: 'Technology Domains' },
  { value: totals.people, label: 'Specialists' },
  { value: totals.projects, label: 'Projects Delivered' },
  { value: '24/7', label: 'Support Available' },
]

const whyChoose = [
  {
    icon: Award,
    title: 'Certified Experts',
    description: 'Our team holds certifications across all major technology platforms.',
  },
  {
    icon: Zap,
    title: 'Agile Methodology',
    description: 'We deliver faster with iterative development and continuous improvement.',
  },
  {
    icon: Globe,
    title: 'Global Delivery',
    description: '24/7 support with teams across 25+ countries worldwide.',
  },
  {
    icon: Shield,
    title: 'Enterprise Security',
    description: 'Security-first approach with compliance across industry standards.',
  },
]

const techGroups = [
  { id: 'data', label: 'Data & Geospatial' },
  { id: 'cloud', label: 'Cloud, Infrastructure & Security' },
  { id: 'apps', label: 'Applications & Automation' },
]

export default function Technologies() {
  const [activeTech, setActiveTech] = useState(0)
  const ActiveIcon = technologies[activeTech].icon

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden bg-white pt-24 lg:pt-28 pb-16 lg:pb-20" style={{ marginTop: '44px' }}>
        {/* Brand wash and a faint blueprint grid keep a white hero from reading as empty */}
        <div className="pointer-events-none absolute inset-0">
          <div
            className="absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage:
                'linear-gradient(rgba(0,80,169,.8) 1px, transparent 1px), linear-gradient(90deg, rgba(0,80,169,.8) 1px, transparent 1px)',
              backgroundSize: '46px 46px',
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(38% 55% at 4% 8%, rgba(0,80,169,0.08) 0%, rgba(0,80,169,0) 100%), ' +
                'radial-gradient(42% 50% at 78% 95%, rgba(0,212,255,0.12) 0%, rgba(0,212,255,0) 100%)',
            }}
          />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6">
          <div className="max-w-3xl">
            <span className="mb-5 inline-block t-label text-gray-500">
              Technologies
            </span>
            <h1 className="mb-5 text-[34px] font-bold leading-[1.06] tracking-tight text-[#0a1a3a] lg:text-[52px]">
              One partner across your entire technology stack.
            </h1>
            <p className="mb-9 max-w-2xl text-lg leading-relaxed text-gray-600">
              From geospatial and analytics to cloud, security and automation  {technologies.length} technology
              domains, delivered by certified specialists.
            </p>

            <div className="mb-9 flex flex-wrap gap-x-10 gap-y-5">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <div className="text-2xl font-bold text-[#0050a9] lg:text-3xl">{stat.value}</div>
                  <div className="mt-0.5 text-xs text-[#0050a9]">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#tech-stack"
                className="group inline-flex items-center gap-2.5 rounded-lg px-7 py-3.5 font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_34px_-14px_rgba(0,80,169,0.9)]"
                style={{ background: 'linear-gradient(120deg, #012f62, #0055b4)' }}
              >
                Explore the Stack
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <Link
                to="/contact"
                className="group inline-flex items-center gap-2 rounded-lg border-2 border-[#0050a9]/20 px-7 py-3.5 font-semibold text-[#0050a9] transition-all duration-300 hover:border-[#0050a9] hover:bg-[#0050a9] hover:text-white"
              >
                Talk to an Expert
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Technologies Grid */}
      <section id="tech-stack" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="inline-block text-[#0050a9] font-bold text-sm uppercase tracking-widest mb-3">Our Expertise</span>
            <h2 className="text-[36px] lg:text-[42px] font-bold mb-4 text-gradient">
              Technology Solutions We Deliver
            </h2>
          </div>

          {/* Index + live preview. Rows navigate; hovering one swaps the panel. */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
            {/* Index */}
            <div className="lg:col-span-5">
              {techGroups.map((group) => {
                const items = technologies.filter((item) => item.group === group.id)
                return (
                  <div key={group.id} className="mb-8 last:mb-0">
                    <div className="mb-3 flex items-baseline justify-between border-b border-gray-200 pb-2">
                      <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#0050a9]">
                        {group.label}
                      </h3>
                      <span className="text-xs font-semibold text-gray-400">{items.length}</span>
                    </div>

                    <ul>
                      {items.map((item) => {
                        const index = technologies.indexOf(item)
                        const isActive = activeTech === index
                        return (
                          <li key={item.slug}>
                            <Link
                              to={item.slug}
                              onMouseEnter={() => setActiveTech(index)}
                              onFocus={() => setActiveTech(index)}
                              className={`group relative flex items-center gap-4 rounded-xl px-4 py-3.5 transition-all duration-300 ${
                                isActive ? 'bg-white shadow-md' : 'hover:bg-white/70'
                              }`}
                            >
                              <span
                                className={`absolute left-0 top-1/2 h-8 w-1 -translate-y-1/2 rounded-r bg-gradient-to-b from-[#0050a9] to-[#00d4ff] transition-opacity duration-300 ${
                                  isActive ? 'opacity-100' : 'opacity-0'
                                }`}
                              />
                              <span
                                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-all duration-300 ${
                                  isActive
                                    ? 'scale-105 text-white'
                                    : 'bg-blue-50 text-[#0050a9] group-hover:bg-blue-100'
                                }`}
                                style={
                                  isActive
                                    ? { background: 'linear-gradient(140deg, #012f62, #0055b4)' }
                                    : undefined
                                }
                              >
                                <item.icon className="h-5 w-5" />
                              </span>

                              <span className="min-w-0 flex-1">
                                <span
                                  className={`block truncate font-semibold transition-colors ${
                                    isActive ? 'text-[#0050a9]' : 'text-gray-700 group-hover:text-[#0050a9]'
                                  }`}
                                >
                                  {item.title}
                                </span>
                                <span className="block truncate text-xs text-gray-500">
                                  {item.tags.join(' · ')}
                                </span>
                              </span>

                              <ArrowRight
                                className={`h-4 w-4 shrink-0 transition-all duration-300 ${
                                  isActive
                                    ? 'translate-x-0 text-[#00d4ff] opacity-100'
                                    : '-translate-x-2 text-[#0050a9] opacity-0 group-hover:translate-x-0 group-hover:opacity-100'
                                }`}
                              />
                            </Link>
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                )
              })}
            </div>

            {/* Live preview, sticky beside the index */}
            <div className="hidden lg:col-span-7 lg:block">
              <div className="sticky top-32 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xl">
                <div className="relative h-72 overflow-hidden">
                  {technologies.map((item, index) => (
                    <img
                      key={item.slug}
                      src={item.image}
                      alt={item.title}
                      className={`absolute inset-0 h-full w-full object-cover transition-all duration-700 ${
                        activeTech === index ? 'scale-100 opacity-100' : 'scale-105 opacity-0'
                      }`}
                    />
                  ))}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#012f62] via-[#012f62]/40 to-transparent" />

                  <div className="absolute left-6 top-6 flex h-12 w-12 items-center justify-center rounded-xl border border-white/20 bg-white/15 backdrop-blur-md">
                    <ActiveIcon className="h-6 w-6 text-white" />
                  </div>

                  <h3 className="absolute bottom-0 left-0 right-0 p-6 text-3xl font-bold leading-tight text-white">
                    {technologies[activeTech].title}
                  </h3>
                </div>

                <div className="p-7">
                  <p className="mb-5 text-base leading-relaxed text-gray-600">
                    {technologies[activeTech].description}
                  </p>

                  <div className="mb-7 flex flex-wrap gap-2">
                    {technologies[activeTech].tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-xs text-[#0050a9]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <Link
                    to={technologies[activeTech].slug}
                    className="group inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_26px_-10px_rgba(0,80,169,0.85)]"
                    style={{ background: 'linear-gradient(120deg, #012f62, #0055b4)' }}
                  >
                    Explore This Technology
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose JSAN */}
      <section className="py-20" style={{ background: 'linear-gradient(120deg, #012f62, #0055b4)' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-[36px] lg:text-[42px] font-bold text-white mb-4">
              Why Choose JSAN for Technology?
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChoose.map((item, i) => (
              <div key={i} className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/15 transition-all duration-300">
                <div className="w-14 h-14 rounded-xl bg-white/10 flex items-center justify-center mb-5 border border-white/10">
                  <item.icon className="w-7 h-7 text-[#00d4ff]" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-[36px] lg:text-[42px] font-bold mb-4 text-gradient">
            Ready to Modernise Your Operations?
          </h2>
          <p className="text-gray-600 text-lg mb-10">
            Partner with JSAN Consulting to unlock your organization's full potential. Let's discuss how we can help you achieve your digital transformation goals.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="/contact" className="btn-primary inline-flex items-center gap-2">
              Schedule a Consultation
              <Play className="w-4 h-4 fill-current" />
            </a>
            <Link to="/services" className="inline-flex items-center gap-2 px-6 py-3 border-2 border-[#0050a9] text-[#0050a9] font-semibold rounded-full hover:bg-[#0050a9] hover:text-white transition-colors">
              View All Services
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
      <MobileNav />
    </div>
  )
}
