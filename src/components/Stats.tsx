import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'

const stats = [
  { value: 20, suffix: '+', label: 'Countries', description: 'Global Presence' },
  { value: 7, suffix: '+', label: 'Years Experience', description: 'Industry Expertise' },
  { value: 500, suffix: '+', label: 'Projects Delivered', description: 'Success Stories' },
  { value: 200, suffix: '+', label: 'Professionals', description: 'Expert Team' },
  { value: 98, suffix: '%', label: 'Client Retention', description: 'Trust & Loyalty' },
  { value: 24, suffix: '/7', label: 'Support', description: 'Always Available' },
]

function Counter({ value, suffix, duration = 2 }: { value: number; suffix: string; duration?: number }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!isInView) return

    let start = 0
    const end = value
    const incrementTime = (duration * 1000) / end
    const timer = setInterval(() => {
      start += 1
      setCount(start)
      if (start >= end) clearInterval(timer)
    }, incrementTime)

    return () => clearInterval(timer)
  }, [isInView, value, duration])

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  )
}

export default function Stats() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="py-24 bg-jsan-primary relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
              backgroundSize: '40px 40px',
            }}
          />
        </div>
        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
          className="absolute -top-1/2 -right-1/4 w-[800px] h-[800px] rounded-full border border-white/10"
        />
        <motion.div
          animate={{
            rotate: -360,
          }}
          transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-1/2 -left-1/4 w-[600px] h-[600px] rounded-full border border-white/5"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Numbers That Speak
          </h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Our track record of excellence in delivering impactful solutions worldwide.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center group"
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 border border-white/10 h-full">
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                  <Counter value={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-white font-semibold mb-1">{stat.label}</div>
                <div className="text-white/60 text-sm">{stat.description}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
