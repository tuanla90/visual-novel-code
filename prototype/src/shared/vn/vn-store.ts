/**
 * Store điều khiển cơ chế Visual Novel:
 * Auto, Skip, Backlog, Hide UI, Save/Load slots.
 *
 * Ô lưu nằm trong sessionStorage như tiến độ chính (QĐ-004): máy thử nghiệm dùng chung cho nhiều người,
 * lưu ở localStorage thì người sau nạp được tiến độ của người trước và trộn hai phiên telemetry.
 */
import { create } from 'zustand';
import type { StoryProgress } from '../../story/engine/state';
import { STORE_VERSION, type GameData } from '../store/store';
import { track } from '../telemetry/track';

export interface BacklogEntry {
  id: string;
  speaker: string;
  speakerName: string;
  text: string;
  partName?: string;
}

/** Phần dữ liệu game được chụp vào ô lưu (đủ để khôi phục đúng trạng thái, kể cả thử thách SQL). */
export type SaveSnapshot = Pick<GameData, 'evidence' | 'challenges'> & { progress: StoryProgress };

export interface SaveSlot extends SaveSnapshot {
  version: number;
  slotIndex: number;
  date: string;
  part: string;
  task: string;
  scene: string;
  thumbnailText: string;
}

export type TextSpeed = 'slow' | 'normal' | 'fast' | 'instant';

export const SPEED_MS: Record<TextSpeed, number> = {
  slow: 35,
  normal: 20,
  fast: 10,
  instant: 0,
};

export const SAVE_SLOT_COUNT = 6;

interface VnState {
  autoMode: boolean;
  skipMode: boolean;
  hideUi: boolean;
  textSpeed: TextSpeed;
  backlog: BacklogEntry[];
  /** Khóa các lời thoại đã đọc hết (người nói + nội dung) — Skip chỉ tua qua những lời này. */
  readLines: Record<string, true>;
  /** Nhân vật đã có màn giới thiệu — lưu trong phiên để F5 không giới thiệu lại. */
  seenDebuts: string[];
  saveSlots: (SaveSlot | null)[];
  quickSaveSlot: SaveSlot | null;

  setAutoMode: (v: boolean) => void;
  toggleAutoMode: () => void;
  setSkipMode: (v: boolean) => void;
  toggleSkipMode: () => void;
  setHideUi: (v: boolean) => void;
  toggleHideUi: () => void;
  setTextSpeed: (speed: TextSpeed) => void;

  pushBacklog: (entry: BacklogEntry) => void;
  clearBacklog: () => void;
  markRead: (key: string) => void;
  markDebutSeen: (character: string) => void;

  saveToSlot: (slotIndex: number, snapshot: SaveSnapshot, scene: string) => void;
  loadFromSlot: (slotIndex: number) => SaveSlot | null;
  quickSave: (snapshot: SaveSnapshot, scene: string) => void;
  quickLoad: () => SaveSlot | null;

  /** Chơi lại từ đầu (phiên telemetry mới): xóa lịch sử thoại, thoại đã đọc, nhân vật đã giới thiệu, chế độ tự chạy và ô lưu. */
  resetSession: () => void;
}

export function readLineKey(speaker: string, text: string): string {
  return `${speaker}\u0000${text}`;
}

const SAVE_STORAGE_KEY = 'clb_vn_saves_v2';
const QUICK_SAVE_KEY = 'clb_vn_quicksave_v2';
const SESSION_KEY = 'clb_vn_session_v1';
/** Tùy chọn cá nhân (không phải tiến độ) → localStorage như cài đặt âm thanh. */
const PREFS_KEY = 'clb_vn_prefs_v1';

const TEXT_SPEEDS: readonly TextSpeed[] = ['slow', 'normal', 'fast', 'instant'];

function loadTextSpeed(): TextSpeed {
  try {
    const raw = typeof localStorage !== 'undefined' ? localStorage.getItem(PREFS_KEY) : null;
    const parsed: unknown = raw ? JSON.parse(raw) : null;
    const v = (parsed as { textSpeed?: unknown } | null)?.textSpeed;
    if (typeof v === 'string' && (TEXT_SPEEDS as readonly string[]).includes(v)) return v as TextSpeed;
  } catch {
    // bỏ qua
  }
  return 'normal';
}

function saveTextSpeed(textSpeed: TextSpeed): void {
  try {
    localStorage.setItem(PREFS_KEY, JSON.stringify({ textSpeed }));
  } catch {
    // bỏ qua
  }
}

interface SessionData {
  readLines: Record<string, true>;
  seenDebuts: string[];
}

function loadSession(): SessionData {
  try {
    const raw = storage()?.getItem(SESSION_KEY);
    const parsed: unknown = raw ? JSON.parse(raw) : null;
    if (parsed && typeof parsed === 'object') {
      const o = parsed as Record<string, unknown>;
      const readLines = o.readLines && typeof o.readLines === 'object' ? (o.readLines as Record<string, true>) : {};
      const seenDebuts = Array.isArray(o.seenDebuts) ? o.seenDebuts.filter((x): x is string => typeof x === 'string') : [];
      return { readLines, seenDebuts };
    }
  } catch {
    // bỏ qua
  }
  return { readLines: {}, seenDebuts: [] };
}

function storage(): Storage | null {
  try {
    return typeof sessionStorage !== 'undefined' ? sessionStorage : null;
  } catch {
    return null;
  }
}

