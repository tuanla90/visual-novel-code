/**
 * Thanh trên bản MVP (QĐ-089/090) — mang phong cách thanh trên của prototype (gói giao-dien-mvp): DÙNG LẠI lớp CSS
 * `.topbar*` của `styles/app.css`/`portrait.css` (vé "Ngày n/5" + vạch 5 ngày, viên "Mục tiêu", nhóm nút con nhộng,
 * menu tạm dừng), nhưng là component riêng: `shared/ui/TopBar` gắn chặt `PART_IDS` (5 phần của prototype) và telemetry
 * `notebook_opened` — sửa nó để nhận ngày/khung MVP sẽ đụng test và hành vi prototype.
 *
 * Nội dung: ngày + khung giờ ("Cuối ngày" khi hết khung), nhiệm vụ hiện tại, thanh uy tín 5 vạch ở ngày họp, nút
 * Dọc/Ngang / Hồ sơ / Sổ tay, menu (Lịch sử thoại, Lưu, Nạp, Cài đặt, Về màn tiêu đề, Bắt đầu lại). Mọi nút có `title` +
 * `aria-label`; menu đóng bằng Esc hay bấm ra ngoài.
 */
import { useEffect, useRef, useState } from 'react';
import type { KichBanMvp } from '../../content/mvp/types';
import { ConfirmDialog } from '../../shared/ui/ConfirmDialog';
import { IconChevronLeft, IconEyeOff, IconFastForward, IconFolderOpen, IconHistory, IconPlay, IconRotateCcw, IconSave, IconSliders } from '../../shared/ui/icons';
import { readLineKey, useVnStore } from '../../shared/vn/vn-store';
import { dinhDangNgay, hoaDau, homNay, thuCua } from '../engine/lich-ngay';
import { dienTen, tenKhungHienTai, tenNguoiNoi } from '../engine/may';
import type { TrangThaiMvp } from '../engine/trang-thai';
import './LichMvp.css';

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
  /** Cài đặt (tốc độ chữ, âm thanh) — cùng bảng `AudioSettingsModal` của prototype. */
  onMoCaiDat: () => void;
  onBatDauLai: () => void;
  /** Bỏ trống = không có màn tiêu đề (bản chơi thử chỉ MVP) → ẩn mục "Về màn tiêu đề". */
  onVeTieuDe?: () => void;
  /** Vé "NGÀY n/5" thành nút mở lịch (LichMvp). Bỏ trống → vé chỉ để xem như trước. */
  onMoLich?: () => void;
  onTamDungViecPhu?: () => void;
  onMoBangHoatDong?: () => void;
  onLui?: () => void;
  loiThoai?: { speaker: string; text: string };
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
      <span className="mvp-uytin__so" aria-hidden="true">{con}/{tong}</span>
    </div>
  );
}

/** Ngày thật trong truyện của tiến độ hiện tại (ISO). Việc phụ / vụ sau lấy ngày khai ở lich.md. */
function ngayHienTai(kb: KichBanMvp, s: TrangThaiMvp): string {
  const viec = s.giaiDoan === 'phu' ? (kb.lich.nhiemVuPhu ?? []).find((p) => p.id === s.phu?.id) : null;
  const vu = viec ?? (kb.lich.vuSau ?? []).find((v) => v.id === s.vu);
  return homNay({ giaiDoan: s.giaiDoan === 'phu' ? 'vu-sau' : s.giaiDoan, ngay: s.ngay, conTro: s.conTro, ngayVu: vu?.ngay ?? null, ngayThang: s.ngayThang ?? null }, kb.lich.ngayMoDau ?? null).ngay;
}

const THU_NGAN = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];

/**
 * Mốc hiện tại cho vé bên trái (03/10/2026, user: "đưa thành ngày thực tế"): chữ nhỏ là thứ, số lớn là ngày/tháng trong truyện
 * (8/9, 15/9…), tên dưới là đoạn truyện. Bấm vé mở lịch.
 */
