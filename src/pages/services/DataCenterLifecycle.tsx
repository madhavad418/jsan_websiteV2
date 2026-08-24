import { Server, ClipboardCheck, Wrench, Zap, Hand, Boxes, LifeBuoy, ClipboardList, ShieldCheck, Radio, Headset, Search, Package } from 'lucide-react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import MobileNav from '../../components/MobileNav'
import ProcessFlow from '../../components/ProcessFlow'
import CapabilityShowcase from '../../components/CapabilityShowcase'
import ServiceHero from '../../components/ServiceHero'

/* Seven service towers */
const towers = [
  {
    slug: 'preventive-maintenance',
    category: 'PREVENTIVE MAINTENANCE',
    cardTitle: 'Preventive Maintenance',
    title: 'From checklist compliance to risk reduction',
    description:
      'Procedure-led PM from scheduled inspections to condition-based signals MOP checklists, health scorecards, exceptions logs and photo evidence that reduce risk instead of just ticking boxes.',
    icon: ClipboardCheck,
    bgImage: '/pillars/checklist.png',
    highlights: ['Scheduled Inspections', 'MOP & Checklists', 'Condition Signals', 'Health Scorecards'],
  },
  {
    slug: 'corrective-maintenance',
    category: 'CORRECTIVE MAINTENANCE',
    cardTitle: 'Corrective Maintenance',
    title: 'Repair as a controlled restoration process',
    description:
      'Detect, diagnose, plan, repair, validate and improve across compute, storage, network, power and facilities. No blind action, no undocumented change, and no closure without service validation.',
    icon: Wrench,
    bgImage: '/pillars/corrective.png',
    highlights: ['Triage & Diagnosis', 'MOP-Controlled Repair', 'Service Validation', 'RCA / CAPA'],
  },
  {
    slug: 'power-facility',
    category: 'POWER & FACILITY',
    cardTitle: 'Power & Facility Support',
    title: 'Connect IT support with site resilience',
    description:
      'UPS, battery, generator, ATS and PDU care, thermal assurance, high-density AI/HPC readiness and electrical safety controls IT hardware support and facilities coordination under one governance model.',
    icon: Zap,
    bgImage: '/pillars/tech-infrastructure.jpg',
    highlights: ['Power Chain', 'Thermal Assurance', 'High-Density / AI-HPC', 'Safety & LOTO'],
  },
  {
    slug: 'smart-remote-hands',
    category: 'SMART / REMOTE HANDS',
    cardTitle: 'Smart / Remote Hands',
    title: 'Premium support when your engineers can’t be onsite',
    description:
      'Your remote eyes, ears and hands onsite approved, evidence-captured execution of power cycles, patching, media, console and installs, with backout plans and NBD / 4-hour tiering.',
    icon: Hand,
    bgImage: '/pillars/smartremote.png',
    highlights: ['Approved Execution', 'Backout Plans', 'Evidence Capture', 'NBD / 4H Tiering'],
  },
  {
    slug: 'asset-lifecycle',
    category: 'ASSET & LIFECYCLE',
    cardTitle: 'Asset & Lifecycle Management',
    title: 'Turn maintenance events into infrastructure decisions',
    description:
      'Identity, condition, lifecycle and control CMDB, EOL/EOS, warranty, spares readiness, refresh waves, secure disposal and chain-of-custody. Monthly service data becomes a risk-and-refresh conversation.',
    icon: Boxes,
    bgImage: '/pillars/assetlifecycle.png',
    highlights: ['CMDB & Asset Identity', 'EOL/EOS & Warranty', 'Refresh Planning', 'Secure Disposal'],
  },
  {
    slug: 'disaster-recovery',
    category: 'DISASTER RECOVERY',
    cardTitle: 'Disaster Recovery Support',
    title: 'Coordinated field action for critical incidents',
    description:
      'P1 command bridges, controlled dispatch, a defined spares path and OEM/partner escalation to restore service to its agreed state coordinated site action across power, compute and network.',
    icon: LifeBuoy,
    bgImage: '/pillars/tech-cybersecurity.jpg',
    highlights: ['P1 Command Bridge', 'Controlled Dispatch', 'Spares Path', 'OEM / Partner Escalation'],
  },
  {
    slug: 'governance-reporting',
    category: 'GOVERNANCE & REPORTING',
    cardTitle: 'Governance & Reporting',
    title: 'The integrated control layer',
    description:
      'Service desk, NOC, ticketing, MOP/EOP, CMDB, dashboards, SLA logic and review cadence with RCA/CAPA and a live risk register because breadth matters only when it is governed.',
    icon: ClipboardList,
    bgImage: '/pillars/tech-analytics.jpg',
    highlights: ['SLA Scorecards', 'Dashboards', 'Review Cadence', 'Risk Register'],
  },
]

