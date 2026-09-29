/**
 * Thanh trên bản MVP (QĐ-089/090) — mang phong cách thanh trên của prototype (gói giao-dien-mvp): DÙNG LẠI lớp CSS
 * `.topbar*` của `styles/app.css`/`portrait.css` (vé "Ngày n/5" + vạch 5 ngày, viên "Mục tiêu", nhóm nút con nhộng,
 * menu tạm dừng), nhưng là component riêng: `shared/ui/TopBar` gắn chặt `PART_IDS` (5 phần của prototype) và telemetry
 * `notebook_opened` — sửa nó để nhận ngày/khung MVP sẽ đụng test và hành vi prototype.
 *
 * Nội dung: ngày + khung giờ ("Cuối ngày" khi hết khung), nhiệm vụ hiện tại, thanh uy tín 5 vạch ở ngày họp, nút
 * Dọc/Ngang / Hồ sơ / Sổ tay, menu (Lịch sử thoại, Lưu, Nạp, Về màn tiêu đề, Bắt đầu lại). Mọi nút có `title` +
 * `aria-label`; menu đóng bằng Esc hay bấm ra ngoài.
 */
import { useEffect, useRef, useState } from 'react';
import type { KichBanMvp } from '../../content/mvp/types';
import { ConfirmDialog } from '../../shared/ui/ConfirmDialog';
import { IconFolderOpen, IconHistory, IconRotateCcw, IconSave } from '../../shared/ui/icons';
import { useVnStore } from '../../shared/vn/vn-store';
import { tenKhungHienTai } from '../engine/may';
import type { TrangThaiMvp } from '../engine/trang-thai';

export interface HudMvpProps {
  kb: KichBanMvp;
  s: TrangThaiMvp;
  soHoSo: number;
  soTrangSo: number;
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

/** Mốc hiện tại cho vé bên trái: chữ nhỏ ("Ngày"/"Buổi"), số lớn, tên dưới (khung giờ / tên giai đoạn). */
function mocHud(kb: KichBanMvp, s: TrangThaiMvp): { kicker: string; so: string; ten: string; nhanDai: string } {
  const tongNgay = kb.lich.ngay.length;
  if (s.giaiDoan === 'mo-dau') return { kicker: 'Ngày', so: `0/${tongNgay}`, ten: 'Mở đầu', nhanDai: 'Mở đầu' };
  if (s.giaiDoan === 'ngay') {
    const khung = tenKhungHienTai(kb, s);
    return { kicker: 'Ngày', so: `${s.ngay}/${tongNgay}`, ten: khung, nhanDai: `Ngày ${s.ngay} · ${khung}` };
  }
  if (s.giaiDoan === 'hop') return { kicker: 'Buổi', so: 'Họp', ten: 'Buổi họp rà soát', nhanDai: 'Buổi họp rà soát' };
  return { kicker: 'Vụ 1', so: 'Kết', ten: 'Kết thúc', nhanDai: 'Kết thúc' };
}

export function HudMvp({ kb, s, soHoSo, soTrangSo, onMoHoSo, onMoSoTay, onMoLuu, onMoNap, onMoLichSu, onBatDauLai, onVeTieuDe }: HudMvpProps) {
  const [menuMo, setMenuMo] = useState(false);
  const [xacNhan, setXacNhan] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const viewportMode = useVnStore((k) => k.viewportMode);
  const toggleViewportMode = useVnStore((k) => k.toggleViewportMode);
  const moc = mocHud(kb, s);
  const tenNgay = kb.lich.ngay.find((n) => n.so === s.ngay)?.ten ?? '';
  const tong = kb.lich.luat.uyTin ?? 0;
  const coUyTin = s.giaiDoan === 'hop' && tong > 0;
  const daXongNgay = (so: number): boolean => s.giaiDoan === 'hop' || s.giaiDoan === 'het' || (s.giaiDoan === 'ngay' && so < s.ngay);
  const nhanDocNgang = viewportMode === 'mobile' ? 'Chuyển sang màn hình ngang PC' : 'Chuyển sang màn hình dọc Mobile 9:16';

  // Menu: Esc hay bấm ra ngoài thì đóng (không dùng <details> như prototype để bắt được Esc).
  useEffect(() => {
    if (!menuMo) return;
    const onKey = (e: KeyboardEvent): void => {
      if (e.key === 'Escape') {
        e.preventDefault();
        setMenuMo(false);
      }
    };
    const onDown = (e: PointerEvent): void => {
      if (menuRef.current && e.target instanceof Node && !menuRef.current.contains(e.target)) setMenuMo(false);
    };
    window.addEventListener('keydown', onKey);
    window.addEventListener('pointerdown', onDown);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('pointerdown', onDown);
    };
  }, [menuMo]);

  const chon = (viec: () => void) => () => {
    setMenuMo(false);
    viec();
  };

