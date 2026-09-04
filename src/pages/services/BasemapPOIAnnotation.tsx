import { ArrowRight, Map, Layers, MapPin, Cpu, ShieldCheck, Database, Building2, FileCheck, Boxes } from 'lucide-react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import MobileNav from '../../components/MobileNav'
import CapabilityShowcase from '../../components/CapabilityShowcase'
// import ServiceContactForm from '../../components/ServiceContactForm'
import { allocationStats, serviceSplit } from '../../config/countAllocations'
import ServiceHero from '../../components/ServiceHero'

/* Overview  the three pillars of the service */
const deliver = [
  {
    slug: 'basemap-production',
    category: 'BASEMAP PRODUCTION',
    cardTitle: 'Basemap Production',
    title: 'Accurate, current foundational map layers',
    description:
      'Road and transport networks, buildings, land use, hydrography and administrative boundaries compiled from imagery, LiDAR, field and authoritative sources, and kept continuously up to date.',
    icon: Layers,
    bgImage: '/pillars/basemap.webp',
    highlights: ['Road Networks', 'Buildings & Land Use', 'Boundaries', 'Continuous Updates'],
  },
  {
    slug: 'poi-operations',
    category: 'POINTS OF INTEREST',
    cardTitle: 'POI Data Operations',
    title: 'Evidence, freshness and duplicate control at scale',
    description:
      'A defensible POI lifecycle sourced, normalized, matched, field-validated and delivered with evidence so your places data stays fresh, deduplicated and trustworthy.',
    icon: MapPin,
    bgImage: '/pillars/poi.webp',
    highlights: ['Field Validation', 'Deduplication', 'Confidence Scoring', 'Change Management'],
  },
  // {
  //   slug: 'annotation',
  //   category: 'ANNOTATION & AI DATA',
  //   cardTitle: 'Map & Imagery Annotation',
  //   title: 'Structured training and map-update data',
  //   description:
  //     'Controlled-ontology annotation of imagery and map features  bounding boxes, classes, OCR and segmentation  with reviewer calibration and QC-on-QC, producing traceable AI training data.',
  //   icon: PenTool,
  //   bgImage: '/pillars/data-analytics-ai.webp',
  //   highlights: ['Controlled Ontology', 'Reviewer Calibration', 'OCR & Segmentation', 'Gold Sets'],
  // },
]

/* POI operations lifecycle (Source → Deliver) */
const poiLifecycle = [
  { n: '01', title: 'Source', desc: 'Official sites, social, directories, booking platforms, field leads and customer lists.' },
  { n: '02', title: 'Normalize', desc: 'Name, address, coordinates, category, phone, URL and language variants.' },
  { n: '03', title: 'Match', desc: 'Deduplication, alternate names, coordinate proximity and confidence scoring.' },
  { n: '04', title: 'Validate', desc: 'Field/app verification, source recency, phone/web checks and peer review.' },
  { n: '05', title: 'Deliver', desc: 'Customer schema, evidence reference, exclusion notes and update timestamp.' },
]

const poiTable = [
  {
    risk: 'Stale or closed POI',
    control: 'Evidence recency, active source check, and field re-verification for high-value categories.',
    benefit: 'Improves trust and reduces customer downstream corrections.',
  },
  {
    risk: 'Existing-visible / duplicate record',
    control: 'Layered exclusion: exact name, address, coordinate, alternate spelling, branch and nearby search.',
    benefit: 'Protects incremental dataset quality and avoids paying for known records.',
  },
  {
    risk: 'Weak coordinates',
    control: 'Centroid/rooftop logic, field position, source reconciliation and reviewer notes.',
    benefit: 'Makes records usable for maps, routing and local search.',
  },
]

/* Annotation operations */
const annotationCards = [
  { icon: Layers, title: 'Map features', desc: 'Traffic signs, signals, lanes, road furniture, barriers, boards and location attributes.' },
  { icon: Cpu, title: 'AI training data', desc: 'Bounding boxes, classes, attributes, OCR text, reviewer consensus and gold sets.' },
  { icon: ShieldCheck, title: 'Quality system', desc: 'Calibration, sampling, ambiguity rules, senior reviewer escalation and QC-on-QC.' },
  { icon: Database, title: 'Governed data', desc: 'Data lineage, versioned taxonomy, source imagery references and privacy-safe handling.' },
]

/* Indoor GIS & parcel adjacencies */
const indoorCards = [
  { icon: Building2, title: 'Indoor GIS & wayfinding', desc: 'CAD/GIS conversion, floor plans, POIs, access points, route networks and 2D/3D visualization.' },
  { icon: FileCheck, title: 'Property / parcel evidence', desc: 'Street-view drive points, parcel linkage, bannering, date stamp and image evidence for audit.' },
  { icon: Boxes, title: 'Operational use cases', desc: 'Malls, airports, transit hubs, hospitals, campuses, utilities and property data teams.' },
]

