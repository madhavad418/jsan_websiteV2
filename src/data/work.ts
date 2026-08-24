/**
 * Case studies. One source for the homepage Featured Work section, the /work index and
 * every /work/<slug> page, so a programme cannot say one thing on the homepage and
 * another on its own page.
 *
 * Anonymised until client naming permission is in place. Swap `client` in once approved.
 *
 * NO INVENTED NUMBERS. Scale and outcome are written qualitatively on purpose  every
 * numerical claim has to be verified before it appears here. Where a figure is approved,
 * add it to the `scale` / `outcome` copy and record the source in the case study brief.
 */
export type CaseStudy = {
  /** URL segment: /work/<slug> */
  slug: string
  number: string
  title: string
  summary: string
  tags: string[]
  image: string
  challenge: string
  role: string
  operatingModel: string
  technology: string
  scale: string
  outcome: string
  /** Lifecycle stages this programme actually ran, matching OperationalLifecycle. */
  stages: string[]
  /** Where to read more about the capability behind the work. */
  capabilities: { name: string; href: string }[]
  industry: { name: string; href: string }
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'multi-country-mapping',
    number: '01',
    title: 'Multi-Country Mapping Operations',
    summary:
      'Mobilising field teams, collection vehicles, route operations, data logistics and QA for large-scale street-level mapping.',
    tags: ['Field Operations', 'Fleet', 'Mapping', 'QA'],
    image: '/pillars/multi_country.png',
    challenge:
      'A mapping programme needed consistent street-level coverage across several countries, where addressing conventions, permitting and local access rules differ at every border, and where earlier collection had produced uneven quality between markets.',
    role: 'End-to-end delivery partner for mobilisation, collection, data logistics and quality assurance.',
    operatingModel:
      'Mobilise and Collect, running into Process and Validate. Vehicles, sensor rigs and local crews stood up market by market, with drive planning, dispatch and daily operational reporting against coverage targets.',
    technology:
      'Panoramic and street-level imagery capture, LiDAR runs, GIS data engineering, annotation tooling and a QA workflow with reviewer calibration.',
    scale:
      'Multi-country programme run across more than one delivery region, on a recurring refresh cycle rather than one-off capture.',
    outcome:
      'Consistent capture specification and QA standard applied across every market, with coverage and productivity reported per drive and per cycle.',
    stages: ['Mobilise', 'Collect', 'Operate', 'Process', 'Validate', 'Deliver'],
    capabilities: [
      { name: 'Global Fleet & Field Operations', href: '/capabilities/global-fleet-field-operations' },
      { name: 'Geospatial & Mapping', href: '/capabilities/geospatial-mapping' },
    ],
    industry: { name: 'Mapping & Location Platforms', href: '/industries/mapping-location-platforms' },
  },
  {
    slug: 'lidar-infrastructure-intelligence',
    number: '02',
    title: 'LiDAR & Infrastructure Intelligence',
    summary:
      'Processing LiDAR and panoramic imagery into validated engineering and GIS-ready asset intelligence.',
    tags: ['LiDAR', 'Computer Vision', 'GIS', 'Infrastructure'],
    image: '/pillars/lidar_infrastructure.png',
    challenge:
      'Raw LiDAR and imagery held the asset detail engineering teams needed, but not in a form they could plan against  features were unextracted, unclassified and unreconciled with the existing asset record.',
    role: 'Data operations partner for feature extraction, classification, validation and GIS delivery.',
    operatingModel:
      'Process and Validate. Automated extraction paired with human-in-the-loop review, so accuracy rests on reviewer calibration and sampling rather than model confidence alone.',
    technology:
      'LiDAR feature extraction, computer vision and OCR, controlled-ontology annotation, spatial analytics and GIS data engineering.',
    scale:
      'Production-scale processing pipeline operating continuously rather than as a fixed-term extraction project.',
    outcome:
      'Engineering-grade asset intelligence delivered into GIS with classification, positional quality and evidence attached to each feature.',
    stages: ['Process', 'Validate', 'Deliver'],
    capabilities: [
      { name: 'GeoAI & Data Operations', href: '/capabilities/geoai-data-operations' },
      { name: 'Telecom & Infrastructure', href: '/capabilities/telecom-infrastructure' },
    ],
    industry: { name: 'Transportation & Infrastructure', href: '/industries/transportation-infrastructure' },
  },
  {
    slug: 'telecom-network-engineering',
    number: '03',
    title: 'Telecom Network Engineering',
    summary:
      'Combining field evidence, GIS and engineering workflows to support telecom network planning and infrastructure validation.',
    tags: ['Telecom', 'GIS', 'Engineering', 'Field Operations'],
    image: '/pillars/telecom_network_engineering.png',
    challenge:
      'As-built network records had drifted from design across an active build programme, leaving planning teams working from a network view that no longer matched what was physically installed.',
    role: 'Field survey, network GIS and as-built validation partner alongside the operator’s engineering function.',
    operatingModel:
      'Operate, Map and Validate. Survey crews mobilised against live build schedules, capture reconciled to design, and exceptions raised rather than absorbed into the record.',
    technology:
      'Telecom GIS, pole and asset survey, fibre planning workflows, LiDAR where clearance mattered, and operational dashboards for planning teams.',
    scale:
      'Sustained programme support spanning survey, validation and the systems planning teams work in daily.',
    outcome:
      'A network record reconciled against design, with attribute and coordinate quality checked before entering the system of record.',
    stages: ['Mobilise', 'Collect', 'Operate', 'Validate', 'Deliver'],
    capabilities: [
      { name: 'Telecom & Infrastructure', href: '/capabilities/telecom-infrastructure' },
      { name: 'Digital Engineering', href: '/capabilities/digital-engineering' },
    ],
    industry: { name: 'Telecommunications', href: '/industries/telecommunications' },
  },
]

export function caseStudyBySlug(slug: string | undefined) {
  return caseStudies.find((cs) => cs.slug === slug)
}
