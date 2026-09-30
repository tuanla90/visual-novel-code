/**
 * MÀN TRA DỮ LIỆU KIỂU v7 (docs/mockups/core-game-v7-canh.html; ĐÃ CHỐT B, 30/09/2026): nền là một ảnh cảnh đầy đủ (phòng CLB /
 * phòng máy), phần mềm tra cứu chạy trong mặt kính màn hình, giấy nhớ dán quanh viền màn hình. Người chơi kéo giấy nhớ vào
 * ô giá trị của từng điều kiện (hoặc bấm giấy rồi bấm ô), bấm cột / phép / VÀ–HOẶC để đổi, rồi CHẠY: đống phiếu rơi dần theo
 * từng điều kiện, con số lớn đếm xuống, đóng dấu số dòng. Câu SQL luôn hiện bên dưới, không bắt phải đọc.
 *
 * Máy chỉ MÔ TẢ kết quả (số dòng, bảng); lời Tùng / Hà Vy là lời "Khi …" của thẻ thử thách, hiện thành hộp thoại rồi ẩn.
 * Chạy sai không bị phạt. Đúng (tập kết quả khớp SQL chuẩn, `sql-mvp.ts`) thì hiện nút ghim phiếu lên bảng điều tra.
 * Buổi họp (`fix-query`): cùng màn này nhưng là màn chiếu, câu của Quân nạp sẵn.
 */
import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties, type DragEvent } from 'react';
import type { BoDuLieuMvp, KichBanMvp, LoiMvp, TheThuThachMvp } from '../../../content/mvp/types';
import { soundEngine } from '../../../shared/audio/sound-engine';
import { track } from '../../../shared/telemetry/track';
import { CodeText } from '../../../shared/ui/CodeText';
import type { GiaTriHoSo } from '../../engine/giay-nho';
import { tenNguoiNoi } from '../../engine/may';
import { chamThuThach, chaySql, phanUngSauKhiChay, type KetQuaCham } from '../../engine/sql-mvp';
import {
  TEN_PHEP,
  cauTuSql,
  dieuKienThanhSql,
  khungTuSqlChuan,
  tachWhere,
  thanhSql,
  type CauDung,
  type DieuKienDung,
  type KieuCot,
  type WhereTach,
} from '../../engine/trinh-dung';
import { anhTheoTen } from '../anh-mvp';
import { SoiDieuKienMvp } from '../SoiDieuKienMvp';
import { DongPhieu, type DongPhieuRef } from './DongPhieu';
import { NHIP, ngu } from './nhip';
import './v7.css';

export type CanhTra = 'phong-clb' | 'phong-may' | 'man-chieu';

/** Ảnh cảnh và tọa độ mặt kính trên khung 1600×900 (đo từ ảnh: art/nguon/phong-*-core). */
const CANH: Record<CanhTra, { anh: string | null; kinh: { x: number; y: number; w: number; h: number }; may: string }> = {
  'phong-clb': { anh: 'canh-tra-phong-clb', kinh: { x: 253, y: 60, w: 1094, h: 588 }, may: 'laptop CLB · tài khoản clb_tham_tu' },
  'phong-may': { anh: 'canh-tra-phong-may', kinh: { x: 196, y: 84, w: 1232, h: 628 }, may: 'máy phòng máy · xem theo phiếu tra cứu' },
  'man-chieu': { anh: null, kinh: { x: 190, y: 60, w: 1220, h: 640 }, may: 'màn chiếu phòng họp' },
};

const TOI_DA_DIEU_KIEN = 3;
const TEN_NOI: Record<'AND' | 'OR', string> = { AND: 'VÀ', OR: 'HOẶC' };
export interface ManTraV7Props {
  kb: KichBanMvp;
  duLieu: BoDuLieuMvp | null;
  the: TheThuThachMvp;
  mode: 'challenge' | 'fix-query';
  canh: CanhTra;
  giayNho: GiaTriHoSo[];
  dienTen: (t: string) => string;
  /** Người chơi bấm ghim / đi tiếp sau khi tra đúng; `dung` = mã các thẻ đã kéo vào câu. */
  onXong: (dung: string[]) => void;
}

