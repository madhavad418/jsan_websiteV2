import { Network, Zap, Droplets, Flame, Map, Crosshair, CheckCircle, Share2, Database, Gauge, ShieldCheck, Layers, RefreshCw, FileCheck2 } from 'lucide-react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import MobileNav from '../../components/MobileNav'
import QualityGates from '../../components/QualityGates'
import RoadmapTimeline from '../../components/RoadmapTimeline'
import ProcessFlow from '../../components/ProcessFlow'
import CapabilityShowcase from '../../components/CapabilityShowcase'
import CapabilityModules from '../../components/CapabilityModules'
import { allocationStats, serviceSplit } from '../../config/countAllocations'
import ServiceHero from '../../components/ServiceHero'

/**
 * /services/utility-network-intelligence  "Utilities Mapping"
 *
 * This page used to be titled "Utility Network Intelligence" and sat in the nav under
 * "Pole & Asset Intelligence", while a second, much thinner /capabilities/utilities-mapping
 * entry covered the same subject. Two nav items, one topic. The capability entry's content
 * (network-model construction, legacy record conversion, landbase alignment, deliverables
 * and outcomes) has been folded in here and that route now 301s to this one.
 *
 * Poles as infrastructure in their own right  inventory, condition, joint use, make-ready
 * and clearance  moved out to /services/pole-asset-intelligence, which is what the
 * "Pole & Asset Intelligence" nav item now points at.
 *
 * The URL is unchanged because roughly ten other files link to it.
 */

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
    bgImage: '/pillars/utility-network.webp',
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

/* Modelling and conversion work, carried over from the /capabilities/utilities-mapping
   entry that this page absorbed. It is what turns captured assets into a network that
   can be traced and analysed rather than merely drawn. */
const modellingModules = [
  {
    name: 'Network model construction',
    description:
      'Connectivity, phasing, devices and flow direction modelled so tracing, isolation and outage analysis behave correctly rather than just looking right on a map.',
    icon: Network,
  },
  {
    name: 'Multi-utility asset capture',
    description:
      'Electric, gas, water and telecom assets captured and attributed to your data model, with field survey filling the gaps that existing records cannot answer.',
    icon: Layers,
  },
  {
    name: 'Legacy record conversion',
    description:
      'CAD, paper, scanned maps, spreadsheets and legacy GIS inventoried, assessed for coverage and age, then digitised into a modern, queryable asset base.',
    icon: RefreshCw,
  },
  {
    name: 'Landbase alignment',
    description:
      'Networks aligned to an accurate landbase so assets sit where they physically are, and spatial accuracy is stated per asset class instead of assumed.',
    icon: Map,
  },
  {
    name: 'Topology & attribute validation',
    description:
      'Gaps, overlaps, orphaned devices and attribute violations cleared before migration, with a documented validation report per asset class.',
    icon: FileCheck2,
  },
  {
    name: 'GIS / ADMS delivery',
    description:
      'Migration-ready packages built to your production schema (Smallworld, ArcGIS or an ADMS data model) with lineage preserved through the handover.',
    icon: Database,
  },
]

/* What the customer ends up holding, and what changes for them once they do. */
const deliverables = [
  'Digitised utility asset layers',
  'Connectivity / network model',
  'Landbase-aligned spatial data',
  'Converted legacy records',
  'Attribute and topology validation reports',
  'Migration-ready GIS packages',
]

const outcomes = [
  'A single, connected view of the network',
  'Legacy records rescued into a modern data model',
  'Tracing and analysis that behave correctly',
  'Field crews working from accurate maps',
  'A foundation for outage, planning and digital-twin systems',
]

const stats = allocationStats(serviceSplit, 'utility-network-intelligence')

export default function UtilityNetworkIntelligence() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero */}
      <ServiceHero
        breadcrumb={"Utilities Mapping"}
        eyebrow={"Core Service"}
        eyebrowIcon={Network}
        title={"Utilities Mapping"}
        subtitle={"Electric, gas, water and telecom networks modelled as connected assets."}
        description={"We map and model utility networks end to end: field survey and asset digitization, legacy record conversion, landbase alignment, consumer indexing, and the connectivity model that makes a network analysable rather than merely drawable, delivered into your production GIS."}
        image="/pillars/utility.webp"
        imageAlt="Utilities mapping across electric, gas and water networks"
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

      {/* Modelling & conversion  absorbed from the old /capabilities/utilities-mapping page */}
      <CapabilityModules
        tone="white"
        eyebrow="Mapping & Modelling"
        heading="From scattered records to a network that can be traced"
        intro="Capturing an asset is only half the job. These are the steps that turn a drawing into a model your operations, planning and outage systems can actually run on."
        modules={modellingModules}
      />

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

      {/* Deliverables & outcomes  absorbed from the old /capabilities/utilities-mapping page */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <span className="inline-block text-[#00d4ff] font-bold text-xs md:text-sm uppercase tracking-widest mb-3">What You Receive</span>
              <h2 className="text-[28px] md:text-[36px] font-bold mb-6 text-gradient">Deliverables</h2>
              <ul className="space-y-3">
                {deliverables.map((item) => (
                  <li key={item} className="flex items-start gap-3 rounded-xl bg-gray-50 p-4">
                    <CheckCircle className="w-5 h-5 text-[#0050a9] shrink-0 mt-0.5" />
                    <span className="text-gray-700 text-sm md:text-base">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <span className="inline-block text-[#00d4ff] font-bold text-xs md:text-sm uppercase tracking-widest mb-3">What Changes</span>
              <h2 className="text-[28px] md:text-[36px] font-bold mb-6 text-gradient">Outcomes</h2>
              <ul className="space-y-3">
                {outcomes.map((item) => (
                  <li key={item} className="flex items-start gap-3 rounded-xl bg-[#eef5ff] border border-blue-100 p-4">
                    <Gauge className="w-5 h-5 text-[#0050a9] shrink-0 mt-0.5" />
                    <span className="text-gray-700 text-sm md:text-base">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
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
