/**
 * The systems JSAN built and runs itself, shown on /products.
 *
 * These are products, not client engagements  the client work lives in src/data/work.ts
 * and renders at /work. Both sit under Capabilities > In-House in the navigation.
 *
 * Each product still has its own detail page under /products/<slug>, and those routes are
 * still live, but nothing in the UI links to them: this index is the single surface, and the
 * only call to action is a conversation. Keep it that way unless that decision is revisited.
 *
 * `brief` is deliberately a paragraph rather than a feature list  enough to understand
 * what the system does and who it is for in about a minute, without opening anything else.
 */

export type InHouseProduct = {
  /** Display name. */
  name: string
  /** What kind of system it is, shown above the name. */
  category: string
  /** One-minute explanation. Prose, not bullets. */
  brief: string
  /** The capabilities that make the point, kept short. */
  highlights: string[]
  image: string
  imageAlt: string
}

export const inHouseProducts: InHouseProduct[] = [
  {
    name: 'JSAN ATLAS Ops',
    category: 'Autonomous Tracking & Coverage Intelligence',
    brief:
      'Our flagship field-operations platform, built because off-the-shelf tracking kept answering the wrong question. Trips record themselves rather than depending on a crew to remember to start and stop them. Work done outside mobile coverage is held on the device and reconciled the moment signal returns, so a day in a dead zone is never lost. Most importantly, progress is reported as the share of the road network a client actually contracted for, not as raw kilometres driven, and distance is verified against the route rather than taken on trust.',
    highlights: ['Automatic trip capture', 'Coverage reporting', 'Verified distance', 'Works offline'],
    image: '/pillars/atlsops.webp',
    imageAlt: 'JSAN ATLAS Ops coverage reporting for field delivery programmes',
  },
  {
    name: 'JSAN VTS',
    category: 'Vehicle Tracking System',
    brief:
      'The fleet management system JSAN runs its own vehicles on. Real-time GPS tracking, driver assignment and records, route planning and operational oversight, across a web console for the operations desk and a mobile app for the crew. It is built around the way collection fleets actually work  shift handovers, multi-day deployments, vehicles moving between depots and countries  so what a programme manager gets is an operational picture rather than a raw position feed.',
    highlights: ['Real-time GPS tracking', 'Driver management', 'Route optimisation', 'Web and mobile'],
    image: '/pillars/vts.webp',
    imageAlt: 'JSAN VTS vehicle tracking console',
  },
  {
    name: 'JSAN POI Express',
    category: 'GIS Data Collection Platform',
    brief:
      'Point-of-interest capture for field teams, offline first. Surveyors collect in areas with no signal and the app syncs when it can, so coverage is never limited to where the network reaches. AI assists detection, proposing obvious features instead of making someone type them, and smart polygons speed up footprint capture. Enterprise quality control runs before anything reaches the dataset  which matters on programmes collecting thousands of POIs a day, every one of which has to survive review.',
    highlights: ['Offline-first capture', 'AI POI detection', 'Smart polygons', 'Built-in QC'],
    image: '/pillars/poi_ex.webp',
    imageAlt: 'JSAN POI Express field data collection app',
  },
  {
    name: 'JSAN Travel Desk',
    category: 'Corporate Travel Management',
    brief:
      'Corporate travel built around approvals rather than bookings. Requests move through multi-stage approval chains with role-based permissions, quotations are raised and compared inside the system, and budget control is applied before spend rather than reported after it. Employee records, travel history and documentation sit in one place, so a finance or HR question can be answered directly instead of by reconstructing a trip from email threads.',
    highlights: ['Multi-stage approval', 'Employee management', 'Quotation system', 'Budget control'],
    image: '/pillars/travelDesk.webp',
    imageAlt: 'JSAN Travel Desk approval and booking workflow',
  },
  {
    name: 'JSAN GeoDiscover',
    category: 'Cross-Provider POI Discovery',
    brief:
      'Compares point-of-interest coverage across independent map providers and shows what each one is missing. A dual-provider sweep runs across your geography and your categories, and every finding is graded by evidence tier, so a gap can be trusted or challenged rather than simply asserted. Cost guardrails keep API spend predictable on large sweeps, and the output is an audited workbook rather than a raw dump  you can see how each gap was established.',
    highlights: ['Dual-provider sweep', 'Evidence tiers', 'Cost guardrails', 'Audited workbook'],
    image: '/pillars/geodiscover.webp',
    imageAlt: 'JSAN GeoDiscover cross-provider POI comparison',
  },
]
