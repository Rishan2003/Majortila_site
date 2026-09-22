import Arrow from '../../components/ui/Arrow.jsx'
import PageHero from '../../components/ui/PageHero.jsx'
import SectionHeading from '../../components/ui/SectionHeading.jsx'
import CtaBand from '../../components/ui/CtaBand.jsx'

export default function WhyChoosePage({ navigate }) {
  const reasons = [
    ['Official test environment', 'Prepare in a setting connected to the IELTS test journey, including computer-delivered practice and registration support.'],
    ['Recognised performance', 'Hexa’s highlights five Country Top Performer recognitions and a long record of high-band student outcomes.'],
    ['Care beyond class', 'Reading, writing, speaking and listening support gives students additional routes to fix specific weaknesses.'],
    ['Computer practice', 'Dedicated computer-based preparation helps learners become comfortable with digital test workflows before exam day.'],
    ['Intensive pathways', 'HICU-style programs create a more concentrated rhythm for students who need a short, focused preparation cycle.'],
    ['Long-standing local presence', 'A central Majortila location and years of service have made Hexa’s a familiar name in Sylhet.'],
  ]
  return <>
    <PageHero eyebrow="Why choose us" title="A learning system with" accent="more ways to improve." description="Results matter, but so does what creates them: realistic practice, useful feedback, technology, specialist care and support that continues toward test day." stats={[["8.5","top band"],["10K+","student stories"],["99%","Life Skills success highlighted by Hexa's"]]}/>
    <section className="record-section"><div className="container"><SectionHeading label="Student outcomes" title="A record that keeps" accent="raising the bar." copy="Hexa's highlights thousands of student results across IELTS band levels." center/><div className="record-grid">{[['8.5','11'],['8.0','103'],['7.5','1,029'],['7.0','2,056'],['6.5','3,140'],['6.0','4,385']].map(([band,count],i)=><article key={band} className={i<2?'record-card record-card-top':'record-card'}><span>{i<2?'RECORD':'RESULT'}</span><strong>{band}</strong><small>BAND SCORE</small><div><b>{count}</b><em>students</em></div></article>)}</div></div></section>
    <section className="paper-section content-section"><div className="container"><div className="split-heading"><SectionHeading label="Why your success starts here" title="Support at every" accent="practice point." copy="The strongest reason to choose a learning provider is whether the system helps you know what to do next."/><button className="button button-outline" onClick={() => navigate('/facilities')}>Explore facilities <Arrow/></button></div><div className="reason-grid">{reasons.map(([title,copy],i)=><article key={title}><span>0{i+1}</span><h3>{title}</h3><p>{copy}</p></article>)}</div></div></section>
    <CtaBand eyebrow="Your future awaits" title="Turn your target score into a plan." copy="Start with the right course and use the support around it to keep improving." primary="Find a course" secondary="Book counselling" onPrimary={() => navigate('/courses')} onSecondary={() => navigate('/contact')}/>
  </>
}
