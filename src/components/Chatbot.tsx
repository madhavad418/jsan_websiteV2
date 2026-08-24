import { useEffect, useRef, useState } from 'react'
import { Bot, ChevronLeft, RotateCcw, X } from 'lucide-react'

type ChatItem = {
  question: string
  answer: string
}

const chatItems: ChatItem[] = [
  {
    question: 'What services does JSAN provide?',
    answer: 'JSAN provides geospatial solutions, location intelligence, telecom and utility network intelligence, program management, technology consultancy, staffing, ERP, GeoAI, and global field-data collection services.',
  },
  {
    question: 'Which industries do you serve?',
    answer: 'We support transport and mobility, energy, smart cities, consulting, government, retail, real estate, manufacturing, and financial services.',
  },
  {
    question: 'What is Location Intelligence?',
    answer: 'Location Intelligence turns geographic and business data into practical insights for planning, operations, customer analysis, navigation, and better decision-making.',
  },
  {
    question: 'Do you offer GIS solutions?',
    answer: 'Yes. Our GIS capabilities include mapping, spatial analytics, data capture, asset management, digital twins, drone and LiDAR workflows, and custom geospatial platforms.',
  },
  {
    question: 'Can JSAN support telecom projects?',
    answer: 'Yes. We support fiber and 5G planning, network inventory, design, field surveys, deployment intelligence, quality assurance, and ongoing network operations.',
  },
  {
    question: 'What products does JSAN offer?',
    answer: 'Our featured products include JSAN VTS for vehicle tracking, POI Express for point-of-interest data, and JSAN Travel Desk for business travel operations.',
  },
  {
    question: 'Do you provide staffing solutions?',
    answer: 'Yes. We provide contract staffing, permanent placement, executive search, and team augmentation for technical and business roles.',
  },
  {
    question: 'Where does JSAN operate?',
    answer: 'JSAN works with clients and delivery teams across multiple global markets. Contact us with your project location and we will confirm the appropriate regional support.',
  },
  {
    question: 'How can I discuss a project?',
    answer: 'Use the Contact section on this website or visit the Contact page. Share your requirements and the JSAN team will follow up with you.',
  },
  {
    question: 'How can I apply for a job?',
    answer: 'Visit the Careers page to see current openings, select a suitable role, and follow the application instructions shown on the job details page.',
  },
]

