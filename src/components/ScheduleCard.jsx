import { useContent } from '../data/ContentContext.jsx'
export default function ScheduleCard({id}){
 const {content,online}=useContent();const s=content.schedules[id]
 if(!s)return null
 const time=t=>new Date(`2000-01-01T${t}`).toLocaleTimeString('en-US',{hour:'numeric',minute:'2-digit'})
 return <section className="session-card" aria-label={`${s.title} schedule`}><div><span className="admin-eyebrow">CLUB SESSION • SYLHET TIME (UTC+6)</span><h2>{s.title} schedule</h2></div>{!online?<p className="session-time">Please call to confirm the latest schedule.</p>:s.status==='active'?<div className="session-grid"><div><small>EVERY WEEK</small><strong>{s.days}</strong></div><div><small>SESSION TIME</small><strong>{time(s.start)} – {time(s.end)}</strong></div><div><small>MEET US AT</small><strong>{s.location}</strong></div></div>:<p className="session-time">{s.status==='paused'?'Sessions temporarily paused':'Schedule to be announced'}</p>}{s.note&&<p>{s.note}</p>}<a href="#/contact">Confirm your place with admissions ↗</a></section>
}
