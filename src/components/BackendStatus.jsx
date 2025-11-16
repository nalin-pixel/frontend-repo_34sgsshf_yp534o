import { useEffect, useState, useMemo } from 'react'

const getBackendUrl = () => {
  const url = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  return url.replace(/\/$/, '')
}

export default function BackendStatus() {
  const [status, setStatus] = useState({ loading: true, ok: false, db: 'Unknown', details: null })
  const base = useMemo(() => getBackendUrl(), [])

  useEffect(() => {
    let cancelled = false
    const fetchStatus = async () => {
      try {
        const res = await fetch(`${base}/test`, { headers: { 'Accept': 'application/json' } })
        if (!res.ok) throw new Error('Network error')
        const data = await res.json()
        if (cancelled) return
        const ok = data && data.backend && String(data.backend).includes('✅')
        const db = data && data.database ? data.database : 'Unknown'
        setStatus({ loading: false, ok, db, details: data })
      } catch (e) {
        if (cancelled) return
        setStatus({ loading: false, ok: false, db: '❌ Not Available', details: null })
      }
    }

    fetchStatus()
    const id = setInterval(fetchStatus, 30000)
    return () => {
      cancelled = true
      clearInterval(id)
    }
  }, [base])

  const color = status.loading ? 'bg-amber-500/20 text-amber-200 border-amber-500/40' : status.ok ? 'bg-emerald-500/20 text-emerald-200 border-emerald-500/40' : 'bg-rose-500/20 text-rose-200 border-rose-500/40'
  const dot = status.loading ? 'animate-pulse bg-amber-400' : status.ok ? 'bg-emerald-400' : 'bg-rose-400'

  return (
    <div className={`mx-auto max-w-6xl px-6 pt-3`}>
      <div className={`rounded-lg border ${color} px-4 py-3 flex items-center gap-3`} role="status" aria-live="polite">
        <span className={`inline-block h-2.5 w-2.5 rounded-full ${dot}`} aria-hidden="true" />
        <div className="flex-1 text-sm">
          <div className="font-medium">
            {status.loading ? 'Checking backend status…' : status.ok ? 'Backend connected' : 'Backend unreachable'}
          </div>
          <div className="opacity-80">
            {status.loading ? 'Please wait' : `Database: ${status.db}`}
          </div>
        </div>
        <a
          href={`${base}/test`}
          target="_blank"
          rel="noreferrer"
          className="text-xs underline opacity-80 hover:opacity-100"
          aria-label="Open backend diagnostics in a new tab"
        >
          Diagnostics
        </a>
      </div>
    </div>
  )
}
