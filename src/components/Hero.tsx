import StatementHero from './StatementHero'

/**
 * SECTION 01  HERO
 *
 * One visual, one message. Deliberately NOT a carousel, not rotating headlines and not a
 * scatter of floating UI panels  the hero states what JSAN is and hands the visitor two
 * ways forward. Layout lives in StatementHero, which the capabilities landing shares.
 */
export default function Hero() {
  return (
    <StatementHero
      viewportHeight
      eyebrow={<>Global Geospatial &bull; Field Operations &bull; Technology</>}
      title={
        <>
          Real-World Operations.
          <br />
          Spatial Intelligence.
          <br />
          Digital Engineering.
        </>
      }
      description={
        <>
          JSAN helps organisations{' '}
          <strong className="font-semibold text-[#0a1a3a]">
            mobilise, collect, process, validate and operationalise
          </strong>{' '}
          real-world data across mapping, mobility, telecom and infrastructure programs.
        </>
      }
      primaryCta={{ label: 'Explore Capabilities', href: '/capabilities' }}
      secondaryCta={{ label: 'Discuss a Program', href: '/contact' }}
      image="/pillars/rbg-home.png"
      imageAlt="JSAN collection vehicle with roof-mounted LiDAR and camera rig on a live road, with the street resolving into mapped geospatial layers"
    />
  )
}
