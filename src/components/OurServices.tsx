import { Link } from 'react-router-dom'
import { MapPin, MapPinned, Radio, Cpu, Layers, Users, FolderKanban, ArrowRight, Map, Truck, Brain, Zap, Server } from 'lucide-react'

/* Mirrors the Services dropdown order: geospatial & field, then technology &
   infrastructure, then workforce & programme delivery.
   `featured` picks the six shown on the home page; the rest live on /services. */
const services = [
  {
    title: 'Global Street Data Collection',
    featured: true,
    slug: '/services/global-street-data-collection',
    icon: Map,
    description: 'Street-level capture programmes run end to end: 360° imagery and LiDAR runs, road network and signage survey, address and POI ground truthing.',
    image: '/services/street/street-imagery-capture.jpg',
    features: ['360° Imagery', 'Road Network Survey', 'Address & POI Ground Truth', 'Mobile LiDAR'],
  },
  {
    title: 'Global Fleet & Collection Operations',
    slug: '/services/global-fleet-collection-operations',
    icon: Truck,
    description: 'Managed collection fleets country by country: vehicles and sensor rigs, local crew hiring, drive planning and dispatch, live tracking and maintenance.',
    image: '/services/fleet/fleet-mobilisation.jpg',
    features: ['Fleet Mobilisation', 'Crew Operations', 'Dispatch & Tracking', 'Safety & Permits'],
  },
  {
    title: 'Basemap, POI & Annotation',
    slug: '/services/basemap-poi-annotation',
    icon: MapPinned,
    description: 'Foundational basemaps, evidence-driven POI operations, and controlled-ontology map and imagery annotation behind navigation and AI.',
    image: '/services/basemap/poi-data-operations.jpg',
    features: ['Basemap Production', 'POI Operations', 'Map Annotation', 'AI Training Data'],
  },
  {
    title: 'GeoAI & Computer Vision',
    featured: true,
    slug: '/services/geoai-computer-vision',
    icon: Brain,
    description: 'GIS AI/ML and computer vision at production scale: object detection, segmentation, change detection, LiDAR classification and AI-assisted map QA.',
    image: '/pillars/AIML Object Detection.jpg',
    features: ['Object Detection', 'Segmentation', 'Change Detection', 'Training Data Ops'],
  },
  {
    title: 'Utility Network Intelligence',
    featured: true,
    slug: '/services/utility-network-intelligence',
    icon: Zap,
    description: 'GIS delivery for electrical, water and gas networks: field survey, asset digitization, consumer indexing and enterprise GIS migration.',
    image: '/services/utility/water-distribution.jpg',
    features: ['Electrical', 'Water', 'Gas', 'Enterprise GIS Migration'],
  },
  {
    title: 'Location Intelligence',
    slug: '/services/location-intelligence',
    icon: MapPin,
    description: 'End-to-end location intelligence ,from data capture and enhancement to advanced analytics and custom platform development.',
    image: '/pillars/location-intelligence.jpg',
    features: ['Data Capture & Enhancement', 'Advanced Analytics', 'Custom Platforms', 'Strategic Advisory', 'Navigation Data'],
  },
  {
    title: 'Telecom Network Intelligence',
    featured: true,
    slug: '/services/telecom-network-intelligence',
    icon: Radio,
    description: 'Spatial intelligence for modern telecom networks  RF propagation, 5G small-cell siting, tower and fiber asset mapping, and real-time network analytics.',
    image: '/pillars/utility-network.jpg',
    features: ['5G Site Planning', 'RF Propagation', 'Tower & Fiber Mapping', 'Network Analytics', 'Outage Correlation'],
  },
  {
    title: 'Data Center Lifecycle & Field Support',
    slug: '/services/data-center-lifecycle',
    icon: Server,
    description: 'SLA-driven multi-vendor data center lifecycle and field support: preventive and corrective maintenance, smart hands, power and facilities, asset lifecycle.',
    image: '/pillars/cloud-infrastructure.jpg',
    features: ['Preventive & Corrective', 'Smart Hands', 'Power & Facilities', 'Asset Lifecycle'],
  },
  {
    title: 'Technology Consultancy',
    featured: true,
    slug: '/services/technology-consultancy',
    icon: Cpu,
    description: 'Modernise how your business runs on technology. We help organizations leverage smart technologies and intelligent solutions.',
    image: '/pillars/technology-consultancy.jpg',
    features: ['Digital Transformation', 'Enterprise Architecture', 'Cloud & Infrastructure', 'Data Analytics & AI'],
  },
  {
    title: 'ERP Services',
    slug: '/services/erp',
    icon: Layers,
    description: 'Streamline operations with SAP, Oracle, and Microsoft Dynamics ERP implementation, customisation, and managed services for enterprise-scale efficiency.',
    image: '/pillars/tech-erp.jpg',
    features: ['SAP Implementation', 'Oracle ERP Cloud', 'Microsoft Dynamics 365', 'ERP Customisation', 'ERP Migration', 'Managed Services'],
  },
  {
    title: 'Staffing Solutions',
    featured: true,
    slug: '/services/staffing-solutions',
    icon: Users,
    description: 'People as a Service ,Your global recruitment partner. We connect organizations with top IT talent across 20+ countries.',
    image: '/pillars/staffing-workforce.jpg',
    features: ['Contract Staffing', 'Permanent Placement', 'Team Augmentation', 'Executive Search'],
  },
  {
    title: 'Program Management',
    slug: '/services/program-management',
    icon: FolderKanban,
    description: 'End-to-end program and project management services that ensure successful delivery of complex initiatives on time and within budget.',
    image: '/pillars/program-management.jpg',
    features: ['PMO Setup', 'Agile Transformation', 'Quality Assurance'],
  },
]

