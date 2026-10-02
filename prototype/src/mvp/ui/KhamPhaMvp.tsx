/**
 * CẢNH KHÁM PHÁ (`[KHÁM PHÁ]`, đặc tả §18.6) — nền của cảnh đang đứng với các vật / người bấm được, dùng chung lớp CSS
 * với màn trong địa điểm (`NoiMvp`): khung giữ tỉ lệ ảnh, điểm đặt theo % (chân ảnh), vuốt ngang trên điện thoại dọc.
 *
 * Khác `NoiMvp`: không tốn khung, không có "Về bản đồ"; chỗ CHƯA xem luôn sáng viền trắng (cảnh dạy người chơi bấm vật),
 * chỗ đã xem mờ đi; chỗ có "sau:" hiện dần (máy đã lọc, xem `diemDangHien`). Nhãn qua `nhanDiemKhamPha` — không lộ nội dung.
 */
import { useEffect, useRef, useState, type CSSProperties } from 'react';
import type { KichBanMvp } from '../../content/mvp/types';
import { soundEngine } from '../../shared/audio/sound-engine';
import type { DiemKhamPhaHienMvp } from '../engine/may';
import { danhSoTrung, nhanDiemKhamPha } from '../engine/nhan-cho-xem';
import { anhNen, anhSprite } from './anh-mvp';
import { TI_LE_NEN } from './ban-do-mvp';

export interface KhamPhaMvpProps {
  kb: KichBanMvp;
  /** Mã nút `[KHÁM PHÁ]` (khóa để cuộn giữa ảnh một lần). */
  id: string;
  canh: string;
  diem: DiemKhamPhaHienMvp[];
  onXem: (chuoi: string) => void;
}

export function KhamPhaMvp({ kb, id, canh, diem, onXem: xem }: KhamPhaMvpProps) {
  const onXem = (chuoi: string): void => {
    soundEngine.playSfx('select');
    xem(chuoi);
  };
  const [xemDs, setXemDs] = useState(false);
  const vungRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const v = vungRef.current;
    if (v && v.scrollWidth > v.clientWidth) v.scrollLeft = (v.scrollWidth - v.clientWidth) / 2;
  }, [id]);
  const tenCanh = kb.canh.find((c) => c.id === canh)?.ten ?? '';
  const nen = anhNen(canh);
  const soDe = { '--ti-le': `${TI_LE_NEN.rong} / ${TI_LE_NEN.cao}`, '--ti-le-so': TI_LE_NEN.rong / TI_LE_NEN.cao } as CSSProperties;
  const nhan = danhSoTrung(diem.map((d) => nhanDiemKhamPha(kb, d.diem)));
  const conMoi = diem.filter((d) => !d.daXem).length;

  return (
    <div className="mvp-canh mvp-khampha" role="region" aria-label={`Khám phá: ${tenCanh}`}>
      {nen ? <div className="mvp-canh__mo" style={{ backgroundImage: `url("${nen}")` }} aria-hidden="true" /> : null}
      <div className="mvp-canh__dau">
        <div className="mvp-canh__tieude">
          <h2>{tenCanh}</h2>
          {/* Chương 1 (ĐÃ CHỐT C): không câu dặn thao tác — chỉ báo còn bao nhiêu chỗ (có chỗ nằm ngoài khung khi vuốt ngang). */}
          <p>{conMoi > 0 ? `Còn ${conMoi} chỗ chưa xem` : 'Đã xem hết chỗ ở đây.'}</p>
        </div>
        <div className="mvp-canh__nhom">
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

      <div className="mvp-canh__vung" ref={vungRef}>
        <div className="mvp-canh__khung" style={soDe}>
          {nen ? <img className="mvp-canh__nen" src={nen} alt="" draggable={false} /> : <div className="mvp-canh__nen mvp-stage__nen-tam" />}
          {diem.map((d, i) => {
            const url = anhSprite(d.diem.sprite);
            const style = { left: `${d.diem.x}%`, top: `${d.diem.y}%`, width: `${d.diem.rong}%` } as CSSProperties;
            return (
              <button
                key={d.diem.chuoi}
                type="button"
                className={`mvp-diem mvp-diem--khampha is-${d.daXem ? 'da-xem' : 'mo'}${url ? '' : ' is-tam'}${d.diem.sprite.startsWith('nv:') ? ' is-nguoi' : ''}`}
                style={style}
                aria-label={nhan[i]}
                title={`${nhan[i] ?? ''}${d.daXem ? ' — đã xem' : ''}`}
                disabled={d.daXem}
                data-diem={d.diem.chuoi}
                onClick={() => onXem(d.diem.chuoi)}
              >
                {url ? <img className="mvp-diem__anh" src={url} alt="" draggable={false} /> : <span className="mvp-diem__tam" aria-hidden="true" />}
                {d.daXem ? null : <span className="mvp-diem__cham" aria-hidden="true" />}
              </button>
            );
          })}
        </div>
      </div>
      <p className="mvp-canh__vuot">Vuốt ngang để xem cả cảnh</p>

      {xemDs ? (
        <div className="mvp-canh__bang mvp-canh__bang--ds" role="dialog" aria-label={`Các chỗ xem xét ở ${tenCanh}`}>
          <ul className="mvp-dd__ds">
            {diem.map((d, i) => (
              <li key={d.diem.chuoi}>
                <button
                  type="button"
                  className={`mvp-dd__nut${d.daXem ? ' is-xong' : ''}`}
                  disabled={d.daXem}
                  onClick={() => {
                    setXemDs(false);
                    onXem(d.diem.chuoi);
                  }}
                >
                  <span className="mvp-dd__mota">{nhan[i]}</span>
                  <span className="mvp-dd__phu">{d.daXem ? 'Đã xem' : 'Chưa xem'}</span>
                </button>
              </li>
            ))}
          </ul>
          <button type="button" className="btn" onClick={() => setXemDs(false)}>
            Đóng danh sách
          </button>
        </div>
      ) : null}
    </div>
  );
}
