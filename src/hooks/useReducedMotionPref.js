import { useEffect, useState } from 'react'

// Determines whether to reduce motion based on system preference with optional user override.
// localStorage key: reduce-motion = 'on' | 'off'
export default function useReducedMotionPref() {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const override = typeof window !== 'undefined' ? localStorage.getItem('reduce-motion') : null
    if (override === 'on') {
      setReduced(true)
      return
    }
    if (override === 'off') {
      setReduced(false)
      return
    }
    const mq = typeof window !== 'undefined' ? window.matchMedia('(prefers-reduced-motion: reduce)') : null
    const update = () => setReduced(!!mq?.matches)
    update()
    mq?.addEventListener?.('change', update)
    return () => mq?.removeEventListener?.('change', update)
  }, [])

  const setOverride = (value) => {
    if (value === true) localStorage.setItem('reduce-motion', 'on')
    else if (value === false) localStorage.setItem('reduce-motion', 'off')
    else localStorage.removeItem('reduce-motion')
    // Trigger a re-evaluation
    const mq = typeof window !== 'undefined' ? window.matchMedia('(prefers-reduced-motion: reduce)') : null
    const override = localStorage.getItem('reduce-motion')
    if (override === 'on') setReduced(true)
    else if (override === 'off') setReduced(false)
    else setReduced(!!mq?.matches)
  }

  return { reduced, setOverride }
}
