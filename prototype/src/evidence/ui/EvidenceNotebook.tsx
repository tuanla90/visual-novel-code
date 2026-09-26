/**
 * Hồ sơ vật chứng — ngăn kéo bên phải, tông giấy hồ sơ (QĐ-026: kem, ghim, kẹp giấy). Props giữ nguyên.
 * Ba nhóm: Manh mối · Tài liệu · Kết quả truy vấn. "Câu hỏi còn mở" đến hết Phần 4, "Lưu ý" từ Phần 5
 * (QĐ-037). Chữ trong dấu `…` hiển thị dạng chữ mã (QĐ-051, CodeText).
 *
 * Thẻ kết quả truy vấn: câu SQL + bảng thu gọn + số dòng; `ev-quan-fixed` (có `before`) hiện thêm câu
 * trước/sau khi sửa và dải "24 → 2" (số lấy từ dữ liệu đã lưu, không viết cứng).
 * Thẻ đã hủy (chú thích `redact`, end-03 — QĐ-050): KHÔNG render tên/mã ở bảng lẫn mô tả — chỉ còn
 * vạch che + dòng lý do; không dùng `filter: blur` vì chữ vẫn nằm trong DOM.
 */
import { useEffect, useState } from 'react';
import type { GameContent } from '../../content/types';
import type { EvidenceId, PartId, QueryEvidenceId } from '../../shared/ids';
import { CodeText } from '../../shared/ui/CodeText';
import type { SqlValue } from '../../sql-challenge/types';
import { EVIDENCE_GROUP_LABELS, evidenceGroup, evidenceTitle } from '../labels';
import { cardNoteForPart, type CardNote } from '../notebook';
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

/** Số dòng bảng hiện sẵn trên thẻ; dài hơn thì thu gọn, có nút xem đủ. */
const COMPACT_ROWS = 5;

/** Lý do không còn tên/mã trên thẻ đã hủy (QĐ-050). */
const REDACTED_LINE = 'Tên và mã đã hủy khi quyền truy cập kết thúc.';

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
        <h2 className="notebook__title">
          <FolderIcon />
          Hồ sơ
        </h2>
        <button type="button" className="btn" onClick={onClose} title="Đóng hồ sơ (Esc)">
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
            <section key={g} className={`notebook__group notebook__group--${g}`}>
              <h3 className="notebook__group-title">
                {EVIDENCE_GROUP_LABELS[g]} <span className="notebook__group-count">({ids.length})</span>
              </h3>
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

