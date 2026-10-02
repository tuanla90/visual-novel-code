/**
 * Màn kết bản MVP: kết thật / kết thường (QĐ-086/090). Màn tra giờ chỉ còn một cách nhập (kéo giấy nhớ, mockup v7) nên
 * bỏ câu hỏi so ba cách nhập của QĐ-092. Tiêu đề không ghi "kết thật / kết thường" — đó là chữ của người làm game.
 */
import { anhTheoTen } from './anh-mvp';

export interface KetMvpProps {
  ketQua: 'that' | 'thuong';
  /** Vụ sau vừa kết (từ Vụ 2): chữ màn kết lấy từ lich.md; bỏ trống = màn kết Vụ 1. `so` = số thứ tự vụ (2, 3…);
   * `id` = mã vụ, có ảnh `cg-ket-<mã vụ>` thì hiện làm CG kết. */
  vu?: { id?: string; so: number; ten: string; tieuDeKet: string; loiKet: string } | null;
  /** Còn vụ chơi tiếp: hiện nút sang vụ đó (nút chính). */
  vuKe?: { so: number; ten: string } | null;
  onSangVuSau?: () => void;
  /** Nhiệm vụ phụ nhận được ở màn kết này: mỗi việc một nút "<người giao> nhờ: <tên việc>". */
  phu?: { id: string; ten: string; nguoiGiao: string }[];
  onLamPhu?: (id: string) => void;
  /** Màn kết của một nhiệm vụ phụ: chữ lấy từ lich.md, chỉ có nút quay lại. */
  phuXong?: { ten: string; tieuDeKet: string; loiKet: string } | null;
  onXongPhu?: () => void;
  onChoiLai: () => void;
  /** Bỏ trống = không có màn tiêu đề (bản chơi thử chỉ MVP). */
  onVeTieuDe?: () => void;
}

export function KetMvp({ ketQua, vu, vuKe, onSangVuSau, phu, onLamPhu, phuXong, onXongPhu, onChoiLai, onVeTieuDe }: KetMvpProps) {
  if (phuXong) {
    return (
      <section className="endscreen mvp-ket" aria-labelledby="mvp-ket-tieude">
        <p className="mvp-chal__kicker">Xong việc — {phuXong.ten}</p>
        <h2 id="mvp-ket-tieude" className="endscreen__title">
          {phuXong.tieuDeKet}
        </h2>
        <p className="endscreen__lead">{phuXong.loiKet}</p>
        <div className="endscreen__actions">
          <button type="button" className="btn btn--primary" onClick={onXongPhu} autoFocus>
            Quay lại
          </button>
        </div>
      </section>
    );
  }
  const cg = vu ? (vu.id ? anhTheoTen(`cg-ket-${vu.id}`) : undefined) : anhTheoTen(ketQua === 'that' ? 'cg-ket-that' : 'cg-ket-thuong');
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
        {(phu ?? []).map((p) => (
          <button key={p.id} type="button" className="btn" onClick={() => onLamPhu?.(p.id)}>
            {p.nguoiGiao} nhờ: {p.ten}
          </button>
        ))}
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
