/**
 * MÀN CHƠI BẢN MVP — lối vào từ nút "Chơi bản MVP" ở màn tiêu đề (QĐ-077 gói 1). Ghép máy `engine/may.ts` với
 * giao diện: HUD (ngày/khung/uy tín), sân khấu MVP, hộp thoại VN (tái dùng `DialogBox`), câu hỏi (`MultipleChoice`),
 * bản đồ trường + màn trong địa điểm (vật tương tác), thử thách SQL, hồ sơ, sổ tay, lịch sử thoại (`BacklogModal`), Lưu/Nạp,
 * màn tạo nhân vật (`TaoNhanVatMvp`: tên + ngành, không hỏi giới tính — QĐ-084).
 * Người chơi đang đứng ở nơi nào (bản đồ hay trong một nơi) là trạng thái GIAO DIỆN (đi lại không tốn khung, không lưu);
 * sang ngày mới thì về bản đồ.
 * Trạng thái nằm trong `store/kho-mvp.ts` (khóa riêng), không đụng store prototype.
 */
import './mvp.css';
import './RotateForLandscape.css';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { HighlightProvider } from '../../shared/highlight/HighlightText';
import { highlightMvp } from './highlight-mvp';
import type { KichBanMvp, LoiMvp } from '../../content/mvp/types';
import { isFacilitatorMode } from '../../app/facilitator-mode';
import { isEffectId } from '../../shared/ids';
import { AudioSettingsModal } from '../../shared/audio/AudioSettingsModal';
import { useAudioStore } from '../../shared/audio/audio-store';
import { soundEngine } from '../../shared/audio/sound-engine';
import { DialogBox } from '../../shared/ui/DialogBox';
import { MultipleChoice } from '../../shared/ui/MultipleChoice';
import { CodeText } from '../../shared/ui/CodeText';
import { BacklogModal } from '../../shared/vn/BacklogModal';
import { useVnStore } from '../../shared/vn/vn-store';
import { ObjectionEffect } from '../../story/ui/ObjectionEffect';
import type { DialogueLine, MultipleChoiceQuestion } from '../../story/types';
import { canGioiThieu, canhLuiThuThach, dienTen as dienTenMay, dieuHuongTuDo, khungNhin, phuMoDuoc, tenNguoiNoi, type KhungNhinMvp } from '../engine/may';
import { mucNhapVaiCua, mucSqlCua } from '../engine/muc-choi';
import { giaTriTuHoSo } from '../engine/giay-nho';
import { chonNhacNen, type NhacTruoc } from '../engine/nhac';
import type { TrangThaiMvp } from '../engine/trang-thai';
import { DIEM_NHAY_MVP, nhayToi, nhayToiDauChuong, type MaDiemNhayMvp } from '../engine/tu-choi';
import { ghiMucDaChon, KICH_BAN, nhanTienDo, useKhoMvp } from '../store/kho-mvp';
import { AnhChenMvp } from './AnhChenMvp';
import { ChonMucMvp } from './ChonMucMvp';
import { NhacDanMvp } from './NhacDanMvp';
import { BAN_DO_MVP } from './ban-do-mvp';
import { BangQuanSatMvp } from './BangQuanSatMvp';
import { BanDoMvp } from './BanDoMvp';
import { GioiThieuMvp, NHAN_TRUONG_BIET } from './GioiThieuMvp';
import { BanDiCungHoiDapMvp, HoiDapMvp } from './HoiDapMvp';
import { HoSoMvp, type TabHoSoMvp } from './HoSoMvp';
import { HudMvp } from './HudMvp';
import { KetMvp } from './KetMvp';
import { KhamPhaMvp } from './KhamPhaMvp';
import { LocThuV7 } from './v7/LocThuV7';
import { LichMvp } from './LichMvp';
import { LuuNapMvp } from './LuuNapMvp';
import { ManChieuMvp } from './ManChieuMvp';
import { dinhDangNgay, homNay, hoaDau, thuCua } from '../engine/lich-ngay';
import { tongKetVu } from '../engine/tong-ket';
import { DongHanhMvp } from './DongHanhMvp';
import { PhongTraMvp } from './v7/PhongTraMvp';
import { NoiMvp } from './NoiMvp';
import { nguoiThamGia, SanKhauMvp } from './SanKhauMvp';
import { TaiLieuMvp } from './TaiLieuMvp';
import { TaoNhanVatMvp } from './TaoNhanVatMvp';
import { taiTruocTheoVan } from './tai-truoc-mvp';
import { maMoi, theMoiTuMa, useTheChuaXem, type TheMoi } from './the-moi';
import { TheMoiMvp } from './TheMoiMvp';
import { thuBanPhim, useBanPhimAo } from './ban-phim-ao';
import { mucNhapVaiTheoMay, mucSqlTheoMay, useDienThoai } from './dien-thoai';
import { TraSoMvp } from './TrangSoMvp';
import { DoiChatMvp } from './DoiChatMvp';

export interface ManChoiMvpProps {
  /** Bỏ trống = bản chơi thử chỉ MVP, không có màn tiêu đề. */
  onVeTieuDe?: () => void;
}

function soHoSo(s: TrangThaiMvp): number {
  return s.hoSo.manhMoi.length + s.hoSo.taiLieu.length + s.hoSo.bangChung.length;
}

/** Lời MVP → kiểu `DialogueLine` của hộp thoại prototype (chỉ khác ở tập người nói; nhãn truyền riêng). */
function thanhLine(kb: typeof KICH_BAN, s: TrangThaiMvp, loi: LoiMvp): DialogueLine {
  return { speaker: loi.speaker, expression: loi.expression, text: dienTenMay(kb, s, loi.text) } as unknown as DialogueLine;
}

/** Ngày trong truyện dạng "Thứ Tư, 11/09/2024" (cho đầu bản đồ). */
function homNayChu(kb: KichBanMvp, s: TrangThaiMvp): string {
  const viec = s.giaiDoan === 'phu' ? (kb.lich.nhiemVuPhu ?? []).find((p) => p.id === s.phu?.id) : null;
  const vu = viec ?? (kb.lich.vuSau ?? []).find((v) => v.id === s.vu);
  const hn = homNay({ giaiDoan: s.giaiDoan === 'phu' ? 'vu-sau' : s.giaiDoan, ngay: s.ngay, conTro: s.conTro, ngayVu: vu?.ngay ?? null, ngayThang: s.ngayThang ?? null }, kb.lich.ngayMoDau ?? null);
  return hoaDau(dinhDangNgay(hn.ngay));
}

