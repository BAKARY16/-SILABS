import { ArrowRight, ArrowUpRight, BriefcaseBusiness, Code2, Mail, MessageCircle } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../hooks/languageContext'

export function Contact() {
  const { pick } = useLanguage()
  return (
    <main className="bf-contact-page">
      <header className="bf-page-hero">
        <div className="bf-page-container">
          <div className="bf-accent" />
          <p className="bf-kicker">{pick('Contact direct', 'Direct contact')}</p>
          <h1>
            {pick('Restons en', 'Let’s stay')} <span>{pick('contact.', 'in touch.')}</span>
          </h1>
          <p className="bf-page-lead">
            {pick(
              'Une question rapide, une opportunité professionnelle ou simplement envie d’échanger ? Retrouvez-moi sur le canal qui vous convient.',
              'A quick question, a professional opportunity or simply want to talk? Reach me through the channel that suits you.',
            )}
          </p>
        </div>
      </header>
      <section className="bf-contact-section">
        <div className="bf-page-container bf-contact-grid">
          <div className="bf-contact-intro">
            <p className="bf-kicker">{pick('Choisir un canal', 'Choose a channel')}</p>
            <h2>
              {pick('Un échange simple, humain et direct.', 'A simple, human and direct conversation.')}
            </h2>
            <p>
              {pick(
                'Cette page sert uniquement à la prise de contact. Pour proposer un projet, demander un devis ou transmettre un brief, utilisez l’espace de demande dédié.',
                'This page is for direct contact. To propose a project, request a quote or submit a brief, use the dedicated request form.',
              )}
            </p>
            <Link className="bf-inline-link" to="/inquiry">
              {pick('Soumettre une demande structurée', 'Submit a structured request')} <ArrowRight />
            </Link>
          </div>
          <div className="bf-channel-list">
            <a href="https://www.linkedin.com/in/bakary-sinon-29799a275" target="_blank" rel="noreferrer">
              <span className="bf-channel-icon">
                <BriefcaseBusiness />
              </span>
              <span>
                <small>{pick('Réseau professionnel', 'Professional network')}</small>
                <strong>LinkedIn</strong>
                <em>
                  {pick(
                    'Pour les opportunités et conversations professionnelles.',
                    'For professional opportunities and conversations.',
                  )}
                </em>
              </span>
              <ArrowUpRight />
            </a>
            <a href="https://github.com/BAKARY16" target="_blank" rel="noreferrer">
              <span className="bf-channel-icon blue">
                <Code2 />
              </span>
              <span>
                <small>{pick('Code & projets', 'Code & projects')}</small>
                <strong>GitHub</strong>
                <em>
                  {pick(
                    'Pour consulter mes repositories et mon travail technique.',
                    'To view my repositories and technical work.',
                  )}
                </em>
              </span>
              <ArrowUpRight />
            </a>
            <a href="mailto:s.bakary1611@gmail.com">
              <span className="bf-channel-icon pink">
                <Mail />
              </span>
              <span>
                <small>Email</small>
                <strong>s.bakary1611@gmail.com</strong>
                <em>{pick('Envoyez-moi un message directement.', 'Send me a message directly.')}</em>
              </span>
              <ArrowUpRight />
            </a>
          </div>
        </div>
      </section>
      <section className="bf-contact-choice">
        <div className="bf-page-container">
          <MessageCircle />
          <div>
            <p className="bf-kicker">
              {pick('Vous avez déjà un besoin précis ?', 'Already have a specific need?')}
            </p>
            <h2>{pick('Parlez-moi de votre projet.', 'Tell me about your project.')}</h2>
            <p>
              {pick(
                'Le formulaire dédié recueille le contexte, le type de demande, le budget et les délais afin de faciliter la suite.',
                'The dedicated form collects context, request type, budget and timeline to make the next steps easier.',
              )}
            </p>
          </div>
          <Link className="bf-button primary" to="/inquiry">
            {pick('Démarrer une demande', 'Start a request')} <ArrowRight />
          </Link>
        </div>
      </section>
    </main>
  )
}
