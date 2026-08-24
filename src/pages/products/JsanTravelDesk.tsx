import { useState } from 'react'
import { Link } from 'react-router-dom'
import { GitBranch, UserCheck, FileText, Wallet, Building2, Car, Plane, CheckCircle, Eye, Users, ClipboardCheck, History, X, ZoomIn, Star, ArrowRight, Globe, Clock, TrendingUp, Award, Calendar } from 'lucide-react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import MobileNav from '../../components/MobileNav'

const serviceCategories = [
  { icon: Building2, title: 'Hotels', description: 'Corporate accommodation booking with preferred rates', gradient: 'from-blue-500 to-cyan-500' },
  { icon: Car, title: 'Cars', description: 'Vehicle rental and chauffeur services', gradient: 'from-orange-500 to-amber-500' },
  { icon: Plane, title: 'Flights', description: 'Domestic and international air travel', gradient: 'from-purple-500 to-pink-500' },
]

const workflowSteps = [
  { step: '1', title: 'Draft', description: 'Client Desk creates travel request', color: 'from-gray-400 to-gray-500' },
  { step: '2', title: 'Submitted', description: 'Request sent for approval', color: 'from-[#4a7aaf] to-[#3a6a9f]' },
  { step: '3', title: 'Pending Approval', description: 'Awaiting Client RM review', color: 'from-[#3a6a9f] to-[#2a5a8f]' },
  { step: '4', title: 'Approved', description: 'Client RM approves request', color: 'from-[#2a5a8f] to-[#1b497b]' },
  { step: '5', title: 'JSAN Review', description: 'Travel desk processes request', color: 'from-[#1b497b] to-[#153a62]' },
  { step: '6', title: 'Quotation Sent', description: 'Options presented to client', color: 'from-[#153a62] to-[#0d2a47]' },
  { step: '7', title: 'Confirmed', description: 'Booking finalized', color: 'from-green-500 to-emerald-600' },
  { step: '8', title: 'Completed', description: 'Travel completed successfully', color: 'from-emerald-600 to-green-700' },
]

const features = [
  { icon: GitBranch, title: 'Multi-Stage Approval', description: 'Configurable approval workflows with multiple authorization levels for budget compliance.', gradient: 'from-blue-500 to-cyan-500' },
  { icon: UserCheck, title: 'Employee Management', description: 'Complete employee profiles with department, job title, and ID verification for coordinated booking.', gradient: 'from-green-500 to-emerald-500' },
  { icon: FileText, title: 'Quotation System', description: 'Competitive quotation preparation with multiple options for cost-effective travel planning.', gradient: 'from-purple-500 to-pink-500' },
  { icon: Eye, title: 'Status Tracking', description: 'Real-time visibility into request status from draft to completion with notifications.', gradient: 'from-orange-500 to-amber-500' },
  { icon: Wallet, title: 'Budget Control', description: 'Department-wise budget allocation and tracking for travel expense management.', gradient: 'from-red-500 to-rose-500' },
  { icon: History, title: 'Audit Trail', description: 'Complete history of approvals, changes, and communications for compliance reporting.', gradient: 'from-indigo-500 to-violet-500' },
]

const roles = [
  {
    title: 'Client Desk',
    color: 'from-[#1b497b] to-[#2a5a8f]',
    icon: ClipboardCheck,
    capabilities: ['Create requests', 'Submit for approval', 'Manage employees', 'Track status'],
  },
  {
    title: 'Client RM',
    color: 'from-[#2a5a8f] to-[#3a6a9f]',
    icon: UserCheck,
    capabilities: ['Review requests', 'Approve/Reject', 'Accept quotations', 'Budget oversight'],
  },
  {
    title: 'JSAN Travel Desk',
    color: 'from-[#3a6a9f] to-[#4a7aaf]',
    icon: Globe,
    capabilities: ['Process requests', 'Prepare quotations', 'Confirm bookings', 'Vendor management'],
  },
]

