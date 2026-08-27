import { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { capabilityPillars } from './data/capabilityPillars'
import ScrollToTop from './components/ScrollToTop'
import Seo from './components/Seo'
import ProtectLogos from './components/ProtectLogos'
import BackToTop from './components/BackToTop'
import ScrollReveal from './components/ScrollReveal'

const Home = lazy(() => import('./pages/Home'))
const About = lazy(() => import('./pages/About'))
const Products = lazy(() => import('./pages/Products'))
const Contact = lazy(() => import('./pages/Contact'))
const Industries = lazy(() => import('./pages/Industries'))
const News = lazy(() => import('./pages/News'))
const NewsDetail = lazy(() => import('./pages/News').then((m) => ({ default: m.NewsDetail })))
const Careers = lazy(() => import('./pages/Careers'))
const CareerDetail = lazy(() => import('./pages/CareerDetail'))
const JsanVTS = lazy(() => import('./pages/products/JsanVTS'))
const JsanPOIExpress = lazy(() => import('./pages/products/JsanPOIExpress'))
const JsanTravelDesk = lazy(() => import('./pages/products/JsanTravelDesk'))
const JsanGeoDiscover = lazy(() => import('./pages/products/JsanGeoDiscover'))
const JsanFleetIntelligence = lazy(() => import('./pages/products/JsanFleetIntelligence'))
const GeospatialSolutions = lazy(() => import('./pages/services/GeospatialSolutions'))
const GeospatialSubService = lazy(() => import('./pages/services/GeospatialSubService'))
const LocationIntelligence = lazy(() => import('./pages/services/LocationIntelligence'))
const LocationIntelligenceSubService = lazy(() => import('./pages/services/LocationIntelligenceSubService'))
const TechnologyConsultancy = lazy(() => import('./pages/services/TechnologyConsultancyNew'))
const TechnologyConsultancySubService = lazy(() => import('./pages/services/TechnologyConsultancySubService'))
const BusinessAdvisory = lazy(() => import('./pages/services/BusinessAdvisory'))
const ProgramManagement = lazy(() => import('./pages/services/ProgramManagementNew'))
const ProgramManagementSubService = lazy(() => import('./pages/services/ProgramManagementSubService'))
const StaffingSolutions = lazy(() => import('./pages/services/StaffingSolutionsNew'))
const StaffingSolutionsSubService = lazy(() => import('./pages/services/StaffingSolutionsSubService'))
const TransportMobility = lazy(() => import('./pages/industries/TransportMobility'))
const Energy = lazy(() => import('./pages/industries/Energy'))
const Consulting = lazy(() => import('./pages/industries/Consulting'))
const SmartCities = lazy(() => import('./pages/industries/SmartCities'))
const MappingLocationPlatforms = lazy(() => import('./pages/industries/MappingLocationPlatforms'))
const AutonomousMobility = lazy(() => import('./pages/industries/AutonomousMobility'))
const Telecommunications = lazy(() => import('./pages/industries/Telecommunications'))
const Services = lazy(() => import('./pages/Services'))
const Technologies = lazy(() => import('./pages/Technologies'))
const TechnologyDetail = lazy(() => import('./pages/technologies/TechnologyDetail'))
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'))
const InHouseApps = lazy(() => import('./pages/InHouseApps'))
const ERPServices = lazy(() => import('./pages/services/ERPServices'))
const DigitalEngineering = lazy(() => import('./pages/services/DigitalEngineering'))
const SmartFiberPlanning = lazy(() => import('./pages/services/SmartFiberPlanning'))
const SmartFiberPlanningSubService = lazy(() => import('./pages/services/SmartFiberPlanningSubService'))
const TelecomNetworkIntelligence = lazy(() => import('./pages/services/TelecomNetworkIntelligence'))
const BasemapPOIAnnotation = lazy(() => import('./pages/services/BasemapPOIAnnotation'))
const BasemapSubService = lazy(() => import('./pages/services/BasemapSubService'))
const UtilityNetworkIntelligence = lazy(() => import('./pages/services/UtilityNetworkIntelligence'))
const UtilityNetworkSubService = lazy(() => import('./pages/services/UtilityNetworkSubService'))
const GeoAIComputerVision = lazy(() => import('./pages/services/GeoAIComputerVision'))
const GlobalStreetDataCollection = lazy(() => import('./pages/services/GlobalStreetDataCollection'))
const GlobalFleetCollectionOperations = lazy(() => import('./pages/services/GlobalFleetCollectionOperations'))
const DataCenterLifecycle = lazy(() => import('./pages/services/DataCenterLifecycle'))
const DataCenterSubService = lazy(() => import('./pages/services/DataCenterSubService'))
const Blogs = lazy(() => import('./pages/Blogs'))
const BlogDetail = lazy(() => import('./pages/BlogDetail'))
const CapabilityDetail = lazy(() => import('./pages/capabilities/CapabilityDetail'))
const Capabilities = lazy(() => import('./pages/Capabilities'))
const CapabilityPillar = lazy(() => import('./pages/capabilities/CapabilityPillar'))
const Work = lazy(() => import('./pages/Work'))
const WorkDetail = lazy(() => import('./pages/work/WorkDetail'))
const AdminApp = lazy(() => import('./pages/admin/AdminApp'))
const NotFound = lazy(() => import('./pages/NotFound'))

function PageFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="h-10 w-10 rounded-full border-2 border-[#0050a9] border-t-transparent animate-spin" />
    </div>
  )
}

