/**
 * Lưu / Nạp bản MVP: 6 ô trong kho MVP (sessionStorage, khóa riêng). Không dùng SaveLoadModal của prototype vì
 * ô lưu của nó chụp `progress/evidence/challenges` của bản cũ.
 */
import { useEffect, useRef, useState } from 'react';
import { ConfirmDialog } from '../../shared/ui/ConfirmDialog';
import type { OLuuMvp } from '../store/kho-mvp';

export interface LuuNapMvpProps {
  mode: 'save' | 'load';
  oLuu: (OLuuMvp | null)[];
  coTienDo: boolean;
  onLuu: (o: number) => void;
  onNap: (o: number) => void;
  onDong: () => void;
}

function gioLuu(iso: string): string {
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? '' : d.toLocaleString('vi-VN', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit' });
}

export function LuuNapMvp({ mode, oLuu, coTienDo, onLuu, onNap, onDong }: LuuNapMvpProps) {
  const dongRef = useRef<HTMLButtonElement>(null);
  const [ghiDe, setGhiDe] = useState<number | null>(null);
  useEffect(() => {
    dongRef.current?.focus();
    const onKey = (e: KeyboardEvent): void => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onDong();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onDong]);

  return (
    <div className="modal-backdrop" role="presentation" onClick={onDong}>
      <div className="modal mvp-modal mvp-modal--rong" role="dialog" aria-modal="true" aria-labelledby="mvp-luu-tieude" onClick={(e) => e.stopPropagation()}>
        <h2 id="mvp-luu-tieude" className="modal__title">{mode === 'save' ? 'Lưu tiến độ' : 'Nạp tiến độ'}</h2>
        <ul className="mvp-oluu">
          {oLuu.map((o, i) => {
            const trong = o === null;
            const tat = mode === 'save' ? !coTienDo : trong;
            return (
              <li key={i}>
                <button
                  type="button"
                  className={`mvp-oluu__o${trong ? ' is-trong' : ''}`}
                  disabled={tat}
                  onClick={() => {
                    if (mode === 'save') {
                      if (o) setGhiDe(i);
                      else onLuu(i);
                    } else onNap(i);
                  }}
                  title={mode === 'save' ? (o ? 'Ghi đè ô này' : 'Lưu vào ô trống') : o ? 'Nạp ô này' : 'Ô trống'}
                >
                  <span className="mvp-oluu__so">Ô {i + 1}</span>
                  {o ? (
                    <>
                      <span className="mvp-oluu__nhan">{o.nhan}</span>
                      {o.nhiemVu ? <span className="mvp-oluu__nv">{o.nhiemVu}</span> : null}
                      <span className="mvp-oluu__gio">{gioLuu(o.luuLuc)}</span>
                    </>
                  ) : (
                    <span className="mvp-oluu__nhan">Trống</span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
        <div className="modal__actions">
          <button ref={dongRef} type="button" className="btn" onClick={onDong}>
            Đóng
          </button>
        </div>
        <ConfirmDialog
          open={ghiDe !== null}
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
    </div>
  );
}
