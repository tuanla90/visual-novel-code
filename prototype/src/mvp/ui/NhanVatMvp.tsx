/**
 * Tab "Nhân vật" của Hồ sơ bản MVP — giao diện thẻ Polaroid của prototype (`CharaProfileView`, `chara-profile.css`),
 * dữ liệu từ thẻ giới thiệu nhan-vat.md. Chỉ liệt kê nhân vật đã gặp (đã hiện màn "Nhân vật mới"), theo thứ tự gặp;
 * không có mục "ghi chú điều tra" (chữ ở đây không được kể trước tình tiết).
 */
import '../../evidence/ui/chara-profile.css';
import { useState } from 'react';
import { HighlightText } from '../../shared/highlight/HighlightText';
import type { KichBanMvp, TruongBietMvp } from '../../content/mvp/types';
import { truongDaBietTu } from '../engine/may';
import { anhChanDung, anhNen } from './anh-mvp';
import { mauNhanVat } from './mau-nhan-vat';
import { soundEngine } from '../../shared/audio/sound-engine';

/** Nhãn biểu cảm trên nút chọn (như prototype). */
const NHAN_BIEU_CAM: Record<string, string> = {
  neutral: 'Bình thường',
  happy: 'Vui',
  smile: 'Cười',
  worried: 'Lo lắng',
  thinking: 'Suy nghĩ',
  smug: 'Tự tin',
  stunned: 'Sững sờ',
  nervous: 'Căng thẳng',
  downcast: 'Buồn',
  relieved: 'Nhẹ nhõm',
  surprised: 'Ngạc nhiên',
  serious: 'Nghiêm túc',
  annoyed: 'Khó chịu',
  stern: 'Nghiêm khắc',
  // Dáng & biểu cảm đặc thù trong game:
  'gai-dau': 'Gãi đầu',
  'chi-tay': 'Chỉ tay',
  'day-kinh': 'Đẩy kính',
  'khoanh-tay': 'Khoanh tay',
  'chi-man': 'Chỉ màn',
  'ao-xanh': 'Áo xanh',
  'ao-xanh-happy': 'Áo xanh (Vui)',
  'ao-xanh-worried': 'Áo xanh (Lo)',
  'ao-xanh-gai-dau': 'Áo xanh (Bí)',
  'ao-xanh-chi-tay': 'Áo xanh (Chỉ)',
  'ao-xanh-surprised': 'Áo xanh (Ngạc nhiên)',
  'ao-xanh-thinking': 'Áo xanh (Nghĩ)',
  'ao-xanh-doi-mu': 'Đội mũ',
};

/** Bối cảnh đặc trưng của từng nhân vật trong hồ sơ (thay vì cố định một nền CLB) */
const NEN_NHAN_VAT: Record<string, string> = {
  'ba-lua': 'tra-da',
  'chu-cuong': 'cong-ktx',
  'bac-tu': 'sanh-toa-b',
  'co-hanh': 'phong-dao-tao',
  'co-lan': 'phong-ctsv',
  'thay-quang': 'phong-hop',
  'quan': 'phong-hop',
  'nam': 'xuong-robot',
  'khanh': 'phong-hop',
  'bach': 'xuong-robot',
  'thao': 'xuong-robot',
  'ha-vy': 'thu-vien',
  'hoai': 'thu-vien',
  'tung': 'phong-ktx',
  'minh-anh': 'phong-clb',
  'duy': 'phong-clb',
  'hieu': 'sanh-toa-b',
};

export interface NhanVatMvpProps {
  kb: KichBanMvp;
  daGap: readonly string[];
  /** `TrangThaiMvp.bietVe` (gói B18): ô thẻ đã biết thêm nhờ `[BIẾT]`; thẻ không khai "Biết lúc gặp" thì ghi hết như cũ. */
  bietVe?: Readonly<Record<string, readonly TruongBietMvp[]>> | null;
}

