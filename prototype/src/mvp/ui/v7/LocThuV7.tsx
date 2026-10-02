/**
 * LỌC THỬ Ở NGÀY HỘI (`[LỌC THỬ …]`, ĐÃ CHỐT C 30/09/2026): lần chạm dữ liệu đầu tiên của cả game, trên máy của chị Minh Anh.
 * Điều mới duy nhất: kéo một thẻ vào ô rồi đọc kết quả. Chưa hiện SQL, không có nút chạy, không câu hướng dẫn:
 * thả thẻ [Tùng] vào ô cạnh cột tên → đống phiếu của cả danh sách rơi bớt, còn 3 người → bấm vào người cần tìm
 * (nhân vật đã nói là Tùng ngành Du lịch). Bấm nhầm: dòng rung và gạch đi, thử lại không bị phạt.
 *
 * Câu lọc lấy từ nút kịch bản (`nut.sql`, dạng `… FROM <bảng> WHERE <cột> = '<giá trị>'`): giá trị thành thẻ, cột thành ô cột.
 */
import { useEffect, useMemo, useRef, useState, type DragEvent } from 'react';
import type { BoDuLieuMvp, NutMvp } from '../../../content/mvp/types';
import { soundEngine } from '../../../shared/audio/sound-engine';
import { chaySql, type KetQuaChay } from '../../engine/sql-mvp';
import { cauTuSql } from '../../engine/trinh-dung';
import { anhTheoTen } from '../anh-mvp';
import { DongPhieu, type DongPhieuRef } from './DongPhieu';
import { VungV7 } from './ManTraV7';
import { ngu } from './nhip';
import './v7.css';

export interface LocThuV7Props {
  duLieu: BoDuLieuMvp | null;
  nut: Extract<NutMvp, { type: 'trial-filter' }>;
  onChon: (giaTri: string) => void;
}

const KINH = { x: 250, y: 96, w: 1100, h: 640 };

