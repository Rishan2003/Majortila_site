import ScheduleCard from '../../components/ScheduleCard.jsx'
import Arrow from '../../components/ui/Arrow.jsx'
import PageHero from '../../components/ui/PageHero.jsx'
import { facilities } from '../../data/facilities.js'

export default function FacilitiesPage({ navigate }) {
  return <>
    <PageHero eyebrow="Facilities & student care" title="More practice, more feedback," accent="more ways forward." description="Class-এর বাইরেও চলুক learning। Technology-assisted practice, skill care, কথা বলার space আর personal guidance আছে HEXA’S-এ।"/>
    <section className="content-section"><div className="container"><div className="facility-grid">{Object.entries(facilities).map(([slug,item],i)=><button className={slug==='ai-speaking-zone'?'facility-card facility-card-featured':'facility-card'} key={slug} onClick={()=>navigate(`/facilities/${slug}`)}>{item.image && <img className="facility-card-photo" src={item.image} alt={`${item.title} at HEXA’S Majortila`} loading="lazy" width="640" height="480"/>}<div className="facility-mark">{item.mark}</div><span>{String(i+1).padStart(2,'0')}</span><h3>{item.title}</h3><p lang="bn">{item.intro}</p><div>Explore facility <Arrow size={15}/></div></button>)}</div></div></section>
    <section className="container" aria-label="Club timetable"><h2>Find your next club session</h2>{Object.keys(facilities).map(id=><ScheduleCard key={id} id={id}/>)}</section><section className="facility-method"><div className="container"><div><span>ONE LEARNING ECOSYSTEM</span><h2>Use the right support for the problem you have today.</h2></div><div className="method-flow"><article><b>01</b><strong>Learn</strong><span>Class-এ skill-এর foundation তৈরি করুন।</span></article><article><b>02</b><strong>Practise</strong><span>Lab, care session আর speaking space-এ practice করুন।</span></article><article><b>03</b><strong>Review</strong><span>ভুলগুলো বুঝে ঠিক করুন কোথায় কাজ করতে হবে।</span></article><article><b>04</b><strong>Repeat</strong><span>নতুন target নিয়ে আবার practice করুন।</span></article></div></div></section>
  </>
}
