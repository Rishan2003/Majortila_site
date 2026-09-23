import { useEffect, useRef, useState } from 'react'
import Arrow from '../ui/Arrow.jsx'
const scenes = [
  { name: 'IELTS on Computer', short: 'IELTS', kicker: 'AMBITION MEETS PREPARATION', first: 'THINK', last: 'BEYOND.', copy: 'শুধু একটা score না, সামনে এগিয়ে যাওয়ার confidence। HEXA’S Majortila-তে IELTS preparation হোক আপনার next step-এর শুরু।', image: './images/computer.webp', alt: 'Students practising in the HEXA’S computer lab', caption: 'Real practice, নতুন possibilities।', tag: 'ON COMPUTER', note: 'আপনার next chapter শুরু এখানেই।' },
  { name: 'Spoken English', short: 'SPOKEN', kicker: 'YOUR IDEAS DESERVE TO BE HEARD', first: 'OWN YOUR', last: 'VOICE.', copy: 'English-এ কথা বলতে আর জড়তা কেন? নিয়মিত practice-এ নিজের কথা বলুন সহজে, confidence-এর সাথে।', image: './images/classroom-presentation.webp', alt: 'A student presenting in a HEXA’S English classroom', caption: 'একসাথে শিখুন, নিজের মতো করে বলুন।', tag: 'SPEAK WITH CONFIDENCE', note: 'জড়তা কমুক, confidence বাড়ুক।' },
  { name: 'HICU Intensive', short: 'HICU', kicker: 'BIG GOALS. FOCUSED PREPARATION.', first: 'MAKE IT', last: 'HAPPEN.', copy: 'সময় কম, target বড়? Focused practice আর personal feedback-এ প্রতিদিন এগিয়ে নিন আপনার IELTS preparation।', image: './images/venue2.webp', alt: 'The HEXA’S IELTS on Computer test centre', caption: 'Goal clear, এবার next step।', tag: 'INTENSIVE PREPARATION', note: 'প্রতিটি practice-এ একটু এগিয়ে যান।' },
]
const duration = 7200
function LetterLine({ text, accent = false }) {
  return <span className={`kinetic-line ${accent ? 'kinetic-accent' : ''}`} aria-label={text}>{[...text].map((letter,i)=><span aria-hidden="true" key={i} style={{'--letter-index':i}}>{letter===' '?'\u00a0':letter}</span>)}</span>
}
export default function KineticHero({ navigate }) {
  const hero = useRef(null)
  const art = useRef(null)
  const touch = useRef(null)
  const [active, setActive] = useState(0)
  const [revision, setRevision] = useState(0)
  const [motion, setMotion] = useState(() => !window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  const [paused, setPaused] = useState(false)
  const [focused, setFocused] = useState(false)
  const [visible, setVisible] = useState(true)
  const [pageVisible, setPageVisible] = useState(() => !document.hidden)
  const scene = scenes[active]
  const running = motion && !paused && !focused && visible && pageVisible
  const choose = index => {setActive((index+scenes.length)%scenes.length);setRevision(i=>i+1)}
  useEffect(() => {
    const sync = () => setMotion(document.documentElement.dataset.motion !== 'off' && !window.matchMedia('(prefers-reduced-motion: reduce)').matches)
    const visibility = () => setPageVisible(!document.hidden)
    sync();window.addEventListener('hexas-motion-change',sync);document.addEventListener('visibilitychange',visibility)
    const observer=new IntersectionObserver(([entry])=>setVisible(entry.isIntersecting),{threshold:.15});observer.observe(hero.current)
    return()=>{window.removeEventListener('hexas-motion-change',sync);document.removeEventListener('visibilitychange',visibility);observer.disconnect()}
  },[])
  useEffect(()=>{
    if(!running)return
    const timer=setTimeout(()=>{setActive(i=>(i+1)%scenes.length);setRevision(i=>i+1)},duration)
    return()=>clearTimeout(timer)
  },[active,revision,running])
  useEffect(()=>{
    const el=hero.current
    let frame
    const reset=()=>{art.current?.style.setProperty('--pointer-x','0');art.current?.style.setProperty('--pointer-y','0')}
    if(!motion){reset();return}
    const move=e=>{
      if(!window.matchMedia('(pointer:fine)').matches || e.pointerType==='touch')return
      cancelAnimationFrame(frame)
      frame=requestAnimationFrame(()=>{
        const r=el.getBoundingClientRect()
        art.current?.style.setProperty('--pointer-x',((e.clientX-r.left)/r.width-.5).toFixed(3))
        art.current?.style.setProperty('--pointer-y',((e.clientY-r.top)/r.height-.5).toFixed(3))
      })
    }
    el.addEventListener('pointermove',move);el.addEventListener('pointerleave',reset)
    return()=>{el.removeEventListener('pointermove',move);el.removeEventListener('pointerleave',reset);cancelAnimationFrame(frame);reset()}
  },[motion])
  const explore=()=>document.getElementById('campus')?.scrollIntoView({behavior:motion?'smooth':'instant'})
  return <section ref={hero} className={`kinetic-hero scene-${active}`} id="home" aria-label="Explore learning at HEXA’S" aria-roledescription="carousel" data-hero-scroll style={{'--scene-duration':`${duration}ms`}} onFocus={()=>setFocused(true)} onBlur={e=>{if(!e.currentTarget.contains(e.relatedTarget))setFocused(false)}} onKeyDown={e=>{if(e.target.closest('.scene-navigation')){if(e.key==='ArrowRight'){e.preventDefault();choose(active+1)}if(e.key==='ArrowLeft'){e.preventDefault();choose(active-1)}}}}>
    <div className="hero-backdrops" aria-hidden="true">{scenes.map((s,i)=><div key={s.name} className={`hero-backdrop ${active===i?'is-active':''}`}><img src={s.image} alt=""/></div>)}</div>
    <div className="hero-beam" aria-hidden="true"/><div className="hero-grid" aria-hidden="true"/>
    <div className="hero-ghost-word" aria-hidden="true">GO FURTHER</div>
    <div className="container kinetic-hero-layout">
      <div className="kinetic-copy">
        <div className="hero-location"><span className="label-line"/>HEXA’S MAJORTILA <span className="location-separator">/</span> SYLHET</div>
        <div key={`copy-${active}-${revision}`} className="scene-copy" aria-live="off"><div className="hero-kicker">{scene.kicker}</div><h1 aria-label={`${scene.first} ${scene.last}`}><LetterLine text={scene.first}/><LetterLine text={scene.last} accent/></h1><p lang="bn">{scene.copy}</p></div>
        <div className="kinetic-actions"><button className="button button-primary button-large magnetic-button" onClick={()=>navigate('/courses')}>Explore your possibilities <span><Arrow/></span></button><button className="campus-link" onClick={explore}><span aria-hidden="true">↘</span>Inside HEXA’S</button></div>
        <div className="hero-social-proof"><div className="proof-faces" aria-hidden="true"><img src="./images/student4.webp" alt=""/><img src="./images/student2.webp" alt=""/><img src="./images/student0.webp" alt=""/></div><div><strong>আপনার goal, আমাদের support।</strong><span>একসাথে শেখা, আপনার মতো করে এগোনো।</span></div></div>
      </div>
      <div className="kinetic-art" ref={art} onTouchStart={e=>{touch.current={x:e.touches[0].clientX,y:e.touches[0].clientY}}} onTouchEnd={e=>{if(!touch.current)return;const dx=e.changedTouches[0].clientX-touch.current.x,dy=e.changedTouches[0].clientY-touch.current.y;if(Math.abs(dx)>65&&Math.abs(dx)>Math.abs(dy)){choose(active+(dx<0?1:-1));setPaused(true)}touch.current=null}}>
        <div className="hero-orbit orbit-one" aria-hidden="true"/><div className="hero-orbit orbit-two" aria-hidden="true"/>
        <div className="hero-asterisk" aria-hidden="true">✳</div>
        <div className="hero-art-parallax"><div className="scene-deck">
          {scenes.map((s,i)=>{const position=(i-active+scenes.length)%scenes.length;return <div key={s.name} className={`scene-photo position-${position}`} aria-hidden={position!==0}><div className="scene-photo-top"><span>HEXA’S / MAJORTILA</span><b>{s.tag}</b></div><div className="scene-photo-image"><img src={s.image} alt={position===0?s.alt:''} fetchPriority={i===0?'high':'auto'} width="900" height="650"/></div><div className="scene-photo-bottom"><span>{s.caption}</span><Arrow size={22}/></div></div>})}
        </div></div>
        <div className="floating-note" key={`note-${active}`}><span className="note-index">0{active+1}</span><div><span>YOUR NEXT CHAPTER</span><strong>{scene.note}</strong></div><span className="note-spark" aria-hidden="true">✦</span></div>
        <div className="floating-result"><span className="result-label">A MOMENT WORTH CELEBRATING</span><div><strong>8.0</strong><span>OVERALL<br/>IELTS BAND</span></div><small>Mashuda Siddika Maisha</small></div>
        <span className="orbit-label" aria-hidden="true">LEARN. PRACTISE. BECOME.</span>
      </div>
    </div>
    <div className="container hero-bottom-bar"><div className="scene-navigation" aria-label="Featured programs">
      {scenes.map((s,i)=><button key={s.short} className={`scene-tab ${active===i?'active':''}`} aria-label={`Show ${s.name}`} aria-pressed={active===i} onClick={()=>choose(i)}><span>0{i+1}</span><strong>{s.short}</strong><small>{i===0?'Aim higher':i===1?'Speak bolder':'Build momentum'}</small>{active===i&&<i className={`scene-progress ${running?'running':''}`} key={`${active}-${revision}-${running}`} aria-hidden="true"/>}</button>)}
      <button className="hero-pause" disabled={!motion} onClick={()=>{if(paused)setFocused(false);setPaused(v=>!v)}} aria-pressed={paused} aria-label={paused?'Resume hero slideshow':'Pause hero slideshow'} title={paused?'Resume slideshow':'Pause slideshow'}><span aria-hidden="true">{paused?'▷':'Ⅱ'}</span></button>
    </div><button className="discover-scroll" onClick={explore}>DISCOVER MORE <span aria-hidden="true">↓</span></button></div>
  </section>
}
