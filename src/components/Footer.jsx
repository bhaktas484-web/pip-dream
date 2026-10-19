import React from 'react';
import { Heart, Sparkles, ExternalLink, Moon } from 'lucide-react';
import { soundEngine } from '../utils/audio';

export function Footer() {
  return (
    <footer className="border-t-2 border-cream-300 dark:border-night-50 bg-cream-50 dark:bg-night-card pt-12 pb-14 text-bark dark:text-stone-300 transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Top Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10 pb-8 border-b border-cream-300/80 dark:border-night-50/80">
          
          {/* Col 1: Identity */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-xl">🌙</span>
              <h3 className="font-editorial text-xl font-bold text-berry dark:text-amberStar">
                Pip's Midnight Nursery
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-bark-light dark:text-stone-400 leading-relaxed">
              Junior Dream Engineer portfolio built for <strong>haX.baby: Baby's First Website</strong> (October 17–19, 2026). Celebrating the whimsical soul of the early web.
            </p>
          </div>

          {/* Col 2: Official Attributions */}
          <div className="space-y-2">
            <h4 className="text-xs uppercase font-bold tracking-wider text-stone-400 font-mono">
              Canon & Credits
            </h4>
            <ul className="text-xs space-y-1.5 text-bark-light dark:text-stone-400">
              <li>• Character: <strong>Pip The Skull Baby</strong> (Track 1)</li>
              <li>• Assets: <strong>Official haX.baby Studio Renders</strong></li>
              <li>• Audio Engine: <strong>Native Web Audio API Synthesis</strong></li>
              <li>• Font Pairing: <strong>Fraunces & Fredoka</strong></li>
            </ul>
          </div>

          {/* Col 3: Hackathon Links */}
          <div className="space-y-2">
            <h4 className="text-xs uppercase font-bold tracking-wider text-stone-400 font-mono">
              Event Hub
            </h4>
            <div className="flex flex-col gap-1.5 text-xs">
              <a
                href="https://hax.baby/first-website"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundEngine.playClick()}
                className="hover:text-berry dark:hover:text-amberStar flex items-center gap-1 transition"
              >
                Baby's First Website Hackathon <ExternalLink size={12} />
              </a>
              <a
                href="https://hax.baby/baby-problem"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundEngine.playClick()}
                className="hover:text-berry dark:hover:text-amberStar flex items-center gap-1 transition"
              >
                Official Problem Statement <ExternalLink size={12} />
              </a>
              <a
                href="https://unstop.com/p/babys-first-website-hackathon-hax-baby-1758510"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundEngine.playClick()}
                className="hover:text-berry dark:hover:text-amberStar flex items-center gap-1 transition"
              >
                Listing on Unstop <ExternalLink size={12} />
              </a>
            </div>
          </div>
        </div>

        {/* Vintage 88x31 Nostalgic Web Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-8 select-none">
          <div className="px-2 py-1 bg-stone-900 border border-stone-700 text-amberStar font-mono text-[10px] font-bold rounded shadow-inner">
            ★ HAX.BABY 2026 ★
          </div>
          <div className="px-2 py-1 bg-berry text-white font-mono text-[10px] font-bold rounded shadow-inner border border-berry-light">
            🍼 NO COOKIES · ONLY MILK
          </div>
          <div className="px-2 py-1 bg-blue-900 text-blue-200 font-mono text-[10px] font-bold rounded shadow-inner border border-blue-700">
            🌐 NETSCAPE COMPATIBLE
          </div>
          <div className="px-2 py-1 bg-emerald-900 text-emerald-200 font-mono text-[10px] font-bold rounded shadow-inner border border-emerald-700">
            🌿 100% CLEAN CRAFT
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="text-center text-xs text-stone-500 space-y-1">
          <p>
            "Good things start small." · Crafted with wide-eyed curiosity for haX.baby.
          </p>
          <p className="text-[11px] text-stone-400 font-mono">
            Zero console errors · Accessible audio mute · Tested for tiny hands on mobile
          </p>
        </div>

      </div>
    </footer>
  );
}
