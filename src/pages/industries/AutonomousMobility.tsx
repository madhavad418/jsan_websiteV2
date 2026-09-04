import { Navigation, Truck, Layers, Route, Users, ShieldCheck } from 'lucide-react'
import { allocationStats, industrySplit } from '../../config/countAllocations'
import IndustryJourney from '../../components/IndustryJourney'

export default function AutonomousMobility() {
  return (
    <IndustryJourney
      breadcrumb="Autonomous Mobility"
      eyebrow="Industry"
      eyebrowIcon={Navigation}
      title="Operational support for real-world autonomous mobility deployment."
      subtitle="Autonomous Mobility"
      description="JSAN supports autonomous mobility programs with field operations, mapping, fleet readiness, route evidence, geospatial QA and scalable operational support."
      stats={[
        ...allocationStats(industrySplit, 'autonomous-mobility'),
        { value: '24/7', label: 'Collection Operations' },
      ]}
      image="/pillars/autonomous_support.webp"
      copySide="left"
      imagePosition="50% 55%"
      imageAlt="LiDAR and sensor data capture for autonomous mobility"
      challenges={[
        {
          title: 'Capture conditions are the experiment',
          description:
            'Route, time of day, weather and sensor configuration all change what the model learns. Uncontrolled capture produces data you cannot reason about later.',
        },
        {
          title: 'Annotation quality is not self-evident',
          description:
            'Label accuracy claims mean little without reviewer calibration, gold sets and QC-on-QC. Silent drift in a labelling team shows up as model regression months later.',
        },
        {
          title: 'Scale needs crews, not just tools',
          description:
            'Covering a metro area repeatedly means vehicles, drivers, dispatch, maintenance and safety compliance  an operational problem before it is a data one.',
        },
      ]}
      journey={[
        {
          stage: 'Route readiness',
          title: 'Know the route before the vehicle drives it',
          description:
            'Corridor and ODD survey work: what the route physically contains, where the signage, markings and furniture actually are, and what has changed since the last pass.',
          icon: Route,
          image: '/pillars/route.webp',
          imageAlt: 'Route corridor survey for autonomous operation',
          points: [
            'Corridor survey against the planned ODD',
            'Signage, marking and furniture inventory',
            'Change detection between passes',
            'Access, restriction and closure capture',
          ],
        },
        {
          stage: 'Field support',
          title: 'People on the ground where the programme runs',
          description:
            'Local crews supporting depot operations, on-route assistance, incident documentation and the day-to-day work a remote team cannot do from a screen.',
          icon: Users,
          image: '/pillars/feild_support.webp',
          imageAlt: 'Field support crew working with an autonomous test vehicle',
          points: [
            'Depot and on-route field support',
            'Trained local crews, hired in market',
            'Incident and exception documentation',
            'Safety procedure and induction compliance',
          ],
        },
        {
          stage: 'Fleet',
          title: 'Run the vehicles as an operation',
          description:
            'Vehicle and sensor rigs, drivers and operators, dispatch, tracking, maintenance and compliance  managed against route and coverage targets, not ad hoc.',
          icon: Truck,
          image: '/pillars/live_tracking.webp',
          imageAlt: 'Managed collection and test fleet with sensor rigs',
          points: [
            'Sensor rig fitting and upkeep',
            'Operator hiring and scheduling',
            'Live tracking and in-run checks',
            'Maintenance, permits and safety compliance',
          ],
        },
        {
          stage: 'Geospatial evidence',
          title: 'Capture that stands up later',
          description:
            'Imagery, LiDAR and geometry captured to a defined sensor configuration, with lineage attached, so any observation can be traced back to the run that produced it.',
          icon: Layers,
          image: '/pillars/point_cloud.webp',
          imageAlt: 'LiDAR point cloud captured along a test route',
          points: [
            'Imagery and LiDAR to specification',
            'Per-run lineage and timestamps',
            'Privacy-safe processing of captured data',
            'Versioned taxonomy across releases',
          ],
        },
        {
          stage: 'Operational QA',
          title: 'Quality measured, not assumed',
          description:
            'Annotation and extraction run under a controlled ontology with reviewer calibration and sampling, so accuracy is a number you can report rather than a claim.',
          icon: ShieldCheck,
          image: '/pillars/quality.webp',
          imageAlt: 'Annotation quality review with reviewer calibration',
          points: [
            'Controlled ontology and labelling rules',
            'Reviewer calibration and agreement rates',
            'Sampling plans per release',
            'Feedback into capture and labelling',
          ],
        },
      ]}
      useCases={[
        {
          title: 'Opening a new operating area',
          detail:
            'Route and corridor survey, local crew mobilisation and baseline capture, so the programme starts with a current picture rather than an assumption.',
        },
        {
          title: 'Training data that needs a defensible quality story',
          detail:
            'Labelling under a controlled ontology with calibration and sampling, reported per release rather than asserted once at the start.',
        },
        {
          title: 'Field work outrunning the in-house team',
          detail:
            'Crews, operators and depot support hired and managed locally, scaling with the programme instead of pulling engineers into logistics.',
        },
        {
          title: 'Re-surveying a corridor after change',
          detail:
            'Repeat passes compared against the previous capture, so what changed is surfaced explicitly rather than left for the model to discover.',
        },
      ]}
      useCasesImage="/pillars/autonomous_mobilitynew.webp"
      useCasesImageAlt="Autonomous vehicle operating on a surveyed corridor"
      scopeNote="JSAN provides operational, mapping and data services in support of autonomous mobility programs. JSAN does not certify autonomous vehicles, act as a regulatory or approval authority, provide Technical Supervision, or independently approve ODD operations, except where specifically contracted and legally authorised to do so."
      services={[
        'Route Readiness',
        'Field Validation',
        'Mapping Operations',
        'Fleet Operations',
        'Sensor Support',
        'Evidence Collection',
        'Geospatial QA',
        'Data Operations',
        'Operational Dashboards',
        'Program Management',
      ]}
      capabilities={[
        { name: 'Global Fleet Operations', href: '/services/global-fleet-collection-operations' },
        { name: 'Street-Level Imagery', href: '/services/global-street-data-collection' },
        { name: 'GeoAI & Computer Vision', href: '/services/geoai-computer-vision' },
        { name: 'Data Annotation', href: '/services/basemap-poi-annotation' },
        { name: 'LiDAR & 3D Mapping', href: '/services/geospatial' },
        { name: 'Tracking & Telematics', href: '/products' },
      ]}
      outcomes={[
        'Repeatable capture against a defined route and sensor specification',
        'Annotation with controlled ontology, gold sets and reviewer calibration behind the accuracy figure',
        'Privacy-compliant processing, including face and plate treatment, before data leaves the pipeline',
        'Coverage and productivity reported per drive, not per project',
      ]}
    />
  )
}
