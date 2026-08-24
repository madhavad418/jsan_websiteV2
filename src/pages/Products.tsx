import { Link } from 'react-router-dom'
import { MapPin, Navigation, Users, Smartphone, Brain, WifiOff, Shapes, Radio, GitBranch, UserCheck, FileText, Wallet, BarChart3, Shield, Play, Rocket, Clock, RefreshCw, CheckCircle, GitCompare, Radar, Scale, FileSpreadsheet } from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import MobileNav from '../components/MobileNav'

const metrics = [
  { number: '4', label: 'Live Products', icon: Rocket },
  { number: '24/7', label: 'Support', icon: Clock },
  { number: '360°', label: 'Integration', icon: RefreshCw },
  { number: '99.9%', label: 'Uptime', icon: CheckCircle },
]

const liveProducts = [
  {
    name: 'JSAN VTS',
    slug: '/products/jsan-vts',
    category: 'Vehicle Tracking System',
    description: 'Complete internal fleet management solution featuring real-time tracking, driver management, and operational oversight across web and mobile platforms.',
    features: [
      { icon: Navigation, label: 'Real-Time GPS Tracking' },
      { icon: Users, label: 'Driver Management' },
      { icon: MapPin, label: 'Route Optimization' },
      { icon: Smartphone, label: 'Mobile App' },
    ],
    image: 'https://cdn.gamma.app/pjp21qvd87nwfgj/bf4a31e2f8764a5f8b2ca7783263e6d1/original/image.png',
    color: 'from-blue-600 to-cyan-500',
    hasDemo: true,
  },
  {
    name: 'JSAN POI Express',
    slug: '/products/poi-express',
    category: 'GIS Data Collection Platform',
    description: 'POI data collection with AI automation, enterprise-grade quality control, and offline-first mobile experience for field teams.',
    features: [
      { icon: Brain, label: 'AI POI Detection' },
      { icon: WifiOff, label: 'Offline-First' },
      { icon: Shapes, label: 'Smart Polygons' },
      { icon: Radio, label: 'Real-Time Tracking' },
    ],
    image: 'https://cdn.gamma.app/pjp21qvd87nwfgj/8dc2cf4febc04b9baebe7d1e2f69aee3/original/image.png',
    color: 'from-emerald-600 to-teal-500',
    hasDemo: false,
  },
  {
    name: 'JSAN Travel Desk',
    slug: '/products/travel-desk',
    category: 'Corporate Travel Management',
    description: 'Comprehensive travel management platform with role-based workflows, multi-stage approvals, and coordinated booking for corporate travel.',
    features: [
      { icon: GitBranch, label: 'Multi-Stage Approval' },
      { icon: UserCheck, label: 'Employee Management' },
      { icon: FileText, label: 'Quotation System' },
      { icon: Wallet, label: 'Budget Control' },
    ],
    image: 'https://cdn.gamma.app/pjp21qvd87nwfgj/7f046a46114b46b9a05b89092f0a3cd1/original/Screenshot_73.jpg',
    color: 'from-violet-600 to-purple-500',
    hasDemo: false,
  },
  {
    name: 'JSAN GeoDiscover',
    slug: '/products/geodiscover',
    category: 'Cross-Provider POI Discovery',
    description: 'Compares point-of-interest coverage across independent map providers and shows what each one is missing, with every finding backed by evidence  configured to your geography and categories.',
    features: [
      { icon: GitCompare, label: 'Dual-Provider Sweep' },
      { icon: Radar, label: 'Evidence Tiers' },
      { icon: Scale, label: 'Cost Guardrails' },
      { icon: FileSpreadsheet, label: 'Audited Workbook' },
    ],
    image: '/pillars/geo.png',
    color: 'from-sky-600 to-blue-500',
    hasDemo: false,
  },
]

const comingSoon = [
  {
    name: 'JSAN Analytics',
    status: 'Coming Soon',
    description: 'Business intelligence and analytics platform for data-driven decision making.',
    icon: BarChart3,
  },
  {
    name: 'JSAN SecureOps',
    status: 'In Development',
    description: 'Comprehensive cybersecurity monitoring and incident response platform.',
    icon: Shield,
  },
]

