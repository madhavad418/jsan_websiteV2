import ImageHero, { HeroAccent } from './ImageHero'

/**
 * SECTION 01  HOME HERO
 *
 * Content only. The full-bleed photographic layout, scrims and CTA treatment live in
 * ImageHero, which the capabilities landing shares.
 *
 * To change the picture: drop a file under /public, point `image` at it, and set
 * `imageSize` to its real pixel dimensions. `focal` / `focalMobile` are CSS
 * object-position values if the subject needs recentring in either crop.
 */
export default function Hero() {
  return (
    <ImageHero
      image="/pillars/homepage.png"
      imageSize={{ width: 1916, height: 821 }}
      focal="58% 50%"
      focalMobile="42% 50%"
      /* The Operating Scale band starts in this navy, so the hero dissolves into it. */
      fadeTo="rgba(1,47,98,0.9)"
      eyebrow={<>Global Geospatial &bull; Field Operations &bull; Technology</>}
      title={
        <>
          Real-World Operations.
          <br />
          Spatial Intelligence.
          <br />
          <HeroAccent>Digital Engineering.</HeroAccent>
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
