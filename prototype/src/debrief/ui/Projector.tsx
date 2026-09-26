/**
 * Màn chiếu của buổi giải trình (QĐ-024 bước 1 và 5): hiện câu SQL (tô màu đồng đều, có số dòng),
 * `run: true` → CHẠY THẬT bằng `runQuery` trên dataset chính, hiện bảng kết quả (cuộn trong khung)
 * và số dòng nổi bật — số lấy từ lần chạy, không từ `expectedRowCount` (chỉ để test bất biến).
 *
 * Nguồn: SQL viết cứng (deb-01, truy vấn OR của Quân) hoặc vật chứng đã lưu (deb-03).
 * Chạy lỗi / thiếu nguồn → câu theo lý do (projector-text.ts), vẫn có nút đi tiếp.
 *
 * Đi tiếp: nút "Tiếp tục" hoặc phím Enter. Không tự đặt tiêu điểm vào nút và chỉ nhận Enter sau khi
 * kết quả đã hiện một nhịp — người đang nhấn nhanh qua lời thoại không lỡ tay bỏ qua màn chiếu.
 * Gọi `onClose` đúng một lần.
 */
import './debrief.css';
import { useCallback, useEffect, useId, useRef, useState, type MouseEvent } from 'react';
import type { SavedQueryEvidence } from '../../evidence/types';
import { CodeText } from '../../shared/ui/CodeText';
import { runQuery } from '../../sql-challenge/engine';
import type { RunResult, SqlValue } from '../../sql-challenge/types';
import type { ProjectorSpec } from '../types';
import {
  EMPTY_SQL_TEXT,
  MISSING_EVIDENCE_TEXT,
  RUN_FAILURE_TEXT,
  RUNNING_TEXT,
  rowCountLabel,
} from './projector-text';
import { SqlText } from './SqlText';

export interface ProjectorProps {
  spec: ProjectorSpec;
  /** Vật chứng nguồn khi `spec.source.kind === 'evidence'` (undefined nếu chưa lưu). */
  evidence: SavedQueryEvidence | undefined;
  onClose: () => void;
}

/** Enter chỉ có tác dụng sau khi kết quả đã hiện được chừng này (ms). */
const ENTER_ARM_MS = 700;

/** Có lớp phủ đang mở (ngăn kéo Hồ sơ, hộp xác nhận) → phím Enter là của lớp phủ. */
function overlayOpen(root: HTMLElement): boolean {
  return [...document.querySelectorAll('.notebook, [aria-modal="true"]')].some((el) => !root.contains(el));
}

