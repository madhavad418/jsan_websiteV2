import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Play,
  ChevronDown,
  MapPin,
  Mail,
  Phone,
  Linkedin,
  Twitter,
  Facebook,
  Instagram,
  Youtube,
  Building2,
  Users,
  Search,
  X,
  Navigation
} from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import MobileNav from '../components/MobileNav'
import ContactIntent from '../components/ContactIntent'
import EnquiryFields from '../components/EnquiryFields'
import WorldMap from '../components/WorldMap'

// Office data organized by region
/* Hero photograph. Swap for a local file under public/ when one is available. */
const HERO_IMAGE = '/careers/contactUs.png'

const officeRegions = [
  {
    name: 'Europe',
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&h=500&fit=crop',
    offices: [
      { city: 'London', country: 'UK', isHQ: true, address: 'Profile West, 950 Great West Road, Brentford, Middlesex, TW8 9ES, United Kingdom', email: 'info@jsanconsulting.com', phone: '+44 20 3865 0798' },
      { city: 'Berlin', country: 'Germany', address: 'Südwestkorso 14, 12161 Berlin, Germany', email: 'info@jsanconsulting.com' },
      { city: 'Linköping', country: 'Sweden', address: 'Smedjegatan, 582 38 Linköping, Sweden', email: 'info@jsanconsulting.com' },
      { city: 'Oslo', country: 'Norway', address: 'Innspurten 13A, 0663 Oslo, Norway', email: 'info@jsanconsulting.com' },
      { city: 'Copenhagen', country: 'Denmark', address: 'Vendersgade 28, st., 1363 København K, Denmark', email: 'info@jsanconsulting.com' },
      { city: 'Neuilly-sur-Seine', country: 'France', address: '144 Avenue Charles de Gaulle, 92200 Neuilly-sur-Seine, France', email: 'info@jsanconsulting.com' },
      { city: 'Wrocław', country: 'Poland', address: 'ul. Świętego Jerzego 1, 50-518 Wrocław, Poland', email: 'info@jsanconsulting.com' },
      { city: 'Tallinn', country: 'Estonia', address: 'Viru väljak 2, Kesklinna linnaosa, 10111 Tallinn, Harju maakond, Estonia', email: 'info@jsanconsulting.com' },
      { city: 'Riga', country: 'Latvia', address: 'Aspazijas street 24-7, Riga, LV-1050, Latvia', email: 'info@jsanconsulting.com' },
      { city: 'Madrid', country: 'Spain', address: 'Section D, PE Avalon, Calle Santa Leonor 65, 28037 Madrid, Spain', email: 'info@jsanconsulting.com' },
      { city: 'Bray', country: 'Ireland', address: 'Bull Lane, Bray, Wicklow, Ireland', email: 'info@jsanconsulting.com' },
      { city: 'Zagreb', country: 'Croatia', address: 'Zagreb, Croatia', email: 'info@jsanconsulting.com' },
    ]
  },
  {
    name: 'Americas',
    image: 'https://images.unsplash.com/photo-1534430480872-3498386e7856?w=800&h=500&fit=crop',
    offices: [
      { city: 'Princeton', country: 'USA', address: '100 Overlook Center, 2nd Floor, Princeton, NJ 08540, USA', email: 'info@jsanconsulting.com' },
      { city: 'Toronto', country: 'Canada', address: '77 Guthrie Avenue, Toronto, ON M8Y 3L3, Canada', email: 'info@jsanconsulting.com' },
      { city: 'São Paulo', country: 'Brazil', address: 'Av. Dra. Ruth Cardoso 8501, 17th Floor, Ed. Eldorado Business Tower, São Paulo 05425-070, Brazil', email: 'info@jsanconsulting.com' },
    ]
  },
  {
    name: 'Asia Pacific',
    image: 'https://images.unsplash.com/photo-1536599018102-9f803c140fc1?w=800&h=500&fit=crop',
    offices: [
      { city: 'Hyderabad', country: 'India', address: 'Plot No. 42, Nathani Towers, Jayabheri Enclave II, Gachibowli, Hyderabad, Telangana 500032, India', email: 'info@jsanconsulting.com' },
      { city: 'Singapore', country: 'Singapore', address: '51 Goldhill Plaza #07-07, Singapore 308900', email: 'info@jsanconsulting.com' },
      { city: 'Kuala Lumpur', country: 'Malaysia', address: 'Unit 20-01, Level 20, Menara Centara, No. 360 Jalan Tuanku Abdul Rahman, 50100 Kuala Lumpur, Malaysia', email: 'info@jsanconsulting.com' },
      { city: 'Hong Kong', country: 'Hong Kong', address: "2/F, Tower 1, Tern Centre, 237 Queen's Road Central, Sheung Wan, Hong Kong", email: 'info@jsanconsulting.com' },
      { city: 'Jakarta', country: 'Indonesia', address: 'Cyber 2 Tower, 18th Floor, Jl. HR Rasuna Said Block X-5, Kav 13, Jakarta 12950, Indonesia', email: 'info@jsanconsulting.com' },
      { city: 'Tokyo', country: 'Japan', address: '1-4-29 Fujimicho, Tachikawa-shi, Tokyo 190-0013, Japan', email: 'info@jsanconsulting.com' },
      { city: 'Melbourne', country: 'Australia', address: '12/296 Bay Road, Cheltenham VIC 3192, Australia', email: 'info@jsanconsulting.com' },
      { city: 'Bangkok', country: 'Thailand', address: 'Bangkok, Thailand', email: 'info@jsanconsulting.com' },
      { city: 'Ho Chi Minh City', country: 'Vietnam', address: 'Ho Chi Minh City, Vietnam', email: 'info@jsanconsulting.com' },
    ]
  },
  {
    name: 'Middle East & Africa',
    image: 'https://images.unsplash.com/photo-1577948000111-9c970dfe3743?w=800&h=500&fit=crop',
    offices: [
      { city: 'Sandton', country: 'South Africa', address: 'SS Katherine and West, Section 25, Third Floor, 114 West Street, Sandton, Gauteng 2196, South Africa', email: 'info@jsanconsulting.com' },
      { city: 'Dubai', country: 'United Arab Emirates', address: 'Dubai, United Arab Emirates', email: 'info@jsanconsulting.com' },
    ]
  },
]

