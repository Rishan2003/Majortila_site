import AnimatedText from './AnimatedText.jsx'
export default function PageHero({ eyebrow, title, accent, description, actions, stats, dark = false }) {
  return (
    <section className={`page-hero ${dark ? 'page-hero-dark' : ''}`}>
      <div className="page-orb page-orb-a" aria-hidden="true"/><div className="page-orb page-orb-b" aria-hidden="true"/>
      <div className="page-hero-symbol" aria-hidden="true">✳</div>
      <div className="container page-hero-inner">
        <div className="page-hero-copy">
          <div className={`micro-label ${dark ? 'light-label' : ''}`}><span/>{eyebrow}</div>
          <h1><AnimatedText>{title}</AnimatedText> {accent && <em><AnimatedText>{accent}</AnimatedText></em>}</h1>
          <p>{description}</p>
          {actions && <div className="hero-actions">{actions}</div>}
        </div>
        {stats && <div className="page-stats">{stats.map(([value,label]) => <div key={label}><strong>{value}</strong><span>{label}</span></div>)}</div>}
      </div>
    </section>
  )
}
