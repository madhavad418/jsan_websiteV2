import { useState, useRef } from 'react'
import { Mail, Clipboard, Check, ChevronLeft, ChevronRight, Briefcase, GraduationCap, Upload, X, Users } from 'lucide-react'

export default function Contact() {
  const [currentStep, setCurrentStep] = useState(1)
  const [copied, setCopied] = useState(false)
  const [copiedHr, setCopiedHr] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    enquiryType: '' as '' | 'business' | 'careers',
    service: '',
    budget: '',
    timeline: '',
    position: '',
    experience: '',
    resume: null as File | null,
    message: '',
  })

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setFormData(prev => ({ ...prev, resume: file }))
  }

  const removeFile = () => {
    setFormData(prev => ({ ...prev, resume: null }))
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const isStepValid = () => {
    if (currentStep === 1) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      const phoneRegex = /^\+?[\d\s\-()]{7,20}$/
      return (
        formData.name.trim().length >= 2 &&
        emailRegex.test(formData.email.trim()) &&
        phoneRegex.test(formData.phone.trim())
      )
    }
    if (currentStep === 2) return formData.enquiryType !== ''
    if (currentStep === 3) {
      if (formData.enquiryType === 'business') {
        return formData.service !== '' && formData.message.trim().length >= 10
      }
      if (formData.enquiryType === 'careers') {
        return formData.position.trim() !== '' && formData.message.trim().length >= 10
      }
    }
    return false
  }

  const handleNext = () => {
    if (currentStep < 3 && isStepValid()) setCurrentStep(prev => prev + 1)
  }

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(prev => prev - 1)
  }

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('info@jsanconsulting.com')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleCopyHrEmail = () => {
    navigator.clipboard.writeText('hr@jsanconsulting.com')
    setCopiedHr(true)
    setTimeout(() => setCopiedHr(false), 2000)
  }

  const inputClass =
    'w-full py-3 px-4 bg-white/10 border border-white/20 rounded-xl placeholder-gray-400 text-white focus:outline-none focus:border-white/40 transition-colors'

  return (
    <section id="contact" className="py-5 lg:py-14 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <h2 className="text-[36px] lg:text-[42px] font-bold mb-4 text-gradient">
            Get in Touch
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left: Form Card */}
          <div>
            <div className="rounded-3xl p-8 lg:p-10 h-full" style={{ background: 'linear-gradient(120deg, #012f62, #0055b4)' }}>
              {/* Step Indicators */}
              <div className="flex items-center justify-center mb-8">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${currentStep >= 1 ? 'bg-white text-[#0050a9]' : 'bg-white/20 text-white'}`}>1</div>
                <div className={`w-12 h-1 mx-2 transition-all duration-300 ${currentStep >= 2 ? 'bg-white/60' : 'bg-white/20'}`} />
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${currentStep >= 2 ? 'bg-white text-[#0050a9]' : 'bg-white/20 text-white'}`}>2</div>
                <div className={`w-12 h-1 mx-2 transition-all duration-300 ${currentStep >= 3 ? 'bg-white/60' : 'bg-white/20'}`} />
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${currentStep >= 3 ? 'bg-white text-[#0050a9]' : 'bg-white/20 text-white'}`}>3</div>
              </div>

              <form
                ref={formRef}
                action="https://formsubmit.co/info@jsanconsulting.com"
                method="POST"
                encType="multipart/form-data"
              >
                <input type="hidden" name="_subject" value="New Enquiry from JSAN Website" />
                <input type="hidden" name="_captcha" value="false" />
                <input type="hidden" name="_template" value="table" />
                <input type="hidden" name="_cc" value="hr@jsanconsulting.com" />

                {/* Always render hidden inputs for all data so FormSubmit receives everything on submit */}
                <input type="hidden" name="name" value={formData.name} />
                <input type="hidden" name="email" value={formData.email} />
                <input type="hidden" name="phone" value={formData.phone} />
                <input type="hidden" name="company" value={formData.company} />
                <input type="hidden" name="enquiry_type" value={formData.enquiryType} />
                {formData.enquiryType === 'business' && (
                  <>
                    <input type="hidden" name="service" value={formData.service} />
                    <input type="hidden" name="budget" value={formData.budget} />
                    <input type="hidden" name="timeline" value={formData.timeline} />
                  </>
                )}
                {formData.enquiryType === 'careers' && (
                  <>
                    <input type="hidden" name="position" value={formData.position} />
                    <input type="hidden" name="experience" value={formData.experience} />
                  </>
                )}
                <input type="hidden" name="message" value={formData.message} />

                <div className="min-h-[280px]">
                  {/* Step 1: Personal Info */}
                  {currentStep === 1 && (
                    <div className="flex flex-col gap-4">
                      <h3 className="text-xl font-semibold text-white mb-2">Tell us about yourself</h3>
                      <input
                        type="text"
                        placeholder="Your Name *"
                        required
                        value={formData.name}
                        onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        pattern=".{2,}"
                        title="Name must be at least 2 characters"
                        className={inputClass}
                      />
                      <input
                        type="email"
                        placeholder="Email Address *"
                        required
                        value={formData.email}
                        onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        pattern="[^\s@]+@[^\s@]+\.[^\s@]+"
                        title="Please enter a valid email address"
                        className={inputClass}
                      />
                      <input
                        type="tel"
                        placeholder="Contact Number *"
                        required
                        value={formData.phone}
                        onChange={e => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                        pattern="\+?[\d\s\-()]{7,20}"
                        title="Please enter a valid phone number (7-20 digits)"
                        className={inputClass}
                      />
                      <input
                        type="text"
                        placeholder="Company"
                        value={formData.company}
                        onChange={e => setFormData(prev => ({ ...prev, company: e.target.value }))}
                        className={inputClass}
                      />
                    </div>
                  )}

                  {/* Step 2: Enquiry Type */}
                  {currentStep === 2 && (
                    <div className="flex flex-col gap-4">
                      <h3 className="text-xl font-semibold text-white mb-2">How can we help you?</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <button
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, enquiryType: 'business' }))}
                          className={`flex flex-col items-center gap-3 p-6 rounded-2xl border-2 transition-all duration-300 cursor-pointer ${formData.enquiryType === 'business'
                            ? 'bg-white/20 border-white/60 shadow-lg shadow-white/10'
                            : 'bg-white/5 border-white/20 hover:bg-white/10 hover:border-white/30'
                          }`}
                        >
                          <div className={`w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-300 ${formData.enquiryType === 'business' ? 'bg-white text-[#0050a9]' : 'bg-white/15 text-white'}`}>
                            <Briefcase className="w-7 h-7" />
                          </div>
                          <span className="text-white font-semibold text-sm">Business Enquiry</span>
                          <span className="text-gray-400 text-xs text-center leading-relaxed">
                            Explore our services and solutions
                          </span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, enquiryType: 'careers' }))}
                          className={`flex flex-col items-center gap-3 p-6 rounded-2xl border-2 transition-all duration-300 cursor-pointer ${formData.enquiryType === 'careers'
                            ? 'bg-white/20 border-white/60 shadow-lg shadow-white/10'
                            : 'bg-white/5 border-white/20 hover:bg-white/10 hover:border-white/30'
                          }`}
                        >
                          <div className={`w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-300 ${formData.enquiryType === 'careers' ? 'bg-white text-[#0050a9]' : 'bg-white/15 text-white'}`}>
                            <GraduationCap className="w-7 h-7" />
                          </div>
                          <span className="text-white font-semibold text-sm">Careers</span>
                          <span className="text-gray-400 text-xs text-center leading-relaxed">
                            Join our team and grow with us
                          </span>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Step 3: Business */}
                  {currentStep === 3 && formData.enquiryType === 'business' && (
                    <div className="flex flex-col gap-4">
                      <h3 className="text-xl font-semibold text-white mb-2">Project Details</h3>
                      <select
                        value={formData.service}
                        onChange={e => setFormData(prev => ({ ...prev, service: e.target.value }))}
                        className={`${inputClass} appearance-none cursor-pointer`}
                      >
                        <option value="" className="text-gray-900">Select a Service *</option>
                        <option value="location-intelligence" className="text-gray-900">Location Intelligence</option>
                        <option value="technology-consultancy" className="text-gray-900">Technology Consultancy</option>
                        <option value="staffing-solutions" className="text-gray-900">Staffing Solutions</option>
                        <option value="program-management" className="text-gray-900">Program Management</option>
                      </select>
                      <div className="grid grid-cols-2 gap-4">
                        <select
                          value={formData.budget}
                          onChange={e => setFormData(prev => ({ ...prev, budget: e.target.value }))}
                          className={`${inputClass} appearance-none cursor-pointer`}
                        >
                          <option value="" className="text-gray-900">Budget Range</option>
                          <option value="under-50k" className="text-gray-900">Under $50,000</option>
                          <option value="50k-100k" className="text-gray-900">$50,000 - $100,000</option>
                          <option value="100k-500k" className="text-gray-900">$100,000 - $500,000</option>
                          <option value="500k-plus" className="text-gray-900">$500,000+</option>
                        </select>
                        <select
                          value={formData.timeline}
                          onChange={e => setFormData(prev => ({ ...prev, timeline: e.target.value }))}
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
                        placeholder="Tell us about your project and requirements... *"
                        rows={4}
                        value={formData.message}
                        onChange={e => setFormData(prev => ({ ...prev, message: e.target.value }))}
                        className={`${inputClass} resize-none`}
                      />
                    </div>
                  )}

                  {/* Step 3: Careers */}
                  {currentStep === 3 && formData.enquiryType === 'careers' && (
                    <div className="flex flex-col gap-4">
                      <h3 className="text-xl font-semibold text-white mb-2">Career Application</h3>
                      <input
                        type="text"
                        placeholder="Position Applying For *"
                        value={formData.position}
                        onChange={e => setFormData(prev => ({ ...prev, position: e.target.value }))}
                        className={inputClass}
                      />
                      <select
                        value={formData.experience}
                        onChange={e => setFormData(prev => ({ ...prev, experience: e.target.value }))}
                        className={`${inputClass} appearance-none cursor-pointer`}
                      >
                        <option value="" className="text-gray-900">Years of Experience</option>
                        <option value="0-1" className="text-gray-900">0 - 1 years</option>
                        <option value="1-3" className="text-gray-900">1 - 3 years</option>
                        <option value="3-5" className="text-gray-900">3 - 5 years</option>
                        <option value="5-10" className="text-gray-900">5 - 10 years</option>
                        <option value="10+" className="text-gray-900">10+ years</option>
                      </select>

                      {/* Resume Upload */}
                      <div>
                        <input
                          ref={fileInputRef}
                          type="file"
                          name="attachment"
                          accept=".pdf,.doc,.docx"
                          onChange={handleFileChange}
                          className="hidden"
                          id="resume-upload"
                        />
                        {!formData.resume ? (
                          <label
                            htmlFor="resume-upload"
                            className="flex items-center gap-3 w-full py-3 px-4 bg-white/10 border border-dashed border-white/30 rounded-xl text-gray-400 hover:bg-white/15 hover:border-white/40 transition-colors cursor-pointer"
                          >
                            <Upload className="w-5 h-5 flex-shrink-0" />
                            <span>Upload Resume / CV (PDF, DOC)</span>
                          </label>
                        ) : (
                          <div className="flex items-center gap-3 w-full py-3 px-4 bg-white/15 border border-white/30 rounded-xl text-white">
                            <Upload className="w-5 h-5 flex-shrink-0 text-green-400" />
                            <span className="flex-1 truncate text-sm">{formData.resume.name}</span>
                            <button
                              type="button"
                              onClick={removeFile}
                              className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors"
                            >
                              <X className="w-4 h-4 text-gray-400" />
                            </button>
                          </div>
                        )}
                      </div>

                      <textarea
                        placeholder="Brief message about yourself and why you're interested... *"
                        rows={3}
                        value={formData.message}
                        onChange={e => setFormData(prev => ({ ...prev, message: e.target.value }))}
                        className={`${inputClass} resize-none`}
                      />
                    </div>
                  )}
                </div>

                {/* Navigation */}
                <div className="flex justify-between mt-6">
                  <button
                    type="button"
                    onClick={handleBack}
                    className={`flex items-center gap-2 px-5 py-2 rounded-full font-medium text-white transition-all duration-300 ${currentStep === 1 ? 'opacity-0 pointer-events-none' : 'hover:bg-white/10'}`}
                  >
                    <ChevronLeft className="w-[18px] h-[18px]" />
                    Back
                  </button>

                  {currentStep < 3 ? (
                    <button
                      type="button"
                      onClick={handleNext}
                      disabled={!isStepValid()}
                      className={`flex items-center gap-2 px-5 py-2 rounded-full font-medium transition-all duration-300 ${isStepValid()
                        ? 'bg-white text-[#0050a9] hover:bg-white/90'
                        : 'bg-white/30 text-white/50 cursor-not-allowed'
                      }`}
                    >
                      Next
                      <ChevronRight className="w-[18px] h-[18px]" />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={!isStepValid()}
                      className={`flex items-center gap-2 px-5 py-2 rounded-full font-medium transition-all duration-300 ${isStepValid()
                        ? 'bg-white text-[#0050a9] hover:bg-white/90'
                        : 'bg-white/30 text-white/50 cursor-not-allowed'
                      }`}
                    >
                      Submit
                      <ChevronRight className="w-[18px] h-[18px]" />
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>

          {/* Right: Office Image Card */}
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
                  Ready to Modernise Your Operations?
                </h2>
                <p className="text-gray-200 leading-relaxed mb-6">
                  Partner with JSAN to unlock your organization's full potential. Let's discuss how we can help you achieve your digital transformation goals.
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
                      <h4 className="font-semibold text-white text-sm">Grow With Us, Careers</h4>
                      <a href="mailto:hr@jsanconsulting.com" className="text-gray-300 text-sm hover:text-white transition-colors">
                        hr@jsanconsulting.com
                      </a>
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