const benefits = [
  { value: '100%', label: 'Visibility', description: 'Complete tracking of all requests', icon: Eye },
  { value: '50%', label: 'Time Saved', description: 'Streamlined approval process', icon: Clock },
  { value: '30%', label: 'Cost Reduction', description: 'Better vendor negotiations', icon: TrendingUp },
]

const productScreenshots = [
  {
    id: 1,
    title: 'Travel Request Management',
    description: 'Comprehensive dashboard for managing all travel requests with real-time status tracking',
    image: 'https://cdn.gamma.app/pjp21qvd87nwfgj/7f046a46114b46b9a05b89092f0a3cd1/original/Screenshot_73.jpg',
    category: 'Dashboard'
  },
  {
    id: 2,
    title: 'Quotation & Approval Workflow',
    description: 'Streamlined quotation management with multi-stage approval process',
    image: 'https://cdn.gamma.app/pjp21qvd87nwfgj/670dc7bef27a4338b4a260b610fb922f/original/Screenshot_72.jpg',
    category: 'Workflow'
  },
  {
    id: 3,
    title: 'Travel Request Creation',
    description: 'Intuitive interface for creating and submitting new travel requests',
    image: 'https://cdn.gamma.app/pjp21qvd87nwfgj/cd5bf662df7b4dd79f82a9fbadef64d6/original/travel-req.jpg',
    category: 'Forms'
  },
  {
    id: 4,
    title: 'Corporate Travel Solutions',
    description: 'End-to-end travel management for modern enterprises',
    image: 'https://cdn.gamma.app/pjp21qvd87nwfgj/generated-images/2A90-ddH84BU3JxwEya-A.jpg',
    category: 'Overview'
  },
]

const testimonials = [
  {
    quote: "JSAN Travel Desk has simplified our corporate travel management significantly. Approval workflows are now coordinated.",
    author: "Finance Director",
    company: "Enterprise Corporation",
    rating: 5,
  },
  {
    quote: "The cost savings and visibility we've achieved have exceeded our expectations. It changed how we run corporate travel.",
    author: "HR Manager",
    company: "Global Services Ltd",
    rating: 5,
  },
]

const stats = [
  { value: '1000+', label: 'Services Managed', icon: Calendar },
  { value: '50%', label: 'Time Saved', icon: Clock },
  { value: '30%', label: 'Cost Reduction', icon: TrendingUp },
  { value: '99%', label: 'Client Satisfaction', icon: Star },
]

