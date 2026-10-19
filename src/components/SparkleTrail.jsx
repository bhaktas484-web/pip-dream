import React, { useEffect, useState, useCallback } from 'react';

const SPARKLE_SYMBOLS = ['✨', '⭐', '🌙', '💤', '🍼', '✦', '⋆'];

export function SparkleTrail({ enabled = true }) {
  const [sparkles, setSparkles] = useState([]);

  const addSparkle = useCallback((x, y) => {
    if (!enabled) return;
    const id = `${Date.now()}-${Math.random()}`;
    const symbol = SPARKLE_SYMBOLS[Math.floor(Math.random() * SPARKLE_SYMBOLS.length)];
    const size = Math.floor(Math.random() * 12) + 12; // 12px to 24px
    const rotation = Math.floor(Math.random() * 60) - 30;

    const newSparkle = { id, x, y, symbol, size, rotation };

    setSparkles((prev) => [...prev.slice(-18), newSparkle]);

    setTimeout(() => {
      setSparkles((prev) => prev.filter((item) => item.id !== id));
    }, 750);
  }, [enabled]);

  useEffect(() => {
    if (!enabled) return;
    let lastTime = 0;

    const handlePointerMove = (e) => {
      const now = performance.now();
      if (now - lastTime < 40) return; // 25fps particle throttle
      lastTime = now;
      addSparkle(e.clientX, e.clientY);
    };

    const handleTouchStart = (e) => {
      if (e.touches && e.touches[0]) {
        addSparkle(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('touchstart', handleTouchStart);
    };
  }, [enabled, addSparkle]);

  if (!enabled) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden" aria-hidden="true">
      {sparkles.map((s) => (
        <span
          key={s.id}
          style={{
            left: `${s.x}px`,
            top: `${s.y}px`,
            fontSize: `${s.size}px`,
            transform: `translate(-50%, -50%) rotate(${s.rotation}deg)`,
            transition: 'opacity 0.75s ease-out, transform 0.75s cubic-bezier(0.2, 0.8, 0.2, 1)',
          }}
          className="absolute select-none animate-ping opacity-90 drop-shadow-[0_0_6px_rgba(247,201,72,0.8)]"
        >
          {s.symbol}
        </span>
      ))}
    </div>
  );
}
