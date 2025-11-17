import React from 'react'

export default function Mascot({ message }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-white/70 p-3 shadow">
      <div className="relative h-14 w-14 shrink-0">
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-orange-400 to-pink-400" />
        <div className="absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="8" cy="10" r="2" fill="#111827"/>
            <circle cx="16" cy="10" r="2" fill="#111827"/>
            <path d="M7 16c2.5 2.2 7.5 2.2 10 0" stroke="#111827" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </div>
      </div>
      <p className="text-slate-700">
        <span className="font-semibold">Pixel: </span>
        {message}
      </p>
    </div>
  )
}