export function NhanVatMvp({ kb, daGap, bietVe }: NhanVatMvpProps) {
  const ds = daGap.map((id) => kb.nhanVat.find((n) => n.id === id)).filter((n) => n?.gioiThieu != null);
  const [chon, setChon] = useState<string | null>(ds[0]?.id ?? null);
  const nv = ds.find((n) => n?.id === chon) ?? ds[0];
  const [bieuCam, setBieuCam] = useState<string | null>(null);
  const maNen = nv ? (NEN_NHAN_VAT[nv.id] ?? 'phong-clb') : 'phong-clb';
  const nen = anhNen(maNen);

  if (!nv?.gioiThieu) {
    return (
      <div className="chara-profile mvp-nhanvat">
        <p className="mvp-kho__trong">Chưa gặp ai. Người bạn gặp trên đường sẽ có hồ sơ ở đây.</p>
      </div>
    );
  }
  const gt = nv.gioiThieu;
  // Gói B18: ô chưa biết in "?" (họ tên, danh xưng, năm, ngành); lịch và câu nói chưa biết thì ẩn hẳn.
  const biet = truongDaBietTu(gt, bietVe?.[nv.id]);
  const bietHoTen = biet.has('ho-ten');
  const bc = bieuCam && nv.bieuCam.includes(bieuCam) ? bieuCam : (nv.bieuCam[0] ?? 'neutral');
  const anh = anhChanDung(nv.id, bc);
  // Nhân vật chỉ có một ảnh (mọi biểu cảm mượn ảnh neo) → không cần tương tác đổi biểu cảm.
  const nhieuAnh = new Set(nv.bieuCam.map((b) => anhChanDung(nv.id, b))).size > 1;

  const doiBieuCamTiep = () => {
    if (!nv || nv.bieuCam.length <= 1) return;
    const idx = nv.bieuCam.indexOf(bc);
    const tiep = (idx + 1) % nv.bieuCam.length;
    setBieuCam(nv.bieuCam[tiep] ?? null);
    soundEngine.playSfx('click');
  };

  return (
    <div className="chara-profile mvp-nhanvat" data-character={nv.id}>
      <nav className="chara-profile__nav" aria-label="Nhân vật đã gặp">
        {ds.map((n) =>
          n ? (
            <button
              key={n.id}
              type="button"
              className={`chara-profile__tab${n.id === nv.id ? ' is-active' : ''}`}
              aria-pressed={n.id === nv.id}
              onClick={() => {
                setChon(n.id);
                setBieuCam(null);
              }}
            >
              <span className="chara-profile__tab-dot" style={{ backgroundColor: mauNhanVat(n.id) }} aria-hidden="true" />
              <span className="chara-profile__tab-name">{n.ten}</span>
            </button>
          ) : null,
        )}
      </nav>

      <div className="chara-profile__body">
        <div className="chara-profile__showcase">
          <div className="chara-profile__polaroid-stack">
            <div className="chara-profile__polaroid-underlay" aria-hidden="true" />
            <div
              className={`chara-profile__polaroid anim-card-enter${nhieuAnh ? ' is-interactive' : ''}`}
              key={nv.id}
              onClick={nhieuAnh ? doiBieuCamTiep : undefined}
              onKeyDown={(e) => {
                if (nhieuAnh && (e.key === 'Enter' || e.key === ' ')) {
                  e.preventDefault();
                  doiBieuCamTiep();
                }
              }}
              tabIndex={nhieuAnh ? 0 : undefined}
              role={nhieuAnh ? 'button' : undefined}
              aria-label={nhieuAnh ? `Nhân vật ${nv.ten}, biểu cảm: ${NHAN_BIEU_CAM[bc] ?? bc}. Nhấn vào ảnh để đổi biểu cảm` : undefined}
              title={nhieuAnh ? `Nhấn vào ảnh để đổi biểu cảm (${nv.bieuCam.indexOf(bc) + 1}/${nv.bieuCam.length})` : undefined}
            >
              <div
                className="chara-profile__art-wrap"
                style={nen ? { backgroundImage: `url(${nen})`, backgroundSize: 'cover', backgroundPosition: 'center' } : undefined}
              >
                <div className="chara-profile__portrait-large mvp-nhanvat__anh">
                  {anh ? (
                    <img
                      key={`${nv.id}-${bc}`}
                      className="anim-expr-change"
                      src={anh}
                      alt={`${nv.ten}, ${NHAN_BIEU_CAM[bc] ?? bc}`}
                      draggable={false}
                    />
                  ) : null}
                </div>
              </div>
              <div className="chara-profile__signature" aria-hidden="true">
                <span className="chara-profile__signature-text">{nv.ten}</span>
              </div>
              {nhieuAnh ? (
                <div className="chara-profile__expr-badge" aria-hidden="true">
                  <span className="chara-profile__expr-badge-icon">🎭</span>
                  <span className="chara-profile__expr-badge-name">{NHAN_BIEU_CAM[bc] ?? bc}</span>
                  <span className="chara-profile__expr-badge-count">({nv.bieuCam.indexOf(bc) + 1}/{nv.bieuCam.length})</span>
                </div>
              ) : null}
            </div>
          </div>
        </div>

        <div className="chara-profile__info anim-info-enter" key={nv.id}>
          <div className="chara-profile__name-row">
            <h3 className="chara-profile__name">
              <span>{bietHoTen ? (nv.hoTen ?? nv.ten) : nv.ten}</span>
            </h3>
            <div className="chara-profile__role-tag">
              <span>{biet.has('danh-xung') ? gt.danhXung : '?'}</span>
            </div>
          </div>

          {gt.nam || gt.nganh ? (
            <dl className="chara-profile__specs">
              {gt.nam ? (
                <div className="chara-profile__spec-item">
                  <dt>KHÓA:</dt>
                  <dd>{biet.has('nam') ? gt.nam : '?'}</dd>
                </div>
              ) : null}
              {gt.nganh ? (
                <div className="chara-profile__spec-item">
                  <dt>NGÀNH:</dt>
                  <dd>{biet.has('nganh') ? gt.nganh : '?'}</dd>
                </div>
              ) : null}
            </dl>
          ) : null}

          {gt.cauNoi && biet.has('cau-noi') ? (
            <blockquote className="chara-profile__quote">
              <p className="chara-profile__quote-text">“{gt.cauNoi}”</p>
            </blockquote>
          ) : null}

          <section className="chara-profile__section">
            <div className="chara-profile__pill-header">GIỚI THIỆU</div>
            <div className="chara-profile__section-content">
              <p><HighlightText text={gt.loi} /></p>
              {gt.lich && biet.has('lich') ? (
                <p className="mvp-nhanvat__lich">
                  <b>Thường gặp ở đâu:</b> {gt.lich}
                </p>
              ) : null}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
