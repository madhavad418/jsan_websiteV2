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
  Briefcase,
  Map,
  Navigation,
  Signal
} from 'lucide-react'
import HeroBackdrop, { heroCopyColumn } from '../components/HeroBackdrop'
import SectionLabel from '../components/SectionLabel'
import Header from '../components/Header'
import Footer from '../components/Footer'
import MobileNav from '../components/MobileNav'

/**
 * Every industry the site has a page for, in the order the header lists them.
 *
 * This used to carry four of the seven, under names the header had since moved on from -
 * "Energy & Utilities" here against "Utilities" in the menu, and so on. One industry
 * cannot be called two things depending on which way a visitor arrived, so the names
 * below are the header's names. Add an industry to the header and it belongs here too.
 */
const industries = [
  {
    id: 'mapping',
    name: 'Mapping & Location Platforms',
    shortName: 'Mapping & Location',
    description:
      'Street-level collection, map data production and continuous refresh for the platforms people navigate by, with quality assurance built into every stage rather than inspected at the end.',
    image: '/pillars/mapping_location.webp',
    services: ['Street-Level Collection', 'Map Data Production', 'POI & Address Data', 'Change Detection', 'Quality Assurance'],
    link: '/industries/mapping-location-platforms',
  },
  {
    id: 'autonomous',
    name: 'Autonomous Mobility',
    shortName: 'Autonomous Mobility',
    description:
      'Ground truth, annotation and validation work for autonomy programmes, run at production scale with the reviewer calibration and sampling that make accuracy defensible.',
    image: '/pillars/autonomous_mobilitynew.webp',
    services: ['HD Map Support', 'Ground Truth Data', 'Sensor Data Operations', 'Annotation at Scale', 'Validation & QA'],
    link: '/industries/autonomous-mobility',
  },
  {
    id: 'telecom',
    name: 'Telecommunications',
    shortName: 'Telecommunications',
    description:
      'Field survey, network GIS and as-built validation alongside operator engineering teams, reconciling what was designed against what was actually installed.',
    image: '/pillars/telecommunications.webp',
    services: ['Telecom GIS', 'Fibre & Pole Survey', 'As-Built Validation', 'Network Planning Support', 'Field Operations'],
    link: '/industries/telecommunications',
  },
  {
    id: 'transport',
    name: 'Transportation & Infrastructure',
    shortName: 'Transport & Infrastructure',
    description:
      'Asset intelligence and operational support across road, rail and infrastructure programmes, from LiDAR and imagery through to the GIS the planning teams work in.',
    image: 'https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=800&h=600&fit=crop',
    services: ['Asset Intelligence', 'LiDAR & Imagery', 'Route Operations', 'Condition Surveys', 'GIS Delivery'],
    link: '/industries/transportation-infrastructure',
  },
  {
    id: 'energy',
    name: 'Utilities',
    shortName: 'Utilities',
    description:
      'Network records that match the ground: pole and asset survey, connectivity and attribution, and the field operations that keep a utility network current rather than historic.',
    image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&h=600&fit=crop',
    services: ['Pole & Asset Survey', 'Network Records', 'Connectivity & Attribution', 'Field Operations', 'Data Quality'],
    link: '/industries/utilities',
  },
  {
    id: 'smartcities',
    name: 'Government & Smart Cities',
    shortName: 'Government & Smart Cities',
    description:
      'Basemaps, address and asset data for public bodies, delivered against the boundaries and identifiers they already work to so every figure reconciles with their own records.',
    image: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800&h=600&fit=crop',
    services: ['Urban Analytics', 'Address & Basemap Data', 'Asset Registers', 'Digital Twin', 'Programme Reporting'],
    link: '/industries/government-smart-cities',
  },
  {
    id: 'consulting',
    name: 'Enterprise Technology',
    shortName: 'Enterprise Technology',
    description:
      'Delivery partnership for firms that need geospatial and data capability inside their own programmes: specialist resources, quality ownership and knowledge transfer.',
    image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&h=600&fit=crop',
    services: ['Technical Resources', 'Specialized Expertise', 'Delivery Partnership', 'Quality Assurance', 'Knowledge Transfer'],
    link: '/industries/consulting',
  },
]

