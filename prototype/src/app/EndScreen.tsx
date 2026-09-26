/**
 * Màn kết + khảo sát cuối game (QĐ-031, QĐ-042): tối đa 2 phần đáng nhớ nhất, đoạn gây khó chịu
 * (tùy chọn, có "Không có"), có muốn chơi vụ tiếp theo. Chỉ lựa chọn đóng — không ô chữ tự do.
 * Props đã chốt; ghi sự kiện qua `onSubmitSurvey` / `onSkipSurvey` (store gọi `track`).
 */
import { useId, useState } from 'react';
import type { MemorablePart, PostSurveyAnswers } from '../shared/telemetry/events';
import {
  EMPTY_POST_DRAFT,
  MAX_MEMORABLE,
  MEMORABLE_OPTIONS,
  PLAY_NEXT_OPTIONS,
  resolvePostSurvey,
  toggleMemorable,
  type PostSurveyDraft,
} from '../shared/telemetry/survey';

export interface EndScreenProps {
  onSubmitSurvey: (answers: PostSurveyAnswers) => void;
  onSkipSurvey: () => void;
  onReplay: () => void;
  surveyDone: boolean;
}

/** Lựa chọn "Không có" ở câu đoạn gây khó chịu (ghi thành `annoying: null`). */
const NONE = 'none';

export function EndScreen({ onSubmitSurvey, onSkipSurvey, onReplay, surveyDone }: EndScreenProps) {
  const id = useId();
  const [draft, setDraft] = useState<PostSurveyDraft>(EMPTY_POST_DRAFT);
  const [annoyingChoice, setAnnoyingChoice] = useState<MemorablePart | typeof NONE | null>(null);
  const answers = resolvePostSurvey(draft);
  const full = draft.memorable.length >= MAX_MEMORABLE;

  return (
    <div className="endscreen" role="region" aria-labelledby={`${id}-title`}>
      <h2 id={`${id}-title`} className="endscreen__title">
        Hết vụ.
      </h2>
      {surveyDone ? (
        <p className="endscreen__lead" role="status">
          Cảm ơn bạn đã chơi thử!
        </p>
      ) : (
        <form
          className="survey survey--post"
          aria-label="Khảo sát cuối game"
          onSubmit={(e) => {
            e.preventDefault();
            if (answers) onSubmitSurvey(answers);
          }}
        >
          <p className="endscreen__lead">Cảm ơn bạn đã chơi thử! Ba câu hỏi ngắn, chỉ cần bấm chọn (không bắt buộc).</p>

          <fieldset className="survey__q">
            <legend className="survey__legend">
              Phần nào đáng nhớ nhất với bạn? <span className="survey__optional">(chọn tối đa {MAX_MEMORABLE})</span>
            </legend>
            <div className="survey__options">
              {MEMORABLE_OPTIONS.map((o) => {
                const on = draft.memorable.includes(o.value);
                const locked = !on && full;
                return (
                  <label key={o.value} className={`survey__option${on ? ' survey__option--on' : ''}${locked ? ' survey__option--disabled' : ''}`}>
                    <input
                      type="checkbox"
                      name={`${id}-memorable`}
                      value={o.value}
                      checked={on}
                      disabled={locked}
                      onChange={() => setDraft((d) => ({ ...d, memorable: toggleMemorable(d.memorable, o.value) }))}
                    />
                    <span>{o.label}</span>
                  </label>
                );
              })}
            </div>
            <p className="survey__note" aria-live="polite">
              {full ? `Đã chọn đủ ${MAX_MEMORABLE} phần. Bỏ chọn một phần để đổi.` : `Đã chọn ${draft.memorable.length}/${MAX_MEMORABLE}.`}
            </p>
          </fieldset>

          <fieldset className="survey__q">
            <legend className="survey__legend">
              Đoạn nào làm bạn khó chịu? <span className="survey__optional">(không bắt buộc)</span>
            </legend>
            <div className="survey__options">
              {[...MEMORABLE_OPTIONS, { value: NONE, label: 'Không có' } as const].map((o) => (
                <label key={o.value} className={`survey__option${annoyingChoice === o.value ? ' survey__option--on' : ''}`}>
                  <input
                    type="radio"
                    name={`${id}-annoying`}
                    value={o.value}
                    checked={annoyingChoice === o.value}
                    onChange={() => {
                      setAnnoyingChoice(o.value);
                      setDraft((d) => ({ ...d, annoying: o.value === NONE ? null : o.value }));
                    }}
                  />
                  <span>{o.label}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset className="survey__q">
            <legend className="survey__legend">Bạn có muốn chơi vụ tiếp theo không?</legend>
            <div className="survey__options">
              {PLAY_NEXT_OPTIONS.map((o) => (
                <label key={o.value} className={`survey__option${draft.playNext === o.value ? ' survey__option--on' : ''}`}>
                  <input
                    type="radio"
                    name={`${id}-next`}
                    value={o.value}
                    checked={draft.playNext === o.value}
                    onChange={() => setDraft((d) => ({ ...d, playNext: o.value }))}
                  />
                  <span>{o.label}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <div className="survey__foot">
            <p className="survey__note">{answers ? 'Không hỏi tên hay thông tin cá nhân.' : 'Chọn câu trả lời cho câu cuối để gửi.'}</p>
            <div className="endscreen__actions">
              <button type="button" className="btn" onClick={onSkipSurvey}>
                Bỏ qua khảo sát
              </button>
              <button type="submit" className="btn btn--primary" disabled={!answers}>
                Gửi câu trả lời
              </button>
            </div>
          </div>
        </form>
      )}
      {surveyDone ? (
        <div className="endscreen__actions">
          <button type="button" className="btn btn--primary" onClick={onReplay}>
            Chơi lại từ đầu
          </button>
        </div>
      ) : null}
    </div>
  );
}
