import { useParams, Link } from 'react-router-dom'
import { ArrowRight, CheckCircle, Globe, Target, Shield, Clock, DollarSign, Zap, MapPin, Cpu, BarChart3, Building2, Satellite, Camera, Box, Layers, Network, Brain, Eye } from 'lucide-react'
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
    slug: 'spatial-analytics',
    category: 'SPATIAL ANALYTICS',
    title: 'Data-Driven Decisions for Smarter Cities',
    subtitle: 'Location Intelligence Meets Advanced Analytics',
    description:
      'Our spatial analytics solutions integrate location context with traditional data analysis to uncover trends in urban planning, business intelligence, and environmental management. We transform raw geospatial data into predictive models and interactive dashboards that drive informed decision-making.',
    bgImage: '/pillars/spatial-analytics.webp',
    advantages: [
      { icon: BarChart3, text: 'Advanced geostatistical modelling and spatial regression' },
      { icon: Target, text: 'Precision demand forecasting with location context' },
      { icon: Zap, text: 'Real-time analytics dashboards with map-based visualization' },
      { icon: Cpu, text: 'Machine learning models trained on geospatial features' },
      { icon: DollarSign, text: 'ROI-driven site selection and market analysis' },
    ],
    idealFor: ['Urban planners', 'Retail chains', 'Real estate developers', 'Government agencies', 'Logistics companies'],
    businessImpact: [
      'Optimised site selection and market expansion',
      'Reduced planning cycle times by up to 60%',
      'Data-backed urban development strategies',
      'Improved resource allocation and coverage',
      'Evidence-based policy and regulatory decisions',
    ],
    deliverables: [
      'Interactive spatial dashboards',
      'Predictive heat maps',
      'Trade area & catchment analysis',
      'Demographic overlay reports',
      'Custom GIS-ready datasets',
      'Statistical model documentation',
    ],
  },
  {
    slug: 'smart-city',
    category: 'SMART CITY',
    title: 'Connected Urban Ecosystems',
    subtitle: 'Building the Cities of Tomorrow',
    description:
      'Through real-time location data and IoT sensor networks, we provide customised smart city solutions for efficient, responsive urban environments  from intelligent traffic management and energy optimization to public safety systems and environmental monitoring.',
    bgImage: '/pillars/smart-city.webp',
    advantages: [
      { icon: Network, text: 'IoT sensor integration with geospatial platforms' },
      { icon: Zap, text: 'Real-time monitoring and automated alerting' },
      { icon: Shield, text: 'Public safety analytics and incident response mapping' },
      { icon: Target, text: 'Traffic flow optimization using spatial AI' },
      { icon: DollarSign, text: 'Measurable energy and resource cost savings' },
    ],
    idealFor: ['Municipal governments', 'Urban development authorities', 'Utility providers', 'Transport agencies', 'Smart city initiatives'],
    businessImpact: [
      'Reduced traffic congestion by up to 30%',
      'Optimised energy distribution and consumption',
      'Faster emergency response with real-time GIS',
      'Improved citizen services through data transparency',
      'Integrated city-wide operational dashboards',
    ],
    deliverables: [
      'IoT-GIS integration platform',
      'Real-time city dashboards',
      'Traffic intelligence reports',
      'Environmental monitoring systems',
      'Citizen engagement portals',
      'Smart infrastructure maps',
    ],
  },
  {
    slug: 'asset-management',
    category: 'ASSET MANAGEMENT',
    title: 'Track, Monitor & Optimise Every Asset',
    subtitle: 'Geospatial Lifecycle Management',
    description:
      'Geospatial asset management leverages location data to track, visualise, and maintain physical infrastructure  from utility poles and pipelines to fleet vehicles and facilities  enabling proactive maintenance, lifecycle planning, and real-time operational visibility.',
    bgImage: '/pillars/asset-management.webp',
    advantages: [
      { icon: MapPin, text: 'Accurate location tracking of all physical assets' },
      { icon: Clock, text: 'Predictive maintenance scheduling based on asset condition' },
      { icon: Shield, text: 'Compliance tracking and audit-ready documentation' },
      { icon: Layers, text: 'Multi-layer asset visualisation on interactive maps' },
      { icon: DollarSign, text: 'Reduced maintenance costs through proactive management' },
    ],
    idealFor: ['Utility companies', 'Facility managers', 'Fleet operators', 'Infrastructure agencies', 'Telecom providers'],
    businessImpact: [
      'Extended asset lifespan through proactive maintenance',
      'Reduced unplanned downtime by up to 40%',
      'Comprehensive asset inventory with location context',
      'Streamlined regulatory compliance reporting',
      'Data-driven capital expenditure planning',
    ],
    deliverables: [
      'GIS-based asset registry',
      'Condition assessment reports',
      'Maintenance scheduling system',
      'Asset lifecycle dashboards',
      'Mobile field inspection apps',
      'Integration with ERP systems',
    ],
  },
  {
    slug: 'aerial-surveys',
    category: 'AERIAL SURVEYS',
    title: 'Precision Mapping from the Sky',
    subtitle: 'Drone & LiDAR Solutions for Every Industry',
    description:
      'Using drones equipped with LiDAR sensors to capture high-precision 3D point clouds and terrain data from above, even in challenging environments like dense vegetation. We enable rapid, accurate topographic surveys, volumetric measurements, and detailed mapping for surveying, forestry, and infrastructure inspection.',
    bgImage: '/pillars/drone-lidar.webp',
    advantages: [
      { icon: Camera, text: 'High-resolution orthomosaic and oblique imagery' },
      { icon: Target, text: 'Sub-centimetre accuracy with RTK/PPK GNSS' },
      { icon: Clock, text: 'Up to 80% faster than traditional ground surveys' },
      { icon: Shield, text: 'Zero risk in hazardous or hard-to-reach areas' },
      { icon: DollarSign, text: 'Lower cost per hectare than manned surveys' },
    ],
    idealFor: ['Surveying firms', 'Mining companies', 'Construction contractors', 'Forestry agencies', 'Infrastructure developers'],
    businessImpact: [
      'Faster project timelines with rapid data acquisition',
      'Improved accuracy for volumetric calculations',
      'Safer inspection of towers, bridges, and structures',
      'Reduced field crew requirements and costs',
      'Repeatable datasets for change detection',
    ],
    deliverables: [
      'High-resolution orthomosaic maps',
      '3D point cloud datasets',
      'Digital Elevation Models (DEM/DSM)',
      'Volumetric analysis reports',
      'Contour and topographic maps',
      'GIS-ready vector datasets',
    ],
  },
  {
    slug: 'digital-twins',
    category: 'DIGITAL TWINS',
    title: 'Mirror the Real World in 3D',
    subtitle: 'Virtual Replicas for Real-World Decisions',
    description:
      'Creating detailed three-dimensional representations of physical environments combined with real-time data to form digital twins  virtual replicas of assets or cities. These geospatial models support simulation, monitoring, predictive analysis, and immersive visualization for urban planning, infrastructure, and operational optimization.',
    bgImage: '/pillars/digital-twin.webp',
    advantages: [
      { icon: Box, text: 'Photorealistic 3D city and facility models' },
      { icon: Zap, text: 'Real-time IoT data integration and live updates' },
      { icon: Cpu, text: 'Simulation and scenario planning capabilities' },
      { icon: Layers, text: 'Coordinated BIM-GIS-IoT data fusion' },
      { icon: Target, text: 'Predictive analytics for maintenance and operations' },
    ],
    idealFor: ['Smart city authorities', 'Facility managers', 'Urban planners', 'Infrastructure operators', 'Construction firms'],
    businessImpact: [
      'Proactive maintenance reducing downtime by 35%',
      'Immersive stakeholder engagement and visualization',
      'Scenario simulation for risk and disaster planning',
      'Unified operational view of distributed assets',
      'Faster design-to-build workflows',
    ],
    deliverables: [
      'City-scale 3D digital twin models',
      'IoT-connected real-time dashboards',
      'BIM + GIS integrated platforms',
      'Simulation and what-if tools',
      'Stakeholder visualization portals',
      'Change detection and monitoring reports',
    ],
  },
  {
    slug: 'geobim-indoor',
    category: 'GEOBIM & INDOOR MAPPING',
    title: 'Where BIM Meets GIS',
    subtitle: 'Coordinated Indoor-Outdoor Intelligence',
    description:
      'Integrating Building Information Modelling with geospatial data to create coordinated indoor-outdoor intelligence. Our GeoBIM solutions bridge architecture, engineering, and location analytics for facility management, campus navigation, and construction monitoring.',
    bgImage: '/pillars/GeoBIM-Indoor Intelligence.jpg',
    advantages: [
      { icon: Building2, text: 'Full indoor-outdoor spatial continuity' },
      { icon: Layers, text: 'BIM-to-GIS data translation and synchronisation' },
      { icon: MapPin, text: 'Indoor wayfinding and space utilization analytics' },
      { icon: Clock, text: 'Real-time construction progress monitoring' },
      { icon: Target, text: 'Precision facility management at room level' },
    ],
    idealFor: ['Real estate developers', 'Airport authorities', 'Hospital administrators', 'University campuses', 'Corporate facility teams'],
    businessImpact: [
      'Reduced construction rework by up to 25%',
      'Optimised space utilization across facilities',
      'Streamlined facility operations and maintenance',
      'Better tenant and visitor navigation experience',
      'Unified architecture and GIS data workflows',
    ],
    deliverables: [
      'Integrated BIM-GIS models',
      'Indoor mapping and navigation apps',
      'Space utilization dashboards',
      'Construction monitoring reports',
      'Facility management platforms',
      'As-built GIS documentation',
    ],
  },
  {
    slug: 'network-mapping',
    category: 'UTILITY NETWORK MAPPING',
    title: 'Intelligent Infrastructure at Scale',
    subtitle: 'Smarter Telecom & Utility Surveys from the Sky',
    description:
      'Drone-based inspection and mapping of telecom towers, fibre routes, and utility networks  delivering faster, safer, and more accurate data than traditional methods. Our geospatial documentation and visualization supports network analysis, outage management, maintenance planning, and regulatory compliance.',
    bgImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1600&auto=format&fit=crop',
    advantages: [
      { icon: Clock, text: 'Up to 80% faster than manual inspection' },
      { icon: Shield, text: 'Zero climbing risk for personnel' },
      { icon: Zap, text: 'No network shutdown required' },
      { icon: Target, text: 'High accuracy & repeatable data' },
      { icon: DollarSign, text: 'Lower inspection & downtime cost' },
    ],
    idealFor: ['Telecom operators', 'Tower companies', 'EPC contractors', 'Network planners', 'O&M teams'],
    businessImpact: [
      'Faster fault detection & repairs',
      'Improved tower lifespan',
      'Better expansion planning',
      'Reduced operational risk',
      'Data-driven asset management',
    ],
    deliverables: [
      'High-resolution orthomosaic maps',
      '3D tower models',
      'Asset condition reports',
      'Vegetation encroachment analysis',
      'Structural defect identification',
      'GIS-ready datasets',
    ],
  },
  {
    slug: 'enterprise-gis',
    category: 'ENTERPRISE GIS',
    title: 'Scalable Platforms for Spatial Intelligence',
    subtitle: 'Your Organisation\'s Spatial Backbone',
    description:
      'From data warehousing to mobile field apps and automated workflows that put location intelligence in the hands of every stakeholder, we design, build, and manage enterprise GIS platforms that serve as the spatial backbone of your organization.',
    bgImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1600&auto=format&fit=crop',
    advantages: [
      { icon: Layers, text: 'Centralised spatial data warehouse and governance' },
      { icon: Cpu, text: 'Custom web GIS portals and map applications' },
      { icon: Zap, text: 'Automated spatial ETL and data pipelines' },
      { icon: Network, text: 'API integrations with ERP, CRM, and IoT systems' },
      { icon: Shield, text: 'Role-based access control and data security' },
    ],
    idealFor: ['Large enterprises', 'Government departments', 'Utility companies', 'Transport authorities', 'Multinational organisations'],
    businessImpact: [
      'Single source of truth for all spatial data',
      'Reduced data silos and duplication',
      'Faster decision-making with location context',
      'Scalable platform supporting thousands of users',
      'Lower total cost of ownership for GIS operations',
    ],
    deliverables: [
      'Enterprise GIS architecture design',
      'Web mapping portals and dashboards',
      'Mobile field data collection apps',
      'Spatial ETL pipeline configuration',
      'User training and documentation',
      'Platform administration and support',
    ],
  },
  {
    slug: 'ai-ml-detection',
    category: 'AI/ML OBJECT DETECTION',
    title: 'Automate What You See',
    subtitle: 'Machine Intelligence for Geospatial Data',
    description:
      'We deploy AI and machine learning models to automatically detect, classify, and extract features from aerial and satellite imagery for large-scale object identification, infrastructure monitoring, and change detection without manual interpretation.',
    bgImage: '/pillars/AIML Object Detection.jpg',
    advantages: [
      { icon: Brain, text: 'Custom-trained deep learning models for feature extraction' },
      { icon: Eye, text: 'Automated object detection across thousands of images' },
      { icon: Zap, text: 'Real-time classification and anomaly alerting' },
      { icon: Target, text: '95%+ accuracy on trained feature classes' },
      { icon: Clock, text: '100x faster than manual image interpretation' },
    ],
    idealFor: ['Defence and intelligence', 'Agriculture companies', 'Insurance firms', 'Environmental agencies', 'Infrastructure operators'],
    businessImpact: [
      'Eliminated manual image interpretation bottlenecks',
      'Consistent, repeatable feature extraction at scale',
      'Early anomaly detection for proactive response',
      'Reduced QA/QC costs through automated validation',
      'Scalable processing of petabytes of imagery',
    ],
    deliverables: [
      'Trained ML model packages',
      'Feature extraction datasets',
      'Classification accuracy reports',
      'Change detection analysis',
      'API-ready detection services',
      'Model retraining documentation',
    ],
  },
  {
    slug: 'remote-sensing',
    category: 'REMOTE SENSING',
    title: 'See What the Human Eye Cannot',
    subtitle: 'Earth Observation at Continental Scale',
    description:
      'Through satellite imagery, multispectral sensors, and radar data to monitor land use, vegetation health, environmental change, and urban expansion, we turn Earth observation data into structured, decision-ready intelligence.',
    bgImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600&auto=format&fit=crop',
    advantages: [
      { icon: Satellite, text: 'Multi-source satellite imagery processing' },
      { icon: Eye, text: 'Multispectral and hyperspectral analysis' },
      { icon: Target, text: 'Sub-metre resolution land classification' },
      { icon: Clock, text: 'Time-series change detection and monitoring' },
      { icon: Layers, text: 'Radar (SAR) analysis for all-weather coverage' },
    ],
    idealFor: ['Environmental agencies', 'Agricultural enterprises', 'Mining companies', 'Forest departments', 'Climate research organisations'],
    businessImpact: [
      'Continental-scale monitoring without ground teams',
      'Early detection of environmental changes',
      'Precision agriculture with vegetation index and crop health maps',
      'Regulatory compliance for land use reporting',
      'Historical trend analysis over decades of imagery',
    ],
    deliverables: [
      'Land use / land cover maps',
      'Vegetation health indices',
      'Change detection reports',
      'Satellite-derived elevation models',
      'Environmental monitoring dashboards',
      'Custom spectral analysis products',
    ],
  },
]

