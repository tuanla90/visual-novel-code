/**
 * Màn kết bản MVP: kết thật / kết thường (QĐ-086/090). Không có khảo sát cuối (telemetry của prototype để nguyên).
 */
export interface KetMvpProps {
  ketQua: 'that' | 'thuong';
  onChoiLai: () => void;
  onVeTieuDe: () => void;
}

export function KetMvp({ ketQua, onChoiLai, onVeTieuDe }: KetMvpProps) {
  return (
    <section className="endscreen mvp-ket" aria-labelledby="mvp-ket-tieude">
      <p className="mvp-chal__kicker">Hết Vụ 1 — Chữ ký H.</p>
      <h2 id="mvp-ket-tieude" className="endscreen__title">
        {ketQua === 'that' ? 'Kết thật: người nộp không phải người viết' : 'Kết thường: chỉ là một ý kiến sinh viên'}
      </h2>
      <p className="endscreen__lead">
        {ketQua === 'that'
          ? 'Nhật ký in và lời kể sáng thứ Hai là hai nguồn riêng, cùng khớp với lời Hoài. CLB giữ được phòng.'
          : 'Dữ liệu chỉ ra ai cần hỏi, không chỉ ra ai đã làm. Lần sau, ghé thêm vài nơi để có bằng chứng thứ hai.'}
      </p>
      <div className="endscreen__actions">
        <button type="button" className="btn btn--primary" onClick={onChoiLai} autoFocus>
          Chơi lại từ đầu
        </button>
        <button type="button" className="btn" onClick={onVeTieuDe}>
          Về màn tiêu đề
        </button>
      </div>
    </section>
  );
}
