/**
 * Màn chọn dòng lỗi (QĐ-024 bước 2): các dòng SQL trên màn chiếu thành các vùng chạm lớn.
 *
 * - Mỗi dòng là một nút (≥ 44px cao, phông mono ≥ 16px, có số dòng) — Tab/Enter/Space dùng được.
 * - Tô màu từ khóa ĐỒNG ĐỀU cho mọi dòng (sql-highlight.ts): không dòng nào, không từ `OR` nào có
 *   lớp nổi bật riêng — nếu có sẽ lộ đáp án.
 * - Chọn → `onPick(index)`. Phản hồi, chọn lại, telemetry `line_picked` do RUNTIME lo (runtime.ts
 *   phát đúng một lần mỗi lần chọn) — component này KHÔNG ghi telemetry.
 * - Dòng đã chọn sai được đánh dấu nhẹ ("đã thử"), vẫn chọn lại được; không phạt, không giới hạn.
 *   Dấu này nhớ ngoài component (tried-lines.ts) vì GameScreen gỡ màn này khi hiện phản hồi.
 * - Không tự đặt tiêu điểm vào một dòng: phím Space/Enter vừa dùng để qua lời phản hồi không được
 *   rơi xuống chọn nhầm dòng. Tiêu điểm đặt vào khung; Tab tới dòng đầu.
 */
import './debrief.css';
import { useEffect, useId, useRef, useSyncExternalStore, type MouseEvent } from 'react';
import type { LinePick as LinePickContent, PickableLine } from '../types';
import { SqlText } from './SqlText';
import { NO_TRIED_LINES, rememberTried, subscribeTried, triedLines } from './tried-lines';

export interface LinePickProps {
  pick: LinePickContent;
  attempts: number;
  onPick: (lineIndex: number) => void;
}

/** Hai lần chọn cách nhau ít hơn mức này coi là một (giữ phím Enter, bấm đúp). */
const REPEAT_GUARD_MS = 400;

export function LinePick({ pick, attempts, onPick }: LinePickProps) {
  const titleId = useId();
  const rootRef = useRef<HTMLElement>(null);
  const lastPickAt = useRef(Number.NEGATIVE_INFINITY);
  const remembered = useSyncExternalStore(
    subscribeTried,
    () => triedLines(pick.id),
    () => triedLines(pick.id),
  );
  // Runtime báo chưa chọn lần nào → bỏ dấu cũ (ví dụ đã chơi lại từ đầu).
  const tried = attempts === 0 ? NO_TRIED_LINES : remembered;

  useEffect(() => {
    rootRef.current?.focus({ preventScroll: true });
  }, [pick.id]);

  const choose = (line: PickableLine, e: MouseEvent<HTMLButtonElement>): void => {
    // Cú bấm thứ hai của một lần bấm đúp (ví dụ vừa bấm qua lời phản hồi) không tính là chọn.
    if (e.detail > 1) return;
    const now = e.timeStamp;
    if (now - lastPickAt.current < REPEAT_GUARD_MS) return;
    lastPickAt.current = now;
    if (!line.correct) rememberTried(pick.id, line.index, attempts === 0);
    onPick(line.index);
  };

  return (
    <section ref={rootRef} className="dbf-screen dbf-pick" aria-labelledby={titleId} tabIndex={-1}>
      <header className="dbf-screen__head">
        <p className="dbf-screen__eyebrow">Màn chiếu</p>
        <h2 id={titleId} className="dbf-screen__title">
          Dòng nào gây lỗi?
        </h2>
        <p className="dbf-screen__lead">Chạm vào dòng bạn cho là lỗi (hoặc Tab tới dòng rồi nhấn Enter).</p>
      </header>
      <ol className="dbf-pick__lines">
        {pick.lines.map((line) => {
          const wasTried = tried.has(line.index);
          return (
            <li key={line.index} className="dbf-pick__item">
              <button
                type="button"
                className={wasTried ? 'dbf-pick__line dbf-pick__line--tried' : 'dbf-pick__line'}
                aria-label={`Chọn dòng ${line.index} là dòng lỗi${wasTried ? ' (đã thử)' : ''}: ${line.sql}`}
                title={`Chọn dòng ${line.index} là dòng lỗi`}
                onClick={(e) => choose(line, e)}
              >
                <span className="dbf-lineno" aria-hidden="true">
                  {line.index}
                </span>
                <code className="dbf-code">
                  <SqlText sql={line.sql} />
                </code>
                {wasTried ? (
                  <span className="dbf-pick__tag" aria-hidden="true">
                    đã thử
                  </span>
                ) : null}
              </button>
            </li>
          );
        })}
      </ol>
      <p className="dbf-pick__note" role="status">
        {attempts > 0 ? 'Chưa đúng cũng không sao — chọn dòng khác thoải mái.' : ''}
      </p>
    </section>
  );
}
