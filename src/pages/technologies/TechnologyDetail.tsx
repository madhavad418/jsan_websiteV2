import { useParams, Link } from 'react-router-dom'
import NotFound from '../NotFound'
import { Play, CheckCircle, Globe, Zap, Shield, Target, DollarSign, Cpu, BarChart3, Network, Lock, Cloud, Database, Settings, Code, Server, Bot, Layers, Monitor, GitBranch, Container, Workflow, Map , ArrowRight } from 'lucide-react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import MobileNav from '../../components/MobileNav'
import HeroStat from '../../components/HeroStat'

interface TechData {
  slug: string
  title: string
  headline: string
  heroDescription: string
  heroImage: string
  stats: { value: string; label: string }[]
  whyTitle: string
  whyDescription: string
  benefits: string[]
  services: { title: string; description: string; icon: React.ElementType }[]
  techStack: string[]
}

const techData: TechData[] = [
  {
    slug: 'gis',
    title: 'GIS',
    headline: 'See the World Through Location Intelligence.',
    heroDescription: 'Harness details with our Geographic Information System solutions, from spatial analysis and enterprise mapping to in-house developed products that power real-time fleet tracking, point-of-interest management, and travel planning.',
    heroImage: '/pillars/tech-gis.jpg',
    stats: [
      { value: '50M+', label: 'Features Mapped' },
      { value: '500+', label: 'GIS Projects' },
      { value: '100+', label: 'GIS Experts' },
      { value: '25+', label: 'Countries' },
    ],
    whyTitle: 'Location Is the Common Thread Across Every Decision.',
    whyDescription: 'Over 80% of enterprise data has a spatial component. Our GIS expertise transforms raw geographic data into strategic intelligence, powering smarter decisions across urban planning, logistics, utilities, real estate, and environmental management. We also build and operate our own GIS products, proving our capabilities through real-world application.',
    benefits: [
      'Enterprise spatial data management and visualization',
      'In-house GIS products: JSAN VTS, POI Express, Travel Desk',
      'Custom web and mobile GIS application development',
      'Spatial analytics and predictive location modelling',
      'Direct integration with ERP, CRM, and IoT platforms',
      'Full-spectrum services from data capture to deployment',
    ],

    services: [
      { title: 'Enterprise GIS Platforms', description: 'Design, build, and manage enterprise-grade open-source GIS platforms with QGIS, GeoServer, and PostGIS  web portals, mobile field apps, and automated spatial workflows.', icon: Map },
      { title: 'Spatial Data Engineering', description: 'ETL pipelines for geospatial data with Python, GDAL, and PostGIS  spatial indexing, geocoding, and data quality management at enterprise scale.', icon: Database },
      { title: 'Custom GIS Development', description: 'Bespoke web and mobile GIS applications using Mapbox, Leaflet, OpenLayers, and CesiumJS tailored to your business needs.', icon: Code },
    ],
    techStack: ['QGIS', 'PostGIS', 'Mapbox', 'Leaflet', 'OpenLayers', 'GeoServer', 'FME', 'Python', 'PostgreSQL', 'Google Maps API', 'Cesium', 'Turf.js', 'GDAL', 'MapLibre', 'Folium'],
  },
  {
    slug: 'api-integration',
    title: 'API Integration',
    headline: 'Connect Everything. Automate Anything.',
    heroDescription: 'Connect systems, applications, and data sources with our expert API integration services. We design, develop, and manage APIs that power your digital ecosystem.',
    heroImage: '/pillars/tech-api.jpg',
    stats: [
      { value: '100+', label: 'APIs Developed' },
      { value: '99.9%', label: 'API Uptime' },
      { value: '<50ms', label: 'Avg Response Time' },
      { value: '50+', label: 'Integrations' },
    ],
    whyTitle: 'Break Down Data Silos, Accelerate Innovation.',
    whyDescription: 'Modern enterprises run on connected systems. Our API integration services eliminate data silos, automate workflows, and enable real-time data flow across your entire technology stack.',
    benefits: [
      'Coordinated connectivity between disparate systems',
      'Automated data synchronization and workflows',
      'Reduced manual processes and human error',
      'Real-time data access across the organisation',
      'Improved operational efficiency and agility',
      'Enhanced customer and partner experience',
    ],
    services: [
      { title: 'RESTful API Development', description: 'Design and build scalable REST APIs with OpenAPI/Swagger documentation, following industry best practices with comprehensive versioning.', icon: Code },
      { title: 'GraphQL Implementation', description: 'Flexible, efficient data querying with GraphQL  reducing over-fetching and enabling frontend teams to move faster.', icon: Network },
      { title: 'Enterprise Integration', description: 'Connect ERP, CRM, HRMS, and legacy systems through middleware, ESBs, and modern iPaaS platforms.', icon: Layers },
      { title: 'API Security', description: 'OAuth 2.0, JWT, rate limiting, and threat protection to ensure your APIs are secure by design.', icon: Lock },
      { title: 'API Gateway Solutions', description: 'Centralised API management with Kong, Apigee, or AWS API Gateway for traffic control, analytics, and policy enforcement.', icon: Shield },
      { title: 'API Analytics & Monitoring', description: 'Real-time monitoring, logging, performance analytics, and Postman-based testing to ensure uptime and optimal response times.', icon: Monitor },
    ],
    techStack: ['REST APIs', 'GraphQL', 'SOAP', 'gRPC', 'WebSockets', 'OAuth 2.0', 'OpenAPI/Swagger', 'Postman', 'Kong', 'Apigee', 'AWS API Gateway', 'Azure API Management'],
  },
  {
    slug: 'analytics',
    title: 'Analytics & Information Management',
    headline: 'Turn Data into Decisions.',
    heroDescription: 'Transform raw data into actionable insights with advanced analytics, business intelligence, and information management solutions that drive smarter decisions.',
    heroImage: '/pillars/tech-analytics.jpg',
    stats: [
      { value: '200+', label: 'Dashboards Built' },
      { value: '40%', label: 'Faster Insights' },
      { value: '10+', label: 'BI Projects Handled' },
    ],
    whyTitle: 'From Raw Data to Strategic Advantage.',
    whyDescription: 'Data is only valuable when it drives action. Our analytics solutions combine data engineering, business intelligence, and advanced analytics to help organisations make faster, smarter decisions.',
    benefits: [
      'Unified data views across departments and systems',
      'Self-service BI dashboards for every stakeholder',
      'Predictive analytics for proactive decision-making',
      'Automated reporting and scheduled insights',
      'Data governance and quality management',
      'Reduced time-to-insight by up to 60%',
    ],
    services: [
      { title: 'Business Intelligence', description: 'Interactive dashboards and reports with Power BI, Tableau, Looker, Apache Superset, and Metabase  making data accessible to every team.', icon: BarChart3 },
      { title: 'Data Engineering', description: 'Build robust ETL/ELT pipelines with Apache Airflow, dbt, and Apache Spark to ingest, transform, and deliver clean data to your analytics platforms.', icon: Database },
      { title: 'Advanced Analytics', description: 'Statistical modelling, machine learning, and AI-driven analytics using Python, R, Pandas, and Jupyter for predictive and prescriptive insights.', icon: Cpu },
      { title: 'Data Governance', description: 'Establish data quality frameworks, cataloguing, lineage tracking, and compliance management.', icon: Shield },
      { title: 'Real-Time Analytics', description: 'Stream processing with Apache Kafka, Apache Spark, and Databricks for real-time dashboards and event-driven insights.', icon: Zap },
      { title: 'Data Visualization', description: 'Custom visualizations, geospatial analytics, and embedded analytics with Apache Superset and Metabase  telling compelling data stories.', icon: Monitor },
    ],
    techStack: ['Power BI', 'Tableau', 'Looker', 'Apache Spark', 'Kafka', 'Airflow', 'dbt', 'Snowflake', 'Databricks', 'Python', 'R', 'SQL Server SSAS', 'Pandas', 'NumPy', 'Jupyter', 'Apache Superset', 'Metabase'],
  },
  {
    slug: 'cloud',
    title: 'Cloud Technologies',
    headline: 'Scale Without Limits.',
    heroDescription: 'Leverage the power of cloud computing with our AWS, Azure, and Google Cloud expertise. From migration to optimisation, we help you build a cloud-native future.',
    heroImage: '/pillars/tech-cloud.jpg',
    stats: [
      { value: '300+', label: 'Cloud Migrations' },
      { value: '99.99%', label: 'Availability' },
      { value: '35%', label: 'Cost Savings' },
      { value: '3', label: 'Cloud Platforms' },
    ],
    whyTitle: 'Cloud-First, Future-Ready.',
    whyDescription: 'Cloud is not just infrastructure; it is the foundation for innovation. We help organizations migrate, modernize, and optimize their cloud environments for performance, security, and cost efficiency.',
    benefits: [
      'Elastic scaling for unpredictable workloads',
      'Reduced infrastructure costs and CapEx',
      'Built-in disaster recovery and high availability',
      'Faster time-to-market for new applications',
      'Global reach with regional compliance',
      'Pay-as-you-go cost models',
    ],
    services: [
      { title: 'Cloud Migration', description: 'Lift-and-shift, re-platforming, or re-architecting  we plan and execute controlled migrations to AWS, Azure, or GCP.', icon: Cloud },
      { title: 'Cloud-Native Development', description: 'Build microservices, serverless functions on Lambda, Azure Functions, or Cloud Run, and containerised applications with Docker and Kubernetes  designed for the cloud from day one.', icon: Code },
      { title: 'Cloud Infrastructure', description: 'Design and manage scalable, secure cloud infrastructure with IaC using Terraform and CloudFormation across AWS, Azure, and GCP.', icon: Server },
      { title: 'Cloud Security', description: 'Identity management, network security, encryption, and compliance across multi-cloud environments.', icon: Shield },
      { title: 'Cost Optimisation', description: 'Right-sizing, reserved instances, spot strategies, and FinOps practices to reduce your cloud spend.', icon: DollarSign },
      { title: 'Multi-Cloud Strategy', description: 'Avoid vendor lock-in with multi-cloud architectures that leverage the best of AWS, Azure, and GCP.', icon: Globe },
    ],
    techStack: ['AWS', 'Microsoft Azure', 'Google Cloud', 'Terraform', 'CloudFormation', 'Kubernetes', 'Docker', 'Lambda', 'Azure Functions', 'Cloud Run', 'S3', 'Blob Storage'],
  },
  {
    slug: 'cyber-security',
    title: 'Cyber Security',
    headline: 'Defend. Detect. Respond.',
    heroDescription: 'Protect your digital assets with comprehensive cybersecurity solutions, ranging from threat assessment and SIEM to zero-trust architecture and compliance management.',
    heroImage: '/pillars/tech-cybersecurity.jpg',
    stats: [
      { value: '24/7', label: 'SOC Monitoring' },
      { value: '500+', label: 'Threats Mitigated' },
      { value: '100%', label: 'Compliance Rate' },
      { value: '50+', label: 'Security Audits' },
    ],
    whyTitle: 'Security is Not Optional  It is Foundational.',
    whyDescription: 'With evolving cyber threats and regulatory demands, organisations need proactive security strategies. We protect your data, systems, and reputation with defence-in-depth approaches.',
    benefits: [
      'Proactive threat detection and incident response',
      'Regulatory compliance (GDPR, ISO 27001, SOC 2)',
      'Zero-trust network architecture',
      'Reduced attack surface and vulnerability exposure',
      'Security awareness training for employees',
      'Business continuity and disaster recovery planning',
    ],
    services: [
      { title: 'Security Assessment', description: 'Vulnerability scanning with OpenVAS, Qualys, and Nessus; penetration testing aligned with OWASP frameworks; and risk assessments to identify and prioritise security gaps.', icon: Target },
      { title: 'SIEM & SOC', description: 'Security Information and Event Management with Splunk, Microsoft Sentinel, and Wazuh  24/7 Security Operations Centre monitoring and response.', icon: Monitor },
      { title: 'Zero Trust Architecture', description: 'Design and implement zero-trust network models with Okta, Azure AD, and Keycloak  identity-centric access controls and micro-segmentation.', icon: Lock },
      { title: 'Cloud Security', description: 'Secure your cloud workloads with CSPM, CWPP, and cloud-native security controls across AWS, Azure, and GCP.', icon: Cloud },
      { title: 'Compliance Management', description: 'Achieve and maintain compliance with GDPR, HIPAA, PCI-DSS, ISO 27001, and SOC 2 frameworks  aligned with NIST and OWASP standards.', icon: Shield },
      { title: 'Incident Response', description: 'Rapid containment, forensic analysis with Splunk and Suricata, and recovery planning when security incidents occur.', icon: Zap },
    ],
    techStack: ['Splunk', 'Microsoft Sentinel', 'CrowdStrike', 'Palo Alto', 'Fortinet', 'Qualys', 'Nessus', 'Okta', 'Azure AD', 'HashiCorp Vault', 'OWASP', 'NIST', 'Wazuh', 'Snort', 'Suricata', 'OpenVAS', 'Keycloak', 'ModSecurity'],
  },
  {
    slug: 'data-warehouse',
    title: 'Data Warehouse',
    headline: 'One Source of Truth.',
    heroDescription: 'Build scalable data warehouse solutions for efficient storage, retrieval, and analysis of enterprise data, enabling analytics, reporting, and AI at scale.',
    heroImage: '/pillars/tech-datawarehouse.jpg',
    stats: [
      { value: '100+', label: 'Warehouses Managed' },
      { value: '60%', label: 'Cost Reduction' },
    ],
    whyTitle: 'Centralise, Optimise, Analyse.',
    whyDescription: 'A well-architected data warehouse is the backbone of your analytics strategy. We design cloud-native and hybrid data warehouses that scale with your business and deliver fast, reliable insights.',
    benefits: [
      'Centralised data from all source systems',
      'Optimised query performance for analytics',
      'Historical data retention and trend analysis',
      'Support for real-time and batch processing',
      'Governed, clean, and trustworthy data',
      'Foundation for AI/ML and advanced analytics',
    ],
    services: [
      { title: 'Warehouse Architecture', description: 'Design modern data warehouse architectures on Snowflake, BigQuery, and Redshift  dimensional modelling, data vault, or lakehouse patterns.', icon: Database },
      { title: 'Cloud Data Warehouse', description: 'Implement and optimise Snowflake, BigQuery, Redshift, or Synapse for cloud-native analytics workloads.', icon: Cloud },
      { title: 'ETL/ELT Pipelines', description: 'Build automated data pipelines with Apache Airflow, dbt, Informatica, Fivetran, and Matillion for reliable data delivery.', icon: Workflow },
      { title: 'Data Lake Integration', description: 'Combine structured and unstructured data in lakehouse architectures with Delta Lake, Iceberg, or Hudi.', icon: Layers },
      { title: 'Performance Tuning', description: 'Optimise query performance with Trino, ClickHouse, and DuckDB  partitioning strategies and compute costs for maximum efficiency.', icon: Zap },
      { title: 'Data Migration', description: 'Migrate from legacy on-premises warehouses to modern cloud platforms with zero data loss.', icon: Server },
    ],
    techStack: ['Snowflake', 'Amazon Redshift', 'Google BigQuery', 'Azure Synapse', 'dbt', 'Apache Airflow', 'Informatica', 'Talend', 'Delta Lake', 'Apache Iceberg', 'Fivetran', 'Matillion', 'Trino', 'ClickHouse', 'DuckDB', 'Apache Hudi'],
  },
  {
    slug: 'devops',
    title: 'DevOps',
    headline: 'Ship Faster. Break Less.',
    heroDescription: 'Accelerate software delivery with DevOps practices, CI/CD pipelines, infrastructure as code, and site reliability engineering.',
    heroImage: '/pillars/tech-devops.jpg',
    stats: [
      { value: '10x', label: 'Deploy Frequency' },
      { value: '70%', label: 'Lead Time Reduction' },
      { value: '99.9%', label: 'Deployment Success' },
      { value: '<1hr', label: 'Recovery Time' },
    ],
    whyTitle: 'Automate the Path from Code to Production.',
    whyDescription: 'DevOps is about speed, reliability, and collaboration. We implement CI/CD pipelines, infrastructure automation, and observability platforms that let your teams ship confidently and recover fast.',
    benefits: [
      'Continuous integration and deployment pipelines',
      'Infrastructure as Code for reproducible environments',
      'Automated testing and quality gates',
      'Reduced deployment risk and rollback time',
      'Improved collaboration between dev and ops teams',
      'Full observability with metrics, logs, and traces',
    ],
    services: [
      { title: 'CI/CD Pipelines', description: 'Design and implement automated build, test, and deployment pipelines with GitHub Actions, Jenkins, or GitLab CI.', icon: GitBranch },
      { title: 'Container Orchestration', description: 'Kubernetes cluster management, Helm charts, and service mesh for scalable containerised workloads.', icon: Container },
      { title: 'Infrastructure as Code', description: 'Terraform and Ansible for reproducible, version-controlled infrastructure across any cloud.', icon: Code },
      { title: 'Monitoring & Observability', description: 'Full-stack observability with Prometheus, Grafana, Datadog, and distributed tracing.', icon: Monitor },
      { title: 'Site Reliability Engineering', description: 'SLOs, error budgets, incident management, and chaos engineering for production reliability  backed by Prometheus and Grafana observability.', icon: Shield },
      { title: 'GitOps', description: 'Git-centric deployment workflows with ArgoCD for declarative, auditable infrastructure management.', icon: Settings },
    ],
    techStack: ['Kubernetes', 'Docker', 'Terraform', 'Ansible', 'GitHub Actions', 'Jenkins', 'GitLab CI', 'ArgoCD', 'Prometheus', 'Grafana', 'Datadog', 'Helm'],
  },
  {
    slug: 'automation',
    title: 'Intelligent Automation & Robotics',
    headline: 'Automate the Mundane. Amplify the Human.',
    heroDescription: 'Transform business processes with RPA, AI-powered automation, and intelligent document processing.',
    heroImage: '/pillars/tech-automation.jpg',
    stats: [
      { value: '200+', label: 'Bots Deployed' },
      { value: '80%', label: 'Process Time Saved' },
      { value: '99%', label: 'Bot Accuracy' },
      { value: '5x', label: 'ROI Achieved' },
    ],
    whyTitle: 'From Manual to Autonomous.',
    whyDescription: 'Repetitive, rule-based tasks consume valuable human time. Our intelligent automation solutions combine RPA, AI, and process mining to automate end-to-end business processes with precision.',
    benefits: [
      'Eliminate repetitive manual data entry and processing',
      'Scale operations without scaling headcount',
      'Reduce errors and improve compliance',
      'Free employees for higher-value strategic work',
      'Faster process execution ,24/7 without breaks',
      'Measurable ROI within months of deployment',
    ],
    services: [
      { title: 'Robotic Process Automation', description: 'Design, develop, and deploy software bots with UiPath, Automation Anywhere, or Power Automate.', icon: Bot },
      { title: 'Intelligent Document Processing', description: 'AI-powered extraction and classification of data from invoices, contracts, and unstructured documents using ABBYY, Google Document AI, and Azure AI.', icon: Cpu },
      { title: 'Process Mining', description: 'Discover, analyse, and optimise business processes with Celonis using event log data before automating.', icon: Target },
      { title: 'AI-Powered Automation', description: 'Combine RPA with Python-based ML and Azure AI for cognitive automation that handles exceptions and unstructured data.', icon: Zap },
      { title: 'Workflow Orchestration', description: 'End-to-end process orchestration with Camunda, n8n, and Activepieces  across multiple bots, systems, and human-in-the-loop steps.', icon: Workflow },
      { title: 'COE Setup & Governance', description: 'Establish a Centre of Excellence for automation with ServiceNow-backed governance frameworks, pipelines, and best practices.', icon: Shield },
    ],
    techStack: ['UiPath', 'Automation Anywhere', 'Power Automate', 'Blue Prism', 'ABBYY', 'Celonis', 'Google Document AI', 'Azure AI', 'Python', 'Camunda', 'Nintex', 'ServiceNow', 'n8n', 'Activepieces', 'Selenium', 'Playwright'],
  },
  {
    slug: 'it-infrastructure',
    title: 'IT Infrastructure & Managed Services',
    headline: 'Built to Run. Managed to Perform.',
    heroDescription: 'From NOC operations and cloud hosting, to network design and 24/7 support, build and manage robust IT infrastructure with our services',
    heroImage: '/pillars/tech-infrastructure.jpg',
    stats: [
      { value: '24/7', label: 'NOC Operations' },
      { value: '99.99%', label: 'Uptime SLA' },
      { value: '500+', label: 'Endpoints Managed' },
      { value: '15min', label: 'Response Time' },
    ],
    whyTitle: 'Reliable Infrastructure, Zero Headaches.',
    whyDescription: 'Your infrastructure should enable your business, not slow it down. We design, deploy, and manage IT environments that are secure, scalable, and always available.',
    benefits: [
      'Proactive monitoring and issue resolution',
      'Reduced downtime and business disruption',
      'Predictable IT costs with managed service models',
      'Scalable infrastructure for growth',
      'Compliance with security and regulatory standards',
      'Single point of contact for all IT operations',
    ],
    services: [
      { title: 'NOC & Monitoring', description: '24/7 Network Operations Centre with Zabbix, Nagios, Icinga, and SolarWinds  real-time monitoring, alerting, and incident management.', icon: Monitor },
      { title: 'Network Design', description: 'Enterprise network architecture with Cisco and Fortinet  SD-WAN, VPN, and wireless infrastructure design and deployment.', icon: Network },
      { title: 'Server Management', description: 'Physical and virtual server provisioning on VMware and Proxmox VE, patching with Foreman, backup, and performance optimisation via Cockpit.', icon: Server },
      { title: 'End User Support', description: 'Helpdesk with ServiceNow ticketing, SCCM device management, and Azure AD identity for your entire workforce  on-site or remote.', icon: Globe },
      { title: 'Backup & DR', description: 'Automated backup strategies with Veeam and disaster recovery planning with tested failover procedures.', icon: Shield },
      { title: 'Cloud Hosting', description: 'Managed cloud hosting on AWS and Azure with performance SLAs, auto-scaling, and cost optimisation.', icon: Cloud },
    ],
    techStack: ['VMware', 'Cisco', 'Fortinet', 'ServiceNow', 'SolarWinds', 'Zabbix', 'Veeam', 'Azure AD', 'AWS', 'Azure', 'ITIL', 'SCCM', 'Nagios', 'Icinga', 'Cockpit', 'Foreman', 'Proxmox VE', 'OpenLDAP'],
  },
  {
    slug: 'web',
    title: 'Web Technologies',
    headline: 'Build for the Modern Web.',
    heroDescription: 'Create powerful web applications with modern frameworks, responsive design, and current frameworks, measured against real user outcomes.',
    heroImage: '/pillars/tech-web.jpg',
    stats: [
      { value: '200+', label: 'Web Apps Built' },
      { value: '100%', label: 'Responsive Design' },
      { value: '<2s', label: 'Load Time Target' },
      { value: '50+', label: 'Active Projects' },
    ],
    whyTitle: 'Fast, Accessible, Beautiful.',
    whyDescription: 'The web is your primary digital touchpoint. We build high-performance, accessible web applications with modern frameworks and best practices that delight users and drive business results.',
    benefits: [
      'Lightning-fast performance with modern frameworks',
      'Responsive design for every device and screen size',
      'Accessible and inclusive user experiences (WCAG)',
      'SEO-optimised architecture and server-side rendering',
      'Progressive Web App capabilities',
      'Scalable and maintainable code architecture',
    ],
    services: [
      { title: 'Frontend Development', description: 'React and Next.js applications with TypeScript and Tailwind CSS  modern UI component libraries and design systems.', icon: Code },
      { title: 'Backend Development', description: 'Node.js, Python, and .NET backends with RESTful APIs, GraphQL, and microservices architecture.', icon: Server },
      { title: 'Full-Stack Applications', description: 'End-to-end web application development from database design to deployment and monitoring.', icon: Layers },
      { title: 'CMS & Portals', description: 'Custom content management systems, customer portals, and intranet platforms built for your workflow.', icon: Settings },
      { title: 'E-Commerce', description: 'Scalable e-commerce platforms with payment integration, inventory management, and personalisation.', icon: DollarSign },
      { title: 'Performance Optimisation', description: 'Core Web Vitals optimisation, Vercel CDN configuration, caching strategies, and load time reduction.', icon: Zap },
    ],
    techStack: ['React', 'Next.js', 'TypeScript', 'Node.js', 'Python', '.NET', 'PostgreSQL', 'MongoDB', 'Redis', 'Tailwind CSS', 'Vercel', 'AWS Amplify'],
  },
]

