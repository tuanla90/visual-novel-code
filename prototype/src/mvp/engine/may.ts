/**
 * MÁY CHẠY KỊCH BẢN MVP — thuần, không React, không store (gói kien-truc-mvp).
 *
 * Hai hàm chính:
 *   - `khungNhin(kb, s)`   → thứ giao diện cần vẽ (lời, danh sách địa điểm, câu hỏi, thử thách…);
 *   - `xuLy(kb, s, hd)`    → trạng thái mới sau một hành động của người chơi (không đổi `s`).
 * Sau mỗi hành động máy "chạy tới nút cần người chơi": nút tự động (ghi chú, nhiệm vụ, hậu quả, `[ĐI TỚI]`,
 * `[RẼ KẾT]`…) xử lý ngay; hết chuỗi thì theo `boiCanh` (trang-thai.ts).
 *
 * Luật nhịp (QĐ-086/089/090, docs/dac-ta §18.4–18.7):
 *   - Mỗi ngày 3 khung; xem một dữ kiện tốn `tonKhung.moiDuKien` của địa điểm, lần đầu vào địa điểm trong ngày
 *     tốn thêm `tonKhung.vao`; đi lại giữa địa điểm KHÔNG tốn khung.
 *   - Hết khung mà chưa có dữ kiện chính → chuỗi "Cuối ngày" (`buoiToi`) dẫn tới dữ kiện chính; xong → hết ngày.
 *     Có dữ kiện chính rồi mà hết khung → hết ngày. Người chơi cũng được kết thúc ngày sớm.
 *   - Ngày họp: `[HỎI … · trừ uy tín]` sai → mất 1 vạch, lời `[KHI MẤT UY TÍN]`, chọn lại; hết vạch → lời `[HẾT VẠCH]`
 *     rồi hoãn: quay lại đầu chuỗi ngày họp với đủ vạch (cách đơn giản nhất — xem báo cáo gói).
 *   - `[RẼ KẾT]`: kết thật nếu `[ĐIỀU KIỆN]` đầu chuỗi kết thật thỏa, không thì kết thường.
 *   - `[TẠO NHÂN VẬT]`: chưa có màn tạo nhân vật (gói `tao-nhan-vat`) → dùng `TEN_MAC_DINH` / ngành đầu danh sách.
 */
import type {
  ChuoiMvp,
  DiaDiemMvp,
  DieuKienMvp,
  DuKienMvp,
  HauQuaMvp,
  KichBanMvp,
  LoiMvp,
  MocMvp,
  NutMvp,
  TheThuThachMvp,
} from '../../content/mvp/types';
import type { BoiCanhChuoi, TrangThaiMvp } from './trang-thai';

/** Tên người chơi khi chưa có màn tạo nhân vật (người chơi là nam, QĐ-087). */
export const TEN_MAC_DINH = 'Khôi';

/** Mốc "ngày họp" và "buổi tối" theo cách đánh số của bộ sinh (`ChuoiMvp.mocSomNhat`). */
const MOC_NGAY_HOP = 1000;
const KHUNG_TOI = 9;

// ---------- Hành động ----------

export type HanhDongMvp =
  /** Qua lời / phản hồi / tài liệu / màn chiếu / hiệu ứng / trang sổ. */
  | { type: 'tiep' }
  | { type: 'chon-du-kien'; diaDiem: string; duKien: string }
  /** Kết thúc ngày sớm (còn khung nhưng không muốn dùng). */
  | { type: 'ket-thuc-ngay' }
  /** Chọn một lựa chọn của câu hỏi / rẽ nhánh / chép sổ. */
  | { type: 'chon'; luaChon: string }
  /** Chọn dòng SQL ở `[CHỌN DÒNG]`. */
  | { type: 'chon-dong'; index: number }
  /** Chọn một ô ở `[LỌC THỬ]` (giá trị cột phải chọn). */
  | { type: 'chon-o'; giaTri: string }
  /** Màn thử thách / sửa truy vấn báo đã xong (vật chứng của thẻ vào hồ sơ). */
  | { type: 'xong-thu-thach'; thuThach: string };

// ---------- Khung nhìn ----------

export interface DuKienHienMvp {
  duKien: DuKienMvp;
  /** Tổng khung sẽ tốn nếu chọn (kể cả phí vào địa điểm lần đầu trong ngày). */
  tonKhung: number;
  /** Đã xong (một lần) — hiện mờ, không chọn được. */
  daLam: boolean;
  /** Chưa đủ điều kiện `Cần:` — hiện khóa. */
  khoa: boolean;
}

