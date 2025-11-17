import React, { useEffect, useMemo, useRef, useState } from 'react'

// Playful, non-functional complaint box with an escaping submit button
export default function ComplaintBox() {
  const containerRef = useRef(null)
  const buttonRef = useRef(null)
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [isReady, setIsReady] = useState(false)
  const [toast, setToast] = useState({ open: false, text: '' })

  const funnyErrors = useMemo(
    () => [
      'Oops! The system is thinking… forever.',
      'Your complaint has been sent to a parallel universe.',
      'Submission failed: Button too slippery to click.',
      'Error 42: Complaint lost in a maze of tubes.',
      'Our carrier pigeon took a detour. Try never!'
    ],
    []
  )

  // Initialize button to a nice starting spot once sizes are known
  useEffect(() => {
    const id = requestAnimationFrame(() => {
      const c = containerRef.current
      const b = buttonRef.current
      if (!c || !b) return
      const cw = c.clientWidth
      const ch = c.clientHeight
      const bw = b.offsetWidth
      const bh = b.offsetHeight
      setPos({ x: Math.max(8, cw / 2 - bw / 2), y: Math.max(8, ch * 0.65 - bh / 2) })
      setIsReady(true)
    })
    return () => cancelAnimationFrame(id)
  }, [])

  // Helper to clamp position inside container
  const clampPos = (x, y) => {
    const c = containerRef.current
    const b = buttonRef.current
    if (!c || !b) return { x, y }
    const padding = 8
    const cw = c.clientWidth
    const ch = c.clientHeight
    const bw = b.offsetWidth
    const bh = b.offsetHeight
    const maxX = cw - bw - padding
    const maxY = ch - bh - padding
    return { x: Math.min(Math.max(padding, x), maxX), y: Math.min(Math.max(padding, y), maxY) }
  }

  // Move the button away from the cursor if it gets close
  const handleMouseMove = (e) => {
    const c = containerRef.current
    const b = buttonRef.current
    if (!c || !b) return

    const rect = c.getBoundingClientRect()
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top

    const bx = pos.x + b.offsetWidth / 2
    const by = pos.y + b.offsetHeight / 2

    const dx = mouseX - bx
    const dy = mouseY - by
    const dist = Math.hypot(dx, dy)

    const safeRadius = 120 // when the mouse is closer than this, we dodge!
    if (dist < safeRadius) {
      // Move in the opposite direction, with a dash of randomness
      const angle = Math.atan2(dy, dx) + Math.PI // opposite direction
      const mag = 160 + Math.random() * 120
      const nx = pos.x + Math.cos(angle) * mag + (Math.random() * 40 - 20)
      const ny = pos.y + Math.sin(angle) * mag + (Math.random() * 40 - 20)
      const next = clampPos(nx, ny)
      setPos(next)
    }
  }

  const showFunnyToast = () => {
    const random = funnyErrors[Math.floor(Math.random() * funnyErrors.length)]
    setToast({ open: true, text: random })
    window.clearTimeout((showFunnyToast)._t)
    ;(showFunnyToast)._t = window.setTimeout(() => setToast({ open: false, text: '' }), 2200)
  }

  // Absolutely prevent any successful submission
  const intercept = (e) => {
    e.preventDefault()
    e.stopPropagation()
    showFunnyToast()
  }

  return (
    <div className="space-y-6">
      <header className="rounded-2xl bg-gradient-to-r from-amber-200/70 via-pink-200/70 to-sky-200/70 p-5 shadow">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-800">Complaint Box</h1>
            <p className="mt-1 text-slate-700">A magical place to type your feelings…and watch the button run away.</p>
            <p className="mt-2 text-sm font-semibold text-slate-600">We read your feedback… eventually.</p>
          </div>
          <div className="relative h-24 w-24 shrink-0 select-none">
            {/* Cartoon character reacting */}
            <div className="absolute inset-0 rounded-2xl bg-white/70 shadow-inner" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-5xl" role="img" aria-label="confused cat">😺</span>
            </div>
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-white/80 px-2 py-0.5 text-[10px] font-bold text-rose-500 shadow">Leo is confused</div>
          </div>
        </div>
      </header>

      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        className="relative overflow-hidden rounded-3xl bg-white/80 p-6 shadow ring-1 ring-black/5"
        style={{ minHeight: 420 }}
      >
        <form className="grid grid-cols-1 gap-4 md:grid-cols-2" onSubmit={intercept}>
          <div className="md:col-span-2">
            <label className="block text-sm font-bold text-slate-700">Name</label>
            <input
              type="text"
              className="mt-1 w-full rounded-xl border border-slate-200 bg-white/80 px-3 py-2 text-slate-800 shadow focus:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-200"
              placeholder="Type your name"
              onKeyDown={intercept}
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-bold text-slate-700">What is bothering you?</label>
            <textarea
              rows={3}
              className="mt-1 w-full rounded-xl border border-slate-200 bg-white/80 px-3 py-2 text-slate-800 shadow focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-200"
              placeholder="Tell us everything!"
              onKeyDown={(e) => {
                if (e.key.toLowerCase() === 'enter') intercept(e)
              }}
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-bold text-slate-700">How can we improve?</label>
            <textarea
              rows={3}
              className="mt-1 w-full rounded-xl border border-slate-200 bg-white/80 px-3 py-2 text-slate-800 shadow focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-200"
              placeholder="Your brilliant ideas go here…"
              onKeyDown={(e) => {
                if (e.key.toLowerCase() === 'enter') intercept(e)
              }}
            />
          </div>
        </form>

        {/* Escaping submit button */}
        <button
          ref={buttonRef}
          onClick={intercept}
          onMouseDown={intercept}
          onTouchStart={intercept}
          className="absolute select-none rounded-xl bg-gradient-to-r from-fuchsia-500 to-pink-500 px-5 py-3 text-sm font-extrabold text-white shadow-lg shadow-pink-500/20 ring-2 ring-white/50 transition-transform hover:scale-[1.02] active:scale-100"
          style={{ left: pos.x, top: pos.y, pointerEvents: isReady ? 'auto' : 'none' }}
          aria-disabled
        >
          Submit Complaint
        </button>

        {/* Helpful hints */}
        <div className="pointer-events-none absolute inset-x-0 bottom-4 flex justify-center">
          <p className="rounded-full bg-amber-100/80 px-3 py-1 text-xs font-semibold text-amber-700 shadow">
            Psst… the button is a little shy. Try getting closer!
          </p>
        </div>

        {/* Fake error toast */}
        <div
          className={`pointer-events-none fixed left-1/2 top-6 z-50 -translate-x-1/2 transition-all ${
            toast.open ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
          }`}
        >
          <div className="flex items-center gap-3 rounded-xl bg-rose-500 px-4 py-2 text-white shadow-lg">
            <span className="text-lg">⚠️</span>
            <span className="text-sm font-bold">{toast.text}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
