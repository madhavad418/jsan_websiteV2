import { Building2, Camera, Brain, Construction, ShieldCheck } from 'lucide-react'
import IndustryJourney from '../../components/IndustryJourney'
import { metric } from '../../config/companyMetrics'

/**
 * /industries/government-smart-cities
 *
 * Rebuilt from the old card-grid template onto the industry journey. The public-sector
 * story is its own: evidence gathered in the field, turned into geospatial intelligence,
 * applied to infrastructure decisions, under governance that has to survive scrutiny.
 *
 * Figures come from src/config/companyMetrics.ts or are absent. The previous version of
 * this page carried illustrative smart-city metrics that were never validated.
 */
const stats = [
  { value: metric('countries'), label: 'Countries Supported' },
  { value: metric('professionals'), label: 'Professionals' },
  { value: metric('programs'), label: 'Programs Delivered' },
].filter((s): s is { value: string; label: string } => Boolean(s.value))

export default function SmartCities() {
  return (
    <IndustryJourney
      breadcrumb="Government & Smart Cities"
      eyebrow="Industry"
      eyebrowIcon={Building2}
      title="Decisions about public infrastructure need evidence behind them"
      subtitle="From field evidence to defensible governance."
      description="For municipalities, agencies and public infrastructure bodies where a decision has to be explainable months later  to an auditor, a council, or a resident who asks why."
      stats={stats}
      image="/pillars/smart_city.png"
      imageAlt="Municipal infrastructure captured as geospatial data"
      challenges={[
        {
          title: 'Records are split across departments',
          description:
            'Roads, lighting, drainage, parks and planning each hold part of the picture in a different system, so nobody can see the asset base as a whole.',
        },
        {
          title: 'Decisions have to be defensible',
          description:
            'Public spending is reviewed. A prioritisation that cannot show the evidence, the date and the method behind it is difficult to stand behind later.',
        },
        {
          title: 'Procurement outlasts the technology',
          description:
            'Programmes are specified years before delivery. What is bought has to still be usable, and maintainable, well after the initial contract closes.',
        },
      ]}
      journey={[
        {
          stage: 'Field evidence',
          title: 'Capture the public realm as it stands',
          description:
            'Street-level survey of roads, footways, signage, lighting, drainage and street furniture, captured with coordinates, condition and dated imagery.',
          icon: Camera,
          image: '/pillars/globalstreet.png',
          imageAlt: 'Street-level survey of municipal assets and public realm',
          points: [
            'Road, footway and furniture condition survey',
            'Signage, lighting and drainage inventory',
            'Dated, geolocated photographic evidence',
            'Repeat passes to capture change',
          ],
        },
        {
          stage: 'Geospatial intelligence',
          title: 'Turn evidence into an operating picture',
          description:
            'Extraction, classification and spatial analysis across the captured evidence, so departments work from one current view instead of separate partial ones.',
          icon: Brain,
          image: '/pillars/evidence.png',
          imageAlt: 'Spatial analysis across municipal asset data',
          points: [
            'Feature extraction from imagery and LiDAR',
            'Classification against a shared schema',
            'Cross-department conflation',
            'Change detection between survey cycles',
          ],
        },
        {
          stage: 'Infrastructure',
          title: 'Apply it to the actual decisions',
          description:
            'Condition, risk and accessibility analysis feeding maintenance prioritisation, capital planning and works programmes  the decisions the survey was funded for.',
          icon: Construction,
          image: '/pillars/decisions.png',
          imageAlt: 'Infrastructure condition and maintenance planning',
          points: [
            'Condition and risk prioritisation',
            'Accessibility and compliance assessment',
            'Capital and maintenance programme inputs',
            'Works planning and scheduling support',
          ],
        },
        {
          stage: 'Governance',
          title: 'Make it auditable a year later',
          description:
            'Lineage on every record, defined QA gates, structured reporting and a single accountable delivery line, so the programme survives review rather than merely finishing.',
          icon: ShieldCheck,
          image: '/pillars/governance.png',
          imageAlt: 'Programme governance, QA gates and structured reporting',
          points: [
            'Per-record lineage: date, source, reviewer',
            'Defined QA gates and sampling',
            'Structured reporting and escalation paths',
            'Handover into systems the authority maintains',
          ],
        },
      ]}
      useCases={[
        {
          title: 'A city-wide asset baseline that does not exist yet',
          detail:
            'One survey pass establishing roads, footways, lighting, signage and drainage together, so departments stop maintaining separate partial inventories.',
        },
        {
          title: 'Maintenance budgets allocated on complaint volume',
          detail:
            'Condition captured systematically across the network, so prioritisation rests on surveyed evidence rather than on which street complained loudest.',
        },
        {
          title: 'Accessibility obligations with no baseline data',
          detail:
            'Footway width, crossing, tactile surface and obstruction data captured against the standard being assessed, with photographic evidence per location.',
        },
        {
          title: 'A programme that will be audited after delivery',
          detail:
            'Method, dates, reviewers and sampling recorded as the work runs, so the evidence trail is assembled during delivery instead of reconstructed afterwards.',
        },
      ]}
      useCasesImage="/pillars/usecases.png"
      useCasesImageAlt="Municipal infrastructure and public realm assets"
      capabilities={[
        { name: 'Field Verification', href: '/capabilities/field-verification' },
        { name: 'Street-Level Imagery', href: '/services/global-street-data-collection' },
        { name: 'GeoAI & Computer Vision', href: '/services/geoai-computer-vision' },
        { name: 'GIS Data Engineering', href: '/technologies/gis' },
        { name: 'Quality Operations', href: '/capabilities/quality-operations' },
        { name: 'Program Management', href: '/services/program-management' },
      ]}
      outcomes={[
        'One asset baseline shared across departments rather than several partial ones',
        'Prioritisation supported by surveyed condition evidence, with dates attached',
        'Lineage on every record, so any decision can be re-checked after the fact',
        'Handover into systems the authority can maintain without the original supplier',
      ]}
      services={[
        'Public Realm Survey',
        'Asset Condition Capture',
        'Feature Extraction',
        'Spatial Analytics',
        'Quality Operations',
        'Programme Governance',
      ]}
      scopeNote="JSAN provides survey, geospatial, data and programme services to public-sector bodies. JSAN does not exercise statutory functions, issue approvals or consents, or act as a regulatory authority, and does not represent any public authority except where specifically contracted and legally authorised to do so."
    />
  )
}
