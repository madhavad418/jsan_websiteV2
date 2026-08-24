import { useEffect, useRef, useCallback, useState } from 'react'
import { Maximize2, Minimize2, X } from 'lucide-react'
import * as maptilersdk from '@maptiler/sdk'
import '@maptiler/sdk/dist/maptiler-sdk.css'

// JSAN office locations (registered addresses; company names intentionally omitted).
/* Exported so other sections can derive location counts from the real list rather
   than hardcoding a number that could drift or be inflated. */
export const offices = [
  // Europe
  { region: 'EMEA', city: 'London', country: 'United Kingdom', lng: -0.3089, lat: 51.4875, address: 'Profile West, 950 Great West Road, Brentford, Middlesex, TW8 9ES' },
  { region: 'EMEA', city: 'Berlin', country: 'Germany', lng: 13.4050, lat: 52.5200, address: 'Südwestkorso 14, 12161 Berlin' },
  { region: 'EMEA', city: 'Linköping', country: 'Sweden', lng: 15.6216, lat: 58.4109, address: 'Smedjegatan, 582 38 Linköping' },
  { region: 'EMEA', city: 'Oslo', country: 'Norway', lng: 10.7522, lat: 59.9139, address: 'Innspurten 13A, 0663 Oslo' },
  { region: 'EMEA', city: 'Copenhagen', country: 'Denmark', lng: 12.5683, lat: 55.6761, address: 'Vendersgade 28, st., 1363 København K' },
  { region: 'EMEA', city: 'Neuilly-sur-Seine', country: 'France', lng: 2.2699, lat: 48.8846, address: '144 Avenue Charles de Gaulle, 92200 Neuilly-sur-Seine' },
  { region: 'EMEA', city: 'Wrocław', country: 'Poland', lng: 17.0385, lat: 51.1079, address: 'ul. Świętego Jerzego 1, 50-518 Wrocław' },
  { region: 'EMEA', city: 'Tallinn', country: 'Estonia', lng: 24.7536, lat: 59.437, address: 'Viru väljak 2, Kesklinna linnaosa, 10111 Tallinn' },
  { region: 'EMEA', city: 'Riga', country: 'Latvia', lng: 24.1052, lat: 56.9496, address: 'Aspazijas street 24-7, Riga, LV-1050' },
  { region: 'EMEA', city: 'Madrid', country: 'Spain', lng: -3.7038, lat: 40.4168, address: 'Section D, PE Avalon, Calle Santa Leonor 65, 28037 Madrid' },
  { region: 'EMEA', city: 'Bray', country: 'Ireland', lng: -6.1119, lat: 53.2028, address: 'Bull Lane, Bray, Wicklow' },
  // Americas
  { region: 'Americas', city: 'Princeton', country: 'United States', lng: -74.6672, lat: 40.3573, address: '100 Overlook Center, 2nd Floor, Princeton, NJ 08540' },
  { region: 'Americas', city: 'Toronto', country: 'Canada', lng: -79.3832, lat: 43.6532, address: '77 Guthrie Avenue, Toronto, ON M8Y 3L3' },
  { region: 'Americas', city: 'São Paulo', country: 'Brazil', lng: -46.6333, lat: -23.5505, address: 'Av. Dra. Ruth Cardoso 8501, 17th Floor, São Paulo 05425-070' },
  // Asia Pacific
  { region: 'APAC', city: 'Hyderabad', country: 'India', lng: 78.4867, lat: 17.385, address: 'Plot No. 42, Nathani Towers, Jayabheri Enclave II, Gachibowli, Hyderabad 500032' },
  { region: 'APAC', city: 'Singapore', country: 'Singapore', lng: 103.8198, lat: 1.3521, address: '51 Goldhill Plaza #07-07, Singapore 308900' },
  { region: 'APAC', city: 'Kuala Lumpur', country: 'Malaysia', lng: 101.6869, lat: 3.139, address: 'Unit 20-01, Level 20, Menara Centara, 360 Jalan Tuanku Abdul Rahman, 50100 Kuala Lumpur' },
  { region: 'APAC', city: 'Hong Kong', country: 'Hong Kong', lng: 114.1550, lat: 22.2860, address: "2/F Tower 1, Tern Centre, 237 Queen's Road Central, Sheung Wan" },
  { region: 'APAC', city: 'Jakarta', country: 'Indonesia', lng: 106.8456, lat: -6.2088, address: 'Cyber 2 Tower, 18th Floor, Jl. HR Rasuna Said Block X-5, Kav 13, Jakarta 12950' },
  { region: 'APAC', city: 'Tokyo', country: 'Japan', lng: 139.4130, lat: 35.6939, address: '1-4-29 Fujimicho, Tachikawa-shi, Tokyo 190-0013' },
  { region: 'APAC', city: 'Melbourne', country: 'Australia', lng: 145.0520, lat: -37.9650, address: '12/296 Bay Road, Cheltenham VIC 3192' },
  { region: 'APAC', city: 'Bangkok', country: 'Thailand', lng: 100.5018, lat: 13.7563 },
  { region: 'APAC', city: 'Ho Chi Minh City', country: 'Vietnam', lng: 106.6297, lat: 10.8231 },
  // Africa
  { region: 'EMEA', city: 'Sandton', country: 'South Africa', lng: 28.0567, lat: -26.1076, address: 'SS Katherine and West, Section 25, Third Floor, 114 West Street, Sandton, Gauteng 2196' },
  { region: 'EMEA', city: 'Zagreb', country: 'Croatia', lng: 15.9819, lat: 45.8150 },
  { region: 'EMEA', city: 'Dubai', country: 'United Arab Emirates', lng: 55.2708, lat: 25.2048 },
]

