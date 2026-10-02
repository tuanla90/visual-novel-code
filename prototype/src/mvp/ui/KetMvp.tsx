/**
 * Màn kết bản MVP: kết thật / kết thường (QĐ-086/090). Màn tra giờ chỉ còn một cách nhập (kéo giấy nhớ, mockup v7) nên
 * bỏ câu hỏi so ba cách nhập của QĐ-092. Tiêu đề không ghi "kết thật / kết thường" — đó là chữ của người làm game.
 */
import { LOI_CHOT, type TongKetVu } from '../engine/tong-ket';
import { anhTheoTen } from './anh-mvp';

export interface KetMvpProps {
  ketQua: 'that' | 'thuong';
  /** Vụ sau vừa kết (từ Vụ 2): chữ màn kết lấy từ lich.md; bỏ trống = màn kết Vụ 1. `so` = số thứ tự vụ (2, 3…). */
  vu?: { so: number; ten: string; tieuDeKet: string; loiKet: string } | null;
  /** Còn vụ chơi tiếp: hiện nút sang vụ đó (nút chính). */
  vuKe?: { so: number; ten: string } | null;
  onSangVuSau?: () => void;
  /** Nhiệm vụ phụ nhận được ở màn kết này: mỗi việc một nút "<người giao> nhờ: <tên việc>". */
  phu?: { id: string; ten: string; nguoiGiao: string }[];
  onLamPhu?: (id: string) => void;
  /** Màn kết của một nhiệm vụ phụ: chữ lấy từ lich.md, chỉ có nút quay lại. */
  phuXong?: { ten: string; tieuDeKet: string; loiKet: string } | null;
  onXongPhu?: () => void;
  /** Tổng kết vụ do chị Minh Anh chốt (bốn dòng đếm + một câu); bỏ trống = không hiện. */
  tongKet?: TongKetVu | null;
  onChoiLai: () => void;
  /** Bỏ trống = không có màn tiêu đề (bản chơi thử chỉ MVP). */
  onVeTieuDe?: () => void;
}

export function KetMvp({ ketQua, vu, vuKe, onSangVuSau, phu, onLamPhu, phuXong, onXongPhu, tongKet, onChoiLai, onVeTieuDe }: KetMvpProps) {
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
      {tongKet ? (
        <aside className={`mvp-chot mvp-chot--${tongKet.muc}`} aria-label="Chị Minh Anh chốt hồ sơ" style={anhTheoTen('ui-bien-ban') ? { backgroundImage: `url("${anhTheoTen('ui-bien-ban')}")` } : undefined}>
          <h3 className="mvp-chot__dau">Minh Anh chốt hồ sơ</h3>
          <ul className="mvp-chot__ds">
            <li>
              <span>Phiếu tra cứu đã ghim</span>
              <b>
                {tongKet.phieu.co}/{tongKet.phieu.tong}
              </b>
            </li>
            {tongKet.doiChat.tong > 0 ? (
              <li>
                <span>Giả thuyết bác đủ căn cứ</span>
                <b>
                  {tongKet.doiChat.du}/{tongKet.doiChat.tong}
                </b>
              </li>
            ) : null}
            {tongKet.cauHoi.tong > 0 ? (
              <li>
                <span>Câu hỏi đáp đúng ngay lần đầu</span>
                <b>
                  {tongKet.cauHoi.ngay}/{tongKet.cauHoi.tong}
                </b>
              </li>
            ) : null}
            {tongKet.mauGiay !== null ? (
              <li>
                <span>Mẩu giấy trong sổ CLB</span>
                <b>{tongKet.mauGiay ? 'đã tìm thấy' : 'chưa thấy'}</b>
              </li>
            ) : null}
          </ul>
          <p className="mvp-chot__loi">“{LOI_CHOT[tongKet.muc]}”</p>
          <span className="mvp-chot__moc" aria-hidden="true">
            {tongKet.muc === 'kin' ? '✓' : tongKet.muc === 'du' ? '~' : '!'}
          </span>
        </aside>
      ) : null}
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
