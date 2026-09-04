import { Link } from 'react-router-dom'
import { ArrowRight, Navigation, Brain, GitBranch, GitCompare } from 'lucide-react'

/* JSAN's own platforms. Each links to its existing product page. */
const products = [
  {
    name: 'JSAN VTS',
    category: 'Vehicle Tracking System',
    description:
      'Real-time fleet tracking, driver management and route optimization across web and mobile, powering our own collection fleets.',
    icon: Navigation,
    image: '/pillars/jsan-vts.webp',
    href: '/products/jsan-vts',
    highlights: ['Live GPS Tracking', 'Driver Management', 'Route Optimization'],
  },
  {
    name: 'JSAN POI Express',
    category: 'GIS Data Collection Platform',
    description:
      'AI-assisted POI capture with enterprise quality control and an offline-first mobile experience built for field teams.',
    icon: Brain,
    image: '/pillars/jsan-poi-express.webp',
    href: '/products/poi-express',
    highlights: ['AI POI Detection', 'Offline-First', 'Smart Polygons'],
  },
  {
    name: 'JSAN Travel Desk',
    category: 'Corporate Travel Management',
    description:
      'Role-based travel workflows with multi-stage approvals, quotations and budget control for distributed teams.',
    icon: GitBranch,
    image: '/pillars/jsan-travel-desk.webp',
    href: '/products/travel-desk',
    highlights: ['Multi-Stage Approval', 'Quotation System', 'Budget Control'],
  },
  {
    name: 'JSAN GeoDiscover',
    category: 'Cross-Provider POI Discovery',
    description:
      'Evidence-backed comparison of independent map providers, showing what each one is missing across any area you choose.',
    icon: GitCompare,
    image: '/pillars/jsan-geodiscover.webp',
    href: '/products/geodiscover',
    highlights: ['Dual-Provider Sweep', 'Evidence Tiers', 'Cost Guardrails'],
  },
]

export default function ProductsShowcase() {
  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-14 text-center">
          <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#00d4ff]">
            Built In-House
          </span>
          <h2 className="text-gradient mb-4 mt-4 text-[36px] font-bold lg:text-[42px]">
            Platforms We Build and Run Ourselves
          </h2>
          <p className="mx-auto max-w-3xl text-lg text-gray-600">
            We don't only advise on technology. These are JSAN products, used on our own programmes before they reach a customer.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          {products.map((product) => (
            <Link
              key={product.name}
              to={product.href}
              className="group flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-[#0050a9]/20 hover:shadow-2xl"
            >
              <div className="relative h-44 overflow-hidden bg-[#012f62]">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover object-top transition-transform duration-[900ms] ease-out group-hover:scale-110"
                />
                {/* Product shots are light UI screenshots, so the overlay has to
                    carry most of the contrast for the title to stay readable. */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#012f62] via-[#012f62]/80 to-[#012f62]/35" />
                <div className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-lg border border-white/20 bg-white/15 backdrop-blur-md">
                  <product.icon className="h-5 w-5 text-white" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <div className="mb-1 text-[10px] font-semibold tracking-wider text-[#00d4ff]">
                    {product.category.toUpperCase()}
                  </div>
                  <h3 className="text-xl font-bold leading-tight text-white">{product.name}</h3>
                </div>
              </div>

              <div className="flex flex-1 flex-col p-6">
                <p className="mb-5 text-sm leading-relaxed text-gray-600">{product.description}</p>
                <div className="mb-6 flex flex-wrap gap-1.5">
                  {product.highlights.map((h) => (
                    <span
                      key={h}
                      className="rounded-full border border-blue-100 bg-blue-50 px-2.5 py-1 text-[11px] text-[#0050a9]"
                    >
                      {h}
                    </span>
                  ))}
                </div>
                <span className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-[#0050a9]">
                  Explore Platform
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