export default function GeospatialSubService() {
  const { slug } = useParams<{ slug: string }>()
  const service = subServiceData.find((s) => s.slug === slug)

  if (!service) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Service Not Found</h1>
          <Link to="/services/geospatial" className="text-[#0050a9] hover:underline">
            ← Back to Geospatial Solutions
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
              <Link to="/services/geospatial" className="text-white/70 hover:text-white transition-colors">Geospatial</Link>
              <span className="text-white/50">/</span>
              <span className="text-white/90 font-medium">{service.category}</span>
            </div>
            <span className="inline-flex items-center gap-2 bg-white/10 text-[#00d4ff] px-3 py-1 rounded-full text-sm font-semibold">
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

      {/* Detail Section (blue gradient)  same layout as the Utility Network Mapping section */}
      <section className="py-20" style={{ background: 'linear-gradient(120deg, #012f62, #0055b4)' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="text-[36px] lg:text-[44px] font-bold text-white mb-4 leading-tight">
                Why {service.category.split(' ').map(w => w === 'GEOBIM' ? 'GeoBIM' : w === 'AI/ML' ? 'AI/ML' : (w.length <= 3 ? w : w.charAt(0) + w.slice(1).toLowerCase())).join(' ')}?
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
                Every engagement produces a comprehensive, field-validated deliverable package  ready for integration into your GIS, asset management, or planning systems.
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
                Interested in {service.category.split(' ').map(w => w === 'GEOBIM' ? 'GeoBIM' : w === 'AI/ML' ? 'AI/ML' : (w.length <= 3 ? w : w.charAt(0) + w.slice(1).toLowerCase())).join(' ')}?
              </h3>
              <p className="text-white/70 text-base leading-relaxed mb-8">
                Get in touch with our geospatial team to explore how we can help transform your operations.
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
                    <p className="text-white/60 text-sm">Discuss your geospatial needs</p>
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
        basePath="/services/geospatial"
        currentSlug={service.slug}
        parentName="Geospatial Solutions"
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
