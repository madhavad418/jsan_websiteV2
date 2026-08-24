import { Globe } from 'lucide-react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import MobileNav from '../../components/MobileNav'
import CapabilityShowcase from '../../components/CapabilityShowcase'
import ServiceHero from '../../components/ServiceHero'
import GovernanceModel from '../../components/GovernanceModel'

const subServices = [
  {
    slug: 'pmo-setup',
    category: 'PMO SETUP',
    title: 'Build Your Centre of Excellence',
    description:
      'Our experts guide the transition, build internal capabilities, and ensure the PMO delivers consistent visibility, control, and continuous improvement for global operations through standard processes.',
    bgImage: '/pillars/pmo-setup.jpg',
    cardTitle: 'PMO Setup',
    highlights: ['Governance Framework', 'Process Standardization', 'Tool Implementation', 'Capability Building'],
  },
  {
    slug: 'agile-transformation',
    category: 'AGILE TRANSFORMATION',
    title: 'Deliver Faster, Adapt Quicker',
    description:
      'From framework selection, training to cultural change and scaled implementation across distributed teams, we assist organisations in agile transformation. Our approach delivers faster time-to-market, improved collaboration, and higher adaptability in dynamic global environments.',
    bgImage: '/pillars/agile-transformation.jpg',
    cardTitle: 'Agile Transformation',
    highlights: ['Scrum & SAFe', 'Kanban Implementation', 'Team Coaching', 'Metrics & Reporting'],
  },
  {
    slug: 'quality-assurance',
    category: 'QUALITY ASSURANCE',
    title: 'Excellence in Every Deliverable',
    description:
      'We embed robust QA frameworks, automated testing, and continuous validation into your development lifecycle to minimize defects and ensure superior product reliability.',
    bgImage: '/pillars/quality.png',
    cardTitle: 'Quality Assurance',
    highlights: ['Test Automation', 'Performance Testing', 'Process Audits', 'Continuous Improvement'],
  },
]

export default function ProgramManagementNew() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <ServiceHero
        breadcrumb={"Program Management"}
        eyebrow={"Core Service"}
        eyebrowIcon={Globe}
        title={"Governance for complex, distributed delivery."}
        subtitle={"Program Management"}
        description={"JSAN provides structured program management across field, data, engineering and technology operations with transparent governance, risk management and performance control."}
        image="/pillars/program_manage.png"
        imageAlt="Program management excellence"
        stats={[{ value: '500+', label: 'Programs Managed' }, { value: '98%', label: 'On-Time Delivery' }, { value: '200+', label: 'PM Professionals' }, { value: '25+', label: 'Industries' }]}
      />

      <GovernanceModel />

      {/* Subservice Cards */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
                    <CapabilityShowcase items={subServices} basePath="/services/program-management" />
        </div>
      </section>


      <Footer />
      <MobileNav />
    </div>
  )
}
