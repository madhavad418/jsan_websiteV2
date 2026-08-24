import { useState } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import MobileNav from '../components/MobileNav'
import StatementHero from '../components/StatementHero'
import { MapPin, Cpu, Users, FolderKanban, ArrowRight, Layers, Network, Map, Zap, Server, Truck } from 'lucide-react'

const services = [
  {
    title: 'Location Intelligence',
    group: 'geo',
    slug: '/services/location-intelligence',
    icon: MapPin,
    description: 'End-to-end location intelligence, from data capture and enhancement to advanced analytics and custom platform development.',
    image: '/pillars/location-intelligence.jpg',
    features: ['Data Capture & Enhancement', 'Advanced Analytics', 'Custom Platforms', 'Strategic Advisory', 'Navigation Data'],
  },
  {
    title: 'Telecom Network Intelligence',
    group: 'tech',
    slug: '/services/telecom-network-intelligence',
    icon: Network,
    description: 'Spatial intelligence for modern telecom networks RF propagation, 5G small-cell siting, tower and fiber asset mapping, and real-time network analytics.',
    image: '/pillars/utility-network.jpg',
    features: ['5G Site Planning', 'RF Propagation', 'Tower & Fiber Mapping', 'Network Analytics', 'Outage Correlation'],
  },
  {
    title: 'Utility Network Intelligence',
    group: 'geo',
    slug: '/services/utility-network-intelligence',
    icon: Zap,
    description: 'GIS delivery for electrical, water and gas networks  field survey, asset digitization, consumer indexing, topology validation and enterprise GIS migration.',
    image: '/pillars/asset-management.jpg',
    features: ['Electrical', 'Water', 'Gas', 'Enterprise GIS Migration'],
  },
  {
    title: 'Global Street Data Collection',
    group: 'geo',
    slug: '/services/global-street-data-collection',
    icon: Map,
    description: 'Street-level capture programmes run end to end: 360° imagery and LiDAR runs, road network and signage survey, address and POI ground truthing, and privacy-compliant processing.',
    image: '/pillars/navigation-data.jpg',
    features: ['360° Imagery', 'Road Network Survey', 'Address & POI Ground Truth', 'Signage Inventory', 'Mobile LiDAR', 'Privacy Compliance'],
  },
  {
    title: 'Global Fleet & Collection Operations',
    group: 'geo',
    slug: '/services/global-fleet-collection-operations',
    icon: Truck,
    description: 'Managed collection fleets country by country: vehicles and sensor rigs, local driver and crew hiring, drive planning and dispatch, live tracking, maintenance, safety and permits.',
    image: '/pillars/smart-city.jpg',
    features: ['Fleet Mobilisation', 'Driver & Crew Operations', 'Drive Planning & Dispatch', 'Live Tracking', 'Maintenance', 'Safety & Permits'],
  },
  {
    title: 'GeoAI & Computer Vision',
    group: 'geo',
    slug: '/services/geoai-computer-vision',
    icon: Cpu,
    description: 'GIS AI/ML and computer vision at production scale: object detection, segmentation, change detection, LiDAR classification, annotation operations and AI-assisted map QA.',
    image: '/pillars/AIML Object Detection.jpg',
    features: ['Object Detection', 'Segmentation', 'Change Detection', 'LiDAR & Point Cloud AI', 'Training Data Ops', 'Automated QA/QC'],
  },
  {
    title: 'Data Center Lifecycle & Field Support',
    group: 'tech',
    slug: '/services/data-center-lifecycle',
    icon: Server,
    description: 'SLA-driven multi-vendor data center lifecycle and field support  preventive & corrective maintenance, smart hands, power & facilities, asset lifecycle and governed reporting.',
    image: '/pillars/cloud-infrastructure.jpg',
    features: ['Preventive & Corrective', 'Smart Hands', 'Power & Facilities', 'Asset Lifecycle'],
  },
  {
    title: 'Basemap, POI & Annotation',
    group: 'geo',
    slug: '/services/basemap-poi-annotation',
    icon: Map,
    description: 'Foundational basemaps, evidence-driven POI operations, and controlled-ontology map & imagery annotation  the ground-truth data behind navigation, location intelligence and AI.',
    image: '/gis-mapping.jpeg',
    features: ['Basemap Production', 'POI Operations', 'Map Annotation', 'AI Training Data'],
  },
  {
    title: 'Technology Consultancy',
    group: 'tech',
    slug: '/services/technology-consultancy',
    icon: Cpu,
    description: 'Modernise how your business runs on technology. We help organizations leverage smart technologies and intelligent solutions.',
    image: '/pillars/technology-consultancy.jpg',
    features: ['Digital Transformation', 'Enterprise Architecture', 'Cloud & Infrastructure', 'Data Analytics & AI'],
  },
  {
    title: 'ERP Services',
    group: 'tech',
    slug: '/services/erp',
    icon: Layers,
    description: 'Streamline operations with SAP, Oracle, and Microsoft Dynamics ERP implementation, customisation, and managed services for enterprise-scale efficiency.',
    image: '/pillars/tech-erp.jpg',
    features: ['SAP Implementation', 'Oracle ERP Cloud', 'Microsoft Dynamics 365', 'ERP Customisation', 'ERP Migration', 'Managed Services'],
  },
  {
    title: 'Staffing Solutions',
    group: 'work',
    slug: '/services/staffing-solutions',
    icon: Users,
    description: 'People as a Service, your global recruitment partner. We connect organizations with top IT talent across 20+ countries.',
    image: '/pillars/staffing-workforce.jpg',
    features: ['Contract Staffing', 'Permanent Placement', 'Team Augmentation', 'Executive Search'],
  },
  {
    title: 'Program Management',
    group: 'work',
    slug: '/services/program-management',
    icon: FolderKanban,
    description: 'End-to-end program and project management services that ensure successful delivery of complex initiatives on time and within budget.',
    image: '/pillars/program-management.jpg',
    features: ['PMO Setup', 'Agile Transformation', 'Quality Assurance'],
  },
]