export interface DiaDiemHienMvp {
  diaDiem: DiaDiemMvp;
  duKien: DuKienHienMvp[];
}

export type KhungNhinMvp =
  | { kind: 'line'; loi: LoiMvp; display?: 'card' }
  | { kind: 'feedback'; loi: LoiMvp; viTri: number; tong: number }
  | { kind: 'chon-dia-diem'; diaDiem: DiaDiemHienMvp[]; khungConLai: number }
  | { kind: 'question'; nut: Extract<NutMvp, { type: 'question' }>; lanThu: number }
  | { kind: 'line-pick'; nut: Extract<NutMvp, { type: 'line-pick' }>; lanThu: number }
  | { kind: 'branch'; nut: Extract<NutMvp, { type: 'branch' }>; luaChon: Extract<NutMvp, { type: 'branch' }>['choices'] }
  | { kind: 'show-document'; documentId: string }
  | { kind: 'challenge' | 'fix-query'; thuThach: TheThuThachMvp }
  | { kind: 'effect'; effectId: string }
  | { kind: 'projector'; nut: Extract<NutMvp, { type: 'projector' }> }
  | { kind: 'notebook-lookup'; trang: string; phan: string }
  | { kind: 'notebook-copy'; trang: string; lanThu: number }
  | { kind: 'trial-filter'; nut: Extract<NutMvp, { type: 'trial-filter' }>; lanThu: number }
  | { kind: 'end'; ketQua: 'that' | 'thuong' }
  | { kind: 'error'; message: string };

// ---------- Tra cứu kịch bản ----------

export function timChuoi(kb: KichBanMvp, id: string): ChuoiMvp | undefined {
  return kb.chuoi.find((c) => c.id === id);
}

export function timDuKien(kb: KichBanMvp, id: string): { diaDiem: DiaDiemMvp; duKien: DuKienMvp } | undefined {
  for (const dd of kb.diaDiem) {
    const dk = dd.duKien.find((k) => k.id === id);
    if (dk) return { diaDiem: dd, duKien: dk };
  }
  return undefined;
}

/** Số thứ tự của một mốc lịch, cùng thang với `ChuoiMvp.mocSomNhat` (0 mở đầu, d·10+i, 1000 ngày họp). */
export function soMoc(kb: KichBanMvp, moc: MocMvp): number {
  if (moc.kind === 'mo-dau') return 0;
  if (moc.kind === 'ngay-hop') return MOC_NGAY_HOP;
  const i = kb.lich.khung.findIndex((k) => k.id === moc.khung);
  return moc.ngay * 10 + (i < 0 ? 1 : i + 1);
}

/** Mốc hiện tại của trạng thái trên cùng thang. */
export function mocHienTai(kb: KichBanMvp, s: TrangThaiMvp): number {
  if (s.giaiDoan === 'mo-dau') return 0;
  if (s.giaiDoan === 'hop' || s.giaiDoan === 'het') return MOC_NGAY_HOP;
  const soKhung = kb.lich.khung.length;
  return s.ngay * 10 + (s.khung >= soKhung ? KHUNG_TOI : s.khung + 1);
}

// ---------- Điều kiện, hậu quả ----------

/** `có <mã>`: mã nằm trong hồ sơ (giấy nhớ, tài liệu, bằng chứng), cờ, hay thử thách đã xong. */
export function coTrongHoSo(s: TrangThaiMvp, id: string): boolean {
  return (
    s.hoSo.manhMoi.includes(id) ||
    s.hoSo.taiLieu.includes(id) ||
    s.hoSo.bangChung.includes(id) ||
    s.co.includes(id) ||
    s.thuThachXong.includes(id)
  );
}

export function thoaDieuKien(s: TrangThaiMvp, dk: DieuKienMvp | null): boolean {
  if (!dk) return true;
  switch (dk.kind) {
    case 'co':
      return coTrongHoSo(s, dk.id);
    case 'khong-co':
      return !coTrongHoSo(s, dk.id);
    case 'va':
      return dk.cac.every((c) => thoaDieuKien(s, c));
    case 'hoac':
      return dk.cac.some((c) => thoaDieuKien(s, c));
  }
}

function them(danhSach: string[], id: string): string[] {
  return danhSach.includes(id) ? danhSach : [...danhSach, id];
}

