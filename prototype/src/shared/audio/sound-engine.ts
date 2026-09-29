/**
 * Bộ phát hiệu ứng âm thanh (SFX) và nhạc nền (BGM) dựa trên Web Audio API thuần.
 * Hoạt động độc lập, không cần phụ thuộc tệp âm thanh bên ngoài, tự động tương thích môi trường test.
 */
import { useAudioStore } from './audio-store';

export type SfxType =
  | 'click'
  | 'typewriter'
  | 'page'
  | 'chime'
  | 'objection'
  | 'select'
  | 'cancel'
  | 'tab'
  | 'clue_unlock'
  | 'shake';

class SoundEngine {
  private ctx: AudioContext | null = null;
  private bgmGain: GainNode | null = null;
  private sfxGain: GainNode | null = null;
  private isBgmPlaying = false;
  private bgmIntervalId: ReturnType<typeof setInterval> | null = null;
  private audioEl: HTMLAudioElement | null = null;

  private initContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return null;

    if (!this.ctx) {
      try {
        this.ctx = new AudioCtx();
        this.bgmGain = this.ctx.createGain();
        this.sfxGain = this.ctx.createGain();

        this.bgmGain.connect(this.ctx.destination);
        this.sfxGain.connect(this.ctx.destination);
        this.syncVolumes();
      } catch {
        return null;
      }
    }

    if (this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }

