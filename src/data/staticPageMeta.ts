/**
 * Search and social metadata for pages whose copy lives inside a page component.
 *
 * Pages backed by data files (capabilities, work, insights, news, careers) take their
 * title and description from that data instead - see scripts/generate-page-meta.mjs,
 * which merges both into src/data/page-meta.json and fails the build when a sitemap URL
 * has no entry, a description is too long, or retired positioning slips back in.
 *
 * Titles are "<Page> | JSAN". Descriptions stay under 160 characters.
 */
export type PageMeta = { title: string; description: string }

export const SITE_TITLE = 'JSAN | Global Geospatial, Field Operations & Technology Partner'
export const SITE_DESCRIPTION =
  'JSAN supports global mapping, mobility, telecom and infrastructure programs — from field mobilisation and data collection through engineering, GeoAI, quality assurance and managed operations.'

export const staticPageMeta: Record<string, PageMeta> = {
  '/': { title: SITE_TITLE, description: SITE_DESCRIPTION },

  // Company
  '/company': {
    title: 'About JSAN | Company & Global Presence',
    description: 'JSAN is a global geospatial, field operations and digital engineering partner, supporting mapping, mobility, telecom and infrastructure programs from 25+ offices.',
  },
  '/contact': {
    title: 'Contact JSAN | 25+ Offices Worldwide',
    description: 'Talk to JSAN about field operations, geospatial data, LiDAR, GeoAI or digital engineering. Reach our team through 25+ offices across EMEA, the Americas and APAC.',
  },
  '/careers': {
    title: 'Careers at JSAN | Field, Geospatial & Technology Roles',
    description: 'Join a global team shaping the future of geospatial technology — in the field, in the office and everywhere the work takes us. Browse open roles at JSAN.',
  },
  '/insights': {
    title: 'Insights & News | JSAN',
    description: 'Field perspectives on geospatial intelligence, mapping, telecom and digital engineering, alongside JSAN company news — newest first.',
  },
  '/privacy-policy': {
    title: 'Privacy Policy | JSAN',
    description: 'How JSAN Consulting LTD collects, uses, stores and protects personal data in line with the EU GDPR and UK GDPR, and the rights you can exercise.',
  },

  // Capabilities hub
  '/capabilities': {
    title: 'Capabilities | JSAN',
    description: 'Connected capability pillars run as one operating model — from mobilising crews in the field to the systems your teams work in every day.',
  },

  // LiDAR application products: Road Asset Intelligence, Pavement Intelligence and
  // LiDAR Viewer 360 are sections of this page (anchors #lidar-road-asset-intelligence,
  // #lidar-pavement-intelligence, #jsan-lidar-viewer-360), so the page title names them.
  '/capabilities/lidar-3d-application-development': {
    title: 'LiDAR Road Asset, Pavement & Viewer 360 Applications | JSAN',
    description: 'LiDAR hosting and viewing, Road Asset Intelligence, Pavement Intelligence (PCI and PASER) and JSAN LiDAR Viewer 360 — turning point clouds into decisions.',
  },

  // Industries
  '/industries': {
    title: 'Industries | JSAN',
    description: 'One operating model, tuned to what each sector has to prove: mapping and location platforms, autonomous mobility, telecom, utilities, transport and government.',
  },
  '/industries/mapping-location-platforms': {
    title: 'Mapping & Location Platforms | JSAN',
    description: 'Map data that stays current, country after country — local freshness, verifiable coverage and fast mobilisation for map, navigation and location-data providers.',
  },
  '/industries/autonomous-mobility': {
    title: 'Autonomous Mobility | JSAN',
    description: 'Operational support for autonomous mobility deployment: field operations, mapping, fleet readiness, route evidence, geospatial QA and scalable delivery.',
  },
  '/industries/telecommunications': {
    title: 'Telecommunications | JSAN',
    description: 'Accurate as-built records, survey-grade asset data and engineering support for operators, tower companies and fibre builders, from planning to operations.',
  },
  '/industries/utilities': {
    title: 'Utilities | JSAN',
    description: 'Reconcile the asset register, the GIS and the physical network for electricity, water and gas utilities carrying decades of inherited records.',
  },
  '/industries/transportation-infrastructure': {
    title: 'Transportation & Infrastructure | JSAN',
    description: 'Fleet management, route optimisation, real-time tracking and mobility intelligence for transport and infrastructure operators.',
  },
  '/industries/government-smart-cities': {
    title: 'Government & Smart Cities | JSAN',
    description: 'Evidence-backed geospatial data and field verification for municipalities, agencies and public infrastructure bodies whose decisions must stand up to scrutiny.',
  },
  '/industries/consulting': {
    title: 'Consulting & Professional Services | JSAN',
    description: 'Delivery partnership for consulting firms: resource augmentation, specialist geospatial and technology expertise, and knowledge transfer.',
  },

  // Products
  '/products': {
    title: 'Products | JSAN In-House Platforms',
    description: 'Platforms JSAN built because its own operations needed them — run live on JSAN programmes before they are offered to anyone else.',
  },
  '/in-house-apps': {
    title: 'In-House Apps | JSAN',
    description: 'Applications developed, deployed and operated by the JSAN team, proven in production on real field and data programmes.',
  },
  '/products/fleet-intelligence': {
    title: 'JSAN ATLAS Ops | Fleet Intelligence Platform',
    description: 'JSAN ATLAS Ops matches every kilometre driven to the road it belongs to, showing how much of the contracted network is finished — with no driver input.',
  },
  '/products/geodiscover': {
    title: 'JSAN GeoDiscover | POI Coverage Comparison',
    description: 'Compare point-of-interest coverage across map providers and see what each one is missing, with every finding backed by evidence in an audit-ready workbook.',
  },
  '/products/jsan-vts': {
    title: 'JSAN VTS | Vehicle Tracking & Fleet Management',
    description: 'Internal fleet management with real-time tracking, driver management and operational oversight across web and mobile.',
  },
  '/products/poi-express': {
    title: 'JSAN POI Express | POI Data Collection App',
    description: 'AI-assisted POI data collection with tiered quality control and an offline-first mobile experience for field teams.',
  },
  '/products/travel-desk': {
    title: 'JSAN Travel Desk | Travel Management Platform',
    description: 'Corporate travel management with role-based workflows, multi-stage approvals and coordinated booking.',
  },

  // Work
  '/work': {
    title: 'Work & Case Studies | JSAN',
    description: 'Programmes JSAN runs end to end, from mobilisation through validated delivery. Shown anonymised where client naming permission is not yet in place.',
  },

  // Technologies
  '/technologies': {
    title: 'Technologies | JSAN',
    description: 'Geospatial, analytics, cloud, security and automation expertise across ten technology domains, delivered by certified specialists.',
  },
  '/technologies/gis': {
    title: 'GIS Technologies | JSAN',
    description: 'Geographic information system solutions, from spatial analysis and enterprise mapping to in-house products for fleet tracking, POI management and travel.',
  },
  '/technologies/api-integration': {
    title: 'API Integration & Management | JSAN',
    description: 'Connect systems, applications and data sources. JSAN designs, develops and manages the APIs behind your digital ecosystem.',
  },
  '/technologies/analytics': {
    title: 'Analytics & Information Management | JSAN',
    description: 'Turn raw data into decisions with analytics, business intelligence and information management solutions.',
  },
  '/technologies/cloud': {
    title: 'Cloud Technologies | JSAN',
    description: 'AWS, Azure and Google Cloud expertise, from migration to optimisation, to build and run cloud-native platforms.',
  },
  '/technologies/cyber-security': {
    title: 'Cyber Security | JSAN',
    description: 'Protect digital assets with threat assessment, SIEM, zero-trust architecture and compliance management.',
  },
  '/technologies/data-warehouse': {
    title: 'Data Warehousing | JSAN',
    description: 'Scalable data warehouse solutions for storing, retrieving and analysing enterprise data, enabling reporting and AI at scale.',
  },
  '/technologies/devops': {
    title: 'DevOps | JSAN',
    description: 'Accelerate software delivery with DevOps practices, CI/CD pipelines, infrastructure as code and site reliability engineering.',
  },
  '/technologies/automation': {
    title: 'Intelligent Automation & Robotics | JSAN',
    description: 'Transform business processes with RPA, AI-powered automation and intelligent document processing.',
  },
  '/technologies/it-infrastructure': {
    title: 'IT Infrastructure & Managed Services | JSAN',
    description: 'NOC operations, cloud hosting, network design and 24/7 support to build and manage robust IT infrastructure.',
  },
  '/technologies/web': {
    title: 'Web Technologies | JSAN',
    description: 'Web applications built with modern frameworks and responsive design, measured against real user outcomes.',
  },

  // Services
  '/services': {
    title: 'Services | JSAN',
    description: 'Geospatial solutions, field operations, digital engineering and program delivery from one global partner, helping organisations grow, adapt and lead.',
  },
  '/services/geospatial': {
    title: 'Geospatial Solutions | JSAN',
    description: 'From street-level imagery and LiDAR to roads, addresses, POIs and infrastructure assets, JSAN delivers geospatial data engineered for operational use.',
  },
  '/services/global-street-data-collection': {
    title: 'Global Street Data Collection | JSAN',
    description: 'Imagery, geometry, addresses and assets, captured systematically, country after country, by JSAN field and collection teams.',
  },
  '/services/global-fleet-collection-operations': {
    title: 'Global Fleet & Collection Operations | JSAN',
    description: 'Deploy and manage vehicles, crews, sensors and collection programs across markets with centralised operational visibility.',
  },
  '/services/geoai-computer-vision': {
    title: 'GeoAI & Computer Vision | JSAN',
    description: 'Computer vision, spatial analytics and human validation that extract decision-ready information from imagery, LiDAR and mapping datasets.',
  },
  '/services/basemap-poi-annotation': {
    title: 'Basemap, POI & Address Intelligence | JSAN',
    description: 'The foundational map data behind navigation, location intelligence and AI: basemap production, POI operations and annotation.',
  },
  '/services/telecom-network-intelligence': {
    title: 'Telecom Network Intelligence | JSAN',
    description: 'Field data, LiDAR, GIS and engineering workflows that help telecom organisations plan, validate and manage physical network infrastructure.',
  },
  '/services/utility-network-intelligence': {
    title: 'Utilities Mapping | JSAN',
    description: 'Electric, gas, water and telecom networks modelled as connected assets, from field survey and digitisation to enterprise GIS.',
  },
  '/services/pole-asset-intelligence': {
    title: 'Pole & Asset Intelligence | JSAN',
    description: 'Know every pole, everything attached to it, and whether it can carry one more — survey, attachment inventory and loading analysis.',
  },
  '/services/smart-fiber-planning': {
    title: 'Smart Fiber Planning | JSAN',
    description: 'Fiber network planning, deployment support and proactive maintenance for future-ready telecom infrastructure.',
  },
  '/services/data-center-lifecycle': {
    title: 'Data Center Lifecycle & Field Support | JSAN',
    description: 'One accountable service layer for enterprise, hyperscale, edge and telecom infrastructure: SLAs, controlled dispatch, evidence and governance.',
  },
  '/services/digital-engineering': {
    title: 'Digital Engineering Services | JSAN',
    description: 'GIS, data and enterprise applications that connect field workflows, operational intelligence and business systems.',
  },
  '/services/program-management': {
    title: 'Program Management | JSAN',
    description: 'Structured program management across field, data, engineering and technology operations, with transparent governance and risk control.',
  },
  '/services/location-intelligence': {
    title: 'Location Intelligence | JSAN',
    description: 'Location intelligence for site selection, risk assessment, supply chain optimisation and strategic planning.',
  },
  '/services/technology-consultancy': {
    title: 'Technology Consultancy | JSAN',
    description: 'Modernise how your business runs on technology with smart, practical solutions and delivery expertise.',
  },
  '/services/staffing-solutions': {
    title: 'Staffing Solutions | JSAN',
    description: 'Tailored workforce strategies combining flexible talent sourcing, compliance management and scalable deployment.',
  },
  '/services/business-advisory': {
    title: 'Business Advisory | JSAN',
    description: 'Advisory services that turn complex business challenges into actionable strategies for growth and operational improvement.',
  },
  '/services/erp': {
    title: 'ERP Services | JSAN',
    description: 'SAP, Oracle and Microsoft Dynamics ERP implementation, customisation and managed services.',
  },

  // Basemap, POI & annotation sub-services
  '/services/basemap-poi-annotation/basemap-production': {
    title: 'Basemap Production & Maintenance | JSAN',
    description: 'Core map layers — roads, buildings, land use, hydrography and boundaries — compiled from imagery, LiDAR and field sources and kept up to date.',
  },
  '/services/basemap-poi-annotation/poi-operations': {
    title: 'POI Data Operations | JSAN',
    description: 'A governed POI lifecycle — sourced, normalised, matched, field-validated and delivered with evidence — so places data stays fresh and trustworthy.',
  },
  '/services/basemap-poi-annotation/annotation': {
    title: 'Map & Imagery Annotation | JSAN',
    description: 'Controlled-ontology annotation of imagery and map features, with reviewer calibration and QC, producing traceable AI training data.',
  },

  // Utilities sub-services
  '/services/utility-network-intelligence/electrical': {
    title: 'Electrical Network Digitisation | JSAN',
    description: 'Electrical networks moved from base-map preparation and pole-to-pole survey through topology QA to enterprise GIS migration.',
  },
  '/services/utility-network-intelligence/water': {
    title: 'Water Distribution GIS | JSAN',
    description: 'Water distribution asset mapping and consumer indexing for zone-level control of the network.',
  },
  '/services/utility-network-intelligence/gas': {
    title: 'Gas Network Digitisation | JSAN',
    description: 'Safety-critical asset traceability and pressure-area intelligence for gas distribution networks.',
  },

  // Data center sub-services
  '/services/data-center-lifecycle/preventive-maintenance': {
    title: 'Preventive Maintenance | Data Center Support | JSAN',
    description: 'Procedure-led preventive maintenance: scheduled inspections, MOP-controlled execution and condition-based planning against risk.',
  },
  '/services/data-center-lifecycle/corrective-maintenance': {
    title: 'Corrective Maintenance | Data Center Support | JSAN',
    description: 'A governed restoration process — detect, diagnose, plan, repair, validate and improve — across compute, storage, network, power and facilities.',
  },
  '/services/data-center-lifecycle/power-facility': {
    title: 'Power & Facility Support | JSAN',
    description: 'Power-chain, thermal and high-density readiness under one governance model, with electrical safety controls.',
  },
  '/services/data-center-lifecycle/smart-remote-hands': {
    title: 'Smart / Remote Hands | JSAN',
    description: 'Governed onsite remote hands for power cycles, patching, media, console and installs, with backout plans and evidence capture.',
  },
  '/services/data-center-lifecycle/asset-lifecycle': {
    title: 'Asset & Lifecycle Management | JSAN',
    description: 'Identity, condition and lifecycle control for every asset: CMDB, EOL/EOS, warranty, spares, refresh waves and secure disposal.',
  },
  '/services/data-center-lifecycle/disaster-recovery': {
    title: 'Disaster Recovery Support | JSAN',
    description: 'Coordinated site action for power, compute and network incidents: P1 bridges, controlled dispatch, spares and OEM escalation.',
  },
  '/services/data-center-lifecycle/governance-reporting': {
    title: 'Governance & Reporting | Data Center Support | JSAN',
    description: 'Monthly visibility of service health, risk and improvement, from daily incident bridges to quarterly business reviews.',
  },

  // Location intelligence sub-services
  '/services/location-intelligence/strategy-advisory': {
    title: 'Location Intelligence Strategy & Advisory | JSAN',
    description: 'Technology selection, data governance, organisational readiness and ROI planning for a location intelligence strategy.',
  },
  '/services/location-intelligence/custom-platforms': {
    title: 'Custom Geospatial Platforms | JSAN',
    description: 'Custom location intelligence platforms, from web dashboards and mobile field apps to enterprise GIS portals.',
  },
  '/services/location-intelligence/advanced-analytics': {
    title: 'Advanced Location Analytics | JSAN',
    description: 'Spatial data science and machine learning for demand prediction, site selection, risk modelling and market intelligence.',
  },

  // Technology consultancy sub-services
  '/services/technology-consultancy/data-analytics-ai': {
    title: 'Data Analytics & AI | JSAN',
    description: 'Data pipelines, predictive models and dashboards that turn raw data into decisions.',
  },
  '/services/technology-consultancy/cloud-infrastructure': {
    title: 'Cloud Infrastructure | JSAN',
    description: 'Cloud strategy, migration, hybrid infrastructure management and DevOps enablement at enterprise scale.',
  },
  '/services/technology-consultancy/enterprise-architecture': {
    title: 'Enterprise Architecture | JSAN',
    description: 'Align IT strategy with business goals through scalable, secure and maintainable technology landscapes.',
  },
  '/services/technology-consultancy/digital-transformation': {
    title: 'Digital Transformation | JSAN',
    description: 'Reimagine processes and customer experiences through automation, cloud migration and data-driven decision-making.',
  },

  // Program management sub-services
  '/services/program-management/pmo-setup': {
    title: 'PMO Setup | JSAN',
    description: 'Design and operationalise Project Management Offices, from lightweight governance frameworks to full enterprise PMOs.',
  },
  '/services/program-management/agile-transformation': {
    title: 'Agile Transformation | JSAN',
    description: 'Move from waterfall to agile and hybrid delivery, embedding Scrum, SAFe and Kanban practices across teams.',
  },
  '/services/program-management/quality-assurance': {
    title: 'Quality Assurance | JSAN',
    description: 'Quality built into the project lifecycle, from requirements validation and test strategy to automated testing.',
  },

  // Staffing sub-services
  '/services/staffing-solutions/contract-staffing': {
    title: 'Contract Staffing | JSAN',
    description: 'Skilled professionals on flexible engagement models, from short-term project support to long-term managed teams.',
  },
  '/services/staffing-solutions/permanent-placement': {
    title: 'Permanent Placement | JSAN',
    description: 'Identify, evaluate and secure technology talent for critical long-term roles, with rigorous screening.',
  },
  '/services/staffing-solutions/team-augmentation': {
    title: 'Team Augmentation | JSAN',
    description: 'Skilled professionals embedded in your existing teams, working under your management and delivery cadence.',
  },
  '/services/staffing-solutions/executive-search': {
    title: 'Executive Search | JSAN',
    description: 'Find senior technology leaders — CTOs, CIOs and heads of engineering and transformation — to drive organisational change.',
  },

  // Smart fiber planning sub-services
  '/services/smart-fiber-planning/network-planning-design': {
    title: 'Fiber Network Planning & Design | JSAN',
    description: 'Fiber network design with route optimisation, geospatial intelligence and demand-based capacity forecasting.',
  },
  '/services/smart-fiber-planning/smart-deployment': {
    title: 'Smart Fiber Deployment | JSAN',
    description: 'Drone surveys, digital twin models and automated feasibility analysis to deploy fiber with fewer surprises in the field.',
  },
  '/services/smart-fiber-planning/proactive-maintenance': {
    title: 'Proactive Fiber Maintenance | JSAN',
    description: 'Network monitoring, predictive analytics and fault detection that catch issues before they reach customers.',
  },
  '/services/smart-fiber-planning/reliability-sla-support': {
    title: 'Fiber Reliability & SLA Support | JSAN',
    description: 'Preventive maintenance, fiber health assessments and SLA-backed support that keep networks performing.',
  },
  '/services/smart-fiber-planning/visibility-dashboards': {
    title: 'Fiber Network Visibility Dashboards | JSAN',
    description: 'Topology, performance, faults and forecasts in a single operational view for NOC operators, planners and executives.',
  },
  '/services/smart-fiber-planning/scalable-future-growth': {
    title: 'Fiber Capacity Planning & Growth | JSAN',
    description: 'Data-driven capacity planning, expansion roadmaps and cost optimisation to scale fiber networks.',
  },

  // Geospatial sub-services
  '/services/geospatial/network-mapping': {
    title: 'Network Mapping | JSAN',
    description: 'Drone-based inspection and mapping of telecom towers, fibre routes and utility networks for analysis and maintenance.',
  },
  '/services/geospatial/asset-management': {
    title: 'Geospatial Asset Management | JSAN',
    description: 'Track, visualise and maintain physical infrastructure — from utility poles and pipelines to fleets and facilities — using location data.',
  },
  '/services/geospatial/ai-ml-detection': {
    title: 'AI & ML Feature Detection | JSAN',
    description: 'AI and machine learning models that detect, classify and extract features from aerial and satellite imagery.',
  },
  '/services/geospatial/geobim-indoor': {
    title: 'GeoBIM & Indoor Intelligence | JSAN',
    description: 'Building Information Modelling integrated with geospatial data for coordinated indoor-outdoor intelligence.',
  },
  '/services/geospatial/smart-city': {
    title: 'Smart City Solutions | JSAN',
    description: 'Real-time location data and IoT sensor networks for traffic, energy, public safety and environmental monitoring.',
  },
}
