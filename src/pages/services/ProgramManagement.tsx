import { ClipboardList, Target, Users, BarChart3, Shield, Clock, Award, Play, ArrowRight, TrendingUp, DollarSign } from 'lucide-react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import MobileNav from '../../components/MobileNav'

const metrics = [
  { value: '92%', label: 'On-Time Delivery', description: 'Project completion rate' },
  { value: '300+', label: 'Programs Managed', description: 'Successfully delivered' },
  { value: '$1B+', label: 'Portfolio Value', description: 'Managed to date' },
  { value: '50+', label: 'PMO Setups', description: 'Established globally' },
]

const services = [
  {
    icon: ClipboardList,
    title: 'Program Planning',
    description: 'Comprehensive program roadmaps, milestone planning, resource allocation, and risk management frameworks.',
  },
  {
    icon: Users,
    title: 'PMO Setup & Operations',
    description: 'Establishing governance frameworks, PMO operations, reporting structures, and best practices.',
  },
  {
    icon: Target,
    title: 'Agile Transformation',
    description: 'Agile coaching, Scrum implementation, SAFe adoption, and hybrid methodology deployment.',
  },
  {
    icon: BarChart3,
    title: 'Performance Analytics',
    description: 'Real-time dashboards, KPI tracking, earned value management, and predictive project analytics.',
  },
  {
    icon: Shield,
    title: 'Risk & Quality',
    description: 'Risk assessment, mitigation strategies, quality assurance, and compliance management.',
  },
]

const methodologies = [
  { name: 'Agile', description: 'Iterative, flexible delivery' },
  { name: 'Waterfall', description: 'Sequential, structured approach' },
  { name: 'SAFe', description: 'Scaled Agile Framework' },
  { name: 'PRINCE2', description: 'Process-based method' },
  { name: 'PMI/PMP', description: 'Industry standard practices' },
  { name: 'Hybrid', description: 'Best of both worlds' },
]

const outcomes = [
  { icon: Clock, value: '40%', label: 'Faster Delivery', description: 'Reduced time-to-market' },
  { icon: DollarSign, value: '25%', label: 'Cost Savings', description: 'Budget optimization' },
  { icon: TrendingUp, value: '85%', label: 'Scope Success', description: 'Requirements delivered' },
  { icon: Award, value: '98%', label: 'Quality Score', description: 'Defect-free delivery' },
]

const processSteps = [
  { step: '01', title: 'Initiate', description: 'Define scope, objectives, and governance' },
  { step: '02', title: 'Plan', description: 'Develop detailed project plans' },
  { step: '03', title: 'Execute', description: 'Deliver with agile precision' },
  { step: '04', title: 'Monitor', description: 'Track progress and metrics' },
  { step: '05', title: 'Control', description: 'Manage changes and risks' },
  { step: '06', title: 'Close', description: 'Handover and lessons learned' },
]

export default function ProgramManagement() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-[600px] flex items-center overflow-hidden pt-28 lg:pt-32 pb-28 lg:pb-32" style={{ marginTop: '44px' }}>
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=1600"
            alt="Program management and team collaboration"
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
              <span className="text-white/90 font-medium">Program Management</span>
            </div>
            <span className="inline-flex items-center gap-2 bg-[#1b497b]/30 text-[#7db8e8] px-3 py-1 rounded-full text-sm font-semibold">
              <ClipboardList className="w-4 h-4" />
              DELIVERY EXCELLENCE
            </span>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 pt-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-white text-[42px] lg:text-[56px] font-bold leading-[1.1] mb-6">
                Delivering Excellence, On Time, Every Time
              </h1>
              <p className="text-white/80 text-xl leading-relaxed mb-8">
                Turn complex initiatives into successful outcomes. Our program management expertise ensures your projects are delivered on time, within budget, and exceed expectations.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="/contact" className="btn-primary bg-[#1b497b] hover:bg-[#153a62]">
                  Start Your Program
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
                      src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=800"
                      alt="Team collaboration meeting"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-4 -right-4 bg-[#0050a9] rounded-xl p-4 shadow-lg border-2 border-white/20">
                    <ClipboardList className="w-8 h-8 text-white" />
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

      {/* Services */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-[36px] lg:text-[42px] font-bold text-[#0050a9] mb-4">Program Management Services</h2>
            <p className="text-gray-600 text-xl max-w-3xl mx-auto">
              End-to-end program management capabilities to drive successful delivery across your organization.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <div key={index} className="bg-white rounded-xl p-6 hover:shadow-lg transition-shadow">
                <div className="w-14 h-14 bg-[#e8f4fc] rounded-xl flex items-center justify-center mb-4">
                  <service.icon className="w-7 h-7 text-[#1b497b]" />
                </div>
                <h3 className="text-xl font-bold text-[#0050a9] mb-3">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Methodologies */}
      <section className="py-20 bg-[#0050a9]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-[36px] lg:text-[42px] font-bold text-white mb-4">Methodologies We Master</h2>
            <p className="text-white/70 text-xl">Flexible approaches tailored to your project needs.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {methodologies.map((method, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center hover:bg-white/20 transition-colors">
                <h3 className="text-white font-bold mb-2">{method.name}</h3>
                <p className="text-white/60 text-sm">{method.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Outcomes */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-[36px] lg:text-[42px] font-bold text-[#0050a9] mb-4">Proven Outcomes</h2>
            <p className="text-gray-600 text-xl">Results our clients consistently achieve.</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {outcomes.map((outcome, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6 text-center hover:shadow-lg transition-shadow">
                <div className="w-14 h-14 mx-auto mb-4 bg-[#1b497b] rounded-xl flex items-center justify-center">
                  <outcome.icon className="w-7 h-7 text-white" />
                </div>
                <div className="text-[32px] font-bold text-[#1b497b] leading-none mb-2">{outcome.value}</div>
                <div className="text-[#0050a9] font-bold mb-1">{outcome.label}</div>
                <p className="text-gray-500 text-sm">{outcome.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-[36px] lg:text-[42px] font-bold text-[#0050a9] mb-4">Our Delivery Process</h2>
            <p className="text-gray-600 text-xl">A structured approach ensuring consistent project success.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {processSteps.map((step, index) => (
              <div key={index} className="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-lg transition-shadow relative">
                <div className="text-4xl font-bold text-[#1b497b]/20 mb-2">{step.step}</div>
                <h3 className="text-[#0050a9] font-bold mb-2">{step.title}</h3>
                <p className="text-gray-500 text-sm">{step.description}</p>
                {index < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-2 transform -translate-y-1/2 text-gray-300">→</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-[#e8f4fc] to-[#d0e8f7]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-[36px] lg:text-[42px] font-bold text-[#0050a9] mb-6">
            Ready to deliver your next big initiative?
          </h2>
          <p className="text-gray-600 text-xl mb-10">
            Let's discuss how our program management expertise can ensure your projects succeed.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="/contact" className="btn-primary bg-[#1b497b] hover:bg-[#153a62]">
              Schedule a Consultation
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
