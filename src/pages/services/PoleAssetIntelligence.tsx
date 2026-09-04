import { Antenna, Ruler, Scale, Wrench, ClipboardList, Handshake, MapPin, Camera, Calculator, PenTool, FileCheck2, Send, CheckCircle, Gauge } from 'lucide-react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import MobileNav from '../../components/MobileNav'
import ServiceHero from '../../components/ServiceHero'
import CapabilityModules from '../../components/CapabilityModules'
import ProcessFlow from '../../components/ProcessFlow'
import QualityGates from '../../components/QualityGates'
import { allocationStats, serviceSplit } from '../../config/countAllocations'

/**
 * /services/pole-asset-intelligence
 *
 * The "Pole & Asset Intelligence" nav item under Telecom & Infrastructure used to point at
 * /services/utility-network-intelligence, whose content is network mapping rather than pole
 * work  the same subject as the Utilities Mapping item sitting two rows below it. This page
 * gives the label its own subject: the pole as a piece of infrastructure that has to carry
 * attachments safely, and the joint-use process that decides whether it can carry one more.
 *
 * The boundary with /services/utility-network-intelligence ("Utilities Mapping") is
 * deliberate: that page maps and models the network, this one engineers the structure.
 */

/* What we deliver on the pole itself */
const modules = [
  {
    name: 'Pole inventory & identification',
    description:
      'Every pole located to survey grade and given a durable identity: tag or asset ID, owner, material, class, height, set depth and framing, photographed from the road.',
    icon: MapPin,
  },
  {
    name: 'Attachment audit',
    description:
      'Everything on the pole recorded by owner, type and height: power conductors, transformers, telecom and CATV strands, risers, drops, streetlights and unidentified attachments.',
    icon: Antenna,
  },
  {
    name: 'Height & clearance measurement',
    description:
      'Attachment heights, mid-span sag and ground clearance measured against road, rail, driveway and communication-worker safety-zone requirements, with violations flagged per span.',
    icon: Ruler,
  },
  {
    name: 'Structural load analysis',
    description:
      'Pole loading modelled under wind and ice against the governing standard, so a new attachment is approved, conditioned or rejected on calculated capacity rather than on judgement.',
    icon: Scale,
  },
  {
    name: 'Make-ready engineering',
    description:
      'Where a pole fails, the specific remedy: rearrange, transfer, guy or replace, scoped and costed per pole so a build programme can budget before it applies for access.',
    icon: Wrench,
  },
  {
    name: 'Joint-use records & billing support',
    description:
      'Attachment inventories reconciled against joint-use agreements and rental records, exposing unpermitted attachments and correcting what each party is actually billed for.',
    icon: Handshake,
  },
]

/* Field-to-decision workflow */
const workflow = [
  { icon: ClipboardList, title: 'Scope', desc: 'Route, pole list, owner standards, access permissions and data model.' },
  { icon: Camera, title: 'Capture', desc: 'GPS-located pole survey with photographs and attachment evidence.' },
  { icon: Ruler, title: 'Measure', desc: 'Heights, clearances, span lengths and framing recorded in the field.' },
  { icon: Calculator, title: 'Analyse', desc: 'Loading modelled and clearance violations identified per pole and span.' },
  { icon: PenTool, title: 'Engineer', desc: 'Make-ready designs, remedies and per-pole cost estimates produced.' },
  { icon: Send, title: 'Submit', desc: 'Application packs, GIS layers and evidence handed to the owner or regulator.' },
]

/* Evidence gates  a pole application is rejected on any one of these */
const gates = [
  { g: 'G1', title: 'Field completeness', desc: 'Pole located, identified, photographed and every attachment recorded.' },
  { g: 'G2', title: 'Measurement QA', desc: 'Heights, clearances and span lengths within tolerance and independently spot-checked.' },
  { g: 'G3', title: 'Ownership resolution', desc: 'Each attachment matched to an owner; unknowns escalated, not guessed.' },
  { g: 'G4', title: 'Load calculation review', desc: 'Loading inputs, assumptions and governing standard reviewed by an engineer.' },
  { g: 'G5', title: 'Application readiness', desc: 'Owner-format packs, drawings and evidence complete before submission.' },
]

const deliverables = [
  'Geolocated pole inventory with photographs',
  'Attachment schedule by owner, type and height',
  'Clearance violation register by pole and span',
  'Structural loading results and calculation records',
  'Make-ready scope and per-pole cost estimate',
  'Owner-format attachment application packs',
]

const outcomes = [
  'Attachment applications that survive the owner review',
  'Make-ready cost known before the build is committed',
  'Clearance and safety violations found before an incident',
  'Unpermitted attachments surfaced and regularised',
  'Joint-use billing matched to what is actually on the pole',
]

