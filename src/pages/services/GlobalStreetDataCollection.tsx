import { Camera, Route, MapPinned, SignpostBig, ScanLine, EyeOff, Compass, Waypoints, Database, CheckCircle, RefreshCw, Workflow, ShieldCheck, Globe, Crosshair, ListChecks, UserCheck } from 'lucide-react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import MobileNav from '../../components/MobileNav'
import QualityGates from '../../components/QualityGates'
import RoadmapTimeline from '../../components/RoadmapTimeline'
import ProcessFlow from '../../components/ProcessFlow'
// import ServiceContactForm from '../../components/ServiceContactForm'
import CapabilityShowcase from '../../components/CapabilityShowcase'
import ServiceHero from '../../components/ServiceHero'

/* What gets collected on the street */
const capabilities = [
  {
    category: 'STREET-LEVEL IMAGERY',
    cardTitle: '360° with LiDAR Capture',
    title: 'Systematic panoramic capture of the road corridor',
    description:
      'Vehicle-mounted 360° camera runs across planned coverage grids, producing geo-referenced, timestamped panoramic imagery with consistent overlap, exposure and GNSS trace, ready for extraction, verification and map production.',
    icon: Camera,
    bgImage: '/services/street/street-imagery-capture.jpg',
    highlights: ['360° Panoramas', 'GNSS Trace', 'Coverage Grids', 'Repeat Runs'],
  },
  {
    category: 'ROAD NETWORK SURVEY',
    cardTitle: 'Road Network & Geometry',
    title: 'Drivable geometry, connectivity and restrictions',
    description:
      'Field-verified road centrelines, new and missing links, connectivity, turn restrictions, one-ways, road class and access rules, forming the routable backbone behind navigation, logistics and delivery networks.',
    icon: Route,
    bgImage: '/services/street/road-network-geometry.jpg',
    highlights: ['Centrelines', 'Turn Restrictions', 'One-Ways & Access', 'Road Classification'],
  },
  {
    category: 'ADDRESS & POI GROUND TRUTH',
    cardTitle: 'Address & POI Field Verification',
    title: 'Door-level truth, captured on the ground',
    description:
      'On-street verification of addresses, entrances, house numbers, business names, opening hours and closures, with photo evidence per record, so places data reflects the street as it is today, not as it was sourced.',
    icon: MapPinned,
    bgImage: '/services/street/address-poi-verification.jpg',
    highlights: ['Door-Level Addresses', 'Entrance Points', 'Business Verification', 'Photo Evidence'],
  },
  {
    category: 'SIGNS & ROAD FURNITURE',
    cardTitle: 'Signage & Furniture Inventory',
    title: 'Every sign, lane and marking, inventoried',
    description:
      'Traffic signs, speed limits, lane counts and markings, barriers, poles, crossings and street furniture, extracted from capture runs and positioned as attributed assets for navigation, safety and asset management use.',
    icon: SignpostBig,
    bgImage: '/services/street/signage-furniture-inventory.jpg',
    highlights: ['Traffic Signs', 'Speed Limits', 'Lane Markings', 'Street Furniture'],
  },
  {
    category: 'MOBILE MAPPING & LIDAR',
    cardTitle: 'Mobile Mapping & LiDAR Runs',
    title: 'Survey-grade 3D along the corridor',
    description:
      'Mobile mapping systems pairing LiDAR with imagery to produce dense, positioned point clouds of the road corridor, feeding HD map layers, clearance and width measurement, and 3D asset extraction.',
    icon: ScanLine,
    bgImage: '/pillars/point_cloud.png',
    highlights: ['Point Clouds', 'HD Map Input', 'Corridor Measurement', '3D Asset Extraction'],
  },
  {
    category: 'PRIVACY & COMPLIANCE',
    cardTitle: 'Privacy-Compliant Data Handling',
    title: 'Capture that respects the people in frame',
    description:
      'Automated face and licence-plate blurring, permission and permit management, controlled retention and region-specific privacy handling, all applied before imagery leaves the processing pipeline.',
    icon: EyeOff,
    bgImage: '/services/street/privacy-compliant-handling.jpg',
    highlights: ['Face & Plate Blurring', 'Permits & Permissions', 'Controlled Retention', 'Regional Compliance'],
  },
]

/* Field-to-delivery operating model */
const operatingModel = [
  { icon: Compass, title: 'Plan', desc: 'Coverage design, drive routes, priority corridors, permits and capture specification.' },
  { icon: Camera, title: 'Capture', desc: 'Imagery, LiDAR and GNSS collection with in-vehicle checks on the same run.' },
  { icon: Database, title: 'Ingest', desc: 'Upload, trajectory correction, blurring, indexing and coverage reconciliation.' },
  { icon: Waypoints, title: 'Extract', desc: 'AI-assisted and analyst extraction of geometry, signs, addresses and attributes.' },
  { icon: ShieldCheck, title: 'Validate', desc: 'Positional, attribute and completeness QA against the capture specification.' },
  { icon: RefreshCw, title: 'Refresh', desc: 'Change-driven recapture cycles keeping the network current over time.' },
]

