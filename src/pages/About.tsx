import { Compass, Layers3, Lightbulb } from 'lucide-react'
import { PageHeader } from '../components/ui/PageHeader'
import { timeline } from '../data/experience'
import { useLanguage } from '../hooks/languageContext'
export function About() {
  const { language, pick } = useLanguage()
  return (
    <main className="inner-page about-page">
      <PageHeader
        index="01"
        eyebrow={pick('À propos', 'About')}
        title={
          <>
            {pick(
              <>
                Je construis avec <em>curiosité</em>, méthode et contexte.
              </>,
              <>
                I build with <em>curiosity</em>, method and context.
              </>,
            )}
          </>
        }
        lead={pick(
          'Développeur orienté produit, data et intelligence artificielle, je cherche à créer des systèmes utiles plutôt qu’à accumuler des technologies.',
          'A product, data and AI-oriented developer, I focus on building useful systems rather than collecting technologies.',
        )}
        aside={
          <div className="about-portrait">
            <img
              src="/images/BAKARY_SINON.png"
              alt={pick('Portrait de Sinon Bakary', 'Portrait of Sinon Bakary')}
            />
            <div>
              <b>SINON BAKARY</b>
            </div>
          </div>
        }
      />
      <section className="editorial-story">
        <div className="story-heading">
          <p className="overline">{pick('MON PARCOURS / 01', 'MY JOURNEY / 01')}</p>
          <h2>{pick('Du web aux systèmes intelligents.', 'From the web to intelligent systems.')}</h2>
        </div>
        <div>
          <p className="story-lead">
            {pick(
              'Mon parcours commence par le web : comprendre comment une interface prend vie, comment les données circulent et comment un produit devient utilisable.',
              'My journey began with the web: understanding how an interface comes alive, how data flows and how a product becomes usable.',
            )}
          </p>
          <p>
            {pick(
              'À mesure que mes projets ont grandi, mon champ s’est élargi vers les API, les bases de données, les architectures full-stack et le déploiement. Cette progression m’a naturellement conduit vers la Data et l’IA — non comme des effets de mode, mais comme de nouveaux outils pour résoudre des problèmes plus complexes.',
              'As my projects grew, my scope expanded to APIs, databases, full-stack architectures and deployment. This progression naturally led me to Data and AI — not as trends, but as new tools for solving more complex problems.',
            )}
          </p>
          <p>
            {pick(
              'Aujourd’hui, je travaille particulièrement sur des usages éducatifs et des plateformes ancrées dans des contextes ivoiriens et africains : accès au numérique, services métier, accompagnement académique et apprentissage personnalisé.',
              'Today, I focus particularly on educational uses and platforms rooted in Ivorian and African contexts: digital access, business services, academic support and personalized learning.',
            )}
          </p>
        </div>
      </section>
      <section className="work-method">
        <div className="work-method-heading">
          <div>
            <p className="overline">{pick('COMMENT JE TRAVAILLE / 02', 'HOW I WORK / 02')}</p>
            <h2>
              {pick(
                'Une approche claire, du besoin jusqu’au produit.',
                'A clear approach, from need to product.',
              )}
            </h2>
          </div>
          <p>
            {pick(
              'Je combine développement full-stack, données et intelligence artificielle pour construire des solutions adaptées à leur contexte.',
              'I combine full-stack development, data and artificial intelligence to build solutions adapted to their context.',
            )}
          </p>
        </div>
        <div className="work-method-cards">
          {[
            {
              icon: Compass,
              number: '01',
              title: pick('Comprendre le besoin', 'Understand the need'),
              text: pick(
                'J’analyse le problème, les utilisateurs et les contraintes avant de choisir les technologies.',
                'I analyze the problem, users and constraints before choosing technologies.',
              ),
            },
            {
              icon: Layers3,
              number: '02',
              title: pick('Construire le produit', 'Build the product'),
              text: pick(
                'Je relie l’interface, l’API et les données pour créer une application full-stack cohérente.',
                'I connect the interface, API and data to create a coherent full-stack application.',
              ),
            },
            {
              icon: Lightbulb,
              number: '03',
              title: pick('Intégrer une IA utile', 'Integrate useful AI'),
              text: pick(
                'J’utilise le Machine Learning et l’IA générative lorsqu’ils apportent une valeur concrète au produit.',
                'I use Machine Learning and generative AI when they provide concrete value to the product.',
              ),
            },
          ].map(({ icon: Icon, number, title, text }) => (
            <article key={number}>
              <div>
                <span>{number}</span>
                <Icon />
              </div>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="about-journey">
        <div>
          <p className="overline">{pick('TRAJECTOIRE / 03', 'TRAJECTORY / 03')}</p>
          <h2>
            {pick('Une évolution', 'An evolution')}
            <br />
            <em>{pick('en mouvement.', 'in motion.')}</em>
          </h2>
        </div>
        <div className="compact-timeline">
          {timeline.map((item, i) => (
            <article key={item.period}>
              <span>0{i + 1}</span>
              <time>{language === 'en' ? item.period.replace('Aujourd’hui', 'Today') : item.period}</time>
              <div>
                <h3>{language === 'en' ? item.en.title : item.title}</h3>
                <p>{language === 'en' ? item.en.text : item.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="quote-band">
        <div>
          <p className="overline">{pick('TRAVAILLONS ENSEMBLE', 'LET’S WORK TOGETHER')}</p>
          <blockquote>
            {pick(
              '« La technologie devient utile lorsqu’elle répond à un besoin réel et reste accessible. »',
              '“Technology becomes useful when it addresses a real need and remains accessible.”',
            )}
          </blockquote>
        </div>
      </section>
    </main>
  )
}
