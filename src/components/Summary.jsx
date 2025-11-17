import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export default function Summary() {
  const { state } = useLocation()
  const navigate = useNavigate()
  const score = state?.score ?? 80

  return (
    <section className="space-y-4">
      <div className="rounded-2xl bg-white/80 p-4 shadow">
        <h3 className="text-xl font-extrabold text-slate-800">Performance Summary</h3>
        <p className="mt-1 text-slate-700">Score: {score}%</p>
      </div>
      <div className="grid gap-3 md:grid-cols-3">
        <div className="rounded-xl border-2 border-emerald-200 bg-emerald-50 p-4 text-emerald-800">
          <h4 className="font-bold">Strength Indicators</h4>
          <ul className="mt-2 list-disc pl-5">
            <li>Identified private vs public spaces.</li>
            <li>Recognized kind, mindful posts.</li>
          </ul>
        </div>
        <div className="rounded-xl border-2 border-amber-200 bg-amber-50 p-4 text-amber-800">
          <h4 className="font-bold">Growth Indicators</h4>
          <ul className="mt-2 list-disc pl-5">
            <li>Double-check sensitivity (addresses, schedules).</li>
            <li>Pause before posting when emotions are strong.</li>
          </ul>
        </div>
        <div className="rounded-xl border-2 border-sky-200 bg-sky-50 p-4 text-sky-800">
          <h4 className="font-bold">Recommended Next Steps</h4>
          <ul className="mt-2 list-disc pl-5">
            <li>Revisit Learn: Time-proof and Risky sections.</li>
            <li>Try two more Practice rounds.</li>
          </ul>
        </div>
      </div>
      <div className="flex gap-2">
        <button onClick={() => navigate('/practice')} className="rounded-xl bg-sky-500 px-4 py-2 font-semibold text-white">Practice Again</button>
        <button onClick={() => navigate('/learn')} className="rounded-xl bg-orange-500 px-4 py-2 font-semibold text-white">Review Lessons</button>
      </div>
    </section>
  )
}