/* Operating model  single front door to evidence closure */
const operatingModel = [
  { icon: Radio, title: 'Alert Intake', desc: 'Customer or monitoring alert  request, severity, site, asset, access and contract.' },
  { icon: Headset, title: 'Service Desk / NOC', desc: 'Intake, triage, communication and escalation.' },
  { icon: Search, title: 'Remote SME (L2–L3)', desc: 'Diagnosis, vendor coordination and the restoration decision.' },
  { icon: Wrench, title: 'Field Engineer / Smart Hands', desc: 'Approved onsite execution and evidence capture.' },
  { icon: Package, title: 'Spares & Logistics', desc: 'Part availability, movement, return and replenishment.' },
  { icon: ShieldCheck, title: 'Service Delivery Manager', desc: 'SLA, governance, RCA/CAPA and the risk register.' },
]

/* SLA clocks */
const slaStages = [
  { title: 'Acknowledge', desc: 'Ticket accepted and severity assigned.' },
  { title: 'Remote response', desc: 'Qualified engineer starts triage.' },
  { title: 'Dispatch', desc: 'Engineer assigned and mobilized.' },
  { title: 'Onsite arrival', desc: 'Engineer reaches the authorized site.' },
  { title: 'Replacement', desc: 'Spare installed or replacement initiated.' },
  { title: 'Restoration', desc: 'Service returned to the agreed state.' },
  { title: 'Resolution', desc: 'Permanent fix with RCA/CAPA closed.' },
]

/* 90-day transition */
const transition = [
  { range: 'Day 0–15', title: 'Discover', desc: 'Contract/SLA review, site list, asset register, access and OEM coverage.' },
  { range: 'Day 16–30', title: 'Design', desc: 'Service model, RACI, SLA clocks, MOP templates, spares model and reporting pack.' },
  { range: 'Day 31–60', title: 'Mobilize', desc: 'Engineer/partner onboarding, training, CMDB load, spares audit and governance calendar.' },
  { range: 'Day 61–90', title: 'Stabilize', desc: 'Dry runs, pilot sites, first PM cycle, ticket review and first service review.' },
]

