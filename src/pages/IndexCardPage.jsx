import { useNavigate } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import '../indexcard.css'

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

const RULES = [
  { icon: '💰', text: <>Save <em>10–20%</em> of Your Income</>,            note: 'Pay yourself first' },
  { icon: '💳', text: <>Pay Credit Cards in <em>Full Every Month</em></> },
  { icon: '📈', text: <>Max Out Your <em>401(k)</em> &amp; Tax-Advantaged Accounts</> },
  { icon: '🚫', text: <><strong>Never</strong> Buy or Sell Individual Stocks</> },
  { icon: '🧺', text: <>Buy Low-Cost <em>Index Funds</em> &amp; ETFs</>,    note: 'Diversify, keep fees low' },
  { icon: '🤝', text: <>Demand a <em>Fiduciary</em> Financial Advisor</> },
  { icon: '🏠', text: <>Buy a Home When You're <em>Ready</em></>,           note: 'Not because someone said so' },
  { icon: '🛡️', text: <>Get Proper <em>Insurance</em> Coverage</> },
  { icon: '🌐', text: <>Support the <em>Social Safety Net</em></> },
]

export default function IndexCardPage() {
  const { theme, toggle } = useTheme()
  const navigate = useNavigate()

  return (
    <>
      <div className="bg-glow bg-glow--1" />
      <div className="bg-glow bg-glow--2" />

      <button className="nav-back" aria-label="Back to home" onClick={() => navigate('/')}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
        All wisdom
      </button>

      <button className="theme-toggle" aria-label="Toggle theme" onClick={toggle}>
        {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
      </button>

      <header className="header">
        <div className="badge">Personal Finance</div>
        <h1 className="header__title">The Index <span>Card</span></h1>
        <p className="header__sub">All the financial advice you'll ever need</p>
      </header>

      <div className="ic-container">
        {RULES.map((rule, i) => (
          <div
            key={i}
            className="ic-rule"
            style={{ animationDelay: `${0.05 + i * 0.08}s` }}
          >
            <div className="ic-rule-left">
              <span className="ic-num">{String(i + 1).padStart(2, '0')}</span>
              <span className="ic-icon">{rule.icon}</span>
            </div>
            <div className="ic-rule-right">
              <div className="ic-rule-text">{rule.text}</div>
              {rule.note && <div className="ic-rule-note">↳ {rule.note}</div>}
            </div>
          </div>
        ))}
      </div>

      <footer className="footer">
        <p className="footer__quote">"The financial advice that fits on an index card is so obvious that it seems silly to charge a lot of money for it."</p>
        <p className="footer__attr">— Harold Pollack</p>
        <p className="footer__credit">
          UI inspired by{' '}
          <a href="https://codepen.io/hoanghien0410/pen/MMPaqm" target="_blank" rel="noopener noreferrer">
            hoanghien0410 on CodePen
          </a>
        </p>
      </footer>

      <div className="ground-reflection" />
    </>
  )
}
