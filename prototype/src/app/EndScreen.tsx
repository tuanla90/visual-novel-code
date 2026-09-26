/**
 * STUB — gói `telemetry` (gói 8) thay bằng màn kết + khảo sát cuối game (QĐ-031). Props đã chốt.
 */
import type { PostSurveyAnswers } from '../shared/telemetry/events';

export interface EndScreenProps {
  onSubmitSurvey: (answers: PostSurveyAnswers) => void;
  onSkipSurvey: () => void;
  onReplay: () => void;
  surveyDone: boolean;
}

export function EndScreen({ onSkipSurvey, onReplay, surveyDone }: EndScreenProps) {
  return (
    <div className="stub stub--end" role="region" aria-labelledby="end-title">
      <p className="stub__tag">Màn kết + khảo sát cuối game (stub — gói telemetry)</p>
      <h2 id="end-title" className="stub__title">
        Hết vụ.
      </h2>
      <p>Khảo sát cuối game (phần đáng nhớ, muốn chơi tiếp) sẽ hiện ở đây.</p>
      <div className="stub__actions">
        {!surveyDone ? (
          <button type="button" className="btn" onClick={onSkipSurvey}>
            Bỏ qua khảo sát (stub)
          </button>
        ) : null}
        <button type="button" className="btn btn--primary" onClick={onReplay}>
          Chơi lại từ đầu
        </button>
      </div>
    </div>
  );
}
