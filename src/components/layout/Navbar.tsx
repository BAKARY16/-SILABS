import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { ArrowUpRight, Menu, Moon, Sun, X } from 'lucide-react'
import { useTheme } from '../../hooks/themeContext'
import { NAVIGATION } from '../../config/site'
import { BrandMark } from '../ui/BrandMark'
import { useLanguage } from '../../hooks/languageContext'

export function Navbar() {
  const [open, setOpen] = useState(false)
  const { theme, toggle } = useTheme()
  const { language, toggleLanguage, pick } = useLanguage()
  useEffect(() => {
    document.body.classList.toggle('menu-open', open)
    const close = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', close)
    return () => {
      document.body.classList.remove('menu-open')
      window.removeEventListener('keydown', close)
    }
  }, [open])
  return (
    <header className="site-nav">
      <Link viewTransition to="/" className="brand" onClick={() => setOpen(false)}>
        <span className="brand-logo-frame"><BrandMark className="brand-logo-image" /></span>
        <b style={{ textTransform: 'uppercase', letterSpacing: '0.1em' }}>SILabs</b>
      </Link>
      <nav
        id="primary-navigation"
        className={open ? 'nav-links is-open' : 'nav-links'}
        aria-label={pick('Navigation principale', 'Primary navigation')}
      >
        {NAVIGATION.map(({ label, path }) => (
          <NavLink viewTransition key={path} to={path} end={path === '/'} onClick={() => setOpen(false)}>
            {language === 'fr' ? ({ Home: 'Accueil', About: 'A propos', Projects: 'Projets', Skills: 'Compétences', Experience: 'Expérience', Contact: 'Contact' } as Record<string, string>)[label] : label}
          </NavLink>
        ))}
        <Link viewTransition to="/inquiry" className="bf-button primary" onClick={() => setOpen(false)}>
          {pick('Soumettre une demande', 'Submit a request')} <ArrowUpRight size={14} />
        </Link>
      </nav>
      {open && <button className="nav-backdrop" onClick={() => setOpen(false)} aria-label={pick('Fermer le menu', 'Close menu')} />}
      <div className="nav-tools">
        <button onClick={toggleLanguage} className="language-button" aria-label={pick('Passer en anglais', 'Switch to French')}>
          {language === 'fr' ? 'EN' : 'FR'}
        </button>
        <button
          onClick={toggle}
          className="icon-button"
          aria-label={theme === 'dark' ? pick('Activer le thème clair', 'Use light theme') : pick('Activer le thème sombre', 'Use dark theme')}
        >
          {theme === 'dark' ? <Sun /> : <Moon />}
        </button>
        <button
          className="menu-button"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls="primary-navigation"
          aria-label={open ? pick('Fermer le menu', 'Close menu') : pick('Ouvrir le menu', 'Open menu')}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
    </header>
  )
}