export default function DataCenterLifecycle() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero */}
      <ServiceHero
        breadcrumb={"Data Center Lifecycle & Field Support"}
        eyebrow={"Core Service"}
        eyebrowIcon={Server}
        title={"Data Center Lifecycle & Field Support"}
        subtitle={"Controlled uptime outcomes - not break-fix tasks."}
        description={"A single accountable service layer for enterprise, hyperscale, edge and telecom infrastructure SLA definitions, controlled dispatch, evidence and governance across mixed OEM estates."}
        image="/pillars/cloud-infrastructure.jpg"
        imageAlt="Data center lifecycle and field support"
        stats={[{ value: 'Prevent' }, { value: 'Diagnose' }, { value: 'Restore' }, { value: 'Control' }]}
      />

      {/* Seven service towers */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12 md:mb-14">
            <span className="inline-block text-[#00d4ff] font-bold text-xs md:text-sm uppercase tracking-widest mb-3">Service Architecture</span>
            <h2 className="text-[28px] md:text-[36px] lg:text-[42px] font-bold mb-4 text-gradient">
              Seven Towers, One Integrated Lifecycle
            </h2>
            <p className="text-gray-600 text-base md:text-lg max-w-3xl mx-auto">
              Breadth matters only when it is governed every tower runs on one control plane of service desk, NOC, ticketing, MOP/EOP, CMDB, spares and review cadence.
            </p>
          </div>

                    <CapabilityShowcase items={towers} basePath="/services/data-center-lifecycle" />
        </div>
      </section>

      {/* Operating model */}
      <section className="py-20" style={{ background: 'linear-gradient(120deg, #012f62, #0055b4)' }}>
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-14">
            <span className="inline-block text-[#00d4ff] font-bold text-xs md:text-sm uppercase tracking-widest mb-3">Operating Model</span>
            <h2 className="text-[28px] md:text-[36px] lg:text-[42px] font-bold text-white mb-4">
              Single Front Door to Evidence Closure
            </h2>
            <p className="text-white/70 text-base md:text-lg max-w-3xl mx-auto">
              Remote diagnosis, controlled dispatch and evidence-based closure  one accountable command model across vendors, OEMs, remote hands and spares.
            </p>
          </div>

          <ProcessFlow steps={operatingModel} />

          <p className="text-white/60 text-sm md:text-base text-center max-w-3xl mx-auto mt-12">
            <span className="text-white font-semibold">Managed-service principle:</span> every field intervention leaves a digital trail  request, approval, MOP/EOP, evidence, asset update, closure and improvement action.
          </p>
        </div>
      </section>

      {/* SLA framework */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12 md:mb-14">
            <span className="inline-block text-[#00d4ff] font-bold text-xs md:text-sm uppercase tracking-widest mb-3">SLA Framework</span>
            <h2 className="text-[28px] md:text-[36px] lg:text-[42px] font-bold mb-4 text-gradient">
              Define the Clock Before Committing to the Clock
            </h2>
            <p className="text-gray-600 text-base md:text-lg max-w-3xl mx-auto">
              A "4-hour" SLA can mean response, dispatch, arrival, replacement or restoration. We define every clock explicitly.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {slaStages.map((s, i) => (
              <div key={i} className="relative bg-gray-50 border border-gray-100 rounded-2xl p-5 h-full">
                <div className="w-9 h-9 rounded-full bg-[#0050a9] text-white text-xs font-bold flex items-center justify-center mb-3">{String(i + 1).padStart(2, '0')}</div>
                <h3 className="text-[#0050a9] font-bold mb-1.5">{s.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-xl bg-[#eef5ff] border border-blue-100 p-6 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-[#0050a9] shrink-0 mt-0.5" />
            <p className="text-gray-600 text-sm leading-relaxed">
              A four-hour commitment is credible only when site access, service zone, skill availability, part availability, security approval and SLA-clock rules are validated  confirmed through a site-by-site readiness assessment.
            </p>
          </div>
        </div>
      </section>

      {/* 90-day transition */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12 md:mb-14">
            <span className="inline-block text-[#00d4ff] font-bold text-xs md:text-sm uppercase tracking-widest mb-3">Transition</span>
            <h2 className="text-[28px] md:text-[36px] lg:text-[42px] font-bold mb-4 text-gradient">
              90 Days from Signature to Controlled Readiness
            </h2>
            <p className="text-gray-600 text-base md:text-lg max-w-3xl mx-auto">
              Validate SLA clocks, access, evidence, spares and governance on a few representative sites before broad rollout.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {transition.map((phase, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 h-full">
                <span className="inline-block text-[#00d4ff] text-xs font-bold tracking-wider mb-2">{phase.range}</span>
                <h3 className="text-[#0050a9] text-lg font-bold mb-2">{phase.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{phase.desc}</p>
              </div>
            ))}
          </div>

          <div className="rounded-2xl p-6 md:p-8 text-white" style={{ background: 'linear-gradient(120deg, #012f62, #0055b4)' }}>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-full bg-[#00d4ff] text-[#012f62] text-xs font-bold flex items-center justify-center">GO</div>
              <h3 className="text-white text-lg font-bold">Go-live readiness</h3>
            </div>
            <p className="text-white/75 text-sm md:text-base leading-relaxed">
              Validated asset baseline, an agreed SLA matrix, approved site access, a spares strategy in place, a tested escalation tree and a signed-off reporting pack  begin with 2–3 representative sites, then scale.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      {/* <div id="contact">
        <ServiceContactForm
          serviceName="Data Center Lifecycle & Field Support"
          subServices={towers.map((t) => ({ value: t.cardTitle, label: t.cardTitle }))}
        />
      </div> */}

      <Footer />
      <MobileNav />
    </div>
  )
}