const featuredServices = services.filter((service) => service.featured)

export default function OurServices() {
  return (
    <section className="py-20 lg:py-28 bg-gradient-to-b from-white via-blue-50/20 to-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <h2 className="text-[36px] lg:text-[42px] font-bold mb-4 text-gradient">
            IT & Geo Spatial Services: <br />Transforming Ideas into Reality
          </h2>
          <p className="text-gray-600 text-xl">
            A global technology partner delivering IT consulting, geospatial solutions, staffing, and management advisory.
          </p>
        </div>

        {/* Bento grid: the first two run wide as spotlights, the rest are
            compact. Hover lifts a card and reveals its capability chips. */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 md:gap-7">
          {featuredServices.map((service, index) => {
            const isSpotlight = index < 2
            return (
              <Link
                key={index}
                to={service.slug}
                className={`group relative flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-md transition-all duration-500 hover:-translate-y-1.5 hover:border-[#0050a9]/25 hover:shadow-[0_24px_50px_-20px_rgba(0,80,169,0.55)] ${
                  isSpotlight ? 'lg:col-span-2' : 'lg:col-span-1'
                }`}
              >
                {/* Cyan sweep across the top edge on hover */}
                <span className="pointer-events-none absolute inset-x-0 top-0 z-20 h-1 origin-left scale-x-0 bg-gradient-to-r from-[#0050a9] via-[#00d4ff] to-[#0050a9] transition-transform duration-500 group-hover:scale-x-100" />

                <div className={`relative overflow-hidden ${isSpotlight ? 'h-56' : 'h-44'}`}>
                  <img
                    src={service.image}
                    alt={service.title}
                    className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#012f62] via-[#012f62]/45 to-transparent transition-opacity duration-500 group-hover:from-[#012f62] group-hover:via-[#012f62]/60" />

                  <div className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-lg border border-white/20 bg-white/15 backdrop-blur-md transition-all duration-500 group-hover:scale-110 group-hover:border-[#00d4ff]/50 group-hover:bg-[#00d4ff]/25">
                    <service.icon className="h-5 w-5 text-white" />
                  </div>

                  <h3
                    className={`absolute bottom-0 left-0 right-0 p-5 font-bold leading-tight text-white transition-transform duration-500 group-hover:-translate-y-1 ${
                      isSpotlight ? 'text-2xl' : 'text-lg'
                    }`}
                  >
                    {service.title}
                  </h3>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <p
                    className={`text-sm leading-relaxed text-gray-600 ${
                      isSpotlight ? 'mb-5' : 'mb-4 line-clamp-3'
                    }`}
                  >
                    {service.description}
                  </p>

                  {/* Chips light up in sequence on hover */}
                  <div className="mb-5 flex flex-wrap gap-1.5">
                    {service.features.slice(0, isSpotlight ? 6 : 3).map((feature, i) => (
                      <span
                        key={i}
                        className="rounded-full border border-blue-100 bg-blue-50 px-2.5 py-1 text-[11px] text-[#0050a9] transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-[#00d4ff]/40 group-hover:bg-[#0050a9] group-hover:text-white"
                        style={{ transitionDelay: `${i * 60}ms` }}
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  <span className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-[#0050a9]">
                    <span className="relative">
                      Learn More
                      <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-[#0050a9] transition-all duration-500 group-hover:w-full" />
                    </span>
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
                  </span>
                </div>
              </Link>
            )
          })}
        </div>

        {/* View all */}
        <div className="mt-14 flex flex-col items-center gap-5">
          <div className="flex w-full max-w-lg items-center gap-4">
            <span className="h-px flex-1 bg-gradient-to-r from-transparent to-gray-200" />
            <span className="whitespace-nowrap text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400">
              Showing {featuredServices.length} of {services.length}
            </span>
            <span className="h-px flex-1 bg-gradient-to-l from-transparent to-gray-200" />
          </div>

          <Link
            to="/services"
            className="group relative inline-flex items-center overflow-hidden rounded-full px-6 py-2.5 text-sm font-semibold text-white shadow-[0_10px_24px_-12px_rgba(0,80,169,0.8)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_18px_36px_-14px_rgba(0,212,255,0.85)]"
            style={{ background: 'linear-gradient(120deg, #012f62, #0055b4)' }}
          >
            {/* Light sweeps across the button on hover */}
            <span className="pointer-events-none absolute inset-0 -translate-x-full skew-x-12 bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-[900ms] ease-out group-hover:translate-x-full" />

            <span className="relative flex items-center gap-2.5">
              View All Services
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/15 transition-all duration-300 group-hover:bg-[#00d4ff] group-hover:text-[#012f62]">
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
              </span>
            </span>
          </Link>
        </div>
      </div>
    </section>
  )
}
