import StatementHero from './StatementHero'

/**
 * SECTION 01 &mdash; HERO
 *
 * The home page's use of the house hero. Layout and styling live in
 * StatementHero, which the capabilities landing page shares.
 */
export default function Hero() {
  return (
    <StatementHero
      eyebrow={<>Global Geospatial &bull; AI &bull; Field Operations &bull; Digital Engineering</>}
      title="From the Real World to Digital Intelligence."
      description={
        <>
          JSAN combines field operations, geospatial intelligence, AI and digital engineering to help
          organisations{' '}
          <strong className="font-semibold text-[#0a1a3a]">
            capture, understand and operationalise the physical world
          </strong>{' '}
          across mapping, mobility, telecom and infrastructure.
        </>
      }
      primaryCta={{ label: 'Explore Our Capabilities', href: '/services' }}
      secondaryCta={{ label: 'Talk to Our Experts', href: '/contact' }}
      strip={[
        'Mapping & GIS',
        'AI & Computer Vision',
        'LiDAR',
        'Digital Twins',
        'Mobility',
        'Telecom',
      ]}
      image="/pillars/rbg-home.png"
      imageAlt="JSAN collection vehicle with LiDAR and camera rig, city basemap, network assets and analytics layers"
    />
  )
}
