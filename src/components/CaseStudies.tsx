import { Play } from 'lucide-react'
import { Link } from 'react-router-dom'

const caseStudies = [
  {
    industry: 'ENERGY',
    title: 'Utility company transforms grid management',
    image: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=600&auto=format&fit=crop',
  },
  {
    industry: 'HEALTHCARE',
    title: 'Healthcare network elevates patient experience',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&auto=format&fit=crop',
  },
  {
    industry: 'GOVERNMENT',
    title: 'City government enhances service delivery',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&auto=format&fit=crop',
  },
  {
    industry: 'CASE STUDIES',
    title: 'Discover more about our work',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&auto=format&fit=crop',
  },
]

export default function CaseStudies() {
  return (
    <>
      {/* Featured Banner */}
      <section className="featured-banner relative">
        <img
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&auto=format&fit=crop"
          alt="City skyline"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#cc3366]/30 to-transparent" />
        <div className="content-box">
          <h3 className="text-[#00d4ff]">Engineering GIS for Impact</h3>
          <p className="text-white">
            We've engineered an enterprise-grade solution for GISso you can turn spatial data's power into lasting impact.
          </p>
          <a href="#services" className="btn-link text-[#00d4ff]">
            Get started
            <Play className="w-4 h-4" />
          </a>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="mb-10">
            <h2 className="text-[40px] lg:text-[47px] font-semibold text-[#0050a9] mb-4">
              Case studies
            </h2>
            <p className="text-xl text-gray-600">
              We help companies anticipate and act with insight and speed.
            </p>
          </div>

          {/* Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {caseStudies.map((study, index) => (
              <div key={index} className="case-study-card group">
                <img src={study.image} alt={study.title} />
                <div className="overlay" />
                <div className="content">
                  <div className="industry-label">{study.industry}</div>
                  <div className="title">
                    {study.title}
                    <Play className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Products Section */}
      <section className="py-16 lg:py-24 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12">
            <h2 className="text-[40px] lg:text-[47px] font-semibold text-[#0050a9] mb-4">
              Our Products
            </h2>
            <p className="text-xl text-gray-600">
              Innovative solutions designed to solve complex business challenges with precision and scale.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'JSAN VTS',
                description: 'Advanced Vehicle Tracking System for real-time fleet management and operational efficiency.',
                link: '/products/jsan-vts',
                icon: '🚚'
              },
              {
                title: 'POI Express',
                description: 'Enterprise point-of-interest data management and spatial analysis platform.',
                link: '/products/poi-express',
                icon: '📍'
              },
              {
                title: 'Travel Desk',
                description: 'Integrated travel management solution for corporate logistics and planning.',
                link: '/products/travel-desk',
                icon: '✈️'
              }
            ].map((product, idx) => (
              <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="text-4xl mb-6">{product.icon}</div>
                <h3 className="text-2xl font-bold text-[#0050a9] mb-4">{product.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {product.description}
                </p>
                <Link to={product.link} className="text-[#00d4ff] font-semibold flex items-center gap-2 hover:gap-3 transition-all">
                  View Product <span className="text-lg">&rarr;</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Report Banner */}
      <section className="relative h-[400px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1600&auto=format&fit=crop"
          alt="Professional"
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0050a9]/90 via-[#0050a9]/70 to-transparent" />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-6 w-full">
            <div className="max-w-2xl">
              <h3 className="text-[28px] lg:text-[36px] font-semibold text-[#00d4ff] mb-4">
                How are data-empowered businesses shaping tomorrow's markets?
              </h3>
              <p className="text-white/90 text-lg mb-6">
                Organizations that embrace geospatial intelligence could drive up to 40% improvement in operational efficiency.
                It's time to understand the new data-empowered enterprise.
              </p>
              <a href="/contact" className="btn-link text-[#00d4ff]">
                Get in Touch
                <Play className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
