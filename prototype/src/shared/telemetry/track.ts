/**
 * API ghi sự kiện. Hiện thực TẠM (gói nen-mong): mảng trong bộ nhớ + console.debug.
 * Gói `telemetry` (gói 8) thay `TelemetrySink` bằng localStorage + xuất JSON; giữ nguyên
 * chữ ký `track()` để mọi nơi gọi không phải đổi.
 */
import type { TelemetryEvent, TelemetryEventBody } from './events';

export interface TelemetrySink {
  write(event: TelemetryEvent): void;
  readAll(): TelemetryEvent[];
  clear(): void;
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

let sink: TelemetrySink = new MemorySink();
let sessionId = randomSessionId();
let clock: () => number = () => Date.now();

export function track(event: TelemetryEventBody): TelemetryEvent {
  const full: TelemetryEvent = { ...event, at: clock(), sessionId };
  sink.write(full);
  return full;
}

export function getTelemetryEvents(): TelemetryEvent[] {
  return sink.readAll();
}

export function clearTelemetry(): void {
  sink.clear();
}

export function getSessionId(): string {
  return sessionId;
}

/** Bắt đầu phiên ẩn danh mới (khi "Chơi lại từ đầu"). */
export function newTelemetrySession(): string {
  sessionId = randomSessionId();
  return sessionId;
}

/** Điểm cắm cho gói telemetry / test: thay nơi lưu và đồng hồ. */
export function configureTelemetry(options: { sink?: TelemetrySink; clock?: () => number }): void {
  if (options.sink) sink = options.sink;
  if (options.clock) clock = options.clock;
}
