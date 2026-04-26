import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import Home from './pages/Home'
import BoglePage from './pages/BoglePage'
import IndexCardPage from './pages/IndexCardPage'

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/bogle" element={<BoglePage />} />
          <Route path="/index-card" element={<IndexCardPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}
