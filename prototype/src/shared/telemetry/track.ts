/**
 * API ghi sự kiện. Mặc định (test, hoặc trước khi khởi động) là mảng trong bộ nhớ;
 * `installPersistentTelemetry()` (setup.ts, gọi ở main.tsx) cắm nơi lưu localStorage (QĐ-029).
 * Chữ ký `track()` giữ nguyên để mọi nơi gọi không phải đổi.
 */
import type { TelemetryEvent, TelemetryEventBody } from './events';

export interface TelemetrySink {
  write(event: TelemetryEvent): void;
  readAll(): TelemetryEvent[];
  clear(): void;
}

/** Nơi giữ mã phiên hiện tại qua F5 (xem `createSessionIdStore`). */
export interface SessionIdStore {
  load(): string | null;
  save(id: string): void;
}

function randomSessionId(): string {
  const c = globalThis.crypto;
  if (c && typeof c.randomUUID === 'function') return c.randomUUID();
  return `s-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

class MemorySink implements TelemetrySink {
  private events: TelemetryEvent[] = [];
  write(event: TelemetryEvent): void {
    this.events.push(event);
    if (typeof console !== 'undefined' && !isTestRuntime()) {
      console.debug('[telemetry]', event.type, event);
    }
  }
  readAll(): TelemetryEvent[] {
    return [...this.events];
  }
  clear(): void {
    this.events = [];
  }
}

function isTestRuntime(): boolean {
  const g = globalThis as { process?: { env?: Record<string, string | undefined> } };
  return g.process?.env?.VITEST === 'true';
}

/** Nơi lưu trong bộ nhớ (mặc định; test dùng để trả lại trạng thái ban đầu). */
export function createMemorySink(): TelemetrySink {
  return new MemorySink();
}

let sink: TelemetrySink = new MemorySink();
let sessionId = randomSessionId();
let clock: () => number = () => Date.now();
let sessionIdStore: SessionIdStore | null = null;

/** Ghi một sự kiện. Không bao giờ ném lỗi: telemetry hỏng thì game vẫn chạy. */
export function track(event: TelemetryEventBody): TelemetryEvent {
  const full: TelemetryEvent = { ...event, at: clock(), sessionId };
  try {
    sink.write(full);
  } catch (err) {
    if (typeof console !== 'undefined' && !isTestRuntime()) console.warn('[telemetry] Không ghi được sự kiện', err);
  }
  return full;
}

/** Mọi sự kiện của mọi phiên trong trình duyệt này (theo thứ tự phiên, rồi thời gian). */
export function getTelemetryEvents(): TelemetryEvent[] {
  try {
    return sink.readAll();
  } catch {
    return [];
  }
}

export function clearTelemetry(): void {
  try {
    sink.clear();
  } catch {
    /* Không xóa được: bảng người quan sát đọc trạng thái lưu để báo. */
  }
}

/** Nơi lưu hiện tại (bảng người quan sát đọc trạng thái lỗi lưu nếu có). */
export function getTelemetrySink(): TelemetrySink {
  return sink;
}

export function getSessionId(): string {
  return sessionId;
}

/** Bắt đầu phiên ẩn danh mới (khi "Chơi lại từ đầu"). */
export function newTelemetrySession(): string {
  sessionId = randomSessionId();
  sessionIdStore?.save(sessionId);
  return sessionId;
}

/**
 * Điểm cắm cho gói telemetry / test: thay nơi lưu, đồng hồ, nơi giữ mã phiên.
 * Có `sessionIdStore` → dùng lại mã phiên đã lưu (F5 giữ phiên), chưa có thì lưu mã hiện tại.
 */
export function configureTelemetry(options: {
  sink?: TelemetrySink;
  clock?: () => number;
  sessionIdStore?: SessionIdStore | null;
}): void {
  if (options.sink) sink = options.sink;
  if (options.clock) clock = options.clock;
  if (options.sessionIdStore !== undefined) {
    sessionIdStore = options.sessionIdStore;
    const saved = sessionIdStore?.load() ?? null;
    if (saved) sessionId = saved;
    else sessionIdStore?.save(sessionId);
  }
}