function moManhMoi(s: TrangThaiMvp, id: string): TrangThaiMvp {
  return { ...s, hoSo: { ...s.hoSo, manhMoi: them(s.hoSo.manhMoi, id) } };
}
function hienTaiLieu(s: TrangThaiMvp, id: string): TrangThaiMvp {
  return { ...s, hoSo: { ...s.hoSo, taiLieu: them(s.hoSo.taiLieu, id) } };
}
function luuBangChung(s: TrangThaiMvp, id: string): TrangThaiMvp {
  return { ...s, hoSo: { ...s.hoSo, bangChung: them(s.hoSo.bangChung, id) } };
}

/** Trừ một vạch uy tín (không xuống dưới 0). */
function truUyTin(s: TrangThaiMvp): TrangThaiMvp {
  return { ...s, uyTin: Math.max(0, s.uyTin - 1), soLanMatVach: s.soLanMatVach + 1 };
}

/** Áp một danh sách hậu quả theo thứ tự; `đi tới` đổi con trỏ sang chuỗi mới (giữ bối cảnh). Trả thêm cờ đã nhảy. */
function apHauQua(s: TrangThaiMvp, cac: HauQuaMvp[]): { s: TrangThaiMvp; daNhay: boolean } {
  let daNhay = false;
  for (const hq of cac) {
    switch (hq.kind) {
      case 'mo-manh-moi':
        s = moManhMoi(s, hq.id);
        break;
      case 'hien-tai-lieu':
        s = hienTaiLieu(s, hq.id);
        break;
      case 'luu-bang-chung':
        s = luuBangChung(s, hq.id);
        break;
      case 'dat-co':
        s = { ...s, co: them(s.co, hq.co) };
        break;
      case 'bo-co':
        s = { ...s, co: s.co.filter((c) => c !== hq.co) };
        break;
      case 'tru-uy-tin':
        s = truUyTin(s);
        break;
      case 'di-toi':
        s = nhayToi(s, hq.chuoi, s.conTro?.boiCanh ?? 'hop');
        daNhay = true;
        break;
    }
  }
  return { s, daNhay };
}

// ---------- Khởi tạo ----------

export function taoTrangThai(kb: KichBanMvp, batDauLuc: number = Date.now()): TrangThaiMvp {
  const s: TrangThaiMvp = {
    phienBan: 1,
    batDauLuc,
    tenNguoiChoi: TEN_MAC_DINH,
    nganh: '',
    giaiDoan: 'mo-dau',
    ngay: 0,
    khung: 0,
    chinhXong: false,
    daVaoHomNay: [],
    canh: timChuoi(kb, kb.lich.chuoiDau)?.canh ?? kb.canh[0]?.id ?? '',
    conTro: { chuoi: kb.lich.chuoiDau, nut: 0, boiCanh: 'mo-dau' },
    duKienDangLam: null,
    thuThachDangLam: null,
    duKienDaLam: [],
    hoSo: { manhMoi: [], taiLieu: [], bangChung: [] },
    co: [],
    soTay: [],
    thuThachXong: [],
    uyTin: kb.lich.luat.uyTin ?? 0,
    soLanMatVach: 0,
    hoiDap: null,
    lanThu: {},
    choHienTaiLieu: [],
    sauKhiHien: null,
    nhiemVu: null,
    ketQua: null,
    loi: null,
  };
  return chayToiNutCanNguoiChoi(kb, s);
}

// ---------- Chuyển cảnh, ngày ----------

function nhayToi(s: TrangThaiMvp, chuoi: string, boiCanh: BoiCanhChuoi): TrangThaiMvp {
  return { ...s, conTro: { chuoi, nut: 0, boiCanh }, hoiDap: null };
}

function loi(s: TrangThaiMvp, message: string): TrangThaiMvp {
  return { ...s, loi: message, conTro: null };
}

function batDauNgay(kb: KichBanMvp, s: TrangThaiMvp, so: number): TrangThaiMvp {
  const ngay = kb.lich.ngay.find((n) => n.so === so);
  if (!ngay) return batDauHop(kb, s);
  s = {
    ...s,
    giaiDoan: 'ngay',
    ngay: so,
    khung: 0,
    chinhXong: false,
    daVaoHomNay: [],
    duKienDangLam: null,
    thuThachDangLam: null,
    conTro: ngay.moNgay ? { chuoi: ngay.moNgay, nut: 0, boiCanh: 'mo-ngay' } : null,
    nhiemVu: null,
  };
  return s;
}

