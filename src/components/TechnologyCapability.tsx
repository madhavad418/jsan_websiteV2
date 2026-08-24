import { Link } from 'react-router-dom'
import { ArrowRight, Globe2, Database, Code, Activity } from 'lucide-react'

/**
 * SECTION 12  TECHNOLOGY
 *
 * Capability first, not a logo wall. Each category says what the technology is used FOR;
 * named tools sit underneath as supporting detail, never as the headline.
 */
const categories = [
  {
    name: 'Spatial',
    icon: Globe2,
    outcome: 'Capturing and modelling the physical world so it can be measured and planned against.',
    capabilities: ['GIS', 'Map visualisation', 'Spatial databases', 'LiDAR', '3D'],
    tools: ['QGIS', 'PostGIS', 'Mapbox', 'MapLibre', 'Esri'],
    href: '/technologies/gis',
  },
  {
    name: 'Data',
    icon: Database,
    outcome: 'Moving field data into governed, checked datasets that downstream teams can trust.',
    capabilities: ['Data pipelines', 'Data quality', 'Analytics', 'AI/ML'],
    tools: ['Snowflake', 'BigQuery', 'Power BI', 'Python'],
    href: '/technologies/analytics',
  },
  {
    name: 'Engineering',
    icon: Code,
    outcome: 'Building the applications, services and infrastructure that put the data to work.',
    capabilities: ['Web', 'Mobile', 'APIs', 'Cloud', 'Automation'],
    tools: ['React', 'Node.js', 'AWS', 'Azure', 'Kubernetes'],
    href: '/technologies/cloud',
  },
  {
    name: 'Operations',
    icon: Activity,
    outcome: 'Running field programmes with visibility, evidence and control over daily execution.',
    capabilities: ['Fleet tracking', 'Dashboards', 'Workflow management', 'Evidence management'],
    tools: ['JSAN VTS', 'JSAN POI Express', 'JSAN GeoDiscover'],
    href: '/in-house-apps',
  },
]

export default function TechnologyCapability() {
  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-14 max-w-3xl lg:mb-16">
          <span className="mb-4 inline-block text-[11px] font-bold uppercase tracking-[0.25em] text-[#00a3e0]">
            Technology
          </span>
          <h2 className="mb-5 text-[28px] font-bold leading-[1.12] tracking-tight text-[#0a1a3a] lg:text-[42px]">
            Technology that strengthens operations
          </h2>
          <p className="text-lg leading-relaxed text-gray-600">
            Tooling is chosen for what it lets a programme do in the field and in delivery &mdash; not for the
            logo it puts on a slide.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {categories.map((cat) => (
            <div
              key={cat.name}
              className="group rounded-2xl border border-gray-100 bg-gradient-to-b from-white to-gray-50 p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl lg:p-8"
            >
              <div className="mb-5 flex items-center gap-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#012f62] to-[#0055b4] shadow-lg">
                  <cat.icon className="h-6 w-6 text-white" />
                </span>
                <h3 className="text-xl font-bold text-[#0a1a3a]">{cat.name}</h3>
              </div>

              <p className="mb-6 text-base leading-relaxed text-gray-600">{cat.outcome}</p>

              <div className="mb-6 flex flex-wrap gap-2">
                {cat.capabilities.map((c) => (
                  <span
                    key={c}
                    className="rounded-full border border-blue-100 bg-blue-50 px-3.5 py-1.5 text-sm font-medium text-[#0050a9]"
                  >
                    {c}
                  </span>
                ))}
              </div>

              {/* Supporting detail, deliberately quieter than the capability above */}
              <div className="mb-6 border-t border-gray-100 pt-5">
                <div className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">
                  Built with
                </div>
                <div className="flex flex-wrap gap-x-4 gap-y-1.5">
                  {cat.tools.map((tool) => (
                    <span key={tool} className="text-sm text-gray-500">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              <Link
                to={cat.href}
                className="group/link inline-flex items-center gap-2 text-sm font-semibold text-[#0050a9]"
              >
                Explore {cat.name}
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-1" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
