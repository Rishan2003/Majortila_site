import { useEffect, useState } from 'react'
export function useMotion() {
  const [motion, setMotion] = useState(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false
    try { const saved = localStorage.getItem('hexas-motion'); if (saved) return saved === 'on' } catch {}
    return !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  })
  useEffect(() => {
    document.documentElement.dataset.motion = motion ? 'on' : 'off'
    try { localStorage.setItem('hexas-motion', motion ? 'on' : 'off') } catch {}
    window.dispatchEvent(new Event('hexas-motion-change'))
  }, [motion])
  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const change = e => { if (e.matches) setMotion(false) }
    query.addEventListener('change', change)
    return () => query.removeEventListener('change', change)
  }, [])
  return [motion, setMotion]
}
export function useReveal(route, motion) {
  useEffect(() => {
    if (!motion) return
    const elements = document.querySelectorAll('main .reveal, main .section-heading, main .course-card-grid > article, main .facility-grid > button, main .care-points > article, main .reason-grid > article, main .partner-grid > article, main .record-grid > article, main .process-grid li, main .essential-grid > article')
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target) }
    }), { threshold: 0.08, rootMargin: '0px 0px -25px 0px' })
    elements.forEach((el, i) => { el.classList.add('will-reveal'); el.style.setProperty('--reveal-delay', `${(i % 3) * 110}ms`); observer.observe(el) })
    return () => { observer.disconnect(); elements.forEach(el => el.classList.remove('will-reveal')) }
  }, [route, motion])
}
export function MotionControl({ motion, setMotion }) {
  const [reduced, setReduced] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const change = e => setReduced(e.matches)
    query.addEventListener('change', change)
    return () => query.removeEventListener('change', change)
  }, [])
  return <button className="motion-control" disabled={reduced} aria-pressed={!motion} onClick={() => setMotion(v => !v)} title={reduced ? 'Reduced motion is enabled in your device settings' : motion ? 'Pause decorative animations' : 'Enable animations'}><span aria-hidden="true">{motion ? 'Ⅱ' : '▷'}</span>{reduced ? 'Reduced motion' : motion ? 'Pause motion' : 'Enable motion'}</button>
}
