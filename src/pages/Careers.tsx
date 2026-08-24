import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { MapPin, Briefcase, Clock, Users, Globe, GraduationCap, Heart, Sparkles, Search, Filter, ArrowRight, Building, X, Send } from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import MobileNav from '../components/MobileNav'
import SplitQuoteHero from '../components/SplitQuoteHero'
import { useJobs } from '../lib/useContent'
import StatsBand from '../components/StatsBand'
import FilterDropdown from '../components/FilterDropdown'
import { useInView } from '../lib/useCountUp'

/* Hero photograph. Drop the office image at public/careers/careers-hero.jpg,
   or point this at wherever the file ends up. */
const HERO_IMAGE = '/careers/interview.png'

const baseStats = [
  { number: '30+', label: 'Countries' },
  { number: '1000+', label: 'Team Members' },
  { number: '6', label: 'Continents' },
]

const benefits = [
  {
    icon: Globe,
    title: 'Global Opportunities',
    description: 'Work across 20+ countries with diverse, international teams on projects that make a real impact.',
  },
  {
    icon: GraduationCap,
    title: 'Learning & Growth',
    description: 'Certification support, training budgets, mentorship programs, and clear career progression paths.',
  },
  {
    icon: Heart,
    title: 'Work-Life Balance',
    description: 'Flexible working arrangements, remote options, generous leave policies, and wellness programs.',
  },
  {
    icon: Sparkles,
    title: 'Inclusive Culture',
    description: 'A collaborative environment that values diversity, fresh perspectives, and innovative thinking.',
  },
]


