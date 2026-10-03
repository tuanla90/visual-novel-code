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
 *
 * 03/10/2026 (user): màn `· Hà Vy soi` KHÔNG mồi kính lúp nữa — chi tiết ẩn, rê chuột (hay chạm) qua đúng chỗ mới hiện kính;
 * để lâu chưa thấy thì nháy rất nhẹ. Lần soi đầu (mở đầu, chưa có Hà Vy) vẫn hiện kính để dạy thao tác.
 */
import { useEffect, useRef, useState, type CSSProperties } from 'react';
import type { DiemKhamPhaMvp, KichBanMvp } from '../../content/mvp/types';
import { soundEngine } from '../../shared/audio/sound-engine';
import type { DiemKhamPhaHienMvp } from '../engine/may';
import { danhSoTrung, nhanDiemKhamPha } from '../engine/nhan-cho-xem';
import { anhChanDung, anhNen, anhSprite, anhTheoTen } from './anh-mvp';
import { dangO } from '../engine/lich-nhan-vat';
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
  /** Bản đồ: ngày trong truyện (vd "Thứ Tư, 11/09") hiện trên đầu — lịch của nhân vật tính theo thứ. */
  homNay?: string;
  /** Bản đồ: thứ trong truyện (0 = Chủ nhật) và giờ ("HH:MM") — ai đang ở ghim nào tính theo lịch "Thường ở". */
  thu?: number;
  gio?: string;
  /** Quan sát: dáng / bộ đồ của nhân vật được soi (thiếu = dáng đầu tiên). */
  dang?: string;
  /** Quan sát: mở bằng cảnh cắt đôi mắt Hà Vy, kính lóe sáng, rồi các điểm soi mới hiện (user chốt 02/10/2026). */
  haVySoi?: boolean;
}

/**
 * PHÒNG CLB CÓ NGƯỜI NGỒI (user 03/10/2026: "ảnh 4 thành viên đang ngồi ở chỗ thay vì 4 cái ảnh đứng sừng sững"): cảnh phòng CLB
 * mà các người để bấm là thành viên CLB thì nền là ảnh họ đang ngồi (`bg-mvp-phong-clb-ngoi-<mã những người có mặt>`), mỗi người
 * là một vùng bấm đúng chỗ ngồi. Khách (Nam, Quân…) vẫn đứng như cũ. Không có ảnh khớp nhóm người → về cách cũ.
 * Vùng ngồi tính theo % ảnh 1360×768 (ảnh do Topview sửa từ nền phòng CLB, art/nguon/topview-2026-10-03).
 */
const CHO_NGOI: Record<string, { x: number; y: number; rong: number; cao: number }> = {
  duy: { x: 3, y: 19, rong: 17.6, cao: 49 },
  'ha-vy': { x: 29.8, y: 23.4, rong: 14.7, cao: 54.7 },
  'minh-anh': { x: 55.5, y: 17.6, rong: 11.8, cao: 28 },
  tung: { x: 68, y: 24.7, rong: 24.3, cao: 62 },
};
const THU_TU_NGOI = Object.keys(CHO_NGOI);

