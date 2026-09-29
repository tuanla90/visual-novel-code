/**
 * HUD bản MVP (QĐ-089/090): ngày + khung giờ ("Cuối ngày" khi hết khung), nhiệm vụ hiện tại, thanh uy tín 5 vạch
 * ở ngày họp, nút Hồ sơ / Sổ tay / Lưu / Nạp / Lịch sử / Menu. Mọi nút chỉ biểu tượng có `title` + `aria-label`.
 */
import { useState } from 'react';
import type { KichBanMvp } from '../../content/mvp/types';
import { ConfirmDialog } from '../../shared/ui/ConfirmDialog';
import { IconBriefcase, IconFileText, IconFolderOpen, IconHistory, IconRotateCcw, IconSave } from '../../shared/ui/icons';
import { tenKhungHienTai } from '../engine/may';
import type { TrangThaiMvp } from '../engine/trang-thai';

export interface HudMvpProps {
  kb: KichBanMvp;
  s: TrangThaiMvp;
  soHoSo: number;
  onMoHoSo: () => void;
  onMoSoTay: () => void;
  onMoLuu: () => void;
  onMoNap: () => void;
  onMoLichSu: () => void;
  onBatDauLai: () => void;
  onVeTieuDe: () => void;
}

/** Thanh uy tín: `con` vạch đầy trên `tong`. */
export function ThanhUyTin({ con, tong }: { con: number; tong: number }) {
  return (
    <div className="mvp-uytin" role="img" aria-label={`Uy tín: ${con} trên ${tong} vạch`} title={`Uy tín ${con}/${tong}`}>
      <span className="mvp-uytin__nhan">Uy tín</span>
      <span className="mvp-uytin__vach" aria-hidden="true">
        {Array.from({ length: tong }, (_x, i) => (
          <i key={i} className={`mvp-uytin__o${i < con ? ' is-con' : ''}`} />
        ))}
      </span>
    </div>
  );
}

export function HudMvp({ kb, s, soHoSo, onMoHoSo, onMoSoTay, onMoLuu, onMoNap, onMoLichSu, onBatDauLai, onVeTieuDe }: HudMvpProps) {
  const [menuMo, setMenuMo] = useState(false);
  const [xacNhan, setXacNhan] = useState(false);
  const tenNgay = kb.lich.ngay.find((n) => n.so === s.ngay)?.ten ?? '';
  let moc: string;
  let phu = '';
  if (s.giaiDoan === 'mo-dau') moc = 'Mở đầu';
  else if (s.giaiDoan === 'ngay') {
    moc = `Ngày ${s.ngay}`;
    phu = tenKhungHienTai(kb, s);
  } else if (s.giaiDoan === 'hop') moc = 'Buổi họp';
  else moc = 'Kết';
  const tong = kb.lich.luat.uyTin ?? 0;

  return (
    <header className="mvp-hud" aria-label="Thanh trạng thái">
      <div className="mvp-hud__moc" title={tenNgay || moc}>
        <span className="mvp-hud__ngay">{moc}</span>
        {phu ? <span className="mvp-hud__khung">{phu}</span> : null}
      </div>
      {s.nhiemVu ? (
        <p className="mvp-hud__nhiemvu" title={s.nhiemVu}>
          <span className="mvp-hud__nhiemvu-nhan">Nhiệm vụ</span>
          <span className="mvp-hud__nhiemvu-chu">{s.nhiemVu}</span>
        </p>
      ) : (
        <span />
      )}
      {s.giaiDoan === 'hop' && tong > 0 ? <ThanhUyTin con={s.uyTin} tong={tong} /> : null}
      <div className="mvp-hud__nut" role="toolbar" aria-label="Điều khiển">
        <button type="button" className="mvp-hud__btn" onClick={onMoHoSo} title="Mở hồ sơ (giấy nhớ, tài liệu, bằng chứng)" aria-label="Mở hồ sơ">
          <IconBriefcase width={18} height={18} aria-hidden="true" />
          <span className="mvp-hud__btn-chu">Hồ sơ</span>
          {soHoSo > 0 ? <span className="mvp-hud__dem">{soHoSo}</span> : null}
        </button>
        <button type="button" className="mvp-hud__btn" onClick={onMoSoTay} title="Mở sổ cá nhân (trang đã chép)" aria-label="Mở sổ cá nhân">
          <IconFileText width={18} height={18} aria-hidden="true" />
          <span className="mvp-hud__btn-chu">Sổ tay</span>
        </button>
        <button type="button" className="mvp-hud__btn" onClick={onMoLichSu} title="Xem lại lời thoại đã qua" aria-label="Xem lịch sử thoại">
          <IconHistory width={18} height={18} aria-hidden="true" />
        </button>
        <button type="button" className="mvp-hud__btn" onClick={onMoLuu} title="Lưu tiến độ vào ô lưu" aria-label="Lưu tiến độ">
          <IconSave width={18} height={18} aria-hidden="true" />
        </button>
        <button type="button" className="mvp-hud__btn" onClick={onMoNap} title="Nạp tiến độ từ ô lưu" aria-label="Nạp tiến độ">
          <IconFolderOpen width={18} height={18} aria-hidden="true" />
        </button>
        <div className="mvp-hud__menu">
          <button
            type="button"
            className="mvp-hud__btn"
            onClick={() => setMenuMo((m) => !m)}
            aria-haspopup="menu"
            aria-expanded={menuMo}
            title="Menu: bắt đầu lại, về màn tiêu đề"
            aria-label="Mở menu"
          >
            <IconRotateCcw width={18} height={18} aria-hidden="true" />
          </button>
          {menuMo ? (
            <div className="mvp-hud__menu-panel" role="menu">
              <button type="button" role="menuitem" className="mvp-hud__menu-item" onClick={() => { setMenuMo(false); onVeTieuDe(); }}>
                Về màn tiêu đề (giữ tiến độ)
              </button>
              <button type="button" role="menuitem" className="mvp-hud__menu-item mvp-hud__menu-item--nguy" onClick={() => { setMenuMo(false); setXacNhan(true); }}>
                Bắt đầu lại bản MVP từ đầu
              </button>
            </div>
          ) : null}
        </div>
      </div>
      <ConfirmDialog
        open={xacNhan}
        title="Bắt đầu lại bản MVP?"
        message="Tiến độ bản MVP đang chơi (ngày, hồ sơ, sổ tay) sẽ bị xóa. Các ô lưu vẫn giữ."
        confirmLabel="Xóa và bắt đầu lại"
        onConfirm={() => {
          setXacNhan(false);
          onBatDauLai();
        }}
        onCancel={() => setXacNhan(false)}
      />
    </header>
  );
}
