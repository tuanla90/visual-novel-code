/**
 * BẢN ĐỒ TRƯỜNG (gói `ban-do-di-lai`, QĐ-077): lúc tự do trong ngày, người chơi chọn nơi đến bằng ghim.
 * Ghim chỉ hiện cho nơi đang mở (`Mở từ`), kèm số chỗ còn mới; bấm → đến nơi (KHÔNG tốn khung — khung chỉ tính khi xem
 * một chỗ, QĐ-089). Ghim tòa nhiều phòng → chọn phòng. Ghim là `<button>`, Tab đi qua được.
 * Ảnh, tỉ lệ và tọa độ ghim nằm hết trong `ban-do-mvp.ts` (thay ảnh không đụng tệp này).
 */
import { useState, type CSSProperties } from 'react';
import { ghimHien, noiNgoaiBanDo, soChoMoi } from '../engine/diem-tuong-tac';
import type { DiaDiemHienMvp } from '../engine/may';
import type { BanDoMvp as DuLieuBanDo } from './ban-do-mvp';

export interface BanDoMvpProps {
  banDo: DuLieuBanDo;
  diaDiem: DiaDiemHienMvp[];
  khungConLai: number;
  chinhXong: boolean;
  tenBuoiToi: string;
  onDen: (diaDiem: string) => void;
  onKetThucNgay: () => void;
}

function chuMoi(n: number): string {
  return n === 0 ? 'không còn gì mới' : `${n} chỗ còn mới`;
}

export function BanDoMvp({ banDo, diaDiem, khungConLai, chinhXong, tenBuoiToi, onDen, onKetThucNgay }: BanDoMvpProps) {
  const [toaMo, setToaMo] = useState<string | null>(null);
  const ghim = ghimHien(banDo.ghim, diaDiem);
  const ngoai = noiNgoaiBanDo(banDo.ghim, diaDiem);
  const toa = toaMo ? ghim.find((g) => g.ghim.id === toaMo) : undefined;
  const conViec = diaDiem.some((dd) => soChoMoi(dd) > 0);
  const soDe = { '--ti-le': `${banDo.rong} / ${banDo.cao}`, '--ti-le-so': banDo.rong / banDo.cao } as CSSProperties;

  return (
    <div className="mvp-canh mvp-bando" role="region" aria-label="Bản đồ trường">
      <div className="mvp-canh__mo mvp-bando__mo" style={{ backgroundImage: `url("${banDo.anh}")` }} aria-hidden="true" />
      <div className="mvp-canh__dau">
        <div className="mvp-canh__tieude">
          <h2>Đi đâu bây giờ?</h2>
          <p>
            Còn <strong>{khungConLai}</strong> khung giờ hôm nay · đi lại không tốn khung
          </p>
        </div>
        <button
          type="button"
          className="btn mvp-canh__nut"
          onClick={onKetThucNgay}
          title={chinhXong ? 'Nghỉ, sang ngày mai' : 'Hết việc hôm nay; đồng đội sẽ dẫn tới chỗ cần tới'}
        >
          {chinhXong ? 'Kết thúc ngày, về KTX' : `Kết thúc ngày sớm (${tenBuoiToi})`}
        </button>
      </div>

      <div className="mvp-canh__vung">
        <div className="mvp-canh__khung mvp-bando__khung" style={soDe}>
          <img className="mvp-canh__nen" src={banDo.anh} alt="" draggable={false} />
          {ghim.map(({ ghim: g, noi, conMoi }) => {
            const nhieu = noi.length > 1;
            const style = { left: `${g.x}%`, top: `${g.y}%` } as CSSProperties;
            return (
              <button
                key={g.id}
                type="button"
                className={`mvp-ghim${conMoi === 0 ? ' is-xong' : ''}${g.x >= 80 ? ' mvp-ghim--phai' : g.x <= 20 ? ' mvp-ghim--trai' : ''}`}
                style={style}
                aria-label={`${g.ten}: ${chuMoi(conMoi)}`}
                aria-haspopup={nhieu ? 'dialog' : undefined}
                title={nhieu ? `${g.ten} — chọn phòng (${chuMoi(conMoi)})` : `Đến ${g.ten} (${chuMoi(conMoi)})`}
                data-ghim={g.id}
                onClick={() => {
                  if (nhieu) setToaMo(g.id);
                  else if (noi[0]) onDen(noi[0].diaDiem.id);
                }}
              >
                <svg className="mvp-ghim__kim" viewBox="0 0 24 32" width="24" height="32" aria-hidden="true">
                  <path d="M12 31s10-11.2 10-19A10 10 0 0 0 2 12c0 7.8 10 19 10 19Z" fill="currentColor" stroke="#fff" strokeWidth="1.5" />
                  <circle cx="12" cy="12" r="3.6" fill="#fff" />
                </svg>
                <span className="mvp-ghim__nhan">
                  <span className="mvp-ghim__ten">{g.ten}</span>
                  {conMoi > 0 ? (
                    <span className="mvp-ghim__so" aria-hidden="true">
                      {conMoi}
                    </span>
                  ) : null}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {ngoai.length > 0 ? (
        <ul className="mvp-bando__ngoai" aria-label="Nơi khác">
          {ngoai.map((dd) => (
            <li key={dd.diaDiem.id}>
              <button type="button" className="btn" onClick={() => onDen(dd.diaDiem.id)} title={`Đến ${dd.diaDiem.ten}`}>
                {dd.diaDiem.ten} · {chuMoi(soChoMoi(dd))}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
      {!conViec && khungConLai > 0 ? <p className="mvp-bando__goiy">Không còn gì để xem — kết thúc ngày để đi tiếp.</p> : null}

      {toa ? (
        <div className="mvp-canh__bang" role="dialog" aria-label={`Chọn phòng trong ${toa.ghim.ten}`}>
          <h3 className="mvp-canh__bang-tieude">{toa.ghim.ten}</h3>
          <ul className="mvp-dd__ds">
            {toa.noi.map((dd) => {
              const n = soChoMoi(dd);
              return (
                <li key={dd.diaDiem.id}>
                  <button type="button" className={`mvp-dd__nut mvp-dd__nut--noi${n === 0 ? ' is-xong' : ''}`} onClick={() => onDen(dd.diaDiem.id)} title={`Đến ${dd.diaDiem.ten}`}>
                    <span className="mvp-dd__mota">{dd.diaDiem.ten}</span>
                    <span className="mvp-dd__phu">{chuMoi(n)}</span>
                  </button>
                </li>
              );
            })}
          </ul>
          <button type="button" className="btn" onClick={() => setToaMo(null)}>
            Thôi
          </button>
        </div>
      ) : null}
    </div>
  );
}