function batDauHop(kb: KichBanMvp, s: TrangThaiMvp): TrangThaiMvp {
  const hop = kb.lich.ngayHop;
  if (!hop) return loi(s, 'Lịch không có ngày họp.');
  return {
    ...s,
    giaiDoan: 'hop',
    uyTin: kb.lich.luat.uyTin ?? 0,
    soLanMatVach: 0,
    conTro: { chuoi: hop.chuoi, nut: 0, boiCanh: 'hop' },
    duKienDangLam: null,
    thuThachDangLam: null,
  };
}

function ketThucNgay(kb: KichBanMvp, s: TrangThaiMvp): TrangThaiMvp {
  const sau = kb.lich.ngay.find((n) => n.so === s.ngay + 1);
  return sau ? batDauNgay(kb, s, sau.so) : batDauHop(kb, s);
}

/** Hết khung? → buổi tối (chưa có chính) hoặc hết ngày (có chính rồi). Còn khung → về danh sách địa điểm. */
function kiemHetKhung(kb: KichBanMvp, s: TrangThaiMvp): TrangThaiMvp {
  if (s.khung < kb.lich.khung.length) return { ...s, conTro: null };
  if (s.chinhXong) return ketThucNgay(kb, s);
  return batDauToi(kb, s);
}

function batDauToi(kb: KichBanMvp, s: TrangThaiMvp): TrangThaiMvp {
  const ngay = kb.lich.ngay.find((n) => n.so === s.ngay);
  if (!ngay) return loi(s, `Không có ngày ${s.ngay} trong lịch.`);
  return {
    ...s,
    khung: kb.lich.khung.length,
    duKienDangLam: ngay.duKienChinh,
    conTro: { chuoi: ngay.buoiToi, nut: 0, boiCanh: 'toi' },
  };
}

/** Ghi nhận một dữ kiện đã xong: hậu quả khai ở dia-diem.md, đánh dấu chính, xếp tài liệu vào hàng chờ hiện. */
function hoanTatDuKien(kb: KichBanMvp, s: TrangThaiMvp, id: string, sauKhiHien: 'sau-du-kien' | 'sau-toi'): TrangThaiMvp {
  const tim = timDuKien(kb, id);
  if (!tim) return loi(s, `Dữ kiện "${id}" không có trong dia-diem.md.`);
  const dk = tim.duKien;
  for (const m of dk.moManhMoi) s = moManhMoi(s, m);
  for (const b of dk.luuBangChung) s = luuBangChung(s, b);
  const taiLieuMoi = dk.hienTaiLieu.filter((t) => !s.hoSo.taiLieu.includes(t));
  for (const t of dk.hienTaiLieu) s = hienTaiLieu(s, t);
  const ngay = kb.lich.ngay.find((n) => n.so === s.ngay);
  s = {
    ...s,
    duKienDaLam: dk.lap === 'mot-lan' ? them(s.duKienDaLam, dk.id) : s.duKienDaLam,
    chinhXong: s.chinhXong || ngay?.duKienChinh === dk.id,
    duKienDangLam: null,
    thuThachDangLam: null,
    conTro: null,
    choHienTaiLieu: taiLieuMoi,
    sauKhiHien: taiLieuMoi.length > 0 ? sauKhiHien : null,
  };
  return taiLieuMoi.length > 0 ? s : sauHien(kb, s, sauKhiHien);
}

function sauHien(kb: KichBanMvp, s: TrangThaiMvp, viec: 'sau-du-kien' | 'sau-toi' | null): TrangThaiMvp {
  s = { ...s, sauKhiHien: null };
  if (viec === 'sau-du-kien') return kiemHetKhung(kb, s);
  if (viec === 'sau-toi') return ketThucNgay(kb, s);
  return s;
}

/** Chuỗi hết nút mà không `[ĐI TỚI]`. */
function hetChuoi(kb: KichBanMvp, s: TrangThaiMvp, boiCanh: BoiCanhChuoi): TrangThaiMvp {
  switch (boiCanh) {
    case 'mo-dau':
      return batDauNgay(kb, s, kb.lich.ngay[0]?.so ?? 1);
    case 'mo-ngay':
      return { ...s, conTro: null };
    case 'du-kien':
      return s.duKienDangLam ? hoanTatDuKien(kb, s, s.duKienDangLam, 'sau-du-kien') : kiemHetKhung(kb, s);
    case 'toi':
      return s.duKienDangLam ? hoanTatDuKien(kb, s, s.duKienDangLam, 'sau-toi') : ketThucNgay(kb, s);
    case 'hop':
      return loi(s, `Chuỗi "${s.conTro?.chuoi ?? '?'}" của ngày họp hết nút mà không [ĐI TỚI] hay [RẼ KẾT].`);
    case 'ket':
      return loi(s, `Chuỗi kết "${s.conTro?.chuoi ?? '?'}" hết nút mà không [KẾT THÚC].`);
  }
}