function App() {
  return (
    <Router>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <ScrollToTop />
      <Seo />
      <ProtectLogos />
      <BackToTop />
      <ScrollReveal />
      <div id="main-content">
        <Suspense fallback={<PageFallback />}>
        <Routes>
          <Route path="/" element={<Home />} />

          {/* Company. /about is the legacy URL and redirects so old links keep working. */}
          <Route path="/company" element={<About />} />
          <Route path="/about" element={<Navigate to="/company" replace />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/industries" element={<Industries />} />
          <Route path="/news" element={<News />} />
          <Route path="/news/:slug" element={<NewsDetail />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/careers/:jobId" element={<CareerDetail />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/geospatial" element={<GeospatialSolutions />} />
          <Route path="/services/geospatial/:slug" element={<GeospatialSubService />} />
          <Route path="/services/location-intelligence" element={<LocationIntelligence />} />
          <Route path="/services/location-intelligence/:slug" element={<LocationIntelligenceSubService />} />
          <Route path="/services/technology-consultancy" element={<TechnologyConsultancy />} />
          <Route path="/services/technology-consultancy/:slug" element={<TechnologyConsultancySubService />} />
          <Route path="/services/business-advisory" element={<BusinessAdvisory />} />
          <Route path="/services/program-management" element={<ProgramManagement />} />
          <Route path="/services/program-management/:slug" element={<ProgramManagementSubService />} />
          <Route path="/services/staffing-solutions" element={<StaffingSolutions />} />
          <Route path="/services/staffing-solutions/:slug" element={<StaffingSolutionsSubService />} />
          <Route path="/technologies" element={<Technologies />} />
          <Route path="/technologies/:slug" element={<TechnologyDetail />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/jsan-vts" element={<JsanVTS />} />
          <Route path="/products/poi-express" element={<JsanPOIExpress />} />
          <Route path="/products/travel-desk" element={<JsanTravelDesk />} />
          <Route path="/products/geodiscover" element={<JsanGeoDiscover />} />
          <Route path="/products/fleet-intelligence" element={<JsanFleetIntelligence />} />
          <Route path="/industries/transportation-infrastructure" element={<TransportMobility />} />
          <Route path="/industries/utilities" element={<Energy />} />
          <Route path="/industries/government-smart-cities" element={<SmartCities />} />
          <Route path="/industries/consulting" element={<Consulting />} />
          {/* Legacy industry slugs */}
          <Route
            path="/industries/transport"
            element={<Navigate to="/industries/transportation-infrastructure" replace />}
          />
          <Route path="/industries/energy" element={<Navigate to="/industries/utilities" replace />} />
          <Route
            path="/industries/smartcities"
            element={<Navigate to="/industries/government-smart-cities" replace />}
          />
          <Route path="/industries/mapping-location-platforms" element={<MappingLocationPlatforms />} />
          <Route path="/industries/autonomous-mobility" element={<AutonomousMobility />} />
          <Route path="/industries/telecommunications" element={<Telecommunications />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/in-house-apps" element={<InHouseApps />} />
          <Route path="/services/erp" element={<ERPServices />} />
          <Route path="/services/digital-engineering" element={<DigitalEngineering />} />
          <Route path="/services/smart-fiber-planning" element={<SmartFiberPlanning />} />
          <Route path="/services/smart-fiber-planning/:slug" element={<SmartFiberPlanningSubService />} />
          <Route path="/services/telecom-network-intelligence" element={<TelecomNetworkIntelligence />} />
          <Route path="/services/basemap-poi-annotation" element={<BasemapPOIAnnotation />} />
          <Route path="/services/basemap-poi-annotation/:slug" element={<BasemapSubService />} />
          <Route path="/services/utility-network-intelligence" element={<UtilityNetworkIntelligence />} />
          <Route path="/services/utility-network-intelligence/:slug" element={<UtilityNetworkSubService />} />
          <Route path="/services/geoai-computer-vision" element={<GeoAIComputerVision />} />
          <Route path="/services/global-street-data-collection" element={<GlobalStreetDataCollection />} />
          <Route path="/services/global-fleet-collection-operations" element={<GlobalFleetCollectionOperations />} />
          <Route path="/services/data-center-lifecycle" element={<DataCenterLifecycle />} />
          <Route path="/services/data-center-lifecycle/:slug" element={<DataCenterSubService />} />
          {/* Capability hub layer. These static paths outrank /capabilities/:slug below. */}
          <Route path="/capabilities" element={<Capabilities />} />
          {capabilityPillars.map((pillar) => (
            <Route
              key={pillar.slug}
              path={`/capabilities/${pillar.slug}`}
              element={<CapabilityPillar />}
            />
          ))}
          <Route path="/capabilities/:slug" element={<CapabilityDetail />} />

          {/* Work */}
          <Route path="/work" element={<Work />} />
          <Route path="/work/:slug" element={<WorkDetail />} />
          <Route path="/insights" element={<Blogs />} />
          <Route path="/blogs" element={<Navigate to="/insights" replace />} />
          <Route path="/blogs/:slug" element={<BlogDetail />} />
          <Route path="/admin" element={<AdminApp />} />

          {/* Catch-all. Without this an unknown URL matched nothing and rendered a blank
              200; NotFound marks itself noindex and the server sends a real 404. */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        </Suspense>
      </div>
    </Router>
  )
}

export default App
