import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Trophy, Flame, Stars, ThumbsUp } from 'lucide-react'

export default function AnimatedCoach({ state }) {
  const messages = {
    idle: { icon: <Sparkles className="w-6 h-6" />, text: 'Ready to roll? Let\'s break down the Shove.' },
    practicing: { icon: <Flame className="w-6 h-6" />, text: 'Nice flow! Scoop with the back foot and stay centered.' },
    milestone: { icon: <Trophy className="w-6 h-6" />, text: 'Milestone reached! That rotation was clean.' },
    mastered: { icon: <Stars className="w-6 h-6" />, text: 'Mastered! You\'re locking these down.' },
    kudos: { icon: <ThumbsUp className="w-6 h-6" />, text: 'Solid session — consistency building up!'}
  }

  const current = messages[state] || messages.idle

  return (
    <div className="relative">
      <motion.div
        key={state}
        initial={{ opacity: 0, y: 10, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.35 }}
        className="flex items-center gap-3 bg-gradient-to-r from-indigo-600 to-fuchsia-600 text-white rounded-xl px-4 py-3 shadow-lg"
      >
        <motion.div
          initial={{ rotate: -10 }}
          animate={{ rotate: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 10 }}
        >
          {current.icon}
        </motion.div>
        <p className="text-sm md:text-base font-medium">{current.text}</p>
      </motion.div>
    </div>
  )
}
