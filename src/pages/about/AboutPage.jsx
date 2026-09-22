import Arrow from '../../components/ui/Arrow.jsx'
import PageHero from '../../components/ui/PageHero.jsx'
import SectionHeading from '../../components/ui/SectionHeading.jsx'
import CtaBand from '../../components/ui/CtaBand.jsx'
import { aboutLinks } from '../../data/navigation.js'

export default function AboutPage({ navigate }) {
  return <>
    <PageHero eyebrow="About Hexa's Majortila" title="Built around" accent="student progress." description="A long-standing English and IELTS learning community in Sylhet, combining focused teaching, practice facilities and exam support in one student journey." stats={[["10K+","successful students"],["8.5","top IELTS band"],["5×","country top performer"]]}/>
    <section className="content-section"><div className="container about-story-grid"><div><SectionHeading label="Our purpose" title="Language skills that open" accent="real doors." copy="Hexa's is designed for learners who need more than lectures. We connect classroom learning with repeated practice, individual support and practical preparation for the next milestone."/><div className="quote-card"><span>MISSION</span><blockquote>Build confident English users by making improvement visible, practice accessible and guidance personal.</blockquote></div></div><div className="story-visual"><img src="./images/welcome-class.webp" alt="Hexa's learning environment"/><div className="story-badge"><strong>19+</strong><span>years of experience highlighted by Hexa's</span></div></div></div></section>
    <section className="paper-section content-section"><div className="container"><SectionHeading label="Explore about us" title="Get to know the" accent="full story." copy="Use these pages to explore the evidence, people and partnerships behind the brand."/><div className="feature-link-grid">{aboutLinks.map(([path,title,copy],i)=><button key={path} onClick={() => navigate(path)}><span>0{i+1}</span><div><h3>{title}</h3><p>{copy}</p></div><Arrow/></button>)}</div></div></section>
    <CtaBand eyebrow="Find your route" title="Ready to start learning with Hexa's?" copy="Explore the programs or speak to admissions about the best fit for your goal." primary="Explore courses" secondary="Talk to admissions" onPrimary={() => navigate('/courses')} onSecondary={() => navigate('/contact')}/>
  </>
}