const serviceGroups = [
  { id: 'geo', label: 'Geospatial & Field Operations' },
  { id: 'tech', label: 'Technology & Infrastructure' },
  { id: 'work', label: 'Workforce & Program Delivery' },
]

export default function Services() {
  const [activeService, setActiveService] = useState(0)

  const ActiveIcon = services[activeService].icon
  const activeIcon = <ActiveIcon className="h-6 w-6 text-white" />

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero */}
      <StatementHero
        eyebrow="Our Capabilities"
        title={
          <>
            Engineering Intelligence.
            <br />
            Delivering Impact.
          </>
        }
        description={
          <>
            JSAN is your trusted global partner for geospatial solutions, field operations, IT
            consulting and business transformation helping organisations{' '}
            <strong className="font-semibold text-[#0a1a3a]">grow, adapt and lead</strong> in a
            digital-first environment.
          </>
        }
        primaryCta={{ label: 'Talk to Our Experts', href: '/contact' }}
        secondaryCta={{ label: 'See All Capabilities', href: '#capability-grid' }}
        strip={[
          'Geospatial & Mapping',
          'Field Operations',
          'GeoAI & Data Ops',
          'Telecom & Infrastructure',
          'Digital Engineering',
          'Managed Services',
        ]}
        image="/pillars/all_services.png"
        cutoutSize="large"
        imageAlt="JSAN capability stack: collection vehicle, drone and satellite capture, basemap and LiDAR layers, network assets and operations dashboards"
      />
      {/* Services Grid */}
      <section id="capability-grid" className="scroll-mt-28 py-20 lg:py-28 bg-gradient-to-b from-white via-blue-50/20 to-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-[36px] lg:text-[42px] font-bold mb-4 text-gradient">
              What We Do
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Twelve integrated services across three delivery groups. Hover any service to preview it.
            </p>
          </div>

          {/* Index + live preview. Rows navigate; hovering one swaps the panel. */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
            {/* Index */}
            <div className="lg:col-span-5">
              {serviceGroups.map((group) => {
                const items = services.filter((item) => item.group === group.id)
                return (
                  <div key={group.id} className="mb-8 last:mb-0">
                    <div className="mb-3 flex items-baseline justify-between border-b border-gray-200 pb-2">
                      <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#0050a9]">
                        {group.label}
                      </h3>
                      <span className="text-xs font-semibold text-gray-400">{items.length}</span>
                    </div>

                    <ul>
                      {items.map((service) => {
                        const index = services.indexOf(service)
                        const isActive = activeService === index
                        return (
                          <li key={service.slug}>
                            <Link
                              to={service.slug}
                              onMouseEnter={() => setActiveService(index)}
                              onFocus={() => setActiveService(index)}
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
                                <service.icon className="h-5 w-5" />
                              </span>

                              <span className="min-w-0 flex-1">
                                <span
                                  className={`block truncate font-semibold transition-colors ${
                                    isActive ? 'text-[#0050a9]' : 'text-gray-700 group-hover:text-[#0050a9]'
                                  }`}
                                >
                                  {service.title}
                                </span>
                                <span className="block truncate text-xs text-gray-500">
                                  {service.features.slice(0, 3).join(' · ')}
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
                  {services.map((service, index) => (
                    <img
                      key={service.slug}
                      src={service.image}
                      alt={service.title}
                      className={`absolute inset-0 h-full w-full object-cover transition-all duration-700 ${
                        activeService === index ? 'scale-100 opacity-100' : 'scale-105 opacity-0'
                      }`}
                    />
                  ))}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#012f62] via-[#012f62]/40 to-transparent" />

                  <div className="absolute left-6 top-6 flex h-12 w-12 items-center justify-center rounded-xl border border-white/20 bg-white/15 backdrop-blur-md">
                    {activeIcon}
                  </div>

                  <h3 className="absolute bottom-0 left-0 right-0 p-6 text-3xl font-bold leading-tight text-white">
                    {services[activeService].title}
                  </h3>
                </div>

                <div className="p-7">
                  <p className="mb-5 text-base leading-relaxed text-gray-600">
                    {services[activeService].description}
                  </p>

                  <div className="mb-7 flex flex-wrap gap-2">
                    {services[activeService].features.map((feature) => (
                      <span
                        key={feature}
                        className="rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-xs text-[#0050a9]"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  <Link
                    to={services[activeService].slug}
                    className="group inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_26px_-10px_rgba(0,80,169,0.85)]"
                    style={{ background: 'linear-gradient(120deg, #012f62, #0055b4)' }}
                  >
                    Explore This Service
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </div>
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
