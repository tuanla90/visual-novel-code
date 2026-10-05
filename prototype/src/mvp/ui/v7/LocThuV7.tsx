/**
 * LỌC THỬ Ở NGÀY HỘI (`[LỌC THỬ …]`): lần chạm dữ liệu đầu tiên của cả game, trên máy của chị Minh Anh.
 * Chưa hiện SQL, không có nút chạy. Bản 02/10/2026 (user chốt): câu lọc có thể có HAI điều kiện cố định nối VÀ
 * (`… WHERE ten = 'Tùng' AND nganh = 'Du lịch'`): mỗi điều kiện một thẻ, thả lần lượt → đống phiếu rơi bớt sau mỗi thẻ
 * (956 → 3 → 1). Lọc xong, người chơi BẤM VÀO Ô của cột cần lấy (`chọn <cột> = <giá trị>` của nút, ở Ngày hội là ô mã sinh viên):
 * ô ấy được chép ra một tờ giấy nhớ. Bấm ô khác: ô rung, có lời nhắc cột cần lấy; thử lại không bị phạt.
 *
 * Câu lọc lấy từ nút kịch bản (`nut.sql`): mỗi điều kiện `<cột> = '<giá trị>'` thành một hàng "cột · bằng · ô thả thẻ".
 *
 * Gói B14 (05/10/2026, user chơi thử: "màn này tôi đã thấy có animation giảm từ 64 về 1 đâu"): thẻ đầu vẫn là đống phiếu rơi;
 * từ thẻ thứ hai, khi bảng kết quả đã hiện, hoạt cảnh đi TỪ BẢNG ẤY: dòng không còn khớp rụng khỏi bảng, dòng còn lại dồn lên,
 * con số đếm xuống cùng nhịp (`hoat-canh-bang.ts`, dùng chung với màn tra). Thẻ dán trên rìa trái của máy như giấy nhớ ở màn
 * tra (`giay-nho-quanh.ts` `traiGiay`), không lấn vào màn hình.
 */
import type { QuanSatTruyVanMvp } from '../../engine/tri-nho-dong-hanh';
import { useEffect, useMemo, useRef, useState, type DragEvent } from 'react';
import type { BoDuLieuMvp, NutMvp } from '../../../content/mvp/types';
import { soundEngine } from '../../../shared/audio/sound-engine';
import { IconPointer } from '../../../shared/ui/icons';
import { chaySql, type KetQuaChay } from '../../engine/sql-mvp';
import { cauTuSql } from '../../engine/trinh-dung';
import { anhTheoTen } from '../anh-mvp';
import { DongPhieu, type DongPhieuRef } from './DongPhieu';
import { leGiay, traiGiay } from './giay-nho-quanh';
import { VungV7 } from './ManTraV7';
import { RUNG_MS, demSo, hepLai, thuocTinhDongRung, useRungBang } from './hoat-canh-bang';
import { giamChuyenDong, ngu } from './nhip';
import './v7.css';

export interface LocThuV7Props {
  duLieu: BoDuLieuMvp | null;
  nut: Extract<NutMvp, { type: 'trial-filter' }>;
  onChon: (giaTri: string) => void;
  onDaXemTruyVan?: QuanSatTruyVanMvp;
}

const NHAN_COT: Record<string, string> = {
  ma_sv: 'Mã SV',
  ho_dem: 'Họ đệm',
  ten: 'Tên',
  nganh: 'Ngành',
};
export const nhanCot = (cot: string): string => NHAN_COT[cot.toLowerCase()] ?? cot;

const KINH = { x: 90, y: 36, w: 1420, h: 740 };
const nhay = (v: string): string => `'${v.replace(/'/g, "''")}'`;