const industryIcons: { [key: string]: React.ElementType } = {
  'mapping': Map,
  'autonomous': Navigation,
  'telecom': Signal,
  'transport': Truck,
  'energy': Zap,
  'smartcities': Building2,
  'consulting': Briefcase,
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

      {/* Hero  same full-bleed treatment as the industry, capability and service pages.
          What was here before had three problems this fixes: the photograph started at the
          section top, so its top 77px sat behind the fixed header; a near-opaque blue wash
          (#0050a9/95) left almost none of it visible; and the copy ran to max-w-3xl, past
          the point where the scrim has faded. A decorative SVG over the right half went
          with the wash  with a photograph actually showing through, it only added noise. */}
      <section
        className="relative flex min-h-[500px] items-center overflow-hidden bg-[#03142d] pb-12 pt-24 sm:min-h-[560px] sm:pb-16 sm:pt-28 lg:min-h-[660px] lg:pb-20 lg:pt-32"
        style={{ marginTop: '44px' }}
      >
        <HeroBackdrop
          image="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&h=1080&fit=crop"
          imageAlt="Industries JSAN delivers into"
        />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-6">
          <div className={heroCopyColumn()}>
            <span className="mb-5 inline-flex items-center gap-2 t-label text-[#00d4ff]">
              <Building2 className="h-4 w-4" aria-hidden="true" />
              {/* Counted, not typed. This said 4 for as long as the list held four. */}
              {industries.length} Industry Verticals
            </span>

            <h1 className="mb-4 text-[26px] font-bold leading-[1.12] text-white sm:text-[30px] sm:leading-[1.08] lg:text-[48px]">
              Industry-Specific Expertise
            </h1>
            <p className="mb-5 text-[17px] font-semibold leading-snug text-[#7cc6ff] sm:mb-6 sm:text-[20px] lg:text-[28px]">
              The same operating model, tuned to what each sector has to prove.
            </p>
            <p className="mb-7 max-w-lg text-[15px] leading-relaxed text-white/75 sm:mb-8 sm:text-lg">
              Deep domain knowledge across multiple industries lets us deliver solutions that
              address the challenges specific to your sector rather than generic ones.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#industries"
                className="group inline-flex items-center gap-2.5 rounded-lg bg-white px-5 py-3 text-[15px] font-semibold sm:px-7 sm:py-3.5 sm:text-base text-[#0050a9] shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-100"
              >
                Browse Industries
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <Link
                to="/contact"
                className="group inline-flex items-center gap-2 rounded-lg border-2 border-white/40 px-5 py-3 text-[15px] font-semibold sm:px-7 sm:py-3.5 sm:text-base text-white transition-all duration-300 hover:border-white hover:bg-white/10"
              >
                Talk to JSAN
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* The seven industries, as editorial panels rather than a card grid  the same
          treatment /capabilities gives its pillars. */}
      <section id="industries" className="section-y scroll-mt-28 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 max-w-3xl lg:mb-16">
            <SectionLabel>Industries We Serve</SectionLabel>
            <h2 className="t-section text-[#0a1a3a]">
              Seven sectors, one operating model
            </h2>
          </div>

          {/*
            One panel per industry: a large documentary photograph on roughly 57% of the
            width, the positioning statement beside it, the work it actually covers, and one
            way in. Sides alternate down the page.

            Seven equal cards said "here are seven things". At this size each industry reads
            as a practice in its own right, which is closer to the truth.
          */}
          <div className="space-y-16 lg:space-y-24">
            {industries.map((industry, i) => {
              const IconComponent = industryIcons[industry.id]
              const imageFirst = i % 2 === 0

              return (
                <article
                  key={industry.id}
                  /* The wide column has to follow the image across the alternation, or the
                     photograph shrinks on every second panel. */
                  className={`grid items-center gap-10 lg:gap-16 ${
                    imageFirst
                      ? 'lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]'
                      : 'lg:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)]'
                  }`}
                >
                  <Link
                    to={industry.link}
                    aria-hidden="true"
                    tabIndex={-1}
                    className={`group block overflow-hidden rounded-2xl bg-gray-100 ${
                      imageFirst ? '' : 'lg:order-2'
                    }`}
                  >
                    <img
                      src={industry.image}
                      alt=""
                      width={1200}
                      height={800}
                      loading="lazy"
                      decoding="async"
                      className="h-[300px] w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.03] lg:h-[460px]"
                    />
                  </Link>

                  <div className={imageFirst ? '' : 'lg:order-1'}>
                    <div className="mb-6 flex items-center gap-4">
                      <span className="text-[34px] font-bold leading-none tracking-[-0.04em] text-[#868e9c]">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span aria-hidden="true" className="h-px w-8 bg-gray-300" />
                      <IconComponent className="h-5 w-5 text-[#0050a9]" aria-hidden="true" />
                    </div>

                    <h3 className="t-sub mb-5 text-[#0a1a3a]">{industry.name}</h3>

                    <p className="t-body mb-9 max-w-md text-gray-600">{industry.description}</p>

                    {/* The four things this industry actually covers. */}
                    <ul className="mb-10 space-y-3 border-t border-gray-200 pt-7">
                      {industry.services.slice(0, 4).map((service) => (
                        <li key={service} className="flex items-start gap-3 text-[15px] text-gray-700">
                          <span aria-hidden="true" className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-[#0050a9]" />
                          {service}
                        </li>
                      ))}
                    </ul>

                    <Link
                      to={industry.link}
                      className="group inline-flex min-h-[44px] items-center gap-2.5 border-b border-[#0a1a3a]/20 pb-1 font-semibold text-[#0a1a3a] transition-colors duration-300 hover:border-[#0050a9] hover:text-[#0050a9]"
                    >
                      Explore industry
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                  </div>
                </article>
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
