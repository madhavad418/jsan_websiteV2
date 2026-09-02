import { Link } from 'react-router-dom'
import { ArrowRight, Play } from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import MobileNav from '../components/MobileNav'

const products = [
  {
    name: 'JSAN ATLAS Ops',
    label: 'Autonomous Tracking & Coverage Intelligence',
    status: 'FLAGSHIP',
    description:
      'Tracking that starts itself, keeps working with no signal, and reports progress against the road network a client contracted for rather than against kilometres travelled. Every road counts once, however many crews pass down it.',
    image: '/pillars/live_tracking.png',
    features: ['Automatic Trip Capture', 'Coverage Reporting', 'Verified Distance', 'Works Offline'],
    learnMoreUrl: '/products/fleet-intelligence',
  },
  {
    name: 'JSAN VTS',
    label: 'Vehicle Tracking System',
    status: 'LIVE',
    description: 'Complete internal fleet management solution featuring real-time tracking, driver management, and operational oversight across web and mobile platforms.',
    image: '/pillars/vts.png',
    features: ['Real-Time GPS Tracking', 'Driver Management', 'Route Optimization', 'Mobile App'],
    learnMoreUrl: '/products/jsan-vts',
    demoUrl: 'https://jsan-vts.vercel.app/',
  },
  {
    name: 'JSAN POI Express',
    label: 'GIS Data Collection Platform',
    status: 'LIVE',
    description: 'POI data collection with AI automation, enterprise-grade quality control, and offline-first mobile experience for field teams.',
    image: '/pillars/poi_ex.png',
        features: ['AI POI Detection', 'Offline-First', 'Smart Polygons', 'Real-Time Tracking'],
    learnMoreUrl: '/products/poi-express',
  },
  {
    name: 'JSAN Travel Desk',
    label: 'Corporate Travel Management',
    status: 'LIVE',
    description: 'Comprehensive travel management platform with role-based workflows, multi-stage approvals, and coordinated booking for corporate travel.',
    image: '/pillars/travelDesk.png',
    features: ['Multi-Stage Approval', 'Employee Management', 'Quotation System', 'Budget Control'],
    learnMoreUrl: '/products/travel-desk',
  },
  {
    name: 'JSAN GeoDiscover',
    label: 'Cross-Provider POI Discovery',
    status: 'LIVE',
    description: 'Compares point-of-interest coverage across independent map providers and shows what each one is missing, with every finding backed by evidence  configured to your geography and categories.',
    image: '/pillars/geodiscover.png',
    features: ['Dual-Provider Sweep', 'Evidence Tiers', 'Cost Guardrails', 'Audited Workbook'],
    learnMoreUrl: '/products/geodiscover',
  },
]

export default function InHouseApps() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden pt-28 lg:pt-36 pb-20 lg:pb-28" style={{ marginTop: '44px' }}>
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1600&auto=format&fit=crop"
            alt="In-House Apps"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(10,26,58,0.92) 0%, rgba(1,47,98,0.88) 40%, rgba(0,85,180,0.82) 100%)' }} />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <span className="inline-block text-[#00d4ff] font-bold text-sm uppercase tracking-widest mb-4">Our Products</span>
          <h1 className="text-white text-[36px] md:text-[48px] lg:text-[56px] font-bold leading-[1.1] mb-6 tracking-tight">
            Built In-House.<br />Proven in Production.
          </h1>
          <p className="text-white/80 text-lg md:text-xl lg:text-2xl leading-relaxed mb-10 max-w-3xl">
            Real-world applications developed, deployed, and operated by our team  powering enterprises across the globe.
          </p>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 max-w-2xl">
            {[
              { value: '5', label: 'Live Products' },
              { value: '500+', label: 'Active Users' },
              { value: '25+', label: 'Countries' },
            ].map((stat, i) => (
              <div key={i} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center border border-white/10">
                <div className="text-2xl lg:text-3xl font-bold text-white">{stat.value}</div>
                <div className="text-white text-sm mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="inline-block text-[#0050a9] font-bold text-sm uppercase tracking-widest mb-3">Product Suite</span>
            <h2 className="text-[36px] lg:text-[42px] font-bold mb-4 text-gradient">
              Enterprise Applications
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Each product is built from the ground up by our engineering team, battle-tested in production, and continuously improved.
            </p>
          </div>

          <div className="space-y-8">
            {products.map((product, i) => (
              <div
                key={i}
                className="flex flex-col lg:flex-row rounded-2xl overflow-hidden border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-500 group bg-white"
              >
                {/* Image */}
                <div className="relative w-full lg:w-5/12 min-h-[280px] overflow-hidden flex-shrink-0 bg-gray-50 flex items-center justify-center p-6">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-auto max-h-[300px] object-contain group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center gap-1.5 bg-green-500 text-white text-xs font-bold px-3 py-1.5 rounded-full">
                      <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                      {product.status}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="w-full lg:w-7/12 p-7 lg:p-10 flex flex-col justify-center">
                  <span className="text-[#0050a9] text-xs font-bold uppercase tracking-widest mb-1">{product.label}</span>
                  <h3 className="text-2xl lg:text-[28px] font-bold text-gray-900 mb-3 group-hover:text-[#0050a9] transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 text-base leading-relaxed mb-5">
                    {product.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {product.features.map((f, j) => (
                      <span key={j} className="bg-blue-50 text-[#0050a9] text-xs px-3 py-1.5 rounded-full border border-blue-100 font-medium">
                        {f}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <Link
                      to={product.learnMoreUrl}
                      className="inline-flex items-center gap-2 px-6 py-2.5 text-white font-semibold text-sm rounded-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_26px_-10px_rgba(0,80,169,0.85)]"
                      style={{ background: 'linear-gradient(120deg, #012f62, #0055b4)' }}
                    >
                      Learn More <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                    {product.demoUrl && (
                      <a
                        href={product.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-2.5 border-2 border-[#0050a9] text-[#0050a9] font-semibold text-sm rounded-lg hover:bg-[#0050a9] hover:text-white transition-colors"
                      >
                        View Demo <Play className="w-4 h-4 fill-current" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20" style={{ background: 'linear-gradient(120deg, #012f62, #0055b4)' }}>
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-[36px] lg:text-[42px] font-bold text-white mb-4">
            Need a Custom Solution?
          </h2>
          <p className="text-white/70 text-lg mb-10">
            Our product engineering team can build bespoke applications tailored to your business needs.
          </p>
          <Link to="/contact" className="btn-primary inline-flex items-center gap-2">
            Let's Talk <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </section>

      <Footer />
      <MobileNav />
    </div>
  )
}
