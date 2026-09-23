import { useMemo, useState } from 'react'
import PageHero from '../../components/ui/PageHero.jsx'
import { achievements } from '../../data/achievements.js'
export default function AchievementsPage() {
  const [band, setBand] = useState('All')
  const [query, setQuery] = useState('')
  const bands = ['All','8.5','8.0','7.5','7.0','6.5','6.0']
  const visible = useMemo(() => achievements.filter(a => (band==='All'||a.band===band) && a.name.toLowerCase().includes(query.toLowerCase())), [band,query])
  return <>
    <PageHero eyebrow="Student achievements" title="Every result has a" accent="journey behind it." description="নিয়মিত practice আর চেষ্টা—তারপর কাঙ্ক্ষিত score পাওয়ার আনন্দ। দেখে নিন আমাদের IELTS achievers-দের সেই মুহূর্তগুলো।" stats={[["8.0","featured IELTS band"],["5","featured achievers"],["4","skills behind every score"]]}/>
    <section className="content-section"><div className="container"><div className="filter-toolbar"><div className="search-box"><span aria-hidden="true">⌕</span><input aria-label="Search student name" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search student name..." type="search"/></div><div className="filter-pills" aria-label="Filter by IELTS band">{bands.map(c=><button key={c} className={band===c?'active':''} aria-pressed={band===c} onClick={()=>setBand(c)}>{c==='All'?'All bands':c}</button>)}</div></div><div className="achievement-grid">{visible.map(a=><article key={a.name}><div className="achievement-image"><img src={a.image} alt={`${a.name} celebrating an IELTS achievement`} loading="lazy"/><span>{a.note}</span><b>IELTS {a.band}</b></div><div className="achievement-copy"><small>HEXA’S MAJORTILA · {a.type}</small><h3>{a.name}</h3><div><strong>{a.band}</strong><span>overall band</span></div></div></article>)}</div>{visible.length===0&&<div className="empty-state" role="status"><strong>No featured results match this search.</strong><span>অন্য নাম দিয়ে search করুন, অথবা All bands বেছে নিন।</span></div>}</div></section>
  </>
}
