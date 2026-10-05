/**
 * Màn kết bản MVP: kết thật / kết thường (QĐ-086/090). Màn tra giờ chỉ còn một cách nhập (kéo giấy nhớ, mockup v7) nên
 * bỏ câu hỏi so ba cách nhập của QĐ-092. Tiêu đề không ghi "kết thật / kết thường" — đó là chữ của người làm game.
 */
import { useEffect, useState } from 'react';
import { LOI_CHOT, tinhHang, type TongKetVu } from '../engine/tong-ket';
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
  phuDangDo?: { id: string; ten: string; nguoiGiao: string }[];
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

export function KetMvp({
  ketQua,
  vu,
  vuKe,
  onSangVuSau,
  phu,
  phuDangDo,
  onLamPhu,
  phuXong,
  onXongPhu,
  tongKet,
  onChoiLai,
  onVeTieuDe,
}: KetMvpProps) {
  const [xemAnhLon, setXemAnhLon] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setXemAnhLon(false);
    };
    if (xemAnhLon) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [xemAnhLon]);

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
  const bienBan = anhTheoTen('ui-bien-ban');
  const hang = tongKet ? (tongKet.hang ?? tinhHang(tongKet.phanTram)) : null;

  return (
    <>
      <section
        className={`endscreen mvp-ket mvp-ket--moi${cg ? ' co-cg' : ''}${tongKet ? ' co-tong-ket' : ''}`}
        aria-labelledby="mvp-ket-tieude"
      >
        <div className="mvp-ket__cot mvp-ket__cot--chinh">
          <div className="mvp-ket__than">
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
          </div>

          {cg ? (
            <div
              className="mvp-ket__anh"
              onClick={() => setXemAnhLon(true)}
              title="Nhấp để phóng to ảnh CG"
            >
              <img className="mvp-ket__cg" src={cg} alt="" draggable={false} />
              <span className="mvp-ket__anh-hint">🔍 Phóng to ảnh</span>
            </div>
          ) : null}

          {vuKe || (phu ?? []).length > 0 || (phuDangDo ?? []).length > 0 ? (
            <p className="endscreen__lead mvp-ket__tuyen-mo">
              Các tuyến đang mở vẫn chờ bạn. Cứ nối tiếp vụ chính, nhận một việc mới, hoặc quay lại việc đang làm dở.
            </p>
          ) : null}

          <div className="endscreen__actions">
            {coVuKe ? (
              <button type="button" className="btn btn--primary" onClick={onSangVuSau} autoFocus>
                Tiếp tục vụ chính · Vụ {vuKe.so}: {vuKe.ten}
              </button>
            ) : null}
            {(phu ?? []).map((p) => (
              <button key={p.id} type="button" className="btn" onClick={() => onLamPhu?.(p.id)}>
                {p.nguoiGiao} nhờ · {p.ten}
              </button>
            ))}
            {(phuDangDo ?? []).map((p) => (
              <button key={p.id} type="button" className="btn" onClick={() => onLamPhu?.(p.id)}>
                Tiếp tục việc đã cất · {p.ten}
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
        </div>

        {tongKet && hang ? (
          <div className="mvp-ket__cot mvp-ket__cot--phu">
            <aside
              className={`mvp-chot mvp-chot--${tongKet.muc}`}
              aria-label="Chị Minh Anh chốt hồ sơ"
              style={bienBan ? { backgroundImage: `url("${bienBan}")` } : undefined}
            >
              <div className="mvp-chot__dau-hang">
                <h3 className="mvp-chot__dau">Minh Anh chốt hồ sơ</h3>
                <div
                  className={`mvp-chot__hang mvp-chot__hang--${hang.toLowerCase()}`}
                  aria-label={`Xếp hạng ${hang} - Hoàn thành ${tongKet.phanTram}%`}
                >
                  <span className="mvp-chot__hang-chu">{hang}</span>
                  <span className="mvp-chot__hang-pt">{tongKet.phanTram}%</span>
                </div>
              </div>
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
                {tongKet.doiChat.tong > 0 ? (
                  <li>
                    <span>Đối chất giữ được uy tín</span>
                    <b>
                      {tongKet.doiChat.tong - tongKet.hetLuot}/{tongKet.doiChat.tong}
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
                {tongKet.chuyenAn.tong > 0 ? (
                  <li>
                    <span>Chuyện ẩn đã khám phá</span>
                    <b>
                      {tongKet.chuyenAn.co}/{tongKet.chuyenAn.tong}
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
          </div>
        ) : null}
      </section>

      {xemAnhLon && cg ? (
        <div className="mvp-ket__lightbox" onClick={() => setXemAnhLon(false)} role="dialog" aria-modal="true" aria-label="Xem ảnh lớn">
          <div className="mvp-ket__lightbox-khung" onClick={(e) => e.stopPropagation()}>
            <img className="mvp-ket__lightbox-img" src={cg} alt="Ảnh CG kết thúc vụ" />
            <button type="button" className="mvp-ket__lightbox-dong" onClick={() => setXemAnhLon(false)}>
              Đóng (ESC)
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}
