import type { ImgHTMLAttributes } from 'react'
import { useState } from 'react'
import manifest from '../data/responsive-images.json'

type Entry = { width: number; height: number; src: string; srcSet: string }
const images: Record<string, Entry> = manifest

/** Native img semantics and layout, with build-generated responsive sources. */
export default function OptimizedImage({ src, srcSet, sizes, loading = 'lazy', decoding = 'async', width, height, fetchPriority, active = true, ...props }: ImgHTMLAttributes<HTMLImageElement> & { active?: boolean }) {
  const [hasBeenActive, setHasBeenActive] = useState(active)
  if (active && !hasBeenActive) setHasBeenActive(true)
  const entry = src ? images[src] : undefined
  if (!active && !hasBeenActive) return null
  return <img {...props} {...(fetchPriority ? { fetchpriority: fetchPriority } : {})} src={entry?.src ?? src} srcSet={srcSet ?? entry?.srcSet}
    sizes={sizes ?? (loading === 'eager' ? '100vw' : '(min-width: 1280px) 640px, (min-width: 768px) 50vw, 100vw')}
    loading={loading} decoding={decoding} width={width ?? entry?.width} height={height ?? entry?.height} />
}
