import { Link } from 'react-router-dom'
import {
  Users,
  ArrowRight,
  Play,
  CheckCircle,
  Briefcase,
  Target,
  Award,
  Handshake,
  TrendingUp,
  GraduationCap,
  Shield,
  Lightbulb
} from 'lucide-react'
import { allocationStats, industrySplit } from '../../config/countAllocations'
import HeroBackdrop from '../../components/HeroBackdrop'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import MobileNav from '../../components/MobileNav'

const challenges = [
  {
    icon: Users,
    title: 'Resource Constraints',
    description: 'Scaling teams quickly for large engagements while maintaining quality and expertise levels.'
  },
  {
    icon: Target,
    title: 'Specialized Skills Gap',
    description: 'Finding niche technical expertise in GIS, data analytics, and emerging technologies.'
  },
  {
    icon: TrendingUp,
    title: 'Delivery Excellence',
    description: 'Meeting client expectations with consistent quality across diverse project requirements.'
  },
  {
    icon: Shield,
    title: 'Knowledge Transfer',
    description: 'Ensuring coordinated handoffs and sustainable solutions for long-term client success.'
  },
]

const solutions = [
  {
    icon: Handshake,
    title: 'Technical Resources',
    description: 'Access our pool of certified GIS analysts, developers, and technology consultants to augment your delivery teams.',
    features: ['Certified professionals', 'Flexible engagement models', 'Quick onboarding']
  },
  {
    icon: Lightbulb,
    title: 'Specialized Expertise',
    description: 'Leverage our deep expertise in geospatial technologies, location intelligence, and enterprise IT solutions.',
    features: ['GIS & mapping specialists', 'Data science experts', 'Cloud architects']
  },
  {
    icon: Award,
    title: 'Delivery Partnership',
    description: 'Partner with us for end-to-end project delivery, from requirements gathering to implementation and support.',
    features: ['Proven methodologies', 'Quality assurance', 'On-time delivery']
  },
  {
    icon: GraduationCap,
    title: 'Knowledge Transfer',
    description: 'Comprehensive training and documentation ensuring your teams can maintain and extend delivered solutions.',
    features: ['Training programs', 'Documentation', 'Ongoing support']
  },
]

const partnerBenefits = [
  'Access to 1,500+ skilled GIS and IT professionals',
  'Flexible engagement models - project, staff aug, managed services',
  'Global delivery capabilities across 25+ countries',
  'Proven track record with Fortune 500 clients',
  'Competitive pricing with quality assurance',
  'Direct integration with your delivery processes',
]

export default function Consulting() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-[480px] sm:min-h-[540px] lg:min-h-[600px] flex items-center overflow-hidden pt-24 sm:pt-28 lg:pt-32 pb-16 sm:pb-20 lg:pb-32" style={{ marginTop: '44px' }}>
        {/* top-[77px] clears the fixed header, which the section otherwise slides under.
            The photograph used to sit at opacity-20 under a blue wash, so it read as flat
            colour; it now carries the hero under the same navy scrim as the other heroes. */}
        <HeroBackdrop
          image="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1920&h=1080&fit=crop"
          imageAlt="Consulting and professional services teams at work"
        />

        <div className="absolute top-0 left-0 right-0 bg-black/20 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link to="/industries" className="text-white/70 hover:text-white transition-colors flex items-center gap-2">
                <ArrowRight className="w-4 h-4 rotate-180" />
                Industries
              </Link>
              <span className="text-white/50">/</span>
              <span className="text-white/90 font-medium">Consulting & Professional Services</span>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          {/* Held to the scrimmed half so the copy never runs onto the bright side */}
          <div className="max-w-3xl lg:w-[52%] lg:max-w-none lg:pr-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <Briefcase className="w-8 h-8 text-white" />
              </div>
              <span className="bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium">
                Partnership Solutions
              </span>
            </div>
            <h1 className="text-white text-[27px] sm:text-[34px] lg:text-[56px] font-bold leading-[1.14] sm:leading-[1.1] mb-5 sm:mb-6">
              Consulting & Professional Services
            </h1>
            <p className="text-white/80 text-[15px] sm:text-lg lg:text-xl leading-relaxed mb-7 sm:mb-8">
              Partnership solutions for consulting firms including resource augmentation, specialized expertise, delivery partnership, and knowledge transfer.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/contact" className="inline-flex items-center gap-2 bg-white text-[#0050a9] px-6 py-3 rounded font-semibold hover:bg-gray-100 transition-colors">
                Partner With Us
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link to="/services" className="inline-flex items-center gap-2 border border-white/30 text-white px-6 py-3 rounded font-semibold hover:bg-white/10 transition-colors">
                Our Services
                <Play className="w-4 h-4" />
              </Link>
            </div>
            <div className="mt-10 flex flex-wrap gap-x-10 gap-y-6 border-t border-white/20 pt-8">
              {allocationStats(industrySplit, 'consulting').map((stat) => (
                <div key={stat.label}>
                  <div className="text-white text-3xl lg:text-4xl font-bold">{stat.value}</div>
                  <div className="text-white/60 text-sm mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Challenges */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-[32px] lg:text-[42px] font-bold text-[#0050a9] mb-4">
              Challenges We Help You Solve
            </h2>
            <p className="text-gray-600 text-xl max-w-3xl mx-auto">
              We understand the unique challenges consulting firms face in delivering technology solutions.
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
              Our Partnership Solutions
            </h2>
            <p className="text-white/70 text-xl max-w-3xl mx-auto">
              Flexible engagement models designed to complement your consulting practice.
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

      {/* Partner Benefits */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-[32px] lg:text-[42px] font-bold text-[#0050a9] mb-6">
                Why Partner With JSAN?
              </h2>
              <p className="text-gray-600 text-lg mb-8">
                Join our network of consulting partners and gain access to specialized resources, proven methodologies, and global delivery capabilities.
              </p>
              <ul className="space-y-4">
                {partnerBenefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-[#0050a9] flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop"
                alt="Partnership collaboration"
                className="rounded-2xl shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-[#0050a9] to-[#0050a9]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-[32px] lg:text-[42px] font-bold text-white mb-6">
            Ready to explore partnership opportunities?
          </h2>
          <p className="text-white/80 text-xl mb-8">
            Let's discuss how JSAN can support your consulting practice with specialized resources and expertise.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact" className="inline-flex items-center gap-2 bg-white text-[#0050a9] px-8 py-4 rounded font-semibold hover:bg-gray-100 transition-colors">
              Start Partnership Discussion
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
