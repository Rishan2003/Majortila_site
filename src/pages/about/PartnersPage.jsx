import Arrow from '../../components/ui/Arrow.jsx'
import PageHero from '../../components/ui/PageHero.jsx'
import SectionHeading from '../../components/ui/SectionHeading.jsx'

export default function PartnersPage() {
  const partners = [
    { type:'Strategic partner', name:'British Council', initials:'BC', copy:'IELTS registration, testing standards আর English assessment-এর সাথে যুক্ত partner।', url:'https://www.britishcouncil.org.bd/' },
    { type:'Strategic partner', name:'IDP IELTS', initials:'IDP', copy:'International IELTS network-এর অংশ, test services আর global education journey-তে support দেয়।', url:'https://www.idp.com/' },
    { type:'Technology partner', name:'The it AID', initials:'IT', copy:'Learning আর প্রতিদিনের কাজ সহজ করতে digital ও technology support দেয় আমাদের এই partner।', url:'https://theitaid.com/' },
  ]
  return <>
    <PageHero eyebrow="Strategic alliances & collaborations" title="Our global" accent="partners." description="Trusted exam services, international standards আর learning technology—আমাদের partnerships students-দের এগুলোর সাথে connect করে।"/>
    <section className="content-section paper-section"><div className="container"><SectionHeading label="Partner network" title="Collaboration that strengthens the" accent="student journey." copy="Exam services, global opportunities আর technology-তে support দেওয়া আমাদের partners-দের সম্পর্কে জানুন।"/><div className="partner-grid">{partners.map((p,i)=><article key={p.name}><div className={`partner-mark partner-mark-${i+1}`}>{p.initials}</div><span>{p.type}</span><h3>{p.name}</h3><p lang="bn">{p.copy}</p><a href={p.url} target="_blank" rel="noreferrer">Visit partner website <Arrow size={15}/></a></article>)}</div></div></section>
    <section className="content-section"><div className="container partnership-note"><div><span>WHY PARTNERSHIPS MATTER</span><h2>Standards, access and support beyond one classroom.</h2></div><p lang="bn">ভালো learning experience তৈরি হয় একসাথে কাজ করার মাধ্যমে। Exam bodies, education networks আর technology partners class-এর preparation-কে students-দের পরের ধাপের সাথে connect করে।</p></div></section>
  </>
}
