import { useState, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import { MapPin, Clock, Building, ArrowLeft, CheckCircle, Upload, FileText, X } from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import MobileNav from '../components/MobileNav'

import { jobsData } from '../data/jobs'
import { useJobs } from '../lib/useContent'

const hearAboutOptions = [
  'Select an option',
  'LinkedIn',
  'Job Board (Indeed, Glassdoor, etc.)',
  'Company Website',
  'Employee Referral',
  'Social Media',
  'Career Fair',
  'Recruiter',
  'Other',
]

interface FormData {
  fullName: string
  email: string
  phone: string
  linkedIn: string
  coverLetter: string
  portfolioUrl: string
  hearAbout: string
}

interface FormErrors {
  fullName?: string
  email?: string
  phone?: string
  resume?: string
  hearAbout?: string
}

export default function CareerDetail() {
  const { jobId } = useParams<{ jobId: string }>()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    linkedIn: '',
    coverLetter: '',
    portfolioUrl: '',
    hearAbout: 'Select an option',
  })

  const [resumeFile, setResumeFile] = useState<File | null>(null)
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const jobs = useJobs()
  const job = jobId ? (jobs.find(j => j.id === jobId) || jobsData[jobId] || null) : null

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required'
    } else if (!/^[\d\s\-\+\(\)]+$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number'
    }

    if (!resumeFile) {
      newErrors.resume = 'Resume/CV is required'
    }

    if (formData.hearAbout === 'Select an option') {
      newErrors.hearAbout = 'Please select how you heard about us'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }))
    }
  }

  const allowedResumeMimes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'image/jpeg',
    'image/jpg',
  ]
  const allowedResumeExtensions = ['.pdf', '.doc', '.docx', '.jpg', '.jpeg']
  const maxResumeBytes = 5 * 1024 * 1024 // 5 MB

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const name = file.name.toLowerCase()
    const extOk = allowedResumeExtensions.some(ext => name.endsWith(ext))
    const mimeOk = !file.type || allowedResumeMimes.includes(file.type)

    if (!extOk || !mimeOk) {
      setErrors(prev => ({ ...prev, resume: 'Unsupported file type. Please upload PDF, DOC, DOCX, or JPG.' }))
      setResumeFile(null)
      if (fileInputRef.current) fileInputRef.current.value = ''
      return
    }

    if (file.size > maxResumeBytes) {
      setErrors(prev => ({ ...prev, resume: 'File is too large. Max 5 MB.' }))
      setResumeFile(null)
      if (fileInputRef.current) fileInputRef.current.value = ''
      return
    }

    setResumeFile(file)
    if (errors.resume) {
      setErrors(prev => ({ ...prev, resume: undefined }))
    }
  }

  const handleRemoveFile = () => {
    setResumeFile(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      const submission = new FormData()
      submission.append('Full Name', formData.fullName)
      submission.append('Email', formData.email)
      submission.append('Phone', formData.phone)
      submission.append('LinkedIn', formData.linkedIn)
      submission.append('Cover Letter', formData.coverLetter)
      submission.append('Portfolio URL', formData.portfolioUrl)
      submission.append('Heard About Us', formData.hearAbout)
      submission.append('Position', job?.title ?? '')
      if (resumeFile) {
        submission.append('Resume', resumeFile, resumeFile.name)
      }
      submission.append('_subject', `New Career Application â€” ${job?.title ?? 'JSAN'}`)
      submission.append('_captcha', 'false')
      submission.append('_template', 'table')
      submission.append('_cc', 'hr@jsanconsulting.com')

      await fetch('https://formsubmit.co/hr@jsanconsulting.com', {
        method: 'POST',
        body: submission,
        mode: 'no-cors',
      })

      setSubmitSuccess(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="pt-32 pb-20" style={{ marginTop: '44px' }}>
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h1 className="text-[32px] font-bold text-[#0050a9] mb-4">Job Not Found</h1>
            <p className="text-gray-600 mb-8">Sorry, we couldn't find the job listing you're looking for.</p>
            <Link
              to="/careers"
              className="inline-flex items-center gap-2 bg-[#0050a9] text-white px-6 py-3 rounded font-semibold hover:bg-[#153a62] transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Careers
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  if (submitSuccess) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="pt-32 pb-20" style={{ marginTop: '44px' }}>
          <div className="max-w-2xl mx-auto px-6 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="text-[32px] font-bold text-[#0050a9] mb-4">Application Submitted!</h1>
            <p className="text-gray-600 text-lg mb-8">
              Thank you for applying for the <strong>{job.title}</strong> position. We've received your application and our talent team will review it shortly. You'll hear from us within 5-7 business days.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/careers"
                className="inline-flex items-center justify-center gap-2 bg-[#0050a9] text-white px-6 py-3 rounded font-semibold hover:bg-[#153a62] transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                Back to Careers
              </Link>
              <Link
                to="/"
                className="inline-flex items-center justify-center gap-2 border-2 border-[#0050a9] text-[#0050a9] px-6 py-3 rounded font-semibold hover:bg-[#0050a9] hover:text-white transition-colors"
              >
                Go to Homepage
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-28 pb-16 overflow-hidden" style={{ marginTop: '44px' }}>
        <div className="absolute inset-0 bg-gradient-to-br from-[#0050a9] via-[#0a1a3a] to-[#0050a9]" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <Link
            to="/careers"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to all positions
          </Link>

          <div className="flex flex-wrap items-center gap-3 mb-4">
            <h1 className="text-white text-[36px] lg:text-[48px] font-bold leading-tight">
              {job.title}
            </h1>
            <span className="bg-white/20 text-white px-4 py-1 text-sm font-medium rounded">
              {job.level}
            </span>
            <span className={`px-4 py-1 text-sm font-medium rounded ${
              job.type === 'Full-time' ? 'bg-green-500/30 text-green-100' :
              job.type === 'Contract' ? 'bg-orange-500/30 text-orange-100' :
              'bg-blue-500/30 text-blue-100'
            }`}>
              {job.type}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-white/80">
            <span className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              {job.location}
            </span>
            <span className="flex items-center gap-2">
              <Building className="w-5 h-5" />
              {job.department}
            </span>
            <span className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Posted {job.posted}
            </span>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Job Details */}
            <div className="lg:col-span-2 space-y-10">
              {/* Description */}
              <div>
                <h2 className="text-[24px] font-bold text-[#0050a9] mb-4">About This Role</h2>
                <p className="text-gray-700 text-lg leading-relaxed">{job.fullDescription}</p>
              </div>

              {/* Requirements */}
              <div>
                <h2 className="text-[24px] font-bold text-[#0050a9] mb-4">Requirements</h2>
                <ul className="space-y-3">
                  {job.requirements.map((req, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-[#0050a9] mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Qualifications */}
              <div>
                <h2 className="text-[24px] font-bold text-[#0050a9] mb-4">Qualifications</h2>
                <ul className="space-y-3">
                  {job.qualifications.map((qual, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-[#0050a9] mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{qual}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Benefits */}
              <div>
                <h2 className="text-[24px] font-bold text-[#0050a9] mb-4">What We Offer</h2>
                <ul className="grid md:grid-cols-2 gap-3">
                  {job.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Application Form */}
            <div className="lg:col-span-1">
              <div className="bg-[#f8fafc] p-8 rounded-lg sticky top-32">
                {job.filled ? (
                  <div className="text-center py-6">
                    <div className="w-14 h-14 bg-[#e8f4fc] rounded-full flex items-center justify-center mx-auto mb-4">
                      <Building className="w-7 h-7 text-[#0050a9]" />
                    </div>
                    <h2 className="text-[24px] font-bold text-[#0050a9] mb-3">Applications Closed</h2>
                    <p className="text-gray-600 leading-relaxed">
                      This position is currently not accepting applications.
                    </p>
                    <Link
                      to="/careers"
                      className="inline-flex items-center justify-center gap-2 mt-6 border-2 border-[#0050a9] text-[#0050a9] px-5 py-2.5 rounded font-semibold hover:bg-[#0050a9] hover:text-white transition-colors"
                    >
                      <ArrowLeft className="w-5 h-5" />
                      View other openings
                    </Link>
                  </div>
                ) : (
                <>
                <h2 className="text-[24px] font-bold text-[#0050a9] mb-6">Apply Now</h2>

                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Full Name */}
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      required
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded focus:outline-none focus:ring-2 focus:ring-[#0050a9] focus:border-transparent ${
                        errors.fullName ? 'border-red-500' : 'border-gray-200'
                      }`}
                      placeholder="John Doe"
                    />
                    {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded focus:outline-none focus:ring-2 focus:ring-[#0050a9] focus:border-transparent ${
                        errors.email ? 'border-red-500' : 'border-gray-200'
                      }`}
                      placeholder="john@example.com"
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                  </div>

                  {/* Phone */}
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded focus:outline-none focus:ring-2 focus:ring-[#0050a9] focus:border-transparent ${
                        errors.phone ? 'border-red-500' : 'border-gray-200'
                      }`}
                      placeholder="+1 (555) 123-4567"
                    />
                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                  </div>

                  {/* LinkedIn URL */}
                  <div>
                    <label htmlFor="linkedIn" className="block text-sm font-medium text-gray-700 mb-1">
                      LinkedIn URL <span className="text-gray-400">(optional)</span>
                    </label>
                    <input
                      type="url"
                      id="linkedIn"
                      name="linkedIn"
                      value={formData.linkedIn}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-[#0050a9] focus:border-transparent"
                      placeholder="https://linkedin.com/in/johndoe"
                    />
                  </div>

                  {/* Resume Upload */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Resume/CV <span className="text-red-500">*</span>
                    </label>
                    <div
                      className={`border-2 border-dashed rounded p-4 text-center cursor-pointer hover:border-[#0050a9] transition-colors ${
                        errors.resume ? 'border-red-500' : 'border-gray-300'
                      } ${resumeFile ? 'border-[#0050a9] bg-[#e8f4fc]' : ''}`}
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept=".pdf,.doc,.docx,.jpg,.jpeg,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,image/jpeg"
                        className="hidden"
                      />
                      {resumeFile ? (
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <FileText className="w-5 h-5 text-[#0050a9]" />
                            <span className="text-[#0050a9] font-medium truncate max-w-[150px]">
                              {resumeFile.name}
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleRemoveFile()
                            }}
                            className="text-gray-500 hover:text-red-500 transition-colors"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </div>
                      ) : (
                        <>
                          <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                          <p className="text-sm text-gray-600">
                            Click to upload or drag and drop
                          </p>
                          <p className="text-xs text-gray-400 mt-1">
                            PDF, DOC, DOCX, JPG (Max 5MB)
                          </p>
                        </>
                      )}
                    </div>
                    {errors.resume && <p className="text-red-500 text-sm mt-1">{errors.resume}</p>}
                  </div>

                  {/* Cover Letter */}
                  <div>
                    <label htmlFor="coverLetter" className="block text-sm font-medium text-gray-700 mb-1">
                      Cover Letter
                    </label>
                    <textarea
                      id="coverLetter"
                      name="coverLetter"
                      value={formData.coverLetter}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-[#0050a9] focus:border-transparent resize-none"
                      placeholder="Tell us why you're interested in this role..."
                    />
                  </div>

                  {/* Portfolio URL */}
                  <div>
                    <label htmlFor="portfolioUrl" className="block text-sm font-medium text-gray-700 mb-1">
                      Portfolio URL <span className="text-gray-400">(optional)</span>
                    </label>
                    <input
                      type="url"
                      id="portfolioUrl"
                      name="portfolioUrl"
                      value={formData.portfolioUrl}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-[#0050a9] focus:border-transparent"
                      placeholder="https://yourportfolio.com"
                    />
                  </div>

                  {/* How did you hear about us */}
                  <div>
                    <label htmlFor="hearAbout" className="block text-sm font-medium text-gray-700 mb-1">
                      How did you hear about us? <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="hearAbout"
                      name="hearAbout"
                      value={formData.hearAbout}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-[#0050a9] focus:border-transparent ${
                        errors.hearAbout ? 'border-red-500' : 'border-gray-200'
                      }`}
                    >
                      {hearAboutOptions.map(option => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                    {errors.hearAbout && <p className="text-red-500 text-sm mt-1">{errors.hearAbout}</p>}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-4 rounded font-semibold transition-colors ${
                      isSubmitting
                        ? 'bg-gray-400 text-white cursor-not-allowed'
                        : 'bg-[#0050a9] text-white hover:bg-[#153a62]'
                    }`}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Submitting...
                      </span>
                    ) : (
                      'Submit Application'
                    )}
                  </button>

                  <p className="text-xs text-gray-500 text-center">
                    By submitting this application, you agree to our{' '}
                    <a href="/privacy-policy" className="text-[#0050a9] hover:underline">Privacy Policy</a>.
                  </p>
                </form>
                </>
                )}
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

