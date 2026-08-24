import { Link } from 'react-router-dom'
import {
  Building2,
  ArrowRight,
  Play,
  CheckCircle,
  MapPin,
  Wifi,
  Car,
  TreeDeciduous,
  Lightbulb,
  BarChart3,
  Shield,
  Zap
} from 'lucide-react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import MobileNav from '../../components/MobileNav'

const challenges = [
  {
    icon: Car,
    title: 'Traffic Congestion',
    description: 'Managing urban mobility and reducing congestion through intelligent traffic systems and real-time monitoring.'
  },
  {
    icon: Zap,
    title: 'Resource Efficiency',
    description: 'Optimizing energy, water, and waste management for sustainable urban operations.'
  },
  {
    icon: Shield,
    title: 'Public Safety',
    description: 'Ensuring citizen safety through integrated surveillance, emergency response, and incident management.'
  },
  {
    icon: BarChart3,
    title: 'Data Integration',
    description: 'Consolidating data from multiple city systems to enable informed decision-making.'
  },
]

const solutions = [
  {
    icon: MapPin,
    title: 'Urban Analytics',
    description: 'Comprehensive urban data analytics platform for monitoring city performance, identifying trends, and planning interventions.',
    features: ['Real-time dashboards', 'Predictive analytics', 'KPI tracking']
  },
  {
    icon: Car,
    title: 'Traffic Management',
    description: 'Intelligent traffic management systems including signal optimization, congestion monitoring, and parking solutions.',
    features: ['Signal optimization', 'Congestion prediction', 'Smart parking']
  },
  {
    icon: Wifi,
    title: 'IoT Infrastructure',
    description: 'End-to-end IoT platform for connecting city assets, sensors, and systems into a unified smart city ecosystem.',
    features: ['Sensor networks', 'Asset tracking', 'Remote monitoring']
  },
  {
    icon: TreeDeciduous,
    title: 'Sustainable Planning',
    description: 'Environmental monitoring and sustainable urban development solutions for greener, healthier cities.',
    features: ['Air quality monitoring', 'Green space planning', 'Carbon tracking']
  },
]

const capabilities = [
  'Digital twin development for urban planning simulation',
  'Integrated command and control center setup',
  'Smart street lighting and utility management',
  'Citizen engagement portals and mobile apps',
  'Environmental monitoring and alerts',
  'Emergency response coordination systems',
]