// ---------- Chạy tới nút cần người chơi ----------

/** Nút cần người chơi tương tác (mọi nút khác máy tự xử lý). */
function canNguoiChoi(nut: NutMvp): boolean {
  switch (nut.type) {
    case 'line':
    case 'question':
    case 'line-pick':
    case 'branch':
    case 'show-document':
    case 'challenge':
    case 'fix-query':
    case 'effect':
    case 'projector':
    case 'notebook-lookup':
    case 'notebook-copy':
    case 'trial-filter':
    case 'end':
      return true;
    default:
      return false;
  }
}

function nutHienTai(kb: KichBanMvp, s: TrangThaiMvp): { chuoi: ChuoiMvp; nut: NutMvp | undefined } | { loi: string } {
  if (!s.conTro) return { loi: 'Không có chuỗi đang chạy.' };
  const chuoi = timChuoi(kb, s.conTro.chuoi);
  if (!chuoi) return { loi: `Không có chuỗi "${s.conTro.chuoi}".` };
  return { chuoi, nut: chuoi.nodes[s.conTro.nut] };
}

function tienNut(s: TrangThaiMvp): TrangThaiMvp {
  if (!s.conTro) return s;
  return { ...s, conTro: { ...s.conTro, nut: s.conTro.nut + 1 }, hoiDap: null };
}

/** Xử lý các nút tự động cho tới khi gặp nút cần người chơi, hoặc rời chuỗi (danh sách địa điểm, hết game, lỗi). */
function chayToiNutCanNguoiChoi(kb: KichBanMvp, s: TrangThaiMvp): TrangThaiMvp {
  for (let buoc = 0; buoc < 10_000; buoc++) {
    if (s.loi || !s.conTro || s.hoiDap || s.choHienTaiLieu.length > 0) return s;
    const ht = nutHienTai(kb, s);
    if ('loi' in ht) return loi(s, ht.loi);
    const { chuoi, nut } = ht;
    const boiCanh = s.conTro.boiCanh;
    if (s.canh !== chuoi.canh) s = { ...s, canh: chuoi.canh };
    if (nut === undefined) {
      s = hetChuoi(kb, s, boiCanh);
      continue;
    }
    if (canNguoiChoi(nut)) return s;
    switch (nut.type) {
      case 'task':
        s = tienNut({ ...s, nhiemVu: nut.text });
        break;
      case 'goto':
        s = nhayToi(s, nut.to, boiCanh);
        break;
      case 'consequence': {
        const kq = apHauQua(s, nut.hauQua);
        s = kq.daNhay ? kq.s : tienNut(kq.s);
        break;
      }
      case 'save-evidence':
        s = tienNut(luuBangChung(s, nut.evidenceId));
        break;
      case 'create-character':
        // Chưa có màn tạo nhân vật (gói `tao-nhan-vat`): tên mặc định, ngành = lựa chọn đầu.
        s = tienNut(nut.truong === 'ten' ? { ...s, tenNguoiChoi: TEN_MAC_DINH } : { ...s, nganh: nut.luaChon[0] ?? '' });
        break;
      case 'ending-branch': {
        const ket = kb.lich.ket;
        if (!ket) return loi(s, 'Lịch không có mục Kết.');
        const chuoiThat = timChuoi(kb, ket.that);
        const dieuKien = chuoiThat?.nodes.find((n) => n.type === 'condition');
        const that = dieuKien?.type === 'condition' ? thoaDieuKien(s, dieuKien.dieuKien) : false;
        s = nhayToi(s, that ? ket.that : ket.thuong, 'ket');
        break;
      }
      case 'condition':
      case 'note':
      case 'stage':
      case 'wait':
      default:
        s = tienNut(s);
        break;
    }
  }
  return loi(s, 'Chuỗi lặp vô hạn ([ĐI TỚI] vòng tròn?).');
}

