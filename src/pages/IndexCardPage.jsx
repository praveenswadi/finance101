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
  { icon: '💰', text: <>Save <em>10–20%</em> of Your Income</>, note: '↳ pay yourself first!' },
  { icon: '💳', text: <>Pay Credit Cards in <em>Full Every Month</em></> },
  { icon: '📈', text: <>Max Out Your <em>401(k)</em> &amp; Tax-Advantaged Accounts</> },
  { icon: '🚫', text: <><strong>Never</strong> Buy or Sell Individual Stocks</> },
  { icon: '🧺', text: <>Buy Low-Cost <em>Index Funds</em> &amp; ETFs</>, note: '↳ diversify, keep fees low' },
  { icon: '🤝', text: <>Demand a <em>Fiduciary</em> Financial Advisor</> },
  { icon: '🏠', text: <>Buy a Home When You're <em>Ready</em></>, note: '↳ not because someone said so' },
  { icon: '🛡️', text: <>Get Proper <em>Insurance</em> Coverage</> },
  { icon: '🌐', text: <>Support the <em>Social Safety Net</em></> },
]

export default function IndexCardPage() {
  const { theme, toggle } = useTheme()
  const navigate = useNavigate()

  return (
    <div className="ic-page">
      <div className="cork-texture" />

      <button className="nav-back" aria-label="Back to home" onClick={() => navigate('/')}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
        All wisdom
      </button>

      <button className="theme-toggle ic-theme-toggle" aria-label="Toggle theme" onClick={toggle}>
        {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
      </button>

      <div className="ic-card">
        <div className="ic-pin"><div className="ic-pin-head" /></div>
        <div className="ic-tape ic-tape-tl" />
        <div className="ic-tape ic-tape-br" />
        <div className="ic-margin-line" />

        <svg className="ic-star" width="36" height="36" viewBox="0 0 36 36" fill="none" stroke="#d4a840" strokeWidth="1.5" strokeLinecap="round">
          <path d="M18 4 L20 14 L30 14 L22 20 L25 30 L18 24 L11 30 L14 20 L6 14 L16 14 Z" />
        </svg>

        <div className="ic-title">The Index Card</div>
        <div className="ic-subtitle">All the financial advice you'll ever need</div>

        <ul className="ic-rules">
          {RULES.map((rule, i) => (
            <li key={i} className="ic-rule" style={{ animationDelay: `${0.2 + i * 0.15}s` }}>
              <div className="ic-rule-number">{i + 1}</div>
              <div className="ic-rule-content">
                <div className="ic-rule-text">
                  <span className="ic-rule-icon">{rule.icon}</span>
                  {rule.text}
                </div>
                {rule.note && <div className="ic-rule-note">{rule.note}</div>}
              </div>
            </li>
          ))}
        </ul>

        <div className="ic-footer-note">— Olen &amp; Pollack</div>
        <div className="ic-coffee-stain" />
      </div>
    </div>
  )
}
