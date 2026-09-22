import AnimatedText from './AnimatedText.jsx'
export default function SectionHeading({ label, title, accent, copy, center = false, light = false }) {
  return <div className={`section-heading ${center ? 'section-heading-center' : ''}`}>
    <div className={`section-label ${light ? 'light-label' : ''}`}>{label}</div>
    <h2><AnimatedText>{title}</AnimatedText> {accent && <em><AnimatedText>{accent}</AnimatedText></em>}</h2>
    {copy && <p>{copy}</p>}
  </div>
}
