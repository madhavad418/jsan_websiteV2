import { Brain, ScanEye, Layers, Radar, Boxes, Tags, ShieldCheck, Target, Database, Workflow, RefreshCw, CheckCircle, Gauge, Satellite, Cpu, ListChecks, UserCheck, Crosshair } from 'lucide-react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import MobileNav from '../../components/MobileNav'
import QualityGates from '../../components/QualityGates'
import RoadmapTimeline from '../../components/RoadmapTimeline'
import ProcessFlow from '../../components/ProcessFlow'
import CapabilityShowcase from '../../components/CapabilityShowcase'
import { allocationStats, serviceSplit } from '../../config/countAllocations'
import ServiceHero from '../../components/ServiceHero'
import CapabilityModules from '../../components/CapabilityModules'

/* Core GeoAI & computer-vision capabilities */
const capabilities = [
  {
    category: 'OBJECT DETECTION',
    cardTitle: 'Object Detection & Feature Extraction',
    title: 'Automate what you see, across millions of images',
    description:
      'Custom-trained deep learning models that detect, classify and extract features from aerial, satellite and street-level imagery, covering buildings, roads, poles, signage, vehicles and utility assets, without manual interpretation.',
    icon: ScanEye,
    bgImage: '/pillars/object_detection.webp',
    highlights: ['Feature Extraction', 'Object Classification', 'Vectorised Output', 'GIS-Ready Delivery'],
  },
  {
    category: 'SEGMENTATION & CLASSIFICATION',
    cardTitle: 'Segmentation & Land Classification',
    title: 'Pixel-level understanding of the landscape',
    description:
      'Semantic and instance segmentation for land use / land cover, building footprints, road surfaces, vegetation and water bodies, turning raw multispectral and RGB imagery into structured, attributed map layers.',
    icon: Layers,
    bgImage: '/pillars/pixel.webp',
    highlights: ['LULC Mapping', 'Building Footprints', 'Road Surface Extraction', 'Multispectral Analysis'],
  },
  {
    category: 'CHANGE DETECTION',
    cardTitle: 'Change Detection & Monitoring',
    title: 'Know what changed, where and when',
    description:
      'Time-series models that compare imagery epochs to flag new construction, encroachment, vegetation loss, network additions and asset movement, so field verification is targeted at real change instead of the whole footprint.',
    icon: Radar,
    bgImage: '/pillars/change_detection.webp',
    highlights: ['Multi-Epoch Comparison', 'Encroachment Alerts', 'Growth Monitoring', 'Change Attribution'],
  },
  {
    category: 'LIDAR & 3D',
    cardTitle: 'LiDAR & Point-Cloud AI',
    title: 'Machine classification of 3D reality',
    description:
      'Automated point-cloud classification and 3D feature extraction from drone, mobile and aerial LiDAR, covering ground, vegetation, structures, poles and wires, feeding terrain models, clearance analysis and digital twins.',
    icon: Boxes,
    bgImage: '/pillars/point_cloud.webp',
    highlights: ['Point-Cloud Classification', 'Terrain Modelling', 'Vegetation Encroachment', 'Digital Twin Input'],
  },
  {
    category: 'TRAINING DATA OPERATIONS',
    cardTitle: 'AI Training Data & Annotation',
    title: 'The ground truth your models learn from',
    description:
      'Managed annotation operations at production scale, covering bounding boxes, polygons, segmentation masks, 3D cuboids and controlled-ontology labelling of map and imagery data, delivered with reviewer sampling and agreement scoring.',
    icon: Tags,
    bgImage: '/pillars/ontology.webp',
    highlights: ['Polygon & Mask Labelling', 'Controlled Ontology', 'Reviewer Sampling', 'Agreement Scoring'],
  },
  {
    category: 'AUTOMATED QA/QC',
    cardTitle: 'AI-Assisted Map QA & Validation',
    title: 'Models that check the map before people do',
    description:
      'Computer-vision and rules-based validation applied to basemap, POI and network data, surfacing geometry plausibility issues, attribute conflicts, duplicates and imagery-versus-map mismatches for human review.',
    icon: ShieldCheck,
    bgImage: '/pillars/dedub.webp',
    highlights: ['Anomaly Detection', 'Duplicate Detection', 'Attribute Conflicts', 'Human-in-the-Loop'],
  },
]

