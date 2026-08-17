import { projects } from '../data/projects'

type NetworkInformation = {
  saveData?: boolean
  effectiveType?: string
}

const loadedRoutes = new Set<string>()
const loadedImages = new Set<string>()
const preparedVideos = new Set<string>()
const prefetchedVideos = new Set<string>()

const routeLoaders: Record<string, () => Promise<unknown>> = {
  '/': () => import('../pages/Home'),
  '/about': () => import('../pages/About'),
  '/projects': () => import('../pages/Projects'),
  '/skills': () => import('../pages/Skills'),
  '/experience': () => import('../pages/Experience'),
  '/contact': () => import('../pages/Contact'),
  '/inquiry': () => import('../pages/Inquiry'),
}

const connection = () =>
  (navigator as Navigator & { connection?: NetworkInformation }).connection

const allowsHeavyPrefetch = () => {
  const current = connection()
  return !current?.saveData && !['slow-2g', '2g'].includes(current?.effectiveType ?? '')
}

const normalizePath = (path: string) => {
  if (path.startsWith('/projects/')) return '/projects/:slug'
  return path
}

export function preloadRoute(path: string) {
  const normalized = normalizePath(path)
  if (loadedRoutes.has(normalized)) return
  loadedRoutes.add(normalized)

  const loader =
    normalized === '/projects/:slug'
      ? () => import('../pages/ProjectDetail')
      : routeLoaders[normalized]
  void loader?.()
}

export function preloadImage(source?: string) {
  if (!source || loadedImages.has(source)) return
  loadedImages.add(source)
  const image = new Image()
  image.decoding = 'async'
  image.src = source
}

export function prepareVideo(source?: string) {
  if (!source || preparedVideos.has(source) || !allowsHeavyPrefetch()) return
  preparedVideos.add(source)
  const video = document.createElement('video')
  video.preload = 'metadata'
  video.muted = true
  video.src = source
  video.load()
}

export function prefetchVideo(source?: string) {
  if (!source || prefetchedVideos.has(source) || !allowsHeavyPrefetch()) return
  prefetchedVideos.add(source)
  const link = document.createElement('link')
  link.rel = 'prefetch'
  link.href = source
  link.as = 'video'
  document.head.append(link)
}

export function preloadProject(slug: string, withVideo = false) {
  const project = projects.find((item) => item.slug === slug)
  preloadRoute(`/projects/${slug}`)
  preloadImage(project?.image)
  prepareVideo(project?.video)
  if (withVideo) prefetchVideo(project?.video)
}

export function schedulePortfolioPreload() {
  let cancelled = false
  const runWhenIdle = (task: () => void, timeout = 1800) => {
    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(task, { timeout })
    } else {
      globalThis.setTimeout(task, 250)
    }
  }

  runWhenIdle(() => {
    if (cancelled) return
    Object.keys(routeLoaders).forEach(preloadRoute)
    preloadRoute('/projects/:slug')
  })

  runWhenIdle(() => {
    if (cancelled) return
    preloadImage('/images/cta-laptop-glasses.jpg')
    preloadImage('/images/testimonial-aminata.jpg')
    preloadImage('/images/testimonial-jean-marc.jpg')
    preloadImage('/images/testimonial-mariam.jpg')
    projects.forEach((project) => preloadImage(project.image))
  }, 2600)

  runWhenIdle(() => {
    if (cancelled || !allowsHeavyPrefetch()) return
    projects.forEach((project) => prepareVideo(project.video))
  }, 4000)

  return () => {
    cancelled = true
  }
}
