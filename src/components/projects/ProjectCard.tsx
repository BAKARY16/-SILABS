import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { Project } from '../../types'
import { useLanguage } from '../../hooks/languageContext'
import { preloadProject } from '../../utils/preload'
export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const { language } = useLanguage()
  const content = language === 'en' && project.en ? project.en : project
  return (
    <Link
      viewTransition
      to={`/projects/${project.slug}`}
      className={`project-card accent-${project.accent}`}
      onPointerEnter={() => preloadProject(project.slug, true)}
      onFocus={() => preloadProject(project.slug, true)}
      onTouchStart={() => preloadProject(project.slug, true)}
    >
      <div className="project-art">
        {project.image ? (
          <img
            className="project-card-image"
            src={project.image}
            alt={project.imageAlt ?? project.title}
            loading={index < 2 ? 'eager' : 'lazy'}
            decoding="async"
            fetchPriority={index < 2 ? 'high' : 'auto'}
          />
        ) : (
          <>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <div className="art-grid" />
            <b>{project.category[0]}</b>
          </>
        )}
      </div>
      <div className="card-info">
        <div>
          <p className="overline">
            {content.status} · {project.year}
          </p>
          <h2>{project.title}</h2>
          <p>{content.summary}</p>
        </div>
        <div className="card-bottom">
          <div className="mini-tags">
            {project.stack.slice(0, 3).map((s) => (
              <span key={s}>{s}</span>
            ))}
          </div>
          <span className="round-arrow">
            <ArrowUpRight />
          </span>
        </div>
      </div>
    </Link>
  )
}
