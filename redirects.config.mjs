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
  // Consolidated Spatial Applications & Engineering capabilities.
  { from: '/capabilities/application-support', to: '/capabilities/esri-gis-application-development', status: 301 },
  { from: '/capabilities/esri-platform-support', to: '/capabilities/esri-gis-application-development', status: 301 },
  { from: '/capabilities/arcgis-solution-development', to: '/capabilities/esri-gis-application-development', status: 301 },
  { from: '/capabilities/geodatabase-data-modelling', to: '/capabilities/esri-gis-application-development', status: 301 },
  { from: '/capabilities/arcgis-field-operations', to: '/capabilities/esri-gis-application-development', status: 301 },
  { from: '/capabilities/scan-to-bim', to: '/capabilities/bim-digital-twin-engineering', status: 301 },
  { from: '/capabilities/bim-gis-integration', to: '/capabilities/bim-digital-twin-engineering', status: 301 },
  { from: '/capabilities/digital-twin-asset-information', to: '/capabilities/bim-digital-twin-engineering', status: 301 },
  { from: '/capabilities/integration-services', to: '/capabilities/spatial-apis-systems-integration', status: 301 },

  // The LiDAR, Telecom & Infrastructure pillar became LiDAR & 3D Intelligence. Telecom work
  // is now presented under Industries > Telecommunications; the LiDAR pillar is the closer
  // match for what the old page described (capture, measurement and validation).
  { from: '/capabilities/telecom-infrastructure', to: '/capabilities/lidar-3d-intelligence', status: 301 },

  // The GeoAI & Data Operations pillar was renamed Visual & AI-Assisted Data Annotation.
  { from: '/capabilities/geoai-data-operations', to: '/capabilities/visual-ai-assisted-data-annotation', status: 301 },

  // Legacy aerial survey and digital twin sub-services rebuilt as LiDAR & 3D Intelligence pages.
  { from: '/services/geospatial/aerial-surveys', to: '/capabilities/aerial-drone-lidar-mapping', status: 301 },
  { from: '/services/geospatial/digital-twins', to: '/capabilities/3d-modelling-digital-twins', status: 301 },

  // Legacy Geospatial & Mapping sub-service pages rebuilt as capability pages.
  { from: '/services/location-intelligence/navigation-data', to: '/capabilities/navigation-data', status: 301 },
  { from: '/services/geospatial/spatial-analytics', to: '/capabilities/spatial-analysis', status: 301 },
  { from: '/services/geospatial/enterprise-gis', to: '/capabilities/enterprise-gis-data-management', status: 301 },
  { from: '/services/geospatial/remote-sensing', to: '/capabilities/remote-sensing-earth-observation', status: 301 },
  { from: '/services/location-intelligence/data-capture', to: '/capabilities/geospatial-data-capture', status: 301 },

  // Company section renamed
  { from: '/about', to: '/company', status: 301 },

  // Insights is the canonical index; articles keep their /blogs/<slug> URLs
  { from: '/blogs', to: '/insights', status: 301 },

  // The in-house platform index was briefly at /projects, which collided with the case
  // studies. It is Products now, on the /products index it already owned the children of.
  { from: '/projects', to: '/products', status: 301 },

  // GIS Tools Support was folded into Application Support, which covers the whole GIS
  // application estate rather than splitting it across two pages.
  {
    from: '/capabilities/gis-tools-support',
    to: '/capabilities/esri-gis-application-development',
    status: 301,
  },

  // The newsroom was merged into Insights, which now carries both streams. Individual
  // stories keep their /news/<slug> URLs and are still served.
  { from: '/news', to: '/insights', status: 301 },

  // Industry URLs now say what they are
  { from: '/industries/energy', to: '/industries/utilities', status: 301 },
  { from: '/industries/transport', to: '/industries/transportation-infrastructure', status: 301 },
  { from: '/industries/smartcities', to: '/industries/government-smart-cities', status: 301 },

  // The thin Utilities Mapping capability page duplicated the utility service page; its
  // content was folded into that page, which is now titled Utilities Mapping.
  {
    from: '/capabilities/utilities-mapping',
    to: '/services/utility-network-intelligence',
    status: 301,
  },

  // "Advance Analytics" was a typo for "Advanced Analytics"; the slug moved with the label
  {
    from: '/services/location-intelligence/advance-analytics',
    to: '/services/location-intelligence/advanced-analytics',
    status: 301,
  },

  // Pre-2026 static site. These .html URLs are still indexed with the old "Global IT
  // Partner" titles (list taken from Google results and the Wayback Machine). Matched
  // case-insensitively, since both /Services.html and /services.html are indexed.
  // /index.html is answered with a mod_rewrite rule on Apache - see sync-redirects.mjs.
  { from: '/index.html', to: '/', status: 301 },
  { from: '/About.html', to: '/company', status: 301 },
  { from: '/company/About-Us.html', to: '/company', status: 301 },
  { from: '/Contact.html', to: '/contact', status: 301 },
  { from: '/contact/Contact-form.html', to: '/contact', status: 301 },
  { from: '/Locations.html', to: '/contact', status: 301 },
  { from: '/contact/Locations.html', to: '/contact', status: 301 },
  { from: '/Privacy-Policy.html', to: '/privacy-policy', status: 301 },
  { from: '/Services.html', to: '/services', status: 301 },
  { from: '/Technologies.html', to: '/technologies', status: 301 },
  { from: '/services/Business-Advisory.html', to: '/services/business-advisory', status: 301 },
  { from: '/services/GIS.html', to: '/services/geospatial', status: 301 },
  { from: '/services/Programme-Management.html', to: '/services/program-management', status: 301 },
  { from: '/services/Staffing-Solutions.html', to: '/services/staffing-solutions', status: 301 },
  { from: '/services/Technology-Consultancy.html', to: '/services/technology-consultancy', status: 301 },
  { from: '/technologies/API-Integration.html', to: '/technologies/api-integration', status: 301 },
  { from: '/technologies/Analytics-Information-Management.html', to: '/technologies/analytics', status: 301 },
  { from: '/technologies/Cloud-Technologies.html', to: '/technologies/cloud', status: 301 },
  { from: '/technologies/Cyber-Security.html', to: '/technologies/cyber-security', status: 301 },
  { from: '/technologies/Data-warehouse.html', to: '/technologies/data-warehouse', status: 301 },
  { from: '/technologies/DevOps.html', to: '/technologies/devops', status: 301 },
  { from: '/technologies/ERP-SAP-P_Soft-Oracle_Siebel-Ariba.html', to: '/services/erp', status: 301 },
  { from: '/technologies/GIS-Technologies.html', to: '/technologies/gis', status: 301 },
  { from: '/technologies/IT-Infrastructure-and-Managed-Services.html', to: '/technologies/it-infrastructure', status: 301 },
  { from: '/technologies/Intelligent-automation-and-robotics.html', to: '/technologies/automation', status: 301 },
  { from: '/technologies/Web-Technologies.html', to: '/technologies/web', status: 301 },
  // Misspelled directory and a WordPress-era feed from the old site.
  { from: '/industires', to: '/industries', status: 301 },
  { from: '/feed', to: '/insights', status: 301 },
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
  { from: '/services/geospatial/ai-ml-detection', to: '/capabilities/visual-ai-assisted-data-annotation', status: 301 },
  { from: '/services/geospatial/geobim-indoor', to: '/capabilities/digital-engineering', status: 301 },
  { from: '/services/geospatial/network-mapping', to: '/industries/telecommunications', status: 301 },
  { from: '/services/geospatial/asset-management', to: '/capabilities/lidar-3d-intelligence', status: 301 },
  { from: '/services/geospatial/smart-city', to: '/industries/government-smart-cities', status: 301 },
  { from: '/services/global-street-data-collection', to: '/capabilities/geospatial-mapping', status: 301 },
  { from: '/services/basemap-poi-annotation/*', to: '/capabilities/geospatial-mapping', status: 301 },

  // Fleet & field operations
  { from: '/services/global-fleet-collection-operations', to: '/capabilities/global-fleet-field-operations', status: 301 },

  // GeoAI & data operations
  { from: '/services/geoai-computer-vision', to: '/capabilities/visual-ai-assisted-data-annotation', status: 301 },
  { from: '/services/location-intelligence', to: '/capabilities/visual-ai-assisted-data-annotation', status: 301 },
  { from: '/services/location-intelligence/advance-analytics', to: '/capabilities/visual-ai-assisted-data-annotation', status: 301 },
  { from: '/services/location-intelligence/custom-platforms', to: '/capabilities/digital-engineering', status: 301 },
  { from: '/services/location-intelligence/strategy-advisory', to: '/capabilities/program-managed-services', status: 301 },

  // Telecom & utilities (sector work, presented under Industries)
  { from: '/services/telecom-network-intelligence', to: '/industries/telecommunications', status: 301 },
  { from: '/services/smart-fiber-planning/*', to: '/industries/telecommunications', status: 301 },
  { from: '/services/utility-network-intelligence/*', to: '/industries/utilities', status: 301 },

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
