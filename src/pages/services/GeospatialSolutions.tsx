import { Globe, Camera, Boxes, Route, MapPin, ClipboardCheck, Building2, Database, ShieldCheck } from 'lucide-react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import MobileNav from '../../components/MobileNav'
import CapabilityShowcase from '../../components/CapabilityShowcase'
import ServiceHero from '../../components/ServiceHero'
import CapabilityModules from '../../components/CapabilityModules'

const subServices = [
  {
    slug: 'spatial-analytics',
    category: 'SPATIAL ANALYTICS',
    title: 'Data-Driven Decisions for Smarter Cities',
    description:
      'Our solutions integrate location context with traditional data analysis to uncover trends in fields such as urban planning, business, and environmental management.',
    bgImage: '/pillars/spatial-analytics.jpg',
    cardTitle: 'Spatial Analytics',
    highlights: ['Predictive Modelling', 'Urban Planning GIS', 'Geostatistics', 'Demand Forecasting'],
  },
  {
    slug: 'smart-city',
    category: 'SMART CITY',
    title: 'Connected Urban Ecosystems',
    description:
      'Through real-time location data and sensors we provide customised solutions for efficient, responsive cities via traffic management, energy optimization, and public safety.',
    bgImage: '/pillars/smart-city.jpg',
    cardTitle: 'Smart City Solutions',
    highlights: ['IoT Sensor Networks', 'Urban Analytics', 'Traffic Intelligence', 'Environmental Monitoring'],
  },
  {
    slug: 'asset-management',
    category: 'ASSET MANAGEMENT',
    title: 'Track, Monitor & Optimise Every Asset',
    description:
      'With the help of location data, we track, visualize, and maintain physical infrastructure, spanning from utility networks, to energy infra, fleets and facilities. This gives real-times insights to companies enabling proactive maintenance and comprehensive lifecycle planning.',
    bgImage: '/pillars/asset-management.jpg',
    cardTitle: 'Asset Management',
    highlights: ['Asset Tracking', 'Lifecycle Planning', 'Condition Monitoring', 'Inventory Mapping'],
  },
  {
    slug: 'aerial-surveys',
    category: 'AERIAL SURVEYS',
    title: 'Precision Mapping from the Sky',
    description:
      'The use of drones equipped with LiDAR sensors to capture high-precision 3D point clouds and terrain data from above, even in challenging environments like dense vegetation. It enables rapid, accurate topographic surveys, volumetric measurements, and detailed mapping for applications in surveying, forestry, and infrastructure inspection.',
    bgImage: '/pillars/drone-lidar.jpg',
    cardTitle: 'Drone & LiDAR Mapping',
    highlights: ['Orthomosaic Generation', 'Point Cloud Processing', 'Terrain Modelling', 'Asset Inspection'],
  },
  {
    slug: 'digital-twins',
    category: 'DIGITAL TWINS',
    title: 'Mirror the Real World in 3D',
    description:
      'Digital Twins are virtual replicas of assets or cities that support simulation, monitoring, predictive analysis, and immersive visualization for enhanced urban planning, infrastructure upgrades, and better decision-making across parameters.',
    bgImage: '/pillars/digital-twin-new.jpg',
    cardTitle: '3D Mapping & Digital Twins',
    highlights: ['City-Scale Twins', 'IoT Integration', 'BIM + GIS Fusion', 'Real-Time Monitoring'],
  },
  {
    slug: 'geobim-indoor',
    category: 'GEOBIM & INDOOR MAPPING',
    title: 'Where BIM Meets GIS',
    description:
      'Integrating Building Information Modelling with geospatial data to create coordinated indoor-outdoor intelligence. Our GeoBIM solutions bridge architecture, engineering, and location analytics for facility management, campus navigation, and construction monitoring.',
    bgImage: '/pillars/GeoBIM-Indoor Intelligence.jpg',
    cardTitle: 'GeoBIM & Indoor Mapping',
    highlights: ['Indoor Mapping', 'BIM-GIS Integration', 'Facility Management', 'Construction Monitoring'],
  },
  {
    slug: 'network-mapping',
    category: 'NETWORK MAPPING',
    title: 'Intelligent Infrastructure at Scale',
    description:
      'The geospatial documentation and visualization of utility infrastructure networks such as water, electricity, supports network analysis, outage management, maintenance planning, and regulatory compliance by providing accurate location-based utility data.',
    bgImage: '/pillars/utility-network.jpg',
    cardTitle: 'Utility Network Mapping',
    highlights: ['Fibre Route Mapping', 'Asset Digitisation', 'Outage Management', 'Network Planning'],
  },
  {
    slug: 'enterprise-gis',
    category: 'ENTERPRISE GIS',
    title: 'Scalable Platforms for Spatial Intelligence',
    description:
      'From data warehousing to mobile field apps and automated workflows that put location intelligence in the hands of every stakeholder, we design, build, and manage enterprise GIS platforms that serve as the spatial backbone of your organization.',
    bgImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1600&auto=format&fit=crop',
    cardTitle: 'Enterprise GIS Platforms',
    highlights: ['Web GIS Portals', 'Mobile Field Apps', 'Spatial ETL', 'Platform Administration'],
  },
  {
    slug: 'ai-ml-detection',
    category: 'AI/ML OBJECT DETECTION',
    title: 'Automate What You See',
    description:
      'We deploy AI and machine learning models to automatically detect, classify, and extract features from aerial and satellite imagery for large-scale object identification, infrastructure monitoring, and change detection without manual interpretation.',
    bgImage: '/pillars/AIML Object Detection.jpg',
    cardTitle: 'AI/ML Object Detection',
    highlights: ['Feature Extraction', 'Object Classification', 'Anomaly Detection', 'Automated QA/QC'],
  },
  {
    slug: 'remote-sensing',
    category: 'REMOTE SENSING',
    title: 'See What the Human Eye Cannot',
    description:
      'Through satellite imagery, multispectral sensors, and radar data to monitor land use, vegetation health, environmental change, and urban expansion, we turn Earth observation data into structured, decision-ready intelligence.',
    bgImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600&auto=format&fit=crop',
    cardTitle: 'Remote Sensing',
    highlights: ['Satellite Analytics', 'Change Detection', 'Land Classification', 'Environmental Monitoring'],
  },
]

