/**
 * CẢNH KHÁM PHÁ (`[KHÁM PHÁ]`, đặc tả §18.6) — nền của cảnh đang đứng với các vật / người bấm được, dùng chung lớp CSS
 * với màn trong địa điểm (`NoiMvp`): khung giữ tỉ lệ ảnh, điểm đặt theo % (chân ảnh), vuốt ngang trên điện thoại dọc.
 *
 * Khác `NoiMvp`: không tốn khung, không có "Về bản đồ"; chỗ CHƯA xem luôn sáng viền trắng (cảnh dạy người chơi bấm vật),
 * chỗ đã xem mờ đi; chỗ có "sau:" hiện dần (máy đã lọc, xem `diemDangHien`). Nhãn qua `nhanDiemKhamPha` — không lộ nội dung.
 *
 * Ba kiểu (02/10/2026, user chốt):
 *   - cảnh thường: như trên; người (`nv:`) có nhãn tên dưới chân, điểm có `dấu:` mang huy hiệu ! (việc chính) / ? (tùy chọn) —
 *     dùng cho PHÒNG CLB có 3–4 người để bấm vào nói chuyện;
 *   - `bản đồ`: nền là bản đồ trường, mỗi điểm `ghim:<mã>` là một ghim nơi đến có tên, dấu ! / ?, và ẢNH MẶT những người đang ở đó
 *     (`có:`) — chỉ hiện người đã gặp và đã biết lịch (thẻ nhân vật có dòng "Lịch");
 *   - `quan sát <nv>`: chân dung nhân vật phóng to, mỗi điểm `vung:<mã>` là một chi tiết để soi (kiểu Sherlock Holmes).
 */
import { useEffect, useRef, useState, type CSSProperties } from 'react';
import type { DiemKhamPhaMvp, KichBanMvp } from '../../content/mvp/types';
import { soundEngine } from '../../shared/audio/sound-engine';
import type { DiemKhamPhaHienMvp } from '../engine/may';
import { danhSoTrung, nhanDiemKhamPha } from '../engine/nhan-cho-xem';
import { anhChanDung, anhNen, anhSprite } from './anh-mvp';
import { BAN_DO_MVP, TI_LE_NEN } from './ban-do-mvp';

export interface KhamPhaMvpProps {
  kb: KichBanMvp;
  /** Mã nút `[KHÁM PHÁ]` (khóa để cuộn giữa ảnh một lần). */
  id: string;
  canh: string;
  diem: DiemKhamPhaHienMvp[];
  onXem: (chuoi: string) => void;
  kieu?: 'ban-do' | 'quan-sat';
  /** Kiểu `quan-sat`: nhân vật được soi. */
  nhanVat?: string;
  /** Nhân vật đã gặp (đã hiện thẻ giới thiệu) — bản đồ chỉ hiện ảnh mặt của người đã gặp và có "Lịch". */
  daGap?: readonly string[];
}

const DAU: Record<NonNullable<DiemKhamPhaMvp['dau']>, { chu: string; doc: string }> = {
  chinh: { chu: '!', doc: 'việc chính' },
  phu: { chu: '?', doc: 'còn điều chưa xem' },
};

function HuyHieu({ d }: { d: DiemKhamPhaHienMvp }) {
  if (!d.diem.dau || d.daXem) return null;
  return (
    <span className={`mvp-dau mvp-dau--${d.diem.dau}`} aria-hidden="true">
      {DAU[d.diem.dau].chu}
    </span>
  );
}

