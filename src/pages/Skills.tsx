import type { CSSProperties } from 'react'
import { PageHeader } from '../components/ui/PageHeader'
import { skillGroups } from '../data/skills'
import { useLanguage } from '../hooks/languageContext'
export function Skills() {
  const { language, pick } = useLanguage()
  return (
    <main className="inner-page">
      <PageHeader
        index="03"
        eyebrow={pick('Compétences', 'Skills')}
        title={
          <>
            {pick(<>Un profil <em>transversal</em>, du front à l’intelligence.</>, <>A <em>cross-functional</em> profile, from frontend to intelligence.</>)}
          </>
        }
        lead={pick('Mes compétences se sont construites par couches successives, au fil de produits et de problèmes concrets — sans scores arbitraires ni pourcentages décoratifs.', 'My skills were built layer by layer through real products and problems — without arbitrary scores or decorative percentages.')}
      />
      <section className="skill-map">
        <div className="map-center">
          <b>BUILD</b>
          <span>
            PRODUCT
            <br />
            DATA
            <br />
            INTELLIGENCE
          </span>
        </div>
        {skillGroups.map((g, i) => (
          <article key={g.id} style={{ '--i': i } as CSSProperties}>
            <span>{g.index}</span>
            <h2>{language === 'en' ? ({'Intelligence artificielle':'Artificial intelligence','Données':'Databases','Outils':'Tools'} as Record<string,string>)[g.label] ?? g.label : g.label}</h2>
            <p>{language === 'en' ? g.descriptionEn : g.description}</p>
          </article>
        ))}
      </section>
      <section className="skill-directory">
        {skillGroups.map((g) => (
          <article key={g.id}>
            <div>
              <span>{g.index}</span>
              <h2>{language === 'en' ? ({'Intelligence artificielle':'Artificial intelligence','Données':'Databases','Outils':'Tools'} as Record<string,string>)[g.label] ?? g.label : g.label}</h2>
              <p>{language === 'en' ? g.descriptionEn : g.description}</p>
            </div>
            <div className="skill-cloud">
              {g.skills.map((s) => (
                <span key={s}>{s}</span>
              ))}
            </div>
          </article>
        ))}
      </section>
      <section className="learning-note">
        <p className="overline">{pick('PRINCIPE', 'PRINCIPLE')}</p>
        <h2>
          {pick(<>La maîtrise se mesure dans <em>ce qu’on livre</em>.</>, <>Mastery is measured by <em>what we deliver</em>.</>)}
        </h2>
        <p>
          {pick('Je privilégie une compréhension solide des systèmes et la capacité à choisir les bons outils pour un contexte donné.', 'I value a solid understanding of systems and the ability to choose the right tools for a given context.')}
        </p>
      </section>
    </main>
  )
}
