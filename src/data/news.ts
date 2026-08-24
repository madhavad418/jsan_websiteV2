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