export default function SmartCities() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-[600px] flex items-center overflow-hidden pt-28 lg:pt-32 pb-28 lg:pb-32" style={{ marginTop: '44px' }}>
        <div className="absolute inset-0 bg-gradient-to-br from-[#0050a9] via-[#0a1a3a] to-[#0050a9]">
          <div className="absolute inset-0 opacity-20">
            <img
              src="https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=1920&h=1080&fit=crop"
              alt=""
              aria-hidden="true"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#0050a9]/90 via-[#0050a9]/70 to-transparent" />
        </div>

        <div className="absolute top-0 left-0 right-0 bg-black/20 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link to="/industries" className="text-white/70 hover:text-white transition-colors flex items-center gap-2">
                <ArrowRight className="w-4 h-4 rotate-180" />
                Industries
              </Link>
              <span className="text-white/50">/</span>
              <span className="text-white/90 font-medium">Sustainability & Future Cities</span>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <Building2 className="w-8 h-8 text-white" />
              </div>
              <span className="bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium">
                Sustainability & Urban Innovation
              </span>
            </div>
            <h1 className="text-white text-[42px] lg:text-[56px] font-bold leading-[1.1] mb-6">
              Sustainability & Future Cities
            </h1>
            <p className="text-white/80 text-xl leading-relaxed mb-8">
              Urban planning and smart city solutions including IoT infrastructure, traffic management, urban analytics, and sustainable city development.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/contact" className="inline-flex items-center gap-2 bg-white text-[#0050a9] px-6 py-3 rounded font-semibold hover:bg-gray-100 transition-colors">
                Start Your Sustainability Journey
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link to="/technologies/gis" className="inline-flex items-center gap-2 border border-white/30 text-white px-6 py-3 rounded font-semibold hover:bg-white/10 transition-colors">
                GIS Solutions
                <Play className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Challenges */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-[32px] lg:text-[42px] font-bold text-[#0050a9] mb-4">
              Urban Challenges We Address
            </h2>
            <p className="text-gray-600 text-xl max-w-3xl mx-auto">
              Modern cities face complex challenges that require integrated technology solutions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {challenges.map((challenge, index) => (
              <div key={index} className="bg-[#f8fafc] rounded-xl p-6 hover:shadow-lg transition-shadow">
                <div className="w-14 h-14 bg-[#0050a9] rounded-xl flex items-center justify-center mb-4">
                  <challenge.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-[#0050a9] text-lg font-bold mb-2">{challenge.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{challenge.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions */}
      <section className="py-20 bg-[#0050a9]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-[32px] lg:text-[42px] font-bold text-white mb-4">
              Sustainability & Future Cities Solutions
            </h2>
            <p className="text-white/70 text-xl max-w-3xl mx-auto">
              Comprehensive technology solutions for building smarter, more sustainable cities.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {solutions.map((solution, index) => (
              <div key={index} className="bg-white rounded-xl p-8 hover:shadow-xl transition-shadow">
                <div className="w-14 h-14 bg-[#0050a9] rounded-xl flex items-center justify-center mb-6">
                  <solution.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-[#0050a9] text-xl font-bold mb-3">{solution.title}</h3>
                <p className="text-gray-600 mb-4">{solution.description}</p>
                <ul className="space-y-2">
                  {solution.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-gray-700 text-sm">
                      <CheckCircle className="w-4 h-4 text-[#0050a9]" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-[32px] lg:text-[42px] font-bold text-[#0050a9] mb-6">
                Our Sustainability & Future Cities Capabilities
              </h2>
              <p className="text-gray-600 text-lg mb-8">
                From digital twins to citizen engagement, we provide end-to-end solutions for urban transformation.
              </p>
              <ul className="space-y-4">
                {capabilities.map((capability, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-[#0050a9] flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{capability}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1444723121867-7a241cacace9?w=800&h=600&fit=crop&auto=format"
                alt="Smart city visualization"
                className="rounded-2xl shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Digital Twin Section */}
      <section className="py-20 bg-gradient-to-br from-[#e8f4fc] to-[#d0e8f7]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <img
                src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop"
                alt="Digital twin technology"
                className="rounded-2xl shadow-xl"
              />
            </div>
            <div className="order-1 lg:order-2">
              <div className="inline-block bg-[#0050a9] text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <Lightbulb className="w-4 h-4 inline mr-2" />
                Featured Capability
              </div>
              <h2 className="text-[32px] lg:text-[42px] font-bold text-[#0050a9] mb-6">
                Digital Twin Technology
              </h2>
              <p className="text-gray-700 text-lg mb-6">
                Create virtual replicas of your city infrastructure to simulate scenarios, predict outcomes, and optimize urban planning decisions before implementation.
              </p>
              <ul className="space-y-3">
                {['3D city modeling and visualization', 'Real-time data integration', 'Scenario simulation and analysis', 'Predictive maintenance planning'].map((item, index) => (
                  <li key={index} className="flex items-center gap-3 text-gray-700">
                    <CheckCircle className="w-5 h-5 text-[#0050a9]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-[#0050a9] to-[#0050a9]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-[32px] lg:text-[42px] font-bold text-white mb-6">
            Ready to transform your city?
          </h2>
          <p className="text-white/80 text-xl mb-8">
            Partner with JSAN to build smarter, more sustainable urban environments for your citizens.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact" className="inline-flex items-center gap-2 bg-white text-[#0050a9] px-8 py-4 rounded font-semibold hover:bg-gray-100 transition-colors">
              Discuss Your Sustainability Project
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link to="/industries" className="inline-flex items-center gap-2 border border-white/30 text-white px-8 py-4 rounded font-semibold hover:bg-white/10 transition-colors">
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
