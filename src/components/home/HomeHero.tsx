import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { TechVisual } from '../ui/TechVisual'

export function HomeHero() {
  return (
    <>
      <section className="home-hero">
        <div className="hero-main">
          <p className="availability">
            <i /> Développeur · Data · AI · Côte d’Ivoire
          </p>
          <div className="name-line">
            <span>01 / PORTFOLIO</span>
            <h1>
              SINON
              <br />
              <em>BAKARY</em>
            </h1>
          </div>
          <p className="hero-statement">
            Je conçois des produits numériques et des systèmes intelligents qui transforment un besoin réel en
            expérience utile.
          </p>
          <div className="hero-actions">
            <Link viewTransition className="button solid" to="/projects">
              Explorer les projets <ArrowRight />
            </Link>
            <Link viewTransition className="button ghost" to="/about">
              Découvrir mon parcours
            </Link>
          </div>
        </div>
        <TechVisual />
        <div className="hero-role">
          <span>DÉVELOPPEUR</span>
          <span>DATA</span>
          <span>AI</span>
        </div>
      </section>
      <section className="credibility">
        <div>
          <strong>21</strong>
          <span>
            repositories publics
            <br />
            explorés depuis 2024
          </span>
        </div>
        <div>
          <strong>03</strong>
          <span>
            territoires
            <br />
            Web · Data · IA
          </span>
        </div>
        <div>
          <strong>CI</strong>
          <span>
            solutions pensées depuis
            <br />
            la Côte d’Ivoire
          </span>
        </div>
        <p>Je construis au croisement de la technique, du produit et des réalités de terrain.</p>
      </section>
    </>
  )
}
