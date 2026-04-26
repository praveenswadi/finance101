import { useNavigate } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'

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

const WISDOMS = [
  {
    path: '/bogle',
    badge: 'Investing',
    title: "Bogle's 10 Rules",
    subtitle: 'The Clash of the Cultures',
    description: 'Ten timeless principles from the founder of Vanguard. A 3D carousel through the fundamentals of long-term investing.',
    accent: '#c4a55a',
    rules: ['Reversion to the Mean', 'Time Is Your Friend', 'Buy the Haystack', '+ 7 more'],
  },
  {
    path: '/index-card',
    badge: 'Personal Finance',
    title: 'The Index Card',
    subtitle: 'Olen & Pollack',
    description: 'Nine rules that fit on a single index card — everything you actually need to know about personal finance.',
    accent: '#5aa5c4',
    rules: ['Save 10–20%', 'Max your 401(k)', 'Buy index funds', '+ 6 more'],
  },
]

export default function Home() {
  const { theme, toggle } = useTheme()
  const navigate = useNavigate()

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

      <div className="home-grid">
        {WISDOMS.map(w => (
          <button
            key={w.path}
            className="wisdom-card"
            style={{ '--wisdom-accent': w.accent }}
            onClick={() => navigate(w.path)}
          >
            <div className="wisdom-card__badge">{w.badge}</div>
            <h2 className="wisdom-card__title">{w.title}</h2>
            <p className="wisdom-card__subtitle">{w.subtitle}</p>
            <p className="wisdom-card__desc">{w.description}</p>
            <ul className="wisdom-card__rules">
              {w.rules.map(r => (
                <li key={r}>{r}</li>
              ))}
            </ul>
            <div className="wisdom-card__cta">
              Explore →
            </div>
          </button>
        ))}
      </div>

      <footer className="footer">
        <p className="footer__quote">"An investment in knowledge pays the best interest."</p>
        <p className="footer__attr">— Benjamin Franklin</p>
      </footer>

      <div className="ground-reflection" />
    </>
  )
}
