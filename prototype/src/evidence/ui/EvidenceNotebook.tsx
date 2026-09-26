/**
 * Hồ sơ vật chứng — bản TẠM chức năng (ngăn kéo bên phải). Gói `hinh-giao-dien` làm đẹp
 * theo tông giấy (QĐ-026) nhưng GIỮ props này. Ba nhóm: Manh mối · Tài liệu · Kết quả truy vấn.
 * "Câu hỏi còn mở" / "Lưu ý" theo phần (QĐ-037); chú thích gắn sau + làm mờ (end-03).
 */
import { useEffect } from 'react';
import type { GameContent } from '../../content/types';
import type { EvidenceId, PartId, QueryEvidenceId } from '../../shared/ids';
import { EVIDENCE_GROUP_LABELS, evidenceGroup, evidenceTitle } from '../labels';
import { cardNoteForPart } from '../notebook';
import type { EvidenceAnnotation, EvidenceGroup, SavedQueryEvidence } from '../types';

export interface EvidenceNotebookProps {
  open: boolean;
  onClose: () => void;
  content: GameContent;
  part: PartId | null;
  unlocked: EvidenceId[];
  savedQueries: Partial<Record<QueryEvidenceId, SavedQueryEvidence>>;
  annotations: EvidenceAnnotation[];
}

const GROUP_ORDER: EvidenceGroup[] = ['clue', 'document', 'query'];

export function EvidenceNotebook({ open, onClose, content, part, unlocked, savedQueries, annotations }: EvidenceNotebookProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent): void => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  const grouped = new Map<EvidenceGroup, EvidenceId[]>();
  for (const id of unlocked) {
    const g = evidenceGroup(id);
    if (!g) continue;
    grouped.set(g, [...(grouped.get(g) ?? []), id]);
  }

  return (
    <aside className="notebook" aria-label="Hồ sơ vật chứng">
      <div className="notebook__head">
        <h2 className="notebook__title">Hồ sơ</h2>
        <button type="button" className="btn" onClick={onClose}>
          Đóng
        </button>
      </div>
      {unlocked.length === 0 ? (
        <p className="notebook__empty">Hồ sơ còn trống: chưa xem xét manh mối hay lưu kết quả truy vấn nào.</p>
      ) : (
        GROUP_ORDER.map((g) => {
          const ids = grouped.get(g) ?? [];
          if (ids.length === 0) return null;
          return (
            <section key={g} className="notebook__group">
              <h3 className="notebook__group-title">{EVIDENCE_GROUP_LABELS[g]}</h3>
              {ids.map((id) => (
                <EvidenceCard key={id} id={id} content={content} part={part} savedQueries={savedQueries} annotations={annotations.filter((a) => a.evidenceId === id)} />
              ))}
            </section>
          );
        })
      )}
    </aside>
  );
}

interface CardProps {
  id: EvidenceId;
  content: GameContent;
  part: PartId | null;
  savedQueries: EvidenceNotebookProps['savedQueries'];
  annotations: EvidenceAnnotation[];
}

function EvidenceCard({ id, content, part, savedQueries, annotations }: CardProps) {
  const group = evidenceGroup(id);
  const redacted = annotations.some((a) => a.redact);
  const title = evidenceTitle(content, id);

  if (group === 'clue') {
    const card = content.evidence.clues[id as keyof typeof content.evidence.clues];
    const note = card ? cardNoteForPart(card, part) : null;
    return (
      <article className="card">
        <h4 className="card__title">{title}</h4>
        {card ? <p className="card__source">Nguồn: {card.source}</p> : null}
        {card ? <p className="card__body">{card.content}</p> : <p className="card__body">Thẻ này chưa có nội dung.</p>}
        {note ? (
          <p className={`card__note card__note--${note.kind}`}>
            <strong>{note.label}:</strong> {note.text}
          </p>
        ) : null}
        <Annotations items={annotations} />
      </article>
    );
  }

  if (group === 'document') {
    const card = content.evidence.documents[id as keyof typeof content.evidence.documents];
    const note = card ? cardNoteForPart(card, part) : null;
    return (
      <article className="card">
        <h4 className="card__title">{title}</h4>
        {card ? <p className="card__source">Nguồn: {card.source}</p> : null}
        {card ? (
          Array.isArray(card.body) ? (
            <blockquote className="card__quote">
              {card.body.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </blockquote>
          ) : (
            <p className="card__body">{card.body}</p>
          )
        ) : (
          <p className="card__body">Thẻ này chưa có nội dung.</p>
        )}
        {card?.extra ? <p className="card__extra">{card.extra}</p> : null}
        {note ? (
          <p className={`card__note card__note--${note.kind}`}>
            <strong>{note.label}:</strong> {note.text}
          </p>
        ) : null}
        <Annotations items={annotations} />
      </article>
    );
  }

  const saved = savedQueries[id as QueryEvidenceId];
  const def = Object.values(content.challenges).find((d) => d.content.evidence.id === id);
  return (
    <article className="card">
      <h4 className="card__title">{title}</h4>
      {def ? <p className="card__body">{def.content.evidence.description}</p> : null}
      {saved ? (
        <>
          {saved.before ? (
            <p className="card__source">
              Trước khi sửa: <code className="mono">{saved.before.sql}</code> — {saved.before.rowCount} dòng
            </p>
          ) : null}
          <pre className="card__sql mono">{saved.sql}</pre>
          <p className="card__source">{saved.rowCount} dòng</p>
          {saved.rows.length > 0 ? (
            <table className={redacted ? 'card__table card__table--redacted' : 'card__table'} aria-label={redacted ? 'Bảng kết quả đã làm mờ' : 'Bảng kết quả'}>
              <thead>
                <tr>
                  {saved.columns.map((c) => (
                    <th key={c}>{c}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {saved.rows.map((r, i) => (
                  <tr key={i}>
                    {r.map((v, j) => (
                      <td key={j}>{v === null ? '' : String(v)}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          ) : null}
        </>
      ) : (
        <p className="card__body">Vật chứng này chưa có bảng kết quả kèm theo (màn thử thách chưa lưu dữ liệu).</p>
      )}
      <Annotations items={annotations} />
    </article>
  );
}

function Annotations({ items }: { items: EvidenceAnnotation[] }) {
  if (items.length === 0) return null;
  return (
    <ul className="card__annotations">
      {items.map((a, i) => (
        <li key={i} className="card__annotation">
          <strong>Chú thích:</strong> {a.note}
        </li>
      ))}
    </ul>
  );
}
