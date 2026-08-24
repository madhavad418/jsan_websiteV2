import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    // When the URL has a hash (e.g. /contact#global-presence), scroll to that
    // section instead of the top. On a fresh load the target may mount after
    // this effect runs, so retry briefly until the element exists.
    if (hash) {
      const id = decodeURIComponent(hash.slice(1))
      const scrollToEl = () => {
        const el = document.getElementById(id)
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' })
          return true
        }
        return false
      }
      if (!scrollToEl()) {
        let tries = 0
        const timer = setInterval(() => {
          if (scrollToEl() || ++tries > 20) clearInterval(timer)
        }, 100)
        return () => clearInterval(timer)
      }
      return
    }

    window.scrollTo(0, 0)
  }, [pathname, hash])

  return null
}

export default ScrollToTop
