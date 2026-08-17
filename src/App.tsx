import { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AppErrorBoundary } from './components/errors/AppErrorBoundary'
import { Layout } from './components/layout/Layout'
import { PageLoader } from './components/ui/PageLoader'
import { ThemeProvider } from './hooks/useTheme'
import { LanguageProvider } from './hooks/useLanguage'
import { NavigationLoader } from './components/navigation/NavigationLoader'

const Home = lazy(() => import('./pages/Home').then((module) => ({ default: module.Home })))
const About = lazy(() => import('./pages/About').then((module) => ({ default: module.About })))
const Projects = lazy(() => import('./pages/Projects').then((module) => ({ default: module.Projects })))
const ProjectDetail = lazy(() =>
  import('./pages/ProjectDetail').then((module) => ({ default: module.ProjectDetail })),
)
const Skills = lazy(() => import('./pages/Skills').then((module) => ({ default: module.Skills })))
const Experience = lazy(() => import('./pages/Experience').then((module) => ({ default: module.Experience })))
const Contact = lazy(() => import('./pages/Contact').then((module) => ({ default: module.Contact })))
const Inquiry = lazy(() => import('./pages/Inquiry').then((module) => ({ default: module.Inquiry })))
const NotFound = lazy(() => import('./pages/NotFound').then((module) => ({ default: module.NotFound })))

export default function App() {
  return (
    <AppErrorBoundary>
      <ThemeProvider>
        <LanguageProvider><BrowserRouter>
          <NavigationLoader />
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="about" element={<About />} />
                <Route path="projects" element={<Projects />} />
                <Route path="projects/:slug" element={<ProjectDetail />} />
                <Route path="skills" element={<Skills />} />
                <Route path="experience" element={<Experience />} />
                <Route path="contact" element={<Contact />} />
                <Route path="inquiry" element={<Inquiry />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </Suspense>
        </BrowserRouter></LanguageProvider>
      </ThemeProvider>
    </AppErrorBoundary>
  )
}
