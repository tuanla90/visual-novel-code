/**
 * Màn kết bản MVP: kết thật / kết thường (QĐ-086/090). Màn tra giờ chỉ còn một cách nhập (kéo giấy nhớ, mockup v7) nên
 * bỏ câu hỏi so ba cách nhập của QĐ-092. Tiêu đề không ghi "kết thật / kết thường" — đó là chữ của người làm game.
 */
import { anhTheoTen } from './anh-mvp';

export interface KetMvpProps {
  ketQua: 'that' | 'thuong';
  onChoiLai: () => void;
  /** Bỏ trống = không có màn tiêu đề (bản chơi thử chỉ MVP). */
  onVeTieuDe?: () => void;
}

export function KetMvp({ ketQua, onChoiLai, onVeTieuDe }: KetMvpProps) {
  const cg = anhTheoTen(ketQua === 'that' ? 'cg-ket-that' : 'cg-ket-thuong');
  return (
    <section className="endscreen mvp-ket" aria-labelledby="mvp-ket-tieude">
      {cg ? <img className="mvp-ket__cg" src={cg} alt="" draggable={false} /> : null}
      <p className="mvp-chal__kicker">Hết Vụ 1 — Chữ ký H</p>
      <h2 id="mvp-ket-tieude" className="endscreen__title">
        {ketQua === 'that' ? 'Người nộp không phải người viết' : 'Mới chỉ là một ý kiến sinh viên'}
      </h2>
      <p className="endscreen__lead">
        {ketQua === 'that'
          ? 'Nhật ký in và lời kể sáng thứ Hai là hai nguồn riêng, cùng khớp với lời Hoài. CLB giữ được phòng.'
          : 'Dữ liệu chỉ ra ai cần hỏi, không chỉ ra ai đã làm. Muốn biết ai viết thư, cần thêm bằng chứng từ nơi khác.'}
      </p>
      <div className="endscreen__actions">
        <button type="button" className="btn btn--primary" onClick={onChoiLai} autoFocus>
          Chơi lại từ đầu
        </button>
        {onVeTieuDe ? (
          <button type="button" className="btn" onClick={onVeTieuDe}>
            Về màn tiêu đề
          </button>
        ) : null}
      </div>
    </section>
  );
}