/* Model development lifecycle */
const lifecycle = [
  { icon: Target, title: 'Define', desc: 'Use case, feature classes, ontology, accuracy targets and acceptance criteria.' },
  { icon: Database, title: 'Curate', desc: 'Imagery, LiDAR and reference data sourcing, tiling, balancing and versioning.' },
  { icon: Tags, title: 'Annotate', desc: 'Production labelling with reviewer sampling and inter-annotator agreement.' },
  { icon: Brain, title: 'Train', desc: 'Model selection, transfer learning, augmentation and hyperparameter tuning.' },
  { icon: Workflow, title: 'Deploy', desc: 'Batch or API inference, vectorisation and delivery into the GIS environment.' },
  { icon: RefreshCw, title: 'Monitor', desc: 'Drift tracking, edge-case capture and scheduled retraining cycles.' },
]

/* Model assurance checkpoints */
const gates = [
  { g: 'G1', icon: Tags, title: 'Ontology sign-off', desc: 'Class definitions, edge cases and labelling rules agreed before production.' },
  { g: 'G2', icon: ListChecks, title: 'Annotation QA', desc: 'Sampled review, agreement scoring and correction of the training set.' },
  { g: 'G3', icon: Target, title: 'Model validation', desc: 'Precision, recall and F1 measured on a held-out set per feature class.' },
  { g: 'G4', icon: Crosshair, title: 'Geospatial QA', desc: 'Geometry, positional accuracy, topology and projection checks on outputs.' },
  { g: 'G5', icon: ScanEye, title: 'Human review', desc: 'Low-confidence detections routed to analysts instead of shipped blind.' },
  { g: 'G6', icon: UserCheck, title: 'Customer acceptance', desc: 'Accuracy report, exception log and delivery in the agreed schema.' },
]

/* Engagement path */
const roadmap = [
  { n: '01', title: 'Assess', desc: 'Use case, imagery sources, data readiness, target classes and success metrics.', exit: 'Scoped use case + accuracy targets' },
  { n: '02', title: 'Prove', desc: 'Proof of concept on a representative sample with measured precision and recall.', exit: 'Validated model + accuracy baseline' },
  { n: '03', title: 'Industrialise', desc: 'Annotation pipeline, training infrastructure, inference workflow and QA gates.', exit: 'Repeatable production pipeline' },
  { n: '04', title: 'Scale', desc: 'Full-footprint processing, human-in-the-loop review and GIS delivery at volume.', exit: 'Production datasets at scale' },
  { n: '05', title: 'Sustain', desc: 'Drift monitoring, edge-case capture, retraining and model version governance.', exit: 'Maintained models + support model' },
]

/* Applied across */
const applications = [
  'Utility & telecom asset extraction from imagery',
  'Basemap and POI change detection at country scale',
  'Road furniture, sign and lane-marking inventory',
  'Vegetation encroachment on power and fibre corridors',
  'Construction progress and encroachment monitoring',
  'Land use, land cover and environmental change reporting',
]

const stack = ['PyTorch', 'TensorFlow', 'YOLO / Detectron2', 'U-Net & Mask R-CNN', 'OpenCV', 'GDAL / Rasterio', 'ArcGIS & QGIS', 'PostGIS', 'AWS / Azure GPU']

const stats = [
  ...allocationStats(serviceSplit, 'geoai-computer-vision'),
  { value: '95%+', label: 'Trained Class Accuracy' },
]

