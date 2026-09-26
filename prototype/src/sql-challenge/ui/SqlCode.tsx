/**
 * Câu SQL song song (QĐ-016): tô màu từ khóa/chuỗi/số; `%`, `LIKE`, `AND`, `OR`, `IN` và chỗ giữ
 * phép nối có chú thích — hiện khi rê chuột HOẶC khi Tab tới (đọc được bằng bàn phím), trình đọc màn
 * hình đọc qua `aria-describedby`. Bong bóng chú thích được kẹp trong khung SQL (không tràn màn hình).
 */
import { useId, useMemo, useRef, useState, type FocusEvent, type MouseEvent } from 'react';
import { PLACEHOLDER_NOTE, TERM_NOTES, tokenizeSql, type SqlTerm, type SqlToken } from './sql-tokens';

export interface SqlCodeProps {
  sql: string;
  /** Nhãn cho trình đọc màn hình. */
  label: string;
}

type TipKey = SqlTerm | 'placeholder';

interface TipState {
  key: TipKey;
  left: number;
  top: number;
}

const TIP_WIDTH = 260;

function tipText(key: TipKey): { title: string; text: string } {
  return key === 'placeholder' ? { title: 'AND/OR', text: PLACEHOLDER_NOTE } : TERM_NOTES[key];
}

export function SqlCode({ sql, label }: SqlCodeProps) {
  const tokens = useMemo(() => tokenizeSql(sql), [sql]);
  const idBase = useId();
  const wrapRef = useRef<HTMLDivElement>(null);
  const [tip, setTip] = useState<TipState | null>(null);

  const descId = (key: TipKey): string => `${idBase}-tip-${key}`;

  const show = (key: TipKey) => (e: MouseEvent<HTMLElement> | FocusEvent<HTMLElement>) => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const box = wrap.getBoundingClientRect();
    const r = e.currentTarget.getBoundingClientRect();
    const maxLeft = Math.max(0, box.width - TIP_WIDTH - 4);
    const left = Math.min(Math.max(0, r.left - box.left), maxLeft);
    setTip({ key, left, top: r.bottom - box.top + 4 });
  };
  const hide = (): void => setTip(null);

  const usedKeys = new Set<TipKey>();
  const render = (t: SqlToken, i: number) => {
    const key: TipKey | null = t.kind === 'placeholder' ? 'placeholder' : (t.term ?? null);
    if (key === null) {
      return t.kind === 'space' ? t.text : (
        <span key={i} className={`sql-tok sql-tok--${t.kind}`}>
          {t.text}
        </span>
      );
    }
    usedKeys.add(key);
    return (
      <span
        key={i}
        className={`sql-tok sql-tok--${t.kind} sql-term`}
        tabIndex={0}
        aria-describedby={descId(key)}
        onMouseEnter={show(key)}
        onMouseLeave={hide}
        onFocus={show(key)}
        onBlur={hide}
        onKeyDown={(e) => {
          if (e.key === 'Escape') hide();
        }}
      >
        {t.text}
      </span>
    );
  };
  const body = tokens.map(render);

  return (
    <div className="sqlcode" ref={wrapRef}>
      <pre className="sqlcode__pre" aria-label={label}>
        <code>{body}</code>
      </pre>
      {[...usedKeys].map((key) => (
        <span key={key} id={descId(key)} hidden>
          {tipText(key).text}
        </span>
      ))}
      {tip ? (
        <div className="sqlcode__tip" role="tooltip" style={{ left: tip.left, top: tip.top, width: TIP_WIDTH }}>
          <strong className="sqlcode__tip-title">{tipText(tip.key).title}</strong> {tipText(tip.key).text}
        </div>
      ) : null}
    </div>
  );
}
