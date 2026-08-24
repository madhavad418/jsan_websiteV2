import { Navigation, Truck, Layers, Brain, Code } from 'lucide-react'
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
        { value: '360°', label: 'Imagery & LiDAR' },
        { value: '24/7', label: 'Collection Operations' },
        { value: '1,000+', label: 'Field Specialists' },
      ]}
      image="/pillars/autonomous_support.png"
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
          stage: 'Operate',
          title: 'Run the collection programme',
          description:
            'Vehicle and sensor rigs, crew hiring, drive planning, live tracking, maintenance and safety compliance, reported against route and coverage targets.',
          icon: Truck,
        },
        {
          stage: 'Map',
          title: 'Capture to specification',
          description:
            'Street-level imagery, LiDAR point clouds, road geometry and sign inventory captured against a defined route plan and sensor configuration.',
          icon: Layers,
        },
        {
          stage: 'Intelligence',
          title: 'Label with a quality system',
          description:
            'Bounding boxes, segmentation, LiDAR feature extraction, OCR and sign intelligence  with controlled ontology, reviewer calibration and human-in-the-loop QA.',
          icon: Brain,
        },
        {
          stage: 'Engineer',
          title: 'Pipeline and traceability',
          description:
            'Versioned taxonomy, data lineage, privacy-safe handling and delivery into your training pipeline through APIs and integrations.',
          icon: Code,
        },
      ]}
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
        { name: 'Tracking & Telematics', href: '/products/jsan-vts' },
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
