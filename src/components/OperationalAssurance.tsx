import { Lock, FileKey, KeyRound, BadgeCheck, HardHat, RefreshCw, ClipboardCheck, Scale } from 'lucide-react'

/**
 * SECTION 10  OPERATIONAL ASSURANCE
 *
 * These are delivery practices, NOT certification claims. No standard is named and no
 * certification badge is shown, because none has been confirmed as currently held.
 *
 * When a certification is approved: add the real badge image, the certificate/registration
 * number and the verification link for that specific item. Do not name a standard here
 * without that evidence attached.
 */
const pillars = [
  { icon: Lock, title: 'Information Security', description: 'Controls over how programme data is stored, moved and handled.' },
  { icon: FileKey, title: 'Data Privacy', description: 'Privacy-safe processing, including treatment of personal data captured in the field.' },
  { icon: KeyRound, title: 'Access Control', description: 'Role-aware access to systems, data and delivery environments.' },
  { icon: BadgeCheck, title: 'Quality Management', description: 'Defined QA gates, sampling and reviewer calibration inside delivery workflows.' },
  { icon: HardHat, title: 'Field Safety', description: 'Crew safety, vehicle and site procedures across field operations.' },
  { icon: RefreshCw, title: 'Business Continuity', description: 'Continuity planning across delivery regions and programme dependencies.' },
  { icon: ClipboardCheck, title: 'Delivery Governance', description: 'Programme governance, structured reporting and escalation paths.' },
  { icon: Scale, title: 'Compliance', description: 'Alignment to client, contractual and jurisdictional obligations per programme.' },
]

export default function OperationalAssurance() {
  return (
    <section className="section-y bg-[#f7f8fa]">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-14 max-w-3xl lg:mb-16">
          <span className="mb-4 inline-block t-label text-gray-500">
            Operational Assurance
          </span>
          <h2 className="mb-5 text-[30px] font-bold leading-[1.1] tracking-tight text-[#0a1a3a] lg:text-[46px]">
            Built for governed enterprise delivery
          </h2>
          <p className="text-lg leading-relaxed text-gray-600">
            The controls and governance that sit around every programme, from field crews through to enterprise
            data delivery.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((pillar) => (
            <div
              key={pillar.title}
              className="group rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[#e8f4fc] transition-colors duration-300 group-hover:bg-[#0050a9]">
                <pillar.icon className="h-5 w-5 text-[#0050a9] transition-colors duration-300 group-hover:text-white" />
              </div>
              <h3 className="mb-2 text-base font-bold leading-tight text-[#0a1a3a]">{pillar.title}</h3>
              <p className="text-sm leading-relaxed text-gray-600">{pillar.description}</p>
            </div>
          ))}
        </div>

        {/* Stated plainly rather than implied: these are practices, not certifications */}
        <p className="mt-8 max-w-3xl text-sm leading-relaxed text-gray-500">
          These describe how JSAN governs delivery. Certification badges and verification details are shown only
          for standards JSAN currently holds.
        </p>
      </div>
    </section>
  )
}
