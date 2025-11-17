import React, { useState } from 'react'
import { ChevronDown, Eye, Brain, Users, ShieldAlert, Clock } from 'lucide-react'

const items = [
  {
    key: 'Sensitive',
    icon: Eye,
    color: 'bg-rose-100 text-rose-700',
    content: (
      <div className="space-y-2 text-slate-700">
        <p>Some info is private. Ask: Does this show addresses, phone numbers, school name, passwords, or detailed schedules?</p>
        <p className="font-semibold text-rose-700">Good:</p>
        <ul className="list-disc pl-5">
          <li>Sharing a picture of your art without your last name.</li>
        </ul>
        <p className="font-semibold text-rose-700">Not smart:</p>
        <ul className="list-disc pl-5">
          <li>Posting a photo of your school ID badge.</li>
        </ul>
      </div>
    )
  },
  {
    key: 'Mindful',
    icon: Brain,
    color: 'bg-amber-100 text-amber-700',
    content: (
      <div className="space-y-2 text-slate-700">
        <p>Think before you post. How could this make someone feel? Would an adult you trust approve?</p>
        <p className="font-semibold text-amber-700">Good:</p>
        <ul className="list-disc pl-5">
          <li>Complimenting a classmates project.</li>
        </ul>
        <p className="font-semibold text-amber-700">Not smart:</p>
        <ul className="list-disc pl-5">
          <li>Sharing a joke that could be mean or misunderstood.</li>
        </ul>
      </div>
    )
  },
  {
    key: 'Audience',
    icon: Users,
    color: 'bg-sky-100 text-sky-700',
    content: (
      <div className="space-y-2 text-slate-700">
        <p>Who can see this? Only friends? Friends of friends? The whole world? Adjust your settings.</p>
        <p className="font-semibold text-sky-700">Good:</p>
        <ul className="list-disc pl-5">
          <li>Sharing your soccer win in a private class group.</li>
        </ul>
        <p className="font-semibold text-sky-700">Not smart:</p>
        <ul className="list-disc pl-5">
          <li>Posting your location publicly in real-time.</li>
        </ul>
      </div>
    )
  },
  {
    key: 'Risky',
    icon: ShieldAlert,
    color: 'bg-purple-100 text-purple-700',
    content: (
      <div className="space-y-2 text-slate-700">
        <p>What could go wrong? Could this be copied, shared, or used to trick someone?</p>
        <p className="font-semibold text-purple-700">Good:</p>
        <ul className="list-disc pl-5">
          <li>Using a nickname for your gaming account.</li>
        </ul>
        <p className="font-semibold text-purple-700">Not smart:</p>
        <ul className="list-disc pl-5">
          <li>Sharing a photo in your team uniform with the school name visible.</li>
        </ul>
      </div>
    )
  },
  {
    key: 'Time-proof',
    icon: Clock,
    color: 'bg-emerald-100 text-emerald-700',
    content: (
      <div className="space-y-2 text-slate-700">
        <p>Will this still be okay later? Posts can last a long time and be hard to remove.</p>
        <p className="font-semibold text-emerald-700">Good:</p>
        <ul className="list-disc pl-5">
          <li>Sharing a science fair photo that youre proud of.</li>
        </ul>
        <p className="font-semibold text-emerald-700">Not smart:</p>
        <ul className="list-disc pl-5">
          <li>Posting when youre upset or angry.</li>
        </ul>
      </div>
    )
  }
]

function Accordion({ label, icon: Icon, color, children }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="rounded-2xl bg-white/80 p-4 shadow transition-colors">
      <button onClick={() => setOpen(!open)} className="flex w-full items-center justify-between gap-3">
        <div className={`flex items-center gap-3 rounded-xl px-3 py-2 ${color}`}>
          <Icon className="h-5 w-5" />
          <span className="text-sm font-bold">{label}</span>
        </div>
        <ChevronDown className={`h-5 w-5 text-slate-500 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && <div className="mt-3 text-sm">{children}</div>}
    </div>
  )
}

export default function Learn() {
  return (
    <section className="space-y-4">
      <div className="rounded-2xl bg-gradient-to-r from-orange-100 via-rose-100 to-sky-100 p-4">
        <p className="text-slate-700">Explore each part of the SMART model. Tap to expand and read examples that help you make strong choices online.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {items.map(({ key, icon, color, content }) => (
          <Accordion key={key} label={key} icon={icon} color={color}>
            {content}
          </Accordion>
        ))}
      </div>
      <div className="rounded-2xl bg-white/80 p-4 shadow">
        <h3 className="font-bold text-slate-800">Quick Video Explainer</h3>
        <p className="mb-2 text-slate-600">Watch this short explainer about the SMART model.</p>
        <div className="aspect-video w-full overflow-hidden rounded-xl">
          <iframe
            className="h-full w-full"
            src="https://www.youtube.com/embed/2V-20Qe4M8Y?rel=0"
            title="SMART Sharing Explainer"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  )
}
