import { Users, UserPlus, Briefcase, Target, CheckCircle, Play, ArrowRight, Building2, Code, Database, Shield, BarChart3, Headphones, Search, Handshake } from 'lucide-react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import MobileNav from '../../components/MobileNav'

const metrics = [
  { value: '1000+', label: 'Professionals Placed', description: 'Across all domains' },
  { value: '95%', label: 'Retention Rate', description: 'First-year retention' },
  { value: '48h', label: 'Response Time', description: 'Average shortlist delivery' },
  { value: '50+', label: 'Active Clients', description: 'Trusted partnerships' },
]

const staffingModels = [
  {
    icon: UserPlus,
    title: 'Contract Staffing',
    description: 'Flexible talent engagement for project-based needs with quick onboarding and scalable team sizes.',
  },
  {
    icon: Briefcase,
    title: 'Permanent Placement',
    description: 'End-to-end recruitment for full-time positions including sourcing, screening, and onboarding support.',
  },
  {
    icon: Users,
    title: 'Staff Augmentation',
    description: 'Directly extend your team with skilled professionals who integrate into your existing workflows.',
  },
  {
    icon: Building2,
    title: 'Managed Services',
    description: 'Complete team deployment with dedicated management, SLAs, and performance accountability.',
  },
  {
    icon: Target,
    title: 'Executive Search',
    description: 'Specialized recruitment for leadership and C-suite positions with confidential, targeted searches.',
  },
  {
    icon: Handshake,
    title: 'RPO Services',
    description: 'Recruitment Process Outsourcing to handle your entire talent acquisition function end-to-end.',
  },
]

const expertise = [
  { icon: Code, name: 'Software Development', roles: 'Full Stack, Frontend, Backend, Mobile' },
  { icon: Database, name: 'Data & Analytics', roles: 'Data Engineers, Scientists, BI Analysts' },
  { icon: Shield, name: 'Cybersecurity', roles: 'Security Analysts, Architects, Pen Testers' },
  { icon: BarChart3, name: 'Project Management', roles: 'PMs, Scrum Masters, Agile Coaches' },
  { icon: Headphones, name: 'Support & Operations', roles: 'IT Support, DevOps, SRE Engineers' },
  { icon: Search, name: 'Quality Assurance', roles: 'QA Engineers, Test Automation, SDET' },
]

const process = [
  { step: '01', title: 'Requirements', description: 'Understand your hiring needs and culture' },
  { step: '02', title: 'Sourcing', description: 'Tap our talent pool and networks' },
  { step: '03', title: 'Screening', description: 'Technical and cultural fit assessment' },
  { step: '04', title: 'Shortlist', description: 'Present qualified candidates' },
  { step: '05', title: 'Interview', description: 'Coordinate and facilitate interviews' },
  { step: '06', title: 'Onboard', description: 'Support direct integration' },
]

const benefits = [
  { title: 'Pre-Vetted Talent', description: 'All candidates undergo rigorous technical and soft skills assessment' },
  { title: 'Industry Expertise', description: 'Deep understanding of technology and business domains' },
  { title: 'Fast Turnaround', description: 'Shortlists delivered within 48 hours of requirement' },
  { title: 'Quality Guarantee', description: 'Replacement guarantee for all placements' },
  { title: 'Competitive Rates', description: 'Market-competitive pricing with transparent billing' },
  { title: 'Compliance Ready', description: 'All legal, tax, and regulatory compliance handled' },
]

