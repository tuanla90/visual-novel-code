/**
 * STUB — gói `giai-trinh-ui` (gói 6) thay bằng màn chiếu có 5 dòng SQL chạm được (QĐ-024 bước 2).
 * Props đã chốt: gọi `onPick(lineIndex)`; phản hồi/chọn lại do runtime điều khiển.
 */
import type { LinePick as LinePickContent } from '../types';

export interface LinePickProps {
  pick: LinePickContent;
  attempts: number;
  onPick: (lineIndex: number) => void;
}

export function LinePick({ pick, attempts, onPick }: LinePickProps) {
  const firstCorrect = pick.lines.find((l) => l.correct);
  return (
    <div className="stub stub--linepick" role="group" aria-label="Chọn dòng lỗi">
      <p className="stub__tag">Chọn dòng lỗi (stub — gói giai-trinh-ui)</p>
      <pre className="stub__sql mono">
        {pick.lines.map((l) => (
          <span key={l.index} className="stub__sql-line">
            {l.index}. {l.sql}
            {'\n'}
          </span>
        ))}
      </pre>
      {attempts > 0 ? <p className="stub__meta">Đã thử {attempts} lần — chạm dòng khác.</p> : null}
      <button type="button" className="btn btn--primary" onClick={() => firstCorrect && onPick(firstCorrect.index)} disabled={!firstCorrect} autoFocus>
        Tiếp tục (stub: chọn dòng đúng)
      </button>
    </div>
  );
}
