import React from 'react'
import { useNavigate } from 'react-router-dom'
import Spline from '@splinetool/react-spline'
import { ShieldCheck, BookOpenCheck, Puzzle, BadgeCheck } from 'lucide-react'
import Mascot from './Mascot'

const CTAButton = ({ icon: Icon, label, to, color }) => {
  const navigate = useNavigate()
  return (
    <button
      onClick={() => navigate(to)}
      className={`flex items-center gap-2 rounded-xl px-5 py-3 text-white shadow-lg transition-transform hover:scale-[1.02] active:scale-95 ${color}`}
    >
      <Icon className="h-5 w-5" />
      <span className="font-semibold">{label}</span>
    </button>
  )
}

export default function Hero() {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-orange-50 via-rose-50 to-sky-50 p-4 sm:p-8">
      <div className="grid items-center gap-8 lg:grid-cols-2">
        <div className="order-2 lg:order-1">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1 text-sm text-orange-700 shadow">
            <ShieldCheck className="h-4 w-4" />
            SMART Sharing Academy
          </div>
          <h1 className="mt-4 text-4xl font-extrabold leading-tight text-slate-800 sm:text-5xl">
            Share Online the SMART Way
          </h1>
          <p className="mt-3 max-w-xl text-lg text-slate-600">
            Learn the SMART Sharing Checklist: Sensitive • Mindful • Audience • Risky • Time‑proof. Make great choices every time you post!
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <CTAButton icon={BookOpenCheck} label="Learn" to="/learn" color="bg-orange-500 hover:bg-orange-600" />
            <CTAButton icon={Puzzle} label="Practice" to="/practice" color="bg-sky-500 hover:bg-sky-600" />
            <CTAButton icon={BadgeCheck} label="Check Understanding" to="/quiz" color="bg-emerald-500 hover:bg-emerald-600" />
          </div>
          <div className="mt-6">
            <Mascot message="Hi! I’m Pixel. I’ll help you decide what’s smart to share online." />
          </div>
        </div>
        <div className="order-1 aspect-[4/3] w-full lg:order-2 lg:aspect-square">
          <div className="h-full w-full rounded-2xl bg-white/60 p-2 shadow-inner">
            <Spline scene="https://prod.spline.design/95Gu7tsx2K-0F3oi/scene.splinecode" style={{ width: '100%', height: '100%' }} />
          </div>
        </div>
      </div>
    </section>
  )
}
