import type { ElementType } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowRight, CheckCircle, Map, Layers, GitMerge, RefreshCw, ShieldCheck, Search, MapPin, Cpu, Database, PenTool } from 'lucide-react'
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
    slug: 'basemap-production',
    category: 'BASEMAP PRODUCTION',
    title: 'Basemap Production & Maintenance',
    subtitle: 'Accurate, Current Foundational Map Layers',
    description:
      'We compile and maintain the core map layers  road and transport networks, buildings, land use, hydrography and administrative boundaries  from imagery, LiDAR, field and authoritative sources, conflated into one consistent basemap and kept continuously up to date.',
    bgImage: '/pillars/geospatial-solutions.jpg',
    advantages: [
      { icon: Layers, text: 'Road, transport, building, land-use and boundary layers' },
      { icon: Map, text: 'Compiled from imagery, LiDAR, field and authoritative sources' },
      { icon: GitMerge, text: 'Multi-source conflation into one consistent basemap' },
      { icon: RefreshCw, text: 'Continuous updates and imagery-driven change detection' },
      { icon: ShieldCheck, text: 'Multi-stage QA  positional accuracy and topology' },
    ],
    idealFor: ['Map & navigation providers', 'Government mapping agencies', 'Smart-city programs', 'Utilities & infrastructure', 'Location-data businesses'],
    businessImpact: [
      'A single, authoritative foundational map',
      'Always-current layers rather than static snapshots',
      'Consistent schema and topology across sources',
      'Ready to power navigation, analytics and applications',
      'Traceable data lineage from source to layer',
    ],
    deliverables: [
      'Road & transport network layers',
      'Building & land-use layers',
      'Administrative boundaries & hydrography',
      'Conflated, deduplicated basemap',
      'QA/QC reports',
      'Scheduled update package',
    ],
  },
  {
    slug: 'poi-operations',
    category: 'POI OPERATIONS',
    title: 'POI Data Operations',
    subtitle: 'Evidence, Freshness & Duplicate Control at Scale',
    description:
      'A defensible POI lifecycle  sourced, normalized, matched, field-validated and delivered with evidence  so your places data stays fresh, deduplicated and trustworthy. Not just sourcing volume, but a governed program from discovery through change management.',
    bgImage: '/pillars/data-capture.jpg',
    advantages: [
      { icon: Search, text: 'Multi-source discovery  official sites, directories, field leads' },
      { icon: Layers, text: 'Normalization of name, address, coordinates, category and language variants' },
      { icon: GitMerge, text: 'Deduplication, alternate-name matching and confidence scoring' },
      { icon: CheckCircle, text: 'Field/app verification, source recency and peer review' },
      { icon: MapPin, text: 'Centroid/rooftop coordinate logic for maps, routing and search' },
    ],
    idealFor: ['Map & navigation providers', 'Mobility & ride-hailing platforms', 'Local-search & directory businesses', 'Address & location-data providers', 'Retail & FMCG location teams'],
    businessImpact: [
      'Fresh, evidence-backed POI that reduces downstream corrections',
      'Duplicate control that avoids paying for known records',
      'Coordinates usable for maps, routing and local search',
      'Traceable exclusion notes and update timestamps',
      'A defensible lifecycle from discovery to change management',
    ],
    deliverables: [
      'Deduplicated POI dataset (customer schema)',
      'Evidence references & source recency',
      'Confidence scores & match notes',
      'Exclusion / duplicate notes',
      'Field-validation records',
      'Change / update log',
    ],
  },
  {
    slug: 'annotation',
    category: 'ANNOTATION & AI DATA',
    title: 'Map & Imagery Annotation',
    subtitle: 'Structured Training & Map-Update Data',
    description:
      'Controlled-ontology annotation of imagery and map features  bounding boxes, classes, OCR and semantic segmentation  with reviewer calibration and QC-on-QC, producing traceable AI training data and map-update signals.',
    bgImage: '/pillars/data-analytics-ai.jpg',
    advantages: [
      { icon: Layers, text: 'Map features  signs, signals, lanes, road furniture and attributes' },
      { icon: Cpu, text: 'AI training data  bounding boxes, classes, OCR and gold sets' },
      { icon: ShieldCheck, text: 'Quality system  calibration, ambiguity rules and QC-on-QC' },
      { icon: Database, text: 'Governed data  lineage, versioned taxonomy and privacy-safe handling' },
      { icon: PenTool, text: 'Reviewer consensus and traceable training examples' },
    ],
    idealFor: ['Map & navigation providers', 'Autonomous & ADAS teams', 'Computer-vision / ML teams', 'Geospatial AI programs', 'HD-map producers'],
    businessImpact: [
      'AI-ready, standardized labels and metadata',
      'Fitness-for-purpose quality rules (OGC TrainingDML-AI / ISO direction)',
      'Reviewer consensus and gold sets for reliable models',
      'Traceable training examples with source imagery references',
      'Privacy-safe handling of imagery and data',
    ],
    deliverables: [
      'Annotated imagery datasets',
      'Feature labels & attributes',
      'Semantic segmentation masks',
      'Gold sets & consensus records',
      'Versioned taxonomy & ontology',
      'QA/QC & lineage documentation',
    ],
  },
]

const titleCase = (s: string) => s.split(' ').map((w) => (w.length <= 3 ? w : w.charAt(0) + w.slice(1).toLowerCase())).join(' ')

export default function BasemapSubService() {
  const { slug } = useParams<{ slug: string }>()
  const service = subServiceData.find((s) => s.slug === slug)

  if (!service) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Service Not Found</h1>
          <Link to="/services/basemap-poi-annotation" className="text-[#0050a9] hover:underline">
            &larr; Back to Basemap, POI &amp; Annotation
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
              <Link to="/services/basemap-poi-annotation" className="text-white/70 hover:text-white transition-colors">Basemap, POI &amp; Annotation</Link>
              <span className="text-white/50">/</span>
              <span className="text-white/90 font-medium">{titleCase(service.category)}</span>
            </div>
            <span className="hidden sm:inline-flex items-center gap-2 bg-white/10 text-[#00d4ff] px-3 py-1 rounded-full text-sm font-semibold">
              <Map className="w-4 h-4" />
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
                Every engagement produces a field-validated, quality-assured deliverable package, ready for integration into your maps, platforms and pipelines.
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
                Talk to our team about building your basemap, running a governed POI program or producing AI-ready annotation.
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
                    <p className="text-white/60 text-sm">Discuss your location-data program</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-white/40 group-hover:text-white/80 transition-colors" />
                </a>
                <Link
                  to="/services/basemap-poi-annotation"
                  className="flex items-center gap-4 bg-white/10 hover:bg-white/15 border border-white/10 rounded-xl p-5 transition-colors group"
                >
                  <div className="w-12 h-12 bg-[#00d4ff]/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Map className="w-6 h-6 text-[#00d4ff]" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-white font-semibold">Back to Basemap, POI &amp; Annotation</h4>
                    <p className="text-white/60 text-sm">See the full service</p>
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
        basePath="/services/basemap-poi-annotation"
        currentSlug={service.slug}
        parentName="Basemap, POI & Annotation"
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
