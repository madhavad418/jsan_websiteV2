import { Link } from 'react-router-dom'
import { ArrowRight, Globe2, Search, Radar, Filter, GitCompare, MapPinned, Crosshair, ShieldCheck, FileSpreadsheet, Wallet, Layers, CheckCircle, Award, Database } from 'lucide-react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import MobileNav from '../../components/MobileNav'

const stats = [
  { value: 'Multi-Provider', label: 'Cross-Source Comparison', icon: GitCompare },
  { value: 'Nationwide', label: 'Scalable City Coverage', icon: MapPinned },
  { value: '100%', label: 'Evidence-Backed Findings', icon: ShieldCheck },
  { value: 'Audit-Ready', label: 'Customer Deliverable', icon: FileSpreadsheet },
]

/* What a customer can shape about a programme. Kept alongside the capability
   stats so the page reads as "built, proven, and configurable to you" rather
   than as a tally of the runs completed so far. */
const tailored = [
  { icon: MapPinned, title: 'Any Geography', description: 'A single district, a city, a region or a national rollout  the coverage model scales to whatever area your programme needs.' },
  { icon: Layers, title: 'Any POI Category', description: 'Retail, hospitality, healthcare, automotive, services  classification is configured to the categories that matter to you.' },
  { icon: Globe2, title: 'Your Data Sources', description: 'We compare the map and POI providers your business actually depends on, not a fixed pair.' },
]

const features = [
  { icon: Globe2, title: 'Multi-Provider Sweep', description: 'Independent map providers swept across the same defined area, so coverage can be compared like for like.', gradient: 'from-blue-600 to-cyan-500' },
  { icon: Layers, title: 'Adaptive Coverage', description: 'The target area is tiled automatically, and dense areas are subdivided so nothing is quietly missed.', gradient: 'from-indigo-500 to-violet-500' },
  { icon: Filter, title: 'Category Classification', description: 'Each provider is filtered on its own taxonomy, keeping the comparison set clean and business-relevant.', gradient: 'from-green-500 to-emerald-500' },
  { icon: GitCompare, title: 'Explainable Matching', description: 'Records are paired on name, location and address signals, with every decision storing the reasoning behind it.', gradient: 'from-orange-500 to-amber-500' },
  { icon: Radar, title: 'Verification Probe', description: 'Anything left undecided gets a targeted live lookup in the other provider before it is ever called a gap.', gradient: 'from-blue-500 to-cyan-500' },
  { icon: Crosshair, title: 'Real Coordinates', description: 'Every record carries its actual source coordinates, mapped in interactive layers by comparison outcome.', gradient: 'from-teal-500 to-cyan-500' },
  { icon: Wallet, title: 'Cost Guardrails', description: 'Call caps and a confirmed budget ceiling per run, so discovery never overspends by accident.', gradient: 'from-yellow-500 to-orange-500' },
  { icon: FileSpreadsheet, title: 'Audit-Ready Workbook', description: 'A structured export where every row carries the evidence behind its verdict, ready to hand to a customer.', gradient: 'from-rose-500 to-pink-500' },
]

const workflow = [
  { step: '01', icon: Search, title: 'Discover', description: 'Your chosen providers are swept across the agreed area under a confirmed budget.' },
  { step: '02', icon: Filter, title: 'Classify', description: 'Records are normalised and filtered to the categories that matter to the programme.' },
  { step: '03', icon: GitCompare, title: 'Compare', description: 'Cross-provider pairs are scored, and confirmed matches are separated from open questions.' },
  { step: '04', icon: ShieldCheck, title: 'Verify & Report', description: 'Remaining records are verified, then packaged with their evidence into the customer workbook.' },
]

const modules = [
  { num: '01', name: 'Executive Overview', description: 'Headline comparison outcome at a glance' },
  { num: '02', name: 'Comparison Proof', description: 'Open any match and see the reasoning behind it' },
  { num: '03', name: 'Priority Sample', description: 'The shortlist queued for validation first' },
  { num: '04', name: 'Coverage Map', description: 'Interactive layers on real source coordinates' },
  { num: '05', name: 'Cost & Scale', description: 'Spend, call limits and the multi-city scale plan' },
  { num: '06', name: 'Customer Pack', description: 'The governed workbook, ready to hand over' },
  { num: '07', name: 'Validation Layer', description: 'Enrichment, activity checks and QA gates' },
  { num: '08', name: 'Cities & Scraping', description: 'City catalogue and controlled collection jobs' },
  { num: '09', name: 'Scrape Data', description: 'Collected records with full source lineage' },
]

