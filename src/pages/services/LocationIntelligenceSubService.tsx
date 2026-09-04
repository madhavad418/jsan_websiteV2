import { useParams, Link } from 'react-router-dom'
import { ArrowRight, CheckCircle, Globe, Target, Shield, Clock, DollarSign, Zap, MapPin, Cpu, BarChart3, Layers, Network, Brain, Eye, Database, Map, Navigation, Compass, TrendingUp, Users, Settings, Search } from 'lucide-react'
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
  advantages: { icon: React.ElementType; text: string }[]
  idealFor: string[]
  businessImpact: string[]
  deliverables: string[]
}

const subServiceData: SubServiceData[] = [
  {
    slug: 'data-capture',
    category: 'DATA CAPTURE & ENHANCEMENT',
    title: 'Collect, Enrich & Structure Location Data at Scale',
    subtitle: 'From Raw Data to Decision-Ready Intelligence',
    description:
      'We capture, clean, and enhance geospatial data from diverse sources  field surveys, satellite imagery, public databases, and IoT sensors  transforming raw information into structured, analysis-ready datasets that power enterprise decision-making.',
    bgImage: '/pillars/data-capture.webp',
    advantages: [
      { icon: Database, text: 'Multi-source data integration from field, aerial, and digital sources' },
      { icon: Search, text: 'Automated data cleansing, deduplication, and QA/QC pipelines' },
      { icon: MapPin, text: 'Precision geocoding and spatial enrichment services' },
      { icon: Layers, text: 'Schema design and database structuring for enterprise GIS' },
      { icon: Zap, text: 'Real-time data ingestion and continuous enhancement workflows' },
    ],
    idealFor: ['Telecom operators', 'Logistics companies', 'Retail chains', 'Government agencies', 'Real estate developers'],
    businessImpact: [
      'Up to 95% improvement in data accuracy and completeness',
      'Reduced data processing time by 70% through automation',
      'Single source of truth for all location-based datasets',
      'Faster time-to-insight with analysis-ready data',
      'Reduced costs of manual data entry and correction',
    ],
    deliverables: [
      'Structured geospatial databases',
      'Data quality assessment reports',
      'Geocoded and enriched datasets',
      'ETL pipeline documentation',
      'Data governance frameworks',
      'Automated QA/QC reports',
    ],
  },
  {
    slug: 'advanced-analytics',
    category: 'ADVANCED ANALYTICS',
    title: 'Turn Location Data into Predictive Intelligence',
    subtitle: 'Spatial Data Science for Smarter Decisions',
    description:
      'Our advanced analytics solutions combine spatial data science with machine learning to uncover hidden patterns, forecast trends, and deliver actionable insights  from demand prediction and site selection to risk modelling and market intelligence.',
    bgImage: '/pillars/advance-analytics.webp',
    advantages: [
      { icon: Brain, text: 'Machine learning models trained on geospatial features' },
      { icon: BarChart3, text: 'Advanced geostatistical modelling and spatial regression' },
      { icon: TrendingUp, text: 'Predictive demand forecasting with location context' },
      { icon: Eye, text: 'Interactive spatial dashboards with real-time visualization' },
      { icon: Target, text: 'ROI-driven site selection and trade area analysis' },
    ],
    idealFor: ['Retail & FMCG brands', 'Financial institutions', 'Urban planners', 'Healthcare networks', 'Logistics providers'],
    businessImpact: [
      'Optimised site selection reducing location risk by 40%',
      'Predictive models with 90%+ accuracy on spatial features',
      'Reduced planning cycle times by up to 60%',
      'Data-backed expansion and market penetration strategies',
      'Improved resource allocation through spatial optimization',
    ],
    deliverables: [
      'Interactive spatial dashboards',
      'Predictive heat maps and models',
      'Trade area & catchment analysis',
      'Market potential reports',
      'Custom ML model packages',
      'Statistical model documentation',
    ],
  },
  {
    slug: 'custom-platforms',
    category: 'CUSTOM PLATFORMS',
    title: 'Purpose-Built Geospatial Applications',
    subtitle: 'Your Vision, Our Engineering',
    description:
      'We design and develop custom location intelligence platforms  from interactive web dashboards and mobile field apps to full-scale enterprise GIS portals  tailored to your workflows, data, and business objectives.',
    bgImage: '/pillars/custom-platforms.webp',
    advantages: [
      { icon: Settings, text: 'Fully customised UI/UX designed for your specific workflows' },
      { icon: Cpu, text: 'Scalable cloud-native architecture with API-first design' },
      { icon: Layers, text: 'Direct integration with existing ERP, CRM, and IoT systems' },
      { icon: MapPin, text: 'Interactive mapping with real-time data visualization' },
      { icon: Shield, text: 'Enterprise-grade security with role-based access control' },
    ],
    idealFor: ['Large enterprises', 'Government departments', 'Utility companies', 'Transport authorities', 'Smart city initiatives'],
    businessImpact: [
      'Unified platform replacing multiple disconnected tools',
      'Reduced operational overhead by up to 50%',
      'Faster decision-making with real-time location context',
      'Scalable solution supporting thousands of concurrent users',
      'Lower total cost of ownership vs. off-the-shelf products',
    ],
    deliverables: [
      'Custom web GIS application',
      'Mobile field data collection apps',
      'Interactive dashboards & portals',
      'API documentation and SDKs',
      'User training materials',
      'Platform support and SLA',
    ],
  },
  {
    slug: 'strategy-advisory',
    category: 'STRATEGY ADVISORY',
    title: 'Strategic Roadmaps for Location Intelligence',
    subtitle: 'From Vision to Value Realisation',
    description:
      'From technology selection and data governance to organizational readiness and ROI planning for measurable business value, we help organizations craft their location intelligence strategy.',
    bgImage: '/pillars/strategy-advisory.webp',
    advantages: [
      { icon: Compass, text: 'Comprehensive geospatial maturity assessment' },
      { icon: TrendingUp, text: 'Technology roadmaps aligned with business objectives' },
      { icon: Shield, text: 'Data governance and compliance frameworks' },
      { icon: Users, text: 'Change management and organizational readiness planning' },
      { icon: DollarSign, text: 'ROI modelling and business case development' },
    ],
    idealFor: ['C-suite executives', 'Digital transformation leaders', 'IT directors', 'GIS managers', 'Public sector strategists'],
    businessImpact: [
      'Clear roadmap reducing implementation risk by 60%',
      'Aligned technology investments with measurable ROI',
      'Improved cross-departmental adoption of location data',
      'Reduced vendor lock-in through strategic architecture',
      'Faster time-to-value for geospatial initiatives',
    ],
    deliverables: [
      'Geospatial maturity assessment report',
      'Technology roadmap and architecture',
      'Data governance framework',
      'Business case and ROI model',
      'Vendor evaluation matrix',
      'Implementation timeline and plan',
    ],
  },
  {
    slug: 'navigation-data',
    category: 'NAVIGATION DATA',
    title: 'Precision Routing & Navigation Solutions',
    subtitle: 'Powering Movement with Accurate Location Data',
    description:
      'We build, maintain, and enhance navigation datasets  from road networks and address databases to real-time traffic and fleet routing  powering logistics, delivery, ride-hailing, and autonomous mobility applications across regions.',
    bgImage: '/pillars/navigation-data.webp',
    advantages: [
      { icon: Navigation, text: 'High-precision road network mapping with turn restrictions' },
      { icon: Map, text: 'Comprehensive address database creation and maintenance' },
      { icon: Clock, text: 'Real-time traffic data integration and speed profiles' },
      { icon: Network, text: 'Multi-modal routing for logistics and fleet optimization' },
      { icon: Target, text: 'Sub-metre accuracy for last-mile delivery applications' },
    ],
    idealFor: ['Logistics companies', 'Ride-hailing platforms', 'Delivery services', 'Automotive OEMs', 'Municipal transport authorities'],
    businessImpact: [
      'Reduced delivery times by up to 25% with optimised routing',
      'Improved address accuracy eliminating failed deliveries',
      'Real-time fleet visibility and dynamic rerouting',
      'Reduced fuel costs through efficient route planning',
      'Scalable navigation data covering entire regions',
    ],
    deliverables: [
      'Road network datasets with attributes',
      'Address point databases',
      'Routing engine integration',
      'Traffic flow datasets',
      'Fleet routing optimization reports',
      'Navigation data maintenance SLA',
    ],
  },
]

