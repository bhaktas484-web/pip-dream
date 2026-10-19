// Web Audio API engine for soothing music box chimes, wooden clicks, and lullaby sequences
// 100% self-contained, zero external audio dependencies, zero loading delays!

const PENTATONIC_FREQUENCIES = [
  523.25, // C5
  587.33, // D5
  659.25, // E5
  783.99, // G5
  880.00, // A5
  1046.50 // C6
];

// Classic Brahms Lullaby opening phrase notes
const LULLABY_TUNE = [
  { note: 2, dur: 0.35 }, // E5
  { note: 2, dur: 0.35 }, // E5
  { note: 4, dur: 0.70 }, // A5
  { note: 2, dur: 0.35 }, // E5
  { note: 2, dur: 0.35 }, // E5
  { note: 4, dur: 0.70 }, // A5
  { note: 4, dur: 0.35 }, // A5
  { note: 5, dur: 0.70 }, // C6
  { note: 3, dur: 0.35 }, // G5
  { note: 1, dur: 0.35 }, // D5
  { note: 2, dur: 0.90 }, // E5
];

class AudioEngine {
  constructor() {
    this.ctx = null;
    this.isMuted = typeof window !== 'undefined' ? localStorage.getItem('pip_audio_muted') === 'true' : false;
    this.isPlayingLullaby = false;
    this.lullabyTimeout = null;
    this.onNotePlayed = null;
  }

  init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  setMuted(muted) {
    this.isMuted = muted;
    if (typeof window !== 'undefined') {
      localStorage.setItem('pip_audio_muted', muted.toString());
    }
    if (muted && this.isPlayingLullaby) {
      this.stopLullaby();
    }
  }

  // Play a soft, bell-like celestial music box tone
  playChime(noteIndex = null, customFreq = null) {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    let freq = customFreq;
    if (!freq) {
      if (noteIndex !== null) {
        freq = PENTATONIC_FREQUENCIES[noteIndex % PENTATONIC_FREQUENCIES.length];
      } else {
        freq = PENTATONIC_FREQUENCIES[Math.floor(Math.random() * PENTATONIC_FREQUENCIES.length)];
      }
    }

    const now = this.ctx.currentTime;
    
    // Fundamental oscillator (Pure sine)
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    // Soft overtone for celesta/music-box shimmer
    const oscOvertone = this.ctx.createOscillator();
    const gainOvertone = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);

    oscOvertone.type = 'sine';
    oscOvertone.frequency.setValueAtTime(freq * 2.01, now); // slightly detuned octave

    // Music box exponential pluck envelope
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.22, now + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.4);

    gainOvertone.gain.setValueAtTime(0.0001, now);
    gainOvertone.gain.exponentialRampToValueAtTime(0.06, now + 0.012);
    gainOvertone.gain.exponentialRampToValueAtTime(0.0001, now + 0.6);

    osc.connect(gain);
    oscOvertone.connect(gainOvertone);

    gain.connect(this.ctx.destination);
    gainOvertone.connect(this.ctx.destination);

    osc.start(now);
    oscOvertone.start(now);

    osc.stop(now + 1.45);
    oscOvertone.stop(now + 0.65);
  }

  // Play a woody baby toy rattle/block click
  playClick() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(480, now);
    osc.frequency.exponentialRampToValueAtTime(160, now + 0.04);

    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.04);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.05);
  }

  // Play magical Easter egg fanfare
  playEasterEggFanfare() {
    if (this.isMuted) return;
    this.init();
    const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51];
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        this.playChime(null, freq);
      }, idx * 120);
    });
  }

  // Start continuous / single pass music box lullaby
  startLullaby(onNoteCallback = null, onCompleteCallback = null) {
    if (this.isMuted) return;
    this.init();
    this.isPlayingLullaby = true;
    this.onNotePlayed = onNoteCallback;

    let step = 0;
    const playNext = () => {
      if (!this.isPlayingLullaby) return;
      if (step >= LULLABY_TUNE.length) {
        this.isPlayingLullaby = false;
        if (onCompleteCallback) onCompleteCallback();
        return;
      }

      const item = LULLABY_TUNE[step];
      this.playChime(item.note);
      if (this.onNotePlayed) this.onNotePlayed(item.note, step);

      step++;
      this.lullabyTimeout = setTimeout(playNext, item.dur * 1000);
    };

    playNext();
  }

  stopLullaby() {
    this.isPlayingLullaby = false;
    if (this.lullabyTimeout) {
      clearTimeout(this.lullabyTimeout);
      this.lullabyTimeout = null;
    }
  }
}

export const soundEngine = new AudioEngine();
