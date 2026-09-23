import { useState } from 'react'
import Arrow from '../components/ui/Arrow.jsx'
import PageHero from '../components/ui/PageHero.jsx'
import { courses } from '../data/courses.js'

export default function CoursesPage({ navigate }) {
  const [filter, setFilter] = useState('All')
  const groups = ['All','IELTS','English','Online','Intensive']
  const visible = filter==='All' ? courses : courses.filter(c=>c.group===filter)
  return <>
    <PageHero eyebrow="Programs built around real goals" title="Find the course that fits your" accent="target and timeline." description="IELTS, Spoken English, Online বা Intensive—আপনার জন্য কোনটা? Format, duration, practice আর fee দেখে বেছে নিন নিজের course।" stats={[["12","program options"],["10K+","successful students"],["8.5","top IELTS band"]]}/>
    <section className="content-section paper-section"><div className="container"><div className="course-page-toolbar"><div><span>FILTER PROGRAMS</span><div className="filter-pills">{groups.map(g=><button key={g} className={filter===g?'active':''} aria-pressed={filter===g} onClick={()=>setFilter(g)}>{g}</button>)}</div></div><button className="button button-primary" onClick={()=>navigate('/contact')}>Need help choosing? <Arrow/></button></div><div className="course-card-grid">{visible.map((c,i)=><article key={c.title}><div className="course-card-top"><span>{c.accent}</span><small>0{(i%9)+1}</small></div><h3>{c.title}</h3><p lang="bn">{c.desc}</p><ul>{c.features.map(f=><li key={f}>✓ {f}</li>)}</ul><div className="course-card-meta"><div><small>Duration</small><strong>{c.duration}</strong></div><div><small>Classes</small><strong>{c.classes}</strong></div><div><small>Format</small><strong>{c.mode}</strong></div></div><footer><div><small>Course fee</small><strong>{c.fee}</strong></div><button onClick={()=>navigate('/contact')}>Ask about this course <Arrow size={15}/></button></footer></article>)}</div></div></section>
  </>
}