const stats = allocationStats(serviceSplit, 'pole-asset-intelligence')

export default function PoleAssetIntelligence() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero */}
      <ServiceHero
        breadcrumb={"Pole & Asset Intelligence"}
        eyebrow={"Core Service"}
        eyebrowIcon={Antenna}
        title={"Pole & Asset Intelligence"}
        subtitle={"Know every pole, everything hanging off it, and whether it can carry one more."}
        description={"Pole inventory, attachment audits, clearance measurement, structural loading and make-ready engineering for telecom operators and pole owners, so co-location decisions rest on measured evidence instead of an assumption about spare capacity."}
        image="/pillars/telecom_intel.webp"
        imageAlt="Utility pole carrying power and telecom attachments"
        stats={stats}
      />

      {/* What we deliver */}
      <CapabilityModules
        tone="gray"
        eyebrow="Capabilities"
        heading="The pole as an engineered asset, not a dot on a map"
        intro="A pole carries other people's equipment under rules about spacing, clearance and load. These are the six things that have to be known before anything else goes on it."
        modules={modules}
      />

      {/* Workflow */}
      <section className="py-20" style={{ background: 'linear-gradient(120deg, #012f62, #0055b4)' }}>
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-14">
            <span className="inline-block text-[#00d4ff] font-bold text-xs md:text-sm uppercase tracking-widest mb-3">Workflow</span>
            <h2 className="text-[28px] md:text-[36px] lg:text-[42px] font-bold text-white mb-4">
              From Field Survey to Approved Attachment
            </h2>
            <p className="text-white/70 text-base md:text-lg max-w-3xl mx-auto">
              Six stages that take a route from an unknown pole line to an application pack a pole owner will accept.
            </p>
          </div>

          <ProcessFlow steps={workflow} />

          <p className="text-white/60 text-sm md:text-base text-center max-w-3xl mx-auto mt-12">
            <span className="text-white font-semibold">Design principle:</span> every clearance call and loading result traces back to a field measurement, a stated standard and a named reviewer.
          </p>
        </div>
      </section>

      {/* Evidence gates */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12 md:mb-14">
            <span className="inline-block text-[#00d4ff] font-bold text-xs md:text-sm uppercase tracking-widest mb-3">Quality &amp; Governance</span>
            <h2 className="text-[28px] md:text-[36px] lg:text-[42px] font-bold mb-4 text-gradient">
              Five Gates Before an Application Leaves Us
            </h2>
            <p className="text-gray-600 text-base md:text-lg max-w-3xl mx-auto">
              A rejected pole application costs weeks. Each gate closes one of the reasons owners send them back.
            </p>
          </div>

          <QualityGates gates={gates} />
        </div>
      </section>

      {/* Deliverables & outcomes */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <span className="inline-block text-[#00d4ff] font-bold text-xs md:text-sm uppercase tracking-widest mb-3">What You Receive</span>
              <h2 className="text-[28px] md:text-[36px] font-bold mb-6 text-gradient">Deliverables</h2>
              <ul className="space-y-3">
                {deliverables.map((item) => (
                  <li key={item} className="flex items-start gap-3 rounded-xl bg-white p-4">
                    <FileCheck2 className="w-5 h-5 text-[#0050a9] shrink-0 mt-0.5" />
                    <span className="text-gray-700 text-sm md:text-base">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <span className="inline-block text-[#00d4ff] font-bold text-xs md:text-sm uppercase tracking-widest mb-3">What Changes</span>
              <h2 className="text-[28px] md:text-[36px] font-bold mb-6 text-gradient">Outcomes</h2>
              <ul className="space-y-3">
                {outcomes.map((item) => (
                  <li key={item} className="flex items-start gap-3 rounded-xl bg-[#eef5ff] border border-blue-100 p-4">
                    <Gauge className="w-5 h-5 text-[#0050a9] shrink-0 mt-0.5" />
                    <span className="text-gray-700 text-sm md:text-base">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Where this stops and Utilities Mapping starts  the two used to be one page */}
          <div className="mt-10 rounded-xl bg-white border border-gray-100 p-6 flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-[#0050a9] shrink-0 mt-0.5" />
            <p className="text-gray-600 text-sm leading-relaxed">
              This page covers the pole as a structure. Mapping and modelling the network it carries (electric, gas,
              water and telecom assets, connectivity and GIS migration) sits under{' '}
              <a href="/services/utility-network-intelligence" className="font-semibold text-[#0050a9] hover:underline">
                Utilities Mapping
              </a>
              .
            </p>
          </div>
        </div>
      </section>

      <Footer />
      <MobileNav />
    </div>
  )
}
