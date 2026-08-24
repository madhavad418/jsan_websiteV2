import { useParams, Link } from 'react-router-dom'
import { ArrowRight, CheckCircle, Globe, Target, Shield, DollarSign, Zap, MapPin, Cpu, BarChart3, Layers, Network, Brain, Cloud, Settings, Database, TrendingUp, RefreshCw, Lock } from 'lucide-react'
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
    slug: 'digital-transformation',
    category: 'DIGITAL TRANSFORMATION',
    title: 'Accelerate Your Digital Journey',
    subtitle: 'Reimagine Business Through Technology',
    description:
      'We help organizations reimagine their business models, processes, and customer experiences through strategic adoption of digital technologies  from automation and cloud migration to data-driven decision-making and digital-first operations.',
    bgImage: '/pillars/digital-transformation.jpg',
    advantages: [
      { icon: TrendingUp, text: 'End-to-end digital strategy aligned with business objectives' },
      { icon: RefreshCw, text: 'Process automation reducing manual effort by up to 70%' },
      { icon: Cloud, text: 'Cloud-first architecture for scalability and resilience' },
      { icon: Brain, text: 'AI and data-driven decision-making frameworks' },
      { icon: Settings, text: 'Change management ensuring organizational adoption' },
    ],
    idealFor: ['Enterprise organizations', 'Government agencies', 'Financial institutions', 'Healthcare providers', 'Manufacturing companies'],
    businessImpact: [
      'Accelerated time-to-market for digital products',
      'Reduced operational costs through process automation',
      'Improved customer experience and engagement',
      'Data-driven culture enabling faster decisions',
      'Future-proof technology foundation',
    ],
    deliverables: [
      'Digital transformation roadmap',
      'Process automation blueprints',
      'Technology architecture design',
      'Change management plan',
      'ROI and benefits tracker',
      'Implementation timeline',
    ],
  },
  {
    slug: 'enterprise-architecture',
    category: 'ENTERPRISE ARCHITECTURE',
    title: 'Design Systems That Scale',
    subtitle: 'Aligning Technology with Business Vision',
    description:
      'Our enterprise architecture practice aligns IT strategy with business goals  designing scalable, secure, and future-proof technology landscapes that reduce complexity, eliminate redundancy, and enable agile decision-making across the organization.',
    bgImage: '/pillars/enterprise-architecture.jpg',
    advantages: [
      { icon: Layers, text: 'Comprehensive technology landscape assessment and mapping' },
      { icon: Lock, text: 'Security-first architecture with zero-trust principles' },
      { icon: Network, text: 'Coordinated system integration and API-first design' },
      { icon: Target, text: 'Standards-based frameworks (TOGAF, Zachman)' },
      { icon: DollarSign, text: 'TCO optimization through rationalization' },
    ],
    idealFor: ['Large enterprises', 'Government departments', 'Financial services', 'Telecom operators', 'Healthcare systems'],
    businessImpact: [
      'Reduced technology complexity and technical debt',
      'Faster onboarding of new systems and services',
      'Improved security posture and compliance',
      'Lower total cost of ownership across IT landscape',
      'Aligned technology investments with business strategy',
    ],
    deliverables: [
      'Current-state architecture assessment',
      'Target-state architecture design',
      'Integration strategy and API catalog',
      'Security architecture framework',
      'Technology rationalization plan',
      'Governance and standards documentation',
    ],
  },
  {
    slug: 'cloud-infrastructure',
    category: 'CLOUD & INFRASTRUCTURE',
    title: 'Build on a Foundation of Cloud',
    subtitle: 'Performance, Reliability, Cost Efficiency',
    description:
      'From cloud strategy and migration to hybrid infrastructure management and DevOps enablement  we design, deploy, and optimize cloud environments that deliver performance, reliability, and cost efficiency at enterprise scale.',
    bgImage: '/pillars/cloud-infrastructure.jpg',
    advantages: [
      { icon: Cloud, text: 'Multi-cloud strategy across AWS, Azure, and GCP' },
      { icon: RefreshCw, text: 'Zero-downtime migration with automated rollback' },
      { icon: Zap, text: 'CI/CD pipeline design and DevOps implementation' },
      { icon: Shield, text: 'Cloud security and compliance frameworks' },
      { icon: DollarSign, text: 'FinOps practices for cloud cost optimization' },
    ],
    idealFor: ['Technology companies', 'SaaS providers', 'Financial institutions', 'E-commerce platforms', 'Government agencies'],
    businessImpact: [
      'Up to 40% reduction in infrastructure costs',
      '99.99% uptime through resilient architecture',
      'Faster deployment cycles with CI/CD automation',
      'Improved security and regulatory compliance',
      'Elastic scaling for variable workloads',
    ],
    deliverables: [
      'Cloud strategy and roadmap',
      'Migration plan and execution',
      'CI/CD pipeline configuration',
      'Infrastructure-as-Code templates',
      'Cloud security assessment',
      'Cost optimization reports',
    ],
  },
  {
    slug: 'data-analytics-ai',
    category: 'DATA ANALYTICS & AI',
    title: 'Intelligence That Drives Action',
    subtitle: 'From Raw Data to Competitive Advantage',
    description:
      'We help organizations harness the power of data through advanced analytics, machine learning, and AI solutions by building data pipelines, predictive models, and intelligent dashboards that turn raw data into competitive advantage.',
    bgImage: '/pillars/data-analytics-ai.jpg',
    advantages: [
      { icon: Database, text: 'Modern data platform design and data lake architecture' },
      { icon: Brain, text: 'Custom ML models trained on your business data' },
      { icon: BarChart3, text: 'Interactive dashboards with real-time analytics' },
      { icon: Cpu, text: 'AI-powered automation and intelligent workflows' },
      { icon: Target, text: 'Predictive analytics for forecasting and optimization' },
    ],
    idealFor: ['Retail and e-commerce', 'Financial services', 'Healthcare networks', 'Supply chain operators', 'Marketing teams'],
    businessImpact: [
      'Data-driven decisions replacing gut-feel approaches',
      'Predictive models with 85%+ accuracy',
      'Automated reporting saving hours per week',
      'New revenue streams through data monetization',
      'Reduced operational waste through optimization',
    ],
    deliverables: [
      'Data platform architecture',
      'ETL pipeline implementation',
      'ML model development and training',
      'Interactive BI dashboards',
      'Data governance framework',
      'AI proof-of-concept deliverables',
    ],
  },
]

