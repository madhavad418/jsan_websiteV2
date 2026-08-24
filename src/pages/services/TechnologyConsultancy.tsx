import { Cpu, Cloud, Brain, Shield, Smartphone, Database, Server, Zap, Users, CheckCircle, Play, ArrowRight, Lightbulb, Globe } from 'lucide-react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import MobileNav from '../../components/MobileNav'

const metrics = [
  { value: '200+', label: 'Tech Projects', description: 'Successfully delivered' },
  { value: '50+', label: 'Enterprise Clients', description: 'Trust our expertise' },
  { value: '15+', label: 'Technologies', description: 'Mastered platforms' },
  { value: '98%', label: 'Success Rate', description: 'Project delivery' },
]

const capabilities = [
  {
    icon: Lightbulb,
    title: 'Digital Transformation',
    description: 'End-to-end digital strategy, legacy modernization, process automation, and change management for enterprise evolution.',
  },
  {
    icon: Cloud,
    title: 'Cloud Solutions',
    description: 'AWS, Azure, and GCP architecture, migration strategies, cost optimization, and multi-cloud management.',
  },
  {
    icon: Brain,
    title: 'Data Analytics & AI',
    description: 'Business intelligence, machine learning models, predictive analytics, and AI-powered automation solutions.',
  },
  {
    icon: Shield,
    title: 'Cybersecurity',
    description: 'Security assessments, compliance frameworks, threat detection, and incident response planning.',
  },
  {
    icon: Smartphone,
    title: 'Application Development',
    description: 'Custom web and mobile applications, API development, microservices architecture, and DevOps implementation.',
  },
  {
    icon: Database,
    title: 'Enterprise Integration',
    description: 'System integration, data pipelines, middleware solutions, and coordinated third-party connectivity.',
  },
]

const techStack = [
  { category: 'Cloud', items: ['AWS', 'Azure', 'Google Cloud', 'Kubernetes', 'Docker', 'Terraform'] },
  { category: 'Development', items: ['React', 'Node.js', '.NET', 'Python', 'TypeScript', 'PostgreSQL'] },
  { category: 'Data', items: ['Snowflake', 'Databricks', 'Power BI', 'Tableau', 'dbt', 'Airflow'] },
  { category: 'Security', items: ['Splunk', 'CrowdStrike', 'Okta', 'HashiCorp Vault', 'Microsoft Sentinel', 'Azure AD'] },
]

const industries = [
  { icon: Globe, name: 'Financial Services', description: 'Digital banking and fintech solutions' },
  { icon: Server, name: 'Healthcare', description: 'HIPAA-compliant health tech' },
  { icon: Zap, name: 'Energy', description: 'Smart grid and IoT solutions' },
  { icon: Users, name: 'Retail', description: 'E-commerce and omnichannel' },
]

const processSteps = [
  { step: '01', title: 'Assess', description: 'Technology audit and gap analysis' },
  { step: '02', title: 'Strategize', description: 'Roadmap and solution design' },
  { step: '03', title: 'Build', description: 'Development and implementation' },
  { step: '04', title: 'Deploy', description: 'Testing and go-live support' },
  { step: '05', title: 'Optimize', description: 'Performance tuning and scaling' },
  { step: '06', title: 'Support', description: 'Ongoing maintenance and evolution' },
]

export default function TechnologyConsultancy() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-[600px] flex items-center overflow-hidden pt-28 lg:pt-32 pb-28 lg:pb-32" style={{ marginTop: '44px' }}>
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=1600"
            alt="Technology and digital innovation"
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
              <span className="text-white/90 font-medium">Technology Consultancy</span>
            </div>
            <span className="inline-flex items-center gap-2 bg-[#1b497b]/30 text-[#7db8e8] px-3 py-1 rounded-full text-sm font-semibold">
              <Cpu className="w-4 h-4" />
              CORE SERVICE
            </span>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 pt-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-white text-[42px] lg:text-[56px] font-bold leading-[1.1] mb-6">
                Smart Technologies. Intelligent Solutions.
              </h1>
              <p className="text-white/80 text-xl leading-relaxed mb-8">
                Modernise how your business runs on technology. We help enterprises navigate digital transformation, modernize infrastructure, and unlock new capabilities.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="/contact" className="btn-primary bg-[#1b497b] hover:bg-[#153a62]">
                  Start Your Journey
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
                      src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=800"
                      alt="Technology circuit board"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-4 -right-4 bg-[#0050a9] rounded-xl p-4 shadow-lg border-2 border-white/20">
                    <Cpu className="w-8 h-8 text-white" />
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

      {/* Capabilities */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-[36px] lg:text-[42px] font-bold text-[#0050a9] mb-4">Technology Capabilities</h2>
            <p className="text-gray-600 text-xl max-w-3xl mx-auto">
              Comprehensive technology services to accelerate your digital journey and drive competitive advantage.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {capabilities.map((cap, index) => (
              <div key={index} className="bg-white rounded-xl p-6 hover:shadow-lg transition-shadow">
                <div className="w-14 h-14 bg-[#e8f4fc] rounded-xl flex items-center justify-center mb-4">
                  <cap.icon className="w-7 h-7 text-[#1b497b]" />
                </div>
                <h3 className="text-xl font-bold text-[#0050a9] mb-3">{cap.title}</h3>
                <p className="text-gray-600 leading-relaxed">{cap.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-20 bg-[#0050a9]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-[36px] lg:text-[42px] font-bold text-white mb-4">Technology Stack</h2>
            <p className="text-white/70 text-xl">Industry-leading platforms and tools we work with.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {techStack.map((category, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <h3 className="text-[#7db8e8] font-bold mb-4">{category.category}</h3>
                <div className="space-y-2">
                  {category.items.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-white/80">
                      <CheckCircle className="w-4 h-4 text-[#7db8e8]" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-[36px] lg:text-[42px] font-bold text-[#0050a9] mb-4">Industries We Serve</h2>
            <p className="text-gray-600 text-xl">Delivering technology excellence across diverse sectors.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {industries.map((industry, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6 text-center hover:shadow-lg transition-shadow">
                <div className="w-14 h-14 mx-auto mb-4 bg-[#1b497b] rounded-xl flex items-center justify-center">
                  <industry.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-[#0050a9] font-bold mb-2">{industry.name}</h3>
                <p className="text-gray-500 text-sm">{industry.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-[36px] lg:text-[42px] font-bold text-[#0050a9] mb-4">Our Approach</h2>
            <p className="text-gray-600 text-xl">A structured methodology for successful technology delivery.</p>
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
            Ready to modernize your technology?
          </h2>
          <p className="text-gray-600 text-xl mb-10">
            Let's discuss how our technology consultancy can accelerate your digital transformation and drive business growth.
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
