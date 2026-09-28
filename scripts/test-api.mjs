import assert from 'node:assert/strict'
import handler from '../api/content.js'
import defaults from '../shared/default-content.json' with { type:'json' }
process.env.ADMIN_PASSWORD='test-password-for-tests-only';process.env.KV_REST_API_URL='https://test.invalid';process.env.KV_REST_API_TOKEN='test'
let stored=null,attempts=0
const original=global.fetch
global.fetch=async(url,opts)=>{const [op,...args]=JSON.parse(opts.body);let result;if(op==='GET')result=stored;else if(op==='INCR')result=++attempts;else if(op==='EXPIRE')result=1;else if(op==='EVAL'){if((stored?JSON.parse(stored).revision:0)!==args[3])result=0;else{stored=args[4];result=1}}return {ok:true,json:async()=>({result})}}
async function call(method,body,cookie='',origin='https://site.test'){let status,headers={},result;await handler({method,body,headers:{host:'site.test',origin,cookie,'x-real-ip':'127.0.0.1'}},{setHeader:(k,v)=>headers[k]=v,status:n=>{status=n;return {json:d=>result=d}}});return {status,headers,result}}
try{
 assert.equal((await call('GET')).result.phone,defaults.phone)
 assert.equal((await call('PUT',defaults)).status,401)
 assert.equal((await call('POST',{password:'wrong'})).status,401)
 assert.equal((await call('POST',{password:process.env.ADMIN_PASSWORD},'','https://evil.test')).status,403)
 const login=await call('POST',{password:process.env.ADMIN_PASSWORD});assert.equal(login.status,200);assert.match(login.headers['Set-Cookie'],/HttpOnly/)
 const cookie=login.headers['Set-Cookie'].split(';')[0]
 const updated=structuredClone(defaults);updated.phone='+880 1700-123456';updated.courses[0].discountFee='৳14,000';updated.schedules['reading-care']={...updated.schedules['reading-care'],status:'active',days:'Sunday, Tuesday',start:'15:00',end:'16:30'}
 assert.equal((await call('PUT',updated,cookie)).status,200)
 const read=await call('GET');assert.equal(read.result.phone,updated.phone);assert.equal(read.result.courses[0].discountFee,'৳14,000');assert.equal(read.result.schedules['reading-care'].start,'15:00')
 assert.equal((await call('PUT',updated,cookie)).status,409)
 updated.revision=1;updated.schedules['reading-care'].end='14:00';assert.equal((await call('PUT',updated,cookie)).status,400)
 assert.equal((await call('PUT',updated,cookie+'tampered')).status,401)
 assert.match((await call('DELETE',null,cookie)).headers['Set-Cookie'],/Max-Age=0/)
 console.log('PASS: public read, unauthorized writes, password, origin, cookie, shared updates, conflict protection, schedule validation, tamper rejection, logout')
}finally{global.fetch=original}
