import { Globe } from 'lucide-react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import MobileNav from '../../components/MobileNav'
import CapabilityShowcase from '../../components/CapabilityShowcase'
import { allocationStats, serviceSplit } from '../../config/countAllocations'
import ServiceHero from '../../components/ServiceHero'

const subServices = [
  {
    slug: 'data-capture',
    category: 'DATA CAPTURE & ENHANCEMENT',
    title: 'Collect, Enrich & Structure Location Data at Scale',
    description:
      'We transform raw data into high-quality, actionable assets that power better CRM, marketing, and decision-making processes.',
    bgImage: '/pillars/data-capture.webp',
    cardTitle: 'Data Capture & Enhancement',
    highlights: ['Field Data Collection', 'Data Cleansing & QA/QC', 'Geocoding & Enrichment', 'Database Structuring'],
  },
  {
    slug: 'advanced-analytics',
    category: 'ADVANCED ANALYTICS',
    title: 'Turn Location Data into Predictive Intelligence',
    description:
      'Our team of experts deliver sophisticated data analysis using AI, Machine Learning, and predictive modeling to uncover deep insights and forecast trends.',
    bgImage: '/pillars/advance-analytics.webp',
    cardTitle: 'Advanced Analytics',
    highlights: ['Predictive Modelling', 'Spatial Data Science', 'Market Intelligence', 'Risk Assessment'],
  },
  {
    slug: 'custom-platforms',
    category: 'CUSTOM PLATFORMS',
    title: 'Purpose-Built Geospatial Applications',
    description:
      'We design, develop, and deploy fully tailored software platforms, including web, mobile, enterprise, and AI-enabled systems built specifically to your unique business requirements.',
    bgImage: '/pillars/custom-platforms.webp',
    cardTitle: 'Custom Platforms',
    highlights: ['Web GIS Portals', 'Mobile Field Apps', 'Dashboard Solutions', 'API Integrations'],
  },
  {
    slug: 'strategy-advisory',
    category: 'STRATEGY ADVISORY',
    title: 'Strategic Roadmaps for Location Intelligence',
    description:
      'From technology selection and data governance to organizational readiness and ROI planning for measurable business value, we help organizations craft their location intelligence strategy.',
    bgImage: '/pillars/strategy-advisory.webp',
    cardTitle: 'Strategy Advisory',
    highlights: ['Technology Roadmaps', 'Data Governance', 'ROI Planning', 'Organizational Readiness'],
  },
  {
    slug: 'navigation-data',
    category: 'NAVIGATION DATA',
    title: 'Precision Routing & Navigation Solutions',
    description:
      'Our data powers navigation apps, fleet management, autonomous vehicles, logistics, and location-based services with reliable, up-to-date spatial intelligence.',
    bgImage: '/pillars/navigation-data.webp',
    cardTitle: 'Navigation',
    highlights: ['Road Network Mapping', 'Address Databases', 'Fleet Routing', 'Real-Time Traffic'],
  },
]

export default function LocationIntelligence() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section  Full Viewport */}
      <ServiceHero
        breadcrumb={"Location Intelligence"}
        eyebrow={"Core Service"}
        eyebrowIcon={Globe}
        title={"Location Intelligence"}
        subtitle={"Through the power of Location Intelligence, JSAN empowers businesses with actionable insights for site selection, risk assessment, supply chain optimization, and strategic planning."}
        description={"Through the power of Location Intelligence, JSAN empowers businesses with actionable insights for site selection, risk assessment, supply chain optimization, and strategic planning."}
        image="/pillars/location_intel.webp"
        imageAlt="Location intelligence global data visualization"
        stats={[...allocationStats(serviceSplit, 'location-intelligence'), { value: '100M+', label: 'Data Points Processed' }, { value: '25+', label: 'Countries' }]}
      />

      {/* Subservice Cards */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
                    <CapabilityShowcase items={subServices} basePath="/services/location-intelligence" />
        </div>
      </section>



      <Footer />
      <MobileNav />
    </div>
  )
}
