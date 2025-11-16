import { useState } from 'react'
import { motion } from 'framer-motion'
import AnimatedCoach from './AnimatedCoach'

export default function PracticePanel() {
  const [duration, setDuration] = useState(20)
  const [attempts, setAttempts] = useState(30)
  const [score, setScore] = useState(50)
  const [status, setStatus] = useState('idle')
  const [feedback, setFeedback] = useState(null)
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const userId = 'demo-user'

  const submit = async () => {
    setStatus('practicing')
    const res = await fetch(`${baseUrl}/api/practice`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: userId, duration_min: duration, attempts, technique_score: score })
    })
    const data = await res.json()
    setFeedback(data)
    setStatus(data.milestone ? 'milestone' : data.badges_unlocked?.length ? 'kudos' : 'practicing')
    setTimeout(() => setStatus('idle'), 2500)
  }

  return (
    <div className="bg-white/80 backdrop-blur rounded-2xl p-4 md:p-6 shadow-xl space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg md:text-xl font-semibold">Practice Session</h3>
        <AnimatedCoach state={status} />
      </div>

      <div className="grid grid-cols-3 gap-3 text-sm">
        <div>
          <label className="block text-slate-600 mb-1" htmlFor="minutes">Minutes</label>
          <input id="minutes" type="range" min="5" max="120" value={duration} onChange={e=>setDuration(Number(e.target.value))} className="w-full" />
          <div className="text-slate-900 font-medium mt-1" aria-live="polite">{duration} min</div>
        </div>
        <div>
          <label className="block text-slate-600 mb-1" htmlFor="attempts">Attempts</label>
          <input id="attempts" type="range" min="5" max="200" value={attempts} onChange={e=>setAttempts(Number(e.target.value))} className="w-full" />
          <div className="text-slate-900 font-medium mt-1" aria-live="polite">{attempts}</div>
        </div>
        <div>
          <label className="block text-slate-600 mb-1" htmlFor="technique">Technique</label>
          <input id="technique" type="range" min="0" max="100" value={score} onChange={e=>setScore(Number(e.target.value))} className="w-full" />
          <div className="text-slate-900 font-medium mt-1" aria-live="polite">{score}</div>
        </div>
      </div>

      <motion.button whileTap={{ scale: 0.98 }} onClick={submit} className="w-full px-4 py-2.5 rounded-xl bg-indigo-600 text-white font-semibold shadow hover:bg-indigo-500">
        Log Practice
      </motion.button>

      {feedback && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl bg-slate-900 text-white p-4" role="status" aria-live="polite">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-white/70">XP Earned</div>
              <div className="text-2xl font-bold">{feedback.xp_earned}</div>
            </div>
            <div className="text-right">
              <div className="text-sm text-white/70">Streak</div>
              <div className="text-2xl font-bold">{feedback.streak} days</div>
            </div>
          </div>
          {(feedback.badges_unlocked?.length>0 || feedback.milestone) && (
            <div className="mt-3 text-sm">
              {feedback.milestone && <div className="mb-1">Milestone: <span className="font-semibold">{feedback.milestone}</span></div>}
              {feedback.badges_unlocked?.length>0 && (
                <div>Badges: {feedback.badges_unlocked.join(', ')}</div>
              )}
            </div>
          )}
        </motion.div>
      )}
    </div>
  )
}
