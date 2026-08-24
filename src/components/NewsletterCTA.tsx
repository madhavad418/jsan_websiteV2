import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Mail, ArrowRight, Check, Loader2, Megaphone, Linkedin } from 'lucide-react'

type Status = 'idle' | 'sending' | 'done' | 'error'

const LINKEDIN_URL =
  'https://www.linkedin.com/company/jsan-consulting-group/posts/?feedView=all'

export default function NewsletterCTA() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<Status>('idle')

  const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isValid || status === 'sending') return
    setStatus('sending')
    try {
      const res = await fetch('https://formsubmit.co/ajax/info@jsanconsulting.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          _subject: 'Newsletter subscription',
          email,
          source: 'Website newsletter form',
        }),
      })
      setStatus(res.ok ? 'done' : 'error')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section
      className="relative overflow-hidden py-20 lg:py-24"
      style={{ background: 'linear-gradient(120deg, #012f62, #0055b4)' }}
    >
      {/* Depth */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.7) 1px, transparent 1px)',
          backgroundSize: '56px 56px',
        }}
      />
      <div
        className="pointer-events-none absolute -left-40 -top-40 h-[460px] w-[460px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(0,212,255,0.2), transparent 65%)' }}
      />
      <div
        className="pointer-events-none absolute -bottom-48 -right-32 h-[520px] w-[520px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(0,212,255,0.12), transparent 65%)' }}
      />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
          {/* Newsletter */}
          <div className="rounded-2xl border border-white/15 bg-white/[0.07] p-8 backdrop-blur-sm lg:col-span-7 lg:p-10">
            <span className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-[#00d4ff]/30 bg-[#00d4ff]/15">
              <Mail className="h-6 w-6 text-[#00d4ff]" />
            </span>

            <h2 className="mb-3 text-[28px] font-bold leading-tight text-white lg:text-[34px]">
              Subscribe to Our Newsletter
            </h2>
            <p className="mb-7 max-w-lg text-base leading-relaxed text-white/75">
              Company news, field insights and programme updates, delivered to your inbox. No noise.
            </p>

            {status === 'done' ? (
              <div className="flex items-center gap-4 rounded-xl border border-[#00d4ff]/40 bg-[#00d4ff]/10 p-5">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#00d4ff]">
                  <Check className="h-6 w-6 text-[#012f62]" />
                </span>
                <div>
                  <p className="font-semibold text-white">You're on the list</p>
                  <p className="text-sm text-white/70">
                    We'll send the next update to <span className="text-[#00d4ff]">{email}</span>.
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
                <div className="relative flex-1">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value)
                      if (status === 'error') setStatus('idle')
                    }}
                    placeholder="Enter your email address"
                    aria-label="Email address"
                    className="w-full rounded-xl border border-white/20 bg-white/10 px-5 py-3.5 text-white placeholder-white/50 outline-none backdrop-blur-sm transition-all duration-300 focus:border-[#00d4ff]/60 focus:bg-white/15 focus:ring-2 focus:ring-[#00d4ff]/30"
                  />
                  {email.length > 0 && isValid && (
                    <Check className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#00d4ff]" />
                  )}
                </div>

                <button
                  type="submit"
                  disabled={!isValid || status === 'sending'}
                  className="group inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-white px-7 py-3.5 font-semibold text-[#0050a9] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_30px_-10px_rgba(0,212,255,0.9)] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-none"
                >
                  {status === 'sending' ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Subscribing
                    </>
                  ) : (
                    <>
                      Subscribe
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </>
                  )}
                </button>
              </form>
            )}

            {status === 'error' && (
              <p className="mt-4 text-sm text-white/80">
                That didn't go through. Please email{' '}
                <a className="text-[#00d4ff] underline" href="mailto:info@jsanconsulting.com">
                  info@jsanconsulting.com
                </a>{' '}
                and we'll add you.
              </p>
            )}

            {status !== 'done' && (
              <p className="mt-4 text-xs text-white/50">
                By subscribing you agree to our{' '}
                <Link to="/privacy-policy" className="underline hover:text-white/80">
                  Privacy Policy
                </Link>
                . Unsubscribe any time.
              </p>
            )}
          </div>

          {/* Media relations */}
          <div className="flex flex-col gap-5 lg:col-span-5">
            <div className="group flex-1 rounded-2xl border border-white/15 bg-white/[0.07] p-8 backdrop-blur-sm transition-all duration-500 hover:border-[#00d4ff]/40 hover:bg-white/[0.1]">
              <span className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-white/15 bg-white/10 transition-all duration-300 group-hover:scale-110 group-hover:border-[#00d4ff]/40 group-hover:bg-[#00d4ff]/15">
                <Megaphone className="h-6 w-6 text-[#00d4ff]" />
              </span>
              <h3 className="mb-2 text-xl font-bold text-white">Have a story to share?</h3>
              <p className="mb-6 text-sm leading-relaxed text-white/70">
                Media enquiries, press releases and partnership announcements.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-[#0050a9] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_26px_-10px_rgba(0,212,255,0.9)]"
              >
                Contact Media Relations
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>

            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between gap-4 rounded-2xl border border-white/15 bg-white/[0.07] p-6 backdrop-blur-sm transition-all duration-500 hover:border-[#00d4ff]/40 hover:bg-white/[0.1]"
            >
              <span className="flex items-center gap-4">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 bg-white/10 transition-transform duration-300 group-hover:scale-110">
                  <Linkedin className="h-5 w-5 text-[#00d4ff]" />
                </span>
                <span>
                  <span className="block font-semibold text-white">Follow us on LinkedIn</span>
                  <span className="block text-sm text-white/60">Daily updates from the field</span>
                </span>
              </span>
              <ArrowRight className="h-5 w-5 shrink-0 text-[#00d4ff] transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
