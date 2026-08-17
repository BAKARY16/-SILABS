import { ArrowLeft, ArrowRight, ArrowUpRight, Check, Code2, GitBranch, Layers3 } from 'lucide-react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { getProject, projects } from '../data/projects'
import { useLanguage } from '../hooks/languageContext'

export function ProjectDetail() {
  const { language, pick } = useLanguage()
  const { slug } = useParams()
  const project = getProject(slug)
  if (!project) return <Navigate to="/projects" replace />
  const next = projects[(projects.indexOf(project) + 1) % projects.length]
  const content = language === 'en' && project.en ? project.en : project
  const architecture = [
    [
      '01',
      pick('Expérience', 'Experience'),
      pick('Interfaces et interactions', 'Interfaces and interactions'),
    ],
    ['02', pick('Services', 'Services'), pick('API et logique métier', 'API and business logic')],
    [
      '03',
      project.featured ? pick('Intelligence', 'Intelligence') : pick('Données', 'Data'),
      project.featured
        ? pick('RAG, LLM et recherche', 'RAG, LLM and retrieval')
        : pick('Stockage et intégration', 'Storage and integration'),
    ],
    ['04', 'Data', pick('Persistance et analyse', 'Persistence and analysis')],
  ]

  return (
    <main className="pd-page">
      <header className="pd-hero">
        <div className="pd-shell">
          <Link viewTransition to="/projects" className="pd-back">
            <ArrowLeft /> {pick('Retour aux projets', 'Back to projects')}
          </Link>
          <div className="pd-heading">
            <div>
              <p className="pd-kicker">
                {pick('Étude de cas', 'Case study')} · {project.year}
              </p>
              <h1>{project.title}</h1>
            </div>
            <div className="pd-intro">
              <p>{content.summary}</p>
              <div className="pd-actions">
                <a href={project.github} target="_blank" rel="noreferrer">
                  GitHub <ArrowUpRight />
                </a>
                {project.live && (
                  <a href={project.live} target="_blank" rel="noreferrer" className="secondary">
                    {pick('Voir la démo', 'View demo')} <ArrowUpRight />
                  </a>
                )}
              </div>
            </div>
          </div>
          <dl className="pd-facts">
            <div>
              <dt>{pick('Discipline', 'Discipline')}</dt>
              <dd>{project.category.join(' · ')}</dd>
            </div>
            <div>
              <dt>{pick('Technologie principale', 'Main technology')}</dt>
              <dd>{project.language}</dd>
            </div>
            <div>
              <dt>{pick('Statut', 'Status')}</dt>
              <dd>
                <i />
                {content.status}
              </dd>
            </div>
            <div>
              <dt>{pick('Année', 'Year')}</dt>
              <dd>{project.year}</dd>
            </div>
          </dl>
          <figure className="pd-cover">
            {project.video ? (
              <video
                src={project.video}
                poster={project.image}
                aria-label={`${pick('Démonstration vidéo de', 'Video demonstration of')} ${project.title}`}
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
              />
            ) : project.image ? (
              <img src={project.image} alt={project.imageAlt ?? project.title} />
            ) : (
              <div className="pd-cover-placeholder">
                <Code2 />
                <span>{project.title}</span>
              </div>
            )}
            <figcaption>
              {pick('Interface principale', 'Main interface')} · {project.title}
            </figcaption>
          </figure>
        </div>
      </header>

      <section className="pd-story pd-shell">
        <div className="pd-section-label">
          <span>01</span> {pick('Contexte', 'Context')}
        </div>
        <div className="pd-story-main">
          <h3 style={{ letterSpacing: '0.09em', textAlign: 'justify' }}>{content.context}</h3>
        </div>
        <aside className="pd-note">
          <span>{pick('Le problème', 'The problem')}</span>
          <p>{content.problem}</p>
        </aside>
      </section>

      <section className="pd-solution">
        <div className="pd-shell pd-split">
          <div>
            <div className="pd-section-label light">
              <span>02</span> Solution
            </div>
            <h2>
              {pick(
                'Une réponse conçue comme un système complet.',
                'A solution designed as a complete system.',
              )}
            </h2>
          </div>
          <p>{content.solution}</p>
        </div>
      </section>

      <section className="pd-section pd-shell">
        <div className="pd-section-head">
          <div>
            <div className="pd-section-label">
              <span>03</span> Architecture
            </div>
            <h2>{pick('Des couches clairement reliées.', 'Clearly connected layers.')}</h2>
          </div>
          <GitBranch />
        </div>
        <div className="pd-architecture">
          {architecture.map(([number, title, detail], index) => (
            <article key={title}>
              <span>{number}</span>
              <div>
                <h3>{title}</h3>
                <p>{detail}</p>
              </div>
              {index < architecture.length - 1 && <ArrowRight />}
            </article>
          ))}
        </div>
      </section>

      <section className="pd-section pd-shell pd-delivery">
        <div className="pd-section-head">
          <div>
            <div className="pd-section-label">
              <span>04</span> {pick('Fonctionnalités', 'Features')}
            </div>
            <h2>{pick('Ce que le produit rend possible.', 'What the product makes possible.')}</h2>
          </div>
          <span className="pd-count">{String(content.features.length).padStart(2, '0')}</span>
        </div>
        <div className="pd-feature-grid">
          {content.features.map((feature, index) => (
            <article key={feature}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <Check />
              <p>{feature}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="pd-stack">
        <div className="pd-shell pd-stack-grid">
          <div>
            <div className="pd-section-label light">
              <span>05</span> Technologies
            </div>
            <h2>
              {pick('Une stack moderne, choisie pour le produit.', 'A modern stack chosen for the product.')}
            </h2>
          </div>
          <div className="pd-tags">
            {project.stack.map((technology) => (
              <span key={technology}>{technology}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="pd-section pd-shell pd-challenges">
        <div>
          <div className="pd-section-label">
            <span>06</span> {pick('Enjeux', 'Challenges')}
          </div>
          <h2>{pick('Les défis qui structurent le projet.', 'The challenges shaping the project.')}</h2>
        </div>
        <div className="pd-challenge-list">
          {content.challenges.map((challenge, index) => (
            <article key={challenge}>
              <span>0{index + 1}</span>
              <p>{challenge}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="pd-closing pd-shell">
        <div className="pd-status-card">
          <Layers3 />
          <span>{pick('État actuel', 'Current status')}</span>
          <h2>{content.status}</h2>
          <p>
            {pick(
              'Le dépôt public documente l’état technique et les prochaines évolutions du projet.',
              'The public repository documents the technical status and next developments of the project.',
            )}
          </p>
          <a href={project.github} target="_blank" rel="noreferrer">
            {pick('Consulter le code', 'View the code')} <ArrowUpRight />
          </a>
        </div>
        <Link viewTransition to={`/projects/${next.slug}`} className="pd-next">
          <span>{pick('Projet suivant', 'Next project')}</span>
          <h2>{next.title}</h2>
          <ArrowUpRight />
        </Link>
      </section>
    </main>
  )
}
