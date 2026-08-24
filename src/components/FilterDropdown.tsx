import { useEffect, useRef, useState } from 'react'
import type { LucideIcon } from 'lucide-react'
import { Check, ChevronDown } from 'lucide-react'

type Props = {
  icon: LucideIcon
  value: string
  options: string[]
  onChange: (value: string) => void
  /** Shown when the value equals this, styled as "no filter applied" */
  placeholder?: string
}

/**
 * Custom filter dropdown. Opens on hover (with a small grace period so the
 * pointer can travel into the list) and on click, so it works with a mouse,
 * a keyboard and touch.
 */
export default function FilterDropdown({ icon: Icon, value, options, onChange, placeholder }: Props) {
  const [open, setOpen] = useState(false)
  const wrapRef = useRef<HTMLDivElement>(null)
  const closeTimer = useRef<number | undefined>(undefined)

  const isDefault = placeholder ? value === placeholder : false

  const openNow = () => {
    window.clearTimeout(closeTimer.current)
    setOpen(true)
  }
  const scheduleClose = () => {
    window.clearTimeout(closeTimer.current)
    closeTimer.current = window.setTimeout(() => setOpen(false), 160)
  }

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false)
    }
    const onEsc = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('mousedown', onDocClick)
    document.addEventListener('keydown', onEsc)
    return () => {
      document.removeEventListener('mousedown', onDocClick)
      document.removeEventListener('keydown', onEsc)
      window.clearTimeout(closeTimer.current)
    }
  }, [])

  return (
    <div
      ref={wrapRef}
      className="relative"
      onMouseEnter={openNow}
      onMouseLeave={scheduleClose}
    >
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-haspopup="listbox"
        className={`flex w-full items-center gap-3 rounded-xl border bg-gray-50 py-3.5 pl-4 pr-4 text-left font-medium transition-all duration-300 ${
          open
            ? 'border-[#0050a9]/50 bg-white shadow-[0_10px_28px_-16px_rgba(0,80,169,0.9)] ring-4 ring-[#0050a9]/10'
            : 'border-gray-200 hover:border-[#0050a9]/40 hover:bg-white'
        } ${isDefault ? 'text-gray-500' : 'text-[#0050a9]'}`}
      >
        <Icon className={`h-4 w-4 shrink-0 transition-colors duration-300 ${open ? 'text-[#0050a9]' : 'text-gray-400'}`} />
        <span className="flex-1 truncate">{value}</span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-[#0050a9] transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <div
          role="listbox"
          className="animate-fade-in absolute left-0 right-0 top-full z-30 mt-2 max-h-72 overflow-y-auto rounded-xl border border-gray-100 bg-white p-1.5 shadow-[0_24px_48px_-24px_rgba(1,47,98,0.55)]"
        >
          {/* Brand hairline, same as the header mega menu */}
          <span className="mb-1 block h-0.5 w-full rounded bg-gradient-to-r from-[#0050a9] via-[#00d4ff] to-[#0050a9]" />

          {options.map((option) => {
            const selected = option === value
            return (
              <button
                key={option}
                role="option"
                aria-selected={selected}
                onClick={() => {
                  onChange(option)
                  setOpen(false)
                }}
                className={`group flex w-full items-center justify-between gap-2 rounded-lg px-3 py-2 text-left text-sm font-medium transition-all duration-200 hover:bg-blue-50 ${
                  selected ? 'text-[#0050a9]' : 'text-gray-700 hover:text-[#0050a9]'
                }`}
              >
                <span className="relative">
                  {option}
                  {/* Gradient underline on hover, matching the navbar dropdown */}
                  <span className="pointer-events-none absolute -bottom-0.5 left-0 h-0.5 w-0 rounded-full bg-gradient-to-r from-[#0050a9] to-[#00d4ff] transition-all duration-300 group-hover:w-full" />
                </span>
                {selected && <Check className="h-4 w-4 shrink-0 text-[#00d4ff]" />}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