type OfficeProps = { city: string; country: string; address?: string; region: string }

/* Regional views for the filter chips. */
const regions = [
  { id: 'All', label: 'All Offices', center: [30, 15] as [number, number], zoom: 0.8 },
  { id: 'Americas', label: 'Americas', center: [-70, 5] as [number, number], zoom: 1.5 },
  { id: 'EMEA', label: 'EMEA', center: [14, 42] as [number, number], zoom: 1.9 },
  { id: 'APAC', label: 'APAC', center: [112, 8] as [number, number], zoom: 1.7 },
]

/* Delivery links. Every office connects to its regional hub, and the hubs
   connect to each other, so no location is left unlinked. Built from the
   office list so new locations are wired up automatically. */
const regionHubs: Record<string, string> = {
  EMEA: 'London',
  Americas: 'Princeton',
  APAC: 'Singapore',
}

const coordsOf = (city: string): [number, number] => {
  const office = offices.find((o) => o.city === city)!
  return [office.lng, office.lat]
}

const hubLinks: [[number, number], [number, number]][] = [
  // spokes: each office to the hub of its region
  ...offices
    .filter((o) => regionHubs[o.region] && o.city !== regionHubs[o.region])
    .map((o): [[number, number], [number, number]] => [coordsOf(regionHubs[o.region]), [o.lng, o.lat]]),
  // trunk routes between the hubs
  [coordsOf('London'), coordsOf('Princeton')],
  [coordsOf('London'), coordsOf('Singapore')],
  // Princeton-Singapore is deliberately omitted: its great circle runs over the
  // pole and renders as arcs shooting off the top of a flat map.
]

/** Interpolates a great-circle path so arcs bend the way flight paths do. */
function greatCircle(from: [number, number], to: [number, number], steps = 64): [number, number][] {
  const rad = (d: number) => (d * Math.PI) / 180
  const deg = (r: number) => (r * 180) / Math.PI
  const [lon1, lat1] = [rad(from[0]), rad(from[1])]
  const [lon2, lat2] = [rad(to[0]), rad(to[1])]
  const d =
    2 *
    Math.asin(
      Math.sqrt(
        Math.sin((lat2 - lat1) / 2) ** 2 +
          Math.cos(lat1) * Math.cos(lat2) * Math.sin((lon2 - lon1) / 2) ** 2
      )
    )
  if (!d) return [from, to]

  const points: [number, number][] = []
  for (let i = 0; i <= steps; i++) {
    const f = i / steps
    const a = Math.sin((1 - f) * d) / Math.sin(d)
    const b = Math.sin(f * d) / Math.sin(d)
    const x = a * Math.cos(lat1) * Math.cos(lon1) + b * Math.cos(lat2) * Math.cos(lon2)
    const y = a * Math.cos(lat1) * Math.sin(lon1) + b * Math.cos(lat2) * Math.sin(lon2)
    const z = a * Math.sin(lat1) + b * Math.sin(lat2)
    points.push([deg(Math.atan2(y, x)), deg(Math.atan2(z, Math.hypot(x, y)))])
  }
  return points
}

/* The stock dark style is near-black, which sits oddly against the site's
   blues. These recolour the base layers into the JSAN navy palette. */
