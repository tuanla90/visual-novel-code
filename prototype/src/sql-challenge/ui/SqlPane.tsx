/**
 * Khung SQL (cột phải): SQL song song của trình dựng, hoặc ô soạn "Sửa SQL trực tiếp" (QĐ-016).
 * Ô soạn là textarea đơn giản (không thư viện mới); Ctrl+Enter chạy luôn.
 */
import type { BuilderMode } from '../types';
import { SqlCode } from './SqlCode';

export interface SqlPaneProps {
  mode: BuilderMode;
  builderSql: string;
  draft: string;
  onDraft: (sql: string) => void;
  onToggle: () => void;
  onRunShortcut: () => void;
  disabled: boolean;
  guided: boolean;
}

export function SqlPane({ mode, builderSql, draft, onDraft, onToggle, onRunShortcut, disabled, guided }: SqlPaneProps) {
  const editing = mode === 'sql';
  return (
    <section className={`chal-sql${guided ? ' is-guided' : ''}`} aria-labelledby="chal-sql-title" data-region="sql">
      <div className="chal-sql__head">
        <h3 id="chal-sql-title" className="chal-sql__title">
          {editing ? 'Sửa SQL trực tiếp' : 'Câu SQL tương ứng'}
        </h3>
        <button type="button" className="btn btn--small btn--dark" onClick={onToggle} disabled={disabled}>
          {editing ? 'Quay về trình dựng' : 'Sửa SQL trực tiếp'}
        </button>
      </div>
      {editing ? (
        <>
          <textarea
            className="chal-sql__editor"
            aria-label="Câu SQL gõ tay"
            aria-describedby="chal-sql-help"
            spellCheck={false}
            autoCapitalize="off"
            autoCorrect="off"
            rows={7}
            value={draft}
            disabled={disabled}
            onChange={(e) => onDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
                e.preventDefault();
                onRunShortcut();
              }
            }}
          />
          <p id="chal-sql-help" className="chal-sql__help">
            Gõ xong bấm “Chạy truy vấn” (hoặc Ctrl+Enter). Câu gõ tay vẫn được chấm như thường.
          </p>
        </>
      ) : (
        <SqlCode sql={builderSql} label="Câu SQL sinh từ trình dựng" />
      )}
    </section>
  );
}
