/** Nút "Xuất dữ liệu thử nghiệm": gom mọi phiên + ghi chú phiên + tóm tắt §10, tải về một tệp JSON. */
import { buildTelemetryExport, downloadJson, exportFileName } from './export';
import { getSessionMeta } from './session-meta';
import { summarizeSessions } from './summary';
import { getTelemetryEvents } from './track';

/** Trả về tên tệp đã tạo, hoặc `null` nếu trình duyệt không cho tải tệp. */
export function exportAllTelemetry(nowMs: number = Date.now()): string | null {
  const events = getTelemetryEvents();
  const meta = getSessionMeta();
  const data = buildTelemetryExport(events, nowMs, { sessionMeta: meta, summaries: summarizeSessions(events, meta) });
  const name = exportFileName(nowMs, data.sessionCount);
  return downloadJson(name, data) ? name : null;
}
