/**
 * Bảng người quan sát (QĐ-030) — chỉ hiện khi URL có `?facilitator=1`; người chơi không thấy.
 * Vị trí hiện tại, số sự kiện, trạng thái lưu, xuất/xóa dữ liệu thử nghiệm (JSON), đặt lại phiên.
 * Props đã chốt; phần telemetry đọc thẳng từ `shared/telemetry`.
 */
import { useState } from 'react';
import { partName } from '../shared/display-names';
import type { PartId } from '../shared/ids';
import { buildTelemetryExport, downloadJson, exportFileName } from '../shared/telemetry/export';
import { clearTelemetry, getSessionId, getTelemetryEvents } from '../shared/telemetry/track';
import { getTelemetryStorageStatus, useTelemetryVersion } from '../shared/telemetry/use-telemetry';
import { ConfirmDialog } from '../shared/ui/ConfirmDialog';
import { storageMessage, viewLabel } from './facilitator-mode';

export interface FacilitatorPanelProps {
  part: PartId | null;
  sequenceId: string | null;
  nodeIndex: number | null;
  viewKind: string | null;
  eventCount: number;
  onReset: () => void;
}

export function FacilitatorPanel({ part, sequenceId, nodeIndex, viewKind, eventCount, onReset }: FacilitatorPanelProps) {
  useTelemetryVersion(); // vẽ lại khi có sự kiện mới / xóa / đổi phiên
  const [open, setOpen] = useState(false);
  const [confirm, setConfirm] = useState<'clear' | 'reset' | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const events = getTelemetryEvents();
  const sessionId = getSessionId();
  const sessionIds = [...new Set(events.map((e) => e.sessionId))];
  const currentCount = events.filter((e) => e.sessionId === sessionId).length;
  const status = getTelemetryStorageStatus();
  const storage = storageMessage(status);
  const hasUnreadable = (status?.unreadableSessions ?? 0) > 0;
  const partText = part ? `${partName(part)} (${part})` : 'Chưa bắt đầu';
  const viewText = viewKind ? `${viewLabel(viewKind)} (${viewKind})` : '—';

  const exportNow = () => {
    const now = Date.now();
    const data = buildTelemetryExport(events, now);
    const name = exportFileName(now, data.sessionCount);
    setNotice(downloadJson(name, data) ? `Đã tạo tệp ${name}.` : 'Trình duyệt không cho tải tệp về. Thử trình duyệt khác.');
  };

  return (
    <aside className={`facilitator${open ? ' facilitator--open' : ''}`} aria-label="Bảng người quan sát">
      <div className="facilitator__bar">
        <p className="facilitator__brief">
          <strong>Người quan sát</strong> · {part ? partName(part) : 'Chưa bắt đầu'} · {viewKind ? viewLabel(viewKind) : '—'} · {currentCount} sự kiện
        </p>
        <button
          type="button"
          className="btn facilitator__toggle"
          aria-expanded={open}
          aria-controls="facilitator-body"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? 'Thu gọn bảng' : 'Mở bảng'}
        </button>
      </div>

      {open ? (
        <div id="facilitator-body" className="facilitator__body">
          <section aria-labelledby="fac-pos">
            <h2 id="fac-pos" className="facilitator__h">
              Vị trí hiện tại
            </h2>
            <dl className="facilitator__grid">
              <dt>Phần</dt>
              <dd>{partText}</dd>
              <dt>Chuỗi</dt>
              <dd className="mono">{sequenceId ?? '—'}</dd>
              <dt>Node</dt>
              <dd className="mono">{nodeIndex ?? '—'}</dd>
              <dt>Màn</dt>
              <dd>{viewText}</dd>
              <dt>Phiên</dt>
              <dd>
                <span className="mono">{sessionId.slice(0, 8)}</span> · {currentCount} sự kiện
              </dd>
              <dt>Tất cả</dt>
              <dd>
                {sessionIds.length} phiên · {Math.max(eventCount, events.length)} sự kiện
              </dd>
            </dl>
            <p className={`facilitator__storage facilitator__storage--${storage.tone}`} role={storage.tone === 'error' ? 'alert' : undefined}>
              {storage.text}
              {status && status.unreadableSessions > 0 ? ` Có ${status.unreadableSessions} phiên hỏng không đọc được (bỏ qua).` : ''}
            </p>
          </section>

          <section aria-labelledby="fac-data" className="facilitator__section">
            <h2 id="fac-data" className="facilitator__h">
              Dữ liệu thử nghiệm
            </h2>
            <div className="facilitator__actions">
              <button type="button" className="btn btn--primary" onClick={exportNow} disabled={events.length === 0}>
                Xuất dữ liệu thử nghiệm (JSON)
              </button>
              <button type="button" className="btn" onClick={() => setConfirm('clear')} disabled={events.length === 0 && !hasUnreadable}>
                Xóa dữ liệu thử nghiệm
              </button>
              <button type="button" className="btn" onClick={() => setConfirm('reset')}>
                Đặt lại phiên
              </button>
            </div>
            {events.length === 0 ? <p className="facilitator__muted">Chưa có phiên nào trong trình duyệt này.</p> : null}
            {notice ? (
              <p className="facilitator__muted" role="status">
                {notice}
              </p>
            ) : null}
          </section>
        </div>
      ) : null}

      <ConfirmDialog
        open={confirm === 'clear'}
        title="Xóa dữ liệu thử nghiệm?"
        message={`Xóa ${events.length} sự kiện của ${sessionIds.length} phiên khỏi trình duyệt này. Hãy xuất JSON trước. Không thể hoàn tác.`}
        confirmLabel="Xóa dữ liệu"
        onConfirm={() => {
          setConfirm(null);
          clearTelemetry();
          setNotice('Đã xóa dữ liệu thử nghiệm trong trình duyệt này.');
        }}
        onCancel={() => setConfirm(null)}
      />
      <ConfirmDialog
        open={confirm === 'reset'}
        title="Đặt lại phiên?"
        message="Xóa tiến độ chơi hiện tại và quay về màn tiêu đề với một phiên mới. Dữ liệu thử nghiệm đã ghi vẫn giữ nguyên."
        confirmLabel="Đặt lại phiên"
        onConfirm={() => {
          setConfirm(null);
          setNotice(null);
          onReset();
        }}
        onCancel={() => setConfirm(null)}
      />
    </aside>
  );
}
