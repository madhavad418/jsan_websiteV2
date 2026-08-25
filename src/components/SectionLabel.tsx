/**
 * The small uppercase label above a section heading.
 *
 * It used to be bright cyan on every section, on light and dark alike, which made the
 * page read as blue-on-blue. It is neutral now  charcoal on light, muted white on dark
 *  with a short accent rule carrying the only colour. One accent per section is enough.
 */
export default function SectionLabel({
  children,
  tone = 'light',
  className = '',
}: {
  children: React.ReactNode
  /** 'light' for a white or off-white section, 'dark' for navy and photography. */
  tone?: 'light' | 'dark'
  className?: string
}) {
  const text = tone === 'dark' ? 'text-white/55' : 'text-gray-500'
  const rule = tone === 'dark' ? 'bg-[#00d4ff]/70' : 'bg-[#0050a9]'

  return (
    <span className={`mb-6 flex items-center gap-3 t-label ${text} ${className}`}>
      <span aria-hidden="true" className={`h-px w-8 shrink-0 ${rule}`} />
      {children}
    </span>
  )
}
