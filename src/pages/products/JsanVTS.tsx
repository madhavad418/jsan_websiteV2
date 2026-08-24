// Carousel state  restore with the commented dashboard screenshots below.
// import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Users, Smartphone, Car, Building2, Route, AlertTriangle, Radio, Monitor, CheckCircle, Clock, RefreshCw, ExternalLink, Download, MapPin, Shield, Zap, Target, Star, ArrowRight } from 'lucide-react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import MobileNav from '../../components/MobileNav'

const modules = [
  {
    icon: Users,
    title: 'Driver Management',
    description: 'Location tracking, profile creation, vehicle assignment, password resets, and performance analytics.',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Building2,
    title: 'Travel Desk',
    badge: 'BETA',
    description: 'Hotel booking with approval workflows, vendor management, and expense tracking integration.',
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    icon: Route,
    title: 'Routes Management',
    description: 'Map interface, waypoint definition, compliance monitoring, and optimization tools.',
    gradient: 'from-green-500 to-emerald-500',
  },
  {
    icon: Car,
    title: 'Assets Management',
    description: 'Vehicle registration, assignment tracking, maintenance schedules, and document management.',
    gradient: 'from-orange-500 to-amber-500',
  },
  {
    icon: AlertTriangle,
    title: 'Complaints System',
    description: 'Priority-based classification, assignment tracking, evidence attachments, and reporting dashboard.',
    gradient: 'from-red-500 to-rose-500',
  },
  {
    icon: Radio,
    title: 'Live Tracking Dashboard',
    description: 'Real-time map visualization, status indicators, speed data, and session playback.',
    gradient: 'from-indigo-500 to-violet-500',
  },
]

const benefits = [
  { icon: CheckCircle, value: '100%', label: 'Real-Time Visibility', description: 'Complete fleet oversight with instant updates' },
  { icon: Clock, value: '24/7', label: 'Continuous Monitoring', description: 'Round-the-clock tracking and emergency response' },
  { icon: RefreshCw, value: '360°', label: 'Complete Integration', description: 'Unified driver, vehicle, and management ecosystem' },
]

const mobileFeatures = [
  { text: 'GPS tracking and navigation', icon: MapPin },
  { text: 'Trip logging and history', icon: Clock },
  { text: 'Photo evidence upload', icon: Shield },
  { text: 'Hotel booking workflow', icon: Building2 },
  { text: 'Multi-category issue reporting', icon: AlertTriangle },
  { text: 'Offline functionality', icon: Zap },
]

const testimonials = [
  {
    quote: "JSAN VTS transformed how we manage our fleet. Real-time tracking has reduced unauthorized vehicle usage by 85%.",
    author: "Operations Manager",
    company: "Leading Logistics Company",
    rating: 5,
  },
  {
    quote: "The driver management module alone saved us countless hours of administrative work. Highly recommended!",
    author: "Fleet Supervisor",
    company: "Corporate Client",
    rating: 5,
  },
]

const stats = [
  { value: '500+', label: 'Vehicles Tracked', icon: Car },
  { value: '99.9%', label: 'Uptime', icon: Zap },
  { value: '50%', label: 'Cost Reduction', icon: Target },
  { value: '24/7', label: 'Support', icon: Shield },
]

// const webScreenshots = [
//   { src: 'https://cdn.gamma.app/pjp21qvd87nwfgj/bf4a31e2f8764a5f8b2ca7783263e6d1/original/image.png', caption: 'Fleet Overview', description: 'Comprehensive dashboard showing all vehicles and their status' },
//   { src: 'https://cdn.gamma.app/pjp21qvd87nwfgj/1b4492b564254178bcd36696253b25a4/original/image.png', caption: 'Driver Management', description: 'Manage driver profiles, assignments, and performance' },
//   { src: 'https://cdn.gamma.app/pjp21qvd87nwfgj/2a49f85f5fa74ca7a0dea6cb0c457e67/original/asset.jpg', caption: 'Asset & Vehicle Registry', description: 'Complete vehicle documentation and tracking' },
//   { src: 'https://cdn.gamma.app/pjp21qvd87nwfgj/d1a05959c6164ec19646f73266327d9e/original/hotel.jpg', caption: 'Travel Desk Integration', description: 'Coordinated hotel booking for drivers on the road' },
// ]

