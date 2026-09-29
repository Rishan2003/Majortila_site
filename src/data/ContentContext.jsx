import { createContext, useContext, useEffect, useState } from 'react'
import defaults from '../../shared/default-content.json'
const Context=createContext(null)
export function ContentProvider({children}){
 const [content,setContent]=useState(defaults),[online,setOnline]=useState(null)
 useEffect(()=>{let live=true;const refresh=()=>fetch('/api/content').then(r=>{if(!r.ok)throw Error();return r.json()}).then(c=>{if(live){setContent(c);setOnline(true)}}).catch(()=>{if(live)setOnline(false)});refresh();const timer=setInterval(refresh,60000);window.addEventListener('focus',refresh);return()=>{live=false;clearInterval(timer);window.removeEventListener('focus',refresh)}},[])
 return <Context.Provider value={{content,setContent,online}}>{children}</Context.Provider>
}
export const useContent=()=>useContext(Context)
export const registrationPhone = '+8801334934850'
export function contactNumber(content, registration) {
 const route = window.location.hash.replace(/^#/, '')
 const isRegistration = registration ?? ['/exam-registration','/mock-partial-registration','/facilities/registration-corner','/facilities/mock-test'].includes(route)
 return isRegistration ? registrationPhone : content.phone
}
export function WhatsAppLink({children, registration, message = '', ...props}) {
 const {content}=useContent()
 const phone=contactNumber(content, registration).replace(/\D/g,'')
 return <a {...props} href={'https://wa.me/'+phone+(message ? '?text='+encodeURIComponent(message) : '')} target="_blank" rel="noopener noreferrer">{children || 'WhatsApp'}</a>
}
export function PhoneLink({children, registration, message, ...props}) {
 const {content}=useContent()
 const phone=contactNumber(content, registration)
 return <><a {...props} href={'tel:'+phone.replace(/[^+\d]/g,'')}>{children || 'Call '+phone}</a><WhatsAppLink registration={registration} message={message} className={props.className}>WhatsApp</WhatsAppLink></>
}
