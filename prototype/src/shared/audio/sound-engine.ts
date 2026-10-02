/**
 * Bộ phát hiệu ứng âm thanh (SFX) và nhạc nền (BGM) trên Web Audio API.
 *
 * - SFX: tệp thu sẵn `src/assets/audio/sfx/<loại>.mp3` (nạp một lần thành AudioBuffer); loại chưa có tệp — hay trình
 *   duyệt không giải mã được — phát âm tổng hợp như trước. Tiếng gõ chữ cố ý giữ âm tổng hợp (phát mỗi 2 ký tự).
 * - Nhạc nền: mỗi cảnh một bài `src/assets/audio/bgm/<tên>.mp3` (`nhac-nen.ts`); đổi cảnh thì chuyển bài êm
 *   (giảm bài cũ, tăng bài mới) và bài cũ dừng ở chỗ đang phát để lần sau phát tiếp. Thiếu tệp → vòng lo-fi tổng hợp.
 * Nguồn và giấy phép các tệp: `src/assets/audio/NGUON.md`. Không có AudioContext (môi trường test) thì im lặng.
 */
import { useAudioStore } from './audio-store';
import type { NhacNen } from './nhac-nen';

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
  | 'shake'
  | 'sai';

const TEP_AM_THANH = import.meta.glob('/src/assets/audio/**/*.mp3', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>;

/** URL tệp `src/assets/audio/<thư mục>/<tên>.mp3`, hoặc `undefined` khi chưa có tệp. */
export function urlAmThanh(thuMuc: 'bgm' | 'sfx', ten: string): string | undefined {
  return TEP_AM_THANH[`/src/assets/audio/${thuMuc}/${ten}.mp3`];
}

/**
 * Chỉnh từng tệp SFX cho đều nhau — số đo trên trình duyệt (02/10/2026, RMS 300 ms đầu tiếng): `amLuong` nhân vào kênh
 * SFX (tiếng bấm ≈ −30 dB, tiếng sự kiện ≈ −20…−26 dB), `batDau` bỏ đoạn lặng đầu tệp (giây) để tiếng bật ngay khi bấm,
 * `doCao` dao động tốc độ phát ± để tiếng bấm lặp lại không giống hệt nhau.
 */
const CHINH_SFX: Partial<Record<SfxType, { amLuong: number; batDau: number; doCao?: number }>> = {
  click: { amLuong: 1.3, batDau: 0.09, doCao: 0.06 },
  select: { amLuong: 1, batDau: 0.165, doCao: 0.05 },
  tab: { amLuong: 0.75, batDau: 0.09, doCao: 0.05 },
  page: { amLuong: 1.4, batDau: 0.115, doCao: 0.04 },
  cancel: { amLuong: 0.45, batDau: 0.12 },
  chime: { amLuong: 0.37, batDau: 0.1 },
  clue_unlock: { amLuong: 1.25, batDau: 0.145 },
  objection: { amLuong: 1, batDau: 0.02 },
  shake: { amLuong: 1.2, batDau: 0.115 },
  sai: { amLuong: 0.2, batDau: 0 },
};

/** Độ lớn chung của nhạc nền so với SFX (bảy bài Gemini to đều nhau, RMS −14,4…−15,2 dB, nên không cân riêng). */
const MUC_NHAC = 0.6;

/**
 * Đoạn lặp của từng bài (giây). Bài Gemini nào cũng có đoạn kết nhỏ dần + lặng ở cuối dù đã dặn không: tới `den`
 * (giây cuối còn đủ tiếng) thì giảm nhanh, tua về `tu` rồi tăng lại, thay vì để lặp qua khoảng lặng.
 */
const VONG_LAP: Record<NhacNen, { tu: number; den: number }> = {
  'chu-de': { tu: 0, den: 166.5 },
  'thuong-ngay': { tu: 0, den: 169 },
  'dieu-tra': { tu: 0, den: 174.5 },
  'phan-tich': { tu: 0, den: 170.5 },
  'doi-chat': { tu: 0, den: 176 },
  'cao-trao': { tu: 0, den: 167 },
  ket: { tu: 2, den: 168.5 },
};
/** Thời gian giảm/tăng ở chỗ lặp (giây). */
const LAP_GIAM = 0.7;

/** Bài phát lại từ đầu mỗi lần chuyển tới (đoạn mở có chủ ý); các bài khác phát tiếp chỗ đã dừng. */
const PHAT_TU_DAU: ReadonlySet<NhacNen> = new Set<NhacNen>(['cao-trao', 'ket']);

/** Thời gian giảm/tăng khi chuyển bài (giây). */
const CHUYEN_BAI = 1.6;
/** Tiếng SFX chờ giải mã tệp lâu hơn thế này (giây) thì bỏ, khỏi phát trễ. */
const CHO_SFX_TOI_DA = 0.25;

interface KenhNhac {
  el: HTMLAudioElement;
  gain: GainNode;
  /** Hẹn dừng sau khi giảm hết tiếng (hủy nếu bài được gọi lại giữa chừng). */
  henDung: ReturnType<typeof setTimeout> | null;
  /** Đang giảm tiếng để tua về đầu đoạn lặp. */
  dangLap: boolean;
}

class SoundEngine {
  private ctx: AudioContext | null = null;
  private bgmGain: GainNode | null = null;
  private sfxGain: GainNode | null = null;
  /** Vòng lo-fi tổng hợp đi qua nút này (giữ độ lớn cũ khi kênh nhạc nền không còn hệ số 0.35). */
  private synthGain: GainNode | null = null;
  private isBgmPlaying = false;
  private bgmIntervalId: ReturnType<typeof setInterval> | null = null;

  /** Bài cảnh hiện tại muốn phát (ghi cả khi nhạc đang tắt / chưa có thao tác đầu tiên). */
  private nhacMuon: NhacNen = 'thuong-ngay';
  private nhacDangPhat: NhacNen | null = null;
  private kenh = new Map<NhacNen, KenhNhac>();

  private boDemSfx = new Map<SfxType, AudioBuffer>();
  private dangGiaiMa = new Map<SfxType, Promise<AudioBuffer | null>>();

  private initContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return null;

    if (!this.ctx) {
      try {
        this.ctx = new AudioCtx();
        this.bgmGain = this.ctx.createGain();
        this.sfxGain = this.ctx.createGain();
        this.synthGain = this.ctx.createGain();
        this.synthGain.gain.value = 0.35;

        this.bgmGain.connect(this.ctx.destination);
        this.sfxGain.connect(this.ctx.destination);
        this.synthGain.connect(this.bgmGain);
        this.syncVolumes();
        this.napSfx(this.ctx);
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
    const bgm = bgmEnabled ? (bgmVolume / 100) * master : 0;
    const sfx = (sfxVolume / 100) * master;

    if (this.bgmGain && this.ctx) {
      this.bgmGain.gain.setValueAtTime(bgm, this.ctx.currentTime);
    }
    if (this.sfxGain && this.ctx) {
      this.sfxGain.gain.setValueAtTime(sfx, this.ctx.currentTime);
    }
  }

  /** Giải mã mọi tệp SFX một lần (gọi khi tạo AudioContext). */
  private napSfx(ctx: AudioContext): void {
    for (const loai of Object.keys(CHINH_SFX) as SfxType[]) {
      const url = urlAmThanh('sfx', loai);
      if (!url || this.dangGiaiMa.has(loai)) continue;
      const hua = fetch(url)
        .then((r) => (r.ok ? r.arrayBuffer() : Promise.reject(new Error(String(r.status)))))
        .then((du) => ctx.decodeAudioData(du))
        .then((buf) => {
          this.boDemSfx.set(loai, buf);
          return buf;
        })
        .catch(() => null);
      this.dangGiaiMa.set(loai, hua);
    }
  }

  public playSfx(type: SfxType): void {
    const ctx = this.initContext();
    if (!ctx || !this.sfxGain) return;
    this.syncVolumes();

    const buf = this.boDemSfx.get(type);
    if (buf) {
      this.phatTep(ctx, type, buf);
      return;
    }
    const cho = this.dangGiaiMa.get(type);
    if (cho) {
      // Tệp đang giải mã (mấy cú bấm đầu tiên): phát khi xong nếu chưa trễ; giải mã hỏng thì phát âm tổng hợp.
      const luc = ctx.currentTime;
      void cho.then((b) => {
        if (!this.ctx) return;
        if (!b) this.phatTongHop(this.ctx, type);
        else if (this.ctx.currentTime - luc <= CHO_SFX_TOI_DA) this.phatTep(this.ctx, type, b);
      });
      return;
    }
    this.phatTongHop(ctx, type);
  }

  /**
   * Một tiếng bước chân chạy trên nền ướt (hoạt cảnh chạy đêm): tiếng ồn ngắn qua bộ lọc thông thấp, chân trái / phải lệch tông nhẹ.
   * Âm tổng hợp, đi qua âm lượng hiệu ứng như mọi SFX.
   */
  public playBuocChan(chanPhai = false): void {
    const ctx = this.initContext();
    if (!ctx || !this.sfxGain) return;
    this.syncVolumes();
    const t = ctx.currentTime;
    const dai = 0.09;
    const buf = ctx.createBuffer(1, Math.ceil(ctx.sampleRate * dai), ctx.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / d.length) ** 2;
    const src = ctx.createBufferSource();
    src.buffer = buf;
    const loc = ctx.createBiquadFilter();
    loc.type = 'lowpass';
    loc.frequency.value = (chanPhai ? 620 : 520) * (0.92 + Math.random() * 0.16);
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.5, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + dai);
    src.connect(loc);
    loc.connect(gain);
    gain.connect(this.sfxGain);
    src.start(t);
    src.stop(t + dai + 0.01);
  }

  private phatTep(ctx: AudioContext, type: SfxType, buf: AudioBuffer): void {
    if (!this.sfxGain) return;
    const chinh = CHINH_SFX[type] ?? { amLuong: 1, batDau: 0 };
    const t = ctx.currentTime;
    const src = ctx.createBufferSource();
    const gain = ctx.createGain();
    src.buffer = buf;
    if (chinh.doCao) src.playbackRate.value = 1 + (Math.random() * 2 - 1) * chinh.doCao;
    gain.gain.setValueAtTime(chinh.amLuong, t);
    src.connect(gain);
    gain.connect(this.sfxGain);
    src.start(t, chinh.batDau);
  }

  private phatTongHop(ctx: AudioContext, type: SfxType): void {
    if (!this.sfxGain) return;
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
      case 'sai': {
        // Trả lời sai: tiếng "bừ" trầm ngắn
        osc.type = 'square';
        osc.frequency.setValueAtTime(140, t);
        osc.frequency.setValueAtTime(110, t + 0.12);
        gain.gain.setValueAtTime(0.08, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.3);
        osc.start(t);
        osc.stop(t + 0.32);
        break;
      }
    }
  }

  /**
   * Chọn bài cho cảnh hiện tại. Nhạc đang phát thì chuyển bài ngay (êm); nhạc đang tắt hay chưa có thao tác đầu tiên
   * thì chỉ ghi lại, `startBgm` sẽ phát đúng bài này.
   */
  public chonNhac(ten: NhacNen): void {
    this.nhacMuon = ten;
    if (this.isBgmPlaying) this.chuyenNhac(ten);
  }

  /** Bật nhạc nền (gọi trong một thao tác của người chơi để trình duyệt cho phát): phát bài của cảnh hiện tại. */
  public startBgm(): void {
    if (this.isBgmPlaying) return;
    const ctx = this.initContext();
    if (!ctx) return;
    this.isBgmPlaying = true;
    this.syncVolumes();
    this.chuyenNhac(this.nhacMuon);
  }

  private chuyenNhac(ten: NhacNen): void {
    const ctx = this.initContext();
    if (!ctx || !this.bgmGain) return;
    if (this.nhacDangPhat === ten && (this.bgmIntervalId !== null || this.kenh.has(ten))) {
      const k = this.kenh.get(ten);
      if (k?.el.paused) this.tangDan(ctx, ten, k);
      return;
    }
    const cu = this.nhacDangPhat;
    this.nhacDangPhat = ten;
    if (cu) this.giamDan(ctx, cu);

    const url = urlAmThanh('bgm', ten);
    if (!url) {
      this.batNhacTongHop();
      return;
    }
    this.tatNhacTongHop();
    let k = this.kenh.get(ten);
    if (!k) {
      const el = new Audio(url);
      el.loop = true;
      el.preload = 'auto';
      const gain = ctx.createGain();
      gain.gain.value = 0;
      ctx.createMediaElementSource(el).connect(gain);
      gain.connect(this.bgmGain);
      const moi: KenhNhac = { el, gain, henDung: null, dangLap: false };
      el.addEventListener('timeupdate', () => this.lapVong(ten, moi));
      k = moi;
      this.kenh.set(ten, k);
    }
    if (PHAT_TU_DAU.has(ten) && k.el.paused) k.el.currentTime = VONG_LAP[ten].tu;
    this.tangDan(ctx, ten, k);
  }

  /** Tới gần cuối đoạn lặp: giảm nhanh, tua về đầu đoạn, tăng lại (bài đang giảm để chuyển thì thôi). */
  private lapVong(ten: NhacNen, k: KenhNhac): void {
    const vong = VONG_LAP[ten];
    if (!this.ctx || k.dangLap || k.henDung || this.nhacDangPhat !== ten) return;
    if (k.el.currentTime < vong.den - LAP_GIAM) return;
    k.dangLap = true;
    const g = k.gain.gain;
    const t = this.ctx.currentTime;
    g.cancelScheduledValues(t);
    g.setValueAtTime(g.value, t);
    g.linearRampToValueAtTime(0, t + LAP_GIAM);
    setTimeout(() => {
      k.el.currentTime = vong.tu;
      k.dangLap = false;
      if (!this.ctx || k.henDung || this.nhacDangPhat !== ten) return;
      const t2 = this.ctx.currentTime;
      g.cancelScheduledValues(t2);
      g.setValueAtTime(0, t2);
      g.linearRampToValueAtTime(MUC_NHAC, t2 + LAP_GIAM);
    }, LAP_GIAM * 1000);
  }

  private tangDan(ctx: AudioContext, ten: NhacNen, k: KenhNhac): void {
    if (k.henDung) {
      clearTimeout(k.henDung);
      k.henDung = null;
    }
    const t = ctx.currentTime;
    k.gain.gain.cancelScheduledValues(t);
    k.gain.gain.setValueAtTime(k.gain.gain.value, t);
    k.gain.gain.linearRampToValueAtTime(MUC_NHAC, t + CHUYEN_BAI);
    k.el.play().catch(() => {
      // Tệp hỏng / trình duyệt chặn: thay bằng vòng tổng hợp nếu bài này vẫn là bài đang cần.
      if (this.nhacDangPhat === ten && this.isBgmPlaying) this.batNhacTongHop();
    });
  }

  private giamDan(ctx: AudioContext, ten: NhacNen): void {
    const k = this.kenh.get(ten);
    if (!k) {
      this.tatNhacTongHop();
      return;
    }
    const t = ctx.currentTime;
    k.gain.gain.cancelScheduledValues(t);
    k.gain.gain.setValueAtTime(k.gain.gain.value, t);
    k.gain.gain.linearRampToValueAtTime(0, t + CHUYEN_BAI);
    if (k.henDung) clearTimeout(k.henDung);
    k.henDung = setTimeout(() => {
      k.henDung = null;
      k.el.pause();
    }, CHUYEN_BAI * 1000 + 100);
  }

  /**
   * Vòng lặp nhạc nền Ambient Lo-Fi Piano tổng hợp — chỉ dùng khi thiếu tệp nhạc.
   * Giai điệu arpeggio thong thả, âm sắc ấm áp theo phong cách Visual Novel học đường.
   */
  private batNhacTongHop(): void {
    if (this.bgmIntervalId !== null) return;
    const ctx = this.initContext();
    if (!ctx || !this.synthGain) return;

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
      if (!this.isBgmPlaying || !this.ctx || !this.synthGain) return;
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
      bassGain.connect(this.synthGain);
      bassOsc.start(t);
      bassOsc.stop(t + 3.9);

      // 2. Dải đệm Ambient Pad mờ ảo
      chord.notes.slice(0, 3).forEach((freq) => {
        if (!this.ctx || !this.synthGain) return;
        const padOsc = this.ctx.createOscillator();
        const padGain = this.ctx.createGain();
        padOsc.type = 'sine';
        padOsc.frequency.setValueAtTime(freq, t);
        padGain.gain.setValueAtTime(0.0001, t);
        padGain.gain.linearRampToValueAtTime(0.025, t + 0.8);
        padGain.gain.exponentialRampToValueAtTime(0.0001, t + 3.9);
        padOsc.connect(padGain);
        padGain.connect(this.synthGain);
        padOsc.start(t);
        padOsc.stop(t + 4.0);
      });

      // 3. Arpeggio phím Piano Lo-Fi rải rác từng nốt nhẹ nhàng
      chord.notes.forEach((freq, i) => {
        if (!this.ctx || !this.synthGain) return;
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
        pianoGain.connect(this.synthGain);
        pianoOsc.start(noteTime);
        pianoOsc.stop(noteTime + 1.5);
      });
    };

    playMeasure();
    this.bgmIntervalId = setInterval(playMeasure, 4000);
  }

  private tatNhacTongHop(): void {
    if (this.bgmIntervalId) {
      clearInterval(this.bgmIntervalId);
      this.bgmIntervalId = null;
    }
  }

  /** Tắt nhạc nền: dừng mọi bài (giữ chỗ đang phát), lần bật sau phát bài của cảnh lúc đó. */
  public stopBgm(): void {
    this.isBgmPlaying = false;
    this.nhacDangPhat = null;
    this.tatNhacTongHop();
    for (const k of this.kenh.values()) {
      if (k.henDung) {
        clearTimeout(k.henDung);
        k.henDung = null;
      }
      k.el.pause();
      if (this.ctx) {
        k.gain.gain.cancelScheduledValues(this.ctx.currentTime);
        k.gain.gain.setValueAtTime(0, this.ctx.currentTime);
      }
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

