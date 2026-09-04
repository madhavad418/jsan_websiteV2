import { Code, Globe2, BarChart3, Smartphone, Building2, Cloud, Database, Plug, Workflow } from 'lucide-react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import MobileNav from '../../components/MobileNav'
import { allocationStats, serviceSplit } from '../../config/countAllocations'
import ServiceHero from '../../components/ServiceHero'
import CapabilityModules from '../../components/CapabilityModules'
// import ServiceContactForm from '../../components/ServiceContactForm'

export default function DigitalEngineering() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <ServiceHero
        breadcrumb="Digital Engineering"
        eyebrow="Core Service"
        eyebrowIcon={Code}
        title="Build the systems that turn operational data into action."
        subtitle="Digital Engineering"
        description="JSAN develops GIS, data and enterprise applications that connect field workflows, operational intelligence and business systems."
        image="/pillars/web_gis.webp"
        imageAlt="Digital engineering and enterprise applications"
        stats={allocationStats(serviceSplit, 'digital-engineering')}
      />

      <CapabilityModules
        eyebrow="Capabilities"
        heading="From field workflow to business system"
        intro="The systems that carry operational data the last mile  into the hands of the people who act on it."
        tone="white"
        modules={[
          {
            name: 'Web GIS',
            description: 'Browser-based spatial applications that put the map in front of operational teams.',
            icon: Globe2,
          },
          {
            name: 'Operational Dashboards',
            description: 'Live views of coverage, productivity, exceptions and programme health.',
            icon: BarChart3,
          },
          {
            name: 'Mobile Field Applications',
            description: 'Offline-capable capture and verification apps built for crews in the field.',
            icon: Smartphone,
          },
          {
            name: 'Enterprise Platforms',
            description: 'Line-of-business systems and ERP integration across the operating estate.',
            icon: Building2,
          },
          {
            name: 'Cloud Engineering',
            description: 'Scalable, governed infrastructure across AWS, Azure and Google Cloud.',
            icon: Cloud,
          },
          {
            name: 'Data Engineering',
            description: 'Pipelines, warehousing and quality controls that keep datasets trustworthy.',
            icon: Database,
          },
          {
            name: 'APIs & Integration',
            description: 'Contracts and services that move data between field, GIS and business systems.',
            icon: Plug,
          },
          {
            name: 'Workflow Automation',
            description: 'Removing the manual handoffs between capture, review, approval and release.',
            icon: Workflow,
          },
        ]}
      />

      {/* <ServiceContactForm
        serviceName="Digital Engineering"
        subServices={[
          { value: 'web-gis', label: 'Web GIS' },
          { value: 'operational-dashboards', label: 'Operational Dashboards' },
          { value: 'mobile-field-applications', label: 'Mobile Field Applications' },
          { value: 'enterprise-platforms', label: 'Enterprise Platforms' },
          { value: 'cloud-engineering', label: 'Cloud Engineering' },
          { value: 'data-engineering', label: 'Data Engineering' },
          { value: 'apis-and-integration', label: 'APIs & Integration' },
          { value: 'workflow-automation', label: 'Workflow Automation' },
        ]}
      /> */}

      <Footer />
      <MobileNav />
    </div>
  )
}