// ---------- Khung nhìn ----------

export function danhSachDiaDiem(kb: KichBanMvp, s: TrangThaiMvp): DiaDiemHienMvp[] {
  const moc = mocHienTai(kb, s);
  const ra: DiaDiemHienMvp[] = [];
  for (const dd of kb.diaDiem) {
    if (soMoc(kb, dd.moTu) > moc) continue;
    const tonVao = s.daVaoHomNay.includes(dd.id) ? 0 : dd.tonKhung.vao;
    const duKien: DuKienHienMvp[] = [];
    for (const dk of dd.duKien) {
      if (soMoc(kb, dk.moTu) > moc) continue;
      duKien.push({
        duKien: dk,
        tonKhung: tonVao + dd.tonKhung.moiDuKien,
        daLam: dk.lap === 'mot-lan' && s.duKienDaLam.includes(dk.id),
        khoa: !thoaDieuKien(s, dk.can),
      });
    }
    ra.push({ diaDiem: dd, duKien });
  }
  return ra;
}

export function khungNhin(kb: KichBanMvp, s: TrangThaiMvp): KhungNhinMvp {
  if (s.loi) return { kind: 'error', message: s.loi };
  if (s.choHienTaiLieu.length > 0) return { kind: 'show-document', documentId: s.choHienTaiLieu[0] ?? '' };
  if (s.hoiDap) {
    const l = s.hoiDap.phanHoi[s.hoiDap.viTri];
    if (l) return { kind: 'feedback', loi: l, viTri: s.hoiDap.viTri, tong: s.hoiDap.phanHoi.length };
  }
  if (s.thuThachDangLam) {
    const the = kb.thuThach[s.thuThachDangLam];
    return the ? { kind: 'challenge', thuThach: the } : { kind: 'error', message: `Không có thẻ thử thách "${s.thuThachDangLam}".` };
  }
  if (!s.conTro) {
    if (s.giaiDoan === 'ngay') return { kind: 'chon-dia-diem', diaDiem: danhSachDiaDiem(kb, s), khungConLai: Math.max(0, kb.lich.khung.length - s.khung) };
    return { kind: 'error', message: 'Không có chuỗi đang chạy.' };
  }
  const ht = nutHienTai(kb, s);
  if ('loi' in ht) return { kind: 'error', message: ht.loi };
  const nut = ht.nut;
  if (!nut) return { kind: 'error', message: `Chuỗi "${ht.chuoi.id}" hết nút.` };
  const lanThu = (id: string): number => s.lanThu[id] ?? 0;
  switch (nut.type) {
    case 'line':
      return nut.display === 'card'
        ? { kind: 'line', loi: { speaker: nut.speaker, expression: nut.expression, text: nut.text }, display: 'card' }
        : { kind: 'line', loi: { speaker: nut.speaker, expression: nut.expression, text: nut.text } };
    case 'question':
      return { kind: 'question', nut, lanThu: lanThu(nut.id) };
    case 'line-pick':
      return { kind: 'line-pick', nut, lanThu: lanThu(nut.id) };
    case 'branch':
      return { kind: 'branch', nut, luaChon: nut.choices.filter((c) => thoaDieuKien(s, c.khi)) };
    case 'show-document':
      return { kind: 'show-document', documentId: nut.documentId };
    case 'challenge':
    case 'fix-query': {
      const the = kb.thuThach[nut.challengeId];
      return the ? { kind: nut.type, thuThach: the } : { kind: 'error', message: `Không có thẻ thử thách "${nut.challengeId}".` };
    }
    case 'effect':
      return { kind: 'effect', effectId: nut.effectId };
    case 'projector':
      return { kind: 'projector', nut };
    case 'notebook-lookup':
      return { kind: 'notebook-lookup', trang: nut.trang, phan: nut.phan };
    case 'notebook-copy':
      return { kind: 'notebook-copy', trang: nut.trang, lanThu: lanThu(nut.trang) };
    case 'trial-filter':
      return { kind: 'trial-filter', nut, lanThu: lanThu(nut.id) };
    case 'end':
      return { kind: 'end', ketQua: s.ketQua ?? (s.conTro.chuoi === kb.lich.ket?.that ? 'that' : 'thuong') };
    default:
      return { kind: 'error', message: `Nút "${nut.type}" không phải nút cần người chơi.` };
  }
}

// ---------- Xử lý hành động ----------

