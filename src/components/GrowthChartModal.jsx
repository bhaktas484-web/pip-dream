import React from 'react';
import { X, Award, CheckCircle, Ruler } from 'lucide-react';
import { soundEngine } from '../utils/audio';

const SKILLS = [
  { name: 'Lullaby Synthesis', level: 98, note: 'Pentatonic Brahms Master' },
  { name: 'Starlight Polishing', level: 94, note: 'Warm amber glow rating' },
  { name: 'Chimney Flight Navigation', level: 91, note: 'Zero soot on nightcap' },
  { name: 'Power Napping', level: 100, note: 'World Champion Sleeper' },
  { name: 'Bedtime Storytelling', level: 96, note: 'Guaranteed yawn within 3 mins' },
];

export function GrowthChartModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white dark:bg-night-card border-3 border-cream-300 dark:border-night-50 rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-retro relative max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={() => {
            soundEngine.playClick();
            onClose();
          }}
          className="absolute top-4 right-4 p-2 rounded-full border border-stone-300 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-night text-stone-500 transition"
          aria-label="Close growth chart modal"
        >
          <X size={18} />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-amberStar/20 border border-amberStar flex items-center justify-center text-amberStar text-xl">
            <Ruler size={22} className="text-berry dark:text-amberStar" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-stone-400">
              Midnight Nursery Wall #7
            </span>
            <h3 className="font-editorial text-2xl font-bold text-bark dark:text-cream-50">
              Pip's Growth Chart
            </h3>
          </div>
        </div>

        {/* Height Measurement Callout */}
        <div className="p-4 rounded-2xl bg-cream-100 dark:bg-night border border-cream-300 dark:border-stone-800 mb-6 flex items-center justify-between">
          <div>
            <div className="text-xs uppercase font-bold text-stone-400">Current Nursery Height</div>
            <div className="font-editorial text-2xl font-bold text-berry dark:text-amberStar">
              18 Stardust Inches
            </div>
            <div className="text-[11px] text-stone-500">Sprouted +2 inches since haX Kickoff!</div>
          </div>
          <div className="w-16 h-16 rounded-xl overflow-hidden border border-cream-300 dark:border-stone-700 bg-white dark:bg-night-card flex items-center justify-center">
            <img
              src="assets/pip_portrait.png"
              alt="Pip Portrait"
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Skills List with Progress Bars */}
        <div className="space-y-4 mb-6">
          <div className="text-xs uppercase font-bold tracking-wider text-stone-400">
            Certified Dream Competencies:
          </div>

          {SKILLS.map((skill, i) => (
            <div key={i} className="space-y-1">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-bark dark:text-cream-100 flex items-center gap-1.5">
                  <CheckCircle size={13} className="text-emerald-500" />
                  {skill.name}
                </span>
                <span className="font-mono text-berry dark:text-amberStar">{skill.level}%</span>
              </div>
              <div className="w-full h-2.5 bg-stone-200 dark:bg-stone-800 rounded-full overflow-hidden">
                <div
                  style={{ width: `${skill.level}%` }}
                  className="h-full bg-gradient-to-r from-berry to-amberStar rounded-full transition-all duration-700"
                />
              </div>
              <div className="text-[10px] text-stone-400 font-mono text-right">{skill.note}</div>
            </div>
          ))}
        </div>

        {/* Seal of Authenticity */}
        <div className="pt-4 border-t border-cream-300 dark:border-stone-800 flex items-center justify-between text-xs text-stone-500">
          <span className="font-mono">Certified by: haX.baby Platform</span>
          <button
            onClick={() => {
              soundEngine.playChime(5);
              onClose();
            }}
            className="px-4 py-2 rounded-xl bg-berry text-white font-bold text-xs shadow-retro-berry hover:bg-berry-hover transition"
          >
            Mark Wall & Close ✓
          </button>
        </div>

      </div>
    </div>
  );
}
