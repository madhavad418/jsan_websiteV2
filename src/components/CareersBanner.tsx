import { Play } from 'lucide-react'

export default function CareersBanner() {
  return (
    <section className="bg-[#0050a9] py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-3xl lg:text-4xl font-semibold text-white mb-6">
          Drive your career<br />forward. Fast.
        </h2>
        <a href="#careers" className="btn-link text-[#00d4ff]">
          Browse job listings
          <Play className="w-4 h-4" />
        </a>
      </div>
    </section>
  )
}