/* Quality gates */
const gates = [
  { g: 'G1', icon: Route, title: 'Capture completeness', desc: 'Planned kilometres driven, gaps logged, re-drives scheduled for missed segments.' },
  { g: 'G2', icon: Camera, title: 'Imagery quality', desc: 'Sharpness, exposure, occlusion, overlap and frame-interval checks per run.' },
  { g: 'G3', icon: Crosshair, title: 'Positional accuracy', desc: 'GNSS quality, trajectory correction and map-matching against reference geometry.' },
  { g: 'G4', icon: ListChecks, title: 'Attribute QA', desc: 'Sign, restriction, address and classification values sampled and corrected.' },
  { g: 'G5', icon: EyeOff, title: 'Privacy compliance', desc: 'Blurring verification and permit adherence before any data is released.' },
  { g: 'G6', icon: UserCheck, title: 'Customer acceptance', desc: 'Coverage report, accuracy statement and delivery in the agreed schema.' },
]

/* Engagement path */
const roadmap = [
  { n: '01', title: 'Scope', desc: 'Target geographies, coverage priorities, capture specification and legal review.', exit: 'Approved coverage plan + specification' },
  { n: '02', title: 'Pilot', desc: 'Representative corridor captured end to end, with measured accuracy and customer review.', exit: 'Validated workflow + quality baseline' },
  { n: '03', title: 'Mobilise', desc: 'Crews, vehicles, sensor calibration, permits and processing pipeline stood up.', exit: 'Capture-ready operation' },
  { n: '04', title: 'Produce', desc: 'Scaled capture, extraction, QA and scheduled delivery against coverage targets.', exit: 'Accepted datasets at volume' },
  { n: '05', title: 'Refresh', desc: 'Change-triggered recapture, freshness reporting and continuous coverage maintenance.', exit: 'Maintained, current street data' },
]

/* Who uses it */
const applications = [
  'Navigation and routing datasets for maps and mobility apps',
  'Address and POI ground truth for location data providers',
  'HD map and ADAS input layers for automotive programmes',
  'Road asset and signage inventory for transport authorities',
  'Last-mile delivery and logistics network accuracy',
  'Street-level evidence for insurance, utilities and surveying',
]

const equipment = ['360° Camera Rigs', 'Mobile LiDAR', 'RTK / PPK GNSS', 'Dashcam Fleets', 'Mobile Capture Apps', 'Trajectory Processing', 'ArcGIS & QGIS', 'PostGIS', 'Cloud Ingest Pipelines']

const stats = [
  { value: '1,000+', label: 'Field Experts' },
  { value: '20+', label: 'GIS Managers' },
  { value: '360°', label: 'Imagery Capture' },
]

