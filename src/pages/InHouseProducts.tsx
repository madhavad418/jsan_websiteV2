import { Link } from 'react-router-dom'
import { ArrowRight, Boxes, CheckCircle } from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import MobileNav from '../components/MobileNav'
import HeroBackdrop, { heroCopyColumn } from '../components/HeroBackdrop'
import { inHouseProducts } from '../data/inHouseProducts'

/**
 * /products  the systems JSAN built and runs itself.
 *
 * Sits under Capabilities > In-House alongside /work, which carries the client case
 * studies. The two used to hang off a separate top-level "Work" item, and this page was
 * briefly at /projects  a label that collided with the case studies, which are projects
 * too. /projects now redirects here.
 *
 * This took over /products from an older index page, which is still in the tree at
 * pages/Products.tsx but is no longer routed. Every product keeps a detail page under
 * /products/<slug> and those routes still resolve, but nothing here links to them: the
 * only route onward is a conversation. So each row has to carry enough on its own  hence
 * a paragraph rather than a teaser  and the single call to action goes to /contact.
 */
export default function InHouseProducts() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <section
        className="relative flex min-h-[480px] items-center overflow-hidden bg-[#03142d] pb-12 pt-24 sm:min-h-[540px] sm:pb-16 sm:pt-28 lg:min-h-[620px] lg:pb-20 lg:pt-32"
        style={{ marginTop: '44px' }}
      >
        <HeroBackdrop
          image="/pillars/atlas_hero.webp"
          imageAlt="JSAN in-house platforms running live field operations"
          position="50% 45%"
        />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-6">
          <div className={heroCopyColumn()}>
            <nav className="mb-4 flex items-center gap-2 text-sm text-white/60">
              <Link to="/capabilities" className="transition-colors hover:text-white">
                Capabilities
              </Link>
              <span>/</span>
              <span className="font-medium text-white">Products</span>
            </nav>

            <span className="mb-5 inline-flex items-center gap-2 t-label text-[#00d4ff]">
              <Boxes className="h-4 w-4 text-[#00d4ff]" aria-hidden="true" />
              In-House
            </span>

            <h1 className="mb-4 text-[26px] font-bold leading-[1.12] text-white sm:text-[30px] sm:leading-[1.08] lg:text-[48px]">
              Systems we built, and run ourselves
            </h1>
            <p className="mb-5 text-[17px] font-semibold leading-snug text-[#7cc6ff] sm:mb-6 sm:text-[20px] lg:text-[28px]">
              The tooling our own delivery depends on.
            </p>
            <p className="mb-7 max-w-lg text-[15px] leading-relaxed text-white/75 sm:mb-8 sm:text-lg">
              Each of these exists because the operation needed something the market did not
              sell. They run live on JSAN programmes before they are ever offered to anyone
              else.
            </p>

            <Link
              to="/contact"
              className="group inline-flex items-center gap-2.5 rounded-lg bg-white px-5 py-3 text-[15px] font-semibold sm:px-7 sm:py-3.5 sm:text-base text-[#0050a9] shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-100"
            >
              Talk to Our Team
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* One row per project, alternating, so each brief gets room to be read */}
      <section className="section-y bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="space-y-16 lg:space-y-24">
            {inHouseProducts.map((product, i) => (
              <article
                key={product.name}
                className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14"
              >
                <div className={i % 2 === 1 ? 'lg:order-2' : undefined}>
                  <div className="overflow-hidden rounded-2xl bg-gray-100 shadow-xl">
                    <img
                      src={product.image}
                      alt={product.imageAlt}
                      className="h-[260px] w-full object-cover sm:h-[320px] lg:h-[380px]"
                      loading={i === 0 ? 'eager' : 'lazy'}
                    />
                  </div>
                </div>

                <div className={i % 2 === 1 ? 'lg:order-1' : undefined}>
                  <span className="t-label text-[#0050a9]">{product.category}</span>
                  <h2 className="mb-4 mt-3 text-[28px] font-bold leading-tight text-[#0a1a3a] lg:text-[36px]">
                    {product.name}
                  </h2>
                  <p className="mb-6 text-lg leading-relaxed text-gray-600">{product.brief}</p>

                  <ul className="mb-8 grid gap-2.5 sm:grid-cols-2">
                    {product.highlights.map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-[#0050a9]" aria-hidden="true" />
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    to="/contact"
                    className="group inline-flex items-center gap-2.5 rounded-lg px-7 py-3.5 font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_34px_-14px_rgba(0,80,169,0.9)]"
                    style={{ background: 'linear-gradient(120deg, #012f62, #0055b4)' }}
                  >
                    Know More or Request a Demo
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20" style={{ background: 'linear-gradient(120deg, #012f62, #0055b4)' }}>
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="mb-4 text-[28px] font-bold leading-tight text-white lg:text-[38px]">
            Want to see any of these running?
          </h2>
          <p className="mb-8 text-lg leading-relaxed text-white/75">
            We will walk you through the live system on a call, against your own operation
            rather than a scripted demo dataset.
          </p>
          <Link
            to="/contact"
            className="group inline-flex items-center gap-2.5 rounded-lg bg-white px-5 py-3 text-[15px] font-semibold sm:px-7 sm:py-3.5 sm:text-base text-[#0050a9] shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-100"
          >
            Request a Demo
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </section>

      <Footer />
      <MobileNav />
    </div>
  )
}
