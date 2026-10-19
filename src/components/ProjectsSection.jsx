import React, { useState } from 'react';
import { Play, Square, Sparkles, Sliders, MapPin, CheckCircle, Flame, Music, RefreshCw } from 'lucide-react';
import { soundEngine } from '../utils/audio';

const PENTATONIC_KEYS = [
  { note: 0, label: 'Do (C5)', emoji: '⭐' },
  { note: 1, label: 'Re (D5)', emoji: '🌙' },
  { note: 2, label: 'Mi (E5)', emoji: '💤' },
  { note: 3, label: 'Sol (G5)', emoji: '✨' },
  { note: 4, label: 'La (A5)', emoji: '🍼' },
  { note: 5, label: 'Do (C6)', emoji: '☁️' },
];

const DELIVERY_STOPS = [
  { id: 'stop-1', name: 'Barnaby the Owl', location: 'Old Oak Branch', status: 'Restless', delivered: false, x: 15, y: 35 },
  { id: 'stop-2', name: 'Bear Cub Bruno', location: 'Berry Bush Den', status: 'Afraid of dark', delivered: false, x: 42, y: 65 },
  { id: 'stop-3', name: 'Mittens the Kitten', location: 'Chimney Roof #4', status: 'Counting mice', delivered: false, x: 70, y: 30 },
  { id: 'stop-4', name: 'Little Sprout Mice', location: 'Nursery Window', status: 'Almost asleep', delivered: false, x: 90, y: 75 },
];

