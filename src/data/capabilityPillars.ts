import { spatialApplicationPages } from './capabilityDeepDives'
import type { LucideIcon } from 'lucide-react'
import { Map, Truck, Brain, Scan, Code, ClipboardList } from 'lucide-react'

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
    slug: 'spatial-applications-engineering',
    group: 'Spatial Applications & Engineering',
    name: 'Spatial Applications & Engineering',
    icon: Code,
    summary: 'Develop GIS applications, engineer digital twins and connect spatial systems.',
    description: 'Esri and GIS application development, BIM and digital twin engineering, and spatial APIs and systems integration. We bring application, model and integration expertise together so spatial information supports everyday engineering and operations.',
    image: '/pillars/esri.webp',
    imageAlt: 'Spatial applications and GIS engineering',
    stages: ['Process', 'Validate', 'Deliver', 'Operate'],
    services: spatialApplicationPages.map((page) => ({
      name: page.title, href: `/capabilities/${page.slug}`, description: page.description,
    })),
    outcomes: [
      'GIS applications configured around operational workflows',
      'Coordinated building models and asset information connected to GIS',
      'Spatial data available through maintained APIs and system interfaces',
    ],
    industries: [
      { name: 'Government & Smart Cities', href: '/industries/government-smart-cities' },
      { name: 'Transportation & Infrastructure', href: '/industries/transportation-infrastructure' },
      { name: 'Utilities', href: '/industries/utilities' },
    ],
  },
  {
    slug: 'geospatial-mapping',
    group: 'Geospatial & Mapping',
    name: 'Geospatial & Mapping',
    icon: Map,
    summary: 'Build, manage, analyse and visualise geospatial data that operations can rely on.',
    description:
      'Road networks, basemaps, addresses and POIs, navigation data, remote sensing and enterprise GIS, built to your schema and reconciled against ground truth. We cover the full geospatial lifecycle, from capture and data engineering to spatial analysis and visualisation, so mapping, logistics, mobility and public-sector teams work from one trusted spatial record.',
    image: '/pillars/mapping.webp',
    imageAlt: 'Structured road network, basemap and geospatial data layers',
    stages: ['Collect', 'Process', 'Validate', 'Deliver'],
    services: [
      {
        name: 'Road Network & Geometry',
        href: '/capabilities/road-network-geometry',
        description: 'Routable centrelines, connectivity, turn restrictions and navigation attribution.',
      },
      {
        name: 'Basemap, POI & Address Intelligence',
        href: '/services/basemap-poi-annotation',
        description: 'Evidence-backed basemap, POI and address operations against a controlled ontology.',
      },
      {
        name: 'Navigation Data',
        href: '/capabilities/navigation-data',
        description: 'Map attribution, restrictions and change detection for routing and navigation products.',
      },
      {
        name: 'Spatial Analysis',
        href: '/capabilities/spatial-analysis',
        description: 'Geostatistics, suitability and demand modelling that turn location into decisions.',
      },
      {
        name: 'GIS Data Engineering',
        href: '/technologies/gis',
        description: 'Schema design, conflation, topology and the pipelines that keep data current.',
      },
      {
        name: 'Enterprise GIS & Data Management',
        href: '/capabilities/enterprise-gis-data-management',
        description: 'Spatial databases, governance and GIS platforms that scale across the organisation.',
      },
      {
        name: 'Remote Sensing & Earth Observation',
        href: '/capabilities/remote-sensing-earth-observation',
        description: 'Satellite and aerial imagery classified into land cover, change and feature layers.',
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
      'Spatial analysis and visualisation built on data that has already been validated',
      'Change captured on a refresh cycle rather than as one-off collection',
    ],
    industries: [
      { name: 'Mapping & Location Platforms', href: '/industries/mapping-location-platforms' },
      { name: 'Autonomous Mobility', href: '/industries/autonomous-mobility' },
      { name: 'Government & Smart Cities', href: '/industries/government-smart-cities' },
    ],
  },
  {
    slug: 'global-fleet-field-operations',
    group: 'Global Fleet & Field Operations',
    name: 'Global Fleet & Field Operations',
    icon: Truck,
    summary: 'Stand up vehicles, sensors and crews in market, and run them safely at scale.',
    description:
      'Managed collection fleets, country by country. Vehicles and sensor rigs, local driver and crew hiring, permits, drive planning and dispatch, live tracking, maintenance and safety — the operational machinery that turns a coverage target into kilometres actually driven.',
    image: '/pillars/globalfleet.webp',
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
        href: '/products',
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
    slug: 'visual-ai-assisted-data-annotation',
    group: 'Visual & AI-Assisted Data Annotation',
    name: 'Visual & AI-Assisted Data Annotation',
    icon: Brain,
    summary: 'Turn imagery and point clouds into validated, decision-ready information.',
    description:
      'Computer vision, OCR and annotation, run as production operations rather than experiments. Automation does the volume; trained reviewers handle what automation cannot be trusted with, and accuracy rests on calibration and sampling rather than model confidence alone.',
    image: '/pillars/computer_vision.webp',
    imageAlt: 'Imagery with asset detection overlay and extracted features',
    stages: ['Process', 'Validate'],
    services: [
      {
        name: 'Computer Vision',
        href: '/services/geoai-computer-vision',
        description: 'Detection, segmentation and change detection at production scale.',
      },
      {
        name: '2D & 3D Annotation & Segmentation',
        href: '/capabilities/2d-3d-annotation-segmentation',
        description: 'Boxes, polygons and masks on imagery; cuboids and point-level classes on LiDAR.',
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
    slug: 'lidar-3d-intelligence',
    group: 'LiDAR & 3D Intelligence',
    name: 'LiDAR & 3D Intelligence',
    icon: Scan,
    summary: 'Turn aerial, mobile and terrestrial scans into measured, engineering-grade 3D intelligence.',
    description:
      'Drone, aerial and mobile LiDAR capture, point cloud classification, feature extraction, 3D modelling and engineering analysis. Scan data is processed into classified features, corridor models and digital twins, then validated against design and ground truth so it can be measured from, built from and trusted in the asset record.',
    image: '/pillars/lidar_engineering.webp',
    imageAlt: 'Classified LiDAR point cloud and 3D corridor model',
    stages: ['Collect', 'Process', 'Validate', 'Deliver'],
    services: [
      {
        name: 'Aerial & Drone LiDAR Mapping',
        href: '/capabilities/aerial-drone-lidar-mapping',
        description: 'Drone and aerial LiDAR capture, orthomosaics and terrain models to specification.',
      },
      {
        name: 'LiDAR Feature Extraction',
        href: '/capabilities/lidar-feature-extraction',
        description: 'Raw point cloud to classified, usable geospatial features.',
      },
      {
        name: 'LiDAR Engineering',
        href: '/capabilities/lidar-engineering',
        description: 'Clearance, sag, loading and encroachment measured from point clouds.',
      },
      {
        name: '3D Modelling & Digital Twins',
        href: '/capabilities/3d-modelling-digital-twins',
        description: '3D city, corridor and asset models built for simulation, monitoring and planning.',
      },
      {
        name: 'Pole & Asset Intelligence',
        href: '/services/pole-asset-intelligence',
        description: 'Pole, attachment and asset condition captured and measured at programme scale.',
      },
      {
        name: 'As-Built Validation',
        href: '/capabilities/as-built-validation',
        description: 'Built infrastructure reconciled against design before it enters the record.',
      },
    ],
    outcomes: [
      'Point clouds turned into classified features and models, not left as raw scans',
      'Engineering-grade measurement where clearance, sag and loading matter',
      'Records that match what is physically built, with exceptions surfaced early',
    ],
    industries: [
      { name: 'Telecommunications', href: '/industries/telecommunications' },
      { name: 'Utilities', href: '/industries/utilities' },
      { name: 'Transportation & Infrastructure', href: '/industries/transportation-infrastructure' },
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
    image: '/pillars/engineer.webp',
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
    image: '/pillars/program_manage.webp',
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
