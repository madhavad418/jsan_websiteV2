import { Link } from 'react-router-dom'
import { Linkedin, Twitter, Facebook, Instagram, Youtube } from 'lucide-react'

/* Six columns, kept deliberately short. A footer stuffed with every URL on the site
   helps nobody  each column carries the handful of destinations that matter. */
const capabilityLinks = [
  { name: 'Geospatial & Mapping', href: '/capabilities/geospatial-mapping', isRoute: true },
  { name: 'Fleet & Field Operations', href: '/capabilities/global-fleet-field-operations', isRoute: true },
  { name: 'GeoAI & Data Operations', href: '/capabilities/geoai-data-operations', isRoute: true },
  { name: 'Telecom & Infrastructure', href: '/capabilities/telecom-infrastructure', isRoute: true },
  { name: 'Digital Engineering', href: '/capabilities/digital-engineering', isRoute: true },
  { name: 'Program & Managed Services', href: '/capabilities/program-managed-services', isRoute: true },
]

const industryLinks = [
  { name: 'Mapping & Location Platforms', href: '/industries/mapping-location-platforms', isRoute: true },
  { name: 'Autonomous Mobility', href: '/industries/autonomous-mobility', isRoute: true },
  { name: 'Telecommunications', href: '/industries/telecommunications', isRoute: true },
  { name: 'Transportation & Infrastructure', href: '/industries/transportation-infrastructure', isRoute: true },
  { name: 'Utilities', href: '/industries/utilities', isRoute: true },
  { name: 'Government & Smart Cities', href: '/industries/government-smart-cities', isRoute: true },
]

const companyLinks = [
  { name: 'About JSAN', href: '/company', isRoute: true },
  { name: 'Our Leadership', href: '/company', isRoute: true },
  { name: 'Work', href: '/work', isRoute: true },
  { name: 'Contact', href: '/contact', isRoute: true },
]

const resourceLinks = [
  { name: 'Insights', href: '/insights', isRoute: true },
  { name: 'News', href: '/news', isRoute: true },
  { name: 'Technologies', href: '/technologies', isRoute: true },
  { name: 'Sitemap', href: '/sitemap.xml', isRoute: false },
]

const careerLinks = [
  { name: 'Life at JSAN', href: '/company', isRoute: true },
  { name: 'Open Roles', href: '/careers', isRoute: true },
]

const socialLinks = [
  { icon: Linkedin, href: 'https://www.linkedin.com/company/jsan-consulting-group/posts/?feedView=all', label: 'LinkedIn' },
  { icon: Facebook, href: 'https://www.facebook.com/profile.php?id=61589727355136', label: 'Facebook' },
  { icon: Instagram, href: 'https://www.instagram.com/jsanconsultinggroup/', label: 'Instagram' },
  { icon: Youtube, href: 'https://www.youtube.com/@JSANConsultingGroup', label: 'YouTube' },
  { icon: Twitter, href: '#', label: 'Twitter' },
]

const legalLinks = [
  { label: 'Privacy', href: '/privacy-policy' },
  { label: 'Terms', href: '#' },
  { label: 'Cookie Settings', href: '#' },
  { label: 'Accessibility', href: '#' },
]

/* min-h on phones only: a 28px text link is fine with a mouse, not with a thumb. Paired
   with the two-column mobile layout this keeps the footer short as well as tappable. */
const linkClass =
  'group inline-flex min-h-[36px] items-center gap-1.5 text-sm leading-6 text-white/70 transition-colors hover:text-white sm:min-h-0 sm:leading-7'

function FooterLink({ link }: { link: { name: string; href: string; isRoute: boolean } }) {
  const content = (
    <>
      <span className="h-px w-0 bg-[#00d4ff] transition-all duration-300 group-hover:w-3" />
      {link.name}
    </>
  )
  return link.isRoute ? (
    <Link to={link.href} className={linkClass}>
      {content}
    </Link>
  ) : (
    <a href={link.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
      {content}
    </a>
  )
}

function ColumnHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mb-4 t-label text-white/85">
      {children}
    </h3>
  )
}

export default function Footer() {
  return (
    <footer
      className="footer relative overflow-hidden pb-20 lg:pb-0"
      style={{ background: 'linear-gradient(120deg, #012f62, #0055b4)' }}
    >
      {/* Brand pattern + accent glows for depth */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-60"
        style={{
          backgroundImage: 'url(/footer-pattern.svg)',
          backgroundRepeat: 'repeat',
          backgroundSize: '100% auto',
          backgroundPosition: 'top center',
        }}
      />
      <div
        className="pointer-events-none absolute -left-32 -top-40 h-[460px] w-[460px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(0,212,255,0.16), transparent 65%)' }}
      />
      <div
        className="pointer-events-none absolute -bottom-52 -right-24 h-[520px] w-[520px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(0,212,255,0.1), transparent 65%)' }}
      />

      <div className="relative mx-auto max-w-[1440px] px-6">
        <div className="grid grid-cols-2 gap-x-6 gap-y-7 pt-12 pb-10 sm:gap-x-8 sm:pt-14 sm:pb-12 lg:grid-cols-[repeat(15,minmax(0,1fr))] lg:gap-12">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-5">
            <Link to="/" className="inline-block">
              <img src="/logo-white.png" alt="JSAN" width={376} height={120} className="h-auto w-[160px]" />
            </Link>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/70">
              Real-World Operations. Spatial Intelligence. Digital Engineering. Supporting global
              mapping, mobility, telecom and infrastructure programs  from field mobilisation and
              data collection through engineering, GeoAI, quality assurance and managed operations.
            </p>

            <div className="mt-7 flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-11 w-11 items-center justify-center rounded-lg border border-white/15 bg-white/[0.07] text-white/75 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#00d4ff]/50 hover:bg-[#00d4ff]/15 hover:text-white"
                >
                  <social.icon className="h-[18px] w-[18px]" />
                </a>
              ))}
            </div>
          </div>

          {[
            { heading: 'Capabilities', links: capabilityLinks },
            { heading: 'Industries', links: industryLinks },
            { heading: 'Company', links: companyLinks },
            { heading: 'Resources', links: resourceLinks },
            /* Five columns pair off two-up on phones, which leaves Careers on a row of its
               own. It only has two links, so it spans the row and lays them out side by
               side rather than sitting next to an empty half. */
            { heading: 'Careers', links: careerLinks, wide: true },
          ].map((column) => (
            <div
              key={column.heading}
              className={column.wide ? 'col-span-2 lg:col-span-2' : 'lg:col-span-2'}
            >
              <ColumnHeading>{column.heading}</ColumnHeading>
              <ul className={column.wide ? 'flex flex-wrap gap-x-8 lg:block lg:space-y-0.5' : 'space-y-0.5'}>
                {column.links.map((link) => (
                  <li key={link.name}>
                    <FooterLink link={link} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar. Extra bottom padding keeps the floating language
            switcher clear of the copyright line. */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 py-6 pb-16 md:flex-row lg:pb-6 lg:pr-16">
          <span className="text-sm text-white/50">
            &copy; {new Date().getFullYear()} JSAN, all rights reserved
          </span>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {legalLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className="inline-flex min-h-[24px] items-center py-1 text-sm text-white/60 transition-colors hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