    return this.ctx;
  }

  public syncVolumes(): void {
    const { masterVolume, bgmVolume, sfxVolume, muted, bgmEnabled } = useAudioStore.getState();
    const master = muted ? 0 : masterVolume / 100;
    const bgm = bgmEnabled ? (bgmVolume / 100) * master * 0.35 : 0;
    const sfx = (sfxVolume / 100) * master;

    if (this.bgmGain && this.ctx) {
      this.bgmGain.gain.setValueAtTime(bgm, this.ctx.currentTime);
    }
    if (this.sfxGain && this.ctx) {
      this.sfxGain.gain.setValueAtTime(sfx, this.ctx.currentTime);
    }
    if (this.audioEl) {
      this.audioEl.volume = Math.max(0, Math.min(1, bgm));
    }
  }

  public playSfx(type: SfxType): void {
    const ctx = this.initContext();
    if (!ctx || !this.sfxGain) return;
    this.syncVolumes();

    const t = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(this.sfxGain);

    switch (type) {
      case 'typewriter': {
        // Âm gõ phím lách cách cực nhẹ (800Hz - 1400Hz)
        const freq = 900 + Math.random() * 400;
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, t);
        gain.gain.setValueAtTime(0.04, t);
        gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.035);
        osc.start(t);
        osc.stop(t + 0.04);
        break;
      }
      case 'click': {
        // Nút bấm UI mềm mại
        osc.type = 'sine';
        osc.frequency.setValueAtTime(600, t);
        osc.frequency.exponentialRampToValueAtTime(350, t + 0.06);
        gain.gain.setValueAtTime(0.12, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.06);
        osc.start(t);
        osc.stop(t + 0.07);
        break;
      }
      case 'tab': {
        // Tiếng chuyển thẻ hồ sơ / danh mục nhanh, trong trẻo
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(580, t);
        osc.frequency.exponentialRampToValueAtTime(880, t + 0.07);
        gain.gain.setValueAtTime(0.09, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.07);
        osc.start(t);
        osc.stop(t + 0.08);
        break;
      }
      case 'select': {
        // Chọn lựa chọn trong đối thoại
        osc.type = 'sine';
        osc.frequency.setValueAtTime(440, t);
        osc.frequency.exponentialRampToValueAtTime(880, t + 0.1);
        gain.gain.setValueAtTime(0.15, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.12);
        osc.start(t);
        osc.stop(t + 0.13);
        break;
      }
      case 'page': {
        // Tiếng mở sổ hồ sơ / lật trang lụa
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(320, t);
        osc.frequency.exponentialRampToValueAtTime(580, t + 0.12);
        gain.gain.setValueAtTime(0.08, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.12);
        osc.start(t);
        osc.stop(t + 0.13);
        break;
      }
      case 'chime': {
        // Chuông phát hiện manh mối nhỏ
        const osc2 = ctx.createOscillator();
        const gain2 = ctx.createGain();
        osc2.connect(gain2);
        gain2.connect(this.sfxGain);

        osc.type = 'sine';
        osc2.type = 'sine';
        osc.frequency.setValueAtTime(523.25, t); // C5
        osc2.frequency.setValueAtTime(659.25, t); // E5
        osc.frequency.setValueAtTime(783.99, t + 0.12); // G5
        osc2.frequency.setValueAtTime(1046.5, t + 0.12); // C6

        gain.gain.setValueAtTime(0.2, t);
        gain2.gain.setValueAtTime(0.15, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.5);
        gain2.gain.exponentialRampToValueAtTime(0.001, t + 0.5);

        osc.start(t);
        osc2.start(t);
        osc.stop(t + 0.55);
        osc2.stop(t + 0.55);
        break;
      }
      case 'clue_unlock': {
        // Chuông mở khóa vật chứng lớn / phát hiện bước ngoặt: Arpeggio 5 nốt vàng ngân vang
        const notes = [523.25, 659.25, 783.99, 987.77, 1046.5]; // C5, E5, G5, B5, C6
        notes.forEach((freq, idx) => {
          if (!this.ctx || !this.sfxGain) return;
          const noteOsc = this.ctx.createOscillator();
          const noteGain = this.ctx.createGain();
          noteOsc.connect(noteGain);
          noteGain.connect(this.sfxGain);

          noteOsc.type = 'sine';
          const noteTime = t + idx * 0.08;
          noteOsc.frequency.setValueAtTime(freq, noteTime);

          noteGain.gain.setValueAtTime(0.0001, noteTime);
          noteGain.gain.linearRampToValueAtTime(0.18 - idx * 0.02, noteTime + 0.02);
          noteGain.gain.exponentialRampToValueAtTime(0.0001, noteTime + 0.8);

          noteOsc.start(noteTime);
          noteOsc.stop(noteTime + 0.85);
        });
        break;
      }
      case 'objection': {
        // Búa giải trình / phát hiện mâu thuẫn kịch tính
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(160, t);
        osc.frequency.exponentialRampToValueAtTime(40, t + 0.35);
        gain.gain.setValueAtTime(0.35, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.38);
        osc.start(t);
        osc.stop(t + 0.4);
        break;
      }
      case 'shake': {
        // Rung giật màn hình / va chạm
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(110, t);
        osc.frequency.exponentialRampToValueAtTime(30, t + 0.28);
        gain.gain.setValueAtTime(0.3, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.3);
        osc.start(t);
        osc.stop(t + 0.32);
        break;
      }
      case 'cancel': {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(400, t);
        osc.frequency.exponentialRampToValueAtTime(200, t + 0.08);
        gain.gain.setValueAtTime(0.1, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.08);
        osc.start(t);
        osc.stop(t + 0.09);
        break;
      }
    }
  }

  /**
   * Bắt đầu vòng lặp nhạc nền Ambient Lo-Fi Piano êm dịu.
   * Giai điệu arpeggio thong thả, âm sắc ấm áp theo phong cách Visual Novel học đường.
   */
  public startBgm(): void {
    if (this.isBgmPlaying) return;
    const ctx = this.initContext();
    if (!ctx) return;
    this.isBgmPlaying = true;
    this.syncVolumes();

    // Vòng hợp âm Lo-Fi học đường thanh bình:
    // Cmaj7 (C-E-G-B) -> Am7 (A-C-E-G) -> Dm7 (D-F-A-C) -> G7sus4 -> G7 (G-C-D-F -> G-B-D-F)
    const progression = [
      { bass: 130.81, notes: [261.63, 329.63, 392.0, 493.88, 523.25] }, // Cmaj7
      { bass: 110.0,  notes: [220.0, 261.63, 329.63, 392.0, 440.0] },   // Am7
      { bass: 146.83, notes: [293.66, 349.23, 440.0, 523.25, 587.33] }, // Dm7
      { bass: 98.0,   notes: [196.0, 261.63, 293.66, 392.0, 493.88] },  // G7
    ];
    let step = 0;

    const playMeasure = () => {
      if (!this.isBgmPlaying || !this.ctx || !this.bgmGain) return;
      const t = this.ctx.currentTime;
      const chord = progression[step % progression.length] ?? progression[0]!;
      step++;

      // 1. Nốt Bass trầm ấm
      const bassOsc = this.ctx.createOscillator();
      const bassGain = this.ctx.createGain();
      bassOsc.type = 'triangle';
      bassOsc.frequency.setValueAtTime(chord.bass, t);
      bassGain.gain.setValueAtTime(0.0001, t);
      bassGain.gain.linearRampToValueAtTime(0.08, t + 0.3);
      bassGain.gain.exponentialRampToValueAtTime(0.0001, t + 3.8);
      bassOsc.connect(bassGain);
      bassGain.connect(this.bgmGain);
      bassOsc.start(t);
      bassOsc.stop(t + 3.9);

      // 2. Dải đệm Ambient Pad mờ ảo
      chord.notes.slice(0, 3).forEach((freq) => {
        if (!this.ctx || !this.bgmGain) return;
        const padOsc = this.ctx.createOscillator();
        const padGain = this.ctx.createGain();
        padOsc.type = 'sine';
        padOsc.frequency.setValueAtTime(freq, t);
        padGain.gain.setValueAtTime(0.0001, t);
        padGain.gain.linearRampToValueAtTime(0.025, t + 0.8);
        padGain.gain.exponentialRampToValueAtTime(0.0001, t + 3.9);
        padOsc.connect(padGain);
        padGain.connect(this.bgmGain);
        padOsc.start(t);
        padOsc.stop(t + 4.0);
      });

      // 3. Arpeggio phím Piano Lo-Fi rải rác từng nốt nhẹ nhàng
      chord.notes.forEach((freq, i) => {
        if (!this.ctx || !this.bgmGain) return;
        const noteDelay = i * 0.75; // Mỗi nhịp rải cách nhau 0.75s
        const noteTime = t + noteDelay;

        const pianoOsc = this.ctx.createOscillator();
        const pianoGain = this.ctx.createGain();
        pianoOsc.type = 'sine';
        pianoOsc.frequency.setValueAtTime(freq, noteTime);

        // Chu kỳ phong bì tiếng piano: gõ nhanh, tan dần tự nhiên
        pianoGain.gain.setValueAtTime(0.0001, noteTime);
        pianoGain.gain.linearRampToValueAtTime(0.05, noteTime + 0.04);
        pianoGain.gain.exponentialRampToValueAtTime(0.0001, noteTime + 1.4);

        pianoOsc.connect(pianoGain);
        pianoGain.connect(this.bgmGain);
        pianoOsc.start(noteTime);
        pianoOsc.stop(noteTime + 1.5);
      });
    };

    playMeasure();
    this.bgmIntervalId = setInterval(playMeasure, 4000);
  }

  public stopBgm(): void {
    this.isBgmPlaying = false;
    if (this.bgmIntervalId) {
      clearInterval(this.bgmIntervalId);
      this.bgmIntervalId = null;
    }
    if (this.audioEl) {
      this.audioEl.pause();
      this.audioEl.currentTime = 0;
    }
  }

  public toggleBgmPlayback(): void {
    if (this.isBgmPlaying) {
      this.stopBgm();
    } else {
      this.startBgm();
    }
  }

  /**
   * Phát tệp âm thanh BGM tùy chỉnh (MP3/OGG). Nếu lỗi nạp tệp, tự động fallback về Synth.
   */
  public playCustomBgm(audioSrc: string): void {
    if (typeof window === 'undefined') return;
    this.stopBgm();
    try {
      this.audioEl = new Audio(audioSrc);
      this.audioEl.loop = true;
      this.syncVolumes();
      this.audioEl.play().catch(() => {
        // Fallback về Synth nếu file không tồn tại hoặc bị chặn
        this.startBgm();
      });
      this.isBgmPlaying = true;
    } catch {
      this.startBgm();
    }
  }
}

export const soundEngine = new SoundEngine();

/** Lắng nghe thay đổi store để đồng bộ volume */
useAudioStore.subscribe(() => {
  soundEngine.syncVolumes();
});

