import { useEffect } from 'react'

const clamp = value => Math.min(1, Math.max(0, value))

export default function useScrollEffects(route, motion) {
  useEffect(() => {
    const root = document.documentElement
    const hero = document.querySelector('[data-hero-scroll]')
    const story = document.querySelector('[data-story]')
    const viewport = story?.querySelector('[data-story-viewport]')
    const parallax = [...document.querySelectorAll('[data-parallax]')]
    const desktop = window.matchMedia('(min-width: 981px) and (min-height: 740px)')
    let frame = 0
    function configure() {
      story?.classList.toggle('is-scroll-scene', motion && desktop.matches)
      queue()
    }
    function render() {
      frame = 0
      const height = window.innerHeight
      const scrollable = root.scrollHeight - height
      root.style.setProperty('--page-progress', String(scrollable > 0 ? clamp(window.scrollY / scrollable) : 0))
      if (!motion) return
      if (hero) {
        const bounds = hero.getBoundingClientRect()
        hero.style.setProperty('--hero-scroll', String(clamp(-bounds.top / Math.max(bounds.height, 1))))
      }
      for (const el of parallax) {
        const bounds = el.getBoundingClientRect()
        if (bounds.bottom > -100 && bounds.top < height + 100) {
          el.style.setProperty('--parallax', String(clamp((height - bounds.top) / (height + bounds.height)) - .5))
        }
      }
      if (story && viewport && desktop.matches && !story.contains(document.activeElement)) {
        const stage = story.querySelector('.story-stage')
        const header = document.querySelector('.header')?.offsetHeight || 94
        const bounds = story.getBoundingClientRect()
        const range = Math.max(1, story.offsetHeight - stage.offsetHeight)
        const progress = clamp((header - bounds.top) / range)
        viewport.scrollLeft = progress * Math.max(0, viewport.scrollWidth - viewport.clientWidth)
      }
    }
    function queue() { if (!frame) frame = requestAnimationFrame(render) }
    function syncGalleryProgress() {
      if (!story || !viewport) return
      const distance = viewport.scrollWidth - viewport.clientWidth
      story.style.setProperty('--story-progress', String(distance > 0 ? clamp(viewport.scrollLeft / distance) : 0))
    }
    window.addEventListener('scroll', queue, { passive: true })
    window.addEventListener('resize', configure, { passive: true })
    desktop.addEventListener('change', configure)
    viewport?.addEventListener('scroll', syncGalleryProgress, { passive: true })
    const resize = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(queue) : null
    resize?.observe(document.body)
    configure()
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', queue)
      window.removeEventListener('resize', configure)
      desktop.removeEventListener('change', configure)
      viewport?.removeEventListener('scroll', syncGalleryProgress)
      resize?.disconnect()
      story?.classList.remove('is-scroll-scene')
      hero?.style.removeProperty('--hero-scroll')
      parallax.forEach(el => el.style.removeProperty('--parallax'))
    }
  }, [route, motion])
}
