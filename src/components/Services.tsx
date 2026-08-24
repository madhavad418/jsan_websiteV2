import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { MapPin, Globe, Cpu, Briefcase, Users, LineChart, ArrowRight } from 'lucide-react'

const services = [
  {
    icon: MapPin,
    title: 'Location Intelligence',
    description: 'With a team of seasoned location intelligence professionals and deep domain expertise, we deliver end-to-end solutions.',
    features: ['Data Capture & Enhancement', 'Advanced Analytics & Insights', 'Custom Platform Development', 'Strategic Advisory'],
    gradient: 'from-blue-500 via-blue-600 to-jsan-primary',
    glowColor: 'group-hover:shadow-blue-500/25',
    titleHover: 'group-hover:text-blue-600',
    linkColor: 'text-blue-500',
    accentBg: 'bg-blue-500/10',
  },
  {
    icon: Globe,
    title: 'GIS Mapping and Expertise',
    description: 'With a team of seasoned GIS professionals and deep domain expertise, we deliver end-to-end geospatial solutions.',
    features: ['Data Acquisition & Enhancement', 'Advanced Analytics & Modelling', 'Custom GIS Software Development'],
    gradient: 'from-indigo-500 via-jsan-primary to-jsan-dark',
    glowColor: 'group-hover:shadow-indigo-500/25',
    titleHover: 'group-hover:text-indigo-600',
    linkColor: 'text-indigo-500',
    accentBg: 'bg-indigo-500/10',
  },
  {
    icon: Cpu,
    title: 'Technology Consultancy',
    description: 'Modernise how your business runs on technology. We help organizations leverage smart technologies.',
    features: ['Digital Transformation', 'Enterprise Architecture', 'Cloud & Infrastructure'],
    gradient: 'from-cyan-400 via-jsan-accent to-blue-500',
    glowColor: 'group-hover:shadow-cyan-400/25',
    titleHover: 'group-hover:text-cyan-600',
    linkColor: 'text-cyan-500',
    accentBg: 'bg-cyan-500/10',
  },
  {
    icon: Briefcase,
    title: 'Business Advisory',
    description: 'Strategic consulting services that drive business growth and operational excellence.',
    features: ['Business Process Optimization', 'Strategic Planning', 'Change Management'],
    gradient: 'from-violet-500 via-indigo-500 to-jsan-primary',
    glowColor: 'group-hover:shadow-violet-500/25',
    titleHover: 'group-hover:text-violet-600',
    linkColor: 'text-violet-500',
    accentBg: 'bg-violet-500/10',
  },
  {
    icon: Users,
    title: 'Staffing Solutions',
    description: 'People as a Service - Your global recruitment partner for top IT talent.',
    features: ['Contract Staffing', 'Permanent Placement', 'Team Augmentation'],
    gradient: 'from-sky-500 via-blue-500 to-jsan-primary',
    glowColor: 'group-hover:shadow-sky-500/25',
    titleHover: 'group-hover:text-sky-600',
    linkColor: 'text-sky-500',
    accentBg: 'bg-sky-500/10',
  },
  {
    icon: LineChart,
    title: 'Program Management',
    description: 'End-to-end program and project management services that ensure successful delivery.',
    features: ['PMO Setup & Operations', 'Agile Transformation'],
    gradient: 'from-emerald-400 via-teal-500 to-jsan-primary',
    glowColor: 'group-hover:shadow-emerald-400/25',
    titleHover: 'group-hover:text-emerald-600',
    linkColor: 'text-emerald-500',
    accentBg: 'bg-emerald-500/10',
    dotColor: 'bg-emerald-500',
  },
]

export default function Services() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="services" ref={ref} className="py-24 bg-gray-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-blue-500/8 to-jsan-accent/8 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-jsan-primary/8 to-violet-500/8 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-jsan-accent/5 to-blue-500/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 bg-jsan-primary/10 text-jsan-primary font-semibold rounded-full text-sm mb-4">
            Our Services
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            IT & GIS Consulting
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Transforming Ideas into Real World Reality. A global technology partner delivering
            IT consulting, geospatial solutions, staffing, and management advisory with speed,
            quality, and measurable value.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className={`relative bg-white rounded-2xl p-8 h-full shadow-lg hover:shadow-2xl ${service.glowColor} border border-gray-100 hover:border-gray-200 transition-all duration-500 flex flex-col overflow-hidden`}>
                {/* Gradient Top Accent Bar */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                {/* Subtle gradient background on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500 pointer-events-none`} />

                {/* Icon */}
                <div className="relative mb-6">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:shadow-xl transition-all duration-300`}>
                    <service.icon className="w-7 h-7 text-white" />
                  </div>
                  {/* Glow behind icon on hover */}
                  <div className={`absolute -inset-2 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-20 rounded-2xl blur-xl transition-opacity duration-500 -z-10`} />
                </div>

                {/* Title & Description */}
                <h3 className={`text-xl font-bold text-gray-900 mb-3 ${service.titleHover} transition-colors relative`}>
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-6 flex-grow relative">
                  {service.description}
                </p>

                {/* Features as pills */}
                <div className="flex flex-wrap gap-2 mb-6 relative">
                  {service.features.map((feature) => (
                    <span
                      key={feature}
                      className={`${service.accentBg} text-gray-700 text-xs px-3 py-1.5 rounded-full font-medium group-hover:text-gray-900 transition-colors`}
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                {/* Link with gradient underline */}
                <div className="relative">
                  <a
                    href="/contact"
                    className={`inline-flex items-center gap-2 ${service.linkColor} font-semibold group-hover:gap-3 transition-all duration-300`}
                  >
                    Get in Touch
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </a>
                  <div className={`h-0.5 w-0 group-hover:w-24 bg-gradient-to-r ${service.gradient} transition-all duration-500 mt-1 rounded-full`} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
