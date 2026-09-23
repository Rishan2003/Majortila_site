import Arrow from '../../components/ui/Arrow.jsx'
import PageHero from '../../components/ui/PageHero.jsx'
import SectionHeading from '../../components/ui/SectionHeading.jsx'
import CtaBand from '../../components/ui/CtaBand.jsx'

export default function WhyChoosePage({ navigate }) {
  const reasons = [
    ['Official test environment', 'Computer-এ practice থেকে registration support—IELTS test journey-এর সাথে মিল রেখেই নিন preparation।'],
    ['Recognised performance', 'HEXA’S-এর অর্জনে আছে পাঁচবার Country Top Performer recognition আর বহু student-এর high-band result।'],
    ['Care beyond class', 'Reading, Writing, Speaking আর Listening-এর যেখানেই সমস্যা, বাড়তি care-এ সেখানেই কাজ করুন।'],
    ['Computer practice', 'Exam day-এর আগেই computer-based practice-এ অভ্যস্ত হয়ে নিন digital test format-এর সাথে।'],
    ['Intensive pathways', 'অল্প সময়ে focused preparation চাইলে HICU programs-এ পাবেন intensive practice-এর সুযোগ।'],
    ['Long-standing local presence', 'Majortila-তে সহজ location আর দীর্ঘদিনের teaching experience—Sylhet-এ HEXA’S তাই পরিচিত নাম।'],
  ]
  return <>
    <PageHero eyebrow="Why choose us" title="A learning system with" accent="more ways to improve." description="ভালো result-এর পেছনে থাকে real practice, কাজে লাগার মতো feedback আর ঠিক সময়ে support। Class থেকে test day—পুরো journey-তেই এগুলো দরকার।" stats={[["8.5","top band"],["10K+","student stories"],["99%","Life Skills success highlighted by Hexa's"]]}/>
    <section className="record-section"><div className="container"><SectionHeading label="Student outcomes" title="A record that keeps" accent="raising the bar." copy="বিভিন্ন IELTS band-এ হাজারো student-এর result তুলে ধরেছে HEXA’S।" center/><div className="record-grid">{[['8.5','11'],['8.0','103'],['7.5','1,029'],['7.0','2,056'],['6.5','3,140'],['6.0','4,385']].map(([band,count],i)=><article key={band} className={i<2?'record-card record-card-top':'record-card'}><span>{i<2?'RECORD':'RESULT'}</span><strong>{band}</strong><small>BAND SCORE</small><div><b>{count}</b><em>students</em></div></article>)}</div></div></section>
    <section className="paper-section content-section"><div className="container"><div className="split-heading"><SectionHeading label="Why your success starts here" title="Support at every" accent="practice point." copy="শেখার পথে next step কী হবে, সেটা পরিষ্কার থাকলে এগোনো সহজ। আমাদের support আপনাকে সেই direction দেয়।"/><button className="button button-outline" onClick={() => navigate('/facilities')}>Explore facilities <Arrow/></button></div><div className="reason-grid">{reasons.map(([title,copy],i)=><article key={title}><span>0{i+1}</span><h3>{title}</h3><p lang="bn">{copy}</p></article>)}</div></div></section>
    <CtaBand eyebrow="Your future awaits" title="Turn your target score into a plan." copy="আপনার জন্য ঠিক course দিয়ে শুরু করুন। সাথে থাকা support কাজে লাগিয়ে এগিয়ে যান নিয়মিত।" primary="Find a course" secondary="Book counselling" onPrimary={() => navigate('/courses')} onSecondary={() => navigate('/contact')}/>
  </>
}