/** Thứ trong truyện (0 = Chủ nhật) — lịch nhân vật trên bản đồ tính theo thứ này. */
function thuHomNay(kb: KichBanMvp, s: TrangThaiMvp): number {
  const viec = s.giaiDoan === 'phu' ? (kb.lich.nhiemVuPhu ?? []).find((p) => p.id === s.phu?.id) : null;
  const vu = viec ?? (kb.lich.vuSau ?? []).find((v) => v.id === s.vu);
  return thuCua(homNay({ giaiDoan: s.giaiDoan === 'phu' ? 'vu-sau' : s.giaiDoan, ngay: s.ngay, conTro: s.conTro, ngayVu: vu?.ngay ?? null, ngayThang: s.ngayThang ?? null }, kb.lich.ngayMoDau ?? null).ngay);
}

export function ManChoiMvp({ onVeTieuDe }: ManChoiMvpProps) {
  const kb = KICH_BAN;
  const s = useKhoMvp((k) => k.trangThai);
  const highlightCase = s?.vu ?? 'vu1';
  const highlightSideQuest = s?.phu?.id ?? null;
  const highlightPlayer = s?.tenNguoiChoi ?? '';
  const highlightEngine = useMemo(() => highlightMvp(kb, highlightPlayer, highlightCase, highlightSideQuest), [kb, highlightPlayer, highlightCase, highlightSideQuest]);
  const oLuu = useKhoMvp((k) => k.oLuu);
  const batDau = useKhoMvp((k) => k.batDau);
  const hanhDong = useKhoMvp((k) => k.hanhDong);
  const ghiNhanTruyVan = useKhoMvp((k) => k.ghiNhanTruyVan);
  const lanDoiVan = useKhoMvp((k) => k.lanDoiVan);
  const xoa = useKhoMvp((k) => k.xoa);
  const luuVaoO = useKhoMvp((k) => k.luuVaoO);
  const napTuO = useKhoMvp((k) => k.napTuO);
  const datTrangThai = useKhoMvp((k) => k.datTrangThai);
  const luiKho = useKhoMvp((k) => k.lui);
  const coTheLui = useKhoMvp((k) => k.lichSuLui.some((st) => khungNhin(KICH_BAN, st).kind !== 'image'));

  /** Hồ sơ và Sổ cá nhân là hai tab của cùng một khung (phong cách hòm đồ prototype); `null` = đóng. */
  const [kho, setKho] = useState<TabHoSoMvp | null>(null);
  const [gioiThieuMo, setGioiThieuMo] = useState<string | null>(null);
  const [lichSuMo, setLichSuMo] = useState(false);
  const [luuNap, setLuuNap] = useState<'save' | 'load' | null>(null);
  const [caiDat, setCaiDat] = useState(false);
  /** Gói B17 (bộ mùa 1): màn hai câu hỏi mở lại từ menu "Cách chơi". */
  const [cachChoiMo, setCachChoiMo] = useState(false);
  const [lichMo, setLichMo] = useState(false);
  const [bangHoatDongMo, setBangHoatDongMo] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  /** Nơi đang đứng trong ngày (`null` = bản đồ). Gắn với ngày: sang ngày khác coi như về bản đồ. */
  const [dangO, setDangO] = useState<{ ngay: number; noi: string } | null>(null);

  const viewportMode = useVnStore((k) => k.viewportMode);
  // Điện thoại: bàn phím ảo mở → chế độ gõ (html[data-ban-phim]), kèm nút "Xong" để thu bàn phím (ban-phim-ao.ts).
  const coBanPhim = useBanPhimAo();
  // Điện thoại: không có hai mức phải gõ chữ (dien-thoai.ts). Ván lưu từ máy tính ở mức ấy thì hạ xuống khi mở trên điện thoại.
  const dienThoai = useDienThoai();
  const mucNhapVaiVan = s?.mucNhapVai;
  const mucSqlVan = s?.mucSql;
  const cachChoiVan = s?.cachChoi;
  useEffect(() => {
    if (!dienThoai || !s) return;
    const nv = mucNhapVaiVan === undefined ? undefined : mucNhapVaiTheoMay(mucNhapVaiVan, true);
    const sq = mucSqlVan === undefined ? undefined : mucSqlTheoMay(mucSqlVan, true);
    if (nv !== mucNhapVaiVan || sq !== mucSqlVan) hanhDong({ type: 'doi-muc', ...(nv !== mucNhapVaiVan ? { nhapVai: nv } : {}), ...(sq !== mucSqlVan ? { sql: sq } : {}) });
    if (cachChoiVan === 'go') hanhDong({ type: 'doi-cach-choi', cach: 'bam' });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dienThoai, mucNhapVaiVan, mucSqlVan, cachChoiVan, !!s]);
  const setSkipMode = useVnStore((k) => k.setSkipMode);
  const clearBacklog = useVnStore((k) => k.clearBacklog);
  const popBacklog = useVnStore((k) => k.popBacklog);
  const bgmEnabled = useAudioStore((k) => k.bgmEnabled);

  useEffect(() => {
    if (!s) batDau();
  }, [s, batDau]);

  const baoToast = useCallback((msg: string) => {
    setToast(msg);
    setTimeout(() => setToast((cur) => (cur === msg ? null : cur)), 2800);
  }, []);

  // Bật nhạc nền: trình duyệt chỉ cho phát âm thanh sau thao tác đầu tiên của người chơi. Bài nào do `chonNhac` bên dưới.
  useEffect(() => {
    if (!bgmEnabled) {
      soundEngine.stopBgm();
      return;
    }
    const start = (): void => soundEngine.startBgm();
    window.addEventListener('pointerdown', start, { once: true });
    window.addEventListener('keydown', start, { once: true });
    return () => {
      window.removeEventListener('pointerdown', start);
      window.removeEventListener('keydown', start);
    };
  }, [bgmEnabled]);
  useEffect(() => () => soundEngine.stopBgm(), []);

  // Giữ Ctrl để tua thoại (user 03/10/2026); thả phím, rời cửa sổ hay đang gõ chữ thì thôi tua.
  useEffect(() => {
    const dat = useVnStore.getState().setGiuTua;
    const xuong = (e: KeyboardEvent): void => {
      if (e.key !== 'Control' || e.repeat) return;
      const t = e.target as HTMLElement | null;
      if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable)) return;
      dat(true);
    };
    const len = (e: KeyboardEvent): void => {
      if (e.key === 'Control') dat(false);
    };
    const tha = (): void => dat(false);
    window.addEventListener('keydown', xuong);
    window.addEventListener('keyup', len);
    window.addEventListener('blur', tha);
    return () => {
      window.removeEventListener('keydown', xuong);
      window.removeEventListener('keyup', len);
      window.removeEventListener('blur', tha);
      dat(false);
    };
  }, []);

  // Hồ sơ có thêm thẻ → thẻ thu nhỏ rơi xuống dưới nút Hồ sơ rồi bay vào nút (`TheMoiMvp`), kèm tiếng chuông như
  // prototype; thẻ ghi vào danh sách "chưa xem" (nhãn MỚI trong khung Hồ sơ). Thẻ đến khi đợt trước còn bay → xếp hàng.
  // Hồ sơ mất thẻ (nạp ván khác, chơi lại) → không báo, đặt lại mốc và bỏ danh sách chưa xem.
  const [dotTheMoi, setDotTheMoi] = useState<TheMoi[][]>([]);
  const xongDotTheMoi = useCallback(() => setDotTheMoi((d) => d.slice(1)), []);
  const hoSoTruoc = useRef(s ? s.hoSo : null);
  const themChuaXem = useTheChuaXem((k) => k.them);
  const boChuaXem = useTheChuaXem((k) => k.daXemHet);
  useEffect(() => {
    const hoSo = s ? s.hoSo : null;
    if (hoSo === hoSoTruoc.current) return;
    const ids = maMoi(hoSoTruoc.current, hoSo);
    hoSoTruoc.current = hoSo;
    if (ids === null) {
      boChuaXem();
      setDotTheMoi([]);
      return;
    }
    if (!s || ids.length === 0) return;
    soundEngine.playSfx('clue_unlock');
    themChuaXem(ids);
    const dot = theMoiTuMa(kb, s, ids);
    if (dot.length > 0) setDotTheMoi((d) => [...d, dot]);
  }, [s, kb, themChuaXem, boChuaXem]);
  // Gói B18: vừa biết thêm một ô thẻ nhân vật (`[BIẾT]`) → một dòng báo nhỏ, cùng kênh với "Sổ cá nhân có dòng mới". Chỉ báo
  // người đã có thẻ (đã giới thiệu); đổi ván (nạp, chơi lại) thì đặt lại mốc, không báo.
  const bietVeTruoc = useRef<{ van: number; bietVe: TrangThaiMvp['bietVe'] }>({ van: s?.batDauLuc ?? 0, bietVe: s?.bietVe });
  useEffect(() => {
    if (!s) return;
    const truoc = bietVeTruoc.current;
    bietVeTruoc.current = { van: s.batDauLuc, bietVe: s.bietVe };
    if (truoc.van !== s.batDauLuc || !s.bietVe || s.bietVe === truoc.bietVe) return;
    for (const [ma, ds] of Object.entries(s.bietVe)) {
      const cu = truoc.bietVe?.[ma] ?? [];
      const moi = ds.filter((t) => !cu.includes(t));
      if (moi.length === 0 || !(s.daGioiThieu ?? []).includes(ma)) continue;
      const ten = kb.nhanVat.find((n) => n.id === ma)?.ten ?? ma;
      baoToast(`Hồ sơ ${ten}: biết thêm ${moi.map((t) => NHAN_TRUONG_BIET[t]).join(', ')}`);
    }
  }, [s, kb, baoToast]);
  // Sổ cá nhân tự có dòng mới ([GHI SỔ], QĐ-092) → báo, để người chơi biết mà mở xem.
  const soTrangTruoc = useRef(s ? s.soTay.length : 0);
  useEffect(() => {
    const dem = s ? s.soTay.length : 0;
    if (dem > soTrangTruoc.current) {
      const moi = s ? kb.soTay[s.soTay[dem - 1] ?? ''] : undefined;
      soundEngine.playSfx('page');
      baoToast(moi?.chuThich ? `Sổ cá nhân có dòng mới: ${moi.chuThich.replace(/`/g, '')}` : 'Sổ cá nhân có dòng mới.');
    }
    soTrangTruoc.current = dem;
  }, [s, kb, baoToast]);

  const kn: KhungNhinMvp | null = s ? khungNhin(kb, s) : null;
  const loaiKn = kn?.kind;
  useEffect(() => {
    if (loaiKn !== 'line' && loaiKn !== 'feedback') setSkipMode(false);
  }, [loaiKn, setSkipMode]);
  // Ô lưu cũ trỏ vào một nút máy tự chạy qua (nội dung đổi làm lệch số thứ tự nút) hoặc vượt quá độ dài chuỗi (gọt bớt dòng): tự chạy tiếp thay vì báo lỗi.
  const lechConTro = kn?.kind === 'error' && (/không phải nút cần người chơi/.test(kn.message) || /hết nút/.test(kn.message));
  useEffect(() => {
    if (lechConTro) hanhDong({ type: 'sua-con-tro' });
  }, [lechConTro, hanhDong]);
  // Tiếng "rung" khi nhân vật sững sờ (như prototype).
  const bieuCamNoi = kn?.kind === 'line' || kn?.kind === 'feedback' ? kn.loi.expression : undefined;
  useEffect(() => {
    if (bieuCamNoi === 'stunned') soundEngine.playSfx('shake');
  }, [bieuCamNoi]);
  // Khoảnh khắc phản bác (`[HIỆU ỨNG]`, màn rung) → tiếng búa.
  useEffect(() => {
    if (loaiKn === 'effect') soundEngine.playSfx('objection');
  }, [loaiKn]);

  // Nhạc nền theo cảnh (engine/nhac.ts). Bài bước trước giữ trong ref để màn ngắn chen giữa thoại không đổi bài.
  const nhacTruoc = useRef<NhacTruoc | null>(null);
  useEffect(() => {
    const nhac = chonNhacNen(s ? khungNhin(kb, s) : null, s, nhacTruoc.current);
    nhacTruoc.current = { nhac, chuoi: s?.conTro?.chuoi ?? null };
    soundEngine.chonNhac(nhac);
  }, [kb, s]);

  // Nhìn trước kịch bản: tải sẵn nền / chân dung / ảnh chèn của vài chuỗi sắp tới (tai-truoc-mvp.ts) để cảnh mới không hiện trễ.
  const chuoiHienTai = s?.conTro?.chuoi;
  const nutHienTai = s?.conTro?.nut;
  const ngayHienTai = s?.ngay;
  useEffect(() => {
    const st = useKhoMvp.getState().trangThai;
    if (st) taiTruocTheoVan(kb, st);
  }, [kb, chuoiHienTai, nutHienTai, ngayHienTai]);

  const dongKho = useCallback(() => setKho(null), []);
  const choiLai = useCallback(() => {
    clearBacklog();
    setGioiThieuMo(null);
    xoa();
    batDau();
  }, [clearBacklog, xoa, batDau]);

  // Khung hỏi nhân chứng "Không xưng tên" mở lần đầu: thẻ "Nhân vật mới" bật ngay (hook phải đứng trước lệnh return sớm).
  const theNhanChung = s && kn && kn.kind === 'hoi-dap' ? canGioiThieu(kb, s, kn) : null;
  useEffect(() => {
    if (theNhanChung) setGioiThieuMo(theNhanChung);
  }, [theNhanChung]);

  if (!s || !kn) return null;
  const laTheChu = kn.kind === 'line' && kn.display === 'card';
  const dienTen = (t: string): string => dienTenMay(kb, s, t);
  /** Số thứ tự của một vụ sau (vụ gốc là 1). */
  const soVu = (id: string): number => (kb.lich.vuSau ?? []).findIndex((v) => v.id === id) + 2;
  // Thẻ giới thiệu chỉ được mở sau câu tự giới thiệu và cú bấm tiếp của người chơi.
  const gioiThieu = canGioiThieu(kb, s, kn);
  const tiep = (): void => {
    if (gioiThieu) {
      setGioiThieuMo(gioiThieu);
      return;
    }
    hanhDong({ type: 'tiep' });
  };
  const dongGioiThieu = (nhanVat: string): void => {
    hanhDong({ type: 'da-gioi-thieu', nhanVat });
    setGioiThieuMo(null);
    // Gói B15 (mục F, bộ mùa 1): thẻ mở sau cú bấm "Tiếp tục" ở câu tự xưng, nên đóng thẻ là sang câu kế luôn, không đứng lại
    // câu cũ bắt bấm thêm lần nữa. Bộ MVP giữ như cũ.
    if (dieuHuongTuDo(kb)) hanhDong({ type: 'tiep' });
  };
  const modalMo = kho !== null || lichSuMo || luuNap !== null || caiDat || lichMo || gioiThieuMo !== null || cachChoiMo;
  // Gói B17: hai mức chỉ áp cho bộ mùa 1 (cờ điều hướng tự do); bộ MVP không truyền, các màn chạy như cũ.
  const coMuc = dieuHuongTuDo(kb);
  const mucNhapVai = coMuc ? mucNhapVaiCua(s) : undefined;
  const mucSql = coMuc ? mucSqlCua(s) : undefined;
  const loiHienTai: { speaker: string; expression?: string } | null =
    kn.kind === 'line' || kn.kind === 'feedback'
      ? kn.loi
      : kn.kind === 'question' || kn.kind === 'branch'
        ? { speaker: kn.nut.asker.speaker }
        : kn.kind === 'create-character'
          ? kn.nut.asker
          : kn.kind === 'hoi-dap'
            ? // Buổi hỏi: nhân chứng đứng trên dàn như người đang nói chuyện.
              { speaker: kn.hoiDap.nhanChung }
            : null;
  const dem = s.giaiDoan === 'ngay' && s.khung >= kb.lich.khung.length;
  const rung = kn.kind === 'effect' || loiHienTai?.expression === 'stunned';
  const laDoc = viewportMode === 'mobile';
  const laGiaLap = laDoc && typeof window !== 'undefined' && window.innerWidth > 768 && window.matchMedia('(orientation: portrait)').matches;
  const noiDangO = kn.kind === 'chon-dia-diem' && dangO && dangO.ngay === s.ngay ? kn.diaDiem.find((d) => d.diaDiem.id === dangO.noi) : undefined;

  // Bảng người quan sát (`?facilitator=1`): nhảy tới phần SQL = máy tự chơi ván mới tới đó (engine/tu-choi.ts).
  const quanSat = typeof window !== 'undefined' && isFacilitatorMode(window.location.search);
  const nhay = (id: string): string | null => {
    let moi: TrangThaiMvp;
    try {
      moi = DIEM_NHAY_MVP.some((d) => d.id === id) ? nhayToi(kb, id as MaDiemNhayMvp) : nhayToiDauChuong(kb, id);
    } catch (e) {
      return e instanceof Error ? e.message : String(e);
    }
    clearBacklog();
    setKho(null);
    setLichSuMo(false);
    setLuuNap(null);
    setDangO(null);
    setGioiThieuMo(null);
    datTrangThai(moi);
    return null;
  };
  // Lùi lại một bước (nút Lùi ở hộp thoại, phím ←): về đúng trạng thái trước cú bấm gần nhất, bỏ câu đang hiện khỏi lịch sử.
  // Khi gặp ảnh chèn (chibi/CG), lùi thẳng về trước ảnh (bỏ qua ảnh) để người chơi đọc lại thoại thay vì kẹt ở ảnh.
  const lui = (): void => {
    const dangLaLoi = kn.kind === 'line' || kn.kind === 'feedback';
    if (useVnStore.getState().autoMode) useVnStore.getState().toggleAutoMode();
    setSkipMode(false);
    setGioiThieuMo(null);
    if (luiKho((st) => khungNhin(kb, st).kind === 'image') && dangLaLoi) popBacklog();
  };
  const bangQuanSat = quanSat ? <BangQuanSatMvp kb={kb} s={s} loaiManHinh={kn.kind} onNhay={nhay} /> : null;

  // User 06/10: nút "Hồ sơ" dưới khung trùng với "Hồ sơ" trên HUD nên bỏ; nút "Tiếp tục" vào trong khung thoại.
  // Thanh đọc thoại chỉ giữ các điều khiển đọc (Lùi, Tự động, Tua, Lịch sử, Ẩn UI); Lưu / Nạp / Cài đặt quản lý ở Menu ≡.
  const nutVn = {
    keyboardEnabled: !modalMo,
    nutTiepTrongKhung: true,
    onOpenBacklog: () => setLichSuMo(true),
    onBack: coTheLui ? lui : undefined,
  };

  const noiDung = (() => {
    switch (kn.kind) {
      case 'line':
        return <DialogBox line={thanhLine(kb, s, kn.loi)} display={kn.display === 'card' ? 'card' : 'dialog'} speakerName={tenNguoiNoi(kb, kn.loi.speaker, s)} onAdvance={tiep} {...nutVn} />;
      case 'feedback':
        return <DialogBox line={thanhLine(kb, s, kn.loi)} hint={`Phản hồi ${kn.viTri + 1}/${kn.tong}`} speakerName={tenNguoiNoi(kb, kn.loi.speaker, s)} onAdvance={tiep} {...nutVn} />;
      case 'chon-dia-diem':
        return noiDangO ? (
          <NoiMvp
            key={noiDangO.diaDiem.id}
            kb={kb}
            noi={noiDangO}
            khung={kb.lich.khung[s.khung]?.id ?? null}
            khungConLai={kn.khungConLai}
            onChon={(duKien) => hanhDong({ type: 'chon-du-kien', diaDiem: noiDangO.diaDiem.id, duKien })}
            onVeBanDo={() => setDangO(null)}
          />
        ) : (
          <BanDoMvp
            banDo={BAN_DO_MVP}
            diaDiem={kn.diaDiem}
            khungConLai={kn.khungConLai}
            chinhXong={s.chinhXong}
            tenBuoiToi={kb.lich.buoiToi.ten}
            onDen={(noi) => setDangO({ ngay: s.ngay, noi })}
            onKetThucNgay={() => hanhDong({ type: 'ket-thuc-ngay' })}
          />
        );
      case 'question': {
        const q = {
          id: kn.nut.id,
          asker: { speaker: kn.nut.asker.speaker, text: dienTen(kn.nut.asker.text) },
          choices: kn.nut.choices.map((c) => ({ id: c.id, text: dienTen(c.text), correct: c.correct, feedback: [] })),
        } as unknown as MultipleChoiceQuestion;
        return <MultipleChoice question={q} attempts={kn.lanThu} gameKey={s.batDauLuc} askerLabel={tenNguoiNoi(kb, kn.nut.asker.speaker, s)} onChoose={(id) => hanhDong({ type: 'chon', luaChon: id })} anNhacChon />;
      }
      case 'doi-chat':
        return (
          <DoiChatMvp
            key={kn.nut.id}
            kb={kb}
            s={s}
            nut={kn.nut}
            daTrinh={kn.daTrinh}
            muc={kn.muc}
            conLuot={kn.conLuot}
            dienTen={dienTen}
            tenNguoiNoi={(ma) => tenNguoiNoi(kb, ma, s)}
            onTrinh={(the) => hanhDong({ type: 'trinh-the', the })}
            onChuaDu={() => hanhDong({ type: 'chua-du' })}
          />
        );
      case 'branch':
        return (
          <div className="mc mvp-renhanh" role="group" aria-labelledby="mvp-renhanh-hoi">
            <div className="mc__overlay" aria-label="Các lựa chọn">
              <ul className="mc__choices">
                {kn.luaChon.map((c) => (
                  <li key={c.id} className="mc__choice-item">
                    <button type="button" className="mc__choice" onClick={() => hanhDong({ type: 'chon', luaChon: c.id })}>
                      <span className="mc__choice-text">
                        <CodeText text={dienTen(c.text)} />
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div className="dialog-container mc__dialog-container">
              <div className="dialog dialog--glass" data-speaker={kn.nut.asker.speaker}>
                {/* Câu rẽ nhánh do người dẫn truyện hỏi (cảnh chạy đêm): không có nhãn tên. */}
                {tenNguoiNoi(kb, kn.nut.asker.speaker, s) ? (
                  <div className="dialog__speaker">
                    <span>{tenNguoiNoi(kb, kn.nut.asker.speaker, s)}</span>
                  </div>
                ) : null}
                <p id="mvp-renhanh-hoi" className="dialog__text mc__prompt">
                  <CodeText text={dienTen(kn.nut.asker.text)} />
                </p>
                <div className="mc__status-bar">
                  <span className="mc__note">Chọn là chốt, không quay lại được.</span>
                </div>
              </div>
            </div>
          </div>
        );
      case 'line-pick':
        return (
          <div className="mvp-lop" role="group" aria-label="Chọn dòng SQL">
            <p className="mvp-lop__huongdan">{kn.lanThu > 0 ? 'Chưa đúng dòng — chọn lại.' : 'Chọn dòng có vấn đề.'}</p>
            <ul className="mc__choices">
              {kn.nut.lines.map((d) => (
                <li key={d.index} className="mc__choice-item">
                  <button type="button" className="mc__choice mono" onClick={() => hanhDong({ type: 'chon-dong', index: d.index })}>
                    <span className="mc__choice-text">
                      {d.sql}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        );
      case 'show-document':
        return <TaiLieuMvp kb={kb} id={kn.documentId} dienTen={dienTen} onCat={tiep} />;
      case 'image':
        return <AnhChenMvp key={kn.imageId} id={kn.imageId} onTiep={tiep} onBack={coTheLui ? lui : undefined} />;
      case 'challenge':
      case 'fix-query': {
        // Gói B13: màn tra lùi được về cảnh đã mở nó (bộ điều hướng tự do; buổi họp, bộ MVP thì không).
        const luiVe = kn.kind === 'challenge' ? canhLuiThuThach(kb, s) : null;
        const tenCanhRoi = luiVe ? kb.canh.find((c) => c.id === luiVe.canh)?.ten : undefined;
        return (
          <PhongTraMvp
            onDaXemTruyVan={(query, loi) => ghiNhanTruyVan(query, loi, s, lanDoiVan)}
            key={`${kn.thuThach.id}-${kn.kind}`}
            kb={kb}
            s={s}
            duLieu={kb.duLieu}
            the={kn.thuThach}
            mode={kn.kind}
            dienTen={dienTen}
            giayNho={giaTriTuHoSo(kb, s.hoSo, s.bang?.ghiChuTruyVan ?? [], s.bang?.boGhim)}
            noi={kb.canh.find((c) => c.id === s.canh)?.ten}
            onDoiCho={(the, x, y) => hanhDong({ type: 'doi-cho-the', the, x, y })}
            onDoiMau={(the, mau) => hanhDong({ type: 'doi-mau-ghim', the, mau })}
            onXong={(dung, phieu, ghiChu) => hanhDong({ type: 'xong-thu-thach', thuThach: kn.thuThach.id, dung, ...(phieu ? { phieu } : {}), ...(ghiChu?.length ? { ghiChu } : {}) })}
            {...(luiVe ? { onRoi: () => hanhDong({ type: 'roi-thu-thach' }), ...(tenCanhRoi ? { tenCanhRoi } : {}) } : {})}
            {...(mucSql ? { mucSql } : {})}
            {...(mucNhapVai ? { mucNhapVai } : {})}
          />
        );
      }
      case 'effect':
        return isEffectId(kn.effectId) ? <ObjectionEffect effectId={kn.effectId} onDone={tiep} /> : <HieuUngLa onDone={tiep} />;
      case 'projector':
        return <ManChieuMvp onDaXemTruyVan={(sql) => ghiNhanTruyVan({ id: `chieu:${s.conTro?.chuoi}:${s.conTro?.nut}`, nhan: 'Màn chiếu buổi họp', sql }, [], s, lanDoiVan)} kb={kb} duLieu={kb.duLieu} nut={kn.nut} onTiep={tiep} />;
      case 'notebook-lookup':
        return <TraSoMvp kb={kb} trang={kn.trang} dienTen={dienTen} onTiep={tiep} />;
      case 'trial-filter':
        return <LocThuV7 onDaXemTruyVan={(query, loi) => ghiNhanTruyVan(query, loi, s, lanDoiVan)} key={`${lanDoiVan}:${kn.nut.id}`} duLieu={kb.duLieu} nut={kn.nut} onChon={(giaTri) => hanhDong({ type: 'chon-o', giaTri })} />;
      case 'create-character':
        return (
          <TaoNhanVatMvp
            key={`${s.conTro?.chuoi ?? ''}-${s.conTro?.nut ?? 0}`}
            kb={kb}
            nut={kn.nut}
            dienTen={dienTen}
            onDatTen={(ten) => hanhDong({ type: 'dat-ten', ten })}
            onChonNganh={(nganh) => hanhDong({ type: 'chon-nganh', nganh })}
          />
        );
      case 'hoi-dap':
        return (
          <HoiDapMvp
            key={kn.hoiDap.to.ma}
            kb={kb}
            hoiDap={kn.hoiDap}
            dienTen={dienTen}
            tenNguoiNoi={(ma) => tenNguoiNoi(kb, ma, s)}
            tenNguoiChoi={s.tenNguoiChoi}
            onHanhDong={hanhDong}
          />
        );
      case 'explore':
        return <KhamPhaMvp kb={kb} id={kn.nut.id} canh={s.canh} diem={kn.diem} kieu={kn.nut.kieu} nhanVat={kn.nut.nhanVat} daGap={[...(s.daGioiThieu ?? []), ...(s.daNoi ?? [])]} homNay={homNayChu(kb, s)} thu={thuHomNay(kb, s)} gio={kn.nut.gio} dang={kn.nut.dang} haVySoi={kn.nut.haVySoi} onXem={(chuoi) => hanhDong({ type: 'xem-diem', chuoi })} roi={kn.roi ?? null} onRoi={() => hanhDong({ type: 'roi-canh' })} hetNgay={kn.hetNgay ?? null} onHetNgay={() => hanhDong({ type: 'het-ngay' })} {...(mucNhapVai ? { mucNhapVai } : {})} />;
      case 'end':
        return (
          <KetMvp
            ketQua={kn.ketQua}
            vu={kn.vu ? { id: kn.vu.id, so: soVu(kn.vu.id), ten: kn.vu.ten, tieuDeKet: dienTen(kn.vu.tieuDeKet), loiKet: dienTen(kn.vu.loiKet) } : null}
            vuKe={kn.vuKe ? { so: soVu(kn.vuKe.id), ten: kn.vuKe.ten } : null}
            onSangVuSau={() => {
              clearBacklog();
              hanhDong({ type: 'sang-vu-sau' });
            }}
            phu={kn.phu.map((p) => ({ id: p.id, ten: p.ten, nguoiGiao: tenNguoiNoi(kb, p.nguoiGiao) }))}
            phuDangDo={kn.phuDangDo.map((p) => ({ id: p.id, ten: p.ten, nguoiGiao: tenNguoiNoi(kb, p.nguoiGiao) }))}
            onLamPhu={(id) => {
              clearBacklog();
              hanhDong({ type: 'lam-nhiem-vu-phu', id });
            }}
            phuXong={kn.phuXong ? { ten: kn.phuXong.ten, tieuDeKet: dienTen(kn.phuXong.tieuDeKet), loiKet: dienTen(kn.phuXong.loiKet) } : null}
            onXongPhu={() => {
              clearBacklog();
              hanhDong({ type: 'xong-nhiem-vu-phu' });
            }}
            tongKet={kn.phuXong ? null : tongKetVu(kb, s, kn.vu ? kn.vu.chuoi : null)}
            onChoiLai={choiLai}
            onVeTieuDe={onVeTieuDe}
          />
        );
      case 'error':
        if (lechConTro) return null;
        return (
          <div className="game__error" role="alert">
            <p>Nội dung không nhất quán: {kn.message}</p>
            <p>Chạy `npm run kiem-noi-dung:mvp` để tìm lỗi; hoặc bắt đầu lại từ menu.</p>
          </div>
        );
    }
  })();

  const game = (
    <div className={`game mvp-game${laDoc ? ' game--portrait' : ''}${gioiThieuMo ? ' game--debut' : ''}`}>
      {toast ? <div className="vn-toast" role="status">{toast}</div> : null}
      {coBanPhim ? (
        <button type="button" className="mvp-thu-ban-phim" onClick={thuBanPhim} aria-label="Thu bàn phím">
          Xong
        </button>
      ) : null}
      {dotTheMoi[0] ? <TheMoiMvp key={dotTheMoi[0].map((t) => t.id).join('|')} danhSach={dotTheMoi[0]} dienTen={dienTen} onXong={xongDotTheMoi} /> : null}
      {gioiThieuMo ? <GioiThieuMvp key={gioiThieuMo} kb={kb} nhanVat={gioiThieuMo} bietVe={s.bietVe ?? null} onDong={dongGioiThieu} /> : null}
      <HudMvp
        kb={kb}
        s={s}
        soHoSo={soHoSo(s)}
        soTrangSo={s.soTay.length}
        onMoHoSo={() => setKho('ho-so')}
        onMoSoTay={() => setKho('so-tay')}
        onMoLuu={() => setLuuNap('save')}
        onMoNap={() => setLuuNap('load')}
        onMoLichSu={() => setLichSuMo(true)}
        onMoCaiDat={() => setCaiDat(true)}
        {...(coMuc ? { onMoCachChoi: () => setCachChoiMo(true) } : {})}
        onBatDauLai={choiLai}
        onVeTieuDe={onVeTieuDe}
        onMoLich={() => setLichMo(true)}
        onTamDungViecPhu={() => hanhDong({ type: 'tam-dung-nhiem-vu-phu' })}
        onMoBangHoatDong={() => setBangHoatDongMo(true)}
        onLui={coTheLui ? lui : undefined}
        loiThoai={kn.kind === 'line' || kn.kind === 'feedback' ? thanhLine(kb, s, kn.loi) : undefined}
      />
      {bangHoatDongMo && s ? (
        <BangHoatDongMvp
          cacViec={phuMoDuoc(kb, s).map((p) => ({ id: p.id, ten: p.ten, nguoiGiao: tenNguoiNoi(kb, p.nguoiGiao) }))}
          viecDangDo={[
            ...(s.phu?.tamDung ? [s.phu.id] : []),
            ...(s.phuCho ?? []).map((p) => p.id),
          ].map((id) => (kb.lich.nhiemVuPhu ?? []).find((p) => p.id === id)).filter((p): p is NonNullable<typeof p> => !!p).map((p) => ({ id: p.id, ten: p.ten }))}
          onTiepTuyenChinh={() => setBangHoatDongMo(false)}
          onChonViec={(id) => {
            setBangHoatDongMo(false);
            hanhDong({ type: 'lam-nhiem-vu-phu', id });
          }}
        />
      ) : null}
      <SanKhauMvp
        kb={kb}
        canh={noiDangO ? noiDangO.diaDiem.canh : s.canh}
        dem={dem}
        speaker={loiHienTai?.speaker}
        expression={loiHienTai?.expression}
        {...(s.raDan?.length ? { raDan: s.raDan } : {})}
        {...(s.vaoDan?.length ? { vaoDan: s.vaoDan } : {})}
        // Gói B18: ai có lời trong chuỗi đang chạy thì ở hàng trước, người khác đang trên dàn lùi hàng sau.
        thamGia={nguoiThamGia(kb, s.conTro?.chuoi, s.vaoDan ?? [], s.raDan ?? [])}
        xoaDan={kn.kind === 'explore' || kn.kind === 'chon-dia-diem'}
        nghi={kn.kind === 'line' && kn.loi.speaker === 'player' && /^\(.*\)$/s.test(kn.loi.text.trim())}
        shaking={rung}
        coDan={!laTheChu && !['chon-dia-diem', 'explore', 'image', 'show-document', 'end', 'projector', 'trial-filter', 'notebook-lookup', 'line-pick'].includes(kn.kind)}
        tenNguoiChoi={s.tenNguoiChoi}
        // Việc nhắc chỉ hiện khi sân khấu còn là cảnh (màn tra, tài liệu, ảnh chèn, màn chiếu, thẻ chữ… thì ẩn).
        nhacViec={laTheChu || ['chon-dia-diem', 'image', 'show-document', 'end', 'projector', 'trial-filter', 'notebook-lookup', 'line-pick', 'challenge', 'fix-query'].includes(kn.kind) ? null : s.nhacViec}
        dienTen={dienTen}
        isCard={laTheChu}
        dongHanh={kn.kind === 'hoi-dap' ? (
          // Buổi hỏi (gói B12): góc phải là bạn đi cùng gợi ý bằng bóng thoại, thay cho khung trò chuyện.
          <BanDiCungHoiDapMvp kb={kb} hoiDap={kn.hoiDap} dienTen={dienTen} tenNguoiNoi={(ma) => tenNguoiNoi(kb, ma, s)} onHanhDong={hanhDong} />
        ) : (
          <>
            <DongHanhMvp
              key={JSON.stringify([lanDoiVan, s.batDauLuc, s.conTro, s.hoiDap?.viTri, kn.kind, gioiThieuMo, laTheChu])}
              kb={kb}
              s={s}
              diaDiem={kn.kind === 'explore' && kn.nut.kieu === 'ban-do' ? 'Đại học Chấn Hưng' : undefined}
              // Có cả ở cảnh khám phá (user 05/10): chi tiết ẩn không còn phát sáng, người chơi bí thì hỏi bạn đi cùng ngay tại đó.
              visible={['line', 'feedback', 'question', 'branch', 'doi-chat', 'explore'].includes(kn.kind) && !gioiThieuMo && !laTheChu}
            />
            {/* Gói B17, "Có người dẫn": ở cảnh còn việc chính mà 40 giây không bấm gì thì bạn đi cùng tự nhắc. */}
            {mucNhapVai === 'dan' && kn.kind === 'explore' && !gioiThieuMo ? <NhacDanMvp kb={kb} s={s} kn={kn} tam={modalMo} /> : null}
          </>
        )}
      >
        {noiDung}
      </SanKhauMvp>

      {kho ? (
        <HoSoMvp
          kb={kb}
          trangThai={s}
          onDoiCho={(the, x, y) => hanhDong({ type: 'doi-cho-the', the, x, y })}
          onDoiMau={(the, mau) => hanhDong({ type: 'doi-mau-ghim', the, mau })}
          onGhim={(the, ghim) => hanhDong({ type: 'ghim-the', the, ghim })}
          hoSo={s.hoSo}
          soTay={s.soTay}
          tenNguoiChoi={s.tenNguoiChoi}
          nganh={s.nganh}
          daGap={s.daGioiThieu ?? []}
          tab={kho}
          onDoiTab={setKho}
          dienTen={dienTen}
          onDong={dongKho}
        />
      ) : null}
      {lichMo ? <LichMvp kb={kb} s={s} onDong={() => setLichMo(false)} /> : null}
      <BacklogModal open={lichSuMo} onClose={() => setLichSuMo(false)} />
      <AudioSettingsModal open={caiDat} onClose={() => setCaiDat(false)} />
      {cachChoiMo && mucNhapVai && mucSql ? (
        <ChonMucMvp
          nhapVai={mucNhapVai}
          sql={mucSql}
          nhanNut="Áp dụng"
          onDong={() => setCachChoiMo(false)}
          onXong={(nhapVai, sql) => {
            ghiMucDaChon({ nhapVai, sql });
            hanhDong({ type: 'doi-muc', nhapVai, sql });
            setCachChoiMo(false);
          }}
        />
      ) : null}
      {luuNap ? (
        <LuuNapMvp
          mode={luuNap}
          oLuu={oLuu}
          coTienDo={kn.kind !== 'end'}
          canhHienTai={noiDangO ? noiDangO.diaDiem.canh : s.canh}
          onLuu={(o) => {
            luuVaoO(o, nhanTienDo(s));
            baoToast(`Đã lưu vào ô ${o + 1}.`);
            setLuuNap(null);
          }}
          onNap={(o) => {
            const moi = napTuO(o);
            if (moi) {
              clearBacklog();
              baoToast(`Đã nạp ô ${o + 1}: ${nhanTienDo(moi)}.`);
            }
            setLuuNap(null);
          }}
          onDong={() => setLuuNap(null)}
        />
      ) : null}
    </div>
  );

  // Điện thoại nằm ngang (cao ≤ 500 px, màn cảm ứng): màn tra và khay hồ sơ không đủ chỗ → phủ lời nhắc xoay dọc.
  // Ẩn/hiện bằng stylesheet dùng chung cả màn mở đầu; xoay ngang để tiếp tục.
  const nhacXoay = (
    <div className="mvp-xoay" role="status">
      <span className="mvp-xoay__may" aria-hidden="true" />
      <p className="mvp-xoay__chu">Xoay ngang điện thoại để chơi</p>
      <p className="mvp-xoay__phu">Game được thiết kế để chơi ngang xuyên suốt các màn.</p>
      <button type="button" className="mvp-xoay__tai-lai" onClick={() => window.location.reload()}>
        Đã xoay mà vẫn thấy dòng này? Bấm để tải lại
      </button>
    </div>
  );

  if (laGiaLap) {
    return (
      <div className="game-simulator-backdrop">
        <div className="game-simulator-bezel">
          <div className="game-simulator-island">
            <div className="game-simulator-island-camera" />
          </div>
          <HighlightProvider engine={highlightEngine}>{game}</HighlightProvider>
          <div className="game-simulator-home-bar" />
        </div>
        {bangQuanSat}
        {nhacXoay}
      </div>
    );
  }
  return (
    <>
      <HighlightProvider engine={highlightEngine}>{game}</HighlightProvider>
      {bangQuanSat}
      {nhacXoay}
    </>
  );
}

/** Hiệu ứng không có trong `EFFECT_IDS` của prototype: bỏ qua ngay (không chặn người chơi). */
function HieuUngLa({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    onDone();
  }, [onDone]);
  return null;
}

function BangHoatDongMvp({
  cacViec,
  viecDangDo,
  onTiepTuyenChinh,
  onChonViec,
}: {
  cacViec: { id: string; ten: string; nguoiGiao: string }[];
  viecDangDo: { id: string; ten: string }[];
  onTiepTuyenChinh: () => void;
  onChonViec: (id: string) => void;
}) {
  return (
    <div className="mvp-hoatdong__nen" role="presentation">
      <section className="mvp-hoatdong" role="dialog" aria-modal="true" aria-labelledby="mvp-hoatdong-tieude">
        <h2 id="mvp-hoatdong-tieude">Bảng hoạt động</h2>
        <p>Vụ chính vẫn giữ nguyên chỗ bạn đang điều tra. Có thể ghé giúp bạn bè một việc rồi quay lại bất cứ lúc nào.</p>
        <div className="mvp-hoatdong__ds">
          <button type="button" className="btn btn--primary" onClick={onTiepTuyenChinh} autoFocus>
            Trở về tuyến chính
          </button>
          {viecDangDo.map((v) => (
            <button key={v.id} type="button" className="btn" onClick={() => onChonViec(v.id)}>
              Tiếp tục việc đã cất · {v.ten}
            </button>
          ))}
          {cacViec.map((v) => (
            <button key={v.id} type="button" className="btn" onClick={() => onChonViec(v.id)}>
              {v.nguoiGiao} nhờ · {v.ten}
            </button>
          ))}
        </div>
        {cacViec.length === 0 && viecDangDo.length === 0 ? <p className="mvp-hoatdong__trong">Chưa có việc phụ mới. Cứ tiếp tục khám phá nhé.</p> : null}
      </section>
    </div>
  );
}