export default function GeoAIComputerVision() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero */}
      <ServiceHero
        breadcrumb={"GeoAI & Computer Vision"}
        eyebrow={"Core Service"}
        eyebrowIcon={Brain}
        title={"Transform real-world imagery into spatial intelligence."}
        subtitle={"GeoAI & Computer Vision"}
        description={"JSAN applies computer vision, spatial analytics and human validation to extract decision-ready information from imagery, LiDAR and mapping datasets."}
        image="/pillars/computer_vision.webp"
        imageAlt="GeoAI and computer vision"
        stats={stats}
      />

      <CapabilityModules
        eyebrow="Capabilities"
        heading="Every capability, input to output"
        intro="Each of these is a concrete chain: what goes in, what happens to it, and what you receive."
        modules={[
          { name: 'Object Detection', description: 'Locating assets and features in captured imagery.', pipeline: { input: 'Street-level or aerial imagery', processing: 'Detection models tuned per asset class', output: 'Bounding boxes with confidence scores' } },
          { name: 'Classification', description: 'Assigning each detection to a controlled category.', pipeline: { input: 'Detected objects', processing: 'Classification against a versioned ontology', output: 'Typed features with attributes' } },
          { name: 'OCR', description: 'Reading text from signs, plates and panels.', pipeline: { input: 'Sign and panel crops', processing: 'OCR with language and format rules', output: 'Machine-readable text fields' } },
          { name: 'LiDAR Feature Extraction', description: 'Pulling structure out of point clouds.', pipeline: { input: 'Classified point cloud', processing: 'Segmentation and geometry fitting', output: 'Vector features with elevation' } },
          { name: 'Image Annotation', description: 'Human labelling where models cannot yet be trusted.', pipeline: { input: 'Raw imagery', processing: 'Controlled-ontology labelling, calibrated reviewers', output: 'Training-ready labelled sets' } },
          { name: '3D Annotation', description: 'Labelling within the point cloud itself.', pipeline: { input: 'LiDAR scenes', processing: 'Cuboid and segment annotation', output: 'Annotated 3D training data' } },
          { name: 'Change Detection', description: 'Finding what moved, appeared or disappeared.', pipeline: { input: 'Two capture epochs', processing: 'Spatial and semantic differencing', output: 'Change sets with evidence' } },
          { name: 'Spatial Analytics', description: 'Turning features into answers about place.', pipeline: { input: 'Extracted feature layers', processing: 'Proximity, density and network analysis', output: 'Analytical layers and metrics' } },
          { name: 'Human Validation', description: 'People checking what the model asserted.', pipeline: { input: 'Model output', processing: 'Sampling, adjudication, senior escalation', output: 'Accepted or corrected records' } },
          { name: 'QA & Evidence', description: 'Proof that travels with the data.', pipeline: { input: 'Validated records', processing: 'QC-on-QC, lineage capture', output: 'Records with reviewer and source evidence' } },
        ]}
      />


      {/* Capabilities */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12 md:mb-14">
            <span className="inline-block text-[#00d4ff] font-bold text-xs md:text-sm uppercase tracking-widest mb-3">What We Deliver</span>
            <h2 className="text-[28px] md:text-[36px] lg:text-[42px] font-bold mb-4 text-gradient">
              Six GeoAI Capabilities, One Delivery Backbone
            </h2>
            <p className="text-gray-600 text-base md:text-lg max-w-3xl mx-auto">
              From annotation operations through trained models to validated GIS output, all on one governed pipeline, configured per feature class and imagery source.
            </p>
          </div>

                    <CapabilityShowcase items={capabilities} />
        </div>
      </section>

      {/* Model lifecycle */}
      <section className="py-20" style={{ background: 'linear-gradient(120deg, #012f62, #0055b4)' }}>
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-14">
            <span className="inline-block text-[#00d4ff] font-bold text-xs md:text-sm uppercase tracking-widest mb-3">How We Build It</span>
            <h2 className="text-[28px] md:text-[36px] lg:text-[42px] font-bold text-white mb-4">
              A Six-Stage Model Lifecycle
            </h2>
            <p className="text-white/70 text-base md:text-lg max-w-3xl mx-auto">
              Models are engineered like production systems, with a defined ontology, curated training data, measured accuracy and a retraining loop that keeps them current.
            </p>
          </div>

          <ProcessFlow steps={lifecycle} />

          <p className="text-white/60 text-sm md:text-base text-center max-w-3xl mx-auto mt-12">
            <span className="text-white font-semibold">Design principle:</span> automation carries the volume, people carry the judgement, and every low-confidence detection is routed to a human before it becomes a map record.
          </p>
        </div>
      </section>

      {/* Accuracy & assurance */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12 md:mb-14">
            <span className="inline-block text-[#00d4ff] font-bold text-xs md:text-sm uppercase tracking-widest mb-3">Accuracy &amp; Assurance</span>
            <h2 className="text-[28px] md:text-[36px] lg:text-[42px] font-bold mb-4 text-gradient">
              Measured Accuracy, Not Claimed Accuracy
            </h2>
            <p className="text-gray-600 text-base md:text-lg max-w-3xl mx-auto">
              Six checkpoints govern the path from labelling rules to accepted delivery, each one with an owner and an evidence trail.
            </p>
          </div>

          <QualityGates gates={gates} />

          <div className="mt-8 rounded-xl bg-[#eef5ff] border border-blue-100 p-6 flex items-start gap-3">
            <Gauge className="w-5 h-5 text-[#0050a9] shrink-0 mt-0.5" />
            <p className="text-gray-600 text-sm leading-relaxed">
              Every delivery ships with a per-class accuracy report covering precision, recall and F1 against a held-out validation set, plus the exception log of detections escalated to human review, so quality is auditable rather than assumed.
            </p>
          </div>
        </div>
      </section>

      {/* Applications & stack */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
            <div>
              <span className="inline-block text-[#00d4ff] font-bold text-xs md:text-sm uppercase tracking-widest mb-3">Where It Applies</span>
              <h2 className="text-[28px] md:text-[36px] font-bold mb-4 text-gradient">
                Built for Real Geospatial Workloads
              </h2>
              <p className="text-gray-600 text-base md:text-lg mb-6">
                GeoAI is embedded in the delivery programmes JSAN already runs, including utility and telecom mapping, basemap and POI operations, and field survey, so the models are trained on the same data our teams produce and validate.
              </p>
              <div className="space-y-3">
                {applications.map((a, i) => (
                  <div key={i} className="flex items-start gap-3 bg-white rounded-xl border border-gray-100 shadow-sm p-4">
                    <CheckCircle className="w-5 h-5 text-[#0050a9] shrink-0 mt-0.5" />
                    <p className="text-gray-600 text-sm leading-relaxed">{a}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:pt-2">
              <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-100">
                <img src="/pillars/AI.webp" alt="GeoAI model development" className="w-full h-64 md:h-80 object-cover" />
              </div>

              <div className="mt-8 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-[#0050a9] flex items-center justify-center">
                    <Cpu className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-[#0050a9] font-bold text-lg">Technology Stack</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {stack.map((t, i) => (
                    <span key={i} className="bg-blue-50 text-[#0050a9] text-xs px-3 py-1.5 rounded-full border border-blue-100">{t}</span>
                  ))}
                </div>
              </div>

              <div className="mt-6 rounded-2xl p-6 text-white" style={{ background: 'linear-gradient(120deg, #012f62, #0055b4)' }}>
                <div className="flex items-start gap-3">
                  <Satellite className="w-5 h-5 text-[#00d4ff] shrink-0 mt-0.5" />
                  <p className="text-white/80 text-sm leading-relaxed">
                    Works with the imagery you already have, including satellite, aerial, drone, street-level panoramas, oblique captures and LiDAR point clouds, or we source and process it as part of the engagement.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Engagement path */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12 md:mb-14">
            <span className="inline-block text-[#00d4ff] font-bold text-xs md:text-sm uppercase tracking-widest mb-3">Engagement</span>
            <h2 className="text-[28px] md:text-[36px] lg:text-[42px] font-bold mb-4 text-gradient">
              Prove It Small, Then Run It at Scale
            </h2>
            <p className="text-gray-600 text-base md:text-lg max-w-3xl mx-auto">
              Accuracy is demonstrated on a representative sample before a single full-footprint run is commissioned.
            </p>
          </div>

          <RoadmapTimeline steps={roadmap} />
        </div>
      </section>

      {/* Contact Form */}
      {/* <div id="contact">
        <ServiceContactForm
          serviceName="GeoAI & Computer Vision"
          subServices={capabilities.map((c) => ({ value: c.cardTitle, label: c.cardTitle }))}
        />
      </div> */}

      <Footer />
      <MobileNav />
    </div>
  )
}
