export type Category = 'Web' | 'Data' | 'AI' | 'ML'
export type Project = {
  slug: string
  title: string
  category: Category[]
  status: string
  year: string
  language: string
  stars: number
  summary: string
  context: string
  problem: string
  solution: string
  features: string[]
  challenges: string[]
  stack: string[]
  github: string
  live?: string
  image?: string
  imageAlt?: string
  video?: string
  accent: string
  featured?: boolean
  en?: {
    status: string
    summary: string
    context: string
    problem: string
    solution: string
    features: string[]
    challenges: string[]
  }
}
