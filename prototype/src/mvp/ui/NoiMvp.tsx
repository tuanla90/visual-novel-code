/**
 * MÀN TRONG MỘT ĐỊA ĐIỂM (gói `ban-do-di-lai`, QĐ-089): ảnh nền của nơi (ngày; buổi tối → ảnh `-dem` nếu có, không thì
 * ảnh ngày + lớp tối) phủ lớp màu nhẹ theo khung Sáng/Trưa/Chiều, và các VẬT / NGƯỜI bấm được đặt theo % của khung nền.
 *
 * - Khung nền giữ đúng tỉ lệ ảnh (`TI_LE_NEN`) và co trong vùng trống → điểm không trôi khi đổi cỡ màn.
 * - Mỗi điểm là `<button>`: `aria-label` = nhãn trung tính (`nhanChoXem`, KHÔNG dùng `moTa`), `title` = nhãn + tình
 *   trạng; viền trắng bám đường bao ảnh (CSS `drop-shadow` chồng lớp theo alpha) khi rê chuột VÀ khi focus bàn phím.
 *   Đã xem → mờ; chưa mở → không bấm được (không nói cần gì). Vùng chạm tối thiểu 44×44 (lớp vô hình quanh vật nhỏ).
 * - Vật dùng chung hai dữ kiện: một điểm; một dữ kiện mở → vào thẳng, nhiều hơn → chọn nhanh bằng nhãn trung tính.
 * - Danh sách chữ (`ChoXemXet`) là phương án dự phòng / trợ năng; dữ kiện chưa có dòng `- Ảnh:` chỉ chọn được ở đó.
 */
import { useState, type CSSProperties } from 'react';
import type { KichBanMvp } from '../../content/mvp/types';
import { diemTrongNoi, nhanTrongNoi, type DiemTuongTac } from '../engine/diem-tuong-tac';
import type { DiaDiemHienMvp, DuKienHienMvp } from '../engine/may';
import { anhNen, anhSprite, coNenDem } from './anh-mvp';
import { TI_LE_NEN } from './ban-do-mvp';

export interface NoiMvpProps {
  kb: KichBanMvp;
  noi: DiaDiemHienMvp;
  /** Mã khung giờ hiện tại (`sang` / `trua` / `chieu`), `null` = buổi tối. */
  khung: string | null;
  khungConLai: number;
  onChon: (duKien: string) => void;
  onVeBanDo: () => void;
}

function nhanKhung(k: DuKienHienMvp): string {
  return k.tonKhung === 0 ? 'không tốn khung' : `tốn ${k.tonKhung} khung`;
}

