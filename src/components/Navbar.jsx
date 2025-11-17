import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { GraduationCap } from 'lucide-react'

export default function Navbar() {
  const linkClass = ({ isActive }) =>
    `rounded-xl px-4 py-2 text-sm font-semibold transition-colors ${
      isActive ? 'bg-white text-slate-900' : 'text-slate-700 hover:text-slate-900 hover:bg-white/70'
    }`

  const navigate = useNavigate()

  return (
    <header className="sticky top-0 z-20 w-full bg-gradient-to-b from-white/80 to-white/40 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <button onClick={() => navigate('/')} className="flex items-center gap-2">
          <div className="rounded-xl bg-gradient-to-br from-orange-400 to-pink-400 p-2 text-white shadow">
            <GraduationCap className="h-5 w-5" />
          </div>
          <span className="text-lg font-extrabold text-slate-800">SMART Sharing Academy</span>
        </button>
        <nav className="flex items-center gap-2">
          <NavLink to="/learn" className={linkClass}>Learn</NavLink>
          <NavLink to="/practice" className={linkClass}>Practice</NavLink>
          <NavLink to="/quiz" className={linkClass}>Check</NavLink>
        </nav>
      </div>
    </header>
  )
}
