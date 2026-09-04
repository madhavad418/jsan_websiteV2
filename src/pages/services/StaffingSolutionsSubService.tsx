import { useParams, Link } from 'react-router-dom'
import { ArrowRight, CheckCircle, Globe, Target, Shield, Clock, DollarSign, Zap, MapPin, Users, Search, Briefcase, Award, TrendingUp, UserCheck } from 'lucide-react'
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
    slug: 'contract-staffing',
    category: 'CONTRACT STAFFING',
    title: 'Flexible Talent, On Demand',
    subtitle: 'Scale Your Workforce Without the Overhead',
    description:
      'Our contract staffing solutions provide skilled IT professionals on flexible engagement models  from short-term project support to long-term managed teams  enabling you to scale your workforce up or down based on business needs without the overhead of permanent hiring.',
    bgImage: '/pillars/contract-staffing.webp',
    advantages: [
      { icon: Zap, text: 'Rapid deployment within 48-72 hours for urgent requirements' },
      { icon: UserCheck, text: 'Pre-vetted professionals with verified technical skills' },
      { icon: Shield, text: 'Full compliance with local labor laws and regulations' },
      { icon: DollarSign, text: 'Cost-effective alternative to permanent hiring' },
      { icon: Clock, text: 'Flexible contract durations from 3 months to multi-year' },
    ],
    idealFor: ['Technology companies', 'System integrators', 'Government contractors', 'Enterprise IT departments', 'Consulting firms'],
    businessImpact: [
      'Reduced time-to-fill from months to days',
      'Up to 30% cost savings vs. permanent hiring',
      'Zero overhead for benefits and administration',
      'Flexible scaling aligned with project demand',
      'Access to niche and hard-to-find skill sets',
    ],
    deliverables: [
      'Candidate shortlists within 48 hours',
      'Technical skills assessment reports',
      'Background verification documentation',
      'Contract and compliance framework',
      'Performance monitoring dashboards',
      'Replacement guarantee terms',
    ],
  },
  {
    slug: 'permanent-placement',
    category: 'PERMANENT PLACEMENT',
    title: 'Find the Right People',
    subtitle: 'Every Hire is an Investment in Your Future',
    description:
      'Our permanent placement practice identifies, evaluates, and secures top-tier technology talent for critical long-term roles  leveraging deep industry networks, rigorous screening, and cultural fit assessment to ensure every hire delivers lasting value.',
    bgImage: '/pillars/permanent-placement.webp',
    advantages: [
      { icon: Search, text: 'Deep industry networks across 25+ countries' },
      { icon: Target, text: 'Multi-stage technical and behavioral assessment' },
      { icon: Users, text: 'Cultural fit evaluation aligned with your values' },
      { icon: TrendingUp, text: 'Salary benchmarking with market intelligence' },
      { icon: Shield, text: 'Replacement guarantee for every placement' },
    ],
    idealFor: ['Growing startups', 'Enterprise organizations', 'Digital agencies', 'Product companies', 'Research institutions'],
    businessImpact: [
      '90%+ retention rate at 12 months',
      'Reduced cost-per-hire through efficient sourcing',
      'Faster onboarding with pre-assessed candidates',
      'Improved team performance and cultural alignment',
      'Access to passive candidates not on job boards',
    ],
    deliverables: [
      'Detailed candidate profiles',
      'Technical assessment scorecards',
      'Cultural fit evaluation reports',
      'Compensation benchmarking data',
      'Interview coordination and support',
      'Onboarding transition assistance',
    ],
  },
  {
    slug: 'team-augmentation',
    category: 'TEAM AUGMENTATION',
    title: 'Extend Your Team, Instantly',
    subtitle: 'Your Team, Amplified',
    description:
      'Team augmentation embeds skilled professionals directly into your existing teams  working under your management, using your tools, and aligned to your delivery cadence. It\'s the fastest way to fill skill gaps, accelerate delivery, and maintain project momentum.',
    bgImage: '/pillars/team-augmentation.webp',
    advantages: [
      { icon: Users, text: 'Professionals embedded directly into your team culture' },
      { icon: Zap, text: 'Rapid onboarding with minimal ramp-up time' },
      { icon: Briefcase, text: 'Full skill-gap analysis before engagement' },
      { icon: Clock, text: 'Flexible scaling  add or reduce team members as needed' },
      { icon: Award, text: 'Knowledge transfer built into every engagement' },
    ],
    idealFor: ['Product development teams', 'Digital transformation programs', 'Enterprise IT departments', 'Agile delivery teams', 'R&D organizations'],
    businessImpact: [
      'Maintained project velocity during talent shortages',
      'Reduced ramp-up time by 60% vs. new hires',
      'Institutional knowledge preserved through KT protocols',
      'Flexible cost structure aligned with delivery phases',
      'Access to specialized skills without long-term commitment',
    ],
    deliverables: [
      'Skill-gap analysis report',
      'Team composition recommendations',
      'Augmented team onboarding plan',
      'Performance metrics and KPIs',
      'Knowledge transfer documentation',
      'Engagement review and feedback',
    ],
  },
  {
    slug: 'executive-search',
    category: 'EXECUTIVE SEARCH',
    title: 'Leadership That Transforms',
    subtitle: 'Finding Leaders Who Move Organizations Forward',
    description:
      'Our executive search practice identifies and attracts senior technology leaders  CTOs, CIOs, VPs of Engineering, and digital transformation heads  who bring the strategic vision, domain expertise, and leadership capability to drive organizational change.',
    bgImage: '/pillars/executive-search.webp',
    advantages: [
      { icon: Search, text: 'Confidential search with access to passive senior talent' },
      { icon: Award, text: 'Leadership competency assessment and psychometric profiling' },
      { icon: Target, text: 'Market mapping across industries and geographies' },
      { icon: Users, text: 'Board-level and C-suite recruitment expertise' },
      { icon: TrendingUp, text: 'Succession planning and talent pipeline development' },
    ],
    idealFor: ['Boards of directors', 'PE and VC portfolio companies', 'Scaling technology firms', 'Government technology agencies', 'Enterprise digital divisions'],
    businessImpact: [
      'Access to top 5% of executive talent in the market',
      'Reduced leadership vacancy risk through succession planning',
      'Improved organizational performance with the right leaders',
      'Confidential search protecting employer brand',
      'Strategic alignment between leadership and business vision',
    ],
    deliverables: [
      'Market mapping and talent landscape report',
      'Longlist and shortlist of candidates',
      'Leadership assessment and profiling',
      'Compensation and benefits benchmarking',
      'Interview and selection support',
      'Onboarding and transition advisory',
    ],
  },
]

