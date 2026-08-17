import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { LanguageContext, type Language } from './languageContext'

const STORAGE_KEY = 'portfolio-language'

function getInitialLanguage(): Language {
  const requested = new URLSearchParams(window.location.search).get('lang')
  if (requested === 'fr' || requested === 'en') return requested
  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved === 'fr' || saved === 'en') return saved
  return navigator.language.toLowerCase().startsWith('fr') ? 'fr' : 'en'
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(getInitialLanguage)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, language)
    document.documentElement.lang = language
  }, [language])

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      toggleLanguage: () => setLanguage((current) => (current === 'fr' ? 'en' : 'fr')),
      pick: <T,>(fr: T, en: T) => (language === 'fr' ? fr : en),
    }),
    [language],
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}
