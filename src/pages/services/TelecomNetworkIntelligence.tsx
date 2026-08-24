import { MapPin, Radio, AlertTriangle, Wrench, BarChart3, Network, Gauge, ShieldCheck, TrendingUp, Search } from 'lucide-react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import MobileNav from '../../components/MobileNav'
import ProcessFlow from '../../components/ProcessFlow'
import CapabilityShowcase from '../../components/CapabilityShowcase'
import ServiceHero from '../../components/ServiceHero'
import CapabilityModules from '../../components/CapabilityModules'

const capabilities = [
  {
    slug: '5g-small-cell-planning',
    category: '5G & SMALL-CELL PLANNING',
    title: 'RF Propagation, Terrain Modelling & Site Selection',
    description:
      '5G densification depends on accurate small-cell placement. We combine RF propagation, terrain elevation, and 3D urban layers to simulate coverage and identify optimal sites before deployment.',
    icon: Radio,
    cardTitle: '5G & Small-Cell Planning',
    bgImage: '/services/telecom/5g-small-cell-planning.jpg',
    highlights: ['RF Propagation', 'Terrain Modelling', '3D Urban Layers', 'Coverage Simulation'],
  },
  {
    slug: 'smart-fiber-planning',
    category: 'SMART FIBER PLANNING',
    title: 'AI-Driven Fiber Network Planning & Operations',
    description:
      'AI-driven fiber network planning, intelligent deployment, and proactive maintenance for future-ready telecom infrastructure from route optimization to predictive maintenance.',
    icon: Network,
    cardTitle: 'Smart Fiber Planning',
    bgImage: '/pillars/fibre.png',
    highlights: ['AI Route Optimization', 'Drone Surveys', 'Digital Twin', 'Predictive Maintenance'],
    customHref: '/services/smart-fiber-planning',
  },
]

const flowSteps = [
  { icon: Search, label: 'Network Audit & Asset Inventory' },
  { icon: BarChart3, label: 'Coverage & Capacity Analysis' },
  { icon: Radio, label: '5G Site Selection & RF Modelling' },
  { icon: ShieldCheck, label: 'Permit & Right-of-Way Mapping' },
  { icon: MapPin, label: 'Network Build-Out Planning' },
  { icon: Gauge, label: 'Real-Time Asset & Performance Monitoring' },
  { icon: AlertTriangle, label: 'Predictive Fault Detection & Alerts' },
  { icon: Wrench, label: 'Field Crew Dispatch & Resolution' },
  { icon: TrendingUp, label: 'Continuous Optimization & Capacity Planning' },
]

export default function TelecomNetworkIntelligence() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero */}
      <ServiceHero
        breadcrumb={"Telecom Network Intelligence"}
        eyebrow={"Core Service"}
        eyebrowIcon={Network}
        title={"Geospatial intelligence for modern telecom infrastructure."}
        subtitle={"Telecom Network Intelligence"}
        description={"JSAN combines field data, LiDAR, GIS and engineering workflows to help telecom organisations plan, validate and manage physical network infrastructure."}
        image="/pillars/utility-network.jpg"
        imageAlt="Telecom network intelligence"
      />

      <CapabilityModules
        eyebrow="Capabilities"
        heading="Plan, validate and manage physical network infrastructure"
        modules={[
          { name: 'Fiber Engineering', description: 'Route design, splice planning and build documentation for fibre programmes.' },
          { name: 'Pole Intelligence', description: 'Pole inventory, attachment capture and loading inputs from field survey.' },
          { name: 'Network GIS', description: 'The spatial system of record for ducts, cabinets, routes and served premises.' },
          { name: 'LiDAR Engineering', description: 'Point cloud capture where clearance, sag and attachment geometry decide the design.' },
          { name: '5G & Small-Cell Planning', description: 'Siting and spatial constraint analysis for dense small-cell deployment.' },
          { name: 'Field Verification', description: 'Crews confirming on the ground what records and designs assert.' },
          { name: 'As-Built Validation', description: 'Built network reconciled to design, with exceptions raised rather than absorbed.' },
          { name: 'Asset Inventory', description: 'Complete, attributed and deduplicated asset registers with positional quality.' },
          { name: 'Infrastructure Analytics', description: 'Coverage, capacity and condition analysis across the physical estate.' },
        ]}
      />


      {/* What We Deliver */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12 md:mb-14">
            <span className="inline-block text-[#00d4ff] font-bold text-xs md:text-sm uppercase tracking-widest mb-3">What We Deliver</span>
            <h2 className="text-[28px] md:text-[36px] lg:text-[42px] font-bold mb-4 text-gradient">
              Network Intelligence, From Tower to Subscriber
            </h2>
            <p className="text-gray-600 text-base md:text-lg max-w-3xl mx-auto">
              Two core capabilities that take telecom networks from intelligent planning through future-ready fiber rollouts.
            </p>
          </div>

                    <CapabilityShowcase items={capabilities} />
        </div>
      </section>

      {/* Process Flow */}
      <section className="py-20" style={{ background: 'linear-gradient(120deg, #012f62, #0055b4)' }}>
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-14">
            <span className="inline-block text-[#00d4ff] font-bold text-xs md:text-sm uppercase tracking-widest mb-3">Our Workflow</span>
            <h2 className="text-[28px] md:text-[36px] lg:text-[42px] font-bold text-white mb-4">
              Telecom Network Planning &amp; Operations Flow
            </h2>
            <p className="text-white/70 text-base md:text-lg max-w-3xl mx-auto">
              A nine-step, data-driven workflow that takes networks from audit through continuous optimization.
            </p>
          </div>

          {/* Desktop: horizontal connected flow */}
          <ProcessFlow steps={flowSteps} />
        </div>
      </section>

      {/* Contact Form */}
      {/* <div id="contact">
        <ServiceContactForm
          serviceName="Telecom Network Intelligence"
          subServices={capabilities.map(c => ({ value: c.cardTitle, label: c.cardTitle }))}
        />
      </div> */}

      <Footer />
      <MobileNav />
    </div>
  )
}