export default function LocationIntelligenceSubService() {
  const { slug } = useParams<{ slug: string }>()
  const service = subServiceData.find((s) => s.slug === slug)

  if (!service) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Service Not Found</h1>
          <Link to="/services/location-intelligence" className="text-[#0050a9] hover:underline">
            &larr; Back to Location Intelligence
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
              <Link to="/services/location-intelligence" className="text-white/70 hover:text-white transition-colors">Services</Link>
              <span className="text-white/50">/</span>
              <Link to="/services/location-intelligence" className="text-white/70 hover:text-white transition-colors">Location Intelligence</Link>
              <span className="text-white/50">/</span>
              <span className="text-white/90 font-medium">{service.category}</span>
            </div>
            <span className="hidden sm:inline-flex items-center gap-2 bg-white/10 text-[#00d4ff] px-3 py-1 rounded-full text-sm font-semibold">
              <Globe className="w-4 h-4" />
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
                Why {service.category.split(' ').map(w => w.length <= 3 ? w : w.charAt(0) + w.slice(1).toLowerCase()).join(' ')}?
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
                Every engagement produces a comprehensive deliverable package  field-validated, quality-assured, and ready for integration into your enterprise systems.
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
                Interested in {service.category.split(' ').map(w => w.length <= 3 ? w : w.charAt(0) + w.slice(1).toLowerCase()).join(' ')}?
              </h3>
              <p className="text-white/70 text-base leading-relaxed mb-8">
                Get in touch with our team to explore how we can help transform your operations with location intelligence.
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
                    <p className="text-white/60 text-sm">Discuss your project needs</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-white/40 group-hover:text-white/80 transition-colors" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>


      <RelatedSubServices
        items={subServiceData}
        basePath="/services/location-intelligence"
        currentSlug={service.slug}
        parentName="Location Intelligence"
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
