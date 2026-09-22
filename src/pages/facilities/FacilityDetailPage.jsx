import Arrow from '../../components/ui/Arrow.jsx'
import SectionHeading from '../../components/ui/SectionHeading.jsx'
import CtaBand from '../../components/ui/CtaBand.jsx'

export default function FacilityDetailPage({ facility, navigate }) {
  return <>
    <section className="facility-hero"><div className="container facility-hero-grid"><div><div className="micro-label light-label"><span/>{facility.kicker}</div><div className="facility-hero-mark">{facility.mark}</div><h1>{facility.title}</h1><p>{facility.intro}</p><div className="hero-actions"><button className="button button-white" onClick={()=>navigate('/contact')}>Ask about access <Arrow/></button><button className="button button-ghost-light" onClick={()=>navigate('/facilities')}>All facilities</button></div></div><div className="facility-statement"><small>THE GOAL</small><strong>{facility.statement}</strong><span>{facility.outcome}</span></div></div></section>
    <section className="content-section"><div className="container"><SectionHeading label="What you work on" title="Focused support with a" accent="clear purpose." copy="Each facility is designed to solve a specific kind of learning friction instead of adding more generic study time."/><div className="care-points">{facility.points.map(([title,copy],i)=><article key={title}><span>0{i+1}</span><div><h3>{title}</h3><p>{copy}</p></div></article>)}</div></div></section>
    <section className="paper-section content-section"><div className="container process-grid"><div><SectionHeading label="How the session works" title="A simple loop you can" accent="repeat." copy="The format stays practical so the session ends with a specific next step, not just more information."/></div><ol>{facility.steps.map((step,i)=><li key={step}><span>{String(i+1).padStart(2,'0')}</span><strong>{step}</strong></li>)}</ol></div></section>
    <CtaBand eyebrow="Use the support when you need it" title={`Want to know how ${facility.title} fits your course?`} copy="Ask admissions about access, suitable programs and how this facility can support your current goal." primary="Talk to admissions" secondary="View all courses" onPrimary={()=>navigate('/contact')} onSecondary={()=>navigate('/courses')}/>
  </>
}
