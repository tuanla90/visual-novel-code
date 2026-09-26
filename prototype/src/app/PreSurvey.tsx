/**
 * Khảo sát đầu game (QĐ-031) — cắm vào `TitleScreen.preSurveySlot`. Hai câu lựa chọn đóng,
 * bỏ qua được; không hỏi tên hay thông tin cá nhân. Component chỉ giữ bản nháp; App ghi sự kiện
 * (`survey_submitted` / `survey_skipped`) khi người chơi bấm "Bắt đầu" hoặc "Chơi tiếp", để câu
 * trả lời rơi đúng vào phiên sắp chơi (kể cả khi "Bắt đầu lại" mở phiên mới).
 */
import { useId } from 'react';
import { EXCEL_OPTIONS, SQL_OPTIONS, type PreSurveyDraft, type SurveyOption } from '../shared/telemetry/survey';

export interface PreSurveyProps {
  value: PreSurveyDraft;
  onChange: (next: PreSurveyDraft) => void;
}

export function PreSurvey({ value, onChange }: PreSurveyProps) {
  const id = useId();
  if (value.skipped) {
    return (
      <div className="survey survey--pre survey--done">
        <p className="survey__note">Bạn đã bỏ qua khảo sát. Bấm "Bắt đầu" để vào vụ án.</p>
        <button type="button" className="btn survey__link" onClick={() => onChange({ ...value, skipped: false })}>
          Trả lời khảo sát
        </button>
      </div>
    );
  }
  return (
    <div className="survey survey--pre" role="group" aria-labelledby={`${id}-title`}>
      <p id={`${id}-title`} className="survey__title">
        Hai câu hỏi nhanh trước khi bắt đầu <span className="survey__optional">(không bắt buộc)</span>
      </p>
      <ChoiceRow
        name={`${id}-excel`}
        legend="Bạn dùng Excel đến mức nào?"
        options={EXCEL_OPTIONS}
        selected={value.excelLevel}
        onSelect={(excelLevel) => onChange({ ...value, excelLevel })}
      />
      <ChoiceRow
        name={`${id}-sql`}
        legend="Bạn đã học SQL chưa?"
        options={SQL_OPTIONS}
        selected={value.sqlBefore}
        onSelect={(sqlBefore) => onChange({ ...value, sqlBefore })}
      />
      <div className="survey__foot">
        <p className="survey__note">Không hỏi tên hay thông tin cá nhân. Câu trả lời được ghi khi bạn bấm "Bắt đầu".</p>
        <button type="button" className="btn survey__skip" onClick={() => onChange({ excelLevel: null, sqlBefore: null, skipped: true })}>
          Bỏ qua khảo sát
        </button>
      </div>
    </div>
  );
}

function ChoiceRow<T extends string>({
  name,
  legend,
  options,
  selected,
  onSelect,
}: {
  name: string;
  legend: string;
  options: SurveyOption<T>[];
  selected: T | null;
  onSelect: (value: T) => void;
}) {
  return (
    <fieldset className="survey__q">
      <legend className="survey__legend">{legend}</legend>
      <div className="survey__options">
        {options.map((o) => (
          <label key={o.value} className={`survey__option${selected === o.value ? ' survey__option--on' : ''}`}>
            <input type="radio" name={name} value={o.value} checked={selected === o.value} onChange={() => onSelect(o.value)} />
            <span>{o.label}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
