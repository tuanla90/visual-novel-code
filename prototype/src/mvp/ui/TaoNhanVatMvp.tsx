/**
 * MÀN TẠO NHÂN VẬT MVP (gói tao-nhan-vat-mvp, QĐ-084): hai câu của Tùng trong cảnh mở đầu.
 *   - `ten`:   ô nhập tên (gợi ý "Không cần dùng tên thật") + nút xúc xắc (điền một tên ngẫu nhiên, Tùng nói lời
 *              `xúc xắc:`) + nút "Xong" / phím Enter. Tên sai → lời báo, không đi tiếp.
 *   - `nganh`: các ngành là nút, như lựa chọn rẽ nhánh.
 * Câu hỏi hiện như lời thoại của Tùng (hộp thoại kính mờ ở đáy, chân dung do sân khấu vẽ). Không có câu hỏi giới tính
 * (người chơi là nam). Màn này KHÔNG gắn phím tắt VN (Space/Enter chuyển câu, Auto/Skip): hộp thoại VN không được vẽ ở đây.
 * Tên chỉ đi vào `onDatTen` → trạng thái máy; không ghi telemetry (QĐ-077).
 */
import { useEffect, useId, useRef, useState, type FormEvent } from 'react';
import type { KichBanMvp, LoiMvp, NutMvp } from '../../content/mvp/types';
import { CodeText } from '../../shared/ui/CodeText';
import { PRESS_GUARD_MS, usePressGuard } from '../../shared/ui/use-press-guard';
import { kiemTen, tenNgauNhien, tenNguoiNoi, TEN_TOI_DA } from '../engine/may';
import { anhTheoTen } from './anh-mvp';

export interface TaoNhanVatMvpProps {
  kb: KichBanMvp;
  nut: Extract<NutMvp, { type: 'create-character' }>;
  dienTen: (text: string) => string;
  onDatTen: (ten: string) => void;
  onChonNganh: (nganh: string) => void;
  /** Hàm ngẫu nhiên của nút xúc xắc (mặc định `Math.random`; test tiêm hàm giả). */
  ngauNhien?: () => number;
}

/** Xúc xắc 5 chấm, vẽ bằng `currentColor` (không dùng emoji). */
export function IconXucXac() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="4" />
      <circle cx="8" cy="8" r="1.4" fill="currentColor" stroke="none" />
      <circle cx="16" cy="8" r="1.4" fill="currentColor" stroke="none" />
      <circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none" />
      <circle cx="8" cy="16" r="1.4" fill="currentColor" stroke="none" />
      <circle cx="16" cy="16" r="1.4" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** Hộp thoại kính mờ ở đáy sân khấu: lời của người hỏi (Tùng). */
function LoiNguoiHoi({ kb, loi, dienTen, idLoi, ghiChu }: { kb: KichBanMvp; loi: LoiMvp; dienTen: (t: string) => string; idLoi: string; ghiChu: string }) {
  return (
    <div className="dialog-container mc__dialog-container">
      <div className="dialog dialog--glass" data-speaker={loi.speaker}>
        <div className="dialog__speaker">
          <span>{tenNguoiNoi(kb, loi.speaker)}</span>
        </div>
        <p id={idLoi} className="dialog__text mc__prompt" aria-live="polite">
          <CodeText text={dienTen(loi.text)} />
        </p>
        <div className="mc__status-bar">
          <span className="mc__note">{ghiChu}</span>
        </div>
      </div>
    </div>
  );
}

