import { lazy, Suspense, useEffect, useRef, useState } from 'react'

const MapCanvas = lazy(() => import('./WorldMapCanvas'))

export default function DeferredMap() {
  const holder = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    if (!holder.current) return
    if (!('IntersectionObserver' in window)) { setVisible(true); return }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); observer.disconnect() }
    }, { rootMargin: '300px' })
    observer.observe(holder.current)
    return () => observer.disconnect()
  }, [])
  const placeholder = <div className="flex h-[380px] items-center justify-center rounded-2xl bg-[#0a1a3a] text-sm text-white/80 md:h-[500px] lg:h-[560px]" role="status">Interactive office map</div>
  return <div ref={holder} data-deferred-map>{visible ? <Suspense fallback={placeholder}><MapCanvas /></Suspense> : placeholder}</div>
}
