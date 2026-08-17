import { useEffect, useRef, useState } from 'react'
import { flushSync } from 'react-dom'
import { useLocation, useNavigate } from 'react-router-dom'

const MINIMUM_VISIBLE_TIME = 520

export function NavigationLoader() {
  const location = useLocation()
  const navigate = useNavigate()
  const [visible, setVisible] = useState(false)
  const startedAt = useRef(0)
  const pendingTarget = useRef<string | null>(null)
  const hideTimer = useRef<number | undefined>(undefined)

  useEffect(() => {
    const start = (target: string | null) => {
      window.clearTimeout(hideTimer.current)
      startedAt.current = performance.now()
      pendingTarget.current = target
      flushSync(() => setVisible(true))
    }

    const handleClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
      const anchor = (event.target as Element | null)?.closest<HTMLAnchorElement>('a[href]')
      if (!anchor || anchor.target === '_blank' || anchor.hasAttribute('download')) return

      const target = new URL(anchor.href, window.location.href)
      if (target.origin !== window.location.origin) return

      const current = `${location.pathname}${location.search}${location.hash}`
      const next = `${target.pathname}${target.search}${target.hash}`
      if (next === current) return
      event.preventDefault()
      start(next)
      window.setTimeout(() => navigate(next), 140)
    }

    const handleHistoryNavigation = () => start(null)

    const handleRouteReady = (event: Event) => {
      if (!startedAt.current) return
      const readyTarget = (event as CustomEvent<string>).detail
      if (pendingTarget.current && readyTarget !== pendingTarget.current) return

      pendingTarget.current = null
      const remaining = Math.max(0, MINIMUM_VISIBLE_TIME - (performance.now() - startedAt.current))
      window.clearTimeout(hideTimer.current)
      hideTimer.current = window.setTimeout(() => {
        setVisible(false)
        startedAt.current = 0
      }, remaining)
    }

    document.addEventListener('click', handleClick, true)
    document.addEventListener('portfolio:route-ready', handleRouteReady)
    window.addEventListener('popstate', handleHistoryNavigation)
    return () => {
      document.removeEventListener('click', handleClick, true)
      document.removeEventListener('portfolio:route-ready', handleRouteReady)
      window.removeEventListener('popstate', handleHistoryNavigation)
    }
  }, [location.hash, location.pathname, location.search, navigate])

  useEffect(() => () => window.clearTimeout(hideTimer.current), [])

  return (
    <div className={`navigation-loader${visible ? ' is-visible' : ''}`} role="status" aria-label="Chargement" aria-live="polite" aria-hidden={!visible}>
      <div className="loading-spinner" aria-hidden="true">
        {Array.from({ length: 12 }, (_, index) => <i key={index} />)}
      </div>
    </div>
  )
}
