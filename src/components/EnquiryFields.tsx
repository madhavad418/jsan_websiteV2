import { useEffect, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { topicById } from '../data/enquiryTopics'

/**
 * The follow-up questions for whichever enquiry topic was chosen.
 *
 * Rendered inside the contact form so the answers post with it. Nothing is required  the
 * form still submits if these are ignored  and the whole group disappears again if the
 * visitor changes their mind about the topic.
 *
 * Chip groups keep their state here and mirror it into a hidden input, because a set of
 * checkboxes would arrive in the notification email as six separate lines.
 */
const inputClass =
  'w-full min-h-[48px] rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-gray-800 placeholder-gray-400 transition-all focus:border-[#0050a9] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0050a9]/10'

function Chips({ name, options }: { name: string; options: string[] }) {
  const [selected, setSelected] = useState<string[]>([])

  const toggle = (option: string) =>
    setSelected((prev) =>
      prev.includes(option) ? prev.filter((o) => o !== option) : [...prev, option]
    )

  return (
    <>
      <input type="hidden" name={name} value={selected.join(', ')} />
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const isOn = selected.includes(option)
          return (
            <button
              key={option}
              type="button"
              onClick={() => toggle(option)}
              aria-pressed={isOn}
              className={`inline-flex min-h-[44px] items-center rounded-xl border px-4 py-2 text-sm transition-all ${
                isOn
                  ? 'border-[#0050a9] bg-[#f0f7ff] font-semibold text-[#0050a9]'
                  : 'border-gray-200 bg-white text-gray-700 hover:border-[#0050a9]/40'
              }`}
            >
              {option}
            </button>
          )
        })}
      </div>
    </>
  )
}

export default function EnquiryFields({ topicId }: { topicId: string | null }) {
  const topic = topicById(topicId)

  // Remounting on topic change clears any answers belonging to the previous topic, so a
  // switched-away field can never post alongside the new one.
  const [key, setKey] = useState(0)
  useEffect(() => setKey((k) => k + 1), [topicId])

  if (!topic || topic.fields.length === 0) return null

  return (
    <div key={key} className="rounded-2xl border border-blue-100 bg-[#f7fbff] p-5 lg:p-6">
      <div className="mb-1 text-[11px] font-bold uppercase tracking-[0.2em] text-[#00a3e0]">
        About your {topic.label.toLowerCase()} enquiry
      </div>
      {topic.hint && <p className="mb-5 text-sm text-gray-600">{topic.hint}</p>}

      <div className="space-y-5">
        {topic.fields.map((field) => (
          <div key={field.name}>
            <label
              htmlFor={`enq-${field.name}`}
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              {field.label}
            </label>

            {field.type === 'text' && (
              <input
                id={`enq-${field.name}`}
                type="text"
                name={field.name}
                placeholder={field.placeholder}
                className={inputClass}
              />
            )}

            {field.type === 'select' && (
              <div className="relative">
                <select
                  id={`enq-${field.name}`}
                  name={field.name}
                  defaultValue={field.options[0]}
                  className={`${inputClass} cursor-pointer appearance-none`}
                >
                  {field.options.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              </div>
            )}

            {field.type === 'chips' && <Chips name={field.name} options={field.options} />}
          </div>
        ))}
      </div>
    </div>
  )
}
