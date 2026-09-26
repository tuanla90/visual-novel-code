/**
 * STUB — gói `giai-trinh-ui` (gói 6) thay bằng màn chiếu chạy SQL thật (deb-01: 24 dòng;
 * deb-03: 2 dòng) qua engine của gói sql-engine. Props đã chốt.
 */
import type { SavedQueryEvidence } from '../../evidence/types';
import type { ProjectorSpec } from '../types';

export interface ProjectorProps {
  spec: ProjectorSpec;
  /** Vật chứng nguồn khi `spec.source.kind === 'evidence'` (undefined nếu chưa lưu). */
  evidence: SavedQueryEvidence | undefined;
  onClose: () => void;
}

export function Projector({ spec, evidence, onClose }: ProjectorProps) {
  const sql = spec.source.kind === 'sql' ? spec.source.sql : evidence?.sql;
  return (
    <div className="stub stub--projector" role="region" aria-label="Màn chiếu">
      <p className="stub__tag">Màn chiếu (stub — gói giai-trinh-ui)</p>
      {sql ? <pre className="stub__sql mono">{sql}</pre> : <p>Chưa có câu SQL để chiếu: vật chứng nguồn chưa được lưu.</p>}
      <p className="stub__meta">
        {spec.run ? 'Sẽ chạy thật trên dataset chính' : 'Chỉ hiện SQL, không chạy'}
        {spec.expectedRowCount !== undefined ? ` · kịch bản kỳ vọng ${spec.expectedRowCount} dòng` : ''}
        {spec.caption ? ` · ${spec.caption}` : ''}
      </p>
      <button type="button" className="btn btn--primary" onClick={onClose} autoFocus>
        Tiếp tục (stub)
      </button>
    </div>
  );
}
