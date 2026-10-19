import React, { useState, useEffect } from 'react';
import { MessageSquareHeart, Send, Sparkles, Heart } from 'lucide-react';
import { soundEngine } from '../utils/audio';

const INITIAL_WISHES = [
  {
    id: 1,
    name: 'Barnaby the Owl',
    time: '2 hours ago',
    sticker: '🦉',
    wish: 'Pip, the star chime you played last midnight cured my insomnia! The oak tree branches haven’t felt this peaceful in decades.',
  },
  {
    id: 2,
    name: 'Luna the Clockwork Moth',
    time: 'Yesterday',
    sticker: '⭐',
    wish: 'Tuning into your lullaby frequency from Sector 9. Sending extra warm stardust for your nightcap!',
  },
  {
    id: 3,
    name: 'Little Mole',
    time: '3 days ago',
    sticker: '🌙',
    wish: 'The warm chamomile lantern dream reached our underground burrow right on time. Thank you, Little Engineer!',
  },
];

const STICKER_OPTIONS = ['⭐', '🌙', '💤', '🍼', '🧸', '✨'];

export function GuestbookSection() {
  const [wishes, setWishes] = useState([]);
  const [name, setName] = useState('');
  const [wishText, setWishText] = useState('');
  const [selectedSticker, setSelectedSticker] = useState('⭐');
  const [submittedMessage, setSubmittedMessage] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('pip_guestbook_wishes');
      if (saved) {
        setWishes(JSON.parse(saved));
      } else {
        setWishes(INITIAL_WISHES);
      }
    } catch {
      setWishes(INITIAL_WISHES);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !wishText.trim()) return;

    soundEngine.playChime(4);
    soundEngine.playClick();

    const newWish = {
      id: Date.now(),
      name: name.trim(),
      time: 'Just now',
      sticker: selectedSticker,
      wish: wishText.trim(),
    };

    const updated = [newWish, ...wishes];
    setWishes(updated);
    try {
      localStorage.setItem('pip_guestbook_wishes', JSON.stringify(updated));
    } catch (err) {
      console.warn('Could not save to localStorage', err);
    }

    setName('');
    setWishText('');
    setSubmittedMessage(true);
    setTimeout(() => setSubmittedMessage(false), 4000);
  };

  return (
    <section id="guestbook" className="py-14 border-t border-cream-300/80 dark:border-night-50 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-berry/10 dark:bg-amberStar/15 text-berry dark:text-amberStar mb-3">
            <MessageSquareHeart size={13} /> Side Quest (+2 pts) · Live Guestbook Wall
          </div>
          <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-bark dark:text-cream-50">
            Leave a Dream Wish for Pip
          </h2>
          <p className="text-sm sm:text-base text-bark-light dark:text-stone-300 mt-2">
            Sign Pip's corkboard wall. Your message is pinned with love and saved for future midnight visits.
          </p>
        </div>

        {/* Input Form Box */}
        <div className="rounded-3xl bg-white dark:bg-night-card border-3 border-cream-300 dark:border-night-50 p-6 sm:p-8 shadow-retro dark:shadow-retro-dark mb-10">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-400 mb-1">
                  Your Creature Name:
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sleepy Hedgehog, Star Watcher"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-cream-300 dark:border-stone-700 bg-cream-50 dark:bg-night text-bark dark:text-cream-100 text-sm focus:outline-none focus:border-berry dark:focus:border-amberStar"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-400 mb-1">
                  Pick a Bedtime Sticker:
                </label>
                <div className="flex gap-2">
                  {STICKER_OPTIONS.map((stk) => (
                    <button
                      key={stk}
                      type="button"
                      onClick={() => {
                        soundEngine.playClick();
                        setSelectedSticker(stk);
                      }}
                      className={`flex-1 py-1.5 text-lg rounded-xl border transition ${
                        selectedSticker === stk
                          ? 'bg-amberStar/20 border-amberStar scale-110 shadow-sm'
                          : 'bg-cream-50 dark:bg-night border-cream-300 dark:border-stone-700 hover:border-berry'
                      }`}
                    >
                      {stk}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-400 mb-1">
                Your Midnight Dream Wish:
              </label>
              <textarea
                required
                rows={3}
                placeholder="Write a sweet message, bedtime wish, or lullaby request for Pip..."
                value={wishText}
                onChange={(e) => setWishText(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-cream-300 dark:border-stone-700 bg-cream-50 dark:bg-night text-bark dark:text-cream-100 text-sm focus:outline-none focus:border-berry dark:focus:border-amberStar"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-stone-400 font-mono">
                {submittedMessage ? '✨ Wish pinned to Pip’s corkboard!' : 'Saves in visitor browser history'}
              </span>

              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-berry text-white font-bold text-sm shadow-retro-berry hover:bg-berry-hover transition active:scale-95 flex items-center gap-2"
              >
                <Send size={15} /> Pin Dream Wish
              </button>
            </div>
          </form>
        </div>

        {/* Wishes Corkboard Feed */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {wishes.map((item) => (
            <div
              key={item.id}
              className="p-5 rounded-2xl bg-cream-50 dark:bg-night border-2 border-dashed border-cream-300 dark:border-stone-700/80 shadow-sm relative group hover:border-berry dark:hover:border-amberStar transition"
            >
              {/* Pushpin at top */}
              <div className="absolute -top-3 left-6 text-base">📌</div>

              <div className="flex items-center justify-between mb-2.5 pt-1">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{item.sticker}</span>
                  <div>
                    <h4 className="font-editorial font-bold text-sm text-bark dark:text-cream-100">
                      {item.name}
                    </h4>
                    <span className="text-[10px] text-stone-400 font-mono">{item.time}</span>
                  </div>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-bark-light dark:text-stone-300 leading-relaxed font-serif italic">
                “{item.wish}”
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
