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
      image="/pillars/homepage.webp"
      imageSize={{ width: 1916, height: 821 }}
      focal="58% 50%"
      focalMobile="42% 50%"
      showNetworkOverlay
      /* Light editorial treatment: the daylight photograph is left bright and the copy
         sits in a frosted panel instead of on a navy scrim. */
      tone="light"
      /* No fade into the band below. Grading a bright photograph down into #0a1a3a just
         turned its bottom third to haze, which sat badly between a crisp hero and a band
         whose whole idea is hairlines and no boxes. The two meet on a clean cut instead,
         and VerifiedScale draws the lit rule that marks the join. */
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
          <strong className="font-semibold text-[#0a1a3a]">
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
