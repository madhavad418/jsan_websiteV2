import { Link } from 'react-router-dom'
import {
  ArrowRight, Globe2, Truck, Brain, Network, Code, Handshake, Briefcase, MessageSquare,
} from 'lucide-react'

/**
 * SECTION 37  CONTACT EXPERIENCE
 *
 * A qualifying question before the form, rather than dropping a long generic form on the
 * visitor. The choice is written into the form's hidden `enquiry_topic` field, so the
 * enquiry arrives already categorised.
 *
 * Nothing here blocks the form: the full form still sits below and works untouched if
 * someone scrolls straight past.
 */
const intents = [
  { id: 'geospatial', label: 'Geospatial Program', icon: Globe2 },
  { id: 'fleet', label: 'Fleet / Field Operations', icon: Truck },
  { id: 'geoai', label: 'GeoAI / Data Operations', icon: Brain },
  { id: 'telecom', label: 'Telecom / Infrastructure', icon: Network },
  { id: 'technology', label: 'Technology', icon: Code },
  { id: 'partnership', label: 'Partnership', icon: Handshake },
  { id: 'careers', label: 'Careers', icon: Briefcase },
  { id: 'other', label: 'Other', icon: MessageSquare },
]

type Props = {
  value: string | null
  onSelect: (id: string, label: string) => void
}

export default function ContactIntent({ value, onSelect }: Props) {
  return (
    <div className="mb-10">
      <div className="mb-2 text-[11px] font-bold uppercase tracking-[0.25em] text-[#00a3e0]">Step 1</div>
      <h3 className="mb-6 text-[22px] font-bold leading-tight text-[#0a1a3a] lg:text-[28px]">
        What would you like to discuss?
      </h3>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {intents.map((intent) => {
          const isOn = value === intent.label
          // Careers enquiries belong on the careers route, not in a sales enquiry queue.
          if (intent.id === 'careers') {
            return (
              <Link
                key={intent.id}
                to="/careers"
                className="group flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-4 text-left transition-all duration-300 hover:-translate-y-0.5 hover:border-[#0050a9]/40 hover:shadow-sm"
              >
                <intent.icon className="h-5 w-5 shrink-0 text-[#0050a9]" />
                <span className="text-sm font-medium text-[#0a1a3a]">{intent.label}</span>
                <ArrowRight className="ml-auto h-4 w-4 shrink-0 text-[#0050a9]/40 transition-transform duration-300 group-hover:translate-x-0.5" />
              </Link>
            )
          }

          return (
            <button
              key={intent.id}
              type="button"
              onClick={() => onSelect(intent.id, intent.label)}
              aria-pressed={isOn}
              className={`flex items-center gap-3 rounded-xl border p-4 text-left transition-all duration-300 ${
                isOn
                  ? 'border-[#0050a9] bg-[#f0f7ff] shadow-sm'
                  : 'border-gray-200 bg-white hover:-translate-y-0.5 hover:border-[#0050a9]/40 hover:shadow-sm'
              }`}
            >
              <intent.icon className={`h-5 w-5 shrink-0 ${isOn ? 'text-[#0050a9]' : 'text-[#0050a9]/70'}`} />
              <span className="text-sm font-medium text-[#0a1a3a]">{intent.label}</span>
            </button>
          )
        })}
      </div>

      {value && (
        <p className="mt-5 text-sm text-gray-600">
          Talking about <span className="font-semibold text-[#0050a9]">{value}</span>. A few details below and
          the right team will pick it up.
        </p>
      )}
    </div>
  )
}
