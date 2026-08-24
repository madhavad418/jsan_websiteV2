import { Car, Users, CalendarClock, Navigation, Wrench, ShieldCheck, ClipboardCheck, BadgeCheck, LifeBuoy, TrendingUp, Fuel, CheckCircle, Truck, Globe, GraduationCap } from 'lucide-react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import MobileNav from '../../components/MobileNav'
import QualityGates from '../../components/QualityGates'
import RoadmapTimeline from '../../components/RoadmapTimeline'
import ProcessFlow from '../../components/ProcessFlow'
// import ServiceContactForm from '../../components/ServiceContactForm'
import CapabilityShowcase from '../../components/CapabilityShowcase'
import ServiceHeroV2 from '../../components/ServiceHeroV2'

/* What the operation covers */
const capabilities = [
  {
    category: 'FLEET MOBILISATION',
    cardTitle: 'Fleet Mobilisation & Readiness',
    title: 'Vehicles, sensors and kit, ready to drive',
    description:
      'Sourcing, leasing, fitting and commissioning of capture vehicles, from camera and LiDAR rig installation to power, storage and connectivity, so every unit leaves the depot to a known configuration.',
    icon: Car,
    bgImage: '/services/fleet/fleet-mobilisation.jpg',
    highlights: ['Vehicle Sourcing', 'Rig Installation', 'Configuration Baseline', 'Depot Setup'],
  },
  {
    category: 'CREW OPERATIONS',
    cardTitle: 'Driver & Field Crew Operations',
    title: 'Local crews, recruited, trained and supervised',
    description:
      'End-to-end crew management in each country, covering recruitment, licensing checks, capture and safety training, supervision, payroll support and retention, backed by JSAN recruitment teams already operating across regions.',
    icon: Users,
    bgImage: '/services/fleet/field-crew-operations.jpg',
    highlights: ['Local Recruitment', 'Certification Checks', 'Capture Training', 'Field Supervision'],
  },
  {
    category: 'PLANNING & DISPATCH',
    cardTitle: 'Route, Shift & Coverage Scheduling',
    title: 'The right vehicle on the right road at the right hour',
    description:
      'Daily drive plans built from coverage targets, traffic and light conditions, access restrictions and weather, with shift rosters, dispatch and re-drive scheduling that keep productive kilometres high.',
    icon: CalendarClock,
    bgImage: '/services/fleet/route-shift-scheduling.jpg',
    highlights: ['Drive Planning', 'Shift Rosters', 'Dispatch', 'Re-Drive Queues'],
  },
  {
    category: 'TRACKING & TELEMATICS',
    cardTitle: 'Live Tracking & Fleet Telematics',
    title: 'Every vehicle visible, every run accounted for',
    description:
      'Real-time vehicle tracking, route adherence, speed and idle monitoring, session playback and productivity reporting, run on JSAN VTS, our own vehicle tracking and driver management platform.',
    icon: Navigation,
    bgImage: '/services/fleet/live-tracking-telematics.jpg',
    highlights: ['Live Vehicle Map', 'Route Adherence', 'Session Playback', 'Productivity Reporting'],
    customHref: '/products/jsan-vts',
  },
  {
    category: 'MAINTENANCE',
    cardTitle: 'Vehicle & Sensor Maintenance',
    title: 'Uptime is the whole business',
    description:
      'Preventive servicing schedules, sensor calibration cycles, spares pooling, fault triage and rapid swap-out, so a failed camera or GNSS unit costs hours of capture time rather than days.',
    icon: Wrench,
    bgImage: '/services/fleet/vehicle-sensor-maintenance.jpg',
    highlights: ['Preventive Servicing', 'Sensor Calibration', 'Spares Pool', 'Rapid Swap-Out'],
  },
  {
    category: 'SAFETY & COMPLIANCE',
    cardTitle: 'Safety, Permits & Compliance',
    title: 'Legal to drive, safe to operate',
    description:
      'Permits and road authority permissions, insurance, driver safety briefings, incident reporting and escalation, plus local regulatory and data-handling compliance in every country of operation.',
    icon: ShieldCheck,
    bgImage: '/services/fleet/safety-permits-compliance.jpg',
    highlights: ['Permits & Permissions', 'Insurance & Legal', 'Safety Briefings', 'Incident Reporting'],
  },
]

/* Operating model */
const operatingModel = [
  { icon: Globe, title: 'Set up', desc: 'Country entry, permits, depot, vehicles, insurance and local crew hiring.' },
  { icon: GraduationCap, title: 'Train', desc: 'Capture procedure, equipment handling, safety and escalation drills.' },
  { icon: CalendarClock, title: 'Plan', desc: 'Coverage targets converted into daily drive plans and shift rosters.' },
  { icon: Truck, title: 'Operate', desc: 'Dispatch, live tracking, in-run checks and same-day data handover.' },
  { icon: LifeBuoy, title: 'Support', desc: 'Breakdown response, spares, re-drives and crew welfare on the road.' },
  { icon: TrendingUp, title: 'Optimise', desc: 'Productivity, cost per kilometre and coverage reporting against targets.' },
]

