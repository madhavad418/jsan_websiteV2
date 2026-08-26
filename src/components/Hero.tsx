import ImageHero, { HeroAccent, HeroTitleLine } from './ImageHero'

/**
 * SECTION 01  HOME HERO
 *
 * The photograph remains the hero. Motion is restrained and editorial:
 * - slow cinematic image drift
 * - tiny pointer / scroll parallax
 * - sequential headline reveal
 * - subtle global network pulses over the map
 * - engineered CTA micro-interactions
 *
 * ImageHero owns the shared layout; this file only provides home-page content.
 */
export default function Hero() {
  return (
    <ImageHero
      image="/pillars/homepage.png"
      imageSize={{ width: 1916, height: 821 }}
      focal="58% 50%"
      focalMobile="42% 50%"
      showNetworkOverlay
      /* The Operating Scale band starts in this navy, so the hero dissolves into it. */
      fadeTo="rgba(1,47,98,0.9)"
      routes
      eyebrow={<>Global Geospatial &bull; Field Operations &bull; Technology</>}
      title={
        <>
          <HeroTitleLine delay={150}>Real-World Operations.</HeroTitleLine>
          <HeroTitleLine delay={280}>Spatial Intelligence.</HeroTitleLine>
          <HeroTitleLine delay={410}>
            <HeroAccent>Digital Engineering.</HeroAccent>
          </HeroTitleLine>
        </>
      }
      description={
        <>
          JSAN helps organisations{' '}
          <strong className="font-semibold text-white">
            mobilise, collect, process, validate and operationalise
          </strong>{' '}
          real-world data across mapping, mobility, telecom and infrastructure programs.
        </>
      }
      primaryCta={{ label: 'Explore Capabilities', href: '/capabilities' }}
      secondaryCta={{ label: 'Discuss a Program', href: '/contact' }}
    />
  )
}
