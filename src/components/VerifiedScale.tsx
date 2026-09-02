import { Users, Globe2, FolderKanban, Route } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import StatsBand from './StatsBand'
import { companyMetrics } from '../config/companyMetrics'

/**
 * SECTION 02  VERIFIED SCALE
 *
 * People, countries, programs and field operations, immediately under the hero.
 *
 * Figures come from src/config/companyMetrics.ts and nowhere else. A metric with no
 * validated figure has `value: null` there and simply does not render  the band never
 * invents a number to fill a slot, so it can show three tiles rather than four.
 *
 * Set ONLY_VERIFIED to true once the business has signed the figures off; the band will
 * then show only metrics marked `verified: true` in that config.
 */
const ONLY_VERIFIED = false

const ICONS: Record<string, LucideIcon> = {
  professionals: Users,
  countries: Globe2,
  programs: FolderKanban,
  fieldKm: Route,
}

/** The four the homepage asks for, in the order the story tells them. */
const ORDER = ['professionals', 'countries', 'programs', 'fieldKm']

export default function VerifiedScale() {
  const items = ORDER.map((id) => companyMetrics.find((m) => m.id === id))
    .filter((m): m is NonNullable<typeof m> => Boolean(m?.value))
    .filter((m) => !ONLY_VERIFIED || m.verified)
    .map((m) => ({ number: m.value as string, label: m.label, icon: ICONS[m.id] }))

  if (items.length === 0) return null

  /* topRule: this is the one place the band sits directly under the hero. */
  return <StatsBand items={items} eyebrow="Operating Scale" topRule />
}