  return (
    <header className={`topbar mvp-topbar${coUyTin ? ' mvp-topbar--uytin' : ''}`} aria-label="Thanh trạng thái">
      <div className="topbar__chapter" role="group" aria-label={`Tiến trình: ${moc.nhanDai}`} title={tenNgay || moc.nhanDai}>
        <span className="topbar__chapter-count">
          <span className="topbar__chapter-kicker" aria-hidden="true">
            {moc.kicker}
          </span>
          <span className="topbar__chapter-number">{moc.so}</span>
        </span>
        <span className="topbar__chapter-info">
          <span className="topbar__chapter-name">{moc.ten}</span>
          <span className="topbar__pips" aria-hidden="true">
            {kb.lich.ngay.map((n) => (
              <span
                key={n.so}
                className={`topbar__pip${daXongNgay(n.so) ? ' is-done' : ''}${s.giaiDoan === 'ngay' && n.so === s.ngay ? ' is-current' : ''}`}
                title={`Ngày ${n.so}${n.ten ? ` · ${n.ten}` : ''}`}
              />
            ))}
          </span>
        </span>
      </div>
      <div className="topbar__task" aria-live="polite">
        <svg className="topbar__task-icon" viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="7" stroke="currentColor" strokeWidth="1.8" fill="none" />
          <circle cx="12" cy="12" r="2.5" fill="currentColor" />
          <path d="M12 2v3M12 19v3M2 12h3M19 12h3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <div className="topbar__task-content">
          <span className="topbar__task-label">Nhiệm vụ</span>
          <span className="topbar__task-text" title={s.nhiemVu ?? undefined}>
            {s.nhiemVu ?? 'Chưa có nhiệm vụ'}
          </span>
        </div>
      </div>
      <div className="topbar__actions">
        {coUyTin ? <ThanhUyTin con={s.uyTin} tong={tong} /> : null}
        <div className="topbar__capsule-group" role="toolbar" aria-label="Điều khiển">
          <button
            type="button"
            className={`topbar__capsule-btn topbar__capsule-btn--viewport${viewportMode === 'mobile' ? ' is-active' : ''}`}
            aria-label={nhanDocNgang}
            title={nhanDocNgang}
            onClick={toggleViewportMode}
          >
            <svg viewBox="0 0 24 24" width={16} height={16} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
              <line x1="12" y1="18" x2="12.01" y2="18" />
            </svg>
            <span className="topbar__capsule-text-responsive">{viewportMode === 'mobile' ? 'Dọc' : 'Dọc/Ngang'}</span>
          </button>
          <button
            type="button"
            className="topbar__capsule-btn topbar__capsule-btn--dossier"
            aria-label={`Mở hồ sơ (${soHoSo} mục)`}
            title="Mở hồ sơ: giấy nhớ, tài liệu, bằng chứng"
            onClick={onMoHoSo}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 5.5h5l1.5 2H20v11H4z" />
            </svg>
            <span className="topbar__capsule-text-responsive">Hồ sơ</span>
            <span className="topbar__dossier-count" aria-hidden="true">
              {soHoSo}
            </span>
          </button>
          <button
            type="button"
            className="topbar__capsule-btn mvp-topbar__sotay"
            aria-label={`Mở sổ cá nhân (${soTrangSo} trang)`}
            title="Mở sổ cá nhân: các đoạn code đã chép"
            onClick={onMoSoTay}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 4.5A1.5 1.5 0 0 1 6.5 3H19v16H6.5A1.5 1.5 0 0 0 5 20.5z" />
              <path d="M5 20.5A1.5 1.5 0 0 0 6.5 22H19v-3" />
              <path d="M9 7.5h6M9 11h6" />
            </svg>
            <span className="topbar__capsule-text-responsive">Sổ tay</span>
          </button>
          <div ref={menuRef} className={`topbar__menu topbar__capsule-menu${menuMo ? ' is-open' : ''}`}>
            <button
              type="button"
              className="topbar__capsule-btn topbar__capsule-btn--menu topbar__menu-trigger"
              aria-haspopup="menu"
              aria-expanded={menuMo}
              aria-label={menuMo ? 'Đóng menu tạm dừng' : 'Mở menu tạm dừng'}
              title="Menu: lịch sử thoại, lưu, nạp, bắt đầu lại"
              onClick={() => setMenuMo((m) => !m)}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="4" y1="7" x2="20" y2="7" />
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="17" x2="20" y2="17" />
              </svg>
            </button>
            {menuMo ? (
              <div className="topbar__menu-panel" role="menu" aria-label="Menu tạm dừng">
                <span className="topbar__menu-title">Tùy chọn</span>
                <button type="button" role="menuitem" className="topbar__menu-item" onClick={chon(onMoLichSu)}>
                  <IconHistory width={16} height={16} aria-hidden="true" />
                  <span>Lịch sử thoại</span>
                </button>
                <button type="button" role="menuitem" className="topbar__menu-item" onClick={chon(onMoLuu)}>
                  <IconSave width={16} height={16} aria-hidden="true" />
                  <span>Lưu tiến độ (Save)</span>
                </button>
                <button type="button" role="menuitem" className="topbar__menu-item" onClick={chon(onMoNap)}>
                  <IconFolderOpen width={16} height={16} aria-hidden="true" />
                  <span>Nạp tiến độ (Load)</span>
                </button>
                <button type="button" role="menuitem" className="topbar__menu-item" onClick={chon(onVeTieuDe)}>
                  <svg viewBox="0 0 24 24" width={16} height={16} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M3 11.5 12 4l9 7.5" />
                    <path d="M5.5 10v10h13V10" />
                  </svg>
                  <span>Về màn tiêu đề</span>
                </button>
                <button type="button" role="menuitem" className="topbar__menu-item topbar__menu-item--danger" onClick={chon(() => setXacNhan(true))}>
                  <IconRotateCcw width={16} height={16} aria-hidden="true" />
                  <span>Bắt đầu lại bản MVP</span>
                </button>
              </div>
            ) : null}
          </div>
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
