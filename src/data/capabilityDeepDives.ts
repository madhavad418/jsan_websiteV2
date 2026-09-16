import {
  Activity,
  AlertTriangle,
  ArrowUpCircle,
  Boxes,
  ClipboardCheck,
  Code,
  Database,
  FileCheck,
  FileCode,
  FileSearch,
  Gauge,
  GitMerge,
  Globe,
  Key,
  Layers,
  LifeBuoy,
  Link2,
  Map,
  MonitorSmartphone,
  Network,
  Plug,
  RefreshCw,
  Ruler,
  Scan,
  Server,
  ShieldCheck,
  Smartphone,
  Target,
  Terminal,
  Timer,
  Users,
  Wrench,
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
  | 'Technology Support'
  | 'BIM Capabilities'
  | 'Esri Capabilities'
  | 'Data Center & IT Infrastructure'

/** Menu group, used for the eyebrow and the sibling strip at the foot of each page. */
export const groupLabel: Record<DeepDiveGroup, string> = {
  'Technology Support': 'Technology Support',
  'BIM Capabilities': 'BIM Capabilities',
  'Esri Capabilities': 'Esri Capabilities',
  'Data Center & IT Infrastructure': 'Data Center & IT Infrastructure',
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
  imagePosition?: string
  /** Three claims under the hero. Positioning, not statistics. */
  positioning: { icon: LucideIcon; title: string; detail: string }[]
  tech: { eyebrow: string; heading: string; intro: string; groups: TechGroup[] }
  scenarios: { eyebrow: string; heading: string; intro: string; items: Scenario[] }
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

export const deepDivePages: DeepDivePage[] = [
  // Technology Support
  applicationSupport,
  integrationServices,
  // BIM Capabilities
  scanToBim,
  bimGisIntegration,
  digitalTwinAssetInformation,
  // Esri Capabilities
  esriPlatformSupport,
  arcgisSolutionDevelopment,
  geodatabaseDataModelling,
  arcgisFieldOperations,
  // Data Center & IT Infrastructure
  dataCenterBuild,
]

export const deepDiveBySlug = (slug?: string) => deepDivePages.find((page) => page.slug === slug)
