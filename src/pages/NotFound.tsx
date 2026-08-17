import { Link } from 'react-router-dom'
import { useLanguage } from '../hooks/languageContext'
export function NotFound() {
  const { pick } = useLanguage()
  return (
    <main className="not-found">
      <span>404</span>
      <h1>{pick('Cette page n’existe pas.', 'This page does not exist.')}</h1>
      <Link className="button solid" to="/">
        {pick('Revenir à l’accueil', 'Back to home')}
      </Link>
    </main>
  )
}
