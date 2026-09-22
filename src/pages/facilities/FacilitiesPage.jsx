import Arrow from '../../components/ui/Arrow.jsx'
import PageHero from '../../components/ui/PageHero.jsx'
import { facilities } from '../../data/facilities.js'

export default function FacilitiesPage({ navigate }) {
  return <>
    <PageHero eyebrow="Facilities & student care" title="More practice, more feedback," accent="more ways forward." description="Hexa's facilities extend learning beyond the main classroom with technology-assisted practice, specialist skill care, conversation spaces and personal guidance."/>
    <section className="content-section"><div className="container"><div className="facility-grid">{Object.entries(facilities).map(([slug,item],i)=><button className={slug==='ai-speaking-zone'?'facility-card facility-card-featured':'facility-card'} key={slug} onClick={()=>navigate(`/facilities/${slug}`)}><div className="facility-mark">{item.mark}</div><span>0{i+1}</span><h3>{item.title}</h3><p>{item.intro}</p><div>Explore facility <Arrow size={15}/></div></button>)}</div></div></section>
    <section className="facility-method"><div className="container"><div><span>ONE LEARNING ECOSYSTEM</span><h2>Use the right support for the problem you have today.</h2></div><div className="method-flow"><article><b>01</b><strong>Learn</strong><span>Build the skill in class.</span></article><article><b>02</b><strong>Practise</strong><span>Use labs, care and speaking spaces.</span></article><article><b>03</b><strong>Review</strong><span>Turn errors into the next focus.</span></article><article><b>04</b><strong>Repeat</strong><span>Come back with a clearer target.</span></article></div></div></section>
  </>
}
