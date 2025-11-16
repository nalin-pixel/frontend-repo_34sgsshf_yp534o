import Hero from './components/Hero'
import TutorialPlayer from './components/TutorialPlayer'
import PracticePanel from './components/PracticePanel'
import Feed from './components/Feed'
import Leaderboard from './components/Leaderboard'
import BottomNav from './components/BottomNav'
import AccessibilityBar from './components/AccessibilityBar'
import BackendStatus from './components/BackendStatus'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-950 to-black text-slate-100">
      <AccessibilityBar />
      <BackendStatus />
      <section id="hero" aria-label="Hero">
        <Hero />
      </section>

      <main className="max-w-6xl mx-auto px-6 -mt-16 relative z-10 space-y-6 md:space-y-8 pb-28">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          <div className="md:col-span-2 space-y-4">
            <section id="tutorial" aria-label="Tutorial">
              <TutorialPlayer />
            </section>
            <section id="feed" aria-label="Community Feed">
              <Feed />
            </section>
          </div>
          <div className="space-y-4">
            <section id="practice" aria-label="Practice Session">
              <PracticePanel />
            </section>
            <section id="leaderboard" aria-label="Leaderboard">
              <Leaderboard />
            </section>
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  )
}

export default App
