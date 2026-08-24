import { Link } from 'react-router-dom'
import {
  Zap,
  ArrowRight,
  Play,
  CheckCircle,
  Shield,
  Users,
  Globe,
  Target,
  Leaf,
  BarChart3,
  Settings,
  Battery
} from 'lucide-react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import MobileNav from '../../components/MobileNav'

const challenges = [
  {
    icon: Settings,
    title: 'Aging Infrastructure',
    description: 'Maintaining and modernizing aging power grids and distribution networks while ensuring reliable service delivery.'
  },
  {
    icon: Leaf,
    title: 'Sustainability Goals',
    description: 'Transitioning to renewable energy sources and meeting ambitious carbon reduction targets.'
  },
  {
    icon: BarChart3,
    title: 'Demand Management',
    description: 'Balancing fluctuating energy demand with generation capacity while optimizing costs.'
  },
  {
    icon: Shield,
    title: 'Grid Security',
    description: 'Protecting critical energy infrastructure from cyber threats and physical vulnerabilities.'
  }
]

const solutions = [
  {
    title: 'Smart Grid Solutions',
    description: 'Intelligent grid management platform enabling real-time monitoring, automated fault detection, and optimized power distribution.',
    features: ['Grid Monitoring', 'Fault Detection', 'Load Balancing', 'Outage Management']
  },
  {
    title: 'Asset Lifecycle Management',
    description: 'Comprehensive asset management solution for tracking, maintaining, and optimizing energy infrastructure throughout its lifecycle.',
    features: ['Asset Tracking', 'Predictive Maintenance', 'Performance Analytics', 'Compliance Management']
  },
  {
    title: 'Renewable Energy Integration',
    description: 'Solutions for integrating solar, wind, and other renewable sources into existing energy infrastructure.',
    features: ['Solar Integration', 'Wind Management', 'Energy Storage', 'Grid Optimization']
  }
]

const caseStudy = {
  title: 'Regional Power Utility',
  description: 'A major utility company serving 2 million customers implemented our smart grid and asset management solutions to transform their operations.',
  results: [
    { metric: '45%', label: 'Outage Reduction' },
    { metric: '30%', label: 'Maintenance Cost Savings' },
    { metric: '25%', label: 'Energy Loss Reduction' },
    { metric: '99.9%', label: 'Grid Reliability' }
  ]
}

export default function Energy() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-[650px] flex items-center overflow-hidden pt-28 lg:pt-32 pb-28 lg:pb-32" style={{ marginTop: '44px' }}>
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1920&h=1080&fit=crop"
            alt="Energy and Utilities"
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
              <span className="text-white/90 font-medium">Energy & Utilities</span>
            </div>
            <span className="inline-flex items-center gap-2 bg-amber-400/20 text-amber-300 px-3 py-1 rounded-full text-sm font-semibold">
              <Zap className="w-4 h-4" />
              INDUSTRY VERTICAL
            </span>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 bg-amber-400/20 backdrop-blur border border-amber-400/30 text-amber-300 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <Zap className="w-4 h-4" />
              ENERGY & UTILITIES
            </span>
            <h1 className="text-white text-[42px] lg:text-[60px] font-bold leading-[1.05] mb-6">
              Powering the Energy Transition
            </h1>
            <p className="text-white/80 text-xl lg:text-2xl leading-relaxed mb-10">
              Smart grid solutions, asset management, and sustainability technology helping energy companies navigate the transition to a cleaner future.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/contact" className="inline-flex items-center gap-3 bg-amber-400 text-[#0050a9] hover:bg-amber-300 px-8 py-4 font-semibold rounded-lg transition-all hover:gap-4">
                Discuss an Energy Program
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
                Enabling the Energy Revolution
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                The energy sector is undergoing its biggest transformation in a century. From renewable integration to smart grid deployment, utilities must modernize while maintaining reliable, affordable service.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                JSAN brings deep expertise in energy technology, helping utilities and energy companies navigate this transition with smart grid solutions, asset management, and operational optimization.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {['Smart Grid Solutions', 'Asset Management', 'Sustainability Tech', 'Operational Excellence'].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-[#0050a9] flex-shrink-0" />
                    <span className="text-[#0050a9] font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&h=600&fit=crop"
                alt="Renewable Energy"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-amber-400 rounded-xl p-6 shadow-xl">
                <Battery className="w-8 h-8 text-[#0050a9] mb-2" />
                <div className="text-[#0050a9]/80 text-sm font-medium">Clean Energy</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Challenges */}
      <section className="py-20 bg-[#0050a9]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 bg-amber-400/20 text-amber-400 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <Target className="w-4 h-4" />
              KEY CHALLENGES
            </span>
            <h2 className="text-[36px] lg:text-[48px] font-bold text-white mb-4">
              Industry Challenges We Solve
            </h2>
            <p className="text-white/70 text-xl max-w-3xl mx-auto">
              Addressing the critical challenges facing the energy and utilities sector.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {challenges.map((challenge, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-colors border border-white/10">
                <div className="w-14 h-14 bg-gradient-to-br from-amber-400 to-[#0050a9] rounded-xl flex items-center justify-center mb-4">
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
              Energy Technology Solutions
            </h2>
            <p className="text-gray-600 text-xl max-w-3xl mx-auto">
              Purpose-built solutions for utilities and energy companies.
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
                className="inline-flex items-center gap-3 bg-amber-400 text-[#0050a9] hover:bg-amber-300 px-8 py-4 font-semibold rounded-lg transition-all hover:gap-4"
              >
                Discuss Your Project
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {caseStudy.results.map((result, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20">
                  <div className="text-4xl font-bold text-amber-400 mb-2">{result.metric}</div>
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
            Ready to Power Your Energy Transformation?
          </h2>
          <p className="text-gray-600 text-xl mb-10 max-w-2xl mx-auto">
            Partner with JSAN to modernize your energy infrastructure and navigate the transition to a sustainable future.
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
