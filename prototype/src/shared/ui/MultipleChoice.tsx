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
import { speakerLabel } from '../display-names';
import type { MultipleChoiceQuestion } from '../../story/types';
import { orderedChoices, type GameKey } from './choice-order';
import { CodeText } from './CodeText';
import { usePressGuard } from './use-press-guard';

export interface MultipleChoiceProps {
  question: MultipleChoiceQuestion;
  /** Số lần đã thử — chỉ để hiện lời nhắc "chọn lại", KHÔNG xáo lại (QĐ-041). */
  attempts: number;
  /** Phiên chơi (`progress.startedAt`): khóa nhớ thứ tự cùng id câu hỏi — chơi lại từ đầu thì xáo mới. */
  gameKey: GameKey;
  onChoose: (choiceId: string) => void;
  /** Nguồn ngẫu nhiên tiêm được cho test. */
  random?: () => number;
}

export function MultipleChoice({ question, attempts, gameKey, onChoose, random }: MultipleChoiceProps) {
  // Không `useMemo`: `orderedChoices` chỉ xáo lần đầu rồi trả thứ tự đã nhớ theo (phiên, câu hỏi) — StrictMode
  // gọi thân component hai lần hay dựng lại với attempts > 0 đều cho cùng thứ tự (QĐ-041, QĐ-066).
  const ordered = orderedChoices(question, gameKey, random);
  const askerLabel = speakerLabel(question.asker.speaker);
  const guard = usePressGuard(`${question.id}|${attempts}`);
  return (
    <div className="mc" role="group" aria-labelledby={`mc-${question.id}`}>
      <div className="mc__asker">
        {askerLabel ? <span className="mc__asker-name">{askerLabel}</span> : null}
        <p id={`mc-${question.id}`} className="mc__prompt">
          <CodeText text={question.asker.text} />
        </p>
      </div>
      <ul className="mc__choices">
        {ordered.map((c) => (
          <li key={c.id}>
            <button
              type="button"
              className="mc__choice"
              onKeyDown={guard.holdKey}
              onClick={(e) => {
                if (guard.click(e)) onChoose(c.id);
              }}
            >
              <CodeText text={c.text} />
            </button>
          </li>
        ))}
      </ul>
      {attempts > 0 ? <p className="mc__note">Chưa đúng cũng không sao — chọn lại thoải mái.</p> : null}
    </div>
  );
}