const brandPalette = {
  water: '#041c3c',
  land: '#14538f',
  landMuted: '#0f4479',
  boundary: 'rgba(255,255,255,0.22)',
  label: 'rgba(255,255,255,0.75)',
  labelHalo: '#03192f',
}

/** Repaints the base style layers. Must run before our own layers are added. */
function applyBrandPalette(m: maptilersdk.Map) {
  const layers = m.getStyle()?.layers
  if (!layers) return

  for (const layer of layers) {
    const id = layer.id.toLowerCase()
    const isWater = /water|ocean|sea|river|lake|bathymetry|marine/.test(id)
    const isLandcover = /landcover|landuse|park|forest|wood|grass|sand|glacier/.test(id)

    try {
      switch (layer.type) {
        case 'background':
          // Uncovered area is ocean in this style
          m.setPaintProperty(layer.id, 'background-color', brandPalette.water)
          break
        case 'fill':
          m.setPaintProperty(
            layer.id,
            'fill-color',
            isWater ? brandPalette.water : isLandcover ? brandPalette.landMuted : brandPalette.land
          )
          m.setPaintProperty(layer.id, 'fill-opacity', 1)
          break
        case 'line':
          m.setPaintProperty(layer.id, 'line-color', isWater ? brandPalette.water : brandPalette.boundary)
          break
        case 'symbol':
          m.setPaintProperty(layer.id, 'text-color', brandPalette.label)
          m.setPaintProperty(layer.id, 'text-halo-color', brandPalette.labelHalo)
          break
      }
    } catch {
      // Layer doesn't support that paint property; leave it as the style set it.
    }
  }
}

const arcsGeojson: GeoJSON.FeatureCollection = {
  type: 'FeatureCollection',
  features: hubLinks.map(([from, to]) => ({
    type: 'Feature',
    properties: {},
    geometry: { type: 'LineString', coordinates: greatCircle(from, to) },
  })),
}

const popupHTML = (p: OfficeProps) =>
  `<div class="jsan-popup-head"><span class="jsan-popup-city">${p.city}</span><span class="jsan-popup-sep">, </span><span class="jsan-popup-country">${p.country}</span></div>` +
  (p.address ? `<div class="jsan-popup-addr">${p.address}</div>` : '')

// Build GeoJSON
const geojson: GeoJSON.FeatureCollection = {
  type: 'FeatureCollection',
  features: offices.map((o) => ({
    type: 'Feature',
    geometry: { type: 'Point', coordinates: [o.lng, o.lat] },
    properties: { city: o.city, country: o.country, address: o.address ?? '', region: o.region },
  })),
}