export default function JsanTravelDesk() {
  const [selectedImage, setSelectedImage] = useState<typeof productScreenshots[0] | null>(null)

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
                <span className="font-medium text-[#0050a9]">JSAN Travel Desk</span>
              </nav>

              <div className="mb-5 flex flex-wrap items-center gap-3">
                  <span className="rounded-full border border-blue-100 bg-blue-50 px-4 py-1.5 text-sm font-medium text-[#0050a9]">Corporate Travel</span>
                  <span className="rounded-full border border-blue-100 bg-blue-50 px-4 py-1.5 text-sm font-medium text-[#0050a9]">Multi-Stage Approval</span>
                <span className="inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-3 py-1.5 text-xs font-bold text-green-700">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
                  LIVE PRODUCT
                </span>
              </div>

              <h1 className="mb-3 text-[38px] font-bold leading-[1.06] tracking-tight text-[#0a1a3a] lg:text-[54px]">
                JSAN Travel Desk
              </h1>
              <p className="mb-6 text-[22px] font-semibold leading-tight text-[#0050a9] lg:text-[28px]">
                Corporate Travel Management System
              </p>
              <p className="mb-9 max-w-2xl text-lg leading-relaxed text-gray-600">
                Comprehensive travel management platform with role-based workflows, multi-stage approvals, and coordinated booking for corporate travel.
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

      {/* Service Categories - Enhanced */}
      <section className="py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block bg-[#1b497b]/10 text-[#1b497b] px-4 py-2 rounded-full text-sm font-semibold mb-4">
              Travel Services
            </span>
            <h2 className="text-[36px] lg:text-[48px] font-bold text-[#0050a9] mb-4">Comprehensive Travel Solutions</h2>
            <p className="text-gray-600 text-xl max-w-3xl mx-auto">
              Book hotels, cars, and flights all in one integrated platform.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {serviceCategories.map((category, index) => (
              <div key={index} className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#1b497b]/5 to-transparent rounded-bl-full"></div>
                <div className="relative text-center">
                  <div className={`w-20 h-20 bg-gradient-to-br ${category.gradient} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <category.icon className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#0050a9] mb-3">{category.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{category.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Workflow - Enhanced */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block bg-[#1b497b]/10 text-[#1b497b] px-4 py-2 rounded-full text-sm font-semibold mb-4">
              Workflow
            </span>
            <h2 className="text-[36px] lg:text-[48px] font-bold text-[#0050a9] mb-4">End-to-End Booking Workflow</h2>
            <p className="text-gray-600 text-xl max-w-3xl mx-auto">
              From request creation to travel completion, every step is tracked and managed through our intuitive workflow system.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
            {workflowSteps.map((step, index) => (
              <div key={index} className="group bg-white rounded-2xl p-4 lg:p-6 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative border border-gray-100">
                <div className={`w-12 h-12 lg:w-14 lg:h-14 bg-gradient-to-br ${step.color} rounded-xl flex items-center justify-center mx-auto mb-3 text-white font-bold text-lg shadow-lg group-hover:scale-110 transition-transform`}>
                  {step.step}
                </div>
                <h3 className="font-bold text-[#0050a9] text-sm lg:text-base mb-1">{step.title}</h3>
                <p className="text-gray-500 text-xs lg:text-sm">{step.description}</p>
                {index < workflowSteps.length - 1 && index % 4 !== 3 && (
                  <div className="hidden lg:flex absolute top-1/2 -right-3 transform -translate-y-1/2 w-6 h-6 bg-[#1b497b]/10 rounded-full items-center justify-center">
                    <ArrowRight className="w-4 h-4 text-[#1b497b]" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Role-Based Access - Enhanced */}
      <section className="py-24 bg-[#0050a9] relative overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full" style={{
            backgroundImage: `radial-gradient(circle at 20% 30%, #1b497b 0%, transparent 40%),
                              radial-gradient(circle at 80% 70%, #1b497b 0%, transparent 40%)`
          }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="text-center mb-16">
            <span className="inline-block bg-white/10 text-[#7db8e8] px-4 py-2 rounded-full text-sm font-semibold mb-4 backdrop-blur-sm">
              User Roles
            </span>
            <h2 className="text-[36px] lg:text-[48px] font-bold text-white mb-4">Three Key User Roles</h2>
            <p className="text-white/70 text-xl">Clearly defined responsibilities for streamlined operations.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {roles.map((role, index) => (
              <div key={index} className="group bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <div className={`bg-gradient-to-r ${role.color} p-6 lg:p-8`}>
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <role.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">{role.title}</h3>
                </div>
                <div className="p-6 lg:p-8">
                  <ul className="space-y-4">
                    {role.capabilities.map((cap, i) => (
                      <li key={i} className="flex items-center gap-3 text-gray-700">
                        <div className="w-6 h-6 bg-[#e8f4fc] rounded-full flex items-center justify-center flex-shrink-0">
                          <CheckCircle className="w-4 h-4 text-[#1b497b]" />
                        </div>
                        {cap}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features - Enhanced */}
      <section className="py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block bg-[#1b497b]/10 text-[#1b497b] px-4 py-2 rounded-full text-sm font-semibold mb-4">
              Features
            </span>
            <h2 className="text-[36px] lg:text-[48px] font-bold text-[#0050a9] mb-4">Comprehensive Travel Management</h2>
            <p className="text-gray-600 text-xl">Everything you need to manage corporate travel efficiently.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
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

      {/* Product Screenshots - Enhanced */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block bg-[#0050a9]/10 text-[#0050a9] px-4 py-2 rounded-full text-sm font-semibold mb-4">
              Screenshots
            </span>
            <h2 className="text-[36px] lg:text-[48px] font-bold text-[#0050a9] mb-4">See It In Action</h2>
            <p className="text-gray-600 text-xl max-w-3xl mx-auto">
              Explore the intuitive interface and powerful features of JSAN Travel Desk through our dashboard screenshots.
            </p>
          </div>

          {/* Screenshot Gallery Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {productScreenshots.map((screenshot) => (
              <div
                key={screenshot.id}
                className="group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer border border-gray-100"
                onClick={() => setSelectedImage(screenshot)}
              >
                {/* Image Container */}
                <div className="relative overflow-hidden">
                  <img
                    src={screenshot.image}
                    alt={screenshot.title}
                    className="w-full h-64 lg:h-72 object-contain object-center transform group-hover:scale-105 transition-transform duration-700"
                  />
                  {/* Overlay on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0050a9]/90 via-[#0050a9]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white/50 group-hover:scale-110 transition-transform">
                        <ZoomIn className="w-8 h-8 text-white" />
                      </div>
                    </div>
                  </div>
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="bg-gradient-to-r from-[#1b497b] to-[#2a5a8f] text-white px-4 py-1.5 rounded-full text-xs font-semibold shadow-lg">
                      {screenshot.category}
                    </span>
                  </div>
                </div>
                {/* Caption */}
                <div className="p-6 border-t-4 border-t-[#0050a9]">
                  <h3 className="text-xl font-bold text-[#0050a9] mb-2 group-hover:text-[#1b497b] transition-colors">
                    {screenshot.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {screenshot.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal - Enhanced */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-w-6xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-10 w-12 h-12 bg-gradient-to-r from-[#0050a9] to-[#1b497b] hover:from-[#1b497b] hover:to-[#153a62] text-white rounded-full flex items-center justify-center transition-all shadow-lg hover:scale-110"
            >
              <X className="w-6 h-6" />
            </button>
            {/* Modal Image */}
            <div className="relative bg-gray-100">
              <img
                src={selectedImage.image}
                alt={selectedImage.title}
                className="w-full max-h-[70vh] object-contain"
              />
            </div>
            {/* Modal Caption */}
            <div className="p-6 lg:p-8 bg-gradient-to-r from-[#0050a9] to-[#1b497b]">
              <div className="flex items-start justify-between">
                <div>
                  <span className="inline-block bg-white/20 text-white px-4 py-1.5 rounded-full text-xs font-semibold mb-3">
                    {selectedImage.category}
                  </span>
                  <h3 className="text-2xl lg:text-3xl font-bold text-white mb-2">{selectedImage.title}</h3>
                  <p className="text-white/80 text-lg">{selectedImage.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

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

      {/* Benefits - Enhanced */}
      <section className="py-24 bg-gradient-to-br from-[#1b497b] via-[#0a1a3a] to-[#0050a9] relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-cyan-500 rounded-full filter blur-[100px] opacity-20 animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-[#7db8e8] rounded-full filter blur-[120px] opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="text-center mb-16">
            <span className="inline-block bg-white/10 text-[#7db8e8] px-4 py-2 rounded-full text-sm font-semibold mb-4 backdrop-blur-sm">
              Benefits
            </span>
            <h2 className="text-[36px] lg:text-[48px] font-bold text-white mb-4">Why Choose JSAN Travel Desk</h2>
            <p className="text-white/70 text-xl">Measurable results for your organization.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center group">
                <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-3xl flex items-center justify-center border border-white/20 group-hover:scale-110 transition-transform duration-300">
                  <benefit.icon className="w-12 h-12 text-[#7db8e8]" />
                </div>
                <div className="text-[64px] lg:text-[72px] font-bold bg-gradient-to-r from-white to-[#7db8e8] bg-clip-text text-transparent leading-none mb-2">{benefit.value}</div>
                <h3 className="text-2xl font-bold text-white mb-2">{benefit.label}</h3>
                <p className="text-white/70">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Streamlined Process - Enhanced */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block bg-[#1b497b]/10 text-[#1b497b] px-4 py-2 rounded-full text-sm font-semibold mb-6">
                Simplified Process
              </span>
              <h2 className="text-[36px] lg:text-[48px] font-bold text-[#0050a9] mb-6">Simplify Corporate Travel</h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                From booking request to travel completion, our system ensures smooth coordination between all stakeholders while maintaining budget control and compliance.
              </p>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: ClipboardCheck, label: 'Centralized Requests', desc: 'All travel requests in one platform', gradient: 'from-blue-500 to-cyan-500' },
                  { icon: GitBranch, label: 'Approval Workflows', desc: 'Multi-level authorization', gradient: 'from-green-500 to-emerald-500' },
                  { icon: Building2, label: 'Vendor Integration', desc: 'Best rates from preferred vendors', gradient: 'from-purple-500 to-pink-500' },
                  { icon: Wallet, label: 'Expense Tracking', desc: 'Complete travel cost visibility', gradient: 'from-orange-500 to-amber-500' },
                ].map((item, index) => (
                  <div key={index} className="group bg-white rounded-2xl p-5 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100">
                    <div className={`w-12 h-12 bg-gradient-to-br ${item.gradient} rounded-xl flex items-center justify-center mb-3 shadow-lg group-hover:scale-110 transition-transform`}>
                      <item.icon className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="font-bold text-[#0050a9] mb-1">{item.label}</h4>
                    <p className="text-gray-600 text-sm">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-center">
              <div className="relative">
                {/* Glow */}
                <div className="absolute -inset-4 bg-gradient-to-r from-[#1b497b] to-cyan-500 rounded-3xl opacity-10 blur-2xl"></div>
                <div className="relative bg-gradient-to-br from-[#e8f4fc] to-[#d0e8f7] rounded-3xl p-8 w-full max-w-md shadow-2xl">
                  <div className="bg-white rounded-2xl p-6 shadow-lg">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#1b497b] to-[#2a5a8f] rounded-xl flex items-center justify-center shadow-lg">
                        <Plane className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="font-bold text-[#0050a9]">Travel Request</div>
                        <div className="text-sm text-green-600 font-medium flex items-center gap-1">
                          <CheckCircle className="w-4 h-4" />
                          Approved
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-500">Destination</span>
                        <span className="text-[#0050a9] font-semibold">New York, USA</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-500">Travel Date</span>
                        <span className="text-[#0050a9] font-semibold">Mar 15-20, 2026</span>
                      </div>
                      <div className="flex justify-between py-2">
                        <span className="text-gray-500">Budget</span>
                        <span className="text-[#1b497b] font-bold text-lg">$2,500</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing CTA */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-5xl mx-auto px-6">
          <div className="bg-gradient-to-br from-[#e8f4fc] to-[#d0e8f7] rounded-3xl p-8 lg:p-12 text-center relative overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-cyan-500/10 to-transparent rounded-bl-full"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-[#1b497b]/10 to-transparent rounded-tr-full"></div>

            <div className="relative">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#1b497b] to-[#2a5a8f] text-white px-4 py-2 rounded-full text-sm font-semibold mb-6 shadow-lg">
                <Award className="w-4 h-4" />
                Enterprise Solutions
              </div>
              <h2 className="text-[36px] lg:text-[48px] font-bold text-[#0050a9] mb-6">
                Ready to streamline corporate travel?
              </h2>
              <p className="text-gray-600 text-xl mb-8 max-w-2xl mx-auto">
                Contact us to learn how JSAN Travel Desk can transform your organization's travel management with automated workflows and cost control.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a href="/contact" className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#1b497b] to-[#2a5a8f] text-white font-semibold rounded-xl hover:shadow-xl hover:shadow-[#1b497b]/30 transition-all duration-300 hover:-translate-y-1">
                  Request Demo
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
