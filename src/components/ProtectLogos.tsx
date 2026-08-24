import { useEffect } from 'react'

/**
 * Deterrent against casually saving the JSAN logo:
 * blocks drag-to-save on any <img> whose source contains "logo"
 * (footer-logo.png, logo-white.png, the group logo, etc.).
 *
 * NOTE: this only stops the obvious drag. It cannot prevent
 * screenshots, DevTools, or hitting the image URL directly  that's not
 * possible for any public image.
 */
export default function ProtectLogos() {
  useEffect(() => {
    const block = (e: Event) => {
      e.preventDefault()
    }
    document.addEventListener('dragstart', block)
    return () => {
      document.removeEventListener('dragstart', block)
    }
  }, [])
  return null
}
