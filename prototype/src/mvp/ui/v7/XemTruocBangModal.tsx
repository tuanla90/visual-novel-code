import { useCallback, useEffect, useMemo, useState } from 'react';
import type { BoDuLieuMvp } from '../../../content/mvp/types';
import { chaySql, type GiaTriSql } from '../../engine/sql-mvp';
import { soundEngine } from '../../../shared/audio/sound-engine';

export interface XemTruocBangModalProps {
  duLieu: BoDuLieuMvp;
  tenBangGoc: string;
  tenBangNoi?: string;
  khoaNoi?: string;
  onDong: () => void;
  onDaXemTruyVan?: (sql: string) => void;
  sqlPhieuNguon?: string;
  nhanPhieuNguon?: string;
}

export function XemTruocBangModal({
  duLieu,
  tenBangGoc,
  tenBangNoi,
  khoaNoi,
  onDong,
  onDaXemTruyVan,
  sqlPhieuNguon,
  nhanPhieuNguon,
}: XemTruocBangModalProps) {
  const [resultSql, setResultSql] = useState('');
  const [dangTai, setDangTai] = useState(true);
  const [cot, setCot] = useState<string[]>([]);
  const [dong, setDong] = useState<GiaTriSql[][]>([]);
  const [loi, setLoi] = useState<string | null>(null);

  const bDuLieuGoc = useMemo(() => duLieu.bang.find((b) => b.ten === tenBangGoc), [duLieu, tenBangGoc]);
  const bDuLieuNoi = useMemo(() => (tenBangNoi ? duLieu.bang.find((b) => b.ten === tenBangNoi) : undefined), [duLieu, tenBangNoi]);
  const cotNoi = useMemo(() => bDuLieuNoi?.cot.map((c) => c.ten) ?? [], [bDuLieuNoi]);

  const sqlXemTruoc = useMemo(() => {
    if (sqlPhieuNguon) {
      const cte = `WITH ${tenBangGoc} AS (${sqlPhieuNguon.trim().replace(/;\s*$/, '')})`;
      if (tenBangNoi && khoaNoi) {
        return `${cte} SELECT * FROM ${tenBangGoc} JOIN ${tenBangNoi} ON ${tenBangGoc}.${khoaNoi} = ${tenBangNoi}.${khoaNoi} LIMIT 6;`;
      }
      return `${cte} SELECT * FROM ${tenBangGoc} LIMIT 6;`;
    }
    if (tenBangNoi && khoaNoi) {
      return `SELECT * FROM ${tenBangGoc} JOIN ${tenBangNoi} ON ${tenBangGoc}.${khoaNoi} = ${tenBangNoi}.${khoaNoi} LIMIT 6;`;
    }
    return `SELECT * FROM ${tenBangGoc} LIMIT 6;`;
  }, [tenBangGoc, tenBangNoi, khoaNoi, sqlPhieuNguon]);

  useEffect(() => {
    let active = true;
    setDangTai(true);
    setLoi(null);

    chaySql(duLieu, sqlXemTruoc)
      .then((res) => {
        if (!active) return;
        if (res.ok) {
          setResultSql(sqlXemTruoc);
          setCot(res.cot);
          setDong(res.dong);
        } else {
          setLoi(res.thongDiep);
        }
      })
      .catch((err) => {
        if (!active) return;
        setLoi((err as Error).message);
      })
      .finally(() => {
        if (active) setDangTai(false);
      });

    return () => {
      active = false;
    };
  }, [duLieu, sqlXemTruoc]);

  const dongModal = useCallback(() => {
    if (resultSql === sqlXemTruoc) onDaXemTruyVan?.(resultSql);
    onDong();
  }, [resultSql, sqlXemTruoc, onDaXemTruyVan, onDong]);

  // Phím Esc để đóng
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        soundEngine.playSfx('click');
        dongModal();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [dongModal]);

  const coNoi = !!(tenBangNoi && khoaNoi);
  const cotMoi = useMemo(() => {
    if (!coNoi) return [];
    return cot.filter((c) => cotNoi.includes(c) && c !== khoaNoi);
  }, [coNoi, cot, cotNoi, khoaNoi]);

  return (
    <div
      className="v7-preview-backdrop"
      role="dialog"
      aria-modal="true"
      aria-label="Khảo sát dữ liệu"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          soundEngine.playSfx('click');
          dongModal();
        }
      }}
    >
      <div className="v7-preview-modal">
        <div className="v7-preview-modal__header">
          <div className="v7-preview-modal__title-group">
            <h3 className="v7-preview-modal__title">
              {nhanPhieuNguon ? (
                <>
                  Khảo sát phiếu nguồn: <strong>{nhanPhieuNguon}</strong>
                  <small style={{ display: 'block', fontSize: '0.78rem', fontWeight: 500, color: '#94a3b8', marginTop: 2 }}>
                    Tên bảng tạm trong câu truy vấn: <code>{tenBangGoc}</code>
                  </small>
                </>
              ) : coNoi ? (
                <>
                  Khảo sát kết quả JOIN: <code>{tenBangGoc}</code> + <code>{tenBangNoi}</code>
                </>
              ) : (
                <>
                  Khảo sát bảng dữ liệu: <code>{tenBangGoc}</code>
                </>
              )}
            </h3>
            {nhanPhieuNguon ? (
              <span className="v7-preview-modal__badge v7-preview-modal__badge--single">
                {dong.length} dòng mẫu từ phiếu
              </span>
            ) : coNoi ? (
              <span className="v7-preview-modal__badge">
                Đã bổ sung {cotMoi.length} cột mới từ {tenBangNoi}
              </span>
            ) : (
              <span className="v7-preview-modal__badge v7-preview-modal__badge--single">
                {bDuLieuGoc?.dong.length ?? 0} dòng gốc
              </span>
            )}
          </div>
          <button
            type="button"
            className="v7-preview-modal__close-btn"
            onClick={() => {
              soundEngine.playSfx('click');
              dongModal();
            }}
            aria-label="Đóng bảng xem trước (Esc)"
          >
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
            <span>Đóng</span>
          </button>
        </div>

        <div className="v7-preview-modal__sql-code">
          <code>{sqlXemTruoc}</code>
        </div>

        <div className="v7-preview-modal__body">
          {dangTai ? (
            <div className="v7-preview-modal__loading">Đang nạp dữ liệu mẫu…</div>
          ) : loi ? (
            <div className="v7-preview-modal__error">Lỗi khảo sát: {loi}</div>
          ) : (
            <div className="v7-preview-table-wrapper">
              <table className="v7-preview-table">
                <thead>
                  <tr>
                    {cot.map((c, i) => {
                      const laCotMoi = coNoi && cotMoi.includes(c);
                      return (
                        <th
                          key={`${c}-${i}`}
                          className={laCotMoi ? 'v7-preview-th is-cot-moi' : 'v7-preview-th is-cot-goc'}
                        >
                          <span className="v7-preview-th__name">{c}</span>
                          {laCotMoi && <span className="v7-preview-th__tag">mới</span>}
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody>
                  {dong.map((row, rIdx) => (
                    <tr key={rIdx}>
                      {row.map((cell, cIdx) => {
                        const colName = cot[cIdx];
                        const laCotMoi = coNoi && colName && cotMoi.includes(colName);
                        return (
                          <td
                            key={cIdx}
                            className={laCotMoi ? 'v7-preview-td is-cot-moi' : 'v7-preview-td is-cot-goc'}
                          >
                            {cell === null ? (
                              <span className="v7-preview-null">NULL</span>
                            ) : (
                              String(cell)
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="v7-preview-modal__footer">
          <div className="v7-preview-modal__hint">
            {coNoi ? (
              <>
                <span className="v7-preview-modal__hint-icon">💡</span>
                <span>
                  Các cột màu xanh lá là dữ liệu mới được nối từ <strong>{tenBangNoi}</strong> theo khóa <code>{khoaNoi}</code>.
                </span>
              </>
            ) : (
              <span>Hiển thị 6 dòng mẫu đầu tiên của bảng để bạn nắm cấu trúc cột.</span>
            )}
          </div>
          <button
            type="button"
            className="v7-preview-modal__action-btn"
            onClick={() => {
              soundEngine.playSfx('select');
              dongModal();
            }}
          >
            ✓ Đã hiểu & Quay lại dựng câu
          </button>
        </div>
      </div>
    </div>
  );
}