export function NoiMvp({ kb, noi, khung, khungConLai, onChon, onVeBanDo }: NoiMvpProps) {
  const [xemDs, setXemDs] = useState(false);
  const [nhomChon, setNhomChon] = useState<string | null>(null);
  const diem = diemTrongNoi(kb, noi);
  const nhan = nhanTrongNoi(kb, noi);
  const canh = noi.diaDiem.canh;
  const dem = khung === null;
  const nenDemRieng = dem && coNenDem(canh);
  const nen = anhNen(canh, dem);
  const soDe = { '--ti-le': `${TI_LE_NEN.rong} / ${TI_LE_NEN.cao}`, '--ti-le-so': TI_LE_NEN.rong / TI_LE_NEN.cao } as CSSProperties;
  const nhom = nhomChon ? diem.find((d) => d.khoa === nhomChon && d.moDuoc.length > 1) : undefined;
  const conMoi = noi.duKien.filter((k) => !k.daLam && !k.khoa).length;

  const bam = (d: DiemTuongTac): void => {
    if (d.moDuoc.length === 1 && d.moDuoc[0]) onChon(d.moDuoc[0].duKien.id);
    else if (d.moDuoc.length > 1) setNhomChon(d.khoa);
  };

  return (
    <div className="mvp-canh mvp-noi" role="region" aria-label={`Ở ${noi.diaDiem.ten}`}>
      {nen ? <div className="mvp-canh__mo" style={{ backgroundImage: `url("${nen}")` }} aria-hidden="true" /> : null}
      <div className="mvp-canh__dau">
        <div className="mvp-canh__tieude">
          <h2>{noi.diaDiem.ten}</h2>
          <p>
            Còn <strong>{khungConLai}</strong> khung giờ · {conMoi === 0 ? 'không còn gì mới' : `${conMoi} chỗ còn mới`}
          </p>
        </div>
        <div className="mvp-canh__nhom">
          <button type="button" className="btn mvp-canh__nut" onClick={onVeBanDo} title="Về bản đồ trường (không tốn khung)">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M9 4 3 6v14l6-2 6 2 6-2V4l-6 2-6-2Z" />
              <path d="M9 4v14M15 6v14" />
            </svg>
            <span>Về bản đồ</span>
          </button>
          <button
            type="button"
            className="btn mvp-canh__nut"
            aria-pressed={xemDs}
            onClick={() => setXemDs((v) => !v)}
            title={xemDs ? 'Ẩn danh sách chữ' : 'Xem các chỗ xem xét dạng danh sách chữ'}
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M9 6h11M9 12h11M9 18h11M4 6h.01M4 12h.01M4 18h.01" />
            </svg>
            <span>Danh sách</span>
          </button>
        </div>
      </div>

      <div className="mvp-canh__vung">
        <div className="mvp-canh__khung" style={soDe} data-khung={khung ?? 'toi'} data-dem-rieng={nenDemRieng ? 'true' : 'false'}>
          {nen ? <img className="mvp-canh__nen" src={nen} alt="" draggable={false} /> : <div className="mvp-canh__nen mvp-stage__nen-tam" />}
          {diem.map((d) => {
            const url = anhSprite(d.anh.sprite);
            const mo = d.trangThai === 'mo' && khungConLai > 0;
            const dau = d.moDuoc[0];
            const tinhTrang = d.trangThai === 'da-xem' ? 'đã xem' : d.trangThai === 'khoa' ? 'chưa mở' : d.moDuoc.length > 1 ? `${d.moDuoc.length} việc` : dau ? nhanKhung(dau) : '';
            const style = { left: `${d.anh.x}%`, top: `${d.anh.y}%`, width: `${d.anh.rong}%` } as CSSProperties;
            return (
              <button
                key={d.khoa}
                type="button"
                className={`mvp-diem is-${d.trangThai}${url ? '' : ' is-tam'}`}
                style={style}
                aria-label={d.nhan}
                title={`${d.nhan} — ${tinhTrang}`}
                disabled={!mo}
                data-diem={d.khoa}
                onClick={() => bam(d)}
              >
                {url ? <img className="mvp-diem__anh" src={url} alt="" draggable={false} /> : <span className="mvp-diem__tam" aria-hidden="true" />}
                {mo ? <span className="mvp-diem__cham" aria-hidden="true" /> : null}
              </button>
            );
          })}
          <div className="mvp-canh__mau" aria-hidden="true" />
        </div>
      </div>

      {nhom ? (
        <div className="mvp-canh__bang" role="dialog" aria-label="Chọn việc ở chỗ này">
          <ul className="mvp-dd__ds">
            {nhom.moDuoc.map((k) => (
              <li key={k.duKien.id}>
                <button type="button" className="mvp-dd__nut" onClick={() => onChon(k.duKien.id)} title={`Xem — ${nhanKhung(k)}`}>
                  <span className="mvp-dd__mota">{nhan.get(k.duKien.id)}</span>
                  <span className="mvp-dd__phu">{nhanKhung(k)}</span>
                </button>
              </li>
            ))}
          </ul>
          <button type="button" className="btn" onClick={() => setNhomChon(null)}>
            Thôi
          </button>
        </div>
      ) : null}

      {xemDs ? (
        <div className="mvp-canh__bang mvp-canh__bang--ds" role="dialog" aria-label={`Các chỗ xem xét ở ${noi.diaDiem.ten}`}>
          <ChoXemXet noi={noi} nhan={nhan} khungConLai={khungConLai} onChon={onChon} />
          <button type="button" className="btn" onClick={() => setXemDs(false)}>
            Đóng danh sách
          </button>
        </div>
      ) : null}
    </div>
  );
}

/** Danh sách chữ các chỗ xem xét của một nơi (dự phòng / trợ năng; gồm cả dữ kiện chưa đặt ảnh). */
export function ChoXemXet({
  noi,
  nhan,
  khungConLai,
  onChon,
}: {
  noi: DiaDiemHienMvp;
  nhan: ReadonlyMap<string, string>;
  khungConLai: number;
  onChon: (duKien: string) => void;
}) {
  return (
    <>
      {noi.duKien.length === 0 ? <p className="mvp-dd__trong">Chưa có gì để xem ở đây lúc này.</p> : null}
      <ul className="mvp-dd__ds">
        {noi.duKien.map((k) => {
          const tat = k.daLam || k.khoa || khungConLai <= 0;
          return (
            <li key={k.duKien.id}>
              <button
                type="button"
                className={`mvp-dd__nut${k.daLam ? ' is-xong' : ''}${k.khoa ? ' is-khoa' : ''}`}
                disabled={tat}
                onClick={() => onChon(k.duKien.id)}
                title={k.daLam ? 'Đã xem' : k.khoa ? 'Chưa đủ điều kiện để xem' : `Xem — ${nhanKhung(k)}`}
              >
                <span className="mvp-dd__mota">{nhan.get(k.duKien.id)}</span>
                <span className="mvp-dd__phu">{k.daLam ? 'Đã xem' : k.khoa ? 'Chưa mở' : nhanKhung(k)}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </>
  );
}