export function KhamPhaMvp({ kb, id, canh, diem, onXem: xem, kieu, nhanVat, daGap = [] }: KhamPhaMvpProps) {
  const onXem = (chuoi: string): void => {
    soundEngine.playSfx('select');
    xem(chuoi);
  };
  const [xemDs, setXemDs] = useState(false);
  const vungRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const v = vungRef.current;
    if (!v || v.scrollWidth <= v.clientWidth) return;
    // Màn hẹp phải vuốt ngang: mở ra ở chỗ có dấu ! (việc chính) để người chơi không phải đi tìm; không có thì giữa ảnh.
    const chinh = v.querySelector<HTMLElement>('[data-chinh="1"]');
    if (chinh) {
      const r = chinh.getBoundingClientRect();
      const rv = v.getBoundingClientRect();
      v.scrollLeft = Math.max(0, Math.min(v.scrollWidth - v.clientWidth, v.scrollLeft + r.left + r.width / 2 - (rv.left + rv.width / 2)));
    } else v.scrollLeft = (v.scrollWidth - v.clientWidth) / 2;
  }, [id]);
  const tenCanh = kb.canh.find((c) => c.id === canh)?.ten ?? '';
  const nv = nhanVat ? kb.nhanVat.find((n) => n.id === nhanVat) : undefined;
  const laBanDo = kieu === 'ban-do';
  const laQuanSat = kieu === 'quan-sat';
  const nen = laBanDo ? BAN_DO_MVP.anh : anhNen(canh);
  const tiLe = laBanDo ? { rong: BAN_DO_MVP.rong, cao: BAN_DO_MVP.cao } : TI_LE_NEN;
  const soDe = { '--ti-le': `${tiLe.rong} / ${tiLe.cao}`, '--ti-le-so': tiLe.rong / tiLe.cao } as CSSProperties;
  const nhan = danhSoTrung(diem.map((d) => nhanDiemKhamPha(kb, d.diem)));
  const nhanDoc = (i: number, d: DiemKhamPhaHienMvp): string => `${nhan[i] ?? ''}${d.diem.dau && !d.daXem ? ` (${DAU[d.diem.dau].doc})` : ''}`;
  const conMoi = diem.filter((d) => !d.daXem).length;
  const tieuDe = laBanDo ? 'Đi đâu bây giờ?' : laQuanSat ? `Quan sát ${nv?.trongCau ?? ''}` : tenCanh;
  const phu = laBanDo
    ? 'Dấu ! là việc chính. Dấu ? là chỗ còn điều chưa xem.'
    : laQuanSat
      ? conMoi > 0
        ? `Bấm vào chi tiết đáng chú ý. Còn ${conMoi} chi tiết.`
        : 'Đã soi hết.'
      : diem.some((d) => d.diem.dau)
        ? 'Bấm vào từng người. Dấu ! là việc chính, dấu ? là chuyện thêm.'
        : conMoi > 0
          ? `Còn ${conMoi} chỗ chưa xem`
          : 'Đã xem hết chỗ ở đây.';
  /** Người đang ở một nơi mà người chơi ĐÃ BIẾT: đã gặp và thẻ nhân vật có dòng "Lịch". */
  const nguoiBiet = (d: DiemKhamPhaMvp): string[] => (d.co ?? []).filter((n) => daGap.includes(n) && !!kb.nhanVat.find((x) => x.id === n)?.gioiThieu?.lich);

  const anhQuanSat = laQuanSat && nhanVat ? anhChanDung(nhanVat, nv?.bieuCam[0]) : undefined;

  return (
    <div className={`mvp-canh mvp-khampha${laBanDo ? ' mvp-bando' : ''}${laQuanSat ? ' mvp-soinv' : ''}`} role="region" aria-label={laBanDo ? 'Bản đồ trường' : laQuanSat ? tieuDe : `Khám phá: ${tenCanh}`}>
      {nen ? <div className={`mvp-canh__mo${laBanDo ? ' mvp-bando__mo' : ''}`} style={{ backgroundImage: `url("${nen}")` }} aria-hidden="true" /> : null}
      <div className="mvp-canh__dau">
        <div className="mvp-canh__tieude">
          <h2>{tieuDe}</h2>
          {/* Chương 1 (ĐÃ CHỐT C): không câu dặn thao tác ở cảnh thường — chỉ báo còn bao nhiêu chỗ. */}
          <p>{phu}</p>
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

      {laQuanSat ? (
        <div className="mvp-soinv__vung">
          <div className="mvp-soinv__khung">
            {anhQuanSat ? <img className="mvp-soinv__anh" src={anhQuanSat} alt={`Chân dung ${nv?.ten ?? ''}`} draggable={false} /> : <div className="mvp-soinv__anh mvp-stage__nen-tam" />}
            {diem.map((d, i) => (
              <button
                key={d.diem.chuoi}
                type="button"
                className={`mvp-soi${d.daXem ? ' is-da-xem' : ''}`}
                style={{ left: `${d.diem.x}%`, top: `${d.diem.y}%`, width: `${d.diem.rong}%` }}
                aria-label={nhanDoc(i, d)}
                title={`${nhan[i] ?? ''}${d.daXem ? ' — đã soi' : ''}`}
                disabled={d.daXem}
                data-diem={d.diem.chuoi}
                onClick={() => onXem(d.diem.chuoi)}
              >
                <span className="mvp-soi__vong" aria-hidden="true" />
                {d.daXem ? <span className="mvp-soi__nhan">{nhan[i]}</span> : null}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="mvp-canh__vung" ref={vungRef}>
          <div className={`mvp-canh__khung${laBanDo ? ' mvp-bando__khung' : ''}`} style={soDe}>
            {nen ? <img className="mvp-canh__nen" src={nen} alt="" draggable={false} /> : <div className="mvp-canh__nen mvp-stage__nen-tam" />}
            {diem.map((d, i) => {
              if (laBanDo || d.diem.sprite.startsWith('ghim:')) {
                const nguoi = nguoiBiet(d.diem);
                return (
                  <button
                    key={d.diem.chuoi}
                    type="button"
                    className={`mvp-ghim${d.daXem ? ' is-xong' : ''}${d.diem.x >= 80 ? ' mvp-ghim--phai' : d.diem.x <= 20 ? ' mvp-ghim--trai' : ''}`}
                    style={{ left: `${d.diem.x}%`, top: `${d.diem.y}%` }}
                    aria-label={`${nhanDoc(i, d)}${nguoi.length > 0 ? ` — đang ở đây: ${nguoi.map((n) => kb.nhanVat.find((x) => x.id === n)?.ten ?? n).join(', ')}` : ''}${d.daXem ? ' — đã ghé' : ''}`}
                    disabled={d.daXem}
                    data-diem={d.diem.chuoi}
                    data-chinh={d.diem.dau === 'chinh' && !d.daXem ? '1' : undefined}
                    onClick={() => onXem(d.diem.chuoi)}
                  >
                    <HuyHieu d={d} />
                    <svg className="mvp-ghim__kim" viewBox="0 0 24 32" width="24" height="32" aria-hidden="true">
                      <path d="M12 31s10-11.2 10-19A10 10 0 0 0 2 12c0 7.8 10 19 10 19Z" fill="currentColor" stroke="#fff" strokeWidth="1.5" />
                      <circle cx="12" cy="12" r="3.6" fill="#fff" />
                    </svg>
                    <span className="mvp-ghim__nhan">
                      <span className="mvp-ghim__ten">{nhan[i]}</span>
                      {nguoi.length > 0 ? (
                        <span className="mvp-ghim__nguoi" aria-hidden="true">
                          {nguoi.slice(0, 3).map((n) => {
                            const url = anhChanDung(n, kb.nhanVat.find((x) => x.id === n)?.bieuCam[0]);
                            return (
                              <span key={n} className="mvp-ghim__mat" title={kb.nhanVat.find((x) => x.id === n)?.ten}>
                                {url ? <img src={url} alt="" draggable={false} /> : null}
                              </span>
                            );
                          })}
                          {nguoi.length > 3 ? <span className="mvp-ghim__them">+{nguoi.length - 3}</span> : null}
                        </span>
                      ) : null}
                    </span>
                  </button>
                );
              }
              const url = anhSprite(d.diem.sprite);
              const laNguoi = d.diem.sprite.startsWith('nv:');
              const style = { left: `${d.diem.x}%`, top: `${d.diem.y}%`, width: `${d.diem.rong}%` } as CSSProperties;
              return (
                <button
                  key={d.diem.chuoi}
                  type="button"
                  className={`mvp-diem mvp-diem--khampha is-${d.daXem ? 'da-xem' : 'mo'}${url ? '' : ' is-tam'}`}
                  style={style}
                  aria-label={nhanDoc(i, d)}
                  title={`${nhan[i] ?? ''}${d.daXem ? ' — đã xem' : ''}`}
                  disabled={d.daXem}
                  data-diem={d.diem.chuoi}
                  data-chinh={d.diem.dau === 'chinh' && !d.daXem ? '1' : undefined}
                  onClick={() => onXem(d.diem.chuoi)}
                >
                  {url ? <img className="mvp-diem__anh" src={url} alt="" draggable={false} /> : <span className="mvp-diem__tam" aria-hidden="true" />}
                  {d.diem.dau ? <HuyHieu d={d} /> : d.daXem ? null : <span className="mvp-diem__cham" aria-hidden="true" />}
                  {laNguoi && d.diem.dau ? <span className="mvp-diem__ten">{kb.nhanVat.find((n) => n.id === d.diem.sprite.slice(3))?.ten}</span> : null}
                </button>
              );
            })}
          </div>
        </div>
      )}
      {laQuanSat ? null : <p className="mvp-canh__vuot">Vuốt ngang để xem cả cảnh</p>}

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
                  <span className="mvp-dd__mota">{nhanDoc(i, d)}</span>
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
