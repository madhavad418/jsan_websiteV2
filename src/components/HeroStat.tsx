import { useCountUp, useInView, parseStat } from '../lib/useCountUp'

/**
 * Hero statistic that counts up the first time it is on screen.
 * Handles values like "200+", "1,000+", "95%+", "4M+" and "360°".
 */
export default function HeroStat({ value, duration = 1500 }: { value: string; duration?: number }) {
  const { ref, inView } = useInView<HTMLSpanElement>(0.3)
  const { number, suffix } = parseStat(value)
  const count = useCountUp(number, inView, duration)

  // Non-numeric values (e.g. "GPS") pass straight through
  if (!number) return <span ref={ref}>{value}</span>

  return (
    <span ref={ref}>
      {count.toLocaleString('en-US')}
      <span>{suffix}</span>
    </span>
  )
}
