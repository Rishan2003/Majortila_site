import { useEffect, useRef, useState } from 'react'
import PageHero from '../../components/ui/PageHero.jsx'
import Arrow from '../../components/ui/Arrow.jsx'
import { achievements, campusPhotos } from '../../data/achievements.js'
const photos = [...campusPhotos, ...achievements.map(a => ({ ...a, category: 'IELTS results', description: `IELTS overall band ${a.band}` }))]
export default function GalleryPage() {
  const [category, setCategory] = useState('All')
  const [score, setScore] = useState('All')
  const [selected, setSelected] = useState(null)
  const dialog = useRef(null)
  const visible = photos.filter(a => (category==='All' || a.category===category) && (score==='All' || a.band===score))
  const photo = selected === null ? null : visible[selected]
  useEffect(() => {
    if (photo && !dialog.current.open) dialog.current.showModal()
    if (!photo && dialog.current.open) dialog.current.close()
  }, [photo])
  const move = delta => setSelected(i => (i + delta + visible.length) % visible.length)
  return <>
    <PageHero eyebrow="Life at HEXA’S" title="Small moments." accent="Big memories." description="Step inside our classrooms, explore our test venue, and celebrate the students making their next chapter happen."/>
    <section className="content-section"><div className="container">
      <div className="gallery-toolbar"><div className="filter-pills" aria-label="Photo categories">{['All','Campus','IELTS results'].map(c=><button key={c} className={category===c?'active':''} aria-pressed={category===c} onClick={()=>{setCategory(c);setScore('All')}}>{c==='All'?'All moments':c}</button>)}</div><span aria-live="polite">{visible.length} moments to explore</span></div>
      {category==='IELTS results'&&<div className="gallery-toolbar"><span>Filter by band</span><div className="filter-pills">{['All','8.5','8.0','7.5','7.0','6.5','6.0'].map(s=><button key={s} className={score===s?'active':''} aria-pressed={score===s} onClick={()=>setScore(s)}>{s==='All'?'All bands':s}</button>)}</div></div>}
      <div className="gallery-grid">{visible.map((a,i)=><button key={a.image} onClick={()=>setSelected(i)} aria-label={`View photo: ${a.name}`}><img src={a.image} alt={a.name} loading="lazy"/><i className="gallery-zoom" aria-hidden="true">+</i><span><strong>{a.name}</strong><small>{a.description}</small></span></button>)}</div>
      {visible.length===0&&<div className="empty-state"><strong>No photos for this band yet.</strong><span>Choose All bands to see the available achievements.</span></div>}
    </div></section>
    <dialog ref={dialog} className="lightbox" aria-label="Photo viewer" onClose={()=>setSelected(null)} onCancel={()=>setSelected(null)} onClick={e=>{if(e.target===e.currentTarget)setSelected(null)}} onKeyDown={e=>{if(e.key==='ArrowRight'){e.preventDefault();move(1)}if(e.key==='ArrowLeft'){e.preventDefault();move(-1)}}}>
      {photo&&<div className="lightbox-inner"><button className="lightbox-close" onClick={()=>setSelected(null)} aria-label="Close photo">×</button><img src={photo.image} alt={photo.name}/><div className="lightbox-bottom"><div aria-live="polite"><strong>{photo.name}</strong><p>{photo.description} · {selected+1} / {visible.length}</p></div><div className="lightbox-controls"><button onClick={()=>move(-1)} aria-label="Previous photo"><Arrow/></button><button onClick={()=>move(1)} aria-label="Next photo"><Arrow/></button></div></div></div>}
    </dialog>
  </>
}
