export function PageLoader() {
  return (
    <div className="page-loader" role="status" aria-label="Chargement de la page" aria-live="polite">
      <div className="loading-spinner" aria-hidden="true">
        {Array.from({ length: 12 }, (_, index) => <i key={index} />)}
      </div>
    </div>
  )
}
