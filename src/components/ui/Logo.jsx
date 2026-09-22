export default function Logo({ light = false, onHome }) {
  return <button className={`brand ${light ? 'brand-light' : ''}`} onClick={onHome} aria-label="Hexa's Majortila home"><img src="./images/hexas-majortila-logo.png" alt="" width="54" height="54"/><span className="brand-wordmark"><strong>HEXA’S</strong><small>MAJORTILA · SYLHET</small></span></button>
}
