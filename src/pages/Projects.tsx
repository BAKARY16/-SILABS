import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { ProjectCard } from '../components/projects/ProjectCard'
import { projects } from '../data/projects'
import type { Category } from '../types'
import { useLanguage } from '../hooks/languageContext'
const filters = ['All', 'Web', 'Data', 'AI', 'ML'] as const
export function Projects() {
  const { pick } = useLanguage()
  const [params, setParams] = useSearchParams()
  const requested = params.get('category')
  const filter = filters.includes(requested as (typeof filters)[number])
    ? (requested as (typeof filters)[number])
    : 'All'
  const shown = useMemo(
    () => (filter === 'All' ? projects : projects.filter((p) => p.category.includes(filter as Category))),
    [filter],
  )
  const selectFilter = (value: (typeof filters)[number]) =>
    setParams(value === 'All' ? {} : { category: value }, { replace: true })
  return (
    <main className="inner-page projects-page">
      <section className="projects-hero">
        <div className="projects-hero-meta">
          <span>02</span>
          <p>{pick('PROJETS SÉLECTIONNÉS', 'SELECTED PROJECTS')}</p>
        </div>
        <div className="projects-hero-copy">
          <h1>
            {pick(
              <>Des produits numériques construits pour <em>résoudre des besoins réels.</em></>,
              <>Digital products built to <em>solve real needs.</em></>,
            )}
          </h1>
          <div className="projects-hero-aside">
            <p>
              {pick(
                'Une sélection de plateformes web, de produits métier et de systèmes intelligents qui montre ma manière de relier l’expérience, les données et la technologie.',
                'A selection of web platforms, business products and intelligent systems showing how I connect experience, data and technology.',
              )}
            </p>
            <div className="projects-total" aria-label={pick(`${projects.length} projets présentés`, `${projects.length} featured projects`)}>
              <strong>{projects.length.toString().padStart(2, '0')}</strong>
              <span>{pick('projets présentés', 'featured projects')}</span>
            </div>
          </div>
        </div>
      </section>
      <section className="filter-bar" aria-label={pick('Filtrer les projets', 'Filter projects')}>
        {filters.map((f) => (
          <button
            className={filter === f ? 'active' : ''}
            aria-pressed={filter === f}
            key={f}
            onClick={() => selectFilter(f)}
          >
            {f === 'All' ? pick('Tous', 'All') : f}
            <span>
              {f === 'All'
                ? projects.length
                : projects.filter((p) => p.category.includes(f as Category)).length}
            </span>
          </button>
        ))}
      </section>
      <section className="projects-library" key={filter} aria-live="polite">
        {shown.map((project, i) => (
          <ProjectCard key={project.slug} project={project} index={i} />
        ))}
      </section>
      <section className="projects-outro">
        <header>
          <p className="overline">{pick('CE QUE CES PROJETS DÉMONTRENT / 03', 'WHAT THESE PROJECTS SHOW / 03')}</p>
          <h2>
            {pick(
              'Des solutions pensées pour être utiles, pas seulement présentées.',
              'Solutions designed to be useful, not merely displayed.',
            )}
          </h2>
          <p>
            {pick(
              'Chaque projet relie une problématique concrète à une expérience claire, une architecture cohérente et des choix techniques assumés.',
              'Each project connects a concrete problem to a clear experience, a coherent architecture and deliberate technical choices.',
            )}
          </p>
        </header>

        <ol className="projects-principles">
          <li>
            <span>01</span>
            <div>
              <h3>{pick('Comprendre le besoin', 'Understand the need')}</h3>
              <p>{pick('Identifier les utilisateurs, les contraintes et le résultat réellement attendu.', 'Identify the users, constraints and the outcome that truly matters.')}</p>
            </div>
          </li>
          <li>
            <span>02</span>
            <div>
              <h3>{pick('Construire l’ensemble', 'Build the whole')}</h3>
              <p>{pick('Relier l’interface, les services et les données dans un système facile à faire évoluer.', 'Connect interface, services and data in a system that can evolve easily.')}</p>
            </div>
          </li>
          <li>
            <span>03</span>
            <div>
              <h3>{pick('Rendre le travail visible', 'Make the work visible')}</h3>
              <p>{pick('Documenter les décisions et partager le code pour montrer ce qui existe derrière l’écran.', 'Document decisions and share the code to reveal what exists behind the screen.')}</p>
            </div>
          </li>
        </ol>

        <div className="projects-source">
          <p>{pick('Le code complète les études de cas et montre l’évolution technique des projets.', 'The code completes the case studies and shows how the projects evolve technically.')}</p>
          <a href="https://github.com/BAKARY16?tab=repositories" target="_blank" rel="noreferrer">
            {pick('Voir mes dépôts GitHub', 'View my GitHub repositories')} <ArrowUpRight />
          </a>
        </div>
      </section>
    </main>
  )
}
