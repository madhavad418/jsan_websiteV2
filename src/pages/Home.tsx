import Header from '../components/Header'
import Hero from '../components/Hero'
import VerifiedScale from '../components/VerifiedScale'
import WhatJsanDoes from '../components/WhatJsanDoes'
import OperationalLifecycle from '../components/OperationalLifecycle'
import IndustryPanels from '../components/IndustryPanels'
import GlobalFleetFeature from '../components/GlobalFleetFeature'
import GeoAIFeature from '../components/GeoAIFeature'
import FeaturedWork from '../components/FeaturedWork'
import GlobalDelivery from '../components/GlobalDelivery'
import GovernanceModel from '../components/GovernanceModel'
import FinalCTA from '../components/FinalCTA'
import Footer from '../components/Footer'
import MobileNav from '../components/MobileNav'
import Chatbot from '../components/Chatbot'

/**
 * The homepage tells one business story, in this order, and does not grow past it:
 *
 *   Hero -> Verified scale -> Operate/Map/Intelligence/Engineer -> How JSAN delivers
 *   -> Industries -> Global fleet -> GeoAI -> Featured work -> Global delivery
 *   -> Governance -> Insights -> Discuss a program
 *
 * This sequence is frozen. New material belongs on the page it is about  a capability
 * page under /capabilities, an industry page under /industries, a case study under /work
 *  and is reached from the section here that already covers it. Adding another card grid
 * to this page is not the way to surface something new.
 */
export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <VerifiedScale />
        <WhatJsanDoes />
        <OperationalLifecycle />
        <IndustryPanels />
        <GlobalFleetFeature />
        <GeoAIFeature />
        <FeaturedWork />
        <GlobalDelivery />
        <GovernanceModel />
        {/* <InsightsTeaser /> */}
        <FinalCTA />
      </main>
      <Footer />
      <MobileNav />
      <Chatbot />
    </div>
  )
}
