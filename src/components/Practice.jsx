import React, { useMemo, useState } from 'react'

const scenarios = [
  { id: 1, text: 'Leo posts his home address to invite friends to a party.', correct: 'unsafe', hint: 'Sensitive info like addresses should stay private.' },
  { id: 2, text: 'Leo shares a photo of his new drawing with only his family group.', correct: 'safe', hint: 'Audience is limited and content is not sensitive.' },
  { id: 3, text: 'Leo posts his soccer schedule with location and times publicly.', correct: 'unsafe', hint: 'Reveals where and when he will be.' },
  { id: 4, text: 'Leo compliments a classmate\'s science project on the class forum.', correct: 'safe', hint: 'Kind and mindful sharing in a private space.' },
  { id: 5, text: 'Leo uses his full name and birthdate as a username.', correct: 'unsafe', hint: 'Personal details shouldn\'t be used in usernames.' },
]

function Draggable({ id, text, onDragStart }) {
  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, id)}
      className="cursor-grab rounded-xl bg-white/80 p-3 text-sm text-slate-700 shadow hover:bg-white"
    >
      {text}
    </div>
  )
}

function DropZone({ label, type, onDropItem, items, color }) {
  const handleDrop = (e) => {
    e.preventDefault()
    const id = e.dataTransfer.getData('text/plain')
    if (!id) return
    onDropItem(Number(id), type)
  }
  return (
    <div
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
      className={`min-h-[180px] rounded-2xl p-4 shadow-inner ${color}`}
    >
      <p className="mb-3 text-center text-sm font-bold uppercase tracking-wide text-slate-700">{label}</p>
      <div className="grid gap-2">
        {items.map((s) => (
          <div key={s.id} className="rounded-lg bg-white/80 p-2 text-sm text-slate-700 shadow">
            {s.text}
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Practice() {
  const [placed, setPlaced] = useState({ safe: [], unsafe: [] })
  const [feedback, setFeedback] = useState(null)

  const remaining = useMemo(() => {
    const placedIds = new Set([...placed.safe, ...placed.unsafe].map((s) => s.id))
    return scenarios.filter((s) => !placedIds.has(s.id))
  }, [placed])

  const onDragStart = (e, id) => {
    e.dataTransfer.setData('text/plain', String(id))
  }

  const onDropItem = (id, zone) => {
    const scenario = scenarios.find((s) => s.id === id)
    if (!scenario) return
    const correct = scenario.correct === zone
    setPlaced((prev) => ({ ...prev, [zone]: [...prev[zone], scenario] }))
    setFeedback({
      id,
      correct,
      message: correct
        ? 'Great job! You used the SMART checklist to decide correctly.'
        : `Let\'s rethink it: ${scenario.hint}`,
    })
  }

  return (
    <section className="space-y-4">
      <div className="rounded-2xl bg-gradient-to-r from-sky-100 via-emerald-100 to-amber-100 p-4">
        <p className="text-slate-700">Drag each bubble into Safe or Unsafe. Use the color-coded hints to remember the SMART rules.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <div className="space-y-2">
          <p className="text-sm font-bold text-slate-600">Scenarios about Leo</p>
          <div className="grid gap-2">
            {remaining.map((s) => (
              <Draggable key={s.id} id={s.id} text={s.text} onDragStart={onDragStart} />
            ))}
          </div>
        </div>
        <DropZone
          label="Safe"
          type="safe"
          onDropItem={onDropItem}
          items={placed.safe}
          color="bg-emerald-50"
        />
        <DropZone
          label="Unsafe"
          type="unsafe"
          onDropItem={onDropItem}
          items={placed.unsafe}
          color="bg-rose-50"
        />
      </div>
      {feedback && (
        <div className={`rounded-2xl p-4 ${feedback.correct ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
          {feedback.message}
        </div>
      )}
      <div className="grid gap-3 sm:grid-cols-3">
        <div className="rounded-xl border-2 border-rose-300 bg-rose-50 p-3 text-rose-800">Sensitive: Keep addresses, full names, and schedules private.</div>
        <div className="rounded-xl border-2 border-amber-300 bg-amber-50 p-3 text-amber-800">Mindful: Be kind and think about feelings.</div>
        <div className="rounded-xl border-2 border-sky-300 bg-sky-50 p-3 text-sky-800">Audience: Choose who can see your posts.</div>
        <div className="rounded-xl border-2 border-purple-300 bg-purple-50 p-3 text-purple-800">Risky: Watch out for scams and copying.</div>
        <div className="rounded-xl border-2 border-emerald-300 bg-emerald-50 p-3 text-emerald-800">Time-proof: Will this still be okay later?</div>
      </div>
    </section>
  )
}