export default function GeospatialSolutions() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section  Full Viewport */}
      <ServiceHero
        breadcrumb={"Geospatial Solutions"}
        eyebrow={"Core Service"}
        eyebrowIcon={Globe}
        title={"Capture, engineer and validate the physical world."}
        subtitle={"Geospatial & Mapping"}
        description={"From street-level imagery and LiDAR to roads, addresses, POIs and infrastructure assets, JSAN delivers geospatial data engineered for operational use."}
        image="https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=1600"
        imageAlt="Geospatial satellite earth view"
        stats={[{ value: '50M+', label: 'Features Mapped' }, { value: '100+', label: 'Projects' }, { value: '500+', label: 'GIS Experts' }, { value: '30+', label: 'Countries' }]}
      />


      <CapabilityModules
        eyebrow="Capabilities"
        heading="What we capture, engineer and validate"
        modules={[
          { name: 'Street-Level Imagery', description: 'Panoramic and forward-facing capture run to a defined route and sensor specification.', icon: Camera },
          { name: 'LiDAR & 3D Mapping', description: 'Point cloud capture and 3D modelling where geometry, clearance and elevation matter.', icon: Boxes },
          { name: 'Road Network & Geometry', description: 'Centrelines, lanes, turn restrictions and road attribution built for routing and navigation.', icon: Route },
          { name: 'POI & Address Intelligence', description: 'Sourced, normalised, matched and field-verified places and address data with evidence.', icon: MapPin },
          { name: 'Field Surveys', description: 'Ground truthing where source data cannot be trusted, carried out by crews in market.', icon: ClipboardCheck },
          { name: 'Infrastructure Mapping', description: 'Telecom, utility and transport assets captured with survey-grade positional quality.', icon: Building2 },
          { name: 'GIS Data Engineering', description: 'Schema design, conflation, topology and pipelines that make the data usable at scale.', icon: Database },
          { name: 'Quality Assurance', description: 'Sampling, reviewer calibration and QA gates applied before anything is released.', icon: ShieldCheck },
        ]}
      />

      {/* Subservice Cards */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
                    <CapabilityShowcase items={subServices} basePath="/services/geospatial" />
        </div>
      </section>

    

      <Footer />
      <MobileNav />
    </div>
  )
}
