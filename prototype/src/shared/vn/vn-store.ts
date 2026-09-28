/**
 * Store điều khiển cơ chế Visual Novel:
 * Auto, Skip, Backlog, Hide UI, Save/Load slots.
 */
import { create } from 'zustand';
import type { StoryProgress } from '../../story/engine/state';
import type { GameData } from '../store/store';

export interface BacklogEntry {
  id: string;
  speaker: string;
  speakerName: string;
  text: string;
  partName?: string;
}

export interface SaveSlot {
  slotIndex: number;
  date: string;
  part: string;
  task: string;
  scene: string;
  thumbnailText: string;
  screenshot?: string;
  progress: StoryProgress;
  evidence: GameData['evidence'];
}

export type DialogueFont = 'source-serif' | 'dancing-script' | 'playwrite-vn' | 'be-vietnam-pro';

export const FONT_LABELS: Record<DialogueFont, string> = {
  'source-serif': 'Source Serif 4',
  'dancing-script': 'Dancing Script',
  'playwrite-vn': 'Playwrite VN',
  'be-vietnam-pro': 'Sans Mặc định',
};

export type TextSpeed = 'slow' | 'normal' | 'fast' | 'instant';

export const SPEED_MS: Record<TextSpeed, number> = {
  slow: 35,
  normal: 20,
  fast: 10,
  instant: 0,
};

interface VnState {
  autoMode: boolean;
  skipMode: boolean;
  hideUi: boolean;
  /** Câu thoại hiện tại còn đang chạy chữ (chân dung người nói mấp máy môi). */
  lineTyping: boolean;
  textSpeed: TextSpeed;
  dialogueFont: DialogueFont;
  backlog: BacklogEntry[];
  saveSlots: (SaveSlot | null)[];
  quickSaveSlot: SaveSlot | null;

  setAutoMode: (v: boolean) => void;
  toggleAutoMode: () => void;
  setSkipMode: (v: boolean) => void;
  toggleSkipMode: () => void;
  setHideUi: (v: boolean) => void;
  toggleHideUi: () => void;
  setLineTyping: (v: boolean) => void;
  setTextSpeed: (speed: TextSpeed) => void;
  cycleDialogueFont: () => void;

  pushBacklog: (entry: BacklogEntry) => void;
  clearBacklog: () => void;

  saveToSlot: (slotIndex: number, progress: StoryProgress, evidence: GameData['evidence'], scene: string, screenshot?: string) => void;
  loadFromSlot: (slotIndex: number) => SaveSlot | null;
  quickSave: (progress: StoryProgress, evidence: GameData['evidence'], scene: string) => void;
  quickLoad: () => SaveSlot | null;
}

const SAVE_STORAGE_KEY = 'clb_vn_saves_v1';
const QUICK_SAVE_KEY = 'clb_vn_quicksave_v1';

function loadStoredSlots(): (SaveSlot | null)[] {
  if (typeof window === 'undefined') return [null, null, null, null, null, null];
  try {
    const raw = localStorage.getItem(SAVE_STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    // fallback
  }
  return [null, null, null, null, null, null];
}

function loadQuickSave(): SaveSlot | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(QUICK_SAVE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    // fallback
  }
  return null;
}

export const useVnStore = create<VnState>((set, get) => ({
  autoMode: false,
  skipMode: false,
  hideUi: false,
  lineTyping: false,
  textSpeed: 'normal',
  dialogueFont: (typeof window !== 'undefined' && (localStorage.getItem('clb_vn_font') as DialogueFont)) || 'source-serif',
  backlog: [],
  saveSlots: loadStoredSlots(),
  quickSaveSlot: loadQuickSave(),

  setAutoMode: (autoMode) => set({ autoMode, skipMode: false }),
  toggleAutoMode: () => set((s) => ({ autoMode: !s.autoMode, skipMode: false })),
  setSkipMode: (skipMode) => set({ skipMode, autoMode: false }),
  toggleSkipMode: () => set((s) => ({ skipMode: !s.skipMode, autoMode: false })),
  setHideUi: (hideUi) => set({ hideUi }),
  toggleHideUi: () => set((s) => ({ hideUi: !s.hideUi })),
  setLineTyping: (lineTyping) => set({ lineTyping }),
  setTextSpeed: (textSpeed) => set({ textSpeed }),
  cycleDialogueFont: () => {
    const fonts: DialogueFont[] = ['source-serif', 'dancing-script', 'playwrite-vn', 'be-vietnam-pro'];
    set((s) => {
      const idx = fonts.indexOf(s.dialogueFont);
      const nextFont = fonts[(idx + 1) % fonts.length] ?? 'source-serif';
      if (typeof window !== 'undefined') {
        localStorage.setItem('clb_vn_font', nextFont);
      }
      return { dialogueFont: nextFont };
    });
  },

  pushBacklog: (entry) => {
    set((s) => {
      // Tránh trùng lặp câu thoại gần nhất
      const last = s.backlog[s.backlog.length - 1];
      if (last && last.speaker === entry.speaker && last.text === entry.text) {
        return s;
      }
      return { backlog: [...s.backlog, entry].slice(-100) };
    });
  },

  clearBacklog: () => set({ backlog: [] }),

  saveToSlot: (slotIndex, progress, evidence, scene, screenshot) => {
    const now = new Date();
    const dateStr = `${now.toLocaleDateString('vi-VN')} ${now.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}`;
    const partName = progress.currentPart ?? 'intro';
    const slot: SaveSlot = {
      slotIndex,
      date: dateStr,
      part: partName,
      task: progress.task ?? 'Đang điều tra',
      scene,
      thumbnailText: `${partName.toUpperCase()} · ${scene}`,
      screenshot,
      progress,
      evidence,
    };

    set((s) => {
      const next = [...s.saveSlots];
      next[slotIndex] = slot;
      try {
        localStorage.setItem(SAVE_STORAGE_KEY, JSON.stringify(next));
      } catch {
        // ignore
      }
      return { saveSlots: next };
    });
  },

  loadFromSlot: (slotIndex) => {
    const slots = get().saveSlots;
    return slots[slotIndex] ?? null;
  },

  quickSave: (progress, evidence, scene) => {
    const now = new Date();
    const dateStr = `${now.toLocaleDateString('vi-VN')} ${now.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}`;
    const slot: SaveSlot = {
      slotIndex: -1,
      date: dateStr,
      part: progress.currentPart ?? 'intro',
      task: progress.task ?? 'Lưu nhanh',
      scene,
      thumbnailText: `Q.SAVE · ${scene}`,
      progress,
      evidence,
    };

    set({ quickSaveSlot: slot });
    try {
      localStorage.setItem(QUICK_SAVE_KEY, JSON.stringify(slot));
    } catch {
      // ignore
    }
  },

  quickLoad: () => {
    return get().quickSaveSlot;
  },
}));
