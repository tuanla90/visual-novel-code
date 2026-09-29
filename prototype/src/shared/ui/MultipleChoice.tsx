/**
 * Câu hỏi nhiều lựa chọn dùng chung ([HỎI] trong chuỗi và câu đọc kết quả thử thách).
 * Xáo thứ tự MỘT LẦN khi câu hỏi xuất hiện (QĐ-035 + QĐ-041); khi chọn sai rồi chọn lại,
 * thứ tự giữ nguyên để người mới không mất dấu — kể cả khi component bị gỡ rồi dựng lại giữa chừng
 * (GameScreen thay nó bằng hộp thoại phản hồi): thứ tự nhớ ở `choice-order.ts`, không chỉ trong
 * `useMemo`. Phản hồi và chọn lại do runtime điều khiển (khung nhìn `feedback`), component này chỉ
 * hiện lựa chọn và gọi `onChoose(id)`. Thứ tự nhớ theo khóa (phiên chơi `gameKey` + id câu hỏi), không
 * ghi đè — chịu được StrictMode ở chế độ dev (QĐ-066).
 *
 * Chống bấm đúp (QĐ-066, `use-press-guard.ts`): câu hỏi hiện đúng chỗ lời thoại vừa bấm qua, và ở câu
 * đọc kết quả danh sách vẫn nằm yên sau một lựa chọn sai — nên cú bấm thứ hai của bấm đúp, Enter đang
 * giữ, hay cú bấm trong ~400 ms sau khi câu hỏi hiện / sau lần chọn trước KHÔNG được tính là chọn.
 */
import { useEffect } from 'react';
import { speakerLabel } from '../display-names';
import type { MultipleChoiceQuestion } from '../../story/types';
import { orderedChoices, type GameKey } from './choice-order';
import { CodeText } from './CodeText';
import { usePressGuard } from './use-press-guard';
import { soundEngine } from '../audio/sound-engine';
import { useVnStore } from '../vn/vn-store';

export interface MultipleChoiceProps {
  question: MultipleChoiceQuestion;
  /** Số lần đã thử — chỉ để hiện lời nhắc "chọn lại", KHÔNG xáo lại (QĐ-041). */
  attempts: number;
  /** Phiên chơi (`progress.startedAt`): khóa nhớ thứ tự cùng id câu hỏi — chơi lại từ đầu thì xáo mới. */
  gameKey: GameKey;
  onChoose: (choiceId: string) => void;
  /** Nguồn ngẫu nhiên tiêm được cho test. */
  random?: () => number;
  /** Nhãn người hỏi thay cho tra cứu `speakerLabel` (bản MVP: nhân vật ngoài `shared/ids.ts`). Không truyền → như cũ. */
  askerLabel?: string;
}

export function MultipleChoice({ question, attempts, gameKey, onChoose, random, askerLabel: askerLabelProp }: MultipleChoiceProps) {
  // Không `useMemo`: `orderedChoices` chỉ xáo lần đầu rồi trả thứ tự đã nhớ theo (phiên, câu hỏi) — StrictMode
  // gọi thân component hai lần hay dựng lại với attempts > 0 đều cho cùng thứ tự (QĐ-041, QĐ-066).
  const ordered = orderedChoices(question, gameKey, random);
  const askerLabel = askerLabelProp ?? speakerLabel(question.asker.speaker);
  const guard = usePressGuard(`${question.id}|${attempts}`);
  const dialogueFont = useVnStore((s) => s.dialogueFont);
  const pushBacklog = useVnStore((s) => s.pushBacklog);

  // Lưu câu hỏi vào Backlog để người chơi có thể xem lại trong lịch sử
  useEffect(() => {
    pushBacklog({
      id: `${Date.now()}-${Math.random()}`,
      speaker: question.asker.speaker,
      speakerName: askerLabel || 'Người dẫn chuyện',
      text: question.asker.text,
    });
  }, [question, askerLabel, pushBacklog]);

  return (
    <div className="mc" role="group" aria-labelledby={`mc-${question.id}`}>
      {/* Vùng các phương án lựa chọn nổi ở giữa màn hình (phong cách DDLC / Visual Novel) */}
      <div className="mc__overlay" aria-label="Các lựa chọn">
        <ul className="mc__choices">
          {ordered.map((c, idx) => (
            <li key={c.id} className="mc__choice-item" style={{ animationDelay: `${idx * 0.08}s` }}>
              <button
                type="button"
                className="mc__choice"
                onKeyDown={guard.holdKey}
                onClick={(e) => {
                  if (!guard.click(e)) return;
                  soundEngine.playSfx('select');
                  onChoose(c.id);
                }}
              >
                <CodeText text={c.text} />
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Khung hội thoại giữ nguyên vị trí dưới đáy sân khấu để hiển thị câu hỏi */}
      <div className="dialog-container mc__dialog-container">
        <div
          className="dialog dialog--glass"
          data-speaker={question.asker.speaker}
        >
          {askerLabel ? (
            <div className="dialog__speaker">
              <svg className="dialog__speaker-icon" viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
                <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 0 0 8 20C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C7 8 17 8 17 8z" />
              </svg>
              <span>{askerLabel}</span>
            </div>
          ) : null}
          <p id={`mc-${question.id}`} className={`dialog__text mc__prompt dialog__text--${dialogueFont}`}>
            <CodeText text={question.asker.text} />
          </p>

          <div className="mc__status-bar">
            {attempts > 0 ? (
              <span className="mc__note">Chưa đúng cũng không sao — chọn lại thoải mái.</span>
            ) : (
              <span className="mc__hint-box">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 16v-4M12 8h.01" />
                </svg>
                <span>Chọn một phương án ở giữa màn hình</span>
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
