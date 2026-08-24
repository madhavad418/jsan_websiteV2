import { Network, Truck, Layers, Brain, Code } from 'lucide-react'
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
        { value: '20+', label: 'Countries Operated' },
        { value: '24/7', label: 'Managed Operations' },
        { value: '500+', label: 'GIS Specialists' },
      ]}
      image="/pillars/telecom.png"
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
          stage: 'Operate',
          title: 'Mobilise survey crews',
          description:
            'Field teams, planning and dispatch, safety and compliance, and the logistics to keep survey moving across live build programmes.',
          icon: Truck,
        },
        {
          stage: 'Map',
          title: 'Capture the network',
          description:
            'Telecom GIS, pole and asset survey, duct and route capture, LiDAR where clearance and sag matter, with coordinates you can build against.',
          icon: Layers,
        },
        {
          stage: 'Intelligence',
          title: 'Validate and reconcile',
          description:
            'As-built validation against design, attribute completeness checks, duplicate control and QA before anything reaches the network record.',
          icon: Brain,
        },
        {
          stage: 'Engineer',
          title: 'Run it as a system',
          description:
            'Fibre planning tools, web GIS, operational dashboards and integrations that put the validated network in front of planning and operations teams.',
          icon: Code,
        },
      ]}
      capabilities={[
        { name: 'Telecom Network Intelligence', href: '/services/telecom-network-intelligence' },
        { name: 'Smart Fiber Planning', href: '/services/smart-fiber-planning' },
        { name: 'Utility & Asset Intelligence', href: '/services/utility-network-intelligence' },
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