export default function Chatbot() {
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState<ChatItem | null>(null)
  const [showGreeting, setShowGreeting] = useState(false)
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return
    closeButtonRef.current?.focus()
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [open])

  useEffect(() => {
    if (open) {
      setShowGreeting(false)
      return
    }

    let hideTimer: ReturnType<typeof setTimeout> | undefined
    const showPrompt = () => {
      setShowGreeting(true)
      if (hideTimer) clearTimeout(hideTimer)
      hideTimer = setTimeout(() => setShowGreeting(false), 3000)
    }
    const promptInterval = setInterval(showPrompt, 5000)

    return () => {
      clearInterval(promptInterval)
      if (hideTimer) clearTimeout(hideTimer)
    }
  }, [open])

  const reset = () => setSelected(null)

  return (
    <div className="fixed bottom-36 right-4 z-[120] sm:right-6 lg:bottom-24">
      {open && (
        <section
          role="dialog"
          aria-label="JSAN virtual assistant"
          className="mb-3 flex h-[min(520px,calc(100vh-11rem))] w-[calc(100vw-2rem)] max-w-[370px] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_24px_70px_-20px_rgba(1,47,98,0.55)]"
        >
          <header className="flex items-center gap-3 bg-gradient-to-r from-[#012f62] to-[#0050a9] px-4 py-3.5 text-white">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/15 ring-1 ring-white/25">
              <Bot className="h-5 w-5" aria-hidden="true" />
            </span>
            <div className="min-w-0 flex-1">
              <h2 className="font-bold leading-tight">JSAN Assistant</h2>
              <p className="mt-0.5 flex items-center gap-1.5 text-xs text-blue-100">
                <span className="h-2 w-2 rounded-full bg-emerald-400" /> Online · Quick answers
              </p>
            </div>
            <button
              ref={closeButtonRef}
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="rounded-full p-2 text-white/80 transition hover:bg-white/15 hover:text-white focus:outline-none focus:ring-2 focus:ring-white/70"
            >
              <X className="h-5 w-5" />
            </button>
          </header>

          <div className="flex-1 overflow-y-auto bg-slate-50 p-4" aria-live="polite">
            <div className="mb-3 max-w-[88%] rounded-2xl rounded-tl-sm bg-white px-3.5 py-3 text-sm leading-relaxed text-slate-700 shadow-sm ring-1 ring-slate-200">
              Hello! I’m the JSAN virtual assistant. Select a question below and I’ll help you find the answer.
            </div>

            {selected ? (
              <div className="space-y-3">
                <div className="ml-auto max-w-[88%] rounded-2xl rounded-tr-sm bg-[#0050a9] px-3.5 py-3 text-sm leading-relaxed text-white shadow-sm">
                  {selected.question}
                </div>
                <div className="max-w-[92%] rounded-2xl rounded-tl-sm bg-white px-3.5 py-3 text-sm leading-relaxed text-slate-700 shadow-sm ring-1 ring-slate-200">
                  {selected.answer}
                </div>
                <button
                  type="button"
                  onClick={reset}
                  className="inline-flex items-center gap-1.5 rounded-full border border-[#0050a9]/20 bg-white px-3 py-2 text-xs font-semibold text-[#0050a9] transition hover:border-[#0050a9] hover:bg-blue-50"
                >
                  <ChevronLeft className="h-3.5 w-3.5" /> Choose another question
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                <p className="px-1 text-xs font-bold uppercase tracking-wider text-slate-500">Frequently asked questions</p>
                {chatItems.map((item, index) => (
                  <button
                    key={item.question}
                    type="button"
                    onClick={() => setSelected(item)}
                    className="group flex w-full items-start gap-2.5 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-left text-sm font-medium leading-snug text-slate-700 shadow-sm transition hover:border-[#0050a9]/50 hover:bg-blue-50 hover:text-[#0050a9] focus:outline-none focus:ring-2 focus:ring-[#0050a9]/40"
                  >
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-50 text-[10px] font-bold text-[#0050a9] group-hover:bg-[#0050a9] group-hover:text-white">
                      {index + 1}
                    </span>
                    {item.question}
                  </button>
                ))}
              </div>
            )}
          </div>

          <footer className="flex items-center justify-between border-t border-slate-200 bg-white px-4 py-2 text-[11px] text-slate-400">
            <span>Powered by JSAN</span>
            {selected && (
              <button type="button" onClick={reset} className="flex items-center gap-1 font-semibold text-slate-500 hover:text-[#0050a9]">
                <RotateCcw className="h-3 w-3" /> Reset
              </button>
            )}
          </footer>
        </section>
      )}

      {!open && showGreeting && (
        <button
          type="button"
          onClick={() => {
            setShowGreeting(false)
            setOpen(true)
          }}
          className="absolute bottom-1 right-20 flex min-w-max animate-[popIn_0.35s_ease-out] items-center gap-2.5 rounded-2xl rounded-br-sm border border-[#0050a9]/15 bg-white py-2 pl-2 pr-4 text-left shadow-[0_12px_35px_-12px_rgba(1,47,98,0.65)] transition hover:-translate-y-0.5 hover:border-[#0050a9]/35 focus:outline-none focus:ring-4 focus:ring-[#00d4ff]/25"
          aria-label="Open chat with JSAN Assistant"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-50">
            <img src="/jsan-chatbot-logo.png" alt="" aria-hidden="true" className="h-8 w-8 object-contain" />
          </span>
          <span>
            <strong className="block text-sm leading-tight text-[#012f62]">Hi there!</strong>
            <span className="text-xs text-slate-500">How can I help?</span>
          </span>
        </button>
      )}

      <button
        type="button"
        onClick={() => {
          setShowGreeting(false)
          setOpen((value) => !value)
        }}
        aria-label={open ? 'Close JSAN chat' : 'Open JSAN chat'}
        aria-expanded={open}
        className="ml-auto flex h-16 w-16 items-center justify-center rounded-full border-2 border-[#0050a9]/20 bg-white text-[#0050a9] shadow-[0_12px_30px_-8px_rgba(0,80,169,0.8)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_16px_34px_-8px_rgba(0,80,169,0.9)] focus:outline-none focus:ring-4 focus:ring-[#00d4ff]/35"
      >
        {open ? (
          <X className="h-6 w-6" />
        ) : (
          <img
            src="/jsan-chatbot-logo.png"
            alt=""
            aria-hidden="true"
            className="h-14 w-14 object-contain p-1"
          />
        )}
      </button>
    </div>
  )
}
