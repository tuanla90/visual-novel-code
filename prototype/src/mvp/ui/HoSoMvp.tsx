/**
 * Ngăn kéo Hồ sơ bản MVP: ba nhóm giấy nhớ / tài liệu / bằng chứng (QĐ-086/087 — key item), thẻ theo thứ tự nhận.
 */
import type { KichBanMvp } from '../../content/mvp/types';
import type { HoSoMvp as HoSo } from '../engine/trang-thai';
import { TheHoSo } from './TheHoSo';

export interface HoSoMvpProps {
  kb: KichBanMvp;
  hoSo: HoSo;
  dienTen: (t: string) => string;
  onDong: () => void;
}

function Nhom({ kb, ten, ids, dienTen }: { kb: KichBanMvp; ten: string; ids: string[]; dienTen: (t: string) => string }) {
  return (
    <section className="mvp-hoso__nhom" aria-labelledby={`mvp-hoso-${ten}`}>
      <h3 id={`mvp-hoso-${ten}`} className="mvp-hoso__nhom-ten">
        {ten} <span className="mvp-hoso__dem">({ids.length})</span>
      </h3>
      {ids.length === 0 ? <p className="mvp-modal__trong">Chưa có.</p> : null}
      {ids.map((id) => {
        const the = kb.hoSo[id];
        return the ? <TheHoSo key={id} the={the} dienTen={dienTen} /> : (
          <p key={id} className="mvp-modal__trong">Vật chứng chưa có thẻ hồ sơ trong ho-so/ (mã kỹ thuật ẩn).</p>
        );
      })}
    </section>
  );
}

export function HoSoMvp({ kb, hoSo, dienTen, onDong }: HoSoMvpProps) {
  return (
    <div className="modal-backdrop" role="presentation" onClick={onDong}>
      <div className="modal mvp-modal mvp-modal--rong" role="dialog" aria-modal="true" aria-labelledby="mvp-hoso-tieude" onClick={(e) => e.stopPropagation()}>
        <h2 id="mvp-hoso-tieude" className="modal__title">Hồ sơ</h2>
        <div className="mvp-hoso">
          <Nhom kb={kb} ten="Giấy nhớ" ids={hoSo.manhMoi} dienTen={dienTen} />
          <Nhom kb={kb} ten="Tài liệu" ids={hoSo.taiLieu} dienTen={dienTen} />
          <Nhom kb={kb} ten="Bằng chứng" ids={hoSo.bangChung} dienTen={dienTen} />
        </div>
        <div className="modal__actions">
          <button type="button" className="btn btn--primary" onClick={onDong} autoFocus>
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}
