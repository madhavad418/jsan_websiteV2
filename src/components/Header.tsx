import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ChevronDown, ChevronRight } from 'lucide-react'
import NewsTicker from './NewsTicker'

// Items without an href have no page yet  they render as plain, non-clickable text
type GroupItem = { name: string; href?: string }
type NavGroup = { name: string; href?: string; items: GroupItem[] }

type NavItem =
  | { name: string; href: string; dropdown?: never; groups?: never }
  // Items with a menu can also own a landing page: the label navigates, the menu opens
  // on hover, and the chevron toggles it on click.
  | { name: string; href?: string; dropdown: { name: string; href: string }[]; groups?: never }
  | { name: string; href?: string; groups: NavGroup[]; dropdown?: never }

/*
 * Navigation follows the JSAN operating model: OPERATE -> MAP -> INTELLIGENCE -> ENGINEER.
 * Six top-level items plus the CTA, deliberately  the previous header carried eight and
 * split the same work across Services, Technologies and In-House Apps.
 *
 * Capability items without an href have no page of their own yet. They still belong in the
 * story, so they render as plain text (see GroupItem) rather than being dropped.
 */
/*
 * Navigation follows the JSAN operating model: OPERATE -> MAP -> INTELLIGENCE -> ENGINEER,
 * expressed as six capability groups. Six top-level items plus the CTA, deliberately  the
 * old header carried eight and split the same work across Services, Technologies and
 * In-House Apps.
 *
 * Capability items without an href have no page of their own yet. They still belong in the
 * story, so they render as plain text (see GroupItem) rather than being dropped.
 */