const regions = [
  { value: '', label: 'Region*' },
  { value: 'europe', label: 'Europe' },
  { value: 'north-america', label: 'North America' },
  { value: 'latin-america', label: 'Latin America' },
  { value: 'asia-pacific', label: 'Asia Pacific' },
  { value: 'middle-east-africa', label: 'Middle East & Africa' },
]

const socialLinks = [
  { icon: Linkedin, href: 'https://www.linkedin.com/company/jsan-consulting-group/posts/?feedView=all', label: 'LinkedIn', color: '#0A66C2' },
  { icon: Facebook, href: 'https://www.facebook.com/profile.php?id=61589727355136', label: 'Facebook', color: '#1877F2' },
  { icon: Instagram, href: 'https://www.instagram.com/jsanconsultinggroup/', label: 'Instagram', color: '#E4405F' },
  { icon: Youtube, href: 'https://www.youtube.com/@JSANConsultingGroup', label: 'YouTube', color: '#FF0000' },
  { icon: Twitter, href: 'https://twitter.com/jsanconsulting', label: 'Twitter', color: '#1DA1F2' },
]

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    phone: '',
    region: '',
    message: '',
    consent: false,
  })
  // id drives which follow-up fields render; label is what lands in the notification email
  const [enquiryTopic, setEnquiryTopic] = useState<string | null>(null)
  const [enquiryTopicId, setEnquiryTopicId] = useState<string | null>(null)
  const [activeRegion, setActiveRegion] = useState('Europe')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
  }

  const [directoryQuery, setDirectoryQuery] = useState('')
  const [directoryRegion, setDirectoryRegion] = useState('All')

  const allOffices = officeRegions.flatMap((region) =>
    region.offices.map((office) => ({ ...office, region: region.name }))
  )

  const directoryFilters = ['All', ...officeRegions.map((r) => r.name)]

  const visibleOffices = allOffices.filter((office) => {
    const matchesRegion = directoryRegion === 'All' || office.region === directoryRegion
    const q = directoryQuery.trim().toLowerCase()
    const matchesQuery =
      q === '' ||
      office.city.toLowerCase().includes(q) ||
      office.country.toLowerCase().includes(q) ||
      office.region.toLowerCase().includes(q)
    return matchesRegion && matchesQuery
  })

  // Set to true to bring the "Our Global Presence" section back.
  const showGlobalPresence: boolean = false
  const currentRegion = officeRegions.find(r => r.name === activeRegion)

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section  photograph left, copy right. The photo sits in a rounded
          card with a pale block offset behind its lower-left corner. Below lg the
          copy leads and the photograph follows it. */}
      <section className="relative overflow-hidden bg-white pt-24 lg:pt-28" style={{ marginTop: "44px" }}>
        {/* Brand wash, kept well clear of the photo card */}
        <div
          className="pointer-events-none absolute inset-y-0 left-0 w-[40%]"
          style={{
            background:
              'radial-gradient(50% 45% at 5% 10%, rgba(0,80,169,0.06) 0%, rgba(0,80,169,0) 100%), ' +
              'radial-gradient(45% 55% at 30% 95%, rgba(0,212,255,0.09) 0%, rgba(0,212,255,0) 100%)',
          }}
        />

        <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-5 pb-16 max-[359px]:px-[18px] sm:px-6 lg:grid-cols-[minmax(0,1.02fr)_minmax(0,1fr)] lg:gap-16 lg:pb-24">
          {/* Photograph */}
          <div className="relative order-2 lg:order-1">
            {/* Pale block peeking out below and to the left of the card */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-7 -left-7 hidden h-[46%] w-[52%] rounded-2xl bg-[#e6eefb] lg:block"
            />
            <div className="relative overflow-hidden rounded-3xl bg-gray-100 shadow-[0_28px_60px_-32px_rgba(1,47,98,0.5)]">
              <img
                src={HERO_IMAGE}
                alt="JSAN office"
                loading="eager"
                decoding="async"
                {...{ fetchpriority: 'high' }}
                className="aspect-[4/3] w-full object-cover object-center sm:aspect-[16/10] lg:aspect-auto lg:h-[520px] xl:h-[560px]"
              />
            </div>
          </div>

          {/* Copy */}
          <div className="order-1 animate-[fadeIn_0.45s_ease-out_both] motion-reduce:animate-none lg:order-2">
            <nav className="mb-4 flex items-center gap-2 text-sm text-gray-500">
              <Link to="/" className="inline-flex min-h-[24px] items-center transition-colors hover:text-[#0050a9]">Home</Link>
              <span>/</span>
              <span className="font-medium text-[#0050a9]">Contact</span>
            </nav>

            {/* Re-import Globe from lucide-react if this is uncommented.
            <span className="mb-5 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.25em] text-[#00a3e0]">
              <Globe className="h-4 w-4" />
              25+ Offices Worldwide
            </span> */}
            <h1 className="mb-3 text-[38px] font-bold leading-[1.08] text-[#0a1a3a] lg:text-[54px]">
              Let's start a conversation.
            </h1>
            <p className="mb-6 text-[24px] font-semibold leading-tight text-[#0050a9] lg:text-[32px]">
              Wherever you are, we're close by.
            </p>
            <p className="mb-7 max-w-lg text-lg leading-relaxed text-gray-600">
              Whether you have a question about our services, want to explore partnership opportunities,
              or need expert guidance on your next project  we're here to help.
            </p>

            <div className="mb-7 flex flex-wrap gap-x-8 gap-y-3">
              <a href="mailto:info@jsanconsulting.com" className="group flex items-center gap-3 text-gray-700 transition-colors hover:text-[#0050a9]">
                <Mail className="h-5 w-5 text-[#00a3e0]" />
                <span>info@jsanconsulting.com</span>
              </a>
              <a href="tel:+442038650798" className="group flex items-center gap-3 text-gray-700 transition-colors hover:text-[#0050a9]">
                <Phone className="h-5 w-5 text-[#00a3e0]" />
                <span>+44 20 3865 0798</span>
              </a>
            </div>

            <a
              href="#contact-form"
              className="group inline-flex items-center gap-2.5 rounded-lg px-7 py-3.5 font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_34px_-14px_rgba(0,80,169,0.9)]"
              style={{ background: 'linear-gradient(120deg, #012f62, #0055b4)' }}
            >
              Send Us a Message
              <ChevronDown className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
            </a>
          </div>
        </div>
      </section>
      <section id="contact-form" className="py-20 bg-white relative overflow-hidden">
        {/* Subtle background decoration */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#f0f7ff] to-transparent pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-14">
            <span className="inline-block text-[#0050a9] font-bold text-sm uppercase tracking-widest mb-3">Reach Out</span>
            <h2 className="text-[36px] lg:text-[48px] font-bold text-[#0050a9] mb-4">
              Get in Touch
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              Tell us what you would like to discuss and we will route it to the right team.
            </p>
          </div>

          <ContactIntent
            value={enquiryTopicId}
            onSelect={(id, label) => {
              setEnquiryTopicId(id)
              setEnquiryTopic(label)
            }}
          />

          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-start">
            {/* Left Side - Form (3 cols) */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-2xl shadow-xl shadow-[#0050a9]/5 border border-gray-100 p-8 lg:p-10">
                <form action="https://formsubmit.co/info@jsanconsulting.com" method="POST" encType="multipart/form-data" className="space-y-5">
                  <input type="hidden" name="_subject" value="New Contact Enquiry from JSAN Website" />
                  <input type="hidden" name="_captcha" value="false" />
                  <input type="hidden" name="_template" value="table" />
                  <input type="hidden" name="enquiry_topic" value={enquiryTopic ?? 'Not specified'} />
                  <input type="hidden" name="_cc" value="hr@jsanconsulting.com" />
                  {/* Row 1 - Name & Email */}
                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                      <input
                        type="text"
                        name="name"
                        placeholder="John Doe"
                        required
                        pattern=".{2,}"
                        title="Name must be at least 2 characters"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-[#0050a9] focus:bg-white focus:ring-2 focus:ring-[#0050a9]/10 focus:outline-none transition-all text-gray-800 placeholder-gray-400"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                      <input
                        type="email"
                        name="email"
                        placeholder="john@company.com"
                        required
                        pattern="[^\s@]+@[^\s@]+\.[^\s@]+"
                        title="Please enter a valid email address"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-[#0050a9] focus:bg-white focus:ring-2 focus:ring-[#0050a9]/10 focus:outline-none transition-all text-gray-800 placeholder-gray-400"
                      />
                    </div>
                  </div>

                  {/* Row 2 - Organization & Phone */}
                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Organization *</label>
                      <input
                        type="text"
                        name="organization"
                        placeholder="Company name"
                        required
                        value={formData.organization}
                        onChange={handleChange}
                        className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-[#0050a9] focus:bg-white focus:ring-2 focus:ring-[#0050a9]/10 focus:outline-none transition-all text-gray-800 placeholder-gray-400"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                      <input
                        type="tel"
                        name="phone"
                        placeholder="+1 (555) 000-0000"
                        required
                        pattern="\+?[\d\s\-()]{7,20}"
                        title="Please enter a valid phone number (7-20 digits)"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-[#0050a9] focus:bg-white focus:ring-2 focus:ring-[#0050a9]/10 focus:outline-none transition-all text-gray-800 placeholder-gray-400"
                      />
                    </div>
                  </div>

                  {/* Row 3 - Region. The enquiry topic chosen in step 1 replaces the old
                      "Inquiry Type" select, which asked the same question twice. */}
                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Region *</label>
                    <select
                      name="region"
                      value={formData.region}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-[#0050a9] focus:bg-white focus:ring-2 focus:ring-[#0050a9]/10 focus:outline-none transition-all text-gray-800 appearance-none cursor-pointer"
                    >
                      {regions.map((region) => (
                        <option key={region.value} value={region.value} className="text-gray-900">{region.label}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-4 bottom-4 w-5 h-5 text-gray-400 pointer-events-none" />
                  </div>

                  {/* Step 2: whatever the chosen topic actually needs to know */}
                  <EnquiryFields topicId={enquiryTopicId} />

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                    <textarea
                      name="message"
                      placeholder="Tell us about your project or inquiry... *"
                      required
                      minLength={10}
                      title="Message must be at least 10 characters"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-[#0050a9] focus:bg-white focus:ring-2 focus:ring-[#0050a9]/10 focus:outline-none transition-all text-gray-800 placeholder-gray-400 resize-none"
                    />
                  </div>

                  {/* Consent */}
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      name="consent"
                      id="consent"
                      required
                      checked={formData.consent}
                      onChange={handleChange}
                      className="mt-1 w-6 h-6 shrink-0 border-2 border-gray-300 rounded accent-[#0050a9]"
                    />
                    <label htmlFor="consent" className="text-sm text-gray-500 leading-relaxed">
                      I consent to JSAN collecting and processing my personal information in accordance with the{' '}
                      <a href="/privacy-policy" className="text-[#0050a9] underline hover:text-[#03013d]">Privacy Policy</a>.
                      I understand I can withdraw my consent at any time.
                    </label>
                  </div>

                  {/* Submit */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full md:w-auto inline-flex items-center justify-center gap-3 bg-[#0050a9] hover:bg-[#003d82] text-white px-10 py-4 font-semibold text-lg rounded-xl transition-all hover:shadow-lg hover:shadow-[#0050a9]/25"
                    >
                      Send Message
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </button>
                  </div>

                  <p className="text-xs text-gray-400">
                    This site is protected by reCAPTCHA and the Google{' '}
                    <a href="#" className="text-[#0050a9] underline">Privacy Policy</a> and{' '}
                    <a href="#" className="text-[#0050a9] underline">Terms of Service</a> apply.
                  </p>
                </form>
              </div>
            </div>

            {/* Right Side - Quick Contact Info (2 cols) */}
            <div className="lg:col-span-2">
              <div className="sticky top-32 space-y-5">
                {/* Contact Cards - each is its own block */}
                <a href="https://maps.google.com/?q=Profile+West+950+Great+West+Road+Brentford+Middlesex+TW8+9ES" target="_blank" rel="noopener noreferrer" className="group block bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-lg hover:border-[#0050a9]/20 transition-all">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#0050a9]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#0050a9] transition-colors">
                      <Building2 className="w-5 h-5 text-[#0050a9] group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1">Global Headquarters</h4>
                      <p className="text-gray-500 text-sm leading-relaxed">Profile West, 950 Great West Road<br />Brentford, Middlesex, TW8 9ES, UK</p>
                    </div>
                  </div>
                </a>

                <a href="mailto:info@jsanconsulting.com" className="group block bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-lg hover:border-[#0050a9]/20 transition-all">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#0050a9]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#0050a9] transition-colors">
                      <Mail className="w-5 h-5 text-[#0050a9] group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1">Email Us</h4>
                      <span className="text-[#0050a9] text-sm font-medium">info@jsanconsulting.com</span>
                    </div>
                  </div>
                </a>

                <a href="tel:+442038650798" className="group block bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-lg hover:border-[#0050a9]/20 transition-all">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#0050a9]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#0050a9] transition-colors">
                      <Phone className="w-5 h-5 text-[#0050a9] group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1">Call Us</h4>
                      <span className="text-[#0050a9] text-sm font-medium">+44 20 3865 0798</span>
                      <p className="text-gray-400 text-xs mt-1">Mon-Fri, 9am-6pm GMT</p>
                    </div>
                  </div>
                </a>

                {/* Stats + Social  combined card */}
                <div className="bg-gradient-to-br from-[#0050a9] to-[#0070d4] rounded-2xl p-6 text-white">
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold">20+</div>
                      <div className="text-white/60 text-xs mt-1">Countries</div>
                    </div>
                    <div className="text-center border-x border-white/15">
                      <div className="text-3xl font-bold">600+</div>
                      <div className="text-white/60 text-xs mt-1">Experts</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold">24/7</div>
                      <div className="text-white/60 text-xs mt-1">Support</div>
                    </div>
                  </div>
                  <div className="border-t border-white/15 pt-5 flex items-center justify-between">
                    <span className="text-white/70 text-sm font-medium">Connect With Us</span>
                    <div className="flex gap-2">
                      {socialLinks.map((social) => (
                        <a
                          key={social.label}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-9 h-9 rounded-lg bg-white/10 hover:bg-white/25 flex items-center justify-center transition-colors"
                          aria-label={social.label}
                        >
                          <social.icon className="w-4 h-4" />
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Find Us / Map Section */}
      <section className="py-20 bg-[#f0f7ff]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="inline-block text-[#0050a9] font-bold text-sm uppercase tracking-widest mb-3">Find Us</span>
            <h2 className="text-[36px] lg:text-[48px] font-bold text-[#0050a9] mb-4">
              Our Offices Around the World
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              20+ locations across 4 continents. Hover or tap any point on the map to see the office and its address.
            </p>
          </div>

          {/* Interactive map with a marker for every JSAN office */}
          <WorldMap />

          <div className="mt-10 flex flex-col items-center gap-2 text-center">
            <div className="flex items-center justify-center gap-2 text-gray-600 max-w-2xl">
              <MapPin className="w-5 h-5 text-[#0050a9] flex-shrink-0" />
              <span className="font-medium">Global Headquarters  Profile West, 950 Great West Road, Brentford, Middlesex, TW8 9ES, United Kingdom</span>
            </div>
            <a
              href="https://www.google.com/maps/search/?api=1&query=Profile+West%2C+950+Great+West+Road%2C+Brentford%2C+Middlesex%2C+TW8+9ES%2C+United+Kingdom"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[#0050a9] font-semibold hover:underline"
            >
              Open headquarters in Google Maps
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </a>
          </div>
        </div>
      </section>

      {/* Global Offices Section, currently hidden. This block contains its own
          JSX comments, so it cannot simply be wrapped in one; it is disabled
          with the showGlobalPresence flag above instead. */}
      {showGlobalPresence && (
      <section id="global-presence" className="scroll-mt-24 py-20 bg-[#0050a9]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-[36px] lg:text-[48px] font-bold text-white mb-4">
              Our Global Presence
            </h2>
            <p className="text-white/70 text-xl max-w-3xl mx-auto">
              With 25+ offices across 4 continents, we're positioned to serve you wherever you are.
            </p>
          </div>

          {/* World Map Visualization */}
          <div className="relative mb-16 p-8 bg-[#0a1a3a] rounded-2xl overflow-hidden">
            <div className="absolute inset-0 opacity-20">
              <svg viewBox="0 0 1000 500" className="w-full h-full">
                {/* Simplified world map outline */}
                <ellipse cx="500" cy="250" rx="400" ry="200" fill="none" stroke="#0050a9" strokeWidth="1" />
                <ellipse cx="500" cy="250" rx="300" ry="150" fill="none" stroke="#0050a9" strokeWidth="0.5" />
                <ellipse cx="500" cy="250" rx="200" ry="100" fill="none" stroke="#0050a9" strokeWidth="0.5" />
                {/* Grid lines */}
                <line x1="100" y1="250" x2="900" y2="250" stroke="#0050a9" strokeWidth="0.5" />
                <line x1="500" y1="50" x2="500" y2="450" stroke="#0050a9" strokeWidth="0.5" />
              </svg>
            </div>

            {/* Region Markers */}
            <div className="relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-6">
              {officeRegions.map((region) => (
                <button
                  key={region.name}
                  onClick={() => setActiveRegion(region.name)}
                  className={`relative group overflow-hidden rounded-xl transition-all ${
                    activeRegion === region.name ? 'ring-4 ring-cyan-400 scale-105' : 'hover:scale-102'
                  }`}
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={region.image}
                      alt={region.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className={`absolute inset-0 transition-colors ${
                      activeRegion === region.name
                        ? 'bg-[#0050a9]/60'
                        : 'bg-black/40 group-hover:bg-[#0050a9]/50'
                    }`}></div>
                  </div>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4">
                    <MapPin className={`w-8 h-8 mb-2 ${activeRegion === region.name ? 'text-cyan-400' : 'drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]'}`} />
                    <h3 className="text-xl font-bold !text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]">{region.name}</h3>
                    <p className="text-white/90 text-sm drop-shadow-[0_1px_3px_rgba(0,0,0,0.7)]">{region.offices.length} {region.offices.length === 1 ? 'Office' : 'Offices'}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Active Region Offices */}
          {currentRegion && (
            <div className="animate-fadeIn">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                  <MapPin className="w-6 h-6 text-cyan-400" />
                  {currentRegion.name} Offices
                </h3>
                <span className="text-white/60">{currentRegion.offices.length} locations</span>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {currentRegion.offices.map((office, index) => (
                  <div
                    key={index}
                    className={`bg-white/5 backdrop-blur border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-colors ${
                      'isHQ' in office && office.isHQ ? 'ring-2 ring-cyan-400/50' : ''
                    }`}
                  >
                    {'isHQ' in office && office.isHQ && (
                      <span className="inline-block bg-cyan-400 text-[#0050a9] text-xs font-bold px-2 py-1 rounded mb-3">
                        HEADQUARTERS
                      </span>
                    )}
                    <h4 className="text-white font-bold text-lg mb-1">
                      {office.city}, {office.country}
                    </h4>
                    {office.address && (
                      <p className="text-white/60 text-sm mb-3">{office.address}</p>
                    )}
                    {office.email && (
                      <a
                        href={`mailto:${office.email}`}
                        className="flex items-center gap-2 text-cyan-400 text-sm hover:underline mb-2"
                      >
                        <Mail className="w-4 h-4" />
                        {office.email}
                      </a>
                    )}
                    {office.phone && (
                      <a
                        href={`tel:${office.phone}`}
                        className="flex items-center gap-2 text-white/70 text-sm hover:text-cyan-400"
                      >
                        <Phone className="w-4 h-4" />
                        {office.phone}
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
      )}

      {/* Complete office directory, a clean grouped list */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-10 text-center">
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#00b4d8]">
              Find Your Nearest Team
            </span>
            <h2 className="text-gradient mb-3 mt-4 text-[32px] font-bold lg:text-[40px]">
              Complete Office Directory
            </h2>
            <p className="text-lg text-gray-500">
              {allOffices.length} offices across {officeRegions.length} regions.
            </p>
          </div>

          {/* Search + region filters */}
          <div className="mb-12 flex flex-col items-center gap-4">
            <div className="group relative w-full max-w-sm">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 transition-colors group-focus-within:text-[#0050a9]" />
              <input
                type="text"
                value={directoryQuery}
                onChange={(e) => setDirectoryQuery(e.target.value)}
                placeholder="Search city or country"
                aria-label="Search offices"
                className="w-full rounded-full border border-gray-200 bg-gray-50 py-2.5 pl-11 pr-9 text-sm text-[#0050a9] placeholder-gray-400 outline-none transition-all duration-300 focus:border-[#0050a9]/40 focus:bg-white focus:ring-4 focus:ring-[#0050a9]/10"
              />
              {directoryQuery && (
                <button
                  onClick={() => setDirectoryQuery('')}
                  aria-label="Clear search"
                  className="absolute right-3 top-1/2 flex h-5 w-5 -translate-y-1/2 items-center justify-center rounded-full bg-gray-200 text-gray-600 transition-colors hover:bg-[#0050a9] hover:text-white"
                >
                  <X className="h-3 w-3" />
                </button>
              )}
            </div>

            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
              {directoryFilters.map((filter) => {
                const isActive = directoryRegion === filter
                const count =
                  filter === 'All'
                    ? allOffices.length
                    : allOffices.filter((o) => o.region === filter).length
                return (
                  <button
                    key={filter}
                    onClick={() => setDirectoryRegion(filter)}
                    className={`group relative pb-1 text-sm font-semibold transition-colors duration-300 ${
                      isActive ? 'text-[#0050a9]' : 'text-gray-400 hover:text-[#0050a9]'
                    }`}
                  >
                    {filter}
                    <span className={`ml-1.5 text-xs ${isActive ? 'text-[#00b4d8]' : 'text-gray-300'}`}>
                      {count}
                    </span>
                    <span
                      className={`absolute inset-x-0 bottom-0 h-0.5 rounded-full bg-gradient-to-r from-[#0050a9] to-[#00d4ff] transition-transform duration-300 ${
                        isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                      }`}
                    />
                  </button>
                )
              })}
            </div>
          </div>

          {/* Grouped list */}
          {officeRegions.map((region) => {
            const offices = visibleOffices.filter((o) => o.region === region.name)
            if (offices.length === 0) return null

            return (
              <div key={region.name} className="mb-12 last:mb-0">
                <div className="mb-2 flex items-baseline gap-3">
                  <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#0050a9]">
                    {region.name}
                  </h3>
                  <span className="text-xs text-gray-400">{offices.length}</span>
                  <span className="h-px flex-1 bg-gray-100" />
                </div>

                <div className="grid grid-cols-1 gap-x-12 md:grid-cols-2">
                  {offices.map((office, index) => (
                    <div
                      key={`${office.city}-${index}`}
                      className="group flex items-center gap-4 border-b border-gray-100 py-4 transition-colors duration-300 hover:border-[#0050a9]/25"
                    >
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#00d4ff] transition-transform duration-300 group-hover:scale-150" />

                      <div className="min-w-0 flex-1">
                        <p className="flex items-center gap-2 font-semibold text-gray-800 transition-colors duration-300 group-hover:text-[#0050a9]">
                          {office.city}
                          <span className="font-normal text-gray-400">{office.country}</span>
                          {'isHQ' in office && office.isHQ && (
                            <span className="rounded bg-blue-50 px-1.5 py-0.5 text-[10px] font-bold text-[#0050a9]">
                              HQ
                            </span>
                          )}
                        </p>
                        <p className="truncate text-xs text-gray-400">{office.address}</p>
                      </div>

                      <div className="flex shrink-0 items-center gap-3">
                        <a
                          href={`mailto:${office.email}`}
                          aria-label={`Email the ${office.city} office`}
                          className="-m-2.5 flex h-11 w-11 items-center justify-center text-gray-300 transition-colors duration-300 hover:text-[#0050a9]"
                        >
                          <Mail className="h-4 w-4" />
                        </a>
                        <a
                          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(office.address)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Directions to the ${office.city} office`}
                          className="-m-2.5 flex h-11 w-11 items-center justify-center text-gray-300 transition-colors duration-300 hover:text-[#0050a9]"
                        >
                          <Navigation className="h-4 w-4" />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}

          {visibleOffices.length === 0 && (
            <div className="py-12 text-center">
              <p className="mb-2 text-gray-500">No offices match that search.</p>
              <button
                onClick={() => {
                  setDirectoryQuery('')
                  setDirectoryRegion('All')
                }}
                className="text-sm font-semibold text-[#0050a9] hover:underline"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="w-20 h-20 rounded-full bg-[#e8f4fc] flex items-center justify-center mx-auto mb-8">
            <Users className="w-10 h-10 text-[#0050a9]" />
          </div>
          <h2 className="text-[32px] lg:text-[40px] font-bold text-[#0050a9] mb-4">
            Ready to Modernise Your Operations?
          </h2>
          <p className="text-gray-600 text-xl mb-8 max-w-2xl mx-auto">
            Our team of 600+ experts across 20+ countries is ready to help you achieve your goals.
            Let's discuss how we can support your journey.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 600, behavior: 'smooth' }); }}
              className="inline-flex items-center gap-3 bg-[#0050a9] hover:bg-[#03013d] text-white px-8 py-4 font-semibold rounded-lg transition-colors"
            >
              Contact Us Now
              <Play className="w-5 h-5" />
            </a>
            <Link
              to="/company"
              className="inline-flex items-center gap-3 bg-transparent border-2 border-[#0050a9] text-[#0050a9] hover:bg-[#0050a9] hover:text-white px-8 py-4 font-semibold rounded-lg transition-colors"
            >
              Learn About Us
              <Play className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
      <MobileNav />

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </div>
  )
}