function mocHud(kb: KichBanMvp, s: TrangThaiMvp): { kicker: string; so: string; ten: string; nhanDai: string } {
  const iso = ngayHienTai(kb, s);
  const [, m = '', d = ''] = iso.split('-');
  const so = `${Number(d)}/${Number(m)}`;
  const kicker = THU_NGAN[thuCua(iso)] ?? '';
  const ngayDai = hoaDau(dinhDangNgay(iso));
  let ten = 'Kết thúc';
  if (s.giaiDoan === 'mo-dau') ten = 'Mở đầu';
  else if (s.giaiDoan === 'ngay') ten = tenKhungHienTai(kb, s);
  else if (s.giaiDoan === 'hop') ten = 'Buổi họp rà soát';
  else if (s.giaiDoan === 'phu') ten = `Việc phụ · ${tenKhungHienTai(kb, s)}`;
  else if (s.giaiDoan === 'vu-sau') {
    const i = (kb.lich.vuSau ?? []).findIndex((v) => v.id === s.vu);
    ten = `Vụ ${i + 2} · ${kb.lich.vuSau?.[i]?.ten ?? ''}`;
  }
  return { kicker, so, ten, nhanDai: `${ngayDai} · ${ten}` };
}

export function HudMvp({ kb, s, soHoSo, soTrangSo, onMoHoSo, onMoSoTay, onMoLuu, onMoNap, onMoLichSu, onMoCaiDat, onBatDauLai, onVeTieuDe, onMoLich, onTamDungViecPhu, onMoBangHoatDong, onLui, loiThoai }: HudMvpProps) {
  const [menuMo, setMenuMo] = useState(false);
  const [xacNhan, setXacNhan] = useState(false);
  const [chiTiet, setChiTiet] = useState({ nhiemVu: s.nhiemVu, mo: false });
  if (chiTiet.nhiemVu !== s.nhiemVu) setChiTiet({ nhiemVu: s.nhiemVu, mo: false });
  const moRongNhiemVu = chiTiet.nhiemVu === s.nhiemVu && chiTiet.mo;
  const setMoRongNhiemVu = (mo: boolean): void => setChiTiet({ nhiemVu: s.nhiemVu, mo });
  const nhiemVuRef = useRef<HTMLDivElement>(null);
  const autoMode = useVnStore((k) => k.autoMode);
  const skipMode = useVnStore((k) => k.skipMode);
  const daDoc = useVnStore((k) => !!loiThoai && (k.skipUnread || !!k.readLines[readLineKey(loiThoai.speaker, loiThoai.text)]));
  const menuRef = useRef<HTMLDivElement>(null);
  const moc = mocHud(kb, s);
  const tenNgay = kb.lich.ngay.find((n) => n.so === s.ngay)?.ten ?? '';
  const tong = kb.lich.luat.uyTin ?? 0;
  const coUyTin = s.giaiDoan === 'hop' && tong > 0;
  const daXongNgay = (so: number): boolean => s.giaiDoan === 'hop' || s.giaiDoan === 'het' || s.giaiDoan === 'vu-sau' || s.giaiDoan === 'phu' || (s.giaiDoan === 'ngay' && so < s.ngay);

  // Menu: Esc hay bấm ra ngoài thì đóng (không dùng <details> như prototype để bắt được Esc).
  useEffect(() => {
    if (!menuMo && !moRongNhiemVu) return;
    const onKey = (e: KeyboardEvent): void => {
      if (e.key === 'Escape') {
        e.preventDefault();
        setMenuMo(false);
        setChiTiet({ nhiemVu: s.nhiemVu, mo: false });
      }
    };
    const onDown = (e: PointerEvent): void => {
      if (!(e.target instanceof Node)) return;
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuMo(false);
      if (nhiemVuRef.current && !nhiemVuRef.current.contains(e.target)) setChiTiet({ nhiemVu: s.nhiemVu, mo: false });
    };
    window.addEventListener('keydown', onKey);
    window.addEventListener('pointerdown', onDown);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('pointerdown', onDown);
    };
  }, [menuMo, moRongNhiemVu, s.nhiemVu]);

  const dungThoai = (): void => {
    const vn = useVnStore.getState();
    vn.setAutoMode(false); vn.setSkipMode(false); vn.setGiuTua(false);
  };

  const chon = (viec: () => void) => () => {
    setMenuMo(false);
    viec();
  };

  const veNgay = (
    <>
      <span className="topbar__chapter-count">
        <span className="topbar__chapter-kicker" aria-hidden="true">
          {moc.kicker}
        </span>
        <span className="topbar__chapter-number">{moc.so}</span>
        {onMoLich ? (
          <svg className="topbar__lich-icon" viewBox="0 0 24 24" width={12} height={12} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
            <rect x="3.5" y="5" width="17" height="15" rx="2" />
            <path d="M3.5 10h17M8 3v4M16 3v4" />
          </svg>
        ) : null}
      </span>
      <span className="topbar__chapter-info">
        <span className="topbar__chapter-name">{moc.ten}</span>
        <span className="topbar__pips" aria-hidden="true">
          {kb.lich.ngay.map((n) => (
            <span
              key={n.so}
              className={`topbar__pip${daXongNgay(n.so) ? ' is-done' : ''}${s.giaiDoan === 'ngay' && n.so === s.ngay ? ' is-current' : ''}`}
              title={n.ten || undefined}
            />
          ))}
        </span>
      </span>
    </>
  );

  return (
    <header className={`topbar mvp-topbar${coUyTin ? ' mvp-topbar--uytin' : ''}`} aria-label="Thanh trạng thái"
      onKeyDown={(e) => { if ((menuMo || moRongNhiemVu) && e.key !== 'Escape') e.stopPropagation(); }}>
      {onMoLich ? (
        <button type="button" className="topbar__chapter" aria-label={`Mở lịch — ${moc.nhanDai}`} title="Mở lịch" onClick={onMoLich}>
          {veNgay}
        </button>
      ) : (
        <div className="topbar__chapter" role="group" aria-label={`Tiến trình: ${moc.nhanDai}`} title={tenNgay || moc.nhanDai}>
          {veNgay}
        </div>
      )}
      <div className="mvp-topbar__nhiem-vu" ref={nhiemVuRef}>
      <button type="button" className="topbar__task" aria-expanded={moRongNhiemVu}
        aria-controls="mvp-chi-tiet-nhiem-vu" aria-label="Xem nhiệm vụ và việc đang làm" title="Xem nhiệm vụ và việc đang làm"
        onClick={() => { if (!moRongNhiemVu) dungThoai(); setMenuMo(false); setMoRongNhiemVu(!moRongNhiemVu); }}>
        <svg className="topbar__task-icon" viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="7" stroke="currentColor" strokeWidth="1.8" fill="none" />
          <circle cx="12" cy="12" r="2.5" fill="currentColor" />
          <path d="M12 2v3M12 19v3M2 12h3M19 12h3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <div className="topbar__task-content">
          <span className="topbar__task-label">Nhiệm vụ</span>
          <span className="topbar__task-text" title={s.nhiemVu ? dienTen(kb, s, s.nhiemVu) : undefined}>
            {s.nhiemVu ? dienTen(kb, s, s.nhiemVu) : 'Chưa có nhiệm vụ'}
          </span>
        </div>
      </button>
      {moRongNhiemVu ? <section id="mvp-chi-tiet-nhiem-vu" className="mvp-topbar__chi-tiet" aria-label="Nhiệm vụ và việc đang làm">
        <p className="mvp-topbar__moc">{moc.nhanDai}</p>
        <h2>Nhiệm vụ</h2>
        <p>{s.nhiemVu ? dienTen(kb, s, s.nhiemVu) : 'Chưa có nhiệm vụ.'}</p>
        {s.nhacViec ? <><h3>Việc đang làm · {tenNguoiNoi(kb, s.nhacViec.nhanVat, s)}</h3><p>{dienTen(kb, s, s.nhacViec.text)}</p></> : null}
        <button type="button" aria-label="Đóng chi tiết nhiệm vụ" title="Đóng chi tiết nhiệm vụ" onClick={() => setMoRongNhiemVu(false)}>Đóng</button>
      </section> : null}
      </div>
      <div className="topbar__actions">
        {coUyTin ? <ThanhUyTin con={s.uyTin} tong={tong} /> : null}
        <div className="topbar__capsule-group" role="toolbar" aria-label="Điều khiển">
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
          {/* Sổ cá nhân chỉ hiện khi đã có trang (chương 1 chưa ghi trang nào — nút trống chỉ gây tò mò vô ích). */}
          {soTrangSo > 0 ? (
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
          ) : null}
          <div ref={menuRef} className={`topbar__menu topbar__capsule-menu${menuMo ? ' is-open' : ''}`}>
            <button
              type="button"
              className="topbar__capsule-btn topbar__capsule-btn--menu topbar__menu-trigger"
              aria-haspopup="menu"
              aria-expanded={menuMo}
              aria-label={menuMo ? 'Đóng menu tạm dừng' : 'Mở menu tạm dừng'}
              title="Menu: lịch sử thoại, lưu, nạp, bắt đầu lại"
              onClick={() => { if (!menuMo) dungThoai(); setMoRongNhiemVu(false); setMenuMo((m) => !m); }}
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
                {onLui ? <button type="button" role="menuitem" className="topbar__menu-item mvp-topbar__compact-item" onClick={chon(onLui)}>
                  <IconChevronLeft width={16} height={16} aria-hidden="true" /><span>Lùi lại bước trước</span>
                </button> : null}
                {loiThoai ? <>
                  <button type="button" role="menuitemcheckbox" aria-checked={autoMode} className="topbar__menu-item mvp-topbar__compact-item" onClick={chon(() => useVnStore.getState().toggleAutoMode())}>
                    <IconPlay width={16} height={16} aria-hidden="true" /><span>Tự chạy thoại</span>
                  </button>
                  <button type="button" role="menuitemcheckbox" aria-checked={skipMode} disabled={!skipMode && !daDoc} className="topbar__menu-item mvp-topbar__compact-item" onClick={chon(() => useVnStore.getState().toggleSkipMode())}>
                    <IconFastForward width={16} height={16} aria-hidden="true" /><span>Tua thoại đã đọc</span>
                  </button>
                  <button type="button" role="menuitem" className="topbar__menu-item mvp-topbar__compact-item" onClick={chon(() => useVnStore.getState().toggleHideUi())}>
                    <IconEyeOff width={16} height={16} aria-hidden="true" /><span>Ẩn giao diện để xem cảnh</span>
                  </button>
                </> : null}
                {soTrangSo > 0 ? <button type="button" role="menuitem" className="topbar__menu-item mvp-topbar__compact-item" onClick={chon(onMoSoTay)}>
                  <IconFolderOpen width={16} height={16} aria-hidden="true" /><span>Sổ cá nhân ({soTrangSo} trang)</span>
                </button> : null}
                {(s.giaiDoan === 'ngay' || s.giaiDoan === 'vu-sau') && onMoBangHoatDong ? (
                  <button type="button" role="menuitem" className="topbar__menu-item" onClick={chon(onMoBangHoatDong)}>
                    <svg viewBox="0 0 24 24" width={16} height={16} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M4 5h16M4 12h16M4 19h16" /><circle cx="8" cy="5" r="1.5" fill="currentColor" /><circle cx="16" cy="12" r="1.5" fill="currentColor" />
                    </svg>
                    <span>Bảng hoạt động</span>
                  </button>
                ) : null}
                {s.giaiDoan === 'phu' && onTamDungViecPhu ? (
                  <button type="button" role="menuitem" className="topbar__menu-item" onClick={chon(onTamDungViecPhu)}>
                    <svg viewBox="0 0 24 24" width={16} height={16} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M9 8H4V3" /><path d="M4 8a8 8 0 1 1-1 7" />
                    </svg>
                    <span>Cất việc này, về tuyến chính</span>
                  </button>
                ) : null}
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
                <button type="button" role="menuitem" className="topbar__menu-item" onClick={chon(onMoCaiDat)}>
                  <IconSliders width={16} height={16} aria-hidden="true" />
                  <span>Cài đặt (tốc độ chữ, âm thanh)</span>
                </button>
                {onVeTieuDe ? (
                  <button type="button" role="menuitem" className="topbar__menu-item" onClick={chon(onVeTieuDe)}>
                    <svg viewBox="0 0 24 24" width={16} height={16} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M3 11.5 12 4l9 7.5" />
                      <path d="M5.5 10v10h13V10" />
                    </svg>
                    <span>Về màn tiêu đề</span>
                  </button>
                ) : null}
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
