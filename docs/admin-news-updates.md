# Admin-managed news ticker

Open `/admin`, sign in, and choose **News updates**.

1. Add a headline and publication date.
2. Set the destination to an existing website path (for example `/insights` or `/news/jsan-atlas-ops`). Announcements link to existing content; they do not create article pages.
3. Leave **Published** unchecked to save a draft. Check it to publish; a future publication date schedules the update for that date in UTC.
4. Save. The ticker checks for changes on page load, on window focus, and every minute while the page is visible.

The ticker displays the newest six published updates. Edit an update to unpublish it, or delete it to remove it permanently. An empty feed displays a link to JSAN insights, without reviving old bundled announcements.

If the API is unavailable before any successful response, the ticker scrolls existing bundled JSAN announcements with their original publication dates. Once a feed has loaded, subsequent failures retain that response, including an intentionally empty feed.

## Deployment

Deploy the rebuilt site and `public/api/news-updates.php` to the existing PHP API host. The frontend uses the existing `VITE_API_BASE` setting, or same-origin `/api`. The existing admin credentials and database configuration are reused.

The first authenticated visit to **News updates** creates the `news_updates` table if needed. The database account must have CREATE TABLE permission for that first visit. No existing blogs, jobs or news articles are modified. No migration token or new credentials are required.

Local Vite development proxies `/api` to the configured live PHP host: the new PHP endpoint must exist there for real saves to work. The automated browser test intercepts all API requests and does not write to the live server.

## Verification

With the development server running, run `node scripts/test-news-updates.mjs`. This tests the frontend against an intercepted API: draft creation, editing, publication, failed saves, ticker refresh, empty results, future dates and deletion. PHP/MySQL integration still needs checking on a configured PHP host.