function FolderIcon() {
  return (
    <svg className="notebook__icon" width="24" height="24" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M3 6.5A1.5 1.5 0 0 1 4.5 5h4l2 2h9A1.5 1.5 0 0 1 21 8.5v9a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 17.5z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}

interface CardProps {
  id: EvidenceId;
  content: GameContent;
  part: PartId | null;
  savedQueries: EvidenceNotebookProps['savedQueries'];
  annotations: EvidenceAnnotation[];
}

function Note({ note }: { note: CardNote | null }) {
  if (!note) return null;
  return (
    <p className={`card__note card__note--${note.kind}`}>
      <strong>{note.label}:</strong> <CodeText text={note.text} />
    </p>
  );
}

function EvidenceCard({ id, content, part, savedQueries, annotations }: CardProps) {
  const group = evidenceGroup(id);
  const redacted = annotations.some((a) => a.redact);
  const title = evidenceTitle(content, id);

  if (group === 'clue') {
    const card = content.evidence.clues[id as keyof typeof content.evidence.clues];
    return (
      <article className="card card--clue">
        <span className="card__pin" aria-hidden="true" />
        <h4 className="card__title">{title}</h4>
        {card ? <p className="card__source">Nguồn: {card.source}</p> : null}
        <p className="card__body">{card ? <CodeText text={card.content} /> : 'Thẻ này chưa có nội dung.'}</p>
        <Note note={card ? cardNoteForPart(card, part) : null} />
        <Annotations items={annotations} />
      </article>
    );
  }

  if (group === 'document') {
    const card = content.evidence.documents[id as keyof typeof content.evidence.documents];
    return (
      <article className="card card--document">
        <span className="card__clip" aria-hidden="true" />
        <h4 className="card__title">{title}</h4>
        {card ? <p className="card__source">Nguồn: {card.source}</p> : null}
        {card ? (
          Array.isArray(card.body) ? (
            <blockquote className="card__quote">
              {card.body.map((p, i) => (
                <p key={i}>
                  <CodeText text={p} />
                </p>
              ))}
            </blockquote>
          ) : (
            <p className="card__body">
              <CodeText text={card.body} />
            </p>
          )
        ) : (
          <p className="card__body">Thẻ này chưa có nội dung.</p>
        )}
        {card?.extra ? (
          <p className="card__extra">
            <CodeText text={card.extra} />
          </p>
        ) : null}
        <Note note={card ? cardNoteForPart(card, part) : null} />
        <Annotations items={annotations} />
      </article>
    );
  }

  const saved = savedQueries[id as QueryEvidenceId];
  const def = Object.values(content.challenges).find((d) => d.content.evidence.id === id);
  return (
    <article className={redacted ? 'card card--query card--redacted' : 'card card--query'}>
      <span className="card__pin" aria-hidden="true" />
      <h4 className="card__title">{title}</h4>
      {redacted ? (
        <RedactedLine />
      ) : def ? (
        <p className="card__body">
          <CodeText text={def.content.evidence.description} />
        </p>
      ) : null}
      {saved ? (
        <>
          {saved.before ? (
            <BeforeAfter before={saved.before} afterSql={saved.sql} afterCount={saved.rowCount} />
          ) : (
            <>
              <pre className="card__sql mono">{saved.sql}</pre>
              <p className="card__count">{saved.rowCount} dòng</p>
            </>
          )}
          {saved.rows.length > 0 ? redacted ? <RedactedTable columns={saved.columns} rowCount={saved.rows.length} /> : <CompactTable columns={saved.columns} rows={saved.rows} /> : null}
        </>
      ) : (
        <p className="card__body">Vật chứng này chưa có bảng kết quả kèm theo (màn thử thách chưa lưu dữ liệu).</p>
      )}
      <Annotations items={annotations} />
    </article>
  );
}

function RedactedLine() {
  return (
    <div className="card__redacted">
      <span className="card__redacted-bar" aria-hidden="true" />
      <span className="card__redacted-bar card__redacted-bar--short" aria-hidden="true" />
      <p className="card__redacted-note">{REDACTED_LINE}</p>
    </div>
  );
}

/** Bảng của thẻ đã hủy: giữ tên cột (không phải dữ liệu cá nhân), mọi ô là vạch che — không có chữ. */
function RedactedTable({ columns, rowCount }: { columns: string[]; rowCount: number }) {
  return (
    <table className="card__table card__table--redacted" aria-label={`Bảng kết quả đã hủy, ${rowCount} dòng`}>
      <thead>
        <tr>
          {columns.map((c, i) => (
            <th key={`${c}-${i}`} scope="col">
              <code>{c}</code>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {Array.from({ length: rowCount }, (_, i) => (
          <tr key={i}>
            {columns.map((c, j) => (
              <td key={`${c}-${j}`}>
                <span className="card__redacted-cell" aria-hidden="true" />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function CompactTable({ columns, rows }: { columns: string[]; rows: SqlValue[][] }) {
  const [expanded, setExpanded] = useState(false);
  const long = rows.length > COMPACT_ROWS;
  const shown = long && !expanded ? rows.slice(0, COMPACT_ROWS) : rows;
  return (
    <div className="card__table-wrap">
      <table className="card__table" aria-label={`Bảng kết quả, ${rows.length} dòng`}>
        <thead>
          <tr>
            {columns.map((c, i) => (
              <th key={`${c}-${i}`} scope="col">
                <code>{c}</code>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {shown.map((r, i) => (
            <tr key={i}>
              {r.map((v, j) => (
                <td key={j}>{v === null ? '' : String(v)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {long ? (
        <button type="button" className="card__more" aria-expanded={expanded} onClick={() => setExpanded((e) => !e)}>
          {expanded ? `Thu gọn còn ${COMPACT_ROWS} dòng` : `Xem đủ ${rows.length} dòng`}
        </button>
      ) : null}
    </div>
  );
}

function BeforeAfter({ before, afterSql, afterCount }: { before: { sql: string; rowCount: number }; afterSql: string; afterCount: number }) {
  return (
    <div className="card__compare">
      <p className="card__compare-strip">
        <span className="card__compare-num card__compare-num--before">{before.rowCount}</span>
        <svg className="card__compare-arrow" width="28" height="16" viewBox="0 0 28 16" aria-hidden="true" focusable="false">
          <path d="M1 8h24M18 2l7 6-7 6" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className="visually-hidden"> còn </span>
        <span className="card__compare-num card__compare-num--after">{afterCount}</span>
        <span className="card__compare-unit"> dòng</span>
      </p>
      <p className="card__compare-label">Trước khi sửa · {before.rowCount} dòng</p>
      <pre className="card__sql card__sql--before mono">{before.sql}</pre>
      <p className="card__compare-label">Sau khi sửa · {afterCount} dòng</p>
      <pre className="card__sql mono">{afterSql}</pre>
    </div>
  );
}

function Annotations({ items }: { items: EvidenceAnnotation[] }) {
  if (items.length === 0) return null;
  return (
    <ul className="card__annotations">
      {items.map((a, i) => (
        <li key={i} className="card__annotation">
          <strong>Chú thích:</strong> <CodeText text={a.note} />
        </li>
      ))}
    </ul>
  );
}
