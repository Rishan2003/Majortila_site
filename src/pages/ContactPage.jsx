import { useState } from 'react'
import Arrow from '../components/ui/Arrow.jsx'
import PageHero from '../components/ui/PageHero.jsx'
import SectionHeading from '../components/ui/SectionHeading.jsx'
export default function ContactPage() {
  const [enquiry, setEnquiry] = useState('')
  const [copied, setCopied] = useState(false)
  const [copyError, setCopyError] = useState(false)
  const prepare = e => {
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    setEnquiry(`Hello HEXA’S Majortila,\n\nMy name is ${f.get('name')}.\nPhone: ${f.get('phone')}\nInterested in: ${f.get('interest')}\nMy goal: ${f.get('goal') || 'I would like help choosing the right next step.'}\n\nPlease advise me on the next available batch or counselling session.`)
    setCopied(false);setCopyError(false)
  }
  const copy = async () => { try { await navigator.clipboard.writeText(enquiry);setCopied(true);setCopyError(false) } catch { setCopyError(true) } }
  return <>
    <PageHero dark eyebrow="Let’s start with a conversation" title="Your next chapter." accent="Let’s talk about it." description="A target score, a new skill, or a little more confidence. Tell us what you’re working towards and take the next step with the Majortila team."/>
    <section className="contact-page"><div className="container contact-page-grid"><div className="contact-info"><SectionHeading label="VISIT OR CALL" title="A real conversation." accent="A clearer direction." copy="Speak with our admissions team about course options, available batches, student care or IELTS registration."/><a href="tel:+8801710764801"><small>CALL ADMISSIONS</small><strong>+880 1710-764801</strong></a><div><small>COME SAY HELLO</small><strong>Siddiquey Plaza, Islampur<br/>Majortila, Sylhet 3100</strong></div></div>
    <form className="contact-form page-form" onSubmit={prepare}>{enquiry?<div className="form-success"><span aria-hidden="true">✓</span><h3>Your enquiry is ready.</h3><p>Copy these details for your conversation, then call our admissions team. Your details have not been sent.</p><pre className="enquiry-preview" tabIndex="0">{enquiry}</pre><div className="hero-actions"><button type="button" className="button button-primary" onClick={copy}>{copied?'Copied!':'Copy my enquiry'} <Arrow/></button><a href="tel:+8801710764801" className="button button-outline">Call admissions</a></div><p className="form-note" role="status">{copyError?'Please select and copy your enquiry text above.':copied?'Your enquiry has been copied. You can share it with the admissions team.':''}</p><button type="button" className="link-button" onClick={()=>setEnquiry('')}>Prepare another enquiry</button></div>:<>
      <div className="form-top"><span>YOUR GOAL, IN YOUR WORDS</span><strong>Prepare for our conversation</strong></div><label>Full name<input required name="name" autoComplete="name" maxLength="100" placeholder="Your name"/></label><div className="field-grid"><label>Phone number<input required name="phone" type="tel" autoComplete="tel" inputMode="tel" minLength="8" maxLength="22" placeholder="01XXXXXXXXX"/></label><label>I’m interested in<select name="interest" defaultValue="" required><option value="" disabled>Select an option</option><option>Course admission</option><option>Exam registration</option><option>AI Speaking Zone</option><option>Reading / Writing / Speaking / Listening Care</option><option>One-to-one counselling</option></select></label></div><label>Your goal<textarea name="goal" rows="4" maxLength="2000" placeholder="For example: I’m aiming for IELTS band 7.0..."/></label><button className="button button-primary button-full" type="submit">Prepare my enquiry <Arrow/></button><p className="form-note">This creates a summary you can copy and share with admissions. Nothing is sent automatically.</p>
    </>}</form></div></section>
  </>
}
