import { TrendingUp, Target, Users, Briefcase, PieChart, FileText, Play, ArrowRight, Building2, Handshake, LineChart, DollarSign } from 'lucide-react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import MobileNav from '../../components/MobileNav'
import { serviceSplit } from '../../config/countAllocations'
import ServiceHero from '../../components/ServiceHero'

const advisory = serviceSplit['business-advisory']

const metrics = [
  { value: `${advisory.projects}+`, label: 'Projects Delivered', description: 'Successfully completed' },
  { value: `${advisory.people}+`, label: 'Specialists', description: 'Advisory practice' },
  { value: '30%', label: 'Cost Reduction', description: 'Average client savings' },
  { value: '95%', label: 'Client Satisfaction', description: 'Recommendation rate' },
]

const services = [
  {
    icon: Target,
    title: 'Strategic Planning',
    description: 'Vision development, market analysis, competitive positioning, and long-term growth roadmaps aligned with business objectives.',
  },
  {
    icon: TrendingUp,
    title: 'Business Growth',
    description: 'Market expansion strategies, revenue optimization, customer acquisition, and scalable business model development.',
  },
  {
    icon: PieChart,
    title: 'Financial Advisory',
    description: 'Financial planning, investment analysis, cost optimization, and performance improvement initiatives.',
  },
  {
    icon: Users,
    title: 'Organizational Development',
    description: 'Talent strategy, leadership development, change management, and organizational effectiveness programs.',
  },
  {
    icon: Briefcase,
    title: 'Operations Excellence',
    description: 'Process optimization, supply chain management, quality improvement, and operational efficiency consulting.',
  },
  {
    icon: FileText,
    title: 'Risk & Compliance',
    description: 'Risk assessment, compliance frameworks, governance structures, and regulatory advisory services.',
  },
]

const outcomes = [
  { value: '45%', label: 'Revenue Growth', description: 'Average increase for clients' },
  { value: '60%', label: 'Efficiency Gain', description: 'Process improvements' },
  { value: '25%', label: 'Market Share', description: 'Average expansion' },
  { value: '80%', label: 'Goal Achievement', description: 'Strategic objectives met' },
]

/* Splits this practice's own project count (serviceSplit['business-advisory']) by sector,
   so the four tiles add back up to the figure in the hero rather than exceeding it. */
const industries = [
  { icon: Building2, name: 'Manufacturing', projects: '4' },
  { icon: Handshake, name: 'Professional Services', projects: '3' },
  { icon: LineChart, name: 'Financial Services', projects: '2' },
  { icon: DollarSign, name: 'Retail & Consumer', projects: '2' },
]

const approach = [
  { step: '01', title: 'Discover', description: 'Deep-dive into your business challenges and opportunities' },
  { step: '02', title: 'Analyze', description: 'Data-driven assessment and benchmarking' },
  { step: '03', title: 'Strategize', description: 'Develop actionable recommendations' },
  { step: '04', title: 'Implement', description: 'Execute with hands-on support' },
  { step: '05', title: 'Measure', description: 'Track outcomes and adjust' },
  { step: '06', title: 'Sustain', description: 'Ensure long-term success' },
]

export default function BusinessAdvisory() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <ServiceHero
        breadcrumb="Business Advisory"
        eyebrow="Strategic Service"
        eyebrowIcon={TrendingUp}
        title="Strategic Guidance for Sustainable Growth"
        subtitle="Clarity where the decisions are hardest."
        description="Navigate complex business challenges with confidence. Our advisory services deliver actionable strategies that drive growth, optimize operations, and maximize value creation."
        image="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1600"
        imageAlt="Business strategy and advisory"
        primaryCta={{ label: 'Get Strategic Advice', href: '/contact' }}
      />

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
            <h2 className="text-[36px] lg:text-[42px] font-bold text-[#0050a9] mb-4">Advisory Services</h2>
            <p className="text-gray-600 text-xl max-w-3xl mx-auto">
              Comprehensive business advisory solutions tailored to your unique challenges and opportunities.
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

      {/* Outcomes */}
      <section className="py-20 bg-gradient-to-br from-[#1b497b] to-[#0050a9]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-[36px] lg:text-[42px] font-bold text-white mb-4">Proven Outcomes</h2>
            <p className="text-white/70 text-xl">Measurable results our clients have achieved.</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {outcomes.map((outcome, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
                <div className="text-[48px] font-bold text-[#7db8e8] leading-none mb-2">{outcome.value}</div>
                <div className="text-white font-bold mb-1">{outcome.label}</div>
                <div className="text-white/60 text-sm">{outcome.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-[36px] lg:text-[42px] font-bold text-[#0050a9] mb-4">Industry Expertise</h2>
            <p className="text-gray-600 text-xl">Deep domain knowledge across key sectors.</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {industries.map((industry, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6 text-center hover:shadow-lg transition-shadow">
                <div className="w-14 h-14 mx-auto mb-4 bg-[#1b497b] rounded-xl flex items-center justify-center">
                  <industry.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-[#0050a9] font-bold mb-1">{industry.name}</h3>
                <p className="text-[#1b497b] text-sm font-medium">{industry.projects} engagements</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Approach */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-[36px] lg:text-[42px] font-bold text-[#0050a9] mb-4">Our Approach</h2>
            <p className="text-gray-600 text-xl">A proven methodology for delivering lasting business impact.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {approach.map((step, index) => (
              <div key={index} className="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-lg transition-shadow relative">
                <div className="text-4xl font-bold text-[#1b497b]/20 mb-2">{step.step}</div>
                <h3 className="text-[#0050a9] font-bold mb-2">{step.title}</h3>
                <p className="text-gray-500 text-sm">{step.description}</p>
                {index < approach.length - 1 && (
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
            Ready to accelerate your business growth?
          </h2>
          <p className="text-gray-600 text-xl mb-10">
            Let's discuss how our business advisory services can help you achieve your strategic objectives.
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
