import { useParams, Link } from 'react-router-dom'
import {
  ArrowRight, CheckCircle, Network, Shield, DollarSign, Zap,
  MapPin, Cpu, BarChart3, Layers, Brain, Eye, Database, Activity, AlertTriangle,
  Plane, Route, Calculator, HardHat, Wrench, TrendingUp, Users, Settings, Search,
  ShieldCheck, Monitor, Gauge, Wifi,
} from 'lucide-react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import MobileNav from '../../components/MobileNav'
import RelatedSubServices from '../../components/RelatedSubServices'
import ServiceContactForm from '../../components/ServiceContactForm'

interface SubServiceData {
  slug: string
  category: string
  title: string
  subtitle: string
  description: string
  bgImage: string
  advantages: { icon: React.ElementType; text: string }[]
  idealFor: string[]
  businessImpact: string[]
  deliverables: string[]
}

const subServiceData: SubServiceData[] = [
  {
    slug: 'network-planning-design',
    category: 'NETWORK PLANNING & DESIGN',
    title: 'AI-Driven Route Optimization & GIS Mapping',
    subtitle: 'Smarter Networks Start with Smarter Planning',
    description:
      'Design future-ready fiber networks with AI-driven route optimization, geospatial intelligence, and demand-based capacity forecasting. We translate territory, terrain, and traffic into the most efficient deployment plan ,before a single trench is dug.',
    bgImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&auto=format&fit=crop',
    advantages: [
      { icon: MapPin, text: 'GIS-based mapping of service areas, terrain, and existing assets' },
      { icon: Route, text: 'AI route optimization minimising trench length and obstacles' },
      { icon: TrendingUp, text: 'Demand forecasting tied to population and enterprise density' },
      { icon: BarChart3, text: 'Capacity modelling for current load and future growth' },
      { icon: Layers, text: 'Design outputs integrated with downstream deployment workflows' },
    ],
    idealFor: ['Telecom operators', 'Internet service providers', 'Smart city authorities', 'Broadband consortia', 'Municipal fiber programs'],
    businessImpact: [
      'Fiber length and trenching cost reduced',
      'Faster design cycles with automated routing',
      'Demand-aligned capacity reduces under- and over-provisioning',
      'Lower permitting risk with terrain-aware routes',
      'Plans that scale with subscriber growth without redesign',
    ],
    deliverables: [
      'Geospatial network design package',
      'AI-optimised route maps',
      'Demand & capacity forecast reports',
      'Bill of materials and cost estimates',
      'High-level and low-level design documents',
      'Integration-ready CAD/GIS data',
    ],
  },
  {
    slug: 'smart-deployment',
    category: 'SMART DEPLOYMENT',
    title: 'Drone Surveys, Digital Twin & Automated Feasibility',
    subtitle: 'From Survey to Splice, Accelerated',
    description:
      'Compress survey-to-design timelines with drone-based aerial surveys, digital twin models of the network, and automated feasibility analysis ,deploying fiber faster, safer, and with fewer surprises in the field.',
    bgImage: 'https://images.unsplash.com/photo-1508444845599-5c89863b1c44?w=1920&auto=format&fit=crop',
    advantages: [
      { icon: Plane, text: 'High-resolution drone aerial surveys with photogrammetry' },
      { icon: Layers, text: 'Digital twin of physical assets for design validation' },
      { icon: Calculator, text: 'Automated feasibility analysis on terrain, permits, and obstacles' },
      { icon: HardHat, text: 'As-built documentation captured during deployment' },
      { icon: Zap, text: 'Reduced field re-visits through pre-validated designs' },
    ],
    idealFor: ['Fiber contractors', 'Telecom rollout programs', 'Regional ISPs', 'Smart city deployments', 'FTTH operators'],
    businessImpact: [
      'Survey timelines significantly compressed',
      'Construction rework reduced through pre-deployment validation',
      'Improved safety and lower site visits via remote inspection',
      'Faster permitting with terrain-aware feasibility reports',
      'Higher-quality as-built records for ongoing operations',
    ],
    deliverables: [
      'Drone-captured orthomosaics and 3D models',
      'Digital twin of the planned network',
      'Feasibility & risk assessment reports',
      'As-built fiber asset documentation',
      'Survey-to-design workflow automation',
      'QA/QC validation reports',
    ],
  },
  {
    slug: 'proactive-maintenance',
    category: 'PROACTIVE MAINTENANCE',
    title: 'Predictive Analytics & Real-Time Fault Detection',
    subtitle: 'Catch Faults Before Customers Do',
    description:
      'Move from break-fix to predict-and-prevent. We deploy real-time network monitoring, predictive analytics, and intelligent fault detection so issues are identified ,and often resolved ,before they impact customers.',
    bgImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1920&auto=format&fit=crop',
    advantages: [
      { icon: Activity, text: 'Real-time monitoring across the fiber network' },
      { icon: Brain, text: 'Predictive analytics on degradation patterns' },
      { icon: AlertTriangle, text: 'Automated fault detection and alert triage' },
      { icon: Search, text: 'Root-cause analysis with historical baselines' },
      { icon: ShieldCheck, text: 'Outage prevention through proactive intervention' },
    ],
    idealFor: ['Telecom NOCs', 'Fiber network operators', 'Managed service providers', 'Enterprise networks', 'Utility communications teams'],
    businessImpact: [
      'Outage frequency reduced',
      'Mean time to repair (MTTR) improved through automated triage',
      'Lower truck-rolls via remote diagnosis',
      'Better SLA compliance and customer retention',
      'Predictable maintenance budget vs. emergency spend',
    ],
    deliverables: [
      'Real-time monitoring platform',
      'Predictive analytics models',
      'Fault detection & alerting workflows',
      'Incident root-cause reports',
      'Network health-score dashboards',
      'Quarterly maintenance insight reviews',
    ],
  },
  {
    slug: 'reliability-sla-support',
    category: 'RELIABILITY & SLA SUPPORT',
    title: 'Preventive Programs & Asset Lifecycle Management',
    subtitle: 'Long-Term Network Health, Engineered In',
    description:
      'Reliability is not an event ,it is a program. We deliver preventive maintenance, fiber health assessments, and SLA-backed support that keeps networks performing year after year.',
    bgImage: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?w=1920&auto=format&fit=crop',
    advantages: [
      { icon: Wrench, text: 'Scheduled preventive maintenance programs' },
      { icon: Eye, text: 'Periodic fiber health audits with OTDR baselines' },
      { icon: Database, text: 'Asset lifecycle management ,deploy to decommission' },
      { icon: Shield, text: 'SLA-based support tiers with 24/7 coverage' },
      { icon: Settings, text: 'Operational playbooks for repeatable execution' },
    ],
    idealFor: ['Tier-1 and Tier-2 operators', 'Fiber wholesalers', 'Enterprise WAN owners', 'Public broadband programs', 'Data center providers'],
    businessImpact: [
      'SLA breach incidents reduced significantly',
      'Asset life extended through preventive care',
      'Predictable OPEX with lifecycle planning',
      'Better capital allocation between repair and replace',
      'Documented compliance for regulators and auditors',
    ],
    deliverables: [
      'Preventive maintenance program design',
      'Fiber health assessment reports',
      'Asset lifecycle inventory and roadmap',
      'SLA support documentation',
      'Maintenance playbooks and runbooks',
      'Periodic reliability performance reports',
    ],
  },
  {
    slug: 'visibility-dashboards',
    category: 'NETWORK VISIBILITY DASHBOARDS',
    title: 'Centralized Insights & Performance Tracking',
    subtitle: 'One Pane of Glass for the Entire Network',
    description:
      'Bring every metric ,topology, performance, faults, and forecasts ,into a single operational view. Our dashboards turn raw telemetry into decisions for NOC operators, planners, and executives alike.',
    bgImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1920&auto=format&fit=crop',
    advantages: [
      { icon: Monitor, text: 'Real-time topology and performance visualisation' },
      { icon: Gauge, text: 'KPI dashboards tailored to NOC, planning, and exec users' },
      { icon: Search, text: 'Drill-down from network view to individual asset' },
      { icon: AlertTriangle, text: 'Alerts and SLA compliance tracking in one place' },
      { icon: Cpu, text: 'Integration with existing OSS/BSS systems' },
    ],
    idealFor: ['NOC teams', 'Network planners', 'Executive leadership', 'Regulators and auditors', 'Customer success teams'],
    businessImpact: [
      'Decision time reduced with consolidated visibility',
      'Better cross-team collaboration on incidents',
      'Faster reporting to regulators and customers',
      'Improved forecasting through trend visibility',
      'Lower tooling cost by consolidating disparate views',
    ],
    deliverables: [
      'Custom dashboard application',
      'OSS/BSS data integrations',
      'Role-based access and views',
      'Mobile-friendly NOC view',
      'Custom KPI and SLA reports',
      'Dashboard training and adoption support',
    ],
  },
  {
    slug: 'scalable-future-growth',
    category: 'SCALABLE FUTURE GROWTH',
    title: 'Capacity Planning, Expansion & Cost Optimization',
    subtitle: 'Build Today, Ready for Tomorrow',
    description:
      'Networks must grow ,but growth without planning is expensive. We deliver data-driven capacity planning, expansion roadmaps, and cost optimisation strategies that scale resilient fiber networks profitably.',
    bgImage: 'https://images.unsplash.com/photo-1496450681664-3df85efbd29f?w=1920&auto=format&fit=crop',
    advantages: [
      { icon: TrendingUp, text: 'Demand-led capacity planning with traffic forecasts' },
      { icon: Route, text: 'Expansion roadmap aligned with subscriber growth' },
      { icon: DollarSign, text: 'Cost optimisation through right-sized deployment' },
      { icon: Shield, text: 'Resilience modelling for redundancy and uptime' },
      { icon: Users, text: 'Customer experience tied to network performance' },
    ],
    idealFor: ['Growth-stage ISPs', 'National broadband programs', 'Telecom strategy teams', 'Infrastructure investors', 'Smart city planners'],
    businessImpact: [
      'Capital expenditure efficiency improved',
      'Faster, lower-risk network expansion',
      'Improved customer NPS through better uptime and speeds',
      'Better investment decisions backed by data',
      'Future-proof network architecture',
    ],
    deliverables: [
      'Capacity & demand forecast reports',
      'Multi-year expansion roadmap',
      'Cost optimisation analysis',
      'Resilience and redundancy plans',
      'Investment business case',
      'Customer experience impact assessment',
    ],
  },
]

