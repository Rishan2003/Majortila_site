import { Fragment } from 'react'
export default function AnimatedText({ children, className = '' }) {
  const text = String(children ?? '')
  return <span className={`animated-text ${className}`}><span className="visually-hidden">{text}</span><span aria-hidden="true">{text.split(' ').map((word,i,words) => <Fragment key={`${word}-${i}`}><span className="word-mask"><span style={{ '--word-index': i }}>{word}</span></span>{i < words.length - 1 ? ' ' : null}</Fragment>)}</span></span>
}
