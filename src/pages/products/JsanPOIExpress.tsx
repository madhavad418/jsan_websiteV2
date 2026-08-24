// Carousel state  restore with the commented dashboard screenshots below.
// import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Brain, WifiOff, Shapes, Radio, Eye, Shield, Layers, Users, TrendingUp, Clock, Zap, Smartphone, Star, ArrowRight, CheckCircle, Target, Award, BarChart3, MapPin } from 'lucide-react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import MobileNav from '../../components/MobileNav'

const metrics = [
  { value: '80%', label: 'Reduction in Manual Entry', description: 'Through AI photo analysis', icon: Zap },
  { value: '75%', label: 'Cost Savings', description: 'Via streamlined processes', icon: TrendingUp },
  { value: '90%', label: 'AI Accuracy', description: 'For data extraction', icon: Target },
  { value: '95%', label: 'Error Detection', description: 'Rate in QC workflow', icon: Shield },
]

const features = [
  { icon: Brain, title: 'AI POI Detection', description: 'Automatic extraction of point of interest data from photos using advanced machine learning.', gradient: 'from-blue-600 to-cyan-500' },
  { icon: Eye, title: 'Auto Image Blurring', description: 'Privacy-focused sensitive content masking for GDPR and compliance requirements.', gradient: 'from-blue-500 to-cyan-500' },
  { icon: Layers, title: 'Streamlined QC', description: '3-tier queue validation workflow ensuring data quality at every stage.', gradient: 'from-green-500 to-emerald-500' },
  { icon: Shapes, title: 'Smart Polygons', description: 'Territory optimization tools for efficient field team deployment.', gradient: 'from-orange-500 to-amber-500' },
  { icon: Zap, title: 'Cascading Categories', description: 'Hierarchical POI organization for structured data management.', gradient: 'from-yellow-500 to-orange-500' },
  { icon: Shield, title: 'Dual-Storage Images', description: 'Original and privacy-protected versions for compliance and operations.', gradient: 'from-blue-600 to-cyan-500' },
  { icon: WifiOff, title: 'Offline-First Design', description: 'Full functionality without connectivity for remote field operations.', gradient: 'from-indigo-500 to-violet-500' },
  { icon: Radio, title: 'Real-Time Tracking', description: 'WebSocket-powered team location updates for live oversight.', gradient: 'from-teal-500 to-cyan-500' },
]

const roles = [
  { title: 'Super Admin', description: 'Full system control and configuration', color: 'from-[#1b497b] to-[#0d2a47]', icon: Shield },
  { title: 'Manager', description: 'Team oversight and performance tracking', color: 'from-[#2a5a8f] to-[#1b497b]', icon: BarChart3 },
  { title: 'QA Specialist', description: 'Quality validation and data verification', color: 'from-[#3a6a9f] to-[#2a5a8f]', icon: CheckCircle },
  { title: 'Field Driver', description: 'Mobile collection and data capture', color: 'from-[#4a7aaf] to-[#3a6a9f]', icon: MapPin },
]

// const dashboardScreenshots = [
//   { src: 'https://cdn.gamma.app/pjp21qvd87nwfgj/8dc2cf4febc04b9baebe7d1e2f69aee3/original/image.png', caption: 'POI Collection Dashboard', description: 'Central hub for managing all POI data collection activities' },
//   { src: 'https://cdn.gamma.app/pjp21qvd87nwfgj/425783cefde240f6b65a8397bada3a8b/original/image.png', caption: 'Quality Control Queue', description: 'Streamlined QC workflow with 3-tier validation' },
//   { src: 'https://cdn.gamma.app/pjp21qvd87nwfgj/9bee8013e51e4e568cc0c6f0bf37f37d/original/image.png', caption: 'Map Visualization', description: 'Interactive map showing all collected POI points' },
//   { src: 'https://cdn.gamma.app/pjp21qvd87nwfgj/631d23e8e7ae4f5eac46e9b8937306b8/original/image.png', caption: 'Analytics & Reports', description: 'Comprehensive analytics for data-driven decisions' },
//   { src: 'https://cdn.gamma.app/pjp21qvd87nwfgj/61c2f24fabe74afc998184da9507db20/original/image.png', caption: 'Team Management', description: 'Manage field teams and track performance' },
//   { src: 'https://cdn.gamma.app/pjp21qvd87nwfgj/314fae32269f4ff4b7fc5c2d88673fdc/original/image.png', caption: 'Category Configuration', description: 'Flexible POI category setup and management' },
// ]

