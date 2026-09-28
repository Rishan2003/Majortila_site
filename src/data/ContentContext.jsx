import { createContext, useContext, useEffect, useState } from 'react'
import defaults from '../../shared/default-content.json'
const Context=createContext(null)
export function ContentProvider({children}){
 const [content,setContent]=useState(defaults),[online,setOnline]=useState(null)
 useEffect(()=>{let live=true;const refresh=()=>fetch('/api/content').then(r=>{if(!r.ok)throw Error();return r.json()}).then(c=>{if(live){setContent(c);setOnline(true)}}).catch(()=>{if(live)setOnline(false)});refresh();const timer=setInterval(refresh,60000);window.addEventListener('focus',refresh);return()=>{live=false;clearInterval(timer);window.removeEventListener('focus',refresh)}},[])
 return <Context.Provider value={{content,setContent,online}}>{children}</Context.Provider>
}
export const useContent=()=>useContext(Context)
export function PhoneLink({children,...props}){const {content}=useContent();return <a {...props} href={`tel:${content.phone.replace(/[^+\d]/g,'')}`}>{children||content.phone}</a>}
