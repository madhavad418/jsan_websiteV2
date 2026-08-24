import { Map, Truck, Layers, Route, MapPin, ClipboardCheck, ShieldCheck } from 'lucide-react'
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
      image="/pillars/mapping_intel.png"
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
          stage: 'Collection',
          title: 'Mobilise and drive the market',
          description:
            'Vehicles, sensor rigs, local crews, permits and dispatch stood up country by country, driving against a coverage plan rather than an availability guess.',
          icon: Truck,
          image: '/pillars/globalstreet.png',
          imageAlt: 'JSAN collection vehicle capturing street-level imagery',
          points: [
            '360° imagery and mobile LiDAR runs',
            'Local driver and crew hiring',
            'Drive planning, dispatch and re-planning',
            'Daily coverage and productivity reporting',
          ],
        },
        {
          stage: 'Roads',
          title: 'Build the routable network',
          description:
            'Centreline geometry, junction modelling, connectivity and the attribution that makes a network navigable instead of merely drawn.',
          icon: Route,
          image: '/pillars/roads_tracing.png',
          imageAlt: 'Road centreline network with connectivity and attribution',
          points: [
            'Geometry, alignment and junctions',
            'Turn restrictions, one-ways, grade separation',
            'Functional class, lanes, speed categories',
            'Topology validation before delivery',
          ],
        },
        {
          stage: 'POI',
          title: 'Places, with evidence attached',
          description:
            'Points of interest collected, categorised against your ontology, deduplicated and confidence-scored, with the source recorded on every record.',
          icon: MapPin,
          image: '/pillars/poi.png',
          imageAlt: 'Points of interest captured and categorised on a basemap',
          points: [
            'Category mapping to your ontology',
            'Duplicate detection and merge rules',
            'Opening hours, contact and attribute capture',
            'Confidence scoring per record',
          ],
        },
        {
          stage: 'Address',
          title: 'Addressing that matches the street',
          description:
            'Address points reconciled against authoritative records and what the crew actually found on site, market by market, convention by convention.',
          icon: Layers,
          image: '/pillars/adress.png',
          imageAlt: 'Address point verification against building frontage',
          points: [
            'Local addressing conventions per market',
            'Authoritative source reconciliation',
            'Building, entrance and access points',
            'Language and transliteration handling',
          ],
        },
        {
          stage: 'Verification',
          title: 'Send someone to look',
          description:
            'Where the data cannot be trusted from a desk, crews verify on site and bring back dated, geolocated evidence rather than an opinion.',
          icon: ClipboardCheck,
          image: '/pillars/feild_verify.png',
          imageAlt: 'Field crew verifying map data on site',
          points: [
            'Targeted field checks on low-confidence records',
            'Photo and coordinate evidence per visit',
            'Change captured, not just errors corrected',
            'Feedback into collection planning',
          ],
        },
        {
          stage: 'QA',
          title: 'Nothing ships unchecked',
          description:
            'Automated validation for what a rule can catch, trained reviewers for what it cannot, and sampling that measures the result rather than assuming it.',
          icon: ShieldCheck,
          image: '/pillars/quality_check.png',
          imageAlt: 'Quality control queue with reviewer evidence',
          points: [
            'Schema, topology and completeness rules',
            'Human-in-the-loop adjudication',
            'Reviewer calibration and agreement rates',
            'Delivery with lineage and timestamps',
          ],
        },
      ]}
      useCases={[
        {
          title: 'Entering a market with no standing operation',
          detail:
            'Vehicles, sensors, crews, permits and a drive plan stood up from scratch, with the first coverage reporting inside the same programme rather than the next one.',
        },
        {
          title: 'A dataset that has quietly gone stale',
          detail:
            'Refresh cycles scheduled against change rather than calendar habit, so decay is caught in the data rather than in a customer complaint.',
        },
        {
          title: 'Coverage claims that have to be defensible',
          detail:
            'Per-record lineage  which drive, which crew, which date, which reviewer  so any figure in a coverage report can be traced back to the capture behind it.',
        },
        {
          title: 'POI and address sets that disagree with each other',
          detail:
            'Deduplication, ontology mapping and field verification applied together, so conflicting sources resolve into one record with a confidence score.',
        },
      ]}
      useCasesImage="/pillars/mapping.png"
      useCasesImageAlt="Street-level capture resolving into structured map data"
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
