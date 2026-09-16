import {
  Activity,
  AlertTriangle,
  ArrowUpCircle,
  BarChart3,
  Bot,
  Box,
  Boxes,
  BoxSelect,
  Building2,
  Camera,
  Car,
  ClipboardCheck,
  Cloud,
  Code,
  Combine,
  Compass,
  Construction,
  Crosshair,
  Database,
  Eye,
  FileCheck,
  FileCode,
  FileSearch,
  Gauge,
  GitCompare,
  GitMerge,
  Globe,
  Key,
  Layers,
  LayoutDashboard,
  Leaf,
  LifeBuoy,
  Link2,
  Lock,
  Map,
  MapPin,
  MonitorSmartphone,
  Mountain,
  Navigation,
  Network,
  Orbit,
  Plane,
  Plug,
  RefreshCw,
  Rotate3d,
  Route,
  Ruler,
  Satellite,
  Scan,
  ScanLine,
  Server,
  Shapes,
  Share2,
  ShieldCheck,
  Signpost,
  Smartphone,
  Sparkles,
  Target,
  Terminal,
  Timer,
  Trees,
  TrendingUp,
  Truck,
  Users,
  Workflow,
  Wrench,
  Zap,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { TechGroup } from '../components/TechMatrix'
import type { Scenario } from '../components/ScenarioExplorer'
import type { ProcessStep } from '../components/ProcessFlow'

/**
 * The Technology Support pages.
 *
 * These are the pages a technical buyer lands on, and they are read differently from the
 * rest of the site: nobody arrives at "Application Support" to be told support matters.
 * They arrive to find out whether we work with their stack and whether we have met their
 * problem before. So each page leads with a browsable inventory of what we work on, then a
 * set of situations in the customer's own words - not a capability statement.
 *
 * Everything here is qualitative on purpose. No response times, uptime percentages or
 * client counts appear anywhere in this file, because those are commercial commitments and
 * they belong in a signed service level agreement rather than on a marketing page. Where a
 * page needs to talk about targets it says "agreed" and leaves the number to the contract.
 */

export type EngagementModel = {
  name: string
  icon: LucideIcon
  detail: string
}

export type DeepDiveGroup =
  | 'Spatial Applications & Engineering'
  | 'Technology Support'
  | 'BIM Capabilities'
  | 'Esri Capabilities'
  | 'Data Center & IT Infrastructure'
  | 'Visual & AI-Assisted Data Annotation'
  | 'Geospatial & Mapping'
  | 'LiDAR & 3D Intelligence'

/** Menu group, used for the eyebrow and the sibling strip at the foot of each page. */
export const groupLabel: Record<DeepDiveGroup, string> = {
  'Spatial Applications & Engineering': 'Spatial Applications & Engineering',
  'Technology Support': 'Technology Support',
  'BIM Capabilities': 'BIM Capabilities',
  'Esri Capabilities': 'Esri Capabilities',
  'Data Center & IT Infrastructure': 'Data Center & IT Infrastructure',
  'Visual & AI-Assisted Data Annotation': 'Visual & AI-Assisted Data Annotation',
  'Geospatial & Mapping': 'Geospatial & Mapping',
  'LiDAR & 3D Intelligence': 'LiDAR & 3D Intelligence',
}

export type DeepDivePage = {
  slug: string
  group: DeepDiveGroup
  navLabel: string
  eyebrowIcon: LucideIcon
  title: string
  subtitle: string
  description: string
  image: string
  imageAlt: string
  copySide?: 'left' | 'right'
  /** 'cards' renders What we deliver as compact icon cards with no photographs. Default: photo panels. */
  techLayout?: 'panels' | 'cards'
  imagePosition?: string
  /** Three claims under the hero. Positioning, not statistics. */
  positioning: { icon: LucideIcon; title: string; detail: string }[]
  tech: { eyebrow: string; heading: string; intro: string; groups: TechGroup[] }
  scenarios: { eyebrow: string; heading: string; intro: string; items: Scenario[]; collections?: { name: string; items: Scenario[] }[] }
  workflow: { heading: string; intro: string; steps: ProcessStep[] }
  engagement: { heading: string; intro: string; models: EngagementModel[] }
}

/* ------------------------------------------------------------------ shared engagement */

/** How the work is bought. The same three shapes apply across all four pages. */
const ENGAGEMENT_MODELS: EngagementModel[] = [
  {
    name: 'Managed support',
    icon: LifeBuoy,
    detail:
      'A standing arrangement with agreed priorities, response targets and escalation paths. Best where the system is business-critical and somebody has to own it between incidents, not just during them.',
  },
  {
    name: 'Blocks of hours',
    icon: Timer,
    detail:
      'A drawn-down pool of time for estates that need expert attention occasionally rather than continuously. No monthly commitment, and unused capacity is visible rather than quietly absorbed.',
  },
  {
    name: 'Embedded specialists',
    icon: Users,
    detail:
      'Our engineers working inside your team, to your process and your board. Best where you have the governance and the domain knowledge but not the specialist capacity.',
  },
]

/* ------------------------------------------------------------------ application support */

/**
 * Application Support is the GIS applications page.
 *
 * It briefly had a sibling called "GIS Tools Support", which was a mistake: the two were
 * describing the same buyer with the same problem, and a reader would have had to guess
 * which one their slow map service belonged under. They are merged here.
 *
 * The boundary that does hold is with Esri Platform Support. This page supports GIS
 * applications across every vendor and tier. That page administers an ArcGIS Enterprise or
 * Online deployment specifically - versions, federation, governance, licensing. Someone
 * with a broken QGIS plugin wants this page; someone whose portal is three versions out of
 * support wants that one.
 */
const applicationSupport: DeepDivePage = {
  slug: 'application-support',
  group: 'Technology Support',
  navLabel: 'Application Support',
  eyebrowIcon: Layers,
  title: 'Application Support',
  subtitle: 'Your GIS estate is not one product. Your support should not be either.',
  description:
    'ArcGIS, QGIS, GeoServer, PostGIS, FME and the web viewers built on top of them. We support GIS applications across desktop, server, database and browser - the ones we built and the ones we inherited - so a user with a problem has one place to take it instead of three vendors and a guess.',
  image: '/pillars/app_support.webp',
  imageAlt: 'GIS specialists supporting desktop, server and web applications',
  copySide: 'right',
  positioning: [
    {
      icon: Boxes,
      title: 'One arrangement across the whole estate',
      detail:
        'Not one contract for Esri, another for open source and a gap where the scripts live. GIS estates fail across product boundaries, so they are supported as a single thing.',
    },
    {
      icon: FileSearch,
      title: 'We take it on before we support it',
      detail:
        'Environment access, an architecture walkthrough, the known issues and the runbook gaps that always exist. Support that starts without a transition is guesswork by the second week.',
    },
    {
      icon: Database,
      title: 'Spatial performance is a discipline',
      detail:
        'Slow maps are usually indexes, geometry validity, projection handling or tiling strategy. We treat tuning as continuous work rather than a one-off exercise.',
    },
  ],
  tech: {
    eyebrow: 'What we support',
    heading: 'Every GIS application in the estate, whoever makes it',
    intro:
      'Most estates are mixed, and the interesting failures happen where two products meet. This is the ground we cover, from desktop authoring through the spatial database to the viewer in the browser.',
    groups: [
      {
        name: 'Esri applications',
        icon: Globe,
        blurb:
          'The commercial core of most estates, from desktop authoring to the field apps on top. Administering the deployment itself is its own discipline - that is Esri Platform Support.',
        image: '/pillars/app_1.webp',
        items: [
          'ArcGIS Pro', 'ArcMap migration', 'ArcGIS Enterprise', 'ArcGIS Online',
          'ArcGIS Server', 'Portal for ArcGIS', 'Experience Builder', 'Web AppBuilder',
          'ArcGIS Dashboards', 'StoryMaps', 'Field Maps', 'Survey123', 'QuickCapture',
          'Workforce', 'Enterprise geodatabase', 'Branch versioning',
        ],
      },
      {
        name: 'Open-source GIS',
        icon: Map,
        blurb:
          'Desktop and server tooling carrying real production load, which needs the same administration discipline as anything licensed.',
        image: '/pillars/app_2.webp',
        items: [
          'QGIS', 'QGIS Server', 'QField', 'GeoServer', 'MapServer', 'GRASS GIS',
          'GeoNetwork', 'pycsw', 'PROJ', 'GEOS', 'Plugin development', 'Print layouts & atlases',
        ],
      },
      {
        name: 'Spatial databases',
        icon: Database,
        blurb:
          'Where the data actually lives, and where most performance problems are eventually traced to.',
        image: '/pillars/app_3.webp',
        items: [
          'PostgreSQL / PostGIS', 'Oracle Spatial', 'SQL Server Spatial', 'SpatiaLite',
          'Spatial indexing', 'Geometry validation', 'Projection & SRID handling',
          'Query tuning', 'Partitioning', 'Replication', 'Backup & restore', 'Vacuum & maintenance',
        ],
      },
      {
        name: 'Web GIS & viewers',
        icon: Code,
        blurb:
          'The browser tier, where tiling strategy and payload size decide whether a map feels usable at all.',
        image: '/pillars/app_4.webp',
        items: [
          'Leaflet', 'OpenLayers', 'MapLibre GL', 'Mapbox GL JS', 'Cesium', 'Deck.gl',
          'ArcGIS Maps SDK for JavaScript', 'Vector tiles', 'Tile caching',
          'Basemap strategy', 'Custom viewers & portals', 'Embedded dashboards',
        ],
      },
      {
        name: 'Spatial ETL & automation',
        icon: Terminal,
        blurb:
          'The pipelines and scheduled jobs that move data between products, including the ones inherited without documentation.',
        image: '/pillars/app_5.webp',
        items: [
          'FME Form & Flow', 'GDAL / OGR', 'Python', 'GeoPandas', 'Shapely', 'Rasterio',
          'Fiona', 'ArcPy', 'ArcGIS API for Python', 'Apache Airflow',
          'Model Builder', 'Scheduled task recovery',
        ],
      },
      {
        name: 'Formats & interoperability',
        icon: FileCode,
        blurb:
          'Interchange between products, which is where estates quietly leak accuracy if nobody is watching.',
        image: '/pillars/app_6.webp',
        items: [
          'GeoPackage', 'Shapefile', 'File GDB', 'GeoJSON', 'GeoParquet',
          'WMS', 'WFS', 'WMTS', 'OGC API', 'Cloud Optimised GeoTIFF',
          'LAS / LAZ', 'CityGML', 'IFC', 'DWG / DGN',
        ],
      },
    ],
  },
  scenarios: {
    eyebrow: 'Where we come in',
    heading: 'Six problems that arrive on our desk',
    intro:
      'Different products, but the same handful of underlying failures. Pick the one that sounds like your week.',
    items: [
      {
        title: 'Map services have got slow',
        icon: Gauge,
        situation:
          'Layers that used to draw instantly now take seconds. Users have started blaming the network, and nobody can say which tier is actually responsible.',
        actions: [
          'Profile the full path: browser, service, database and disk',
          'Review spatial indexes, geometry validity and SRID handling',
          'Assess tiling, caching and generalisation strategy',
          'Tune service configuration and instance limits',
          'Rework the heaviest queries and layer definitions',
          'Add monitoring so the next regression is visible early',
        ],
        outcome:
          'Services respond at current data volumes, and you know which tier to look at when they do not.',
      },
      {
        title: 'A scheduled job stopped and nobody noticed',
        icon: AlertTriangle,
        situation:
          'A nightly pipeline has been failing silently. The data it produces is stale, and the person who wrote it left before anyone documented what it did.',
        actions: [
          'Locate and inventory every scheduled job across the estate',
          'Reconstruct what each one does and what depends on it',
          'Move jobs off individual desktops onto managed infrastructure',
          'Add failure alerting and run history',
          'Rebuild or replace the jobs that cannot be maintained',
          'Document each pipeline and its recovery procedure',
        ],
        outcome:
          'Automation runs somewhere visible, and a failure raises an alert instead of quietly ageing your data.',
      },
      {
        title: 'The vendor who built it has gone',
        icon: FileSearch,
        situation:
          'A GIS viewer or field application still runs, but nobody left in the business knows how. There is no documentation, the source may or may not be complete, and every change feels like a risk nobody wants to take.',
        actions: [
          'Recover and verify source, environments and deployment path',
          'Reconstruct the architecture from the running system',
          'Write the runbook that was never handed over',
          'Identify and prioritise the accumulated risk',
          'Re-establish a working build and release route',
          'Take on support against an agreed priority model',
        ],
        outcome:
          'The application stops being untouchable. Changes can be made deliberately, and the knowledge sits in documents rather than in a former employee.',
      },
      {
        title: 'Running an unsupported version',
        icon: ArrowUpCircle,
        situation:
          'The GIS platform is several versions behind, security patches no longer apply, and the upgrade has been deferred so long that it now looks like a project.',
        actions: [
          'Establish the current version and support position per component',
          'Map upgrade paths, including any mandatory intermediate versions',
          'Stand up a rehearsal environment that mirrors production',
          'Test data, services, scripts and integrations against the target',
          'Execute the upgrade with a defined rollback position',
          'Set a cadence so the gap does not reopen',
        ],
        outcome:
          'The estate is back inside vendor support, and future upgrades are a maintenance task rather than a business case.',
      },
      {
        title: 'Data is failing validation',
        icon: ShieldCheck,
        situation:
          'Geometries will not process, topology checks fail, and downstream systems reject exports. The cause is somewhere in a chain of transformations nobody fully owns.',
        actions: [
          'Diagnose validity, topology and projection errors at source',
          'Trace where in the pipeline the corruption is introduced',
          'Repair affected geometries with a documented rule set',
          'Add validation gates at the points data changes hands',
          'Reconcile the repaired dataset against its source of truth',
          'Automate the checks so the same class of error is caught early',
        ],
        outcome:
          'Data passes validation at the point it is created, rather than being repaired repeatedly at the point it is consumed.',
      },
      {
        title: 'No one owns it out of hours',
        icon: LifeBuoy,
        situation:
          'The GIS matters enough that an outage is serious, but support is whoever happens to be free. Escalation is a phone call to someone who may be on leave.',
        actions: [
          'Define priorities by business impact, not by reporter',
          'Agree response and resolution targets and put them in writing',
          'Establish escalation paths with named contacts',
          'Stand up incident logging and post-incident review',
          'Separate emergency changes from the scheduled stream',
          'Report on service performance at an agreed cadence',
        ],
        outcome:
          'Incidents have an owner and a clock. Routine work stops being displaced by whatever broke this morning.',
      },
    ],
  },
  workflow: {
    heading: 'How we take on a GIS estate',
    intro:
      'Discovery first, because no estate is documented the way its owners believe it is.',
    steps: [
      { icon: FileSearch, title: 'Discover', desc: 'Every application, version, owner and dependency, including the ones off the record.' },
      { icon: ShieldCheck, title: 'Define', desc: 'Priorities, response targets, escalation, and what is supported versus tolerated.' },
      { icon: Wrench, title: 'Stabilise', desc: 'Immediate risks: unsupported versions, silent failures, unowned jobs.' },
      { icon: Gauge, title: 'Operate', desc: 'Day-to-day support, upgrades and continuous spatial performance work.' },
      { icon: Boxes, title: 'Rationalise', desc: 'Duplicate tooling and orphaned scripts consolidated, the estate simplified.' },
    ],
  },
  engagement: {
    heading: 'Three ways to buy it',
    intro: 'The right shape depends on how critical the estate is and how much capacity you already have.',
    models: ENGAGEMENT_MODELS,
  },
}

/* ------------------------------------------------------------------ integration */

const integrationServices: DeepDivePage = {
  slug: 'integration-services',
  group: 'Technology Support',
  navLabel: 'Integration Services',
  eyebrowIcon: Plug,
  title: 'Integration Services',
  subtitle: 'Four systems, four versions of the truth, and no agreement on which one wins.',
  description:
    'The field app, the GIS, the asset register and the finance system each hold part of the picture. We design and build the interfaces between them - APIs, ETL, message queues, scheduled exchanges - and then monitor them, because an integration nobody watches is an outage waiting to be reported by a user.',
  image: '/pillars/integration.webp',
  imageAlt: 'Systems integration between geospatial and enterprise platforms',
  copySide: 'left',
  positioning: [
    {
      icon: Key,
      title: 'Ownership before code',
      detail:
        'Which system is authoritative for which field, and what happens when two disagree. Most integration failures are unresolved ownership rather than broken software.',
    },
    {
      icon: Link2,
      title: 'The contract outlives the implementation',
      detail:
        'Specification, field mapping, error handling and retry behaviour are agreed first, so the interface can be rebuilt later without renegotiating what it means.',
    },
    {
      icon: Activity,
      title: 'An unwatched interface is already broken',
      detail:
        'Every interface we build ships with monitoring, alerting and reconciliation. A stalled feed should page us, not surface as a week of bad data.',
    },
  ],
  tech: {
    eyebrow: 'What we work with',
    heading: 'Interfaces, platforms and the systems on either end',
    intro:
      'Integration work is defined by what sits at each end. This is the ground we cover, from the protocol up to the enterprise applications the data is going to.',
    groups: [
      {
        name: 'Interfaces & protocols',
        icon: Plug,
        blurb:
          'How systems are asked to talk, including the older mechanisms that are still holding production together.',
        image: '/pillars/Integration_1.webp',
        items: [
          'REST', 'GraphQL', 'SOAP / WSDL', 'gRPC', 'WebSockets', 'Webhooks',
          'OpenAPI / Swagger', 'OData', 'SFTP & file exchange', 'JDBC / ODBC',
        ],
      },
      {
        name: 'Integration platforms',
        icon: Network,
        blurb:
          'Where an organisation has standardised on a platform, we build inside it rather than beside it.',
        image: '/pillars/integration_2.webp',
        items: [
          'Azure Logic Apps', 'Azure Data Factory', 'AWS Glue', 'AWS Step Functions',
          'MuleSoft', 'Boomi', 'Apache NiFi', 'Talend', 'SSIS', 'Power Automate',
        ],
      },
      {
        name: 'Messaging & streaming',
        icon: Activity,
        blurb:
          'For volume, decoupling and telemetry, where a request-response call would not survive the load.',
        image: '/pillars/integration_3.webp',
        items: [
          'Apache Kafka', 'RabbitMQ', 'Azure Service Bus', 'AWS SQS / SNS',
          'MQTT', 'Event Grid', 'Change data capture', 'Dead letter handling',
        ],
      },
      {
        name: 'Spatial ETL',
        icon: Map,
        blurb:
          'Moving geospatial data specifically, where projection, geometry and schema drift all have to survive the trip.',
        image: '/pillars/integration_4.webp',
        items: [
          'FME Form & Flow', 'GDAL / OGR', 'Python', 'GeoPandas', 'Apache Airflow',
          'dbt', 'Coordinate transformation', 'Schema mapping', 'Delta detection',
        ],
      },
      {
        name: 'Enterprise systems',
        icon: Boxes,
        blurb:
          'The applications at the far end of most interfaces, each with its own idea of what an asset is.',
        image: '/pillars/integration_5.webp',
        items: [
          'SAP', 'Oracle E-Business Suite', 'Microsoft Dynamics 365', 'Salesforce',
          'IBM Maximo', 'ServiceNow', 'SharePoint', 'Workday', 'Sage',
          'ArcGIS Enterprise', 'Bespoke asset registers',
        ],
      },
      {
        name: 'Security & governance',
        icon: ShieldCheck,
        blurb:
          'Interfaces cross trust boundaries, so authentication and auditability are part of the design rather than added afterwards.',
        image: '/pillars/integration_6.webp',
        items: [
          'OAuth 2.0', 'OpenID Connect', 'SAML', 'JWT', 'mTLS',
          'API gateways', 'Rate limiting', 'Secrets management',
          'Audit logging', 'Data residency',
        ],
      },
    ],
  },
  scenarios: {
    eyebrow: 'Where we come in',
    heading: 'Six integration problems, and what they actually take',
    intro:
      'Integration rarely fails for technical reasons alone. Each of these has a design question underneath it.',
    items: [
      {
        title: 'GIS and the asset register disagree',
        icon: GitMerge,
        situation:
          'The GIS says one thing about an asset, the register says another, and both are used to make decisions. Nobody can say which should win, so people trust whichever they opened first.',
        actions: [
          'Establish authority per field, not per system',
          'Model the reconciliation rules for genuine conflicts',
          'Build the interface to that contract, both directions where needed',
          'Reconcile the existing divergence as a one-off exercise',
          'Add ongoing reconciliation reporting',
          'Define the escalation route for unresolvable conflicts',
        ],
        outcome:
          'One agreed answer per field, and disagreements surface as exceptions to be resolved rather than as two systems quietly drifting.',
      },
      {
        title: 'Data still moves by spreadsheet',
        icon: FileCode,
        situation:
          'Somebody exports a file every Monday, edits it, and uploads it somewhere else. It works until they are on leave, and nobody can reconstruct what was changed by hand.',
        actions: [
          'Document what the manual process actually does, including exceptions',
          'Design the automated equivalent with the edge cases included',
          'Build validation for the checks the person was doing implicitly',
          'Run automated and manual in parallel until they agree',
          'Add monitoring, alerting and an audit trail',
          'Retire the manual route deliberately, not by accident',
        ],
        outcome:
          'The exchange runs on a schedule with a record of what moved, and it no longer depends on one person\'s calendar.',
      },
      {
        title: 'The interface fails silently',
        icon: AlertTriangle,
        situation:
          'A feed stopped days ago and nobody knew until the data looked wrong. There is no alerting, no retry, and no record of what did or did not get through.',
        actions: [
          'Instrument the interface end to end',
          'Add structured error handling, retry and dead-letter handling',
          'Define what "healthy" means and alert on its absence',
          'Build reconciliation between source and destination counts',
          'Backfill the gap and verify the result',
          'Write the runbook for the next failure',
        ],
        outcome:
          'Failures announce themselves within minutes, and there is a documented route back to a consistent state.',
      },
      {
        title: 'Field data has nowhere to land',
        icon: MonitorSmartphone,
        situation:
          'Crews capture good data on a mobile app, but it stops at the app. Getting it into the enterprise platform is manual, delayed, or simply does not happen.',
        actions: [
          'Map the field schema onto the enterprise data model',
          'Design for intermittent connectivity and late arrivals',
          'Build the interface with idempotent, replay-safe writes',
          'Handle photographs, attachments and evidence payloads',
          'Add validation before data reaches the system of record',
          'Monitor arrival lag as an operational metric',
        ],
        outcome:
          'Fieldwork reaches the enterprise system on its own, with evidence attached and without a manual step in the middle.',
      },
      {
        title: 'Inherited interfaces nobody documented',
        icon: FileSearch,
        situation:
          'Several integrations are running that predate the current team. They mostly work, nobody knows exactly how, and everyone is afraid to touch the systems at either end.',
        actions: [
          'Discover and inventory every live interface',
          'Reverse-engineer payloads, schedules and field mappings',
          'Document each one to the standard a new build would get',
          'Identify fragility, security gaps and single points of failure',
          'Prioritise which to stabilise, replace or retire',
          'Bring the survivors under monitoring and support',
        ],
        outcome:
          'The integration estate becomes a known quantity, and the systems at either end can be changed without holding your breath.',
      },
      {
        title: 'Telemetry arriving faster than it can be handled',
        icon: Activity,
        situation:
          'Vehicle, sensor or IoT data is arriving continuously, and the current approach - polling, or a direct database write - is falling behind or dropping messages.',
        actions: [
          'Move ingestion onto a queue or stream with backpressure',
          'Separate ingestion from processing so spikes are absorbed',
          'Design idempotent processing for replay and duplicates',
          'Add partitioning and retention appropriate to the volume',
          'Build the downstream aggregation the reporting layer needs',
          'Load test at realistic and peak message rates',
        ],
        outcome:
          'The pipeline absorbs peaks rather than dropping them, and a processing outage becomes a delay rather than lost data.',
      },
    ],
  },
  workflow: {
    heading: 'How an integration is built',
    intro: 'The first two stages are design, not code. Skipping them is why integrations get rebuilt.',
    steps: [
      { icon: FileSearch, title: 'Map', desc: 'Which system owns which field, how often it changes, what happens on conflict.' },
      { icon: Link2, title: 'Contract', desc: 'Specification, field mapping, error handling and retry, agreed before build.' },
      { icon: Code, title: 'Build', desc: 'Implementation against the contract, with the failure cases tested deliberately.' },
      { icon: ShieldCheck, title: 'Prove', desc: 'Parallel running and reconciliation until both ends demonstrably agree.' },
      { icon: Activity, title: 'Watch', desc: 'Monitoring, alerting and periodic reconciliation for as long as it runs.' },
    ],
  },
  engagement: {
    heading: 'Three ways to buy it',
    intro: 'Build and hand over, build and run, or work alongside your own integration team.',
    models: ENGAGEMENT_MODELS,
  },
}

/* ------------------------------------------------------------------ Esri platform */

const esriPlatformSupport: DeepDivePage = {
  slug: 'esri-platform-support',
  group: 'Esri Capabilities',
  navLabel: 'Esri Platform Support',
  eyebrowIcon: Server,
  title: 'Esri Platform Support',
  subtitle: 'ArcGIS rewards administration and punishes neglect.',
  description:
    'We run ArcGIS Enterprise and ArcGIS Online estates - portal and server administration, service publishing, security and sharing models, licensing, and the version upgrades most teams postpone until they cannot - so the platform stays supported, performant and correctly licensed.',
  image: '/pillars/esri.webp',
  imageAlt: 'ArcGIS Enterprise administration and operational dashboards',
  copySide: 'left',
  positioning: [
    {
      icon: ArrowUpCircle,
      title: 'Staying inside the support window',
      detail:
        'Esri retires versions on a published schedule. We plan upgrades against it, so you are never running something the vendor will no longer help you fix.',
    },
    {
      icon: ShieldCheck,
      title: 'A portal, not a shared drive',
      detail:
        'Without a sharing and ownership model, a portal fills with untitled layers nobody will delete. Governance is what keeps it usable at year three.',
    },
    {
      icon: Key,
      title: 'Licences matched to actual use',
      detail:
        'Named-user assignments drift as people join and leave. We reconcile entitlement against real activity before renewal, not after it.',
    },
  ],
  tech: {
    eyebrow: 'What we administer',
    heading: 'The Esri platform, end to end',
    intro:
      'Enterprise and Online, the server roles beneath them, the apps on top and the developer surface around them.',
    groups: [
      {
        name: 'Core platform',
        icon: Server,
        blurb:
          'The deployment itself: portal, servers, data stores and the components that federate them.',
        image: '/pillars/esri_1.webp',
        items: [
          'ArcGIS Enterprise', 'ArcGIS Online', 'Portal for ArcGIS', 'ArcGIS Server',
          'ArcGIS Data Store', 'Web Adaptor', 'Enterprise Builder',
          'Single-machine & multi-machine', 'Highly available deployments', 'Kubernetes deployments',
        ],
      },
      {
        name: 'Server roles',
        icon: Layers,
        blurb:
          'The specialised capabilities that get licensed and then left unconfigured more often than any other part of the estate.',
        image: '/pillars/esri_2.webp',
        items: [
          'GIS Server', 'Image Server', 'GeoAnalytics Server', 'GeoEvent Server',
          'Notebook Server', 'Knowledge Server', 'Workflow Manager', 'Mission Server',
        ],
      },
      {
        name: 'Desktop & authoring',
        icon: Map,
        blurb:
          'Where content is made, including the migration path off products Esri has already retired.',
        image: '/pillars/esri_3.webp',
        items: [
          'ArcGIS Pro', 'ArcMap migration', 'Experience Builder', 'Web AppBuilder migration',
          'Dashboards', 'StoryMaps', 'Instant Apps', 'Map Viewer', 'Symbology & cartography',
        ],
      },
      {
        name: 'Field apps',
        icon: Smartphone,
        blurb:
          'The Esri field suite, configured against your data model rather than a demo one.',
        image: '/pillars/esri_4.webp',
        items: [
          'ArcGIS Field Maps', 'Survey123', 'QuickCapture', 'Workforce',
          'Navigator', 'Offline areas & sync', 'Smart forms', 'Attachment handling',
        ],
      },
      {
        name: 'Developer surface',
        icon: Terminal,
        blurb:
          'Automation and custom development, which is how administration stops being manual at any scale.',
        image: '/pillars/esri_5.webp',
        items: [
          'ArcGIS Maps SDK for JavaScript', 'ArcGIS API for Python', 'ArcPy',
          'ArcGIS REST API', 'Arcade', 'Webhooks', 'Automation scripting',
          'Custom widgets', 'Geoprocessing services',
        ],
      },
      {
        name: 'Data & administration',
        icon: Database,
        blurb:
          'The geodatabase and the operational discipline around it, where an unmanaged estate eventually shows the strain.',
        image: '/pillars/esri_6.webp',
        items: [
          'Enterprise geodatabase', 'Branch versioning', 'Traditional versioning',
          'Replication', 'Attribute rules', 'Utility Network', 'Backup & recovery',
          'Security & sharing model', 'Named-user administration', 'Health monitoring',
        ],
      },
    ],
  },
  scenarios: {
    eyebrow: 'Where we come in',
    heading: 'Six Esri estates we are usually handed',
    intro: 'Each of these is common, and each has a different amount of urgency behind it.',
    items: [
      {
        title: 'The version is out of support',
        icon: ArrowUpCircle,
        situation:
          'The deployment is several releases behind. Security patches no longer apply, Esri support is limited, and the upgrade path may need intermediate versions nobody has planned for.',
        actions: [
          'Establish the current version and its published support position',
          'Map the upgrade path including mandatory intermediate releases',
          'Build a rehearsal environment matching production',
          'Test services, scripts, integrations and field apps against the target',
          'Execute with a defined rollback position and a maintenance window',
          'Set an upgrade cadence aligned to Esri\'s release schedule',
        ],
        outcome:
          'The platform returns to a supported release, and future upgrades are scheduled maintenance rather than an emergency.',
      },
      {
        title: 'The portal has become a dumping ground',
        icon: ShieldCheck,
        situation:
          'Thousands of items, no naming convention, sharing set inconsistently, and content owned by people who left. Nobody can find the authoritative layer for anything.',
        actions: [
          'Audit content, ownership, sharing and last-used dates',
          'Define a group, sharing and ownership model',
          'Establish naming, metadata and authoritative-content standards',
          'Reassign orphaned items and archive what is genuinely dead',
          'Implement the model with content owners, not at them',
          'Set a review cadence so it does not recur',
        ],
        outcome:
          'A new user can find the right layer without asking, and content has an owner who is still at the organisation.',
      },
      {
        title: 'Still on ArcMap',
        icon: RefreshCw,
        situation:
          'ArcMap has reached end of support, but the migration keeps stalling on custom tools, MXDs and Python 2 scripts nobody has time to rewrite.',
        actions: [
          'Inventory MXDs, custom tools, add-ins and ArcPy scripts',
          'Assess which convert cleanly and which need rebuilding',
          'Migrate documents and symbology to ArcGIS Pro projects',
          'Port Python 2 automation to Python 3 and the Pro API',
          'Rebuild the add-ins that have no direct equivalent',
          'Train users on the workflows that genuinely changed',
        ],
        outcome:
          'The team is on a supported desktop product with its automation intact, rather than maintaining a frozen environment.',
      },
      {
        title: 'Services fall over under load',
        icon: Gauge,
        situation:
          'The platform is fine until everyone uses it at once. Services time out at peak, and adding hardware has not fixed it.',
        actions: [
          'Analyse service instance configuration and pooling',
          'Review map service design, layer count and query complexity',
          'Assess caching strategy and where dynamic rendering is unnecessary',
          'Tune the underlying geodatabase and its indexes',
          'Load test at realistic concurrency',
          'Right-size the deployment against measured demand',
        ],
        outcome:
          'The platform holds up at peak, and capacity decisions are made from measurement rather than from guesswork.',
      },
      {
        title: 'No recovery position',
        icon: AlertTriangle,
        situation:
          'Backups may exist, but nobody has tested a restore. If the portal were lost, the actual recovery time is unknown - and so is what would be lost with it.',
        actions: [
          'Document the full platform topology and its dependencies',
          'Implement webgisdr and geodatabase backup on a schedule',
          'Establish and test an actual restore, not just a backup',
          'Define recovery time and recovery point objectives',
          'Consider high availability where the objectives require it',
          'Write and rehearse the recovery runbook',
        ],
        outcome:
          'Recovery is a rehearsed procedure with known timings, rather than an assumption nobody has ever tested.',
      },
      {
        title: 'Nobody administers it full time',
        icon: Users,
        situation:
          'The platform is run by someone who has another job. Routine administration slips, requests queue behind their day work, and knowledge sits with one person.',
        actions: [
          'Take on routine administration against an agreed cadence',
          'Establish publishing, security and provisioning standards',
          'Document procedures so the work is not one person',
          'Provide escalation cover for incidents and outages',
          'Report on platform health and licence position',
          'Coach the internal owner rather than replacing them',
        ],
        outcome:
          'Administration happens on schedule, and your internal owner keeps oversight without carrying the whole platform alone.',
      },
    ],
  },
  workflow: {
    heading: 'How we take on a platform',
    intro: 'The review comes first, and it is usually where an unsupported version comes to light.',
    steps: [
      { icon: FileSearch, title: 'Review', desc: 'Topology, versions, federation and licence position against Esri support.' },
      { icon: ShieldCheck, title: 'Govern', desc: 'Groups, sharing rules, roles and content ownership, written down.' },
      { icon: Server, title: 'Operate', desc: 'Publishing, tuning, caching, backups and routine administration.' },
      { icon: ArrowUpCircle, title: 'Upgrade', desc: 'Rehearsed version upgrades that keep the estate inside support.' },
      { icon: Gauge, title: 'Report', desc: 'Platform health, capacity and licence use, at an agreed cadence.' },
    ],
  },
  engagement: {
    heading: 'Three ways to buy it',
    intro: 'Full platform administration, occasional expert cover, or capacity inside your own team.',
    models: ENGAGEMENT_MODELS,
  },
}

/* ------------------------------------------------------------------ BIM capabilities */

const scanToBim: DeepDivePage = {
  slug: 'scan-to-bim',
  group: 'BIM Capabilities',
  navLabel: 'Scan to BIM',
  eyebrowIcon: Scan,
  title: 'Scan to BIM',
  subtitle: 'A point cloud is a measurement. A model is something you can build from.',
  description:
    'Laser scan and photogrammetric survey converted into federated, tolerance-stated BIM models - existing buildings, plant rooms, bridges and tunnels - modelled to the level of development the downstream discipline actually needs rather than the highest one available.',
  image: '/pillars/bim-scan-hero.webp',
  imageAlt: 'Point cloud survey converted into a building information model',
  copySide: 'left',
  positioning: [
    {
      icon: Ruler,
      title: 'Level of development is a decision',
      detail:
        'Modelling everything to LOD 400 is expensive and usually wasted. We agree the level per element against what the model is actually for, and say so in writing.',
    },
    {
      icon: Target,
      title: 'Tolerance stated, not implied',
      detail:
        'A model that does not declare its accuracy cannot be relied on downstream. Ours carries registration accuracy and measured deviation against the source scan.',
    },
    {
      icon: Layers,
      title: 'Federated, not monolithic',
      detail:
        'Architectural, structural and MEP delivered as separate models and federated, so each discipline can own and reissue its own without waiting for the others.',
    },
  ],
  tech: {
    eyebrow: 'What we work with',
    heading: 'From the scanner to the signed-off model',
    intro:
      'Capture, registration, modelling and audit. The tools matter less than the chain being unbroken, but these are the ones we use.',
    groups: [
      {
        name: 'Capture & registration',
        icon: Scan,
        blurb:
          'Getting the measurement right first, because every tolerance claimed later depends on how the scans were controlled and registered.',
        image: '/pillars/bim-scan-capture.webp',
        items: [
          'Terrestrial laser scanning', 'Mobile mapping', 'UAV photogrammetry',
          'SLAM handheld scanning', 'Control survey', 'Target registration',
          'Cloud-to-cloud registration', 'Registration reporting', 'E57 / RCP / LAS',
        ],
      },
      {
        name: 'Modelling platforms',
        icon: Boxes,
        blurb:
          'We model in whatever the receiving team works in, rather than modelling in ours and exporting at the end.',
        image: '/pillars/bim-scan-modelling.webp',
        items: [
          'Autodesk Revit', 'AutoCAD', 'Civil 3D', 'Navisworks',
          'Bentley MicroStation', 'OpenBuildings Designer', 'Rhino', 'Dynamo',
        ],
      },
      {
        name: 'Point cloud processing',
        icon: Terminal,
        blurb:
          'Cleaning, classifying and segmenting the cloud so modellers work from something structured rather than from 200 million raw points.',
        image: '/pillars/bim-scan-point-cloud.webp',
        items: [
          'Autodesk ReCap', 'Leica Cyclone', 'Trimble RealWorks', 'FARO SCENE',
          'CloudCompare', 'PDAL', 'Classification & segmentation', 'Deviation analysis',
        ],
      },
      {
        name: 'Standards & deliverables',
        icon: FileCheck,
        blurb:
          'What gets handed over, and the standard it is checked against before it leaves us.',
        image: '/pillars/bim-scan-deliverables.webp',
        items: [
          'IFC 2x3 & IFC 4', 'COBie', 'LOD 100-500', 'BS EN ISO 19650',
          'Model federation', 'Clash-ready models', 'As-built drawings', 'Model audit reports',
        ],
      },
    ],
  },
  scenarios: {
    eyebrow: 'Where we come in',
    heading: 'Four reasons a scan-to-BIM job lands on our desk',
    intro: 'Each starts from a different problem, and the modelling effort each justifies is different too.',
    items: [
      {
        title: 'The drawings do not match the building',
        icon: AlertTriangle,
        situation:
          'Record drawings are decades old, altered repeatedly and never updated. Design work based on them keeps producing clashes that only appear on site.',
        actions: [
          'Scan the affected zones to a stated control and tolerance',
          'Register and report accuracy before any modelling starts',
          'Model existing conditions at the agreed level of development',
          'Produce a deviation report against the record drawings',
          'Federate against the proposed design for early clash review',
          'Issue as-built drawings alongside the model',
        ],
        outcome:
          'Design proceeds from measured reality, and the clashes are found in a model review rather than by a contractor on site.',
      },
      {
        title: 'A refurbishment with no usable base model',
        icon: RefreshCw,
        situation:
          'A refit is scheduled, the building has no model, and the programme does not allow for a full survey of everything.',
        actions: [
          'Agree scope by zone and discipline against the refit programme',
          'Prioritise capture where design decisions actually depend on it',
          'Model at differing LOD by zone rather than uniformly',
          'Deliver in phases so design can start on the first zone',
          'Keep the point cloud available for questions the model does not answer',
          'Extend coverage later without re-registering the original survey',
        ],
        outcome:
          'The design team gets a model where it needs one, in programme, instead of a complete model too late to use.',
      },
      {
        title: 'Plant rooms too congested to survey by hand',
        icon: Boxes,
        situation:
          'Services are stacked and interwoven, manual measurement is unsafe or impractical, and the MEP contractor needs to know what is actually there before ordering.',
        actions: [
          'High-density scanning with sufficient setups to avoid occlusion',
          'Segment services by system before modelling',
          'Model MEP to the level required for prefabrication',
          'Verify clearances and maintenance access in the model',
          'Federate mechanical, electrical and public health models',
          'Flag anything the scan could not see rather than guessing it',
        ],
        outcome:
          'The contractor prefabricates against a model that matches the room, and the occluded areas are declared rather than invented.',
      },
      {
        title: 'The handover model was rejected',
        icon: ShieldCheck,
        situation:
          'A model has been delivered and the client BIM manager has returned it: naming wrong, classification missing, COBie incomplete, IFC failing validation.',
        actions: [
          'Audit the model against the employer information requirements',
          'Correct naming, classification and property set mapping',
          'Rebuild the COBie deliverable from the model rather than by hand',
          'Validate IFC export against the receiving system',
          'Document what changed and why, for the resubmission',
          'Agree a check that runs before the next issue, not after',
        ],
        outcome:
          'The model passes validation, and the next issue is checked against the requirement before it is sent rather than after it is returned.',
      },
    ],
  },
  workflow: {
    heading: 'How a scan-to-BIM job runs',
    intro: 'The first stage decides the cost of every stage after it, and it is the one most often skipped.',
    steps: [
      { icon: Ruler, title: 'Scope', desc: 'Level of development and tolerance agreed per element and zone.' },
      { icon: Scan, title: 'Capture', desc: 'Controlled scanning with the setups needed to avoid occlusion.' },
      { icon: Target, title: 'Register', desc: 'Registration with an accuracy report, before modelling begins.' },
      { icon: Boxes, title: 'Model', desc: 'Discipline models built to the agreed LOD and federated.' },
      { icon: FileCheck, title: 'Audit', desc: 'Checked against the information requirement, then issued.' },
    ],
  },
  engagement: {
    heading: 'Three ways to buy it',
    intro: 'Survey and model, model from your existing capture, or capacity inside your own BIM team.',
    models: ENGAGEMENT_MODELS,
  },
}

const bimGisIntegration: DeepDivePage = {
  slug: 'bim-gis-integration',
  group: 'BIM Capabilities',
  navLabel: 'BIM & GIS Integration',
  eyebrowIcon: GitMerge,
  title: 'BIM & GIS Integration',
  subtitle: 'The building model and the network around it, in one coordinate system.',
  description:
    'IFC and Revit models reconciled with GIS - shared coordinate systems, mapped classifications and a linkage that survives both sides being reissued - so an asset can be found on a map and opened in its model without anyone re-keying an identifier.',
  image: '/pillars/bim-gis-hero.webp',
  imageAlt: 'Building models aligned with the geospatial network around them',
  copySide: 'right',
  positioning: [
    {
      icon: Target,
      title: 'Coordinates are the first failure',
      detail:
        'BIM works in a local project grid, GIS in a projected system with a height datum. Most integrations fail here, before anyone has looked at the data itself.',
    },
    {
      icon: GitMerge,
      title: 'Classification is mapped, not assumed',
      detail:
        'Uniclass, the IFC class hierarchy and your own asset taxonomy rarely agree. The mapping between them is a deliverable in its own right.',
    },
    {
      icon: RefreshCw,
      title: 'The link has to survive an update',
      detail:
        'A one-off export is a screenshot. We build the linkage so that reissuing either side does not quietly break the relationship.',
    },
  ],
  tech: {
    eyebrow: 'What we work with',
    heading: 'Both sides of the join, and the join itself',
    intro:
      'Integration work is defined by what sits at each end. These are the formats, platforms and the reconciliation work in between.',
    groups: [
      {
        name: 'Model formats & schemas',
        icon: FileCode,
        blurb:
          'What arrives from the design side, and the open formats that let it be read by something other than the tool that made it.',
        image: '/pillars/bim-gis-formats.webp',
        items: [
          'IFC 2x3 & IFC 4', 'Revit RVT', 'COBie', 'CityGML', 'LandXML',
          'glTF & 3D Tiles', 'Uniclass 2015', 'IfcClassification', 'Property sets',
        ],
      },
      {
        name: 'GIS platforms',
        icon: Globe,
        blurb:
          'Where the model has to land, alongside the network, terrain and asset data already held there.',
        image: '/pillars/bim-gis-platforms.webp',
        items: [
          'ArcGIS GeoBIM', 'ArcGIS Pro', 'ArcGIS Enterprise', 'ArcGIS Indoors',
          'FME', 'QGIS', 'PostGIS', 'Cesium', '3D Tiles services',
        ],
      },
      {
        name: 'Coordinates & georeferencing',
        icon: Map,
        blurb:
          'The reconciliation that has to happen before anything else is worth attempting.',
        image: '/pillars/bim-gis-coordinates.webp',
        items: [
          'Shared coordinate systems', 'Project base point', 'Survey point',
          'Grid-to-ground scaling', 'Projection & datum transformation',
          'Height datum reconciliation', 'Rotation to true north',
        ],
      },
      {
        name: 'Linkage & governance',
        icon: Link2,
        blurb:
          'What keeps the two sides connected once the project team has moved on and both are still being updated.',
        image: '/pillars/bim-gis-governance.webp',
        items: [
          'Asset identifier strategy', 'GUID persistence', 'Attribute mapping',
          'Change detection', 'Federated model registry', 'Reissue workflows',
          'Ownership and update responsibility',
        ],
      },
    ],
  },
  scenarios: {
    eyebrow: 'Where we come in',
    heading: 'Four ways BIM and GIS fail to meet',
    intro: 'All four are common, and none of them is really a software problem.',
    items: [
      {
        title: 'The model lands in the wrong place',
        icon: Target,
        situation:
          'The federated model appears in the ocean, or a few hundred metres from where the building is, or rotated. Everyone assumes the export is broken.',
        actions: [
          'Establish the project base point, survey point and internal origin',
          'Determine the true coordinate system and height datum on both sides',
          'Resolve grid-to-ground scale and rotation to true north',
          'Georeference the model with the transformation recorded',
          'Verify against independent survey control',
          'Document the transformation so the next model does not repeat the work',
        ],
        outcome:
          'Models land where the building is, and the georeferencing is a written procedure rather than something one person worked out once.',
      },
      {
        title: 'Asset identifiers do not match',
        icon: Key,
        situation:
          'The model calls it one thing, the asset register another, and the GIS a third. Linking them is a manual spreadsheet exercise that goes stale immediately.',
        actions: [
          'Agree which system issues the authoritative asset identifier',
          'Map the existing identifier schemes onto each other',
          'Carry the identifier through IFC property sets and GIS attributes',
          'Build the reconciliation for assets that exist in only one system',
          'Automate the match rather than maintaining a spreadsheet',
          'Report exceptions instead of silently dropping them',
        ],
        outcome:
          'One identifier follows an asset across model, map and register, and mismatches surface as a report rather than as a surprise.',
      },
      {
        title: 'Nobody can find the model for an asset',
        icon: FileSearch,
        situation:
          'The models exist somewhere on a file server. An engineer looking at an asset on a map has no route to the model that contains it.',
        actions: [
          'Build a model registry keyed to the spatial extent each model covers',
          'Link assets in GIS to their model and element',
          'Publish models as services rather than as files where possible',
          'Give map users a direct route into the relevant model view',
          'Control access consistently across both platforms',
          'Keep the registry current as models are reissued',
        ],
        outcome:
          'An asset on the map opens its model in a click, and the models stop being a folder only the BIM team can navigate.',
      },
      {
        title: 'Every reissue breaks the link',
        icon: RefreshCw,
        situation:
          'The integration worked when it was built. Then the design team issued a revision, element GUIDs changed, and the connections silently broke.',
        actions: [
          'Diagnose why identity is not persisting across issues',
          'Establish a stable identifier independent of authoring-tool GUIDs',
          'Build change detection between model revisions',
          'Re-link automatically where identity can be established',
          'Report what could not be matched for human review',
          'Agree a reissue protocol with the design team',
        ],
        outcome:
          'A model revision updates the integration instead of breaking it, and unmatched elements are flagged rather than lost.',
      },
    ],
  },
  workflow: {
    heading: 'How the two are joined',
    intro: 'Alignment first, identity second. Everything else depends on those two being settled.',
    steps: [
      { icon: Map, title: 'Align', desc: 'Coordinate systems, datums and rotation reconciled and verified.' },
      { icon: GitMerge, title: 'Map', desc: 'Classification and attribute mapping between the two schemas.' },
      { icon: Key, title: 'Identify', desc: 'A stable asset identifier that survives reissue on either side.' },
      { icon: Link2, title: 'Link', desc: 'Models published and linked to their assets, with access controlled.' },
      { icon: RefreshCw, title: 'Maintain', desc: 'Change detection and re-linking as revisions arrive.' },
    ],
  },
  engagement: {
    heading: 'Three ways to buy it',
    intro: 'A one-off integration, an ongoing arrangement as models keep arriving, or capacity in your team.',
    models: ENGAGEMENT_MODELS,
  },
}

const digitalTwinAssetInformation: DeepDivePage = {
  slug: 'digital-twin-asset-information',
  group: 'BIM Capabilities',
  navLabel: 'Digital Twin & Asset Information',
  eyebrowIcon: Boxes,
  title: 'Digital Twin & Asset Information',
  subtitle: 'A twin nobody updates is an expensive render.',
  description:
    'Asset information models built to an agreed information requirement, populated from survey, BIM and operational systems, and kept current by a defined update route - so the twin still reflects the asset in year three rather than the day it was handed over.',
  image: '/pillars/bim-twin-hero.webp',
  imageAlt: 'Digital twin of built infrastructure with live operational data',
  copySide: 'left',
  positioning: [
    {
      icon: FileSearch,
      title: 'Start from the decisions, not the data',
      detail:
        'What the twin has to help someone decide determines the information it needs. Built the other way round, it collects everything and answers nothing.',
    },
    {
      icon: RefreshCw,
      title: 'Currency is a process',
      detail:
        'Every twin is accurate on handover day. Staying accurate needs a named owner and a defined update route, agreed before the thing is built.',
    },
    {
      icon: Wrench,
      title: 'It has to reach the maintenance system',
      detail:
        'A twin that cannot raise or reflect a work order is a visualisation. The value is in the loop back to the systems people already work in.',
    },
  ],
  tech: {
    eyebrow: 'What we work with',
    heading: 'Information requirements, platforms and the live data underneath',
    intro:
      'A twin is an information management problem wearing a 3D interface. These are the standards, platforms and integrations that decide whether it survives.',
    groups: [
      {
        name: 'Information management',
        icon: FileCheck,
        blurb:
          'The standards and requirement documents that decide what the twin has to contain and how it is validated.',
        image: '/pillars/bim-twin-information.webp',
        items: [
          'BS EN ISO 19650', 'EIR / AIR / OIR', 'Information delivery plans',
          'COBie', 'Asset data dictionaries', 'Handover validation', 'Master data standards',
        ],
      },
      {
        name: 'Twin & visualisation platforms',
        icon: Globe,
        blurb:
          'Where the twin is assembled and presented, chosen against what the organisation already runs rather than what demos best.',
        image: '/pillars/bim-twin-platforms.webp',
        items: [
          'ArcGIS Indoors', 'ArcGIS Enterprise', 'Autodesk Tandem', 'Bentley iTwin',
          'Cesium', '3D Tiles', 'Power BI', 'Web viewers',
        ],
      },
      {
        name: 'Live data & telemetry',
        icon: Activity,
        blurb:
          'What makes a twin current rather than historical, and the ingestion that has to keep up with it.',
        image: '/pillars/bim-twin-telemetry.webp',
        items: [
          'IoT & sensor feeds', 'SCADA integration', 'MQTT', 'Condition monitoring',
          'Threshold alerting', 'Historian integration', 'Edge ingestion',
        ],
      },
      {
        name: 'Operational integration',
        icon: Wrench,
        blurb:
          'The systems the twin has to read from and write to, or it stays a parallel universe nobody maintains.',
        image: '/pillars/bim-twin-operations.webp',
        items: [
          'IBM Maximo', 'SAP Plant Maintenance', 'ServiceNow', 'Work order linkage',
          'Asset register reconciliation', 'Maintenance history', 'Condition scoring',
        ],
      },
    ],
  },
  scenarios: {
    eyebrow: 'Where we come in',
    heading: 'Four ways a twin programme gets stuck',
    intro: 'Mostly at handover, or eighteen months after it.',
    items: [
      {
        title: 'Handover arrived as a folder of PDFs',
        icon: FileSearch,
        situation:
          'A project completed and delivered documentation rather than data. The operator has thousands of files and no asset register they can query.',
        actions: [
          'Establish what the operator actually needs to know per asset type',
          'Extract structured asset data from the delivered documentation',
          'Reconcile against any existing register and the physical asset',
          'Load into the maintenance system with a documented mapping',
          'Identify the gaps that need field verification',
          'Write the information requirement so the next project delivers data',
        ],
        outcome:
          'The operator has a queryable asset register, and the next handover is specified rather than hoped for.',
      },
      {
        title: 'The twin stopped being true',
        icon: AlertTriangle,
        situation:
          'A twin was built for a programme, looked impressive, and has not been updated since. Nobody trusts it enough to make a decision from it.',
        actions: [
          'Assess how far the twin has drifted from the asset',
          'Identify which data has an update route and which never had one',
          'Re-baseline the elements that matter for current decisions',
          'Build automated updates where a source system exists',
          'Assign ownership for the parts that need human input',
          'Retire the parts nobody uses rather than maintaining them',
        ],
        outcome:
          'A smaller twin that is current and trusted, instead of a larger one nobody opens.',
      },
      {
        title: 'Sensors exist but nothing consumes them',
        icon: Activity,
        situation:
          'Condition monitoring was installed and the data lands in a historian. Nobody sees it in the context of the asset, and nothing triggers off it.',
        actions: [
          'Map sensors to the assets they actually monitor',
          'Build ingestion into the twin with an appropriate refresh rate',
          'Define thresholds and what should happen when they are crossed',
          'Surface condition against the asset rather than as a raw feed',
          'Route alerts into the maintenance system, not just a dashboard',
          'Report on sensor health so silent failures are visible',
        ],
        outcome:
          'Sensor data reaches the people who act on it, in the context of the asset it relates to.',
      },
      {
        title: 'Two asset registers, neither authoritative',
        icon: GitMerge,
        situation:
          'Operations maintain one register, finance another, and the twin would make a third. Nobody will agree which is correct.',
        actions: [
          'Establish authority per attribute rather than per register',
          'Reconcile the registers and quantify the divergence',
          'Resolve conflicts with field verification where needed',
          'Define the single route by which new assets are created',
          'Build ongoing reconciliation reporting between the systems',
          'Make the twin read from the authoritative source, not copy it',
        ],
        outcome:
          'One agreed answer per attribute, and the twin stops being a third version of the truth.',
      },
    ],
  },
  workflow: {
    heading: 'How a twin is built to last',
    intro: 'Four of the five stages are about information. The visualisation is the easy part.',
    steps: [
      { icon: FileSearch, title: 'Require', desc: 'What decisions the twin supports, and the data each one needs.' },
      { icon: Boxes, title: 'Assemble', desc: 'Survey, BIM and register data brought together and reconciled.' },
      { icon: Link2, title: 'Connect', desc: 'Live telemetry and the maintenance system wired in both directions.' },
      { icon: ShieldCheck, title: 'Validate', desc: 'Checked against the information requirement before acceptance.' },
      { icon: RefreshCw, title: 'Sustain', desc: 'Named owners and defined update routes, or it drifts.' },
    ],
  },
  engagement: {
    heading: 'Three ways to buy it',
    intro: 'Build it, run it, or work alongside your own asset information team.',
    models: ENGAGEMENT_MODELS,
  },
}

/* ------------------------------------------------------------------ Esri capabilities */

const arcgisSolutionDevelopment: DeepDivePage = {
  slug: 'arcgis-solution-development',
  group: 'Esri Capabilities',
  navLabel: 'ArcGIS Solution Development',
  eyebrowIcon: Code,
  title: 'ArcGIS Solution Development',
  subtitle: 'Configured where it can be. Built where it has to be.',
  description:
    'Web apps, dashboards, field workflows and custom extensions on the ArcGIS platform - configured with Experience Builder and Dashboards where that is genuinely enough, and developed against the SDKs where it is not.',
  image: '/pillars/arcgis.webp',
  imageAlt: 'ArcGIS web applications and dashboards in development',
  copySide: 'left',
  positioning: [
    {
      icon: Gauge,
      title: 'Configuration first, code second',
      detail:
        'Custom code is a maintenance liability. We reach for it when the configurable app genuinely cannot do the job, and we say which it is before building.',
    },
    {
      icon: Users,
      title: 'Built for the person using it',
      detail:
        'An app that makes sense to its author and nobody else has failed. We design against the task the user is actually doing, on the device they do it on.',
    },
    {
      icon: RefreshCw,
      title: 'It has to survive the next release',
      detail:
        'Esri deprecates. We build against supported APIs and flag where a customisation will need attention at the next version.',
    },
  ],
  tech: {
    eyebrow: 'What we build with',
    heading: 'The full ArcGIS development surface',
    intro:
      'From configured apps through to custom widgets and geoprocessing services, and the automation that keeps them fed.',
    groups: [
      {
        name: 'Configurable applications',
        icon: Layers,
        blurb:
          'Where the platform already does it, and the work is design and configuration rather than development.',
        image: '/pillars/arcgis_1.webp',
        items: [
          'Experience Builder', 'Instant Apps', 'ArcGIS Dashboards', 'StoryMaps',
          'ArcGIS Hub', 'Survey123 forms', 'Web AppBuilder migration', 'Map Viewer',
        ],
      },
      {
        name: 'Custom development',
        icon: Code,
        blurb:
          'Where it does not, built against the supported SDKs rather than against internals that will move.',
        image: '/pillars/arcgis_2.webp',
        items: [
          'ArcGIS Maps SDK for JavaScript', 'Experience Builder widgets',
          'ArcGIS API for Python', 'ArcGIS REST API', 'Arcade expressions',
          'Webhooks', 'React integration', 'Custom print & export',
        ],
      },
      {
        name: 'Analysis & geoprocessing',
        icon: Terminal,
        blurb:
          'Turning a repeated manual process into something that runs on a schedule or on demand.',
        image: '/pillars/arcgis_3.webp',
        items: [
          'ModelBuilder', 'ArcPy script tools', 'Geoprocessing services',
          'Network Analyst', 'Spatial Analyst', 'GeoAnalytics', 'ArcGIS Notebooks',
        ],
      },
      {
        name: 'Automation & data flow',
        icon: RefreshCw,
        blurb:
          'Keeping the app fed, because most application complaints are actually data-freshness complaints.',
        image: '/pillars/arcgis_4.webp',
        items: [
          'Data Interoperability', 'FME', 'Power Automate', 'Scheduled tasks',
          'Feature service automation', 'Attachment workflows', 'Webhook triggers',
        ],
      },
    ],
  },
  scenarios: {
    eyebrow: 'Where we come in',
    heading: 'Four requests that turn into projects',
    intro: 'Each of these starts as a small ask and gets interesting on inspection.',
    items: [
      {
        title: 'The out-of-the-box app nearly does it',
        icon: Gauge,
        situation:
          'Experience Builder gets ninety per cent of the way there, and the remaining ten per cent is the part the business actually asked for.',
        actions: [
          'Establish whether the gap is genuine or a configuration people have not found',
          'Prototype the custom element before committing to it',
          'Build as a widget within the supported extension model',
          'Keep the configured parts configured rather than rewriting the app',
          'Document the customisation and its upgrade exposure',
          'Hand over with the source and a build route',
        ],
        outcome:
          'The last ten per cent gets built without the other ninety becoming custom code you have to maintain forever.',
      },
      {
        title: 'Web AppBuilder is going away',
        icon: ArrowUpCircle,
        situation:
          'A portfolio of Web AppBuilder applications exists, the product is retired, and the migration looks like rebuilding everything at once.',
        actions: [
          'Inventory the apps and establish which are still genuinely used',
          'Assess each for a direct Experience Builder equivalent',
          'Rebuild the widely used ones first, consolidating where they overlap',
          'Port custom widgets to the Experience Builder extension model',
          'Retire what nobody opens rather than migrating it',
          'Run old and new in parallel until users have moved',
        ],
        outcome:
          'A smaller portfolio on a supported product, rather than a like-for-like rebuild of apps half of which were unused.',
      },
      {
        title: 'Analysts repeat the same process every month',
        icon: Terminal,
        situation:
          'A multi-step analysis is run by hand, differently by each person, with the result pasted into a report. It takes days and is never quite reproducible.',
        actions: [
          'Document the process as it is actually performed, including the exceptions',
          'Build it as a tool or notebook with parameters rather than hard-coded paths',
          'Publish as a geoprocessing service or scheduled job where appropriate',
          'Add validation so bad inputs fail loudly rather than producing bad output',
          'Version the logic so a result can be reproduced later',
          'Train the analysts on running and amending it',
        ],
        outcome:
          'The analysis runs in minutes, produces the same answer every time, and can be explained to an auditor.',
      },
      {
        title: 'Nobody trusts the dashboard',
        icon: AlertTriangle,
        situation:
          'A dashboard exists but the numbers disagree with the operational system, it loads slowly, and people have gone back to spreadsheets.',
        actions: [
          'Trace each figure to its source and find where they diverge',
          'Fix the definitions, not just the queries, where the business disagrees',
          'Optimise the underlying services, aggregation and refresh strategy',
          'Rebuild the layout around the decisions it is meant to support',
          'Show data currency on the dashboard itself',
          'Reconcile against the source system on a schedule',
        ],
        outcome:
          'The dashboard agrees with the system of record, loads quickly, and says when it was last updated.',
      },
    ],
  },
  workflow: {
    heading: 'How a solution gets built',
    intro: 'The second stage is where most of the value is, and it is the one clients most often want to skip.',
    steps: [
      { icon: FileSearch, title: 'Frame', desc: 'The task the user is doing, and what success looks like for them.' },
      { icon: Gauge, title: 'Decide', desc: 'Configure or build, stated explicitly with the trade-off written down.' },
      { icon: Code, title: 'Build', desc: 'Against supported APIs, with upgrade exposure documented.' },
      { icon: Users, title: 'Prove', desc: 'Tested with the people who will use it, on their devices.' },
      { icon: RefreshCw, title: 'Hand over', desc: 'Source, build route and the parts that will need attention later.' },
    ],
  },
  engagement: {
    heading: 'Three ways to buy it',
    intro: 'A defined build, an ongoing development capacity, or engineers inside your team.',
    models: ENGAGEMENT_MODELS,
  },
}

const geodatabaseDataModelling: DeepDivePage = {
  slug: 'geodatabase-data-modelling',
  group: 'Esri Capabilities',
  navLabel: 'Geodatabase & Data Modelling',
  eyebrowIcon: Database,
  title: 'Geodatabase & Data Modelling',
  subtitle: 'The data model decides what the system can ever do.',
  description:
    'Enterprise geodatabase design, versioning strategy, attribute rules and network models - the schema work that determines whether editing scales, tracing returns the right answer and reporting reconciles with the rest of the business.',
  image: '/pillars/geo_data.webp',
  imageAlt: 'Enterprise geodatabase and data model design',
  copySide: 'right',
  positioning: [
    {
      icon: ShieldCheck,
      title: 'Rules in the database, not in the process',
      detail:
        'A standard nobody can break is worth more than a procedure everyone is asked to follow. Domains, subtypes and attribute rules enforce it where the data lives.',
    },
    {
      icon: Users,
      title: 'Versioning is an editing decision',
      detail:
        'Branch or traditional is not a preference. It follows from how many people edit, how long edits live and whether the data is published while being changed.',
    },
    {
      icon: GitMerge,
      title: 'Migration is where models are proven',
      detail:
        'A model that looks right in a diagram meets reality during loading. We migrate real data early, because that is what exposes the design flaws.',
    },
  ],
  tech: {
    eyebrow: 'What we work with',
    heading: 'Schema, editing, networks and the migration between them',
    intro:
      'The unglamorous layer that everything above it depends on, and the first thing to look at when a GIS is not behaving.',
    groups: [
      {
        name: 'Geodatabase design',
        icon: Database,
        blurb:
          'The schema itself, and the constraints that keep data valid without relying on anybody remembering a rule.',
        image: '/pillars/geo_1.webp',
        items: [
          'Enterprise geodatabase', 'Feature datasets', 'Subtypes & domains',
          'Relationship classes', 'Attribute rules', 'Contingent values',
          'Topology rules', 'Metadata standards',
        ],
      },
      {
        name: 'Versioning & editing',
        icon: Users,
        blurb:
          'How concurrent editing actually behaves, which is where multi-user GIS deployments most often come unstuck.',
        image: '/pillars/geo_2.webp',
        items: [
          'Branch versioning', 'Traditional versioning', 'Replication',
          'Conflict resolution', 'Editor tracking', 'Archiving',
          'Reconcile & post strategy', 'Offline editing',
        ],
      },
      {
        name: 'Network models',
        icon: Network,
        blurb:
          'Utility and transport networks, where the model determines whether tracing tells you the truth.',
        image: '/pillars/geo_3.webp',
        items: [
          'Utility Network', 'Network Datasets', 'Connectivity & subnetworks',
          'Tracing configuration', 'Asset packages', 'Terminal configurations',
          'Subnetwork management',
        ],
      },
      {
        name: 'Migration & quality',
        icon: FileCheck,
        blurb:
          'Getting existing data into the new model without carrying its accumulated problems across with it.',
        image: '/pillars/geo_4.webp',
        items: [
          'Schema migration', 'Data loading', 'FME & Data Interoperability',
          'Attribute reconciliation', 'QA/QC automation', 'Validation reporting',
          'Reload & rollback strategy',
        ],
      },
    ],
  },
  scenarios: {
    eyebrow: 'Where we come in',
    heading: 'Four data model problems that surface late',
    intro: 'All of these are schema problems wearing an application problem as a disguise.',
    items: [
      {
        title: 'Editing does not scale past a few users',
        icon: Users,
        situation:
          'Two or three editors is fine. A dozen produces locks, conflicts and lost work, and the team has started coordinating by messaging each other.',
        actions: [
          'Assess the current versioning model against how editing actually happens',
          'Determine whether branch versioning is the right move, honestly',
          'Design the version hierarchy and reconcile and post cadence',
          'Set up conflict detection and resolution rules',
          'Migrate with real editors on real data before committing',
          'Train the team on the workflow that now applies',
        ],
        outcome:
          'Concurrent editing works without coordination by conversation, and conflicts are resolved by rule rather than by seniority.',
      },
      {
        title: 'Tracing returns the wrong answer',
        icon: Network,
        situation:
          'A network trace misses assets, includes ones it should not, or stops early. Field crews have stopped trusting it and work from paper.',
        actions: [
          'Audit connectivity, terminals and subnetwork configuration',
          'Find the geometry and attribution errors breaking connectivity',
          'Correct the network model rather than the individual traces',
          'Rebuild subnetworks and validate against known cases',
          'Add validation that catches the same error class on edit',
          'Verify against field knowledge before declaring it fixed',
        ],
        outcome:
          'Traces match the network on the ground, and new errors are prevented at entry rather than found later.',
      },
      {
        title: 'Migrating to the Utility Network',
        icon: ArrowUpCircle,
        situation:
          'The move from a geometric network is agreed in principle, but the existing data has decades of inconsistency and nobody knows what it will take.',
        actions: [
          'Assess the current data against Utility Network requirements',
          'Quantify the data cleansing the migration actually needs',
          'Design the asset package, domains and subnetwork structure',
          'Migrate iteratively, proving each asset group before the next',
          'Validate tracing against known operational scenarios',
          'Plan the cutover with a tested rollback position',
        ],
        outcome:
          'The migration is sized honestly before it starts, and the data problems are found in a test load rather than at cutover.',
      },
      {
        title: 'The same attribute means three things',
        icon: AlertTriangle,
        situation:
          'A status field holds free text, entered differently by each team over fifteen years. Reporting on it is impossible and nobody wants to be the one to standardise it.',
        actions: [
          'Profile the actual values and their frequency',
          'Agree the controlled vocabulary with the teams who use it',
          'Design domains and contingent values to enforce it',
          'Map historic values onto the new domain, flagging the ambiguous ones',
          'Migrate with an audit trail of what each value became',
          'Prevent free text at the point of entry from then on',
        ],
        outcome:
          'The field becomes reportable, and the history is mapped rather than discarded.',
      },
    ],
  },
  workflow: {
    heading: 'How a data model is designed',
    intro: 'The load happens early on purpose. A model is only proven once real data has been through it.',
    steps: [
      { icon: FileSearch, title: 'Profile', desc: 'What the existing data actually contains, not what it should.' },
      { icon: Database, title: 'Design', desc: 'Schema, domains, rules and the versioning model, against real editing.' },
      { icon: GitMerge, title: 'Load', desc: 'Real data migrated early, because that is what exposes the flaws.' },
      { icon: ShieldCheck, title: 'Validate', desc: 'Topology, tracing and reporting checked against known cases.' },
      { icon: Users, title: 'Adopt', desc: 'Cutover with training, and a rollback position that has been tested.' },
    ],
  },
  engagement: {
    heading: 'Three ways to buy it',
    intro: 'A design and migration project, ongoing data stewardship, or specialist capacity in your team.',
    models: ENGAGEMENT_MODELS,
  },
}

const arcgisFieldOperations: DeepDivePage = {
  slug: 'arcgis-field-operations',
  group: 'Esri Capabilities',
  navLabel: 'ArcGIS Field Operations',
  eyebrowIcon: Smartphone,
  title: 'ArcGIS Field Operations',
  subtitle: 'The field app is where your data is actually created.',
  description:
    'Field Maps, Survey123 and QuickCapture configured against your data model, with the offline areas, smart forms and sync behaviour that decide whether a day of fieldwork survives a dead zone.',
  image: '/pillars/arcf.webp',
  imageAlt: 'Field crews capturing data on ArcGIS mobile applications',
  copySide: 'right',
  positioning: [
    {
      icon: MonitorSmartphone,
      title: 'Designed for a gloved hand in the rain',
      detail:
        'A form that works at a desk fails on a tablet in bad weather. Field design is about how few taps a record takes, not how many fields it can hold.',
    },
    {
      icon: ShieldCheck,
      title: 'Quality enforced at capture',
      detail:
        'Every error caught in the field costs a fraction of the same error found in the office. Domains, conditional logic and required evidence do that work.',
    },
    {
      icon: RefreshCw,
      title: 'Offline is the normal case',
      detail:
        'We design for intermittent connectivity as the default rather than the exception, because that is what the crews actually experience.',
    },
  ],
  tech: {
    eyebrow: 'What we work with',
    heading: 'The Esri field suite, configured against your data',
    intro:
      'The apps are the easy part. The configuration, the offline strategy and the governance around them are what make a deployment work.',
    groups: [
      {
        name: 'Field applications',
        icon: Smartphone,
        blurb:
          'Choosing the right app for the task, which is usually the difference between adoption and quiet abandonment.',
        image: '/pillars/arcf_1.webp',
        items: [
          'ArcGIS Field Maps', 'Survey123', 'QuickCapture', 'Workforce',
          'Navigator', 'Quick Reports', 'AppStudio',
        ],
      },
      {
        name: 'Form & map design',
        icon: ClipboardCheck,
        blurb:
          'Where quality is won or lost, long before anyone reviews the data in the office.',
        image: '/pillars/arcf_2.webp',
        items: [
          'Smart forms', 'Conditional logic', 'Domains & pick lists',
          'Attribute rules in the field', 'Map templates', 'Field symbology',
          'Barcode & GNSS capture', 'Photo & attachment rules',
        ],
      },
      {
        name: 'Offline & sync',
        icon: RefreshCw,
        blurb:
          'The part that decides whether a day in a dead zone is recoverable, and the part most deployments get wrong.',
        image: '/pillars/arcf_3.webp',
        items: [
          'Offline map areas', 'Sync-enabled services', 'Conflict resolution',
          'Attachment sync strategy', 'Large area planning', 'Basemap packaging',
          'Sync failure monitoring',
        ],
      },
      {
        name: 'Operations & governance',
        icon: Users,
        blurb:
          'Running it across crews and seasons, rather than configuring it once and hoping.',
        image: '/pillars/arcf_4.webp',
        items: [
          'Named-user provisioning', 'Crew groups & roles', 'Location sharing',
          'Assignment workflows', 'Office QA review', 'Dashboard monitoring',
          'Device management',
        ],
      },
    ],
  },
  scenarios: {
    eyebrow: 'Where we come in',
    heading: 'Four field deployments that need rescuing',
    intro: 'Usually because the app was configured for the data model rather than for the crew.',
    items: [
      {
        title: 'Crews are still on paper',
        icon: ClipboardCheck,
        situation:
          'A digital solution exists but crews have gone back to paper and clipboards, and someone re-keys it all afterwards.',
        actions: [
          'Watch the work being done before changing anything',
          'Redesign the form around the sequence the crew actually follows',
          'Cut fields that nobody downstream uses',
          'Pre-populate everything that can be derived rather than typed',
          'Pilot with the most sceptical crew, not the most willing',
          'Iterate on their feedback before wider rollout',
        ],
        outcome:
          'Capture is faster on the device than on paper, which is the only argument that has ever worked with a field crew.',
      },
      {
        title: 'Work disappears in dead zones',
        icon: AlertTriangle,
        situation:
          'Crews report losing a day of records. The app was configured online-first, and the sync behaviour in poor coverage was never tested.',
        actions: [
          'Audit the offline area strategy against the actual work areas',
          'Enable sync on the services that need it and size the areas properly',
          'Fix attachment handling, which is usually what breaks first',
          'Test against real network conditions, not office wifi',
          'Add sync failure alerting rather than relying on crews noticing',
          'Recover what can be recovered from the affected devices',
        ],
        outcome:
          'A day with no signal syncs when the crew returns, and a failed sync raises an alert rather than passing silently.',
      },
      {
        title: 'The data comes back inconsistent',
        icon: ShieldCheck,
        situation:
          'Free text where there should be a code, missing photographs, coordinates in the wrong place. Office staff spend more time correcting than the survey took.',
        actions: [
          'Replace free text with domains and conditional pick lists',
          'Make evidence mandatory where it actually matters',
          'Add attribute rules that reject impossible values at capture',
          'Configure GNSS accuracy thresholds and record the metadata',
          'Build an office review queue for genuine exceptions only',
          'Feed correction patterns back into the form design',
        ],
        outcome:
          'Data arrives usable, and office review handles exceptions instead of re-doing the survey.',
      },
      {
        title: 'The form takes too long',
        icon: Timer,
        situation:
          'Every stakeholder added a field. The form now has sixty questions, crews take shortcuts, and the data quality is worse than before it existed.',
        actions: [
          'Establish which fields are genuinely used downstream',
          'Challenge the rest with the people who asked for them',
          'Use conditional logic so irrelevant questions never appear',
          'Default and derive everything that can be',
          'Split rare detail into a separate optional survey',
          'Measure completion time before and after',
        ],
        outcome:
          'A shorter form that gets completed properly, which produces more usable data than a long one that gets rushed.',
      },
    ],
  },
  workflow: {
    heading: 'How a field deployment runs',
    intro: 'It starts by watching the work, because no specification survives contact with an actual crew.',
    steps: [
      { icon: FileSearch, title: 'Observe', desc: 'The work as it is done now, including the workarounds.' },
      { icon: ClipboardCheck, title: 'Design', desc: 'Forms and maps built around the crew sequence, not the schema.' },
      { icon: RefreshCw, title: 'Configure', desc: 'Offline areas, sync and conflict rules sized to the work areas.' },
      { icon: Users, title: 'Pilot', desc: 'Real crews, real conditions, and changes made before rollout.' },
      { icon: Gauge, title: 'Operate', desc: 'Monitoring, QA review and form changes as the work evolves.' },
    ],
  },
  engagement: {
    heading: 'Three ways to buy it',
    intro: 'A configured deployment, ongoing field support, or specialists working with your operations team.',
    models: ENGAGEMENT_MODELS,
  },
}

/* --------------------------------------------------- Data Center & IT Infrastructure */

/**
 * The build side of the data centre practice.
 *
 * Its sibling in the menu, /services/data-center-lifecycle, is the run side: maintenance,
 * spares, dispatch and SLA-backed field support on an estate that already exists. This page
 * is what happens before that - an empty shell, a live date, and everything in between.
 * The two are deliberately separate because they are bought by different people at
 * different points, and a page that tried to be both would serve neither.
 */
const dataCenterBuild: DeepDivePage = {
  slug: 'data-center-build-setup',
  group: 'Data Center & IT Infrastructure',
  navLabel: 'Build & Setup',
  eyebrowIcon: Server,
  title: 'Data Center Build & Setup',
  subtitle: 'From an empty shell to a room your operations team will accept.',
  description:
    'Design support, structured cabling, rack and stack, power and cooling install, and the integrated systems testing that proves it behaves under load and under failure - delivered to a live date, with the as-built record captured as the work happens rather than reconstructed afterwards.',
  image: '/pillars/data_cover.webp',
  imageAlt: 'Data centre build and commissioning',
  copySide: 'left',
  positioning: [
    {
      icon: ShieldCheck,
      title: 'Commissioning is the deliverable',
      detail:
        'A build is not finished when the equipment is racked. It is finished when integrated systems testing has proved the room behaves the way it is supposed to under load and on loss of a power path.',
    },
    {
      icon: FileCheck,
      title: 'As-built, or it did not happen',
      detail:
        'Ports, circuits, labels and asset records are captured as the build proceeds. Reconstructing them afterwards produces a document that is wrong the day it is issued.',
    },
    {
      icon: Users,
      title: 'Built for the people who will run it',
      detail:
        'Operations inherit every decision about layout, labelling and access. We bring them in before anything is fixed in place, not at handover.',
    },
  ],
  tech: {
    eyebrow: 'What we build',
    heading: 'Every layer between the shell and the live service',
    intro:
      'White space design through to commissioning and handover. Where a specialist contractor holds a discipline, we work to their design and integrate it rather than duplicating it.',
    groups: [
      {
        name: 'Design & capacity planning',
        icon: Layers,
        blurb:
          'The decisions that are expensive to reverse: how much power per rack, where the heat goes, and how much room is left for what comes next.',
        image: '/pillars/data_1.webp',
        items: [
          'Rack & row layout', 'Power density planning', 'Cooling strategy',
          'Hot & cold aisle containment', 'Capacity & growth modelling',
          'Resilience & concurrent maintainability targets', 'Airflow assessment',
          'Floor loading & access routes',
        ],
      },
      {
        name: 'Power & cooling',
        icon: Activity,
        blurb:
          'Distribution from the incoming supply to the rack, and the environmental control that keeps it inside its operating envelope.',
        image: '/pillars/data_2.webp',
        items: [
          'UPS systems', 'PDU & busway distribution', 'Generator & ATS interface',
          'Dual-path A/B distribution', 'CRAC & CRAH units', 'In-row cooling',
          'Containment installation', 'Environmental & leak monitoring',
        ],
      },
      {
        name: 'Structured cabling & network',
        icon: Network,
        blurb:
          'The layer that decides whether the room is maintainable in five years or a knot nobody will touch.',
        image: '/pillars/data_3.webp',
        items: [
          'Fibre & copper backbone', 'MPO & LC trunking', 'Patch panel design',
          'Top-of-rack & end-of-row topology', 'Containment & cable management',
          'Labelling to a defined standard', 'Testing & certification', 'Switching & routing build',
        ],
      },
      {
        name: 'Build, install & commissioning',
        icon: Wrench,
        blurb:
          'The physical work and the proof it was done right, including the tests most programmes discover they needed only afterwards.',
        image: '/pillars/data_4.webp',
        items: [
          'Rack & stack', 'Equipment installation', 'Asset tagging & DCIM load',
          'Factory & site acceptance testing', 'Integrated systems testing',
          'Load bank testing', 'Failure-mode testing', 'As-built documentation',
        ],
      },
    ],
  },
  scenarios: {
    eyebrow: 'Where we come in',
    heading: 'Four builds, four different problems',
    intro:
      'The equipment is rarely the hard part. The constraint is usually the date, the live estate next door, or what operations will agree to inherit.',
    items: [
      {
        title: 'An empty shell and a live date',
        icon: Timer,
        situation:
          'The space is available, the business has committed to a date, and multiple contractors have to work in the same room without tripping over each other.',
        actions: [
          'Sequence the build so trades are not competing for the same space',
          'Design white space, containment and cabling against the target density',
          'Procure and stage equipment to the programme, not to arrival',
          'Install, label and record as the work proceeds',
          'Commission with load bank and failure-mode testing',
          'Hand over with as-builts, DCIM populated and operations trained',
        ],
        outcome:
          'The room goes live on the date, and the operations team receives a documented estate rather than a room full of equipment nobody has recorded.',
      },
      {
        title: 'Adding capacity while the room stays live',
        icon: AlertTriangle,
        situation:
          'The next row has to be built out while the existing estate keeps running. Nobody will authorise a shutdown, and the risk sits in the work itself.',
        actions: [
          'Survey live circuits, containment routes and airflow before planning',
          'Write a method statement that assumes the room stays up',
          'Stage works around change windows and business-critical periods',
          'Isolate work areas physically to protect the live estate',
          'Bring new capacity up on a dedicated path before any cutover',
          'Update the as-built and DCIM record as each phase completes',
        ],
        outcome:
          'Capacity arrives without an outage, and the record of what changed keeps pace with the change rather than lagging it.',
      },
      {
        title: 'A migration with no real downtime window',
        icon: RefreshCw,
        situation:
          'Services have to move from an old room to a new one. The permitted outage is short, the dependencies are poorly documented, and reversing it is not a realistic option.',
        actions: [
          'Discover what is actually installed and what depends on what',
          'Group services into move waves by dependency, not by rack',
          'Build and prove the target environment before anything moves',
          'Rehearse the cutover, including the rollback, with real timings',
          'Execute in waves with verification between each',
          'Decommission the source only once the target is proven in service',
        ],
        outcome:
          'The move happens in the window available, and rollback is a tested procedure rather than an assumption.',
      },
      {
        title: 'Handover operations will not accept',
        icon: FileCheck,
        situation:
          'A build is physically complete but the operations team is refusing it: labelling inconsistent, as-builts missing, asset records absent, no evidence the resilience actually works.',
        actions: [
          'Audit what was delivered against what was specified',
          'Complete the labelling and cable records to a single standard',
          'Reconstruct and verify the as-built record port by port',
          'Load the asset and connectivity data into DCIM',
          'Run the failure-mode tests that were never witnessed',
          'Agree the acceptance criteria with operations and close against them',
        ],
        outcome:
          'Operations accept the room because the evidence exists, and the acceptance criteria are written down before the next build starts.',
      },
    ],
  },
  workflow: {
    heading: 'How a build runs',
    intro:
      'Five stages. The fourth is the one that gets compressed when a programme is late, and the one that costs the most to skip.',
    steps: [
      { icon: Layers, title: 'Design', desc: 'Layout, density, cooling and resilience targets agreed and modelled.' },
      { icon: Boxes, title: 'Procure', desc: 'Equipment sourced and staged to the programme rather than to lead time.' },
      { icon: Wrench, title: 'Build', desc: 'Install, cable and label, with the record captured as work proceeds.' },
      { icon: ShieldCheck, title: 'Commission', desc: 'Load, integrated systems and failure-mode testing, witnessed.' },
      { icon: FileCheck, title: 'Hand over', desc: 'As-builts, DCIM, training and acceptance against agreed criteria.' },
    ],
  },
  engagement: {
    heading: 'Three ways to buy it',
    intro:
      'A full build delivered to a date, specific packages inside someone else\'s programme, or engineers working to your design.',
    models: ENGAGEMENT_MODELS,
  },
}

/* ------------------------------------------------------------------ lidar & 3d applications */

/**
 * LiDAR & 3D Application Development.
 *
 * The LiDAR & 3D Intelligence pillar covers capture, extraction and engineering. This page
 * is the software on top: where the point clouds live, how people look at them, and the
 * road and pavement intelligence products built from them - including JSAN LiDAR Viewer
 * 360. It is written for the buyer who already has scans and needs them to be usable.
 */
const lidarApplicationDevelopment: DeepDivePage = {
  slug: 'lidar-3d-application-development',
  group: 'Spatial Applications & Engineering',
  navLabel: 'LiDAR & 3D Application Development',
  eyebrowIcon: Rotate3d,
  title: 'LiDAR & 3D Application Development',
  subtitle: 'Point clouds your teams can open, measure and act on.',
  description:
    'We build the applications that turn mobile, aerial and terrestrial LiDAR into working intelligence: cloud hosting and streaming viewers, road asset extraction, pavement condition scoring to PCI and PASER, and JSAN LiDAR Viewer 360, our own platform for exploring scans and panoramic imagery side by side in the browser.',
  image: '/pillars/lidar_3d.webp',
  imageAlt: 'Mobile LiDAR point cloud of a road corridor beside the captured street scene',
  copySide: 'left',
  positioning: [
    {
      icon: Cloud,
      title: 'From terabytes to a browser tab',
      detail:
        'Scans are tiled, indexed and streamed, so engineers, asset owners and executives open the same corridor without installing desktop software or waiting on file transfers.',
    },
    {
      icon: Crosshair,
      title: 'Measured, not just rendered',
      detail:
        'Every asset, defect and rating traces back to points and imagery with position and evidence attached, so the output stands up in design reviews and budget decisions.',
    },
    {
      icon: Share2,
      title: 'Built into your systems',
      detail:
        'Extracted features and condition scores land in your GIS, asset register or pavement management system on an agreed schema, not in a one-off export folder.',
    },
  ],
  tech: {
    eyebrow: 'What we build',
    heading: 'Four ways LiDAR becomes something you can use',
    intro:
      'From hosting the raw scan to scoring every section of pavement, each application is designed around the decision it has to support.',
    groups: [
      {
        name: 'LiDAR Hosting & Viewing',
        icon: Cloud,
        blurb:
          'Secure cloud hosting and web-based viewing for massive point cloud collections, streamed on demand so any authorised user can explore, measure and share them.',
        image: '/pillars/lidarapp_1.webp',
        items: [
          'Cloud hosting for LAS, LAZ & E57',
          'Tiling & streaming (COPC, 3D Tiles, Potree)',
          'Web viewers with measurement tools',
          'Imagery & point cloud synchronisation',
          'Role-based access & secure sharing',
          'GIS & CAD overlays',
          'Cross-sections & profile views',
          'Project, campaign & version management',
        ],
        details: [
          {
            name: 'Ingest & optimisation',
            blurb: 'Raw capture is normalised and prepared once, so every viewer and application reads the same trusted copy.',
            items: [
              'Format conversion, reprojection and datum alignment',
              'Classification-aware tiling and level-of-detail generation',
              'Trajectory, imagery and metadata linking',
              'Automated quality checks on density, coverage and gaps',
            ],
          },
          {
            name: 'Viewing & collaboration',
            blurb: 'A viewer that behaves like a working tool rather than a demo.',
            items: [
              'Distance, height, area, volume and clearance measurement',
              'Colour by elevation, intensity, classification or RGB',
              'Annotations, saved views and shareable links',
              'Embedding into web GIS, portals and dashboards',
            ],
          },
          {
            name: 'Platform & security',
            blurb: 'Hosting designed around where the data is allowed to live and who is allowed to see it.',
            items: [
              'AWS, Azure or private cloud deployment',
              'Single sign-on and project-level permissions',
              'Storage tiering for active and archived campaigns',
              'APIs for downstream applications and automation',
            ],
          },
        ],
      },
      {
        name: 'LiDAR Road Asset Intelligence',
        icon: Signpost,
        blurb:
          'Automated and reviewer-verified feature extraction that turns corridor scans into a georeferenced, attributed inventory of every roadside asset.',
        image: '/pillars/lidarapp_2.webp',
        items: [
          'Signs, signals & gantries',
          'Poles, streetlights & utility structures',
          'Lane markings & road edges',
          'Guardrails, barriers & kerbs',
          'Bridges, overpasses & vertical clearance',
          'Drainage, manholes & roadside furniture',
          'Trees & vegetation encroachment',
          'Attribute capture: height, offset, condition',
        ],
        details: [
          {
            name: 'Extraction pipeline',
            blurb: 'Machine learning handles the volume; trained reviewers confirm what automation cannot be trusted with.',
            items: [
              'Point cloud classification and segmentation',
              'Object detection fused with synchronised imagery',
              'OCR for sign text and regulatory codes',
              'Human-in-the-loop verification against sampling targets',
            ],
          },
          {
            name: 'Asset data products',
            blurb: 'Delivered in the structure your asset and GIS teams already maintain.',
            items: [
              'Point, line and polygon features with full attribution',
              'Evidence snapshots linked to each asset',
              'Change detection between survey campaigns',
              'Delivery to ArcGIS, PostGIS, CAD or asset management systems',
            ],
          },
        ],
      },
      {
        name: 'LiDAR Pavement Intelligence',
        icon: Construction,
        blurb:
          'Objective pavement condition assessment from LiDAR and imagery, with distresses detected, measured and scored to PCI and PASER for maintenance planning you can defend.',
        image: '/pillars/lidarapp_3.webp',
        items: [
          'Pavement Condition Index (PCI)',
          'PASER ratings',
          'Cracking detection & classification',
          'Rutting & surface deformation',
          'Potholes, patching & ravelling',
          'Roughness & ride quality indicators',
          'Section-level condition scoring',
          'Maintenance & rehabilitation prioritisation',
        ],
        details: [
          {
            name: 'Distress detection & measurement',
            blurb: 'Distresses are located, typed and quantified from the surface model rather than estimated from a windshield survey.',
            items: [
              'Longitudinal, transverse and alligator cracking',
              'Rut depth and deformation from the 3D surface',
              'Severity and extent per distress type',
              'Imagery evidence attached to each detection',
            ],
          },
          {
            name: 'Condition scoring',
            blurb: 'Ratings calculated consistently across the whole network and every survey cycle.',
            items: [
              'PCI calculation aligned to ASTM D6433 methodology',
              'PASER 1 to 10 visual rating support',
              'Network segmentation to your road section model',
              'Year-on-year deterioration tracking',
            ],
          },
          {
            name: 'Decision support',
            blurb: 'Condition turned into a programme of work, not just a colour-coded map.',
            items: [
              'Treatment recommendations by condition band',
              'Budget and prioritisation scenarios',
              'Dashboards for engineers and elected officials',
              'Integration with pavement management systems',
            ],
          },
        ],
      },
      {
        name: 'JSAN LiDAR Viewer 360',
        icon: Orbit,
        blurb:
          'Our in-house platform for exploring LiDAR, 360° panoramic imagery and extracted assets together in one browser experience, built for the teams who need to see the corridor without driving it again.',
        image: '/pillars/lidarapp_4.webp',
        items: [
          '360° panoramas synchronised with point clouds',
          'Map, panorama & 3D views in one workspace',
          'Measure directly in imagery and scans',
          'Asset & defect layers from extraction',
          'Search by location, route or asset',
          'Campaign comparison over time',
          'Browser-based, no installation',
          'White-label & API options',
        ],
        details: [
          {
            name: 'Explore',
            blurb: 'A virtual drive of the corridor with every data source aligned to the same position.',
            items: [
              'Step-through panoramic navigation along the trajectory',
              'Linked 2D map, 360° view and 3D point cloud',
              'Toggle classification, intensity and asset layers',
              'Jump to any asset, chainage or coordinate',
            ],
          },
          {
            name: 'Measure & verify',
            blurb: 'Answer site questions from the desk with evidence attached.',
            items: [
              'Heights, widths, offsets and clearances',
              'Verify extracted assets and edit attributes',
              'Flag defects and raise review tasks',
              'Export evidence snapshots and reports',
            ],
          },
          {
            name: 'Deploy & integrate',
            blurb: 'Delivered as a hosted service or configured into your own environment.',
            items: [
              'Hosted SaaS or private deployment',
              'Single sign-on and user roles',
              'Embeds in web GIS and asset portals',
              'APIs for data loading and third-party applications',
            ],
          },
        ],
      },
    ],
  },
  scenarios: {
    eyebrow: 'Your requirements',
    heading: 'From scan data to working decisions',
    intro: 'Choose an application area and a situation to see how we approach it and what changes.',
    items: [],
    collections: [
      {
        name: 'Hosting & Viewing',
        items: [
          {
            title: 'Terabytes of scans nobody can open',
            icon: Database,
            situation:
              'Survey campaigns are sitting on hard drives and file shares. Only a handful of specialists with desktop software can view them, so the data is paid for but rarely used.',
            actions: [
              'Audit formats, coordinate systems and coverage across campaigns',
              'Convert, tile and index the collection for streaming',
              'Deploy a secure web viewer with measurement tools',
              'Link imagery, trajectories and GIS layers to the scans',
              'Set up roles, sharing and project-level access',
            ],
            outcome:
              'Engineers, planners and contractors open the corridor in a browser, and the survey investment is used across the organisation instead of one team.',
          },
          {
            title: 'Sharing scan data with contractors securely',
            icon: Lock,
            situation:
              'Design partners and contractors need the point cloud, but emailing drives and granting network access creates version confusion and security risk.',
            actions: [
              'Host the data in a controlled cloud environment',
              'Define project, area and user-level permissions',
              'Publish shareable views with expiry and audit trails',
              'Expose APIs for approved downstream tools',
            ],
            outcome:
              'Everyone works from the same current copy, access is controlled and auditable, and nothing leaves on a hard drive.',
          },
        ],
      },
      {
        name: 'Road Asset Intelligence',
        items: [
          {
            title: 'No reliable inventory of roadside assets',
            icon: Signpost,
            situation:
              'The asset register is incomplete and out of date. Signs, poles, barriers and markings were last recorded manually, and nobody trusts the positions or attributes.',
            actions: [
              'Agree the asset schema, attributes and accuracy targets',
              'Classify the corridor point cloud and fuse it with imagery',
              'Extract and attribute assets with ML and reviewer verification',
              'Attach evidence snapshots to every feature',
              'Deliver into the GIS or asset management system of record',
            ],
            outcome:
              'A complete, georeferenced inventory the maintenance and planning teams can rely on, with the evidence to back every record.',
          },
          {
            title: 'Keeping the inventory current between surveys',
            icon: RefreshCw,
            situation:
              'A baseline inventory exists, but each new capture campaign is processed from scratch, and changes on the network are missed.',
            actions: [
              'Align new campaigns to the existing baseline',
              'Detect added, removed and changed assets automatically',
              'Route changes to reviewers for confirmation',
              'Update records with a full change history',
            ],
            outcome:
              'Each survey updates the inventory rather than replacing it, and changes on the network are caught on the next pass.',
          },
        ],
      },
      {
        name: 'Pavement Intelligence',
        items: [
          {
            title: 'Maintenance budgets set on subjective ratings',
            icon: Gauge,
            situation:
              'Pavement condition comes from windshield surveys that vary by inspector and year, so maintenance priorities are hard to defend to councils and funding bodies.',
            actions: [
              'Segment the network to the agreed road section model',
              'Detect and measure cracking, rutting and surface distress from LiDAR',
              'Calculate PCI and PASER ratings consistently per section',
              'Attach imagery evidence to each distress and score',
              'Publish condition maps and dashboards for decision makers',
            ],
            outcome:
              'Objective, repeatable condition scores across the whole network, and a maintenance programme that can be explained and defended.',
          },
          {
            title: 'Turning condition data into a programme of work',
            icon: Route,
            situation:
              'Condition data exists, but it has not been translated into treatments, costs and a prioritised schedule the engineering team can deliver.',
            actions: [
              'Map condition bands to treatment strategies',
              'Model budget and prioritisation scenarios',
              'Track deterioration across survey cycles',
              'Integrate results with the pavement management system',
            ],
            outcome:
              'A ranked, costed programme of work tied directly to measured condition, updated every time the network is resurveyed.',
          },
        ],
      },
      {
        name: 'JSAN LiDAR Viewer 360',
        items: [
          {
            title: 'Site visits just to check one detail',
            icon: Eye,
            situation:
              'Engineers drive out to confirm a sign height, a clearance or an asset condition, costing time and putting people on live roads.',
            actions: [
              'Load corridor scans and 360° imagery into LiDAR Viewer 360',
              'Synchronise panoramas, point cloud and map to one position',
              'Enable measurement directly in imagery and 3D',
              'Overlay extracted assets and defect layers',
            ],
            outcome:
              'Most site questions are answered from the desk with measured evidence, and field visits are reserved for work that genuinely needs them.',
          },
          {
            title: 'Different teams, different versions of the corridor',
            icon: Compass,
            situation:
              'Asset, pavement, design and operations teams each hold their own extracts and screenshots, and nobody is looking at the same picture.',
            actions: [
              'Deploy LiDAR Viewer 360 as a shared workspace',
              'Configure roles and views for each team',
              'Connect asset and condition layers from the system of record',
              'Embed the viewer in existing GIS and asset portals',
            ],
            outcome:
              'One visual reference for the whole network, used by every team that works on it.',
          },
        ],
      },
    ],
  },
  workflow: {
    heading: 'From capture to application',
    intro: 'A single delivery path, whether the requirement is a viewer, an asset inventory, pavement scores or all of them.',
    steps: [
      { icon: FileSearch, title: 'Assess', desc: 'Review existing scans, imagery, accuracy targets and the decisions the data must support.' },
      { icon: Layers, title: 'Prepare', desc: 'Register, classify, tile and link point clouds with imagery and trajectories.' },
      { icon: ScanLine, title: 'Extract', desc: 'Detect assets and pavement distress with ML and reviewer verification.' },
      { icon: Code, title: 'Build', desc: 'Configure hosting, viewers, dashboards and integrations around your users.' },
      { icon: ShieldCheck, title: 'Validate & operate', desc: 'Check accuracy against targets, hand over, and support the platform in use.' },
    ],
  },
  engagement: {
    heading: 'Choose the right delivery model',
    intro: 'A defined application project, a hosted platform subscription or ongoing data and support services.',
    models: [
      { name: 'Application project', icon: Wrench, detail: 'Custom LiDAR hosting, viewer, extraction or pavement applications delivered to an agreed scope and acceptance criteria.' },
      { name: 'Platform subscription', icon: Cloud, detail: 'JSAN LiDAR Viewer 360 and hosting provided as a managed service, with onboarding, configuration and updates included.' },
      { name: 'Data & support services', icon: LifeBuoy, detail: 'Recurring extraction, condition scoring and platform support aligned to your survey cycles and changing workloads.' },
    ],
  },
}

/* ------------------------------------------------------------------ 2d & 3d annotation */

/**
 * 2D & 3D Annotation & Segmentation.
 *
 * Sits under Visual & AI-Assisted Data Annotation. It is read by ML and data leads who
 * need training data, so it names the annotation types, geometries and formats outright,
 * for camera imagery and for LiDAR point clouds, and says how quality is controlled.
 * Like the rest of this file it avoids accuracy percentages and throughput figures: those
 * are agreed per project, against a gold set, not promised on a marketing page.
 */
const annotationSegmentation: DeepDivePage = {
  slug: '2d-3d-annotation-segmentation',
  group: 'Visual & AI-Assisted Data Annotation',
  navLabel: '2D & 3D Annotation & Segmentation',
  eyebrowIcon: ScanLine,
  title: '2D & 3D Annotation & Segmentation',
  subtitle: 'Training data for vision models, from camera frames to LiDAR point clouds.',
  description:
    'We label imagery, video and LiDAR at production scale: bounding boxes, polygons and keypoints, semantic and instance segmentation, 3D cuboids and point-level classification, and fused camera-LiDAR sequences tracked across frames. AI pre-labelling handles the volume, trained annotators refine every edge, and multi-stage QA against your ontology decides what ships.',
  image: '/pillars/object_detection.webp',
  imageAlt: 'Street, aerial and utility imagery annotated with boxes, polygons and segmentation masks',
  copySide: 'left',
  positioning: [
    {
      icon: Layers,
      title: 'Every modality, one ontology',
      detail:
        'Camera images, video, aerial imagery and LiDAR are labelled against a single class definition, so 2D and 3D datasets agree on what a pole, a lane or a pedestrian is.',
    },
    {
      icon: Bot,
      title: 'AI-assisted, human-verified',
      detail:
        'Model pre-labels, interpolation and auto-segmentation remove the repetitive work. Trained annotators correct boundaries, resolve ambiguity and handle the edge cases models get wrong.',
    },
    {
      icon: ShieldCheck,
      title: 'Quality you can measure',
      detail:
        'Gold-set benchmarking, reviewer consensus and sampling against agreed acceptance criteria, reported per class and per batch rather than asserted.',
    },
  ],
  tech: {
    eyebrow: 'What we annotate',
    heading: 'From pixels to points',
    intro:
      'Four annotation practices covering 2D imagery and 3D point clouds. Each runs on the same ontology management, tooling and quality framework.',
    groups: [
      {
        name: '2D Image & Video Annotation',
        icon: BoxSelect,
        blurb:
          'Object-level labels for street-level, dashcam, drone and satellite imagery, with attributes captured alongside the geometry and objects tracked consistently through video.',
        image: '/pillars/AIML Object Detection.webp',
        items: [
          'Bounding boxes & rotated boxes',
          'Polygons & polylines',
          'Keypoints & skeletons',
          'Lane & road marking lines',
          'Image classification & tagging',
          'Attributes: occlusion, truncation, state',
          'Video object tracking with persistent IDs',
          'OCR & sign text transcription',
        ],
        details: [
          {
            name: 'Geometry types',
            blurb: 'The shape is chosen by what the model has to learn, not by what is quickest to draw.',
            items: [
              'Axis-aligned and rotated bounding boxes for detection',
              'Polygons for irregular objects and footprints',
              'Polylines and splines for lanes, kerbs and linear assets',
              'Keypoints for poses, corners and structural landmarks',
            ],
          },
          {
            name: 'Imagery sources',
            blurb: 'Annotation guidelines are adapted to the viewpoint and resolution of each source.',
            items: [
              'Street-level and 360° panoramic imagery',
              'Dashcam and ADAS camera frames',
              'Drone, aerial and satellite imagery',
              'Video sequences with frame interpolation',
            ],
          },
        ],
      },
      {
        name: '2D Image Segmentation',
        icon: Shapes,
        blurb:
          'Pixel-accurate masks for scene understanding, land cover and asset extraction, drawn to boundaries tight enough for models that learn edges rather than approximate shapes.',
        image: '/pillars/pixel.webp',
        items: [
          'Semantic segmentation',
          'Instance segmentation',
          'Panoptic segmentation',
          'Land cover & land use classification',
          'Road surface & drivable area masks',
          'Building footprint & roof segmentation',
          'Vegetation & water body extraction',
          'AI-assisted mask refinement',
        ],
        details: [
          {
            name: 'Segmentation types',
            blurb: 'Matched to whether the model needs to know what a pixel is, which object it belongs to, or both.',
            items: [
              'Semantic: every pixel assigned a class',
              'Instance: each object separated with its own mask',
              'Panoptic: stuff and things labelled together',
              'Hierarchical classes with parent and child labels',
            ],
          },
          {
            name: 'Precision controls',
            blurb: 'Boundary quality is checked, not assumed.',
            items: [
              'Model-generated masks corrected by annotators',
              'Boundary and edge-accuracy review',
              'IoU-based comparison against gold-standard masks',
              'Consistent handling of occlusion and ambiguous regions',
            ],
          },
        ],
      },
      {
        name: '3D LiDAR & Point Cloud Annotation',
        icon: Box,
        blurb:
          'Cuboids, point-level classes and 3D polylines on mobile, aerial and terrestrial LiDAR, annotated in true 3D space with the orientation, dimensions and classes perception and mapping models depend on.',
        image: '/pillars/ontology.webp',
        items: [
          '3D cuboids with heading & dimensions',
          'Point-level semantic segmentation',
          '3D instance segmentation',
          'Ground, vegetation & structure classification',
          '3D polylines for lanes, kerbs & wires',
          'Poles, signs & roadside asset labelling',
          'Building & terrain feature classes',
          'ASPRS LAS class compliance',
        ],
        details: [
          {
            name: '3D object annotation',
            blurb: 'Boxes fitted to the points, not to a guess of where the object should be.',
            items: [
              'Tight-fit cuboids with yaw, pitch and roll where required',
              'Consistent box sizing for the same object across frames',
              'Attributes such as moving, parked, occluded or partial',
              'Sparse and distant-object handling rules',
            ],
          },
          {
            name: 'Point cloud segmentation',
            blurb: 'Every point assigned a class for mapping, engineering and perception datasets.',
            items: [
              'Semantic classes for ground, road, building, vegetation and assets',
              'Instance separation of individual poles, trees and vehicles',
              'Wire, conductor and thin-structure labelling',
              'Output to LAS/LAZ classification codes or custom schemas',
            ],
          },
          {
            name: 'Sources',
            blurb: 'Annotation tuned to the density and geometry of each capture type.',
            items: [
              'Vehicle-mounted mobile LiDAR',
              'Airborne and drone LiDAR',
              'Terrestrial laser scans',
              'Automotive spinning and solid-state sensors',
            ],
          },
        ],
      },
      {
        name: 'Sensor Fusion & 4D Sequence Annotation',
        icon: Combine,
        blurb:
          'Camera and LiDAR labelled together in calibrated, time-synchronised sequences, so each object carries one identity in 2D and 3D and one track through time.',
        image: '/pillars/computer_vision.webp',
        items: [
          'Camera-LiDAR fused annotation',
          '3D cuboid projection into camera views',
          'Multi-camera, 360° scene labelling',
          'Object tracking across sequences (4D)',
          'Persistent IDs across sensors & frames',
          'Keyframe labelling with interpolation',
          'Ego-motion & calibration-aware tooling',
          'Scenario & event tagging',
        ],
        details: [
          {
            name: 'Fusion workflow',
            blurb: 'The same object labelled once, verified in every view.',
            items: [
              'Calibration and timestamp alignment checks before labelling',
              'Cuboids drawn in 3D and validated in projected 2D',
              '2D boxes and masks linked to their 3D counterparts',
              'Cross-sensor consistency review',
            ],
          },
          {
            name: 'Sequence & tracking',
            blurb: 'Track continuity matters as much as per-frame accuracy.',
            items: [
              'Keyframe annotation with reviewed interpolation',
              'Track ID continuity through occlusion',
              'Dynamic attributes such as velocity state and actions',
              'Scene-level tags for weather, lighting and events',
            ],
          },
        ],
      },
    ],
  },
  scenarios: {
    eyebrow: 'Your requirements',
    heading: 'From raw sensor data to model-ready datasets',
    intro: 'Choose 2D or 3D and a situation to see how we run the work and what you receive.',
    items: [],
    collections: [
      {
        name: '2D Imagery',
        items: [
          {
            title: 'A detection model stuck on edge cases',
            icon: Target,
            situation:
              'The model performs well on common objects but fails on small, occluded or unusual ones, and the existing labels are inconsistent exactly where it matters.',
            actions: [
              'Audit existing labels and failure cases against the model errors',
              'Tighten the ontology and edge-case rules with worked examples',
              'Re-label targeted subsets with boxes, polygons and attributes',
              'Add hard negatives and rare-class examples',
              'Benchmark against a gold set before release',
            ],
            outcome:
              'A cleaner, more consistent dataset focused on the cases the model actually gets wrong.',
          },
          {
            title: 'Segmentation masks for aerial and street imagery',
            icon: Shapes,
            situation:
              'A land cover, road surface or building extraction model needs pixel-accurate masks across large, varied imagery, and hand-drawn masks are too slow and too uneven.',
            actions: [
              'Define classes, boundary rules and minimum mapping units',
              'Generate AI pre-segmentation for every tile or frame',
              'Refine masks and boundaries with trained annotators',
              'Review edge accuracy against gold-standard masks',
              'Deliver in COCO, mask PNG or GeoTIFF formats',
            ],
            outcome:
              'Semantic, instance or panoptic masks with consistent boundaries, delivered in the format your training pipeline expects.',
          },
        ],
      },
      {
        name: '3D Point Cloud',
        items: [
          {
            title: 'LiDAR perception data for autonomous systems',
            icon: Box,
            situation:
              'A perception team needs 3D cuboids and tracks across long driving sequences, with sizes, headings and IDs consistent from frame to frame.',
            actions: [
              'Agree class definitions, box-fitting and occlusion rules',
              'Pre-label cuboids with models and interpolate between keyframes',
              'Correct boxes in 3D and verify in projected camera views',
              'Check track ID continuity and size consistency per object',
              'Export to KITTI, nuScenes-style or custom JSON schemas',
            ],
            outcome:
              'Sequence-consistent 3D labels that a perception model can train on without per-frame noise.',
          },
          {
            title: 'Classifying mapping and utility point clouds',
            icon: Layers,
            situation:
              'Corridor and city-scale LiDAR needs point-level classes for ground, buildings, vegetation, poles and wires, and automated classifiers leave too many errors.',
            actions: [
              'Map required classes to ASPRS or a custom scheme',
              'Run automated classification as the starting point',
              'Correct misclassified points and separate asset instances',
              'Label thin structures such as wires and conductors',
              'QA by sampled sections and class-level review',
            ],
            outcome:
              'Classified point clouds ready for feature extraction, engineering analysis or model training.',
          },
        ],
      },
      {
        name: 'Fusion & Quality',
        items: [
          {
            title: 'Camera and LiDAR labels that do not agree',
            icon: Combine,
            situation:
              'Separate teams labelled images and point clouds, so the same object carries different classes, IDs and extents in 2D and 3D.',
            actions: [
              'Verify calibration and time synchronisation first',
              'Annotate in a fused view with projected cuboids',
              'Link 2D and 3D labels to a single object ID',
              'Run cross-sensor consistency checks per sequence',
            ],
            outcome:
              'One consistent labelled scene across sensors, ready for fusion models.',
          },
          {
            title: 'Scaling annotation without losing quality',
            icon: Users,
            situation:
              'Volumes are rising, deadlines are fixed, and every previous attempt to scale added annotators and lost consistency.',
            actions: [
              'Train and certify annotators on your ontology and gold set',
              'Set layered review with consensus on ambiguous classes',
              'Track quality per class, per annotator and per batch',
              'Feed recurring errors back into guidelines and training',
            ],
            outcome:
              'Throughput that grows with demand while quality stays inside agreed acceptance criteria.',
          },
        ],
      },
    ],
  },
  workflow: {
    heading: 'How an annotation programme runs',
    intro: 'The same five stages for 2D and 3D. The pilot is where the guidelines are proven before scale.',
    steps: [
      { icon: FileSearch, title: 'Define', desc: 'Agree the ontology, edge-case rules, formats and acceptance criteria.' },
      { icon: Target, title: 'Pilot', desc: 'Label a calibration batch, build the gold set and refine guidelines.' },
      { icon: Bot, title: 'Pre-label', desc: 'Apply model-assisted labels, auto-segmentation and interpolation.' },
      { icon: Users, title: 'Annotate & review', desc: 'Trained annotators refine labels with layered review and consensus.' },
      { icon: ShieldCheck, title: 'QA & deliver', desc: 'Sample against the gold set, report quality and deliver in your format.' },
    ],
  },
  engagement: {
    heading: 'Choose the right delivery model',
    intro: 'A defined dataset, a managed annotation pipeline or a dedicated team working inside your tools.',
    models: [
      { name: 'Dataset project', icon: Boxes, detail: 'A scoped dataset labelled to an agreed ontology, volume, format and acceptance criteria.' },
      { name: 'Managed annotation', icon: RefreshCw, detail: 'A continuous pipeline aligned to your data collection and model training cycles, with quality reported per batch.' },
      { name: 'Dedicated team', icon: Users, detail: 'Trained annotators and reviewers working in your platform, to your guidelines and your review process.' },
    ],
  },
}

/* ------------------------------------------------------------------ geospatial & mapping */

/**
 * The Geospatial & Mapping deep dives.
 *
 * These five replaced the older /services/geospatial/* and /services/location-intelligence/*
 * sub-service pages, which carried unverifiable percentages ("reduced delivery times by up
 * to 25%") and a different layout from the rest of the capability pages. The old URLs 301
 * here. As elsewhere in this file, nothing below is a number JSAN would have to defend.
 */

/** How geospatial work is bought. Shared by the five Geospatial & Mapping pages. */
const GEOSPATIAL_ENGAGEMENT: EngagementModel[] = [
  {
    name: 'Project delivery',
    icon: Wrench,
    detail: 'A defined area, dataset or platform delivered to an agreed specification, accuracy target and acceptance criteria.',
  },
  {
    name: 'Managed data programme',
    icon: RefreshCw,
    detail: 'Continuous production and maintenance on a refresh cycle, with quality reported per release rather than at the end.',
  },
  {
    name: 'Specialist capacity',
    icon: Users,
    detail: 'GIS analysts, data engineers and editors working inside your team, to your tools, schema and review process.',
  },
]

const navigationData: DeepDivePage = {
  slug: 'navigation-data',
  group: 'Geospatial & Mapping',
  navLabel: 'Navigation Data',
  eyebrowIcon: Navigation,
  title: 'Navigation Data',
  subtitle: 'The map layer routing engines, fleets and drivers actually depend on.',
  description:
    'We build and maintain navigation-grade map data: routable road networks with connectivity and turn restrictions, addresses that geocode to the right door, speed and access attribution, and the change detection that keeps it all current. Built to your schema, validated against ground truth, and delivered on a release cycle your routing stack can consume.',
  image: '/pillars/navigation.webp',
  imageAlt: 'Layered navigation data model built from street imagery, LiDAR and authoritative sources',
  copySide: 'left',
  techLayout: 'cards',
  positioning: [
    {
      icon: Route,
      title: 'Routable, not just drawn',
      detail:
        'Geometry is only the start. Connectivity, restrictions, directionality and access are what decide whether a route is legal, drivable and the one a driver would take.',
    },
    {
      icon: MapPin,
      title: 'Addresses that land at the door',
      detail:
        'Address points, entrances and access points are captured and validated so geocoding, dispatch and last-mile delivery stop failing at the final few metres.',
    },
    {
      icon: RefreshCw,
      title: 'Current by design',
      detail:
        'Road changes are detected from imagery, probe signals and field evidence and released on an agreed cycle, so the map does not quietly age between projects.',
    },
  ],
  tech: {
    eyebrow: 'What we deliver',
    heading: 'Every layer a route depends on',
    intro:
      'Four practices that together produce a navigation dataset: the network, the addresses, the rules of movement and the process that keeps them current.',
    groups: [
      {
        name: 'Road Network & Topology',
        icon: GitMerge,
        blurb:
          'Centrelines and lane-level geometry built with the connectivity and topology a routing graph needs, checked for the errors that break routes.',
        image: '/pillars/roads_tracing.webp',
        items: [
          'Routable road centrelines',
          'Junction & node modelling',
          'Lane-level geometry',
          'Grade separation: bridges & tunnels',
          'Functional road classification',
          'Topology & connectivity checks',
        ],
        details: [
          {
            name: 'Network build',
            blurb: 'Geometry and connectivity captured together, not reconciled afterwards.',
            items: [
              'Digitising from street-level imagery, LiDAR and aerial sources',
              'Z-level and grade-separation handling at overpasses',
              'Complex junction and roundabout modelling',
              'Network conflation with authoritative and legacy datasets',
            ],
          },
          {
            name: 'Topology validation',
            blurb: 'Automated rules that catch what visual review misses.',
            items: [
              'Dangles, undershoots and disconnected segments',
              'Duplicate and overlapping links',
              'One-way consistency and dead-end logic',
              'Route-testing between sampled origin and destination pairs',
            ],
          },
        ],
      },
      {
        name: 'Address & Geocoding Data',
        icon: MapPin,
        blurb:
          'Address points, building entrances and postal structures maintained so a search returns the right location, not the middle of the street segment.',
        image: '/pillars/adress.webp',
        items: [
          'Address point creation & maintenance',
          'House number ranges & interpolation',
          'Building entrances & access points',
          'Postal code & locality boundaries',
          'Multilingual & transliterated names',
          'Geocoding accuracy testing',
        ],
        details: [
          {
            name: 'Address capture',
            blurb: 'From authoritative records, imagery and field evidence, reconciled into one register.',
            items: [
              'Parsing and standardising address formats per market',
              'Rooftop and entrance-level positioning',
              'Alternate names, vanity and legacy addresses',
              'Duplicate detection and merge rules',
            ],
          },
          {
            name: 'Geocoding quality',
            blurb: 'Measured the way your users experience it.',
            items: [
              'Test sets of real-world queries per region',
              'Match rate and positional error review',
              'Failure analysis by address type and locality',
              'Feedback loop into the address register',
            ],
          },
        ],
      },
      {
        name: 'Routing Attribution & Restrictions',
        icon: Signpost,
        blurb:
          'The rules of movement: turn restrictions, speeds, access, vehicle limits and signage, captured from evidence and attached to the network in your data model.',
        image: '/pillars/route.webp',
        items: [
          'Turn restrictions & manoeuvres',
          'One-way & directional flow',
          'Speed limits & speed categories',
          'Truck & vehicle restrictions',
          'Time-based & conditional access',
          'Toll roads, ferries & road names',
        ],
        details: [
          {
            name: 'Attribute capture',
            blurb: 'Every rule traceable to the sign, image or source that justifies it.',
            items: [
              'Sign reading from street-level imagery with OCR support',
              'Restriction modelling at junction and lane level',
              'Conditional restrictions by time, vehicle type or purpose',
              'Evidence links stored against each attribute',
            ],
          },
          {
            name: 'Commercial and fleet routing',
            blurb: 'Attribution for vehicles that cannot take the car route.',
            items: [
              'Truck-legal routing attributes',
              'Hazardous goods and low-emission zone rules',
              'Delivery access and loading zones',
              'Speed profiles for journey-time estimation',
            ],
          },
        ],
      },
      {
        name: 'Change Detection & Map Maintenance',
        icon: RefreshCw,
        blurb:
          'New roads, closures, changed restrictions and new addresses detected from multiple signals, verified and released on a schedule, so the map keeps pace with the ground.',
        image: '/pillars/ground_truth.webp',
        items: [
          'Imagery-based change detection',
          'Probe & GPS trace analysis',
          'Authoritative source monitoring',
          'Field verification of changes',
          'Versioned releases & change logs',
          'Coverage & freshness reporting',
        ],
        details: [
          {
            name: 'Detect and verify',
            blurb: 'Signals raise candidates; evidence decides what changes.',
            items: [
              'Comparison of new capture against the current map',
              'Trace deviation analysis for unmapped or closed roads',
              'Triage of reported issues by impact and confidence',
              'Field crews dispatched where desk evidence is insufficient',
            ],
          },
          {
            name: 'Release management',
            blurb: 'Change delivered in a form downstream systems can absorb.',
            items: [
              'Incremental and full release packages',
              'Schema-validated exports per release',
              'Change logs linked to evidence',
              'Regression checks before publication',
            ],
          },
        ],
      },
    ],
  },
  scenarios: {
    eyebrow: 'Your requirements',
    heading: 'From map gaps to reliable routes',
    intro: 'Choose an area and a situation to see how we approach it and what changes.',
    items: [],
    collections: [
      {
        name: 'Network & Routing',
        items: [
          {
            title: 'Routes that are legal on the map but wrong on the road',
            icon: Route,
            situation:
              'Drivers are sent through banned turns, closed streets and the wrong side of divided roads. The geometry looks fine; the attribution behind it does not.',
            actions: [
              'Audit restriction and connectivity errors against sampled routes',
              'Capture turn restrictions and one-ways from street-level imagery',
              'Remodel complex junctions and grade separations',
              'Run topology and route tests before release',
              'Deliver corrections as an incremental update',
            ],
            outcome:
              'Routes that match what drivers can legally and physically do, with each rule traceable to evidence.',
          },
          {
            title: 'Fleet routing for vehicles that are not cars',
            icon: Truck,
            situation:
              'Trucks and delivery vans are routed under low bridges, into weight-restricted streets and through areas they cannot legally enter.',
            actions: [
              'Define the vehicle profiles that matter to the fleet',
              'Capture height, weight, width and access restrictions',
              'Model time-based and conditional access rules',
              'Validate truck routes on high-risk corridors',
            ],
            outcome:
              'Commercial routing that respects the vehicle, reducing diversions, fines and unsafe manoeuvres.',
          },
        ],
      },
      {
        name: 'Addresses & Freshness',
        items: [
          {
            title: 'Deliveries failing at the last few metres',
            icon: MapPin,
            situation:
              'Addresses geocode to the street centreline or the wrong building, and drivers lose time finding entrances, units and access points.',
            actions: [
              'Test geocoding against real delivery addresses',
              'Capture rooftop positions, entrances and access points',
              'Standardise unit, block and complex addressing',
              'Feed confirmed corrections back into the register',
            ],
            outcome:
              'Addresses that resolve to the right door, and fewer failed or delayed deliveries.',
          },
          {
            title: 'A map that is out of date the day it ships',
            icon: RefreshCw,
            situation:
              'New developments, closures and restriction changes appear faster than one-off update projects can capture them.',
            actions: [
              'Set up change detection from imagery, probes and sources',
              'Triage candidates by impact and confidence',
              'Verify high-impact changes in the field',
              'Publish on a fixed release cadence with change logs',
            ],
            outcome:
              'A navigation dataset maintained as a programme, with freshness reported rather than assumed.',
          },
        ],
      },
    ],
  },
  workflow: {
    heading: 'How navigation data is built and kept current',
    intro: 'The same cycle for a new market or a maintained one. Only the source mix changes.',
    steps: [
      { icon: FileSearch, title: 'Specify', desc: 'Agree schema, attribution depth, accuracy targets and release format.' },
      { icon: Camera, title: 'Source', desc: 'Combine street-level capture, LiDAR, aerial imagery and authoritative data.' },
      { icon: Layers, title: 'Build', desc: 'Digitise the network, addresses and restrictions with evidence attached.' },
      { icon: ShieldCheck, title: 'Validate', desc: 'Topology rules, route tests and sampled field checks before release.' },
      { icon: RefreshCw, title: 'Release & maintain', desc: 'Versioned delivery, then change detection on an agreed cycle.' },
    ],
  },
  engagement: {
    heading: 'Choose the right delivery model',
    intro: 'A market build, a continuous maintenance programme or specialist editors in your team.',
    models: GEOSPATIAL_ENGAGEMENT,
  },
}

const spatialAnalysis: DeepDivePage = {
  slug: 'spatial-analysis',
  group: 'Geospatial & Mapping',
  navLabel: 'Spatial Analysis',
  eyebrowIcon: BarChart3,
  title: 'Spatial Analysis',
  subtitle: 'Location turned into a decision, not another layer on a map.',
  description:
    'We apply geostatistics, network analysis, suitability modelling and spatial data science to real operational questions: where to build, what to serve, where risk sits and how demand moves. Every analysis starts from validated data, states its assumptions, and ends in outputs planners and executives can act on.',
  image: '/pillars/spatial.webp',
  imageAlt: 'City-scale spatial analytics dashboard with density and network layers',
  copySide: 'left',
  techLayout: 'cards',
  positioning: [
    {
      icon: Target,
      title: 'Start from the question',
      detail:
        'Every engagement begins with the decision to be made, so methods and data are chosen to answer it rather than to demonstrate a technique.',
    },
    {
      icon: Database,
      title: 'Built on validated data',
      detail:
        'Analysis is only as good as its inputs. We check coverage, accuracy and bias in the data before any model runs, and say where the gaps are.',
    },
    {
      icon: Eye,
      title: 'Transparent, repeatable methods',
      detail:
        'Assumptions, parameters and workflows are documented and scripted, so results can be reviewed, challenged and re-run when conditions change.',
    },
  ],
  tech: {
    eyebrow: 'What we analyse',
    heading: 'Methods matched to the decision',
    intro:
      'Four analytical practices, from choosing a site to forecasting demand, delivered as reproducible workflows and decision-ready outputs.',
    groups: [
      {
        name: 'Suitability & Site Selection',
        icon: Crosshair,
        blurb:
          'Multi-criteria models that weigh constraints, costs and opportunities across a landscape to rank where something should, or should not, go.',
        image: '/pillars/decisions.webp',
        items: [
          'Multi-criteria decision analysis',
          'Weighted overlay & constraint mapping',
          'Site ranking & shortlisting',
          'Corridor & route selection',
          'Environmental & planning constraints',
          'Scenario comparison',
        ],
        details: [
          {
            name: 'Model design',
            blurb: 'Criteria and weights agreed with the people who own the decision.',
            items: [
              'Stakeholder workshops to define criteria and exclusions',
              'Normalisation of criteria onto comparable scales',
              'Hard constraints separated from weighted preferences',
              'Documented rationale for every weight',
            ],
          },
          {
            name: 'Outputs',
            blurb: 'Results a committee can read and a planner can use.',
            items: [
              'Suitability surfaces and ranked site lists',
              'Site profiles with the evidence behind each score',
              'Scenario maps for alternative weightings',
              'GIS-ready layers for further planning',
            ],
          },
        ],
      },
      {
        name: 'Network & Accessibility Analysis',
        icon: Network,
        blurb:
          'Travel-time, catchment and service-area analysis on real road and transit networks, showing who can reach what, how quickly, and where coverage fails.',
        image: '/pillars/location_intel.webp',
        items: [
          'Drive-time & walk-time catchments',
          'Service area & coverage analysis',
          'Location-allocation modelling',
          'Accessibility & equity indices',
          'Isochrone mapping',
          'Emergency response coverage',
        ],
        details: [
          {
            name: 'Network modelling',
            blurb: 'Travel represented the way people and vehicles actually move.',
            items: [
              'Road, transit and pedestrian network preparation',
              'Impedance by time of day where data allows',
              'Barriers, restrictions and one-way handling',
              'Multi-modal journey modelling',
            ],
          },
          {
            name: 'Coverage decisions',
            blurb: 'From analysis to where facilities and resources should sit.',
            items: [
              'Gap analysis against service standards',
              'Optimal placement of new facilities',
              'Rebalancing of existing service areas',
              'Population and demand weighting',
            ],
          },
        ],
      },
      {
        name: 'Geostatistics & Predictive Modelling',
        icon: TrendingUp,
        blurb:
          'Spatial statistics and machine learning that detect patterns, estimate values between observations and forecast how demand, risk or change will be distributed.',
        image: '/pillars/advance-analytics.webp',
        items: [
          'Hot spot & cluster analysis',
          'Interpolation & kriging',
          'Geographically weighted regression',
          'Demand & risk forecasting',
          'Trade area & catchment modelling',
          'Model validation & uncertainty',
        ],
        details: [
          {
            name: 'Pattern and estimation',
            blurb: 'Separating real spatial structure from noise.',
            items: [
              'Getis-Ord and local Moran statistics',
              'Kernel density and point pattern analysis',
              'Kriging and inverse distance interpolation',
              'Uncertainty surfaces alongside estimates',
            ],
          },
          {
            name: 'Prediction',
            blurb: 'Models that respect location rather than ignore it.',
            items: [
              'Spatially aware feature engineering',
              'Regression and ML with spatial cross-validation',
              'Scenario-based demand projection',
              'Documented model performance and limits',
            ],
          },
        ],
      },
      {
        name: 'Visualisation & Decision Dashboards',
        icon: LayoutDashboard,
        blurb:
          'Maps, dashboards and story-led outputs that make analytical results legible to the people who have to act on them, and keep them current as data updates.',
        image: '/pillars/tech-analytics.webp',
        items: [
          'Interactive web maps',
          'Operational & executive dashboards',
          'Thematic & choropleth mapping',
          '3D and time-series visualisation',
          'Story maps & briefing packs',
          'Embedding in BI tools',
        ],
        details: [
          {
            name: 'Platforms',
            blurb: 'Delivered in the tools your organisation already uses.',
            items: [
              'ArcGIS Dashboards, Experience Builder and StoryMaps',
              'QGIS and open-source web mapping',
              'Power BI and Tableau with spatial layers',
              'Custom web visualisation where required',
            ],
          },
          {
            name: 'Design principles',
            blurb: 'Clarity before decoration.',
            items: [
              'Classification and colour chosen for the question',
              'Uncertainty and data gaps shown, not hidden',
              'Accessible colour palettes and labelling',
              'One page per decision, not one per dataset',
            ],
          },
        ],
      },
    ],
  },
  scenarios: {
    eyebrow: 'Your requirements',
    heading: 'From location questions to confident decisions',
    intro: 'Choose an area and a situation to see how we approach it and what you receive.',
    items: [],
    collections: [
      {
        name: 'Planning & Siting',
        items: [
          {
            title: 'Choosing sites with competing priorities',
            icon: Crosshair,
            situation:
              'A network expansion has dozens of candidate locations, and cost, access, demand and planning constraints all point in different directions.',
            actions: [
              'Agree criteria, exclusions and weights with decision owners',
              'Assemble and validate the input layers',
              'Build a transparent multi-criteria model',
              'Test sensitivity to alternative weightings',
              'Deliver ranked sites with evidence profiles',
            ],
            outcome:
              'A defensible shortlist, and a model that can be re-run when priorities or data change.',
          },
          {
            title: 'Proving where services are out of reach',
            icon: Network,
            situation:
              'A public or commercial service believes coverage is uneven, but cannot show who is underserved or where a new facility would help most.',
            actions: [
              'Model travel times on the real network',
              'Map catchments against population and demand',
              'Identify gaps against the service standard',
              'Test candidate locations with location-allocation',
            ],
            outcome:
              'Clear evidence of coverage gaps and the placements that close them most effectively.',
          },
        ],
      },
      {
        name: 'Insight & Forecasting',
        items: [
          {
            title: 'Patterns everyone suspects but nobody can prove',
            icon: TrendingUp,
            situation:
              'Incidents, faults or sales appear to cluster, but the evidence is anecdotal and resources are still spread evenly.',
            actions: [
              'Clean and geocode the event data',
              'Run hot spot and cluster statistics',
              'Test relationships with explanatory variables',
              'Map significance, not just density',
            ],
            outcome:
              'Statistically grounded hot spots that justify where to target resources.',
          },
          {
            title: 'Analysis that dies in a slide deck',
            icon: LayoutDashboard,
            situation:
              'Useful analysis was done once, presented, and never refreshed, so decisions drift back to intuition.',
            actions: [
              'Script the workflow so it can be re-run',
              'Connect it to the source data',
              'Publish results in a dashboard on a schedule',
              'Train the team to maintain it',
            ],
            outcome:
              'A living analytical product that stays current and keeps informing decisions.',
          },
        ],
      },
    ],
  },
  workflow: {
    heading: 'How an analysis runs',
    intro: 'Five stages. The first and the last matter most, and are the ones most often skipped.',
    steps: [
      { icon: Target, title: 'Frame', desc: 'Define the decision, the audience and what a useful answer looks like.' },
      { icon: Database, title: 'Prepare', desc: 'Source, clean and validate data, and document its limits.' },
      { icon: BarChart3, title: 'Analyse', desc: 'Apply and test the methods, with sensitivity and uncertainty checks.' },
      { icon: Eye, title: 'Communicate', desc: 'Maps, dashboards and briefings designed for the decision makers.' },
      { icon: RefreshCw, title: 'Operationalise', desc: 'Script, schedule and hand over so the analysis stays current.' },
    ],
  },
  engagement: {
    heading: 'Choose the right delivery model',
    intro: 'A focused study, an ongoing analytics service or analysts embedded in your team.',
    models: GEOSPATIAL_ENGAGEMENT,
  },
}

const enterpriseGisDataManagement: DeepDivePage = {
  slug: 'enterprise-gis-data-management',
  group: 'Geospatial & Mapping',
  navLabel: 'Enterprise GIS & Data Management',
  eyebrowIcon: Database,
  title: 'Enterprise GIS & Data Management',
  subtitle: 'One governed spatial record, shared across the whole organisation.',
  description:
    'We design, build and run the platforms and data practices behind organisation-wide GIS: enterprise architecture, spatial databases, data governance and the pipelines that connect GIS to the systems around it. The goal is a single trusted spatial record that scales across departments, users and years, rather than a collection of project files.',
  image: '/pillars/enterprise.webp',
  imageAlt: 'GIS team working with enterprise web maps and operational dashboards',
  copySide: 'left',
  techLayout: 'cards',
  positioning: [
    {
      icon: Layers,
      title: 'Architecture before applications',
      detail:
        'Platform, database and security decisions are made deliberately up front, because they determine what every map, app and integration can do later.',
    },
    {
      icon: ShieldCheck,
      title: 'Governed, not just stored',
      detail:
        'Ownership, standards, metadata and quality rules are defined for each dataset, so people know what to trust, who maintains it and how current it is.',
    },
    {
      icon: Plug,
      title: 'Connected to the business',
      detail:
        'GIS is integrated with asset, work, customer and planning systems, so location data is used where decisions are made rather than kept in a specialist silo.',
    },
  ],
  tech: {
    eyebrow: 'What we deliver',
    heading: 'The spatial backbone, layer by layer',
    intro:
      'Four practices that together produce an enterprise GIS: the platform, the data inside it, the rules that govern it and the pipelines that keep it connected.',
    groups: [
      {
        name: 'Enterprise GIS Architecture',
        icon: Server,
        blurb:
          'Platform design for GIS that serves the whole organisation: deployment model, security, performance and growth planned before anything is installed.',
        image: '/pillars/enterprise-architecture.webp',
        items: [
          'ArcGIS Enterprise & Online design',
          'Open-source GIS stacks (GeoServer, PostGIS)',
          'Cloud, on-premise & hybrid deployment',
          'High availability & disaster recovery',
          'Identity, SSO & role-based access',
          'Platform migration & modernisation',
        ],
        details: [
          {
            name: 'Design',
            blurb: 'An architecture sized to the organisation, not to a vendor reference diagram.',
            items: [
              'Current-state assessment of platforms, data and users',
              'Target architecture and deployment topology',
              'Security model aligned to corporate identity',
              'Roadmap with phased migration steps',
            ],
          },
          {
            name: 'Build and modernise',
            blurb: 'Implemented and proven before users depend on it.',
            items: [
              'Environment build across development, test and production',
              'Migration from legacy desktop and server estates',
              'Load and failover testing',
              'Runbooks and administration handover',
            ],
          },
        ],
      },
      {
        name: 'Spatial Databases & Data Management',
        icon: Database,
        blurb:
          'Enterprise geodatabases and spatial data stores designed for concurrent editing, reliable analysis and controlled growth over many years of data.',
        image: '/pillars/tech-datawarehouse.webp',
        items: [
          'Enterprise geodatabase design',
          'PostGIS, SQL Server & Oracle Spatial',
          'Data models & schema design',
          'Versioning & editing workflows',
          'Topology & network models',
          'Archiving & historical records',
        ],
        details: [
          {
            name: 'Data modelling',
            blurb: 'The schema that decides what the system can ever do.',
            items: [
              'Conceptual, logical and physical spatial models',
              'Industry models for utilities, transport and local government',
              'Relationship classes and linear referencing',
              'Schema change management',
            ],
          },
          {
            name: 'Operations',
            blurb: 'Keeping spatial databases fast, consistent and recoverable.',
            items: [
              'Index, statistics and compression maintenance',
              'Replication and distributed editing',
              'Backup, restore and point-in-time recovery',
              'Monitoring for growth and performance',
            ],
          },
        ],
      },
      {
        name: 'Data Governance & Quality',
        icon: ClipboardCheck,
        blurb:
          'The standards, ownership and quality controls that turn a data store into a trusted spatial record, with metadata that tells users what they are looking at.',
        image: '/pillars/governance.webp',
        items: [
          'Data ownership & stewardship models',
          'Spatial data standards',
          'Metadata & data catalogues',
          'Automated quality rules',
          'Data quality dashboards',
          'Audit trails & lineage',
        ],
        details: [
          {
            name: 'Governance framework',
            blurb: 'Clear accountability for every dataset that matters.',
            items: [
              'Dataset inventory and criticality ranking',
              'Owner, steward and custodian roles',
              'Standards for naming, projections and attribution',
              'Change control for authoritative datasets',
            ],
          },
          {
            name: 'Quality control',
            blurb: 'Quality measured continuously, not checked once at go-live.',
            items: [
              'Completeness, accuracy and consistency rules',
              'Attribute rules and validation on edit',
              'Scheduled quality reports per dataset',
              'Issue tracking and remediation workflows',
            ],
          },
        ],
      },
      {
        name: 'Spatial ETL & Integration',
        icon: Workflow,
        blurb:
          'Automated pipelines that move, transform and synchronise spatial data between GIS and the enterprise systems that depend on it.',
        image: '/pillars/geo_2.webp',
        items: [
          'FME & Python ETL pipelines',
          'ERP, EAM & CRM integration',
          'Work management & field systems',
          'IoT & sensor data ingestion',
          'Scheduled & event-driven sync',
          'APIs & feature services',
        ],
        details: [
          {
            name: 'Integration patterns',
            blurb: 'The right pattern for each connection, not one tool for everything.',
            items: [
              'Batch ETL for bulk and historical loads',
              'Near real-time sync for operational systems',
              'Service and API-based access for applications',
              'Master data alignment of asset identifiers',
            ],
          },
          {
            name: 'Reliability',
            blurb: 'Pipelines that tell you when they fail.',
            items: [
              'Validation gates before data is published',
              'Retry, rollback and error queues',
              'Run logs and alerting',
              'Documentation and support handover',
            ],
          },
        ],
      },
    ],
  },
  scenarios: {
    eyebrow: 'Your requirements',
    heading: 'From scattered GIS to a trusted spatial record',
    intro: 'Choose an area and a situation to see how we approach it and what changes.',
    items: [],
    collections: [
      {
        name: 'Platform',
        items: [
          {
            title: 'GIS spread across departments and file shares',
            icon: Layers,
            situation:
              'Every department runs its own GIS, copies of the same datasets disagree, and nobody can say which version is authoritative.',
            actions: [
              'Inventory platforms, datasets, users and dependencies',
              'Design a target enterprise architecture',
              'Consolidate authoritative datasets into governed stores',
              'Migrate users and applications in phases',
              'Set ownership and change control per dataset',
            ],
            outcome:
              'One platform and one authoritative version of each dataset, shared across the organisation.',
          },
          {
            title: 'A legacy platform nobody wants to upgrade',
            icon: ArrowUpCircle,
            situation:
              'The GIS estate is several versions behind, custom tools depend on it, and every upgrade attempt has been postponed for fear of breaking something.',
            actions: [
              'Assess dependencies, customisations and data risks',
              'Build and test the target environment in parallel',
              'Rehearse migration with production data',
              'Cut over with a tested rollback plan',
            ],
            outcome:
              'A supported, modern platform reached without losing data or breaking critical workflows.',
          },
        ],
      },
      {
        name: 'Data & Integration',
        items: [
          {
            title: 'Spatial data nobody fully trusts',
            icon: ClipboardCheck,
            situation:
              'Users find errors, duplicates and missing attributes, so they keep private copies and the central data is used less every year.',
            actions: [
              'Profile datasets for completeness and consistency',
              'Define quality rules and attribute validation',
              'Clean and reconcile priority datasets',
              'Publish quality dashboards and metadata',
            ],
            outcome:
              'Measurable data quality, visible to users, and a reason to stop keeping private copies.',
          },
          {
            title: 'GIS disconnected from asset and work systems',
            icon: Workflow,
            situation:
              'Asset records live in the EAM, work orders in another system and locations in GIS, with manual exports holding them together.',
            actions: [
              'Map identifiers and ownership across systems',
              'Design integration patterns per data flow',
              'Build monitored ETL and service integrations',
              'Retire manual exports once flows are proven',
            ],
            outcome:
              'Location, asset and work data synchronised automatically, with failures visible rather than silent.',
          },
        ],
      },
    ],
  },
  workflow: {
    heading: 'From assessment to operation',
    intro: 'A phased path that keeps existing users working while the enterprise platform is built.',
    steps: [
      { icon: FileSearch, title: 'Assess', desc: 'Review platforms, data, users, integrations and pain points.' },
      { icon: Layers, title: 'Design', desc: 'Target architecture, data models and governance framework.' },
      { icon: Wrench, title: 'Build', desc: 'Environments, databases, pipelines and applications implemented.' },
      { icon: GitMerge, title: 'Migrate', desc: 'Data and users moved in tested, reversible phases.' },
      { icon: LifeBuoy, title: 'Operate', desc: 'Administration, quality monitoring and ongoing support.' },
    ],
  },
  engagement: {
    heading: 'Choose the right delivery model',
    intro: 'A defined platform programme, a managed GIS service or specialists inside your team.',
    models: GEOSPATIAL_ENGAGEMENT,
  },
}

const geospatialDataCapture: DeepDivePage = {
  slug: 'geospatial-data-capture',
  group: 'Geospatial & Mapping',
  navLabel: 'Geospatial Data Capture',
  eyebrowIcon: Camera,
  title: 'Geospatial Data Capture',
  subtitle: 'Accurate spatial data, collected once and structured to be used.',
  description:
    'We capture geospatial data from the street, the field, the air and existing records, then clean, enrich and structure it to your schema. Mobile mapping, GNSS field surveys, digitisation of legacy maps and multi-source data enrichment are run as one workflow, so what arrives is analysis-ready rather than another raw collection to process.',
  image: '/pillars/geospatial.webp',
  imageAlt: 'Mobile mapping vehicles capturing street-level data with a field surveyor verifying on a tablet',
  copySide: 'left',
  techLayout: 'cards',
  positioning: [
    {
      icon: Compass,
      title: 'The right capture method',
      detail:
        'Mobile mapping, field survey, aerial capture or desktop digitisation are chosen by the accuracy and coverage the data has to meet, not by the equipment available.',
    },
    {
      icon: Database,
      title: 'Structured at source',
      detail:
        'Schemas, attribute rules and coding lists are agreed before capture starts, so data is collected in the shape it will be used in.',
    },
    {
      icon: FileCheck,
      title: 'Evidence with every feature',
      detail:
        'Photographs, coordinates, timestamps and source references travel with the data, so any record can be checked back to what was observed.',
    },
  ],
  tech: {
    eyebrow: 'How we capture',
    heading: 'From the street, the field and the archive',
    intro:
      'Four capture practices that feed one structured dataset, with quality control applied the same way whatever the source.',
    groups: [
      {
        name: 'Mobile Mapping & Street-Level Capture',
        icon: Car,
        blurb:
          'Vehicle-mounted cameras, 360° imagery and LiDAR driven to a coverage plan, capturing road corridors and streetscapes quickly and consistently.',
        image: '/pillars/collect.webp',
        items: [
          '360° panoramic imagery',
          'Mobile LiDAR capture',
          'GNSS/INS positioning',
          'Coverage planning & drive routing',
          'Road corridor & streetscape surveys',
          'Sign, asset & POI imagery',
        ],
        details: [
          {
            name: 'Capture operations',
            blurb: 'Planned and tracked so coverage is measured, not estimated.',
            items: [
              'Drive plans built from coverage targets',
              'Sensor calibration and daily system checks',
              'Live progress tracking against plan',
              'Re-drive management for gaps and quality failures',
            ],
          },
          {
            name: 'Processing',
            blurb: 'Raw sensor data turned into positioned, usable imagery and point clouds.',
            items: [
              'Trajectory and positional accuracy processing',
              'Image and point cloud registration',
              'Face and licence plate anonymisation',
              'Tiling and delivery in agreed formats',
            ],
          },
        ],
      },
      {
        name: 'Field Survey & Ground Truthing',
        icon: MapPin,
        blurb:
          'Survey crews with GNSS receivers and mobile apps capturing what vehicles and imagery cannot: attributes, access, condition and on-the-ground verification.',
        image: '/pillars/feild_verify.webp',
        items: [
          'High-accuracy GNSS & RTK survey',
          'Mobile data collection apps',
          'Asset condition inspection',
          'POI & address verification',
          'Utility & infrastructure surveys',
          'Photographic evidence capture',
        ],
        details: [
          {
            name: 'Survey methods',
            blurb: 'Accuracy matched to what the data will be used for.',
            items: [
              'RTK and network RTK for survey-grade positions',
              'Handheld GNSS for asset and POI capture',
              'Ground control for aerial and mobile mapping',
              'Measured offsets where signal is obstructed',
            ],
          },
          {
            name: 'Field workflow',
            blurb: 'Forms and rules that make good data the easy path.',
            items: [
              'Configured forms with mandatory fields and domains',
              'Photo and location required per feature',
              'Daily sync and supervisor review',
              'Return-visit tasks for incomplete records',
            ],
          },
        ],
      },
      {
        name: 'Digitisation & Legacy Data Conversion',
        icon: FileCode,
        blurb:
          'Paper maps, CAD drawings, scanned plans and old databases converted into georeferenced, attributed GIS data that fits the current schema.',
        image: '/pillars/poi.webp',
        items: [
          'Heads-up digitising from imagery',
          'Scanned map georeferencing',
          'CAD to GIS conversion',
          'As-built & record drawing capture',
          'Attribute extraction from documents',
          'Legacy database migration',
        ],
        details: [
          {
            name: 'Conversion',
            blurb: 'Historical records brought forward without losing their meaning.',
            items: [
              'Georeferencing with documented control and residuals',
              'Layer and symbology mapping from CAD standards',
              'Attribute population from drawings and registers',
              'Crosswalks from legacy codes to current domains',
            ],
          },
          {
            name: 'Assurance',
            blurb: 'Converted data checked against its source.',
            items: [
              'Sampled overlay comparison with source documents',
              'Topology and connectivity validation',
              'Completeness counts against record totals',
              'Exception lists for unresolved ambiguities',
            ],
          },
        ],
      },
      {
        name: 'Data Enrichment & Quality Control',
        icon: Sparkles,
        blurb:
          'Multi-source data cleaned, deduplicated, geocoded and enriched, then passed through quality gates before it is delivered as a structured dataset.',
        image: '/pillars/geo_4.webp',
        items: [
          'Geocoding & address standardisation',
          'Deduplication & entity matching',
          'Attribute enrichment from third-party sources',
          'Positional accuracy checks',
          'Completeness & consistency rules',
          'QA sampling & reporting',
        ],
        details: [
          {
            name: 'Enrichment',
            blurb: 'Adding the context raw capture lacks.',
            items: [
              'Matching records across sources to one entity',
              'Joining demographic, cadastral or business attributes',
              'Standardising names, categories and codes',
              'Recording source and confidence per attribute',
            ],
          },
          {
            name: 'Quality gates',
            blurb: 'Nothing is delivered that has not passed the agreed checks.',
            items: [
              'Automated schema and domain validation',
              'Positional checks against control data',
              'Statistical sampling with reviewer inspection',
              'Quality report issued with every delivery',
            ],
          },
        ],
      },
    ],
  },
  scenarios: {
    eyebrow: 'Your requirements',
    heading: 'From missing data to a usable dataset',
    intro: 'Choose an area and a situation to see how we approach it and what you receive.',
    items: [],
    collections: [
      {
        name: 'Field & Street Capture',
        items: [
          {
            title: 'No reliable data for a large area',
            icon: Car,
            situation:
              'A programme needs current street-level imagery and asset data across a region, and existing records are incomplete or years out of date.',
            actions: [
              'Define coverage, accuracy and the asset schema',
              'Plan and execute mobile mapping drives',
              'Process imagery, LiDAR and trajectories',
              'Extract and attribute features with QA',
              'Deliver structured layers with evidence links',
            ],
            outcome:
              'Complete, current coverage delivered as structured data rather than raw imagery.',
          },
          {
            title: 'Attributes only people on site can confirm',
            icon: MapPin,
            situation:
              'Imagery shows where assets are, but condition, access, ownership and markings can only be confirmed in person.',
            actions: [
              'Configure mobile forms to the data model',
              'Plan field routes by priority and geography',
              'Capture positions, attributes and photographs',
              'Review submissions daily and task return visits',
            ],
            outcome:
              'Field-verified attributes with photographic evidence, integrated directly into GIS.',
          },
        ],
      },
      {
        name: 'Records & Enrichment',
        items: [
          {
            title: 'Critical records locked in paper and CAD',
            icon: FileCode,
            situation:
              'Decades of network and property records exist only as drawings and scans, invisible to GIS users and impossible to analyse.',
            actions: [
              'Prioritise records by business value',
              'Georeference scans and convert CAD layers',
              'Populate attributes from drawings and registers',
              'Validate against source and flag ambiguities',
            ],
            outcome:
              'Historical records available as searchable, analysable GIS data.',
          },
          {
            title: 'Duplicate and inconsistent location data',
            icon: Sparkles,
            situation:
              'Several sources describe the same places differently, with duplicates, misspellings and inconsistent coordinates undermining every report.',
            actions: [
              'Standardise names, addresses and categories',
              'Match and merge records across sources',
              'Geocode and validate positions',
              'Deliver with source and confidence recorded',
            ],
            outcome:
              'One clean, deduplicated dataset with a clear record of where each value came from.',
          },
        ],
      },
    ],
  },
  workflow: {
    heading: 'How capture runs',
    intro: 'Quality is designed in at the start, not inspected in at the end.',
    steps: [
      { icon: FileSearch, title: 'Specify', desc: 'Schema, accuracy, coverage and evidence requirements agreed.' },
      { icon: Compass, title: 'Plan', desc: 'Capture methods, routes, crews and control selected per area.' },
      { icon: Camera, title: 'Capture', desc: 'Mobile, field, aerial or desktop collection with live tracking.' },
      { icon: Sparkles, title: 'Process & enrich', desc: 'Clean, structure, deduplicate and enrich to the schema.' },
      { icon: ShieldCheck, title: 'Validate & deliver', desc: 'Quality gates, sampling and delivery with a quality report.' },
    ],
  },
  engagement: {
    heading: 'Choose the right delivery model',
    intro: 'A defined capture project, a recurring collection programme or crews and editors in your team.',
    models: GEOSPATIAL_ENGAGEMENT,
  },
}

const remoteSensingEarthObservation: DeepDivePage = {
  slug: 'remote-sensing-earth-observation',
  group: 'Geospatial & Mapping',
  navLabel: 'Remote Sensing & Earth Observation',
  eyebrowIcon: Satellite,
  title: 'Remote Sensing & Earth Observation',
  subtitle: 'Satellite and aerial imagery turned into maps of what is changing.',
  description:
    'We process optical, multispectral, radar and aerial imagery into land cover maps, change detection, vegetation and environmental indicators, and elevation products. Machine learning classifies at scale, analysts validate against reference data, and results are delivered as GIS layers and monitoring dashboards that track change over time.',
  image: '/pillars/remotesensing.webp',
  imageAlt: 'Global earth observation coverage visualised over a dark map',
  copySide: 'left',
  techLayout: 'cards',
  positioning: [
    {
      icon: Globe,
      title: 'Coverage without field teams',
      detail:
        'Large and remote areas are monitored from orbit and the air, with ground effort reserved for validation and the places that genuinely need it.',
    },
    {
      icon: Layers,
      title: 'Sensor chosen for the question',
      detail:
        'Optical, multispectral, SAR and aerial sources each see different things. We select and combine them by what needs detecting, how often and in what weather.',
    },
    {
      icon: ShieldCheck,
      title: 'Validated classifications',
      detail:
        'Every classification is checked against reference data, with accuracy assessed per class, so results can be relied on for reporting and decisions.',
    },
  ],
  tech: {
    eyebrow: 'What we produce',
    heading: 'From pixels to monitored change',
    intro:
      'Four practices covering imagery processing, classification, change monitoring and terrain, delivered as GIS-ready layers and time series.',
    groups: [
      {
        name: 'Land Cover & Land Use Classification',
        icon: Shapes,
        blurb:
          'Machine learning and object-based classification that map what covers the land and how it is used, from regional overviews to parcel-level detail.',
        image: '/pillars/pixel.webp',
        items: [
          'Land use / land cover mapping',
          'Deep learning segmentation',
          'Built-up area & impervious surfaces',
          'Water body & wetland mapping',
          'Agricultural field & crop mapping',
          'Forest & tree canopy extent',
        ],
        details: [
          {
            name: 'Classification methods',
            blurb: 'Chosen by resolution, class scheme and available training data.',
            items: [
              'Random forest and gradient boosting on spectral features',
              'CNN-based semantic segmentation',
              'Object-based segmentation for high-resolution imagery',
              'Custom and standard class schemes',
            ],
          },
          {
            name: 'Validation',
            blurb: 'Accuracy measured, reported and improved.',
            items: [
              'Stratified reference sampling',
              'Confusion matrices and per-class accuracy',
              'Analyst review of low-confidence areas',
              'Iterative retraining on error hot spots',
            ],
          },
        ],
      },
      {
        name: 'Change Detection & Monitoring',
        icon: GitCompare,
        blurb:
          'Multi-date analysis that finds new construction, clearing, encroachment and damage, and time-series monitoring that tracks trends across seasons and years.',
        image: '/pillars/change_detection.webp',
        items: [
          'Time-series trend analysis',
          'Urban expansion monitoring',
          'Deforestation & clearing alerts',
          'Encroachment on corridors & assets',
          'Flood & disaster impact mapping',
          'Monitoring dashboards & alerts',
        ],
        details: [
          {
            name: 'Detection',
            blurb: 'Real change separated from seasonal, lighting and sensor differences.',
            items: [
              'Radiometric normalisation between dates',
              'Change vector and post-classification comparison',
              'Seasonal baseline modelling',
              'False-positive review by analysts',
            ],
          },
          {
            name: 'Monitoring service',
            blurb: 'Change delivered on a schedule, where the team will see it.',
            items: [
              'Recurring acquisition and processing cycles',
              'Prioritised change alerts with imagery clips',
              'Dashboards showing trends by area',
              'Integration with inspection and work systems',
            ],
          },
        ],
      },
      {
        name: 'Multispectral, SAR & Environmental Analysis',
        icon: Leaf,
        blurb:
          'Spectral indices, radar analysis and environmental indicators that reveal vegetation health, moisture, subsidence and conditions invisible in ordinary imagery.',
        image: '/pillars/smartremote.webp',
        items: [
          'Vegetation indices (NDVI, EVI, NDWI)',
          'Crop & vegetation health monitoring',
          'SAR all-weather analysis',
          'InSAR ground movement & subsidence',
          'Soil moisture & drought indicators',
          'Thermal & heat island analysis',
        ],
        details: [
          {
            name: 'Optical and spectral',
            blurb: 'Using the bands the eye cannot see.',
            items: [
              'Atmospheric correction and cloud masking',
              'Index calculation and seasonal compositing',
              'Anomaly detection against historical baselines',
              'Hyperspectral analysis where material discrimination is needed',
            ],
          },
          {
            name: 'Radar',
            blurb: 'Observation through cloud, at night and at millimetre sensitivity.',
            items: [
              'SAR backscatter analysis for flood and surface change',
              'InSAR deformation time series',
              'Coherence analysis for disturbance detection',
              'Fusion of radar with optical results',
            ],
          },
        ],
      },
      {
        name: 'Aerial Imagery & Elevation Products',
        icon: Mountain,
        blurb:
          'Orthorectified aerial and satellite mosaics, digital elevation models and derived terrain products that form the base layers other analysis depends on.',
        image: '/pillars/drone-lidar.webp',
        items: [
          'Orthorectification & mosaicking',
          'Digital elevation & surface models',
          'Photogrammetric 3D surfaces',
          'Contours, slope & aspect',
          'Watershed & flood modelling inputs',
          'Volumetric measurement',
        ],
        details: [
          {
            name: 'Imagery products',
            blurb: 'Seamless, accurate base imagery ready for mapping.',
            items: [
              'Sensor model and ground control orthorectification',
              'Seamline editing and radiometric balancing',
              'Positional accuracy checks against control',
              'Tiled and cloud-optimised outputs',
            ],
          },
          {
            name: 'Terrain products',
            blurb: 'Elevation models fit for engineering and hydrology.',
            items: [
              'DSM and DTM generation from stereo, LiDAR or SAR',
              'Breakline and hydro-enforcement',
              'Derived terrain analysis layers',
              'Vertical accuracy reporting',
            ],
          },
        ],
      },
    ],
  },
  scenarios: {
    eyebrow: 'Your requirements',
    heading: 'From imagery archives to monitored outcomes',
    intro: 'Choose an area and a situation to see how we approach it and what changes.',
    items: [],
    collections: [
      {
        name: 'Mapping & Classification',
        items: [
          {
            title: 'An out-of-date picture of a large region',
            icon: Globe,
            situation:
              'Planning and reporting depend on land cover data that is years old and too coarse for the decisions being made.',
            actions: [
              'Agree the class scheme and minimum mapping unit',
              'Select and pre-process suitable imagery',
              'Classify with machine learning and analyst review',
              'Assess accuracy against reference samples',
              'Deliver GIS layers with an accuracy report',
            ],
            outcome:
              'Current, validated land cover mapping at a resolution that fits the decision.',
          },
          {
            title: 'Base mapping for an area with no survey data',
            icon: Mountain,
            situation:
              'A project needs accurate imagery and elevation for a remote or fast-changing area where ground survey is slow or impractical.',
            actions: [
              'Source satellite or aerial stereo imagery',
              'Establish ground control where available',
              'Produce orthomosaics and elevation models',
              'Report positional and vertical accuracy',
            ],
            outcome:
              'Survey-grade base layers delivered without mobilising ground crews across the whole area.',
          },
        ],
      },
      {
        name: 'Monitoring & Environment',
        items: [
          {
            title: 'Encroachment found only after the damage',
            icon: GitCompare,
            situation:
              'Construction, clearing or vegetation growth near pipelines, power lines or protected land is discovered during infrequent inspections.',
            actions: [
              'Define corridors, buffers and change types',
              'Set up recurring multi-date change detection',
              'Review candidate changes to remove false alarms',
              'Send prioritised alerts with imagery evidence',
            ],
            outcome:
              'Encroachment detected between inspections, with field effort directed at confirmed changes.',
          },
          {
            title: 'Environmental reporting based on estimates',
            icon: Leaf,
            situation:
              'Vegetation, water or ground-movement indicators are reported from limited samples, and regulators are asking for broader evidence.',
            actions: [
              'Select spectral, radar or InSAR methods',
              'Build historical baselines from archive imagery',
              'Produce indicators and trends by reporting area',
              'Document methods for audit and review',
            ],
            outcome:
              'Area-wide, repeatable environmental indicators that stand up to regulatory scrutiny.',
          },
        ],
      },
    ],
  },
  workflow: {
    heading: 'How an earth observation project runs',
    intro: 'The same five stages for a one-off map or a recurring monitoring service.',
    steps: [
      { icon: Target, title: 'Define', desc: 'Questions, classes, area, frequency and accuracy targets agreed.' },
      { icon: Satellite, title: 'Acquire', desc: 'Imagery sourced by sensor, resolution, date and cloud cover.' },
      { icon: Layers, title: 'Process', desc: 'Correction, orthorectification, compositing and analysis-ready data.' },
      { icon: Shapes, title: 'Analyse', desc: 'Classification, change detection and indicators with analyst review.' },
      { icon: ShieldCheck, title: 'Validate & deliver', desc: 'Accuracy assessment, GIS layers, dashboards and alerts.' },
    ],
  },
  engagement: {
    heading: 'Choose the right delivery model',
    intro: 'A defined mapping project, a recurring monitoring service or analysts inside your team.',
    models: GEOSPATIAL_ENGAGEMENT,
  },
}

/** Deep-dive pages under Geospatial & Mapping. Order matches the header menu. */
export const geospatialPages: DeepDivePage[] = [
  navigationData,
  spatialAnalysis,
  enterpriseGisDataManagement,
  remoteSensingEarthObservation,
  geospatialDataCapture,
]

/* ------------------------------------------------------------------ lidar & 3d intelligence */

/**
 * The LiDAR & 3D Intelligence deep dives.
 *
 * These replaced /services/geospatial/aerial-surveys and /services/geospatial/digital-twins,
 * which used the older sub-service layout and claimed figures ("up to 80% faster", "downtime
 * reduced by 35%") nobody could source. The old URLs 301 here.
 *
 * The digital twin page is about reality-based 3D: cities, corridors, terrain and sites. The
 * building-level BIM work stays on BIM & Digital Twin Engineering, and the two cross-refer.
 */
const aerialDroneLidarMapping: DeepDivePage = {
  slug: 'aerial-drone-lidar-mapping',
  group: 'LiDAR & 3D Intelligence',
  navLabel: 'Aerial & Drone LiDAR Mapping',
  eyebrowIcon: Plane,
  title: 'Aerial & Drone LiDAR Mapping',
  subtitle: 'Survey-grade 3D data captured from above, where ground crews are slow or unsafe.',
  description:
    'We plan and fly drone and airborne LiDAR and photogrammetry missions, then process the capture into classified point clouds, orthomosaics, terrain models and engineering-ready measurements. LiDAR sees through vegetation to the ground beneath, so corridors, mines, forests and construction sites are mapped accurately without putting people in hazardous terrain.',
  image: '/pillars/ariel_lidar.webp',
  imageAlt: 'Survey drone with LiDAR payload ready for take-off at a remote site',
  copySide: 'left',
  techLayout: 'cards',
  positioning: [
    {
      icon: Crosshair,
      title: 'Accuracy planned before take-off',
      detail:
        'Flight altitude, overlap, point density and ground control are designed from the accuracy the deliverable needs, and checked against independent control afterwards.',
    },
    {
      icon: Trees,
      title: 'Ground truth beneath the canopy',
      detail:
        'LiDAR pulses reach the ground through gaps in vegetation, producing bare-earth terrain models where photogrammetry alone only sees the treetops.',
    },
    {
      icon: ShieldCheck,
      title: 'Safe, compliant operations',
      detail:
        'Licensed pilots, airspace permissions, risk assessments and site inductions come as standard, so capture happens without putting crews on steep, live or unstable ground.',
    },
  ],
  tech: {
    eyebrow: 'What we deliver',
    heading: 'From flight plan to engineering deliverable',
    intro:
      'Four practices that take a site from mission planning through processing to the terrain, imagery and inspection outputs engineers and planners use.',
    groups: [
      {
        name: 'Drone & Airborne Capture',
        icon: Plane,
        blurb:
          'Multi-rotor, fixed-wing and manned airborne platforms carrying LiDAR, RGB and multispectral sensors, flown to a mission plan built around the site and the specification.',
        image: '/pillars/basemap.webp',
        items: [
          'Drone LiDAR survey',
          'Fixed-wing & VTOL corridor mapping',
          'Manned airborne LiDAR for large areas',
          'RGB, oblique & multispectral imagery',
          'RTK/PPK GNSS positioning',
          'Airspace permissions & risk assessment',
        ],
        details: [
          {
            name: 'Mission planning',
            blurb: 'The platform and flight pattern chosen by site size, terrain and accuracy target.',
            items: [
              'Point density and ground sample distance targets',
              'Altitude, speed, overlap and scan angle design',
              'Terrain-following flights for steep or variable ground',
              'Weather, airspace and access constraints',
            ],
          },
          {
            name: 'Field operations',
            blurb: 'Capture that is right first time, verified before crews leave site.',
            items: [
              'Pre-flight sensor and boresight calibration checks',
              'Survey-grade ground control and independent check points',
              'On-site coverage and data integrity review',
              'Licensed pilots working to documented safety procedures',
            ],
          },
        ],
      },
      {
        name: 'Point Cloud Processing & Classification',
        icon: Layers,
        blurb:
          'Raw trajectories and scans processed into georeferenced, classified point clouds, strip-adjusted and checked for accuracy before any product is derived.',
        image: '/pillars/feature_extraction.webp',
        items: [
          'Trajectory & GNSS/IMU processing',
          'Strip alignment & boresight calibration',
          'Ground & non-ground classification',
          'ASPRS LAS class codes',
          'Vegetation, building & wire classes',
          'Accuracy reports against control',
        ],
        details: [
          {
            name: 'Processing',
            blurb: 'Geometric quality established before classification begins.',
            items: [
              'Trajectory processing against base stations or CORS',
              'Flight line matching and systematic error correction',
              'Datum and projection transformation to project grids',
              'Tiling and indexing for large projects',
            ],
          },
          {
            name: 'Classification',
            blurb: 'Automated routines refined by analysts where it matters.',
            items: [
              'Automated ground and vegetation classification',
              'Manual editing around structures and break lines',
              'Power line, tower and pole classification',
              'Delivery in LAS/LAZ, E57 or project formats',
            ],
          },
        ],
      },
      {
        name: 'Terrain, Topographic & Volumetric Products',
        icon: Mountain,
        blurb:
          'Digital terrain and surface models, contours, orthomosaics and volume calculations derived from the classified point cloud, ready for design and quantity reporting.',
        image: '/pillars/point_cloud.webp',
        items: [
          'Digital terrain models (DTM)',
          'Digital surface models (DSM)',
          'Contours & breaklines',
          'True orthomosaics',
          'Stockpile & earthworks volumes',
          'CAD & GIS topographic plans',
        ],
        details: [
          {
            name: 'Terrain modelling',
            blurb: 'Bare-earth surfaces fit for engineering design.',
            items: [
              'Gridded and TIN terrain models',
              'Breakline extraction for kerbs, banks and edges',
              'Hydro-flattening and hydro-enforcement',
              'Vertical accuracy assessment by land cover type',
            ],
          },
          {
            name: 'Measurement and plans',
            blurb: 'Quantities and drawings, not just surfaces.',
            items: [
              'Repeat-survey volume comparison',
              'Earthworks progress and cut-fill reporting',
              'Topographic plans to client CAD standards',
              'Orthomosaics aligned to terrain and control',
            ],
          },
        ],
      },
      {
        name: 'Corridor & Infrastructure Inspection',
        icon: Zap,
        blurb:
          'Power lines, pipelines, rail, roads and structures surveyed from the air, with clearances, encroachment and condition measured directly from the scan.',
        image: '/pillars/lidar_engineering.webp',
        items: [
          'Power line & transmission corridors',
          'Conductor clearance & sag',
          'Vegetation encroachment',
          'Bridge, tower & structure inspection',
          'Mine & quarry surveys',
          'Construction progress monitoring',
        ],
        details: [
          {
            name: 'Corridor analysis',
            blurb: 'Risk located and quantified along the whole corridor.',
            items: [
              'Clearance to ground, vegetation and structures',
              'Encroachment zones against agreed standards',
              'Tower, pole and asset positioning',
              'Prioritised findings with imagery evidence',
            ],
          },
          {
            name: 'Site monitoring',
            blurb: 'Repeat flights that show what changed.',
            items: [
              'Scheduled capture on construction and mining sites',
              'Progress against design surfaces',
              'Slope stability and ground movement indicators',
              'Canopy height, density and tree inventory',
            ],
          },
        ],
      },
    ],
  },
  scenarios: {
    eyebrow: 'Your requirements',
    heading: 'From difficult sites to accurate data',
    intro: 'Choose an area and a situation to see how we approach it and what you receive.',
    items: [],
    collections: [
      {
        name: 'Survey & Terrain',
        items: [
          {
            title: 'A topographic survey through dense vegetation',
            icon: Trees,
            situation:
              'Design needs an accurate ground surface across a wooded or overgrown site, and ground survey would take weeks while photogrammetry only captures the canopy.',
            actions: [
              'Plan a drone LiDAR mission for ground penetration density',
              'Establish ground control and independent check points',
              'Classify ground returns and add breaklines',
              'Generate the DTM, contours and topographic plan',
              'Report vertical accuracy against check points',
            ],
            outcome:
              'A bare-earth terrain model under the canopy, delivered faster and without cutting survey lines.',
          },
          {
            title: 'Volumes that need to stand up to audit',
            icon: Mountain,
            situation:
              'Stockpile and earthworks quantities are disputed because they come from infrequent, sampled ground measurements.',
            actions: [
              'Fly repeat surveys on an agreed schedule',
              'Model surfaces against a fixed base or design',
              'Calculate volumes and cut-fill by area',
              'Issue reports with method and accuracy stated',
            ],
            outcome:
              'Repeatable, fully measured volumes that contractors and clients can agree on.',
          },
        ],
      },
      {
        name: 'Corridors & Assets',
        items: [
          {
            title: 'Vegetation risk along a long power corridor',
            icon: Zap,
            situation:
              'Hundreds of kilometres of line are inspected on foot or by patrol, and clearance problems are found late and inconsistently.',
            actions: [
              'Capture the corridor with airborne or drone LiDAR',
              'Classify conductors, structures and vegetation',
              'Measure clearance against the applicable standard',
              'Rank encroachments by severity and location',
            ],
            outcome:
              'A measured, prioritised vegetation programme covering the whole corridor.',
          },
          {
            title: 'Inspecting structures without working at height',
            icon: ShieldCheck,
            situation:
              'Towers, bridges and slopes need condition and geometry data, but access requires closures, rope teams or scaffolding.',
            actions: [
              'Plan close-range drone LiDAR and imagery capture',
              'Model the structure in 3D',
              'Measure geometry, deformation and defects',
              'Deliver findings with imagery and model views',
            ],
            outcome:
              'Inspection evidence gathered safely and quickly, with a 3D record for comparison next time.',
          },
        ],
      },
    ],
  },
  workflow: {
    heading: 'How an aerial survey runs',
    intro: 'Accuracy is designed at the planning stage and proven at the end.',
    steps: [
      { icon: FileSearch, title: 'Scope', desc: 'Site, deliverables, accuracy targets and coordinate system agreed.' },
      { icon: Compass, title: 'Plan', desc: 'Platform, flight design, control, permissions and risk assessment.' },
      { icon: Plane, title: 'Capture', desc: 'Missions flown with on-site coverage and data integrity checks.' },
      { icon: Layers, title: 'Process', desc: 'Trajectories, alignment, classification and derived products.' },
      { icon: ShieldCheck, title: 'Validate & deliver', desc: 'Accuracy reported against check points, delivered in your formats.' },
    ],
  },
  engagement: {
    heading: 'Choose the right delivery model',
    intro: 'A single site survey, a recurring monitoring programme or processing support for your own capture.',
    models: [
      { name: 'Survey project', icon: Wrench, detail: 'A defined site or corridor captured, processed and delivered to an agreed specification and accuracy.' },
      { name: 'Monitoring programme', icon: RefreshCw, detail: 'Repeat capture on a schedule for construction, mining, vegetation or asset change, with comparison built in.' },
      { name: 'Processing services', icon: Layers, detail: 'Your raw drone or airborne data processed, classified and turned into deliverables by our analysts.' },
    ],
  },
}

const modellingDigitalTwins: DeepDivePage = {
  slug: '3d-modelling-digital-twins',
  group: 'LiDAR & 3D Intelligence',
  navLabel: '3D Modelling & Digital Twins',
  eyebrowIcon: Box,
  title: '3D Modelling & Digital Twins',
  subtitle: 'Cities, corridors and sites modelled from reality, and kept connected to it.',
  description:
    'We turn LiDAR, photogrammetry and existing data into accurate 3D models of cities, infrastructure corridors and sites, then connect them to live operational data to form digital twins. From reality meshes and semantic city models to streaming 3D platforms and simulation, the result is a spatial model teams can plan, monitor and make decisions in.',
  image: '/pillars/digitaltwin_lidar.webp',
  imageAlt: 'City-scale 3D model with buildings and infrastructure in their geographic context',
  copySide: 'left',
  techLayout: 'cards',
  positioning: [
    {
      icon: Scan,
      title: 'Built from measured reality',
      detail:
        'Models start from LiDAR and photogrammetry with stated accuracy, not from assumptions, so what you see in 3D matches what exists on the ground.',
    },
    {
      icon: Boxes,
      title: 'Semantic, not just visual',
      detail:
        'Buildings, roads, terrain and assets are modelled as identifiable objects with attributes, so the model can be queried and analysed rather than only looked at.',
    },
    {
      icon: Activity,
      title: 'Connected to operations',
      detail:
        'Sensor feeds, asset records and work systems are linked to the model, turning a static 3D scene into a twin that reflects current conditions.',
    },
  ],
  tech: {
    eyebrow: 'What we build',
    heading: 'From reality capture to a living model',
    intro:
      'Four practices that build and operate a digital twin, from the 3D geometry to the platform, the live data and the analysis on top. Building-level BIM is covered on BIM & Digital Twin Engineering.',
    groups: [
      {
        name: 'Reality Capture & 3D Reconstruction',
        icon: Scan,
        blurb:
          'Photorealistic meshes and accurate 3D reconstructions generated from aerial, drone, mobile and terrestrial capture, registered to real-world coordinates.',
        image: '/pillars/bim-scan-hero.webp',
        items: [
          'Photogrammetric reality meshes',
          'LiDAR-derived 3D models',
          'Terrestrial & mobile scan registration',
          'Textured mesh generation',
          'Georeferencing to survey control',
          'Level-of-detail generation',
        ],
        details: [
          {
            name: 'Reconstruction',
            blurb: 'Geometry and texture built from the best available capture.',
            items: [
              'Aerial triangulation and dense matching',
              'Fusion of LiDAR geometry with imagery texture',
              'Registration of multiple scan campaigns',
              'Accuracy checks against independent control',
            ],
          },
          {
            name: 'Optimisation',
            blurb: 'Models that stay usable at city scale.',
            items: [
              'Mesh decimation and hole filling',
              'Tiling and hierarchical levels of detail',
              'Texture atlasing and compression',
              'Streaming-ready outputs for web and mobile',
            ],
          },
        ],
      },
      {
        name: 'City, Corridor & Site 3D Models',
        icon: Building2,
        blurb:
          'Semantic 3D models of buildings, roads, terrain, vegetation and infrastructure, structured to open standards so they can be analysed, exchanged and maintained.',
        image: '/pillars/digital-twin-new.webp',
        items: [
          'CityGML & CityJSON models',
          'Building models LOD1 to LOD3',
          '3D road & rail corridors',
          'Terrain & vegetation models',
          'Underground utilities in 3D',
          'IFC & BIM model integration',
        ],
        details: [
          {
            name: 'Semantic modelling',
            blurb: 'Every object identifiable, classified and attributed.',
            items: [
              'Building extrusion and roof reconstruction from LiDAR',
              'Level of detail agreed per use case',
              'Attributes for height, use, age and ownership',
              'Consistent identifiers linked to GIS and asset systems',
            ],
          },
          {
            name: 'Integration',
            blurb: 'One coordinate space for above and below ground, outdoors and in.',
            items: [
              'BIM models placed in geographic context',
              'Subsurface utilities from records and survey',
              'Conversion between CityGML, IFC, FBX and 3D Tiles',
              'Update workflows as new capture arrives',
            ],
          },
        ],
      },
      {
        name: 'Digital Twin Platforms & Live Data',
        icon: MonitorSmartphone,
        blurb:
          'Web platforms that stream the 3D model and combine it with sensor, asset and operational data, giving teams one current view of the place they manage.',
        image: '/pillars/twinning.webp',
        items: [
          'Cesium, ArcGIS & Unreal-based platforms',
          '3D Tiles & I3S streaming',
          'IoT & sensor data integration',
          'Asset & work management links',
          'Real-time status dashboards',
          'Web, mobile & immersive viewing',
        ],
        details: [
          {
            name: 'Platform',
            blurb: 'Chosen by scale, users and the systems it must connect to.',
            items: [
              'Browser-based 3D streaming for large models',
              'Desktop and immersive clients where needed',
              'Single sign-on and project permissions',
              'Hosted, cloud or on-premise deployment',
            ],
          },
          {
            name: 'Live data',
            blurb: 'Operational information placed where it happens.',
            items: [
              'Sensor and telemetry feeds via APIs and message queues',
              'Asset, maintenance and work order records',
              'Time-series playback of conditions and events',
              'Threshold alerts shown in spatial context',
            ],
          },
        ],
      },
      {
        name: 'Simulation & Scenario Analysis',
        icon: Sparkles,
        blurb:
          'Analysis run inside the 3D model to test decisions before they are made: visibility, shadow, flood, capacity and development scenarios compared side by side.',
        image: '/pillars/decisions.webp',
        items: [
          'Viewshed & line-of-sight analysis',
          'Shadow & solar exposure studies',
          'Flood & inundation scenarios',
          'Urban development massing',
          'Clearance & conflict detection',
          'Before & after comparison',
        ],
        details: [
          {
            name: 'Analysis',
            blurb: 'Spatial questions answered in three dimensions.',
            items: [
              'Visibility for planning, security and telecom siting',
              'Solar potential and overshadowing assessment',
              'Flood extent against terrain and building models',
              'Clash detection between proposed and existing assets',
            ],
          },
          {
            name: 'Communication',
            blurb: 'Scenarios decision makers and the public can understand.',
            items: [
              'Side-by-side option comparison',
              'Fly-throughs and shareable scenes',
              'Consultation-ready visual packages',
              'Documented assumptions for each scenario',
            ],
          },
        ],
      },
    ],
  },
  scenarios: {
    eyebrow: 'Your requirements',
    heading: 'From 3D ambition to working twins',
    intro: 'Choose an area and a situation to see how we approach it and what changes.',
    items: [],
    collections: [
      {
        name: '3D Models',
        items: [
          {
            title: 'A city model that is only a pretty picture',
            icon: Building2,
            situation:
              'A photorealistic mesh exists, but planners cannot select a building, query its height or run analysis because nothing in it is an object.',
            actions: [
              'Agree the object classes and level of detail needed',
              'Extract buildings, roofs and terrain from LiDAR',
              'Attribute objects and link identifiers to GIS',
              'Publish semantic and mesh layers together',
              'Set up an update route for new capture',
            ],
            outcome:
              'A 3D city model that looks right and can be queried, analysed and maintained.',
          },
          {
            title: 'Planning decisions made on 2D drawings',
            icon: Sparkles,
            situation:
              'Development and infrastructure proposals are assessed on plans and elevations, and visual, shadow and flood impacts are argued rather than shown.',
            actions: [
              'Build the surrounding context in 3D',
              'Insert proposal massing or BIM models',
              'Run viewshed, shadow and flood scenarios',
              'Package comparisons for review and consultation',
            ],
            outcome:
              'Impacts shown clearly in 3D, and decisions reached with less dispute.',
          },
        ],
      },
      {
        name: 'Digital Twins',
        items: [
          {
            title: 'Operational data scattered across systems',
            icon: Activity,
            situation:
              'Sensors, asset records and work orders each live in separate tools, and nobody can see what is happening across a site or network in one place.',
            actions: [
              'Build or reuse a 3D model of the site or network',
              'Map sensors and assets to model objects',
              'Integrate live feeds and records via APIs',
              'Configure dashboards, alerts and playback',
            ],
            outcome:
              'One spatial view of current conditions, with issues seen in context as they happen.',
          },
          {
            title: 'A digital twin pilot that never scaled',
            icon: RefreshCw,
            situation:
              'A proof of concept impressed, but it was built by hand, cannot be updated, and stalled when asked to cover more assets or areas.',
            actions: [
              'Assess the model, data links and platform choices',
              'Automate model generation from capture',
              'Move to streaming formats and scalable hosting',
              'Define update cycles and data ownership',
            ],
            outcome:
              'A twin that grows across sites and stays current without rebuilding it each time.',
          },
        ],
      },
    ],
  },
  workflow: {
    heading: 'How a digital twin is built',
    intro: 'Start from the decisions the twin must support, then build only as much model as they need.',
    steps: [
      { icon: Target, title: 'Define', desc: 'Use cases, users, level of detail and the data the twin must hold.' },
      { icon: Scan, title: 'Capture', desc: 'LiDAR, photogrammetry and existing records gathered and registered.' },
      { icon: Box, title: 'Model', desc: 'Meshes and semantic 3D objects built, attributed and optimised.' },
      { icon: Plug, title: 'Connect', desc: 'Platform deployed and live sensor, asset and work data integrated.' },
      { icon: RefreshCw, title: 'Operate', desc: 'Update cycles, analysis and support as the place changes.' },
    ],
  },
  engagement: {
    heading: 'Choose the right delivery model',
    intro: 'A defined 3D model, a managed digital twin service or specialists working with your team.',
    models: [
      { name: '3D modelling project', icon: Box, detail: 'A city, corridor or site model delivered to an agreed level of detail, accuracy and format.' },
      { name: 'Managed digital twin', icon: MonitorSmartphone, detail: 'Platform hosting, live data integration and model updates run as an ongoing service.' },
      { name: 'Specialist capacity', icon: Users, detail: '3D modellers, GIS developers and data engineers working inside your programme.' },
    ],
  },
}

/** Deep-dive pages under LiDAR & 3D Intelligence. */
export const lidarPages: DeepDivePage[] = [aerialDroneLidarMapping, modellingDigitalTwins]

/** Short editorial introductions; the original scope and workflows remain available. */
const serviceOverviews: Record<string, { description: string; items: string[] }> = {
  'arcgis-solution-development': {
    description: 'Configured ArcGIS apps and custom extensions built around your users, data and operational workflows.',
    items: ['Experience Builder & Dashboards', 'Web and mobile applications', 'Custom widgets & Maps SDK', 'ArcPy & geoprocessing', 'Workflow automation', 'Legacy application migration'],
  },
  'esri-platform-support': {
    description: 'Administration, upgrades and performance support for secure, dependable ArcGIS Enterprise and Online environments.',
    items: ['Enterprise & Online administration', 'Service publishing & access control', 'Version upgrades & migration', 'Performance tuning', 'Backup & recovery', 'Licensing & platform health'],
  },
  'geodatabase-data-modelling': {
    description: 'Spatial schemas and network models designed for consistent editing, reliable analysis and controlled data growth.',
    items: ['Enterprise geodatabase design', 'Versioning & editing workflows', 'Domains & attribute rules', 'Topology & data validation', 'Utility & network models', 'Spatial database performance'],
  },
  'arcgis-field-operations': {
    description: 'Field capture connected to your office data, with forms, offline maps and synchronisation tested for real conditions.',
    items: ['Field Maps', 'Survey123 & smart forms', 'QuickCapture', 'Offline areas & sync', 'Location tracking & tasking', 'Field-to-office quality checks'],
  },
  'application-support': {
    description: 'One support service for desktop GIS, spatial databases, web viewers and the scripts that connect them.',
    items: ['ArcGIS & QGIS applications', 'GeoServer & web viewers', 'PostGIS & spatial databases', 'FME & Python pipelines', 'Incident diagnosis & fixes', 'Runbooks & ongoing maintenance'],
  },
  'scan-to-bim': {
    description: 'Survey and point clouds converted into coordinated architectural, structural and MEP models, with agreed detail and measured accuracy.',
    items: ['Capture & scan registration', 'Point cloud processing', 'Revit & Bentley modelling', 'Agreed LOD & tolerances', 'Model federation & clash review', 'IFC, COBie & as-built deliverables'],
  },
  'bim-gis-integration': {
    description: 'Building models placed in their wider spatial context, with coordinates, formats and asset identifiers aligned across BIM and GIS.',
    items: ['Coordinate & datum alignment', 'IFC and GIS transformation', 'ArcGIS GeoBIM & 3D scenes', 'Indoor & infrastructure context', 'Asset ID reconciliation', 'Model updates & governance'],
  },
  'digital-twin-asset-information': {
    description: 'Models connected to structured asset records, documents and live information to support maintenance and operational decisions.',
    items: ['Asset information requirements', 'Registers & classification', 'Model-to-asset connections', 'Telemetry & operational data', 'Twin platforms & visualisation', 'Handover validation & updates'],
  },
}

/** Keep the original layout and full source coverage, with a concise first read. */
function consolidate(
  slug: string,
  title: string,
  subtitle: string,
  description: string,
  sources: DeepDivePage[],
): DeepDivePage {
  const primary = sources[0]
  return {
    ...primary,
    slug,
    group: 'Spatial Applications & Engineering',
    navLabel: title,
    title,
    subtitle,
    description,
    positioning: slug === 'esri-gis-application-development' ? [
      { icon: Code, title: 'Build around the workflow', detail: 'Configure where the platform fits; develop supported extensions where the task needs more.' },
      { icon: Database, title: 'Connect office and field', detail: 'Align data models, applications and capture workflows across the GIS estate.' },
      { icon: LifeBuoy, title: 'Support through operation', detail: 'Keep platforms secure, applications maintained and users supported after launch.' },
    ] : slug === 'bim-digital-twin-engineering' ? [
      { icon: Scan, title: 'Start with measured reality', detail: 'Agree capture accuracy, model detail and acceptance criteria before modelling begins.' },
      { icon: Layers, title: 'Coordinate BIM and GIS', detail: 'Bring models, coordinates and asset identifiers into one consistent spatial context.' },
      { icon: RefreshCw, title: 'Plan for the asset lifecycle', detail: 'Structure information for handover, maintenance and continuing updates.' },
    ] : [
      { icon: Plug, title: 'Connect the operating systems', detail: 'Link spatial data to the enterprise applications and teams that need it.' },
      { icon: ShieldCheck, title: 'Define the data contract', detail: 'Make schemas, authentication, ownership and failure handling explicit.' },
      { icon: Activity, title: 'Keep the interfaces running', detail: 'Monitor data flow and provide tested retry, recovery and support procedures.' },
    ],
    tech: sources.length === 1 ? {
      ...primary.tech,
      intro: 'APIs, data pipelines, enterprise interfaces and the controls that keep them reliable.',
      groups: primary.tech.groups.map((group) => ({
        ...group,
        items: group.items.slice(0, 6),
        details: [{ name: group.name, blurb: group.blurb, items: group.items }],
      })),
    } : {
      eyebrow: 'Technical capabilities',
      heading: 'What we deliver',
      intro: 'Explore each service area, with full platform and delivery details available when you need them.',
      groups: sources.map((source) => ({
        name: source.title,
        icon: source.eyebrowIcon,
        blurb: serviceOverviews[source.slug].description,
        image: source.image,
        items: serviceOverviews[source.slug].items,
        details: [
          ...source.tech.groups.map(({ name, blurb, items }) => ({ name, blurb, items })),
          { name: source.workflow.heading, blurb: source.workflow.intro, items: source.workflow.steps.map((step) => `${step.title}: ${step.desc}`) },
        ],
      })),
    },
    scenarios: {
      eyebrow: 'Your requirements',
      heading: 'From technical challenges to working systems',
      intro: 'Choose a service area and situation to see our approach and the expected outcome.',
      items: sources.flatMap((source) => source.scenarios.items),
      collections: sources.map((source) => ({ name: source.title, items: source.scenarios.items })),
    },
    workflow: sources.length === 1 ? primary.workflow : {
      heading: 'From requirements to operation',
      intro: 'A shared delivery process across applications, information models and connected systems.',
      steps: [
        { icon: FileSearch, title: 'Discover', desc: 'Review requirements, existing systems, source data and acceptance criteria.' },
        { icon: Layers, title: 'Design', desc: 'Agree the architecture, information models, interfaces and delivery scope.' },
        { icon: Wrench, title: 'Implement', desc: 'Build, configure and connect the solution against the agreed design.' },
        { icon: ShieldCheck, title: 'Validate', desc: 'Check data quality, system behaviour and user workflows against acceptance criteria.' },
        { icon: RefreshCw, title: 'Operate', desc: 'Hand over documentation and training, with ongoing support where agreed.' },
      ],
    },
    engagement: {
      heading: 'Choose the right delivery model',
      intro: 'A defined project, ongoing support or specialist capacity within your team.',
      models: [
        { name: 'Project delivery', icon: Wrench, detail: 'An agreed scope, clear deliverables and acceptance criteria, from design through handover.' },
        { name: 'Managed support', icon: LifeBuoy, detail: 'Ongoing maintenance and improvement with agreed priorities, response targets and escalation paths.' },
        { name: 'Specialist capacity', icon: Users, detail: 'Embedded engineers or blocks of hours for specific technical needs and changing workloads.' },
      ],
    },
  }
}

export const spatialApplicationPages: DeepDivePage[] = [
  consolidate(
    'esri-gis-application-development',
    'Esri & GIS Application Development',
    'GIS Applications, ArcGIS Platforms and Field Workflows',
    'We develop and support GIS applications across web, desktop and mobile environments. ArcGIS solution development, platform support, geodatabase modelling and field operations come together in one service, from initial design through day-to-day operation.',
    [arcgisSolutionDevelopment, esriPlatformSupport, geodatabaseDataModelling, arcgisFieldOperations, applicationSupport],
  ),
  consolidate(
    'bim-digital-twin-engineering',
    'BIM & Digital Twin Engineering',
    'From Surveyed Reality to Connected Asset Information',
    'We turn surveyed assets into coordinated BIM models, connect them to GIS and build the information foundation for digital twins. Scan-to-BIM, spatial coordination and asset information are delivered as one engineering workflow.',
    [scanToBim, bimGisIntegration, digitalTwinAssetInformation],
  ),
  consolidate(
    'spatial-apis-systems-integration',
    'Spatial APIs & Systems Integration',
    'Connect Spatial Data to the Systems Your Teams Use',
    'We connect GIS, enterprise applications and operational platforms through spatial APIs, data pipelines and managed interfaces. From authentication and schema mapping to monitoring and recovery, integrations are designed to work reliably in production.',
    [integrationServices],
  ),
  lidarApplicationDevelopment,
]

export const consolidatedCapabilityRedirects = [
  ...[applicationSupport, esriPlatformSupport, arcgisSolutionDevelopment, geodatabaseDataModelling, arcgisFieldOperations]
    .map((page) => ({ from: page.slug, to: spatialApplicationPages[0].slug })),
  ...[scanToBim, bimGisIntegration, digitalTwinAssetInformation]
    .map((page) => ({ from: page.slug, to: spatialApplicationPages[1].slug })),
  { from: integrationServices.slug, to: spatialApplicationPages[2].slug },
]

/** Deep-dive pages under Visual & AI-Assisted Data Annotation. */
export const annotationPages: DeepDivePage[] = [annotationSegmentation]

export const deepDivePages: DeepDivePage[] = [...spatialApplicationPages, ...annotationPages, ...geospatialPages, ...lidarPages, dataCenterBuild]

export const deepDiveBySlug = (slug?: string) => deepDivePages.find((page) => page.slug === slug)