export default function TechnologyConsultancySubService() {
  const { slug } = useParams<{ slug: string }>()
  const service = subServiceData.find((s) => s.slug === slug)

  if (!service) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Service Not Found</h1>
          <Link to="/services/technology-consultancy" className="text-[#0050a9] hover:underline">&larr; Back to Technology Consultancy</Link>
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
              <Link to="/services/technology-consultancy" className="text-white/70 hover:text-white transition-colors">Services</Link>
              <span className="text-white/50">/</span>
              <Link to="/services/technology-consultancy" className="text-white/70 hover:text-white transition-colors">Technology Consultancy</Link>
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
              <a href="/contact" className="btn-primary">Discuss Your Project<ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" /></a>
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
              <p className="text-gray-600 text-lg leading-relaxed mb-8">Every engagement produces a comprehensive deliverable package  validated, documented, and ready for implementation.</p>
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
              <h3 className="text-2xl font-bold text-white mb-3">Interested in {service.category.split(' ').map(w => w.length <= 3 ? w : w.charAt(0) + w.slice(1).toLowerCase()).join(' ')}?</h3>
              <p className="text-white/70 text-base leading-relaxed mb-8">Get in touch with our technology consulting team to explore how we can help transform your operations.</p>
              <div className="space-y-4">
                <a href="/contact" className="flex items-center gap-4 bg-white/10 hover:bg-white/15 border border-white/10 rounded-xl p-5 transition-colors group">
                  <div className="w-12 h-12 bg-[#00d4ff]/20 rounded-xl flex items-center justify-center flex-shrink-0"><MapPin className="w-6 h-6 text-[#00d4ff]" /></div>
                  <div className="flex-1"><h4 className="text-white font-semibold">Get in Touch</h4><p className="text-white/60 text-sm">Discuss your technology needs</p></div>
                  <ArrowRight className="w-5 h-5 text-white/40 group-hover:text-white/80 transition-colors" />
                </a>
              
          
              </div>
            </div>
          </div>
        </div>
      </section>

      <RelatedSubServices
        items={subServiceData}
        basePath="/services/technology-consultancy"
        currentSlug={service.slug}
        parentName="Technology Consultancy"
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
