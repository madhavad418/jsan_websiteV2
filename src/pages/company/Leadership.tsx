import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Linkedin } from 'lucide-react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import MobileNav from '../../components/MobileNav'
import SectionLabel from '../../components/SectionLabel'
import { leadership, initialsOf, type Leader } from '../../data/leadership'

/**
 * /company/leadership
 *
 * The nav has offered "Our Leadership" for a while and sent everyone to /company, which
 * is about the firm rather than the people running it. This is the page that link always
 * implied.
 *
 * The roster lives in src/data/leadership.ts. Its photographs are referenced ahead of
 * being supplied, so an avatar that cannot load falls back to the person's initials
 * rather than a broken image: the page is publishable before the photo shoot is.
 */

/**
 * One face, or the initials standing in for it.
 *
 * A missing file has to be caught at runtime rather than guessed at build time - the
 * roster names photographs that may not exist yet, and a broken image on a leadership
 * page is worse than no image at all.
 */
function Avatar({ person }: { person: Leader }) {
  const [failed, setFailed] = useState(false)
  const showPhoto = Boolean(person.photo) && !failed

  return (
    <div className="mx-auto mb-6 h-28 w-28 overflow-hidden rounded-full border border-gray-200 bg-[#eef3f9] lg:h-32 lg:w-32">
      {showPhoto ? (
        <img
          src={person.photo}
          alt=""
          aria-hidden="true"
          width={400}
          height={400}
          loading="lazy"
          onError={() => setFailed(true)}
          className="h-full w-full object-cover"
        />
      ) : (
        <span className="flex h-full w-full items-center justify-center text-[26px] font-bold text-[#0050a9]">
          {initialsOf(person.name)}
        </span>
      )}
    </div>
  )
}
export default function Leadership() {
  const hasRoster = leadership.length > 0

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero */}
      <section className="border-b border-gray-200 bg-white" style={{ marginTop: '44px' }}>
        <div className="mx-auto max-w-7xl px-6 pb-14 pt-28 lg:pb-20 lg:pt-36">
          <nav className="mb-6 flex items-center gap-2 text-sm text-gray-600">
            <Link
              to="/company"
              className="inline-flex min-h-[24px] items-center transition-colors hover:text-[#0050a9]"
            >
              Company
            </Link>
            <span aria-hidden="true">/</span>
            <span className="font-medium text-[#0050a9]">Our Leadership</span>
          </nav>

          <SectionLabel>Our Leadership</SectionLabel>
          <h1 className="t-display mb-6 max-w-3xl text-[#0a1a3a]">Meet our team</h1>
          <p className="t-body measure text-gray-600">
            Meet the leaders guiding JSAN&rsquo;s growth, delivery standards and employee success.
          </p>
        </div>
      </section>

      {/* The team */}
      <section className="section-y bg-white">
        <div className="mx-auto max-w-7xl px-6">
          {hasRoster ? (
            <ul className="grid grid-cols-2 gap-x-8 gap-y-14 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-10">
              {leadership.map((person) => (
                <li key={person.name} className="text-center">
                  <Avatar person={person} />

                  <h2 className="mb-1.5 text-[17px] font-bold text-[#0a1a3a]">{person.name}</h2>
                  <p className="text-[15px] font-medium text-[#0050a9]">{person.role}</p>

                  {person.focus && (
                    <>
                      <span
                        aria-hidden="true"
                        className="mx-auto mt-5 block h-px w-12 bg-gray-300"
                      />
                      <p className="mx-auto mt-5 max-w-[26ch] text-[14px] leading-relaxed text-gray-600">
                        {person.focus}
                      </p>
                    </>
                  )}

                  {person.linkedin && (
                    <a
                      href={person.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full text-gray-500 transition-colors hover:text-[#0050a9]"
                    >
                      <Linkedin className="h-[18px] w-[18px]" aria-hidden="true" />
                      <span className="sr-only">{person.name} on LinkedIn</span>
                    </a>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            /* Honest rather than decorated. Invented people on a leadership page are the
               one placeholder that can actually mislead somebody. */
            <div className="mx-auto max-w-2xl border-t border-gray-300 pt-10 text-center">
              <h2 className="t-sub mb-4 text-[#0a1a3a]">Profiles are being finalised</h2>
              <p className="t-body mb-8 text-gray-600">
                We are collecting photographs and approved titles for the leadership team and will
                publish them here shortly. In the meantime, the quickest route to the right person
                is to tell us what you are planning.
              </p>
              <Link
                to="/contact"
                className="group inline-flex min-h-[52px] items-center gap-2.5 rounded-lg px-8 font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5"
                style={{ background: 'linear-gradient(120deg, #012f62, #0055b4)' }}
              >
                Talk to our team
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Where to go next */}
      <section className="section-y-sm bg-[#f7f8fa]">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-20">
            <div>
              <span className="mb-3 inline-block t-label text-gray-500">About JSAN</span>
              <h2 className="mb-5 text-[24px] font-bold leading-tight text-[#0a1a3a] lg:text-[30px]">
                The firm behind the team
              </h2>
              <p className="mb-7 leading-relaxed text-gray-600">
                How JSAN is set up, where it operates and the delivery model its programmes run on.
              </p>
              <Link
                to="/company"
                className="group inline-flex min-h-[44px] items-center gap-2 font-semibold text-[#0050a9]"
              >
                Read about JSAN
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>

            <div>
              <span className="mb-3 inline-block t-label text-gray-500">Careers</span>
              <h2 className="mb-5 text-[24px] font-bold leading-tight text-[#0a1a3a] lg:text-[30px]">
                Work with this team
              </h2>
              <p className="mb-7 leading-relaxed text-gray-600">
                Field operations, geospatial production and engineering roles across our delivery
                regions.
              </p>
              <Link
                to="/careers"
                className="group inline-flex min-h-[44px] items-center gap-2 font-semibold text-[#0050a9]"
              >
                See open roles
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <MobileNav />
    </div>
  )
}
