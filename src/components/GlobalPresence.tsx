import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { MapPin } from 'lucide-react'

const regions = [
  {
    name: 'Europe',
    countries: ['United Kingdom', 'Germany', 'France', 'Sweden', 'Norway', 'Denmark', 'Poland', 'Croatia', 'Estonia', 'Latvia', 'Ireland'],
    color: 'from-blue-500 to-jsan-primary',
  },
  {
    name: 'Americas',
    countries: ['United States', 'Canada', 'Brazil'],
    color: 'from-jsan-primary to-jsan-accent',
  },
  {
    name: 'Asia Pacific',
    countries: ['India', 'Singapore', 'Malaysia', 'Indonesia', 'Japan', 'Australia'],
    color: 'from-jsan-accent to-blue-400',
  },
  {
    name: 'Africa',
    countries: ['South Africa'],
    color: 'from-blue-400 to-jsan-primary',
  },
]

export default function GlobalPresence() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [activeRegion, setActiveRegion] = useState<string | null>(null)

  return (
    <section ref={ref} className="py-24 bg-gray-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 grid-pattern opacity-30" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 bg-jsan-primary/10 text-jsan-primary font-semibold rounded-full text-sm mb-4">
            Global Network
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Our Worldwide Network
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            With offices across 20+ countries, we deliver local expertise with global standards.
          </p>
        </motion.div>

        {/* World Map Visualization */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="relative bg-white rounded-3xl shadow-2xl p-8 md:p-12 mb-12 border border-gray-100"
        >
          {/* Simplified World Map Background */}
          <div className="relative h-64 md:h-96 bg-gradient-to-br from-jsan-50 to-white rounded-2xl flex items-center justify-center overflow-hidden">
            {/* Animated dots representing locations */}
            {[
              { top: '30%', left: '20%', label: 'Americas' },
              { top: '25%', left: '45%', label: 'Europe' },
              { top: '40%', left: '70%', label: 'Asia' },
              { top: '60%', left: '75%', label: 'Oceania' },
              { top: '55%', left: '55%', label: 'Africa' },
            ].map((location, index) => (
              <motion.div
                key={location.label}
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ delay: 0.5 + index * 0.1, type: "spring" }}
                className="absolute group cursor-pointer"
                style={{ top: location.top, left: location.left }}
              >
                <div className="relative">
                  <div className="w-4 h-4 bg-jsan-primary rounded-full animate-ping absolute" />
                  <div className="w-4 h-4 bg-jsan-primary rounded-full relative z-10" />
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-jsan-primary text-white text-xs px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {location.label}
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Center Text */}
            <div className="text-center z-10">
              <div className="text-6xl md:text-8xl font-black text-jsan-primary/10">22+</div>
              <div className="text-xl font-bold text-jsan-primary">Countries</div>
            </div>
          </div>
        </motion.div>

        {/* Region Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {regions.map((region, index) => (
            <motion.div
              key={region.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              onMouseEnter={() => setActiveRegion(region.name)}
              onMouseLeave={() => setActiveRegion(null)}
              className="group cursor-pointer"
            >
              <div className={`bg-white rounded-2xl p-6 shadow-lg border transition-all duration-500 ${
                activeRegion === region.name
                  ? 'border-jsan-primary shadow-xl -translate-y-2'
                  : 'border-gray-100 hover:border-jsan-primary/30'
              }`}>
                {/* Header */}
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${region.color} flex items-center justify-center`}>
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{region.name}</h3>
                    <p className="text-sm text-gray-500">{region.countries.length} countries</p>
                  </div>
                </div>

                {/* Countries */}
                <div className="flex flex-wrap gap-2">
                  {region.countries.slice(0, 4).map((country) => (
                    <span
                      key={country}
                      className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full group-hover:bg-jsan-50 group-hover:text-jsan-primary transition-colors"
                    >
                      {country}
                    </span>
                  ))}
                  {region.countries.length > 4 && (
                    <span className="px-3 py-1 bg-jsan-primary/10 text-jsan-primary text-xs rounded-full font-medium">
                      +{region.countries.length - 4} more
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