export default function Products() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-[550px] flex items-center overflow-hidden pt-28 lg:pt-32 pb-28 lg:pb-32" style={{ marginTop: '44px' }}>
        {/* Background with gradient and geometric shapes */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0050a9] via-[#0a1a3a] to-[#0050a9]">
          {/* Geometric shape overlay */}
          <div className="absolute right-0 top-0 w-2/3 h-full opacity-30">
            <svg viewBox="0 0 800 600" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
              <defs>
                <linearGradient id="prodGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00d4ff" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#0050a9" stopOpacity="0.1" />
                </linearGradient>
              </defs>
              <polygon points="500,0 800,150 800,450 500,600 300,450 300,150" fill="url(#prodGrad)" />
              <polygon points="550,50 750,170 750,430 550,550 380,430 380,170" fill="none" stroke="#00d4ff" strokeWidth="1" opacity="0.5" />
              <polygon points="600,100 700,190 700,410 600,500 460,410 460,190" fill="none" stroke="#00d4ff" strokeWidth="1" opacity="0.3" />
            </svg>
          </div>
        </div>

        {/* Sub-header bar */}
        <div className="absolute top-0 left-0 right-0 bg-black/20 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
            <span className="text-white/90 font-medium">Our Products</span>
            <a href="/contact" className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/30 text-white px-4 py-2 rounded transition-colors">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              Contact
            </a>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-6 relative z-10 pt-16">
          <div className="max-w-2xl">
            <h1 className="text-white text-[42px] lg:text-[56px] font-bold leading-[1.1] mb-6">
              Innovative software solutions
            </h1>
            <p className="text-white/80 text-xl leading-relaxed">
              We build products that solve real business challenges. Our solutions are designed with scalability, security, and user experience in mind.
            </p>
          </div>
        </div>
      </section>

      {/* Metrics Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {metrics.map((metric, index) => (
              <div key={index} className="bg-[#e8f4fc] p-8 text-center">
                <metric.icon className="w-8 h-8 mx-auto mb-4 text-[#0050a9]" />
                <div className="text-[48px] lg:text-[56px] font-bold text-[#0050a9] leading-none mb-2">
                  {metric.number}
                </div>
                <div className="text-[#0050a9] text-lg font-medium">{metric.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Live Products Section */}
      <section className="py-20 bg-[#0050a9]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="inline-flex items-center gap-2 bg-[#1b497b]/30 text-[#7db8e8] px-3 py-1 rounded-full text-sm font-semibold">
              <span className="w-2 h-2 bg-[#7db8e8] rounded-full animate-pulse"></span>
              LIVE
            </span>
          </div>
          <h2 className="text-[36px] lg:text-[42px] font-bold text-white mb-4">Our Products</h2>
          <p className="text-white/80 text-xl mb-12 max-w-3xl">
            Enterprise-grade solutions built to transform how you operate, manage, and grow your business.
          </p>

          <div className="space-y-8">
            {liveProducts.map((product, index) => (
              <div key={index} className="bg-white rounded-lg overflow-hidden">
                <div className="grid lg:grid-cols-2">
                  {/* Image */}
                  <div className={`h-72 lg:h-auto relative overflow-hidden bg-gray-100 flex items-center justify-center ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-contain p-4"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-8 lg:p-12">
                    <span className="text-[#0050a9] text-sm font-bold uppercase tracking-wider">{product.category}</span>
                    <h3 className="text-[#0050a9] text-2xl lg:text-3xl font-bold mt-2 mb-4">{product.name}</h3>
                    <p className="text-gray-600 text-lg leading-relaxed mb-6">{product.description}</p>

                    {/* Features Grid */}
                    <div className="grid grid-cols-2 gap-4 mb-8">
                      {product.features.map((feature, fIndex) => (
                        <div key={fIndex} className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-[#e8f4fc] flex items-center justify-center">
                            <feature.icon className="w-5 h-5 text-[#0050a9]" />
                          </div>
                          <span className="text-[#0050a9] font-medium text-sm">{feature.label}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-4">
                      <Link to={product.slug} className="btn-link text-[#0050a9]">
                        Learn More
                        <Play className="w-4 h-4" />
                      </Link>
                      {product.hasDemo && (
                        <Link to={product.slug} className="btn-link text-[#0050a9]">
                          View Demo
                          <Play className="w-4 h-4" />
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Coming Soon Section */}
      <section className="py-20 bg-gradient-to-br from-[#0050a9] to-[#03013d]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 bg-amber-500/20 text-amber-300 px-3 py-1 rounded-full text-sm font-semibold mb-4">
              <Rocket className="w-4 h-4" />
              IN THE PIPELINE
            </span>
            <h2 className="text-[36px] lg:text-[42px] font-bold text-white mb-4">Coming Soon</h2>
            <p className="text-white/80 text-xl max-w-2xl mx-auto">
              We're constantly innovating. Here's a glimpse of what's next.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {comingSoon.map((product, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-8 hover:bg-white/15 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#00d4ff] to-[#0050a9] flex items-center justify-center flex-shrink-0">
                    <product.icon className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-white text-xl font-bold">{product.name}</h3>
                      <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                        product.status === 'Coming Soon'
                          ? 'bg-amber-500/20 text-amber-300'
                          : 'bg-blue-500/20 text-blue-300'
                      }`}>
                        {product.status}
                      </span>
                    </div>
                    <p className="text-white/70 leading-relaxed">{product.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-[36px] lg:text-[42px] font-bold text-[#0050a9] mb-6">
                Ready to transform your operations?
              </h2>
              <p className="text-gray-600 text-xl leading-relaxed mb-8">
                Schedule a consultation with our team to discover how our products can drive efficiency, reduce costs, and accelerate your digital transformation.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="/contact" className="btn-primary">
                  Schedule a Consultation
                  <Play className="w-4 h-4" />
                </a>
                <a href="/#services" className="inline-flex items-center gap-2 px-6 py-3 border border-[#0050a9] text-[#0050a9] font-semibold hover:bg-[#0050a9] hover:text-white transition-colors">
                  View All Services
                  <Play className="w-4 h-4" />
                </a>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square max-w-md mx-auto bg-gradient-to-br from-[#e8f4fc] to-[#d0e8f7] rounded-2xl flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-[#0050a9] to-[#00d4ff] rounded-2xl flex items-center justify-center">
                    <Rocket className="w-12 h-12 text-white" />
                  </div>
                  <p className="text-[#0050a9] text-2xl font-bold">Let's Build Together</p>
                  <p className="text-gray-600 mt-2">Your vision, our expertise</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <MobileNav />
    </div>
  )
}