const cultureImages = [
  { src: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop', alt: 'Team collaboration' },
  { src: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&h=400&fit=crop', alt: 'Office environment' },
  { src: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&h=400&fit=crop', alt: 'Team meeting' },
  { src: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&h=400&fit=crop', alt: 'Working together' },
]

const hiringSteps = [
  { step: '01', title: 'Interview & Selection', description: 'Apply online, interview with our talent team, and be selected for the next stage based on experience and fit.' },
  { step: '02', title: 'BGV & Drug Screening', description: 'Pass background verification, driving record check, and drug screening required for autonomous vehicle operations.' },
  { step: '03', title: 'Assessment Tests', description: 'Complete role-specific assessments evaluating driving skills, attention to detail, and technology proficiency.' },
  { step: '04', title: 'Onboarding & Training', description: 'Join paid onboarding and a fully expense-paid 1-month training in the USA before starting operations in Madrid.' },
]

export default function Careers() {
  const [selectedDepartment, setSelectedDepartment] = useState('All Departments')
  const [selectedLocation, setSelectedLocation] = useState('All Locations')
  const [selectedType, setSelectedType] = useState('All Types')
  const [searchQuery, setSearchQuery] = useState('')
  const [visibleCount, setVisibleCount] = useState(8)
  const { ref: processRef, inView: processInView } = useInView<HTMLElement>()

  const jobOpenings = useJobs()
  const uniq = (arr: string[]) => Array.from(new Set(arr.filter(Boolean)))
  const departments = ['All Departments', ...uniq(jobOpenings.map(j => j.department)).sort()]
  const locations = ['All Locations', ...uniq(jobOpenings.map(j => j.location))]
  const types = ['All Types', ...uniq(jobOpenings.map(j => j.type))]
  const stats = [...baseStats, { number: String(jobOpenings.length), label: 'Open Positions' }]

  const activeFilters = [
    selectedDepartment !== 'All Departments' && { label: selectedDepartment, clear: () => setSelectedDepartment('All Departments') },
    selectedLocation !== 'All Locations' && { label: selectedLocation, clear: () => setSelectedLocation('All Locations') },
    selectedType !== 'All Types' && { label: selectedType, clear: () => setSelectedType('All Types') },
    searchQuery.trim() !== '' && { label: `"${searchQuery}"`, clear: () => setSearchQuery('') },
  ].filter(Boolean) as { label: string; clear: () => void }[]

  const clearAllFilters = () => {
    setSelectedDepartment('All Departments')
    setSelectedLocation('All Locations')
    setSelectedType('All Types')
    setSearchQuery('')
  }

  useEffect(() => {
    setVisibleCount(8)
  }, [searchQuery, selectedDepartment, selectedLocation, selectedType])

  const filteredJobs = jobOpenings.filter(job => {
    const matchesDepartment = selectedDepartment === 'All Departments' || job.department === selectedDepartment
    const matchesLocation = selectedLocation === 'All Locations' || job.location === selectedLocation
    const matchesType = selectedType === 'All Types' || job.type === selectedType
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesDepartment && matchesLocation && matchesType && matchesSearch
  })

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <SplitQuoteHero
        eyebrow="Careers at JSAN"
        title={
          <>
            Build your future
            <br className="hidden sm:block" /> with JSAN.
          </>
        }
        description="Join a global team shaping the future of geospatial technology  in the field, in the office and everywhere the work takes us."
        primaryCta={{ label: 'Explore Opportunities', href: '#openings' }}
        secondaryCta={{ label: 'Life at JSAN', href: '/about' }}
        bullets={[
          'Opportunities across 20+ countries.',
          'Field, office and hybrid roles.',
          'Structured learning and career growth.',
        ]}
        image={HERO_IMAGE}
        imageAlt="JSAN colleagues collaborating in the office"
        imagePosition="50% 30%"
        quote={{
          text:
            'More than 1,000 colleagues across six continents, working on programmes that map, measure and maintain the real world  from street-level collection to the platforms our clients run every day.',
        }}
      />
      {/* Stats Bar */}
      <StatsBand items={stats} eyebrow="JSAN Worldwide" />

      {/* Why Join Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-[32px] lg:text-[42px] font-bold text-[#0050a9] mb-4">
              Why Join JSAN?
            </h2>
            <p className="text-gray-700 text-xl max-w-3xl mx-auto">
              We're more than a companywe're a community of innovators, problem-solvers, and global citizens working together to make an impact.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-[#f8fafc] p-8 rounded-lg hover:shadow-lg transition-shadow">
                <div className="w-14 h-14 bg-[#0050a9] rounded-lg flex items-center justify-center mb-6">
                  <benefit.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-[#0050a9] text-xl font-bold mb-3">{benefit.title}</h3>
                <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Culture Gallery */}
      <section className="py-20 bg-[#0050a9]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-white text-[32px] lg:text-[42px] font-bold leading-tight mb-6">
                Life at JSAN
              </h2>
              <p className="text-white/80 text-xl leading-relaxed mb-8">
                From collaborative workspaces to team celebrations, we foster an environment where creativity thrives and every voice matters. Our diverse teams across the globe share a common passion for innovation and excellence.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-[#0050a9] rounded-full flex items-center justify-center">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-white text-lg">Diverse teams from 40+ nationalities</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-[#0050a9] rounded-full flex items-center justify-center">
                    <Building className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-white text-lg">Modern offices in 20+ locations worldwide</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-[#0050a9] rounded-full flex items-center justify-center">
                    <Heart className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-white text-lg">Regular team events and celebrations</span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {cultureImages.map((image, index) => (
                <div key={index} className="overflow-hidden rounded-lg">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-48 object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Job Openings */}
      <section id="openings" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-[32px] lg:text-[42px] font-bold text-[#0050a9] mb-4">
              Open Positions
            </h2>
            <p className="text-gray-700 text-xl">
              Find your perfect role and join our global team
            </p>
          </div>

          {/* Filters */}
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-[0_16px_40px_-24px_rgba(0,80,169,0.5)] lg:p-6">
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-5">
              {/* Search */}
              <div className="group relative lg:col-span-2">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400 transition-colors duration-300 group-focus-within:text-[#0050a9]" />
                <input
                  type="text"
                  placeholder="Search roles, skills or keywords..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3.5 pl-12 pr-10 text-[#0050a9] placeholder-gray-400 outline-none transition-all duration-300 focus:border-[#0050a9]/50 focus:bg-white focus:ring-4 focus:ring-[#0050a9]/10"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    aria-label="Clear search"
                    className="absolute right-3 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full bg-gray-200 text-gray-600 transition-colors hover:bg-[#0050a9] hover:text-white"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>

              {/* Selects */}
              <FilterDropdown icon={Filter} value={selectedDepartment} options={departments} onChange={setSelectedDepartment} placeholder="All Departments" />
              <FilterDropdown icon={MapPin} value={selectedLocation} options={locations} onChange={setSelectedLocation} placeholder="All Locations" />
              <FilterDropdown icon={Clock} value={selectedType} options={types} onChange={setSelectedType} placeholder="All Types" />
            </div>

            {/* Active filters */}
            {activeFilters.length > 0 && (
              <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-gray-100 pt-4">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Active</span>
                {activeFilters.map((f) => (
                  <button
                    key={f.label}
                    onClick={f.clear}
                    className="group inline-flex items-center gap-2 rounded-full border border-[#0050a9]/20 bg-blue-50 px-3 py-1.5 text-xs font-semibold text-[#0050a9] transition-all duration-300 hover:border-[#0050a9]/50 hover:bg-[#0050a9] hover:text-white"
                  >
                    {f.label}
                    <X className="h-3 w-3" />
                  </button>
                ))}
                <button
                  onClick={clearAllFilters}
                  className="ml-1 text-xs font-semibold text-gray-500 underline-offset-2 transition-colors hover:text-[#0050a9] hover:underline"
                >
                  Clear all
                </button>
              </div>
            )}
          </div>

          {/* Results Count */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-gray-600">
              Showing <span className="font-semibold text-[#0050a9]">{filteredJobs.length}</span> positions
            </p>
          </div>

          {/* Job cards */}
          <div className="space-y-4">
            {filteredJobs.slice(0, visibleCount).map((job, index) => (
              <Link
                key={index}
                to={`/careers/${job.id}`}
                className="group relative block overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 transition-all duration-500 hover:-translate-y-1 hover:border-[#0050a9]/30 hover:shadow-[0_20px_44px_-20px_rgba(0,80,169,0.6)]"
              >
                {/* Accent rail */}
                <span className="absolute inset-y-0 left-0 w-1 origin-top scale-y-0 bg-gradient-to-b from-[#0050a9] to-[#00d4ff] transition-transform duration-500 group-hover:scale-y-100" />

                <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
                  <div className="flex-1">
                    <div className="mb-2 flex flex-wrap items-center gap-3">
                      <h3 className="text-xl font-bold text-[#0050a9]">{job.title}</h3>
                      <span className="rounded-full bg-[#e8f4fc] px-3 py-1 text-xs font-semibold text-[#0050a9]">
                        {job.level}
                      </span>
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          job.type === 'Full-time'
                            ? 'bg-green-100 text-green-700'
                            : job.type === 'Contract'
                              ? 'bg-orange-100 text-orange-700'
                              : 'bg-blue-100 text-blue-700'
                        }`}
                      >
                        {job.type}
                      </span>
                      {job.filled && (
                        <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">
                          Position filled
                        </span>
                      )}
                    </div>

                    <p className="mb-3 text-gray-600">{job.description}</p>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1.5">
                        <MapPin className="h-4 w-4 text-[#0050a9]/60" />
                        {job.location}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Briefcase className="h-4 w-4 text-[#0050a9]/60" />
                        {job.department}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="h-4 w-4 text-[#0050a9]/60" />
                        Posted {job.posted}
                      </span>
                    </div>
                  </div>

                  <span
                    className={`inline-flex shrink-0 items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition-all duration-300 ${
                      job.filled
                        ? 'bg-gray-100 text-gray-500'
                        : 'text-white group-hover:-translate-y-0.5 group-hover:shadow-[0_12px_26px_-10px_rgba(0,80,169,0.85)]'
                    }`}
                    style={
                      job.filled ? undefined : { background: 'linear-gradient(120deg, #012f62, #0055b4)' }
                    }
                  >
                    {job.filled ? 'View details' : 'Apply Now'}
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* Show more */}
          {filteredJobs.length > visibleCount && (
            <div className="mt-10 flex flex-col items-center gap-4">
              <div className="flex w-full max-w-lg items-center gap-4">
                <span className="h-px flex-1 bg-gradient-to-r from-transparent to-gray-200" />
                <span className="whitespace-nowrap text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400">
                  Showing {Math.min(visibleCount, filteredJobs.length)} of {filteredJobs.length}
                </span>
                <span className="h-px flex-1 bg-gradient-to-l from-transparent to-gray-200" />
              </div>
              <button
                onClick={() => setVisibleCount((n) => n + 8)}
                className="group relative inline-flex items-center overflow-hidden rounded-full px-6 py-2.5 text-sm font-semibold text-white shadow-[0_10px_24px_-12px_rgba(0,80,169,0.8)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_18px_36px_-14px_rgba(0,212,255,0.85)]"
                style={{ background: 'linear-gradient(120deg, #012f62, #0055b4)' }}
              >
                <span className="pointer-events-none absolute inset-0 -translate-x-full skew-x-12 bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-[900ms] ease-out group-hover:translate-x-full" />
                <span className="relative flex items-center gap-2.5">
                  Show more roles
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/15 transition-all duration-300 group-hover:bg-[#00d4ff] group-hover:text-[#012f62]">
                    <ArrowRight className="h-3.5 w-3.5 rotate-90 transition-transform duration-300" />
                  </span>
                </span>
              </button>
            </div>
          )}

          {filteredJobs.length === 0 && (
            <div className="text-center py-16 bg-gray-50 rounded-lg">
              <Briefcase className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg mb-2">No positions found matching your criteria</p>
              <button
                onClick={() => {
                  setSelectedDepartment('All Departments')
                  setSelectedLocation('All Locations')
                  setSelectedType('All Types')
                  setSearchQuery('')
                }}
                className="text-[#0050a9] font-semibold hover:underline"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Application Process */}
      <section
        ref={processRef}
        className="relative overflow-hidden py-20 lg:py-28"
        style={{ background: 'linear-gradient(120deg, #012f62, #0055b4)' }}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.7) 1px, transparent 1px)',
            backgroundSize: '56px 56px',
          }}
        />
        <div
          className="pointer-events-none absolute -left-32 -top-40 h-[440px] w-[440px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(0,212,255,0.2), transparent 65%)' }}
        />

        <div className="relative mx-auto max-w-7xl px-6">
          <div className="mb-16 text-center">
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#00d4ff]">
              From Application to Day One
            </span>
            <h2 className="mb-4 mt-4 text-[32px] font-bold text-white lg:text-[42px]">
              Our Hiring Process
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-white/70">
              Four stages, clearly defined, so you always know what comes next.
            </p>
          </div>

          <div className="relative">
            {/* Track that draws itself, with a pulse travelling start to end */}
            <div className="absolute left-[12%] right-[12%] top-8 hidden h-[3px] md:block">
              {/* Unfilled track */}
              <div className="absolute inset-0 rounded-full bg-white/15" />
              <div
                className={`relative h-full origin-left rounded-full bg-gradient-to-r from-[#00d4ff] via-white to-[#00d4ff] shadow-[0_0_12px_2px_rgba(0,212,255,0.6)] ${
                  processInView ? 'animate-draw-line' : 'scale-x-0'
                }`}
              />
              {processInView && (
                <span className="absolute -top-1.5 h-3.5 w-3.5 animate-flow-dot rounded-full bg-white shadow-[0_0_18px_6px_rgba(0,212,255,0.9)]" />
              )}
            </div>

            <div className="grid gap-10 md:grid-cols-4 md:gap-8">
              {hiringSteps.map((item, index) => (
                <div key={index} className="group relative text-center">
                  {/* Node */}
                  <div
                    className={`relative z-10 mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-white text-2xl font-bold text-[#0050a9] shadow-[0_10px_30px_-8px_rgba(0,212,255,0.7)] transition-transform duration-500 group-hover:animate-bounce-soft group-hover:scale-110 ${
                      processInView ? 'animate-pop-in' : 'opacity-0'
                    }`}
                    style={{ animationDelay: `${index * 260}ms` }}
                  >
                    <span className="absolute inset-0 rounded-full border-2 border-[#00d4ff]/50 opacity-0 transition-all duration-500 group-hover:scale-125 group-hover:opacity-100" />
                    {item.step}
                  </div>

                  <div
                    className={`transition-all duration-700 ${
                      processInView ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                    }`}
                    style={{ transitionDelay: `${index * 260 + 200}ms` }}
                  >
                    <h3 className="mb-3 text-xl font-bold text-white">{item.title}</h3>
                    <p className="leading-relaxed text-white/70">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden bg-white py-16 lg:py-20">
        <div className="mx-auto max-w-5xl px-6">
          <div className="group relative overflow-hidden rounded-3xl border border-blue-100 bg-gradient-to-b from-blue-50/80 via-white to-white px-8 py-14 text-center shadow-[0_24px_60px_-32px_rgba(0,80,169,0.45)] lg:px-16">
            {/* Soft brand glows + dot texture, still on white */}
            <div
              className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full"
              style={{ background: 'radial-gradient(circle, rgba(0,80,169,0.12), transparent 65%)' }}
            />
            <div
              className="pointer-events-none absolute -bottom-28 -right-20 h-80 w-80 rounded-full"
              style={{ background: 'radial-gradient(circle, rgba(0,212,255,0.14), transparent 65%)' }}
            />
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.35]"
              style={{
                backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(0,80,169,0.14) 1px, transparent 0)',
                backgroundSize: '26px 26px',
                maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 75%)',
                WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 75%)',
              }}
            />

            <div className="relative">
              {/* Icon tile */}
              <span
                className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl text-white shadow-[0_14px_30px_-12px_rgba(0,80,169,0.9)] transition-transform duration-500 group-hover:scale-110"
                style={{ background: 'linear-gradient(140deg, #012f62, #0055b4)' }}
              >
                <Send className="h-7 w-7" />
              </span>

              <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#00b4d8]">
                Open Application
              </span>

              <h2 className="mb-4 mt-4 text-[32px] font-bold text-[#0050a9] lg:text-[42px]">
                Don't see the right role?
              </h2>
              <p className="mx-auto mb-9 max-w-2xl text-lg leading-relaxed text-gray-600">
                We're always looking for talented people. Send us your resume and we'll keep you in
                mind as new roles open across our global teams.
              </p>

              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <a
                  href="mailto:hr@jsanconsulting.com"
                  className="group/btn relative inline-flex items-center justify-center overflow-hidden rounded-full px-7 py-3.5 font-semibold text-white shadow-[0_12px_28px_-12px_rgba(0,80,169,0.9)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_40px_-14px_rgba(0,212,255,0.85)]"
                  style={{ background: 'linear-gradient(120deg, #012f62, #0055b4)' }}
                >
                  <span className="pointer-events-none absolute inset-0 -translate-x-full skew-x-12 bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-[900ms] ease-out group-hover/btn:translate-x-full" />
                  <span className="relative flex items-center gap-2.5">
                    Send Your Resume
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/15 transition-all duration-300 group-hover/btn:bg-[#00d4ff] group-hover/btn:text-[#012f62]">
                      <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </span>
                </a>

                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#0050a9]/30 px-7 py-3.5 font-semibold text-[#0050a9] transition-all duration-300 hover:-translate-y-1 hover:border-[#0050a9] hover:bg-[#0050a9] hover:text-white"
                >
                  Contact Us
                </Link>
              </div>

              <p className="mt-8 text-sm text-gray-500">
                Prefer email?{' '}
                <a
                  href="mailto:hr@jsanconsulting.com"
                  className="font-semibold text-[#0050a9] underline-offset-4 hover:underline"
                >
                  hr@jsanconsulting.com
                </a>
                <span className="mx-3 hidden text-gray-300 sm:inline">|</span>
                <span className="block sm:inline">Every application is reviewed by our talent team.</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <MobileNav />
    </div>
  )
}
