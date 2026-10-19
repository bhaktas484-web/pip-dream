import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, BookOpen, Sparkles, Moon, Sun } from 'lucide-react';
import { soundEngine } from '../utils/audio';

const STORY_SCENES = [
  {
    number: '01',
    title: 'The Velvet Music Box',
    subtitle: 'Where Pip woke up',
    badge: 'Origin',
    wordCount: '84 words',
    illustration: '🧸',
    bgTint: 'from-amber-100/40 to-cream-100',
    content: `Before Pip wore the starry nightcap, they slumbered inside an antique rosewood music box tucked behind the nursery clock. When the clock struck midnight for the very first time, the brass gears hummed a soft pentatonic chord. Pip opened two warm amber eyes, blinked at the giant moon outside the window, and gave a sleepy, crooked grin. A tiny note pinned to their blanket read: "Handle with love. The world needs sweeter dreams."`,
  },
  {
    number: '02',
    title: 'Harvesting Stardust at Dusk',
    subtitle: 'Pip’s evening craft',
    badge: 'Craft',
    wordCount: '78 words',
    illustration: '✨',
    bgTint: 'from-purple-100/40 to-cream-100',
    content: `Every dusk, while the town downstairs brushes their teeth and closes their storybooks, Pip climbs the observatory ladder with a little velvet jar. They catch stray falling starbeams that bounce off church steeples and polish them into warm bedside lanterns. "If a dream is too cold," Pip whispers, "a child might wake up shivering." With one gentle exhale, Pip infuses each star with the scent of chamomile and toasted honey.`,
  },
  {
    number: '03',
    title: 'The First Rooftop Flight',
    subtitle: 'Braving the chimney smoke',
    badge: 'Adventure',
    wordCount: '89 words',
    illustration: '🦉',
    bgTint: 'from-blue-100/40 to-cream-100',
    content: `On their very first dispatch flight, a fierce winter wind blew Pip’s nightcap askew. Below, a little bear cub was crying in the woods, terrified of thunder. Clinging tight to their cloud raft, Pip lowered a crescent dream lantern through the chimney hearth. They tapped the music box, sending five slow notes rippling across the dark bedroom. Within moments, the cub sighed, tucked their paws beneath their chin, and fell soundly asleep. Pip knew their calling.`,
  },
  {
    number: '04',
    title: 'Tucking In the Dream Weaver',
    subtitle: 'Dawn at Midnight Nursery',
    badge: 'Slumber',
    wordCount: '72 words',
    illustration: '🌙',
    bgTint: 'from-pink-100/40 to-cream-100',
    content: `When the morning roosters clear their throats and lavender mist turns golden-pink, Pip’s shift is finally complete. They fly back to Midnight Nursery Ward #7, hang the lanterns on brass wall hooks, and untie the pink bow on their bedtime cap. Curling into a ball on a fresh marshmallow cloud, Pip pulls up a quilt made of woven moonbeams. Even dream engineers need to sleep. Goodnight, world.`,
  },
];

