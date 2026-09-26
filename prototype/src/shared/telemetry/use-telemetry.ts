/** Hook React đọc telemetry (bảng người quan sát): vẽ lại khi có sự kiện mới / xóa / đổi phiên. */
import { useSyncExternalStore } from 'react';
import type { TelemetryStorageStatus } from './local-sink';
import { getTelemetrySink, getTelemetryVersion, subscribeTelemetry } from './track';

export function useTelemetryVersion(): number {
  return useSyncExternalStore(subscribeTelemetry, getTelemetryVersion, getTelemetryVersion);
}

/** Trạng thái lưu của nơi lưu hiện tại; `null` khi đang dùng nơi lưu trong bộ nhớ (test). */
export function getTelemetryStorageStatus(): TelemetryStorageStatus | null {
  const sink = getTelemetrySink() as Partial<{ status: () => TelemetryStorageStatus }>;
  try {
    return typeof sink.status === 'function' ? sink.status() : null;
  } catch {
    return null;
  }
}
