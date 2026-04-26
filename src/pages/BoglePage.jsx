import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'

const N = 10
const THETA = 360 / N

const CARDS = [
  { num: '01', icon: '📉', title: 'Reversion to the Mean',     body: "What's hot today won't stay hot. Markets always revert to long-run fundamentals. Don't follow the herd." },
  { num: '02', icon: '⏳', title: 'Time Is Your Friend',        body: 'Let compound interest work its magic. Start early, stay patient, and ignore the siren song of market swings.' },
  { num: '03', icon: '🔒', title: 'Buy Right & Hold Tight',     body: 'Set your asset allocation and stick to it — through greed and through fear. Discipline is everything.' },
  { num: '04', icon: '🎯', title: 'Realistic Expectations',     body: "You won't get rich quickly. Expect reasonable, not miraculous, returns over the long haul." },
  { num: '05', icon: '🌾', title: 'Buy the Haystack',           body: 'Forget the needle. Buy the whole market and eliminate stock risk, style risk, and manager risk in one move.' },
  { num: '06', icon: '✂️', title: 'Minimize Costs',             body: "The croupier always wins. Keep fees low — in investing, you get what you don't pay for." },
  { num: '07', icon: '⚡', title: 'No Escaping Risk',           body: 'Risk-free high returns don\'t exist. Even "safe" cash loses to inflation over time.' },
  { num: '08', icon: '🪞', title: "Don't Fight the Last War",   body: "Yesterday's winning strategy is tomorrow's losing one. Markets shift; your strategy shouldn't chase them." },
  { num: '09', icon: '🦔', title: 'Hedgehog Bests the Fox',     body: 'One great simple idea beats a thousand clever ones. Simplicity always wins in investing.' },
  { num: '10', icon: '🧭', title: 'Stay the Course',            body: 'The secret to investing is there is no secret. Own the market, keep costs low, and hold on.' },
]

// Read --carousel-radius from CSS so media queries control the value
function readRadius() {
  return parseFloat(
    getComputedStyle(document.documentElement).getPropertyValue('--carousel-radius').trim()
  ) || 480
}

function SunIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <circle cx="12" cy="12" r="5"/>
      <line x1="12" y1="1" x2="12" y2="3"/>
      <line x1="12" y1="21" x2="12" y2="23"/>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
      <line x1="1" y1="12" x2="3" y2="12"/>
      <line x1="21" y1="12" x2="23" y2="12"/>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
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

