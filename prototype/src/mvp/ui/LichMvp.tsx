/**
 * Màn lịch (user chốt 01/10/2026: truyện năm 2024; xem hôm nay, hạn của vụ, hạn nhiệm vụ phụ) — lớp phủ kiểu
 * "tờ lịch bàn": lưới tháng (thứ Hai → Chủ nhật), ô hôm nay nổi bật, ô đã qua mờ, mốc có chấm màu + nhãn ngắn;
 * bên cạnh (màn dọc: bên dưới) là hôm nay, hạn, các mốc đã qua. Mở từ vé "NGÀY n/5" trên thanh trên.
 *
 * Mọi ngày tính ở `engine/lich-ngay.ts` từ `kb.lich.ngayMoDau`. Không câu hướng dẫn thao tác (ĐÃ CHỐT C).
 * Đóng: nút Đóng, Esc, bấm ra ngoài tờ lịch.
 */
import { useEffect, useRef } from 'react';
import type { KichBanMvp } from '../../content/mvp/types';
import {
  conLai,
  dinhDangNgay,
  hoaDau,
  homNay,
  luoiThang,
  mocLich,
  NHAN_COT_THU,
  ngayNgan,
  soNgayGiua,
  type HanPhu,
  type MocLich,
} from '../engine/lich-ngay';
import type { TrangThaiMvp } from '../engine/trang-thai';
import './LichMvp.css';

export interface LichMvpProps {
  kb: KichBanMvp;
  s: TrangThaiMvp;
  /** Hạn nhiệm vụ phụ (Vụ 2 trở đi); chương 1 không có. */
  hanPhu?: HanPhu[];
  onDong: () => void;
}

const TEN_THANG = ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'];

/** Mốc phủ ngày `iso` (mốc nhiều ngày: từ `ngay` tới `den`). */
function mocCuaNgay(ds: MocLich[], iso: string): MocLich[] {
  return ds.filter((m) => soNgayGiua(m.ngay, iso) >= 0 && soNgayGiua(iso, m.den ?? m.ngay) >= 0);
}

/** Lớp màu chấm: hạn giữ màu hạn kể cả khi là hôm nay. */
function lopCham(m: MocLich): string {
  if (m.loai === 'qua') return 'is-qua';
  if (m.han) return m.han === 'phu' ? 'is-han-phu' : 'is-han';
  return m.loai === 'hom-nay' ? 'is-hom-nay' : 'is-truyen';
}