/** Vào pha phản hồi sau một lựa chọn (câu hỏi / chọn dòng / chép sổ); mất vạch nếu sai và `trừ uy tín`. */
function batDauPhanHoi(
  kb: KichBanMvp,
  s: TrangThaiMvp,
  id: string,
  nguon: 'question' | 'line-pick' | 'notebook-copy',
  dung: boolean,
  phanHoi: LoiMvp[],
  truVach: boolean,
): TrangThaiMvp {
  s = { ...s, lanThu: { ...s.lanThu, [id]: (s.lanThu[id] ?? 0) + 1 } };
  let loiThem: LoiMvp[] = [];
  let hetVach = false;
  if (!dung && truVach && s.uyTin > 0) {
    s = truUyTin(s);
    const mat = kb.loiChung.matUyTin;
    if (mat) {
      const l = mat.loi[Math.min(s.soLanMatVach - 1, mat.loi.length - 1)];
      loiThem = l ? [l] : [];
      if (s.uyTin === 0) {
        loiThem = [...loiThem, mat.hetVach];
        hetVach = true;
      }
    } else if (s.uyTin === 0) {
      hetVach = true;
    }
  }
  const tatCa = [...phanHoi, ...loiThem];
  if (tatCa.length === 0) return ketThucPhanHoi(kb, { ...s, hoiDap: { id, nguon, phanHoi: [], viTri: 0, dungRoi: dung, hetVach } });
  return { ...s, hoiDap: { id, nguon, phanHoi: tatCa, viTri: 0, dungRoi: dung, hetVach } };
}

/** Hết lời phản hồi: đúng → nút kế; sai → hỏi lại; hết vạch → hoãn buổi họp (về đầu chuỗi ngày họp, đủ vạch). */
function ketThucPhanHoi(kb: KichBanMvp, s: TrangThaiMvp): TrangThaiMvp {
  const hd = s.hoiDap;
  if (!hd) return s;
  if (hd.hetVach) return batDauHop(kb, { ...s, hoiDap: null });
  if (!hd.dungRoi) return { ...s, hoiDap: null };
  if (hd.nguon === 'notebook-copy') s = { ...s, soTay: them(s.soTay, hd.id) };
  return tienNut({ ...s, hoiDap: null });
}