export default function GlobalStreetDataCollection() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero */}
      <ServiceHero
        breadcrumb={"Global Street Data Collection"}
        eyebrow={"Core Service"}
        eyebrowIcon={Globe}
        title={"Global Street Data Collection"}
        subtitle={"Imagery, geometry, addresses and assets, captured systematically, country after country."}
        description={"JSAN plans and runs street-level capture programmes end to end: 360° imagery and LiDAR runs, road network and sign survey, address and POI ground truthing, privacy-compliant processing and scheduled refresh, all delivered as governed, map-ready data."}
        image="/pillars/globalstreet.png"
        imageAlt="Global street data collection"
        stats={stats}
      />

      {/* Capabilities */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12 md:mb-14">
            <span className="inline-block text-[#00d4ff] font-bold text-xs md:text-sm uppercase tracking-widest mb-3">What We Collect</span>
            <h2 className="text-[28px] md:text-[36px] lg:text-[42px] font-bold mb-4 text-gradient">
              Everything the Road Corridor Contains
            </h2>
            <p className="text-gray-600 text-base md:text-lg max-w-3xl mx-auto">
              One capture run, many datasets: imagery, geometry, restrictions, addresses, signage and 3D, collected once and delivered against your schema.
            </p>
          </div>

                    <CapabilityShowcase items={capabilities} />
        </div>
      </section>

      {/* Operating model */}
      <section className="py-20" style={{ background: 'linear-gradient(120deg, #012f62, #0055b4)' }}>
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-14">
            <span className="inline-block text-[#00d4ff] font-bold text-xs md:text-sm uppercase tracking-widest mb-3">Operating Model</span>
            <h2 className="text-[28px] md:text-[36px] lg:text-[42px] font-bold text-white mb-4">
              A Six-Stage Street-to-Dataset Model
            </h2>
            <p className="text-white/70 text-base md:text-lg max-w-3xl mx-auto">
              From coverage plan to refreshed delivery on one operating backbone, configured per country, sensor set and data specification.
            </p>
          </div>

          <ProcessFlow steps={operatingModel} />

          <p className="text-white/60 text-sm md:text-base text-center max-w-3xl mx-auto mt-12">
            <span className="text-white font-semibold">Design principle:</span> every delivered record traces back to a dated capture run, a positioned frame and an explicit QA decision.
          </p>
        </div>
      </section>

      {/* Quality & governance */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12 md:mb-14">
            <span className="inline-block text-[#00d4ff] font-bold text-xs md:text-sm uppercase tracking-widest mb-3">Quality &amp; Governance</span>
            <h2 className="text-[28px] md:text-[36px] lg:text-[42px] font-bold mb-4 text-gradient">
              Gate-Based Quality, From Drive to Delivery
            </h2>
            <p className="text-gray-600 text-base md:text-lg max-w-3xl mx-auto">
              Six sequential control gates sit between the capture vehicle and an accepted dataset.
            </p>
          </div>

          <QualityGates gates={gates} />

          <div className="mt-8 rounded-xl bg-[#eef5ff] border border-blue-100 p-6 flex items-start gap-3">
            <Workflow className="w-5 h-5 text-[#0050a9] shrink-0 mt-0.5" />
            <p className="text-gray-600 text-sm leading-relaxed">
              Coverage, quality and privacy checks are owned separately across field crews, processing, GIS production and programme management, so gaps are caught on the ground while a re-drive is still cheap.
            </p>
          </div>
        </div>
      </section>

      {/* Applications & equipment */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
            <div>
              <span className="inline-block text-[#00d4ff] font-bold text-xs md:text-sm uppercase tracking-widest mb-3">Where It Applies</span>
              <h2 className="text-[28px] md:text-[36px] font-bold mb-4 text-gradient">
                Ground Truth for Everything Built on the Map
              </h2>
              <p className="text-gray-600 text-base md:text-lg mb-6">
                Street capture is the source layer behind navigation, delivery, mobility and asset programmes, and the reference our own GIS, POI and GeoAI teams validate against.
              </p>
              <div className="space-y-3">
                {applications.map((a, i) => (
                  <div key={i} className="flex items-start gap-3 bg-white rounded-xl border border-gray-100 shadow-sm p-4">
                    <CheckCircle className="w-5 h-5 text-[#0050a9] shrink-0 mt-0.5" />
                    <p className="text-gray-600 text-sm leading-relaxed">{a}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:pt-2">
              <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-100">
                <img src="/public/pillars/ground_truth.png" alt="Street-level data capture" className="w-full h-64 md:h-80 object-cover" />
              </div>

              <div className="mt-8 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-[#0050a9] flex items-center justify-center">
                    <ScanLine className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-[#0050a9] font-bold text-lg">Capture &amp; Processing Stack</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {equipment.map((t, i) => (
                    <span key={i} className="bg-blue-50 text-[#0050a9] text-xs px-3 py-1.5 rounded-full border border-blue-100">{t}</span>
                  ))}
                </div>
              </div>

              <div className="mt-6 rounded-2xl p-6 text-white" style={{ background: 'linear-gradient(120deg, #012f62, #0055b4)' }}>
                <div className="flex items-start gap-3">
                  <Globe className="w-5 h-5 text-[#00d4ff] shrink-0 mt-0.5" />
                  <p className="text-white/80 text-sm leading-relaxed">
                    Programmes run wherever coverage is needed, across urban cores, highway corridors, rural networks and emerging-market cities, with local crews, local permits and a single global specification.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Engagement path */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12 md:mb-14">
            <span className="inline-block text-[#00d4ff] font-bold text-xs md:text-sm uppercase tracking-widest mb-3">Engagement</span>
            <h2 className="text-[28px] md:text-[36px] lg:text-[42px] font-bold mb-4 text-gradient">
              Pilot a Corridor, Then Cover a Country
            </h2>
            <p className="text-gray-600 text-base md:text-lg max-w-3xl mx-auto">
              Specification and quality are proven on a representative corridor before crews scale across geographies.
            </p>
          </div>

          <RoadmapTimeline steps={roadmap} />
        </div>
      </section>

      {/* Contact Form */}
      {/* <div id="contact">
        <ServiceContactForm
          serviceName="Global Street Data Collection"
          subServices={capabilities.map((c) => ({ value: c.cardTitle, label: c.cardTitle }))}
        />
      </div> */}

      <Footer />
      <MobileNav />
    </div>
  )
}
