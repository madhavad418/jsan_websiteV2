import type { ElementType } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowRight, CheckCircle, Server, ClipboardCheck, Wrench, Zap, Hand, LifeBuoy, ClipboardList, ShieldCheck, Search, Package, Gauge, Thermometer, Flame, RefreshCw, Database, BarChart3, Radio, Headset } from 'lucide-react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import MobileNav from '../../components/MobileNav'
import RelatedSubServices from '../../components/RelatedSubServices'
import ServiceContactForm from '../../components/ServiceContactForm'

interface SubServiceData {
  slug: string
  category: string
  title: string
  subtitle: string
  description: string
  bgImage: string
  advantages: { icon: ElementType; text: string }[]
  idealFor: string[]
  businessImpact: string[]
  deliverables: string[]
}

const subServiceData: SubServiceData[] = [
  {
    slug: 'preventive-maintenance',
    category: 'PREVENTIVE MAINTENANCE',
    title: 'Preventive Maintenance',
    subtitle: 'From Checklist Compliance to Risk Reduction',
    description:
      'Procedure-led preventive maintenance across four levels  scheduled health inspections, MOP-controlled execution, condition-based signals and lifecycle scoring  planning maintenance against risk instead of the calendar alone.',
    bgImage: '/pillars/quality-assurance.jpg',
    advantages: [
      { icon: ClipboardCheck, text: 'Scheduled monthly / quarterly / annual health inspections' },
      { icon: ShieldCheck, text: 'MOP, checklist, safety and photo-evidence controls' },
      { icon: Gauge, text: 'SMART alerts, thermal flags and UPS/PDU condition signals' },
      { icon: BarChart3, text: 'Health scorecards, risk register and refresh planning' },
      { icon: RefreshCw, text: 'Exceptions logged and turned into corrective actions' },
    ],
    idealFor: ['Enterprise data centers', 'Colocation operators', 'Hyperscale & edge sites', 'Telecom infrastructure', 'Facilities & IT ops teams'],
    businessImpact: [
      'Reduced outage exposure through procedure-led PM',
      'Risk-based maintenance instead of calendar-only cycles',
      'Early detection via condition and thermal signals',
      'Auditable evidence for every inspection',
      'Lifecycle risks surfaced before they become incidents',
    ],
    deliverables: [
      'Inspection report',
      'Equipment health scorecard',
      'Exceptions log',
      'Photo evidence pack',
      'Lifecycle risk list',
      'Next maintenance plan',
    ],
  },
  {
    slug: 'corrective-maintenance',
    category: 'CORRECTIVE MAINTENANCE',
    title: 'Corrective Maintenance',
    subtitle: 'Repair as a Controlled Restoration Process',
    description:
      'A governed six-step restoration process  detect, diagnose, plan, repair, validate and improve  across compute, storage, network, power and facilities. No blind action, no undocumented change, no closure without service validation.',
    bgImage: '/pillars/tech-devops.jpg',
    advantages: [
      { icon: Search, text: 'Structured diagnosis  logs, serials, isolation and part need' },
      { icon: Wrench, text: 'MOP-controlled swap, cabling, power and configuration' },
      { icon: CheckCircle, text: 'Health check and customer acceptance before closure' },
      { icon: ShieldCheck, text: 'Evidence capture at every restoration step' },
      { icon: RefreshCw, text: 'RCA/CAPA, recurrence flags and lifecycle actions' },
    ],
    idealFor: ['Enterprise IT estates', 'Multi-vendor / mixed-OEM sites', 'Colocation & hyperscale', 'Edge & telecom operators', 'Critical-infrastructure teams'],
    businessImpact: [
      'Faster recovery through triage, dispatch and spares path',
      'Every change documented and validated',
      'Recurring issues flagged for permanent fixes',
      'Lower human-error exposure',
      'Restoration governed end to end',
    ],
    deliverables: [
      'Incident diagnosis record',
      'MOP / EOP for the repair',
      'Service-validation evidence',
      'Customer acceptance record',
      'RCA/CAPA report',
      'Lifecycle / recurrence flag',
    ],
  },
  {
    slug: 'power-facility',
    category: 'POWER & FACILITY',
    title: 'Power & Facility Support',
    subtitle: 'Connect IT Support with Site Resilience',
    description:
      'Power-chain, thermal and high-density readiness under one service governance model  UPS, batteries, generator coordination, ATS and PDU care, thermal assurance and AI/HPC rack readiness, with electrical safety controls.',
    bgImage: '/pillars/tech-infrastructure.jpg',
    advantages: [
      { icon: Zap, text: 'UPS, battery, generator, ATS and PDU inspection' },
      { icon: Thermometer, text: 'Thermal assurance  airflow, hot spots and environmental monitoring' },
      { icon: Flame, text: 'High-density AI/HPC rack readiness and liquid-cooling partner model' },
      { icon: ShieldCheck, text: 'Electrical safety, permits, PPE and LOTO where applicable' },
      { icon: CheckCircle, text: 'Post-work validation and evidence' },
    ],
    idealFor: ['AI / HPC data centers', 'Colocation & hyperscale', 'Enterprise facilities', 'Edge & telecom sites', 'Facilities engineering teams'],
    businessImpact: [
      'IT support and facilities coordination in one model',
      'Stronger resilience story across the power chain',
      'Readiness for high-density AI/HPC deployments',
      'Reduced thermal and power risk',
      'Safe, validated, evidenced field work',
    ],
    deliverables: [
      'Power-chain inspection report',
      'Thermal / environmental assessment',
      'High-density readiness review',
      'Safety & permit records',
      'Post-work validation evidence',
      'Recommended corrective actions',
    ],
  },
  {
    slug: 'smart-remote-hands',
    category: 'SMART / REMOTE HANDS',
    title: 'Smart / Remote Hands',
    subtitle: 'Premium Support When Your Engineers Can’t Be Onsite',
    description:
      'Your remote eyes, ears and hands onsite  a governed request, approve and execute model for power cycles, patching, media, console and installs, with backout plans, evidence capture and NBD / 4-hour tiering.',
    bgImage: '/pillars/tech-automation.jpg',
    advantages: [
      { icon: Hand, text: 'Approved execution  power cycle, patch, media, console, install' },
      { icon: ShieldCheck, text: 'Risk, maintenance window and backout plan on every task' },
      { icon: Radio, text: 'Bridge coordination with your remote engineers' },
      { icon: CheckCircle, text: 'Standard evidence pack for each intervention' },
      { icon: Gauge, text: 'NBD / 4-hour tiering by site and severity' },
    ],
    idealFor: ['Distributed edge sites', 'Retail & branch estates', 'Colocation tenants', 'Remote / lights-out facilities', 'Central IT teams that can’t travel'],
    businessImpact: [
      'Faster physical remediation without travel',
      'Lower dependency on central engineers on site',
      'Controlled, approved onsite action',
      'Consistent evidence for every task',
      'Coverage across distributed locations',
    ],
    deliverables: [
      'Approved task request & scope',
      'Backout / risk record',
      'Execution evidence pack',
      'Console / photo capture',
      'Closure report',
      'CMDB / asset update',
    ],
  },
  {
    slug: 'asset-lifecycle',
    category: 'ASSET & LIFECYCLE',
    title: 'Asset & Lifecycle Management',
    subtitle: 'Turn Maintenance Events into Infrastructure Decisions',
    description:
      'Identity, condition, lifecycle and control for every asset  CMDB, EOL/EOS, warranty, spares readiness, refresh waves, secure disposal and chain-of-custody  so monthly service data becomes a risk-and-refresh conversation.',
    bgImage: '/pillars/asset-management.jpg',
    advantages: [
      { icon: Database, text: 'Asset identity  tag, serial, rack/U, model, firmware, owner, site' },
      { icon: Gauge, text: 'Condition  health score, incidents, PM exceptions, recurrence' },
      { icon: RefreshCw, text: 'Lifecycle  EOL/EOS, warranty, spares, refresh waves' },
      { icon: ShieldCheck, text: 'Control  CMDB updates, movement records and secure disposal' },
      { icon: BarChart3, text: 'Operational, risk and business KPIs in one view' },
    ],
    idealFor: ['CIOs & infrastructure leaders', 'Enterprise IT asset teams', 'Audit & compliance teams', 'Colocation & hyperscale', 'Vendor-consolidation programs'],
    businessImpact: [
      'Service data becomes a lifecycle decision conversation',
      'Visible EOL/EOS, warranty and spare gaps',
      'Refresh and audit readiness',
      'Vendor consolidation and lifecycle savings',
      'Chain-of-custody for secure disposal',
    ],
    deliverables: [
      'CMDB / asset register',
      'Equipment health & condition data',
      'EOL/EOS & warranty exposure report',
      'Refresh-wave recommendation',
      'KPI dashboard (ops / risk / business)',
      'Secure-disposal & chain-of-custody records',
    ],
  },
  {
    slug: 'disaster-recovery',
    category: 'DISASTER RECOVERY',
    title: 'Disaster Recovery Support',
    subtitle: 'Coordinated Field Action for Critical Incidents',
    description:
      'When power, compute and network incidents need coordinated site action  P1 command bridges, controlled dispatch, a defined spares path and OEM/partner escalation to restore service to its agreed state.',
    bgImage: '/pillars/tech-cybersecurity.jpg',
    advantages: [
      { icon: LifeBuoy, text: 'P1 command bridge and critical-incident coordination' },
      { icon: Wrench, text: 'Controlled dispatch and approved onsite execution' },
      { icon: Package, text: 'Defined spares path for rapid replacement' },
      { icon: Headset, text: 'OEM / partner escalation retaining service governance' },
      { icon: CheckCircle, text: 'Restoration to the agreed state with evidence' },
    ],
    idealFor: ['Mission-critical facilities', 'Telecom & edge operators', 'Financial & regulated estates', 'Colocation & hyperscale', 'Business-continuity teams'],
    businessImpact: [
      'Coordinated response across power, compute and network',
      'Faster restoration during critical incidents',
      'One accountable command model across vendors',
      'Evidence-based recovery and closure',
      'Stronger field-execution control under pressure',
    ],
    deliverables: [
      'P1 bridge & incident timeline',
      'Dispatch & execution record',
      'Spares / replacement evidence',
      'Restoration validation',
      'RCA/CAPA report',
      'Improvement / prevention actions',
    ],
  },
  {
    slug: 'governance-reporting',
    category: 'GOVERNANCE & REPORTING',
    title: 'Governance & Reporting',
    subtitle: 'The Integrated Control Layer',
    description:
      'Service health, risk and improvement visible every month  service desk, NOC, ticketing, MOP/EOP, CMDB, dashboards and a review cadence from daily incident bridges to quarterly business reviews, with RCA/CAPA and a live risk register.',
    bgImage: '/pillars/tech-analytics.jpg',
    advantages: [
      { icon: BarChart3, text: 'SLA scorecards, dashboards and monthly service reviews' },
      { icon: ClipboardList, text: 'Ticketing, MOP/EOP and CMDB discipline' },
      { icon: ShieldCheck, text: 'RCA/CAPA and a live risk register' },
      { icon: RefreshCw, text: 'Cadence  daily, weekly, monthly and quarterly reviews' },
      { icon: Search, text: 'Recurring-issue analysis and improvement roadmap' },
    ],
    idealFor: ['Executive & IT leadership', 'Service-management offices', 'Audit & compliance teams', 'Multi-site estates', 'Vendor-governance programs'],
    businessImpact: [
      'One view of SLA, assets, recurring issues and lifecycle risk',
      'Evidence-based trust across every intervention',
      'Continuous improvement, not backward-looking reports',
      'Governed breadth across all service towers',
      'Commercial and estate tuning at QBRs',
    ],
    deliverables: [
      'SLA scorecard',
      'Monthly service review pack',
      'RCA/CAPA log',
      'Risk register',
      'Escalation matrix',
      'Improvement roadmap',
    ],
  },
]