export function xuLy(kb: KichBanMvp, s: TrangThaiMvp, hd: HanhDongMvp): TrangThaiMvp {
  if (s.loi) return s;
  const kn = khungNhin(kb, s);
  let moi: TrangThaiMvp | null = null;

  switch (hd.type) {
    case 'tiep': {
      if (kn.kind === 'feedback') {
        const hoiDap = s.hoiDap;
        if (!hoiDap) return s;
        const viTri = hoiDap.viTri + 1;
        moi = viTri < hoiDap.phanHoi.length ? { ...s, hoiDap: { ...hoiDap, viTri } } : ketThucPhanHoi(kb, s);
      } else if (kn.kind === 'show-document' && s.choHienTaiLieu.length > 0) {
        const conLai = s.choHienTaiLieu.slice(1);
        moi = { ...s, choHienTaiLieu: conLai };
        if (conLai.length === 0) moi = sauHien(kb, moi, s.sauKhiHien);
      } else if (kn.kind === 'show-document') {
        moi = tienNut(hienTaiLieu(s, kn.documentId));
      } else if (kn.kind === 'line' || kn.kind === 'effect' || kn.kind === 'projector' || kn.kind === 'notebook-lookup') {
        moi = tienNut(s);
      } else {
        return s;
      }
      break;
    }
    case 'chon-du-kien': {
      if (kn.kind !== 'chon-dia-diem') return s;
      const dd = kn.diaDiem.find((x) => x.diaDiem.id === hd.diaDiem);
      const dk = dd?.duKien.find((x) => x.duKien.id === hd.duKien);
      if (!dd || !dk || dk.daLam || dk.khoa) return s;
      if (s.khung >= kb.lich.khung.length) return s;
      const khung = Math.min(kb.lich.khung.length, s.khung + dk.tonKhung);
      moi = {
        ...s,
        khung,
        daVaoHomNay: them(s.daVaoHomNay, dd.diaDiem.id),
        canh: dd.diaDiem.canh,
        duKienDangLam: dk.duKien.id,
        nhiemVu: s.nhiemVu,
      };
      if (dk.duKien.hanhDong.kind === 'chuoi') {
        moi = { ...moi, conTro: { chuoi: dk.duKien.hanhDong.chuoi, nut: 0, boiCanh: 'du-kien' } };
      } else {
        moi = { ...moi, thuThachDangLam: dk.duKien.hanhDong.thuThach, conTro: null };
      }
      break;
    }
    case 'ket-thuc-ngay': {
      if (kn.kind !== 'chon-dia-diem') return s;
      moi = s.chinhXong ? ketThucNgay(kb, s) : batDauToi(kb, s);
      break;
    }
    case 'chon': {
      if (kn.kind === 'question') {
        const c = kn.nut.choices.find((x) => x.id === hd.luaChon);
        if (!c) return s;
        moi = batDauPhanHoi(kb, s, kn.nut.id, 'question', c.correct, c.feedback, kn.nut.truUyTin);
      } else if (kn.kind === 'branch') {
        const c = kn.luaChon.find((x) => x.id === hd.luaChon);
        if (!c) return s;
        const kq = apHauQua(s, c.hauQua);
        moi = kq.daNhay ? kq.s : tienNut(kq.s);
      } else if (kn.kind === 'notebook-copy') {
        const trang = kb.soTay[kn.trang];
        const c = trang?.chonDoanCode?.find((x) => x.id === hd.luaChon);
        if (!trang || !c) return s;
        moi = batDauPhanHoi(kb, s, kn.trang, 'notebook-copy', c.correct, c.feedback, false);
      } else {
        return s;
      }
      break;
    }
    case 'chon-dong': {
      if (kn.kind !== 'line-pick') return s;
      const dong = kn.nut.lines.find((x) => x.index === hd.index);
      if (!dong) return s;
      moi = batDauPhanHoi(kb, s, kn.nut.id, 'line-pick', dong.correct, dong.feedback, kn.nut.truUyTin);
      break;
    }
    case 'chon-o': {
      if (kn.kind !== 'trial-filter') return s;
      const id = kn.nut.id;
      const lanThu = { ...s.lanThu, [id]: (s.lanThu[id] ?? 0) + 1 };
      moi = hd.giaTri === kn.nut.chon.giaTri ? tienNut({ ...s, lanThu }) : { ...s, lanThu };
      break;
    }
    case 'xong-thu-thach': {
      if ((kn.kind !== 'challenge' && kn.kind !== 'fix-query') || kn.thuThach.id !== hd.thuThach) return s;
      moi = luuBangChung(s, kn.thuThach.vatChung.id);
      moi = { ...moi, thuThachXong: them(moi.thuThachXong, kn.thuThach.id) };
      if (s.thuThachDangLam) {
        // Thử thách mở từ dữ kiện (không trong chuỗi): ghi nhận dữ kiện luôn.
        moi = { ...moi, thuThachDangLam: null };
        moi = s.duKienDangLam ? hoanTatDuKien(kb, moi, s.duKienDangLam, 'sau-du-kien') : kiemHetKhung(kb, moi);
      } else {
        moi = tienNut(moi);
      }
      break;
    }
  }
  if (!moi) return s;
  return chayToiNutCanNguoiChoi(kb, moi);
}

// ---------- Tiện ích cho giao diện ----------

/** Thay `{{nv.nguoi-choi}}` bằng tên người chơi; `{{nv.<mã>}}` khác bằng tên nhân vật trong nhan-vat.md. */
export function dienTen(kb: KichBanMvp, s: TrangThaiMvp, text: string): string {
  return text.replace(/\{\{nv\.([a-z0-9-]+)\}\}/g, (_m, ma: string) => {
    if (ma === 'nguoi-choi') return s.tenNguoiChoi;
    return kb.nhanVat.find((n) => n.id === ma)?.trongCau ?? ma;
  });
}

/** Tên hiển thị của người nói (`player` → "Bạn", `narrator` → ""). */
export function tenNguoiNoi(kb: KichBanMvp, speaker: string): string {
  if (speaker === 'player') return 'Bạn';
  if (speaker === 'narrator') return '';
  return kb.nhanVat.find((n) => n.id === speaker)?.ten ?? 'Nhân vật';
}

/** Nhãn khung giờ hiện tại cho HUD ("Sáng" … / "Cuối ngày"). */
export function tenKhungHienTai(kb: KichBanMvp, s: TrangThaiMvp): string {
  if (s.giaiDoan !== 'ngay') return '';
  return kb.lich.khung[s.khung]?.ten ?? kb.lich.buoiToi.ten;
}
