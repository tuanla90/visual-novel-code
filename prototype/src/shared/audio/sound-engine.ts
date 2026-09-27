/**
 * Bộ phát hiệu ứng âm thanh (SFX) và nhạc nền (BGM) dựa trên Web Audio API thuần.
 * Hoạt động độc lập, không cần phụ thuộc tệp âm thanh bên ngoài, tự động tương thích môi trường test.
 */
import { useAudioStore } from './audio-store';

export type SfxType = 'click' | 'typewriter' | 'page' | 'chime' | 'objection' | 'select' | 'cancel';

class SoundEngine {
  private ctx: AudioContext | null = null;
  private bgmGain: GainNode | null = null;
  private sfxGain: GainNode | null = null;
  private isBgmPlaying = false;
  private bgmIntervalId: ReturnType<typeof setInterval> | null = null;

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
    const bgm = bgmEnabled ? (bgmVolume / 100) * master * 0.25 : 0;
    const sfx = (sfxVolume / 100) * master;

    if (this.bgmGain && this.ctx) {
      this.bgmGain.gain.setValueAtTime(bgm, this.ctx.currentTime);
    }
    if (this.sfxGain && this.ctx) {
      this.sfxGain.gain.setValueAtTime(sfx, this.ctx.currentTime);
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
        // Âm gõ phím lách cách cực nhẹ (800Hz - 1400Hz nhấp nhô ngẫu nhiên)
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
        // Tiếng mở sổ hồ sơ / manh mối
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
        // Phát hiện manh mối mới / Chuông thám tử
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
      case 'objection': {
        // Búa giải trình kịch tính
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(140, t);
        osc.frequency.exponentialRampToValueAtTime(45, t + 0.35);
        gain.gain.setValueAtTime(0.35, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.38);
        osc.start(t);
        osc.stop(t + 0.4);
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

  /** Bắt đầu vòng lặp nhạc nền Ambient Lo-Fi êm dịu */
  public startBgm(): void {
    if (this.isBgmPlaying) return;
    const ctx = this.initContext();
    if (!ctx) return;
    this.isBgmPlaying = true;
    this.syncVolumes();

    // Hợp âm Lo-Fi ấm áp: Cmaj7 -> Am7 -> Dm7 -> G7
    const chords = [
      [261.63, 329.63, 392.0, 493.88], // Cmaj7
      [220.0, 261.63, 329.63, 392.0],  // Am7
      [146.83, 174.61, 220.0, 261.63], // Dm7
      [196.0, 246.94, 293.66, 349.23], // G7
    ];
    let chordIdx = 0;

    const playChord = () => {
      if (!this.isBgmPlaying || !this.ctx || !this.bgmGain) return;
      const t = this.ctx.currentTime;
      const chord = chords[chordIdx % chords.length] ?? [261.63, 329.63, 392.0];
      chordIdx++;

      chord.forEach((freq) => {
        if (!this.ctx || !this.bgmGain) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, t);

        gain.gain.setValueAtTime(0.0001, t);
        gain.gain.linearRampToValueAtTime(0.04, t + 0.5);
        gain.gain.exponentialRampToValueAtTime(0.0001, t + 3.8);

        osc.connect(gain);
        gain.connect(this.bgmGain);

        osc.start(t);
        osc.stop(t + 4.0);
      });
    };

    playChord();
    this.bgmIntervalId = setInterval(playChord, 4000);
  }

  public stopBgm(): void {
    this.isBgmPlaying = false;
    if (this.bgmIntervalId) {
      clearInterval(this.bgmIntervalId);
      this.bgmIntervalId = null;
    }
  }

  public toggleBgmPlayback(): void {
    if (this.isBgmPlaying) {
      this.stopBgm();
    } else {
      this.startBgm();
    }
  }
}

export const soundEngine = new SoundEngine();

/** Lắng nghe thay đổi store để đồng bộ volume */
useAudioStore.subscribe(() => {
  soundEngine.syncVolumes();
});
