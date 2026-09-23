import { useRef } from 'react'
import Arrow from '../ui/Arrow.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'
import { achievements } from '../../data/achievements.js'

export default function ScrollGallery() {
  const viewport = useRef(null)
  function move(direction) {
    const el = viewport.current
    if (!el) return
    const card = el.querySelector('.moment-card')
    const amount = (card?.getBoundingClientRect().width || 330) + 28
    el.scrollBy({ left: direction * amount, behavior: document.documentElement.dataset.motion === 'off' ? 'instant' : 'smooth' })
  }
  return <section className="story-scroll" data-story aria-label="Student achievements">
    <div className="story-stage">
      <div className="story-orbit" aria-hidden="true"/>
      <div className="container story-heading">
        <SectionHeading light label="04 / REAL PEOPLE. REMARKABLE MOMENTS." title="HARD WORK." accent="BIG ENERGY." copy="প্রতিটি score-এর পেছনে আছে চেষ্টা আর নিয়মিত practice। পরিচিত হোন আমাদের Band 8 achievers-দের সাথে।"/>
        <div className="story-controls"><span>KEEP SCROLLING. MEET THE NEXT CHAPTER.</span><div><button onClick={() => move(-1)} aria-label="Previous student"><Arrow/></button><button onClick={() => move(1)} aria-label="Next student"><Arrow/></button></div></div>
      </div>
      <div className="story-viewport" ref={viewport} data-story-viewport tabIndex="0" aria-label="Student photo collection; swipe or use the previous and next buttons">
        <div className="story-track">
          {achievements.map((a, i) => <a href="#/about/student-achievements" className="moment-card" key={a.name} style={{ '--card-index': i }}>
            <div className="moment-image"><img src={a.image} alt={`${a.name} celebrating IELTS band ${a.band}`} loading="lazy" width="600" height="600"/><div className="moment-score"><strong>{a.band}</strong><span>OVERALL<br/>IELTS BAND</span></div><span className="moment-number">0{i+1} / 05</span></div>
            <div className="moment-caption"><span>THE NEXT CHAPTER, UNLOCKED</span><h3>{a.name}</h3><span className="moment-arrow"><Arrow/></span></div>
          </a>)}
          <a href="#/about/student-achievements" className="moment-end"><span aria-hidden="true">✳</span><strong>YOUR<br/>MOMENT<br/><em>IS NEXT.</em></strong><span>Meet our achievers <Arrow/></span></a>
        </div>
      </div>
      <div className="container story-bottom"><span>AMBITION LOOKS GOOD ON YOU.</span><div className="story-meter" aria-hidden="true"><span/></div><a href="#/about/student-achievements">All student stories <Arrow size={18}/></a></div>
    </div>
  </section>
}