export function Projector({ spec, evidence, onClose }: ProjectorProps) {
  const titleId = useId();
  const rootRef = useRef<HTMLElement>(null);
  const closed = useRef(false);

  const sql = spec.source.kind === 'sql' ? spec.source.sql : evidence?.sql;
  const hasSql = sql !== undefined && sql.trim() !== '';
  const willRun = spec.run && hasSql;

  // Kết quả gắn với đúng câu đã chạy (đổi câu → coi như chưa có kết quả, không cần xóa state).
  const [run, setRun] = useState<{ sql: string; result: RunResult } | null>(null);
  const result = willRun && run !== null && run.sql === sql ? run.result : null;
  const running = willRun && result === null;

  useEffect(() => {
    if (!spec.run || sql === undefined || sql.trim() === '') return;
    let cancelled = false;
    runQuery(sql)
      .catch((err: unknown): RunResult => ({ ok: false, kind: 'other', message: String(err) }))
      .then((r) => {
        if (!cancelled) setRun({ sql, result: r });
      });
    return () => {
      cancelled = true;
    };
  }, [spec.run, sql]);

  useEffect(() => {
    rootRef.current?.focus({ preventScroll: true });
  }, []);

  const close = useCallback(() => {
    if (closed.current) return;
    closed.current = true;
    onClose();
  }, [onClose]);

  // Phím Enter: bật sau khi kết quả (hoặc câu báo) đã hiện một nhịp.
  useEffect(() => {
    if (running) return;
    let armed = false;
    const timer = window.setTimeout(() => {
      armed = true;
    }, ENTER_ARM_MS);
    const onKey = (e: KeyboardEvent): void => {
      if (e.key !== 'Enter' || e.repeat || !armed) return;
      const root = rootRef.current;
      const target = e.target;
      if (!root || !(target instanceof Node)) return;
      if (target !== document.body && !root.contains(target)) return; // tiêu điểm ở nơi khác
      if (target instanceof HTMLButtonElement || target instanceof HTMLAnchorElement) return; // nút tự xử lý
      if (overlayOpen(root)) return;
      e.preventDefault();
      close();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('keydown', onKey);
    };
  }, [running, close]);

  const onContinue = (e: MouseEvent<HTMLButtonElement>): void => {
    // Cú bấm thứ hai của một lần bấm đúp (vừa bấm qua lời thoại trước) không đóng màn chiếu.
    if (e.detail > 1) return;
    close();
  };

  const title = spec.source.kind === 'sql' ? 'Truy vấn trên màn chiếu' : 'Truy vấn đã sửa';
  const lines = hasSql ? sql.split('\n') : [];

  return (
    <section ref={rootRef} className="dbf-screen dbf-proj" aria-labelledby={titleId} tabIndex={-1}>
      <header className="dbf-proj__head">
        <div className="dbf-screen__head">
          <p className="dbf-screen__eyebrow">Màn chiếu</p>
          <h2 id={titleId} className="dbf-screen__title">
            {title}
          </h2>
        </div>
        <p className="dbf-count" aria-live="polite">
          {result?.ok ? rowCountLabel(result.rowCount) : ''}
        </p>
      </header>

      {!hasSql ? (
        <div className="dbf-proj__body dbf-proj__body--single">
          <p className="dbf-status">{sql === undefined ? MISSING_EVIDENCE_TEXT : EMPTY_SQL_TEXT}</p>
        </div>
      ) : (
        <div className={spec.run ? 'dbf-proj__body' : 'dbf-proj__body dbf-proj__body--single'}>
          <div className="dbf-proj__col">
            <p className="dbf-proj__label">Câu truy vấn</p>
            <ol className="dbf-listing" aria-label="Câu truy vấn trên màn chiếu">
              {lines.map((line, i) => (
                <li key={i} className="dbf-listing__line">
                  <span className="dbf-lineno" aria-hidden="true">
                    {i + 1}
                  </span>
                  <code className="dbf-code">
                    <SqlText sql={line} />
                  </code>
                </li>
              ))}
            </ol>
          </div>
          {spec.run ? (
            <div className="dbf-proj__col">
              <p className="dbf-proj__label">Kết quả</p>
              {running ? <p className="dbf-status">{RUNNING_TEXT}</p> : null}
              {result && !result.ok ? (
                <p className="dbf-status dbf-status--error" role="alert">
                  {RUN_FAILURE_TEXT[result.kind]}
                </p>
              ) : null}
              {result?.ok ? <ResultGrid columns={result.columns} rows={result.rows} /> : null}
            </div>
          ) : null}
        </div>
      )}

      <footer className="dbf-screen__foot">
        <div className="dbf-proj__foot-info">
          {spec.caption ? (
            <p className="dbf-screen__caption">
              <CodeText text={spec.caption} />
            </p>
          ) : null}
        </div>
        <button type="button" className="dbf-btn" onClick={onContinue}>
          Tiếp tục <span className="dbf-btn__key">(Enter)</span>
        </button>
      </footer>
    </section>
  );
}

interface ResultGridProps {
  columns: string[];
  rows: SqlValue[][];
}

/** Bảng kết quả trên màn chiếu: tên cột dạng mã, tiêu đề dính khi cuộn trong khung. */
function ResultGrid({ columns, rows }: ResultGridProps) {
  return (
    <div className="dbf-table-wrap" tabIndex={0} role="region" aria-label={`Bảng kết quả, ${rowCountLabel(rows.length)}`}>
      <table className="dbf-table">
        <thead>
          <tr>
            {columns.map((c, i) => (
              <th key={`${c}-${i}`} scope="col">
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              {r.map((v, j) => (
                <td key={j}>{v === null ? <span className="dbf-table__null">(trống)</span> : String(v)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
