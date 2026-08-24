import type { LucideIcon } from 'lucide-react'
import { Map, Truck, Brain, Antenna, Code, ClipboardList } from 'lucide-react'

/**
 * The six capability pillars, each a real page at /capabilities/<slug>.
 *
 * This is the hub layer. The deep pages already exist  detailed service pages under
 * /services/* and individual capability pages under /capabilities/<capability-slug>  and
 * every pillar links into them rather than restating their content.
 *
 * `group` must match the group name used in the header's Capabilities menu, so the menu,
 * the landing page and these pages cannot drift apart.
 */
export type CapabilityPillar = {
  slug: string
  group: string
  name: string
  icon: LucideIcon
  /** One line, used on the landing page card and as the page subtitle. */
  summary: string
  description: string
  image: string
  imageAlt: string
  /** Which lifecycle stages this pillar owns, matching OperationalLifecycle. */
  stages: string[]
  /** What the pillar actually delivers. Each links to the page that details it. */
  services: { name: string; href: string; description: string }[]
  outcomes: string[]
  industries: { name: string; href: string }[]
}

export const capabilityPillars: CapabilityPillar[] = [
  {
    slug: 'geospatial-mapping',
    group: 'Geospatial & Mapping',
    name: 'Geospatial & Mapping',
    icon: Map,
    summary: 'Capture the world as structured, routable, field-verified geospatial data.',
    description:
      'Street-level imagery, LiDAR, road networks, addresses and POIs, built to your schema and reconciled against ground truth. This is the map layer navigation, logistics and mobility platforms route on  compiled from our own capture, authoritative sources and field crews, then validated before it reaches production.',
    image: '/pillars/mapping.png',
    imageAlt: 'Street-level capture and structured road network data',
    stages: ['Collect', 'Process', 'Validate', 'Deliver'],
    services: [
      {
        name: 'Street-Level Imagery',
        href: '/services/global-street-data-collection',
        description: '360° imagery and mobile LiDAR runs, planned, driven and processed to specification.',
      },
      {
        name: 'LiDAR & 3D Mapping',
        href: '/services/geospatial',
        description: 'Point cloud capture, classification and 3D products for mapping and engineering.',
      },
      {
        name: 'Road Network & Geometry',
        href: '/capabilities/road-network-geometry',
        description: 'Routable centrelines, connectivity, turn restrictions and navigation attribution.',
      },
      {
        name: 'POI & Address Intelligence',
        href: '/services/basemap-poi-annotation',
        description: 'Evidence-backed POI and address operations against a controlled ontology.',
      },
      {
        name: 'GIS Data Engineering',
        href: '/technologies/gis',
        description: 'Schema design, conflation, topology and the pipelines that keep data current.',
      },
      {
        name: 'Field Verification',
        href: '/capabilities/field-verification',
        description: 'Crews on site closing the gap between the record and what is actually there.',
      },
    ],
    outcomes: [
      'One map layer built to your schema, not a set of incompatible deliveries',
      'Positional and attribute quality checked before data enters production',
      'Change captured on a refresh cycle rather than as one-off collection',
    ],
    industries: [
      { name: 'Mapping & Location Platforms', href: '/industries/mapping-location-platforms' },
      { name: 'Autonomous Mobility', href: '/industries/autonomous-mobility' },
    ],
  },
  {
    slug: 'global-fleet-field-operations',
    group: 'Global Fleet & Field Operations',
    name: 'Global Fleet & Field Operations',
    icon: Truck,
    summary: 'Stand up vehicles, sensors and crews in market, and run them safely at scale.',
    description:
      'Managed collection fleets, country by country. Vehicles and sensor rigs, local driver and crew hiring, permits, drive planning and dispatch, live tracking, maintenance and safety  the operational machinery that turns a coverage target into kilometres actually driven.',
    image: '/pillars/globalfleet.png',
    imageAlt: 'JSAN collection fleet and field crews mobilised in market',
    stages: ['Mobilise', 'Collect', 'Operate'],
    services: [
      {
        name: 'Fleet Mobilisation',
        href: '/services/global-fleet-collection-operations',
        description: 'Vehicles, sensor rigs and local operations stood up market by market.',
      },
      {
        name: 'Collection Operations',
        href: '/services/global-street-data-collection',
        description: 'Daily drive execution against coverage targets, with operational reporting.',
      },
      {
        name: 'Crew Operations',
        href: '/services/staffing-solutions',
        description: 'Recruitment, induction and management of local drivers and field crews.',
      },
      {
        name: 'Planning & Dispatch',
        href: '/capabilities/planning-dispatch',
        description: 'Coverage modelling, drive schedules, live tasking and re-planning.',
      },
      {
        name: 'Tracking & Telematics',
        href: '/products/jsan-vts',
        description: 'Live vehicle tracking and in-run checks through JSAN VTS.',
      },
      {
        name: 'Safety & Compliance',
        href: '/capabilities/safety-compliance',
        description: 'Crew safety, vehicle compliance, permits and defensible records.',
      },
    ],
    outcomes: [
      'Coverage delivered against plan, reported per drive and per cycle',
      'Local hiring, permitting and access handled market by market',
      'Safety and compliance evidenced rather than asserted',
    ],
    industries: [
      { name: 'Mapping & Location Platforms', href: '/industries/mapping-location-platforms' },
      { name: 'Autonomous Mobility', href: '/industries/autonomous-mobility' },
    ],
  },
  {
    slug: 'geoai-data-operations',
    group: 'GeoAI & Data Operations',
    name: 'GeoAI & Data Operations',
    icon: Brain,
    summary: 'Turn imagery and point clouds into validated, decision-ready information.',
    description:
      'Computer vision, LiDAR feature extraction, OCR and annotation, run as production operations rather than experiments. Automation does the volume; trained reviewers handle what automation cannot be trusted with, and accuracy rests on calibration and sampling rather than model confidence alone.',
    image: '/pillars/computer_vision.png',
    imageAlt: 'Imagery with asset detection overlay and extracted features',
    stages: ['Process', 'Validate'],
    services: [
      {
        name: 'Computer Vision',
        href: '/services/geoai-computer-vision',
        description: 'Detection, segmentation and change detection at production scale.',
      },
      {
        name: 'LiDAR Feature Extraction',
        href: '/capabilities/lidar-feature-extraction',
        description: 'Raw point cloud to classified, usable geospatial features.',
      },
      {
        name: 'OCR & Sign Intelligence',
        href: '/capabilities/ocr-sign-intelligence',
        description: 'Reading signs, text and numbers into map attributes.',
      },
      {
        name: 'Location Analytics',
        href: '/services/location-intelligence',
        description: 'Spatial analysis that turns the data into an operational answer.',
      },
      {
        name: 'Human-in-the-Loop QA',
        href: '/capabilities/human-in-the-loop-qa',
        description: 'Trained reviewers where automation stops being reliable.',
      },
      {
        name: 'Data Validation',
        href: '/capabilities/data-validation',
        description: 'Schema, topology and truth, checked before production.',
      },
    ],
    outcomes: [
      'Extraction throughput without accepting unverified model output',
      'Quality measured with sampling, calibration and reviewer agreement',
      'Evidence attached to features, so corrections can be defended',
    ],
    industries: [
      { name: 'Autonomous Mobility', href: '/industries/autonomous-mobility' },
      { name: 'Transportation & Infrastructure', href: '/industries/transportation-infrastructure' },
    ],
  },
  {
    slug: 'telecom-infrastructure',
    group: 'Telecom & Infrastructure',
    name: 'Telecom & Infrastructure',
    icon: Antenna,
    summary: 'Field evidence, network GIS and engineering for build and asset programmes.',
    description:
      'Telecom GIS, fibre engineering, pole and asset intelligence, 5G siting and as-built validation. Survey crews mobilise against live build schedules, capture is reconciled to design, and exceptions are raised rather than absorbed quietly into the network record.',
    image: '/pillars/telecommunications.png',
    imageAlt: 'Telecom network survey, pole assets and fibre engineering',
    stages: ['Collect', 'Process', 'Validate', 'Deliver'],
    services: [
      {
        name: 'Telecom GIS',
        href: '/services/telecom-network-intelligence',
        description: 'Network GIS, asset records and operational spatial data for operators.',
      },
      {
        name: 'Fiber Engineering',
        href: '/services/smart-fiber-planning',
        description: 'FTTx planning, route design and build support workflows.',
      },
      {
        name: 'Pole & Asset Intelligence',
        href: '/services/utility-network-intelligence',
        description: 'Pole loading, attachment and asset condition intelligence.',
      },
      {
        name: '5G & Small Cells',
        href: '/capabilities/5g-small-cells',
        description: 'Siting, candidate assessment and deployment support.',
      },
      {
        name: 'LiDAR Engineering',
        href: '/capabilities/lidar-engineering',
        description: 'Clearance, sag and engineering measurement from point clouds.',
      },
      {
        name: 'As-Built Validation',
        href: '/capabilities/as-built-validation',
        description: 'Built network reconciled against design before it enters the record.',
      },
    ],
    outcomes: [
      'A network record that matches what is physically installed',
      'Engineering-grade measurement where clearance and sag matter',
      'Exceptions surfaced during the build, not discovered afterwards',
    ],
    industries: [
      { name: 'Telecommunications', href: '/industries/telecommunications' },
      { name: 'Utilities', href: '/industries/utilities' },
    ],
  },
  {
    slug: 'digital-engineering',
    group: 'Digital Engineering',
    name: 'Digital Engineering',
    icon: Code,
    summary: 'Build the systems that put validated data in front of the people using it.',
    description:
      'Web GIS, enterprise applications, mobile tools, APIs, cloud and operational dashboards. The stage where geospatial work stops being a delivery of files and becomes something planning, field and operations teams use every day.',
    image: '/pillars/engineer.png',
    imageAlt: 'JSAN operational dashboard and web GIS application',
    stages: ['Deliver'],
    services: [
      {
        name: 'Web GIS',
        href: '/services/digital-engineering',
        description: 'Spatial applications built for operational use, not demos.',
      },
      {
        name: 'Enterprise Applications',
        href: '/services/erp',
        description: 'Enterprise systems and integrations around the operating model.',
      },
      {
        name: 'Cloud Platforms',
        href: '/technologies/cloud',
        description: 'Cloud engineering for pipelines, storage and delivery at scale.',
      },
      {
        name: 'API Integration',
        href: '/technologies/api-integration',
        description: 'Data served to the systems that need it, on contract.',
      },
      {
        name: 'Data Engineering',
        href: '/technologies/data-warehouse',
        description: 'Pipelines, warehousing and the plumbing behind reporting.',
      },
      {
        name: 'Operational Dashboards',
        href: '/technologies/analytics',
        description: 'The daily operating picture: coverage, quality, productivity, risk.',
      },
    ],
    outcomes: [
      'Data reaching operational teams in the systems they already work in',
      'One operating picture across field, data and engineering functions',
      'Integrations maintained as a service rather than handed over and forgotten',
    ],
    industries: [
      { name: 'Government & Smart Cities', href: '/industries/government-smart-cities' },
      { name: 'Telecommunications', href: '/industries/telecommunications' },
    ],
  },
  {
    slug: 'program-managed-services',
    group: 'Program & Managed Services',
    name: 'Program & Managed Services',
    icon: ClipboardList,
    summary: 'One accountable governance layer between you and every delivery function.',
    description:
      'Programme management, PMO, quality operations, data operations and workforce solutions. Scope, risk and performance controlled in one place, with structured reporting and defined escalation paths, so a multi-function programme has a single point of accountability.',
    image: '/pillars/program_manage.png',
    imageAlt: 'Programme governance, reporting and delivery oversight',
    stages: ['Mobilise', 'Operate', 'Validate', 'Deliver'],
    services: [
      {
        name: 'Program Management',
        href: '/services/program-management',
        description: 'End-to-end programme delivery against scope, cost and schedule.',
      },
      {
        name: 'PMO',
        href: '/capabilities/pmo',
        description: 'Governance structure, cadence, reporting and controls.',
      },
      {
        name: 'Quality Operations',
        href: '/capabilities/quality-operations',
        description: 'QA gates, sampling and reviewer calibration inside delivery.',
      },
      {
        name: 'Data Operations',
        href: '/capabilities/data-operations',
        description: 'Production data operations run to throughput and quality targets.',
      },
      {
        name: 'Workforce Solutions',
        href: '/services/staffing-solutions',
        description: 'Teams sourced, trained and managed for programme demand.',
      },
      {
        name: 'Managed Delivery',
        href: '/technologies/it-infrastructure',
        description: 'Ongoing managed operations once the programme is running.',
      },
    ],
    outcomes: [
      'A single point of accountability across field, data and engineering',
      'Risks and escalations surfaced early, in an agreed reporting cadence',
      'Scale up or down without renegotiating the operating model each time',
    ],
    industries: [
      { name: 'Government & Smart Cities', href: '/industries/government-smart-cities' },
      { name: 'Mapping & Location Platforms', href: '/industries/mapping-location-platforms' },
    ],
  },
]

export function pillarBySlug(slug: string | undefined) {
  return capabilityPillars.find((p) => p.slug === slug)
}