export function ProjectsSection() {
  // Project 1 State: Lullaby Lab
  const [isPlayingLullaby, setIsPlayingLullaby] = useState(false);
  const [activeStep, setActiveStep] = useState(null);

  // Project 2 State: Dream Nightlight Lanterns
  const [lanternBrightness, setLanternBrightness] = useState(75);
  const [lanternColor, setLanternColor] = useState('amber'); // amber, lavender, mint

  // Project 3 State: Rooftop Routes
  const [stops, setStops] = useState(DELIVERY_STOPS);
  const [selectedStop, setSelectedStop] = useState(null);

  // Project 4 State: Rattle & Toy Blocks
  const [blockJiggle, setBlockJiggle] = useState({});

  // Trigger Lullaby
  const toggleLullaby = () => {
    soundEngine.playClick();
    if (isPlayingLullaby) {
      soundEngine.stopLullaby();
      setIsPlayingLullaby(false);
      setActiveStep(null);
    } else {
      setIsPlayingLullaby(true);
      soundEngine.startLullaby(
        (noteIndex, step) => {
          setActiveStep(step);
        },
        () => {
          setIsPlayingLullaby(false);
          setActiveStep(null);
        }
      );
    }
  };

  const deliverDream = (id) => {
    soundEngine.playChime(3);
    setStops((prev) =>
      prev.map((s) => (s.id === id ? { ...s, delivered: true, status: 'Sweetly Dreaming ✨' } : s))
    );
    setSelectedStop(id);
  };

  const jiggleBlock = (index) => {
    soundEngine.playClick();
    setBlockJiggle((prev) => ({ ...prev, [index]: true }));
    setTimeout(() => {
      setBlockJiggle((prev) => ({ ...prev, [index]: false }));
    }, 400);
  };

  return (
    <section id="projects" className="py-14 border-t border-cream-300/80 dark:border-night-50 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-berry/10 dark:bg-amberStar/15 text-berry dark:text-amberStar mb-3">
            <Sparkles size={13} /> What Pip Does · Official Showcase
          </div>
          <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-bark dark:text-cream-50">
            Nursery Inventions & Works
          </h2>
          <p className="text-sm sm:text-base text-bark-light dark:text-stone-300 mt-3">
            Four interactive dream-engineering projects crafted with bedtime love, golden chimes, and stardust.
          </p>
        </div>

        {/* 2x2 Grid of Rich Interactive Projects */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* ======================================================== */}
          {/* PROJECT 1: THE LULLABY LAB (Generative Music Box)       */}
          {/* ======================================================== */}
          <div className="rounded-2xl bg-white dark:bg-night-card border-2 border-cream-300 dark:border-night-50 p-6 sm:p-7 shadow-retro dark:shadow-retro-dark flex flex-col justify-between">
            <div>
              {/* Window Title Bar */}
              <div className="flex items-center justify-between border-b border-cream-300 dark:border-night-50 pb-3 mb-5">
                <div className="flex items-center gap-1.5">
                  <span className="window-dot bg-red-400" />
                  <span className="window-dot bg-yellow-400" />
                  <span className="window-dot bg-green-400" />
                  <span className="text-xs font-mono font-bold text-stone-500 ml-2">Project 01 // Lullaby_Box.synth</span>
                </div>
                <span className="text-xs uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-amberStar/20 text-stone-900 dark:text-amberStar font-mono">
                  Web Audio API
                </span>
              </div>

              {/* Graphic & Info */}
              <div className="flex flex-col sm:flex-row items-center gap-5 mb-5">
                <div className="w-28 sm:w-32 h-28 sm:h-32 flex-shrink-0 relative group">
                  <img
                    src="assets/pip_lullaby_box.png"
                    alt="Pip's Lullaby Music Box"
                    className="w-full h-full object-contain filter drop-shadow-md group-hover:scale-105 transition"
                  />
                  {isPlayingLullaby && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-10 h-10 rounded-full border-4 border-amberStar border-t-transparent animate-spin" />
                    </div>
                  )}
                </div>

                <div className="space-y-1.5 text-center sm:text-left">
                  <h3 className="font-editorial text-2xl font-bold text-berry dark:text-amberStar">
                    The Lullaby Lab
                  </h3>
                  <p className="text-xs sm:text-sm text-bark-light dark:text-stone-300 leading-relaxed">
                    A soothing pentatonic music box calibrated to decelerate racing thoughts. Tap any chime block or wind up the automatic bedtime melody!
                  </p>
                </div>
              </div>

              {/* Interactive Pentatonic Keyboard */}
              <div className="space-y-2 mb-5">
                <div className="text-[11px] font-bold uppercase tracking-wider text-stone-400">
                  Tap to compose dream chimes:
                </div>
                <div className="grid grid-cols-6 gap-1.5 sm:gap-2">
                  {PENTATONIC_KEYS.map((k) => (
                    <button
                      key={k.note}
                      onClick={() => soundEngine.playChime(k.note)}
                      className="p-2 sm:p-2.5 rounded-xl bg-cream-100 dark:bg-night border border-cream-300 dark:border-stone-700 hover:border-berry dark:hover:border-amberStar hover:bg-berry/10 dark:hover:bg-amberStar/20 transition active:scale-95 text-center shadow-sm"
                      title={`Play note ${k.label}`}
                    >
                      <span className="text-base sm:text-lg block">{k.emoji}</span>
                      <span className="text-[10px] font-mono font-bold block text-bark dark:text-cream-200 mt-1">
                        {k.label.split(' ')[0]}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Music Visualizer Bars */}
              <div className="flex items-center justify-center gap-1.5 h-6 py-1">
                {[12, 24, 16, 28, 20, 14, 26, 18, 22].map((height, i) => (
                  <div
                    key={i}
                    style={{
                      height: isPlayingLullaby ? `${((activeStep + i) % 6) * 4 + 6}px` : '4px',
                      transition: 'height 0.15s ease',
                    }}
                    className={`w-2 rounded-full ${
                      isPlayingLullaby ? 'bg-amberStar' : 'bg-stone-300 dark:bg-stone-700'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Action Bar */}
            <div className="pt-4 border-t border-cream-300 dark:border-night-50 flex items-center justify-between">
              <span className="text-xs text-stone-500 font-mono">
                {isPlayingLullaby ? 'Status: Playing Brahms Loop...' : 'Status: Ready to play'}
              </span>

              <button
                onClick={toggleLullaby}
                className="px-4 py-2 rounded-xl bg-berry text-white font-bold text-xs sm:text-sm shadow-retro-berry hover:bg-berry-hover transition active:translate-x-0.5 active:translate-y-0.5 flex items-center gap-2"
              >
                {isPlayingLullaby ? <Square size={14} /> : <Play size={14} />}
                {isPlayingLullaby ? 'Stop Music Box' : 'Wind Up & Play'}
              </button>
            </div>
          </div>


          {/* ======================================================== */}
          {/* PROJECT 2: NIGHTLIGHT COLLECTION (Interactive Dimmer)   */}
          {/* ======================================================== */}
          <div className="rounded-2xl bg-white dark:bg-night-card border-2 border-cream-300 dark:border-night-50 p-6 sm:p-7 shadow-retro dark:shadow-retro-dark flex flex-col justify-between">
            <div>
              {/* Window Title Bar */}
              <div className="flex items-center justify-between border-b border-cream-300 dark:border-night-50 pb-3 mb-5">
                <div className="flex items-center gap-1.5">
                  <span className="window-dot bg-red-400" />
                  <span className="window-dot bg-yellow-400" />
                  <span className="window-dot bg-green-400" />
                  <span className="text-xs font-mono font-bold text-stone-500 ml-2">Project 02 // Nightlight_Lantern.fx</span>
                </div>
                <span className="text-xs uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-berry/15 text-berry dark:text-amberStar font-mono">
                  Interactive Dimmer
                </span>
              </div>

              {/* Graphic & Info with Interactive Dynamic Glow */}
              <div className="flex flex-col sm:flex-row items-center gap-5 mb-5">
                <div 
                  className="w-28 sm:w-32 h-28 sm:h-32 flex-shrink-0 relative flex items-center justify-center rounded-2xl transition-all duration-300"
                  style={{
                    backgroundColor: lanternColor === 'amber' ? 'rgba(247, 201, 72, 0.15)' : lanternColor === 'lavender' ? 'rgba(179, 157, 219, 0.15)' : 'rgba(128, 203, 196, 0.15)',
                    boxShadow: `0 0 ${lanternBrightness / 2}px ${
                      lanternColor === 'amber' ? 'rgba(247, 201, 72, 0.5)' : lanternColor === 'lavender' ? 'rgba(179, 157, 219, 0.5)' : 'rgba(128, 203, 196, 0.5)'
                    }`,
                  }}
                >
                  <img
                    src="assets/pip_dream_lantern.png"
                    alt="Pip's Dream Nightlight Lantern"
                    className="w-full h-full object-contain filter drop-shadow-md transition-transform duration-300 hover:scale-105"
                  />
                </div>

                <div className="space-y-1.5 text-center sm:text-left">
                  <h3 className="font-editorial text-2xl font-bold text-berry dark:text-amberStar">
                    Dream Lantern Collection
                  </h3>
                  <p className="text-xs sm:text-sm text-bark-light dark:text-stone-300 leading-relaxed">
                    Hand-carved crescent porcelain lanterns with brass filigree handles. Pip uses these to illuminate shadows and project cozy celestial constellations.
                  </p>
                </div>
              </div>

              {/* Lantern Glow Controls */}
              <div className="space-y-4 mb-5">
                <div>
                  <div className="flex justify-between items-center text-xs font-bold text-stone-500 dark:text-stone-400 mb-1.5">
                    <span>Lantern Dimmer Dial:</span>
                    <span className="font-mono text-berry dark:text-amberStar">{lanternBrightness}% Lumens</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={lanternBrightness}
                    onChange={(e) => {
                      soundEngine.playClick();
                      setLanternBrightness(parseInt(e.target.value, 10));
                    }}
                    className="w-full accent-berry dark:accent-amberStar cursor-pointer"
                  />
                </div>

                {/* Sleep Mode Tint Swatches */}
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-stone-400 mb-1.5">
                    Select Filter Tint:
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => { soundEngine.playClick(); setLanternColor('amber'); }}
                      className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-bold border transition ${
                        lanternColor === 'amber'
                          ? 'bg-amber-100 border-amber-400 text-amber-900 shadow-sm'
                          : 'bg-stone-100 dark:bg-night border-stone-300 dark:border-stone-700 text-stone-500'
                      }`}
                    >
                      🌙 Amber Hearth
                    </button>
                    <button
                      onClick={() => { soundEngine.playClick(); setLanternColor('lavender'); }}
                      className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-bold border transition ${
                        lanternColor === 'lavender'
                          ? 'bg-purple-100 border-purple-400 text-purple-900 shadow-sm'
                          : 'bg-stone-100 dark:bg-night border-stone-300 dark:border-stone-700 text-stone-500'
                      }`}
                    >
                      💜 Lavender Mist
                    </button>
                    <button
                      onClick={() => { soundEngine.playClick(); setLanternColor('mint'); }}
                      className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-bold border transition ${
                        lanternColor === 'mint'
                          ? 'bg-emerald-100 border-emerald-400 text-emerald-900 shadow-sm'
                          : 'bg-stone-100 dark:bg-night border-stone-300 dark:border-stone-700 text-stone-500'
                      }`}
                    >
                      🌱 Starry Mint
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Bar */}
            <div className="pt-4 border-t border-cream-300 dark:border-night-50 flex items-center justify-between">
              <span className="text-xs text-stone-500 font-mono">Constellation: Pleiades</span>
              <button
                onClick={() => {
                  soundEngine.playChime(4);
                  setLanternBrightness(lanternBrightness === 100 ? 30 : 100);
                }}
                className="px-3 py-1.5 rounded-lg border border-stone-300 dark:border-stone-700 text-xs font-bold hover:bg-cream-200 dark:hover:bg-night-50 transition"
              >
                Toggle Quick Flashlight
              </button>
            </div>
          </div>


          {/* ======================================================== */}
          {/* PROJECT 3: ROOFTOP DREAM DELIVERY ROUTES (Interactive)  */}
          {/* ======================================================== */}
          <div className="rounded-2xl bg-white dark:bg-night-card border-2 border-cream-300 dark:border-night-50 p-6 sm:p-7 shadow-retro dark:shadow-retro-dark flex flex-col justify-between">
            <div>
              {/* Window Title Bar */}
              <div className="flex items-center justify-between border-b border-cream-300 dark:border-night-50 pb-3 mb-5">
                <div className="flex items-center gap-1.5">
                  <span className="window-dot bg-red-400" />
                  <span className="window-dot bg-yellow-400" />
                  <span className="window-dot bg-green-400" />
                  <span className="text-xs font-mono font-bold text-stone-500 ml-2">Project 03 // Sky_Route_Map.svg</span>
                </div>
                <span className="text-xs uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-mono">
                  Interactive Map
                </span>
              </div>

              <div className="space-y-1.5 mb-4">
                <h3 className="font-editorial text-2xl font-bold text-berry dark:text-amberStar">
                  Rooftop Flight Routes
                </h3>
                <p className="text-xs sm:text-sm text-bark-light dark:text-stone-300 leading-relaxed">
                  Pip flies across village rooftops on a cloud to drop sleep packets into open chimneys. Click each creature to dispatch their nightly dream!
                </p>
              </div>

              {/* Interactive Sky Route Display */}
              <div className="space-y-2 mb-4">
                {stops.map((stop) => (
                  <div
                    key={stop.id}
                    onClick={() => deliverDream(stop.id)}
                    className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                      stop.delivered
                        ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200'
                        : 'bg-cream-100 dark:bg-night border-cream-300 dark:border-stone-800 hover:border-berry'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="text-xl">
                        {stop.delivered ? '💤' : '🦉'}
                      </div>
                      <div>
                        <div className="text-xs sm:text-sm font-bold flex items-center gap-1.5">
                          <span>{stop.name}</span>
                          <span className="text-[10px] text-stone-400 font-mono font-normal">({stop.location})</span>
                        </div>
                        <div className="text-[11px] text-stone-500 dark:text-stone-400">
                          {stop.status}
                        </div>
                      </div>
                    </div>

                    <button
                      className={`px-2.5 py-1 rounded-md text-xs font-bold transition ${
                        stop.delivered
                          ? 'bg-emerald-600 text-white'
                          : 'bg-berry text-white hover:bg-berry-hover'
                      }`}
                    >
                      {stop.delivered ? 'Delivered ✓' : 'Send Dream ✨'}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Delivery Progress Bar */}
            <div className="pt-4 border-t border-cream-300 dark:border-night-50 flex items-center justify-between">
              <span className="text-xs text-stone-500 font-mono">
                Progress: {stops.filter((s) => s.delivered).length} / {stops.length} tucked in
              </span>
              <button
                onClick={() => {
                  soundEngine.playClick();
                  setStops(DELIVERY_STOPS);
                }}
                className="text-xs text-berry dark:text-amberStar hover:underline flex items-center gap-1 font-bold"
              >
                <RefreshCw size={12} /> Reset Route
              </button>
            </div>
          </div>


          {/* ======================================================== */}
          {/* PROJECT 4: RATTLE & BABY BLOCK ATELIER                  */}
          {/* ======================================================== */}
          <div className="rounded-2xl bg-white dark:bg-night-card border-2 border-cream-300 dark:border-night-50 p-6 sm:p-7 shadow-retro dark:shadow-retro-dark flex flex-col justify-between">
            <div>
              {/* Window Title Bar */}
              <div className="flex items-center justify-between border-b border-cream-300 dark:border-night-50 pb-3 mb-5">
                <div className="flex items-center gap-1.5">
                  <span className="window-dot bg-red-400" />
                  <span className="window-dot bg-yellow-400" />
                  <span className="window-dot bg-green-400" />
                  <span className="text-xs font-mono font-bold text-stone-500 ml-2">Project 04 // Wooden_Toys.toy</span>
                </div>
                <span className="text-xs uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-blue-100 text-blue-900 dark:bg-blue-950 dark:text-blue-300 font-mono">
                  Playable Toybox
                </span>
              </div>

              <div className="space-y-1.5 mb-5">
                <h3 className="font-editorial text-2xl font-bold text-berry dark:text-amberStar">
                  Rattle & Block Atelier
                </h3>
                <p className="text-xs sm:text-sm text-bark-light dark:text-stone-300 leading-relaxed">
                  Pip tests lullaby physics using sensory wooden stacking blocks and star rattles. Tap the blocks to hear their wooden clack and watch them tumble!
                </p>
              </div>

              {/* Interactive Stacking Blocks */}
              <div className="py-4 flex justify-center items-end gap-3 select-none">
                {['P', 'I', 'P', '★'].map((char, index) => (
                  <button
                    key={index}
                    onClick={() => jiggleBlock(index)}
                    style={{
                      transform: blockJiggle[index] ? 'translateY(-14px) rotate(8deg)' : 'translateY(0) rotate(0deg)',
                      transition: 'transform 0.3s cubic-bezier(0.18, 0.89, 0.32, 1.28)',
                    }}
                    className={`w-14 sm:w-16 h-14 sm:h-16 rounded-xl border-3 flex flex-col items-center justify-center font-editorial font-bold text-2xl shadow-retro hover:scale-105 active:scale-95 ${
                      index === 0
                        ? 'bg-rose-100 border-berry text-berry'
                        : index === 1
                        ? 'bg-amber-100 border-amberStar text-amber-900'
                        : index === 2
                        ? 'bg-emerald-100 border-emerald-600 text-emerald-900'
                        : 'bg-purple-100 border-purple-500 text-purple-900'
                    }`}
                  >
                    <span>{char}</span>
                    <span className="text-[8px] font-mono -mt-1 text-stone-500">Block #{index + 1}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Toybox Footer */}
            <div className="pt-4 border-t border-cream-300 dark:border-night-50 flex items-center justify-between text-xs text-stone-500">
              <span className="font-mono">Physics: Gentle Nursery Bounce</span>
              <button
                onClick={() => {
                  soundEngine.playChime(1);
                  soundEngine.playClick();
                }}
                className="px-3 py-1.5 rounded-lg border border-stone-300 dark:border-stone-700 text-xs font-bold hover:bg-cream-200 dark:hover:bg-night-50 transition"
              >
                Shake Star Rattle 🔔
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
