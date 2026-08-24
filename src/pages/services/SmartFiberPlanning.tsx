import { MapPin, Plane, Route, Calculator, HardHat, Activity, AlertTriangle, Wrench, BarChart3, Network, Layers, Gauge, ShieldCheck, Monitor, TrendingUp } from 'lucide-react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import MobileNav from '../../components/MobileNav'
import ProcessFlow from '../../components/ProcessFlow'
import CapabilityShowcase from '../../components/CapabilityShowcase'
// import ServiceContactForm from '../../components/ServiceContactForm'
import ServiceHero from '../../components/ServiceHero'

const capabilities = [
  {
    slug: 'network-planning-design',
    category: 'NETWORK PLANNING & DESIGN',
    title: 'AI-Driven Route Optimization & GIS Mapping',
    description:
      'End-to-end fiber network planning powered by AI route optimization, GIS mapping, and demand forecasting to design the most efficient and future-ready networks.',
    icon: Network,
    cardTitle: 'Network Planning & Design',
    bgImage: '/public/pillars/route.png',
    highlights: ['AI Route Optimization', 'GIS Mapping', 'Demand Forecasting', 'Capacity Modeling'],
  },
  {
    slug: 'smart-deployment',
    category: 'SMART DEPLOYMENT',
    title: 'Drone Surveys, Digital Twin & Automated Feasibility',
    description:
      'Accelerate fiber rollout with drone-based surveys, digital twin technology, and automated feasibility analysis that compress survey-to-design timelines.',
    icon: Layers,
    cardTitle: 'Smart Deployment',
    bgImage: 'https://images.unsplash.com/photo-1508444845599-5c89863b1c44?w=800&h=500&fit=crop&auto=format',
    highlights: ['Drone Surveys', 'Digital Twin', 'Feasibility Analysis', 'Survey-to-Design Automation'],
  },
  {
    slug: 'proactive-maintenance',
    category: 'PROACTIVE MAINTENANCE',
    title: 'Predictive Analytics & Real-Time Fault Detection',
    description:
      'Detect issues before they become outages. Predictive analytics, real-time monitoring, and intelligent fault detection keep networks healthy and customers connected.',
    icon: Activity,
    cardTitle: 'Proactive Maintenance',
    bgImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop&auto=format',
    highlights: ['Predictive Analytics', 'Real-Time Monitoring', 'Fault Detection', 'Outage Reduction'],
  },
  {
    slug: 'reliability-sla-support',
    category: 'RELIABILITY & SLA SUPPORT',
    title: 'Preventive Programs & Asset Lifecycle Management',
    description:
      'Improve long-term network reliability with preventive maintenance programs, fiber health assessments, and SLA-based support for telecom operators.',
    icon: ShieldCheck,
    cardTitle: 'Reliability & SLA Support',
    bgImage: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?w=800&h=500&fit=crop&auto=format',
    highlights: ['Preventive Maintenance', 'Asset Lifecycle', 'Fiber Health Assessment', 'SLA-Based Support'],
  },
  {
    slug: 'visibility-dashboards',
    category: 'NETWORK VISIBILITY DASHBOARDS',
    title: 'Centralized Insights & Performance Tracking',
    description:
      'Centralized dashboards that deliver complete network visibility, performance tracking, and predictive maintenance insights in one pane of glass.',
    icon: Monitor,
    cardTitle: 'Visibility Dashboards',
    bgImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop&auto=format',
    highlights: ['Centralized Dashboards', 'Performance Tracking', 'Predictive Insights', 'Operational KPIs'],
  },
  {
    slug: 'scalable-future-growth',
    category: 'SCALABLE FUTURE GROWTH',
    title: 'Capacity Planning, Expansion & Cost Optimization',
    description:
      'Data-driven insights for capacity planning, scalable fiber expansion, and operational cost optimization  building resilient, high-performance networks.',
    icon: TrendingUp,
    cardTitle: 'Scalable Future Growth',
    bgImage: '/pillars/cost_optimization.png',
    highlights: ['Capacity Planning', 'Network Expansion', 'Cost Optimization', 'Customer Experience'],
  },
]

const flowSteps = [
  { icon: MapPin, label: 'Client Requirement & Network Assessment' },
  { icon: Plane, label: 'GIS Mapping & Drone / Field Survey' },
  { icon: Route, label: 'AI-Based Fiber Route Planning & Design' },
  { icon: Calculator, label: 'Feasibility Analysis & Cost Optimization' },
  { icon: HardHat, label: 'Fiber Deployment & Asset Documentation' },
  { icon: Gauge, label: 'Real-Time Monitoring & Network Analytics' },
  { icon: AlertTriangle, label: 'Predictive Fault Detection & Alerts' },
  { icon: Wrench, label: 'Proactive Maintenance & Preventive Actions' },
  { icon: BarChart3, label: 'Performance Reports & Continuous Upgrade' },
]

export default function SmartFiberPlanning() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero */}
      <ServiceHero
        breadcrumb={"Smart Fiber Planning"}
        eyebrow={"Core Service"}
        eyebrowIcon={Network}
        title={"Smart Fiber Planning"}
        subtitle={"AI-driven fiber network planning, intelligent deployment, and proactive maintenance for future-ready telecom infrastructure."}
        description={"We partner with telecom operators to design, deploy, and maintain resilient fiber networks  combining GIS, drone surveys, digital twins, and predictive analytics into a single, data-driven workflow."}
        image="/pillars/fibre_optic.png"
        imageAlt="Smart fiber network planning"
      />

      {/* What We Deliver */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12 md:mb-14">
            <span className="inline-block text-[#00d4ff] font-bold text-xs md:text-sm uppercase tracking-widest mb-3">What We Deliver</span>
            <h2 className="text-[28px] md:text-[36px] lg:text-[42px] font-bold mb-4 text-gradient">
              Smarter Fiber, From Plan to Performance
            </h2>
            <p className="text-gray-600 text-base md:text-lg max-w-3xl mx-auto">
              Six integrated capabilities that take fiber networks from intelligent design through proactive lifecycle management.
            </p>
          </div>

                    <CapabilityShowcase items={capabilities} basePath="/services/smart-fiber-planning" />
        </div>
      </section>

      {/* Process Flow */}
      <section className="py-20" style={{ background: 'linear-gradient(120deg, #012f62, #0055b4)' }}>
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-14">
            <span className="inline-block text-[#00d4ff] font-bold text-xs md:text-sm uppercase tracking-widest mb-3">Our Workflow</span>
            <h2 className="text-[28px] md:text-[36px] lg:text-[42px] font-bold text-white mb-4">
              Smart Fiber Planning &amp; Proactive Maintenance Flow
            </h2>
            <p className="text-white/70 text-base md:text-lg max-w-3xl mx-auto">
              A nine-step, data-driven workflow that takes networks from assessment to continuous optimization.
            </p>
          </div>

          {/* Desktop: horizontal connected flow */}
          <ProcessFlow steps={flowSteps} />
        </div>
      </section>

      {/* Contact Form */}
      {/* <div id="contact">
        <ServiceContactForm
          serviceName="Smart Fiber Planning"
          subServices={capabilities.map(c => ({ value: c.cardTitle, label: c.cardTitle }))}
        />
      </div> */}

      <Footer />
      <MobileNav />
    </div>
  )
}
