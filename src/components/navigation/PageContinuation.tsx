import { ArrowRight } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { useLanguage } from '../../hooks/languageContext'

const pages = [
  { path: '/about', eyebrow: 'Continuer avec', label: 'Mon approche' },
  { path: '/projects', eyebrow: 'Découvrir ensuite', label: 'Les projets' },
  { path: '/skills', eyebrow: 'Explorer ensuite', label: 'Les compétences' },
  { path: '/experience', eyebrow: 'Voir ensuite', label: 'Le parcours' },
  { path: '/contact', eyebrow: 'Passer à l’action', label: 'Me contacter' },
]

export function PageContinuation() {
  const { language } = useLanguage()
  const { pathname } = useLocation()
  if (pathname === '/' || pathname.startsWith('/projects/') || pathname === '/contact' || pathname === '/inquiry') return null
  const current = pages.findIndex((page) => page.path === pathname)
  const next = pages[current + 1]
  if (!next) return null

  return (
    <Link viewTransition to={next.path} className="page-continuation">
      <span>{language === 'fr' ? next.eyebrow : ({'Continuer avec':'Continue with','Découvrir ensuite':'Discover next','Explorer ensuite':'Explore next','Voir ensuite':'View next','Passer à l’action':'Take action'}[next.eyebrow] ?? next.eyebrow)}</span>
      <strong>{language === 'fr' ? next.label : ({'Mon approche':'My approach','Les projets':'Projects','Les compétences':'Skills','Le parcours':'Experience','Me contacter':'Contact me'}[next.label] ?? next.label)}</strong>
      <i>
        <ArrowRight />
      </i>
    </Link>
  )
}
