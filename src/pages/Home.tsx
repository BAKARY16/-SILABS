import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../hooks/languageContext'

const expertise = [
  [
    'Développement web',
    'Interfaces modernes, rapides et accessibles, de la conception au déploiement.',
    'https://img.magnific.com/vecteurs-libre/illustration-api-design-plat-dessine-main_23-2149365021.jpg?t=st=1786922345~exp=1786925945~hmac=113627019245bd9d1df0f774693ec8c8d0828b2d2b850b160d6c0a0ff7a0c82a&w=2000',
  ],
  [
    'Data & systèmes',
    'Structuration, analyse et exploitation des données au service de produits utiles.',
    'https://img.magnific.com/vecteurs-libre/illustration-basee-donnees-conception-plate_23-2149479220.jpg',
  ],
  [
    'Intelligence artificielle',
    'Assistants contextualisés, pipelines RAG et expériences alimentées par l’IA.',
    'https://img.magnific.com/vecteurs-libre/icone-isometrique-robot-intelligence-artificielle-mignon_1284-63045.jpg',
  ],
  [
    'Architecture produit',
    'Interfaces, API, données et déploiement réunis dans un système cohérent.',
    'https://img.magnific.com/vecteurs-libre/illustration-api-degrade_23-2149368725.jpg',
  ],
]

const work = [
  [
    'EduLab AI',
    'Plateforme éducative intelligente',
    'Intelligence artificielle',
    '/images/edulab-dashboard.png',
    '/projects/edulab-ai',
  ],
  [
    'Village Connecté',
    'Connectivité rurale et services numériques',
    'Produit digital',
    '/images/Village-connecte.png',
    '/projects/village-connecte',
  ],
]

const testimonials = [
  {
    quote:
      "Je suis tombé sur ton portfolio par hasard en cherchant des projets mêlant UX et GenAI. Franchement, la démo d'EduLab AI est ultra propre ! On sent tout de suite qu'il y a une vraie réflexion produit derrière et pas juste un appel d'API posé là. Bravo pour le boulot.",
    quoteEn:
      "I stumbled upon your portfolio by chance while looking for projects that combine UX and GenAI. Honestly, the EduLab AI demo is incredibly polished! You can immediately tell there’s real product thinking behind it, rather than just a random API call tacked on. Great work.",
    name: 'Aminata Koné',
    role: 'Cheffe de projet digital',
    roleEn: 'Digital Project Manager',
    image: '/images/testimonial-aminata.jpg',
  },
  {
    quote:
    "Super rafraîchissant de tomber sur un profil qui maîtrise la tech tout en gardant une vision très pragmatique. La présentation de tes cas d'usage (notamment sur la partie data) donne direct envie de collaborer. Je garde ton contact sous le coude pour nos futurs besoins !",
    quoteEn:
      "It’s really refreshing to come across someone who has a solid grasp of tech while maintaining a very pragmatic approach. The way you present your use cases—especially regarding data—makes me want to collaborate right away. I’m keeping your details on hand for our future needs!",
    name: 'Jean-Marc Kouassi',
    role: 'Ingénieur logiciel',
    roleEn: 'Software Engineer',
    image: '/images/testimonial-jean-marc.jpg',
  },
  {
    quote:
      "Très beau travail sur l'architecture et la clarté du site. C'est rare de voir des portfolios où la frontière entre la data, le ML et le web est aussi bien expliquée. Ça se voit que tu sais de quoi tu parles !",
    quoteEn:
      "Great work on the site's architecture and clarity. It’s rare to see portfolios where the boundary between data, ML, and the web is explained so well. You can tell you know what you're talking about!",
    name: 'Mariam Ouédraogo',
    role: 'Responsable innovation & Data',
    roleEn: 'Innovation & Data Lead',
    image: '/images/testimonial-mariam.jpg',
  },
]

