import { useEffect, useRef } from 'react'
import Arrow from '../ui/Arrow.jsx'
import Chevron from '../ui/Chevron.jsx'
import Logo from '../ui/Logo.jsx'
import { facilities } from '../../data/facilities.js'
import { aboutLinks } from '../../data/navigation.js'
export default function Header({ navigate, route, menuOpen, setMenuOpen }) {
  const header = useRef(null)
  const menu = useRef(null)
  useEffect(() => {
    const close = e => {
      if (e.type === 'keydown' && e.key !== 'Escape') return
      if (e.type === 'pointerdown' && header.current?.contains(e.target)) return
      header.current?.querySelectorAll('details[open]').forEach(el => { if (e.type === 'keydown' && el.contains(document.activeElement)) el.querySelector('summary')?.focus(); el.removeAttribute('open') })
      if (e.type === 'keydown' && menuOpen) { setMenuOpen(false); menu.current?.focus() }
    }
    document.addEventListener('pointerdown', close); document.addEventListener('keydown', close)
    return () => { document.removeEventListener('pointerdown', close); document.removeEventListener('keydown', close) }
  }, [menuOpen, setMenuOpen])
  useEffect(() => { header.current?.querySelectorAll('details[open]').forEach(el => el.removeAttribute('open')) }, [route])
  const link = (path, label) => <a href={`#${path}`} aria-current={route === path ? 'page' : undefined} onClick={() => setMenuOpen(false)}>{label}</a>
  return <header className="header" ref={header}>
    <div className="container nav"><Logo onHome={() => navigate('/')}/>
      <nav className="nav-links" aria-label="Main navigation">
        {link('/', 'Home')}
        <details className="nav-dropdown"><summary>About us <Chevron/></summary><div className="dropdown-panel">{link('/about','Our story')}{aboutLinks.map(([path,label]) => <span key={path}>{link(path,label)}</span>)}</div></details>
        {link('/courses', 'Courses')}
        <details className="nav-dropdown"><summary>Student care <Chevron/></summary><div className="dropdown-panel">{link('/facilities','All facilities')}{Object.entries(facilities).map(([slug,item]) => <span key={slug}>{link(`/facilities/${slug}`,item.title)}</span>)}</div></details>
        {link('/exam-registration', 'IELTS registration')}
      </nav>
      <div className="nav-actions"><button className="button button-primary nav-cta" onClick={() => navigate('/contact')}>Let’s talk <Arrow size={17}/></button><button ref={menu} className={`menu-button ${menuOpen ? 'is-open' : ''}`} onClick={() => setMenuOpen(v => !v)} aria-expanded={menuOpen} aria-controls="mobile-menu" aria-label={menuOpen ? 'Close menu' : 'Open menu'}><span/><span/></button></div>
    </div>
    {menuOpen && <nav id="mobile-menu" className="mobile-menu container" aria-label="Mobile navigation">
      {link('/','Home')}{link('/courses','Explore courses')}{link('/about','Our story')}
      <details><summary>About HEXA’S <Chevron/></summary>{aboutLinks.map(([path,label]) => <span key={path}>{link(path,label)}</span>)}</details>
      <details><summary>Student care <Chevron/></summary>{link('/facilities','All facilities')}{Object.entries(facilities).map(([slug,item]) => <span key={slug}>{link(`/facilities/${slug}`,item.title)}</span>)}</details>
      {link('/exam-registration','IELTS registration')}{link('/contact','Contact & counselling')}
      <a className="mobile-phone" href="tel:+8801710764801">Call +880 1710-764801</a>
    </nav>}
  </header>
}