export default function BasemapPOIAnnotation() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero */}
      <ServiceHero
        breadcrumb={"Basemap, POI & Annotation"}
        eyebrow={"Core Service"}
        eyebrowIcon={Map}
        title={"Basemap, POI & Annotation Services"}
        subtitle={"The foundational map data that powers navigation, location intelligence, and AI."}
        description={"For map and navigation providers, mobility platforms, address providers and location-data businesses that need local freshness at scale."}
        image="/gis-mapping.jpeg"
        imageAlt="Basemap, POI and annotation services"
        stats={allocationStats(serviceSplit, 'basemap-poi-annotation')}
      />

      {/* What We Deliver */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12 md:mb-14">
            <span className="inline-block text-[#00d4ff] font-bold text-xs md:text-sm uppercase tracking-widest mb-3">What We Deliver</span>
            <h2 className="text-[28px] md:text-[36px] lg:text-[42px] font-bold mb-4 text-gradient">
              Ground-Truth Map Data, End to End
            </h2>
            <p className="text-gray-600 text-base md:text-lg max-w-3xl mx-auto">
              Three connected practices basemap, places and annotation built for local freshness at scale.
            </p>
          </div>

                    <CapabilityShowcase items={deliver} basePath="/services/basemap-poi-annotation" />
        </div>
      </section>

      {/* POI Operations lifecycle + risk/control/benefit */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="mb-12 md:mb-14 max-w-4xl">
            <span className="inline-block text-[#00d4ff] font-bold text-xs md:text-sm uppercase tracking-widest mb-3">POI Operations</span>
            <h2 className="text-[26px] md:text-[34px] lg:text-[40px] font-bold mb-4 text-gradient leading-tight">
              POI operations require evidence, freshness and duplicate control  not just sourcing volume
            </h2>
            <p className="text-gray-600 text-base md:text-lg">
              An industry POI program needs a defensible lifecycle from discovery to review, field validation, scoring and change management.
            </p>
          </div>

          {/* Lifecycle steps */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-14">
            {poiLifecycle.map((step, i) => (
              <div key={i} className="relative bg-gray-50 border border-gray-100 rounded-2xl p-5 h-full">
                <div className="w-9 h-9 rounded-full bg-[#0050a9] text-white text-xs font-bold flex items-center justify-center mb-3">{step.n}</div>
                <h3 className="text-[#0050a9] font-bold mb-1.5">{step.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
                {i < poiLifecycle.length - 1 && (
                  <ArrowRight className="hidden lg:block absolute top-1/2 -right-3 -translate-y-1/2 w-5 h-5 text-[#0050a9]/40 z-10" />
                )}
              </div>
            ))}
          </div>

          {/* Risk / Control / Customer benefit */}
          <div className="overflow-x-auto rounded-xl border border-gray-200">
            <table className="w-full min-w-[720px] text-left border-collapse">
              <thead>
                <tr className="bg-[#0a1a3a] text-white">
                  <th className="p-4 font-semibold text-sm w-1/4">Risk</th>
                  <th className="p-4 font-semibold text-sm w-2/5">Control</th>
                  <th className="p-4 font-semibold text-sm">Customer benefit</th>
                </tr>
              </thead>
              <tbody>
                {poiTable.map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="p-4 align-top font-semibold text-gray-900 text-sm">{row.risk}</td>
                    <td className="p-4 align-top text-gray-600 text-sm leading-relaxed">{row.control}</td>
                    <td className="p-4 align-top text-gray-600 text-sm leading-relaxed">{row.benefit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Annotation operations */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="mb-12 md:mb-14 max-w-4xl">
            <span className="inline-block text-[#00d4ff] font-bold text-xs md:text-sm uppercase tracking-widest mb-3">Annotation Operations</span>
            <h2 className="text-[26px] md:text-[34px] lg:text-[40px] font-bold mb-4 text-gradient leading-tight">
              Annotation operations turn raw imagery into structured training and map-update data
            </h2>
            <p className="text-gray-600 text-base md:text-lg">
              JSAN's differentiation is controlled ontology, reviewer calibration, QC-on-QC and traceable training examples.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {annotationCards.map((card, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-lg transition-shadow">
                <div className="w-11 h-11 rounded-xl bg-[#0050a9]/10 flex items-center justify-center mb-4">
                  <card.icon className="w-5 h-5 text-[#0050a9]" />
                </div>
                <h3 className="text-gray-900 font-bold mb-2">{card.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-xl bg-[#eef5ff] border border-blue-100 p-6">
            <h4 className="text-[#0050a9] font-bold mb-2">JSAN alignment towards industry standards</h4>
            <p className="text-gray-500 text-sm leading-relaxed max-w-4xl">
              OGC TrainingDML-AI and ISO geospatial quality/provenance direction support the argument that AI-ready geospatial data requires standardized labels, metadata and fitness-for-purpose quality rules.
            </p>
          </div>
        </div>
      </section>

      {/* Indoor GIS & parcel adjacencies */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="mb-12 md:mb-14 max-w-4xl">
            <span className="inline-block text-[#00d4ff] font-bold text-xs md:text-sm uppercase tracking-widest mb-3">Adjacent Value Streams</span>
            <h2 className="text-[26px] md:text-[34px] lg:text-[40px] font-bold mb-4 text-gradient leading-tight">
              Indoor GIS and parcel workflows extend location intelligence into complex places and auditable records
            </h2>
            <p className="text-gray-600 text-base md:text-lg">
              JSAN can package these as adjacent value streams for navigation, property evidence, facilities and customer support.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {indoorCards.map((card, i) => (
              <div key={i} className="bg-gray-50 rounded-2xl p-7 border border-gray-100 hover:border-[#0050a9]/20 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-[#0050a9] flex items-center justify-center mb-5">
                  <card.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-[#0050a9] text-lg font-bold mb-2">{card.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      {/* <div id="contact">
        <ServiceContactForm
          serviceName="Basemap, POI & Annotation Services"
          subServices={[
            { value: 'Basemap Production', label: 'Basemap Production' },
            { value: 'POI Data Operations', label: 'POI Data Operations' },
            { value: 'Map & Imagery Annotation', label: 'Map & Imagery Annotation' },
            { value: 'Indoor GIS & Wayfinding', label: 'Indoor GIS & Wayfinding' },
            { value: 'Property / Parcel Evidence', label: 'Property / Parcel Evidence' },
          ]}
        />
      </div> */}

      <Footer />
      <MobileNav />
    </div>
  )
}