/** Ảnh phòng CLB có đúng những thành viên này ngồi (thiếu thì `undefined`). */
function anhPhongNgoi(canh: string, nguoi: readonly string[]): string | undefined {
  if (canh !== 'phong-clb' || nguoi.length === 0) return undefined;
  const ma = THU_TU_NGOI.filter((n) => nguoi.includes(n)).join('-');
  return anhTheoTen(`bg-mvp-phong-clb-ngoi-${ma}`);
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

/** Cảnh cắt "Hà Vy quan sát": hiện khoảng 1,7 giây lúc vừa vào màn soi (chưa soi điểm nào), bấm để bỏ qua. */
function useCatCanhHaVy(bat: boolean): { dang: boolean; boQua: () => void } {
  const [dang, setDang] = useState(bat);
  useEffect(() => {
    if (!dang) return;
    soundEngine.playSfx('chime');
    const id = window.setTimeout(() => setDang(false), 1700);
    return () => window.clearTimeout(id);
  }, [dang]);
  return { dang, boQua: () => setDang(false) };
}

export function KhamPhaMvp({ kb, id, canh, diem, onXem: xem, kieu, nhanVat, daGap = [], homNay, thu, gio, dang, haVySoi }: KhamPhaMvpProps) {
  const catCanh = useCatCanhHaVy(!!haVySoi && kieu === 'quan-sat' && diem.every((d) => !d.daXem));
  const onXem = (chuoi: string): void => {
    soundEngine.playSfx('select');
    xem(chuoi);
  };
  // Không còn nút "Danh sách" (user chốt 02/10/2026): danh sách chữ làm lộ chi tiết ẩn; mỗi chỗ bấm vẫn có nhãn đọc cho trình đọc màn hình.
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
  // Màn quan sát: mặt bàn thám tử (ảnh ui-nen-quan-sat), chân dung nằm trong khung ảnh ghim; vòng soi là chiếc kính lúp.
  const nen = laBanDo ? BAN_DO_MVP.anh : laQuanSat ? (anhTheoTen('ui-nen-quan-sat') ?? anhNen(canh)) : anhNen(canh);
  const kinhLup = anhTheoTen('ui-kinh-lup');
  const tiLe = laBanDo ? { rong: BAN_DO_MVP.rong, cao: BAN_DO_MVP.cao } : TI_LE_NEN;
  const soDe = { '--ti-le': `${tiLe.rong} / ${tiLe.cao}`, '--ti-le-so': tiLe.rong / tiLe.cao } as CSSProperties;
  const nhan = danhSoTrung(diem.map((d) => nhanDiemKhamPha(kb, d.diem)));
  const nhanDoc = (i: number, d: DiemKhamPhaHienMvp): string => `${nhan[i] ?? ''}${d.diem.dau && !d.daXem ? ` (${DAU[d.diem.dau].doc})` : ''}`;
  const tieuDe = laBanDo ? 'Đi đâu bây giờ?' : laQuanSat ? `Quan sát ${nv?.trongCau ?? ''}` : tenCanh;
  // Không còn dòng đếm "Còn N chỗ chưa xem" (user 03/10/2026): đếm sẵn làm mất phần tự tìm. Chỉ bản đồ và phòng có dấu ! / ? giữ chú giải.
  const phu = laBanDo
    ? `${homNay ? `${homNay}${gio ? `, ${gio}` : ''}. ` : ''}Dấu ! là việc chính. Dấu ? là chỗ còn điều chưa xem.`
    : !laQuanSat && diem.some((d) => d.diem.dau)
      ? 'Dấu ! là việc chính, dấu ? là chuyện thêm.'
      : '';
  /** Người đang ở một nơi mà người chơi ĐÃ BIẾT: đã gặp và thẻ nhân vật có dòng "Lịch". */
  const nguoiBiet = (d: DiemKhamPhaMvp): string[] => {
    // Người kịch bản đặt ở đây (`có:`) cộng người lịch "Thường ở" đặt ở ghim này vào thứ, giờ của bản đồ.
    const theoLich = thu !== undefined && gio && d.sprite.startsWith('ghim:') ? dangO(kb.nhanVat, thu, gio, d.sprite.slice(5)) : [];
    return [...new Set([...(d.co ?? []), ...theoLich])].filter((n) => daGap.includes(n) && !!kb.nhanVat.find((x) => x.id === n)?.gioiThieu?.lich);
  };

  const anhQuanSat = laQuanSat && nhanVat ? anhChanDung(nhanVat, dang ?? nv?.bieuCam[0]) : undefined;
  const thanhVienNgoi = !laBanDo && !laQuanSat ? diem.map((d) => d.diem.sprite).filter((sp) => sp.startsWith('nv:') && sp.slice(3) in CHO_NGOI).map((sp) => sp.slice(3)) : [];
  const nenNgoi = anhPhongNgoi(canh, thanhVienNgoi);
  const anhMatVy = anhTheoTen('cat-canh-ha-vy-mat');

  return (
    <div className={`mvp-canh mvp-khampha${laBanDo ? ' mvp-bando' : ''}${laQuanSat ? ' mvp-soinv' : ''}`} role="region" aria-label={laBanDo ? 'Bản đồ trường' : laQuanSat ? tieuDe : `Khám phá: ${tenCanh}`}>
      {nen ? <div className={`mvp-canh__mo${laBanDo ? ' mvp-bando__mo' : ''}${laQuanSat ? ' mvp-soinv__ban' : ''}`} style={{ backgroundImage: `url("${nen}")` }} aria-hidden="true" /> : null}
      <div className="mvp-canh__dau">
        <div className="mvp-canh__tieude">
          <h2>{tieuDe}</h2>
          {phu ? <p>{phu}</p> : null}
        </div>
      </div>

      {laQuanSat ? (
        <div className={`mvp-soinv__vung${catCanh.dang ? ' dang-cat-canh' : ''}${haVySoi ? ' co-ha-vy' : ''}`} data-soi-an={haVySoi ? '1' : undefined}>
          {catCanh.dang ? (
            <button type="button" className="mvp-catcanh" onClick={catCanh.boQua} aria-label="Hà Vy quan sát — bấm để bỏ qua">
              <span className="mvp-catcanh__dai">
                {anhMatVy ? <img className="mvp-catcanh__anh" src={anhMatVy} alt="" draggable={false} /> : null}
                <span className="mvp-catcanh__loe" aria-hidden="true" />
                <span className="mvp-catcanh__chu">
                  Hà Vy quan sát
                  <span className="mvp-catcanh__phu">Nhìn cả chỗ không ai để ý</span>
                </span>
              </span>
            </button>
          ) : null}
          <div className="mvp-soinv__khung">
            {anhQuanSat ? <img className="mvp-soinv__anh" src={anhQuanSat} alt={`Chân dung ${nv?.ten ?? ''}`} draggable={false} /> : <div className="mvp-soinv__anh mvp-stage__nen-tam" />}
            {diem.map((d, i) => (
              <button
                key={d.diem.chuoi}
                type="button"
                className={`mvp-soi${d.daXem ? ' is-da-xem' : ''}${haVySoi ? ' mvp-soi--an' : ''}`}
                style={{ left: `${d.diem.x}%`, top: `${d.diem.y}%`, width: `${d.diem.rong}%` }}
                aria-label={nhanDoc(i, d)}
                title={`${nhan[i] ?? ''}${d.daXem ? ' — đã soi' : ''}`}
                disabled={d.daXem}
                data-diem={d.diem.chuoi}
                onClick={() => onXem(d.diem.chuoi)}
              >
                {kinhLup ? <img className="mvp-soi__kinh" src={kinhLup} alt="" draggable={false} /> : <span className="mvp-soi__vong" aria-hidden="true" />}
                {d.daXem ? <span className="mvp-soi__nhan">{nhan[i]}</span> : null}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="mvp-canh__vung" ref={vungRef}>
          <div className={`mvp-canh__khung${laBanDo ? ' mvp-bando__khung' : ''}${nenNgoi ? ' is-ngoi' : ''}`} style={soDe}>
            {nenNgoi ?? nen ? <img className="mvp-canh__nen" src={nenNgoi ?? nen} alt="" draggable={false} /> : <div className="mvp-canh__nen mvp-stage__nen-tam" />}
            {diem.map((d, i) => {
              const ngoi = nenNgoi && d.diem.sprite.startsWith('nv:') ? CHO_NGOI[d.diem.sprite.slice(3)] : undefined;
              if (ngoi) {
                return (
                  <button
                    key={d.diem.chuoi}
                    type="button"
                    className={`mvp-ngoi${d.daXem ? ' is-da-xem' : ''}`}
                    style={{ left: `${ngoi.x}%`, top: `${ngoi.y}%`, width: `${ngoi.rong}%`, height: `${ngoi.cao}%` }}
                    aria-label={nhanDoc(i, d)}
                    title={`${nhan[i] ?? ''}${d.daXem ? ' — đã nói chuyện' : ''}`}
                    disabled={d.daXem}
                    data-diem={d.diem.chuoi}
                    data-chinh={d.diem.dau === 'chinh' && !d.daXem ? '1' : undefined}
                    onClick={() => onXem(d.diem.chuoi)}
                  >
                    <HuyHieu d={d} />
                    <span className="mvp-ngoi__ten">{kb.nhanVat.find((n) => n.id === d.diem.sprite.slice(3))?.ten}</span>
                  </button>
                );
              }
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
                              <span key={n} className="mvp-ghim__mat" data-nv={n} title={kb.nhanVat.find((x) => x.id === n)?.ten}>
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
              if (d.diem.sprite.startsWith('vung:')) {
                // Chi tiết ẨN trên cảnh (tấm lưng áo xanh giữa đám đông): không có dấu, người chơi tự tìm; để lâu mới nháy gợi ý.
                return (
                  <button
                    key={d.diem.chuoi}
                    type="button"
                    className={`mvp-an${d.daXem ? ' is-da-xem' : ''}`}
                    style={{ left: `${d.diem.x}%`, top: `${d.diem.y}%`, width: `${d.diem.rong}%` }}
                    aria-label={nhanDoc(i, d)}
                    disabled={d.daXem}
                    data-diem={d.diem.chuoi}
                    onClick={() => onXem(d.diem.chuoi)}
                  >
                    <span className="mvp-an__goi-y" aria-hidden="true" />
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
                  className={`mvp-diem mvp-diem--khampha is-${d.daXem ? 'da-xem' : 'mo'}${url ? '' : ' is-tam'}${d.diem.sprite.startsWith('nv:') ? ' is-nguoi' : ''}`}
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
                  {laNguoi && d.diem.dau ? (
                    // Nhãn của điểm (phần trước dấu ":") thay cho tên thật: người chưa tự giới thiệu chỉ hiện cách gọi tạm ("Cô ở quầy").
                    <span className="mvp-diem__ten">{d.diem.nhan ? d.diem.nhan.split(':')[0] : kb.nhanVat.find((n) => n.id === d.diem.sprite.slice(3))?.ten}</span>
                  ) : null}
                </button>
              );
            })}
          </div>
        </div>
      )}
      {laQuanSat ? null : <p className="mvp-canh__vuot">Vuốt ngang để xem cả cảnh</p>}

    </div>
  );
}
