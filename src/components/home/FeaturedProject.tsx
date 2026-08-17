import { ArrowRight, ArrowUpRight, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'

export function FeaturedProject() {
  return (
    <section className="featured-project">
      <div className="section-top">
        <p className="overline">FEATURED PROJECT / 03</p>
        <Link viewTransition to="/projects">
          Tous les projets <ArrowRight />
        </Link>
      </div>
      <Link viewTransition to="/projects/edulab-ai" className="featured-shell">
        <div className="featured-content">
          <span className="status">
            <i /> En développement
          </span>
          <h2>
            EduLab
            <br />
            <em>AI</em>
          </h2>
          <p>
            Une plateforme éducative intelligente pour accompagner les élèves ivoiriens, enrichie par la
            recherche documentaire et l’IA générative.
          </p>
          <div className="mini-tags">
            <span>Next.js</span>
            <span>FastAPI</span>
            <span>RAG</span>
            <span>pgvector</span>
          </div>
          <span className="inline-link">
            Voir l’étude de cas <ArrowUpRight />
          </span>
        </div>
        <div className="featured-diagram">
          <div className="screen screen-main">
            <b>EDULAB / LEARN</b>
            <div className="chart">
              <i />
              <i />
              <i />
              <i />
              <i />
            </div>
            <p>Progression pédagogique</p>
          </div>
          <div className="screen screen-ai">
            <Sparkles />
            <b>Professeur IA</b>
            <small>Contexte trouvé · réponse enrichie</small>
          </div>
          <div className="data-pill">
            VECTOR STORE <i />
          </div>
        </div>
      </Link>
    </section>
  )
}
