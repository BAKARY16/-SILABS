import type { ReactNode } from 'react'
export function PageHeader({
  index,
  eyebrow,
  title,
  lead,
  aside,
}: {
  index: string
  eyebrow: string
  title: ReactNode
  lead: string
  aside?: ReactNode
}) {
  return (
    <section className="page-header">
      <div className="page-index">{index}</div>
      <div>
        <p className="overline">{eyebrow}</p>
        <h1>{title}</h1>
        <p className="page-lead">{lead}</p>
      </div>
      {aside && <aside>{aside}</aside>}
    </section>
  )
}