export function Home() {
  const { language, pick } = useLanguage()
  const expertiseTrack = useRef<HTMLDivElement>(null)

  function moveExpertise(direction: -1 | 1) {
    const track = expertiseTrack.current
    if (!track) return
    const card = track.querySelector<HTMLElement>('.bf-expertise-card')
    if (!card) return
    const gap = Number.parseFloat(getComputedStyle(track).columnGap || '0')
    const step = card.offsetWidth + gap
    const atStart = track.scrollLeft <= 4
    const atEnd = track.scrollLeft >= track.scrollWidth - track.clientWidth - 4

    if (direction === 1 && atEnd) track.scrollTo({ left: 0, behavior: 'smooth' })
    else if (direction === -1 && atStart) track.scrollTo({ left: track.scrollWidth, behavior: 'smooth' })
    else track.scrollBy({ left: direction * step, behavior: 'smooth' })
  }

  return (
    <main className="bf-home">
      <section className="bf-section bf-hero">
        <div className="bf-container bf-hero-grid">
          <div className="bf-hero-copy">
            <p className="bf-tech-label">FULL STACK · MACHINE LEARNING · GENAI</p>
            <h1>
              <span className="bf-hero-name" style={{ color: 'var(--text)' }}>
                {' '}
                BAKARY SINON
              </span>
              <br />
              <span>Full stack dev & Machine Learning</span>
            </h1>
            <p>
              {pick(
                'Je conçois des produits numériques complets, de l’interface aux modèles intelligents, pour transformer un besoin réel en système fiable.',
                'I design complete digital products, from interfaces to intelligent models, turning real needs into reliable systems.',
              )}
            </p>
            <div className="bf-buttons">
              <Link className="bf-button primary" to="/contact">
                {pick('Me contacter', 'Contact me')}
              </Link>
              <Link className="bf-button secondary" to="/projects">
                {pick('Voir mon portfolio', 'View my portfolio')}
              </Link>
            </div>
          </div>
          <div className="bf-hero-visual">
            <img
              className="bf-hero-image"
              src="/images/fullstack-ai-hero.png"
              alt={pick(
                'Architecture Full Stack, Machine Learning et intelligence artificielle générative',
                'Full Stack, Machine Learning and generative AI architecture',
              )}
            />
          </div>
        </div>
      </section>
      <section className="bf-section bf-expertise">
        <div className="bf-container">
          <div className="bf-section-intro narrow">
            <div className="bf-accent" />
            <h2>{pick('Mes expertises', 'My expertise')}</h2>
            <p>
              {pick(
                'Je travaille à l’intersection du développement, de la donnée et de l’intelligence artificielle.',
                'I work at the intersection of development, data and artificial intelligence.',
              )}
            </p>
          </div>
          <div className="bf-expertise-grid" ref={expertiseTrack} aria-label="Carrousel de mes expertises">
            {expertise.map(([title, text, image]) => (
              <article className="bf-expertise-card" key={title}>
                <img src={image} alt="" />
                <h3>
                  {language === 'en'
                    ? (
                        {
                          'Développement web': 'Web development',
                          'Data & systèmes': 'Data & systems',
                          'Intelligence artificielle': 'Artificial intelligence',
                          'Architecture produit': 'Product architecture',
                        } as Record<string, string>
                      )[title]
                    : title}
                </h3>
                <p>
                  {language === 'en'
                    ? (
                        {
                          'Développement web':
                            'Modern, fast and accessible interfaces, from design to deployment.',
                          'Data & systèmes':
                            'Data structure, analysis and use in service of useful products.',
                          'Intelligence artificielle':
                            'Context-aware assistants, RAG pipelines and AI-powered experiences.',
                          'Architecture produit':
                            'Interfaces, APIs, data and deployment combined into one coherent system.',
                        } as Record<string, string>
                      )[title]
                    : text}
                </p>
              </article>
            ))}
          </div>
          <div className="bf-slider-actions">
            <button
              type="button"
              onClick={() => moveExpertise(-1)}
              aria-label={pick('Afficher l’expertise précédente', 'Show previous expertise')}
            >
              <ArrowLeft />
            </button>
            <button
              type="button"
              onClick={() => moveExpertise(1)}
              aria-label={pick('Afficher l’expertise suivante', 'Show next expertise')}
            >
              <ArrowRight />
            </button>
          </div>
        </div>
      </section>
      <section className="bf-section bf-portfolio">
        <div className="bf-container">
          <div className="bf-heading-row">
            <div>
              <div className="bf-accent" />
              <h2>{pick('Mon portfolio', 'My portfolio')}</h2>
            </div>
            <p>
              {pick(
                'Une sélection de plateformes et d’expériences qui montre les différentes dimensions de mon travail.',
                'A selection of platforms and experiences showing the different dimensions of my work.',
              )}
            </p>
          </div>
          <div className="bf-work-grid">
            {work.map(([title, text, category, image, path]) => (
              <Link className="bf-work-card" to={path} key={title}>
                <img src={image} alt="" />
                <div className="bf-work-copy">
                  <span>
                    {language === 'en'
                      ? (
                          {
                            'Intelligence artificielle': 'Artificial intelligence',
                            'Produit digital': 'Digital product',
                          } as Record<string, string>
                        )[category]
                      : category}
                  </span>
                  <h3>{title}</h3>
                  <p>
                    {language === 'en'
                      ? (
                          {
                            'EduLab AI': 'Intelligent education platform',
                            'Village Connecté': 'Rural connectivity and digital services',
                          } as Record<string, string>
                        )[title]
                      : text}
                  </p>
                  <b>
                    {pick('Voir l’étude de cas', 'View case study')} <ArrowUpRight />
                  </b>
                </div>
              </Link>
            ))}
          </div>
          <Link className="bf-featured" to="/projects">
            <img
              src="https://cdn.prod.website-files.com/5f68b761049650bd498e2649/5f6e41c69d7ea85071f00068_image-portfolio-01-designer-template.png"
              alt={pick('Tous les projets', 'All projects')}
            />
            <div>
              <span>{pick('Portfolio complet', 'Complete portfolio')}</span>
              <h3>{pick('Découvrir tous mes projets', 'Discover all my projects')}</h3>
              <p>
                {pick('Web, Data et Intelligence artificielle.', 'Web, Data and Artificial Intelligence.')}
              </p>
              <b>
                {pick('Voir le portfolio', 'View portfolio')} <ArrowUpRight />
              </b>
            </div>
          </Link>
        </div>
      </section>
      <section className="bf-follow">
        <div className="bf-container bf-follow-inner">
          <h2>
            {pick(
              'Vous aimez mon travail ? Suivez-moi et découvrez mes prochains projets',
              'Like my work? Follow me and discover my next projects',
            )}
          </h2>
          <p>
            {pick(
              'Retrouvez mon code, mes expérimentations et l’évolution de mes produits.',
              'Follow my code, experiments and product evolution.',
            )}
          </p>
          <div className="bf-follow-links">
            <a href="https://github.com/BAKARY16" target="_blank" rel="noreferrer">
              GitHub
            </a>
            <a href="https://www.linkedin.com/in/bakary-sinon-29799a275" target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          </div>
        </div>
      </section>
      <section className="bf-cta">
        <div className="bf-container">
          <div className="bf-accent light" />
          <h2>
            {pick(
              'Faisons décoller votre prochain projet ensemble',
              'Let’s launch your next project together',
            )}
          </h2>
          <p>
            {pick(
              'Un besoin métier, une plateforme à structurer ou une idée Data/IA à transformer en produit ?',
              'A business need, a platform to structure or a Data/AI idea to turn into a product?',
            )}
          </p>
          <Link className="bf-button secondary" to="/inquiry">
            {pick('Soumettre un projet', 'Submit a project')}
          </Link>
        </div>
      </section>
      <section className="bf-section bf-about">
        <div className="bf-container bf-about-grid">
          <div className="bf-about-images">
            <img src="images/bakary.jpeg" alt="" />
            <img
              src="images/Bakary2.jpeg"
              alt=""
            />
          </div>
          <div>
            <div className="bf-accent" />
            <h2>{pick('À propos de moi', 'About me')}</h2>
            <p>
              {pick(
                'Mon parcours part du développement web et s’étend aujourd’hui aux plateformes full-stack, à la donnée et aux systèmes d’intelligence artificielle.',
                'My journey began with web development and now extends to full-stack platforms, data and artificial intelligence systems.',
              )}
            </p>
            <p>
              {pick(
                'Je m’intéresse particulièrement aux usages éducatifs, aux services métier et aux problématiques locales africaines.',
                'I am particularly interested in educational applications, business services and local African challenges.',
              )}
            </p>
            <Link className="bf-button primary" to="/about">
              {pick('En savoir plus', 'Learn more')}
            </Link>
          </div>
        </div>
      </section>
      <section className="bf-section bf-testimonials">
        <div className="bf-container">
          <div className="bf-section-intro">
            <div className="bf-accent" />
            <h2>{pick('Ce que mon approche apporte', 'What my approach brings')}</h2>
            <p>
              {pick(
                'Des retours représentatifs des qualités recherchées dans une collaboration produit : écoute, clarté et maîtrise technique.',
                'Representative feedback on the qualities that matter in product collaboration: listening, clarity and technical expertise.',
              )}
            </p>
          </div>
          <div className="bf-testimonial-grid">
            {testimonials.map(({ quote, quoteEn, name, role, roleEn, image }) => (
              <article key={name}>
                <p>“{language === 'en' ? quoteEn : quote}”</p>
                <div>
                  <img
                    src={image}
                    alt={pick(`Portrait représentatif de ${name}`, `Representative portrait of ${name}`)}
                    loading="lazy"
                    decoding="async"
                  />
                  <span>
                    <strong>{name}</strong>
                    <small>{language === 'en' ? roleEn : role}</small>
                  </span>
                </div>
              </article>
            ))}
          </div>
          <Link className="bf-button primary" to="/contact">
            {pick('Me contacter', 'Contact me')}
          </Link>
        </div>
      </section>
    </main>
  )
}