const navigation: NavItem[] = [
  {
    name: 'Capabilities',
    href: '/capabilities',
    groups: [
      {
        name: 'Geospatial & Mapping',
        href: '/capabilities/geospatial-mapping',
        items: [
          { name: 'Street-Level Imagery', href: '/services/global-street-data-collection' },
          { name: 'LiDAR & 3D Mapping', href: '/services/geospatial' },
          { name: 'Road Network & Geometry', href: '/capabilities/road-network-geometry' },
          { name: 'POI & Address Intelligence', href: '/services/basemap-poi-annotation' },
          { name: 'GIS Data Engineering', href: '/technologies/gis' },
          { name: 'Field Verification', href: '/capabilities/field-verification' },
        ],
      },
      {
        name: 'Global Fleet & Field Operations',
        href: '/capabilities/global-fleet-field-operations',
        items: [
          { name: 'Fleet Mobilisation', href: '/services/global-fleet-collection-operations' },
          { name: 'Collection Operations', href: '/services/global-street-data-collection' },
          { name: 'Crew Operations', href: '/services/staffing-solutions' },
          { name: 'Planning & Dispatch', href: '/capabilities/planning-dispatch' },
          { name: 'Tracking & Telematics', href: '/products/jsan-vts' },
          { name: 'Maintenance & Logistics', href: '/services/data-center-lifecycle' },
          { name: 'Safety & Compliance', href: '/capabilities/safety-compliance' },
        ],
      },
      {
        name: 'GeoAI & Data Operations',
        href: '/capabilities/geoai-data-operations',
        items: [
          { name: 'Computer Vision', href: '/services/geoai-computer-vision' },
          { name: 'LiDAR Feature Extraction', href: '/capabilities/lidar-feature-extraction' },
  
          { name: 'OCR & Sign Intelligence', href: '/capabilities/ocr-sign-intelligence' },
          { name: 'Location Analytics', href: '/services/location-intelligence' },
          { name: 'Human-in-the-Loop QA', href: '/capabilities/human-in-the-loop-qa' },
          { name: 'Data Validation', href: '/capabilities/data-validation' },
        ],
      },
      {
        name: 'Telecom & Infrastructure',
        href: '/capabilities/telecom-infrastructure',
        items: [
          { name: 'Telecom GIS', href: '/services/telecom-network-intelligence' },
          { name: 'Fiber Engineering', href: '/services/smart-fiber-planning' },
          { name: 'Pole & Asset Intelligence', href: '/services/utility-network-intelligence' },
          { name: '5G & Small Cells', href: '/capabilities/5g-small-cells' },
          { name: 'LiDAR Engineering', href: '/capabilities/lidar-engineering' },
          { name: 'As-Built Validation', href: '/capabilities/as-built-validation' },
          { name: 'Utilities Mapping', href: '/capabilities/utilities-mapping' },
        ],
      },
      {
        name: 'Digital Engineering',
        href: '/capabilities/digital-engineering',
        items: [
          { name: 'Web GIS', href: '/services/digital-engineering' },
          { name: 'Enterprise Applications', href: '/services/erp' },
          { name: 'Cloud Platforms', href: '/technologies/cloud' },
          { name: 'Mobile Applications', href: '/technologies/web' },
          { name: 'API Integration', href: '/technologies/api-integration' },
          { name: 'Data Engineering', href: '/technologies/data-warehouse' },
          { name: 'Operational Dashboards', href: '/technologies/analytics' },
        ],
      },
      {
        name: 'Program & Managed Services',
        href: '/capabilities/program-managed-services',
        items: [
          { name: 'Program Management', href: '/services/program-management' },
          { name: 'PMO', href: '/capabilities/pmo' },
          { name: 'Quality Operations', href: '/capabilities/quality-operations' },
          { name: 'Data Operations', href: '/capabilities/data-operations' },
          { name: 'Workforce Solutions', href: '/services/staffing-solutions' },
          { name: 'Managed Delivery', href: '/technologies/it-infrastructure' },
        ],
      },
    ],
  },
  {
    name: 'Industries',
    href: '/industries',
    dropdown: [
      { name: 'Mapping & Location Platforms', href: '/industries/mapping-location-platforms' },
      { name: 'Autonomous Mobility', href: '/industries/autonomous-mobility' },
      { name: 'Telecommunications', href: '/industries/telecommunications' },
      { name: 'Transportation & Infrastructure', href: '/industries/transportation-infrastructure' },
      { name: 'Utilities', href: '/industries/utilities' },
      { name: 'Government & Smart Cities', href: '/industries/government-smart-cities' },
      { name: 'Enterprise Technology', href: '/industries/consulting' },
    ],
  },
  {
    name: 'Work',
    href: '/work',
    dropdown: [
      { name: 'All Case Studies', href: '/work' },
      { name: 'Multi-Country Mapping', href: '/work/multi-country-mapping' },
      { name: 'LiDAR & Infrastructure Intelligence', href: '/work/lidar-infrastructure-intelligence' },
      { name: 'Telecom Network Engineering', href: '/work/telecom-network-engineering' },
      { name: 'JSAN ATLAS Ops', href: '/products/fleet-intelligence' },
      { name: 'JSAN VTS', href: '/products/jsan-vts' },
      { name: 'JSAN POI Express', href: '/products/poi-express' },
      { name: 'JSAN Travel Desk', href: '/products/travel-desk' },
      { name: 'JSAN GeoDiscover', href: '/products/geodiscover' },
      { name: 'All Platforms', href: '/in-house-apps' },
    ],
  },
  {
    name: 'Company',
    href: '/company',
    dropdown: [
      { name: 'About JSAN', href: '/company' },
      { name: 'Our Leadership', href: '/company/leadership' },
      { name: 'Careers', href: '/careers' },
      { name: 'Contact', href: '/contact' },
    ],
  },
  {
    name: 'Insights',
    href: '/insights',
    dropdown: [
      { name: 'Insights', href: '/insights' },
      { name: 'News', href: '/news' },
      { name: 'LinkedIn', href: 'https://www.linkedin.com/company/jsan-consulting-group/posts/?feedView=all' },
    ],
  },
  { name: 'Careers', href: '/careers' },
]

/*
 * Which top-level item owns the current URL. Menu hrefs alone are not enough:
 * plenty of pages (sub-services, blog posts, a technology detail) never appear in
 * the menu, so the section is resolved by path prefix instead.
 */
