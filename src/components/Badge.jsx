import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export default function Badge() {
  const { state } = useLocation()
  const navigate = useNavigate()
  const score = state?.score ?? 100

  return (
    <section className="space-y-4 text-center">
      <div className="mx-auto max-w-md rounded-3xl bg-gradient-to-br from-emerald-100 via-sky-100 to-amber-100 p-6 shadow">
        <div className="mx-auto mb-4 h-32 w-32 rounded-full bg-white shadow-inner">
          <div className="flex h-full w-full items-center justify-center text-5xl">🏆</div>
        </div>
        <h3 className="text-2xl font-extrabold text-slate-800">Digital Responsibility Mastery</h3>
        <p className="mt-1 text-slate-700">Perfect score! You earned a badge for SMART online sharing.</p>
        <p className="mt-2 font-semibold text-emerald-700">Score: {score}%</p>
      </div>
      <button onClick={() => navigate('/')} className="rounded-xl bg-emerald-500 px-5 py-2 font-semibold text-white shadow">Back to Home</button>
    </section>
  )
}
