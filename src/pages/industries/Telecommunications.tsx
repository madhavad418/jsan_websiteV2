import { Network, Truck, Layers, Scan, Antenna, Code } from 'lucide-react'
import { allocationStats, industrySplit } from '../../config/countAllocations'
import IndustryJourney from '../../components/IndustryJourney'

export default function Telecommunications() {
  return (
    <IndustryJourney
      breadcrumb="Telecommunications"
      eyebrow="Industry"
      eyebrowIcon={Network}
      title="From field reality to a network you can plan against"
      subtitle="Every layer mapped, tower to subscriber."
      description="For operators, tower companies and fibre builders that need accurate as-built records, survey-grade asset data and engineering support across planning, deployment and ongoing operations."
      stats={[
        ...allocationStats(industrySplit, 'telecommunications'),
        { value: '24/7', label: 'Managed Operations' },
      ]}
      image="/pillars/telecom.webp"
      copySide="left"
      imagePosition="50% 60%"
      imageAlt="Telecom network infrastructure and asset intelligence"
      challenges={[
        {
          title: 'As-built rarely matches design',
          description:
            'What was planned and what was installed diverge on every build. Without field validation, planning systems inherit errors that compound across the network.',
        },
        {
          title: 'Assets are recorded inconsistently',
          description:
            'Poles, cabinets, ducts and splice points arrive from contractors in mixed formats and coordinate quality, leaving gaps that only surface during a fault.',
        },
        {
          title: 'Rollouts outpace the record',
          description:
            'Fibre and small-cell programmes move faster than documentation, so the GIS that engineering depends on is perpetually behind the physical network.',
        },
      ]}
      journey={[
        {
          stage: 'Field survey',
          title: 'Walk the network as it is',
          description:
            'Survey crews mobilised against live build schedules, capturing what is physically installed rather than what the design says should be there.',
          icon: Truck,
          image: '/pillars/feildops.webp',
          imageAlt: 'Telecom survey crew capturing network assets in the field',
          points: [
            'Crews mobilised against build schedules',
            'Pole, cabinet, duct and chamber survey',
            'Coordinates captured to a stated accuracy',
            'Safety, permits and access handled locally',
          ],
        },
        {
          stage: 'LiDAR',
          title: 'Measure what a tape measure cannot',
          description:
            'Mobile and terrestrial LiDAR where clearance, sag and attachment height decide whether a design is buildable  measured, not estimated from a photograph.',
          icon: Scan,
          image: '/pillars/lidar_engineering.webp',
          imageAlt: 'LiDAR point cloud of a pole line with clearance measurement',
          points: [
            'Clearance and sag measurement',
            'Attachment height and spacing',
            'Vegetation encroachment along the route',
            'Engineering-grade positional quality',
          ],
        },
        {
          stage: 'Pole, fibre & assets',
          title: 'Every asset, attributed and located',
          description:
            'Pole loading and attachment analysis, duct and route capture, fibre asset inventory  the physical record engineering and planning teams build against.',
          icon: Antenna,
          image: '/pillars/pole_utility.webp',
          imageAlt: 'Pole and attachment inventory with asset attribution',
          points: [
            'Pole loading and make-ready inputs',
            'Duct, chamber and route capture',
            'Fibre and cabinet asset inventory',
            'Attribute completeness against your schema',
          ],
        },
        {
          stage: 'GIS',
          title: 'One network record, reconciled',
          description:
            'Survey, design and existing records conflated into a single network view, with exceptions raised rather than quietly absorbed into the data.',
          icon: Layers,
          image: '/pillars/telecom.webp',
          imageAlt: 'Telecom network GIS with reconciled asset records',
          points: [
            'As-built reconciled against design',
            'Duplicate and conflict resolution',
            'Topology and connectivity validation',
            'Exceptions reported, not absorbed',
          ],
        },
        {
          stage: 'Engineering',
          title: 'Put it in front of the people building',
          description:
            'Fibre planning workflows, web GIS and operational dashboards, so planners and field teams work from the reconciled network rather than a stale extract.',
          icon: Code,
          image: '/pillars/telecom_network_engineering.webp',
          imageAlt: 'Fibre planning and operational dashboards for network teams',
          points: [
            'FTTx planning and route design support',
            'Web GIS for planning and field teams',
            'Operational dashboards and reporting',
            'Integration into the system of record',
          ],
        },
      ]}
      useCases={[
        {
          title: 'As-built records that have drifted from design',
          detail:
            'Survey reconciled against design across an active build, with the differences listed as exceptions rather than silently overwriting the record.',
        },
        {
          title: 'Make-ready and pole loading at programme scale',
          detail:
            'Pole, attachment and clearance data captured and measured consistently across thousands of structures, in a form the engineering workflow can consume.',
        },
        {
          title: 'A rollout moving faster than its documentation',
          detail:
            'Crews working to the build schedule so the record is updated in step with construction, not months afterwards.',
        },
        {
          title: 'Planning teams working from stale extracts',
          detail:
            'The validated network delivered into web GIS and dashboards, so planning, field and operations look at the same picture on the same day.',
        },
      ]}
      useCasesImage="/pillars/fibre_optic.webp"
      useCasesImageAlt="Fibre network build with surveyed and validated assets"
      capabilities={[
        { name: 'Telecom Network Intelligence', href: '/services/telecom-network-intelligence' },
        { name: 'Smart Fiber Planning', href: '/services/smart-fiber-planning' },
        { name: 'Pole & Asset Intelligence', href: '/services/pole-asset-intelligence' },
        { name: 'GIS Data Engineering', href: '/technologies/gis' },
        { name: 'Operational Dashboards', href: '/technologies/analytics' },
        { name: 'Managed Delivery', href: '/technologies/it-infrastructure' },
      ]}
      outcomes={[
        'An as-built record reconciled against design, with exceptions raised rather than absorbed',
        'Survey-grade asset positions usable for planning, permitting and maintenance',
        'Attribute and coordinate quality checked before it enters the network record',
        'Planning and operations working from the same validated network view',
      ]}
    />
  )
}