export default function StaffingSolutionsSubService() {
  const { slug } = useParams<{ slug: string }>()
  const service = subServiceData.find((s) => s.slug === slug)

  if (!service) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Service Not Found</h1>
          <Link to="/services/staffing-solutions" className="text-[#0050a9] hover:underline">&larr; Back to Staffing Solutions</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <section className="relative overflow-hidden pt-28 lg:pt-36 pb-20 lg:pb-28" style={{ marginTop: '44px' }}>
        <div className="absolute inset-0">
          <img src={service.bgImage} alt={service.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
        </div>
        <div className="absolute top-0 left-0 right-0 bg-black/20 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link to="/services/staffing-solutions" className="text-white/70 hover:text-white transition-colors">Services</Link>
              <span className="text-white/50">/</span>
              <Link to="/services/staffing-solutions" className="text-white/70 hover:text-white transition-colors">Staffing Solutions</Link>
              <span className="text-white/50">/</span>
              <span className="text-white/90 font-medium">{service.category}</span>
            </div>
            <span className="hidden sm:inline-flex items-center gap-2 bg-white/10 text-[#00d4ff] px-3 py-1 rounded-full text-sm font-semibold">
              <Globe className="w-4 h-4" />{service.category}
            </span>
          </div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <h1 className="text-white text-[36px] md:text-[48px] lg:text-[56px] font-bold leading-[1.1] mb-4 tracking-tight">{service.title}</h1>
          <p className="text-white/85 text-lg md:text-xl lg:text-2xl leading-relaxed mb-6">{service.subtitle}</p>
        </div>
      </section>

      <section className="py-20" style={{ background: 'linear-gradient(120deg, #012f62, #0055b4)' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="text-[36px] lg:text-[44px] font-bold text-white mb-4 leading-tight">Why {service.category.split(' ').map(w => w.length <= 3 ? w : w.charAt(0) + w.slice(1).toLowerCase()).join(' ')}?</h2>
              <p className="text-white/75 text-lg leading-relaxed mb-8">{service.description}</p>
              <div className="space-y-3 mb-10">
                {service.advantages.map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0"><item.icon className="w-5 h-5 text-[#00d4ff]" /></div>
                    <span className="text-white/90">{item.text}</span>
                  </div>
                ))}
              </div>
              <a href="/contact" className="btn-primary">Discuss Your Needs<ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" /></a>
            </div>
            <div className="space-y-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                <h3 className="text-xl font-bold text-white mb-5">Ideal For</h3>
                <div className="flex flex-wrap gap-3">
                  {service.idealFor.map((item, i) => (<span key={i} className="bg-white/10 text-white/90 px-4 py-2 rounded-full text-sm font-medium border border-white/10">{item}</span>))}
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                <h3 className="text-xl font-bold text-white mb-5">Business Impact</h3>
                <div className="space-y-3">
                  {service.businessImpact.map((item, i) => (
                    <div key={i} className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-[#00d4ff] flex-shrink-0" /><span className="text-white/90">{item}</span></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-[36px] lg:text-[42px] font-bold text-[#0050a9] mb-4">What We Deliver</h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">Every engagement delivers a transparent, quality-assured talent solution  from sourcing to onboarding.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {service.deliverables.map((item, i) => (
                  <div key={i} className="flex items-start gap-3 bg-white rounded-xl p-4 border border-gray-100">
                    <div className="w-8 h-8 bg-[#0050a9] rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"><CheckCircle className="w-4 h-4 text-[#00d4ff]" /></div>
                    <span className="text-[#0050a9] font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-3xl p-8 lg:p-10" style={{ background: 'linear-gradient(120deg, #012f62, #0055b4)' }}>
              <h3 className="text-2xl font-bold text-white mb-3">Need {service.category.split(' ').map(w => w.length <= 3 ? w : w.charAt(0) + w.slice(1).toLowerCase()).join(' ')}?</h3>
              <p className="text-white/70 text-base leading-relaxed mb-8">Get in touch with our recruitment team to find the right talent for your organization.</p>
              <div className="space-y-4">
                <a href="/contact" className="flex items-center gap-4 bg-white/10 hover:bg-white/15 border border-white/10 rounded-xl p-5 transition-colors group">
                  <div className="w-12 h-12 bg-[#00d4ff]/20 rounded-xl flex items-center justify-center flex-shrink-0"><MapPin className="w-6 h-6 text-[#00d4ff]" /></div>
                  <div className="flex-1"><h4 className="text-white font-semibold">Get in Touch</h4><p className="text-white/60 text-sm">Tell us about your staffing needs</p></div>
                  <ArrowRight className="w-5 h-5 text-white/40 group-hover:text-white/80 transition-colors" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>


      <RelatedSubServices
        items={subServiceData}
        basePath="/services/staffing-solutions"
        currentSlug={service.slug}
        parentName="Staffing Solutions"
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
