import { Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { Footer } from './Footer'
import { Navbar } from './Navbar'
import { PageContinuation } from '../navigation/PageContinuation'
import { ScrollProgress } from '../navigation/ScrollProgress'
import { SkipLink } from '../ui/SkipLink'
import { useDocumentMeta } from '../../hooks/useDocumentMeta'
import { useSectionReveal } from '../../hooks/useSectionReveal'
import { ResourcePreloader } from '../performance/ResourcePreloader'

export function Layout() {
  const { pathname, search, hash } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])

  useEffect(() => {
    let secondFrame = 0
    const firstFrame = window.requestAnimationFrame(() => {
      secondFrame = window.requestAnimationFrame(() => {
        document.dispatchEvent(new CustomEvent('portfolio:route-ready', {
          detail: `${pathname}${search}${hash}`,
        }))
      })
    })
    return () => {
      window.cancelAnimationFrame(firstFrame)
      window.cancelAnimationFrame(secondFrame)
    }
  }, [hash, pathname, search])
  useDocumentMeta(pathname)
  useSectionReveal(pathname)

  return (
    <>
      <SkipLink />
      <ResourcePreloader />
      <ScrollProgress />
      <Navbar />
      <div id="main-content" className="page-transition" key={pathname} tabIndex={-1}>
        <Outlet />
      </div>
      <PageContinuation />
      <Footer />
    </>
  )
}
