import Spline from '@splinetool/react-spline'
import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section className="relative h-[60vh] md:h-[70vh] w-full overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/atN3lqky4IzF-KEP/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent pointer-events-none" />
      <div className="relative z-10 max-w-6xl mx-auto px-6 h-full flex items-end pb-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-white">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">Master the Shove</h1>
          <p className="mt-3 md:mt-4 text-lg md:text-xl text-white/80 max-w-2xl">Fully animated coaching, gamified progression, and a community that celebrates every landing. Practice daily, level up, and own your Shove.</p>
        </motion.div>
      </div>
    </section>
  )
}
