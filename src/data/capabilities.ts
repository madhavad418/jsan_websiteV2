import type { ElementType } from 'react'
import type { LucideIcon } from 'lucide-react'
import {
  Activity,
  AlertTriangle,
  Antenna,
  BarChart3,
  Boxes,
  Camera,
  CheckCircle,
  ClipboardCheck,
  ClipboardList,
  Compass,
  Cpu,
  Database,
  Eye,
  FileCheck,
  FileSearch,
  Gauge,
  GitMerge,
  Globe,
  HardHat,
  Layers,
  LineChart,
  Map,
  MapPin,
  Network,
  Radio,
  RefreshCw,
  Route,
  Scan,
  ShieldCheck,
  Signal,
  Target,
  Timer,
  TrendingUp,
  Truck,
  Type,
  Users,
  Workflow,
  Wrench,
  Zap,
} from 'lucide-react'

/**
 * Capability detail pages.
 *
 * The header's Capabilities menu lists the full JSAN operating model, but a number of
 * those lines had no page of their own and rendered as dead text. Each entry here gives
 * one of them a real page at /capabilities/<slug>, driven by CapabilityDetail.tsx.
 *
 * `group` must match the group name used in the header navigation  it drives the
 * breadcrumb and the "more from this group" strip at the foot of every page.
 */
export interface Capability {
  slug: string
  /** Parent group in the Capabilities menu */
  group: string
  /** Short eyebrow label, uppercase */
  category: string
  /** Mark shown beside the eyebrow in the hero */
  icon: LucideIcon
  title: string
  subtitle: string
  description: string
  bgImage: string
  /** Headline capabilities, shown with icons in the overview band */
  highlights: { icon: ElementType; text: string }[]
  /** How the work runs, start to finish */
  approach: { title: string; detail: string }[]
  /** Tangible outputs of an engagement */
  deliverables: string[]
  /** Who the service is built for */
  idealFor: string[]
  /** Why it matters commercially */
  outcomes: string[]
}

