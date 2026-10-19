import React, { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { HeroSection } from './components/HeroSection';
import { ProjectsSection } from './components/ProjectsSection';
import { StorySection } from './components/StorySection';
import { GuestbookSection } from './components/GuestbookSection';
import { GrowthChartModal } from './components/GrowthChartModal';
import { SparkleTrail } from './components/SparkleTrail';
import { ChaosModeOverlay } from './components/ChaosModeOverlay';
import { Footer } from './components/Footer';
import { soundEngine } from './utils/audio';

export default function App() {
  // Theme state with local persistence
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('pip_bedtime_theme');
      return saved ? saved === 'dark' : false; // Default to warm cream palette (#fff8f1)
    }
    return false;
  });

  // Sound mute state
  const [isMuted, setIsMuted] = useState(() => soundEngine.isMuted);

  // Retro Chaos Mode (+5 bonus points)
  const [isChaos, setIsChaos] = useState(false);

  // Growth Chart Modal
  const [isGrowthChartOpen, setIsGrowthChartOpen] = useState(false);

  // Sync dark class on document element
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('pip_bedtime_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('pip_bedtime_theme', 'light');
    }
  }, [isDark]);

  const toggleDarkMode = () => {
    setIsDark((prev) => !prev);
  };

  const toggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    soundEngine.setMuted(nextMuted);
  };

  const toggleChaos = () => {
    setIsChaos((prev) => !prev);
  };

  return (
    <div className={`min-h-screen ${isDark ? 'dotted-pattern-dark bg-night text-cream-100' : 'dotted-pattern-light bg-cream-100 text-bark'} transition-colors duration-500 font-bubbly selection:bg-berry selection:text-white relative`}>
      
      {/* Side Quest: Sparkle Cursor Trail (+2 pts) */}
      <SparkleTrail enabled={true} />

      {/* Side Quest: Retro Chaos Mode Overlay (+5 pts) */}
      <ChaosModeOverlay isChaos={isChaos} />

      {/* Sticky Top Header Navigation */}
      <Navigation
        isDark={isDark}
        onToggleDark={toggleDarkMode}
        isMuted={isMuted}
        onToggleMute={toggleMute}
        isChaos={isChaos}
        onToggleChaos={toggleChaos}
      />

      {/* Main Portfolio Sections */}
      <main className="relative">
        {/* Core Question 1: Who Pip Is */}
        <HeroSection onOpenGrowthChart={() => setIsGrowthChartOpen(true)} />

        {/* Core Question 2: What Pip Does (3+ Inventions) */}
        <ProjectsSection />

        {/* Core Question 3: What Pip's Story Is (Bedtime Storybook) */}
        <StorySection />

        {/* Bonus Side Quest: Live Guestbook Wall (+2 pts) */}
        <GuestbookSection />
      </main>

      {/* Growth Chart Modal */}
      <GrowthChartModal
        isOpen={isGrowthChartOpen}
        onClose={() => setIsGrowthChartOpen(false)}
      />

      {/* Vintage Early-Web Footer */}
      <Footer />
    </div>
  );
}