const SECTION_OWNERS: { prefix: string; item: string }[] = [
  { prefix: '/services', item: 'Capabilities' },
  { prefix: '/capabilities', item: 'Capabilities' },
  { prefix: '/technologies', item: 'Capabilities' },
  { prefix: '/industries', item: 'Industries' },
  { prefix: '/work', item: 'Work' },
  { prefix: '/products', item: 'Work' },
  { prefix: '/in-house-apps', item: 'Work' },
  { prefix: '/company', item: 'Company' },
  { prefix: '/about', item: 'Company' },
  { prefix: '/contact', item: 'Company' },
  { prefix: '/insights', item: 'Insights' },
  { prefix: '/blogs', item: 'Insights' },
  { prefix: '/news', item: 'Insights' },
  { prefix: '/careers', item: 'Careers' },
]

const startsWithPath = (pathname: string, prefix: string) =>
  pathname === prefix || pathname.startsWith(prefix + '/')

const sectionFor = (pathname: string) =>
  SECTION_OWNERS.find(({ prefix }) => startsWithPath(pathname, prefix))?.item ?? null

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [mobileOpenDropdown, setMobileOpenDropdown] = useState<string | null>(null)
  const [mobileOpenGroup, setMobileOpenGroup] = useState<string | null>(null)
  // Which capability group the mega panel is showing on the right-hand side
  const [hoveredGroup, setHoveredGroup] = useState<string | null>(null)
  // Covers the nav row *and* the mega panel; anchoring it on the nav row only
  // meant a mousedown inside the panel counted as "outside" and unmounted the
  // link before its click could fire.
  const headerRef = useRef<HTMLElement>(null)
  const closeTimer = useRef<number | undefined>(undefined)
  const location = useLocation()

  // Hover intent: open immediately, close after a short grace period so the
  // pointer can travel from the nav item down into the panel.
  const openMenu = (name: string) => {
    window.clearTimeout(closeTimer.current)
    setOpenDropdown(name)
  }
  const scheduleClose = () => {
    window.clearTimeout(closeTimer.current)
    closeTimer.current = window.setTimeout(() => setOpenDropdown(null), 160)
  }
  const cancelClose = () => window.clearTimeout(closeTimer.current)

  // Route-driven highlighting: which section we are in, and whether a given menu
  // entry points at the page currently open.
  const activeSection = sectionFor(location.pathname)
  const isCurrentPage = (href?: string) =>
    Boolean(href) && !href!.startsWith('http') && startsWithPath(location.pathname, href!)

  const activeItem = navigation.find((item) => item.name === openDropdown)
  const previewGroup =
    activeItem?.groups?.find((group) => group.name === hoveredGroup) ??
    activeItem?.groups?.find((group) => group.items.some((sub) => isCurrentPage(sub.href))) ??
    activeItem?.groups?.[0]

  // Always land back on the first group when the panel (re)opens
  useEffect(() => setHoveredGroup(null), [openDropdown])

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setOpenDropdown(null)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Close dropdown on route change
  useEffect(() => {
    setOpenDropdown(null)
    setMobileOpenDropdown(null)
    setMobileOpenGroup(null)
    setIsMobileMenuOpen(false)
  }, [location.pathname])

  /*
   * The bar is transparent while it sits on a dark hero and turns solid as soon as the
   * visitor scrolls, so the hero reads full-bleed instead of starting under a white slab.
   *
   * `data-hero="dark"` is set by ImageHero on the pages that have one. Every other page
   * gets the solid bar immediately, because navy-on-white is unreadable over a light hero.
   */
  const [scrolled, setScrolled] = useState(false)
  const [darkHero, setDarkHero] = useState(false)

  useEffect(() => {
    const read = () => setDarkHero(document.body.dataset.hero === 'dark')
    read()
    // The hero mounts after the header, and again on every route change.
    const observer = new MutationObserver(read)
    observer.observe(document.body, { attributes: true, attributeFilter: ['data-hero'] })
    return () => observer.disconnect()
  }, [location.pathname])

  useEffect(() => {
    let frame = 0
    const onScroll = () => {
      if (frame) return
      frame = requestAnimationFrame(() => {
        setScrolled(window.scrollY > 24)
        frame = 0
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  // An open menu forces the solid bar: the mega panel is white and needs something to
  // sit against.
  const showLight = !darkHero || scrolled || Boolean(openDropdown) || isMobileMenuOpen

  /* Navigation is charcoal on the solid bar, not blue: the one blue thing up here is
     the CTA. */
  const navLinkClass = `flex items-center gap-1 text-[15px] font-semibold transition-colors ${
    showLight ? 'text-[#0a1a3a] hover:text-[#0050a9]' : 'text-white/90 hover:text-white'
  }`

  return (
    <>
      {/* Announcement Bar (site-wide running news ticker) */}
      <div className="announcement-bar fixed top-0 left-0 right-0 z-50 bg-[#0050a9] text-white h-11 flex items-stretch overflow-hidden">
        <NewsTicker />
      </div>

      {/* Main Header */}
      <header
        ref={headerRef}
        className={`fixed top-11 left-0 right-0 z-50 transition-colors duration-300 ${
          showLight ? 'border-b border-gray-200/80 bg-white' : 'bg-transparent'
        }`}
      >
        {/*
          Transparent does not mean "nothing". A photograph can be bright anywhere, and
          white nav text over the bright half of this hero measured 2.3:1. This gradient
          is the contrast floor: strong enough behind the nav row to clear AA whatever
          image is used, gone by the bottom edge so the bar still reads as open.
        */}
        {!showLight && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-[130%]"
            style={{
              background:
                'linear-gradient(180deg, rgba(3,16,31,0.72) 0%, rgba(3,16,31,0.62) 55%, rgba(3,16,31,0) 100%)',
            }}
          />
        )}
        <div className="relative max-w-7xl mx-auto px-6">
          {/* A fixed 76px bar rather than padding around the content, so the height does
              not move when the logo or CTA changes size. */}
          <nav className="relative flex h-[76px] items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex shrink-0 items-center pr-4">
              <img
                src="/footer-logo.png"
                alt="JSAN"
                width={172}
                height={56}
                className={`h-auto w-[118px] transition-all duration-300 xl:w-[142px] ${
                  showLight ? '' : 'brightness-0 invert'
                }`}
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden items-center gap-x-5 lg:flex xl:gap-x-8">
              {navigation.map((item) => {
                const hasMenu = Boolean(item.dropdown || item.groups)

                if (hasMenu) {
                  const isOpen = openDropdown === item.name
                  const isActive = activeSection === item.name
                  return (
                    <div
                      key={item.name}
                      className="relative"
                      onMouseEnter={() => openMenu(item.name)}
                      onMouseLeave={scheduleClose}
                    >
                      {item.href ? (
                        <span className={`${navLinkClass} py-2 ${isActive ? (showLight ? 'text-[#0050a9]' : 'text-white') : ''}`}>
                          <Link
                            to={item.href}
                            onFocus={() => openMenu(item.name)}
                            aria-current={isActive ? 'page' : undefined}
                            className="outline-none"
                          >
                            {item.name}
                          </Link>
                          <button
                            type="button"
                            onClick={() => setOpenDropdown(isOpen ? null : item.name)}
                            aria-expanded={isOpen}
                            aria-label={`${item.name} menu`}
                            /* -m-2 keeps the visual spacing while giving the control a
                               44px hit area, per WCAG 2.2 target size. */
                            className="-m-2 flex h-11 w-11 items-center justify-center p-2"
                          >
                            <ChevronDown
                              className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                            />
                          </button>
                        </span>
                      ) : (
                        <button
                          onClick={() => setOpenDropdown(isOpen ? null : item.name)}
                          onFocus={() => openMenu(item.name)}
                          aria-expanded={isOpen}
                          aria-current={isActive ? 'true' : undefined}
                          className={`${navLinkClass} py-2 ${isActive ? (showLight ? 'text-[#0050a9]' : 'text-white') : ''}`}
                        >
                          {item.name}
                          <ChevronDown
                            className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                          />
                        </button>
                      )}
                      {/* Underline: shown while the panel is open, and kept on for
                          the section the current page belongs to */}
                      <span
                        className={`pointer-events-none absolute -bottom-1 left-0 h-0.5 transition-all duration-300 ${
                          showLight ? 'bg-[#0050a9]' : 'bg-white'
                        } ${isOpen || isActive ? 'w-full opacity-100' : 'w-0 opacity-0'}`}
                      />
                    </div>
                  )
                }

                if (item.href!.startsWith('/') && !item.href!.includes('#')) {
                  const isActive = activeSection === item.name
                  return (
                    <div key={item.name} className="relative">
                      <Link
                        to={item.href!}
                        onMouseEnter={scheduleClose}
                        aria-current={isActive ? 'page' : undefined}
                        className={`${navLinkClass} py-2 ${isActive ? (showLight ? 'text-[#0050a9]' : 'text-white') : ''}`}
                      >
                        {item.name}
                      </Link>
                      <span
                        className={`pointer-events-none absolute -bottom-1 left-0 h-0.5 transition-all duration-300 ${
                          showLight ? 'bg-[#0050a9]' : 'bg-white'
                        } ${isActive ? 'w-full opacity-100' : 'w-0 opacity-0'}`}
                      />
                    </div>
                  )
                }

                return (
                  <a key={item.name} href={item.href} className={navLinkClass}>
                    {item.name}
                  </a>
                )
              })}

              {/* The only prominent CTA in the header. On the transparent bar it
                  inverts to white so it stays the brightest thing on the row. */}
              <Link
                to="/contact"
                className={`group inline-flex min-h-[44px] shrink-0 items-center gap-2 whitespace-nowrap rounded-full px-5 text-[14px] font-semibold transition-colors duration-300 xl:px-6 xl:text-[15px] ${
                  showLight
                    ? 'bg-[#0050a9] text-white hover:bg-[#013e82]'
                    : 'bg-white text-[#0a1a3a] hover:bg-white/90'
                }`}
              >
                Talk to our team
                <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden relative w-11 h-11 flex items-center justify-center"
              aria-label="Toggle menu"
            >
              <span
                className={`absolute h-[2px] w-7 rounded-full transition-all duration-300 ease-in-out ${showLight ? 'bg-[#0050a9]' : 'bg-white'
                  } ${isMobileMenuOpen ? 'rotate-45 translate-y-0' : '-translate-y-[5px]'}`}
              />
              <span
                className={`absolute h-[2px] w-7 rounded-full transition-all duration-300 ease-in-out ${showLight ? 'bg-[#0050a9]' : 'bg-white'
                  } ${isMobileMenuOpen ? '-rotate-45 translate-y-0' : 'translate-y-[5px]'}`}
              />
            </button>
          </nav>
        </div>

        {/* Full-width mega menu */}
        {activeItem && (
          <div
            className="absolute left-0 right-0 top-full hidden lg:block"
            onMouseEnter={cancelClose}
            onMouseLeave={scheduleClose}
          >
            <div className="animate-[fadeIn_0.18s_ease-out_forwards] border-t border-gray-100 bg-white shadow-[0_24px_48px_-24px_rgba(1,47,98,0.45)]">
              {/* Brand hairline */}
              <span className="block h-0.5 w-full bg-gradient-to-r from-[#0050a9] via-[#00d4ff] to-[#0050a9]" />

              <div className="mx-auto max-w-7xl px-6 py-6">
                <div className="grid grid-cols-12 gap-8">
                  {/* Links */}
                  <div className="col-span-9">
                    {activeItem.groups ? (
                      <div className="flex gap-6">
                        {/* Category rail  hovering a group swaps the list on the right,
                            which keeps the panel roughly one screenful instead of six
                            stacked columns. */}
                        <ul className="w-[15.5rem] shrink-0 space-y-1 border-r border-gray-100 pr-4">
                          {activeItem.groups.map((group) => {
                            const isPreviewed = group.name === previewGroup?.name
                            return (
                              <li key={group.name}>
                                <button
                                  type="button"
                                  onMouseEnter={() => setHoveredGroup(group.name)}
                                  onFocus={() => setHoveredGroup(group.name)}
                                  className={`group flex w-full items-center justify-between gap-2 rounded-lg px-3 py-2 text-left text-[13px] font-semibold transition-all duration-200 ${
                                    isPreviewed
                                      ? 'bg-gradient-to-r from-[#012f62] to-[#0055b4] text-white shadow-[0_10px_22px_-14px_rgba(0,80,169,0.95)]'
                                      : 'text-gray-600 hover:bg-blue-50 hover:text-[#0050a9]'
                                  }`}
                                >
                                  {group.name}
                                  <ChevronRight
                                    className={`h-4 w-4 shrink-0 text-[#00d4ff] transition-all duration-200 ${
                                      isPreviewed
                                        ? 'translate-x-0 opacity-100'
                                        : '-translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-100'
                                    }`}
                                  />
                                </button>
                              </li>
                            )
                          })}
                        </ul>

                        {/* Items of the previewed group */}
                        <div className="min-w-0 flex-1">
                          <h3 className="mb-3 flex items-center justify-between gap-3 border-b border-gray-100 pb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#00d4ff]">
                            {previewGroup?.name}
                            {previewGroup?.href && (
                              <Link
                                to={previewGroup.href}
                                onClick={() => setOpenDropdown(null)}
                                className="group inline-flex items-center gap-1 text-[11px] font-semibold tracking-[0.12em] text-[#0050a9] transition-colors hover:text-[#012f62]"
                              >
                                Overview
                                <ChevronRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                              </Link>
                            )}
                          </h3>
                          <ul
                            key={previewGroup?.name}
                            className="grid animate-[fadeIn_0.2s_ease-out_forwards] grid-cols-2 gap-x-6 gap-y-0.5"
                          >
                            {previewGroup?.items.map((sub) =>
                              sub.href ? (
                                <li key={sub.name}>
                                  <Link
                                    to={sub.href}
                                    onClick={() => setOpenDropdown(null)}
                                    aria-current={isCurrentPage(sub.href) ? 'page' : undefined}
                                    className={`group flex items-center justify-between gap-2 rounded-lg px-3 py-1.5 text-sm transition-all duration-200 hover:bg-blue-50 hover:text-[#0050a9] ${
                                      isCurrentPage(sub.href)
                                        ? 'bg-blue-50 font-semibold text-[#0050a9]'
                                        : 'font-medium text-gray-700'
                                    }`}
                                  >
                                    <span className="relative">
                                      {sub.name}
                                      <span className="pointer-events-none absolute -bottom-0.5 left-0 h-0.5 w-0 rounded-full bg-gradient-to-r from-[#0050a9] to-[#00d4ff] transition-all duration-300 group-hover:w-full" />
                                    </span>
                                    <ChevronRight
                                      className={`h-4 w-4 shrink-0 text-[#00d4ff] transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100 ${
                                        isCurrentPage(sub.href)
                                          ? 'translate-x-0 opacity-100'
                                          : '-translate-x-1 opacity-0'
                                      }`}
                                    />
                                  </Link>
                                </li>
                              ) : (
                                <li key={sub.name}>
                                  <span className="block cursor-default select-none rounded-lg px-3 py-1.5 text-sm font-medium text-gray-400">
                                    {sub.name}
                                  </span>
                                </li>
                              )
                            )}
                          </ul>
                        </div>
                      </div>
                    ) : (
                      <ul className="grid grid-cols-3 gap-x-8 gap-y-0.5">
                        {activeItem.dropdown!.map((sub) =>
                          sub.href.startsWith('http') ? (
                            <li key={sub.name}>
                              <a
                                href={sub.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() => setOpenDropdown(null)}
                                className="group flex items-center justify-between gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 transition-all duration-200 hover:bg-blue-50 hover:text-[#0050a9]"
                              >
                                <span className="relative">
                                  {sub.name}
                                  <span className="pointer-events-none absolute -bottom-0.5 left-0 h-0.5 w-0 rounded-full bg-gradient-to-r from-[#0050a9] to-[#00d4ff] transition-all duration-300 group-hover:w-full" />
                                </span>
                                <ChevronRight className="h-4 w-4 shrink-0 -translate-x-1 text-[#00d4ff] opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100" />
                              </a>
                            </li>
                          ) : (
                            <li key={sub.name}>
                              <Link
                                to={sub.href}
                                onClick={() => setOpenDropdown(null)}
                                aria-current={isCurrentPage(sub.href) ? 'page' : undefined}
                                className={`group flex items-center justify-between gap-2 rounded-lg px-3 py-2.5 text-sm transition-all duration-200 hover:bg-blue-50 hover:text-[#0050a9] ${
                                  isCurrentPage(sub.href)
                                    ? 'bg-blue-50 font-semibold text-[#0050a9]'
                                    : 'font-medium text-gray-700'
                                }`}
                              >
                                <span className="relative">
                                  {sub.name}
                                  <span
                                    className={`pointer-events-none absolute -bottom-0.5 left-0 h-0.5 rounded-full bg-gradient-to-r from-[#0050a9] to-[#00d4ff] transition-all duration-300 group-hover:w-full ${
                                      isCurrentPage(sub.href) ? 'w-full' : 'w-0'
                                    }`}
                                  />
                                </span>
                                <ChevronRight
                                  className={`h-4 w-4 shrink-0 text-[#00d4ff] transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100 ${
                                    isCurrentPage(sub.href) ? 'translate-x-0 opacity-100' : '-translate-x-1 opacity-0'
                                  }`}
                                />
                              </Link>
                            </li>
                          )
                        )}
                      </ul>
                    )}
                  </div>

                  {/* Promo panel */}
                  <div className="col-span-3">
                    <div
                      className="flex h-full flex-col justify-between rounded-2xl p-5 text-white"
                      style={{ background: 'linear-gradient(140deg, #012f62, #0055b4)' }}
                    >
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#00d4ff]">
                          {activeItem.name}
                        </span>
                        <p className="mt-3 text-sm leading-relaxed text-white/80">
                          {activeItem.name === 'Capabilities'
                            ? 'Operate, Map, Intelligence, Engineer  one operating model from field mobilisation to managed technology.'
                            : activeItem.name === 'Industries'
                              ? 'Programmes delivered across mobility, energy, telecom and the public sector.'
                              : activeItem.name === 'Work'
                                ? 'Programmes we have run end to end, plus the platforms behind them.'
                                : activeItem.name === 'Company'
                                  ? 'Who we are, who leads us, and how to reach the team.'
                                  : 'Field notes, company news and updates from our teams.'}
                        </p>
                      </div>
                      {/* The section's own landing page, or the menu's first destination */}
                      <Link
                        to={activeItem.href ?? '/'}
                        onClick={() => setOpenDropdown(null)}
                        className="group mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-[#0050a9] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_26px_-10px_rgba(0,212,255,0.9)]"
                      >
                        View all
                        <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white border-t shadow-lg">
            <div className="max-w-7xl mx-auto px-6 py-4 space-y-2">
              {navigation.map((item) => {
                // Grouped dropdown (Services), mobile: heading accordion inside the nav accordion
                if (item.groups) {
                  const mobileGroups = item.groups
                  return (
                    <div key={item.name}>
                      <button
                        onClick={() => {
                          setMobileOpenDropdown(mobileOpenDropdown === item.name ? null : item.name)
                          setMobileOpenGroup(null)
                        }}
                        className={`flex w-full items-center justify-between border-b border-gray-100 py-3 font-semibold ${
                          activeSection === item.name
                            ? 'border-l-[3px] border-l-[#0050a9] pl-3 text-[#012f62]'
                            : 'text-[#0050a9]'
                        }`}
                      >
                        {item.name}
                        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileOpenDropdown === item.name ? 'rotate-180' : ''}`} />
                      </button>
                      {mobileOpenDropdown === item.name && (
                        <div className="pl-4 pb-2">
                          {item.href && (
                            <Link
                              to={item.href}
                              onClick={() => setIsMobileMenuOpen(false)}
                              className="block py-2.5 text-sm font-semibold text-[#0050a9]"
                            >
                              All {item.name}
                            </Link>
                          )}
                          {mobileGroups.map((group) => (
                            <div key={group.name}>
                              <button
                                onClick={() => setMobileOpenGroup(mobileOpenGroup === group.name ? null : group.name)}
                                className="flex items-center justify-between gap-2 w-full py-2.5 text-left text-[#0050a9] font-semibold text-sm"
                              >
                                {group.name}
                                <ChevronDown className={`w-4 h-4 flex-shrink-0 transition-transform duration-200 ${mobileOpenGroup === group.name ? 'rotate-180' : ''}`} />
                              </button>
                              {mobileOpenGroup === group.name && (
                                <div className="pl-4 pb-1">
                                  {group.href && (
                                    <Link
                                      to={group.href}
                                      onClick={() => setIsMobileMenuOpen(false)}
                                      className="block rounded-md py-2.5 text-sm font-semibold text-[#0050a9]"
                                    >
                                      {group.name} overview
                                    </Link>
                                  )}
                                  {group.items.map((sub) =>
                                    sub.href ? (
                                      <Link
                                        key={sub.name}
                                        to={sub.href}
                                        aria-current={isCurrentPage(sub.href) ? 'page' : undefined}
                                        className={`block rounded-md py-2.5 text-sm ${
                                          isCurrentPage(sub.href)
                                            ? 'bg-blue-50 px-2 font-semibold text-[#0050a9]'
                                            : 'font-medium text-[#0050a9]/80'
                                        }`}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                      >
                                        {sub.name}
                                      </Link>
                                    ) : (
                                      <span
                                        key={sub.name}
                                        className="block py-2.5 text-[#0050a9]/80 font-medium text-sm select-none"
                                      >
                                        {sub.name}
                                      </span>
                                    )
                                  )}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )
                }

                // Dropdown item (Insights)  mobile
                if (item.dropdown) {
                  const mobileDropdownItems = item.dropdown
                  return (
                    <div key={item.name}>
                      <button
                        onClick={() => setMobileOpenDropdown(mobileOpenDropdown === item.name ? null : item.name)}
                        className={`flex w-full items-center justify-between border-b border-gray-100 py-3 font-semibold ${
                          activeSection === item.name
                            ? 'border-l-[3px] border-l-[#0050a9] pl-3 text-[#012f62]'
                            : 'text-[#0050a9]'
                        }`}
                      >
                        {item.name}
                        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileOpenDropdown === item.name ? 'rotate-180' : ''}`} />
                      </button>
                      {mobileOpenDropdown === item.name && (
                        <div className="pl-4 pb-2">
                          {mobileDropdownItems.map((sub) =>
                            sub.href.startsWith('http') ? (
                              <a
                                key={sub.name}
                                href={sub.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block py-2.5 text-[#0050a9]/80 font-medium text-sm"
                                onClick={() => setIsMobileMenuOpen(false)}
                              >
                                {sub.name}
                              </a>
                            ) : (
                              <Link
                                key={sub.name}
                                to={sub.href}
                                aria-current={isCurrentPage(sub.href) ? 'page' : undefined}
                                className={`block rounded-md py-2.5 text-sm ${
                                  isCurrentPage(sub.href)
                                    ? 'bg-blue-50 px-2 font-semibold text-[#0050a9]'
                                    : 'font-medium text-[#0050a9]/80'
                                }`}
                                onClick={() => setIsMobileMenuOpen(false)}
                              >
                                {sub.name}
                              </Link>
                            )
                          )}
                        </div>
                      )}
                    </div>
                  )
                }

                // Regular mobile links
                if (item.href!.startsWith('/') && !item.href!.includes('#')) {
                  return (
                    <Link
                      key={item.name}
                      to={item.href!}
                      aria-current={activeSection === item.name ? 'page' : undefined}
                      className={`block border-b border-gray-100 py-3 font-semibold ${
                        activeSection === item.name
                          ? 'border-l-[3px] border-l-[#0050a9] pl-3 text-[#012f62]'
                          : 'text-[#0050a9]'
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  )
                }

                return (
                  <a
                    key={item.name}
                    href={item.href}
                    className="block py-3 text-[#0050a9] font-semibold border-b border-gray-100"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </a>
                )
              })}
            </div>
          </div>
        )}
      </header>

      {/* Contact Us Sidebar */}
      <Link to="/contact" className="contact-sidebar hidden lg:block">
        Contact us
      </Link>
    </>
  )
}