/* Operational control gates */
const gates = [
  { g: 'G1', icon: BadgeCheck, title: 'Vehicle readiness', desc: 'Roadworthiness, rig configuration, calibration status and connectivity verified.' },
  { g: 'G2', icon: GraduationCap, title: 'Crew certification', desc: 'Licences, safety training and capture procedure sign-off before first shift.' },
  { g: 'G3', icon: ClipboardCheck, title: 'Daily run compliance', desc: 'Planned route driven, in-run checks completed, deviations logged with reason.' },
  { g: 'G4', icon: Fuel, title: 'Productivity review', desc: 'Kilometres captured, idle time, fuel and cost per productive kilometre.' },
  { g: 'G5', icon: LifeBuoy, title: 'Safety & incident', desc: 'Incidents reported, investigated and closed with corrective action.' },
  { g: 'G6', icon: CheckCircle, title: 'Programme reporting', desc: 'Coverage, uptime and SLA performance reviewed with the customer.' },
]

/* Engagement path */
const roadmap = [
  { n: '01', title: 'Assess', desc: 'Countries, coverage targets, fleet size, legal footprint and cost model.', exit: 'Operating plan + budget model' },
  { n: '02', title: 'Establish', desc: 'Entity and permit setup, vehicle procurement, depot, insurance and hiring.', exit: 'Compliant, equipped operation' },
  { n: '03', title: 'Pilot', desc: 'Limited fleet running live shifts with tracked productivity and quality.', exit: 'Proven daily operating rhythm' },
  { n: '04', title: 'Scale', desc: 'Additional vehicles, crews and cities added against the same procedures.', exit: 'Fleet at target capacity' },
  { n: '05', title: 'Sustain', desc: 'Maintenance cycles, crew retention, cost optimisation and refresh campaigns.', exit: 'Steady-state managed operation' },
]

/* Where it applies */
const applications = [
  'Street imagery and mapping capture campaigns',
  'Utility and telecom field survey programmes',
  'Address, POI and door-to-door verification drives',
  'Mobile LiDAR and HD map collection runs',
  'Asset inspection and condition survey fleets',
  'Recurring refresh campaigns across multiple countries',
]

const opsStack = ['JSAN VTS', 'GPS Telematics', 'Mobile Capture Apps', 'Shift & Roster Planning', 'Maintenance Tracking', 'Incident Reporting', 'Cost per Km Analytics', 'Depot & Spares Management']

/* Hero (v2 layout, under evaluation on this page only) */
const heroMetrics = [
  { value: '1,000+', label: 'Field Experts' },
  { value: '20+', label: 'Countries' },
  { value: 'GPS', label: 'Live Tracking' },
]
/* Stats from the previous hero, kept for reference while the v2 hero is on trial.
   The v2 hero shows at most three, see heroMetrics above.
const stats = [
  { value: '1,000+', label: 'Field Experts' },
  { value: '20+', label: 'Countries' },
  { value: '35+', label: 'Fleet Management Team' },
  { value: 'GPS', label: 'Live Fleet Tracking' },
]
*/

