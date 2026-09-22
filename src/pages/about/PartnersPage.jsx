import Arrow from '../../components/ui/Arrow.jsx'
import PageHero from '../../components/ui/PageHero.jsx'
import SectionHeading from '../../components/ui/SectionHeading.jsx'

export default function PartnersPage() {
  const partners = [
    { type:'Strategic partner', name:'British Council', initials:'BC', copy:'Connected to IELTS registration, testing standards and the wider English assessment ecosystem.', url:'https://www.britishcouncil.org.bd/' },
    { type:'Strategic partner', name:'IDP IELTS', initials:'IDP', copy:'Part of the international IELTS ecosystem supporting test services and global education pathways.', url:'https://www.idp.com/' },
    { type:'Technology partner', name:'The it AID', initials:'IT', copy:'Digital and technology support partner helping power modern learning and operational systems.', url:'https://theitaid.com/' },
  ]
  return <>
    <PageHero eyebrow="Strategic alliances & collaborations" title="Our global" accent="partners." description="Partnerships connect students to trusted exam services, international standards and the technology needed for modern learning."/>
    <section className="content-section paper-section"><div className="container"><SectionHeading label="Partner network" title="Collaboration that strengthens the" accent="student journey." copy="Explore the organisations that connect our students to exam services, global opportunities and technology."/><div className="partner-grid">{partners.map((p,i)=><article key={p.name}><div className={`partner-mark partner-mark-${i+1}`}>{p.initials}</div><span>{p.type}</span><h3>{p.name}</h3><p>{p.copy}</p><a href={p.url} target="_blank" rel="noreferrer">Visit partner website <Arrow size={15}/></a></article>)}</div></div></section>
    <section className="content-section"><div className="container partnership-note"><div><span>WHY PARTNERSHIPS MATTER</span><h2>Standards, access and support beyond one classroom.</h2></div><p>Strong education ecosystems are collaborative. External exam bodies, international education networks and technology partners help connect classroom preparation with the wider journey students are preparing for.</p></div></section>
  </>
}
