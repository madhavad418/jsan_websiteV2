import { Link } from 'react-router-dom'
import {
  Landmark,
  ArrowRight,
  Play,
  CheckCircle,
  Shield,
  Zap,
  Globe,
  Users,
  Target,
  Lock,
  TrendingUp,
  FileCheck
} from 'lucide-react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import MobileNav from '../../components/MobileNav'

const challenges = [
  {
    icon: Shield,
    title: 'Regulatory Compliance',
    description: 'Navigating complex and evolving regulatory requirements across multiple jurisdictions while maintaining operational efficiency.'
  },
  {
    icon: Lock,
    title: 'Cybersecurity Threats',
    description: 'Protecting sensitive financial data and customer information from increasingly sophisticated cyber attacks.'
  },
  {
    icon: TrendingUp,
    title: 'Digital Transformation',
    description: 'Modernizing legacy systems while ensuring business continuity and maintaining customer trust.'
  },
  {
    icon: FileCheck,
    title: 'Risk Management',
    description: 'Identifying, assessing, and mitigating financial risks in real-time across complex operations.'
  }
]

const solutions = [
  {
    title: 'Risk Analytics Platform',
    description: 'Advanced risk management solution with real-time monitoring, predictive analytics, and automated reporting for comprehensive risk oversight.',
    features: ['Credit Risk Scoring', 'Market Risk Analysis', 'Operational Risk', 'Real-time Alerts']
  },
  {
    title: 'Compliance Management System',
    description: 'Automated compliance tracking and reporting platform ensuring adherence to regulatory requirements across all operations.',
    features: ['Regulatory Tracking', 'Automated Reporting', 'Audit Trail', 'Policy Management']
  },
  {
    title: 'Claims Processing Solution',
    description: 'Streamlined claims management system with AI-powered fraud detection and accelerated processing workflows.',
    features: ['Automated Processing', 'Fraud Detection', 'Customer Portal', 'Analytics Dashboard']
  }
]

const metrics = [
  { value: '25+', label: 'Financial Clients', description: 'Banks & insurers served' },
  { value: '50%', label: 'Processing Time', description: 'Reduction achieved' },
  { value: '99.9%', label: 'System Uptime', description: 'Mission-critical reliability' },
  { value: '30%', label: 'Cost Reduction', description: 'Operational savings' }
]

const caseStudy = {
  title: 'Regional Insurance Provider',
  description: 'A leading insurance company transformed their claims processing and risk management operations with our integrated financial technology solutions.',
  results: [
    { metric: '60%', label: 'Faster Claims Processing' },
    { metric: '40%', label: 'Reduction in Fraud' },
    { metric: '35%', label: 'Cost Savings' },
    { metric: '95%', label: 'Customer Satisfaction' }
  ]
}

