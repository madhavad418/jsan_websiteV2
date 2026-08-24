import { Link } from 'react-router-dom'
import {
  ShoppingCart,
  ArrowRight,
  Play,
  CheckCircle,
  Users,
  Zap,
  Globe,
  Target,
  BarChart3,
  Package,
  Smartphone,
  TrendingUp
} from 'lucide-react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import MobileNav from '../../components/MobileNav'

const challenges = [
  {
    icon: Users,
    title: 'Customer Experience',
    description: 'Meeting rising customer expectations for coordinated, personalized shopping experiences across all channels.'
  },
  {
    icon: Package,
    title: 'Inventory Management',
    description: 'Optimizing inventory levels to reduce costs while ensuring product availability and minimizing stockouts.'
  },
  {
    icon: Smartphone,
    title: 'Omnichannel Integration',
    description: 'Unifying online and offline channels to provide consistent customer experiences and operations.'
  },
  {
    icon: BarChart3,
    title: 'Data-Driven Decisions',
    description: 'Leveraging customer and operational data to make informed business decisions and predict trends.'
  }
]

const solutions = [
  {
    title: 'Consumer Analytics Platform',
    description: 'Advanced analytics solution providing deep insights into customer behavior, preferences, and purchasing patterns.',
    features: ['Customer Segmentation', 'Purchase Analysis', 'Churn Prediction', 'Lifetime Value']
  },
  {
    title: 'Omnichannel Commerce Suite',
    description: 'Unified platform connecting online and physical retail operations for coordinated customer experiences.',
    features: ['Unified Inventory', 'Order Management', 'Click & Collect', 'Customer Profiles']
  },
  {
    title: 'Inventory Optimization',
    description: 'AI-powered inventory management system for demand forecasting, replenishment, and warehouse optimization.',
    features: ['Demand Forecasting', 'Auto-Replenishment', 'Stock Optimization', 'Supplier Management']
  }
]

const metrics = [
  { value: '30+', label: 'Retail Clients', description: 'Brands served' },
  { value: '25%', label: 'Sales Increase', description: 'Average uplift' },
  { value: '35%', label: 'Inventory Reduction', description: 'Carrying costs' },
  { value: '40%', label: 'Customer Retention', description: 'Improvement' }
]

const caseStudy = {
  title: 'National Retail Chain',
  description: 'A major retail chain with 200+ stores implemented our omnichannel and analytics solutions to transform their customer experience and operations.',
  results: [
    { metric: '30%', label: 'Online Sales Growth' },
    { metric: '45%', label: 'Customer Engagement' },
    { metric: '25%', label: 'Inventory Cost Reduction' },
    { metric: '20%', label: 'Conversion Rate Increase' }
  ]
}

export default function Retail() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-[650px] flex items-center overflow-hidden pt-28 lg:pt-32 pb-28 lg:pb-32" style={{ marginTop: '44px' }}>
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&h=1080&fit=crop"
            alt="Retail and E-commerce"
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
              <span className="text-white/90 font-medium">Retail & E-commerce</span>
            </div>
            <span className="inline-flex items-center gap-2 bg-cyan-400/20 text-cyan-300 px-3 py-1 rounded-full text-sm font-semibold">
              <ShoppingCart className="w-4 h-4" />
              INDUSTRY VERTICAL
            </span>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 bg-cyan-400/20 backdrop-blur border border-cyan-400/30 text-cyan-300 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <ShoppingCart className="w-4 h-4" />
              RETAIL & E-COMMERCE
            </span>
            <h1 className="text-white text-[42px] lg:text-[60px] font-bold leading-[1.05] mb-6">
              Reimagine Retail Excellence
            </h1>
            <p className="text-white/80 text-xl lg:text-2xl leading-relaxed mb-10">
              Omnichannel solutions, consumer analytics, and inventory optimization that help retailers deliver exceptional customer experiences and drive growth.
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
                The Future of Retail is Data-Driven
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Retail is evolving rapidly with changing consumer expectations, the rise of e-commerce, and the need for coordinated omnichannel experiences. Success requires deep customer understanding and operational agility.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                JSAN helps retailers leverage data analytics, optimize operations, and create personalized customer experiences that drive loyalty and growth.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {['Consumer Analytics', 'E-Commerce Platforms', 'Inventory Management', 'Personalization'].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-[#0050a9] flex-shrink-0" />
                    <span className="text-[#0050a9] font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop"
                alt="Retail Technology"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-[#0050a9] rounded-xl p-6 shadow-xl">
                <TrendingUp className="w-8 h-8 text-white mb-2" />
                <div className="text-white/80 text-sm">Growth Focused</div>
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
              Addressing the critical challenges facing modern retailers.
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
              Retail Technology Solutions
            </h2>
            <p className="text-gray-600 text-xl max-w-3xl mx-auto">
              Purpose-built solutions for modern retail operations.
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
            Ready to Transform Your Retail Operations?
          </h2>
          <p className="text-gray-600 text-xl mb-10 max-w-2xl mx-auto">
            Partner with JSAN to create exceptional customer experiences and drive sustainable retail growth.
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
