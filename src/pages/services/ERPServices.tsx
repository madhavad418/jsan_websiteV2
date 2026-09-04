import Header from '../../components/Header'
import Footer from '../../components/Footer'
import MobileNav from '../../components/MobileNav'
import CapabilityShowcase from '../../components/CapabilityShowcase'
import { allocationStats, serviceSplit } from '../../config/countAllocations'
import ServiceHero from '../../components/ServiceHero'

const subServices = [
  {
    category: 'SAP IMPLEMENTATION',
    title: 'End-to-End SAP S/4HANA Deployment',
    description: 'End-to-end SAP S/4HANA implementation, migration from ECC, and module-specific deployments tailored to your industry and business processes.',
    bgImage: '/pillars/tech-erp.webp',
    cardTitle: 'SAP Implementation',
    highlights: ['S/4HANA Migration', 'Module Deployment', 'Fiori UX', 'ABAP Development'],
  },
  {
    category: 'ORACLE ERP CLOUD',
    title: 'Oracle Fusion Cloud for Modern Enterprises',
    description: 'Oracle Fusion Cloud implementation covering financials, procurement, project management, and supply chain modules for cloud-native operations.',
    bgImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop',
    cardTitle: 'Oracle ERP Cloud',
    highlights: ['Oracle Fusion', 'Financials', 'Procurement', 'Project Management'],
  },
  {
    category: 'MICROSOFT DYNAMICS 365',
    title: 'Dynamics 365 Finance & Operations',
    description: 'D365 Finance, Supply Chain, and Business Central implementation and customisation for mid-market and enterprise organisations.',
    bgImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop',
    cardTitle: 'Microsoft Dynamics 365',
    highlights: ['D365 Finance', 'Supply Chain', 'Business Central', 'Power Platform'],
  },
  {
    category: 'ERP CUSTOMISATION',
    title: 'Tailored Workflows & Extensions',
    description: 'Custom workflows, reports, integrations, and extensions tailored to your unique business processes across any ERP platform.',
    bgImage: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&h=500&fit=crop',
    cardTitle: 'ERP Customisation',
    highlights: ['Custom Workflows', 'Report Development', 'API Integrations', 'Extensions'],
  },
  {
    category: 'ERP MIGRATION',
    title: 'Coordinated Platform Transitions',
    description: 'Coordinated migration between ERP platforms or upgrade to cloud-native versions with zero data loss and minimal business disruption.',
    bgImage: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&h=500&fit=crop',
    cardTitle: 'ERP Migration',
    highlights: ['Platform Migration', 'Data Migration', 'Cloud Upgrade', 'Zero Downtime'],
  },
  {
    category: 'MANAGED ERP SERVICES',
    title: 'Ongoing Support & Optimisation',
    description: 'Ongoing support, monitoring, patch management, and optimisation of your ERP environment to ensure peak performance.',
    bgImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=500&fit=crop',
    cardTitle: 'Managed ERP Services',
    highlights: ['24/7 Support', 'Patch Management', 'Performance Tuning', 'Health Checks'],
  },
]

const erpStack = [
  'SAP S/4HANA',
  'SAP BTP',
  'Oracle Fusion',
  'Oracle EBS',
  'Dynamics 365',
  'Business Central',
  'SAP Fiori',
  'ABAP',
  'Power Platform',
  'Azure',
  'SAP HANA',
  'SQL Server',
]

export default function ERPServices() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero */}
      <ServiceHero
        breadcrumb={"ERP Services"}
        title={"ERP Services"}
        subtitle={"Streamline operations with SAP, Oracle, and Microsoft Dynamics ERP implementation, customisation, and managed services for enterprise-scale efficiency."}
        description={"ERP systems are the operational backbone of enterprises. We implement, customise, and manage ERP solutions that unify finance, HR, supply chain, and operations on a single platform."}
        image="/pillars/tech-erp.webp"
        imageAlt="ERP Services"
        stats={[...allocationStats(serviceSplit, 'erp'), { value: '30%', label: 'Process Efficiency' }, { value: '3', label: 'Major ERP Platforms' }]}
      />

      {/* Subservice Cards */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
                    <CapabilityShowcase items={subServices} />
        </div>
      </section>

      {/* Working with, a slim marquee instead of a full stack section */}
      <section className="border-y border-gray-100 bg-white py-7">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col items-center gap-4 md:flex-row md:gap-8">
            <span className="shrink-0 text-[11px] font-bold uppercase tracking-[0.25em] text-[#0050a9]/60">
              Working with
            </span>

            <div
              className="relative w-full overflow-hidden"
              style={{
                maskImage: 'linear-gradient(90deg, transparent, black 6%, black 94%, transparent)',
                WebkitMaskImage: 'linear-gradient(90deg, transparent, black 6%, black 94%, transparent)',
              }}
            >
              <div className="animate-marquee flex w-max items-center gap-3 hover:[animation-play-state:paused]">
                {[...erpStack, ...erpStack].map((item, i) => (
                  <span
                    key={`${item}-${i}`}
                    className="whitespace-nowrap rounded-full border border-gray-200 bg-gray-50 px-4 py-2 text-sm font-medium text-[#0050a9] transition-colors duration-300 hover:border-[#0050a9]/40 hover:bg-blue-50"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <MobileNav />
    </div>
  )
}
