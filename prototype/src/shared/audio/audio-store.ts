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

function loadStoredSettings(): AudioSettings {
  if (typeof window === 'undefined') {
    return { masterVolume: 80, bgmVolume: 50, sfxVolume: 80, muted: false, bgmEnabled: true };
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    // fallback default
  }
  return { masterVolume: 80, bgmVolume: 50, sfxVolume: 80, muted: false, bgmEnabled: true };
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
