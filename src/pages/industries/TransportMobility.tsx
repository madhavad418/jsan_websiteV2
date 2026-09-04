import { Link } from 'react-router-dom'
import {
  Truck,
  ArrowRight,
  Play,
  CheckCircle,
  MapPin,
  Clock,
  BarChart3,
  Shield,
  Zap,
  Globe,
  Users,
  Target
} from 'lucide-react'
import { allocationStats, industrySplit } from '../../config/countAllocations'
import HeroBackdrop from '../../components/HeroBackdrop'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import MobileNav from '../../components/MobileNav'

const challenges = [
  {
    icon: MapPin,
    title: 'Route Optimization',
    description: 'Complex logistics networks requiring real-time route planning and dynamic adjustments based on traffic, weather, and delivery windows.'
  },
  {
    icon: Clock,
    title: 'Real-time Visibility',
    description: 'Lack of end-to-end visibility across the supply chain leading to inefficiencies and customer dissatisfaction.'
  },
  {
    icon: BarChart3,
    title: 'Fleet Utilization',
    description: 'Underutilized assets and inefficient fleet management resulting in increased operational costs.'
  },
  {
    icon: Shield,
    title: 'Safety & Compliance',
    description: 'Meeting stringent safety regulations and maintaining compliance across multiple jurisdictions.'
  }
]

const solutions = [
  {
    title: 'JSAN Vehicle Tracking System',
    description: 'Real-time GPS tracking with advanced analytics for fleet optimization, driver behavior monitoring, and predictive maintenance.',
    features: ['Live GPS Tracking', 'Driver Behavior Analytics', 'Fuel Management', 'Maintenance Alerts']
  },
  {
    title: 'Route Optimization Platform',
    description: 'AI-powered route planning that considers traffic patterns, delivery windows, and vehicle capacity for maximum efficiency.',
    features: ['Dynamic Routing', 'Traffic Integration', 'Multi-stop Optimization', 'ETA Predictions']
  },
  {
    title: 'Mobility Analytics Suite',
    description: 'Comprehensive analytics platform providing insights into fleet performance, cost analysis, and operational KPIs.',
    features: ['Performance Dashboards', 'Cost Analysis', 'Trend Reporting', 'Custom KPIs']
  }
]

const caseStudy = {
  title: 'National Logistics Provider',
  description: 'A leading logistics company with 500+ vehicles transformed their operations with our integrated transport management solution.',
  results: [
    { metric: '35%', label: 'Fuel Cost Reduction' },
    { metric: '40%', label: 'Improved On-time Delivery' },
    { metric: '50%', label: 'Reduced Idle Time' },
    { metric: '20%', label: 'Fleet Utilization Increase' }
  ]
}

export default function TransportMobility() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-[500px] sm:min-h-[560px] lg:min-h-[650px] flex items-center overflow-hidden pt-24 sm:pt-28 lg:pt-32 pb-16 sm:pb-20 lg:pb-32" style={{ marginTop: '44px' }}>
        {/* top-[77px] clears the fixed header, which the section otherwise slides under.
            Same directional navy scrim as the technology, work and journey heroes: opaque
            under the copy, clearing over the half of the photograph that carries it. */}
        <HeroBackdrop
          image="https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=1920&h=1080&fit=crop"
          imageAlt="Transport and mobility infrastructure"
        />

        {/* Sub-header */}
        <div className="absolute top-0 left-0 right-0 bg-black/20 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link to="/industries" className="text-white/70 hover:text-white transition-colors">Industries</Link>
              <span className="text-white/50">/</span>
              <span className="text-white/90 font-medium">Transport & Mobility</span>
            </div>
            <span className="inline-flex items-center gap-2 bg-cyan-400/20 text-cyan-300 px-3 py-1 rounded-full text-sm font-semibold">
              <Truck className="w-4 h-4" />
              INDUSTRY VERTICAL
            </span>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          {/* Held to the scrimmed half so the copy never runs onto the bright side */}
          <div className="max-w-3xl lg:w-[52%] lg:max-w-none lg:pr-8">
            <span className="inline-flex items-center gap-2 bg-cyan-400/20 backdrop-blur border border-cyan-400/30 text-cyan-300 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <Truck className="w-4 h-4" />
              NAVIGATION, TRANSPORT & MOBILITY
            </span>
            <h1 className="text-white text-[27px] sm:text-[34px] lg:text-[60px] font-bold leading-[1.12] sm:leading-[1.05] mb-5 sm:mb-6">
              Powering the Future of Transportation
            </h1>
            <p className="text-white/80 text-[15px] sm:text-lg lg:text-2xl leading-relaxed mb-8 sm:mb-10">
              End-to-end solutions for fleet management, route optimization, real-time tracking, and mobility intelligence that drive operational excellence.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/contact" className="inline-flex items-center gap-3 bg-white text-[#0050a9] hover:bg-gray-100 px-8 py-4 font-semibold rounded-lg transition-all hover:gap-4">
                Discuss a Transport Program
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/products" className="inline-flex items-center gap-3 border-2 border-white/40 hover:bg-white/10 text-white px-8 py-4 font-semibold rounded-lg transition-colors">
                See Our Platforms
                <Play className="w-5 h-5" />
              </Link>
            </div>
            <div className="mt-10 flex flex-wrap gap-x-10 gap-y-6 border-t border-white/20 pt-8">
              {allocationStats(industrySplit, 'transportation-infrastructure').map((stat) => (
                <div key={stat.label}>
                  <div className="text-white text-3xl lg:text-4xl font-bold">{stat.value}</div>
                  <div className="text-white/60 text-sm mt-1">{stat.label}</div>
                </div>
              ))}
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
                Transforming Transportation with Technology
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                The transportation and mobility sector is undergoing a digital revolution. From autonomous vehicles to smart logistics, technology is reshaping how goods and people move around the world.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                JSAN brings 7+ years of expertise in geospatial technology and fleet management to help transportation companies navigate this transformation and achieve operational excellence.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {['Fleet Management', 'Route Optimization', 'Real-time Tracking', 'Logistics Intelligence'].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-[#0050a9] flex-shrink-0" />
                    <span className="text-[#0050a9] font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&h=600&fit=crop"
                alt="Transportation Technology"
                className="rounded-2xl shadow-2xl"
              />
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
              Understanding the unique obstacles facing transportation companies today.
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
              Comprehensive Transport Solutions
            </h2>
            <p className="text-gray-600 text-xl max-w-3xl mx-auto">
              Purpose-built solutions designed for the unique needs of the transport industry.
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
            Ready to Transform Your Fleet Operations?
          </h2>
          <p className="text-gray-600 text-xl mb-10 max-w-2xl mx-auto">
            Partner with JSAN to unlock the full potential of your transportation operations with engineered technology solutions.
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
