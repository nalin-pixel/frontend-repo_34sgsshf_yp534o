import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'

export default function TutorialPlayer() {
  const [steps, setSteps] = useState([])
  const [idx, setIdx] = useState(0)
  const [speed, setSpeed] = useState(1)
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  useEffect(() => {
    fetch(`${baseUrl}/api/tutorial`).then(r => r.json()).then(setSteps)
  }, [])

  const step = steps[idx] || {}

  const next = () => setIdx(i => (i + 1) % steps.length)
  const prev = () => setIdx(i => (i - 1 + steps.length) % steps.length)

  return (
    <div className="bg-white/70 backdrop-blur rounded-2xl p-4 md:p-6 shadow-xl">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg md:text-xl font-semibold">Shove Tutorial</h3>
        <div className="text-sm text-gray-600">Angle: <span className="font-medium">{step.angle}</span></div>
      </div>

      <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-gradient-to-br from-slate-900 to-slate-800">
        <motion.div
          key={`${idx}-${speed}`}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="text-center px-6">
            <p className="text-white/90 text-xl md:text-2xl font-semibold mb-2">{step.title}</p>
            <p className="text-white/70 text-sm md:text-base max-w-xl mx-auto">{step.description}</p>
            <ul className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-2 text-left">
              {(step.tips || []).map((t, i) => (
                <li key={i} className="text-white/80 text-sm">• {t}</li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>

      <div className="mt-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <button onClick={prev} className="px-3 py-2 rounded-lg bg-slate-900 text-white hover:bg-slate-800">Prev</button>
          <button onClick={next} className="px-3 py-2 rounded-lg bg-slate-900 text-white hover:bg-slate-800">Next</button>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-slate-600">Speed</span>
          {[0.5, 0.75, 1, 1.25].map(s => (
            <button key={s} onClick={() => setSpeed(s)} className={`px-2.5 py-1.5 rounded-md text-sm ${speed===s? 'bg-indigo-600 text-white':'bg-slate-200 text-slate-800 hover:bg-slate-300'}`}>{s}x</button>
          ))}
        </div>
      </div>
    </div>
  )
}
