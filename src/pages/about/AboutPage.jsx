import Arrow from '../../components/ui/Arrow.jsx'
import PageHero from '../../components/ui/PageHero.jsx'
import SectionHeading from '../../components/ui/SectionHeading.jsx'
import CtaBand from '../../components/ui/CtaBand.jsx'
import { aboutLinks } from '../../data/navigation.js'

export default function AboutPage({ navigate }) {
  return <>
    <PageHero eyebrow="About Hexa's Majortila" title="Built around" accent="student progress." description="Sylhet-এ English আর IELTS শেখার পরিচিত community। Focused class, practice facilities আর exam support—সব একসাথে HEXA’S-এ।" stats={[["10K+","successful students"],["8.5","top IELTS band"],["5×","country top performer"]]}/>
    <section className="content-section"><div className="container about-story-grid"><div><SectionHeading label="Our purpose" title="Language skills that open" accent="real doors." copy="শুধু lecture শুনে নয়, practice করেই শেখা। HEXA’S-এ class-এর সাথে পাবেন regular practice আর আপনার প্রয়োজন অনুযায়ী support।"/><div className="quote-card"><span>MISSION</span><blockquote lang="bn">English ব্যবহারে confidence তৈরি করাই আমাদের goal—সহজে practice করার সুযোগ আর personal guidance দিয়ে।</blockquote></div></div><div className="story-visual"><img src="./images/welcome-class.webp" alt="Hexa's learning environment"/><div className="story-badge"><strong>19+</strong><span>years of experience highlighted by Hexa's</span></div></div></div></section>
    <section className="paper-section content-section"><div className="container"><SectionHeading label="Explore about us" title="Get to know the" accent="full story." copy="আমাদের students, তাদের achievements আর partners-দের সম্পর্কে আরও জানুন।"/><div className="feature-link-grid">{aboutLinks.map(([path,title,copy],i)=><button key={path} onClick={() => navigate(path)}><span>0{i+1}</span><div><h3>{title}</h3><p lang="bn">{copy}</p></div><Arrow/></button>)}</div></div></section>
    <CtaBand eyebrow="Find your route" title="Ready to start learning with Hexa's?" copy="Course-গুলো দেখে নিন, অথবা আপনার goal অনুযায়ী কোনটা ভালো হবে তা নিয়ে admissions team-এর সাথে কথা বলুন।" primary="Explore courses" secondary="Talk to admissions" onPrimary={() => navigate('/courses')} onSecondary={() => navigate('/contact')}/>
  </>
}
