import { Map, Truck, Layers, Brain, Code } from 'lucide-react'
import IndustryJourney from '../../components/IndustryJourney'

export default function MappingLocationPlatforms() {
  return (
    <IndustryJourney
      breadcrumb="Mapping & Location Platforms"
      eyebrow="Industry"
      eyebrowIcon={Map}
      title="Map data that stays current, country after country"
      subtitle="Ground truth at platform scale."
      description="For map and navigation providers, address authorities and location-data businesses that need local freshness, verifiable coverage and a partner who can mobilise in a new market without a standing start."
      stats={[
        { value: '20+', label: 'Countries Operated' },
        { value: '1,000+', label: 'Field Specialists' },
        { value: '360°', label: 'Imagery Capture' },
      ]}
      image="/pillars/navigation-data.jpg"
      imageAlt="Street-level navigation data collection"
      challenges={[
        {
          title: 'Freshness decays quietly',
          description:
            'Roads change, businesses close and addresses shift. Without a scheduled refresh and local presence, a dataset degrades long before anyone notices it in the product.',
        },
        {
          title: 'Coverage claims need evidence',
          description:
            'Saying a market is covered is easy. Proving which tiles were swept, when, and what was found requires captured lineage on every record.',
        },
        {
          title: 'Every market is different',
          description:
            'Addressing conventions, languages, categories and access rules change at each border. A method that works in one country rarely transfers unchanged.',
        },
      ]}
      journey={[
        {
          stage: 'Operate',
          title: 'Mobilise in market',
          description:
            'Vehicles, sensor rigs, local crews, permits and dispatch planning stood up country by country, reporting against coverage and productivity targets.',
          icon: Truck,
        },
        {
          stage: 'Map',
          title: 'Capture the ground truth',
          description:
            'Street-level imagery, LiDAR runs, road geometry, POI and address collection, with field verification where the source data cannot be trusted.',
          icon: Layers,
        },
        {
          stage: 'Intelligence',
          title: 'Extract and validate',
          description:
            'Computer vision, sign and OCR extraction, annotation and human-in-the-loop QA turn raw capture into structured, checked map features.',
          icon: Brain,
        },
        {
          stage: 'Engineer',
          title: 'Deliver into your stack',
          description:
            'Your schema, your pipeline  delivered through APIs and integrations with evidence references, change sets and update timestamps.',
          icon: Code,
        },
      ]}
      capabilities={[
        { name: 'Street-Level Imagery', href: '/services/global-street-data-collection' },
        { name: 'Global Fleet Operations', href: '/services/global-fleet-collection-operations' },
        { name: 'POI & Address Intelligence', href: '/services/basemap-poi-annotation' },
        { name: 'GeoAI & Computer Vision', href: '/services/geoai-computer-vision' },
        { name: 'LiDAR & 3D Mapping', href: '/services/geospatial' },
        { name: 'APIs & Integrations', href: '/technologies/api-integration' },
      ]}
      outcomes={[
        'Scheduled refresh cycles rather than one-off collection projects',
        'Per-record evidence  query, source, timestamp and reviewer  so any figure can be re-checked',
        'Deduplicated, confidence-scored POI and address data delivered in your schema',
        'A single accountable partner across fleet, capture, extraction and delivery',
      ]}
    />
  )
}