const mobileScreenshots = [
  { src: 'https://cdn.gamma.app/pjp21qvd87nwfgj/211c81d4996b46f0a37af8302e117edd/original/IMG-20251001-WA0019.jpg', caption: 'Mobile App', description: 'Intuitive mobile interface for field collection' },
  { src: 'https://cdn.gamma.app/pjp21qvd87nwfgj/aaaa3c52ad3a47e888e3ef9474b2f12e/original/IMG-20251001-WA0017.jpg', caption: 'Field Collection', description: 'Easy POI data capture with photo upload' },
]

const testimonials = [
  {
    quote: "POI Express has completely transformed our data collection process. What used to take weeks now takes days.",
    author: "Project Director",
    company: "GIS Solutions Provider",
    rating: 5,
  },
  {
    quote: "The AI-powered detection feature alone has saved us thousands of hours in manual data entry.",
    author: "Operations Lead",
    company: "Mapping Enterprise",
    rating: 5,
  },
]

const stats = [
  { value: '10M+', label: 'POIs Collected', icon: MapPin },
  { value: '6-8x', label: 'Productivity Gain', icon: TrendingUp },
  { value: '90%', label: 'Faster QC', icon: Clock },
  { value: '99%', label: 'Data Accuracy', icon: Target },
]

export default function JsanPOIExpress() {
  // const [activeScreenshot, setActiveScreenshot] = useState(0)

  // const nextScreenshot = () => {
  // setActiveScreenshot((prev) => (prev + 1) % dashboardScreenshots.length)
  // }

  // const prevScreenshot = () => {
  // setActiveScreenshot((prev) => (prev - 1 + dashboardScreenshots.length) % dashboardScreenshots.length)
  // }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden bg-white pt-24 lg:pt-28 pb-16 lg:pb-20" style={{ marginTop: '44px' }}>
        {/* Brand wash and a faint blueprint grid keep a white hero from reading as empty */}
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
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
              <div>
              <nav className="mb-5 flex items-center gap-2 text-sm text-gray-500">
                <Link to="/in-house-apps" className="transition-colors hover:text-[#0050a9]">
                  Products
                </Link>
                <span>/</span>
                <span className="font-medium text-[#0050a9]">JSAN POI Express</span>
              </nav>

              <div className="mb-5 flex flex-wrap items-center gap-3">
                  <span className="rounded-full border border-blue-100 bg-blue-50 px-4 py-1.5 text-sm font-medium text-[#0050a9]">AI-Powered</span>
                  <span className="rounded-full border border-blue-100 bg-blue-50 px-4 py-1.5 text-sm font-medium text-[#0050a9]">Enterprise-Grade</span>
                <span className="inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-3 py-1.5 text-xs font-bold text-green-700">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
                  LIVE PRODUCT
                </span>
              </div>

              <h1 className="mb-3 text-[38px] font-bold leading-[1.06] tracking-tight text-[#0a1a3a] lg:text-[54px]">
                JSAN POI Express
              </h1>
              <p className="mb-6 text-[22px] font-semibold leading-tight text-[#0050a9] lg:text-[28px]">
                Point of Interest Data Collection Platform
              </p>
              <p className="mb-9 max-w-2xl text-lg leading-relaxed text-gray-600">
                POI data collection with AI automation, enterprise-grade quality control, and offline-first mobile experience for field teams.
              </p>

              <div className="flex flex-wrap items-center gap-4">
                  <a
                    href="/contact"
                    className="group inline-flex items-center gap-2.5 rounded-lg px-7 py-3.5 font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_34px_-14px_rgba(0,80,169,0.9)]"
                    style={{ background: 'linear-gradient(120deg, #012f62, #0055b4)' }}
                  >
                    Request a Demo
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </a>
                  <a
                    href="/in-house-apps"
                    className="group inline-flex items-center gap-2 rounded-lg border-2 border-[#0050a9]/20 px-7 py-3.5 font-semibold text-[#0050a9] transition-all duration-300 hover:border-[#0050a9] hover:bg-[#0050a9] hover:text-white"
                  >
                    View All Products
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </a>
                </div>
            </div>

            {/* Stats moved out of the dark band that used to sit under this hero, so the
                page no longer alternates white -> dark -> white on the way down */}
            <div className="lg:pt-4">
              <div
                className="relative overflow-hidden rounded-2xl p-7 shadow-[0_28px_60px_-30px_rgba(0,80,169,0.85)] lg:p-9"
                style={{ background: 'linear-gradient(135deg, #012f62 0%, #0050a9 55%, #0a7fd4 100%)' }}
              >
                <div
                  className="pointer-events-none absolute inset-0 opacity-[0.08]"
                  style={{
                    backgroundImage:
                      'linear-gradient(rgba(255,255,255,.9) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.9) 1px, transparent 1px)',
                    backgroundSize: '38px 38px',
                  }}
                />
                <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[#00d4ff]/25 blur-3xl" />

                <div className="relative grid grid-cols-2 gap-x-6 gap-y-8">
                  {stats.map((stat, index) => (
                    <div key={index}>
                      <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-white/15 ring-1 ring-white/20">
                        <stat.icon className="h-5 w-5 text-white" />
                      </div>
                      <div className="text-2xl font-bold leading-none text-white lg:text-3xl">{stat.value}</div>
                      <div className="mt-1.5 text-sm text-white">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Performance Metrics - Enhanced */}
      <section className="py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block bg-[#1b497b]/10 text-[#1b497b] px-4 py-2 rounded-full text-sm font-semibold mb-4">
              Performance Metrics
            </span>
            <h2 className="text-[36px] lg:text-[48px] font-bold text-[#0050a9] mb-4">Measurable Results</h2>
            <p className="text-gray-600 text-xl max-w-3xl mx-auto">
              Transform your data collection operations with AI-powered automation.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {metrics.map((metric, index) => (
              <div key={index} className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
                <div className="w-14 h-14 bg-gradient-to-br from-[#1b497b] to-[#2a5a8f] rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg">
                  <metric.icon className="w-7 h-7 text-white" />
                </div>
                <div className="text-[48px] lg:text-[56px] font-bold bg-gradient-to-r from-[#1b497b] to-[#2a5a8f] bg-clip-text text-transparent leading-none mb-2">
                  {metric.value}
                </div>
                <div className="text-[#0050a9] font-bold mb-1">{metric.label}</div>
                <div className="text-gray-500 text-sm">{metric.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Productivity Comparison - Enhanced */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block bg-gradient-to-r from-blue-600/10 to-cyan-500/10 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              Productivity Impact
            </span>
            <h2 className="text-[36px] lg:text-[48px] font-bold text-[#0050a9] mb-4">Productivity Transformation</h2>
            <p className="text-gray-600 text-xl">See the difference AI-powered data collection makes.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gray-100 rounded-bl-full"></div>
              <div className="relative">
                <div className="inline-block bg-gray-100 text-gray-500 px-4 py-2 rounded-full text-sm font-semibold mb-6">Traditional Method</div>
                <div className="text-[72px] lg:text-[80px] font-bold text-gray-300 leading-none mb-2">60-80</div>
                <div className="text-gray-500 text-lg">submissions per day</div>
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <p className="text-gray-400 text-sm">Manual data entry, paper forms, high error rates</p>
                </div>
              </div>
            </div>
            <div className="group bg-gradient-to-br from-[#1b497b] to-[#0d2a47] rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl hover:shadow-[#1b497b]/30 transition-all duration-300">
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-bl-full"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-tr-full"></div>
              <div className="relative">
                <div className="inline-block bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6 shadow-lg">With JSAN POI Express</div>
                <div className="text-[72px] lg:text-[80px] font-bold leading-none mb-2">500+</div>
                <div className="text-[#7db8e8] text-lg">submissions per day</div>
                <div className="mt-6 inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                  <TrendingUp className="w-5 h-5 text-green-400" />
                  <span className="font-semibold">6-8x productivity gain</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features - Enhanced */}
      <section className="py-24 bg-[#0050a9] relative overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full" style={{
            backgroundImage: `radial-gradient(circle at 20% 30%, #6b21a8 0%, transparent 40%),
                              radial-gradient(circle at 80% 70%, #1b497b 0%, transparent 40%)`
          }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="text-center mb-16">
            <span className="inline-block bg-white/10 text-[#7db8e8] px-4 py-2 rounded-full text-sm font-semibold mb-4 backdrop-blur-sm">
              Core Features
            </span>
            <h2 className="text-[36px] lg:text-[48px] font-bold text-white mb-4">8 Core Capabilities</h2>
            <p className="text-white/70 text-xl max-w-3xl mx-auto">
              Comprehensive features designed for enterprise-grade data collection.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="group bg-white rounded-2xl p-6 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-gray-100">
                <div className={`w-14 h-14 bg-gradient-to-br ${feature.gradient} rounded-xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-lg font-bold text-[#0050a9] mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Role-Based Access - Enhanced */}
      <section className="py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block bg-[#1b497b]/10 text-[#1b497b] px-4 py-2 rounded-full text-sm font-semibold mb-4">
              Access Control
            </span>
            <h2 className="text-[36px] lg:text-[48px] font-bold text-[#0050a9] mb-4">Role-Based Access Control</h2>
            <p className="text-gray-600 text-xl">Granular permissions for every team member.</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {roles.map((role, index) => (
              <div key={index} className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
                <div className={`bg-gradient-to-br ${role.color} p-6`}>
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <role.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white text-center">{role.title}</h3>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 text-center">{role.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Screenshots - Enhanced with Carousel */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block bg-[#0050a9]/10 text-[#0050a9] px-4 py-2 rounded-full text-sm font-semibold mb-4">
              Screenshots
            </span>
            <h2 className="text-[36px] lg:text-[48px] font-bold text-[#0050a9] mb-4">See It In Action</h2>
            <p className="text-gray-600 text-xl max-w-3xl mx-auto">
              Explore the powerful features of JSAN POI Express through our offline-first mobile app for field teams.
            </p>
          </div>

          {/* Dashboard Screenshots - Carousel (commented out  mobile view retained) */}
          {/* <div className="mb-20">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-[#0050a9] to-[#1b497b] rounded-xl flex items-center justify-center shadow-lg">
                <Monitor className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-[#0050a9]">Dashboard Screenshots</h3>
            </div>

            <div className="relative">
              <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
                <div className="relative aspect-video overflow-hidden bg-gray-100 flex items-center justify-center">
                  <img
                    src={dashboardScreenshots[activeScreenshot].src}
                    alt={dashboardScreenshots[activeScreenshot].caption}
                    className="w-full h-full object-contain transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                    <h4 className="text-white text-xl md:text-2xl font-bold mb-2">{dashboardScreenshots[activeScreenshot].caption}</h4>
                    <p className="text-white/80 text-sm md:text-base">{dashboardScreenshots[activeScreenshot].description}</p>
                  </div>
                </div>
              </div>

              <button
                onClick={prevScreenshot}
                className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center hover:bg-white transition-colors group"
              >
                <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-[#0050a9] group-hover:scale-110 transition-transform" />
              </button>
              <button
                onClick={nextScreenshot}
                className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center hover:bg-white transition-colors group"
              >
                <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-[#0050a9] group-hover:scale-110 transition-transform" />
              </button>

              <div className="flex justify-center gap-2 md:gap-3 mt-6 flex-wrap px-4">
                {dashboardScreenshots.map((screenshot, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveScreenshot(index)}
                    className={`w-16 h-11 md:w-20 md:h-14 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                      activeScreenshot === index ? 'border-[#0050a9] shadow-lg scale-105' : 'border-gray-200 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={screenshot.src} alt={screenshot.caption} className="w-full h-full object-contain" />
                  </button>
                ))}
              </div>
            </div>
          </div> */}

          {/* Mobile App Screenshots */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-[#1b497b] to-[#2a5a8f] rounded-xl flex items-center justify-center shadow-lg">
                <Smartphone className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-[#1b497b]">Mobile App</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 max-w-3xl mx-auto">
              {mobileScreenshots.map((screenshot, index) => (
                <div key={index} className="group relative">
                  {/* Phone Frame */}
                  <div className="relative bg-gradient-to-b from-gray-800 to-gray-900 rounded-[2.5rem] p-3 shadow-2xl mx-auto max-w-[280px]">
                    {/* Notch */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-b-2xl"></div>
                    <div className="overflow-hidden rounded-[2rem] bg-gray-100">
                      <img
                        src={screenshot.src}
                        alt={screenshot.caption}
                        className="w-full h-auto transition-transform duration-[900ms] ease-out group-hover:scale-110"
                      />
                    </div>
                  </div>
                  <div className="mt-6 text-center">
                    <p className="text-[#1b497b] font-bold text-xl mb-2">{screenshot.caption}</p>
                    <p className="text-gray-600">{screenshot.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block bg-[#1b497b]/10 text-[#1b497b] px-4 py-2 rounded-full text-sm font-semibold mb-4">
              Testimonials
            </span>
            <h2 className="text-[36px] lg:text-[48px] font-bold text-[#0050a9] mb-4">What Our Clients Say</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gradient-to-br from-[#e8f4fc] to-[#d0e8f7] rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#1b497b]/5 rounded-bl-full"></div>
                <div className="relative">
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                    ))}
                  </div>
                  <p className="text-gray-700 text-lg leading-relaxed mb-6 italic">"{testimonial.quote}"</p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#1b497b] to-[#2a5a8f] rounded-full flex items-center justify-center">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="font-bold text-[#0050a9]">{testimonial.author}</div>
                      <div className="text-gray-500 text-sm">{testimonial.company}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* QC Performance - Enhanced */}
      <section className="py-24 bg-gradient-to-br from-[#1b497b] via-[#0a1a3a] to-[#0050a9] relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-blue-600 rounded-full filter blur-[100px] opacity-20 animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-[#7db8e8] rounded-full filter blur-[120px] opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block bg-white/10 text-[#7db8e8] px-4 py-2 rounded-full text-sm font-semibold mb-6 backdrop-blur-sm">
                Quality Control
              </span>
              <h2 className="text-[36px] lg:text-[48px] font-bold text-white mb-6">Streamlined Quality Control</h2>
              <p className="text-white/80 text-lg leading-relaxed mb-8">
                Our 3-tier QC workflow dramatically reduces validation time while maintaining the highest data quality standards.
              </p>

              <div className="space-y-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <div className="text-white/50 text-sm mb-2 uppercase tracking-wider">Traditional QC</div>
                  <div className="text-white text-2xl font-bold">14 days for 5,000 submissions</div>
                </div>
                <div className="bg-gradient-to-r from-blue-600/30 to-cyan-500/30 backdrop-blur-sm rounded-2xl p-6 border border-blue-600/30">
                  <div className="text-blue-300 text-sm mb-2 uppercase tracking-wider">With JSAN POI Express</div>
                  <div className="text-white text-2xl font-bold">1.4 days for 5,000 submissions</div>
                  <div className="mt-3 inline-flex items-center gap-2 text-green-400 text-sm font-medium">
                    <Clock className="w-4 h-4" />
                    90% time reduction
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="relative">
                {/* Glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full filter blur-[60px] opacity-30"></div>
                <div className="relative w-64 h-64 md:w-72 md:h-72 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20">
                  <div className="text-center">
                    <div className="text-[64px] md:text-[80px] font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">90%</div>
                    <div className="text-white/70 text-lg md:text-xl">Faster QC</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing CTA */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="bg-gradient-to-br from-[#e8f4fc] to-[#d0e8f7] rounded-3xl p-8 lg:p-12 text-center relative overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-600/10 to-transparent rounded-bl-full"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-[#1b497b]/10 to-transparent rounded-tr-full"></div>

            <div className="relative">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6 shadow-lg">
                <Award className="w-4 h-4" />
                Enterprise Solutions
              </div>
              <h2 className="text-[36px] lg:text-[48px] font-bold text-[#0050a9] mb-6">
                Ready to reshape your data collection?
              </h2>
              <p className="text-gray-600 text-xl mb-8 max-w-2xl mx-auto">
                Schedule a demo to see how JSAN POI Express can transform your field operations with AI-powered automation and custom pricing for your needs.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a href="/contact" className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-700 to-cyan-600 text-white font-semibold rounded-xl hover:shadow-xl hover:shadow-blue-600/30 transition-all duration-300 hover:-translate-y-1">
                  Schedule Your Demo
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
                <a href="/products" className="group inline-flex items-center gap-2 px-8 py-4 border-2 border-[#1b497b] text-[#1b497b] font-semibold rounded-xl hover:bg-[#1b497b] hover:text-white transition-all duration-300">
                  View All Products
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
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
