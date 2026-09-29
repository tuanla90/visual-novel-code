/**
 * `[LỌC THỦ <mã> · n dòng · chọn <cột> = <giá trị>]` (Ngày hội CLB): chạy thật câu SQL trên bộ dữ liệu, hiện bảng,
 * người chơi bấm vào dòng có ô `cot = giaTri`. Chọn sai thì đứng lại (máy đếm lần), chọn đúng mới qua.
 */
import { useEffect, useState } from 'react';
import type { BoDuLieuMvp, NutMvp } from '../../content/mvp/types';
import { SqlCode } from '../../sql-challenge/ui/SqlCode';
import { chaySql, type KetQuaChay } from '../engine/sql-mvp';

export interface LocThuMvpProps {
  duLieu: BoDuLieuMvp | null;
  nut: Extract<NutMvp, { type: 'trial-filter' }>;
  lanThu: number;
  onChon: (giaTri: string) => void;
}

export function LocThuMvp({ duLieu, nut, lanThu, onChon }: LocThuMvpProps) {
  const [daChay, setDaChay] = useState<{ sql: string; kq: KetQuaChay } | null>(null);
  useEffect(() => {
    let song = true;
    if (!duLieu) return;
    chaySql(duLieu, nut.sql).then((r) => {
      if (song) setDaChay({ sql: nut.sql, kq: r });
    });
    return () => {
      song = false;
    };
  }, [duLieu, nut.sql]);
  const kq = daChay && daChay.sql === nut.sql ? daChay.kq : null;

  const iCot = kq?.ok ? kq.cot.findIndex((c) => c.toLowerCase() === nut.chon.cot.toLowerCase()) : -1;
  return (
    <div className="mvp-lop mvp-lop--locthu" role="dialog" aria-label="Lọc thử một lần">
      <h3 className="mvp-lop__tieude">Bàn làm việc — lọc thử</h3>
      <SqlCode sql={nut.sql} label="Câu SQL lọc thử" />
      {!duLieu ? <p className="game__error">Vụ này chưa có bộ dữ liệu (du-lieu.md).</p> : null}
      {kq === null && duLieu ? <p className="mvp-lop__cho">Đang chạy…</p> : null}
      {kq && !kq.ok ? <p className="game__error">Câu lọc thử lỗi: {kq.thongDiep}</p> : null}
      {kq?.ok ? (
        <>
          <p className="mvp-lop__huongdan">
            {lanThu > 0 ? 'Chưa phải dòng đó — nhìn kỹ cột ' : 'Kết quả có '}
            {lanThu > 0 ? <code>{nut.chon.cot}</code> : <strong>{kq.dong.length} dòng</strong>}
            {lanThu > 0 ? ' rồi chọn lại.' : `. Bấm vào dòng có ${nut.chon.cot} = ${nut.chon.giaTri}.`}
          </p>
          <div className="result-table-wrap mvp-locthu__bang">
            <table className="result-table">
              <caption className="visually-hidden">Kết quả lọc thử</caption>
              <thead>
                <tr>
                  {kq.cot.map((c) => (
                    <th key={c} scope="col" className="mono">{c}</th>
                  ))}
                  <th scope="col"><span className="visually-hidden">Chọn</span></th>
                </tr>
              </thead>
              <tbody>
                {kq.dong.map((d, i) => {
                  const giaTri = iCot >= 0 ? String(d[iCot] ?? '') : '';
                  return (
                    <tr key={i}>
                      {d.map((v, j) => (
                        <td key={j}>{v === null ? <span className="result-table__null">(trống)</span> : String(v)}</td>
                      ))}
                      <td>
                        <button type="button" className="btn btn--small mvp-locthu__chon" onClick={() => onChon(giaTri)} aria-label={`Chọn dòng ${giaTri}`}>
                          Chọn
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      ) : null}
    </div>
  );
}
