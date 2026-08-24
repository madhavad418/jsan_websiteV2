import { Link } from 'react-router-dom'
import {
  Play,
  ArrowRight,
  Truck,
  Building2,
  Zap,
  Award,
  Target,
  Lightbulb,
  Briefcase
} from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import MobileNav from '../components/MobileNav'

const industries = [
  {
    id: 'energy',
    name: 'Energy & Utilities',
    shortName: 'Energy & Utilities',
    description: 'Technology solutions for energy companies including smart grid implementation, asset management, sustainability initiatives, and operational optimization.',
    image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&h=600&fit=crop',
    services: ['Smart Grid Solutions', 'Asset Management', 'Sustainability Tech', 'Operational Excellence', 'Renewable Energy'],
    link: '/industries/utilities',
  },
  {
    id: 'transport',
    name: 'Navigation, Transport & Mobility',
    shortName: 'Transport & Mobility',
    description: 'Comprehensive solutions for the transport sector including fleet management, route optimization, real-time tracking, mobility platforms, and logistics intelligence.',
    image: 'https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=800&h=600&fit=crop',
    services: ['Fleet Management', 'Route Optimization', 'Real-time Tracking', 'Mobility Platforms', 'Logistics Intelligence'],
    link: '/industries/transportation-infrastructure',
  },
  {
    id: 'consulting',
    name: 'Consulting & Professional Services',
    shortName: 'Consulting',
    description: 'Partnership solutions for consulting firms including resource augmentation, specialized expertise, delivery partnership, and knowledge transfer.',
    image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&h=600&fit=crop',
    services: ['Technical Resources', 'Specialized Expertise', 'Delivery Partnership', 'Quality Assurance', 'Knowledge Transfer'],
    link: '/industries/consulting',
  },
  {
    id: 'smartcities',
    name: 'Sustainability & Future Cities',
    shortName: 'Sustainability & Future Cities',
    description: 'Sustainability and urban planning solutions including IoT infrastructure, traffic management, urban analytics, and sustainable city development.',
    image: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800&h=600&fit=crop',
    services: ['Urban Analytics', 'Traffic Management', 'IoT Infrastructure', 'Sustainable Planning', 'Digital Twin'],
    link: '/industries/government-smart-cities',
  },
]

const industryIcons: { [key: string]: React.ElementType } = {
  'transport': Truck,
  'energy': Zap,
  'consulting': Briefcase,
  'smartcities': Building2,
}

const whyExpertise = [
  {
    icon: Lightbulb,
    title: 'Deep Domain Knowledge',
    description: "Our experts understand your industry's unique challenges, regulations, and best practices.",
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop',
  },
  {
    icon: Target,
    title: 'Tailored Solutions',
    description: 'We design solutions specific to your industry requirements, not one-size-fits-all approaches.',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=400&fit=crop',
  },
  {
    icon: Award,
    title: 'Proven Track Record',
    description: 'Successful implementations across leading organizations in each industry we serve.',
    image: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=600&h=400&fit=crop',
  },
]

