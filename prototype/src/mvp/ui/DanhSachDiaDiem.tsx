/**
 * Chọn địa điểm → dữ kiện từ DANH SÁCH (chưa có bản đồ — gói `ban-do-di-lai` sau). Đi lại không tốn khung;
 * mỗi dữ kiện ghi rõ tốn mấy khung (QĐ-089). Dữ kiện đã xem hiện mờ; dữ kiện chưa đủ điều kiện hiện khóa
 * (không nói cần gì). Nhãn chính/phụ/nhiễu KHÔNG hiện (đặc tả §18.4).
 */
import type { KichBanMvp } from '../../content/mvp/types';
import type { DiaDiemHienMvp } from '../engine/may';

export interface DanhSachDiaDiemProps {
  kb: KichBanMvp;
  diaDiem: DiaDiemHienMvp[];
  khungConLai: number;
  chinhXong: boolean;
  onChon: (diaDiem: string, duKien: string) => void;
  onKetThucNgay: () => void;
}

export function DanhSachDiaDiem({ kb, diaDiem, khungConLai, chinhXong, onChon, onKetThucNgay }: DanhSachDiaDiemProps) {
  const conViec = diaDiem.some((dd) => dd.duKien.some((k) => !k.daLam && !k.khoa));
  return (
    <div className="mvp-dd" role="region" aria-label="Chọn nơi đến">
      <div className="mvp-dd__dau">
        <h2 className="mvp-dd__tieude">Đi đâu bây giờ?</h2>
        <p className="mvp-dd__khung">
          Còn <strong>{khungConLai}</strong> khung giờ hôm nay · đi lại không tốn khung
        </p>
      </div>
      <ul className="mvp-dd__ds">
        {diaDiem.map((dd) => (
          <li key={dd.diaDiem.id} className="mvp-dd__noi">
            <h3 className="mvp-dd__ten">{dd.diaDiem.ten}</h3>
            {dd.duKien.length === 0 ? <p className="mvp-dd__trong">Chưa có gì để xem ở đây lúc này.</p> : null}
            <ul className="mvp-dd__dk">
              {dd.duKien.map((k) => {
                const tat = k.daLam || k.khoa || khungConLai <= 0;
                const nhanKhung = k.tonKhung === 0 ? 'không tốn khung' : `tốn ${k.tonKhung} khung`;
                return (
                  <li key={k.duKien.id}>
                    <button
                      type="button"
                      className={`mvp-dd__nut${k.daLam ? ' is-xong' : ''}${k.khoa ? ' is-khoa' : ''}`}
                      disabled={tat}
                      onClick={() => onChon(dd.diaDiem.id, k.duKien.id)}
                      title={k.daLam ? 'Đã xem' : k.khoa ? 'Chưa đủ điều kiện để xem' : `Xem — ${nhanKhung}`}
                    >
                      <span className="mvp-dd__mota">{k.duKien.moTa}</span>
                      <span className="mvp-dd__phu">{k.daLam ? 'Đã xem' : k.khoa ? 'Chưa mở' : nhanKhung}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </li>
        ))}
      </ul>
      <div className="mvp-dd__chan">
        <button type="button" className="btn" onClick={onKetThucNgay} title={chinhXong ? 'Nghỉ, sang ngày mai' : 'Hết việc hôm nay; đồng đội sẽ dẫn tới chỗ cần tới'}>
          {chinhXong ? 'Kết thúc ngày, về KTX' : `Kết thúc ngày sớm (${kb.lich.buoiToi.ten})`}
        </button>
        {!conViec && khungConLai > 0 ? <p className="mvp-dd__goiy">Không còn gì để xem — kết thúc ngày để đi tiếp.</p> : null}
      </div>
    </div>
  );
}
