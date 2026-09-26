/**
 * STUB — gói `telemetry` (gói 8) thay bằng bảng người quan sát đầy đủ (QĐ-030: nhảy phần,
 * xuất/xóa telemetry JSON, đặt lại phiên). Chỉ hiện khi URL có `?facilitator=1`. Props đã chốt.
 */
import { partName } from '../shared/display-names';
import type { PartId } from '../shared/ids';

export interface FacilitatorPanelProps {
  part: PartId | null;
  sequenceId: string | null;
  nodeIndex: number | null;
  viewKind: string | null;
  eventCount: number;
  onReset: () => void;
}

export function FacilitatorPanel({ part, sequenceId, nodeIndex, viewKind, eventCount, onReset }: FacilitatorPanelProps) {
  return (
    <aside className="facilitator" aria-label="Bảng người quan sát">
      <p className="stub__tag">Bảng người quan sát (stub — gói telemetry)</p>
      <dl className="facilitator__grid">
        <dt>Phần</dt>
        <dd>{part ? partName(part) : 'Chưa bắt đầu'}</dd>
        <dt>Chuỗi</dt>
        <dd className="mono">{sequenceId ?? '—'}</dd>
        <dt>Node</dt>
        <dd className="mono">{nodeIndex ?? '—'}</dd>
        <dt>Khung nhìn</dt>
        <dd className="mono">{viewKind ?? '—'}</dd>
        <dt>Sự kiện</dt>
        <dd>{eventCount}</dd>
      </dl>
      <button type="button" className="btn" onClick={onReset}>
        Đặt lại phiên
      </button>
    </aside>
  );
}
