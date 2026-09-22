import { useEffect, useRef, useState } from 'react'
export default function CountUp({ value, suffix = '' }) {
  const ref = useRef(null)
  const [display, setDisplay] = useState(value)
  useEffect(() => {
    let frame
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      observer.disconnect()
      if (document.documentElement.dataset.motion === 'off') return
      const start = performance.now()
      const tick = now => {
        const t = Math.min((now - start) / 1200, 1)
        setDisplay(Math.round(value * (1 - (1 - t) ** 3)))
        if (t < 1) frame = requestAnimationFrame(tick)
      }
      frame = requestAnimationFrame(tick)
    }, { threshold: 0.6 })
    observer.observe(ref.current)
    return () => { observer.disconnect(); cancelAnimationFrame(frame) }
  }, [value])
  return <span ref={ref} aria-label={`${value}${suffix}`}><span aria-hidden="true">{display}{suffix}</span></span>
}
