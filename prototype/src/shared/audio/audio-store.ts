/**
 * Quản trị trạng thái và cài đặt âm thanh (BGM & SFX).
 * Lưu cấu hình người dùng vào localStorage.
 */
import { create } from 'zustand';

export interface AudioSettings {
  masterVolume: number; // 0 - 100
  bgmVolume: number;    // 0 - 100
  sfxVolume: number;    // 0 - 100
  muted: boolean;
  bgmEnabled: boolean;
}

interface AudioStoreState extends AudioSettings {
  setMasterVolume: (volume: number) => void;
  setBgmVolume: (volume: number) => void;
  setSfxVolume: (volume: number) => void;
  toggleMute: () => void;
  toggleBgm: () => void;
}

const STORAGE_KEY = 'clb_audio_settings_v1';

const DEFAULT_SETTINGS: AudioSettings = { masterVolume: 80, bgmVolume: 50, sfxVolume: 80, muted: false, bgmEnabled: true };

function loadStoredSettings(): AudioSettings {
  if (typeof window === 'undefined') return { ...DEFAULT_SETTINGS };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed: unknown = raw ? JSON.parse(raw) : null;
    if (parsed && typeof parsed === 'object') {
      // Chỉ nhận trường đúng kiểu; thiếu/hỏng thì dùng mặc định (tránh NaN làm hỏng GainNode).
      const o = parsed as Record<string, unknown>;
      const num = (k: keyof AudioSettings, d: number) => (typeof o[k] === 'number' && Number.isFinite(o[k]) ? Math.max(0, Math.min(100, o[k] as number)) : d);
      const bool = (k: keyof AudioSettings, d: boolean) => (typeof o[k] === 'boolean' ? (o[k] as boolean) : d);
      return {
        masterVolume: num('masterVolume', DEFAULT_SETTINGS.masterVolume),
        bgmVolume: num('bgmVolume', DEFAULT_SETTINGS.bgmVolume),
        sfxVolume: num('sfxVolume', DEFAULT_SETTINGS.sfxVolume),
        muted: bool('muted', DEFAULT_SETTINGS.muted),
        bgmEnabled: bool('bgmEnabled', DEFAULT_SETTINGS.bgmEnabled),
      };
    }
  } catch {
    // fallback default
  }
  return { ...DEFAULT_SETTINGS };
}

function persistSettings(settings: AudioSettings): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  } catch {
    // ignore
  }
}

export const useAudioStore = create<AudioStoreState>((set, get) => {
  const initial = loadStoredSettings();

  const update = (partial: Partial<AudioSettings>) => {
    set((state) => {
      const next: AudioSettings = {
        masterVolume: partial.masterVolume ?? state.masterVolume,
        bgmVolume: partial.bgmVolume ?? state.bgmVolume,
        sfxVolume: partial.sfxVolume ?? state.sfxVolume,
        muted: partial.muted ?? state.muted,
        bgmEnabled: partial.bgmEnabled ?? state.bgmEnabled,
      };
      persistSettings(next);
      return next;
    });
  };

  return {
    ...initial,
    setMasterVolume: (masterVolume) => update({ masterVolume: Math.max(0, Math.min(100, masterVolume)) }),
    setBgmVolume: (bgmVolume) => update({ bgmVolume: Math.max(0, Math.min(100, bgmVolume)) }),
    setSfxVolume: (sfxVolume) => update({ sfxVolume: Math.max(0, Math.min(100, sfxVolume)) }),
    toggleMute: () => update({ muted: !get().muted }),
    toggleBgm: () => update({ bgmEnabled: !get().bgmEnabled }),
  };
});