export default function TechnologyDetail() {
  const { slug } = useParams<{ slug: string }>()
  const tech = techData.find((t) => t.slug === slug)

  if (!tech) return <NotFound />

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden bg-white pt-24 lg:pt-28 pb-16 lg:pb-20" style={{ marginTop: '44px' }}>
        {/* Same treatment as the Technologies landing hero: brand wash plus a faint
            blueprint grid, so a white hero still reads as JSAN rather than as empty */}
        <div className="pointer-events-none absolute inset-0">
          <div
            className="absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage:
                'linear-gradient(rgba(0,80,169,.8) 1px, transparent 1px), linear-gradient(90deg, rgba(0,80,169,.8) 1px, transparent 1px)',
              backgroundSize: '46px 46px',
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(38% 55% at 4% 8%, rgba(0,80,169,0.08) 0%, rgba(0,80,169,0) 100%), ' +
                'radial-gradient(42% 50% at 78% 95%, rgba(0,212,255,0.12) 0%, rgba(0,212,255,0) 100%)',
            }}
          />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6">
          <div className="max-w-3xl">
            <nav className="mb-4 flex items-center gap-2 text-sm text-gray-500">
              <Link to="/technologies" className="transition-colors hover:text-[#0050a9]">
                Technologies
              </Link>
              <span>/</span>
              <span className="font-medium text-[#0050a9]">{tech.title}</span>
            </nav>

            <span className="mb-5 inline-block t-label text-gray-500">
              {tech.title}
            </span>
            <h1 className="mb-5 text-[34px] font-bold leading-[1.06] tracking-tight text-[#0a1a3a] lg:text-[52px]">
              {tech.headline}
            </h1>
            <p className="mb-9 max-w-2xl text-lg leading-relaxed text-gray-600">
              {tech.heroDescription}
            </p>

            <div className="mb-9 flex flex-wrap gap-x-10 gap-y-5">
              {tech.stats.map((stat, i) => (
                <div key={i}>
                  <div className="text-2xl font-bold tabular-nums text-[#0050a9] lg:text-3xl">
                    <HeroStat value={stat.value} />
                  </div>
                  <div className="mt-0.5 text-xs text-[#0050a9]">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                to="/contact"
                className="group inline-flex items-center gap-2.5 rounded-lg px-7 py-3.5 font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_34px_-14px_rgba(0,80,169,0.9)]"
                style={{ background: 'linear-gradient(120deg, #012f62, #0055b4)' }}
              >
                Schedule a Consultation
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                to="/technologies"
                className="group inline-flex items-center gap-2 rounded-lg border-2 border-[#0050a9]/20 px-7 py-3.5 font-semibold text-[#0050a9] transition-all duration-300 hover:border-[#0050a9] hover:bg-[#0050a9] hover:text-white"
              >
                All Technologies
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-block text-[#0050a9] font-bold text-sm uppercase tracking-widest mb-3">Why {tech.title}</span>
              <h2 className="text-[32px] lg:text-[40px] font-bold text-gray-900 mb-4 leading-tight">
                {tech.whyTitle}
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                {tech.whyDescription}
              </p>
            </div>
            <div className="space-y-3">
              {tech.benefits.map((benefit, i) => (
                <div key={i} className="flex items-start gap-3 bg-gray-50 rounded-xl p-4">
                  <CheckCircle className="w-5 h-5 text-[#0050a9] flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Service Offerings */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="inline-block text-[#0050a9] font-bold text-sm uppercase tracking-widest mb-3">What We Offer</span>
            <h2 className="text-[36px] lg:text-[42px] font-bold text-gradient">
              {/* Some titles already end in "Services"; appending it again read as
                  "Managed Services Services". */}
              {tech.title.endsWith('Services') ? `Our ${tech.title}` : `Our ${tech.title} Services`}
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {tech.services.map((service, i) => (
              <div
                key={i}
                className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-8 transition-all duration-500 hover:-translate-y-1.5 hover:border-[#0050a9]/25 hover:shadow-[0_24px_50px_-20px_rgba(0,80,169,0.55)]"
              >
                {/* Cyan hairline sweeps across the top on hover */}
                <span className="pointer-events-none absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-[#0050a9] via-[#00d4ff] to-[#0050a9] transition-transform duration-500 group-hover:scale-x-100" />

                <div
                  className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl border border-[#0050a9]/10 transition-all duration-500 group-hover:scale-110 group-hover:border-[#00d4ff]/40"
                  style={{ background: 'linear-gradient(120deg, rgba(0,80,169,0.08), rgba(0,212,255,0.08))' }}
                >
                  <service.icon className="h-7 w-7 text-[#0050a9]" />
                </div>

                <h3 className="mb-2 text-lg font-bold text-gray-900 transition-colors group-hover:text-[#0050a9]">
                  {service.title}
                </h3>
                <span className="mb-3 block h-0.5 w-10 rounded bg-[#00d4ff] transition-all duration-500 group-hover:w-16" />
                <p className="text-sm leading-relaxed text-gray-600">{service.description}</p>

                <Link
                  to="/contact"
                  className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#0050a9]"
                >
                  <span className="relative">
                    Discuss this
                    <span className="pointer-events-none absolute -bottom-0.5 left-0 h-0.5 w-0 rounded-full bg-gradient-to-r from-[#0050a9] to-[#00d4ff] transition-all duration-300 group-hover:w-full" />
                  </span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            ))}
          </div>
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
                {[...tech.techStack, ...tech.techStack].map((item, i) => (
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

      {/* CTA */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-[36px] lg:text-[42px] font-bold mb-4 text-gradient">
            Ready to Modernise Your Operations?
          </h2>
          <p className="text-gray-600 text-lg mb-10">
            Partner with JSAN Consulting to leverage {tech.title.toLowerCase()} for your organisation's growth and efficiency.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact" className="btn-primary inline-flex items-center gap-2">
              Schedule a Consultation
              <Play className="w-4 h-4 fill-current" />
            </Link>
            <Link to="/technologies" className="inline-flex items-center gap-2 px-6 py-3 border-2 border-[#0050a9] text-[#0050a9] font-semibold rounded-full hover:bg-[#0050a9] hover:text-white transition-colors">
              ← All Technologies
            </Link>
          </div>
        </div>
      </section>

      <Footer />
      <MobileNav />
    </div>
  )
}
