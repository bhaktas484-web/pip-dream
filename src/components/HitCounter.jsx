import React, { useState, useEffect } from 'react';

export function HitCounter() {
  const [count, setCount] = useState(1482);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('pip_dreams_delivered_odometer');
      let currentVal = stored ? parseInt(stored, 10) : 1482;
      // Increment once per visit/session
      if (!sessionStorage.getItem('pip_counted_session')) {
        currentVal += 1;
        sessionStorage.setItem('pip_counted_session', 'true');
        localStorage.setItem('pip_dreams_delivered_odometer', currentVal.toString());
      }
      setCount(currentVal);
    } catch {
      setCount(1483);
    }
    setHasLoaded(true);
  }, []);

  const formattedDigits = count.toString().padStart(6, '0').split('');

  return (
    <div 
      className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-stone-950 border-2 border-stone-700/80 rounded-md shadow-inner select-none"
      title="Vintage Odometer: Total Dreams Delivered to Sleepy Creatures"
    >
      <span className="text-[10px] uppercase tracking-wider font-bold text-amberStar-light font-mono hidden sm:inline">
        Dreams Delivered:
      </span>
      <div className="flex items-center gap-0.5">
        {formattedDigits.map((digit, idx) => (
          <span
            key={idx}
            className="w-4 h-5 sm:w-4.5 sm:h-5.5 flex items-center justify-center bg-stone-900 border border-stone-700 text-amberStar font-mono text-xs font-bold rounded-sm shadow-inner transition-transform"
          >
            {hasLoaded ? digit : '•'}
          </span>
        ))}
      </div>
    </div>
  );
}
