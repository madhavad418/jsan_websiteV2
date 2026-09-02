import { Globe } from 'lucide-react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import MobileNav from '../../components/MobileNav'
import CapabilityShowcase from '../../components/CapabilityShowcase'
import ServiceHero from '../../components/ServiceHero'

const subServices = [
  {
    slug: 'contract-staffing',
    category: 'CONTRACT STAFFING',
    title: 'Flexible Talent, On Demand',
    description:
      'We provide highly skilled professionals on a contract basis, handling payroll, benefits, compliance, and onboarding. This flexible model allows global clients to rapidly scale teams up or down in response to volatile market conditions or business demands.',
    bgImage: '/pillars/contract-staffing.jpg',
    cardTitle: 'Contract Staffing',
    highlights: ['On-Demand Scaling', 'Flexible Contracts', 'Pre-Vetted Talent', 'Rapid Deployment'],
  },
  {
    slug: 'permanent-placement',
    category: 'PERMANENT PLACEMENT',
    title: 'Find the Right People',
    description:
      'We identify, assess, and place top-tier talent into permanent roles, conducting rigorous screening and cultural fit evaluations to secure long-term value for your organization. Our global network and industry expertise guarantees high-retention hires that align with your strategic goals and drive sustained business growth.',
    bgImage: '/pillars/permanent-placement.jpg',
    cardTitle: 'Permanent Placement',
    highlights: ['Executive Hiring', 'Technical Screening', 'Cultural Fit Assessment', 'Salary Benchmarking'],
  },
  {
    slug: 'team-augmentation',
    category: 'TEAM AUGMENTATION',
    title: 'Extend Your Team, Instantly',
    description:
      'We integrate expert resources into your existing teams, extending capacity and bringing specialized knowledge without disrupting internal structures or processes.',
    bgImage: '/pillars/team-augmentation.jpg',
    cardTitle: 'Team Augmentation',
    highlights: ['Skill Gap Analysis', 'Embedded Engineers', 'Agile Team Scaling', 'Knowledge Transfer'],
  },
  {
    slug: 'executive-search',
    category: 'EXECUTIVE SEARCH',
    title: 'Leadership That Transforms',
    description:
      'We conduct targeted, confidential searches for the C-suite and senior leadership roles, leveraging our extensive international networks to identify business leaders.',
    bgImage: '/pillars/executive-search.jpg',
    cardTitle: 'Executive Search',
    highlights: ['C-Suite Recruitment', 'Leadership Assessment', 'Market Mapping', 'Succession Planning'],
  },
]

export default function StaffingSolutionsNew() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <ServiceHero
        breadcrumb={"Staffing Solutions"}
        eyebrow={"Core Service"}
        eyebrowIcon={Globe}
        title={"Staffing Solutions"}
        subtitle={"JSAN delivers comprehensive, tailored workforce strategies that combine flexible talent sourcing, compliance management, and scalable deployment globally."}
        description={"Our end-to-end approach ensures you access the right skills at the right time while minimizing administrative burden and optimizing cost efficiency."}
        image="/pillars/staffing.png"
        imageAlt="Staffing solutions global recruitment"
        stats={[{ value: '5,000+', label: 'Placements Made' }, { value: '200+', label: 'Active Clients' }, { value: '48hrs', label: 'Avg. Response Time' }, { value: '25+', label: 'Countries' }]}
      />

      {/* Subservice Cards */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
                    <CapabilityShowcase items={subServices} basePath="/services/staffing-solutions" />
        </div>
      </section>

      <Footer />
      <MobileNav />
    </div>
  )
}
