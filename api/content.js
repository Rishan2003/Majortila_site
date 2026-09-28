import { createHmac, timingSafeEqual, randomBytes } from 'node:crypto'
import defaults from '../shared/default-content.json' with { type: 'json' }
const key = 'hexas:site-content:v1'
const secret = () => process.env.ADMIN_PASSWORD || ''
const sign = value => createHmac('sha256', secret()).update(value).digest('hex')
const equal = (a,b) => {const x=Buffer.from(a), y=Buffer.from(b);return x.length===y.length && timingSafeEqual(x,y)}
const cookieName='hexas_admin'
function authenticated(req) {
  const token=(req.headers.cookie||'').split('; ').find(v=>v.startsWith(cookieName+'='))?.slice(cookieName.length+1)||''
  const [time,nonce,sig]=token.split('.')
  return !!time && !!nonce && !!sig && Number(time)>Date.now() && Number(time)<Date.now()+28801000 && equal(sig,sign(`${time}.${nonce}`))
}
async function redis(command) {
 const url=process.env.KV_REST_API_URL||process.env.UPSTASH_REDIS_REST_URL
 const token=process.env.KV_REST_API_TOKEN||process.env.UPSTASH_REDIS_REST_TOKEN
 if(!url||!token) throw new Error('Connect Upstash Redis and configure its REST URL and token.')
 const r=await fetch(url,{method:'POST',headers:{Authorization:`Bearer ${token}`,'Content-Type':'application/json'},body:JSON.stringify(command)})
 const data=await r.json(); if(!r.ok||data.error) throw new Error('Content storage is unavailable.');return data.result
}
function validate(c) {
 const str=(v,max=500)=>typeof v==='string'&&v.length<=max
 if(!c||!Number.isInteger(c.revision)||!str(c.phone,30)||!/^\+?[\d ()-]{8,30}$/.test(c.phone)||!str(c.officeHours))return false
 if(!Array.isArray(c.courses)||c.courses.length!==defaults.courses.length)return false
 for(const d of defaults.courses){const x=c.courses.find(v=>v.id===d.id);if(!x||!['fee','discountFee','duration','classes','classDuration','desc'].every(k=>str(x[k],1000))||!Array.isArray(x.features)||x.features.length>20||!x.features.every(v=>str(v)))return false}
 for(const id of Object.keys(defaults.schedules)){const x=c.schedules?.[id];if(!x||!['days','start','end','location','note'].every(k=>str(x[k]))||!['unannounced','active','paused'].includes(x.status))return false;if(x.status==='active'&&(!x.days.trim()||!/^([01]\d|2[0-3]):[0-5]\d$/.test(x.start)||!/^([01]\d|2[0-3]):[0-5]\d$/.test(x.end)||x.start>=x.end))return false}
 return c.tests&&['mockFee','partialFee','schedule'].every(k=>str(c.tests[k]))
}
export default async function handler(req,res){
 res.setHeader('Cache-Control','no-store');res.setHeader('X-Content-Type-Options','nosniff')
 const reply=(status,data)=>res.status(status).json(data)
 try {
  if(req.method==='GET'){const raw=await redis(['GET',key]);return reply(200,raw?JSON.parse(raw):defaults)}
  if(!['POST','PUT','DELETE'].includes(req.method))return reply(405,{error:'Method not allowed'})
  if(!secret()||secret().length<16)return reply(503,{error:'Set ADMIN_PASSWORD to at least 16 characters in your hosting settings.'})
  const origin=req.headers.origin
  if(!origin||new URL(origin).host!==req.headers.host)return reply(403,{error:'Request origin rejected'})
  if(req.method==='DELETE'){res.setHeader('Set-Cookie',`${cookieName}=; HttpOnly; SameSite=Strict; Path=/; Max-Age=0; Secure`);return reply(200,{ok:true})}
  if(req.method==='POST'){
   const ip=req.headers['x-real-ip']||req.socket?.remoteAddress||'unknown'; const bucket=`hexas:login:${ip}:${Math.floor(Date.now()/600000)}`
   const count=await redis(['INCR',bucket]);if(count===1)await redis(['EXPIRE',bucket,600]);if(count>15)return reply(429,{error:'Too many login attempts. Try again in 10 minutes.'})
   if(typeof req.body?.password!=='string'||!equal(req.body.password,secret()))return reply(401,{error:'Incorrect password'})
   const value=`${Date.now()+28800000}.${randomBytes(24).toString('hex')}`
   res.setHeader('Set-Cookie',`${cookieName}=${value}.${sign(value)}; HttpOnly; SameSite=Strict; Path=/; Max-Age=28800${process.env.NODE_ENV==='development'?'':'; Secure'}`)
   return reply(200,{ok:true})
  }
  if(!authenticated(req))return reply(401,{error:'Please sign in again. Your edits are still on this page.'})
  if(!validate(req.body))return reply(400,{error:'Check all fields. Published sessions need days and valid start/end times (end after start).'})
  const c=req.body
  const clean={revision:c.revision+1,phone:c.phone,officeHours:c.officeHours,courses:defaults.courses.map(d=>({...d,...Object.fromEntries(['fee','discountFee','duration','classes','classDuration','desc','features'].map(k=>[k,c.courses.find(x=>x.id===d.id)[k]]))})),schedules:Object.fromEntries(Object.keys(defaults.schedules).map(id=>[id,{...c.schedules[id],title:defaults.schedules[id].title}])),tests:c.tests}
  const script="local old=redis.call('GET',KEYS[1]); local rev=0; if old then rev=cjson.decode(old).revision end; if rev~=tonumber(ARGV[1]) then return 0 end; redis.call('SET',KEYS[1],ARGV[2]); return 1"
  const saved=await redis(['EVAL',script,1,key,c.revision,JSON.stringify(clean)])
  if(!saved)return reply(409,{error:'Another administrator updated the site. Copy your changes, then reload before saving.'})
  return reply(200,clean)
 }catch(e){return reply(503,{error:e.message==='Connect Upstash Redis and configure its REST URL and token.'?e.message:'Content service unavailable. Please try again.'})}
}
