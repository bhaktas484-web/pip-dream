import React, { useState, useEffect } from 'react';
import { Sparkles, Trophy, RotateCcw, X } from 'lucide-react';
import { soundEngine } from '../utils/audio';

const DREAMS = ['⭐', '✨', '🌙', '💤', '🍼', '🪐', '🧸'];

export function DreamCatcherGame({ isOpen, onClose }) {
  const [score, setScore] = useState(0);
  const [items, setItems] = useState([]);
  const [gameActive, setGameActive] = useState(true);

  // Spawn falling stardust every 800ms
  useEffect(() => {
    if (!isOpen || !gameActive) return;

    const interval = setInterval(() => {
      const id = `${Date.now()}-${Math.random()}`;
      const symbol = DREAMS[Math.floor(Math.random() * DREAMS.length)];
      const left = Math.floor(Math.random() * 80) + 10; // 10% to 90%
      const speed = Math.floor(Math.random() * 3) + 4; // 4 to 6s

      const newItem = { id, symbol, left, speed };
      setItems((prev) => [...prev.slice(-12), newItem]);

      // Remove after falling
      setTimeout(() => {
        setItems((prev) => prev.filter((i) => i.id !== id));
      }, speed * 1000);
    }, 900);

    return () => clearInterval(interval);
  }, [isOpen, gameActive]);

  const catchItem = (id, noteIndex) => {
    soundEngine.playChime(noteIndex % 6);
    setScore((s) => s + 1);
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const resetGame = () => {
    soundEngine.playClick();
    setScore(0);
    setItems([]);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white dark:bg-night-card border-3 border-cream-300 dark:border-night-50 rounded-3xl max-w-md w-full p-6 shadow-retro relative flex flex-col h-[520px] overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-cream-300 dark:border-stone-800 pb-3 mb-2 z-20">
          <div className="flex items-center gap-2">
            <span className="text-xl">✨</span>
            <div>
              <h3 className="font-editorial text-lg font-bold text-bark dark:text-cream-50">
                Catch Falling Dreams
              </h3>
              <p className="text-[11px] text-stone-500">Tap falling stardust into Pip's velvet jar!</p>
            </div>
          </div>

          <button
            onClick={() => {
              soundEngine.playClick();
              onClose();
            }}
            className="p-1.5 rounded-full border border-stone-300 dark:border-stone-700 text-stone-500 hover:bg-cream-100"
          >
            <X size={16} />
          </button>
        </div>

        {/* Score Ticker */}
        <div className="flex items-center justify-between px-3 py-1.5 bg-cream-100 dark:bg-night rounded-xl border border-cream-300 dark:border-stone-800 text-xs font-mono font-bold z-20">
          <span className="text-berry dark:text-amberStar flex items-center gap-1.5">
            <Trophy size={14} /> Stardust Caught: {score}
          </span>
          <button
            onClick={resetGame}
            className="text-[11px] text-stone-400 hover:text-berry flex items-center gap-1"
          >
            <RotateCcw size={12} /> Reset
          </button>
        </div>

        {/* Falling Catch Area */}
        <div className="flex-1 relative overflow-hidden my-2 rounded-2xl bg-gradient-to-b from-sky-100/30 dark:from-night-deep to-cream-100/50 dark:to-night border border-dashed border-cream-300 dark:border-stone-800">
          {items.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => catchItem(item.id, idx)}
              style={{
                left: `${item.left}%`,
                animation: `fallDown ${item.speed}s linear forwards`,
              }}
              className="absolute text-2xl sm:text-3xl select-none hover:scale-125 transition-transform active:scale-90 cursor-pointer drop-shadow-md"
              title="Catch me!"
            >
              {item.symbol}
            </button>
          ))}

          {/* Stardust Jar at Bottom */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-amberStar/20 border-2 border-amberStar text-bark dark:text-amberStar rounded-full text-xs font-bold font-mono shadow-sm pointer-events-none flex items-center gap-1">
            🏺 Pip’s Dream Jar ({score})
          </div>
        </div>

        {/* Status Callout */}
        <div className="text-center text-xs text-stone-500 font-mono z-20">
          {score >= 10 ? '🌟 Level: Grandmaster Dream Gatherer!' : 'Tap each falling star before it drifts away.'}
        </div>

      </div>
    </div>
  );
}
