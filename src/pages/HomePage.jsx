import Arrow from '../components/ui/Arrow.jsx'
import SectionHeading from '../components/ui/SectionHeading.jsx'
import CtaBand from '../components/ui/CtaBand.jsx'
import KineticHero from '../components/home/KineticHero.jsx'
import ScrollGallery from '../components/home/ScrollGallery.jsx'
import AnimatedText from '../components/ui/AnimatedText.jsx'
import { courses } from '../data/courses.js'
import { resources, updates } from '../data/homeContent.js'
export default function HomePage({ navigate }) {
  const featured = [courses[0], courses[4], courses[3], courses[1], courses[2], courses[8]]
  const photos = ['venue.webp','classroom-presentation.webp','computer.webp','computer-lab.webp','english-classroom.webp','welcome-class.webp']
  const photoAlts = ['Computer test preparation facilities at HEXA’S','English speaking practice in a HEXA’S classroom','Students practising in the HEXA’S computer lab','Computer workstations at HEXA’S','An English class at HEXA’S','Students attending a HEXA’S class']
  return <>
    <KineticHero navigate={navigate}/>
    <div className="ticker" aria-label="IELTS Academic, Spoken English, IELTS on Computer, Intensive preparation, Student care"><div className="ticker-track" aria-hidden="true">{[0,1].map(n=><div className="ticker-group" key={n}>{['IELTS Academic','Spoken English','IELTS on Computer','Intensive preparation','Student care'].map(t=><span key={t}>{t}<b>✦</b></span>)}</div>)}</div></div>
    <section className="home-courses paper-section"><div className="container">
      <div className="split-heading"><SectionHeading label="02 / FIND YOUR DIRECTION" title="Different goals." accent="One great place to start."/><button className="button button-outline" onClick={() => navigate('/courses')}>All 12 programs <Arrow/></button></div>
      <div className="editorial-courses">{featured.map((course,i)=><article key={course.title} className="editorial-course reveal"><a href="#/courses" className="course-photo" aria-label={`Explore ${course.title}`}><img src={`./images/${photos[i]}`} alt={photoAlts[i]} loading="lazy" width="640" height="440"/><span>{course.accent}</span><span className="circle-arrow"><Arrow/></span></a><div className="editorial-course-body"><div className="course-eyebrow"><span>0{i+1} / {course.group}</span><span>{course.duration}</span></div><h3>{course.title}</h3><p lang="bn">{course.desc}</p><button onClick={() => navigate('/courses')}>Explore the program <Arrow size={18}/></button></div></article>)}</div>
    </div></section>
    <section className="experience-section" id="campus"><div className="container experience-grid">
      <div className="experience-media reveal" data-parallax><img src="./images/venue2.webp" alt="HEXA’S IELTS on Computer test centre entrance in Majortila" loading="lazy" width="900" height="1100"/><span className="photo-label">YOUR CAMPUS. YOUR NEXT CHAPTER.</span><div className="experience-inset"><img src="./images/venue.webp" alt="Computer workstations inside the IELTS test venue" loading="lazy" width="350" height="240"/></div></div>
      <div className="experience-copy"><SectionHeading label="03 / THE HEXA’S EXPERIENCE" title="Find your rhythm." accent="with an extensive range of top-tier facilities" copy="শেখার জন্য চাই ভালো environment আর ঠিক সময়ে support। Class থেকে practice—প্রতিটি ধাপে পাশে আছে HEXA’S।"/>
      <div className="experience-points">{[['01','Space to practise','Computer lab আর IELTS test environment-এ practice করে exam-এর আগে নিজেকে ready করুন।','/facilities'],['02','Care that goes further','Reading, Writing, Listening বা Speaking—যেখানে আটকে যাচ্ছেন, সেখানেই পান focused support।','/facilities/speaking-care'],['03','A voice that’s your own','AI Speaking Zone আর Speakers’ Cafe-তে কথা বলুন, practice করুন, confidence বাড়ান।','/facilities/ai-speaking-zone']].map(([n,t,p,url])=><a className="reveal" href={`#${url}`} key={n}><span>{n}</span><div><h3>{t}</h3><p lang="bn">{p}</p></div><Arrow/></a>)}</div><button className="button button-primary" onClick={() => navigate('/facilities')}>Discover student care <Arrow/></button></div>
    </div></section>
    <ScrollGallery/>
    <section className="home-registration" aria-labelledby="home-registration-title">
      <div className="container home-registration-layout">
        <div className="home-registration-copy reveal">
          <div className="section-label">FROM PREPARATION TO TEST DAY</div>
          <span className="home-registration-arrow" aria-hidden="true">↗</span>
          <h2 id="home-registration-title"><AnimatedText>You’ve put in the work.</AnimatedText><em><AnimatedText>Let’s take the next step.</AnimatedText></em></h2>
          <p lang="bn">কোন IELTS test দেবেন, কী documents লাগবে, registration কীভাবে করবেন—সব ধাপে guidance পাবেন আমাদের team-এর কাছ থেকে।</p>
          <button className="button button-primary" onClick={() => navigate('/exam-registration')}>IELTS registration <Arrow/></button>
        </div>
        <figure className="home-registration-photo reveal">
          <div className="home-registration-image"><img src="./images/venue2.webp" alt="HEXA’S IELTS on Computer test centre entrance in Majortila" loading="lazy" width="1280" height="960"/></div>
          <figcaption><span>HEXA’S MAJORTILA</span><span>আপনার next chapter শুরু এখানেই। <Arrow size={18}/></span></figcaption>
        </figure>
      </div>
    </section>
    <section className="resources-section paper-section"><div className="container"><div className="split-heading"><SectionHeading label="05 / KEEP YOUR MOMENTUM" title="Your learning doesn’t" accent="stop at the door." copy="আমাদের clubs-এ join করুন—একসাথে শিখুন, practice করুন।"/><a href="#/facilities" className="link-button">Explore learning support <Arrow/></a></div><div className="resource-grid">{resources.map((r,i)=><a className="resource-card reveal" href={i===0?'#/facilities/reading-care':i===1?'#/facilities/writing-care':'#/facilities'} key={r.title}><div className="resource-top"><span>{r.type} / Learning support</span><Arrow/></div><strong>{r.mark}</strong><h3>{r.title}</h3><p lang="bn">{r.subtitle}</p></a>)}</div></div></section>
    <section className="batches-section"><div className="container batches-layout"><div><SectionHeading label="06 / YOUR NEXT MOVE" title="Make room for" accent="your ambition." copy="আপনার routine-এর সাথে মিলিয়ে বেছে নিন Morning, Afternoon বা Evening batch।"/><button className="button button-primary" onClick={() => navigate('/contact')}>Find my next batch <Arrow/></button></div><div className="batch-board">{[['Morning','দিনটা শুরু হোক নতুন কিছু শেখা দিয়ে।'],['Afternoon','দুপুরের সময়টা কাজে লাগান নিজের progress-এ।'],['Evening','ব্যস্ত দিন শেষে একটু সময় নিজের learning-এর জন্য।']].map(([t,p],i)=><a href="#/contact" className="reveal" key={t}><span>0{i+1}</span><div><h3>{t} batch</h3><p lang="bn">{p}</p></div><Arrow/></a>)}</div></div></section>
    <section className="updates-section"><div className="container"><div className="split-heading"><SectionHeading label="FROM THE STUDY DESK" title="Good questions." accent="Better preparation."/></div><div className="updates-grid">{updates.map(([date,category,title],i)=><a href="#/contact" className="reveal" key={title}><span className="update-category">{category}</span><h3>{title}</h3><div>Ask our team <Arrow/></div></a>)}</div></div></section>
    <CtaBand eyebrow="THE NEXT CHAPTER IS YOURS" title="Where will your English take you?" copy="আপনার goal নিয়ে কথা বলুন। কোন পথে শুরু করবেন, সেটা ঠিক করতে আমরা পাশে আছি।" primary="Let’s find out" secondary="Explore courses" onPrimary={() => navigate('/contact')} onSecondary={() => navigate('/courses')}/>
  </>
}