export default function GlobalFleetCollectionOperations() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero */}
      <ServiceHeroV2
        breadcrumb="Global Fleet & Collection Operations"
        eyebrow="Core Service"
        eyebrowIcon={Truck}
        title="Global Fleet & Collection Operations"
        tagline="The field operation behind every kilometre of reliable data."
        description="Deploy and manage vehicles, crews, sensors and collection programs across markets with centralized operational visibility."
        primaryCta={{ label: 'Talk to Our Team', href: '/contact' }}
        secondaryCta={{ label: 'Explore capabilities', href: '#capabilities' }}
        metrics={heroMetrics}
        heroImage="/images/services/global-fleet-hero.webp"
        fallbackImage="/pillars/fleet.png"
        heroImageAlt="JSAN collection vehicles and field crew preparing sensor rigs before a drive"
        heroPositionDesktop="65% center"
        heroPositionTablet="60% center"
        heroPositionMobile="center center"
      />

      {/* Capabilities */}
      <section id="capabilities" className="bg-gray-50 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12 md:mb-14">
            <span className="inline-block text-[#00d4ff] font-bold text-xs md:text-sm uppercase tracking-widest mb-3">What We Run</span>
            <h2 className="text-[28px] md:text-[36px] lg:text-[42px] font-bold mb-4 text-gradient">
              A Complete Collection Operation, Managed for You
            </h2>
            <p className="text-gray-600 text-base md:text-lg max-w-3xl mx-auto">
              Six operational functions that keep vehicles on the road, crews productive and data arriving on schedule, in every country of the programme.
            </p>
          </div>

                    <CapabilityShowcase items={capabilities} />
        </div>
      </section>

      {/* Operating model */}
      <section className="py-20" style={{ background: 'linear-gradient(120deg, #012f62, #0055b4)' }}>
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-14">
            <span className="inline-block text-[#00d4ff] font-bold text-xs md:text-sm uppercase tracking-widest mb-3">Operating Model</span>
            <h2 className="text-[28px] md:text-[36px] lg:text-[42px] font-bold text-white mb-4">
              A Six-Stage Fleet Operating Model
            </h2>
            <p className="text-white/70 text-base md:text-lg max-w-3xl mx-auto">
              From country setup to steady-state productivity, run on one operating rhythm and configured per geography, fleet size and capture type.
            </p>
          </div>

          <ProcessFlow steps={operatingModel} />

          <p className="text-white/60 text-sm md:text-base text-center max-w-3xl mx-auto mt-12">
            <span className="text-white font-semibold">Design principle:</span> every shift ends with a tracked route, a verified data handover and a known vehicle state, so tomorrow's plan starts from fact.
          </p>
        </div>
      </section>

      {/* Control gates */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12 md:mb-14">
            <span className="inline-block text-[#00d4ff] font-bold text-xs md:text-sm uppercase tracking-widest mb-3">Control &amp; Governance</span>
            <h2 className="text-[28px] md:text-[36px] lg:text-[42px] font-bold mb-4 text-gradient">
              Gate-Based Control, From Depot to Report
            </h2>
            <p className="text-gray-600 text-base md:text-lg max-w-3xl mx-auto">
              Six operational checkpoints govern readiness, daily discipline, safety and reported performance.
            </p>
          </div>

          <QualityGates gates={gates} />

          <div className="mt-8 rounded-xl bg-[#eef5ff] border border-blue-100 p-6 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-[#0050a9] shrink-0 mt-0.5" />
            <p className="text-gray-600 text-sm leading-relaxed">
              Readiness, safety and productivity are owned separately by depot supervisors, field managers and programme management, so a problem on one vehicle is visible before it becomes a coverage shortfall.
            </p>
          </div>
        </div>
      </section>

      {/* Applications & ops stack */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
            <div>
              <span className="inline-block text-[#00d4ff] font-bold text-xs md:text-sm uppercase tracking-widest mb-3">Where It Applies</span>
              <h2 className="text-[28px] md:text-[36px] font-bold mb-4 text-gradient">
                The Engine Behind Field Data Programmes
              </h2>
              <p className="text-gray-600 text-base md:text-lg mb-6">
                Fleet operations sit underneath every collection programme JSAN delivers, whether the payload is street imagery, utility assets, addresses or LiDAR.
              </p>
              <div className="space-y-3">
                {applications.map((a, i) => (
                  <div key={i} className="flex items-start gap-3 bg-white rounded-xl border border-gray-100 shadow-sm p-4">
                    <CheckCircle className="w-5 h-5 text-[#0050a9] shrink-0 mt-0.5" />
                    <p className="text-gray-600 text-sm leading-relaxed">{a}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:pt-2">
              <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-100">
                <img src="/pillars/globalfleet.png" alt="Collection fleet on the road" className="w-full h-64 md:h-80 object-cover" />
              </div>

              <div className="mt-8 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-[#0050a9] flex items-center justify-center">
                    <Navigation className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-[#0050a9] font-bold text-lg">Operations Stack</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {opsStack.map((t, i) => (
                    <span key={i} className="bg-blue-50 text-[#0050a9] text-xs px-3 py-1.5 rounded-full border border-blue-100">{t}</span>
                  ))}
                </div>
              </div>

              <div className="mt-6 rounded-2xl p-6 text-white" style={{ background: 'linear-gradient(120deg, #012f62, #0055b4)' }}>
                <div className="flex items-start gap-3">
                  <Globe className="w-5 h-5 text-[#00d4ff] shrink-0 mt-0.5" />
                  <p className="text-white/80 text-sm leading-relaxed">
                    Operations can run as a fully managed fleet under JSAN, as crews and supervision embedded in your existing fleet, or as a hybrid where you own the vehicles and we run the daily operation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Engagement path */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12 md:mb-14">
            <span className="inline-block text-[#00d4ff] font-bold text-xs md:text-sm uppercase tracking-widest mb-3">Engagement</span>
            <h2 className="text-[28px] md:text-[36px] lg:text-[42px] font-bold mb-4 text-gradient">
              Stand Up One Fleet, Then Replicate It
            </h2>
            <p className="text-gray-600 text-base md:text-lg max-w-3xl mx-auto">
              The first country proves the operating rhythm and unit economics, and every country after it follows the same playbook.
            </p>
          </div>

          <RoadmapTimeline steps={roadmap} />
        </div>
      </section>

      {/* Contact Form */}
      {/* <div id="contact">
        <ServiceContactForm
          serviceName="Global Fleet"
          subServices={capabilities.map((c) => ({ value: c.cardTitle, label: c.cardTitle }))}
        />
      </div> */}

      <Footer />
      <MobileNav />
    </div>
  )
}
