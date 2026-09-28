/**
 * Khung thành công (QĐ-018, QĐ-043): bảng kết quả đúng + câu đọc kết quả ngay dưới/bên cạnh bảng
 * (MultipleChoice dùng chung, xáo MỘT lần — QĐ-041) → nút "Lưu vào hồ sơ".
 * Màn này TỰ ghi `question_answered` (id lựa chọn, số lần thử, cờ lựa chọn đầu) vì câu hỏi không
 * đi qua runtime kể chuyện. `debrief-fix` không có câu hỏi: nút lưu hiện ngay.
 */
import { useRef, useState } from 'react';
import { speakerLabel } from '../../shared/display-names';
import { useGameStore } from '../../shared/store';
import { track } from '../../shared/telemetry/track';
import { CodeText } from '../../shared/ui/CodeText';
import { MultipleChoice } from '../../shared/ui/MultipleChoice';
import { usePressGuard } from '../../shared/ui/use-press-guard';
import type { DialogueLine, MultipleChoiceQuestion } from '../../story/types';
import type { RunSuccess } from '../types';
import { rowCountText } from './labels';
import { ResultTable } from './ResultTable';

export interface SuccessPanelProps {
  attempt: number;
  run: RunSuccess;
  table: string | null;
  conditionCount: number | null;
  question: MultipleChoiceQuestion | null;
  saving: boolean;
  disabled: boolean;
  onSave: () => void;
}

export function SuccessPanel({ attempt, run, table, conditionCount, question, saving, disabled, onSave }: SuccessPanelProps) {
  // Nút chủ ý: nhận ngay cú bấm đơn, bỏ cú bấm lặp của bấm đúp và Enter đang giữ (QĐ-066).
  const saveGuard = usePressGuard(null);
  const [attempts, setAttempts] = useState(0);
  const [lastChoice, setLastChoice] = useState<{ id: string; correct: boolean; feedback: DialogueLine[] } | null>(null);
  // Đếm lần thử bằng ref (đồng bộ) để hai cú bấm liền nhau không cùng ghi attempt = 1 / isFirstChoice.
  const tries = useRef({ count: 0, done: false });
  // Khóa nhớ thứ tự lựa chọn (QĐ-041/QĐ-066): chơi lại từ đầu → phiên mới → xáo mới.
  const gameKey = useGameStore((s) => s.progress?.startedAt ?? null);
  const answered = question === null || lastChoice?.correct === true;

  const choose = (choiceId: string): void => {
    if (!question || answered || tries.current.done) return;
    const choice = question.choices.find((c) => c.id === choiceId);
    if (!choice) return;
    tries.current.count += 1;
    if (choice.correct) tries.current.done = true;
    const attempt = tries.current.count;
    track({ type: 'question_answered', questionId: question.id, choiceId, attempt, correct: choice.correct, isFirstChoice: attempt === 1 });
    setAttempts(attempt);
    setLastChoice({ id: choiceId, correct: choice.correct, feedback: choice.feedback });
  };

  const chosenText = question && lastChoice ? question.choices.find((c) => c.id === lastChoice.id)?.text : undefined;

  return (
    <div className="result result--success">
      <div className="result__head">
        <strong className="result__ok">Đúng rồi</strong>
        <span className="result__attempt">Lần chạy {attempt}</span>
        <strong className="result__count">{rowCountText(run.rowCount, table, conditionCount)}</strong>
      </div>
      <div className="result__split">
        <div className="result__table">
          <ResultTable reveal columns={run.columns} rows={run.rows} caption={`Kết quả đúng — lần chạy ${attempt}`} />
        </div>
        <div className="result__next">
          {question && !answered ? (
            <MultipleChoice question={question} attempts={attempts} gameKey={gameKey} onChoose={choose} />
          ) : null}
          {question && answered && chosenText ? (
            <div className="result__answered">
              <p className="result__asker">
                <span className="result__who">{speakerLabel(question.asker.speaker)}:</span> <CodeText text={question.asker.text} />
              </p>
              <p className="result__choice">
                <span className="result__who result__who--player">Bạn chọn:</span> <CodeText text={chosenText} />
              </p>
            </div>
          ) : null}
          {lastChoice && lastChoice.feedback.length > 0 ? (
            <div className={`result__feedback${lastChoice.correct ? ' is-correct' : ''}`} aria-live="polite">
              {lastChoice.feedback.map((line, i) => (
                <p key={`${lastChoice.id}-${i}`}>
                  <span className="result__who">{speakerLabel(line.speaker)}:</span> <CodeText text={line.text} />
                </p>
              ))}
            </div>
          ) : null}
          {answered ? (
            <button type="button" className="btn btn--primary result__save" onKeyDown={saveGuard.holdKey}
              onClick={(e) => {
                if (saveGuard.click(e, { immediate: true })) void onSave();
              }}
              disabled={saving || disabled}
            >
              {saving ? 'Đang lưu…' : 'Lưu vào hồ sơ'}
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
