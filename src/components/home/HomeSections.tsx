import {
  ArrowRight,
  ArrowUpRight,
  Braces,
  Code2,
  Database,
  Layers3,
  MapPin,
  Network,
  Sparkles,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { projects } from '../../data/projects'
import { ProjectCard } from '../projects/ProjectCard'

const expertise = [
  {
    icon: Braces,
    index: '01',
    title: 'Développement produit',
    text: 'Des interfaces React et Next.js jusqu’aux services Node.js, avec une attention portée à l’usage et à la maintenabilité.',
    tone: 'purple',
  },
  {
    icon: Database,
    index: '02',
    title: 'Data & systèmes',
    text: 'Des données structurées, analysées et reliées aux applications avec PostgreSQL, MySQL, Supabase et Python.',
    tone: 'blue',
  },
  {
    icon: Sparkles,
    index: '03',
    title: 'Intelligence appliquée',
    text: 'Des assistants contextualisés, pipelines RAG et expériences alimentées par les modèles de langage.',
    tone: 'pink',
  },
  {
    icon: Network,
    index: '04',
    title: 'Architecture & intégration',
    text: 'Des plateformes complètes où interfaces, API, données et déploiement fonctionnent comme un même système.',
    tone: 'lilac',
  },
]

export function ExpertiseSection() {
  return (
    <section className="home-expertise">
      <div className="home-section-heading">
        <div>
          <p className="overline">MES EXPERTISES / 02</p>
          <h2>
            Plusieurs disciplines,
            <br />
            une même logique : <em>construire utile.</em>
          </h2>
        </div>
        <div>
          <p>
            Je travaille à l’intersection du développement, de la donnée et de l’intelligence artificielle
            pour transformer un problème concret en produit exploitable.
          </p>
          <Link viewTransition to="/skills" className="inline-link">
            Voir toutes mes compétences <ArrowUpRight />
          </Link>
        </div>
      </div>
      <div className="expertise-cards">
        {expertise.map(({ icon: Icon, index, title, text, tone }) => (
          <article className={`expertise-card tone-${tone}`} key={title}>
            <div>
              <Icon />
              <span>{index}</span>
            </div>
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

export function SelectedWork() {
  return (
    <section className="selected-work">
      <div className="home-section-heading">
        <div>
          <p className="overline">MON PORTFOLIO / 04</p>
          <h2>
            Des idées transformées
            <br />
            en <em>solutions concrètes.</em>
          </h2>
        </div>
        <div>
          <p>
            Une sélection de plateformes métier et d’expériences intelligentes qui montre différentes
            dimensions de mon travail.
          </p>
          <Link viewTransition to="/projects" className="inline-link">
            Parcourir tous les projets <ArrowUpRight />
          </Link>
        </div>
      </div>
      <div className="selected-grid">
        {projects.slice(1, 4).map((project, index) => (
          <ProjectCard key={project.slug} project={project} index={index + 1} />
        ))}
      </div>
    </section>
  )
}

export function OpenSourceBand() {
  return (
    <section className="open-source-band">
      <div className="open-source-mark">
        <Code2 />
      </div>
      <div>
        <p className="overline">OPEN SOURCE / GITHUB</p>
        <h2>Suivre les projets pendant qu’ils évoluent.</h2>
        <p>
          Les repositories publics montrent le code, les choix techniques, la documentation et la progression
          derrière chaque produit.
        </p>
      </div>
      <a className="button solid" href="https://github.com/BAKARY16" target="_blank" rel="noreferrer">
        Explorer GitHub <ArrowUpRight />
      </a>
    </section>
  )
}

export function HomeCallToAction() {
  return (
    <section className="home-cta">
      <p className="overline">COLLABORATION / 06</p>
      <h2>
        Faisons avancer votre prochain
        <br />
        projet <em>ensemble.</em>
      </h2>
      <p>Un besoin métier, une plateforme à structurer ou une idée Data/IA à transformer en produit ?</p>
      <Link viewTransition className="button cta-light" to="/contact">
        Démarrer une conversation <ArrowRight />
      </Link>
    </section>
  )
}

export function AboutPreview() {
  return (
    <section className="about-preview">
      <div className="about-portrait" aria-hidden="true">
        <div className="portrait-orbit">
          <span>WEB</span>
          <span>DATA</span>
          <span>AI</span>
        </div>
        <strong>SB</strong>
        <small>
          <MapPin /> CÔTE D’IVOIRE
        </small>
      </div>
      <div className="about-preview-copy">
        <p className="overline">À PROPOS DE MOI / 07</p>
        <h2>
          J’apprends en construisant,
          <br />
          et je construis <em>avec contexte.</em>
        </h2>
        <p>
          Mon parcours part du développement web et s’étend aujourd’hui aux plateformes full-stack, à la
          donnée et aux systèmes d’intelligence artificielle. Mon intérêt se porte particulièrement sur les
          usages éducatifs, les services métier et les problématiques locales africaines.
        </p>
        <Link viewTransition to="/about" className="button solid">
          Découvrir mon parcours <ArrowRight />
        </Link>
      </div>
    </section>
  )
}

const evidence = [
  {
    label: 'Éducation & IA',
    title: 'EduLab AI',
    text: 'Une architecture documentée associant Next.js, FastAPI, PostgreSQL, pgvector et un pipeline RAG.',
  },
  {
    label: 'Infrastructure locale',
    title: 'Village Connecté',
    text: 'Une plateforme pour piloter des bornes Wi-Fi solaires, un portail captif et des vouchers en milieu rural.',
  },
  {
    label: 'Progression publique',
    title: '21 repositories',
    text: 'Un historique GitHub qui retrace le passage des fondations web aux plateformes Data et IA.',
  },
]

export function EvidenceSection() {
  return (
    <section className="evidence-section">
      <div className="home-section-heading">
        <div>
          <p className="overline">DES PREUVES, PAS DES PROMESSES / 08</p>
          <h2>
            Le travail parle à travers
            <br />
            ce qui est <em>construit.</em>
          </h2>
        </div>
        <p>
          Plutôt que d’afficher des témoignages inventés, voici trois éléments vérifiables qui résument mon
          approche.
        </p>
      </div>
      <div className="evidence-cards">
        {evidence.map((item, index) => (
          <article key={item.title}>
            <div>
              <Layers3 />
              <span>0{index + 1}</span>
            </div>
            <p className="overline">{item.label}</p>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </article>
        ))}
      </div>
      <Link viewTransition to="/projects" className="button ghost">
        Vérifier dans les projets <ArrowRight />
      </Link>
    </section>
  )
}
