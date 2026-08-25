import type { CSSProperties, ReactNode } from 'react'
import { useInView } from '../lib/useCountUp'

/**
 * Fades a block up into place the first time it scrolls into view.
 *
 * Used to walk a reader down a diagram one step at a time rather than presenting the
 * finished thing all at once. Each block watches itself, so the sequence follows the
 * scroll rather than firing all together when the section appears.
 *
 * Once only  it does not replay on the way back up  and nothing moves at all under
 * prefers-reduced-motion.
 */
export default function Reveal({
  children,
  /** Milliseconds behind the block above it, for a staggered group. */
  delay = 0,
  className = '',
  /** How far it travels up. Keep it small; this is punctuation, not an entrance. */
  distance = 14,
}: {
  children: ReactNode
  delay?: number
  className?: string
  distance?: number
}) {
  const { ref, inView } = useInView<HTMLDivElement>(0.25)

  const style: CSSProperties = {
    transitionDelay: `${delay}ms`,
    transform: inView ? 'translateY(0)' : `translateY(${distance}px)`,
  }

  return (
    <div
      ref={ref}
      style={style}
      className={`transition-[opacity,transform] duration-700 ease-out motion-reduce:!transform-none motion-reduce:opacity-100 motion-reduce:transition-none ${
        inView ? 'opacity-100' : 'opacity-0'
      } ${className}`}
    >
      {children}
    </div>
  )
}
