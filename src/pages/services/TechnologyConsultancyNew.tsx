import { Globe } from 'lucide-react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import MobileNav from '../../components/MobileNav'
import CapabilityShowcase from '../../components/CapabilityShowcase'
import { allocationStats, serviceSplit } from '../../config/countAllocations'
import ServiceHero from '../../components/ServiceHero'

const subServices = [
  {
    slug: 'digital-transformation',
    category: 'DIGITAL TRANSFORMATION',
    title: 'Accelerate Your Digital Journey',
    description:
      'Through strategic integration of digital technologies across an organization, we strive to fundamentally transform the way it delivers value to customers through a focus on agility, innovation, data-driven decision-making, optimized operations, and enhanced customer experiences.',
    bgImage: '/pillars/digital-transformation.webp',
    cardTitle: 'Digital Transformation',
    highlights: ['Process Automation', 'Cloud Migration', 'Digital Strategy', 'Change Management'],
  },
  {
    slug: 'enterprise-architecture',
    category: 'ENTERPRISE ARCHITECTURE',
    title: 'Design Systems That Scale',
    description:
      'Our experts design solutions that align an organization\'s business strategy, processes, information systems, technology infrastructure, and data with a cohesive, holistic blueprint to support operations and enable strategic transformation.',
    bgImage: '/pillars/enterprise_architecture.webp',
    cardTitle: 'Enterprise Architecture',
    highlights: ['Technology Roadmaps', 'System Integration', 'Security Architecture', 'Scalability Planning'],
  },
  {
    slug: 'cloud-infrastructure',
    category: 'CLOUD & INFRASTRUCTURE',
    title: 'Build on a Foundation of Cloud',
    description:
      'Cloud enables cost-efficient scalability, hybrid/multi-cloud strategies, high availability, security compliance, and rapid innovation by shifting from traditional on-premises setups to flexible, pay-as-you-go models.',
    bgImage: '/pillars/cloud-infrastructure.webp',
    cardTitle: 'Cloud & Infrastructure',
    highlights: ['Cloud Strategy', 'Migration Services', 'DevOps & CI/CD', 'Infrastructure Optimization'],
  },
  {
    slug: 'data-analytics-ai',
    category: 'DATA ANALYTICS & AI',
    title: 'Intelligence That Drives Action',
    description:
      'We help organizations harness the power of data through advanced analytics, machine learning, and AI solutions by building data pipelines, predictive models, and intelligent dashboards that turn raw data into competitive advantage.',
    bgImage: '/pillars/dataanalytics.webp',
    cardTitle: 'Data Analytics & AI',
    highlights: ['Data Engineering', 'Machine Learning', 'Business Intelligence', 'Predictive Analytics'],
  },
]

export default function TechnologyConsultancyNew() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <ServiceHero
        breadcrumb={"Technology Consultancy"}
        eyebrow={"Core Service"}
        eyebrowIcon={Globe}
        title={"Technology Consultancy"}
        subtitle={"Modernise how your business runs on technology. We help organizations leverage smart technologies and intelligent solutions."}
        description={"From digital transformation strategy and enterprise architecture to cloud infrastructure and AI-driven analytics  we deliver end-to-end technology consulting that accelerates innovation, reduces risk, and drives measurable business outcomes."}
        image="/pillars/technology-consultancy.webp"
        imageAlt="Technology consultancy solutions"
        stats={[...allocationStats(serviceSplit, 'technology-consultancy'), { value: '50+', label: 'Enterprise Clients' }]}
      />

      {/* Subservice Cards */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
                    <CapabilityShowcase items={subServices} basePath="/services/technology-consultancy" />
        </div>
      </section>



      <Footer />
      <MobileNav />
    </div>
  )
}
