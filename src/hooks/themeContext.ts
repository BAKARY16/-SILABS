import { createContext, useContext } from 'react'
export type Theme = 'dark' | 'light'
export const ThemeContext = createContext({ theme: 'dark' as Theme, toggle: () => {} })
export const useTheme = () => useContext(ThemeContext)
