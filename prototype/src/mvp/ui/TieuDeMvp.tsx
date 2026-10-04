/**
 * MÀN MỞ MÀN CỦA BẢN MVP: ảnh bìa dàn nhân vật chính + tên game + menu kiểu game (Chơi mới / Chơi tiếp / Nạp / Cài đặt).
 * Không có chữ chương / vụ ở màn này. "Lưu" không nằm ở đây (chưa có ván để lưu) — lưu ở thanh trên cùng lúc chơi.
 * Chơi mới khi đang có ván → hỏi xác nhận trước khi xóa. Phím mũi tên / Tab đổi nút, Enter chọn; rê chuột và bấm có tiếng.
 */
import './tieu-de-mvp.css';
import './RotateForLandscape.css';
import { useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from 'react';
import { AudioSettingsModal } from '../../shared/audio/AudioSettingsModal';
import { soundEngine } from '../../shared/audio/sound-engine';
import { ConfirmDialog } from '../../shared/ui/ConfirmDialog';
import { taoTrangThai } from '../engine/may';
import { KICH_BAN, nhanTienDo, useKhoMvp } from '../store/kho-mvp';
import { anhTheoTen } from './anh-mvp';
import { LuuNapMvp } from './LuuNapMvp';
import { taiTruocTheoVan } from './tai-truoc-mvp';

export interface TieuDeMvpProps {
  /** Vào màn chơi. `moi` = ván mới (kho đã xóa), không thì chơi tiếp trạng thái đang có. */
  onVao: (moi: boolean) => void;
}

const BIEU_TUONG: Record<string, ReactNode> = {
  moi: <path d="M5 3l14 9-14 9V3z" />,
  tiep: (
    <>
      <path d="M4 12a8 8 0 1 0 3-6.2" />
      <path d="M4 4v4h4" />
      <path d="M12 8v4l3 2" />
    </>
  ),
  nap: <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7z" />,
  cai: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M19.1 4.9L17 7M7 17l-2.1 2.1" />
    </>
  ),
};

function Nut({ ma, chinh, nhan, phu, disabled, title, onClick, autoFocus }: { ma: string; chinh?: boolean; nhan: string; phu?: string; disabled?: boolean; title?: string; onClick: () => void; autoFocus?: boolean }) {
  return (
    <button
      type="button"
      className={`tdm__nut${chinh ? ' tdm__nut--chinh' : ''}`}
      disabled={disabled}
      title={title}
      autoFocus={autoFocus}
      onMouseEnter={() => !disabled && soundEngine.playSfx('select')}
      onFocus={() => !disabled && soundEngine.playSfx('select')}
      onClick={() => {
        soundEngine.playSfx('click');
        onClick();
      }}
    >
      <span className="tdm__nut-nen" aria-hidden="true" />
      <svg className="tdm__nut-bt" viewBox="0 0 24 24" width="22" height="22" fill={ma === 'moi' ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        {BIEU_TUONG[ma]}
      </svg>
      <span className="tdm__nut-chu">
        {nhan}
        {phu ? <small>{phu}</small> : null}
      </span>
    </button>
  );
}

export function TieuDeMvp({ onVao }: TieuDeMvpProps) {
  const s = useKhoMvp((k) => k.trangThai);
  const oLuu = useKhoMvp((k) => k.oLuu);
  const napTuO = useKhoMvp((k) => k.napTuO);
  const [nap, setNap] = useState(false);
  const [caiDat, setCaiDat] = useState(false);
  const [hoiChoiLai, setHoiChoiLai] = useState(false);
  const menu = useRef<HTMLElement>(null);
  const coVan = s !== null;
  const coONap = oLuu.some((o) => o !== null);
  const bia = anhTheoTen('cg-bia');
  // Cắt tên: "CLB" là nhãn nhỏ phía trên, phần còn lại là chữ lớn.
  const [nhanTren, ...conLai] = KICH_BAN.tenGame.split(/\s+/);
  const tenLon = conLai.join(' ') || KICH_BAN.tenGame;

  // Trong lúc người chơi đọc màn mở màn: tải sẵn nền / nhân vật của đoạn đầu (hoặc đoạn đang chơi dở).
  useEffect(() => {
    taiTruocTheoVan(KICH_BAN, s ?? taoTrangThai(KICH_BAN));
  }, [s]);

  const diChuyen = (e: KeyboardEvent<HTMLElement>): void => {
    const keys = ['ArrowRight', 'ArrowDown', 'ArrowLeft', 'ArrowUp'];
    if (!keys.includes(e.key) || !menu.current) return;
    e.preventDefault();
    const nut = [...menu.current.querySelectorAll<HTMLButtonElement>('button:not(:disabled)')];
    const i = nut.indexOf(document.activeElement as HTMLButtonElement);
    const buoc = e.key === 'ArrowRight' || e.key === 'ArrowDown' ? 1 : -1;
    nut[(i + buoc + nut.length) % nut.length]?.focus();
  };

  return (
    <main className="tdm" aria-label="Màn hình mở màn">
      {bia ? <img className="tdm__nen" src={bia} alt="" draggable={false} /> : null}
      <div className="tdm__phu" aria-hidden="true" />
      <div className="mvp-xoay" role="status">
        <span className="mvp-xoay__may" aria-hidden="true" />
        <p className="mvp-xoay__chu">Xoay ngang điện thoại để chơi</p>
        <p className="mvp-xoay__phu">Game được thiết kế để chơi ngang xuyên suốt các màn.</p>
      </div>
      <header className="tdm__logo">
        {nhanTren && conLai.length > 0 ? <span className="tdm__nhan">{nhanTren}</span> : null}
        <h1 className="tdm__ten">{tenLon}</h1>
      </header>
      <nav ref={menu} className="tdm__menu" aria-label="Menu chính" onKeyDown={diChuyen}>
        {coVan ? <Nut ma="tiep" chinh nhan="Chơi tiếp" phu={nhanTienDo(s)} onClick={() => onVao(false)} autoFocus /> : null}
        <Nut ma="moi" chinh={!coVan} nhan="Chơi mới" onClick={() => (coVan ? setHoiChoiLai(true) : onVao(true))} autoFocus={!coVan} />
        <Nut ma="nap" nhan="Nạp ván" disabled={!coONap} title={coONap ? undefined : 'Chưa có ván nào được lưu'} onClick={() => setNap(true)} />
        <Nut ma="cai" nhan="Cài đặt" onClick={() => setCaiDat(true)} />
      </nav>

      <AudioSettingsModal open={caiDat} onClose={() => setCaiDat(false)} />
      {nap ? (
        <LuuNapMvp
          mode="load"
          oLuu={oLuu}
          coTienDo
          canhHienTai="cong-truong"
          onLuu={() => undefined}
          onNap={(o) => {
            setNap(false);
            if (napTuO(o)) onVao(false);
          }}
          onDong={() => setNap(false)}
        />
      ) : null}
      <ConfirmDialog
        open={hoiChoiLai}
        title="Chơi mới từ đầu?"
        message="Ván đang chơi sẽ bị xóa. Các ô đã lưu vẫn giữ nguyên."
        confirmLabel="Xóa và chơi mới"
        onConfirm={() => {
          setHoiChoiLai(false);
          onVao(true);
        }}
        onCancel={() => setHoiChoiLai(false)}
      />
    </main>
  );
}
