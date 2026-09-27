/**
 * Màn tiêu đề. Có chỗ cho khảo sát đầu game (gói telemetry — QĐ-031) qua `preSurveySlot`.
 * Hình (gói hinh-giao-dien): nền phòng CLB (ô ảnh `bg-prototype-club-room` hoặc SVG tạm) + Minh
 * Anh và Hà Vy hai bên, thẻ tiêu đề như bìa hồ sơ. Chữ và hành vi giữ nguyên.
 * Có tiến độ đã lưu: "Bắt đầu lại" hỏi xác nhận trước khi xóa (QĐ-066 — lỡ tay là mất 10–20 phút chơi).
 */
import { useState, type ReactNode } from 'react';
import { ConfirmDialog } from '../shared/ui/ConfirmDialog';
import { Portrait } from '../shared/ui/Portrait';
import { SceneBackdrop } from '../shared/ui/visuals/SceneBackdrop';

export interface TitleScreenProps {
  title: string;
  isSample: boolean;
  hasSavedProgress: boolean;
  onStart: () => void;
  onContinue: () => void;
  /** Gói telemetry đặt component khảo sát đầu game vào đây. */
  preSurveySlot?: ReactNode;
}

export function TitleScreen({ title, isSample, hasSavedProgress, onStart, onContinue, preSurveySlot }: TitleScreenProps) {
  const [confirmRestart, setConfirmRestart] = useState(false);
  return (
    <main className="title">
      <SceneBackdrop scene="clb-room" />
      <div className="title__cast" aria-hidden="true">
        <div className="title__cast-member title__cast-member--left">
          <Portrait character="minh-anh" expression="happy" />
        </div>
        <div className="title__cast-member title__cast-member--right">
          <Portrait character="ha-vy" expression="smile" />
        </div>
      </div>
      <div className="title__card">
        <p className="title__kicker">Prototype · vòng thử nghiệm 1</p>
        <h1 className="title__name">{title}</h1>
        <p className="title__lead">Một lá thư, ba manh mối, hai bảng dữ liệu. Bạn là thành viên mới của CLB Thám Tử.</p>
        {isSample ? <p className="badge badge--sample">NỘI DUNG MẪU — chưa phải kịch bản thật</p> : null}
        <div className="title__survey">{preSurveySlot ?? <p className="stub__tag">Khảo sát đầu game sẽ hiện ở đây (gói telemetry)</p>}</div>
        <div className="title__actions">
          {hasSavedProgress ? (
            <button type="button" className="btn btn--primary" onClick={onContinue} autoFocus>
              Chơi tiếp
            </button>
          ) : null}
          <button
            type="button"
            className={hasSavedProgress ? 'btn' : 'btn btn--primary'}
            onClick={hasSavedProgress ? () => setConfirmRestart(true) : onStart}
            autoFocus={!hasSavedProgress}
          >
            {hasSavedProgress ? 'Bắt đầu lại' : 'Bắt đầu'}
          </button>
        </div>
      </div>
      <ConfirmDialog
        open={confirmRestart}
        title="Bắt đầu lại từ đầu?"
        message="Tiến độ đã lưu (phần đang chơi, hồ sơ, truy vấn) sẽ bị xóa và không hoàn tác được. Câu trả lời khảo sát đầu game được giữ lại."
        confirmLabel="Xóa và bắt đầu lại"
        onConfirm={() => {
          setConfirmRestart(false);
          onStart();
        }}
        onCancel={() => setConfirmRestart(false)}
      />
    </main>
  );
}