export function LichMvp({ kb, s, hanPhu, onDong }: LichMvpProps) {
  const nutDongRef = useRef<HTMLButtonElement>(null);
  const ngayMoDau = kb.lich.ngayMoDau ?? null;
  // Vụ sau (từ Vụ 2): hôm nay là ngày của vụ đang chơi; các vụ sau đã tới thành mốc trên lịch.
  const cacVuSau = kb.lich.vuSau ?? [];
  const viTriVu = cacVuSau.findIndex((v) => v.id === s.vu);
  const vuNay = viTriVu >= 0 ? cacVuSau[viTriVu] : undefined;
  // Việc phụ đang cất (về tuyến chính) không đổi "hôm nay".
  const phuNay = s.giaiDoan === 'phu' ? (kb.lich.nhiemVuPhu ?? []).find((p) => p.id === s.phu?.id) : undefined;
  // Đang làm việc phụ: hôm nay là ngày của việc đó (lịch tính như một vụ sau).
  const tienDo = { giaiDoan: s.giaiDoan === 'phu' ? ('vu-sau' as const) : s.giaiDoan, ngay: s.ngay, conTro: s.conTro, ngayVu: (phuNay ?? vuNay)?.ngay ?? null };
  const hn = homNay(tienDo, ngayMoDau);
  const tenNgay = (so: number): string => kb.lich.ngay.find((n) => n.so === so)?.ten ?? '';
  const vuSau = cacVuSau.slice(0, viTriVu + 1).flatMap((v, i) => (v.ngay ? [{ ngay: v.ngay, ten: `Vụ ${i + 2} · ${v.ten}`, ngan: `Vụ ${i + 2}` }] : []));
  const ds = mocLich(tienDo, { ngayMoDau, tenNgay, hanPhu, vuSau });
  const [nam, thang] = hn.ngay.split('-').map(Number) as [number, number];
  const luoi = luoiThang(nam, thang);

  const tenHomNay = (() => {
    if (hn.moDau) return 'Tuần đầu ở trường';
    if (s.giaiDoan === 'ngay') return [`Ngày ${s.ngay}`, tenNgay(s.ngay)].filter(Boolean).join(' · ');
    if (s.giaiDoan === 'phu' && phuNay) return `Việc phụ · ${phuNay.ten}`;
    if (s.giaiDoan === 'vu-sau' && vuNay) return `Vụ ${viTriVu + 2} · ${vuNay.ten}`;
    return s.giaiDoan === 'hop' ? 'Buổi họp rà soát' : 'Sau buổi họp';
  })();
  const cacHan = ds.filter((m) => m.han && m.loai !== 'qua');
  const daQua = ds.filter((m) => m.loai === 'qua').reverse();

  // onDong thường là hàm tạo mới mỗi lần vẽ: giữ trong ref để không gắn lại phím / lấy lại tiêu điểm liên tục.
  const dongRef = useRef(onDong);
  useEffect(() => {
    dongRef.current = onDong;
  }, [onDong]);
  useEffect(() => {
    nutDongRef.current?.focus();
    const onKey = (e: KeyboardEvent): void => {
      if (e.key === 'Escape') {
        e.preventDefault();
        e.stopPropagation();
        dongRef.current();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <div className="mvp-lich" role="presentation" onClick={onDong}>
      <div className="mvp-lich__to" role="dialog" aria-modal="true" aria-labelledby="mvp-lich-tieude" onClick={(e) => e.stopPropagation()}>
        <div className="mvp-lich__gay" aria-hidden="true">
          {Array.from({ length: 6 }, (_x, i) => (
            <i key={i} />
          ))}
        </div>
        <header className="mvp-lich__dau">
          <h2 id="mvp-lich-tieude" className="mvp-lich__thang">
            {TEN_THANG[thang - 1]} <span className="mvp-lich__nam">{nam}</span>
          </h2>
          <button ref={nutDongRef} type="button" className="mvp-lich__dong" aria-label="Đóng lịch" title="Đóng (Esc)" onClick={onDong}>
            Đóng
          </button>
        </header>

        <div className="mvp-lich__than">
          <table className="mvp-lich__luoi">
            <thead>
              <tr>
                {NHAN_COT_THU.map((t) => (
                  <th key={t} scope="col" className={t === 'CN' ? 'is-cn' : undefined}>
                    {t}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {luoi.map((hang, i) => (
                <tr key={i}>
                  {hang.map((iso, j) => {
                    if (!iso) return <td key={j} className="mvp-lich__o is-trong" />;
                    const moc = mocCuaNgay(ds, iso);
                    const laHomNay = iso === hn.ngay;
                    const daQuaO = soNgayGiua(iso, hn.ngay) > 0;
                    const nhan = moc.filter((m) => m.ngay === iso);
                    const moTa = [dinhDangNgay(iso), laHomNay ? 'hôm nay' : '', ...moc.map((m) => m.ten)].filter(Boolean).join(' — ');
                    return (
                      <td
                        key={j}
                        className={`mvp-lich__o${laHomNay ? ' is-hom-nay' : ''}${daQuaO ? ' is-qua' : ''}${moc.some((m) => m.han) ? ' is-co-han' : ''}${j === 6 ? ' is-cn' : ''}`}
                        aria-label={moTa}
                        aria-current={laHomNay ? 'date' : undefined}
                      >
                        <span className="mvp-lich__so" aria-hidden="true">
                          {Number(iso.slice(8))}
                        </span>
                        {moc.length > 0 ? (
                          <span className="mvp-lich__cham" aria-hidden="true">
                            {moc.map((m) => (
                              <i key={m.ten} className={lopCham(m)} />
                            ))}
                          </span>
                        ) : null}
                        {nhan.length > 0 ? (
                          <span className="mvp-lich__nhan" aria-hidden="true">
                            {nhan.map((m) => m.ngan).join(' · ')}
                          </span>
                        ) : null}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>

          <section className="mvp-lich__ds" aria-label="Các mốc">
            <div className="mvp-lich__muc mvp-lich__muc--hom-nay">
              <span className="mvp-lich__muc-nhan">{hn.moDau ? 'Bắt đầu' : 'Hôm nay'}</span>
              <span className="mvp-lich__muc-ngay">{hoaDau(dinhDangNgay(hn.ngay))}</span>
              <span className="mvp-lich__muc-ten">{tenHomNay}</span>
            </div>
            {cacHan.map((m) => (
              <div key={m.ten} className={`mvp-lich__muc mvp-lich__muc--han${m.han === 'phu' ? ' is-phu' : ''}`}>
                <span className="mvp-lich__muc-nhan">Hạn</span>
                <span className="mvp-lich__muc-ten">
                  {m.ten}
                  {m.chiTiet ? <span className="mvp-lich__gio"> · {m.chiTiet}</span> : null}
                </span>
                <span className="mvp-lich__muc-ngay">
                  {hoaDau(dinhDangNgay(m.ngay))} <span className="mvp-lich__con">({conLai(m.ngay, hn.ngay)})</span>
                </span>
              </div>
            ))}
            {daQua.length > 0 ? (
              <>
                <h3 className="mvp-lich__ds-tieude">Đã qua</h3>
                <ul className="mvp-lich__qua">
                  {daQua.map((m) => (
                    <li key={m.ten}>
                      <span className="mvp-lich__qua-ngay">
                        {ngayNgan(m.ngay).slice(0, 5)}
                        {m.den ? `–${ngayNgan(m.den).slice(0, 5)}` : ''}
                      </span>
                      <span>
                        {m.ten}
                        {m.chiTiet ? ` · ${m.chiTiet}` : ''}
                      </span>
                    </li>
                  ))}
                </ul>
              </>
            ) : null}
          </section>
        </div>
      </div>
    </div>
  );
}