export function StorySection() {
  const [currentScene, setCurrentScene] = useState(0);

  const goToScene = (index) => {
    soundEngine.playClick();
    soundEngine.playChime(index);
    setCurrentScene(index);
  };

  const nextScene = () => {
    if (currentScene < STORY_SCENES.length - 1) {
      goToScene(currentScene + 1);
    }
  };

  const prevScene = () => {
    if (currentScene > 0) {
      goToScene(currentScene - 1);
    }
  };

  const scene = STORY_SCENES[currentScene];

  return (
    <section id="story" className="py-14 border-t border-cream-300/80 dark:border-night-50 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-berry/10 dark:bg-amberStar/15 text-berry dark:text-amberStar mb-3">
            <BookOpen size={13} /> What Pip's Story Is · Interactive Bedtime Tale
          </div>
          <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-bark dark:text-cream-50">
            The Chronicle of Pip
          </h2>
          <p className="text-sm sm:text-base text-bark-light dark:text-stone-300 mt-2">
            Told through 4 bite-sized bedtime scenes (under 100 words each). Flip the pages below!
          </p>
        </div>

        {/* Scene Selection Tabs */}
        <div className="flex justify-center items-center gap-2 mb-6 overflow-x-auto pb-2">
          {STORY_SCENES.map((s, idx) => (
            <button
              key={s.number}
              onClick={() => goToScene(idx)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold font-mono transition flex items-center gap-1.5 select-none ${
                currentScene === idx
                  ? 'bg-berry text-white shadow-retro-berry'
                  : 'bg-white dark:bg-night-card border border-cream-300 dark:border-stone-800 text-stone-600 dark:text-stone-400 hover:border-berry'
              }`}
            >
              <span>Scene {s.number}</span>
              <span className="text-[10px] hidden sm:inline opacity-80">{s.illustration}</span>
            </button>
          ))}
        </div>

        {/* Storybook Display Page */}
        <div className="rounded-3xl bg-white dark:bg-night-card border-3 border-cream-300 dark:border-night-50 p-6 sm:p-10 shadow-retro dark:shadow-retro-dark relative overflow-hidden transition-all duration-300">
          
          {/* Subtle Corner Story Ribbon */}
          <div className="flex items-center justify-between border-b border-cream-300/60 dark:border-night-50/60 pb-4 mb-6">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amberStar/20 text-stone-900 dark:text-amberStar font-mono">
                {scene.badge}
              </span>
              <span className="text-xs text-stone-400 font-mono">
                {scene.wordCount} · Page {currentScene + 1} of {STORY_SCENES.length}
              </span>
            </div>
            <span className="text-2xl">{scene.illustration}</span>
          </div>

          {/* Scene Title & Subtitle */}
          <div className="mb-6">
            <span className="text-xs uppercase font-mono font-bold tracking-widest text-berry dark:text-amberStar">
              Scene {scene.number} // {scene.subtitle}
            </span>
            <h3 className="font-editorial text-2xl sm:text-3xl lg:text-4xl font-bold text-bark dark:text-cream-50 mt-1">
              {scene.title}
            </h3>
          </div>

          {/* Story Paragraph with Editorial Drop Cap */}
          <div className="text-base sm:text-lg text-bark-light dark:text-stone-300 leading-relaxed font-editorial italic relative">
            <p className="first-letter:text-4xl first-letter:font-bold first-letter:float-left first-letter:mr-2 first-letter:text-berry dark:first-letter:text-amberStar">
              {scene.content}
            </p>
          </div>

          {/* Illustrated Footnote */}
          <div className="mt-8 pt-6 border-t border-cream-300/60 dark:border-night-50/60 flex items-center justify-between">
            <button
              onClick={prevScene}
              disabled={currentScene === 0}
              className={`px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 transition ${
                currentScene === 0
                  ? 'opacity-40 cursor-not-allowed bg-stone-100 dark:bg-stone-800 text-stone-400'
                  : 'bg-white dark:bg-night border border-stone-300 dark:border-stone-700 text-bark dark:text-cream-100 hover:border-berry active:scale-95'
              }`}
            >
              <ChevronLeft size={16} /> Previous Scene
            </button>

            {/* Reading progress dots */}
            <div className="flex items-center gap-2">
              {STORY_SCENES.map((_, i) => (
                <div
                  key={i}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    i === currentScene
                      ? 'bg-berry dark:bg-amberStar scale-125'
                      : 'bg-stone-300 dark:bg-stone-700'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextScene}
              disabled={currentScene === STORY_SCENES.length - 1}
              className={`px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 transition ${
                currentScene === STORY_SCENES.length - 1
                  ? 'opacity-40 cursor-not-allowed bg-stone-100 dark:bg-stone-800 text-stone-400'
                  : 'bg-berry text-white hover:bg-berry-hover active:scale-95 shadow-retro-berry'
              }`}
            >
              Next Scene <ChevronRight size={16} />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