export default function FinancialServices() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-[650px] flex items-center overflow-hidden pt-28 lg:pt-32 pb-28 lg:pb-32" style={{ marginTop: '44px' }}>
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1920&h=1080&fit=crop"
            alt="Financial Services"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0050a9]/95 via-[#0050a9]/85 to-transparent"></div>
        </div>

        {/* Sub-header */}
        <div className="absolute top-0 left-0 right-0 bg-black/20 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link to="/industries" className="text-white/70 hover:text-white transition-colors">Industries</Link>
              <span className="text-white/50">/</span>
              <span className="text-white/90 font-medium">Financial Services</span>
            </div>
            <span className="inline-flex items-center gap-2 bg-cyan-400/20 text-cyan-300 px-3 py-1 rounded-full text-sm font-semibold">
              <Landmark className="w-4 h-4" />
              INDUSTRY VERTICAL
            </span>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 bg-cyan-400/20 backdrop-blur border border-cyan-400/30 text-cyan-300 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <Landmark className="w-4 h-4" />
              FINANCIAL & INSURANCE SERVICES
            </span>
            <h1 className="text-white text-[42px] lg:text-[60px] font-bold leading-[1.05] mb-6">
              Secure Financial Innovation
            </h1>
            <p className="text-white/80 text-xl lg:text-2xl leading-relaxed mb-10">
              Digital transformation solutions for financial institutions with a focus on risk management, compliance, and customer experience.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/contact" className="inline-flex items-center gap-3 bg-white text-[#0050a9] hover:bg-gray-100 px-8 py-4 font-semibold rounded-lg transition-all hover:gap-4">
                Discuss a Program
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/services" className="inline-flex items-center gap-3 border-2 border-white/40 hover:bg-white/10 text-white px-8 py-4 font-semibold rounded-lg transition-colors">
                View Our Services
                <Play className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Metrics */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {metrics.map((metric, index) => (
              <div key={index} className="relative bg-gradient-to-br from-[#e8f4fc] to-white p-8 rounded-2xl text-center border border-[#e8f4fc] hover:shadow-xl transition-shadow group overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#0050a9] to-cyan-400"></div>
                <div className="text-[42px] lg:text-[48px] font-bold bg-gradient-to-r from-[#0050a9] to-[#1b497b] bg-clip-text text-transparent leading-none mb-2">
                  {metric.value}
                </div>
                <div className="text-[#0050a9] text-lg font-medium mb-1">{metric.label}</div>
                <div className="text-gray-500 text-sm">{metric.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industry Overview */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-flex items-center gap-2 bg-[#0050a9]/10 text-[#0050a9] px-4 py-2 rounded-full text-sm font-semibold mb-4">
                <Globe className="w-4 h-4" />
                INDUSTRY OVERVIEW
              </span>
              <h2 className="text-[36px] lg:text-[48px] font-bold text-[#0050a9] mb-6 leading-tight">
                Driving FinTech Innovation
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Financial services are being transformed by digital innovation, changing customer expectations, and evolving regulatory landscapes. Organizations must balance innovation with security and compliance.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                JSAN brings specialized expertise in financial technology, helping banks, insurers, and financial institutions modernize operations while managing risk and maintaining regulatory compliance.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {['Risk Management', 'Regulatory Compliance', 'Claims Processing', 'Customer Analytics'].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-[#0050a9] flex-shrink-0" />
                    <span className="text-[#0050a9] font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=600&fit=crop"
                alt="Financial Technology"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-[#0050a9] rounded-xl p-6 shadow-xl">
                <Shield className="w-8 h-8 text-white mb-2" />
                <div className="text-white/80 text-sm">Secure & Compliant</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Challenges */}
      <section className="py-20 bg-[#0050a9]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 bg-cyan-400/20 text-cyan-400 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <Target className="w-4 h-4" />
              KEY CHALLENGES
            </span>
            <h2 className="text-[36px] lg:text-[48px] font-bold text-white mb-4">
              Industry Challenges We Solve
            </h2>
            <p className="text-white/70 text-xl max-w-3xl mx-auto">
              Addressing the critical challenges facing modern financial institutions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {challenges.map((challenge, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-colors border border-white/10">
                <div className="w-14 h-14 bg-gradient-to-br from-cyan-400 to-[#0050a9] rounded-xl flex items-center justify-center mb-4">
                  <challenge.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-white text-xl font-bold mb-3">{challenge.title}</h3>
                <p className="text-white/70 leading-relaxed">{challenge.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Solutions */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 bg-[#0050a9]/10 text-[#0050a9] px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <Zap className="w-4 h-4" />
              OUR SOLUTIONS
            </span>
            <h2 className="text-[36px] lg:text-[48px] font-bold text-[#0050a9] mb-4">
              Financial Technology Solutions
            </h2>
            <p className="text-gray-600 text-xl max-w-3xl mx-auto">
              Purpose-built solutions for banking, insurance, and financial services.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {solutions.map((solution, index) => (
              <div key={index} className="bg-gray-50 rounded-2xl p-8 hover:shadow-xl transition-shadow">
                <h3 className="text-2xl font-bold text-[#0050a9] mb-4">{solution.title}</h3>
                <p className="text-gray-600 leading-relaxed mb-6">{solution.description}</p>
                <div className="space-y-3">
                  {solution.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-[#0050a9] flex-shrink-0" />
                      <span className="text-[#0050a9]">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Study */}
      <section className="py-20 bg-gradient-to-br from-[#0050a9] to-[#0050a9]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-flex items-center gap-2 bg-white/20 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
                <Users className="w-4 h-4" />
                SUCCESS STORY
              </span>
              <h2 className="text-[36px] lg:text-[48px] font-bold text-white mb-6 leading-tight">
                {caseStudy.title}
              </h2>
              <p className="text-white/80 text-lg leading-relaxed mb-8">
                {caseStudy.description}
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-3 bg-white text-[#0050a9] hover:bg-gray-100 px-8 py-4 font-semibold rounded-lg transition-all hover:gap-4"
              >
                Discuss Your Project
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {caseStudy.results.map((result, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20">
                  <div className="text-4xl font-bold text-cyan-400 mb-2">{result.metric}</div>
                  <div className="text-white/80">{result.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-[#e8f4fc] to-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-[36px] lg:text-[48px] font-bold text-[#0050a9] mb-6">
            Ready to Transform Your Financial Operations?
          </h2>
          <p className="text-gray-600 text-xl mb-10 max-w-2xl mx-auto">
            Partner with JSAN to modernize your financial services with secure, compliant, and innovative technology solutions.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 bg-[#0050a9] text-white hover:bg-[#1b497b] px-8 py-4 font-semibold rounded-lg transition-all hover:gap-4"
            >
              Schedule a Consultation
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/industries"
              className="inline-flex items-center gap-3 border-2 border-[#0050a9] text-[#0050a9] hover:bg-[#0050a9] hover:text-white px-8 py-4 font-semibold rounded-lg transition-colors"
            >
              View All Industries
              <Play className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
      <MobileNav />
    </div>
  )
}
