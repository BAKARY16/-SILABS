import { ArrowUpRight } from 'lucide-react'
import { timeline } from '../data/experience'
import { useLanguage } from '../hooks/languageContext'

export function Experience() {
  const { language, pick } = useLanguage()

  return (
    <main className="experience-page">
      <header className="bf-page-hero experience-hero">
        <div className="bf-page-container">
          <div className="bf-accent" />
          <p className="bf-kicker">{pick('Expérience & parcours', 'Experience & journey')}</p>
          <h1>
            {pick('Une évolution construite','A journey shaped')} <span>{pick('projet après projet.','project by project.')}</span>
          </h1>
          <p className="bf-page-lead">
            {pick(
              'Mon parcours se construit par la pratique : chaque projet ajoute une nouvelle compétence, une responsabilité technique et une meilleure compréhension du produit.',
              'My journey is built through practice: each project adds a new skill, greater technical responsibility and a better understanding of the product.',
            )}
          </p>
        </div>
      </header>

      <section className="experience-intro bf-page-container">
        <div>
          <p className="bf-kicker">{pick('Ma progression', 'My progression')} / 01</p>
          <h2>{pick('Des fondations web aux systèmes intelligents.', 'From web foundations to intelligent systems.')}</h2>
        </div>
        <p>
          {pick(
            'Cette chronologie présente les grandes étapes visibles dans mes projets publics, sans ajouter d’expérience qui ne puisse être vérifiée.',
            'This timeline presents the major steps visible in my public projects, without adding experience that cannot be verified.',
          )}
        </p>
      </section>

      <section className="experience-timeline bf-page-container" aria-label={pick('Chronologie de mon parcours', 'Career timeline')}>
        {timeline.map((item, index) => {
          const content = language === 'en' ? item.en : item
          return (
            <article key={item.period}>
              <span className="experience-number">0{index + 1}</span>
              <time>{language === 'en' ? item.period.replace('Aujourd’hui', 'Today') : item.period}</time>
              <div className="experience-content">
                <span>{content.type}</span>
                <h2>{content.title}</h2>
                <p>{content.text}</p>
              </div>
            </article>
          )
        })}
      </section>

      <section className="experience-proof bf-page-container">
        <div>
          <p className="bf-kicker">{pick('Source & transparence', 'Source & transparency')} / 02</p>
          <h2>{pick('Un parcours présenté sans fiction.', 'A journey presented without fiction.')}</h2>
        </div>
        <div>
          <p>
            {pick(
              'Les dates et les technologies correspondent à l’historique observable de mes dépôts. Les expériences académiques et professionnelles seront ajoutées lorsqu’elles pourront être documentées avec la même précision.',
              'Dates and technologies reflect the observable history of my repositories. Academic and professional experiences will be added when they can be documented with the same level of accuracy.',
            )}
          </p>
          <a href="https://github.com/BAKARY16?tab=repositories" target="_blank" rel="noreferrer">
            {pick('Consulter mes projets GitHub', 'View my GitHub projects')} <ArrowUpRight />
          </a>
        </div>
      </section>
    </main>
  )
}