function CauTen({ kb, nut, dienTen, onDatTen, ngauNhien }: Omit<TaoNhanVatMvpProps, 'onChonNganh'>) {
  const id = useId();
  const idO = `${id}-ten`;
  const idGoiY = `${id}-goiy`;
  const idLoi = `${id}-loi`;
  const idHoi = `${id}-hoi`;
  const [giaTri, setGiaTri] = useState('');
  const [loi, setLoi] = useState<string | null>(null);
  const [daXucXac, setDaXucXac] = useState(false);
  const oRef = useRef<HTMLInputElement>(null);
  const anhNguoiChoi = anhTheoTen('char-player-nam-anchor');

  /** Người chơi quen bấm dồn Space/Enter để qua lời: phím rơi vào ô ngay lúc màn hiện. Enter trong khoảng này mà ô
   *  còn trống thì bỏ qua lặng lẽ (không báo lỗi "chưa gõ tên"); khoảng trắng đầu ô bị bỏ ngay khi gõ. */
  const vuaHien = useRef(true);

  // Máy tính (chuột): con trỏ vào ô ngay. Điện thoại: chờ người chơi chạm, để bàn phím ảo không bật lên che lời Tùng.
  useEffect(() => {
    const chuotMin = typeof window !== 'undefined' && typeof window.matchMedia === 'function' && window.matchMedia('(pointer: fine)').matches;
    if (chuotMin) oRef.current?.focus();
    const hen = window.setTimeout(() => {
      vuaHien.current = false;
    }, PRESS_GUARD_MS);
    return () => window.clearTimeout(hen);
  }, []);

  const xong = (e: FormEvent) => {
    e.preventDefault();
    if (vuaHien.current && giaTri.trim() === '') return;
    const kq = kiemTen(giaTri);
    if (!kq.ok) {
      setLoi(kq.loi);
      oRef.current?.focus();
      return;
    }
    onDatTen(kq.ten);
  };

  const xucXac = () => {
    const ten = tenNgauNhien(kb, ngauNhien, giaTri.trim());
    setGiaTri(ten);
    setLoi(null);
    if (nut.xucXac) setDaXucXac(true);
  };

  const loiTung: LoiMvp = daXucXac && nut.xucXac ? { ...nut.asker, text: nut.xucXac } : nut.asker;

  return (
    <div className="mc mvp-tnv mvp-tnv--ten" role="group" aria-labelledby={idHoi}>
      <div className="mc__overlay mvp-tnv__lop">
        <form className="mvp-tnv__the" onSubmit={xong} noValidate>
          <div className="mvp-tnv__dau">
            {anhNguoiChoi ? <img className="mvp-tnv__anh" src={anhNguoiChoi} alt="" draggable={false} /> : null}
            <label className="mvp-tnv__nhan" htmlFor={idO}>
              Tên nhân vật của bạn
            </label>
          </div>
          <p id={idGoiY} className="mvp-tnv__goiy">
            Không cần dùng tên thật. Tối đa {TEN_TOI_DA} ký tự, chỉ chữ cái.
          </p>
          <div className="mvp-tnv__hang">
            <input
              ref={oRef}
              id={idO}
              className="mvp-tnv__o"
              type="text"
              value={giaTri}
              onChange={(e) => {
                setGiaTri(e.target.value.replace(/^\s+/, ''));
                if (loi) setLoi(null);
              }}
              maxLength={TEN_TOI_DA * 2}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="words"
              spellCheck={false}
              enterKeyHint="done"
              placeholder="Gõ tên…"
              aria-describedby={loi ? `${idGoiY} ${idLoi}` : idGoiY}
              aria-invalid={loi ? true : undefined}
            />
            <button type="button" className="mvp-tnv__xucxac" onClick={xucXac} aria-label="Bấm xúc xắc: đặt tên ngẫu nhiên" title="Bấm xúc xắc: đặt tên ngẫu nhiên">
              <IconXucXac />
            </button>
          </div>
          {loi ? (
            <p id={idLoi} className="mvp-tnv__loi" role="alert">
              {loi}
            </p>
          ) : null}
          <button type="submit" className="btn btn--primary mvp-tnv__xong">
            Xong
          </button>
        </form>
      </div>
      <LoiNguoiHoi kb={kb} loi={loiTung} dienTen={dienTen} idLoi={idHoi} ghiChu="Gõ tên rồi bấm Xong (hoặc Enter)." />
    </div>
  );
}

function CauNganh({ kb, nut, dienTen, onChonNganh }: Omit<TaoNhanVatMvpProps, 'onDatTen' | 'ngauNhien'>) {
  const idHoi = `${useId()}-hoi`;
  const guard = usePressGuard(nut);
  return (
    <div className="mc mvp-tnv" role="group" aria-labelledby={idHoi}>
      <div className="mc__overlay" aria-label="Các ngành">
        <ul className="mc__choices">
          {nut.luaChon.map((nganh) => (
            <li key={nganh} className="mc__choice-item">
              <button
                type="button"
                className="mc__choice"
                onKeyDown={guard.holdKey}
                onClick={(e) => {
                  if (guard.click(e)) onChonNganh(nganh);
                }}
              >
                {nganh}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <LoiNguoiHoi kb={kb} loi={nut.asker} dienTen={dienTen} idLoi={idHoi} ghiChu="Chọn một ngành." />
    </div>
  );
}

export function TaoNhanVatMvp(props: TaoNhanVatMvpProps) {
  const { nut } = props;
  return nut.truong === 'ten' ? <CauTen {...props} /> : <CauNganh {...props} />;
}
