import { Component, type ErrorInfo, type ReactNode } from 'react'

type State = { hasError: boolean }

export class AppErrorBoundary extends Component<{ children: ReactNode }, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Portfolio render error', error, info)
  }

  render() {
    if (!this.state.hasError) return this.props.children
    return (
      <main className="error-state">
        <span>ERREUR / INTERFACE</span>
        <h1>La page n’a pas pu être affichée.</h1>
        <p>Rechargez la page. Si le problème persiste, revenez à l’accueil.</p>
        <button className="button solid" onClick={() => window.location.assign('/')}>
          Revenir à l’accueil
        </button>
      </main>
    )
  }
}
