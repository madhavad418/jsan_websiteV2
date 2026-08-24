import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * SECTION 30  TECHNICAL SEO
 *
 * This is a client-rendered SPA, so tags are maintained at runtime. Canonical URL and
 * breadcrumb schema update on every route change; Organization schema is emitted once.
 *
 * Anything that must be present in the raw HTML for a crawler that does not execute JS
 *  the base title, description and Open Graph tags  lives in index.html instead.
 */

const SITE = 'https://www.jsanconsulting.com'

/** Route segment -> readable breadcrumb label. Unmapped segments are title-cased. */
const SEGMENT_LABELS: Record<string, string> = {
  services: 'Capabilities',
  capabilities: 'Capabilities',
  industries: 'Industries',
  technologies: 'Technologies',
  products: 'Work',
  'in-house-apps': 'Work',
  blogs: 'Insights',
  news: 'News',
  careers: 'Careers',
  about: 'Company',
  contact: 'Contact',
}

function labelFor(segment: string) {
  if (SEGMENT_LABELS[segment]) return SEGMENT_LABELS[segment]
  return segment
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
}

function upsertLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.rel = rel
    document.head.appendChild(el)
  }
  el.href = href
}

function upsertJsonLd(id: string, data: unknown) {
  let el = document.head.querySelector<HTMLScriptElement>(`script[data-seo="${id}"]`)
  if (!el) {
    el = document.createElement('script')
    el.type = 'application/ld+json'
    el.dataset.seo = id
    document.head.appendChild(el)
  }
  el.textContent = JSON.stringify(data)
}

export default function Seo() {
  const { pathname } = useLocation()

  useEffect(() => {
    // Canonical: strip any trailing slash so /services and /services/ do not both index.
    const clean = pathname.length > 1 ? pathname.replace(/\/+$/, '') : ''
    upsertLink('canonical', `${SITE}${clean}`)

    const ogUrl = document.head.querySelector<HTMLMetaElement>('meta[property="og:url"]')
    if (ogUrl) ogUrl.content = `${SITE}${clean}`

    // Breadcrumb schema, derived from the path so it cannot drift from the route.
    const segments = clean.split('/').filter(Boolean)
    if (segments.length > 0) {
      let href = ''
      upsertJsonLd('breadcrumb', {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE },
          ...segments.map((segment, i) => {
            href += `/${segment}`
            return {
              '@type': 'ListItem',
              position: i + 2,
              name: labelFor(segment),
              item: `${SITE}${href}`,
            }
          }),
        ],
      })
    } else {
      document.head.querySelector('script[data-seo="breadcrumb"]')?.remove()
    }
  }, [pathname])

  useEffect(() => {
    // Organization schema. Only facts that are already published on the site.
    upsertJsonLd('organization', {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'JSAN Consulting Group',
      alternateName: 'JSAN',
      url: SITE,
      logo: `${SITE}/footer-logo.png`,
      description:
        'JSAN supports global mapping, mobility, telecom and infrastructure programs  from field mobilisation and data collection through engineering, GeoAI, quality assurance and managed operations.',
      email: 'info@jsanconsulting.com',
      sameAs: [
        'https://www.linkedin.com/company/jsan-consulting-group/',
        'https://www.facebook.com/profile.php?id=61589727355136',
        'https://www.instagram.com/jsanconsultinggroup/',
        'https://www.youtube.com/@JSANConsultingGroup',
      ],
    })
  }, [])

  return null
}
