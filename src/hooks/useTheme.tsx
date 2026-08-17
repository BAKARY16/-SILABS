import { useEffect, useState, type ReactNode } from 'react'
import { ThemeContext, type Theme } from './themeContext'
export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('sb-theme') as Theme | null
    if (saved === 'light' || saved === 'dark') return saved
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  })
  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('sb-theme', theme)
    document.querySelector('meta[name="theme-color"]')?.setAttribute(
      'content',
      theme === 'dark' ? '#071225' : '#ffffff',
    )
  }, [theme])
  return (
    <ThemeContext.Provider
      value={{ theme, toggle: () => setTheme((t) => (t === 'dark' ? 'light' : 'dark')) }}
    >
      {children}
    </ThemeContext.Provider>
  )
}
