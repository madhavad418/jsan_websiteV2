import { useState } from 'react'
import { Mail, Clipboard, Check, ChevronRight, Users } from 'lucide-react'

interface ServiceContactFormProps {
  /** The service name shown in the heading, e.g. "Location Intelligence" */
  serviceName: string
  /** Dropdown options: the sub-services this page offers */
  subServices: { value: string; label: string }[]
}

export default function ServiceContactForm({ serviceName, subServices }: ServiceContactFormProps) {
  const [copied, setCopied] = useState(false)
  const [copiedHr, setCopiedHr] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    budget: '',
    timeline: '',
    message: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const isValid = () =>
    formData.name.trim() !== '' &&
    formData.email.trim() !== '' &&
    formData.service !== '' &&
    formData.message.trim() !== ''

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('info@jsanconsulting.com')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleCopyHrEmail = () => {
    navigator.clipboard.writeText('info@jsanconsulting.com')
    setCopiedHr(true)
    setTimeout(() => setCopiedHr(false), 2000)
  }

  const inputClass =
    'w-full py-3 px-4 bg-white/10 border border-white/20 rounded-xl placeholder-gray-400 text-white focus:outline-none focus:border-white/40 transition-colors'

  return (
    <section className="py-5 lg:py-14 bg-gray-50" style={{ position: 'relative', zIndex: 20 }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <h2 className="text-[36px] lg:text-[42px] font-bold mb-4 text-gradient">
            Get in Touch
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Interested in our {serviceName} services? Fill out the form and our team will get back to you within 24 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left: Form */}
          <div>
            <div className="rounded-3xl p-8 lg:p-10 h-full" style={{ background: 'linear-gradient(120deg, #012f62, #0055b4)' }}>
              <form action="https://formsubmit.co/info@jsanconsulting.com" method="POST" encType="multipart/form-data">
                <input type="hidden" name="_subject" value={`New ${serviceName} Enquiry from JSAN Website`} />
                <input type="hidden" name="_captcha" value="false" />
                <input type="hidden" name="_template" value="table" />
                <input type="hidden" name="_cc" value="hr@jsanconsulting.com" />
                <input type="hidden" name="service_page" value={serviceName} />

                <div className="flex flex-col gap-4">
                  <h3 className="text-xl font-semibold text-white mb-2">Tell us about your project</h3>

                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="name"
                      placeholder="Your Name *"
                      required
                      pattern=".{2,}"
                      title="Name must be at least 2 characters"
                      value={formData.name}
                      onChange={handleChange}
                      className={inputClass}
                    />
                    <input
                      type="email"
                      name="email"
                      placeholder="Email Address *"
                      required
                      pattern="[^\s@]+@[^\s@]+\.[^\s@]+"
                      title="Please enter a valid email address"
                      value={formData.email}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Contact Number *"
                      required
                      pattern="\+?[\d\s\-()]{7,20}"
                      title="Please enter a valid phone number (7-20 digits)"
                      value={formData.phone}
                      onChange={handleChange}
                      className={inputClass}
                    />
                    <input
                      type="text"
                      name="company"
                      placeholder="Company"
                      value={formData.company}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </div>

                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className={`${inputClass} appearance-none cursor-pointer`}
                  >
                    <option value="" className="text-gray-900">Select a Service *</option>
                    {subServices.map((s) => (
                      <option key={s.value} value={s.value} className="text-gray-900">
                        {s.label}
                      </option>
                    ))}
                  </select>

                  <div className="grid grid-cols-2 gap-4">
                    <select
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      className={`${inputClass} appearance-none cursor-pointer`}
                    >
                      <option value="" className="text-gray-900">Budget Range</option>
                      <option value="under-50k" className="text-gray-900">Under $50,000</option>
                      <option value="50k-100k" className="text-gray-900">$50,000 - $100,000</option>
                      <option value="100k-500k" className="text-gray-900">$100,000 - $500,000</option>
                      <option value="500k-plus" className="text-gray-900">$500,000+</option>
                    </select>
                    <select
                      name="timeline"
                      value={formData.timeline}
                      onChange={handleChange}
                      className={`${inputClass} appearance-none cursor-pointer`}
                    >
                      <option value="" className="text-gray-900">Timeline</option>
                      <option value="immediate" className="text-gray-900">Within 1 month</option>
                      <option value="1-3months" className="text-gray-900">1 - 3 months</option>
                      <option value="3-6months" className="text-gray-900">3 - 6 months</option>
                      <option value="6months-plus" className="text-gray-900">6+ months</option>
                    </select>
                  </div>

                  <textarea
                    name="message"
                    placeholder="Tell us about your project and requirements... *"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className={`${inputClass} resize-none`}
                  />
                </div>

                <div className="flex justify-end mt-6">
                  <button
                    type="submit"
                    disabled={!isValid()}
                    className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                      isValid()
                        ? 'bg-white text-[#0050a9] hover:bg-white/90'
                        : 'bg-white/30 text-white/50 cursor-not-allowed'
                    }`}
                  >
                    Submit Enquiry
                    <ChevronRight className="w-[18px] h-[18px]" />
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Right: Info panel */}
          <div>
            <div className="relative h-full min-h-[500px] rounded-3xl overflow-hidden">
              <img
                alt="Office"
                src="https://img.freepik.com/premium-photo/cozy-coworking-interior-with-work-desk-pc-computer-panoramic-window_780608-11014.jpg"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, #012f62 0%, #0055b4dd 50%, #0055b490 100%)' }} />
              <div className="absolute inset-0 flex flex-col justify-end p-8 lg:p-10">
                <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4">
                  Ready to get started with {serviceName}?
                </h2>
                <p className="text-gray-200 leading-relaxed mb-6">
                  Partner with JSAN to unlock your organization's full potential. Our experts are ready to discuss how we can help.
                </p>

                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-white text-sm">Business Enquiries</h4>
                      <a href="mailto:info@jsanconsulting.com" className="text-gray-300 text-sm hover:text-white transition-colors">
                        info@jsanconsulting.com
                      </a>
                    </div>
                    <button
                      onClick={handleCopyEmail}
                      className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-xl flex items-center justify-center transition-colors"
                      title="Copy email"
                    >
                      {copied ? <Check className="w-5 h-5 text-white" /> : <Clipboard className="w-5 h-5 text-white" />}
                    </button>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-white text-sm">Grow With Us ,Careers</h4>
                      <a href="mailto:info@jsanconsulting.com" className="text-gray-300 text-sm hover:text-white transition-colors">
                        info@jsanconsulting.com                      </a>
                    </div>
                    <button
                      onClick={handleCopyHrEmail}
                      className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-xl flex items-center justify-center transition-colors"
                      title="Copy email"
                    >
                      {copiedHr ? <Check className="w-5 h-5 text-white" /> : <Clipboard className="w-5 h-5 text-white" />}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
