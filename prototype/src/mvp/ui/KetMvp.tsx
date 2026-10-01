/**
 * Màn kết bản MVP: kết thật / kết thường (QĐ-086/090). Màn tra giờ chỉ còn một cách nhập (kéo giấy nhớ, mockup v7) nên
 * bỏ câu hỏi so ba cách nhập của QĐ-092. Tiêu đề không ghi "kết thật / kết thường" — đó là chữ của người làm game.
 */
import { anhTheoTen } from './anh-mvp';

export interface KetMvpProps {
  ketQua: 'that' | 'thuong';
  /** Vụ sau vừa kết (từ Vụ 2): chữ màn kết lấy từ lich.md; bỏ trống = màn kết Vụ 1. `so` = số thứ tự vụ (2, 3…). */
  vu?: { so: number; ten: string; tieuDeKet: string; loiKet: string } | null;
  /** Còn vụ chơi tiếp: hiện nút sang vụ đó (nút chính). */
  vuKe?: { so: number; ten: string } | null;
  onSangVuSau?: () => void;
  onChoiLai: () => void;
  /** Bỏ trống = không có màn tiêu đề (bản chơi thử chỉ MVP). */
  onVeTieuDe?: () => void;
}

export function KetMvp({ ketQua, vu, vuKe, onSangVuSau, onChoiLai, onVeTieuDe }: KetMvpProps) {
  const cg = vu ? undefined : anhTheoTen(ketQua === 'that' ? 'cg-ket-that' : 'cg-ket-thuong');
  const coVuKe = !!vuKe && !!onSangVuSau;
  return (
    <section className="endscreen mvp-ket" aria-labelledby="mvp-ket-tieude">
      {cg ? <img className="mvp-ket__cg" src={cg} alt="" draggable={false} /> : null}
      <p className="mvp-chal__kicker">{vu ? `Hết Vụ ${vu.so} — ${vu.ten}` : 'Hết Vụ 1 — Chữ ký H'}</p>
      <h2 id="mvp-ket-tieude" className="endscreen__title">
        {vu ? vu.tieuDeKet : ketQua === 'that' ? 'Người nộp không phải người viết' : 'Mới chỉ là một ý kiến sinh viên'}
      </h2>
      <p className="endscreen__lead">
        {vu
          ? vu.loiKet
          : ketQua === 'that'
            ? 'Nhật ký in và lời kể sáng thứ Hai là hai nguồn riêng, cùng khớp với lời Hoài. CLB giữ được phòng.'
            : 'Dữ liệu chỉ ra ai cần hỏi, không chỉ ra ai đã làm. Muốn biết ai viết thư, cần thêm bằng chứng từ nơi khác.'}
      </p>
      <div className="endscreen__actions">
        {coVuKe ? (
          <button type="button" className="btn btn--primary" onClick={onSangVuSau} autoFocus>
            Sang Vụ {vuKe.so} — {vuKe.ten}
          </button>
        ) : null}
        <button type="button" className={coVuKe ? 'btn' : 'btn btn--primary'} onClick={onChoiLai} autoFocus={!coVuKe}>
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
