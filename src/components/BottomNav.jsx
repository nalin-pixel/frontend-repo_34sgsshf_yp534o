import { Home, PlayCircle, Dumbbell, Users, Trophy } from 'lucide-react'

const items = [
  { id: 'hero', label: 'Home', icon: Home },
  { id: 'tutorial', label: 'Tutorial', icon: PlayCircle },
  { id: 'practice', label: 'Practice', icon: Dumbbell },
  { id: 'feed', label: 'Community', icon: Users },
  { id: 'leaderboard', label: 'Leaders', icon: Trophy },
]

export default function BottomNav() {
  const scrollTo = (id) => {
    const el = document.getElementById(id)
    if (!el) return
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <nav aria-label="Primary" className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
      <ul className="flex items-center gap-2 bg-white/90 backdrop-blur rounded-2xl shadow-xl px-2 py-2 border border-slate-200">
        {items.map(({ id, label, icon: Icon }) => (
          <li key={id}>
            <button
              onClick={() => scrollTo(id)}
              className="flex flex-col items-center justify-center px-3 py-2 rounded-xl hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              aria-label={label}
            >
              <Icon className="w-6 h-6 text-slate-800" aria-hidden="true" />
              <span className="text-[11px] font-medium text-slate-700 mt-1">{label}</span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}
