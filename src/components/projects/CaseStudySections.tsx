import { ArrowUpRight, Check, GitBranch, Layers3 } from 'lucide-react'
import type { ReactNode } from 'react'
import type { Project } from '../../types'

export function CaseOverview({ project }: { project: Project }) {
  return (
    <>
      <section className="case-overview">
        <p className="overline">01 / CONTEXTE</p>
        <h2>{project.context}</h2>
        <div>
          <span>LE PROBLÈME</span>
          <p>{project.problem}</p>
        </div>
      </section>
      <section className="case-solution">
        <div>
          <p className="overline">02 / SOLUTION</p>
          <h2>
            Une réponse pensée
            <br />
            comme un <em>système.</em>
          </h2>
        </div>
        <p>{project.solution}</p>
      </section>
    </>
  )
}

export function CaseArchitecture({ featured }: { featured?: boolean }) {
  const layers = [
    ['EXPERIENCE', 'Interface & interactions'],
    ['SERVICES', 'API & logique métier'],
    [featured ? 'INTELLIGENCE' : 'DONNÉES', featured ? 'RAG · LLM · recherche' : 'Stockage & intégration'],
    ['DATA', 'Persistance & analyse'],
  ]

  return (
    <section className="architecture-case">
      <div className="section-top">
        <div>
          <p className="overline">03 / ARCHITECTURE</p>
          <h2>{featured ? 'L’intelligence reliée au contexte.' : 'Des couches clairement reliées.'}</h2>
        </div>
        <GitBranch />
      </div>
      <div className="architecture-flow">
        {layers
          .map(([title, detail], index) => (
            <div className="architecture-step" key={title}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <b>{title}</b>
              <small>{detail}</small>
            </div>
          ))
          .reduce<ReactNode[]>(
            (items, layer, index) =>
              index === 0 ? [layer] : [...items, <i key={`arrow-${index}`}>→</i>, layer],
            [],
          )}
      </div>
    </section>
  )
}

export function CaseDelivery({ project }: { project: Project }) {
  return (
    <>
      <section className="features-case">
        <div>
          <p className="overline">04 / FONCTIONNALITÉS</p>
          <h2>
            Ce que le produit
            <br />
            <em>rend possible.</em>
          </h2>
        </div>
        <div>
          {project.features.map((feature, index) => (
            <article key={feature}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <Check />
              <p>{feature}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="tech-case">
        <div>
          <p className="overline">05 / TECHNOLOGIES</p>
          <h2>La stack.</h2>
        </div>
        <div className="large-tags">
          {project.stack.map((technology) => (
            <span key={technology}>{technology}</span>
          ))}
        </div>
      </section>
      <section className="challenge-case">
        <div>
          <p className="overline">06 / CHALLENGES</p>
          <h2>
            Les questions qui
            <br />
            structurent le projet.
          </h2>
        </div>
        <div>
          {project.challenges.map((challenge, index) => (
            <p key={challenge}>
              <span>0{index + 1}</span>
              {challenge}
            </p>
          ))}
        </div>
      </section>
    </>
  )
}

export function CaseCurrentState({ project }: { project: Project }) {
  return (
    <section className="current-state">
      <Layers3 />
      <p className="overline">07 / ÉTAT ACTUEL</p>
      <h2>{project.status}</h2>
      <p>
        Le repository public constitue la source de vérité sur l’état technique et les évolutions du projet.
      </p>
      <a href={project.github} target="_blank" rel="noreferrer">
        Consulter le code <ArrowUpRight />
      </a>
    </section>
  )
}