export function LocThuV7({ duLieu, nut, onChon, onDaXemTruyVan }: LocThuV7Props) {
  const cau = useMemo(() => cauTuSql(nut.sql), [nut.sql]);
  const dieuKien = useMemo(() => (cau?.dieuKien ?? []).map((d) => ({ cot: d.cot, giaTri: d.giaTri?.tho ?? '' })), [cau]);
  const bang = /FROM\s+([A-Za-z_][A-Za-z0-9_]*)/i.exec(nut.sql)?.[1] ?? '';
  const [tong, setTong] = useState(0);
  /** Số điều kiện đã có thẻ (thả lần lượt từ trên xuống). */
  const [daTha, setDaTha] = useState(0);
  const [dangChon, setDangChon] = useState<string | null>(null);
  const [dangLoc, setDangLoc] = useState(false);
  const [kq, setKq] = useState<Extract<KetQuaChay, { ok: true }> | null>(null);
  const [so, setSo] = useState(0);
  const [sai, setSai] = useState<string[]>([]);
  const [rung, setRung] = useState<string | null>(null);
  const [nhac, setNhac] = useState(false);
  const [chep, setChep] = useState<string | null>(null);
  const phieu = useRef<DongPhieuRef>(null);
  const { than: thanBang, vuaDon, rung: dongRung, rungDi, xong: xongRung, datLai: boRung } = useRungBang();
  const song = useRef(true);
  useEffect(() => {
    song.current = true;
    return () => {
      song.current = false;
    };
  }, []);

  useEffect(() => {
    let con = true;
    if (!duLieu || !bang) return;
    chaySql(duLieu, `SELECT COUNT(*) FROM ${bang}`).then((r) => {
      if (con && r.ok) {
        const n = Number(r.dong[0]?.[0] ?? 0);
        setTong(n);
        setSo(n);
      }
    });
    return () => {
      con = false;
    };
  }, [duLieu, bang]);

  const tha = async (i: number, giaTri: string): Promise<void> => {
    const dk = dieuKien[i];
    if (!duLieu || !cau || !dk || i !== daTha || dangLoc) return;
    if (giaTri !== dk.giaTri) {
      // Thẻ không hợp ô này (vd thẻ ngành vào ô tên): ô rung, thẻ vẫn còn.
      soundEngine.playSfx('shake');
      setRung(`o${i}`);
      setTimeout(() => song.current && setRung(null), 320);
      return;
    }
    setDangLoc(true);
    setDangChon(null);
    setDaTha(i + 1);
    soundEngine.playSfx('select');
    const dieu = dieuKien.slice(0, i + 1).map((d) => `${d.cot} = ${nhay(d.giaTri)}`);
    const [r, co] = await Promise.all([
      chaySql(duLieu, `${cau.khung} WHERE ${dieu.join(' AND ')}`),
      chaySql(duLieu, `SELECT ${dieu.map((d) => `CASE WHEN ${d} THEN 1 ELSE 0 END`).join(', ')} FROM ${bang}`),
    ]);
    if (!song.current || !r.ok) return;
    const truoc = so;
    const giam = giamChuyenDong();
    // Phiếu đã rơi ở điều kiện trước thì thôi; điều kiện này tô màu phiếu qua, thả phiếu vừa bị loại.
    const conTruoc = co.ok ? co.dong.map((d, k) => ({ k, d })).filter(({ d }) => d.slice(0, i).every((v) => v === 1)) : [];
    const qua = conTruoc.filter(({ d }) => d[i] === 1).map(({ k }) => k);
    const biLoai = conTruoc.filter(({ d }) => d[i] !== 1).map(({ k }) => k);
    const n = r.dong.length;
    // Đã có bảng kết quả (từ thẻ thứ hai): hoạt cảnh đi TỪ BẢNG ĐANG HIỆN. Dòng không còn khớp rụng khỏi bảng, con số đếm
    // xuống cùng nhịp; đống phiếu phía sau (đang mờ, bị bảng che) chỉ xếp lại theo kết quả mới.
    const hep = kq ? hepLai(kq, r) : null;
    phieu.current?.toMau(qua, (i % 3) + 1);
    if (hep) {
      phieu.current?.an(biLoai);
      await Promise.all([rungDi(hep), demSo(truoc, n, RUNG_MS, setSo, () => song.current)]);
      if (!song.current) return;
      soundEngine.playSfx('chime');
      xongRung();
    } else {
      boRung();
      if (giam) phieu.current?.an(biLoai);
      else phieu.current?.tha(biLoai, 500);
      // Con số đếm xuống trong lúc phiếu rơi.
      await demSo(truoc, n, 660, setSo, () => song.current);
      if (!song.current) return;
      soundEngine.playSfx('chime');
      if (!giam) await ngu(350);
      if (!song.current) return;
    }
    setSo(n);
    setKq(r);
    onDaXemTruyVan?.({ id: nut.id, nhan: 'Lọc thử ở Ngày hội', sql: `${cau.khung} WHERE ${dieu.join(' AND ')}` }, []);
    setDangLoc(false);
  };

  if (!duLieu) return <p className="game__error">Vụ này chưa có bộ dữ liệu (du-lieu.md).</p>;
  if (!cau || dieuKien.length === 0 || !bang) return <p className="game__error">Câu lọc thử không có dạng … WHERE cột = 'giá trị'.</p>;

  const locXong = daTha === dieuKien.length && !dangLoc;
  const iCot = kq ? kq.cot.findIndex((c) => c.toLowerCase() === nut.chon.cot.toLowerCase()) : -1;
  const bamO = (r: number, k: number): void => {
    if (!kq || !locXong || chep) return;
    const v = String(kq.dong[r]?.[k] ?? '');
    if (k !== iCot || v !== nut.chon.giaTri) {
      soundEngine.playSfx('sai');
      const khoa = `${r}:${k}`;
      setSai((ds) => (ds.includes(khoa) ? ds : [...ds, khoa]));
      setRung(khoa);
      setNhac(true);
      setTimeout(() => song.current && setRung(null), 320);
      if (k === iCot) onChon(v);
      return;
    }
    // Đúng ô: ô được chép ra một tờ giấy nhớ rồi mới đi tiếp.
    soundEngine.playSfx('select');
    setChep(v);
    setTimeout(() => song.current && onChon(v), 900);
  };

  const conThe = dieuKien.slice(daTha);
  const giay = (
    <>
      {conThe.map((d, j) => (
        <button
          key={d.giaTri}
          type="button"
          className={`v7-giay v7-giay--quanh${dangChon === d.giaTri ? ' is-chon' : ''}`}
          style={{
            // Thẻ dán trên rìa trái của máy (cùng phép tính với giấy nhớ ở màn tra), không lấn vào màn hình.
            left: traiGiay(KINH),
            top: KINH.y + 70 + (daTha + j) * 150,
            ['--r' as string]: `${j % 2 === 0 ? -4 : 3}deg`,
            ['--img' as string]: `url("${anhTheoTen(`giay-nho-0${((daTha + j) % 9) + 1}`) ?? ''}")`,
          }}
          draggable
          aria-pressed={dangChon === d.giaTri}
          aria-label={`Thẻ ${d.giaTri}`}
          onDragStart={(e) => e.dataTransfer.setData('text/plain', d.giaTri)}
          onClick={() => setDangChon(dangChon === d.giaTri ? null : d.giaTri)}
        >
          <span className="v7-giay__chu">{d.giaTri}</span>
        </button>
      ))}
      {chep ? (
        <span
          className="v7-giay v7-giay--quanh v7-giay--chep"
          style={{
            left: traiGiay(KINH),
            top: KINH.y + 70,
            ['--r' as string]: '-3deg',
            ['--img' as string]: `url("${anhTheoTen('giay-nho-03') ?? ''}")`,
          }}
          role="status"
          aria-label={`Giấy nhớ mới: ${chep}`}
        >
          <span className="v7-giay__chu">{chep}</span>
        </span>
      ) : null}
    </>
  );

  return (
    // Lọc thử diễn ra ở bàn Ngày hội (nhà văn hóa), không phải phòng CLB: chỉ vẽ chiếc laptop (nền trong suốt), cảnh thật lộ ra quanh máy.
    <VungV7 canh="loc-thu" anhCanh={anhTheoTen('canh-tra-laptop')} kinhO={KINH} giay={giay} le={leGiay(KINH)} nhan="Lọc danh sách">
      <div className="v7-kinh">
        <div className="v7-thanh">
          <span>▣ Danh sách tân sinh viên K24 (Excel)</span>
        </div>
        <div className="v7-cau">
          <div className="v7-cau__bang">
            <span className="v7-o v7-o--bang">Danh sách SV</span>
            <small>{tong} người</small>
          </div>
          <ol className="v7-cau__dk" aria-label="Điều kiện lọc">
            {dieuKien.map((d, i) => {
              const co = i < daTha;
              const toi = i === daTha && !dangLoc;
              return (
                <li key={d.cot} className={`v7-dk${i > daTha ? ' is-cho' : ''}`} data-dk={i + 1}>
                  {i > 0 ? <span className="v7-o v7-o--noi">VÀ</span> : null}
                  <span className="v7-o v7-o--cot" data-cot={d.cot}>{nhanCot(d.cot)}</span>
                  <span className="v7-o v7-o--phep">bằng</span>
                  <button
                    type="button"
                    className={`v7-khe${co ? ' is-co' : ''}${toi && dangChon ? ' is-moi' : ''}${rung === `o${i}` ? ' is-rung' : ''}`}
                    disabled={co || !toi}
                    aria-label={co ? `Đang lọc: ${nhanCot(d.cot)} bằng ${d.giaTri}` : `Ô giá trị của cột ${nhanCot(d.cot)}`}
                    data-cot={d.cot}
                    onDragOver={(e: DragEvent) => e.preventDefault()}
                    onDrop={(e: DragEvent) => {
                      e.preventDefault();
                      void tha(i, e.dataTransfer.getData('text/plain'));
                    }}
                    onClick={() => {
                      if (dangChon) void tha(i, dangChon);
                    }}
                  >
                    {co ? <span className="v7-khe__giay">{d.giaTri}</span> : ''}
                  </button>
                </li>
              );
            })}
          </ol>
        </div>
        <div className={`v7-vung${kq ? ' co-ket-qua' : ''}`} aria-live="polite" aria-label="Kết quả">
          <DongPhieu ref={phieu} tong={tong} />
          {kq ? (
            <div className={`v7-kq${locXong ? ' v7-kq--chon' : ''}${vuaDon ? ' v7-kq--don' : ''}`}>
              <table>
                <caption className="visually-hidden">Kết quả lọc</caption>
                <thead>
                  <tr>
                    {kq.cot.map((c, k) => (
                      <th key={c} scope="col" className={locXong && k === iCot && nhac ? 'is-can' : undefined}>
                        {nhanCot(c)}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody ref={thanBang}>
                  {kq.dong.slice(0, 40).map((h, r) => (
                    <tr key={r} style={{ ['--i' as string]: r }} {...thuocTinhDongRung(dongRung, r)}>
                      {h.map((v, k) => {
                        const chu = v === null ? '(trống)' : String(v);
                        if (!locXong) return <td key={k}>{chu}</td>;
                        const khoa = `${r}:${k}`;
                        return (
                          <td key={k} className="v7-kq__o">
                            <button
                              type="button"
                              className={`v7-o-bam${sai.includes(khoa) ? ' is-sai' : ''}${rung === khoa ? ' is-rung' : ''}${chep === chu && k === iCot ? ' is-chep' : ''}`}
                              aria-label={`Ô ${nhanCot(kq.cot[k] ?? '')}: ${chu}`}
                              disabled={!!chep}
                              onClick={() => bamO(r, k)}
                            >
                              {chu}
                            </button>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
              {!locXong && !dangLoc && conThe[0] ? (
                <p className="v7-kq__nhac">
                  Còn {kq.dong.length} người. Thả tiếp thẻ {conThe[0].giaTri} vào ô {nhanCot(conThe[0].cot)}.
                </p>
              ) : null}
              {locXong && !chep ? (
                <p className="v7-kq__nhac">
                  <IconPointer className="v7-bt" /> {nhac ? `Cái cần lấy nằm ở cột ${nhanCot(nut.chon.cot)}. Bấm vào ô ấy.` : `Còn ${kq.dong.length} người. Bấm vào ô ${nhanCot(nut.chon.cot)} để chép ra giấy nhớ.`}
                </p>
              ) : null}
              {chep ? <p className="v7-kq__nhac">Đã chép {chep} ra giấy nhớ.</p> : null}
            </div>
          ) : null}
          <div className="v7-so">
            <div className="v7-so__n">{so}</div>
            <div className="v7-so__l">NGƯỜI</div>
          </div>
        </div>
      </div>
    </VungV7>
  );
}
