import { useEffect } from 'react'

export function useSectionReveal(pathname: string) {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let observer: IntersectionObserver | undefined
    const frame = requestAnimationFrame(() => {
      const sections = document.querySelectorAll<HTMLElement>('main > section')
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return
            entry.target.classList.add('is-visible')
            observer?.unobserve(entry.target)
          })
        },
        { threshold: 0.08, rootMargin: '0px 0px -8%' },
      )

      sections.forEach((section, index) => {
        section.classList.add('reveal-section')
        section.style.setProperty('--reveal-order', String(Math.min(index, 3)))
        observer?.observe(section)
      })
    })

    return () => {
      cancelAnimationFrame(frame)
      observer?.disconnect()
    }
  }, [pathname])
}
