import Arrow from '../components/ui/Arrow.jsx'

export default function NotFoundPage({ navigate }) {
  return <section className="not-found"><div className="container"><span>404</span><h1>This page isn't here.</h1><p lang="bn">Use the main navigation or return to the home page.</p><button className="button button-primary" onClick={()=>navigate('/')}>Back home <Arrow/></button></div></section>
}
