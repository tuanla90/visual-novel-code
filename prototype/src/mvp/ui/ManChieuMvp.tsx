/**
 * `[MÀN CHIẾU <mã> · chạy · n dòng]` ở buổi họp: hiện câu SQL (truy vấn nạp sẵn của thẻ) và chạy thật trên bộ dữ
 * liệu → bảng kết quả + số dòng. Bấm "Tiếp" để máy đi tiếp. Nguồn `evidence` (vật chứng) lấy SQL chuẩn của thẻ
 * có vật chứng đó.
 */
import { useEffect, useState } from 'react';
import type { BoDuLieuMvp, KichBanMvp, NutMvp } from '../../content/mvp/types';
import { ResultTable } from '../../sql-challenge/ui/ResultTable';
import { SqlCode } from '../../sql-challenge/ui/SqlCode';
import { sqlCuaManChieu } from '../engine/may';
import { chaySql, type KetQuaChay } from '../engine/sql-mvp';

export interface ManChieuMvpProps {
  kb: KichBanMvp;
  duLieu: BoDuLieuMvp | null;
  nut: Extract<NutMvp, { type: 'projector' }>;
  onTiep: () => void;
}

export function ManChieuMvp({ kb, duLieu, nut, onTiep }: ManChieuMvpProps) {
  const sql = sqlCuaManChieu(kb, nut);
  // Kết quả gắn với câu SQL đã chạy: đổi câu → kết quả cũ không hiện (không cần setState đầu effect).
  const [daChay, setDaChay] = useState<{ sql: string; kq: KetQuaChay } | null>(null);
  useEffect(() => {
    let song = true;
    if (!duLieu || !sql || !nut.run) return;
    chaySql(duLieu, sql).then((r) => {
      if (song) setDaChay({ sql, kq: r });
    });
    return () => {
      song = false;
    };
  }, [duLieu, sql, nut.run]);
  const kq = daChay && daChay.sql === sql ? daChay.kq : null;

  return (
    <div className="mvp-lop mvp-lop--chieu" role="dialog" aria-label="Màn chiếu">
      <h3 className="mvp-lop__tieude">Màn chiếu</h3>
      {sql ? <SqlCode sql={sql} label="Câu SQL trên màn chiếu" /> : <p className="game__error">Màn chiếu không có câu SQL.</p>}
      {nut.run && kq?.ok ? (
        <>
          <p className="mvp-lop__huongdan">
            Chạy ra <strong>{kq.dong.length} dòng</strong>
            {nut.expectedRowCount !== undefined && nut.expectedRowCount !== kq.dong.length ? ` (kịch bản khai ${nut.expectedRowCount})` : ''}.
          </p>
          <div className="mvp-chieu__bang">
            <ResultTable columns={kq.cot} rows={kq.dong} caption="Kết quả trên màn chiếu" />
          </div>
        </>
      ) : null}
      {nut.run && kq && !kq.ok ? <p className="game__error">Không chạy được: {kq.thongDiep}</p> : null}
      <div className="mvp-lop__nut">
        <button type="button" className="btn btn--primary" onClick={onTiep} autoFocus>
          Tiếp tục
        </button>
      </div>
    </div>
  );
}
