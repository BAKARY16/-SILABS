import { useLanguage } from '../../hooks/languageContext'
export function TechVisual() {
  const { pick } = useLanguage()
  return (
    <div className="tech-visual" aria-label={pick('Système reliant produit, données et intelligence artificielle', 'System connecting product, data and artificial intelligence')}>
      <svg viewBox="0 0 600 600" role="img">
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="4" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <circle className="ring r1" cx="300" cy="300" r="230" />
        <circle className="ring r2" cx="300" cy="300" r="155" />
        <path className="path" d="M88 240L207 165L300 300L455 188L515 360L365 455L170 420Z" />
        <path className="path faint" d="M207 165L365 455M88 240L455 188M170 420L300 300L515 360" />
        {[
          [88, 240],
          [207, 165],
          [300, 300],
          [455, 188],
          [515, 360],
          [365, 455],
          [170, 420],
        ].map(([cx, cy], i) => (
          <g key={i}>
            <circle className={i === 2 ? 'dot core-dot' : 'dot'} cx={cx} cy={cy} r={i === 2 ? 24 : 8} />
            {i === 2 && (
              <text x="300" y="305">
                SB
              </text>
            )}
          </g>
        ))}
        <text className="label" x="45" y="220">
          PRODUCT
        </text>
        <text className="label" x="438" y="165">
          DATA
        </text>
        <text className="label" x="465" y="405">
          AI
        </text>
      </svg>
      <div className="visual-code">
        <i />
        <span>systems.online</span>
        <b>03 connected layers</b>
      </div>
    </div>
  )
}
