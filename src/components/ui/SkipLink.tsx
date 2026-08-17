import { useLanguage } from '../../hooks/languageContext'
export function SkipLink() {
  const { pick } = useLanguage()
  return (
    <a className="skip-link" href="#main-content">
      {pick('Aller au contenu principal', 'Skip to main content')}
    </a>
  )
}
