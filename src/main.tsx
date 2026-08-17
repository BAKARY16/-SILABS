import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'
import './styles/vibrant.css'
import './styles/brandfolio.css'
import './styles/logo-palette.css'
import './styles/project-detail.css'
import './styles/about-method.css'
import './styles/about-page.css'
import './styles/experience-page.css'
import './styles/projects-page.css'
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
