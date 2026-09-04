import { Zap, ClipboardList, Layers, Network, Boxes } from 'lucide-react'
import IndustryJourney from '../../components/IndustryJourney'
import { allocationStats, industrySplit } from '../../config/countAllocations'

/**
 * /industries/utilities
 *
 * Rebuilt from the old card-grid template onto the industry journey, with a story that
 * belongs to utilities rather than a copy of the mapping one: field inventory, mapping,
 * network intelligence, then the asset and digital twin workflows that use them.
 *
 * The previous version of this page carried a "Regional Power Utility" case study with
 * outage, cost and reliability percentages that exist nowhere in the business records.
 * Those are gone. The project and headcount figures are this industry's slice of the
 * company totals, taken from src/config/countAllocations.ts.
 */
const stats = [
  ...allocationStats(industrySplit, 'utilities'),
  { value: '25+', label: 'Countries Supported' },
]

export default function Energy() {
  return (
    <IndustryJourney
      breadcrumb="Utilities"
      eyebrow="Industry"
      eyebrowIcon={Zap}
      title="Know what you own, where it is, and what condition it is in"
      subtitle="From field inventory to asset workflows."
      description="For electricity, water and gas networks carrying decades of inherited records, where the asset register, the GIS and the physical network have quietly drifted apart."
      stats={stats}
      image="/pillars/utility_network.webp"
      copySide="right"
      imagePosition="50% 60%"
      imageAlt="Utility network assets captured and mapped in the field"
      challenges={[
        {
          title: 'The record predates the network',
          description:
            'Asset data assembled over decades, across mergers, paper records and successive systems, rarely matches what a crew finds when they arrive on site.',
        },
        {
          title: 'Inventory is a field problem first',
          description:
            'No amount of desk work establishes what is actually installed on a rural feeder. Somebody has to go and look, safely, at scale, and bring back evidence.',
        },
        {
          title: 'Asset workflows need trustworthy inputs',
          description:
            'Condition-based maintenance, outage analysis and digital twin work all inherit whatever quality sits underneath them. Bad geometry propagates quietly.',
        },
      ]}
      journey={[
        {
          stage: 'Field inventory',
          title: 'Establish what is actually there',
          description:
            'Crews surveying assets on the ground  poles, transformers, valves, meters, chambers  captured with coordinates, condition and dated photographic evidence.',
          icon: ClipboardList,
          image: '/pillars/feild_verify.webp',
          imageAlt: 'Field crew capturing utility asset inventory on site',
          points: [
            'Asset capture with coordinates and condition',
            'Photographic evidence per asset',
            'Attribute capture against your schema',
            'Safety, access and permit handling',
          ],
        },
        {
          stage: 'Mapping',
          title: 'Turn the survey into a network',
          description:
            'Captured assets built into connected network geometry  feeders, spans, mains and service connections  rather than a scatter of unrelated points.',
          icon: Layers,
          image: '/pillars/utility.webp',
          imageAlt: 'Utility network geometry built from field survey',
          points: [
            'Connectivity and topology construction',
            'Conflation with existing records',
            'Consumer indexing and service links',
            'Positional quality stated per dataset',
          ],
        },
        {
          stage: 'Network intelligence',
          title: 'Make the network answer questions',
          description:
            'Validation, gap analysis and spatial analytics against the built network, so planning and operations teams can see risk, load and exposure rather than raw geometry.',
          icon: Network,
          image: '/pillars/net_intel.webp',
          imageAlt: 'Utility network analytics and validation dashboards',
          points: [
            'Topology and completeness validation',
            'Gap and anomaly identification',
            'Vegetation and encroachment analysis',
            'Spatial analytics for planning teams',
          ],
        },
        {
          stage: 'Asset & twin workflows',
          title: 'Feed the systems that run the network',
          description:
            'The validated network delivered into enterprise GIS, asset management and digital twin workflows, with the update path defined rather than left as a one-off migration.',
          icon: Boxes,
          image: '/pillars/twinning.webp',
          imageAlt: 'Digital twin and asset lifecycle workflows for utility networks',
          points: [
            'Enterprise GIS migration and loading',
            'Asset lifecycle and maintenance workflows',
            'Digital twin data preparation',
            'Ongoing update and change management',
          ],
        },
      ]}
      useCases={[
        {
          title: 'An asset register nobody fully trusts',
          detail:
            'Field inventory rebuilt from the ground up on the feeders that matter most, with evidence attached so the new record can be defended rather than argued about.',
        },
        {
          title: 'A GIS migration that keeps stalling on data quality',
          detail:
            'Validation, conflation and correction run as a delivery stage in its own right, so what lands in the new system is not the old problem re-hosted.',
        },
        {
          title: 'Digital twin ambitions on unverified geometry',
          detail:
            'Positional and attribute quality established and stated first, so the twin inherits a known baseline instead of quietly amplifying inherited error.',
        },
        {
          title: 'Condition data that only exists in crew memory',
          detail:
            'Structured condition capture in the field, recorded against the asset record rather than in notebooks and individual inspection reports.',
        },
      ]}
      useCasesImage="/pillars/gis_usecase.webp"
      useCasesImageAlt="Electricity, water and gas network assets in the field"
      capabilities={[
        { name: 'Utilities Mapping', href: '/services/utility-network-intelligence' },
        { name: 'Pole & Asset Intelligence', href: '/services/pole-asset-intelligence' },
        { name: 'Field Verification', href: '/capabilities/field-verification' },
        { name: 'GIS Data Engineering', href: '/technologies/gis' },
        { name: 'LiDAR Engineering', href: '/capabilities/lidar-engineering' },
        { name: 'Data Validation', href: '/capabilities/data-validation' },
      ]}
      outcomes={[
        'An asset record built from what crews found, with evidence attached to each asset',
        'Connected network geometry rather than disconnected survey points',
        'Positional and attribute quality stated per dataset, not assumed',
        'A defined update path, so the record does not drift again after handover',
      ]}
      services={[
        'Field Asset Inventory',
        'Network Mapping',
        'Consumer Indexing',
        'Topology Validation',
        'Enterprise GIS Migration',
        'Asset Lifecycle Support',
      ]}
      scopeNote="JSAN provides survey, mapping, data and engineering support services to utility network operators. JSAN does not operate networks, perform live electrical or gas works, or act as a regulatory or safety approval authority, except where specifically contracted and legally authorised to do so."
    />
  )
}
