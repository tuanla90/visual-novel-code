/**
 * Lưu / Nạp bản MVP: 6 ô trong kho MVP (sessionStorage, khóa riêng `clb_mvp_*`, QĐ-004).
 *
 * Phong cách lấy từ màn Lưu/Nạp của prototype (gói giao-dien-mvp): DÙNG LẠI lớp CSS của `shared/vn/saveload-modal.css`
 * (sổ giấy ngà, nhãn tiêu đề vàng cam, thẻ ô kẹp ảnh, nút "Quay lại" góc dưới) nhưng là component riêng: `SaveLoadModal`
 * đọc/ghi ô lưu của `vn-store` (chụp `progress/evidence/challenges` của bản cũ) — không dùng được cho trạng thái MVP.
 * Ảnh trên ô = nền của cảnh lúc lưu; ô trống = nền cảnh hiện tại, đen trắng.
 */
import '../../shared/vn/saveload-modal.css';
import { useEffect, useRef, useState } from 'react';
import { ConfirmDialog } from '../../shared/ui/ConfirmDialog';
import type { OLuuMvp } from '../store/kho-mvp';
import { anhNen } from './anh-mvp';

export interface LuuNapMvpProps {
  mode: 'save' | 'load';
  oLuu: (OLuuMvp | null)[];
  coTienDo: boolean;
  /** Cảnh đang đứng — ảnh đen trắng cho ô trống. */
  canhHienTai?: string;
  onLuu: (o: number) => void;
  onNap: (o: number) => void;
  onDong: () => void;
}

function gioLuu(iso: string): string {
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? '' : d.toLocaleString('vi-VN', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit' });
}

export function LuuNapMvp({ mode, oLuu, coTienDo, canhHienTai, onLuu, onNap, onDong }: LuuNapMvpProps) {
  const dongRef = useRef<HTMLButtonElement>(null);
  const [ghiDe, setGhiDe] = useState<number | null>(null);
  const dangHoiGhiDe = ghiDe !== null;
  useEffect(() => {
    dongRef.current?.focus();
  }, []);
  useEffect(() => {
    if (dangHoiGhiDe) return; // Esc lúc đang hỏi ghi đè thuộc về hộp xác nhận.
    const onKey = (e: KeyboardEvent): void => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onDong();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onDong, dangHoiGhiDe]);

  const laLuu = mode === 'save';
  const tieuDe = laLuu ? 'Lưu tiến độ' : 'Nạp tiến độ';
  const anhTrong = canhHienTai ? anhNen(canhHienTai) : undefined;

  return (
    <>
      <div className="saveload-modal__backdrop mvp-luunap" role="presentation" onClick={onDong}>
        <button
          type="button"
          className="saveload-back-btn"
          onClick={(e) => {
            e.stopPropagation();
            onDong();
          }}
          aria-label="Quay lại trò chơi"
          title="Quay lại trò chơi (Esc)"
        >
          <span className="saveload-back-btn__arrow" aria-hidden="true">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
          </span>
          <span className="saveload-back-btn__text">Quay lại</span>
        </button>

        <div className="saveload-card" role="dialog" aria-modal="true" aria-labelledby="mvp-luu-tieude" onClick={(e) => e.stopPropagation()}>
          <div className="saveload-header">
            <div className="saveload-title-wrap">
              <div className="saveload-title-badge">
                <span className="saveload-title-badge__icon" aria-hidden="true">
                  {laLuu ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                      <polyline points="17 21 17 13 7 13 7 21" />
                      <polyline points="7 3 7 8 15 8" />
                    </svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
                    </svg>
                  )}
                </span>
                <h2 id="mvp-luu-tieude" className="saveload-title-badge__text">
                  {tieuDe}
                </h2>
              </div>
              <span className="saveload-title-sub">{laLuu ? '(Save Game)' : '(Load Game)'}</span>
            </div>
            <button ref={dongRef} type="button" className="saveload-close-btn" onClick={onDong} aria-label={`Đóng màn ${tieuDe.toLowerCase()}`} title="Đóng (Esc)">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          <ul className="saveload-grid mvp-luunap__luoi">
            {oLuu.map((o, i) => {
              const tat = laLuu ? !coTienDo : o === null;
              const anh = o ? anhNen(o.trangThai.canh) : anhTrong;
              const nhan = laLuu ? (o ? `Ghi đè ô ${i + 1}: ${o.nhan}` : `Lưu vào ô ${i + 1} (trống)`) : o ? `Nạp ô ${i + 1}: ${o.nhan}` : `Ô ${i + 1} trống`;
              return (
                <li key={i} className="mvp-luunap__muc">
                  <button
                    type="button"
                    className={`save-slot-card mvp-luunap__o ${o ? 'is-saved' : 'is-empty'}`}
                    disabled={tat}
                    aria-label={nhan}
                    title={nhan}
                    onClick={() => {
                      if (laLuu) {
                        if (o) setGhiDe(i);
                        else onLuu(i);
                      } else onNap(i);
                    }}
                  >
                    <span className="save-slot-card__header">
                      <span className="save-slot-card__badge">Ô số {i + 1}</span>
                      <span className={`save-slot-card__status${o ? ' has-data' : ''}`}>{o ? gioLuu(o.luuLuc) : 'Trống'}</span>
                    </span>
                    <span className="save-slot-card__thumb-box">
                      {anh ? (
                        <img className={o ? 'save-slot-card__thumb-img--saved' : 'save-slot-card__thumb-img--placeholder'} src={anh} alt="" draggable={false} />
                      ) : null}
                      {o ? (
                        <span className="save-slot-card__thumb-overlay">
                          <span>{o.nhan}</span>
                        </span>
                      ) : null}
                    </span>
                    <span className="save-slot-card__footer">
                      <span className="save-slot-card__clock-icon" aria-hidden="true">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10" />
                          <polyline points="12 6 12 12 16 14" />
                        </svg>
                      </span>
                      <span className="save-slot-card__footer-text">
                        {o ? (o.nhiemVu ?? o.nhan) : laLuu ? (coTienDo ? 'Bấm để lưu vào đây' : 'Ván đã kết thúc') : 'Chưa có dữ liệu'}
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      {/* Ngoài `.saveload-card` (thẻ có transform → hộp fixed bên trong sẽ bị nhốt trong thẻ). */}
      <div className="mvp-luunap__xacnhan">
        <ConfirmDialog
          open={dangHoiGhiDe}
          title={`Ghi đè ô ${(ghiDe ?? 0) + 1}?`}
          message="Bản lưu cũ trong ô này sẽ bị thay bằng tiến độ hiện tại."
          confirmLabel="Ghi đè"
          onConfirm={() => {
            if (ghiDe !== null) onLuu(ghiDe);
            setGhiDe(null);
          }}
          onCancel={() => setGhiDe(null)}
        />
      </div>
    </>
  );
}
