export const SITE = {
  name: 'Sinon Bakary',
  role: 'Full Stack · Machine Learning · GenAI',
  location: 'Côte d’Ivoire',
  github: 'https://github.com/BAKARY16',
  linkedin: 'https://www.linkedin.com/in/bakary-sinon-29799a275',
} as const

export const NAVIGATION = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Projects', path: '/projects' },
  { label: 'Skills', path: '/skills' },
  { label: 'Experience', path: '/experience' },
  { label: 'Contact', path: '/contact' },
] as const

export const PAGE_META: Record<string, { title: string; description: string }> = {
  '/': {
    title: 'Sinon Bakary — Full Stack, Machine Learning & GenAI',
    description:
      'Portfolio de Sinon Bakary : développement Full Stack, Machine Learning et intelligence artificielle générative.',
  },
  '/about': {
    title: 'À propos — Sinon Bakary',
    description: 'Parcours, approche et vision technologique de Sinon Bakary.',
  },
  '/projects': {
    title: 'Projets — Sinon Bakary',
    description: 'Découvrez les projets Web, Data, Machine Learning et IA de Sinon Bakary.',
  },
  '/skills': {
    title: 'Compétences — Sinon Bakary',
    description: 'Compétences frontend, backend, Data, IA, bases de données et outils.',
  },
  '/experience': {
    title: 'Expérience — Sinon Bakary',
    description: 'Progression technique vérifiable de Sinon Bakary à travers ses projets publics.',
  },
  '/contact': {
    title: 'Contact — Sinon Bakary',
    description: 'Contacter Sinon Bakary via LinkedIn ou GitHub.',
  },
  '/inquiry': {
    title: 'Soumettre une demande — Sinon Bakary',
    description: 'Proposer un projet, une mission, un partenariat ou transmettre une demande à Sinon Bakary.',
  },
}

export const PAGE_META_EN: Record<string, { title: string; description: string }> = {
  '/': { title: 'Sinon Bakary — Full Stack, Machine Learning & GenAI', description: 'Sinon Bakary’s portfolio: Full Stack development, Machine Learning and generative artificial intelligence.' },
  '/about': { title: 'About — Sinon Bakary', description: 'Sinon Bakary’s journey, approach and technology vision.' },
  '/projects': { title: 'Projects — Sinon Bakary', description: 'Explore Sinon Bakary’s Web, Data, Machine Learning and AI projects.' },
  '/skills': { title: 'Skills — Sinon Bakary', description: 'Frontend, backend, Data, AI, database and tooling skills.' },
  '/experience': { title: 'Experience — Sinon Bakary', description: 'Sinon Bakary’s verifiable technical progression through public projects.' },
  '/contact': { title: 'Contact — Sinon Bakary', description: 'Contact Sinon Bakary via LinkedIn or GitHub.' },
  '/inquiry': { title: 'Submit a request — Sinon Bakary', description: 'Propose a project, assignment, partnership or send a request to Sinon Bakary.' },
}
