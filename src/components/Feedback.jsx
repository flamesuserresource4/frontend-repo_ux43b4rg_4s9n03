import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export default function Feedback() {
  const location = useLocation()
  const navigate = useNavigate()
  const score = location.state?.score ?? 0

  return (
    <section className="space-y-4">
      <div className="rounded-2xl bg-rose-100 p-4 text-rose-900">
        <h3 className="text-xl font-extrabold">Let’s Grow!</h3>
        <p className="mt-1">Your score was {score}%. That means we should review the tricky parts together.</p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl bg-white/80 p-4 shadow">
          <h4 className="font-bold text-rose-700">Growth Indicators</h4>
          <ul className="mt-2 list-disc pl-5 text-slate-700">
            <li>Re-check privacy: addresses, school name, schedules.</li>
            <li>Think about feelings before posting (mindful).</li>
            <li>Use private groups when possible (audience).</li>
          </ul>
        </div>
        <div className="rounded-xl bg-white/80 p-4 shadow">
          <h4 className="font-bold text-emerald-700">Next Steps</h4>
          <ul className="mt-2 list-disc pl-5 text-slate-700">
            <li>Revisit the Learn page sections.</li>
            <li>Try the Practice activity again.</li>
            <li>Ask a trusted adult to check your settings.</li>
          </ul>
        </div>
      </div>
      <div className="flex gap-2">
        <button onClick={() => navigate('/learn')} className="rounded-xl bg-orange-500 px-4 py-2 font-semibold text-white">Review Lessons</button>
        <button onClick={() => navigate('/practice')} className="rounded-xl bg-sky-500 px-4 py-2 font-semibold text-white">Try Practice</button>
      </div>
    </section>
  )
}