const titleCase = (s: string) => s.split(' ').map((w) => (w.length <= 3 ? w : w.charAt(0) + w.slice(1).toLowerCase())).join(' ')

export default function DataCenterSubService() {
  const { slug } = useParams<{ slug: string }>()
  const service = subServiceData.find((s) => s.slug === slug)

  if (!service) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Service Not Found</h1>
          <Link to="/services/data-center-lifecycle" className="text-[#0050a9] hover:underline">
            &larr; Back to Data Center Lifecycle &amp; Field Support
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden pt-28 lg:pt-36 pb-20 lg:pb-28" style={{ marginTop: '44px' }}>
        <div className="absolute inset-0">
          <img src={service.bgImage} alt={service.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
        </div>

        <div className="absolute top-0 left-0 right-0 bg-black/20 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link to="/services" className="text-white/70 hover:text-white transition-colors">Services</Link>
              <span className="text-white/50">/</span>
              <Link to="/services/data-center-lifecycle" className="text-white/70 hover:text-white transition-colors">Data Center Lifecycle</Link>
              <span className="text-white/50">/</span>
              <span className="text-white/90 font-medium">{titleCase(service.category)}</span>
            </div>
            <span className="hidden sm:inline-flex items-center gap-2 bg-white/10 text-[#00d4ff] px-3 py-1 rounded-full text-sm font-semibold">
              <Server className="w-4 h-4" />
              {service.category}
            </span>
          </div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <h1 className="text-white text-[36px] md:text-[48px] lg:text-[56px] font-bold leading-[1.1] mb-4 tracking-tight">
            {service.title}
          </h1>
          <p className="text-white/85 text-lg md:text-xl lg:text-2xl leading-relaxed mb-6">
            {service.subtitle}
          </p>
        </div>
      </section>

      {/* Detail Section */}
      <section className="py-20" style={{ background: 'linear-gradient(120deg, #012f62, #0055b4)' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="text-[36px] lg:text-[44px] font-bold text-white mb-4 leading-tight">
                Why {titleCase(service.category)}?
              </h2>
              <p className="text-white/75 text-lg leading-relaxed mb-8">
                {service.description}
              </p>

              <div className="space-y-3 mb-10">
                {service.advantages.map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-5 h-5 text-[#00d4ff]" />
                    </div>
                    <span className="text-white/90">{item.text}</span>
                  </div>
                ))}
              </div>

              <a href="/contact" className="btn-primary">
                Discuss Your Project
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </div>

            <div className="space-y-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                <h3 className="text-xl font-bold text-white mb-5">Ideal For</h3>
                <div className="flex flex-wrap gap-3">
                  {service.idealFor.map((item, i) => (
                    <span key={i} className="bg-white/10 text-white/90 px-4 py-2 rounded-full text-sm font-medium border border-white/10">
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                <h3 className="text-xl font-bold text-white mb-5">Business Impact</h3>
                <div className="space-y-3">
                  {service.businessImpact.map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-[#00d4ff] flex-shrink-0" />
                      <span className="text-white/90">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Deliver + CTA */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-[36px] lg:text-[42px] font-bold text-[#0050a9] mb-4">
                What We Deliver
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                Every engagement produces a governed, evidence-backed deliverable package, ready for your service reviews and audits.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {service.deliverables.map((item, i) => (
                  <div key={i} className="flex items-start gap-3 bg-white rounded-xl p-4 border border-gray-100">
                    <div className="w-8 h-8 bg-[#0050a9] rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle className="w-4 h-4 text-[#00d4ff]" />
                    </div>
                    <span className="text-[#0050a9] font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl p-8 lg:p-10" style={{ background: 'linear-gradient(120deg, #012f62, #0055b4)' }}>
              <h3 className="text-2xl font-bold text-white mb-3">
                Interested in {titleCase(service.category)}?
              </h3>
              <p className="text-white/70 text-base leading-relaxed mb-8">
                Talk to our team about SLA clocks, coverage, spares strategy, evidence and governance for your estate.
              </p>
              <div className="space-y-4">
                <a
                  href="/contact"
                  className="flex items-center gap-4 bg-white/10 hover:bg-white/15 border border-white/10 rounded-xl p-5 transition-colors group"
                >
                  <div className="w-12 h-12 bg-[#00d4ff]/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Headset className="w-6 h-6 text-[#00d4ff]" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-white font-semibold">Get in Touch</h4>
                    <p className="text-white/60 text-sm">Discuss your infrastructure operations</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-white/40 group-hover:text-white/80 transition-colors" />
                </a>
                <Link
                  to="/services/data-center-lifecycle"
                  className="flex items-center gap-4 bg-white/10 hover:bg-white/15 border border-white/10 rounded-xl p-5 transition-colors group"
                >
                  <div className="w-12 h-12 bg-[#00d4ff]/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Server className="w-6 h-6 text-[#00d4ff]" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-white font-semibold">Back to Data Center Lifecycle</h4>
                    <p className="text-white/60 text-sm">See the full operating model</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-white/40 group-hover:text-white/80 transition-colors" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <RelatedSubServices
        items={subServiceData}
        basePath="/services/data-center-lifecycle"
        currentSlug={service.slug}
        parentName="Data Center Lifecycle"
      />

      <div id="contact">
        <ServiceContactForm
          serviceName={service.title}
          subServices={subServiceData.map((item) => ({ value: item.title, label: item.title }))}
        />
      </div>

      <Footer />
      <MobileNav />
    </div>
  )
}
