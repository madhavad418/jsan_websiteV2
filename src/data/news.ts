// Canonical JSAN news content. The /news page, the homepage insights strip and
// the header ticker all read from this single source.
export type NewsArticle = {
  slug: string
  title: string
  date: string
  category: string
  description: string
  image: string
  featured?: boolean
  body: string[]
}

// Canonical JSAN news content. The homepage News section, the header ticker
// and this page all reference the same article(s).
export const newsArticles: NewsArticle[] = [
  {
    slug: 'jsan-atlas-ops',
    title: 'JSAN ATLAS Ops: coverage reporting for field delivery programmes',
    date: 'August 4, 2026',
    category: 'Product',
    description:
      'JSAN’s field platform reports how much of a contracted road network is finished, rather than how many kilometres a fleet happened to travel.',
    image: '/pillars/jsan_atlasops.png',
    body: [
      'JSAN ATLAS Ops is the platform JSAN builds and runs for its own field delivery programmes. Trips record themselves, work carried out with no mobile signal is reconciled when the vehicle returns to range, and progress is reported against the road network a client contracted for.',
      'The distinction matters commercially. Conventional fleet tracking reports kilometres travelled, which is a number with nothing to compare it against; it cannot say how much of the job remains, and it counts the same street again every time a crew passes down it. ATLAS Ops counts each road once, whichever crew reached it first.',
      'For operations teams the platform brings live positions, replay of any completed drive, and coverage dashboards broken down by area and by client priority. For the client conversation it produces progress reporting that reconciles against their own records, asset custody that survives every reassignment, and exports in formats their teams already open.',
      'The platform runs on a phone the driver already carries, so there is no hardware to fit to a vehicle, nothing to recover when one leaves the fleet, and no wait on equipment before a new market can begin work.',
    ],
  },
  {
    slug: 'jsan-launches-modern-vehicle-tracking-platform',
    title: 'JSAN Launches Modern Vehicle Tracking Platform',
    date: 'January 12, 2026',
    category: 'Product Update',
    description:
      'The new JSAN VTS release adds AI-powered route optimization and real-time fleet analytics for enterprise mobility operators.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=600&fit=crop',
    featured: true,
    body: [
      'JSAN today unveiled the moderneration of its Vehicle Tracking System (VTS), introducing AI-powered route optimization, predictive maintenance signals and real-time fleet analytics.',
      'The updated platform helps fleet and mobility operators reduce fuel consumption, improve on-time performance and gain a unified view of vehicles, drivers and assets across large distributed operations.',
      'New capabilities include configurable geofencing, live telemetry dashboards, and open APIs that make it easier to integrate VTS with existing enterprise systems.',
      '“Our customers asked for smarter, more actionable fleet intelligence, and this release delivers it,” said a JSAN spokesperson. “VTS now turns raw location data into decisions that save time and cost every day.”',
    ],
  },
]

