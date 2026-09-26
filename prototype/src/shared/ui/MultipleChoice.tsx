/**
 * Câu hỏi nhiều lựa chọn dùng chung ([HỎI] trong chuỗi và câu đọc kết quả thử thách).
 * Xáo thứ tự mỗi lần hiện (QĐ-035); phản hồi và chọn lại do runtime điều khiển
 * (khung nhìn `feedback`), component này chỉ hiện lựa chọn và gọi `onChoose(id)`.
 */
import { useMemo } from 'react';
import { speakerLabel } from '../display-names';
import type { MultipleChoiceQuestion } from '../../story/types';
import { shuffle } from './shuffle';

export interface MultipleChoiceProps {
  question: MultipleChoiceQuestion;
  /** Số lần đã thử — đổi thì xáo lại. */
  attempts: number;
  onChoose: (choiceId: string) => void;
  /** Nguồn ngẫu nhiên tiêm được cho test. */
  random?: () => number;
}

export function MultipleChoice({ question, attempts, onChoose, random }: MultipleChoiceProps) {
  const ordered = useMemo(
    () => shuffle(question.choices, random),
    // Xáo lại khi câu hỏi hoặc lượt thử đổi (QĐ-035: mỗi lần hiện).
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [question.id, attempts],
  );
  const askerLabel = speakerLabel(question.asker.speaker);
  return (
    <div className="mc" role="group" aria-labelledby={`mc-${question.id}`}>
      <div className="mc__asker">
        {askerLabel ? <span className="mc__asker-name">{askerLabel}</span> : null}
        <p id={`mc-${question.id}`} className="mc__prompt">
          {question.asker.text}
        </p>
      </div>
      <ul className="mc__choices">
        {ordered.map((c) => (
          <li key={c.id}>
            <button type="button" className="mc__choice" onClick={() => onChoose(c.id)}>
              {c.text}
            </button>
          </li>
        ))}
      </ul>
      {attempts > 0 ? <p className="mc__note">Chưa đúng cũng không sao — chọn lại thoải mái.</p> : null}
    </div>
  );
}
