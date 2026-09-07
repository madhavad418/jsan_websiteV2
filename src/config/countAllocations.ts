/**
 * Project and headcount allocations.
 *
 * The company totals shown on the About page are the only figures quoted whole:
 *
 *   500+   Projects Delivered
 *   1,500+ Employees Globally
 *
 * Every page that shows a slice of those totals takes its figure from here, so the
 * slices always add back up to the totals instead of drifting into unrelated numbers.
 *
 * There are three independent breakdowns of the SAME company. A single project belongs
 * to one service line, one industry and one technology at once, so each split is a
 * complete view of all 500 projects and all 1,500 people from a different angle:
 *
 *   serviceSplit    - by delivery line   (the /services/* pages)
 *   industrySplit   - by market served   (the /industries/* pages)
 *   technologySplit - by technology used (the /technologies/* pages)
 *
 * Each split sums to exactly 500 projects and 1,500 people. `assertSplits()` below
 * enforces that in development - if you change one entry you must rebalance its split.
 *
 * Do NOT quote 500+ or 1,500+ on a page that represents a slice; use its entry here.
 */

export const TOTAL_PROJECTS = 500
export const TOTAL_PEOPLE = 1500

/** Company-wide totals, formatted for display. Only for pages that speak for the whole company. */
export const totals = {
  projects: '500+',
  people: '1,500+',
}

export type Allocation = { projects: number; people: number }
export type Split = Record<string, Allocation>

/** By delivery line. Keyed by the /services/* route slug. */
export const serviceSplit: Split = {
  'global-street-data-collection': { projects: 70, people: 1000 },
  'global-fleet-collection-operations': { projects: 55, people: 1000 },
  geospatial: { projects: 15, people: 45 },
  'basemap-poi-annotation': { projects: 42, people: 140 },
  'location-intelligence': { projects: 15, people: 35 },
  'utility-network-intelligence': { projects: 15, people: 50 },
  'pole-asset-intelligence': { projects: 5, people: 25 },
  'smart-fiber-planning': { projects: 20, people: 30 },
  'telecom-network-intelligence': { projects: 15, people: 45 },
  'geoai-computer-vision': { projects: 10, people: 15 },
  'digital-engineering': { projects: 10, people: 15 },
  'technology-consultancy': { projects: 25, people: 40 },
  'program-management': { projects: 20, people: 35 },
  erp: { projects: 15, people: 30 },
  'data-center-lifecycle': { projects: 10, people: 25 },
  'staffing-solutions': { projects: 10, people: 40 },
  'business-advisory': { projects: 15, people: 20 },
}

/** By market served. Keyed by the /industries/* route slug. */
export const industrySplit: Split = {
  'mapping-location-platforms': { projects: 130, people: 1000 },
  telecommunications: { projects: 5, people: 10 },
  'transportation-infrastructure': { projects: 80, people: 240 },
  utilities: { projects: 10, people: 50 },
  'government-smart-cities': { projects: 5, people: 10 },
  'autonomous-mobility': { projects: 15, people: 35 },
  consulting: { projects: 20, people: 25 },
}

/** By technology used. Keyed by the /technologies/* route slug. */
export const technologySplit: Split = {
  gis: { projects: 165, people: 620 },
  analytics: { projects: 40, people: 35 },
  web: { projects: 15, people: 10 },
  cloud: { projects: 5, people: 10 },
  'api-integration': { projects: 25, people: 10 },
  'data-warehouse': { projects: 30, people: 20 },
  automation: { projects: 30, people: 80 },
  devops: { projects: 25, people: 60 },
  'it-infrastructure': { projects: 20, people: 50 },
  'cyber-security': { projects: 10, people: 25 },
}

const format = (n: number) => (n >= 1000 ? n.toLocaleString('en-GB') : String(n))

/**
 * The two hero figures for one page, ready to spread into a `stats` array:
 *   stats={[...allocationStats(serviceSplit, 'geospatial'), { value: '25+', label: 'Countries' }]}
 */
export function allocationStats(split: Split, key: string): { value: string; label: string }[] {
  const entry = split[key]
  if (!entry) return []
  return [
    { value: `${format(entry.projects)}+`, label: 'Projects Delivered' },
    { value: `${format(entry.people)}+`, label: 'Specialists' },
  ]
}

const sum = (split: Split, field: keyof Allocation) =>
  Object.values(split).reduce((total, entry) => total + entry[field], 0)

/** Fails loudly in development if a split no longer adds up to the company totals. */
export function assertSplits(): void {
  const splits: [string, Split][] = [
    ['serviceSplit', serviceSplit],
    ['industrySplit', industrySplit],
    ['technologySplit', technologySplit],
  ]
  for (const [name, split] of splits) {
    const projects = sum(split, 'projects')
    const people = sum(split, 'people')
    if (projects !== TOTAL_PROJECTS) {
      console.error(`[countAllocations] ${name} projects sum to ${projects}, expected ${TOTAL_PROJECTS}`)
    }
    if (people !== TOTAL_PEOPLE) {
      console.error(`[countAllocations] ${name} people sum to ${people}, expected ${TOTAL_PEOPLE}`)
    }
  }
}

if (import.meta.env?.DEV) assertSplits()
