import Arrow from './Arrow.jsx'
import AnimatedText from './AnimatedText.jsx'

export default function CtaBand({ eyebrow,title,copy,primary,secondary,onPrimary,onSecondary }) {
  return <section className="cta-band"><div className="cta-orbit" aria-hidden="true"/><div className="container cta-band-inner"><div className="reveal"><span>{eyebrow}</span><h2><AnimatedText>{title}</AnimatedText></h2><p>{copy}</p></div><div><button className="button button-white" onClick={onPrimary}>{primary} <Arrow/></button><button className="button button-ghost-light" onClick={onSecondary}>{secondary}</button></div></div></section>
}
