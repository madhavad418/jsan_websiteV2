import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Layers, Cpu, Globe, Package, Shield, HeadphonesIcon } from 'lucide-react'

const differentiators = [
  {
    icon: Layers,
    title: 'End-to-End Expertise',
    description: 'Unlike niche providers, we cover the entire geospatial value chain - from field data collection to AI-powered analytics and custom software development - all under one roof.',
  },
  {
    icon: Cpu,
    title: 'Engineering-Led Innovation',
    description: 'Our solutions blend AI, IoT and cloud GIS with practical engineering rigor, ensuring scalable, future-ready systems.',
  },
  {
    icon: Globe,
    title: 'Global Standards, Local Precision',
    description: 'Trusted by clients in North America, Europe, and beyond, we combine international best practices with hyper-localized insights.',
  },
  {
    icon: Package,
    title: 'Turnkey Ownership',
    description: "We don't just deliver reports - we build, deploy, and optimize solutions tailored to your operational workflows.",
  },
  {
    icon: Shield,
    title: 'Ethical Data Leadership',
    description: 'Committed to secure, sustainable, and transparent geospatial practices aligned with GDPR and global norms.',
  },
  {
    icon: HeadphonesIcon,
    title: '24/7 Support',
    description: 'Round-the-clock technical support and maintenance ensuring your systems run smoothly without interruption.',
  },
]

export default function WhyChooseUs() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="py-24 bg-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 left-10 w-72 h-72 bg-jsan-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-jsan-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 bg-jsan-primary/10 text-jsan-primary font-semibold rounded-full text-sm mb-4">
            Why Choose Us
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Why Choose JSAN?
          </h2>

          {/* Value Pills */}
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <div className="flex items-center gap-2 px-6 py-3 bg-green-50 text-green-700 rounded-full font-semibold">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Better: Quality Solutions
            </div>
            <div className="flex items-center gap-2 px-6 py-3 bg-yellow-50 text-yellow-700 rounded-full font-semibold">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Faster: Agile Delivery
            </div>
            <div className="flex items-center gap-2 px-6 py-3 bg-blue-50 text-blue-700 rounded-full font-semibold">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Cost-Effective: Maximum ROI
            </div>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {differentiators.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-gray-50 rounded-2xl p-8 h-full hover:bg-white hover:shadow-2xl border border-transparent hover:border-jsan-primary/10 transition-all duration-500">
                {/* Icon */}
                <div className="w-14 h-14 rounded-xl bg-jsan-primary/10 flex items-center justify-center mb-6 group-hover:bg-jsan-primary group-hover:scale-110 transition-all duration-300">
                  <item.icon className="w-7 h-7 text-jsan-primary group-hover:text-white transition-colors" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-jsan-primary transition-colors">
                  {item.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
