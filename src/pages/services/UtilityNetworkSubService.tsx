import type { ElementType } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowRight, CheckCircle, Network, Zap, MapPin, Crosshair, Hash, Share2, Droplets, Layers, Eye, Smartphone, Flame, Gauge, ShieldCheck } from 'lucide-react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import MobileNav from '../../components/MobileNav'
import RelatedSubServices from '../../components/RelatedSubServices'
import ServiceContactForm from '../../components/ServiceContactForm'

interface SubServiceData {
  slug: string
  category: string
  title: string
  subtitle: string
  description: string
  bgImage: string
  advantages: { icon: ElementType; text: string }[]
  idealFor: string[]
  businessImpact: string[]
  deliverables: string[]
}

const subServiceData: SubServiceData[] = [
  {
    slug: 'electrical',
    category: 'ELECTRICAL UTILITY',
    title: 'Electrical Network Digitization',
    subtitle: 'Pole-to-Pole Capture to Enterprise GIS Migration',
    description:
      'We move electrical networks from base-map preparation through pole-to-pole field survey, codification and topology QA to enterprise GIS migration  land-base extraction, drone/mobile capture, GDB creation and final network maps ready for GE Smallworld or ArcGIS.',
    bgImage: '/pillars/utility-network.jpg',
    advantages: [
      { icon: Zap, text: 'Pole, line and transformer digitization across the network' },
      { icon: MapPin, text: 'Land-base extraction from satellite imagery with base-map fit' },
      { icon: Crosshair, text: 'Drone and mobile-app field survey with structured capture' },
      { icon: Hash, text: 'Pole codification and field verification to your standards' },
      { icon: Share2, text: 'Topology integrity  connectivity and network rules validated' },
    ],
    idealFor: ['Power distribution utilities', 'Transmission operators', 'Rural electrification programs', 'Utility GIS departments', 'EPC contractors'],
    businessImpact: [
      'Accurate, topology-ready electrical network in enterprise GIS',
      'Every asset traceable to field evidence and a QA decision',
      'Consumer indexing linked to network assets',
      'Migration-ready geodatabase for GE Smallworld / ArcGIS',
      'Reduced rework through gated spatial and attribute QA',
    ],
    deliverables: [
      'Land-base / reference layers',
      'Electrical asset network map',
      'Consumer indexing map',
      'GIS geodatabase (GDB)',
      'QA/QC status and corrections',
      'Target-system migration package',
    ],
  },
  {
    slug: 'water',
    category: 'WATER UTILITY',
    title: 'Water Distribution GIS',
    subtitle: 'Distribution Assets & Consumer Indexing for Zone-Level Control',
    description:
      'We connect distribution assets and consumer indexing to maintenance, leak-response and zone-level planning  GPS-enabled capture of valves, hydrants, meters and consumer connections, delivered as water-distribution GIS and zonal / DMA map outputs.',
    bgImage: '/pillars/spatial-analytics.jpg',
    advantages: [
      { icon: Droplets, text: 'GPS-enabled capture of valves, hydrants and meters' },
      { icon: MapPin, text: 'Consumer connection mapping and indexing' },
      { icon: Layers, text: 'Zonal / DMA-wise map outputs for operational control' },
      { icon: Smartphone, text: 'Offline mobile capture with photo geo-tagging and sync' },
      { icon: Eye, text: 'Asset visibility to locate and validate field assets' },
    ],
    idealFor: ['Water distribution utilities', 'Municipal water boards', 'DMA / NRW programs', 'Facilities & maintenance teams', 'Regulatory compliance teams'],
    businessImpact: [
      'Improved network visibility across the distribution system',
      'Better maintenance planning and inspection prioritization',
      'Improved spatial context for leak identification and response',
      'Zone / DMA-level decision support',
      'GPS-enabled asset register as a single source of truth',
    ],
    deliverables: [
      'Water distribution network GIS',
      'Consumer indexing database',
      'GPS-enabled asset register',
      'Zonal / DMA-wise utility maps',
      'Asset photo and geo-tag evidence',
      'Operational dashboards',
    ],
  },
  {
    slug: 'gas',
    category: 'GAS UTILITY',
    title: 'Gas Network Digitization',
    subtitle: 'Safety-Critical Asset Traceability & Pressure-Area Intelligence',
    description:
      'We prioritize safety-critical asset traceability, service connections and pressure-area intelligence  GPS survey, photo documentation and optional barcode/QR capture of pipelines, valves, regulators, pressure stations and service connections, delivered as GIS and pressure-zone / service-area maps.',
    bgImage: '/pillars/asset-management.jpg',
    advantages: [
      { icon: Flame, text: 'Safety-focused inventory of pipelines, valves and regulators' },
      { icon: Gauge, text: 'Pressure stations and pressure-zone / service-area mapping' },
      { icon: Crosshair, text: 'GPS-enabled field survey with photo documentation' },
      { icon: Hash, text: 'Optional barcode / QR asset capture and identifiers' },
      { icon: ShieldCheck, text: 'Spatial and attribute QA before GIS database creation' },
    ],
    idealFor: ['Gas distribution utilities', 'City gas distribution (CGD) programs', 'Pipeline operators', 'HSE / safety teams', 'Emergency-response planners'],
    businessImpact: [
      'Improved safety compliance through traceable asset records',
      'Faster leak response with accurate spatial context',
      'Reduced asset loss and accurate network inventory',
      'Pressure-zone and service-area intelligence',
      'Evidence package for network expansion and emergency response',
    ],
    deliverables: [
      'Gas distribution network maps',
      'Consumer indexing maps',
      'Pressure-zone / service-area maps',
      'Structured GIS database (assets + consumers)',
      'Field-survey and photo evidence',
      'Operations dashboard',
    ],
  },
]

