import Header from '../components/Header'
import JumpTo from '../components/JumpTo'
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
 *   -> Governance -> Discuss a program
 *
 * This sequence is frozen. New material belongs on the page it is about  a capability
 * page under /capabilities, an industry page under /industries, a case study under /work
 *  and is reached from the section here that already covers it. Adding another card grid
 * to this page is not the way to surface something new.
 */
/**
 * The landmarks the floating navigator offers. Six, not eleven: a map of the page, not a
 * second navigation bar. Each id matches a wrapper below.
 */
const JUMP_ITEMS = [
  { id: 'overview', label: 'Overview' },
  { id: 'what-we-do', label: 'What we do' },
  { id: 'how-we-deliver', label: 'How we deliver' },
  { id: 'industries', label: 'Industries' },
  { id: 'global-fleet', label: 'Global fleet' },
  { id: 'geoai', label: 'GeoAI' },
  { id: 'work', label: 'Our work' },
  { id: 'contact', label: 'Get in touch' },
]

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <JumpTo items={JUMP_ITEMS} />
      <main>
        {/* jump-target adds the scroll offset for the fixed header. */}
        <div id="overview" className="jump-target">
          <Hero />
          <VerifiedScale />
        </div>
        <div id="what-we-do" className="jump-target">
          <WhatJsanDoes />
        </div>
        <div id="how-we-deliver" className="jump-target">
          <OperationalLifecycle />
        </div>
        <div id="industries" className="jump-target">
          <IndustryPanels />
        </div>
        <div id="global-fleet" className="jump-target">
          <GlobalFleetFeature />
        </div>
        <div id="geoai" className="jump-target">
          <GeoAIFeature />
        </div>
        <div id="work" className="jump-target">
          <FeaturedWork />
        </div>
        <GlobalDelivery />
        <GovernanceModel />
        {/* <InsightsTeaser /> */}
        <div id="contact" className="jump-target">
          <FinalCTA />
        </div>
      </main>
      <Footer />
      <MobileNav />
      <Chatbot />
    </div>
  )
}
