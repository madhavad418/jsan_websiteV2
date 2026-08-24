import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

/**
 * SECTION 14  FINAL CTA
 *
 * Road imagery sits far back behind a heavy scrim and drifts very slowly, so it reads as
 * texture rather than as a moving background competing with the copy. The motion is
 * disabled under prefers-reduced-motion via the CSS media query on the utility class.
 */
export default function FinalCTA() {
  return (
    <section className="relative overflow-hidden py-24 lg:py-32">
      <div className="absolute inset-0">
        <img
          src="/pillars/navigation-data.jpg"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full scale-110 object-cover motion-safe:animate-[float_18s_ease-in-out_infinite]"
          loading="lazy"
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(120deg, rgba(5,19,43,0.96) 0%, rgba(10,35,80,0.92) 50%, rgba(0,80,169,0.85) 100%)' }}
        />
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,.85) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.85) 1px, transparent 1px)',
            backgroundSize: '46px 46px',
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <h2 className="mb-6 text-[28px] font-bold leading-[1.12] tracking-tight text-white lg:text-[44px]">
          Planning a complex geospatial or field operations program?
        </h2>
        <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-white/75">
          Bring us the operating challenge. We&rsquo;ll help define the mobilisation, delivery, technology and
          governance model required to execute it at scale.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/contact"
            className="group inline-flex items-center gap-2.5 rounded-lg bg-white px-8 py-4 font-semibold text-[#0050a9] shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_40px_-16px_rgba(0,212,255,0.9)]"
          >
            Discuss Your Program
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
          <Link
            to="/services"
            className="group inline-flex items-center gap-2 rounded-lg border-2 border-white/30 px-8 py-4 font-semibold text-white transition-all duration-300 hover:border-white/70 hover:bg-white/10"
          >
            View Capabilities
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  )
}