export const capabilities: Capability[] = [
  /* ---------------- Geospatial & Mapping ---------------- */
  {
    slug: 'road-network-geometry',
    group: 'Geospatial & Mapping',
    category: 'ROAD NETWORK & GEOMETRY',
    icon: Route,
    title: 'Road Network & Geometry',
    subtitle: 'Routable Centrelines, Connectivity and Attribution Built for Navigation',
    description:
      'We build and maintain the road network layer that navigation, logistics and mobility platforms route on centreline geometry, junction modelling, connectivity and the attribution that makes a network usable rather than merely drawn. Networks are compiled from street-level imagery, LiDAR, probe traces, authoritative records and our own field crews, then reconciled into one topologically clean model against your schema.',
    bgImage: '/pillars/road.png',
    highlights: [
      { icon: Route, text: 'Centreline geometry, alignment and junction modelling' },
      { icon: GitMerge, text: 'Connectivity, turn restrictions, one-ways and grade separation' },
      { icon: Layers, text: 'Functional class, lane counts, speed categories and access rules' },
      { icon: Map, text: 'Compiled from imagery, LiDAR, probe data and field verification' },
      { icon: ShieldCheck, text: 'Topology validation  dangles, connectivity and geometry checks' },
    ],
    approach: [
      {
        title: 'Specification & schema alignment',
        detail:
          'We start from your data model  feature classes, attribute domains, accuracy tolerances and capture rules  so the network we deliver drops straight into your production environment.',
      },
      {
        title: 'Multi-source compilation',
        detail:
          'Imagery, LiDAR point clouds, probe traces and authoritative datasets are conflated into a single network, with source precedence rules resolving conflicts predictably.',
      },
      {
        title: 'Attribution & connectivity build',
        detail:
          'Analysts encode restrictions, directionality, classification and lane-level attributes, then model junctions and grade separations so routing behaves correctly on the ground.',
      },
      {
        title: 'Topology QA & change management',
        detail:
          'Automated topology rules plus human review clear geometry and connectivity defects, and scheduled refresh cycles keep the network current as the road estate changes.',
      },
    ],
    deliverables: [
      'Routable road centreline network',
      'Turn restrictions & directionality',
      'Functional class & speed attribution',
      'Junction and grade-separation modelling',
      'Topology & accuracy QA reports',
      'Scheduled change / update packages',
    ],
    idealFor: [
      'Map & navigation providers',
      'Autonomous & ADAS programs',
      'Logistics & fleet platforms',
      'Transport authorities',
      'Smart-city programs',
    ],
    outcomes: [
      'Routing that reflects real-world driveability',
      'Fewer downstream corrections in navigation products',
      'A single, topologically clean network model',
      'Attribution consistent across regions and sources',
      'Traceable lineage from source to delivered feature',
    ],
  },
  {
    slug: 'field-verification',
    group: 'Geospatial & Mapping',
    category: 'FIELD VERIFICATION',
    icon: MapPin,
    title: 'Field Verification',
    subtitle: 'Ground Truth, Captured On Site and Backed by Evidence',
    description:
      'Desk research and imagery take data most of the way; field verification closes the gap. Our crews confirm what is actually on the ground  an asset, an access point, a business, a restriction  and return GPS-stamped, photo-backed evidence against a structured checklist, so your dataset carries proof rather than assumption.',
    bgImage: '/pillars/feild_verify.png',
    highlights: [
      { icon: MapPin, text: 'On-site confirmation of features, assets, POI and access' },
      { icon: Camera, text: 'GPS and time-stamped photographic evidence per record' },
      { icon: ClipboardCheck, text: 'Structured checklists and controlled capture forms' },
      { icon: Globe, text: 'Trained local crews with local-language capability' },
      { icon: RefreshCw, text: 'Exception handling, re-visits and change reporting' },
    ],
    approach: [
      {
        title: 'Survey design',
        detail:
          'We convert your specification into a field checklist  the attributes to confirm, the evidence required, the tolerance for each measurement and the rules for ambiguous cases.',
      },
      {
        title: 'Crew mobilisation',
        detail:
          'Trained and briefed crews are deployed against a planned route and coverage target, equipped with calibrated capture apps and offline-capable tooling.',
      },
      {
        title: 'Capture & evidence',
        detail:
          'Every record is confirmed on site with location, timestamp and imagery attached, so each change stays auditable long after the visit.',
      },
      {
        title: 'Review & reconciliation',
        detail:
          'Office reviewers adjudicate exceptions, reconcile findings against the source dataset and issue a verified delta with its supporting evidence.',
      },
    ],
    deliverables: [
      'Verified feature / attribute dataset',
      'Geo-tagged photographic evidence',
      'Field observation & exception log',
      'Change delta against source data',
      'Coverage and completion reporting',
      'Re-visit records where required',
    ],
    idealFor: [
      'Map & location-data providers',
      'Utilities & telecom operators',
      'Government mapping programs',
      'Retail & FMCG location teams',
      'Infrastructure asset owners',
    ],
    outcomes: [
      'Confidence that data reflects present-day reality',
      'Evidence you can defend in audit or dispute',
      'Reduced correction cycles downstream',
      'Local coverage without standing up your own crews',
      'A repeatable, specification-driven verification loop',
    ],
  },

  /* ---------------- Global Fleet & Field Operations ---------------- */
  {
    slug: 'planning-dispatch',
    group: 'Global Fleet & Field Operations',
    category: 'PLANNING & DISPATCH',
    icon: Compass,
    title: 'Planning & Dispatch',
    subtitle: 'Coverage Plans, Drive Schedules and Live Tasking for Collection Fleets',
    description:
      'Getting a fleet to the right places, in the right order, at the right time is the difference between a collection program that hits its coverage targets and one that burns fuel. We plan coverage, build drive and task schedules, dispatch crews daily, and re-plan around weather, access restrictions, equipment failures and re-drives.',
    bgImage: '/pillars/globalfleet.png',
    highlights: [
      { icon: Compass, text: 'Coverage design and route sequencing against target geographies' },
      { icon: Timer, text: 'Shift, roster and drive-window scheduling' },
      { icon: Radio, text: 'Daily tasking, live dispatch and crew communication' },
      { icon: RefreshCw, text: 'Re-drive planning for gaps, failures and quality rejects' },
      { icon: BarChart3, text: 'Progress tracking against coverage and productivity targets' },
    ],
    approach: [
      {
        title: 'Coverage modelling',
        detail:
          'Target areas are decomposed into drivable units with priority, access constraints and expected effort, giving a plan that is realistic before a vehicle moves.',
      },
      {
        title: 'Schedule construction',
        detail:
          'Routes, shifts and crew rosters are built around daylight windows, traffic patterns, permits and local restrictions.',
      },
      {
        title: 'Daily dispatch',
        detail:
          'Crews receive tasking with clear priorities and capture rules, while controllers monitor progress and reassign work as conditions change.',
      },
      {
        title: 'Re-plan & close-out',
        detail:
          'Gaps, rejects and failed runs feed straight back into the plan as re-drives, so coverage closes rather than drifting.',
      },
    ],
    deliverables: [
      'Coverage plan & priority model',
      'Route and drive schedules',
      'Crew rosters & shift plans',
      'Daily dispatch and tasking records',
      'Re-drive and exception register',
      'Coverage / productivity dashboards',
    ],
    idealFor: [
      'Map & imagery collection programs',
      'Autonomous mobility data teams',
      'Survey & inspection operations',
      'Telecom & utility field programs',
      'Large-area asset capture projects',
    ],
    outcomes: [
      'Coverage targets met without over-driving',
      'Crew time spent on productive capture, not travel',
      'Fast recovery from weather, access and equipment disruption',
      'Clear daily visibility of programme progress',
      'Predictable cost per unit of coverage',
    ],
  },
  {
    slug: 'safety-compliance',
    group: 'Global Fleet & Field Operations',
    category: 'SAFETY & COMPLIANCE',
    icon: HardHat,
    title: 'Safety & Compliance',
    subtitle: 'Safe Crews, Compliant Vehicles, Defensible Records',
    description:
      'Field programs run across jurisdictions, each with its own rules on driving, data capture, privacy and site access. We operate the safety and compliance layer around a collection or field program  driver standards, vehicle checks, permits, privacy handling and incident management  so operations stay lawful, insurable and auditable wherever they run.',
    bgImage: '/pillars/safety.png',
    highlights: [
      { icon: HardHat, text: 'Driver induction, safety briefing and competency records' },
      { icon: Truck, text: 'Vehicle inspection, maintenance and roadworthiness checks' },
      { icon: FileCheck, text: 'Permits, local authority notifications and site access' },
      { icon: ShieldCheck, text: 'Privacy-safe capture  face and plate blurring workflows' },
      { icon: AlertTriangle, text: 'Incident reporting, escalation and corrective action' },
    ],
    approach: [
      {
        title: 'Jurisdictional review',
        detail:
          'Before mobilisation we map the driving, capture, privacy and access rules applying to each operating area and build them into the operating procedure.',
      },
      {
        title: 'Standards & induction',
        detail:
          'Crews are inducted against a written safety standard, with competency, licensing and briefing records held per person.',
      },
      {
        title: 'Daily controls',
        detail:
          'Pre-drive vehicle checks, fatigue and shift limits, and capture rules are enforced as routine controls rather than paperwork completed after the fact.',
      },
      {
        title: 'Incident & assurance',
        detail:
          'Incidents and near-misses are logged, investigated and closed with corrective actions, and periodic audits confirm the controls are still being followed.',
      },
    ],
    deliverables: [
      'Operating safety standard & procedures',
      'Crew induction & competency records',
      'Vehicle inspection and maintenance logs',
      'Permit and notification register',
      'Privacy / blurring compliance workflow',
      'Incident, near-miss and CAPA reports',
    ],
    idealFor: [
      'Global collection programs',
      'Multi-country field operations',
      'Utility & telecom field crews',
      'Survey and inspection contractors',
      'Programs with strict privacy obligations',
    ],
    outcomes: [
      'Lower operational and reputational risk',
      'Fewer stoppages from permit or compliance failures',
      'An evidence trail for insurers, clients and regulators',
      'Consistent standards across every operating country',
      'A safety culture crews actually follow',
    ],
  },

  /* ---------------- GeoAI & Data Operations ---------------- */
  {
    slug: 'lidar-feature-extraction',
    group: 'GeoAI & Data Operations',
    category: 'LIDAR FEATURE EXTRACTION',
    icon: Scan,
    title: 'LiDAR Feature Extraction',
    subtitle: 'From Raw Point Cloud to Classified, Usable Geospatial Features',
    description:
      'A point cloud on its own is a measurement, not an asset register. We classify and extract the features our clients actually work with  poles, conductors, signs, kerbs, road edges, vegetation, building footprints and terrain  combining automated classification with trained human extraction and review, delivered in the CAD and GIS formats your engineering teams already use.',
    bgImage: '/pillars/feature_extraction.png',
    highlights: [
      { icon: Scan, text: 'Point-cloud classification  ground, vegetation, structures, assets' },
      { icon: Layers, text: 'Feature extraction  poles, wires, signs, kerbs and road edges' },
      { icon: Boxes, text: 'DTM / DSM generation and break-line capture' },
      { icon: Cpu, text: 'Automated classification with human extraction and review' },
      { icon: Database, text: 'Delivery in LAS/LAZ, CAD and GIS formats to your schema' },
    ],
    approach: [
      {
        title: 'Data assessment',
        detail:
          'Incoming aerial, mobile or terrestrial scans are checked for density, coverage, noise and control before extraction begins.',
      },
      {
        title: 'Classification',
        detail:
          'Automated routines separate ground, vegetation, structures and assets, tuned to your capture environment rather than applied blindly.',
      },
      {
        title: 'Feature extraction',
        detail:
          'Trained operators extract and attribute the features in scope, working to a documented capture specification and accuracy tolerance.',
      },
      {
        title: 'QA & delivery',
        detail:
          'Extraction is sampled, reviewed and reconciled against the cloud, then packaged in the formats and coordinate systems your downstream teams need.',
      },
    ],
    deliverables: [
      'Classified point cloud (LAS / LAZ)',
      'Extracted asset & feature layers',
      'DTM / DSM and contour products',
      'Attributed CAD / GIS deliverables',
      'Accuracy and QA documentation',
      'Extraction specification & lineage',
    ],
    idealFor: [
      'Utility & telecom network owners',
      'Transport and highways authorities',
      'HD-map and autonomy programs',
      'Engineering and survey firms',
      'Digital-twin initiatives',
    ],
    outcomes: [
      'Survey-grade features instead of raw measurements',
      'Engineering-ready inputs for design and analysis',
      'Consistent classification across large corridors',
      'Reduced manual effort inside your own teams',
      'Reusable data across multiple downstream use cases',
    ],
  },
  {
    slug: 'ocr-sign-intelligence',
    group: 'GeoAI & Data Operations',
    category: 'OCR & SIGN INTELLIGENCE',
    icon: Type,
    title: 'OCR & Sign Intelligence',
    subtitle: 'Reading the Street  Signs, Text and Numbers Turned Into Map Attributes',
    description:
      'Street-level imagery is full of information that only becomes useful once it is read, classified and located. We detect and interpret traffic signs, regulatory text, house numbers, business fascia and roadside text across languages and scripts, then turn each reading into a positioned, attributed map feature with the source image retained as evidence.',
    bgImage: '/pillars/ocr.png',
    highlights: [
      { icon: Type, text: 'Multilingual OCR across scripts and roadside text' },
      { icon: Signal, text: 'Traffic and regulatory sign detection and classification' },
      { icon: MapPin, text: 'House numbers, fascia names and address evidence' },
      { icon: Eye, text: 'Model-assisted detection with human reading and adjudication' },
      { icon: Database, text: 'Positioned, attributed features with source-image references' },
    ],
    approach: [
      {
        title: 'Ontology definition',
        detail:
          'Sign classes, text categories and attribute rules are agreed up front, including how to treat damaged, obscured or ambiguous instances.',
      },
      {
        title: 'Detection',
        detail:
          'Computer-vision models locate candidate signs and text in the imagery stream, with confidence scoring driving what goes to human review.',
      },
      {
        title: 'Reading & attribution',
        detail:
          'Operators read, classify and attribute each detection  including local-language content  and position it against the road network.',
      },
      {
        title: 'QA & feedback',
        detail:
          'Sampled review and gold-set comparison confirm accuracy, and corrections are fed back as training data to improve subsequent runs.',
      },
    ],
    deliverables: [
      'Detected & classified sign inventory',
      'OCR text extractions with confidence scores',
      'House-number and fascia evidence records',
      'Positioned map features to your schema',
      'Source imagery references per feature',
      'Accuracy / gold-set QA reporting',
    ],
    idealFor: [
      'Map & navigation providers',
      'ADAS and autonomy programs',
      'Highways and transport authorities',
      'Address and POI data teams',
      'Computer-vision / ML teams',
    ],
    outcomes: [
      'Regulatory content captured as structured attributes',
      'Address and POI evidence sourced from the street itself',
      'Multilingual coverage without a separate vendor per market',
      'Training data that improves your own models',
      'Every reading traceable back to its image',
    ],
  },
  {
    slug: 'human-in-the-loop-qa',
    group: 'GeoAI & Data Operations',
    category: 'HUMAN-IN-THE-LOOP QA',
    icon: Users,
    title: 'Human-in-the-Loop QA',
    subtitle: 'Trained Reviewers Where Automation Stops Being Reliable',
    description:
      'Models are fast and confident, including when they are wrong. We provide the human review layer around automated pipelines  sampling model output, adjudicating low-confidence and edge cases, maintaining gold sets and feeding corrections back as training data  so accuracy is measured and improving rather than assumed.',
    bgImage: '/pillars/quality.png',
    highlights: [
      { icon: Users, text: 'Trained, calibrated reviewers with documented decision rules' },
      { icon: Target, text: 'Confidence-based routing of edge cases to human review' },
      { icon: CheckCircle, text: 'Gold sets, consensus review and inter-reviewer agreement' },
      { icon: RefreshCw, text: 'Correction loops that feed model retraining' },
      { icon: BarChart3, text: 'Measured accuracy reporting per class and per batch' },
    ],
    approach: [
      {
        title: 'Rule definition & calibration',
        detail:
          'Ambiguity rules are written down and reviewers are calibrated against a gold set before production work starts, so decisions stay consistent between people.',
      },
      {
        title: 'Routing',
        detail:
          'Model confidence, class risk and sampling policy determine what a human sees, so review effort goes where it changes the outcome.',
      },
      {
        title: 'Adjudication',
        detail:
          'Reviewers correct, confirm or escalate. Disputed cases go to consensus review and become new precedent in the rule set.',
      },
      {
        title: 'Feedback & measurement',
        detail:
          'Corrections are packaged as training data and accuracy is reported per class and batch, so model performance is tracked over time.',
      },
    ],
    deliverables: [
      'Reviewed & corrected output datasets',
      'Gold sets and consensus records',
      'Reviewer calibration & agreement metrics',
      'Documented ambiguity / decision rules',
      'Training-data packages for retraining',
      'Per-class accuracy reporting',
    ],
    idealFor: [
      'Computer-vision & ML teams',
      'GeoAI and mapping pipelines',
      'Autonomy and ADAS data programs',
      'Content and data platform operators',
      'Automated pipelines with accuracy SLAs',
    ],
    outcomes: [
      'Accuracy that is measured, not estimated',
      'Edge cases handled instead of silently accepted',
      'Models that improve from production feedback',
      'Consistent decisions across reviewers and batches',
      'Human effort concentrated where risk is highest',
    ],
  },
  {
    slug: 'data-validation',
    group: 'GeoAI & Data Operations',
    category: 'DATA VALIDATION',
    icon: FileSearch,
    title: 'Data Validation',
    subtitle: 'Schema, Topology and Truth  Checked Before It Reaches Production',
    description:
      'Validation is what stands between a delivery and a production incident. We build and run validation regimes for geospatial and enterprise datasets  schema and domain conformance, topology and geometry rules, completeness, cross-source comparison and statistical outlier detection  and issue an acceptance report that says plainly what passed, what failed and what was fixed.',
    bgImage: '/pillars/data_validate.png',
    highlights: [
      { icon: FileSearch, text: 'Schema, domain and attribute-completeness conformance' },
      { icon: Network, text: 'Topology, geometry and connectivity rule checks' },
      { icon: GitMerge, text: 'Cross-source and reference-data comparison' },
      { icon: Gauge, text: 'Statistical profiling and outlier detection' },
      { icon: ClipboardList, text: 'Acceptance reporting with pass / fail evidence' },
    ],
    approach: [
      {
        title: 'Rule authoring',
        detail:
          'Your specification is translated into executable validation rules  hard failures, soft warnings and tolerances  agreed with your data owners before the first run.',
      },
      {
        title: 'Automated validation',
        detail:
          'Batches run through the rule set on ingest, producing a defect list with location, rule reference and severity rather than a single pass/fail flag.',
      },
      {
        title: 'Triage & correction',
        detail:
          'Defects are triaged by severity, corrected at source where possible, and re-run until the batch clears the agreed acceptance threshold.',
      },
      {
        title: 'Acceptance & trend reporting',
        detail:
          'Each delivery ships with an acceptance report, and recurring defect patterns are tracked so upstream causes get fixed rather than symptoms patched.',
      },
    ],
    deliverables: [
      'Executable validation rule set',
      'Defect list with severity and location',
      'Cross-source comparison results',
      'Data-profiling and outlier reports',
      'Delivery acceptance certificates',
      'Recurring-defect trend analysis',
    ],
    idealFor: [
      'Map & location-data providers',
      'Utilities and telecom data owners',
      'Government data programs',
      'Enterprise data & analytics teams',
      'Teams accepting third-party data deliveries',
    ],
    outcomes: [
      'Bad data caught before it reaches production',
      'Objective, evidence-backed delivery acceptance',
      'Upstream causes fixed, not repeatedly patched',
      'A consistent quality bar across vendors and batches',
      'Fewer incidents and rollbacks downstream',
    ],
  },

  /* ---------------- Telecom & Infrastructure ---------------- */
  {
    slug: '5g-small-cells',
    group: 'Telecom & Infrastructure',
    category: '5G & SMALL CELLS',
    icon: Antenna,
    title: '5G & Small Cells',
    subtitle: 'Site Candidacy, Street Furniture and the Geospatial Layer Behind Densification',
    description:
      'Small-cell densification is won or lost on site data. We provide the geospatial groundwork behind 5G rollout  candidate identification on poles, streetlights and rooftops, line-of-sight and clutter analysis, structural and power context, and the permitting datasets local authorities require  so RF and deployment teams work from verified sites rather than desktop guesses.',
    bgImage: '/pillars/5g.png',
    highlights: [
      { icon: Antenna, text: 'Candidate site identification on poles, lighting and rooftops' },
      { icon: Eye, text: 'Line-of-sight, clutter and obstruction analysis' },
      { icon: Zap, text: 'Power, backhaul and structural context per candidate' },
      { icon: MapPin, text: 'Field validation and photographic site packs' },
      { icon: FileCheck, text: 'Permitting and authority submission datasets' },
    ],
    approach: [
      {
        title: 'Search-ring analysis',
        detail:
          'Working from RF search rings, we shortlist physically viable host structures using imagery, LiDAR, asset records and street-furniture inventories.',
      },
      {
        title: 'Desktop qualification',
        detail:
          'Each candidate is tested for line of sight, clutter, height, ownership, power proximity and backhaul availability before anyone is sent to site.',
      },
      {
        title: 'Field validation',
        detail:
          'Crews confirm the shortlist on the ground and return a photographic site pack with measurements, access notes and constraints.',
      },
      {
        title: 'Permitting support',
        detail:
          'Validated sites are packaged into the datasets and drawings local authorities need, keeping applications moving instead of stalling on incomplete evidence.',
      },
    ],
    deliverables: [
      'Qualified candidate site register',
      'Line-of-sight & clutter analysis outputs',
      'Photographic field site packs',
      'Power and backhaul context per site',
      'Authority permitting datasets',
      'GIS layers integrated to your network model',
    ],
    idealFor: [
      'Mobile network operators',
      'Neutral-host and tower companies',
      'Telecom engineering firms',
      'Municipal smart-infrastructure teams',
      'Small-cell deployment programs',
    ],
    outcomes: [
      'Fewer wasted site visits and rejected candidates',
      'Faster progression from search ring to build',
      'Permitting packs that clear first time more often',
      'Street furniture assessed as a reusable asset base',
      'Deployment decisions grounded in verified site data',
    ],
  },
  {
    slug: 'lidar-engineering',
    group: 'Telecom & Infrastructure',
    category: 'LIDAR ENGINEERING',
    icon: Activity,
    title: 'LiDAR Engineering',
    subtitle: 'Engineering Answers Derived From Aerial, Mobile and Terrestrial Scans',
    description:
      'Beyond capture and classification sits the engineering question: will it clear, will it hold, where does it conflict? We turn LiDAR into engineering deliverables for utility and telecom corridors  pole loading inputs, conductor clearance and sag analysis, vegetation encroachment, corridor models and make-ready assessments  in the formats design teams and regulators expect.',
    bgImage: '/pillars/lidar_engineering.png',
    highlights: [
      { icon: Activity, text: 'Conductor clearance, sag and thermal-condition analysis' },
      { icon: Wrench, text: 'Pole loading and make-ready engineering inputs' },
      { icon: Layers, text: 'Vegetation encroachment and corridor risk modelling' },
      { icon: Scan, text: 'Aerial, mobile and terrestrial scan integration' },
      { icon: ShieldCheck, text: 'Deliverables aligned to engineering and regulatory standards' },
    ],
    approach: [
      {
        title: 'Scope & standards',
        detail:
          'We agree the clearance standards, loading assumptions and reporting formats that apply to the corridor before any analysis begins.',
      },
      {
        title: 'Model build',
        detail:
          'Classified scan data is turned into an engineering model of the corridor  structures, attachments, conductors, terrain and vegetation.',
      },
      {
        title: 'Analysis',
        detail:
          'Clearance, sag, loading and encroachment are analysed against the agreed standards, with violations located and quantified rather than merely flagged.',
      },
      {
        title: 'Reporting & handover',
        detail:
          'Findings are packaged as prioritised remediation lists and engineering deliverables that design, vegetation and field teams can act on directly.',
      },
    ],
    deliverables: [
      'Corridor engineering model',
      'Clearance and sag analysis reports',
      'Pole loading / make-ready inputs',
      'Vegetation encroachment register',
      'Prioritised remediation lists',
      'CAD / GIS engineering deliverables',
    ],
    idealFor: [
      'Electric utilities & transmission owners',
      'Telecom and fibre network operators',
      'Pole attachment and make-ready programs',
      'Vegetation management teams',
      'Engineering consultancies',
    ],
    outcomes: [
      'Compliance violations found before they become incidents',
      'Make-ready scoped from measured reality',
      'Vegetation spend targeted at genuine risk',
      'Design teams working from an accurate corridor model',
      'Defensible evidence for regulatory reporting',
    ],
  },
  {
    slug: 'as-built-validation',
    group: 'Telecom & Infrastructure',
    category: 'AS-BUILT VALIDATION',
    icon: ClipboardCheck,
    title: 'As-Built Validation',
    subtitle: 'Closing the Gap Between What Was Designed and What Was Built',
    description:
      'Networks are rarely built exactly as drawn, and the difference quietly corrupts every system that depends on the records. We validate constructed infrastructure against design  capturing what exists in the field, reconciling contractor redlines, resolving discrepancies and updating the GIS  so as-built records can be trusted for operations, maintenance and future design.',
    bgImage: '/pillars/asbuilt.png',
    highlights: [
      { icon: ClipboardCheck, text: 'Field capture of constructed assets and routes' },
      { icon: GitMerge, text: 'Reconciliation of design, redlines and field evidence' },
      { icon: AlertTriangle, text: 'Discrepancy identification, classification and escalation' },
      { icon: Database, text: 'GIS and asset-record updating to your data model' },
      { icon: FileCheck, text: 'Auditable close-out documentation per build' },
    ],
    approach: [
      {
        title: 'Baseline assembly',
        detail:
          'Design packs, permits and contractor redlines are assembled into a single baseline of what the build was supposed to be.',
      },
      {
        title: 'Field capture',
        detail:
          'Crews record the constructed asset  route, structures, counts, attributes and connectivity  with location and photographic evidence.',
      },
      {
        title: 'Reconciliation',
        detail:
          'Field evidence is compared against the baseline, and differences are classified as acceptable variation, record error or construction defect and routed accordingly.',
      },
      {
        title: 'Record update & close-out',
        detail:
          'The GIS and asset records are updated to reflect reality, and each build closes out with documentation that stands up to audit and payment review.',
      },
    ],
    deliverables: [
      'Validated as-built GIS records',
      'Design vs as-built discrepancy report',
      'Field evidence and photo documentation',
      'Redline reconciliation records',
      'Asset attribute and connectivity updates',
      'Build close-out documentation pack',
    ],
    idealFor: [
      'Fibre and telecom build programs',
      'Electric, gas and water utilities',
      'Infrastructure contractors and owners',
      'Municipal and public works programs',
      'Asset management teams',
    ],
    outcomes: [
      'Records that match the network in the ground',
      'Fewer costly surprises during maintenance and future builds',
      'Contractor payment and claims supported by evidence',
      'Reliable inputs for capacity and design planning',
      'A clean asset base for downstream operations',
    ],
  },
  {
    slug: 'utilities-mapping',
    group: 'Telecom & Infrastructure',
    category: 'UTILITIES MAPPING',
    icon: Network,
    title: 'Utilities Mapping',
    subtitle: 'Electric, Gas, Water and Telecom Networks Modelled as Connected Assets',
    description:
      'We map and model utility networks  capturing and digitising assets, converting legacy records, aligning networks to an accurate landbase and building the connectivity model that makes a network analysable rather than merely drawable. The result is an asset base your operations, planning and outage systems can rely on.',
    bgImage: '/pillars/utility.png',
    highlights: [
      { icon: Network, text: 'Connectivity and network-model construction' },
      { icon: Layers, text: 'Electric, gas, water and telecom asset capture' },
      { icon: RefreshCw, text: 'Legacy record and paper-map conversion' },
      { icon: Map, text: 'Landbase alignment and spatial accuracy improvement' },
      { icon: Database, text: 'Delivery into your GIS / ADMS data model' },
    ],
    approach: [
      {
        title: 'Source inventory',
        detail:
          'Existing records  CAD, paper, scanned maps, spreadsheets and legacy GIS  are inventoried and assessed for coverage, age and reliability.',
      },
      {
        title: 'Conversion & capture',
        detail:
          'Assets are digitised and attributed to your data model, with field capture filling the gaps that records cannot answer.',
      },
      {
        title: 'Network modelling',
        detail:
          'Connectivity, phasing, devices and flow direction are modelled so the network supports tracing, analysis and outage management.',
      },
      {
        title: 'Validation & migration',
        detail:
          'Topology and attribute validation clear the dataset before migration into your production GIS, with a documented lineage per asset class.',
      },
    ],
    deliverables: [
      'Digitised utility asset layers',
      'Connectivity / network model',
      'Landbase-aligned spatial data',
      'Converted legacy records',
      'Attribute and topology validation reports',
      'Migration-ready GIS packages',
    ],
    idealFor: [
      'Electric, gas and water utilities',
      'Telecom and fibre operators',
      'Municipal utility departments',
      'GIS modernisation programs',
      'Asset and outage management teams',
    ],
    outcomes: [
      'A single, connected view of the network',
      'Legacy records rescued into a modern data model',
      'Tracing and analysis that behave correctly',
      'Field crews working from accurate maps',
      'A foundation for outage, planning and digital-twin systems',
    ],
  },

  /* ---------------- Program & Managed Services ---------------- */
  {
    slug: 'pmo',
    group: 'Program & Managed Services',
    category: 'PMO',
    icon: Workflow,
    title: 'PMO',
    subtitle: 'Governance, Cadence and Visibility Across a Portfolio of Work',
    description:
      'We set up and run project management offices for data, geospatial and technology programs  defining governance, standing up cadence and reporting, tracking scope, risk, cost and benefits, and giving leadership one honest view of where the portfolio actually stands. Whether you need a PMO built or an existing one operated, we cover both.',
    bgImage: '/pillars/pmo-setup.jpg',
    highlights: [
      { icon: Workflow, text: 'PMO design  governance, roles, gates and decision rights' },
      { icon: ClipboardList, text: 'RAID management: risks, assumptions, issues, dependencies' },
      { icon: LineChart, text: 'Portfolio reporting, milestones and benefits tracking' },
      { icon: Users, text: 'Resource planning, capacity and demand management' },
      { icon: Gauge, text: 'Financial tracking, forecasting and variance control' },
    ],
    approach: [
      {
        title: 'Assess & design',
        detail:
          'We review how work is currently governed and design a PMO proportionate to it  enough control to be useful, not so much that delivery slows down.',
      },
      {
        title: 'Stand up',
        detail:
          'Templates, tooling, cadence and reporting are put in place, with roles and decision rights written down so escalation paths are unambiguous.',
      },
      {
        title: 'Operate',
        detail:
          'We run the cadence  status, risk review, change control, steering packs  and keep the data behind the reporting current and honest.',
      },
      {
        title: 'Improve & hand over',
        detail:
          'Delivery metrics drive continuous improvement, and the PMO is documented so your own team can take it over whenever you choose.',
      },
    ],
    deliverables: [
      'PMO operating model & governance framework',
      'Project and portfolio templates',
      'RAID logs and change-control process',
      'Milestone and benefits tracking',
      'Steering and executive reporting packs',
      'Resource and financial forecasts',
    ],
    idealFor: [
      'Large geospatial and data programs',
      'Technology transformation portfolios',
      'Multi-vendor delivery environments',
      'Organisations scaling delivery capability',
      'Programs needing independent oversight',
    ],
    outcomes: [
      'One reliable view of portfolio status',
      'Risks surfaced early enough to act on',
      'Change controlled rather than absorbed silently',
      'Decisions made on current data, not stale slides',
      'Delivery discipline that outlasts the engagement',
    ],
  },
  {
    slug: 'quality-operations',
    group: 'Program & Managed Services',
    category: 'QUALITY OPERATIONS',
    icon: ShieldCheck,
    title: 'Quality Operations',
    subtitle: 'A Quality System, Not a Final Inspection',
    description:
      'Quality that depends on a check at the end is quality you find out about too late. We design and run quality operations for data and delivery programs  specifications, sampling plans, tiered QC and QA, auditor calibration, defect taxonomy and corrective action  so quality is produced within the process and measured continuously.',
    bgImage: '/pillars/quality_check.png',
    highlights: [
      { icon: ShieldCheck, text: 'Quality management framework and written specifications' },
      { icon: Target, text: 'Sampling plans and statistically defensible acceptance' },
      { icon: Layers, text: 'Tiered QC, QA and QC-on-QC review structures' },
      { icon: Users, text: 'Auditor calibration and inter-rater agreement' },
      { icon: RefreshCw, text: 'Defect taxonomy, root-cause analysis and corrective action' },
    ],
    approach: [
      {
        title: 'Define the standard',
        detail:
          'Fitness for purpose is written down as measurable criteria per deliverable, including how ambiguous cases are to be judged.',
      },
      {
        title: 'Build the control structure',
        detail:
          'Production QC, independent QA and audit-of-the-audit layers are sized to risk, with sampling plans that give defensible acceptance decisions.',
      },
      {
        title: 'Calibrate and run',
        detail:
          'Auditors are calibrated against gold sets and monitored for agreement, so a defect means the same thing regardless of who found it.',
      },
      {
        title: 'Close the loop',
        detail:
          'Defects are classified, root-caused and fed back into training, specification and process, so recurring issues stop recurring.',
      },
    ],
    deliverables: [
      'Quality management framework & specs',
      'Sampling and acceptance plans',
      'Defect taxonomy and severity model',
      'Auditor calibration & agreement metrics',
      'Quality dashboards and trend reporting',
      'Root-cause and corrective-action records',
    ],
    idealFor: [
      'Large-scale data production programs',
      'Map, POI and annotation operations',
      'BPO and managed-service delivery',
      'Multi-vendor quality governance',
      'Programs with contractual accuracy SLAs',
    ],
    outcomes: [
      'Quality measured continuously, not discovered late',
      'Consistent judgement across auditors and sites',
      'Rework reduced by fixing causes, not symptoms',
      'Acceptance decisions that hold up commercially',
      'Evidence of quality performance over time',
    ],
  },
  {
    slug: 'data-operations',
    group: 'Program & Managed Services',
    category: 'DATA OPERATIONS',
    icon: Database,
    title: 'Data Operations',
    subtitle: 'Running Production Data Programs to Throughput, Quality and SLA',
    description:
      'Some data work is a project; most of it is an operation that has to deliver every day. We run production data operations end to end  intake, workflow orchestration, trained teams, throughput and capacity management, quality gates, tooling and change control  reporting against SLAs so you can treat data delivery as a dependable service rather than a standing risk.',
    bgImage: '/pillars/data_ops.png',
    highlights: [
      { icon: Workflow, text: 'Workflow design, orchestration and task routing' },
      { icon: Users, text: 'Trained production teams with defined competency levels' },
      { icon: TrendingUp, text: 'Throughput, capacity and backlog management' },
      { icon: CheckCircle, text: 'Embedded quality gates at every production stage' },
      { icon: BarChart3, text: 'SLA, productivity and cost-per-unit reporting' },
    ],
    approach: [
      {
        title: 'Transition',
        detail:
          'We document the current process, agree SLAs and volumes, and transition work in controlled waves rather than a single risky cut-over.',
      },
      {
        title: 'Build the operation',
        detail:
          'Workflows, tooling, roles and quality gates are put in place, with training and certification for every production role.',
      },
      {
        title: 'Run to SLA',
        detail:
          'Daily throughput, quality and backlog are managed against agreed targets, with capacity flexed to meet peaks and campaign work.',
      },
      {
        title: 'Optimise',
        detail:
          'Automation, process change and tooling improvements are applied continuously, with cost per unit and cycle time tracked as first-class metrics.',
      },
    ],
    deliverables: [
      'Documented operating procedures',
      'Workflow and tooling configuration',
      'Trained, certified production teams',
      'Daily throughput & SLA reporting',
      'Quality gate and defect metrics',
      'Continuous improvement roadmap',
    ],
    idealFor: [
      'Map and location-data producers',
      'AI training-data programs',
      'Enterprise data management teams',
      'Platform operators with ongoing data volume',
      'Organisations outsourcing production data work',
    ],
    outcomes: [
      'Predictable delivery against agreed SLAs',
      'Capacity that scales with demand, not headcount panic',
      'Quality built into the workflow, not inspected afterwards',
      'Transparent cost per unit of output',
      'Internal teams freed for higher-value work',
    ],
  },
]

export const capabilityBySlug = (slug?: string) => capabilities.find((item) => item.slug === slug)

/** Sibling capabilities from the same menu group, used for the "keep exploring" strip. */
export const capabilitiesInGroup = (group: string) => capabilities.filter((item) => item.group === group)
