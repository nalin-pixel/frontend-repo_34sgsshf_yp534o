import useReducedMotionPref from '../hooks/useReducedMotionPref'

export default function AccessibilityBar() {
  const { reduced, setOverride } = useReducedMotionPref()

  return (
    <div className="fixed top-3 right-3 z-50">
      <div className="flex items-center gap-2 bg-white/90 backdrop-blur px-3 py-2 rounded-xl shadow border border-slate-200">
        <label className="flex items-center gap-2 text-sm text-slate-800">
          <input
            type="checkbox"
            aria-label="Reduce motion"
            checked={reduced}
            onChange={(e) => setOverride(e.target.checked)}
            className="accent-indigo-600"
          />
          Reduce motion
        </label>
      </div>
    </div>
  )
}
