import manifest from '../data/responsive-images.json'

const images: Record<string, { src: string }> = manifest

/** Build-generated local WebP for a CSS background; falls back to the original URL. */
export const optimizedSrc = (src: string) => images[src]?.src ?? src