const mobileScreenshots = [
  { src: 'https://cdn.gamma.app/pjp21qvd87nwfgj/52240573150d48e88652a7b1a6f27746/original/WhatsApp-Image-2025-09-12-at-15.39.15_836389a8.jpg', caption: 'Live Tracking' },
  { src: 'https://cdn.gamma.app/pjp21qvd87nwfgj/206cc7af288b405198b17cf26be9ea3f/original/WhatsApp-Image-2025-09-12-at-15.39.16_611d6335.jpg', caption: 'Trip Logging' },
  { src: 'https://cdn.gamma.app/pjp21qvd87nwfgj/a75d57bedf3e45709a8e8448fd7534eb/original/WhatsApp-Image-2025-09-12-at-15.39.16_183e94a8.jpg', caption: 'Complaint System' },
]

export default function JsanVTS() {
  // const [activeScreenshot, setActiveScreenshot] = useState(0)

  // const nextScreenshot = () => {
  // setActiveScreenshot((prev) => (prev + 1) % webScreenshots.length)
  // }

  // const prevScreenshot = () => {
  // setActiveScreenshot((prev) => (prev - 1 + webScreenshots.length) % webScreenshots.length)
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
                <span className="font-medium text-[#0050a9]">JSAN VTS</span>
              </nav>

              <div className="mb-5 flex flex-wrap items-center gap-3">
                  <span className="rounded-full border border-blue-100 bg-blue-50 px-4 py-1.5 text-sm font-medium text-[#0050a9]">Fleet Management</span>
                  <span className="rounded-full border border-blue-100 bg-blue-50 px-4 py-1.5 text-sm font-medium text-[#0050a9]">Web + Mobile</span>
                <span className="inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-3 py-1.5 text-xs font-bold text-green-700">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
                  LIVE PRODUCT
                </span>
              </div>

              <h1 className="mb-3 text-[38px] font-bold leading-[1.06] tracking-tight text-[#0a1a3a] lg:text-[54px]">
                JSAN VTS
              </h1>
              <p className="mb-6 text-[22px] font-semibold leading-tight text-[#0050a9] lg:text-[28px]">
                Vehicle Tracking System
              </p>
              <p className="mb-9 max-w-2xl text-lg leading-relaxed text-gray-600">
                Complete internal fleet management solution featuring real-time tracking, driver management, and operational oversight across web and mobile platforms.
              </p>

              <div className="flex flex-wrap items-center gap-4">
                  <a
                    href="https://jsan-vts.vercel.app" target="_blank" rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2.5 rounded-lg px-7 py-3.5 font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_34px_-14px_rgba(0,80,169,0.9)]"
                    style={{ background: 'linear-gradient(120deg, #012f62, #0055b4)' }}
                  >
                    View Admin Panel
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </a>
                  <a
                    href="/contact"
                    className="group inline-flex items-center gap-2 rounded-lg border-2 border-[#0050a9]/20 px-7 py-3.5 font-semibold text-[#0050a9] transition-all duration-300 hover:border-[#0050a9] hover:bg-[#0050a9] hover:text-white"
                  >
                    Request Demo
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

      {/* Two-Platform Architecture - Enhanced */}
      <section className="py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block bg-[#1b497b]/10 text-[#1b497b] px-4 py-2 rounded-full text-sm font-semibold mb-4">
              Platform Overview
            </span>
            <h2 className="text-[36px] lg:text-[48px] font-bold text-[#0050a9] mb-4">Two-Platform Architecture</h2>
            <p className="text-gray-600 text-xl max-w-3xl mx-auto">
              Directly manage your fleet with our integrated web dashboard and mobile application.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Web Dashboard */}
            <div className="group relative bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100">
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-[#1b497b]/10 to-transparent rounded-bl-full"></div>
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-[#1b497b] to-[#2a5a8f] rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Monitor className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-[#0050a9] mb-2">Management Dashboard</h3>
                <p className="text-[#1b497b] font-medium mb-6">Web-based Control Center</p>
                <ul className="space-y-4">
                  {['Real-time fleet visualization', 'Driver status monitoring', 'Route management', 'Analytics & reporting', 'Six core operational modules'].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-gray-700">
                      <div className="w-6 h-6 bg-[#e8f4fc] rounded-full flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="w-4 h-4 text-[#1b497b]" />
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Mobile App */}
            <div className="group relative bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100">
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-[#1b497b]/10 to-transparent rounded-bl-full"></div>
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-[#1b497b] to-[#2a5a8f] rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Smartphone className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-[#0050a9] mb-2">Driver Mobile App</h3>
                <p className="text-[#1b497b] font-medium mb-6">Android & iOS</p>
                <ul className="space-y-4">
                  {mobileFeatures.map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-gray-700">
                      <div className="w-6 h-6 bg-[#e8f4fc] rounded-full flex items-center justify-center flex-shrink-0">
                        <item.icon className="w-4 h-4 text-[#1b497b]" />
                      </div>
                      {item.text}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Screenshots - Enhanced with Carousel */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block bg-[#0050a9]/10 text-[#0050a9] px-4 py-2 rounded-full text-sm font-semibold mb-4">
              Screenshots
            </span>
            <h2 className="text-[36px] lg:text-[48px] font-bold text-[#0050a9] mb-4">See It In Action</h2>
            <p className="text-gray-600 text-xl max-w-3xl mx-auto">
              Explore the driver mobile app that keeps fleet operations moving in the field.
            </p>
          </div>

          {/* Web Dashboard Screenshots - Carousel (commented out  mobile view retained) */}
          {/* <div className="mb-20">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-[#0050a9] to-[#1b497b] rounded-xl flex items-center justify-center shadow-lg">
                <Monitor className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-[#0050a9]">Web Dashboard</h3>
            </div>

            <div className="relative">
              <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
                <div className="relative aspect-video overflow-hidden bg-gray-100 flex items-center justify-center">
                  <img
                    src={webScreenshots[activeScreenshot].src}
                    alt={webScreenshots[activeScreenshot].caption}
                    className="w-full h-full object-contain transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <h4 className="text-white text-2xl font-bold mb-2">{webScreenshots[activeScreenshot].caption}</h4>
                    <p className="text-white/80">{webScreenshots[activeScreenshot].description}</p>
                  </div>
                </div>
              </div>

              <button
                onClick={prevScreenshot}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center hover:bg-white transition-colors group"
              >
                <ChevronLeft className="w-6 h-6 text-[#0050a9] group-hover:scale-110 transition-transform" />
              </button>
              <button
                onClick={nextScreenshot}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center hover:bg-white transition-colors group"
              >
                <ChevronRight className="w-6 h-6 text-[#0050a9] group-hover:scale-110 transition-transform" />
              </button>

              <div className="flex justify-center gap-3 mt-6">
                {webScreenshots.map((screenshot, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveScreenshot(index)}
                    className={`w-20 h-14 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
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
              <h3 className="text-2xl font-bold text-[#1b497b]">Mobile Application</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {mobileScreenshots.map((item, index) => (
                <div key={index} className="group relative">
                  {/* Phone Frame */}
                  <div className="relative bg-gradient-to-b from-gray-800 to-gray-900 rounded-[2.5rem] p-3 shadow-2xl">
                    {/* Notch */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-b-2xl"></div>
                    <div className="overflow-hidden rounded-[2rem] bg-gray-100">
                      <img
                        src={item.src}
                        alt={item.caption}
                        className="w-full h-auto transition-transform duration-[900ms] ease-out group-hover:scale-110"
                      />
                    </div>
                  </div>
                  <div className="mt-4 text-center">
                    <p className="text-[#1b497b] font-semibold text-lg">{item.caption}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Core Modules - Enhanced */}
      <section className="py-24 bg-[#0050a9] relative overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full" style={{
            backgroundImage: `radial-gradient(circle at 20% 30%, #1b497b 0%, transparent 50%),
                              radial-gradient(circle at 80% 70%, #1b497b 0%, transparent 50%)`
          }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="text-center mb-16">
            <span className="inline-block bg-white/10 text-[#7db8e8] px-4 py-2 rounded-full text-sm font-semibold mb-4 backdrop-blur-sm">
              Features
            </span>
            <h2 className="text-[36px] lg:text-[48px] font-bold text-white mb-4">Six Core Management Modules</h2>
            <p className="text-white/70 text-xl max-w-3xl mx-auto">
              Comprehensive tools to manage every aspect of your fleet operations.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modules.map((module, index) => (
              <div key={index} className="group bg-white rounded-2xl p-6 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-gray-100">
                <div className="flex items-start gap-4">
                  <div className={`w-14 h-14 bg-gradient-to-br ${module.gradient} rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <module.icon className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-bold text-[#0050a9]">{module.title}</h3>
                      {module.badge && (
                        <span className="bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">{module.badge}</span>
                      )}
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">{module.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block bg-[#1b497b]/10 text-[#1b497b] px-4 py-2 rounded-full text-sm font-semibold mb-4">
              Testimonials
            </span>
            <h2 className="text-[36px] lg:text-[48px] font-bold text-[#0050a9] mb-4">What Our Clients Say</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
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
            ))}
          </div>
        </div>
      </section>

      {/* Benefits - Enhanced */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block bg-[#1b497b]/10 text-[#1b497b] px-4 py-2 rounded-full text-sm font-semibold mb-4">
              Benefits
            </span>
            <h2 className="text-[36px] lg:text-[48px] font-bold text-[#0050a9] mb-4">Operational Benefits</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center group">
                <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-[#1b497b] to-[#2a5a8f] rounded-3xl flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300">
                  <benefit.icon className="w-12 h-12 text-white" />
                </div>
                <div className="text-[56px] font-bold bg-gradient-to-r from-[#1b497b] to-[#2a5a8f] bg-clip-text text-transparent mb-2">{benefit.value}</div>
                <h3 className="text-xl font-bold text-[#0050a9] mb-2">{benefit.label}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Access - Enhanced */}
      <section className="py-24 bg-gradient-to-br from-[#1b497b] via-[#0a1a3a] to-[#0050a9] relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-[#7db8e8] rounded-full filter blur-[100px] opacity-20 animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-[#1b497b] rounded-full filter blur-[120px] opacity-30 animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="text-center mb-12">
            <span className="inline-block bg-white/10 text-[#7db8e8] px-4 py-2 rounded-full text-sm font-semibold mb-4 backdrop-blur-sm">
              Request Access
            </span>
            <h2 className="text-[36px] lg:text-[48px] font-bold text-white mb-4">Try It Yourself</h2>
            <p className="text-white/70 text-xl">Access our demo environment to explore all features.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Admin Panel */}
            <div className="group bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-[#7db8e8] to-[#1b497b] rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <Monitor className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white">Admin Panel</h3>
              </div>
              <div className="space-y-4 mb-6">
                <div className="bg-white/5 rounded-lg p-3">
                  <p className="text-white/50 text-xs uppercase tracking-wider mb-1">URL</p>
                  <p className="text-white font-mono">jsan-vts.vercel.app</p>
                </div>
                <div className="bg-white/5 rounded-lg p-3">
                  <p className="text-white/50 text-xs uppercase tracking-wider mb-1">Email</p>
                  <p className="text-white font-mono">admin@jsanvts.com</p>
                </div>
                <div className="bg-white/5 rounded-lg p-3">
                  <p className="text-white/50 text-xs uppercase tracking-wider mb-1">Password</p>
                  <p className="text-white font-mono">Admin123</p>
                </div>
              </div>
              <a href="https://jsan-vts.vercel.app" target="_blank" rel="noopener noreferrer" className="group/btn inline-flex items-center justify-center gap-2 w-full px-6 py-3.5 bg-gradient-to-r from-[#1b497b] to-[#2a5a8f] text-white font-semibold hover:shadow-lg hover:shadow-[#1b497b]/30 transition-all rounded-xl">
                Open Admin Panel
                <ExternalLink className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </a>
            </div>

            {/* Driver App */}
            <div className="group bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-[#7db8e8] to-[#1b497b] rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <Smartphone className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white">Driver App</h3>
              </div>
              <div className="space-y-4 mb-6">
                <div className="bg-white/5 rounded-lg p-3">
                  <p className="text-white/50 text-xs uppercase tracking-wider mb-1">Platform</p>
                  <p className="text-white font-mono">Android APK</p>
                </div>
                <div className="bg-white/5 rounded-lg p-3">
                  <p className="text-white/50 text-xs uppercase tracking-wider mb-1">Username</p>
                  <p className="text-white font-mono">agent999</p>
                </div>
                <div className="bg-white/5 rounded-lg p-3">
                  <p className="text-white/50 text-xs uppercase tracking-wider mb-1">Password</p>
                  <p className="text-white font-mono">agent999</p>
                </div>
              </div>
              <a href="/contact" className="group/btn inline-flex items-center justify-center gap-2 w-full px-6 py-3.5 bg-gradient-to-r from-[#1b497b] to-[#2a5a8f] text-white font-semibold hover:shadow-lg hover:shadow-[#1b497b]/30 transition-all rounded-xl">
                Request Access
                <Download className="w-4 h-4 group-hover/btn:translate-y-0.5 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing CTA */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="bg-gradient-to-br from-[#e8f4fc] to-[#d0e8f7] rounded-3xl p-8 lg:p-12 text-center relative overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#1b497b]/10 to-transparent rounded-bl-full"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-[#1b497b]/10 to-transparent rounded-tr-full"></div>

            <div className="relative">
              <h2 className="text-[36px] lg:text-[48px] font-bold text-[#0050a9] mb-6">
                Ready to optimize your fleet?
              </h2>
              <p className="text-gray-600 text-xl mb-8 max-w-2xl mx-auto">
                Schedule a consultation to see how JSAN VTS can transform your fleet management operations with custom pricing tailored to your needs.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a href="/contact" className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#1b497b] to-[#2a5a8f] text-white font-semibold rounded-xl hover:shadow-xl hover:shadow-[#1b497b]/30 transition-all duration-300 hover:-translate-y-1">
                  Schedule a Consultation
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
