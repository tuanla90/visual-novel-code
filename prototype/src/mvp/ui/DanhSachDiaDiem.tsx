/**
 * Chọn địa điểm → dữ kiện từ DANH SÁCH (chưa có bản đồ — gói `ban-do-di-lai` sau). Đi lại không tốn khung;
 * mỗi dữ kiện ghi rõ tốn mấy khung (QĐ-089). Dữ kiện đã xem hiện mờ; dữ kiện chưa đủ điều kiện hiện khóa
 * (không nói cần gì). Nhãn chính/phụ/nhiễu KHÔNG hiện (đặc tả §18.4).
 *
 * Hai bước (user chốt 29/09): danh sách chỉ hiện TÊN địa điểm; vào một nơi mới thấy các chỗ xem xét, gắn nhãn
 * trung tính (`nhanChoXem`) — không dùng `moTa` của dữ kiện vì dòng đó viết cho tác giả và kể trước manh mối.
 */
import { useState } from 'react';
import type { KichBanMvp } from '../../content/mvp/types';
import type { DiaDiemHienMvp } from '../engine/may';
import { nhanChoXemDs } from '../engine/nhan-cho-xem';

export interface DanhSachDiaDiemProps {
  kb: KichBanMvp;
  diaDiem: DiaDiemHienMvp[];
  khungConLai: number;
  chinhXong: boolean;
  onChon: (diaDiem: string, duKien: string) => void;
  onKetThucNgay: () => void;
}

export function DanhSachDiaDiem({ kb, diaDiem, khungConLai, chinhXong, onChon, onKetThucNgay }: DanhSachDiaDiemProps) {
  const [dangO, setDangO] = useState<string | null>(null);
  const conViec = diaDiem.some((dd) => dd.duKien.some((k) => !k.daLam && !k.khoa));
  const noi = dangO ? diaDiem.find((dd) => dd.diaDiem.id === dangO) : undefined;

  return (
    <div className="mvp-dd" role="region" aria-label="Chọn nơi đến">
      <div className="mvp-dd__dau">
        <h2 className="mvp-dd__tieude">{noi ? noi.diaDiem.ten : 'Đi đâu bây giờ?'}</h2>
        <p className="mvp-dd__khung">
          Còn <strong>{khungConLai}</strong> khung giờ hôm nay · đi lại không tốn khung
        </p>
      </div>

      {noi ? (
        <ChoXemXet kb={kb} noi={noi} khungConLai={khungConLai} onChon={onChon} onQuayLai={() => setDangO(null)} />
      ) : (
        <ul className="mvp-dd__ds">
          {diaDiem.map((dd) => {
            const conMo = dd.duKien.filter((k) => !k.daLam && !k.khoa).length;
            return (
              <li key={dd.diaDiem.id}>
                <button
                  type="button"
                  className={`mvp-dd__nut mvp-dd__nut--noi${conMo === 0 ? ' is-xong' : ''}`}
                  onClick={() => setDangO(dd.diaDiem.id)}
                  title={`Đến ${dd.diaDiem.ten}`}
                >
                  <span className="mvp-dd__mota">{dd.diaDiem.ten}</span>
                  <span className="mvp-dd__phu">{conMo === 0 ? 'Không còn gì mới' : `${conMo} chỗ để xem`}</span>
                </button>
              </li>
            );
          })}
        </ul>
      )}

      {noi ? null : (
        <div className="mvp-dd__chan">
          <button type="button" className="btn" onClick={onKetThucNgay} title={chinhXong ? 'Nghỉ, sang ngày mai' : 'Hết việc hôm nay; đồng đội sẽ dẫn tới chỗ cần tới'}>
            {chinhXong ? 'Kết thúc ngày, về KTX' : `Kết thúc ngày sớm (${kb.lich.buoiToi.ten})`}
          </button>
          {!conViec && khungConLai > 0 ? <p className="mvp-dd__goiy">Không còn gì để xem — kết thúc ngày để đi tiếp.</p> : null}
        </div>
      )}
    </div>
  );
}

function ChoXemXet({
  kb,
  noi,
  khungConLai,
  onChon,
  onQuayLai,
}: {
  kb: KichBanMvp;
  noi: DiaDiemHienMvp;
  khungConLai: number;
  onChon: (diaDiem: string, duKien: string) => void;
  onQuayLai: () => void;
}) {
  const nhan = nhanChoXemDs(
    kb,
    noi.duKien.map((k) => k.duKien),
  );
  return (
    <>
      {noi.duKien.length === 0 ? <p className="mvp-dd__trong">Chưa có gì để xem ở đây lúc này.</p> : null}
      <ul className="mvp-dd__ds">
        {noi.duKien.map((k, i) => {
          const tat = k.daLam || k.khoa || khungConLai <= 0;
          const nhanKhung = k.tonKhung === 0 ? 'không tốn khung' : `tốn ${k.tonKhung} khung`;
          return (
            <li key={k.duKien.id}>
              <button
                type="button"
                className={`mvp-dd__nut${k.daLam ? ' is-xong' : ''}${k.khoa ? ' is-khoa' : ''}`}
                disabled={tat}
                onClick={() => onChon(noi.diaDiem.id, k.duKien.id)}
                title={k.daLam ? 'Đã xem' : k.khoa ? 'Chưa đủ điều kiện để xem' : `Xem — ${nhanKhung}`}
              >
                <span className="mvp-dd__mota">{nhan[i]}</span>
                <span className="mvp-dd__phu">{k.daLam ? 'Đã xem' : k.khoa ? 'Chưa mở' : nhanKhung}</span>
              </button>
            </li>
          );
        })}
      </ul>
      <div className="mvp-dd__chan">
        <button type="button" className="btn" onClick={onQuayLai} title="Quay lại danh sách nơi đến">
          ← Chọn nơi khác
        </button>
      </div>
    </>
  );
}
