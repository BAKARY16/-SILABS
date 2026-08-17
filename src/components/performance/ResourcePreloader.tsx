import { useEffect } from 'react'
import { preloadProject, preloadRoute, schedulePortfolioPreload } from '../../utils/preload'

const getInternalLink = (target: EventTarget | null) =>
  target instanceof Element ? target.closest<HTMLAnchorElement>('a[href]') : null

export function ResourcePreloader() {
  useEffect(() => {
    const cancelBackgroundPreload = schedulePortfolioPreload()

    const warmLink = (event: Event) => {
      const link = getInternalLink(event.target)
      if (!link || link.origin !== window.location.origin) return
      preloadRoute(link.pathname)
      const match = link.pathname.match(/^\/projects\/([^/]+)$/)
      if (match) preloadProject(decodeURIComponent(match[1]), true)
    }

    document.addEventListener('pointerover', warmLink, { passive: true })
    document.addEventListener('focusin', warmLink)
    document.addEventListener('touchstart', warmLink, { passive: true })

    return () => {
      cancelBackgroundPreload()
      document.removeEventListener('pointerover', warmLink)
      document.removeEventListener('focusin', warmLink)
      document.removeEventListener('touchstart', warmLink)
    }
  }, [])

  return null
}
