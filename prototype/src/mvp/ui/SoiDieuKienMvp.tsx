/**
 * "Xem từng điều kiện" (kế hoạch màn core v0.3 mục 2): bảng các dòng qua ít nhất một điều kiện, mỗi điều kiện một cột
 * ✓/✗ và cột "giữ lại" theo đúng cách nối AND/OR của câu vừa chạy. Người chơi TỰ bấm để xem; không phán đúng sai
 * (QĐ-071) — bảng chỉ cho thấy máy đã giữ / loại dòng nào, vì sao.
 */
import { useEffect, useState } from 'react';
import type { BoDuLieuMvp } from '../../content/mvp/types';
import { chaySql, type KetQuaChay } from '../engine/sql-mvp';
import { cauSoiDieuKien, type WhereTach } from '../engine/trinh-dung';

export function SoiDieuKienMvp({ duLieu, where, onDong }: { duLieu: BoDuLieuMvp; where: WhereTach; onDong: () => void }) {
  const [kq, setKq] = useState<KetQuaChay | null>(null);
  useEffect(() => {
    let song = true;
    chaySql(duLieu, cauSoiDieuKien(where)).then((r) => {
      if (song) setKq(r);
    });
    return () => {
      song = false;
    };
  }, [duLieu, where]);

  const soDk = where.dieuKien.length;
  const dau = (v: unknown) => (v === 1 ? '✓' : '✗');
  return (
    <section className="mvp-soi" aria-label="Xem từng điều kiện">
      <p className="mvp-soi__dau">
        <strong>Từng điều kiện</strong> — các dòng qua ít nhất một điều kiện; dòng mờ là dòng bị loại theo cách nối{' '}
        {where.noi.length > 0 ? where.noi.map((n, i) => <code key={i}>{n}</code>) : null}.
        <button type="button" className="btn btn--small" onClick={onDong}>
          Đóng
        </button>
      </p>
      {kq === null ? <p className="mvp-lop__cho">Đang soi…</p> : null}
      {kq && !kq.ok ? <p className="game__error">Không soi được câu này: {kq.thongDiep}</p> : null}
      {kq?.ok ? (
        <div className="mvp-soi__bang">
          <table>
            <thead>
              <tr>
                {kq.cot.slice(0, kq.cot.length - soDk - 1).map((c) => (
                  <th key={c}>{c}</th>
                ))}
                {where.dieuKien.map((d, i) => (
                  <th key={`dk${i}`} className="mvp-soi__dk">
                    <code>{d}</code>
                  </th>
                ))}
                <th>Giữ lại</th>
              </tr>
            </thead>
            <tbody>
              {kq.dong.map((dong, r) => {
                const giu = dong[dong.length - 1] === 1;
                return (
                  <tr key={r} className={giu ? 'is-giu' : 'is-loai'}>
                    {dong.slice(0, dong.length - soDk - 1).map((v, k) => (
                      <td key={k}>{v === null ? 'NULL' : String(v)}</td>
                    ))}
                    {dong.slice(dong.length - soDk - 1, dong.length - 1).map((v, k) => (
                      <td key={`d${k}`} className={v === 1 ? 'is-co' : 'is-khong'} aria-label={v === 1 ? 'thỏa' : 'không thỏa'}>
                        {dau(v)}
                      </td>
                    ))}
                    <td className={giu ? 'is-co' : 'is-khong'} aria-label={giu ? 'giữ lại' : 'bị loại'}>
                      {dau(dong[dong.length - 1])}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : null}
    </section>
  );
}