export function ManTraV7({ kb, duLieu, the, mode, canh, giayNho, dienTen, onXong }: ManTraV7Props) {
  const cauHinh = CANH[canh];
  const khung = useMemo(() => khungTuSqlChuan(the.sqlChuan), [the.sqlChuan]);
  const bang = duLieu?.bang.find((b) => b.ten === khung?.bang);
  const cot = useMemo(() => bang?.cot.map((c) => c.ten) ?? [], [bang]);
  const kieuCot = useCallback((ten: string): KieuCot => bang?.cot.find((c) => c.ten === ten)?.kieu ?? 'TEXT', [bang]);
  const tongDong = bang?.dong.length ?? 0;

  const [cau, setCau] = useState<CauDung>(() => {
    const napSan = mode === 'fix-query' && the.truyVanNapSan ? cauTuSql(the.truyVanNapSan) : null;
    if (napSan) return napSan;
    return {
      khung: khung?.khung ?? '',
      dieuKien: [0, 1].map((i) => ({ cot: cot[i % Math.max(1, cot.length)] ?? '', phep: 'bang', giaTri: null })),
      noi: ['AND'],
    };
  });
  const sql = thanhSql(cau, kieuCot);
  const [dangChon, setDangChon] = useState<GiaTriHoSo | null>(null);
  const [cham, setCham] = useState<KetQuaCham | null>(null);
  const [daChay, setDaChay] = useState<WhereTach | null>(null);
  const [dangChay, setDangChay] = useState(false);
  const [soi, setSoi] = useState(false);
  const [so, setSo] = useState<{ n: number; nhan: string }>({ n: tongDong, nhan: 'DÒNG' });
  const [dau, setDau] = useState<number | null>(null);
  const [loiNoi, setLoiNoi] = useState<LoiMvp[]>([]);
  const [xongRoi, setXongRoi] = useState(false);
  const phieu = useRef<DongPhieuRef>(null);
  const banRon = useRef(false);
  const song = useRef(true);
  useEffect(() => {
    song.current = true;
    return () => {
      song.current = false;
    };
  }, []);

  const dung = cham?.trangThai === 'dung';
  const khoa = dung || dangChay;

  /** Sửa câu → kết quả cũ không còn là kết quả của câu đang hiện: xóa đi, đống phiếu về đủ. */
  const doiCau = useCallback(
    (f: (c: CauDung) => CauDung): void => {
      setCau(f);
      setCham(null);
      setDaChay(null);
      setSoi(false);
      setDau(null);
      setLoiNoi([]);
      setSo({ n: tongDong, nhan: 'DÒNG' });
      phieu.current?.datLai();
    },
    [tongDong],
  );
  const doiDk = (i: number, f: (d: DieuKienDung) => DieuKienDung): void => doiCau((c) => ({ ...c, dieuKien: c.dieuKien.map((d, k) => (k === i ? f(d) : d)) }));
  const dat = (i: number, g: GiaTriHoSo): void => {
    soundEngine.playSfx('select');
    doiDk(i, (d) => ({ ...d, giaTri: { nguon: 'giay-nho', tho: g.giaTri, nhieu: g.nhieu, the: g.the } }));
    setDangChon(null);
  };
  const tha = (i: number) => (e: DragEvent) => {
    e.preventDefault();
    const g = giayNho.find((x) => x.khoa === e.dataTransfer.getData('text/plain'));
    if (g && !khoa) dat(i, g);
  };

  const demToi = useCallback(async (tu: number, toi: number, ms: number, nhan: string): Promise<void> => {
    if (NHIP === 0 || typeof requestAnimationFrame !== 'function') {
      setSo({ n: toi, nhan });
      return;
    }
    await new Promise<void>((xong) => {
      const t0 = performance.now();
      const buoc = (t: number): void => {
        if (!song.current) return xong();
        const k = Math.min(1, (t - t0) / ms);
        setSo({ n: Math.round(tu + (toi - tu) * (1 - Math.pow(1 - k, 3))), nhan });
        if (k < 1) requestAnimationFrame(buoc);
        else xong();
      };
      requestAnimationFrame(buoc);
    });
  }, []);

  const chay = useCallback(async () => {
    if (!duLieu || !khung || banRon.current || dung) return;
    banRon.current = true;
    setDangChay(true);
    setCham(null);
    setSoi(false);
    setDau(null);
    setLoiNoi([]);
    phieu.current?.datLai();
    setSo({ n: tongDong, nhan: 'DÒNG' });
    soundEngine.playSfx('click');
    try {
      const kq = await chamThuThach(duLieu, sql, the.sqlChuan);
      const t = kq.trangThai === 'loi' ? null : tachWhere(sql);
      track({
        type: 'mvp_query_run',
        challengeId: the.id,
        mode: 'keo',
        rows: kq.trangThai === 'loi' ? null : kq.so.soDongNguoiChoi,
        error: kq.trangThai === 'loi',
        correct: kq.trangThai === 'dung',
      });
      if (kq.trangThai !== 'loi') {
        const n = kq.chay.dong.length;
        if (t) {
          // Mỗi dòng của bảng qua / không qua từng điều kiện, và có được giữ theo cách nối không.
          const giu = t.dieuKien.reduce((acc, d, i) => (i === 0 ? `(${d})` : `${acc} ${t.noi[i - 1] ?? 'AND'} (${d})`), '');
          const co = await chaySql(duLieu, `SELECT ${t.dieuKien.map((d) => `CASE WHEN ${d} THEN 1 ELSE 0 END`).join(', ')}, CASE WHEN ${giu} THEN 1 ELSE 0 END FROM ${t.bang}`);
          if (co.ok && song.current) {
            const soDk = t.dieuKien.length;
            const hang = co.dong;
            const toanVa = t.noi.every((x) => x === 'AND');
            if (toanVa) {
              let con = hang.map((_h, k) => k);
              for (let i = 0; i < soDk; i++) {
                const qua = con.filter((k) => hang[k]?.[i] === 1);
                phieu.current?.toMau(qua, (i % 3) + 1);
                phieu.current?.tha(con.filter((k) => hang[k]?.[i] !== 1));
                await demToi(con.length, qua.length, 600, `${i > 0 ? 'VÀ ' : ''}${t.dieuKien[i] ?? ''}`);
                con = qua;
                await ngu(220);
              }
            } else {
              for (let i = 0; i < soDk; i++) {
                phieu.current?.toMau(
                  hang.map((_h, k) => k).filter((k) => hang[k]?.[i] === 1),
                  (i % 3) + 1,
                );
              }
              await ngu(480);
              phieu.current?.tha(hang.map((_h, k) => k).filter((k) => hang[k]?.[soDk] !== 1));
              await demToi(hang.length, n, 750, t.noi.every((x) => x === 'OR') ? 'HOẶC: khớp một điều kiện là được giữ' : 'DÒNG');
            }
            if (n <= 12) phieu.current?.toMau(hang.map((_h, k) => k).filter((k) => hang[k]?.[soDk] === 1), 4);
          }
        }
        if (!song.current) return;
        setSo({ n, nhan: 'DÒNG' });
        setDau(n);
        soundEngine.playSfx(kq.trangThai === 'dung' ? 'chime' : 'shake');
        await ngu(380);
      }
      if (!song.current) return;
      setCham(kq);
      setDaChay(t);
      setLoiNoi(phanUngSauKhiChay(the, kq));
    } finally {
      banRon.current = false;
      if (song.current) setDangChay(false);
    }
  }, [duLieu, khung, dung, sql, the, tongDong, demToi]);

  if (!duLieu) return <p className="game__error">Vụ này chưa có bộ dữ liệu (du-lieu.md) nên không chạy được.</p>;
  if (!khung || !bang) return <p className="game__error">Thẻ thử thách này thiếu khung SELECT … FROM … hợp lệ.</p>;

  const laChieu = canh === 'man-chieu';
  const anhCanh = cauHinh.anh ? anhTheoTen(cauHinh.anh) : undefined;
  const loi = loiNoi[0];
  const chibiNoi = loi ? anhTheoTen(`chibi-${loi.speaker}`) : undefined;
  const dungCacThe = [...new Set(cau.dieuKien.map((d) => (d.giaTri?.nguon === 'giay-nho' ? d.giaTri.the : undefined)).filter((x): x is string => !!x))];
  const xong = (): void => {
    if (xongRoi) return;
    setXongRoi(true);
    onXong(dungCacThe);
  };

  // Giấy nhớ quanh viền: nửa trái, nửa phải; nhiều hơn 8 tờ thì xếp sát lại.
  const nua = Math.ceil(giayNho.length / 2);
  const buocGiay = Math.min(146, (cauHinh.kinh.h - 8) / Math.max(1, nua));
  const viTriGiay = (i: number): CSSProperties => {
    const phai = i >= nua;
    const k = phai ? i - nua : i;
    return {
      left: phai ? cauHinh.kinh.x + cauHinh.kinh.w - 6 : cauHinh.kinh.x - 122,
      top: cauHinh.kinh.y + 22 + k * buocGiay,
      ['--r' as string]: `${((i * 37) % 9) - 4}deg`,
      ['--img' as string]: `url("${anhTheoTen(`giay-nho-${String((i % 10) + 1).padStart(2, '0')}`) ?? ''}")`,
    };
  };

  const giay = giayNho.map((g, i) => (
    <button
      key={g.khoa}
      type="button"
      className={`v7-giay${i >= nua ? ' is-phai' : ''}${dangChon?.khoa === g.khoa ? ' is-chon' : ''}${g.nhieu ? ' is-nhieu' : ''}${(g.nhieu ?? [g.giaTri]).some((v) => v.length > 6) ? ' is-dai' : ''}`}
      style={viTriGiay(i)}
      draggable={!khoa}
      disabled={khoa}
      aria-pressed={dangChon?.khoa === g.khoa}
      aria-label={`${g.giaTri} (giấy nhớ ${dienTen(g.nguon)})`}
      onDragStart={(e) => e.dataTransfer.setData('text/plain', g.khoa)}
      onClick={() => {
        soundEngine.playSfx('tab');
        setDangChon(dangChon?.khoa === g.khoa ? null : g);
      }}
    >
      <span className="v7-giay__chu">{g.nhieu ? g.nhieu.map((v) => <span key={v}>{v}</span>) : g.giaTri}</span>
      <small className="v7-giay__nguon">{dienTen(g.nguon).replace(/^\[|\]$/g, '')}</small>
    </button>
  ));

  const kinh = (
    <div className="v7-kinh" data-region="sql">
      <div className="v7-thanh">
        <span>▣ tra-cuu — {cauHinh.may}</span>
      </div>
      <p className="v7-de">{dienTen(the.deBai)}</p>
      <div className="v7-cau">
        <div className="v7-cau__bang">
          <span className="v7-o v7-o--bang" title={`Bảng ${bang.ten}`}>
            <span aria-hidden="true">🔒</span> {bang.ten}
          </span>
          <small>{tongDong} dòng</small>
        </div>
        <ol className="v7-cau__dk" aria-label="Các điều kiện">
          {cau.dieuKien.map((d, i) => {
            const noi = cau.noi[i - 1] ?? 'AND';
            const nhieu = d.giaTri?.nguon === 'giay-nho' && (d.giaTri.nhieu?.length ?? 0) > 1;
            return (
              <li key={i} className="v7-dk" data-dk={i + 1}>
                {i > 0 ? (
                  <button
                    type="button"
                    className={`v7-o v7-o--noi${noi === 'OR' ? ' is-hoac' : ''}`}
                    disabled={khoa}
                    aria-label={`Nối điều kiện ${i + 1}: ${TEN_NOI[noi]} (${noi}) — bấm để đổi`}
                    onClick={() => doiCau((c) => ({ ...c, noi: c.noi.map((x, k) => (k === i - 1 ? (x === 'AND' ? 'OR' : 'AND') : x)) }))}
                  >
                    {TEN_NOI[noi]}
                  </button>
                ) : (
                  <span className="v7-o v7-o--dau" aria-hidden="true">
                    LỌC
                  </span>
                )}
                <button
                  type="button"
                  className="v7-o v7-o--cot"
                  disabled={khoa}
                  aria-label={`Cột của điều kiện ${i + 1}: ${d.cot} — bấm để đổi`}
                  onClick={() => doiDk(i, (x) => ({ ...x, cot: cot[(cot.indexOf(x.cot) + 1) % cot.length] ?? x.cot }))}
                >
                  {d.cot}
                </button>
                <button
                  type="button"
                  className="v7-o v7-o--phep"
                  disabled={khoa}
                  aria-label={`Phép so sánh của điều kiện ${i + 1}: ${TEN_PHEP[d.phep]} — bấm để đổi`}
                  onClick={() => doiDk(i, (x) => ({ ...x, phep: x.phep === 'bang' ? 'bat-dau-bang' : 'bang' }))}
                >
                  {nhieu && d.phep === 'bang' ? 'là một trong' : TEN_PHEP[d.phep]}
                </button>
                <button
                  type="button"
                  className={`v7-khe${d.giaTri ? ' is-co' : ''}${dangChon && !d.giaTri ? ' is-moi' : ''}`}
                  disabled={khoa}
                  aria-label={d.giaTri ? `Giá trị điều kiện ${i + 1}: ${d.giaTri.tho} — bấm để gỡ` : `Ô giá trị điều kiện ${i + 1}: thả giấy nhớ vào đây`}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={tha(i)}
                  onClick={() => {
                    if (dangChon) dat(i, dangChon);
                    else if (d.giaTri) doiDk(i, (x) => ({ ...x, giaTri: null }));
                  }}
                >
                  {d.giaTri ? <span className="v7-khe__giay">{d.giaTri.tho}</span> : 'thả giấy nhớ'}
                </button>
                {cau.dieuKien.length > 1 && !laChieu ? (
                  <button
                    type="button"
                    className="v7-o v7-o--bo"
                    disabled={khoa}
                    aria-label={`Bỏ điều kiện ${i + 1}`}
                    onClick={() => doiCau((c) => ({ ...c, dieuKien: c.dieuKien.filter((_x, k) => k !== i), noi: c.noi.filter((_x, k) => k !== Math.max(0, i - 1)) }))}
                  >
                    ×
                  </button>
                ) : null}
              </li>
            );
          })}
          {cau.dieuKien.length < TOI_DA_DIEU_KIEN && !laChieu ? (
            <li>
              <button
                type="button"
                className="v7-o v7-o--them"
                disabled={khoa}
                aria-label="Thêm điều kiện"
                onClick={() => doiCau((c) => ({ ...c, dieuKien: [...c.dieuKien, { cot: cot[c.dieuKien.length % Math.max(1, cot.length)] ?? '', phep: 'bang', giaTri: null }], noi: [...c.noi, 'AND'] }))}
              >
                +
              </button>
            </li>
          ) : null}
        </ol>
      </div>

      <div className={`v7-vung${cham && cham.trangThai !== 'loi' ? ' co-ket-qua' : ''}`} aria-live="polite" aria-label="Kết quả">
        <DongPhieu ref={phieu} tong={tongDong} />
        {cham && cham.trangThai !== 'loi' && !soi ? (
          <div className="v7-kq">
            {cham.chay.dong.length === 0 ? (
              <p className="v7-kq__trong">Không dòng nào.</p>
            ) : (
              <table>
                <caption className="visually-hidden">Kết quả truy vấn của bạn</caption>
                <thead>
                  <tr>
                    {cham.chay.cot.map((c) => (
                      <th key={c} scope="col">
                        {c}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {cham.chay.dong.map((h, r) => (
                    <tr key={r} style={{ ['--i' as string]: Math.min(r, 12) }}>
                      {h.map((v, k) => (
                        <td key={k}>{v === null ? '(trống)' : String(v)}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        ) : null}
        {cham?.trangThai === 'loi' ? <p className="v7-loi">Chưa chạy được: {cham.chay.thongDiep}</p> : null}
        {soi && daChay ? (
          <div className="v7-soi">
            <SoiDieuKienMvp duLieu={duLieu} where={daChay} onDong={() => setSoi(false)} />
          </div>
        ) : null}
        {dau !== null ? (
          <div className={`v7-dau${dung ? ' is-dung' : ''}`} key={`${dau}-${dung}`}>
            {dau} DÒNG
          </div>
        ) : null}
        <div className="v7-so" aria-hidden={dau !== null}>
          <div className="v7-so__n">{so.n}</div>
          <div className="v7-so__l">{so.nhan}</div>
        </div>
      </div>

      <p className="v7-sql" aria-label="Câu SQL đang dựng">
        <CauSql cau={cau} kieuCot={kieuCot} />
      </p>
      <div className="v7-day">
        {daChay && cham && cham.trangThai !== 'loi' ? (
          <button type="button" className={`v7-nut v7-nut--soi${soi ? ' is-mo' : ''}`} onClick={() => setSoi(!soi)}>
            🔍 Xem từng điều kiện
          </button>
        ) : null}
        {dung ? (
          <button type="button" className="v7-nut v7-nut--ghim" disabled={xongRoi} onClick={xong} autoFocus>
            {the.vatChung && !laChieu ? '📌 Ghim lên bảng' : 'Tiếp tục'}
          </button>
        ) : (
          <button type="button" className="v7-nut v7-nut--chay" disabled={dangChay} onClick={() => void chay()}>
            ▶ {dangChay ? 'ĐANG CHẠY' : 'CHẠY'}
          </button>
        )}
      </div>
    </div>
  );

  return (
    <VungV7 canh={canh} anhCanh={anhCanh} kinhO={cauHinh.kinh} giay={laChieu ? null : giay} nhan={mode === 'fix-query' ? 'Sửa truy vấn' : 'Tra dữ liệu'}>
      {kinh}
      {loi ? (
        <button
          type="button"
          className="v7-thoai"
          onClick={() => setLoiNoi((ds) => ds.slice(1))}
          aria-label={`${tenNguoiNoi(kb, loi.speaker)}: ${dienTen(loi.text)} — bấm để đóng`}
        >
          {chibiNoi ? <img className="v7-thoai__mat" src={chibiNoi} alt="" draggable={false} /> : null}
          <span className="v7-thoai__than">
            <b>{tenNguoiNoi(kb, loi.speaker)}</b>
            <span>
              <CodeText text={dienTen(loi.text)} />
            </span>
          </span>
          <span className="v7-thoai__them" aria-hidden="true">
            {loiNoi.length > 1 ? '▼' : '✕'}
          </span>
        </button>
      ) : null}
    </VungV7>
  );
}

/** Câu SQL tô màu: từ khóa xanh, giá trị vàng, mỗi điều kiện gạch chân cùng màu với phiếu của nó. */
function CauSql({ cau, kieuCot }: { cau: CauDung; kieuCot: (c: string) => KieuCot }) {
  const phan = cau.dieuKien
    .map((d, i) => ({ chu: dieuKienThanhSql(d, kieuCot(d.cot)), i }))
    .filter((x): x is { chu: string; i: number } => x.chu !== null);
  const m = /^SELECT\s+(.+?)\s+FROM\s+(\S+)$/i.exec(cau.khung);
  return (
    <code>
      <span className="k">SELECT</span> {m?.[1] ?? '*'} <span className="k">FROM</span> {m?.[2] ?? ''}
      {phan.length > 0 ? (
        <>
          {' '}
          <span className="k">WHERE</span>
          {phan.map((p, k) => (
            <span key={p.i}>
              {k > 0 ? <span className="k"> {cau.noi[p.i - 1] ?? 'AND'}</span> : null}{' '}
              <span className={`u u${(p.i % 3) + 1}`}>{toMauDieuKien(p.chu)}</span>
            </span>
          ))}
        </>
      ) : null}
    </code>
  );
}

function toMauDieuKien(chu: string) {
  return chu.split(/('(?:[^']|'')*'|\b(?:LIKE|IN|OR)\b)/g).map((x, i) =>
    /^'/.test(x) ? (
      <span key={i} className="s">
        {x}
      </span>
    ) : /^(LIKE|IN|OR)$/.test(x) ? (
      <span key={i} className="k">
        {x}
      </span>
    ) : (
      x
    ),
  );
}

/**
 * Khung cảnh: màn ngang thì vẽ cảnh 1600×900 co vừa vùng chứa, mặt kính nằm đúng chỗ màn hình trong ảnh, giấy nhớ dán quanh
 * viền; màn dọc (điện thoại) thì bỏ cảnh, giấy nhớ thành một dải phía trên, màn hình chiếm phần còn lại.
 */
export function VungV7({
  canh,
  anhCanh,
  kinhO,
  giay,
  nhan,
  children,
}: {
  canh: CanhTra | 'loc-thu';
  anhCanh: string | undefined;
  kinhO: { x: number; y: number; w: number; h: number };
  giay: React.ReactNode;
  nhan: string;
  children: React.ReactNode;
}) {
  const goc = useRef<HTMLDivElement>(null);
  const [co, setCo] = useState<{ w: number; h: number } | null>(null);
  useEffect(() => {
    const el = goc.current;
    if (!el) return;
    const do_ = (): void => setCo({ w: el.clientWidth, h: el.clientHeight });
    do_();
    if (typeof ResizeObserver === 'undefined') return;
    const ro = new ResizeObserver(do_);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  const doc = co !== null && co.w > 0 && co.w / Math.max(1, co.h) < 1.15;
  const tiLe = co && co.w > 0 ? Math.min(co.w / 1600, co.h / 900) : 1;
  const [kinh, ...khac] = Array.isArray(children) ? children : [children];
  return (
    <div ref={goc} className={`v7 ${doc ? 'v7--doc' : 'v7--ngang'}`} data-canh={canh} role="region" aria-label={nhan}>
      {doc ? (
        <>
          {giay ? <div className="v7-dai">{giay}</div> : null}
          <div className="v7-o-kinh">{kinh}</div>
        </>
      ) : (
        <div className="v7-san" style={{ transform: `translate(-50%, -50%) scale(${tiLe})` }}>
          {anhCanh ? <img className="v7-nen" src={anhCanh} alt="" draggable={false} /> : null}
          <div className="v7-o-kinh" style={{ left: kinhO.x, top: kinhO.y, width: kinhO.w, height: kinhO.h }}>
            {kinh}
          </div>
          {giay}
        </div>
      )}
      {khac}
    </div>
  );
}
