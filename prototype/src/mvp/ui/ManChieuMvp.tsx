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
  onDaXemTruyVan?: (sql: string) => void;
}

/** Câu một bảng, một điều kiện bằng: `SELECT … FROM b WHERE c = 'v'` — đủ để diễn từng bước làm mẫu. */
function tachCauMau(sql: string | null): { tu: string; bang: string; cot: string; giaTri: string } | null {
  const m = /^(SELECT\s+.+?\s+FROM\s+([a-z_][a-z0-9_]*))\s+WHERE\s+([a-z_][a-z0-9_]*)\s*=\s*'([^']*)'\s*;?\s*$/is.exec(sql ?? '');
  return m ? { tu: m[1] ?? '', bang: m[2] ?? '', cot: m[3] ?? '', giaTri: m[4] ?? '' } : null;
}

export function ManChieuMvp({ kb, duLieu, nut, onTiep, onDaXemTruyVan }: ManChieuMvpProps) {
  const sql = sqlCuaManChieu(kb, nut);
  const mau = nut.lamMau && nut.run ? tachCauMau(sql) : null;
  const [buoc, setBuoc] = useState(1);
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

  if (mau && sql) {
    // Làm mẫu (user 10/10): Duy làm từng bước, người chơi bấm để sang bước kế; không tự trôi.
    const cau = [
      `Duy mở bảng ${mau.bang}: cả trường có bao nhiêu người thì bảng có bấy nhiêu dòng. (tạm)`,
      `Muốn tìm đúng một người, Duy thêm điều kiện: cột ${mau.cot} bằng '${mau.giaTri}'. (tạm)`,
      'Rồi Duy bấm CHẠY. (tạm)',
      'Mỗi mã chỉ của một người, nên ra đúng một dòng. Lát nữa tới lượt em tự tra mã của mình. (tạm)',
    ] as const;
    const hien = buoc === 1 ? mau.tu : sql;
    const cuoi = buoc >= cau.length;
    return (
      <div className="mvp-lop mvp-lop--chieu mvp-chieu-mau" role="dialog" aria-label="Màn chiếu, Duy làm mẫu">
        <p className="mvp-chieu-mau__dau">
          Duy làm mẫu
          <span className="mvp-chieu-mau__buoc">
            Bước {buoc}/{cau.length}
          </span>
        </p>
        <ol className="mvp-chieu-mau__cac-buoc" aria-hidden="true">
          {cau.map((_c, i) => (
            <li key={i} className={i + 1 < buoc ? 'is-xong' : i + 1 === buoc ? 'is-dang' : undefined} />
          ))}
        </ol>
        <div className="mvp-chieu-mau__khung">
          <SqlCode sql={hien} label="Câu SQL trên màn chiếu" />
          {buoc === 3 ? <p className="mvp-chieu-mau__chay">▶ CHẠY</p> : null}
          {buoc >= 4 && kq?.ok ? (
            <div className="mvp-chieu__bang">
              <ResultTable columns={kq.cot} rows={kq.dong.slice(0, 5)} caption="Kết quả trên màn chiếu" />
            </div>
          ) : null}
          {buoc >= 4 && kq && !kq.ok ? <p className="game__error">Không chạy được: {kq.thongDiep}</p> : null}
        </div>
        <div className="mvp-chieu-mau__chan">
          <p className="mvp-chieu-mau__cau" aria-live="polite">
            {cau[buoc - 1]}
          </p>
          <button
            type="button"
            className="btn btn--primary"
            onClick={() => {
              if (!cuoi) {
                setBuoc((b) => b + 1);
                return;
              }
              if (kq?.ok) onDaXemTruyVan?.(sql);
              onTiep();
            }}
            autoFocus
          >
            {cuoi ? 'Tiếp tục' : 'Bước kế'}
          </button>
        </div>
      </div>
    );
  }

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
            <ResultTable columns={kq.cot} rows={kq.dong.slice(0, 40)} caption="Kết quả trên màn chiếu" />
            {kq.dong.length > 40 ? <p className="mvp-chieu__con">… còn {(kq.dong.length - 40).toLocaleString('vi-VN')} dòng nữa</p> : null}
          </div>
        </>
      ) : null}
      {nut.run && kq && !kq.ok ? <p className="game__error">Không chạy được: {kq.thongDiep}</p> : null}
      <div className="mvp-lop__nut">
        <button type="button" className="btn btn--primary" onClick={() => { if (kq?.ok && sql) onDaXemTruyVan?.(sql); onTiep(); }} autoFocus>
          Tiếp tục
        </button>
      </div>
    </div>
  );
}
