import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function Leaderboard() {
  const [rows, setRows] = useState([])
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  useEffect(() => {
    fetch(`${baseUrl}/api/leaderboard`).then(r => r.json()).then(setRows)
  }, [])

  return (
    <div className="bg-white/80 backdrop-blur rounded-2xl p-4 md:p-6 shadow-xl">
      <h3 className="text-lg md:text-xl font-semibold mb-3">Leaderboard</h3>
      <div className="space-y-2">
        {rows.map((r) => (
          <motion.div key={r.user_id} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
            className="flex items-center justify-between rounded-lg px-3 py-2 bg-gradient-to-r from-indigo-600 to-fuchsia-600 text-white shadow">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-bold">{r.rank}</div>
              <div className="font-medium">{r.user_id}</div>
            </div>
            <div className="text-white/90 font-semibold">{r.points} pts</div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