export default function Industries() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section with Full Image */}
      <section className="relative min-h-[650px] flex items-center overflow-hidden pt-28 lg:pt-32 pb-28 lg:pb-32" style={{ marginTop: '44px' }}>
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&h=1080&fit=crop"
            alt="Industries"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0050a9]/95 via-[#0050a9]/80 to-transparent"></div>
        </div>

        {/* Animated Geometric Pattern */}
        <div className="absolute right-0 top-0 w-1/2 h-full opacity-30 pointer-events-none">
          <svg viewBox="0 0 800 600" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
            <defs>
              <linearGradient id="indGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00d4ff" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#0050a9" stopOpacity="0.2" />
              </linearGradient>
            </defs>
            <polygon points="400,50 750,200 750,450 400,600 200,400 200,150" fill="url(#indGrad)" />
            <polygon points="450,100 700,220 700,420 450,540 280,380 280,180" fill="none" stroke="#00d4ff" strokeWidth="2" opacity="0.6" />
            <polygon points="500,150 650,240 650,390 500,480 340,360 340,210" fill="none" stroke="#00d4ff" strokeWidth="1" opacity="0.4" />
          </svg>
        </div>

        {/* Sub-header */}
        <div className="absolute top-0 left-0 right-0 bg-black/20 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
            <span className="text-white/90 font-medium">Industries</span>
            <Link to="/contact" className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/30 text-white px-4 py-2 rounded transition-colors">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              Contact
            </Link>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 bg-cyan-400/20 backdrop-blur border border-cyan-400/30 text-cyan-300 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <Building2 className="w-4 h-4" />
              4 INDUSTRY VERTICALS
            </span>
            <h1 className="text-white text-[42px] lg:text-[60px] font-bold leading-[1.05] mb-6">
              Industry-Specific<br />Expertise
            </h1>
            <p className="text-white/80 text-xl lg:text-2xl leading-relaxed mb-10">
              Deep domain knowledge across multiple industries enables us to deliver solutions that address your unique challenges and opportunities.
            </p>
          </div>
        </div>

      </section>

      {/* Industries Grid */}
      <section id="industries" className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-[36px] lg:text-[48px] font-bold text-[#0050a9] mb-4">
              Industries We Serve
            </h2>
            <p className="text-gray-600 text-xl max-w-3xl mx-auto">
              From transportation to smart cities, we bring specialized expertise to every sector.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {industries.map((industry) => {
              const IconComponent = industryIcons[industry.id]
              return (
                <div
                  key={industry.id}
                  className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3"
                >
                  {/* Image */}
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={industry.image}
                      alt={industry.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0050a9]/90 via-[#0050a9]/40 to-transparent"></div>

                    {/* Icon Badge */}
                    <div className="absolute top-4 right-4 w-14 h-14 bg-white/20 backdrop-blur-md border border-white/30 rounded-xl flex items-center justify-center group-hover:bg-[#0050a9] transition-colors">
                      <IconComponent className="w-7 h-7 text-white" />
                    </div>

                    {/* Title on Image */}
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-white text-2xl font-bold mb-2">{industry.shortName}</h3>
                      <div className="flex flex-wrap gap-2">
                        {industry.services.slice(0, 2).map((service, idx) => (
                          <span
                            key={idx}
                            className="text-xs bg-white/20 backdrop-blur text-white px-3 py-1 rounded-full"
                          >
                            {service}
                          </span>
                        ))}
                        <span className="text-xs bg-cyan-400/30 text-cyan-300 px-3 py-1 rounded-full">
                          +{industry.services.length - 2} more
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <p className="text-gray-600 text-sm leading-relaxed mb-6">
                      {industry.description}
                    </p>

                    <Link
                      to={industry.link}
                      className="inline-flex items-center gap-2 text-[#0050a9] font-semibold hover:gap-4 transition-all group/link"
                    >
                      Learn More
                      <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Why Industry Expertise - Image Cards */}
      <section className="py-20 bg-[#0050a9]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 bg-cyan-400/20 text-cyan-400 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <Award className="w-4 h-4" />
              OUR ADVANTAGE
            </span>
            <h2 className="text-[36px] lg:text-[48px] font-bold text-white mb-4">
              Why Industry Expertise Matters
            </h2>
            <p className="text-white/70 text-xl max-w-3xl mx-auto">
              Specialized knowledge transforms how we approach your challenges.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {whyExpertise.map((item, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-2xl"
              >
                {/* Background Image */}
                <div className="absolute inset-0">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0050a9] via-[#0050a9]/70 to-[#0050a9]/30 group-hover:via-[#0050a9]/70 transition-colors"></div>
                </div>

                {/* Content */}
                <div className="relative p-8 h-[400px] flex flex-col justify-end">
                  <div className="w-16 h-16 mb-6 bg-gradient-to-br from-cyan-400 to-[#0050a9] rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <item.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-white text-2xl font-bold mb-4">{item.title}</h3>
                  <p className="text-white/80 leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&h=600&fit=crop"
            alt="Contact"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0050a9]/95 to-[#0050a9]/90"></div>
        </div>

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-[36px] lg:text-[48px] font-bold text-white mb-6">
            Ready to Transform Your Industry?
          </h2>
          <p className="text-white/80 text-xl mb-10 max-w-2xl mx-auto">
            Partner with JSAN to unlock your organization's full potential with industry-specific expertise and proven solutions.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 bg-white text-[#0050a9] hover:bg-gray-100 px-8 py-4 font-semibold rounded-lg transition-all hover:gap-4"
            >
              Schedule a Consultation
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/services"
              className="inline-flex items-center gap-3 border-2 border-white/40 hover:bg-white/10 text-white px-8 py-4 font-semibold rounded-lg transition-colors"
            >
              View Our Services
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
