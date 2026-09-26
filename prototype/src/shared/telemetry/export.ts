/**
 * Xuất telemetry ra tệp JSON (QĐ-030): mọi phiên trong trình duyệt này, kèm phiên bản khóa lưu
 * và thời điểm xuất. Chỉ tạo tệp tải về trên máy — không gửi mạng.
 */
import type { TelemetryEvent } from './events';
import { TELEMETRY_STORAGE_VERSION } from './local-sink';

export const TELEMETRY_EXPORT_FORMAT = 'clb-tham-tu-du-lieu/telemetry';

export interface TelemetryExportSession {
  sessionId: string;
  eventCount: number;
  firstAt: number | null;
  lastAt: number | null;
  events: TelemetryEvent[];
}

export interface TelemetryExport {
  format: typeof TELEMETRY_EXPORT_FORMAT;
  /** Phiên bản cấu trúc khóa localStorage (`...:telemetry:v<n>`). */
  storageVersion: number;
  /** Thời điểm xuất, ISO 8601 (giờ UTC) và mili-giây. */
  exportedAt: string;
  exportedAtMs: number;
  sessionCount: number;
  eventCount: number;
  sessions: TelemetryExportSession[];
  /** Phần phụ do nơi gọi thêm (ví dụ tóm tắt chỉ số §10). */
  [extra: string]: unknown;
}

/** Nhóm sự kiện theo phiên, giữ thứ tự xuất hiện của phiên và của sự kiện. */
export function groupBySession(events: readonly TelemetryEvent[]): Map<string, TelemetryEvent[]> {
  const out = new Map<string, TelemetryEvent[]>();
  for (const e of events) {
    const list = out.get(e.sessionId);
    if (list) list.push(e);
    else out.set(e.sessionId, [e]);
  }
  return out;
}

export function buildTelemetryExport(
  events: readonly TelemetryEvent[],
  nowMs: number,
  extra: Record<string, unknown> = {},
): TelemetryExport {
  const sessions: TelemetryExportSession[] = [...groupBySession(events)].map(([sessionId, list]) => ({
    sessionId,
    eventCount: list.length,
    firstAt: list[0]?.at ?? null,
    lastAt: list.at(-1)?.at ?? null,
    events: list,
  }));
  return {
    format: TELEMETRY_EXPORT_FORMAT,
    storageVersion: TELEMETRY_STORAGE_VERSION,
    exportedAt: new Date(nowMs).toISOString(),
    exportedAtMs: nowMs,
    sessionCount: sessions.length,
    eventCount: events.length,
    sessions,
    ...extra,
  };
}

/** `telemetry-<yyyy-mm-dd>-<số phiên>-phien.json`, ngày theo giờ máy (giờ địa phương). */
export function exportFileName(nowMs: number, sessionCount: number): string {
  const d = new Date(nowMs);
  const pad = (n: number) => String(n).padStart(2, '0');
  return `telemetry-${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}-${sessionCount}-phien.json`;
}

/** Cho trình duyệt tải tệp JSON về máy. Trả về false nếu trình duyệt không cho tạo tệp. */
export function downloadJson(fileName: string, data: unknown): boolean {
  try {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.rel = 'noopener';
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    a.remove();
    // Trả URL sau một nhịp để trình duyệt kịp bắt đầu tải.
    setTimeout(() => URL.revokeObjectURL(url), 1_000);
    return true;
  } catch {
    return false;
  }
}
