import { Network, Zap, Droplets, Flame, Map, Crosshair, CheckCircle, Share2, Database, Gauge, ShieldCheck } from 'lucide-react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import MobileNav from '../../components/MobileNav'
import QualityGates from '../../components/QualityGates'
import RoadmapTimeline from '../../components/RoadmapTimeline'
import ProcessFlow from '../../components/ProcessFlow'
import CapabilityShowcase from '../../components/CapabilityShowcase'
import ServiceHero from '../../components/ServiceHero'

/* The three utility domains */
const domains = [
  {
    slug: 'electrical',
    category: 'ELECTRICAL UTILITY',
    cardTitle: 'Electrical Networks',
    title: 'Pole-to-pole capture, codification and topology-ready mapping',
    description:
      'Land-base extraction, drone/mobile field survey and pole/line/transformer digitization codified, QA-checked and migrated to enterprise platforms such as GE Smallworld and ArcGIS.',
    icon: Zap,
    bgImage: '/pillars/utility-network.jpg',
    highlights: ['Pole / Line / Transformer', 'Pole Codification', 'Consumer Indexing', 'Smallworld / ArcGIS'],
  },
  {
    slug: 'water',
    category: 'WATER UTILITY',
    cardTitle: 'Water Distribution',
    title: 'Distribution assets and consumer indexing for zone-level control',
    description:
      'GPS-enabled capture of valves, hydrants, meters and consumer connections delivered as distribution-network GIS and zonal / DMA map outputs that improve maintenance planning and leak response.',
    icon: Droplets,
    bgImage: '/services/utility/water-distribution.jpg',
    highlights: ['Valves / Hydrants / Meters', 'Consumer Connections', 'Zonal / DMA Maps', 'Leak & Maintenance'],
  },
  {
    slug: 'gas',
    category: 'GAS UTILITY',
    cardTitle: 'Gas Networks',
    title: 'Safety-critical asset traceability and pressure-area intelligence',
    description:
      'Traceable, safety-focused inventory of pipelines, valves, regulators, pressure stations and service connections with field evidence and pressure-zone / service-area map outputs for compliance and emergency response.',
    icon: Flame,
    bgImage: '/services/utility/gas-networks.jpg',
    highlights: ['Pipelines / Valves / Regulators', 'Pressure Stations', 'Service Connections', 'Pressure-Zone Maps'],
  },
]

/* Field-to-platform operating model */
const operatingModel = [
  { icon: Map, title: 'Prepare', desc: 'Base maps, satellite imagery, source drawings and survey plans.' },
  { icon: Crosshair, title: 'Capture', desc: 'GPS / mobile / drone-enabled asset and consumer evidence.' },
  { icon: CheckCircle, title: 'Validate', desc: 'Spatial, attribute, photo and field-completeness checks.' },
  { icon: Share2, title: 'Model', desc: 'Network connectivity, asset hierarchy and topology rules.' },
  { icon: Database, title: 'Integrate', desc: 'Prepare the GDB and migrate to the target GIS platform.' },
  { icon: Gauge, title: 'Operate', desc: 'Maps, dashboards, maintenance and decision support.' },
]

/* Quality gates */
const gates = [
  { g: 'G1', title: 'Field completeness', desc: 'Asset present, coordinate captured, mandatory attributes and evidence.' },
  { g: 'G2', title: 'Spatial QA', desc: 'Base-map fit, GPS precision, geometry and positional plausibility.' },
  { g: 'G3', title: 'Attribute QA', desc: 'Codes, names, IDs, consumer linkage and utility-specific fields.' },
  { g: 'G4', title: 'Topology QA', desc: 'Connectivity, network rules, gaps, overlaps and logical relationships.' },
  { g: 'G5', title: 'Customer approval', desc: 'Review corrections, exceptions and delivery acceptance.' },
  { g: 'G6', title: 'Migration readiness', desc: 'GDB / target-system schema, packaging and traceability.' },
]

/* Implementation roadmap */
const roadmap = [
  { n: '01', title: 'Mobilize', desc: 'Scope, stakeholders, standards, data access and field permissions.', exit: 'Approved plan + readiness checklist' },
  { n: '02', title: 'Design', desc: 'Data model, taxonomy, topology rules, mobile forms and QA gates.', exit: 'Configured solution + acceptance criteria' },
  { n: '03', title: 'Pilot', desc: 'Controlled area, representative assets, evidence capture and customer review.', exit: 'Validated workflow + quality baseline' },
  { n: '04', title: 'Production', desc: 'Scaled field collection, GIS production, QA/QC and reporting.', exit: 'Approved network + consumer datasets' },
  { n: '05', title: 'Migrate & operate', desc: 'GDB packaging, target GIS migration, dashboards and handover.', exit: 'Operational GIS + support model' },
]

