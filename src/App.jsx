import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Learn from './components/Learn'
import Practice from './components/Practice'
import Quiz from './components/Quiz'
import Feedback from './components/Feedback'
import Badge from './components/Badge'
import Summary from './components/Summary'
import ComplaintBox from './components/ComplaintBox'

function Container({ children }) {
  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      {children}
    </div>
  )
}

export default function App() {
  const location = useLocation()

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-rose-50 to-sky-50">
      <Navbar />
      <Container>
        <Routes location={location}>
          <Route
            path="/"
            element={
              <div className="space-y-6">
                <Hero />
                <section className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-2xl bg-white/80 p-5 shadow">
                    <h2 className="text-xl font-extrabold text-slate-800">Why SMART Sharing Matters</h2>
                    <p className="mt-2 text-slate-700">Sharing online can be exciting! The SMART checklist helps you protect private info, be kind, choose the right audience, avoid risk, and post things you\u0019ll be proud of later.</p>
                  </div>
                  <div className="rounded-2xl bg-white/80 p-5 shadow">
                    <h2 className="text-xl font-extrabold text-slate-800">Meet Your Guide</h2>
                    <p className="mt-2 text-slate-700">Pixel the mascot will cheer you on and offer friendly tips as you learn, practice, and check your understanding.</p>
                  </div>
                </section>
              </div>
            }
          />
          <Route path="/learn" element={<Learn />} />
          <Route path="/practice" element={<Practice />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/badge" element={<Badge />} />
          <Route path="/summary" element={<Summary />} />
          <Route path="/complaint" element={<ComplaintBox />} />
        </Routes>
      </Container>
    </div>
  )
}
