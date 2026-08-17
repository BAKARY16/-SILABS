import { useEffect } from 'react'
import { getProject } from '../data/projects'
import { PAGE_META, PAGE_META_EN } from '../config/site'
import { useLanguage } from './languageContext'

export function useDocumentMeta(pathname: string) {
  const { language } = useLanguage()
  useEffect(() => {
    const slug = pathname.startsWith('/projects/') ? pathname.split('/').pop() : undefined
    const project = getProject(slug)
    const meta = project
      ? { title: `${project.title} — ${language === 'fr' ? 'Étude de cas' : 'Case study'} | Sinon Bakary`, description: language === 'en' && project.en ? project.en.summary : project.summary }
      : ((language === 'fr' ? PAGE_META : PAGE_META_EN)[pathname] ?? (language === 'fr' ? PAGE_META : PAGE_META_EN)['/'])

    document.title = meta.title
    document.querySelector('meta[name="description"]')?.setAttribute('content', meta.description)
  }, [pathname, language])
}
