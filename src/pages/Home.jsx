import { useState, useRef, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import '../home.css'

function SunIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <circle cx="12" cy="12" r="5"/>
      <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
      <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
  )
}

// ── Update description + details below with real content when ready ──
const WISDOMS = [
  {
    path: '/bogle',
    badge: 'Investing',
    title: "Bogle's 10 Rules",
    description: 'Ten timeless principles from the founder of Vanguard.',
    details: [
      'Build a broadly diversified, low-cost portfolio without the risks of individual stocks, manager selection, or sector rotation.',
      'Recognize that in the long run, business reality trumps market expectations.',
      'Learn how to harness the magic of compounding returns while avoiding the tyranny of compounding costs.',
    ],
    accent: '#c4a55a',
    icon: '📈',
    image: '/bogle-investing-common-sense.jpg',
  },
  {
    path: '/index-card',
    badge: 'Personal Finance',
    title: 'The Index Card',
    description: 'Nine rules that fit on a single index card — everything you actually need to know about personal finance.',
    details: [
      'Have the confidence to make your own financial decisions.',
      'Be armed with a timeless set of guidelines you can turn to no matter what financial issues you face or how drastically the winds of financial change shift.',
    ],
    accent: '#5aa5c4',
    icon: '📇',
    image: '/the-index-card.jpg',
  },
]

function getColumns(active, total) {
  return Array.from({ length: total }, (_, i) => (i === active ? '10fr' : '1fr')).join(' ')
}

export default function Home() {
  const { theme, toggle } = useTheme()
  const navigate = useNavigate()
  const [activeIndex, setActiveIndex] = useState(
    () => Number(sessionStorage.getItem('wisdomActiveIndex') ?? 0)
  )
  const listRef = useRef(null)
  const [articleWidth, setArticleWidth] = useState(400)

  useEffect(() => {
    sessionStorage.setItem('wisdomActiveIndex', activeIndex)
  }, [activeIndex])

  const syncArticleWidth = useCallback(() => {
    if (!listRef.current) return
    const items = listRef.current.querySelectorAll('li')
    const max = Math.max(...[...items].map(li => li.offsetWidth))
    if (max > 0) setArticleWidth(max)
  }, [])

  useEffect(() => {
    syncArticleWidth()
    window.addEventListener('resize', syncArticleWidth)
    return () => window.removeEventListener('resize', syncArticleWidth)
  }, [syncArticleWidth])

  return (
    <>
      <div className="bg-glow bg-glow--1" />
      <div className="bg-glow bg-glow--2" />

      <button className="theme-toggle" aria-label="Toggle theme" onClick={toggle}>
        {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
      </button>

      <header className="home-header">
        <div className="badge">Financial Wisdom</div>
        <h1 className="header__title">Choose Your <span>Wisdom</span></h1>
        <p className="header__sub">Timeless principles, beautifully presented</p>
      </header>

      <ul
        ref={listRef}
        className="wisdoms-list"
        style={{ gridTemplateColumns: getColumns(activeIndex, WISDOMS.length) }}
        onPointerMove={e => {
          const li = e.target.closest('li[data-index]')
          if (li) setActiveIndex(Number(li.dataset.index))
        }}
      >
        {WISDOMS.map((w, i) => (
          <li
            key={w.path}
            data-index={i}
            data-active={String(i === activeIndex)}
            className="wisdom-item"
            style={{ '--item-accent': w.accent }}
            onClick={() => i === activeIndex ? navigate(w.path) : setActiveIndex(i)}
          >
            <article
              className="wisdom-article"
              style={{ '--article-width': articleWidth }}
            >
              <h3 className="wisdom-title">{w.title}</h3>
              <span className="wisdom-icon">{w.icon}</span>
              <p className="wisdom-desc">{w.description}</p>
              <ul className="wisdom-details">
                {w.details.map((d, i) => <li key={i}>{d}</li>)}
              </ul>
              <span className="wisdom-cta">Explore →</span>
              <img className="wisdom-bg" src={w.image} alt="" />
            </article>
          </li>
        ))}
      </ul>

      <footer className="footer">
        <p className="footer__quote">"An investment in knowledge pays the best interest."</p>
        <p className="footer__attr">— Benjamin Franklin</p>
        <p className="footer__credit">
          Accordion UI by{' '}
          <a href="https://codepen.io/jh3y" target="_blank" rel="noopener noreferrer">jh3y</a>
          {' '}on CodePen
        </p>
      </footer>

      <div className="ground-reflection" />
    </>
  )
}
