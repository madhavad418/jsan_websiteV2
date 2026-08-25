import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { enquiryTopics } from '../data/enquiryTopics'

/**
 * SECTION 37  CONTACT EXPERIENCE, STEP 1
 *
 * The qualifying question that opens the contact form. The choice drives two things: the
 * hidden `enquiry_topic` field, so the enquiry arrives categorised, and the follow-up
 * fields rendered by EnquiryFields inside the form.
 *
 * Nothing here blocks the form. The full form sits below and submits perfectly well if
 * someone scrolls straight past this.
 *
 * Job seekers are sent to /careers rather than into the sales enquiry queue  the
 * "Staffing / Workforce" option is for organisations asking JSAN to supply people.
 */
type Props = {
  value: string | null
  onSelect: (id: string, label: string) => void
}

export default function ContactIntent({ value, onSelect }: Props) {
  const selected = enquiryTopics.find((t) => t.id === value)

  return (
    <div className="mb-10">
      <div className="mb-2 t-label text-gray-500">Step 1</div>
      <h3 className="mb-6 text-[22px] font-bold leading-tight text-[#0a1a3a] lg:text-[28px]">
        What would you like to discuss?
      </h3>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {enquiryTopics.map((topic) => {
          const isOn = value === topic.id
          return (
            <button
              key={topic.id}
              type="button"
              onClick={() => onSelect(topic.id, topic.label)}
              aria-pressed={isOn}
              className={`flex min-h-[56px] items-center gap-3 rounded-xl border p-4 text-left transition-all duration-300 ${
                isOn
                  ? 'border-[#0050a9] bg-[#f0f7ff] shadow-sm'
                  : 'border-gray-200 bg-white hover:-translate-y-0.5 hover:border-[#0050a9]/40 hover:shadow-sm'
              }`}
            >
              <topic.icon
                className={`h-5 w-5 shrink-0 ${isOn ? 'text-[#0050a9]' : 'text-[#0050a9]/70'}`}
              />
              <span className="text-sm font-medium text-[#0a1a3a]">{topic.label}</span>
            </button>
          )
        })}
      </div>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {selected ? (
          <p className="text-sm text-gray-600">
            Talking about{' '}
            <span className="font-semibold text-[#0050a9]">{selected.label}</span>. A few details
            below and the right team will pick it up.
          </p>
        ) : (
          <p className="text-sm text-gray-500">
            Pick one and we will ask only the questions that matter for it.
          </p>
        )}

        <Link
          to="/careers"
          className="group inline-flex min-h-[44px] shrink-0 items-center gap-2 text-sm font-semibold text-[#0050a9]"
        >
          Looking for a job? See open roles
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  )
}