const titleCase = (s: string) => s.split(' ').map((w) => (w.length <= 3 ? w : w.charAt(0) + w.slice(1).toLowerCase())).join(' ')

export default function UtilityNetworkSubService() {
  const { slug } = useParams<{ slug: string }>()
  const service = subServiceData.find((s) => s.slug === slug)

  if (!service) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Service Not Found</h1>
          <Link to="/services/utility-network-intelligence" className="text-[#0050a9] hover:underline">
            &larr; Back to Utility Network Intelligence
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden pt-28 lg:pt-36 pb-20 lg:pb-28" style={{ marginTop: '44px' }}>
        <div className="absolute inset-0">
          <img src={service.bgImage} alt={service.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
        </div>

        <div className="absolute top-0 left-0 right-0 bg-black/20 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link to="/services" className="text-white/70 hover:text-white transition-colors">Services</Link>
              <span className="text-white/50">/</span>
              <Link to="/services/utility-network-intelligence" className="text-white/70 hover:text-white transition-colors">Utility Network Intelligence</Link>
              <span className="text-white/50">/</span>
              <span className="text-white/90 font-medium">{titleCase(service.category)}</span>
            </div>
            <span className="hidden sm:inline-flex items-center gap-2 bg-white/10 text-[#00d4ff] px-3 py-1 rounded-full text-sm font-semibold">
              <Network className="w-4 h-4" />
              {service.category}
            </span>
          </div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <h1 className="text-white text-[36px] md:text-[48px] lg:text-[56px] font-bold leading-[1.1] mb-4 tracking-tight">
            {service.title}
          </h1>
          <p className="text-white/85 text-lg md:text-xl lg:text-2xl leading-relaxed mb-6">
            {service.subtitle}
          </p>
        </div>
      </section>

      {/* Detail Section */}
      <section className="py-20" style={{ background: 'linear-gradient(120deg, #012f62, #0055b4)' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="text-[36px] lg:text-[44px] font-bold text-white mb-4 leading-tight">
                Why {titleCase(service.category)}?
              </h2>
              <p className="text-white/75 text-lg leading-relaxed mb-8">
                {service.description}
              </p>

              <div className="space-y-3 mb-10">
                {service.advantages.map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-5 h-5 text-[#00d4ff]" />
                    </div>
                    <span className="text-white/90">{item.text}</span>
                  </div>
                ))}
              </div>

              <a href="/contact" className="btn-primary">
                Discuss Your Project
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </div>

            <div className="space-y-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                <h3 className="text-xl font-bold text-white mb-5">Ideal For</h3>
                <div className="flex flex-wrap gap-3">
                  {service.idealFor.map((item, i) => (
                    <span key={i} className="bg-white/10 text-white/90 px-4 py-2 rounded-full text-sm font-medium border border-white/10">
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                <h3 className="text-xl font-bold text-white mb-5">Business Impact</h3>
                <div className="space-y-3">
                  {service.businessImpact.map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-[#00d4ff] flex-shrink-0" />
                      <span className="text-white/90">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Deliver + CTA */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-[36px] lg:text-[42px] font-bold text-[#0050a9] mb-4">
                What We Deliver
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                Every engagement produces a field-validated, quality-assured deliverable package, ready for migration into your enterprise GIS.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {service.deliverables.map((item, i) => (
                  <div key={i} className="flex items-start gap-3 bg-white rounded-xl p-4 border border-gray-100">
                    <div className="w-8 h-8 bg-[#0050a9] rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle className="w-4 h-4 text-[#00d4ff]" />
                    </div>
                    <span className="text-[#0050a9] font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl p-8 lg:p-10" style={{ background: 'linear-gradient(120deg, #012f62, #0055b4)' }}>
              <h3 className="text-2xl font-bold text-white mb-3">
                Interested in {titleCase(service.category)}?
              </h3>
              <p className="text-white/70 text-base leading-relaxed mb-8">
                Talk to our team about digitizing your network, validating field data and migrating to your enterprise GIS platform.
              </p>
              <div className="space-y-4">
                <a
                  href="/contact"
                  className="flex items-center gap-4 bg-white/10 hover:bg-white/15 border border-white/10 rounded-xl p-5 transition-colors group"
                >
                  <div className="w-12 h-12 bg-[#00d4ff]/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-[#00d4ff]" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-white font-semibold">Get in Touch</h4>
                    <p className="text-white/60 text-sm">Discuss your utility GIS program</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-white/40 group-hover:text-white/80 transition-colors" />
                </a>
                <Link
                  to="/services/utility-network-intelligence"
                  className="flex items-center gap-4 bg-white/10 hover:bg-white/15 border border-white/10 rounded-xl p-5 transition-colors group"
                >
                  <div className="w-12 h-12 bg-[#00d4ff]/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Network className="w-6 h-6 text-[#00d4ff]" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-white font-semibold">Back to Utility Network Intelligence</h4>
                    <p className="text-white/60 text-sm">See the full operating model</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-white/40 group-hover:text-white/80 transition-colors" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <RelatedSubServices
        items={subServiceData}
        basePath="/services/utility-network-intelligence"
        currentSlug={service.slug}
        parentName="Utility Network Intelligence"
      />

      <div id="contact">
        <ServiceContactForm
          serviceName={service.title}
          subServices={subServiceData.map((item) => ({ value: item.title, label: item.title }))}
        />
      </div>

      <Footer />
      <MobileNav />
    </div>
  )
}
