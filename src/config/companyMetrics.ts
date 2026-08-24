/**
 * Single source of truth for JSAN business statistics.
 *
 * Every figure shown anywhere on the site should come from here, so changing a number
 * once updates it everywhere.
 *
 * RULES
 * - No invented numbers. A metric with `value: null` renders nowhere until a real,
 *   management-validated figure is supplied.
 * - `verified` records whether the figure has been signed off by the business. Seeded
 *   values were carried over from existing pages and are NOT yet verified  they are
 *   marked false so it stays obvious what still needs confirming.
 * - Do not add a metric just because an old page displayed it.
 */

export type CompanyMetric = {
  id: string
  /** Display figure, e.g. '1,000+'. null means "no validated figure yet"  not rendered. */
  value: string | null
  label: string
  /** True once the business has confirmed the figure. */
  verified: boolean
  note?: string
}

export const companyMetrics: CompanyMetric[] = [
  {
    id: 'professionals',
    value: '1,000+',
    label: 'Professionals',
    verified: false,
    note: 'Carried over from the Careers page ("Team Members"). Needs confirmation.',
  },
  {
    id: 'countries',
    value: '30+',
    label: 'Countries Supported',
    verified: false,
    note: 'Carried over from Careers. Service pages elsewhere say 20+  the two disagree.',
  },
  {
    id: 'programs',
    value: '500+',
    label: 'Programs Delivered',
    verified: false,
    note: 'Carried over from the Technologies page ("Projects Delivered").',
  },
  {
    id: 'fieldKm',
    value: null,
    label: 'KM Field Operations',
    verified: false,
    note: 'No figure exists anywhere in the site. Supply a validated number to display it.',
  },
  {
    id: 'deliveryLocations',
    value: null,
    label: 'Global Delivery Locations',
    verified: false,
    note: 'No figure exists anywhere in the site. Supply a validated number to display it.',
  },
]

/** Metrics that have a figure to show. Null-valued metrics are skipped by design. */
export const displayableMetrics = companyMetrics.filter((m) => m.value !== null)

/** Look up a single figure by id, e.g. metric('countries'). */
export function metric(id: string): string | null {
  return companyMetrics.find((m) => m.id === id)?.value ?? null
}
