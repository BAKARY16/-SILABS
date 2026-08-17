import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { BrandMark } from '../ui/BrandMark'
import { useLanguage } from '../../hooks/languageContext'
export function Footer() {
  const { pick } = useLanguage()
  return (
    <footer className="site-footer">
      <div>
        <Link viewTransition className="footer-brand" to="/">
          <span className="brand-logo-frame">
            <BrandMark className="brand-logo-image" />
          </span>
          <b style={{ textTransform: 'uppercase', letterSpacing: '0.1em' }}>SILabs</b>
        </Link>
        <p>
          {pick(
            "Je conçois des sites web modernes et des applications intelligentes qui aident les entreprises à simplifier leur quotidien. Mon objectif est de transformer vos idées en outils simples, rapides et vraiment utiles pour vos utilisateurs, qu'il s'agisse d'un site vitrine, d'une plateforme sur mesure ou de solutions intégrant de l'intelligence artificielle.",
            "I design modern websites and smart applications that help businesses simplify their daily operations. My goal is to transform your ideas into tools that are simple, fast, and truly useful for your users—whether it’s a showcase website, a custom built platform, or a solution incorporating artificial intelligence.",
          )}
        </p>
      </div>
      <div className="footer-nav">
        <Link viewTransition to="/projects">
          {pick('Projets', 'Projects')}
        </Link>
        <Link viewTransition to="/about">
          {pick('À propos', 'About')}
        </Link>
        <Link viewTransition to="/contact">
          Contact
        </Link>
        <Link viewTransition to="/inquiry">
          {pick('Soumettre une demande', 'Submit a request')}
        </Link>
      </div>
      <div className="footer-social">
        <a href="https://github.com/BAKARY16" target="_blank" rel="noreferrer">
          GitHub <ArrowUpRight size={14} />
        </a>
        <a href="https://www.linkedin.com/in/bakary-sinon-29799a275" target="_blank" rel="noreferrer">
          LinkedIn <ArrowUpRight size={14} />
        </a>
      </div>
      <small>
        © 2026 <b style={{ textTransform: 'uppercase', letterSpacing: '0.1em' }}>SILabs</b> ·{' '}
        {pick('Développeur en Côte d’Ivoire', 'Developer in Côte d’Ivoire')}
      </small>
    </footer>
  )
}