export default function StaffingSolutions() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-[600px] flex items-center overflow-hidden pt-28 lg:pt-32 pb-28 lg:pb-32" style={{ marginTop: '44px' }}>
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1600"
            alt="Professional team and staffing solutions"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0050a9]/95 via-[#1b497b]/85 to-[#1b497b]/70"></div>
        </div>

        {/* Sub-header */}
        <div className="absolute top-0 left-0 right-0 bg-black/20 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <a href="/services" className="text-white/70 hover:text-white transition-colors">Services</a>
              <span className="text-white/50">/</span>
              <span className="text-white/90 font-medium">Staffing Solutions</span>
            </div>
            <span className="inline-flex items-center gap-2 bg-[#1b497b]/30 text-[#7db8e8] px-3 py-1 rounded-full text-sm font-semibold">
              <Users className="w-4 h-4" />
              TALENT SOLUTIONS
            </span>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 pt-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-white text-[42px] lg:text-[56px] font-bold leading-[1.1] mb-6">
                People as a Service
              </h1>
              <p className="text-white/80 text-xl leading-relaxed mb-8">
                Access top-tier talent when you need it. Our staffing solutions connect you with skilled professionals who drive results, whether for short-term projects or long-term growth.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="/contact" className="btn-primary bg-[#1b497b] hover:bg-[#153a62]">
                  Find Talent
                  <Play className="w-4 h-4" />
                </a>
                <a href="/services" className="inline-flex items-center gap-2 px-6 py-3 border border-white/30 text-white font-semibold hover:bg-white/10 transition-colors">
                  All Services
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="relative w-full max-w-lg ml-auto">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-3 border border-white/20 shadow-2xl overflow-hidden">
                  <div className="relative w-full h-80 rounded-xl overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800"
                      alt="Professional team collaboration"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-4 -right-4 bg-[#0050a9] rounded-xl p-4 shadow-lg border-2 border-white/20">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Metrics */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {metrics.map((metric, index) => (
              <div key={index} className="bg-[#e8f4fc] p-6 rounded-xl text-center">
                <div className="text-[48px] font-bold text-[#1b497b] leading-none mb-2">{metric.value}</div>
                <div className="text-[#0050a9] font-bold mb-1">{metric.label}</div>
                <div className="text-gray-500 text-sm">{metric.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Staffing Models */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-[36px] lg:text-[42px] font-bold text-[#0050a9] mb-4">Staffing Models</h2>
            <p className="text-gray-600 text-xl max-w-3xl mx-auto">
              Flexible engagement options to match your hiring needs and organizational requirements.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {staffingModels.map((model, index) => (
              <div key={index} className="bg-white rounded-xl p-6 hover:shadow-lg transition-shadow">
                <div className="w-14 h-14 bg-[#e8f4fc] rounded-xl flex items-center justify-center mb-4">
                  <model.icon className="w-7 h-7 text-[#1b497b]" />
                </div>
                <h3 className="text-xl font-bold text-[#0050a9] mb-3">{model.title}</h3>
                <p className="text-gray-600 leading-relaxed">{model.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Expertise Areas */}
      <section className="py-20 bg-[#0050a9]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-[36px] lg:text-[42px] font-bold text-white mb-4">Areas of Expertise</h2>
            <p className="text-white/70 text-xl">Specialized talent across technology and business domains.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {expertise.map((area, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#1b497b] rounded-xl flex items-center justify-center flex-shrink-0">
                    <area.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold mb-2">{area.name}</h3>
                    <p className="text-white/60 text-sm">{area.roles}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-[36px] lg:text-[42px] font-bold text-[#0050a9] mb-4">Our Hiring Process</h2>
            <p className="text-gray-600 text-xl">A streamlined approach to finding the right talent fast.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {process.map((step, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6 text-center hover:shadow-lg transition-shadow relative">
                <div className="text-4xl font-bold text-[#1b497b]/20 mb-2">{step.step}</div>
                <h3 className="text-[#0050a9] font-bold mb-2">{step.title}</h3>
                <p className="text-gray-500 text-sm">{step.description}</p>
                {index < process.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-2 transform -translate-y-1/2 text-gray-300">→</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-[36px] lg:text-[42px] font-bold text-[#0050a9] mb-4">Why Choose Us</h2>
            <p className="text-gray-600 text-xl">The JSAN advantage for your staffing needs.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="w-10 h-10 bg-[#e8f4fc] rounded-lg flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-5 h-5 text-[#1b497b]" />
                </div>
                <div>
                  <h3 className="text-[#0050a9] font-bold mb-1">{benefit.title}</h3>
                  <p className="text-gray-600 text-sm">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-[#e8f4fc] to-[#d0e8f7]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-[36px] lg:text-[42px] font-bold text-[#0050a9] mb-6">
            Ready to build your dream team?
          </h2>
          <p className="text-gray-600 text-xl mb-10">
            Let's discuss your staffing needs and find the perfect talent to drive your business forward.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="/contact" className="btn-primary bg-[#1b497b] hover:bg-[#153a62]">
              Discuss Your Resourcing Needs
              <Play className="w-4 h-4" />
            </a>
            <a href="/services" className="inline-flex items-center gap-2 px-6 py-3 border border-[#1b497b] text-[#1b497b] font-semibold hover:bg-[#1b497b] hover:text-white transition-colors">
              View All Services
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </section>

      <Footer />
      <MobileNav />
    </div>
  )
}