export default function JsanGeoDiscover() {
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
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
              <div>
              <nav className="mb-5 flex items-center gap-2 text-sm text-gray-500">
                <Link to="/in-house-apps" className="transition-colors hover:text-[#0050a9]">
                  Products
                </Link>
                <span>/</span>
                <span className="font-medium text-[#0050a9]">JSAN GeoDiscover</span>
              </nav>

              <div className="mb-5 flex flex-wrap items-center gap-3">
                  <span className="rounded-full border border-blue-100 bg-blue-50 px-4 py-1.5 text-sm font-medium text-[#0050a9]">Evidence-Based</span>
                  <span className="rounded-full border border-blue-100 bg-blue-50 px-4 py-1.5 text-sm font-medium text-[#0050a9]">Cost-Governed</span>
                <span className="inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-3 py-1.5 text-xs font-bold text-green-700">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
                  LIVE PRODUCT
                </span>
              </div>

              <h1 className="mb-3 text-[38px] font-bold leading-[1.06] tracking-tight text-[#0a1a3a] lg:text-[54px]">
                JSAN GeoDiscover
              </h1>
              <p className="mb-6 text-[22px] font-semibold leading-tight text-[#0050a9] lg:text-[28px]">
                Cross-Provider POI Discovery &amp; Verification
              </p>
              <p className="mb-9 max-w-2xl text-lg leading-relaxed text-gray-600">
                Our own platform for comparing point-of-interest coverage across independent map providers and showing what each one is missing  every finding backed by evidence, delivered as an audit-ready workbook, configured to your geography and your categories.
              </p>

              <div className="flex flex-wrap items-center gap-4">
                  <a
                    href="/contact"
                    className="group inline-flex items-center gap-2.5 rounded-lg px-7 py-3.5 font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_34px_-14px_rgba(0,80,169,0.9)]"
                    style={{ background: 'linear-gradient(120deg, #012f62, #0055b4)' }}
                  >
                    Request a Benchmark
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </a>
                  <a
                    href="/contact"
                    className="group inline-flex items-center gap-2 rounded-lg border-2 border-[#0050a9]/20 px-7 py-3.5 font-semibold text-[#0050a9] transition-all duration-300 hover:border-[#0050a9] hover:bg-[#0050a9] hover:text-white"
                  >
                    Book a Walkthrough
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </a>
                </div>
            </div>

            {/* Stats moved out of the dark band that used to sit under this hero, so the
                page no longer alternates white -> dark -> white on the way down */}
            <div className="lg:pt-4">
              <div
                className="relative overflow-hidden rounded-2xl p-7 shadow-[0_28px_60px_-30px_rgba(0,80,169,0.85)] lg:p-9"
                style={{ background: 'linear-gradient(135deg, #012f62 0%, #0050a9 55%, #0a7fd4 100%)' }}
              >
                <div
                  className="pointer-events-none absolute inset-0 opacity-[0.08]"
                  style={{
                    backgroundImage:
                      'linear-gradient(rgba(255,255,255,.9) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.9) 1px, transparent 1px)',
                    backgroundSize: '38px 38px',
                  }}
                />
                <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[#00d4ff]/25 blur-3xl" />

                <div className="relative grid grid-cols-2 gap-x-6 gap-y-8">
                  {stats.map((stat, index) => (
                    <div key={index}>
                      <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-white/15 ring-1 ring-white/20">
                        <stat.icon className="h-5 w-5 text-white" />
                      </div>
                      <div className="text-2xl font-bold leading-none text-white lg:text-3xl">{stat.value}</div>
                      <div className="mt-1.5 text-sm text-white">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div>
              <span className="inline-block bg-[#0050a9]/10 text-[#0050a9] px-4 py-2 rounded-full text-sm font-semibold mb-4">
                Overview
              </span>
              <h2 className="text-[36px] lg:text-[44px] font-bold text-[#0050a9] mb-6 leading-tight">
                Know what your map data is actually missing
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-5">
                Location programmes usually rely on a single provider, with no reliable way to tell whether a place is
                genuinely absent from a dataset or simply was not found. We built GeoDiscover to answer that question
                properly, and we run it on our own programmes.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                It sweeps independent providers across the same defined area, matches what they share, and verifies what
                they do not so every gap it reports is supported by evidence rather than assumption, and every run
                stays inside an agreed budget. We can point it at whichever geography, categories and providers your
                business depends on.
              </p>
              <ul className="space-y-3">
                {[
                  'Like-for-like coverage comparison over a defined area',
                  'Confirmed matches separated from open questions',
                  'Verified findings, with anything undecided reported as such',
                  'A prioritised validation queue and an audit-ready export',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-700">
                    <CheckCircle className="w-5 h-5 text-[#0050a9] flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <div className="absolute -inset-3 bg-gradient-to-r from-[#0050a9]/10 to-cyan-500/10 rounded-3xl blur-2xl"></div>
              <div className="relative rounded-2xl overflow-hidden border border-gray-200 shadow-xl bg-white">
                <img
                  src="/products/geo.png"
                  alt="JSAN GeoDiscover executive summary"
                  className="w-full object-contain"
                />
              </div>
        
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block bg-[#1b497b]/10 text-[#1b497b] px-4 py-2 rounded-full text-sm font-semibold mb-4">
              How It Works
            </span>
            <h2 className="text-[36px] lg:text-[48px] font-bold text-[#0050a9] mb-4">Four Steps to a Verified Answer</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {workflow.map((stage, index) => (
              <div key={index} className="group relative bg-gradient-to-b from-white to-gray-50 rounded-2xl p-7 border border-gray-100 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <span className="absolute top-5 right-6 text-4xl font-bold text-[#0050a9]/10 group-hover:text-[#0050a9]/20 transition-colors">
                  {stage.step}
                </span>
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#012f62] to-[#0055b4] flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <stage.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-lg font-bold text-[#0050a9] mb-2">{stage.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{stage.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-[#0050a9] relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full" style={{
            backgroundImage: `radial-gradient(circle at 20% 30%, #1b497b 0%, transparent 40%),
                              radial-gradient(circle at 80% 70%, #00d4ff 0%, transparent 45%)`,
          }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="text-center mb-16">
            <span className="inline-block bg-white/10 text-[#7db8e8] px-4 py-2 rounded-full text-sm font-semibold mb-4 backdrop-blur-sm">
              Core Features
            </span>
            <h2 className="text-[36px] lg:text-[48px] font-bold text-white mb-4">8 Core Capabilities</h2>
            <p className="text-white/70 text-xl max-w-3xl mx-auto">
              Built for programmes where a wrong number costs more than a slow one.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="group bg-white rounded-2xl p-6 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-gray-100">
                <div className={`w-14 h-14 bg-gradient-to-br ${feature.gradient} rounded-xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-lg font-bold text-[#0050a9] mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modules */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block bg-[#0050a9]/10 text-[#0050a9] px-4 py-2 rounded-full text-sm font-semibold mb-4">
              Platform Modules
            </span>
            <h2 className="text-[36px] lg:text-[48px] font-bold text-[#0050a9] mb-4">The Executive Workspace</h2>
            <p className="text-gray-600 text-xl max-w-3xl mx-auto">
              Nine modules that take a stakeholder from headline outcome to per-record evidence in a single session.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {modules.map((module, index) => (
              <div key={index} className="group bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-lg hover:border-[#0050a9]/20 transition-all duration-300">
                <div className="flex items-center gap-4">
                  <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-lg bg-[#e8f4fc] font-mono text-sm font-bold text-[#0050a9] group-hover:bg-[#0050a9] group-hover:text-white transition-colors">
                    {module.num}
                  </span>
                  <div>
                    <h3 className="font-bold text-[#0050a9] leading-tight">{module.name}</h3>
                    <p className="text-gray-600 text-sm mt-1 leading-relaxed">{module.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Tailoring */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block bg-[#1b497b]/10 text-[#1b497b] px-4 py-2 rounded-full text-sm font-semibold mb-4">
              Built for Your Programme
            </span>
            <h2 className="text-[36px] lg:text-[48px] font-bold text-[#0050a9] mb-4">Shaped Around What You Need</h2>
            <p className="text-gray-600 text-xl max-w-3xl mx-auto">
              The platform is ours and already running. What it looks at is entirely yours to define.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {tailored.map((item, index) => (
              <div key={index} className="group bg-gradient-to-b from-white to-gray-50 rounded-2xl p-8 border border-gray-100 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#012f62] to-[#0055b4] flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <item.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-[#0050a9] mb-3">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { icon: MapPinned, title: 'Scoped and Priced Upfront', text: 'Every area is defined before a run starts, so you know the coverage and the cost in advance.' },
              { icon: Search, title: 'Deterministic, Not Guesswork', text: 'Matching uses stored signals, so any finding can be re-derived and defended later.' },
              { icon: Database, title: 'Secure by Default', text: 'Role-aware access, protected APIs and a full audit trail across every material change.' },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-[#e8f4fc] flex items-center justify-center">
                  <item.icon className="w-7 h-7 text-[#0050a9]" />
                </div>
                <h4 className="font-bold text-[#0050a9] mb-2">{item.title}</h4>
                <p className="text-gray-600 text-sm leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="bg-gradient-to-br from-[#e8f4fc] to-[#d0e8f7] rounded-3xl p-8 lg:p-12 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-600/10 to-transparent rounded-bl-full"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-[#1b497b]/10 to-transparent rounded-tr-full"></div>

            <div className="relative">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6 shadow-lg">
                <Award className="w-4 h-4" />
                Location Intelligence
              </div>
              <h2 className="text-[36px] lg:text-[48px] font-bold text-[#0050a9] mb-6">
                Ready to see where your coverage gaps are?
              </h2>
              <p className="text-gray-600 text-xl mb-8 max-w-2xl mx-auto">
                Tell us the area, the categories and the providers that matter to you. We will run a controlled
                benchmark and return an evidence-backed workbook, a priority validation queue and a costed plan for
                scaling it as far as you need.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a href="/contact" className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-700 to-cyan-600 text-white font-semibold rounded-xl hover:shadow-xl hover:shadow-blue-600/30 transition-all duration-300 hover:-translate-y-1">
                  Start a Benchmark
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
                <a href="/in-house-apps" className="group inline-flex items-center gap-2 px-8 py-4 border-2 border-[#1b497b] text-[#1b497b] font-semibold rounded-xl hover:bg-[#1b497b] hover:text-white transition-all duration-300">
                  View All Products
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <MobileNav />
    </div>
  )
}
