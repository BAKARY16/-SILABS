import { createContext, useContext } from 'react'

export type Language = 'fr' | 'en'

export type LanguageContextValue = {
  language: Language
  setLanguage: (language: Language) => void
  toggleLanguage: () => void
  pick: <T>(fr: T, en: T) => T
}

export const LanguageContext = createContext<LanguageContextValue | null>(null)

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) throw new Error('useLanguage must be used inside LanguageProvider')
  return context
}
