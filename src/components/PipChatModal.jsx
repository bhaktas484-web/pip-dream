import React, { useState } from 'react';
import { MessageCircle, X, Send, Sparkles, Moon } from 'lucide-react';
import { soundEngine } from '../utils/audio';

const CANNED_DIALOGUES = {
  default: [
    "Yawwn... (*ᴗ͈ˬᴗ͈) Pip is listening! What bedtime thought is on your mind?",
    "The stars in Midnight Nursery are twinkling softly tonight. How can I tuck you in?",
  ],
  rules: [
    {
      keywords: ['hi', 'hello', 'hey', 'pip'],
      response: "Hello, gentle creature! Have you had enough water and chamomile tea today? Take a deep breath with me... in... and out.",
    },
    {
      keywords: ['job', 'work', 'engineer', 'what do you do'],
      response: "I'm the Junior Dream Engineer at Midnight Nursery! I measure lullaby frequencies, polish starbeams into lanterns, and deliver sweet dreams to little creatures who are scared of the dark.",
    },
    {
      keywords: ['scared', 'nightmare', 'fear', 'dark', 'monster'],
      response: "Don't worry! Monsters are just shadows that forgot how to smile. My crescent lantern has a 100% monster-soothing guarantee. You are safe here.",
    },
    {
      keywords: ['lullaby', 'music', 'song', 'sing'],
      response: "My favorite lullaby is in pentatonic C! It slows your heartbeat down to 60 beats per minute so your eyelashes feel heavy and soft.",
    },
    {
      keywords: ['skull', 'face', 'skeleton', 'creepy', 'scary'],
      response: "Some think skulls are spooky, but mine is just smooth, round, and sleepy! Underneath every smile is a little skull baby just like me.",
    },
    {
      keywords: ['secret', 'easter egg', 'hidden'],
      response: "Psst! If you tap the little star bow on my bedtime cap 5 times, a secret stardust shower will celebrate you!",
    },
    {
      keywords: ['sleep', 'tired', 'bed', 'nap'],
      response: "Then close your eyes and let the world spin without you for a few hours. The stars will keep watch until morning.",
    },
  ],
};

const SUGGESTED_QUESTIONS = [
  "What is your secret?",
  "Are you scared of monsters?",
  "Sing me a lullaby",
  "How do you fly on clouds?",
];

export function PipChatModal({ isOpen, onClose }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'pip',
      text: "Hello! I’m Pip. I’m taking a 5-minute tea break from the Lullaby Lab. Ask me anything about dreams, nightlights, or my skull cap! (*ᴗ͈ˬᴗ͈)💤",
    },
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  if (!isOpen) return null;

  const handleSend = (textToSend = null) => {
    const query = (textToSend || inputVal).trim();
    if (!query) return;

    soundEngine.playClick();
    const userMsg = { id: Date.now(), sender: 'user', text: query };
    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputVal('');

    setIsTyping(true);

    // Rule-based character response
    setTimeout(() => {
      soundEngine.playChime(3);
      const lower = query.toLowerCase();
      let matchedResponse = null;

      for (const rule of CANNED_DIALOGUES.rules) {
        if (rule.keywords.some((kw) => lower.includes(kw))) {
          matchedResponse = rule.response;
          break;
        }
      }

      if (!matchedResponse) {
        matchedResponse =
          "That is a lovely thought. Pip will tuck it into a tiny velvet pouch and weave it into tonight’s rooftop flight! Sweet dreams, friend.";
      }

      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, sender: 'pip', text: matchedResponse },
      ]);
      setIsTyping(false);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white dark:bg-night-card border-3 border-cream-300 dark:border-night-50 rounded-3xl max-w-md w-full p-5 sm:p-6 shadow-retro relative flex flex-col h-[520px]">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-cream-300 dark:border-stone-800 pb-3 mb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-berry dark:bg-amberStar flex items-center justify-center text-white dark:text-stone-900 text-sm font-bold">
              🌙
            </div>
            <div>
              <h3 className="font-editorial text-lg font-bold text-bark dark:text-cream-50 leading-tight">
                Chat with Pip
              </h3>
              <span className="text-[10px] text-emerald-500 font-mono font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping inline-block" />
                Awake & Whispering
              </span>
            </div>
          </div>

          <button
            onClick={() => {
              soundEngine.playClick();
              onClose();
            }}
            className="p-1.5 rounded-full border border-stone-300 dark:border-stone-700 hover:bg-cream-100 dark:hover:bg-night text-stone-500"
            aria-label="Close chat"
          >
            <X size={16} />
          </button>
        </div>

        {/* Messages Feed */}
        <div className="flex-1 overflow-y-auto space-y-3 p-1 text-xs sm:text-sm">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[82%] p-3 rounded-2xl ${
                  m.sender === 'user'
                    ? 'bg-berry text-white rounded-br-xs shadow-sm font-sans'
                    : 'bg-cream-100 dark:bg-night border border-cream-300 dark:border-stone-800 text-bark dark:text-cream-100 rounded-bl-xs font-serif italic'
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-cream-100 dark:bg-night border border-cream-300 dark:border-stone-800 text-stone-400 p-2.5 rounded-2xl text-xs flex items-center gap-1.5 font-mono">
                <span>Pip is yawning...</span>
                <span className="animate-bounce">💤</span>
              </div>
            </div>
          )}
        </div>

        {/* Suggested Quick Prompts */}
        <div className="pt-2 pb-2 flex gap-1.5 overflow-x-auto select-none">
          {SUGGESTED_QUESTIONS.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(q)}
              className="text-[11px] whitespace-nowrap px-2.5 py-1 rounded-full bg-cream-200/80 dark:bg-night border border-cream-300 dark:border-stone-800 hover:border-berry text-bark dark:text-stone-300 transition"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="pt-2 border-t border-cream-300 dark:border-stone-800 flex gap-2"
        >
          <input
            type="text"
            placeholder="Whisper a question to Pip..."
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            className="flex-1 px-3 py-2 text-xs sm:text-sm rounded-xl border border-cream-300 dark:border-stone-700 bg-cream-50 dark:bg-night text-bark dark:text-cream-100 focus:outline-none focus:border-berry"
          />
          <button
            type="submit"
            className="px-3.5 py-2 rounded-xl bg-berry text-white font-bold text-xs shadow-retro-berry hover:bg-berry-hover transition active:scale-95 flex items-center justify-center"
          >
            <Send size={14} />
          </button>
        </form>

      </div>
    </div>
  );
}
