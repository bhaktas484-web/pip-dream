import React from 'react';

export function ChaosModeOverlay({ isChaos }) {
  if (!isChaos) return null;

  return (
    <div className="relative z-30 select-none" aria-hidden="true">
      {/* 90s Early-Web Marquee Bar */}
      <div className="bg-amberStar text-stone-950 font-mono text-xs font-bold py-1.5 px-4 overflow-hidden border-b-2 border-stone-900 shadow-sm flex items-center">
        <div className="whitespace-nowrap animate-marquee flex items-center gap-6">
          <span>★ WELCOME TO PIP'S DREAM ENGINEERING HOMEPAGE ★</span>
          <span>🍼 BEST VIEWED ON ANY TINY SCREEN OR 800x600 CRT MONITOR ★</span>
          <span>✨ DON'T FORGET TO SIGN THE GUESTBOOK! ★</span>
          <span>🚧 UNDER SLUMBER CONSTRUCTION 🚧</span>
          <span>🌙 OFFICIAL HAX.BABY 48-HOUR HACKATHON ENTRY ★</span>
          <span>★ WELCOME TO PIP'S DREAM ENGINEERING HOMEPAGE ★</span>
          <span>🍼 BEST VIEWED ON ANY TINY SCREEN OR 800x600 CRT MONITOR ★</span>
        </div>
      </div>

      {/* Retro Floating Badges & Stamps across screen borders */}
      <div className="fixed bottom-4 left-4 z-40 hidden sm:flex flex-col gap-2 pointer-events-none">
        <div className="bg-white border-2 border-black p-1 text-[10px] font-mono font-bold shadow-retro rotate-[-3deg] text-stone-900 inline-block">
          💾 PIP_PORTFOLIO.EXE
        </div>
        <div className="bg-yellow-300 border-2 border-black p-1 text-[10px] font-mono font-bold shadow-retro rotate-[2deg] text-stone-900 inline-block">
          🍼 100% ORGANIC DREAMS
        </div>
      </div>

      <div className="fixed bottom-4 right-4 z-40 hidden sm:flex flex-col gap-2 pointer-events-none items-end">
        <div className="bg-pink-300 border-2 border-black p-1 text-[10px] font-mono font-bold shadow-retro rotate-[3deg] text-stone-900 inline-block">
          ⭐ CERTIFIED SNOOZER
        </div>
        <div className="bg-emerald-300 border-2 border-black p-1 text-[10px] font-mono font-bold shadow-retro rotate-[-2deg] text-stone-900 inline-block">
          🕹️ RETRO CHAOS: ACTIVE
        </div>
      </div>
    </div>
  );
}
