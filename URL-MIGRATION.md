# URL migration

The site's information architecture changed in the 2026 rebuild. This is the record of
what moved where, what each old URL now answers with, and what still has to be checked
against real search data before it can be switched on.

**One source of truth:** [`redirects.config.mjs`](redirects.config.mjs). Editing anything
else is how the three hosting targets drift apart.

```
redirects.config.mjs
   |-- server.js                    (Railway / Node)          imports it directly
   |-- vercel.json                  (Vercel)                  generated
   |-- public/.htaccess             (cPanel / Apache)         generated
   \-- public/route-manifest.json   (valid ids per section)   generated

npm run redirects     # regenerate all three
npm run build         # regenerates them first, so a stale config cannot ship
```

## Status code policy

| Situation | Answer | Why |
|---|---|---|
| The page moved and a replacement covers it | **301** | Passes ranking signals to the new URL |
| The content is gone and nothing replaces it | **410** | Tells a crawler to drop the URL rather than keep retrying |
| The URL never existed, or the id is unknown | **404** | Honest, and keeps it out of the index |
| Removed content redirected to a generic index | **never do this** | Google treats it as a soft 404, and it wastes the visitor's time |

A client-rendered SPA cannot set its own status code, so every not-found view also renders
[`NoIndex`](src/components/NoIndex.tsx), which adds `robots: noindex, follow`. Belt and
braces: the server gets the status right, and the page is unindexable even if a host is
misconfigured.

## Live redirects (301)

Every one of these is a page that actually moved. They are active now.

| Old | New |
|---|---|
| `/about` | `/company` |
| `/blogs` | `/insights` |
| `/industries/energy` | `/industries/utilities` |
| `/industries/transport` | `/industries/transportation-infrastructure` |
| `/industries/smartcities` | `/industries/government-smart-cities` |
| `/services/location-intelligence/advance-analytics` | `/services/location-intelligence/advanced-analytics` |

Article URLs (`/blogs/<slug>`) deliberately did **not** move. Only the index did.

## Planned: `/services/*` → `/capabilities/*`

Staged in `plannedRedirects` and **not enabled**. The `/services/*` pages are still live
and still hold the detailed content; turning these on today would 301 real pages into
thinner hubs. Move an entry into `redirects` at the same time as its content moves.

| Old | New |
|---|---|
| `/services` | `/capabilities` |
| `/services/geospatial` | `/capabilities/geospatial-mapping` |
| `/services/geospatial/ai-ml-detection` | `/capabilities/geoai-data-operations` |
| `/services/geospatial/spatial-analytics` | `/capabilities/geoai-data-operations` |
| `/services/geospatial/remote-sensing`, `/aerial-surveys` | `/capabilities/geospatial-mapping` |
| `/services/geospatial/enterprise-gis`, `/digital-twins`, `/geobim-indoor` | `/capabilities/digital-engineering` |
| `/services/geospatial/network-mapping`, `/asset-management` | `/capabilities/telecom-infrastructure` |
| `/services/geospatial/smart-city` | `/industries/government-smart-cities` |
| `/services/global-street-data-collection` | `/capabilities/geospatial-mapping` |
| `/services/basemap-poi-annotation/*` | `/capabilities/geospatial-mapping` |
| `/services/global-fleet-collection-operations` | `/capabilities/global-fleet-field-operations` |
| `/services/geoai-computer-vision` | `/capabilities/geoai-data-operations` |
| `/services/location-intelligence` | `/capabilities/geoai-data-operations` |
| `/services/location-intelligence/custom-platforms` | `/capabilities/digital-engineering` |
| `/services/location-intelligence/data-capture`, `/navigation-data` | `/capabilities/geospatial-mapping` |
| `/services/location-intelligence/strategy-advisory` | `/capabilities/program-managed-services` |
| `/services/telecom-network-intelligence` | `/capabilities/telecom-infrastructure` |
| `/services/smart-fiber-planning/*` | `/capabilities/telecom-infrastructure` |
| `/services/utility-network-intelligence/*` | `/capabilities/telecom-infrastructure` |
| `/services/digital-engineering`, `/services/erp` | `/capabilities/digital-engineering` |
| `/services/technology-consultancy/*` | `/capabilities/digital-engineering` |
| `/services/program-management/*` | `/capabilities/program-managed-services` |
| `/services/staffing-solutions/*` | `/capabilities/program-managed-services` |
| `/services/business-advisory` | `/capabilities/program-managed-services` |
| `/services/data-center-lifecycle/*` | `/capabilities/program-managed-services` |

## The gap this repo cannot close

The table above covers URLs **this codebase knows about**. The pre-2026 site may have
indexed URLs that exist nowhere in it, and those are exactly the ones that die silently.

Before the migration is called finished:

1. Search Console → **Indexing → Pages → All known pages**, export the full list.
2. Server access logs, 90 days, all paths returning 200 to a crawler user-agent.
3. Diff both against `public/sitemap.xml`.
4. For each URL in the diff, pick one: a 301 into `redirects`, or a 410 into `gone`.
5. Re-run `npm run redirects` and deploy.
6. Submit the updated sitemap; keep the redirects in place for at least a year.

## Removed job listings

The careers detail page used to answer a removed listing with **200 OK and "Job Not
Found"** in the body  the exact soft-404 pattern to avoid. Now:

- valid ids come from `public/route-manifest.json`, generated at build time from
  `src/data/jobs.ts`;
- an id that is not in the manifest gets a **404**;
- a listing that has been deliberately retired goes in `gone` in the config and gets a
  **410**:

```js
export const gone = [
  { path: '/careers/gis-analyst-poland', note: 'Filled Feb 2026' },
]
```

The same manifest check covers `/blogs`, `/news`, `/work`, `/capabilities` and
`/technologies`.

## Verifying a deploy

```bash
npm run build && npm start          # or hit the deployed host

curl -sI https://www.jsanconsulting.com/about              | head -2   # 301 -> /company
curl -sI https://www.jsanconsulting.com/blogs              | head -2   # 301 -> /insights
curl -sI https://www.jsanconsulting.com/blogs/<real-slug>  | head -2   # 200, must NOT redirect
curl -sI https://www.jsanconsulting.com/careers/not-a-job  | head -2   # 404
curl -sI https://www.jsanconsulting.com/nonexistent        | head -2   # 404
```