export default function BoglePage() {
  const { theme, toggle } = useTheme()
  const navigate = useNavigate()
  const [activeIndex, setActiveIndex] = useState(0)
  const carouselRef = useRef(null)
  const actionsRef = useRef({})
  // Lazy-init so the correct media-query value is used on the very first render
  const radiusRef = useRef(null)
  if (radiusRef.current === null) radiusRef.current = readRadius()
  const stateRef = useRef({ currentIndex: 0, cumulativeAngle: 0, isDragging: false, startX: 0, dragDelta: 0, autoTimer: null })


  useEffect(() => {
    const carousel = carouselRef.current
    const state = stateRef.current
    const R = readRadius()
    radiusRef.current = R

    function goTo(index, animate = true) {
      const i = ((index % N) + N) % N

      // Shortest arc — prevents the long 300° spin on 10→1 or 1→10
      let diff = i - state.currentIndex
      if (diff > N / 2) diff -= N
      if (diff < -N / 2) diff += N

      state.cumulativeAngle -= diff * THETA
      state.currentIndex = i

      if (!animate) {
        carousel.style.transition = 'none'
        carousel.style.transform = `translateZ(-${R}px) rotateY(${state.cumulativeAngle}deg)`
        carousel.offsetHeight // force reflow
        carousel.style.transition = ''
      } else {
        carousel.style.transform = `translateZ(-${R}px) rotateY(${state.cumulativeAngle}deg)`
      }
      setActiveIndex(i)
    }

    function next() { goTo(state.currentIndex + 1) }
    function prev() { goTo(state.currentIndex - 1) }

    function stopAutoRotate() {
      if (state.autoTimer) { clearTimeout(state.autoTimer); state.autoTimer = null }
    }
    function scheduleNext() {
      const delay = 3000 + Math.random() * 1000
      state.autoTimer = setTimeout(() => { next(); scheduleNext() }, delay)
    }
    function startAutoRotate() { stopAutoRotate(); scheduleNext() }
    function resetAutoRotate() { stopAutoRotate(); startAutoRotate() }

    function getClientX(e) { return e.touches ? e.touches[0].clientX : e.clientX }

    function onDragStart(e) {
      state.isDragging = true
      state.startX = getClientX(e)
      state.dragDelta = 0
      stopAutoRotate()
      carousel.style.transition = 'none'
    }
    function onDragMove(e) {
      if (!state.isDragging) return
      state.dragDelta = getClientX(e) - state.startX
      const angle = state.cumulativeAngle + state.dragDelta * 0.3
      carousel.style.transform = `translateZ(-${R}px) rotateY(${angle}deg)`
    }
    function onDragEnd() {
      if (!state.isDragging) return
      state.isDragging = false
      carousel.style.transition = ''
      if (state.dragDelta < -50) next()
      else if (state.dragDelta > 50) prev()
      else carousel.style.transform = `translateZ(-${R}px) rotateY(${state.cumulativeAngle}deg)`
      startAutoRotate()
    }
    function handleKeyDown(e) {
      if (e.key === 'ArrowLeft')  { resetAutoRotate(); prev() }
      if (e.key === 'ArrowRight') { resetAutoRotate(); next() }
    }

    actionsRef.current = { goTo, next, prev, resetAutoRotate, stopAutoRotate, startAutoRotate }

    goTo(0, false)
    startAutoRotate()

    carousel.addEventListener('mousedown', onDragStart)
    document.addEventListener('mousemove', onDragMove)
    document.addEventListener('mouseup', onDragEnd)
    carousel.addEventListener('touchstart', onDragStart, { passive: true })
    document.addEventListener('touchmove', onDragMove, { passive: true })
    document.addEventListener('touchend', onDragEnd)
    carousel.addEventListener('mouseenter', stopAutoRotate)
    carousel.addEventListener('mouseleave', startAutoRotate)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      stopAutoRotate()
      carousel.removeEventListener('mousedown', onDragStart)
      document.removeEventListener('mousemove', onDragMove)
      document.removeEventListener('mouseup', onDragEnd)
      carousel.removeEventListener('touchstart', onDragStart)
      document.removeEventListener('touchmove', onDragMove)
      document.removeEventListener('touchend', onDragEnd)
      carousel.removeEventListener('mouseenter', stopAutoRotate)
      carousel.removeEventListener('mouseleave', startAutoRotate)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  const R = radiusRef.current

  return (
    <>
      <div className="bg-glow bg-glow--1" />
      <div className="bg-glow bg-glow--2" />
      <img className="page-bg page-bg--top" src="/bogle-little-book.jpg" alt="" />

      <button className="nav-back" aria-label="Back to home" onClick={() => navigate('/')}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
        All wisdom
      </button>

      <button
        className="theme-toggle"
        aria-label="Toggle theme"
        onClick={toggle}
      >
        {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
      </button>

      <header className="header">
        <div className="badge">Investing Wisdom</div>
        <h1 className="header__title">John Bogle's <span>10 Rules</span></h1>
        <p className="header__sub">From "The Clash of the Cultures: Investment vs. Speculation"</p>
      </header>

      <div className="carousel-wrapper">
        <button
          className="nav__btn nav__btn--prev"
          aria-label="Previous rule"
          onClick={() => { actionsRef.current.resetAutoRotate?.(); actionsRef.current.prev?.() }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        <div className="scene">
          <div className="carousel" ref={carouselRef}>
            {CARDS.map((card, i) => (
              <div
                key={i}
                className={`carousel__card${activeIndex === i ? ' is-active' : ''}`}
                data-index={i}
                style={{ transform: `rotateY(${THETA * i}deg) translateZ(${R}px)` }}
              >
                <div className="card__header">
                  <div className="card__meta">
                    <div className="card__num">{card.num}</div>
                    <div className="card__icon">{card.icon}</div>
                  </div>
                  <h3 className="card__title">{card.title}</h3>
                </div>
                <p className="card__body">{card.body}</p>
              </div>
            ))}
          </div>
        </div>

        <button
          className="nav__btn nav__btn--next"
          aria-label="Next rule"
          onClick={() => { actionsRef.current.resetAutoRotate?.(); actionsRef.current.next?.() }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <polyline points="9 6 15 12 9 18" />
          </svg>
        </button>
      </div>

      <footer className="footer">
        <p className="footer__quote">"The stock market is a giant distraction from the business of investing."</p>
        <p className="footer__attr">— John C. Bogle, 1929–2019</p>
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