export default function WorldMap() {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<maptilersdk.Map | null>(null)
  const popupRef = useRef<maptilersdk.Popup | null>(null)
  const frameRef = useRef<number>(0)
  const [mapFailed, setMapFailed] = useState(false)
  const [activeRegion, setActiveRegion] = useState('All')
  const [expanded, setExpanded] = useState(false)

  const visibleCount =
    activeRegion === 'All' ? offices.length : offices.filter((o) => o.region === activeRegion).length

  const selectRegion = useCallback((id: string) => {
    setActiveRegion(id)
    const m = map.current
    const region = regions.find((r) => r.id === id)
    if (!m || !region) return

    const isMobile = window.innerWidth < 768
    m.flyTo({
      center: id === 'All' && isMobile ? [20, 15] : region.center,
      zoom: id === 'All' && isMobile ? 0.4 : region.zoom,
      duration: 1200,
      essential: true,
    })

    const filter: maptilersdk.FilterSpecification | null =
      id === 'All' ? null : ['==', ['get', 'region'], id]
    for (const layer of ['offices-pulse', 'offices-glow', 'offices-dot']) {
      if (m.getLayer(layer)) m.setFilter(layer, filter)
    }
  }, [])

  useEffect(() => {
    if (!mapContainer.current || map.current) return

    // MapLibre/MapTiler requires WebGL2. On devices/browsers without it the SDK
    // throws  which would otherwise bubble up and blank the whole page. Guard
    // and fall back to a static panel so the page always renders.
    const hasWebGL2 = (() => {
      try { return !!document.createElement('canvas').getContext('webgl2') } catch { return false }
    })()
    if (!hasWebGL2) { setMapFailed(true); return }

    // Publishable client-side key. Keep it domain-restricted in the MapTiler console 
    // anything client-side is readable, so restriction is the control, not secrecy.
    maptilersdk.config.apiKey = import.meta.env.VITE_MAPTILER_KEY ?? 'waDw4Bs9SVQkiLKPfm5s'

    const isMobile = window.innerWidth < 768

    try {
      map.current = new maptilersdk.Map({
        container: mapContainer.current,
        style: maptilersdk.MapStyle.DATAVIZ.DARK,
        center: isMobile ? [20, 15] : [30, 15],
        zoom: isMobile ? 0.4 : 0.8,
        minZoom: 0.3,
        maxZoom: 6,
        attributionControl: false,
        navigationControl: false,
        geolocateControl: false,
        terrainControl: false,
        dragPan: true,
        scrollZoom: false,
        dragRotate: false,
        pitchWithRotate: false,
        touchZoomRotate: true,
        doubleClickZoom: true,
      })
    } catch {
      setMapFailed(true)
      return
    }

    popupRef.current = new maptilersdk.Popup({
      offset: 10,
      closeButton: false,
      closeOnClick: false,
      className: 'jsan-popup',
      anchor: 'bottom',
    })

    map.current.on('load', () => {
      const m = map.current
      if (!m) return

      // Recolour the base style first, so our own layers below are untouched
      applyBrandPalette(m)

      // Hub-to-hub arcs, drawn under the office markers
      m.addSource('arcs', { type: 'geojson', data: arcsGeojson })

      m.addLayer({
        id: 'arcs-halo',
        type: 'line',
        source: 'arcs',
        layout: { 'line-cap': 'round', 'line-join': 'round' },
        paint: { 'line-color': '#00d4ff', 'line-width': 3, 'line-opacity': 0.12, 'line-blur': 3 },
      })

      m.addLayer({
        id: 'arcs-line',
        type: 'line',
        source: 'arcs',
        layout: { 'line-cap': 'round', 'line-join': 'round' },
        paint: {
          'line-color': '#00d4ff',
          'line-width': 1.2,
          'line-opacity': 0.55,
          'line-dasharray': [0, 4, 3],
        },
      })

      // Add offices as a GeoJSON source
      m.addSource('offices', { type: 'geojson', data: geojson })

      // Animated pulse ring
      m.addLayer({
        id: 'offices-pulse',
        type: 'circle',
        source: 'offices',
        paint: {
          'circle-radius': 8,
          'circle-color': '#00d4ff',
          'circle-opacity': 0.35,
          'circle-blur': 0.6,
        },
      })

      // Outer glow ring
      m.addLayer({
        id: 'offices-glow',
        type: 'circle',
        source: 'offices',
        paint: {
          'circle-radius': 10,
          'circle-color': '#00d4ff',
          'circle-opacity': 0.15,
          'circle-blur': 1,
        },
      })

      // Main dot
      m.addLayer({
        id: 'offices-dot',
        type: 'circle',
        source: 'offices',
        paint: {
          'circle-radius': 5,
          'circle-color': '#00d4ff',
          'circle-stroke-width': 2,
          'circle-stroke-color': 'rgba(255,255,255,0.9)',
        },
      })

      // Change cursor on hover
      m.on('mouseenter', 'offices-dot', (e) => {
        m.getCanvas().style.cursor = 'pointer'
        const f = e.features?.[0]
        if (!f || !popupRef.current) return
        const coords = (f.geometry as GeoJSON.Point).coordinates.slice() as [number, number]
        popupRef.current
          .setLngLat(coords)
          .setHTML(popupHTML(f.properties as OfficeProps))
          .addTo(m)
      })

      m.on('mouseleave', 'offices-dot', () => {
        m.getCanvas().style.cursor = ''
        popupRef.current?.remove()
      })

      // Pulse the office rings and flow the arc dashes. One rAF loop drives
      // both; it stops on unmount and is skipped for reduced-motion users.
      const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
      if (!reducedMotion) {
        const dashSteps: number[][] = [
          [0, 4, 3], [0.5, 4, 2.5], [1, 4, 2], [1.5, 4, 1.5],
          [2, 4, 1], [2.5, 4, 0.5], [3, 4, 0], [0, 0.5, 3, 3.5],
        ]
        let lastDash = -1
        const started = performance.now()

        const tick = (now: number) => {
          if (!map.current) return
          const elapsed = now - started

          // 2s pulse: ring grows outward and fades
          const t = (elapsed % 2000) / 2000
          if (map.current.getLayer('offices-pulse')) {
            map.current.setPaintProperty('offices-pulse', 'circle-radius', 6 + t * 20)
            map.current.setPaintProperty('offices-pulse', 'circle-opacity', 0.4 * (1 - t))
          }

          // Marching dashes along the arcs
          const step = Math.floor((elapsed / 90) % dashSteps.length)
          if (step !== lastDash && map.current.getLayer('arcs-line')) {
            map.current.setPaintProperty('arcs-line', 'line-dasharray', dashSteps[step])
            lastDash = step
          }

          frameRef.current = requestAnimationFrame(tick)
        }
        frameRef.current = requestAnimationFrame(tick)
      }

      // Click for mobile
      m.on('click', 'offices-dot', (e) => {
        const f = e.features?.[0]
        if (!f || !popupRef.current) return
        const coords = (f.geometry as GeoJSON.Point).coordinates.slice() as [number, number]
        popupRef.current
          .setLngLat(coords)
          .setHTML(popupHTML(f.properties as OfficeProps))
          .addTo(m)
      })
    })

    const handleResize = () => map.current?.resize()
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(frameRef.current)
      map.current?.remove()
      map.current = null
    }
  }, [])

  // Expanding keeps the same map instance and simply promotes its wrapper to a
  // full-screen layer, so no re-initialisation or marker rebuild is needed.
  useEffect(() => {
    if (!expanded) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onEsc = (e: KeyboardEvent) => e.key === 'Escape' && setExpanded(false)
    document.addEventListener('keydown', onEsc)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', onEsc)
    }
  }, [expanded])

  useEffect(() => {
    const timer = window.setTimeout(() => map.current?.resize(), 260)
    return () => window.clearTimeout(timer)
  }, [expanded])

  const handleZoomIn = useCallback(() => {
    map.current?.zoomIn({ duration: 300 })
  }, [])

  const handleZoomOut = useCallback(() => {
    map.current?.zoomOut({ duration: 300 })
  }, [])

  return (
    <>
      <style>{`
        .jsan-popup .maplibregl-popup-content {
          background: rgba(4,2,76,0.92) !important;
          border: 1px solid rgba(0,212,255,0.35) !important;
          border-radius: 6px !important;
          padding: 6px 11px !important;
          box-shadow: 0 2px 10px rgba(0,0,0,0.3) !important;
          font-family: 'Open Sans', system-ui, sans-serif;
          font-size: 12px;
          line-height: 1.4;
          max-width: 250px;
          white-space: normal;
        }
        .jsan-popup .maplibregl-popup-tip {
          border-top-color: rgba(4,2,76,0.92) !important;
        }
        .jsan-popup-head { white-space: nowrap; }
        .jsan-popup-city { font-weight: 600; color: #fff; }
        .jsan-popup-sep { color: rgba(255,255,255,0.4); }
        .jsan-popup-country { color: #00d4ff; }
        .jsan-popup-addr { margin-top: 3px; color: rgba(255,255,255,0.72); font-size: 11px; line-height: 1.35; }
        .jsan-map-container .maplibregl-canvas { outline: none; }
        .jsan-map-container .maplibregl-ctrl-logo,
        .jsan-map-container .maplibregl-ctrl-attrib,
        .jsan-map-container .maplibregl-ctrl-bottom-left,
        .jsan-map-container .maplibregl-ctrl-bottom-right { display: none !important; }
      `}</style>
      {/* Backdrop for the expanded view */}
      {expanded && (
        <div
          className="fixed inset-0 z-[190] bg-[#010f21]/80 backdrop-blur-sm"
          onClick={() => setExpanded(false)}
        />
      )}

      <div
        className={
          expanded
            ? 'fixed inset-0 z-[200] flex flex-col gap-3 p-3 md:p-6'
            : 'relative w-full max-w-5xl mx-auto mt-4'
        }
      >
        {mapFailed ? (
          <div className="w-full rounded-2xl h-[300px] md:h-[420px] lg:h-[480px] flex flex-col items-center justify-center text-center px-6 bg-gradient-to-br from-[#0a1a3a] to-[#0050a9] border border-white/10">
            <p className="text-white text-xl lg:text-2xl font-bold">20+ Offices Across 4 Continents</p>
            <p className="text-white/70 text-sm mt-2 max-w-md">Serving clients worldwide from our global network of offices.</p>
          </div>
        ) : (
          <>
            {expanded && (
              <div className="flex items-center justify-between gap-4 px-1">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#00d4ff]">
                    Global Presence
                  </span>
                  <h3 className="text-lg font-bold text-white md:text-xl">Our Worldwide Network</h3>
                </div>
                <button
                  onClick={() => setExpanded(false)}
                  aria-label="Close expanded map"
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/20 bg-white/10 text-white backdrop-blur-md transition-all hover:border-[#00d4ff]/60 hover:bg-[#00d4ff]/20"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            )}

            {/* Region filters */}
            <div className={`flex flex-wrap items-center justify-center gap-2 ${expanded ? 'mb-1' : 'mb-4'}`}>
              {regions.map((region) => (
                <button
                  key={region.id}
                  onClick={() => selectRegion(region.id)}
                  className={`rounded-full border px-4 py-1.5 text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                    activeRegion === region.id
                      ? 'border-transparent text-white shadow-[0_8px_20px_-10px_rgba(0,212,255,0.9)]'
                      : expanded
                        ? 'border-white/20 bg-white/10 text-white backdrop-blur-md hover:border-[#00d4ff]/60 hover:bg-[#00d4ff]/20'
                        : 'border-[#0050a9]/20 bg-white text-[#0050a9] hover:border-[#0050a9]/50 hover:bg-blue-50'
                  }`}
                  style={
                    activeRegion === region.id
                      ? { background: 'linear-gradient(120deg, #012f62, #0055b4)' }
                      : undefined
                  }
                >
                  {region.label}
                </button>
              ))}
            </div>

            <div
              className={`relative rounded-2xl p-[1px] ${expanded ? 'min-h-0 flex-1' : ''}`}
              style={{ background: 'linear-gradient(140deg, rgba(0,212,255,0.5), rgba(0,80,169,0.15) 45%, rgba(0,212,255,0.35))' }}
            >
              <div
                ref={mapContainer}
                className={`jsan-map-container w-full overflow-hidden rounded-2xl ${
                  expanded ? 'h-full' : 'h-[300px] md:h-[420px] lg:h-[480px]'
                }`}
              />

              {/* Live count overlay */}
              <div className="pointer-events-none absolute left-4 top-4 z-10 rounded-xl border border-white/15 bg-[#012f62]/70 px-4 py-3 backdrop-blur-md">
                <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#00d4ff]">
                  {activeRegion === 'All' ? 'Global Network' : activeRegion}
                </div>
                <div className="mt-1 flex items-baseline gap-1.5">
                  <span className="text-2xl font-bold leading-none text-white tabular-nums">
                    {visibleCount}
                  </span>
                  <span className="text-xs text-white/70">
                    {visibleCount === 1 ? 'office' : 'offices'}
                  </span>
                </div>
              </div>

              {/* Zoom + expand controls */}
              <div className="absolute right-4 top-4 z-10 flex flex-col gap-1.5">
                <button
                  onClick={() => setExpanded((v) => !v)}
                  className="mb-1 flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 bg-[#012f62]/70 text-white backdrop-blur-md transition-all hover:border-[#00d4ff]/50 hover:bg-[#00d4ff]/20"
                  aria-label={expanded ? 'Collapse map' : 'Expand map'}
                  title={expanded ? 'Collapse map' : 'Expand map'}
                >
                  {expanded ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
                </button>
                <button
                  onClick={handleZoomIn}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 bg-[#012f62]/70 text-xl font-bold leading-none text-white backdrop-blur-md transition-all hover:border-[#00d4ff]/50 hover:bg-[#00d4ff]/20"
                  aria-label="Zoom in"
                >
                  +
                </button>
                <button
                  onClick={handleZoomOut}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 bg-[#012f62]/70 text-xl font-bold leading-none text-white backdrop-blur-md transition-all hover:border-[#00d4ff]/50 hover:bg-[#00d4ff]/20"
                  aria-label="Zoom out"
                >
                  −
                </button>
              </div>

              {/* Legend */}
              <div className="pointer-events-none absolute bottom-4 left-4 z-10 flex items-center gap-4 rounded-lg border border-white/10 bg-[#012f62]/60 px-3 py-2 backdrop-blur-md">
                <span className="flex items-center gap-2 text-[11px] text-white/75">
                  <span className="h-2 w-2 rounded-full bg-[#00d4ff] shadow-[0_0_8px_2px_rgba(0,212,255,0.7)]" />
                  Office
                </span>
                <span className="flex items-center gap-2 text-[11px] text-white/75">
                  <span className="h-px w-5 bg-[#00d4ff]/70" />
                  Delivery link
                </span>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  )
}