function isSaveSlot(x: unknown): x is SaveSlot {
  if (typeof x !== 'object' || x === null) return false;
  const o = x as Record<string, unknown>;
  return (
    o.version === STORE_VERSION &&
    typeof o.progress === 'object' && o.progress !== null &&
    typeof o.evidence === 'object' && o.evidence !== null &&
    typeof o.challenges === 'object' && o.challenges !== null
  );
}

function emptySlots(): (SaveSlot | null)[] {
  return Array.from({ length: SAVE_SLOT_COUNT }, () => null);
}

function loadStoredSlots(): (SaveSlot | null)[] {
  try {
    const raw = storage()?.getItem(SAVE_STORAGE_KEY);
    const parsed: unknown = raw ? JSON.parse(raw) : null;
    if (Array.isArray(parsed)) {
      return emptySlots().map((_, i) => (isSaveSlot(parsed[i]) ? (parsed[i] as SaveSlot) : null));
    }
  } catch {
    // dữ liệu hỏng → bỏ qua
  }
  return emptySlots();
}

function loadQuickSave(): SaveSlot | null {
  try {
    const raw = storage()?.getItem(QUICK_SAVE_KEY);
    const parsed: unknown = raw ? JSON.parse(raw) : null;
    return isSaveSlot(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

function writeStorage(key: string, value: unknown): void {
  try {
    const s = storage();
    if (!s) return;
    if (value === null) s.removeItem(key);
    else s.setItem(key, JSON.stringify(value));
  } catch {
    // đầy bộ nhớ / bị chặn → bỏ qua
  }
}

function makeSlot(slotIndex: number, snapshot: SaveSnapshot, scene: string, label: string): SaveSlot {
  const now = new Date();
  const date = `${now.toLocaleDateString('vi-VN')} ${now.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}`;
  const part = snapshot.progress.currentPart ?? 'intro';
  return {
    // Chụp bản sao để các thay đổi sau đó của store không lọt vào ô lưu.
    ...structuredClone(snapshot),
    version: STORE_VERSION,
    slotIndex,
    date,
    part,
    task: snapshot.progress.task ?? 'Đang điều tra',
    scene,
    thumbnailText: `${label} · ${scene}`,
  };
}

const initialSession = loadSession();

export const useVnStore = create<VnState>((set, get) => ({
  autoMode: false,
  skipMode: false,
  hideUi: false,
  textSpeed: loadTextSpeed(),
  backlog: [],
  readLines: initialSession.readLines,
  seenDebuts: initialSession.seenDebuts,
  saveSlots: loadStoredSlots(),
  quickSaveSlot: loadQuickSave(),

  setAutoMode: (autoMode) => set({ autoMode, skipMode: false }),
  toggleAutoMode: () => {
    const on = !get().autoMode;
    set({ autoMode: on, skipMode: false });
    track({ type: 'vn_mode_toggled', mode: 'auto', on });
  },
  setSkipMode: (skipMode) => set({ skipMode, autoMode: false }),
  toggleSkipMode: () => {
    const on = !get().skipMode;
    set({ skipMode: on, autoMode: false });
    track({ type: 'vn_mode_toggled', mode: 'skip', on });
  },
  setHideUi: (hideUi) => set({ hideUi }),
  toggleHideUi: () => set((s) => ({ hideUi: !s.hideUi })),
  setTextSpeed: (textSpeed) => {
    if (textSpeed === get().textSpeed) return;
    saveTextSpeed(textSpeed);
    track({ type: 'text_speed_changed', speed: textSpeed });
    set({ textSpeed });
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

  markRead: (key) => {
    if (get().readLines[key]) return;
    const readLines: Record<string, true> = { ...get().readLines, [key]: true };
    writeStorage(SESSION_KEY, { readLines, seenDebuts: get().seenDebuts });
    set({ readLines });
  },

  markDebutSeen: (character) => {
    if (get().seenDebuts.includes(character)) return;
    const seenDebuts = [...get().seenDebuts, character];
    writeStorage(SESSION_KEY, { readLines: get().readLines, seenDebuts });
    set({ seenDebuts });
  },

  saveToSlot: (slotIndex, snapshot, scene) => {
    const slot = makeSlot(slotIndex, snapshot, scene, (snapshot.progress.currentPart ?? 'intro').toUpperCase());
    const next = [...get().saveSlots];
    next[slotIndex] = slot;
    writeStorage(SAVE_STORAGE_KEY, next);
    set({ saveSlots: next });
    track({ type: 'progress_saved', slot: slotIndex, part: snapshot.progress.currentPart ?? null });
  },

  loadFromSlot: (slotIndex) => get().saveSlots[slotIndex] ?? null,

  quickSave: (snapshot, scene) => {
    const slot = makeSlot(-1, snapshot, scene, 'Q.SAVE');
    writeStorage(QUICK_SAVE_KEY, slot);
    set({ quickSaveSlot: slot });
  },

  quickLoad: () => get().quickSaveSlot,

  resetSession: () => {
    writeStorage(SAVE_STORAGE_KEY, null);
    writeStorage(QUICK_SAVE_KEY, null);
    writeStorage(SESSION_KEY, null);
    set({ autoMode: false, skipMode: false, hideUi: false, backlog: [], readLines: {}, seenDebuts: [], saveSlots: emptySlots(), quickSaveSlot: null });
  },
}));