const toTitle = (category: string) =>
  category
    .split(' ')
    .map((w) => (w.length <= 3 ? w : w.charAt(0) + w.slice(1).toLowerCase()))
    .join(' ')

export default function SmartFiberPlanningSubService() {
  const { slug } = useParams<{ slug: string }>()
  const service = subServiceData.find((s) => s.slug === slug)

  if (!service) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Service Not Found</h1>
          <Link to="/services/smart-fiber-planning" className="text-[#0050a9] hover:underline">
            &larr; Back to Smart Fiber Planning
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden pt-28 lg:pt-36 pb-20 lg:pb-28" style={{ marginTop: '44px' }}>
        <div className="absolute inset-0">
          <img src={service.bgImage} alt={service.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
        </div>

        <div className="absolute top-0 left-0 right-0 bg-black/20 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link to="/services" className="text-white/70 hover:text-white transition-colors">Services</Link>
              <span className="text-white/50">/</span>
              <Link to="/services/smart-fiber-planning" className="text-white/70 hover:text-white transition-colors">Smart Fiber Planning</Link>
              <span className="text-white/50">/</span>
              <span className="text-white/90 font-medium">{service.category}</span>
            </div>
            <span className="hidden sm:inline-flex items-center gap-2 bg-white/10 text-[#00d4ff] px-3 py-1 rounded-full text-sm font-semibold">
              <Network className="w-4 h-4" />
              {service.category}
            </span>
          </div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <h1 className="text-white text-[36px] md:text-[48px] lg:text-[56px] font-bold leading-[1.1] mb-4 tracking-tight">
            {service.title}
          </h1>
          <p className="text-white/85 text-lg md:text-xl lg:text-2xl leading-relaxed mb-6">
            {service.subtitle}
          </p>
        </div>
      </section>

      {/* Detail Section */}
      <section className="py-20" style={{ background: 'linear-gradient(120deg, #012f62, #0055b4)' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="text-[36px] lg:text-[44px] font-bold text-white mb-4 leading-tight">
                Why {toTitle(service.category)}?
              </h2>
              <p className="text-white/75 text-lg leading-relaxed mb-8">
                {service.description}
              </p>

              <div className="space-y-3 mb-10">
                {service.advantages.map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-5 h-5 text-[#00d4ff]" />
                    </div>
                    <span className="text-white/90">{item.text}</span>
                  </div>
                ))}
              </div>

              <a href="/contact" className="btn-primary">
                Discuss Your Project
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </div>

            <div className="space-y-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                <h3 className="text-xl font-bold text-white mb-5">Ideal For</h3>
                <div className="flex flex-wrap gap-3">
                  {service.idealFor.map((item, i) => (
                    <span key={i} className="bg-white/10 text-white/90 px-4 py-2 rounded-full text-sm font-medium border border-white/10">
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                <h3 className="text-xl font-bold text-white mb-5">Business Impact</h3>
                <div className="space-y-3">
                  {service.businessImpact.map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-[#00d4ff] flex-shrink-0" />
                      <span className="text-white/90">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Deliver + CTA */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-[36px] lg:text-[42px] font-bold text-[#0050a9] mb-4">
                What We Deliver
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                Every engagement produces a comprehensive deliverable package ,field-validated, quality-assured, and ready for integration into your operations.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {service.deliverables.map((item, i) => (
                  <div key={i} className="flex items-start gap-3 bg-white rounded-xl p-4 border border-gray-100">
                    <div className="w-8 h-8 bg-[#0050a9] rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle className="w-4 h-4 text-[#00d4ff]" />
                    </div>
                    <span className="text-[#0050a9] font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl p-8 lg:p-10" style={{ background: 'linear-gradient(120deg, #012f62, #0055b4)' }}>
              <h3 className="text-2xl font-bold text-white mb-3">
                Interested in {toTitle(service.category)}?
              </h3>
              <p className="text-white/70 text-base leading-relaxed mb-8">
                Get in touch with our team to explore how we can help you build, maintain, and scale a smarter fiber network.
              </p>
              <div className="space-y-4">
                <a
                  href="/contact"
                  className="flex items-center gap-4 bg-white/10 hover:bg-white/15 border border-white/10 rounded-xl p-5 transition-colors group"
                >
                  <div className="w-12 h-12 bg-[#00d4ff]/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Wifi className="w-6 h-6 text-[#00d4ff]" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-white font-semibold">Get in Touch</h4>
                    <p className="text-white/60 text-sm">Discuss your project needs</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-white/40 group-hover:text-white/80 transition-colors" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <RelatedSubServices
        items={subServiceData}
        basePath="/services/smart-fiber-planning"
        currentSlug={service.slug}
        parentName="Smart Fiber Planning"
      />

      <div id="contact">
        <ServiceContactForm
          serviceName={service.title}
          subServices={subServiceData.map((item) => ({ value: item.title, label: item.title }))}
        />
      </div>

      <Footer />
      <MobileNav />
    </div>
  )
}
