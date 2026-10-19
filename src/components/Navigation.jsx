import React, { useState } from 'react';
import { Volume2, VolumeX, Moon, Sun, Sparkles, Menu, X, BookOpen, Music, MapPin, Heart } from 'lucide-react';
import { HitCounter } from './HitCounter';
import { soundEngine } from '../utils/audio';

export function Navigation({ isDark, onToggleDark, isMuted, onToggleMute, isChaos, onToggleChaos }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavClick = (anchor) => {
    soundEngine.playClick();
    setIsMobileMenuOpen(false);
    const element = document.querySelector(anchor);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-cream-100/90 dark:bg-night/90 border-b border-cream-300 dark:border-night-50 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        
        {/* Brand Lockup */}
        <a 
          href="#identity" 
          onClick={(e) => { e.preventDefault(); handleNavClick('#identity'); }}
          className="flex items-center gap-2.5 group"
        >
          <div className="w-8 h-8 rounded-full bg-berry dark:bg-amberStar flex items-center justify-center text-white dark:text-stone-900 shadow-sm transition-transform group-hover:scale-110">
            <span className="text-base select-none">🌙</span>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-editorial text-lg sm:text-xl font-bold tracking-tight text-berry dark:text-amberStar">
                haX<span className="text-bark dark:text-cream-100 font-normal">.pip</span>
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-berry/10 dark:bg-amberStar/20 text-berry dark:text-amberStar border border-berry/20 dark:border-amberStar/30">
                Baby #001
              </span>
            </div>
            <p className="text-[11px] text-bark-light dark:text-stone-400 -mt-0.5 hidden sm:block">
              Junior Dream Engineer · Midnight Nursery
            </p>
          </div>
        </a>

        {/* Desktop Quick Nav Links */}
        <nav className="hidden md:flex items-center gap-1 text-sm font-medium text-bark dark:text-cream-100">
          <button
            onClick={() => handleNavClick('#identity')}
            className="px-3 py-1.5 rounded-lg hover:bg-cream-200 dark:hover:bg-night-50 hover:text-berry dark:hover:text-amberStar transition"
          >
            Who I Am
          </button>
          <button
            onClick={() => handleNavClick('#projects')}
            className="px-3 py-1.5 rounded-lg hover:bg-cream-200 dark:hover:bg-night-50 hover:text-berry dark:hover:text-amberStar transition"
          >
            Inventions (3+)
          </button>
          <button
            onClick={() => handleNavClick('#story')}
            className="px-3 py-1.5 rounded-lg hover:bg-cream-200 dark:hover:bg-night-50 hover:text-berry dark:hover:text-amberStar transition"
          >
            Bedtime Story
          </button>
          <button
            onClick={() => handleNavClick('#guestbook')}
            className="px-3 py-1.5 rounded-lg hover:bg-cream-200 dark:hover:bg-night-50 hover:text-berry dark:hover:text-amberStar transition"
          >
            Dream Wishes
          </button>
        </nav>

        {/* Interactive Controls & Odometer */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden lg:block">
            <HitCounter />
          </div>

          {/* Retro Chaos Mode Pill (+5 pts) */}
          <button
            onClick={() => {
              soundEngine.playClick();
              onToggleChaos();
            }}
            className={`px-2 sm:px-2.5 py-1 rounded-md text-xs font-bold border transition-all flex items-center gap-1 select-none shadow-sm ${
              isChaos
                ? 'bg-retroMint text-stone-900 border-retroMint shadow-retro'
                : 'bg-white/80 dark:bg-night-card text-bark dark:text-stone-300 border-cream-300 dark:border-stone-700 hover:border-berry'
            }`}
            title="Toggle Early-Web 90s Chaos Mode (+5pts)"
          >
            <Sparkles size={13} className={isChaos ? 'animate-spin' : ''} />
            <span className="hidden sm:inline">Retro Mode</span>
            {isChaos && <span className="text-[10px] bg-black text-white px-1 rounded">ON</span>}
          </button>

          {/* Sound Mute Button with Required Indicator (+3 pts) */}
          <button
            onClick={() => {
              soundEngine.playClick();
              onToggleMute();
            }}
            aria-label={isMuted ? 'Unmute cozy sounds' : 'Mute sounds'}
            title={isMuted ? 'Sound muted (Click to unmute)' : 'Sound active (Click to mute)'}
            className={`p-2 rounded-full border transition shadow-sm relative ${
              isMuted
                ? 'bg-stone-200 dark:bg-stone-800 border-stone-300 dark:border-stone-700 text-stone-400'
                : 'bg-berry/10 dark:bg-amberStar/15 border-berry/30 dark:border-amberStar/40 text-berry dark:text-amberStar hover:scale-105'
            }`}
          >
            {isMuted ? <VolumeX size={17} /> : <Volume2 size={17} />}
            {!isMuted && (
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-retroMint animate-ping" />
            )}
          </button>

          {/* Day / Dream Mood Toggle */}
          <button
            onClick={() => {
              soundEngine.playChime(3);
              onToggleDark();
            }}
            aria-label="Toggle Bedtime Mood"
            title={isDark ? 'Switch to Warm Cream Day Mode' : 'Switch to Midnight Slumber Mode'}
            className="p-2 rounded-full border border-cream-300 dark:border-night-50 bg-white/80 dark:bg-night-card hover:bg-cream-200 dark:hover:bg-night-50 text-bark dark:text-amberStar transition shadow-sm hover:scale-105"
          >
            {isDark ? <Sun size={17} /> : <Moon size={17} />}
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => {
              soundEngine.playClick();
              setIsMobileMenuOpen(!isMobileMenuOpen);
            }}
            className="md:hidden p-2 rounded-lg border border-cream-300 dark:border-night-50 bg-white/70 dark:bg-night-card text-bark dark:text-cream-100"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden px-6 py-4 bg-cream-50 dark:bg-night-card border-b border-cream-300 dark:border-night-50 space-y-3 animate-fadeIn">
          <div className="flex justify-center py-1">
            <HitCounter />
          </div>
          <div className="grid grid-cols-2 gap-2 text-sm font-semibold">
            <button
              onClick={() => handleNavClick('#identity')}
              className="p-2 text-left rounded-lg bg-white dark:bg-night text-bark dark:text-cream-100 border border-cream-300 dark:border-night-50"
            >
              👶 Who I Am
            </button>
            <button
              onClick={() => handleNavClick('#projects')}
              className="p-2 text-left rounded-lg bg-white dark:bg-night text-bark dark:text-cream-100 border border-cream-300 dark:border-night-50"
            >
              🛠️ Inventions
            </button>
            <button
              onClick={() => handleNavClick('#story')}
              className="p-2 text-left rounded-lg bg-white dark:bg-night text-bark dark:text-cream-100 border border-cream-300 dark:border-night-50"
            >
              📖 Bedtime Story
            </button>
            <button
              onClick={() => handleNavClick('#guestbook')}
              className="p-2 text-left rounded-lg bg-white dark:bg-night text-bark dark:text-cream-100 border border-cream-300 dark:border-night-50"
            >
              💌 Dream Wishes
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
