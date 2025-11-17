import React, { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const QUESTION_BANK = [
  {
    q: 'Which part of SMART reminds you to hide your home address?',
    choices: ['Mindful', 'Sensitive', 'Audience', 'Time-proof'],
    answer: 1,
  },
  {
    q: 'Posting when angry is risky because...',
    choices: ['It may be time-proof in a bad way', 'Only friends can see it', 'It is always funny', 'It disappears forever'],
    answer: 0,
  },
  {
    q: 'Sharing in a private class group shows you checked your...',
    choices: ['Audience', 'Risk', 'Sensitivity', 'Time'],
    answer: 0,
  },
  {
    q: 'Using a nickname instead of your full name lowers...',
    choices: ['Risk', 'Audience', 'Time-proof', 'Mindfulness'],
    answer: 0,
  },
  {
    q: 'Before posting, asking “How will others feel?” is being...',
    choices: ['Audience', 'Sensitive', 'Mindful', 'Risky'],
    answer: 2,
  },
  {
    q: 'A public post with your soccer schedule breaks which parts?',
    choices: ['Sensitive and Audience', 'Mindful and Risky', 'Time-proof and Mindful', 'Audience only'],
    answer: 0,
  },
]

export default function Quiz() {
  const [answers, setAnswers] = useState({})
  const navigate = useNavigate()

  const questions = useMemo(() => {
    // pick 5 random questions
    const shuffled = [...QUESTION_BANK].sort(() => Math.random() - 0.5)
    return shuffled.slice(0, 5)
  }, [])

  const select = (qi, idx) => setAnswers((a) => ({ ...a, [qi]: idx }))

  const submit = () => {
    let correct = 0
    questions.forEach((q, i) => {
      if (answers[i] === q.answer) correct += 1
    })
    const score = Math.round((correct / questions.length) * 100)
    if (score < 80) {
      navigate('/feedback', { state: { score, total: questions.length } })
    } else if (score === 100) {
      navigate('/badge', { state: { score } })
    } else {
      navigate('/summary', { state: { score } })
    }
  }

  return (
    <section className="space-y-4">
      <div className="rounded-2xl bg-gradient-to-r from-emerald-100 to-sky-100 p-4">
        <p className="text-slate-700">Answer the questions. Try to score 80% or above!</p>
      </div>
      <div className="grid gap-4">
        {questions.map((q, i) => (
          <div key={i} className="rounded-2xl bg-white/80 p-4 shadow">
            <p className="font-semibold text-slate-800">{i + 1}. {q.q}</p>
            <div className="mt-2 grid gap-2 sm:grid-cols-2">
              {q.choices.map((c, idx) => (
                <button
                  key={idx}
                  onClick={() => select(i, idx)}
                  className={`rounded-xl border p-2 text-left ${answers[i] === idx ? 'border-emerald-500 bg-emerald-50' : 'border-slate-200 hover:bg-slate-50'}`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-end">
        <button onClick={submit} className="rounded-xl bg-emerald-500 px-5 py-2 font-semibold text-white shadow hover:bg-emerald-600">Submit</button>
      </div>
    </section>
  )
}
