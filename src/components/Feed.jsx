import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function Feed() {
  const [items, setItems] = useState([])
  const [url, setUrl] = useState('')
  const [comment, setComment] = useState('')
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const load = async () => {
    const r = await fetch(`${baseUrl}/api/attempts`)
    const d = await r.json()
    setItems(d)
  }

  useEffect(() => { load() }, [])

  const share = async () => {
    await fetch(`${baseUrl}/api/attempts`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: 'demo-user', media_url: url, comment })
    })
    setUrl(''); setComment('');
    load()
  }

  return (
    <div className="bg-white/80 backdrop-blur rounded-2xl p-4 md:p-6 shadow-xl">
      <h3 className="text-lg md:text-xl font-semibold mb-3">Community Attempts</h3>

      <form className="flex flex-col md:flex-row gap-2 mb-4" onSubmit={(e)=>{e.preventDefault(); share()}} aria-label="Share attempt">
        <label className="sr-only" htmlFor="media-url">Video URL</label>
        <input id="media-url" value={url} onChange={e=>setUrl(e.target.value)} placeholder="Video URL (mp4, gif, etc.)" className="flex-1 rounded-lg border border-slate-300 px-3 py-2" />
        <label className="sr-only" htmlFor="caption">Caption</label>
        <input id="caption" value={comment} onChange={e=>setComment(e.target.value)} placeholder="Add a caption" className="flex-1 rounded-lg border border-slate-300 px-3 py-2" />
        <button type="submit" className="px-4 py-2 rounded-lg bg-slate-900 text-white">Share</button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map((it) => (
          <motion.article key={it.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl overflow-hidden border border-slate-200 bg-white shadow-sm">
            <div className="aspect-video bg-slate-100 flex items-center justify-center text-slate-500">
              {it.media_url ? (
                <video src={it.media_url} controls className="w-full h-full object-cover" />
              ) : (
                <div className="p-6">No media</div>
              )}
            </div>
            <div className="p-3">
              <p className="text-sm text-slate-600">{it.comment || '—'}</p>
              <div className="text-xs text-slate-400 mt-1">by {it.user_id}</div>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  )
}
