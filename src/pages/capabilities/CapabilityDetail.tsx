import { useParams, Link } from 'react-router-dom'
import { ArrowRight, CheckCircle, Compass, Mail } from 'lucide-react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import MobileNav from '../../components/MobileNav'
import ServiceHero from '../../components/ServiceHero'
// import ServiceContactForm from '../../components/ServiceContactForm'
import { capabilityBySlug } from '../../data/capabilities'

/**
 * One page per capability listed in the header's Capabilities menu that has no
 * dedicated service page of its own. Content lives in src/data/capabilities.ts.
 */
export default function CapabilityDetail() {
  const { slug } = useParams<{ slug: string }>()
  const capability = capabilityBySlug(slug)

  if (!capability) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="flex min-h-[70vh] items-center justify-center px-6" style={{ marginTop: '44px' }}>
          <div className="text-center">
            <h1 className="mb-4 text-4xl font-bold text-gray-800">Capability Not Found</h1>
            <p className="mb-6 text-gray-600">The capability you are looking for is not available.</p>
            <Link to="/services" className="text-[#0050a9] hover:underline">
              &larr; Back to Capabilities
            </Link>
          </div>
        </div>
        <Footer />
        <MobileNav />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <ServiceHero
        breadcrumb={capability.title}
        eyebrow={capability.group}
        eyebrowIcon={capability.icon}
        title={capability.title}
        subtitle={capability.subtitle}
        description={capability.description}
        image={capability.bgImage}
        imageAlt={capability.title}
        secondaryCta={{ label: 'All Capabilities', href: '/services' }}
      />

      {/* Overview + what we bring */}
      <section className="py-20" style={{ background: 'linear-gradient(120deg, #012f62, #0055b4)' }}>
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid items-start gap-16 lg:grid-cols-2">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#00d4ff]">
                What We Do
              </span>
              <h2 className="mb-4 mt-3 text-[36px] font-bold leading-tight text-white lg:text-[44px]">
                {capability.title} at JSAN
              </h2>
              <p className="mb-8 text-lg leading-relaxed text-white/75">
                {capability.subtitle}  delivered by teams who run this work as a standing operation,
                against a written specification and a measured quality bar.
              </p>

              <div className="mb-10 space-y-3">
                {capability.highlights.map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-white/10">
                      <item.icon className="h-5 w-5 text-[#00d4ff]" />
                    </div>
                    <span className="text-white/90">{item.text}</span>
                  </div>
                ))}
              </div>

              <Link to="/contact" className="btn-primary">
                Discuss Your Requirement
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>

            <div className="space-y-6">
              <div className="rounded-2xl border border-white/10 bg-white/10 p-8 backdrop-blur-sm">
                <h3 className="mb-5 text-xl font-bold text-white">Ideal For</h3>
                <div className="flex flex-wrap gap-3">
                  {capability.idealFor.map((item, i) => (
                    <span
                      key={i}
                      className="rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-medium text-white/90"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/10 p-8 backdrop-blur-sm">
                <h3 className="mb-5 text-xl font-bold text-white">Business Impact</h3>
                <div className="space-y-3">
                  {capability.outcomes.map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#00d4ff]" />
                      <span className="text-white/90">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How we deliver */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 max-w-3xl">
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#00d4ff]">
              How We Deliver
            </span>
            <h2 className="mt-3 text-[32px] font-bold text-[#0050a9] lg:text-[42px]">
              A Governed, Repeatable Delivery Model
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-gray-600">
              Every engagement runs against a written specification, with quality controls built into the
              process and reporting that shows exactly where the work stands.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {capability.approach.map((step, i) => (
              <div
                key={step.title}
                className="group relative rounded-2xl border border-gray-100 bg-gray-50 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#00d4ff]/40 hover:bg-white hover:shadow-[0_18px_40px_-24px_rgba(1,47,98,0.5)]"
              >
                <span
                  className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl text-sm font-bold text-white"
                  style={{ background: 'linear-gradient(140deg, #012f62, #0055b4)' }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="mb-2 text-lg font-bold text-[#0050a9]">{step.title}</h3>
                <p className="text-sm leading-relaxed text-gray-600">{step.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Deliverables + CTA */}
      <section className="bg-gray-50 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <div>
              <h2 className="mb-4 text-[32px] font-bold text-[#0050a9] lg:text-[42px]">What We Deliver</h2>
              <p className="mb-8 text-lg leading-relaxed text-gray-600">
                Each engagement produces a quality-assured deliverable package, documented and ready to
                integrate into your platforms, pipelines and operations.
              </p>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {capability.deliverables.map((item, i) => (
                  <div key={i} className="flex items-start gap-3 rounded-xl border border-gray-100 bg-white p-4">
                    <div className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-[#0050a9]">
                      <CheckCircle className="h-4 w-4 text-[#00d4ff]" />
                    </div>
                    <span className="font-medium text-[#0050a9]">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl p-8 lg:p-10" style={{ background: 'linear-gradient(120deg, #012f62, #0055b4)' }}>
              <h3 className="mb-3 text-2xl font-bold text-white">
                Interested in {capability.title}?
              </h3>
              <p className="mb-8 text-base leading-relaxed text-white/70">
                Tell us what you are trying to achieve and we will come back with a scoped approach, an
                indicative plan and the team that would deliver it.
              </p>
              <div className="space-y-4">
                <a
                  href="#contact"
                  className="group flex items-center gap-4 rounded-xl border border-white/10 bg-white/10 p-5 transition-colors hover:bg-white/15"
                >
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-[#00d4ff]/20">
                    <Mail className="h-6 w-6 text-[#00d4ff]" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-white">Start a Conversation</h4>
                    <p className="text-sm text-white/60">Send us your requirement</p>
                  </div>
                  <ArrowRight className="h-5 w-5 text-white/40 transition-colors group-hover:text-white/80" />
                </a>
                <Link
                  to="/services"
                  className="group flex items-center gap-4 rounded-xl border border-white/10 bg-white/10 p-5 transition-colors hover:bg-white/15"
                >
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-[#00d4ff]/20">
                    <Compass className="h-6 w-6 text-[#00d4ff]" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-white">Explore All Capabilities</h4>
                    <p className="text-sm text-white/60">See the full JSAN operating model</p>
                  </div>
                  <ArrowRight className="h-5 w-5 text-white/40 transition-colors group-hover:text-white/80" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <div id="contact">
        <ServiceContactForm
          serviceName={capability.title}
          subServices={capabilitiesInGroup(capability.group).map((item) => ({ value: item.title, label: item.title }))}
        />
      </div> */}

      <Footer />
      <MobileNav />
    </div>
  )
}
