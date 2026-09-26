/**
 * Ghi chú theo phiên, nằm NGOÀI dòng sự kiện (union `events.ts` giữ nguyên): hiện chỉ có dấu
 * "người quan sát đã nhảy phần" kèm khoảng thời gian game tự chơi, để tóm tắt loại các sự kiện tự
 * động đó khỏi số liệu thật. Lưu cùng khóa có phiên bản với telemetry; "Xóa dữ liệu" xóa luôn.
 */
import type { PartId } from '../ids';
import { TELEMETRY_KEY_PREFIX } from './local-sink';

export const SESSION_META_KEY = `${TELEMETRY_KEY_PREFIX}:meta`;

export interface JumpMark {
  target: PartId;
  /** Lúc bắt đầu / kết thúc tự chơi (để hiển thị). */
  startAt: number;
  endAt: number;
  /**
   * Sự kiện thứ [fromIndex, toIndex) của phiên (theo thứ tự ghi) là do game tự chơi. Dùng chỉ số
   * thay cho thời gian: không lẫn sự kiện thật ghi cùng mili-giây với lúc bắt đầu nhảy.
   */
  fromIndex: number;
  toIndex: number;
  /** false khi tự chơi dừng giữa chừng (không tới được đầu phần). */
  ok: boolean;
}

export interface SessionMeta {
  jumps: JumpMark[];
}

export type SessionMetaMap = Record<string, SessionMeta>;

let storage: Storage | null = null;
let memory: SessionMetaMap = {};

function read(): SessionMetaMap {
  if (!storage) return memory;
  try {
    const raw = storage.getItem(SESSION_META_KEY);
    if (!raw) return memory;
    const parsed: unknown = JSON.parse(raw);
    if (typeof parsed === 'object' && parsed !== null && !Array.isArray(parsed)) memory = parsed as SessionMetaMap;
  } catch {
    /* hỏng/không đọc được → dùng bản trong bộ nhớ */
  }
  return memory;
}

/** Nơi lưu ghi chú phiên (setup.ts gọi với localStorage; test gọi với Storage giả hoặc null). */
export function configureSessionMeta(s: Storage | null): void {
  storage = s;
  memory = {};
  read();
}

export function getSessionMeta(): SessionMetaMap {
  return read();
}

export function recordJump(sessionId: string, mark: JumpMark): void {
  const all = { ...read() };
  const cur = all[sessionId] ?? { jumps: [] };
  all[sessionId] = { jumps: [...cur.jumps, mark] };
  memory = all;
  if (!storage) return;
  try {
    storage.setItem(SESSION_META_KEY, JSON.stringify(all));
  } catch {
    /* không lưu được: vẫn còn trong bộ nhớ của tab; bảng người quan sát báo lỗi lưu chung */
  }
}

/** Xóa cùng lúc với "Xóa dữ liệu thử nghiệm" (khóa này cũng mang tiền tố telemetry). */
export function clearSessionMeta(): void {
  memory = {};
  if (!storage) return;
  try {
    storage.removeItem(SESSION_META_KEY);
  } catch {
    /* bỏ qua */
  }
}
