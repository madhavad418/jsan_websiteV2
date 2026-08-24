/**
 * URL migration map  the single source of truth for every redirect on the site.
 *
 * Three hosts serve this app and each needs the rules in its own format, so nothing is
 * written by hand twice:
 *
 *   node scripts/sync-redirects.mjs
 *
 * regenerates the `redirects` block in vercel.json and the marked block in
 * public/.htaccess (cPanel/Apache). server.js (Railway/Node) imports this file directly.
 * `npm run build` runs the sync first, so the three can never drift apart.
 *
 * RULES OF THE ROAD
 *   - 301 when a replacement page genuinely covers the old content.
 *   - 410 when the content is gone and nothing replaces it. Do NOT 301 a removed page to
 *     a generic index: Google treats that as a soft 404 and it wastes the visitor's time.
 *   - Never leave a moved URL returning 200 with "Not Found" in the body.
 *
 * `from` matches a full path. A trailing `/*` matches that prefix and everything under
 * it; `$1` in `to` receives the matched remainder.
 */

/** Live 301s. Every one of these is a page that actually moved in the 2026 rebuild. */
export const redirects = [
  // Company section renamed
  { from: '/about', to: '/company', status: 301 },

  // Insights is the canonical index; articles keep their /blogs/<slug> URLs
  { from: '/blogs', to: '/insights', status: 301 },

  // Industry URLs now say what they are
  { from: '/industries/energy', to: '/industries/utilities', status: 301 },
  { from: '/industries/transport', to: '/industries/transportation-infrastructure', status: 301 },
  { from: '/industries/smartcities', to: '/industries/government-smart-cities', status: 301 },

  // "Advance Analytics" was a typo for "Advanced Analytics"; the slug moved with the label
  {
    from: '/services/location-intelligence/advance-analytics',
    to: '/services/location-intelligence/advanced-analytics',
    status: 301,
  },
]

/**
 * Stage two of the migration: the legacy /services/* tree folding into /capabilities/*.
 *
 * NOT ENABLED. Those pages are still live and still hold the detailed content, so
 * switching them on today would 301 real pages into thinner hubs. Move an entry into
 * `redirects` above at the same time as the content moves, family by family.
 *
 * Verify each line against Search Console (Pages -> indexed) and the server access log
 * before enabling it: this list covers the URLs this repo knows about, and the pre-2026
 * site may have indexed URLs that exist nowhere in this codebase.
 */
export const plannedRedirects = [
  // Geospatial & mapping
  { from: '/services/geospatial', to: '/capabilities/geospatial-mapping', status: 301 },
  { from: '/services/geospatial/ai-ml-detection', to: '/capabilities/geoai-data-operations', status: 301 },
  { from: '/services/geospatial/spatial-analytics', to: '/capabilities/geoai-data-operations', status: 301 },
  { from: '/services/geospatial/remote-sensing', to: '/capabilities/geospatial-mapping', status: 301 },
  { from: '/services/geospatial/aerial-surveys', to: '/capabilities/geospatial-mapping', status: 301 },
  { from: '/services/geospatial/enterprise-gis', to: '/capabilities/digital-engineering', status: 301 },
  { from: '/services/geospatial/digital-twins', to: '/capabilities/digital-engineering', status: 301 },
  { from: '/services/geospatial/geobim-indoor', to: '/capabilities/digital-engineering', status: 301 },
  { from: '/services/geospatial/network-mapping', to: '/capabilities/telecom-infrastructure', status: 301 },
  { from: '/services/geospatial/asset-management', to: '/capabilities/telecom-infrastructure', status: 301 },
  { from: '/services/geospatial/smart-city', to: '/industries/government-smart-cities', status: 301 },
  { from: '/services/global-street-data-collection', to: '/capabilities/geospatial-mapping', status: 301 },
  { from: '/services/basemap-poi-annotation/*', to: '/capabilities/geospatial-mapping', status: 301 },

  // Fleet & field operations
  { from: '/services/global-fleet-collection-operations', to: '/capabilities/global-fleet-field-operations', status: 301 },

  // GeoAI & data operations
  { from: '/services/geoai-computer-vision', to: '/capabilities/geoai-data-operations', status: 301 },
  { from: '/services/location-intelligence', to: '/capabilities/geoai-data-operations', status: 301 },
  { from: '/services/location-intelligence/advance-analytics', to: '/capabilities/geoai-data-operations', status: 301 },
  { from: '/services/location-intelligence/data-capture', to: '/capabilities/geospatial-mapping', status: 301 },
  { from: '/services/location-intelligence/navigation-data', to: '/capabilities/geospatial-mapping', status: 301 },
  { from: '/services/location-intelligence/custom-platforms', to: '/capabilities/digital-engineering', status: 301 },
  { from: '/services/location-intelligence/strategy-advisory', to: '/capabilities/program-managed-services', status: 301 },

  // Telecom & infrastructure
  { from: '/services/telecom-network-intelligence', to: '/capabilities/telecom-infrastructure', status: 301 },
  { from: '/services/smart-fiber-planning/*', to: '/capabilities/telecom-infrastructure', status: 301 },
  { from: '/services/utility-network-intelligence/*', to: '/capabilities/telecom-infrastructure', status: 301 },

  // Digital engineering
  { from: '/services/digital-engineering', to: '/capabilities/digital-engineering', status: 301 },
  { from: '/services/erp', to: '/capabilities/digital-engineering', status: 301 },
  { from: '/services/technology-consultancy/*', to: '/capabilities/digital-engineering', status: 301 },

  // Program, managed services & workforce
  { from: '/services/program-management', to: '/capabilities/program-managed-services', status: 301 },
  { from: '/services/program-management/*', to: '/capabilities/program-managed-services', status: 301 },
  { from: '/services/staffing-solutions', to: '/capabilities/program-managed-services', status: 301 },
  { from: '/services/staffing-solutions/*', to: '/capabilities/program-managed-services', status: 301 },
  { from: '/services/business-advisory', to: '/capabilities/program-managed-services', status: 301 },
  { from: '/services/data-center-lifecycle/*', to: '/capabilities/program-managed-services', status: 301 },

  // Section landing
  { from: '/services', to: '/capabilities', status: 301 },
]

/**
 * Content that is genuinely gone. Served as 410, which tells a crawler to drop the URL
 * rather than keep retrying it. Job listings belong here once they are taken down.
 *
 * Example:
 *   { path: '/careers/gis-analyst-poland', note: 'Filled Feb 2026' },
 */
export const gone = []

/**
 * Paths whose children are validated against a manifest generated at build time.
 * An id that is not in the manifest gets a 404 instead of a 200 with "Not Found".
 * See scripts/sync-redirects.mjs, which writes public/route-manifest.json.
 */
export const manifestChecked = [
  '/careers',
  '/blogs',
  '/news',
  '/work',
  '/capabilities',
  '/technologies',
]