const stats = [
  { value: '200+', label: 'CAD / GIS Engineers' },
  { value: '150+', label: 'Field Experts' },
  { value: '10+', label: 'Network Intelligence Managers' },
]

export default function UtilityNetworkIntelligence() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero */}
      <ServiceHero
        breadcrumb={"Utility Network Intelligence"}
        eyebrow={"Core Service"}
        eyebrowIcon={Network}
        title={"Utility Network Intelligence"}
        subtitle={"From field reality to operational utility intelligence across electrical, water and gas."}
        description={"A connected operating model for field survey, asset digitization, consumer indexing, topology validation and enterprise GIS migration one delivery backbone, configured per utility domain."}
        image="/pillars/utility-network.jpg"
        imageAlt="Utility network intelligence"
        stats={stats}
      />

      {/* Three domains */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12 md:mb-14">
            <span className="inline-block text-[#00d4ff] font-bold text-xs md:text-sm uppercase tracking-widest mb-3">Three Domains, One Backbone</span>
            <h2 className="text-[28px] md:text-[36px] lg:text-[42px] font-bold mb-4 text-gradient">
              Electrical, Water &amp; Gas  Digitized End to End
            </h2>
            <p className="text-gray-600 text-base md:text-lg max-w-3xl mx-auto">
              One shared data, QA and delivery backbone  configured with domain-specific asset taxonomy, topology rules and operational outputs for each utility.
            </p>
          </div>

                    <CapabilityShowcase items={domains} basePath="/services/utility-network-intelligence" />
        </div>
      </section>

      {/* Operating model */}
      <section className="py-20" style={{ background: 'linear-gradient(120deg, #012f62, #0055b4)' }}>
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-14">
            <span className="inline-block text-[#00d4ff] font-bold text-xs md:text-sm uppercase tracking-widest mb-3">Operating Model</span>
            <h2 className="text-[28px] md:text-[36px] lg:text-[42px] font-bold text-white mb-4">
              A Six-Stage Field-to-Platform Model
            </h2>
            <p className="text-white/70 text-base md:text-lg max-w-3xl mx-auto">
              Converting physical assets into governed GIS records and decision-ready network maps the same backbone across every utility.
            </p>
          </div>

          <ProcessFlow steps={operatingModel} />

          <p className="text-white/60 text-sm md:text-base text-center max-w-3xl mx-auto mt-12">
            <span className="text-white font-semibold">Design principle:</span> every asset record is traceable back to field evidence, a defined data model and an explicit QA decision.
          </p>
        </div>
      </section>

      {/* Quality & governance */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12 md:mb-14">
            <span className="inline-block text-[#00d4ff] font-bold text-xs md:text-sm uppercase tracking-widest mb-3">Quality &amp; Governance</span>
            <h2 className="text-[28px] md:text-[36px] lg:text-[42px] font-bold mb-4 text-gradient">
              Gate-Based Quality, From Field to Migration
            </h2>
            <p className="text-gray-600 text-base md:text-lg max-w-3xl mx-auto">
              Six sequential control gates put QA/QC before customer approval and final GIS migration.
            </p>
          </div>

          <QualityGates gates={gates} />

          <div className="mt-8 rounded-xl bg-[#eef5ff] border border-blue-100 p-6 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-[#0050a9] shrink-0 mt-0.5" />
            <p className="text-gray-600 text-sm leading-relaxed">
              Independent quality gates are owned across field teams, GIS production, a QA/GIS manager, program management and the customer  so responsibility for completeness, compliance and acceptance is explicit at every stage.
            </p>
          </div>
        </div>
      </section>

      {/* Implementation roadmap */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12 md:mb-14">
            <span className="inline-block text-[#00d4ff] font-bold text-xs md:text-sm uppercase tracking-widest mb-3">Implementation</span>
            <h2 className="text-[28px] md:text-[36px] lg:text-[42px] font-bold mb-4 text-gradient">
              Mobilize, Prove, Then Scale
            </h2>
            <p className="text-gray-600 text-base md:text-lg max-w-3xl mx-auto">
              Validate standards early, prove field-to-GIS quality in a pilot, then expand by geography or utility.
            </p>
          </div>

          <RoadmapTimeline steps={roadmap} />
        </div>
      </section>

      {/* Contact Form */}
      {/* <div id="contact">
        <ServiceContactForm
          serviceName="Utility Network Intelligence"
          subServices={[
            { value: 'Electrical Networks', label: 'Electrical Networks' },
            { value: 'Water Distribution', label: 'Water Distribution' },
            { value: 'Gas Networks', label: 'Gas Networks' },
            { value: 'Enterprise GIS Migration', label: 'Enterprise GIS Migration' },
          ]}
        />
      </div> */}

      <Footer />
      <MobileNav />
    </div>
  )
}
