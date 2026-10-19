import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, Moon, Star, Heart, Award, Volume2 } from 'lucide-react';
import { soundEngine } from '../utils/audio';

export function HeroSection({ onOpenGrowthChart }) {
  const avatarRef = useRef(null);
  const [pupilPos, setPupilPos] = useState({ x: 0, y: 0 });
  const [headTilt, setHeadTilt] = useState(0);
  const [clickCount, setClickCount] = useState(0);
  const [easterEggActive, setEasterEggActive] = useState(false);
  const [yawnActive, setYawnActive] = useState(false);

  // Mouse tracking for Pip's glowing amber pupils & subtle head tilt
  useEffect(() => {
    const handlePointerMove = (e) => {
      if (!avatarRef.current) return;
      const rect = avatarRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = (e.clientX - centerX) / (window.innerWidth / 2);
      const deltaY = (e.clientY - centerY) / (window.innerHeight / 2);

      // Clamp movement within eye socket boundaries
      const clampX = Math.max(-6, Math.min(6, deltaX * 6));
      const clampY = Math.max(-5, Math.min(5, deltaY * 5));
      const clampTilt = Math.max(-7, Math.min(7, deltaX * 7));

      setPupilPos({ x: clampX, y: clampY });
      setHeadTilt(clampTilt);
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, []);

  // Easter Egg trigger: Tap Pip's bedtime nightcap 5 times!
  const handleNightcapClick = (e) => {
    e.stopPropagation();
    const newCount = clickCount + 1;
    setClickCount(newCount);
    soundEngine.playChime(newCount % 6);

    if (newCount >= 5 && !easterEggActive) {
      setEasterEggActive(true);
      soundEngine.playEasterEggFanfare();
      
      confetti({
        particleCount: 120,
        spread: 90,
        origin: { y: 0.55 },
        colors: ['#a34063', '#f7c948', '#fff8f1', '#00ff66', '#c2587f'],
      });
    }
  };

  const handleYawnClick = () => {
    soundEngine.playClick();
    setYawnActive(true);
    soundEngine.playChime(1);
    setTimeout(() => soundEngine.playChime(0), 400);
    setTimeout(() => setYawnActive(false), 2000);
  };

  return (
    <section id="identity" className="pt-8 sm:pt-14 pb-12 relative">
      {/* Decorative ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-80 h-80 bg-berry/10 dark:bg-amberStar/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Top Edition Eyebrow */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-berry/10 dark:bg-amberStar/15 text-berry dark:text-amberStar border border-berry/20 dark:border-amberStar/30">
            <Moon size={13} /> Official haX.baby Track 1 Canon
          </span>
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-cream-200 dark:bg-night-card text-bark dark:text-stone-300 border border-cream-300 dark:border-stone-800">
            ★ Same Baby, 1,000 Websites
          </span>
        </div>

        {/* Hero Character Display */}
        <div className="text-center relative">
          
          {/* Interactive Character Avatar */}
          <div 
            ref={avatarRef}
            className="relative w-64 sm:w-72 h-64 sm:h-72 mx-auto mb-6 select-none cursor-pointer group"
            onClick={() => soundEngine.playChime(null)}
            title="Click Pip to hear a chime, or tap the starry nightcap 5 times for a surprise!"
          >
            {/* Soft Fluffy Cloud Base */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-56 sm:w-64 h-16 bg-white/80 dark:bg-white/10 rounded-full blur-sm border border-white/60 shadow-lg pointer-events-none animate-float-slow" />

            {/* Official Studio Asset & Head Tilt Wrapper */}
            <div 
              style={{ transform: `rotate(${headTilt}deg)` }}
              className="relative w-full h-full flex items-center justify-center transition-transform duration-100 ease-out"
            >
              <img
                src="assets/pip_avatar_cloud.png"
                alt="Pip the Skull Baby floating on a cloud"
                className="w-full h-full object-contain filter drop-shadow-xl z-10 pointer-events-none"
                onError={(e) => {
                  // Fallback to high-res portrait if cloud cutout is loading
                  e.currentTarget.src = 'assets/pip_portrait.png';
                }}
              />

              {/* Dynamic Eye Pinprick Tracking Overlay (Anchored to Pip's eye coordinates) */}
              <div 
                className="absolute z-20 pointer-events-none"
                style={{ top: '44%', left: '48%', transform: 'translate(-50%, -50%)' }}
              >
                <div className="flex gap-8 sm:gap-9">
                  {/* Left Eye Pupil */}
                  <div className="w-4 h-4 rounded-full flex items-center justify-center">
                    <div
                      style={{ transform: `translate(${pupilPos.x}px, ${pupilPos.y}px)` }}
                      className="w-2.5 h-2.5 rounded-full bg-amberStar shadow-[0_0_8px_#f59e0b] animate-pulse-glow"
                    />
                  </div>
                  {/* Right Eye Pupil */}
                  <div className="w-4 h-4 rounded-full flex items-center justify-center">
                    <div
                      style={{ transform: `translate(${pupilPos.x}px, ${pupilPos.y}px)` }}
                      className="w-2.5 h-2.5 rounded-full bg-amberStar shadow-[0_0_8px_#f59e0b] animate-pulse-glow"
                    />
                  </div>
                </div>
              </div>

              {/* Secret Nightcap Click Area (Easter Egg Target) */}
              <button
                onClick={handleNightcapClick}
                className="absolute top-2 right-8 sm:right-10 z-30 p-2.5 rounded-full bg-amber-400/20 hover:bg-amber-400/40 border border-amber-300/40 transition-transform active:scale-90"
                title="Secret Star Bow: Tap 5 times to wake Pip!"
                aria-label="Tap star on nightcap"
              >
                <span className="text-xl sm:text-2xl animate-spin-slow inline-block">⭐</span>
              </button>
            </div>
          </div>

          {/* Character Identity & Voice Intro */}
          <div className="space-y-4 max-w-2xl mx-auto">
            <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-bark dark:text-cream-50 leading-[1.1]">
              Hello, I’m <span className="text-berry dark:text-amberStar">Pip.</span>
            </h1>
            
            <p className="font-editorial italic text-xl sm:text-2xl text-berry-dark dark:text-amberStar-light">
              “Good things start small... and soft dreams start here.”
            </p>

            <p className="text-base sm:text-lg text-bark-light dark:text-stone-300 leading-relaxed max-w-xl mx-auto">
              I’m a sleepy baby with a smooth round skull, warm glowing amber eyes, and a star-studded nightcap. As <strong>Junior Dream Engineer</strong> at Midnight Nursery, I weave lullabies and tend the bedside lanterns that guide creatures gently to sleep.
            </p>
          </div>

          {/* Easter Egg Celebration Toast */}
          {easterEggActive && (
            <div className="mt-5 inline-flex items-center gap-2 px-4 py-2.5 bg-amberStar/20 border-2 border-amberStar text-bark dark:text-amberStar font-bold text-xs sm:text-sm rounded-xl shadow-retro-amber animate-bounce">
              <Sparkles size={16} className="text-berry" />
              <span>★ Easter Egg Unlocked: Pip woke up and granted you sweet dreams! ★</span>
            </div>
          )}

          {/* Interactive Hero Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-7">
            <button
              onClick={handleYawnClick}
              className="px-4 py-2 rounded-xl bg-berry text-white font-bold text-sm shadow-retro hover:bg-berry-hover transition active:translate-x-0.5 active:translate-y-0.5 flex items-center gap-2"
            >
              <Volume2 size={16} />
              {yawnActive ? 'Yaaawning... (*ᴗ͈ˬᴗ͈)💤' : 'Hear Pip Yawn'}
            </button>

            <button
              onClick={onOpenGrowthChart}
              className="px-4 py-2 rounded-xl bg-white dark:bg-night-card border-2 border-bark dark:border-stone-700 text-bark dark:text-cream-100 font-bold text-sm shadow-retro hover:bg-cream-200 dark:hover:bg-night-50 transition active:translate-x-0.5 active:translate-y-0.5 flex items-center gap-2"
            >
              <Award size={16} className="text-amberStar" />
              Nursery Growth Chart
            </button>
          </div>

          {/* The 5-Point Character Sheet Card Grid */}
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
            <div className="p-3.5 rounded-xl bg-white/80 dark:bg-night-card border border-cream-300 dark:border-night-50 shadow-sm">
              <div className="text-xs uppercase font-bold tracking-wider text-stone-400">Species</div>
              <div className="font-editorial text-sm sm:text-base font-bold text-bark dark:text-cream-100 mt-0.5">
                Skull Baby
              </div>
              <div className="text-[11px] text-stone-500 mt-1">Cozy, round & friendly</div>
            </div>

            <div className="p-3.5 rounded-xl bg-white/80 dark:bg-night-card border border-cream-300 dark:border-night-50 shadow-sm">
              <div className="text-xs uppercase font-bold tracking-wider text-stone-400">Craft</div>
              <div className="font-editorial text-sm sm:text-base font-bold text-berry dark:text-amberStar mt-0.5">
                Dream Engineer
              </div>
              <div className="text-[11px] text-stone-500 mt-1">Lullabies & nightlights</div>
            </div>

            <div className="p-3.5 rounded-xl bg-white/80 dark:bg-night-card border border-cream-300 dark:border-night-50 shadow-sm">
              <div className="text-xs uppercase font-bold tracking-wider text-stone-400">Quirks</div>
              <div className="font-editorial text-sm sm:text-base font-bold text-bark dark:text-cream-100 mt-0.5">
                Stardust Pocket
              </div>
              <div className="text-[11px] text-stone-500 mt-1">Yawns in pentatonic C</div>
            </div>

            <div className="p-3.5 rounded-xl bg-white/80 dark:bg-night-card border border-cream-300 dark:border-night-50 shadow-sm">
              <div className="text-xs uppercase font-bold tracking-wider text-stone-400">Location</div>
              <div className="font-editorial text-sm sm:text-base font-bold text-bark dark:text-cream-100 mt-0.5">
                Midnight Ward #7
              </div>
              <div className="text-[11px] text-stone-500 mt-1">Between dusk & dawn</div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