export function LocThuV7({ duLieu, nut, onChon }: LocThuV7Props) {
  const cau = useMemo(() => cauTuSql(nut.sql), [nut.sql]);
  const dk = cau?.dieuKien[0];
  const bang = /FROM\s+([A-Za-z_][A-Za-z0-9_]*)/i.exec(nut.sql)?.[1] ?? '';
  const giaTri = dk?.giaTri?.tho ?? '';
  const [tong, setTong] = useState(0);
  const [daTha, setDaTha] = useState(false);
  const [dangChon, setDangChon] = useState(false);
  const [kq, setKq] = useState<Extract<KetQuaChay, { ok: true }> | null>(null);
  const [so, setSo] = useState(0);
  const [sai, setSai] = useState<number[]>([]);
  const [rung, setRung] = useState<number | null>(null);
  const phieu = useRef<DongPhieuRef>(null);
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

  const tha = async (): Promise<void> => {
    if (!duLieu || !dk || daTha) return;
    setDaTha(true);
    setDangChon(false);
    soundEngine.playSfx('select');
    const [r, co] = await Promise.all([chaySql(duLieu, nut.sql), chaySql(duLieu, `SELECT CASE WHEN ${dk.cot} = '${giaTri.replace(/'/g, "''")}' THEN 1 ELSE 0 END FROM ${bang}`)]);
    if (!song.current || !r.ok) return;
    if (co.ok) {
      const hang = co.dong.map((d, k) => ({ k, qua: d[0] === 1 }));
      phieu.current?.toMau(hang.filter((h) => h.qua).map((h) => h.k), 1);
      phieu.current?.tha(hang.filter((h) => !h.qua).map((h) => h.k), 500);
    }
    const n = r.dong.length;
    // Con số đếm xuống trong lúc phiếu rơi.
    for (let i = 1; i <= 12 && song.current; i++) {
      setSo(Math.round(tong + ((n - tong) * i) / 12));
      await ngu(55);
    }
    if (!song.current) return;
    setSo(n);
    soundEngine.playSfx('chime');
    await ngu(350);
    if (song.current) setKq(r);
  };

  if (!duLieu) return <p className="game__error">Vụ này chưa có bộ dữ liệu (du-lieu.md).</p>;
  if (!cau || !dk || !bang) return <p className="game__error">Câu lọc thử không có dạng … WHERE cột = 'giá trị'.</p>;

  const iCot = kq ? kq.cot.findIndex((c) => c.toLowerCase() === nut.chon.cot.toLowerCase()) : -1;
  const chonDong = (r: number): void => {
    if (!kq) return;
    const v = iCot >= 0 ? String(kq.dong[r]?.[iCot] ?? '') : '';
    if (v !== nut.chon.giaTri) {
      soundEngine.playSfx('shake');
      setSai((ds) => (ds.includes(r) ? ds : [...ds, r]));
      setRung(r);
      setTimeout(() => song.current && setRung(null), 320);
    }
    onChon(v);
  };

  const giay = daTha ? null : (
    <button
      type="button"
      className={`v7-giay${dangChon ? ' is-chon' : ''}`}
      style={{ left: KINH.x - 118, top: KINH.y + 110, ['--r' as string]: '-4deg', ['--img' as string]: `url("${anhTheoTen('giay-nho-01') ?? ''}")` }}
      draggable
      aria-pressed={dangChon}
      aria-label={`Thẻ ${giaTri}`}
      onDragStart={(e) => e.dataTransfer.setData('text/plain', giaTri)}
      onClick={() => setDangChon(!dangChon)}
    >
      <span className="v7-giay__chu">{giaTri}</span>
    </button>
  );

  return (
    <VungV7 canh="loc-thu" anhCanh={undefined} kinhO={KINH} giay={giay} nhan="Lọc danh sách">
      <div className="v7-kinh">
        <div className="v7-thanh">
          <span>▣ danh sách tân sinh viên</span>
        </div>
        <div className="v7-cau">
          <div className="v7-cau__bang">
            <span className="v7-o v7-o--bang">danh sách</span>
            <small>{tong} người</small>
          </div>
          <ol className="v7-cau__dk" aria-label="Điều kiện lọc">
            <li className="v7-dk" data-dk={1}>
              <span className="v7-o v7-o--cot">{dk.cot}</span>
              <span className="v7-o v7-o--phep">bằng</span>
              <button
                type="button"
                className={`v7-khe${daTha ? ' is-co' : ''}${dangChon ? ' is-moi' : ''}`}
                disabled={daTha}
                aria-label={daTha ? `Đang lọc: ${dk.cot} bằng ${giaTri}` : `Ô giá trị của cột ${dk.cot}`}
                onDragOver={(e: DragEvent) => e.preventDefault()}
                onDrop={(e: DragEvent) => {
                  e.preventDefault();
                  void tha();
                }}
                onClick={() => {
                  if (dangChon) void tha();
                }}
              >
                {daTha ? <span className="v7-khe__giay">{giaTri}</span> : ''}
              </button>
            </li>
          </ol>
        </div>
        <div className={`v7-vung${kq ? ' co-ket-qua' : ''}`} aria-live="polite" aria-label="Kết quả">
          <DongPhieu ref={phieu} tong={tong} />
          {kq ? (
            <div className="v7-kq v7-kq--chon">
              <table>
                <caption className="visually-hidden">Kết quả lọc</caption>
                <thead>
                  <tr>
                    {kq.cot.map((c) => (
                      <th key={c} scope="col">
                        {c}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {kq.dong.map((h, r) => (
                    <tr
                      key={r}
                      className={`${sai.includes(r) ? 'is-sai' : ''}${rung === r ? ' is-rung' : ''}`}
                      style={{ ['--i' as string]: r }}
                      tabIndex={0}
                      role="button"
                      aria-label={`Chọn dòng ${h.map((v) => String(v ?? '')).join(', ')}`}
                      onClick={() => chonDong(r)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          chonDong(r);
                        }
                      }}
                    >
                      {h.map((v, k) => (
                        <td key={k}>{v === null ? '(trống)' : String(v)}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="v7-kq__nhac">👆 Còn {kq.dong.length} người trùng tên. Bấm vào dòng đúng người cần tìm.</p>
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
