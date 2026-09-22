import { useEffect, useState } from 'react'
import Header from './components/layout/Header.jsx'
import Footer from './components/layout/Footer.jsx'
import renderRoute from './router/renderRoute.jsx'
import pageTitle from './router/pageTitle.js'
import { MotionControl, useMotion, useReveal } from './hooks/useMotion.jsx'
import useScrollEffects from './hooks/useScrollEffects.js'
function routeFromHash() { const raw = window.location.hash.replace(/^#/, ''); return raw.startsWith('/') ? raw : '/' }
export default function App() {
  const [route, setRoute] = useState(routeFromHash)
  const [menuOpen, setMenuOpen] = useState(false)
  const [motion, setMotion] = useMotion()
  useReveal(route, motion)
  useScrollEffects(route, motion)
  useEffect(() => {
    const onHash = () => { setRoute(routeFromHash()); setMenuOpen(false); window.scrollTo({ top: 0, behavior: 'instant' }) }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])
  useEffect(() => {
    document.title = pageTitle(route)
    const frame = requestAnimationFrame(() => { if (window.location.hash) document.getElementById('main-content')?.focus({ preventScroll: true }) })
    return () => cancelAnimationFrame(frame)
  }, [route])
  const navigate = path => { if (route === path) window.scrollTo({ top: 0, behavior: motion ? 'smooth' : 'instant' }); else window.location.hash = path; setMenuOpen(false) }
  return <div className="site-shell">
    <div className="reading-progress" aria-hidden="true"/>
    <a href="#main-content" className="skip-link" onClick={e => { e.preventDefault(); document.getElementById('main-content')?.focus() }}>Skip to content</a>
    <Header navigate={navigate} route={route} menuOpen={menuOpen} setMenuOpen={setMenuOpen}/>
    <main id="main-content" tabIndex="-1" key={route} className="route-content">{renderRoute(route, navigate)}</main>
    <Footer navigate={navigate}/>
    <MotionControl motion={motion} setMotion={setMotion}/>
  </div>
}
