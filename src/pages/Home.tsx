import Header from '../components/Header'
import Hero from '../components/Hero'
// import TrustBar from '../components/TrustBar'
import WhatJsanDoes from '../components/WhatJsanDoes'
import OperatingModel from '../components/OperatingModel'
import IndustryPanels from '../components/IndustryPanels'
import GlobalFleetFeature from '../components/GlobalFleetFeature'
import GeoAIFeature from '../components/GeoAIFeature'
import FeaturedWork from '../components/FeaturedWork'
import WhyJsan from '../components/WhyJsan'
import OperationalAssurance from '../components/OperationalAssurance'
import GlobalDelivery from '../components/GlobalDelivery'
import TechnologyCapability from '../components/TechnologyCapability'
import FinalCTA from '../components/FinalCTA'
import OurServices from '../components/OurServices'
import Methodology from '../components/Methodology'
// import InsightsTeaser from '../components/InsightsTeaser'
import Footer from '../components/Footer'
import MobileNav from '../components/MobileNav'
import Chatbot from '../components/Chatbot'

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* 01 Hero, 02 Trust bar, 03 What JSAN does  the spec sequence */}
        <Hero />
        {/* <TrustBar /> */}
        <WhatJsanDoes />
        <OperatingModel />
        <IndustryPanels />
        <GlobalFleetFeature />
        <GeoAIFeature />
        <FeaturedWork />
        <WhyJsan />
        <OperationalAssurance />
        <GlobalDelivery />
        <TechnologyCapability />
        {/* <InsightsTeaser /> */}
        <FinalCTA />
        {/* Retained from the previous homepage, below the spec sequence */}
        <OurServices />
        <Methodology />
      </main>
      <Footer />
      <MobileNav />
      <Chatbot />
    </div>
  )
}
