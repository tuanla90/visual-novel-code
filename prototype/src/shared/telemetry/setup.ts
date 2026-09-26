/**
 * Khởi động telemetry bền (QĐ-029) — gọi một lần ở main.tsx, trước khi vẽ giao diện.
 * localStorage giữ sự kiện của mọi phiên; sessionStorage giữ mã phiên hiện tại (cùng vòng đời
 * với tiến độ chơi). Trình duyệt chặn bộ nhớ → vẫn chạy, chỉ giữ trong bộ nhớ của tab.
 */
import { createLocalStorageSink, createSessionIdStore, safeBrowserStorage, type PersistentTelemetrySink } from './local-sink';
import { configureTelemetry } from './track';

export function installPersistentTelemetry(
  storages: { local: Storage | null; session: Storage | null } = {
    local: safeBrowserStorage('localStorage'),
    session: safeBrowserStorage('sessionStorage'),
  },
): PersistentTelemetrySink {
  const sink = createLocalStorageSink({ storage: storages.local });
  configureTelemetry({ sink, sessionIdStore: createSessionIdStore(storages.session) });
  return sink;
}
