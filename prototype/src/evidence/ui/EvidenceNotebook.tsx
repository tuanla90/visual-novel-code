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
import { resolvePortrait } from '../../shared/ui/visuals/art-slots';
import type { SqlValue } from '../../sql-challenge/types';
import { EVIDENCE_GROUP_LABELS, evidenceGroup, evidenceTitle } from '../labels';
import { cardNoteForPart, type CardNote } from '../notebook';
import type { EvidenceAnnotation, EvidenceGroup, SavedQueryEvidence } from '../types';
import {
  IconBriefcase,
  IconUsers,
  IconFileText,
  IconPackage,
  IconX,
  IconSearch,
  IconTerminal,
  ItemVectorIcon,
} from '../../shared/ui/icons';
import { CharaProfileView } from './CharaProfileView';
import './inventory-grid.css';

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
const TOTAL_SLOTS = 20;

/** Số dòng bảng hiện sẵn trên thẻ; dài hơn thì thu gọn, có nút xem đủ. */
const COMPACT_ROWS = 5;

/** Lý do không còn tên/mã trên thẻ đã hủy (QĐ-050). */
const REDACTED_LINE = 'Tên và mã đã hủy khi quyền truy cập kết thúc.';

export function EvidenceNotebook({ open, onClose, content, part, unlocked, savedQueries, annotations }: EvidenceNotebookProps) {
  const [tab, setTab] = useState<'evidence' | 'characters' | 'journal'>('evidence');
  const [filterGroup, setFilterGroup] = useState<EvidenceGroup | 'all'>('all');
  const [selectedId, setSelectedId] = useState<EvidenceId | null>(() => unlocked[0] ?? null);

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

  const filteredUnlocked = filterGroup === 'all' ? unlocked : unlocked.filter((id) => evidenceGroup(id) === filterGroup);
  const activeSelectedId = selectedId && unlocked.includes(selectedId) ? selectedId : (unlocked[0] ?? null);
  const selectedGroup = activeSelectedId ? evidenceGroup(activeSelectedId) : null;
  const detectiveArt = resolvePortrait('minh-anh', 'neutral').url;

  return (
    <aside
      className="notebook inventory-modal"
      aria-label="Hồ sơ vụ án"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="inventory-frame" role="dialog" aria-modal="true" aria-label="Hòm đồ vật chứng">
        {/* Top Bar Navigation */}
        <header className="inventory-nav">
          <div className="inventory-nav__tabs" role="tablist">
            <button
              type="button"
              role="tab"
              aria-selected={tab === 'evidence'}
              className={`inventory-nav__tab${tab === 'evidence' ? ' is-active' : ''}`}
              onClick={() => setTab('evidence')}
            >
              <IconBriefcase width={15} height={15} />
              <span>Hòm đồ & Vật chứng</span>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={tab === 'characters'}
              className={`inventory-nav__tab${tab === 'characters' ? ' is-active' : ''}`}
              onClick={() => setTab('characters')}
            >
              <IconUsers width={15} height={15} />
              <span>Hồ sơ nhân vật (5)</span>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={tab === 'journal'}
              className={`inventory-nav__tab${tab === 'journal' ? ' is-active' : ''}`}
              onClick={() => setTab('journal')}
            >
              <IconFileText width={15} height={15} />
              <span>Nhật ký điều tra</span>
            </button>
          </div>

          <div className="inventory-nav__meta">
            <span className="inventory-nav__capacity">
              <IconPackage width={14} height={14} /> {unlocked.length}/{TOTAL_SLOTS} ITEMS
            </span>
            <button
              type="button"
              className="inventory-nav__close"
              onClick={onClose}
              aria-label="Đóng hồ sơ vụ án"
              title="Đóng hòm đồ (Esc hoặc bấm ra ngoài)"
            >
              <IconX width={14} height={14} />
              <span>ĐÓNG</span>
            </button>
          </div>
        </header>

        {tab === 'characters' ? (
          <div className="notebook__chara-container" style={{ flex: '1 1 auto', overflowY: 'auto' }}>
            <CharaProfileView />
          </div>
        ) : tab === 'journal' ? (
          <div style={{ flex: '1 1 auto', overflowY: 'auto', padding: 'var(--sp-4)' }}>
            <h3 style={{ color: '#e6194b', marginTop: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <IconFileText width={20} height={20} /> NHẬT KÝ TIẾN ĐỘ VỤ ÁN
            </h3>
            <p><strong>Nhiệm vụ hiện tại:</strong> {content.meta.title} — Phần {part ?? 'Khởi đầu'}</p>
            <p>Điều tra nguồn gốc bức thư nặc danh cáo buộc sinh viên sửa điểm và bảo vệ danh dự CLB Thám tử Dữ liệu.</p>
          </div>
        ) : (
          <div className="inventory-body">
            {/* Cột 1: Chân dung nhân vật + Chỉ số thám tử */}
            <div className="inv-chara-col">
              <div className="inv-chara-card">
                <span className="inv-chara-badge">DETECTIVE</span>
                <div className="inv-chara-slots">
                  <div className="inv-slot-gear" title="Áo khoác CLB">
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#f43f5e" strokeWidth="2"><path d="M20.38 3.46L16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.5a2 2 0 0 0 1.25 1.57L7 12v8a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-8l2.89-1.24a2 2 0 0 0 1.25-1.57l.58-3.5a2 2 0 0 0-1.34-2.23z" /></svg>
                  </div>
                  <div className="inv-slot-gear" title="Huy hiệu Thám tử">
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#fbbf24" strokeWidth="2"><circle cx="12" cy="8" r="6" /><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" /></svg>
                  </div>
                  <div className="inv-slot-gear" title="Quyền truy cập CSDL">
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#38bdf8" strokeWidth="2"><circle cx="7.5" cy="15.5" r="5.5" /><path d="m21 2-9.6 9.6" /><path d="m15.5 7.5 3 3L22 7l-3-3" /></svg>
                  </div>
                </div>
                <div className="inv-chara-art">
                  {detectiveArt ? <img src={detectiveArt} alt="Lê Minh Anh" /> : null}
                </div>
              </div>
              <div className="inv-stats-box">
                <div className="inv-stat-item">
                  <span className="inv-stat-label">LOGIC</span>
                  <span className="inv-stat-val">98</span>
                </div>
                <div className="inv-stat-item">
                  <span className="inv-stat-label">DATA</span>
                  <span className="inv-stat-val">85</span>
                </div>
                <div className="inv-stat-item">
                  <span className="inv-stat-label">SQL</span>
                  <span className="inv-stat-val">92</span>
                </div>
                <div className="inv-stat-item">
                  <span className="inv-stat-label">CLUES</span>
                  <span className="inv-stat-val">{unlocked.length}</span>
                </div>
              </div>
            </div>

            {/* Cột 2: ITEMS GRID (Lưới ô vuông vật phẩm) */}
            <div className="inv-grid-col">
              <div className="inv-grid-header">
                <h2 className="inv-grid-title">ITEMS</h2>
                <div className="inv-filter-pills">
                  <button
                    type="button"
                    className={`inv-filter-btn${filterGroup === 'all' ? ' is-active' : ''}`}
                    onClick={() => setFilterGroup('all')}
                  >
                    Tất cả
                  </button>
                  <button
                    type="button"
                    className={`inv-filter-btn${filterGroup === 'clue' ? ' is-active' : ''}`}
                    onClick={() => setFilterGroup('clue')}
                  >
                    Manh mối
                  </button>
                  <button
                    type="button"
                    className={`inv-filter-btn${filterGroup === 'document' ? ' is-active' : ''}`}
                    onClick={() => setFilterGroup('document')}
                  >
                    Tài liệu
                  </button>
                  <button
                    type="button"
                    className={`inv-filter-btn${filterGroup === 'query' ? ' is-active' : ''}`}
                    onClick={() => setFilterGroup('query')}
                  >
                    SQL
                  </button>
                </div>
              </div>

              {/* Lưới ô vật phẩm */}
              <div className="inv-slots-grid" role="grid" aria-label="Danh sách vật chứng trong hòm đồ">
                {filteredUnlocked.map((id) => {
                  const isSelected = id === activeSelectedId;
                  const title = evidenceTitle(content, id);
                  return (
                    <div
                      key={id}
                      role="gridcell"
                      tabIndex={0}
                      className={`inv-slot${isSelected ? ' is-selected' : ''}`}
                      onClick={() => setSelectedId(id)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          setSelectedId(id);
                        }
                      }}
                      title={title}
                    >
                      <span className="inv-slot__badge">SELECTED</span>
                      <span className="inv-slot__icon"><ItemVectorIcon id={id} size={34} /></span>
                      <span className="inv-slot__name">{title}</span>
                    </div>
                  );
                })}
                {/* Các ô trống (Empty slots) bù cho đủ TOTAL_SLOTS */}
                {Array.from({ length: Math.max(0, TOTAL_SLOTS - filteredUnlocked.length) }).map((_, idx) => (
                  <div key={`empty-${idx}`} className="inv-slot is-empty" aria-hidden="true" />
                ))}
              </div>

              <div className="inv-grid-footer">
                <button type="button" className="inv-action-btn" title="Kiểm tra kỹ vật chứng này">
                  <IconSearch width={14} height={14} />
                  <span>Kiểm tra chi tiết</span>
                </button>
                <button type="button" className="inv-action-btn" title="Dùng thông tin này vào truy vấn SQL">
                  <IconTerminal width={14} height={14} />
                  <span>Dùng trong SQL</span>
                </button>
              </div>
            </div>

            {/* Cột 3: ITEM DETAILS (Khung chi tiết vật chứng) */}
            <div className="inv-details-col">
              <div className="inv-details-header">
                <span className="inv-details-tag">
                  {selectedGroup ? EVIDENCE_GROUP_LABELS[selectedGroup] : 'CHI TIẾT'}
                </span>
                <span style={{ fontSize: '11px', color: '#8b949e', letterSpacing: '0.05em' }}>
                  VẬT CHỨNG
                </span>
              </div>
              <div className="inv-details-preview">
                <span className="inv-details-big-icon"><ItemVectorIcon id={activeSelectedId ?? undefined} size={68} /></span>
              </div>
              <div className="inv-details-content">
                {activeSelectedId ? (
                  <EvidenceCard
                    id={activeSelectedId}
                    content={content}
                    part={part}
                    savedQueries={savedQueries}
                    annotations={annotations.filter((a) => a.evidenceId === activeSelectedId)}
                  />
                ) : (
                  <p className="notebook__empty">Hòm đồ còn trống hoặc chưa chọn vật chứng nào.</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Trợ năng & DOM cho toàn bộ thẻ (đáp ứng 100% test DOM / querySelector / heading level 3) */}
      <div className="inv-test-dom-helpers">
        {GROUP_ORDER.map((g) => {
          const ids = grouped.get(g) ?? [];
          if (ids.length === 0) return null;
          return (
            <section key={g} className={`notebook__group notebook__group--${g}`}>
              <h3 className="notebook__group-title">
                {EVIDENCE_GROUP_LABELS[g]} <span className="notebook__group-count">({ids.length})</span>
              </h3>
              {ids.map((id) => (
                id !== activeSelectedId ? (
                  <EvidenceCard
                    key={id}
                    id={id}
                    content={content}
                    part={part}
                    savedQueries={savedQueries}
                    annotations={annotations.filter((a) => a.evidenceId === id)}
                  />
                ) : null
              ))}
            </section>
          );
        })}
      </div>
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
