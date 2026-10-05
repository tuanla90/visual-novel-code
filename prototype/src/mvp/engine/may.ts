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
 *   - Ngày theo truyện (`{ngày: n · theo truyện}`, chương 1): chạy một chuỗi, không bản đồ, không khung giờ; chuỗi hết
 *     nút (ngữ cảnh `truyen`) → hết ngày. Chỗ bấm là `[KHÁM PHÁ]`, lựa chọn là `[RẼ NHÁNH]` trong chuỗi.
 *   - Ngày họp: `[HỎI … · trừ uy tín]` sai → mất 1 vạch, lời `[KHI MẤT UY TÍN]`, chọn lại; hết vạch → lời `[HẾT VẠCH]`
 *     rồi hoãn: quay lại đầu chuỗi ngày họp với đủ vạch (cách đơn giản nhất — xem báo cáo gói).
 *   - `[RẼ KẾT]`: kết thật nếu `[ĐIỀU KIỆN]` đầu chuỗi kết thật thỏa, không thì kết thường.
 *   - `[TẠO NHÂN VẬT]` (gói tao-nhan-vat-mvp, QĐ-084): máy DỪNG chờ người chơi (khung nhìn `create-character`);
 *     `dat-ten` nhận tên qua `kiemTen`, `chon-nganh` nhận một ngành trong danh sách. Người chơi là nam, không hỏi giới tính.
 *     Tên KHÔNG đi vào telemetry (QĐ-077) — máy không ghi sự kiện nào; tên chỉ nằm trong trạng thái (Lưu/Nạp).
 *   - Vụ sau (`lich.vuSau`, từ Vụ 2): một vụ tới `[KẾT THÚC]` thì máy đặt cờ `<mã vụ>-hoan-tat` (vụ gốc thêm
 *     `<mã vụ>-ket-that` / `-ket-thuong`); màn kết có nút sang vụ kế (`sang-vu-sau`): giai đoạn `vu-sau`, chạy chuỗi của vụ,
 *     thẻ của vụ trước được gỡ khỏi bảng (vẫn trong hồ sơ, ghim lại được). `[NẾU <điều kiện>] → đi tới <chuỗi>` rẽ theo cờ.
 *   - Điều hướng tự do (gói B13, chỉ khi kịch bản có cờ `dieuHuongTuDo` — bộ mùa 1): `[ĐI CÙNG]` máy tự đi; xong việc chính ở
 *     cảnh khám phá vẫn ở lại, người chơi tự bấm `roi-canh` ("Về bản đồ" ở nơi tới từ bản đồ, "Đi tiếp" ở cảnh khác khi còn chỗ
 *     chưa xem; xem hết mọi chỗ thì máy tự đi); rời nơi khi việc chính chưa xong thì ghim còn dấu, chỗ đã xem nhớ trong `dangDo`;
 *     màn tra (trừ buổi họp) lùi về cảnh đã mở nó bằng `roi-thu-thach`, bấm lại chỗ đó là vào thẳng màn tra đang dở.
 */
import type {
  ChuoiMvp,
  DiaDiemMvp,
  DiemKhamPhaMvp,
  DieuKienMvp,
  DuKienMvp,
  HauQuaMvp,
  KichBanMvp,
  LoiMvp,
  MocMvp,
  NutMvp,
  NhiemVuPhuMvp,
  TheThuThachMvp,
  VuSauMvp,
} from '../../content/mvp/types';
import { MAU_GHIM, type BoiCanhChuoi, type CachChoiMvp, type KhamPhaMvp, type MauGhimMvp, type TrangThaiMvp, type GhiChuTruyVanMvp, type PhieuTruyVanMvp, type TiepTucTuyenMvp } from './trang-thai';
import { laTheHoiDap } from './bang-dieu-tra';
import { cachChoiCua, dongBong, dongChuaGach, ghiTuDong, goiY, hoi, keTiep, khoiThayThe, khungHoiDap, laLoiDaThay, locHauQuaDaThay, moBuoiHoi, napLaiLuot, roiDi, tienDoCua, toHoiDap, type KhungHoiDapMvp } from './hoi-dap';

/**
 * Tên dự phòng khi trạng thái chưa có tên (chưa qua câu hỏi tên, hay ô lưu hỏng). Không dùng trên đường chạy thường:
 * trạng thái mới bắt đầu với tên rỗng, người chơi tự gõ hoặc bấm xúc xắc. Ô lưu cũ (trước gói tao-nhan-vat) có sẵn
 * `tenNguoiChoi: 'Khôi'` nên vẫn nạp được như cũ.
 */
/** Đối chất: số lần được trình thẻ không liên quan; lần thứ ba là hết lượt (user 03/10/2026: sai mãi phải mất uy tín). */
export const SO_LAN_SAI_DOI_CHAT = 3;

export const TEN_MAC_DINH = 'Khôi';

/** Độ dài tối đa của tên người chơi (tính theo ký tự sau khi bỏ khoảng trắng thừa). */
export const TEN_TOI_DA = 20;

/**
 * Tên gọi nam Việt Nam phổ biến cho nút xúc xắc. Đã bỏ: tên nhân vật trong truyện (Tùng, Quân, Duy, Hiếu, Đạt,
 * Cường, Thịnh, Quang, Đức, Nam…) và mọi tên bắt đầu bằng H (vụ án xoay quanh chữ ký "[H.]" — người chơi tên H
 * sẽ tự thành nghi phạm). `tenNgauNhien` lọc thêm theo `nhan-vat.md` / tên cấm lúc chạy, phòng khi nội dung đổi.
 */
export const TEN_XUC_XAC: readonly string[] = [
  'An', 'Bảo', 'Bình', 'Chiến', 'Công', 'Dũng', 'Giang', 'Khang', 'Khôi', 'Kiên',
  'Kiệt', 'Lâm', 'Long', 'Đăng', 'Nghĩa', 'Nguyên', 'Nhật', 'Phong', 'Phúc', 'Quốc',
  'Sơn', 'Tâm', 'Thành', 'Thắng', 'Thiện', 'Toàn', 'Trung', 'Tuấn', 'Việt', 'Vinh',
];

export type KetQuaKiemTen = { ok: true; ten: string } | { ok: false; loi: string };

/** Chữ cái Latin (kể cả chữ có dấu tiếng Việt, dạng dựng sẵn hay tổ hợp), nối nhau bằng khoảng trắng / gạch nối. */
const MAU_TEN = /^[\p{Script=Latin}\p{M}]+(?:[ -]+[\p{Script=Latin}\p{M}]+)*$/u;

/**
 * Kiểm tên người chơi gõ: bỏ khoảng trắng thừa (đầu/cuối, giữa gộp còn một), chuẩn NFC; 1–`TEN_TOI_DA` ký tự;
 * chỉ chữ cái + khoảng trắng + dấu gạch nối (không số, không ký tự lạ). Sai → lời báo thân thiện.
 */
export function kiemTen(tho: string): KetQuaKiemTen {
  const ten = tho.normalize('NFC').replace(/\s+/g, ' ').trim();
  if (ten.length === 0) return { ok: false, loi: 'Cậu chưa gõ tên. Gõ một cái tên, hoặc bấm xúc xắc.' };
  if ([...ten].length > TEN_TOI_DA) return { ok: false, loi: `Tên dài quá — tối đa ${TEN_TOI_DA} ký tự thôi.` };
  if (/\p{N}/u.test(ten)) return { ok: false, loi: 'Tên không có chữ số đâu — bỏ số đi nhé.' };
  if (!MAU_TEN.test(ten)) return { ok: false, loi: 'Tên chỉ gồm chữ cái, khoảng trắng và dấu gạch nối (-).' };
  return { ok: true, ten };
}

/** Các chữ (viết thường) đang là tên / họ tên nhân vật hay tên cấm — xúc xắc không ra những chữ này. */
function chuDaDung(kb: KichBanMvp): Set<string> {
  const cac = [...kb.nhanVat.flatMap((n) => [n.ten, n.hoTen ?? '']), ...kb.tenCam];
  return new Set(cac.flatMap((c) => c.normalize('NFC').toLowerCase().split(/[\s-]+/)).filter(Boolean));
}

/**
 * Tên ngẫu nhiên cho nút xúc xắc. `ngauNhien` trả số trong [0, 1) như `Math.random` (tiêm được để test tất định);
 * `khac` = tên đang có trong ô, để bấm lại luôn ra tên khác.
 */
export function tenNgauNhien(kb: KichBanMvp, ngauNhien: () => number = Math.random, khac?: string): string {
  const cam = chuDaDung(kb);
  const hopLe = TEN_XUC_XAC.filter((t) => !cam.has(t.toLowerCase()) && !/^h/i.test(t));
  const conLai = hopLe.filter((t) => t !== khac);
  const tu = conLai.length > 0 ? conLai : hopLe.length > 0 ? hopLe : [TEN_MAC_DINH];
  const i = Math.min(tu.length - 1, Math.max(0, Math.floor(ngauNhien() * tu.length)));
  return tu[i] ?? TEN_MAC_DINH;
}

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
  /** `[ĐỐI CHẤT]`: trình một thẻ trong hồ sơ để đáp giả thuyết. */
  | { type: 'trinh-the'; the: string }
  /** `[ĐỐI CHẤT]`: nước đi "chưa đủ căn cứ để nói" — kết thúc đối chất ở mức đang đạt. */
  | { type: 'chua-du' }
  /** Chọn một ô ở `[LỌC THỬ]` (giá trị cột phải chọn). */
  | { type: 'chon-o'; giaTri: string }
  /** Màn thử thách / sửa truy vấn báo đã xong (vật chứng của thẻ vào hồ sơ). */
  | { type: 'xong-thu-thach'; thuThach: string; /** Mã các thẻ đã kéo vào câu đúng — sợi chỉ trên bảng điều tra. */ dung?: string[]; phieu?: PhieuTruyVanMvp; ghiChu?: GhiChuTruyVanMvp[] }
  /** Người chơi kéo một thẻ trên bảng điều tra tới chỗ khác (không đổi con trỏ). */
  | { type: 'doi-cho-the'; the: string; x: number; y: number }
  /** Đổi màu đầu ghim của một thẻ trên bảng (không đổi con trỏ). */
  | { type: 'doi-mau-ghim'; the: string; mau: MauGhimMvp }
  /** Gỡ thẻ khỏi bảng (`ghim: false`, thẻ vẫn trong hồ sơ) hay ghim lại (`ghim: true`). Không đổi con trỏ. */
  | { type: 'ghim-the'; the: string; ghim: boolean }
  /** `[TẠO NHÂN VẬT ten]`: tên người chơi gõ (hay xúc xắc điền); máy kiểm lại bằng `kiemTen`, sai thì đứng yên. */
  | { type: 'dat-ten'; ten: string }
  /** `[TẠO NHÂN VẬT nganh]`: một ngành trong `lựa chọn:` của nút. */
  | { type: 'chon-nganh'; nganh: string }
  /** `[KHÁM PHÁ]`: bấm một chỗ đang hiện, chưa xem (khóa = chuỗi của chỗ đó). */
  | { type: 'xem-diem'; chuoi: string }
  /** Ô lưu cũ trỏ vào một nút máy tự chạy qua (nội dung đổi làm lệch số thứ tự nút): chạy tiếp tới nút cần người chơi. */
  | { type: 'sua-con-tro' }
  /** Đóng màn "Nhân vật mới" của một nhân vật (không đổi con trỏ). */
  | { type: 'da-gioi-thieu'; nhanVat: string }
  /** Màn kết của một vụ: chơi tiếp vụ kế trong `lich.vuSau` (không còn vụ nào thì máy đứng yên). */
  | { type: 'sang-vu-sau' }
  /** Màn kết của một vụ chính: nhận một nhiệm vụ phụ đang mở. */
  | { type: 'lam-nhiem-vu-phu'; id: string }
  /** Cất việc phụ đang làm để quay về bảng hoạt động. */
  | { type: 'tam-dung-nhiem-vu-phu' }
  /** Màn kết của nhiệm vụ phụ: quay lại màn kết của vụ chính. */
  | { type: 'xong-nhiem-vu-phu' }
  /** Đổi cách chơi cảnh hỏi nhân chứng (gói B12): lúc nào cũng được, lưu cùng ván. */
  | { type: 'doi-cach-choi'; cach: CachChoiMvp }
  /** Buổi hỏi: hỏi một câu. Gõ → chỉ `cau` (máy so chữ xếp lớp); bấm → kèm `lop` (mã dữ kiện hoặc 'hoi-mo'). */
  | { type: 'hoi-dap-hoi'; cau: string; lop?: string }
  /** Buổi hỏi, cách "xem cả đoạn": nhân chứng kể nốt điều kế tiếp còn thiếu. */
  | { type: 'hoi-dap-ke-tiep' }
  /** Buổi hỏi: bấm avatar bạn đi cùng để xin gợi ý (bậc 1 rồi bậc 2). */
  | { type: 'hoi-dap-goi-y' }
  /** Buổi hỏi: đóng bóng thoại của bạn đi cùng (cũng là "Hỏi tiếp" khi bị giữ lại). */
  | { type: 'hoi-dap-dong-bong' }
  /** Buổi hỏi: nút rời đi ("Vẫn đi" sau khi bị giữ lại cũng là hành động này). */
  | { type: 'hoi-dap-roi-di' }
  /** Gói B13: rời cảnh khám phá đang đứng bằng nút của cảnh ("Về bản đồ" / "Đi tiếp", xem `cachRoiCanh`). */
  | { type: 'roi-canh' }
  /** Gói B13: rời màn tra chưa giải xong, về cảnh khám phá đã mở nó (xem `canhLuiThuThach`). */
  | { type: 'roi-thu-thach' };

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

/** Một chỗ bấm đang hiện của `[KHÁM PHÁ]` (đã đủ "sau:"). */
export interface DiemKhamPhaHienMvp {
  diem: DiemKhamPhaMvp;
  daXem: boolean;
}

export type KhungNhinMvp =
  | { kind: 'line'; loi: LoiMvp; display?: 'card' }
  | { kind: 'feedback'; loi: LoiMvp; viTri: number; tong: number }
  | { kind: 'chon-dia-diem'; diaDiem: DiaDiemHienMvp[]; khungConLai: number }
  | { kind: 'question'; nut: Extract<NutMvp, { type: 'question' }>; lanThu: number }
  /** `[ĐỐI CHẤT]`: thẻ đã trình (mờ, không trình lại), mức cao nhất đã đạt, số lần trình. */
  | { kind: 'doi-chat'; nut: Extract<NutMvp, { type: 'doi-chat' }>; daTrinh: string[]; muc: 'khong' | 'goi-y' | 'ho-tro' | 'du'; lanThu: number; /** Lần trình sai còn lại trước khi hết lượt. */ conLuot: number }
  | { kind: 'line-pick'; nut: Extract<NutMvp, { type: 'line-pick' }>; lanThu: number }
  | { kind: 'branch'; nut: Extract<NutMvp, { type: 'branch' }>; luaChon: Extract<NutMvp, { type: 'branch' }>['choices'] }
  | { kind: 'show-document'; documentId: string }
  | { kind: 'image'; imageId: string }
  | { kind: 'challenge' | 'fix-query'; thuThach: TheThuThachMvp }
  | { kind: 'effect'; effectId: string }
  | { kind: 'projector'; nut: Extract<NutMvp, { type: 'projector' }> }
  | { kind: 'notebook-lookup'; trang: string; phan: string }
  | { kind: 'trial-filter'; nut: Extract<NutMvp, { type: 'trial-filter' }>; lanThu: number }
  | { kind: 'create-character'; nut: Extract<NutMvp, { type: 'create-character' }> }
  | {
      kind: 'explore';
      nut: Extract<NutMvp, { type: 'explore' }>;
      diem: DiemKhamPhaHienMvp[];
      /** Gói B13: việc chính của cảnh đã xong (xem `xongChinhCua`). */
      xongChinh?: boolean;
      /** Gói B13: nút rời cảnh người chơi tự bấm (`roi-canh`); `null` / thiếu = không có (bộ MVP, hay chưa xong việc ở cảnh không rời được). */
      roi?: { kieu: 've-ban-do' | 'di-tiep'; nhan: string } | null;
    }
  /** `[HỎI ĐÁP]` (gói B12): buổi hỏi nhân chứng đang mở (xem `hoi-dap.ts`). */
  | { kind: 'hoi-dap'; hoiDap: KhungHoiDapMvp }
  /** `vu`: vụ sau vừa kết (`null` = vụ gốc, dùng `ketQua`); `vuKe`: vụ chơi tiếp được, nếu còn. */
  | {
      kind: 'end';
      ketQua: 'that' | 'thuong';
      vu: VuSauMvp | null;
      vuKe: VuSauMvp | null;
      /** Nhiệm vụ phụ đã mở, có thể nhận từ bảng hoạt động trong mọi đoạn của tuyến chính. */
      phu: NhiemVuPhuMvp[];
      /** Nhiệm vụ phụ vừa xong (màn kết của nó); `null` = màn kết của vụ chính. */
      phuXong: NhiemVuPhuMvp | null;
      /** Việc phụ đã nhận nhưng đang tạm cất, có thể tiếp tục từ đây. */
      phuDangDo: NhiemVuPhuMvp[];
    }
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
  if (s.giaiDoan === 'hop' || s.giaiDoan === 'het' || s.giaiDoan === 'vu-sau' || s.giaiDoan === 'phu') return MOC_NGAY_HOP;
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

export function phanTramBiMat(kb: KichBanMvp, s: TrangThaiMvp): number {
  let tong = 0;
  let dat = 0;

  for (let i = 1; i <= 4; i++) {
    tong++;
    if (coTrongHoSo(s, `clue-loi-nhan-linh-${i}`)) dat++;
  }

  const traDa = ['ket-tra-da', 'tin-bd-tra-da-vao', 'v3-bd-tra-da-vao', 'v5-bd-tra-da-vao'];
  for (const c of traDa) {
    tong++;
    if (s.daXemDiem?.includes(c) || (c === 'ket-tra-da' && coTrongHoSo(s, 'vu1-ket-that'))) dat++;
  }

  const chuoiVung = new Set<string>();
  for (const c of kb.chuoi) {
    for (const n of c.nodes) {
      if (n.type === 'explore') {
        for (const d of n.diem) {
          // Chỉ chi tiết ẩn thật: điểm vung: không dấu (điểm ! / ? là việc ai cũng thấy).
          if (d.sprite.startsWith('vung:') && !d.dau) chuoiVung.add(d.chuoi);
        }
      }
    }
  }
  for (const c of chuoiVung) {
    tong++;
    if (s.daXemDiem?.includes(c)) dat++;
  }

  return tong === 0 ? 0 : Math.floor((dat / tong) * 100);
}

export function thoaDieuKien(kb: KichBanMvp, s: TrangThaiMvp, dk: DieuKienMvp | null): boolean {
  if (!dk) return true;
  switch (dk.kind) {
    case 'co':
      return coTrongHoSo(s, dk.id);
    case 'khong-co':
      return !coTrongHoSo(s, dk.id);
    case 'va':
      return dk.cac.every((c) => thoaDieuKien(kb, s, c));
    case 'hoac':
      return dk.cac.some((c) => thoaDieuKien(kb, s, c));
    case 'bi-mat':
      return phanTramBiMat(kb, s) >= dk.muc;
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
function apHauQua(kb: KichBanMvp, s: TrangThaiMvp, cac: HauQuaMvp[]): { s: TrangThaiMvp; daNhay: boolean } {
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
        s = nhayToi(kb, s, hq.chuoi, s.conTro?.boiCanh ?? 'hop');
        daNhay = true;
        break;
    }
  }
  return { s, daNhay };
}

// ---------- Khởi tạo ----------

/** Ngành của người chơi. `[TẠO NHÂN VẬT nganh]` vẫn đọc được nếu kịch bản đặt lại bước chọn. */
export const NGANH_NGUOI_CHOI = 'Kế toán';

export function taoTrangThai(kb: KichBanMvp, batDauLuc: number = Date.now()): TrangThaiMvp {
  const s: TrangThaiMvp = {
    phienBan: 1,
    batDauLuc,
    tenNguoiChoi: '',
    // Ngành cố định (user 04/10/2026): bỏ bước chọn ngành ở mở đầu; Tùng hỏi bằng lời, Hà Vy đoán ở Trung thu, thẻ hồ sơ hiện.
    nganh: NGANH_NGUOI_CHOI,
    giaiDoan: 'mo-dau',
    ngay: 0,
    khung: 0,
    chinhXong: false,
    daVaoHomNay: [],
    canh: timChuoi(kb, kb.lich.chuoiDau)?.canh ?? kb.canh[0]?.id ?? '',
    conTro: { chuoi: kb.lich.chuoiDau, nut: 0, boiCanh: 'mo-dau' },
    khamPha: null,
    duKienDangLam: null,
    thuThachDangLam: null,
    duKienDaLam: [],
    hoSo: { manhMoi: [], taiLieu: [], bangChung: [] },
    daGioiThieu: [],
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

/**
 * Sang chuỗi khác (`[ĐI TỚI]`, "đi tới", rẽ kết): rời cảnh `[KHÁM PHÁ]` đang mở, nếu có. Điều hướng tự do (gói B13): nhảy từ
 * chuỗi của một chỗ bấm thì nhớ cảnh vừa đóng (`canhLui`) để màn tra mở sau đó lùi về được; nhảy khác thì quên.
 */
function nhayToi(kb: KichBanMvp, s: TrangThaiMvp, chuoi: string, boiCanh: BoiCanhChuoi): TrangThaiMvp {
  const moi: TrangThaiMvp = { ...s, conTro: { chuoi, nut: 0, boiCanh }, hoiDap: null, khamPha: null, buoiHoi: null };
  if (!dieuHuongTuDo(kb)) return moi;
  const kp = s.khamPha;
  const tuChoBam = !!kp && !!s.conTro && s.conTro.chuoi !== kp.veLai.chuoi && !!kp.dangXem;
  return { ...moi, canhLui: tuChoBam ? kp : null };
}

/** Bộ nội dung dùng luật điều hướng tự do (gói B13, cờ `dieuHuongTuDo` do `sinh-mua1.ts` đặt). */
export function dieuHuongTuDo(kb: KichBanMvp): boolean {
  return kb.dieuHuongTuDo === true;
}

/** `[ĐI CÙNG]` (bộ chuyển đổi dựng thành rẽ nhánh một lựa chọn `go-with-<chuỗi>`): chỉ một đường đi. */
function laDiCung(nut: NutMvp): nut is Extract<NutMvp, { type: 'branch' }> {
  return nut.type === 'branch' && nut.id.startsWith('go-with-') && nut.choices.length === 1;
}

/** Xóa `canhLui` (sang ngày, sang vụ, buổi họp, mở cảnh mới); trạng thái không có trường thì giữ nguyên hình dạng. */
function quenCanhLui(s: TrangThaiMvp): TrangThaiMvp {
  return s.canhLui ? { ...s, canhLui: null } : s;
}

const maHoSo = (s: TrangThaiMvp): string[] => [...s.hoSo.taiLieu, ...s.hoSo.manhMoi, ...s.hoSo.bangChung];

/** Lưu đúng phần tiến trình của tuyến hiện tại (kể cả bảng điều tra), không đóng băng hồ sơ hay cờ mở khóa dùng chung. */
function luuTuyen(s: TrangThaiMvp): TiepTucTuyenMvp {
  return {
    conTro: s.conTro, canh: s.canh, nhiemVu: s.nhiemVu, nhacViec: s.nhacViec,
    thuThachDangLam: s.thuThachDangLam, duKienDangLam: s.duKienDangLam, hoiDap: s.hoiDap, buoiHoi: s.buoiHoi ?? null, daThayLoi: s.daThayLoi ?? null,
    khamPha: s.khamPha, ...(s.canhLui !== undefined ? { canhLui: s.canhLui } : {}), doiChat: s.doiChat, choHienTaiLieu: s.choHienTaiLieu, sauKhiHien: s.sauKhiHien,
    bang: s.bang, ngayThang: s.ngayThang ?? null, hoSoCo: maHoSo(s),
  };
}

/**
 * Về lại một tuyến đã cất: trả các trường của tuyến và bảng điều tra lúc cất; thẻ nhận thêm ở tuyến kia vào ngăn gỡ ghim.
 * Ô lưu cũ chưa cất bảng: giữ bảng hiện tại.
 */
function veTuyen(s: TrangThaiMvp, t: TiepTucTuyenMvp): TrangThaiMvp {
  const { hoSoCo, bang, ...truong } = t;
  if (!bang || !hoSoCo) return { ...s, ...truong };
  const moi = maHoSo(s).filter((id) => !hoSoCo.includes(id));
  return { ...s, ...truong, bang: { ...bang, boGhim: [...new Set([...(bang.boGhim ?? []), ...moi])] } };
}

// ---------- Vụ sau ----------

/** Vụ sau đang chơi (`null` = đang ở vụ gốc). */
export function vuDangChoi(kb: KichBanMvp, s: TrangThaiMvp): VuSauMvp | null {
  return s.vu ? ((kb.lich.vuSau ?? []).find((v) => v.id === s.vu) ?? null) : null;
}

/** Vụ chơi tiếp sau vụ đang đứng: vụ gốc → vụ sau đầu tiên; vụ sau thứ i → thứ i+1. `null` = hết. */
export function vuKeTiep(kb: KichBanMvp, s: TrangThaiMvp): VuSauMvp | null {
  const ds = kb.lich.vuSau ?? [];
  if (!s.vu) return ds[0] ?? null;
  const i = ds.findIndex((v) => v.id === s.vu);
  return i < 0 ? null : (ds[i + 1] ?? null);
}

/** Kết của vụ gốc tại nút `[KẾT THÚC]` đang đứng. */
function ketQuaVuGoc(kb: KichBanMvp, s: TrangThaiMvp): 'that' | 'thuong' {
  return s.ketQua ?? (s.conTro?.chuoi === kb.lich.ket?.that ? 'that' : 'thuong');
}

/**
 * Cờ máy đặt khi một vụ tới `[KẾT THÚC]`: `<mã vụ>-hoan-tat`; vụ gốc thêm `<mã vụ>-ket-that` hay `-ket-thuong` (vụ sau đọc
 * bằng `[NẾU]` / `[KHI]`). Chỉ đặt khi lịch có vụ sau — bộ một vụ giữ nguyên trạng thái như trước.
 */
function coKhiKet(kb: KichBanMvp, s: TrangThaiMvp): TrangThaiMvp {
  if ((kb.lich.vuSau ?? []).length === 0 && (kb.lich.nhiemVuPhu ?? []).length === 0) return s;
  const vu = vuDangChoi(kb, s);
  const moi = s.giaiDoan === 'phu' && s.phu ? [`${s.phu.id}-hoan-tat`] : vu ? [`${vu.id}-hoan-tat`] : [`${kb.lich.vu.id}-hoan-tat`, `${kb.lich.vu.id}-ket-${ketQuaVuGoc(kb, s)}`];
  const thieu = moi.filter((c) => !s.co.includes(c));
  return thieu.length === 0 ? s : { ...s, co: [...s.co, ...thieu] };
}

/** Nhiệm vụ phụ đang làm (`null` = không). */
export function phuDangLam(kb: KichBanMvp, s: TrangThaiMvp): NhiemVuPhuMvp | null {
  return s.phu ? ((kb.lich.nhiemVuPhu ?? []).find((p) => p.id === s.phu?.id) ?? null) : null;
}

/** Nhiệm vụ phụ có thể nhận: vụ `moSau` đã xong và bản thân việc chưa hoàn tất. */
export function phuMoDuoc(kb: KichBanMvp, s: TrangThaiMvp): NhiemVuPhuMvp[] {
  const daNhan = new Set([...(s.phu ? [s.phu.id] : []), ...(s.phuCho ?? []).map((p) => p.id)]);
  return (kb.lich.nhiemVuPhu ?? []).filter((p) => s.co.includes(`${p.moSau}-hoan-tat`) && !s.co.includes(`${p.id}-hoan-tat`) && !daNhan.has(p.id));
}

function phuDaCat(kb: KichBanMvp, s: TrangThaiMvp): NhiemVuPhuMvp[] {
  const ids = [...(s.phu?.tamDung ? [s.phu.id] : []), ...(s.phuCho ?? []).map((p) => p.id)];
  return ids.map((id) => (kb.lich.nhiemVuPhu ?? []).find((p) => p.id === id)).filter((p): p is NhiemVuPhuMvp => !!p);
}

/** Bắt đầu một vụ sau: gỡ mọi thẻ đang có khỏi bảng điều tra (mang theo trong hồ sơ, ghim lại được), chạy chuỗi của vụ. */
function batDauVuSau(s: TrangThaiMvp, vu: Pick<VuSauMvp, 'id' | 'chuoi'>, phu: TrangThaiMvp['phu'] = null): TrangThaiMvp {
  const bang = s.bang ?? { day: {}, viTri: {} };
  const tatCa = [...s.hoSo.taiLieu, ...s.hoSo.manhMoi, ...s.hoSo.bangChung];
  return {
    ...s,
    giaiDoan: phu ? 'phu' : 'vu-sau',
    vu: phu ? (s.vu ?? null) : vu.id,
    // Một việc phụ đang tạm cất vẫn tồn tại khi chuyển sang vụ chính kế tiếp.
    phu: phu ?? (s.phu?.tamDung ? { ...s.phu, veLai: s.conTro ? { ...s.conTro } : s.phu.veLai, giaiDoan: s.giaiDoan, tuyenVeLai: luuTuyen(s) } : null),
    conTro: { chuoi: vu.chuoi, nut: 0, boiCanh: 'vu' },
    // Vụ / việc phụ mới bắt đầu ở ngày khai trong lich.md; ngày đặt giữa vụ trước bằng [NGÀY] không mang sang.
    ngayThang: null,
    khamPha: null,
    ...(s.canhLui ? { canhLui: null } : {}),
    hoiDap: null,
    buoiHoi: null,
    doiChat: null,
    duKienDangLam: null,
    thuThachDangLam: null,
    nhiemVu: null,
    nhacViec: null,
    bang: { ...bang, boGhim: [...new Set([...(bang.boGhim ?? []), ...tatCa])] },
  };
}

// ---------- Khám phá ----------

function nutKhamPha(kb: KichBanMvp, kp: KhamPhaMvp): Extract<NutMvp, { type: 'explore' }> | undefined {
  const n = timChuoi(kb, kp.veLai.chuoi)?.nodes[kp.veLai.nut];
  return n?.type === 'explore' ? n : undefined;
}

/** Chỗ bấm hiện khi mọi chuỗi ở "sau:" đã xem. */
export function diemDangHien(nut: Extract<NutMvp, { type: 'explore' }>, daXem: readonly string[]): DiemKhamPhaHienMvp[] {
  return nut.diem.filter((d) => d.sau.every((x) => daXem.includes(x))).map((d) => ({ diem: d, daXem: daXem.includes(d.chuoi) }));
}

/** Việc chính của cảnh đã xong: có điểm đánh dấu ! thì xem hết các điểm ! (điểm ? là tùy chọn); không có dấu nào thì phải xem hết. */
export function xongChinhCua(nut: Extract<NutMvp, { type: 'explore' }>, daXem: readonly string[]): boolean {
  const chinh = nut.diem.filter((d) => d.dau === 'chinh');
  return (chinh.length > 0 ? chinh : nut.diem).every((d) => daXem.includes(d.chuoi));
}

/** Cảnh khám phá là một NƠI tới từ ghim bản đồ (cảnh thường lồng trong `[KHÁM PHÁ … · bản đồ]`). */
function laNoiTrenBanDo(kb: KichBanMvp, kp: KhamPhaMvp): boolean {
  if (!kp.cha) return false;
  const nut = nutKhamPha(kb, kp);
  return !!nut && !nut.kieu && nutKhamPha(kb, kp.cha)?.kieu === 'ban-do';
}

/**
 * Gói B13: đường rời cảnh khám phá đang đứng mà người chơi tự bấm (bộ điều hướng tự do; bộ MVP luôn `null`).
 *   - nơi tới từ bản đồ: "Về bản đồ" lúc nào cũng có (việc chính chưa xong thì ghim vẫn còn dấu, quay lại làm tiếp);
 *   - cảnh khác: việc chính xong mà còn chỗ chưa xem thì "Đi tiếp" (xem hết mọi chỗ thì máy tự đi, chỉ còn một đường).
 */
export function cachRoiCanh(kb: KichBanMvp, s: TrangThaiMvp): { kieu: 've-ban-do' | 'di-tiep'; nhan: string } | null {
  const kp = s.khamPha;
  if (!dieuHuongTuDo(kb) || !kp) return null;
  const nut = nutKhamPha(kb, kp);
  if (!nut) return null;
  if (laNoiTrenBanDo(kb, kp)) return { kieu: 've-ban-do', nhan: 'Về bản đồ' };
  return xongChinhCua(nut, kp.daXem) ? { kieu: 'di-tiep', nhan: 'Đi tiếp' } : null;
}

/**
 * Gói B13: cảnh khám phá mà màn tra đang đứng lùi về được (bộ điều hướng tự do). Màn tra nằm trong chuỗi của một chỗ bấm (cảnh
 * còn mở) hay sau một `[ĐI TỚI]` từ chuỗi đó (`canhLui`). Không có ở buổi họp, màn sửa truy vấn, thử thách mở từ dữ kiện.
 * `canh` = mã cảnh nền của cảnh lùi về (giao diện ghi "Về phòng CLB").
 */
export function canhLuiThuThach(kb: KichBanMvp, s: TrangThaiMvp): { kp: KhamPhaMvp; diem: string; quaNhay: boolean; canh: string } | null {
  if (!dieuHuongTuDo(kb) || !s.conTro || s.giaiDoan === 'hop' || s.thuThachDangLam || s.hoiDap || s.choHienTaiLieu.length > 0) return null;
  if (timChuoi(kb, s.conTro.chuoi)?.nodes[s.conTro.nut]?.type !== 'challenge') return null;
  const kp = s.khamPha;
  const trongCho = kp && s.conTro.chuoi !== kp.veLai.chuoi ? kp : null;
  const lui = trongCho ?? s.canhLui ?? null;
  if (!lui?.dangXem) return null;
  return { kp: lui, diem: lui.dangXem, quaNhay: !trongCho, canh: timChuoi(kb, lui.veLai.chuoi)?.canh ?? s.canh };
}

/** Chuỗi của một chỗ bấm hết nút: về cảnh khám phá; đã xem hết mọi chỗ → qua nút `[KHÁM PHÁ]`, chạy tiếp chuỗi chứa nó. */
function veKhamPha(kb: KichBanMvp, s: TrangThaiMvp, kp: KhamPhaMvp): TrangThaiMvp {
  const nut = nutKhamPha(kb, kp);
  if (!nut) return loi({ ...s, khamPha: null }, `Không tìm thấy [KHÁM PHÁ] ở "${kp.veLai.chuoi}" #${kp.veLai.nut}.`);
  // Điều hướng tự do (gói B13): xong việc chính vẫn ở lại cảnh. Nơi tới từ bản đồ chỉ rời khi người chơi bấm "Về bản đồ"; cảnh
  // khác tự đi tiếp khi đã xem hết mọi chỗ (chỉ còn một đường), còn chỗ chưa xem thì chờ người chơi bấm "Đi tiếp".
  const tuDi = !dieuHuongTuDo(kb) || (!laNoiTrenBanDo(kb, kp) && nut.diem.every((d) => kp.daXem.includes(d.chuoi)));
  if (xongChinhCua(nut, kp.daXem) && tuDi) {
    return { ...s, conTro: { ...kp.veLai, nut: kp.veLai.nut + 1 }, hoiDap: null, khamPha: kp.cha ?? null };
  }
  return { ...s, conTro: { ...kp.veLai }, hoiDap: null };
}

function loi(s: TrangThaiMvp, message: string): TrangThaiMvp {
  return { ...s, loi: message, conTro: null };
}

function batDauNgay(kb: KichBanMvp, s: TrangThaiMvp, so: number): TrangThaiMvp {
  const ngay = kb.lich.ngay.find((n) => n.so === so);
  if (!ngay) return batDauHop(kb, s);
  s = {
    ...quenCanhLui(s),
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
  if (ngay.kieu === 'theo-truyen') return { ...s, conTro: ngay.chuoi ? { chuoi: ngay.chuoi, nut: 0, boiCanh: 'truyen' } : null };
  return s;
}

function batDauHop(kb: KichBanMvp, s: TrangThaiMvp): TrangThaiMvp {
  const hop = kb.lich.ngayHop;
  if (!hop) return loi(s, 'Lịch không có ngày họp.');
  return {
    ...quenCanhLui(s),
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
  const kp = s.khamPha;
  if (kp && s.conTro && s.conTro.chuoi !== kp.veLai.chuoi) return veKhamPha(kb, s, kp);
  switch (boiCanh) {
    case 'mo-dau':
      return batDauNgay(kb, s, kb.lich.ngay[0]?.so ?? 1);
    case 'mo-ngay':
      return { ...s, conTro: null };
    case 'du-kien':
      return s.duKienDangLam ? hoanTatDuKien(kb, s, s.duKienDangLam, 'sau-du-kien') : kiemHetKhung(kb, s);
    case 'toi':
      return s.duKienDangLam ? hoanTatDuKien(kb, s, s.duKienDangLam, 'sau-toi') : ketThucNgay(kb, s);
    case 'truyen':
      return ketThucNgay(kb, s);
    case 'hop':
      return loi(s, `Chuỗi "${s.conTro?.chuoi ?? '?'}" của ngày họp hết nút mà không [ĐI TỚI] hay [RẼ KẾT].`);
    case 'ket':
      return loi(s, `Chuỗi kết "${s.conTro?.chuoi ?? '?'}" hết nút mà không [KẾT THÚC].`);
    case 'vu':
      return loi(s, `Chuỗi "${s.conTro?.chuoi ?? '?'}" của vụ sau hết nút mà không [ĐI TỚI] hay [KẾT THÚC].`);
  }
}

// ---------- Chạy tới nút cần người chơi ----------

/** Nút cần người chơi tương tác (mọi nút khác máy tự xử lý). */
function canNguoiChoi(nut: NutMvp): boolean {
  switch (nut.type) {
    case 'line':
    case 'question':
    case 'doi-chat':
    case 'line-pick':
    case 'branch':
    case 'show-document':
    case 'image':
    case 'challenge':
    case 'fix-query':
    case 'effect':
    case 'projector':
    case 'notebook-lookup':
    case 'trial-filter':
    case 'create-character':
    case 'explore':
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
  return { ...s, conTro: { ...s.conTro, nut: s.conTro.nut + 1 }, hoiDap: null, doiChat: null };
}

/** Xử lý các nút tự động cho tới khi gặp nút cần người chơi, hoặc rời chuỗi (danh sách địa điểm, hết game, lỗi). */
function chayToiNutCanNguoiChoi(kb: KichBanMvp, s: TrangThaiMvp): TrangThaiMvp {
  for (let buoc = 0; buoc < 10_000; buoc++) {
    if (s.loi || !s.conTro || s.hoiDap || s.choHienTaiLieu.length > 0) return s;
    const ht = nutHienTai(kb, s);
    if ('loi' in ht) return loi(s, ht.loi);
    const { chuoi, nut } = ht;
    const conTro = s.conTro;
    const boiCanh = conTro.boiCanh;
    if (s.canh !== chuoi.canh) s = { ...s, canh: chuoi.canh, ...(s.raDan?.length ? { raDan: [] } : {}) };
    if (nut === undefined) {
      const nutCuoi = chuoi.nodes[chuoi.nodes.length - 1];
      if (nutCuoi && nutCuoi.type === 'goto' && conTro.nut >= chuoi.nodes.length) {
        s = nhayToi(kb, s, nutCuoi.to, boiCanh);
        continue;
      }
      s = hetChuoi(kb, s, boiCanh);
      continue;
    }
    // Dòng lời mà buổi hỏi vừa xong đã nói thay (tờ khai `loiDaThay`): bỏ qua.
    if (nut.type === 'line' && laLoiDaThay(kb, s, conTro.chuoi, conTro.nut)) {
      s = tienNut(s);
      continue;
    }
    // Điều hướng tự do (gói B13): `[ĐI CÙNG]` chỉ có một đường → máy tự đi, không hiện nút.
    if (laDiCung(nut) && dieuHuongTuDo(kb)) {
      const kq = apHauQua(kb, s, nut.choices[0]?.hauQua ?? []);
      s = kq.daNhay ? kq.s : tienNut(kq.s);
      continue;
    }
    if (canNguoiChoi(nut)) {
      if (nut.type === 'end') return coKhiKet(kb, s);
      // Người đã rời dàn (`[RA x]`) mà nói lại thì coi như đã vào lại.
      if (nut.type === 'line' && s.raDan?.includes(nut.speaker)) return { ...s, raDan: s.raDan.filter((x) => x !== nut.speaker) };
      if (nut.type !== 'explore') return s;
      // Tới nút [KHÁM PHÁ] lần đầu → mở cảnh (chưa xem chỗ nào); quay về từ chuỗi của một chỗ bấm → giữ danh sách đã xem.
      const kp = s.khamPha;
      const cungNut = kp && kp.veLai.chuoi === conTro.chuoi && kp.veLai.nut === conTro.nut;
      if (cungNut) return s;
      // Đang trong chuỗi của một chỗ bấm (cảnh ngoài vẫn mở) → cảnh mới lồng vào, xong thì về cảnh ngoài.
      const cha = kp && kp.veLai.chuoi !== conTro.chuoi ? kp : null;
      return { ...quenCanhLui(s), khamPha: { veLai: { ...conTro }, daXem: [], ...(cha ? { cha } : {}) } };
    }
    switch (nut.type) {
      case 'task':
        s = tienNut({ ...s, nhiemVu: nut.text, nhacViec: null });
        break;
      case 'reminder':
        s = tienNut({ ...s, nhacViec: nut.expression ? { nhanVat: nut.speaker, bieuCam: nut.expression, text: nut.text } : { nhanVat: nut.speaker, text: nut.text } });
        break;
      case 'goto':
        s = nhayToi(kb, s, nut.to, boiCanh);
        break;
      case 'jump-if':
        s = thoaDieuKien(kb, s, nut.dieuKien) ? nhayToi(kb, s, nut.to, boiCanh) : tienNut(s);
        break;
      case 'consequence': {
        const kq = apHauQua(kb, s, locHauQuaDaThay(kb, s, conTro.chuoi, nut.hauQua));
        s = kq.daNhay ? kq.s : tienNut(kq.s);
        break;
      }
      case 'save-evidence':
        s = tienNut(luuBangChung(s, nut.evidenceId));
        break;
      case 'notebook-note':
        s = tienNut({ ...s, soTay: them(s.soTay, nut.trang) });
        break;
      case 'ending-branch': {
        const ket = kb.lich.ket;
        if (!ket) return loi(s, 'Lịch không có mục Kết.');
        const chuoiThat = timChuoi(kb, ket.that);
        const dieuKien = chuoiThat?.nodes.find((n) => n.type === 'condition');
        const that = dieuKien?.type === 'condition' ? thoaDieuKien(kb, s, dieuKien.dieuKien) : false;
        // Ghi kết ngay lúc rẽ: chuỗi kết thật được phép [ĐI TỚI] chuỗi khác (đổi cảnh) trước [KẾT THÚC].
        s = { ...nhayToi(kb, s, that ? ket.that : ket.thuong, 'ket'), ketQua: that ? 'that' : 'thuong' };
        break;
      }
      case 'set-date':
        s = tienNut({ ...s, ngayThang: nut.date });
        break;
      case 'hoi-dap': {
        // Gặp một [HỎI ĐÁP] (vào lại cảnh, chuỗi khác): dấu "buổi hỏi đã thay lời" của lần trước hết hiệu lực.
        if (s.daThayLoi) s = { ...s, daThayLoi: null };
        // Buổi hỏi đang mở ở nút này → chờ người chơi. Không có tờ → chạy qua như dòng thường (đoạn [LỜI] ngay sau).
        if (s.buoiHoi && s.buoiHoi.ma === nut.ma) return s;
        if (!toHoiDap(kb, nut.ma)) {
          s = tienNut(s);
          break;
        }
        // Khung hỏi mở ở MỌI cách chơi (user 05/10: bấm nhầm "Xem cả đoạn" rồi không còn chỗ đổi lại). Ở cách "xem cả đoạn"
        // người chơi bấm nút nghe kể (`hoi-dap-ke-tiep`) thì đoạn viết sẵn mới chạy, xem `xemCaDoan`.
        return moBuoiHoi(kb, s, nut.ma);
      }
      case 'stage': {
        // `[RA x]`: x rời dàn chân dung (giao diện đọc `raDan`); `[VÀO x]`: hết rời. Trí nhớ bạn đi cùng đọc thẳng nút này.
        const da = s.raDan ?? [];
        if (nut.action === 'ra' && !da.includes(nut.nhanVat)) s = { ...s, raDan: [...da, nut.nhanVat] };
        else if (nut.action === 'vao' && da.includes(nut.nhanVat)) s = { ...s, raDan: da.filter((x) => x !== nut.nhanVat) };
        s = tienNut(s);
        break;
      }
      case 'condition':
      case 'note':
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
        khoa: !thoaDieuKien(kb, s, dk.can),
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
    case 'doi-chat': {
      const dc = s.doiChat && s.doiChat.id === nut.id ? s.doiChat : null;
      return { kind: 'doi-chat', nut, daTrinh: dc?.daTrinh ?? [], muc: dc?.muc ?? 'khong', lanThu: lanThu(nut.id), conLuot: Math.max(0, SO_LAN_SAI_DOI_CHAT - (dc?.sai ?? 0)) };
    }
    case 'line-pick':
      return { kind: 'line-pick', nut, lanThu: lanThu(nut.id) };
    case 'branch':
      return { kind: 'branch', nut, luaChon: nut.choices.filter((c) => thoaDieuKien(kb, s, c.khi)) };
    case 'show-document':
      return { kind: 'show-document', documentId: nut.documentId };
    case 'image':
      return { kind: 'image', imageId: nut.imageId };
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
    case 'trial-filter':
      return { kind: 'trial-filter', nut, lanThu: lanThu(nut.id) };
    case 'create-character':
      return { kind: 'create-character', nut };
    case 'explore': {
      const diem = diemDangHien(nut, s.khamPha?.daXem ?? []);
      if (!dieuHuongTuDo(kb)) return { kind: 'explore', nut, diem };
      return { kind: 'explore', nut, diem, xongChinh: xongChinhCua(nut, s.khamPha?.daXem ?? []), roi: cachRoiCanh(kb, s) };
    }
    case 'hoi-dap': {
      const hd = khungHoiDap(kb, s, nut.ma);
      return hd ? { kind: 'hoi-dap', hoiDap: hd } : { kind: 'error', message: `Không có tờ dữ kiện "${nut.ma}".` };
    }
    case 'end':
      return {
        kind: 'end',
        ketQua: s.ketQua ?? ketQuaVuGoc(kb, s),
        vu: s.giaiDoan === 'phu' ? null : vuDangChoi(kb, s),
        vuKe: s.giaiDoan === 'phu' ? null : vuKeTiep(kb, s),
        phu: phuMoDuoc(kb, s),
        phuXong: s.giaiDoan === 'phu' ? phuDangLam(kb, s) : null,
        phuDangDo: phuDaCat(kb, s),
      };
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
  nguon: 'question' | 'line-pick' | 'doi-chat',
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
  return tienNut({ ...s, hoiDap: null });
}

/**
 * Đóng buổi hỏi sau khi đã chào đi: bỏ qua các nút buổi hỏi đã thay (lời viết sẵn, hậu quả mở manh mối của danh sách), áp các
 * hậu quả còn lại. Còn dòng chưa gạch thì chỗ bấm của nhân chứng ở [KHÁM PHÁ] coi như chưa xem: việc chính chưa xong.
 */
function dongBuoiHoi(kb: KichBanMvp, s: TrangThaiMvp): TrangThaiMvp {
  const b = s.buoiHoi;
  const conTro = s.conTro;
  const ht = nutHienTai(kb, s);
  const to = b ? toHoiDap(kb, b.ma) : undefined;
  if (!b || !conTro || !to || 'loi' in ht || ht.nut?.type !== 'hoi-dap') return { ...s, buoiHoi: null };
  const { nutSau, hauQua } = khoiThayThe(ht.chuoi.nodes, conTro.nut, to);
  let moi: TrangThaiMvp = { ...s, buoiHoi: null, conTro: { ...conTro, nut: nutSau }, ...(to.nutDaThay ? { daThayLoi: to.ma } : {}) };
  const kp = moi.khamPha;
  if (kp && dongChuaGach(moi, to).length > 0 && kp.daXem.includes(conTro.chuoi)) {
    moi = { ...moi, khamPha: { ...kp, daXem: kp.daXem.filter((c) => c !== conTro.chuoi) } };
  }
  return apHauQua(kb, moi, hauQua).s;
}

export function xuLy(kb: KichBanMvp, s: TrangThaiMvp, hd: HanhDongMvp): TrangThaiMvp {
  if (s.loi) return s;
  if (hd.type === 'sua-con-tro') return chayToiNutCanNguoiChoi(kb, s);
  if (hd.type === 'da-gioi-thieu') {
    const da = s.daGioiThieu ?? [];
    return da.includes(hd.nhanVat) ? s : { ...s, daGioiThieu: [...da, hd.nhanVat] };
  }
  if (hd.type === 'doi-cho-the') {
    const bang = s.bang ?? { day: {}, viTri: {} };
    return { ...s, bang: { ...bang, viTri: { ...bang.viTri, [hd.the]: { x: Math.round(hd.x), y: Math.round(hd.y) } } } };
  }
  if (hd.type === 'doi-mau-ghim') {
    if (!MAU_GHIM.includes(hd.mau) || !(coTrongHoSo(s, hd.the) || laTheHoiDap(kb, s, hd.the))) return s;
    const bang = s.bang ?? { day: {}, viTri: {} };
    return { ...s, bang: { ...bang, mau: { ...(bang.mau ?? {}), [hd.the]: hd.mau } } };
  }
  if (hd.type === 'ghim-the') {
    if (!coTrongHoSo(s, hd.the) && !laTheHoiDap(kb, s, hd.the)) return s;
    const bang = s.bang ?? { day: {}, viTri: {} };
    const cu = bang.boGhim ?? [];
    const moiBo = hd.ghim ? cu.filter((x) => x !== hd.the) : cu.includes(hd.the) ? cu : [...cu, hd.the];
    return moiBo === cu ? s : { ...s, bang: { ...bang, boGhim: moiBo } };
  }
  if (hd.type === 'doi-cach-choi') {
    if (hd.cach !== 'tu-dong' && hd.cach !== 'bam' && hd.cach !== 'go') return s;
    // Chỉ đổi thiết lập; khung hỏi đang mở giữ nguyên, nên bấm nhầm thì bấm lại cách cũ là xong.
    return cachChoiCua(s) === hd.cach && s.cachChoi !== undefined ? s : { ...s, cachChoi: hd.cach };
  }
  const kn = khungNhin(kb, s);
  let moi: TrangThaiMvp | null = null;

  switch (hd.type) {
    case 'lam-nhiem-vu-phu': {
      if (s.phu?.tamDung && s.phu.id === hd.id) {
        moi = veTuyen(
          { ...s, giaiDoan: 'phu', phu: { ...s.phu, tamDung: null, veLai: s.conTro ? { ...s.conTro } : null, giaiDoan: s.giaiDoan, tuyenVeLai: luuTuyen(s) } },
          s.phu.tamDung,
        );
        break;
      }
      if (s.giaiDoan === 'phu' || s.giaiDoan === 'mo-dau' || s.giaiDoan === 'hop' || s.giaiDoan === 'het') return s;
      const choChon = (s.phuCho ?? []).find((x) => x.id === hd.id);
      if (choChon?.tamDung) {
        const cho = (s.phuCho ?? []).filter((x) => x.id !== hd.id);
        const catHienTai = s.phu?.tamDung ? [{ ...s.phu, veLai: s.conTro ? { ...s.conTro } : null, giaiDoan: s.giaiDoan, tuyenVeLai: luuTuyen(s) }] : [];
        moi = veTuyen(
          {
            ...s,
            giaiDoan: 'phu',
            phu: { ...choChon, veLai: s.conTro ? { ...s.conTro } : null, giaiDoan: s.giaiDoan, tuyenVeLai: luuTuyen(s), tamDung: null },
            phuCho: [...cho, ...catHienTai],
          },
          choChon.tamDung,
        );
        break;
      }
      const p = phuMoDuoc(kb, s).find((x) => x.id === hd.id);
      if (!p) return s;
      // Nhận từ màn kết: vụ vừa xong được đặt cờ hoàn tất như trước. Nhận giữa vụ (bảng hoạt động): vụ chính chưa xong.
      const truoc = kn.kind === 'end' ? { ...coKhiKet(kb, s), ketQua: kn.ketQua } : s;
      const catHienTai = s.phu?.tamDung ? [{ ...s.phu, veLai: s.conTro ? { ...s.conTro } : null, giaiDoan: s.giaiDoan, tuyenVeLai: luuTuyen(s) }] : [];
      moi = batDauVuSau({ ...truoc, phuCho: [...(s.phuCho ?? []), ...catHienTai] }, p, { id: p.id, veLai: s.conTro ? { ...s.conTro } : null, giaiDoan: s.giaiDoan, tuyenVeLai: luuTuyen(s) });
      break;
    }
    case 'tam-dung-nhiem-vu-phu': {
      if (s.giaiDoan !== 'phu' || !s.phu || kn.kind === 'end') return s;
      const phuCat = { ...s, giaiDoan: s.phu.giaiDoan, phu: { ...s.phu, tamDung: luuTuyen(s) } };
      moi = s.phu.tuyenVeLai ? veTuyen(phuCat, s.phu.tuyenVeLai) : { ...phuCat, conTro: s.phu.veLai };
      break;
    }
    case 'xong-nhiem-vu-phu': {
      if (kn.kind !== 'end' || !s.phu) return s;
      // Về lại nút [KẾT THÚC] của vụ chính: màn kết đó hiện lại, nhiệm vụ này không còn trong danh sách.
      const xong = { ...coKhiKet(kb, s), giaiDoan: s.phu.giaiDoan, phu: null };
      moi = s.phu.tuyenVeLai ? veTuyen(xong, s.phu.tuyenVeLai) : { ...xong, conTro: s.phu.veLai, nhiemVu: null, nhacViec: null };
      break;
    }
    case 'sang-vu-sau': {
      if (kn.kind !== 'end' || !kn.vuKe) return s;
      // Giữ kết của vụ gốc trong trạng thái: sau này con trỏ không còn đứng ở chuỗi kết để suy ra.
      moi = batDauVuSau({ ...coKhiKet(kb, s), ketQua: kn.ketQua }, kn.vuKe);
      break;
    }
    case 'tiep': {
      if (kn.kind === 'hoi-dap') {
        if (!kn.hoiDap.daRoi) return s;
        moi = dongBuoiHoi(kb, s);
      } else if (kn.kind === 'feedback') {
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
      } else if (kn.kind === 'line' || kn.kind === 'image' || kn.kind === 'effect' || kn.kind === 'projector' || kn.kind === 'notebook-lookup') {
        moi = tienNut(s);
        // Ghi nhận người vừa nói (để bản đồ biết người chơi đã gặp ai).
        const nguoi = kn.kind === 'line' ? kn.loi.speaker : null;
        if (nguoi && nguoi !== 'player' && nguoi !== 'narrator' && !(s.daNoi ?? []).includes(nguoi)) moi = { ...moi, daNoi: [...(s.daNoi ?? []), nguoi] };
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
        const kq = apHauQua(kb, s, c.hauQua);
        moi = kq.daNhay ? kq.s : tienNut(kq.s);
      } else {
        return s;
      }
      break;
    }
    case 'trinh-the': {
      if (kn.kind !== 'doi-chat' || kn.daTrinh.includes(hd.the) || !coTrongHoSo(s, hd.the)) return s;
      const nut = kn.nut;
      const b = nut.bangChung.find((x) => x.id === hd.the);
      const muc = b?.muc ?? 'khac';
      const THU_TU = ['khong', 'goi-y', 'ho-tro', 'du'] as const;
      const mucMoi = muc === 'khac' ? kn.muc : (THU_TU[Math.max(THU_TU.indexOf(kn.muc), THU_TU.indexOf(muc))] ?? kn.muc);
      let co = s.co;
      if (muc === 'du') co = them(co, `${nut.id}-du`);
      if (muc === 'ho-tro') co = them(co, `${nut.id}-ho-tro`);
      // Trình thẻ không liên quan quá SO_LAN_SAI_DOI_CHAT lần: mất uy tín trước người nghe — đối chất dừng ở mức đang đạt (như
      // "Chưa đủ căn cứ để nói"), cờ `<mã>-het-luot` để tổng kết trừ phần uy tín.
      const sai = (s.doiChat?.id === nut.id ? (s.doiChat.sai ?? 0) : 0) + (muc === 'khac' ? 1 : 0);
      const hetLuot = muc === 'khac' && sai >= SO_LAN_SAI_DOI_CHAT;
      if (hetLuot) co = them(co, `${nut.id}-het-luot`);
      const s2 = { ...s, co, doiChat: { id: nut.id, daTrinh: [...kn.daTrinh, hd.the], muc: mucMoi, sai } };
      moi = hetLuot
        ? batDauPhanHoi(kb, s2, nut.id, 'doi-chat', true, [...nut.khac, ...nut.hetLuot], nut.truUyTin)
        : batDauPhanHoi(kb, s2, nut.id, 'doi-chat', muc === 'du', b ? b.feedback : nut.khac, nut.truUyTin && muc === 'khac');
      break;
    }
    case 'chua-du': {
      if (kn.kind !== 'doi-chat') return s;
      moi = batDauPhanHoi(kb, s, kn.nut.id, 'doi-chat', true, kn.nut.chuaDu, false);
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
      moi = kn.thuThach.vatChung ? luuBangChung(s, kn.thuThach.vatChung.id) : s;
      if (hd.phieu || (hd.ghiChu?.length ?? 0) > 0) {
        const bang = moi.bang ?? { day: {}, viTri: {} };
        const phieuTruyVan = hd.phieu ? { ...(bang.phieuTruyVan ?? {}), [hd.phieu.id]: hd.phieu } : bang.phieuTruyVan;
        const ghiChuTruyVan = [...(bang.ghiChuTruyVan ?? []), ...(hd.ghiChu ?? [])];
        moi = { ...moi, bang: { ...bang, ...(phieuTruyVan ? { phieuTruyVan } : {}), ghiChuTruyVan } };
      }
      moi = { ...moi, thuThachXong: them(moi.thuThachXong, kn.thuThach.id) };
      if (kn.thuThach.vatChung && hd.dung && hd.dung.length > 0) {
        const bang = moi.bang ?? { day: {}, viTri: {} };
        moi = { ...moi, bang: { ...bang, day: { ...bang.day, [kn.thuThach.vatChung.id]: [...new Set(hd.dung)] } } };
      }
      if (s.thuThachDangLam) {
        // Thử thách mở từ dữ kiện (không trong chuỗi): ghi nhận dữ kiện luôn.
        moi = { ...moi, thuThachDangLam: null };
        moi = s.duKienDangLam ? hoanTatDuKien(kb, moi, s.duKienDangLam, 'sau-du-kien') : kiemHetKhung(kb, moi);
      } else {
        moi = tienNut(moi);
      }
      break;
    }
    case 'dat-ten': {
      if (kn.kind !== 'create-character' || kn.nut.truong !== 'ten') return s;
      const kq = kiemTen(hd.ten);
      if (!kq.ok) return s;
      moi = tienNut({ ...s, tenNguoiChoi: kq.ten });
      break;
    }
    case 'chon-nganh': {
      if (kn.kind !== 'create-character' || kn.nut.truong !== 'nganh' || !kn.nut.luaChon.includes(hd.nganh)) return s;
      moi = tienNut({ ...s, nganh: hd.nganh });
      break;
    }
    case 'xem-diem': {
      const kp = s.khamPha;
      if (kn.kind !== 'explore' || !kp || !s.conTro) return s;
      const d = kn.diem.find((x) => x.diem.chuoi === hd.chuoi);
      if (!d || d.daXem) return s;
      const daXemDiem = (s.daXemDiem ?? []).includes(d.diem.chuoi) ? s.daXemDiem : [...(s.daXemDiem ?? []), d.diem.chuoi];
      const tuDo = dieuHuongTuDo(kb);
      const kpMoi: KhamPhaMvp = { ...kp, daXem: [...kp.daXem, d.diem.chuoi], ...(tuDo ? { dangXem: d.diem.chuoi } : {}) };
      moi = { ...s, daXemDiem, khamPha: kpMoi, conTro: { chuoi: d.diem.chuoi, nut: 0, boiCanh: s.conTro.boiCanh } };
      // Gói B13: chỗ này có việc dở (nơi đã rời giữa chừng, màn tra đã rời) → chạy tiếp đúng chỗ dở, không lại từ đầu chuỗi.
      const dd = tuDo ? s.dangDo?.[d.diem.chuoi] : undefined;
      if (dd) {
        const dangDo = { ...(s.dangDo ?? {}) };
        delete dangDo[d.diem.chuoi];
        if (dd.trong) moi = { ...moi, dangDo, khamPha: { ...dd.trong, cha: kpMoi }, conTro: { ...dd.trong.veLai } };
        else if (dd.quaNhay) moi = { ...moi, dangDo, khamPha: null, canhLui: kpMoi, conTro: { ...dd.conTro } };
        else moi = { ...moi, dangDo, conTro: { ...dd.conTro } };
      }
      // Làm việc khác trong cảnh: nhân chứng đã hết lượt hỏi ở chỗ khác được hỏi lại đủ lượt.
      moi = napLaiLuot(kb, moi, d.diem.chuoi);
      break;
    }
    case 'roi-canh': {
      // Gói B13: người chơi tự rời cảnh khám phá. Việc chính xong → qua nút [KHÁM PHÁ], chạy tiếp chuỗi chứa nó (nơi trên bản đồ:
      // hết chuỗi của ghim thì về bản đồ). Chưa xong mà là nơi trên bản đồ → về bản đồ, ghim còn dấu, chỗ đã xem nhớ để quay lại.
      const kp = s.khamPha;
      if (kn.kind !== 'explore' || !kn.roi || !kp) return s;
      if (kn.xongChinh) {
        moi = { ...s, conTro: { ...kp.veLai, nut: kp.veLai.nut + 1 }, hoiDap: null, khamPha: kp.cha ?? null };
        break;
      }
      const cha = kp.cha;
      if (kn.roi.kieu !== 've-ban-do' || !cha) return s;
      const ghim = cha.dangXem ?? kp.veLai.chuoi;
      const trong: KhamPhaMvp = { veLai: { ...kp.veLai }, daXem: [...kp.daXem], ...(kp.dangXem ? { dangXem: kp.dangXem } : {}) };
      const banDo: KhamPhaMvp = { ...cha, daXem: cha.daXem.filter((c) => c !== ghim) };
      moi = { ...s, hoiDap: null, khamPha: banDo, conTro: { ...banDo.veLai }, dangDo: { ...(s.dangDo ?? {}), [ghim]: { conTro: { ...kp.veLai }, trong } } };
      break;
    }
    case 'roi-thu-thach': {
      // Gói B13: rời màn tra chưa giải → về cảnh đã mở nó; chỗ bấm mở màn tra còn dấu việc chính, bấm lại thì vào thẳng màn tra.
      const lui = canhLuiThuThach(kb, s);
      if (!lui || !s.conTro) return s;
      const kpVe: KhamPhaMvp = { ...lui.kp, daXem: lui.kp.daXem.filter((c) => c !== lui.diem) };
      moi = {
        ...s,
        hoiDap: null,
        khamPha: kpVe,
        canhLui: null,
        conTro: { ...kpVe.veLai },
        dangDo: { ...(s.dangDo ?? {}), [lui.diem]: { conTro: { ...s.conTro }, quaNhay: lui.quaNhay } },
      };
      break;
    }
    case 'hoi-dap-hoi': {
      if (kn.kind !== 'hoi-dap') return s;
      moi = hoi(kb, s, hd.cau, hd.lop);
      break;
    }
    case 'hoi-dap-ke-tiep': {
      if (kn.kind !== 'hoi-dap') return s;
      moi = xemCaDoan(kb, s) ?? keTiep(kb, s);
      break;
    }
    case 'hoi-dap-goi-y': {
      if (kn.kind !== 'hoi-dap') return s;
      moi = goiY(kb, s, true);
      break;
    }
    case 'hoi-dap-dong-bong': {
      if (kn.kind !== 'hoi-dap') return s;
      moi = dongBong(s);
      break;
    }
    case 'hoi-dap-roi-di': {
      if (kn.kind !== 'hoi-dap') return s;
      moi = roiDi(kb, s, false);
      break;
    }
  }
  if (!moi) return s;
  return chayToiNutCanNguoiChoi(kb, moi);
}

/**
 * Cách "xem cả đoạn" ở một buổi hỏi vừa mở, chưa hỏi ra gì: đóng khung hỏi, chạy đoạn [LỜI] viết sẵn rồi hậu quả như trước
 * gói B12, ghi nhận các dữ kiện đoạn ấy nói ra. Không đúng tình huống đó → `null` (nhân chứng kể nốt từng điều trong khung).
 */
function xemCaDoan(kb: KichBanMvp, s: TrangThaiMvp): TrangThaiMvp | null {
  const b = s.buoiHoi;
  if (!b || b.daRoi || !s.conTro || cachChoiCua(s) !== 'tu-dong') return null;
  const n = timChuoi(kb, s.conTro.chuoi)?.nodes[s.conTro.nut];
  if (n?.type !== 'hoi-dap' || n.ma !== b.ma || tienDoCua(s, b.ma).biet.length > 0) return null;
  return { ...ghiTuDong(kb, s, b.ma), buoiHoi: null, conTro: { ...s.conTro, nut: s.conTro.nut + 1 } };
}

// ---------- Tiện ích cho giao diện ----------

/**
 * Thay `{{nv.nguoi-choi}}` bằng tên người chơi (chưa đặt tên → `TEN_MAC_DINH`, chỉ để câu không hụt chữ);
 * `{{nv.<mã>}}` khác bằng tên nhân vật trong nhan-vat.md.
 */
export function dienTen(kb: KichBanMvp, s: TrangThaiMvp, text: string): string {
  return text.replace(/\{\{nv\.nguoi-choi\.nganh\}\}/g, () => s.nganh || 'kinh tế').replace(/\{\{nv\.([a-z0-9-]+)\}\}/g, (_m, ma: string) => {
    if (ma === 'nguoi-choi') return s.tenNguoiChoi || TEN_MAC_DINH;
    return kb.nhanVat.find((n) => n.id === ma)?.trongCau ?? ma;
  });
}

const TU_GIOI_THIEU = /(?:^|[.!?…]\s+)(?:còn\s+)?(?:tôi|mình|tớ|tui|em|anh|chị|chú|bác|bà|ông|cô|thầy)\s+là\s+/iu;

/**
 * Nhân vật cần mở thẻ "Nhân vật mới" ở câu thoại đang hiện (`null` = không). Mỗi nhân vật có thẻ giới thiệu mở đúng một lần:
 * ở câu tự xưng kiểu "Tôi là…", "Còn tớ là…" nếu trong chuỗi đang chạy người đó sắp nói một câu như vậy; còn không thì ngay
 * câu đầu tiên người đó nói (bác bảo vệ, thầy cô, Hoài… không ai tự xưng tên — trước 02/10 thẻ của họ không bao giờ hiện).
 */
export function canGioiThieu(kb: KichBanMvp, s: TrangThaiMvp, kn: KhungNhinMvp): string | null {
  if (kn.kind !== 'line') return null;
  const nguoi = kn.loi.speaker;
  if (!nguoi || (s.daGioiThieu ?? []).includes(nguoi)) return null;
  if (!kb.nhanVat.find((n) => n.id === nguoi)?.gioiThieu) return null;
  // Ngày hội chỉ gặp chị trực bàn; chị tự giới thiệu ở buổi Trung thu của CLB.
  if (nguoi === 'minh-anh' && s.conTro?.chuoi === 'md-09-ngay-hoi') return null;
  const tuXung = (text: string): boolean => TU_GIOI_THIEU.test(text.normalize('NFC'));
  if (tuXung(kn.loi.text)) return nguoi;
  const laTuXung = (n: NutMvp): boolean => n.type === 'line' && n.speaker === nguoi && tuXung(n.text);
  const chuoi = s.conTro ? timChuoi(kb, s.conTro.chuoi) : undefined;
  if (!chuoi) return nguoi;
  if (chuoi.nodes.slice((s.conTro?.nut ?? 0) + 1).some(laTuXung)) return null;
  // Câu tự xưng nằm ở chuỗi nối liền phía sau (`[ĐI TỚI]` / `[ĐI CÙNG]` cuối chuỗi): cũng chờ. User 05/10: thẻ "Tùng, bạn cùng
  // phòng 408" bật ngay câu Tùng chỉ đường cho bạn nữ, khi người chơi chưa hỏi tên, chưa biết ở chung phòng.
  let ke: ChuoiMvp | undefined = chuoi;
  for (let i = 0; i < 6 && ke; i++) {
    const cuoi: NutMvp | undefined = ke.nodes[ke.nodes.length - 1];
    const dich: string | undefined = cuoi?.type === 'goto' ? cuoi.to : cuoi && laDiCung(cuoi) ? cuoi.choices[0]?.hauQua.flatMap((h) => (h.kind === 'di-toi' ? [h.chuoi] : []))[0] : undefined;
    ke = dich ? timChuoi(kb, dich) : undefined;
    if (ke?.nodes.some(laTuXung)) return null;
  }
  // Người chơi chỉ đứng ngoài nhìn (cả chuỗi không nói thành tiếng câu nào) và nhân vật này về sau mới tự xưng với người chơi:
  // chưa tới lúc giới thiệu (Hoài hỏi đường Tùng ở sảnh ký túc xá; tới Trung thu mới xưng tên).
  const chiNghi = (t: string): boolean => /^\(.*\)$/s.test(t.trim());
  const nguoiChoiNoi = chuoi.nodes.some((n) => n.type === 'line' && n.speaker === 'player' && !chiNghi(n.text));
  if (!nguoiChoiNoi) {
    const viTri = kb.chuoi.findIndex((c) => c.id === chuoi.id);
    if (viTri >= 0 && kb.chuoi.slice(viTri + 1).some((c) => c.nodes.some(laTuXung))) return null;
  }
  return nguoi;
}

/**
 * Tên hiển thị của người nói (`player` → "Bạn", `narrator` → ""). Truyền `s` (thẻ tên trong hội thoại): nhân vật có thẻ
 * giới thiệu mà chưa được giới thiệu thì hiện cách gọi tạm ("Chị khóa trên", không có thì "???") thay cho tên.
 */
export function tenNguoiNoi(kb: KichBanMvp, speaker: string, s?: TrangThaiMvp): string {
  if (speaker === 'player') return 'Bạn';
  if (speaker === 'narrator') return '';
  const nv = kb.nhanVat.find((n) => n.id === speaker);
  if (s && nv?.gioiThieu && !(s.daGioiThieu ?? []).includes(speaker)) return nv.gioiThieu.khongXungTen ? nv.ten : (nv.gioiThieu.chuaQuen ?? '???');
  return nv?.ten ?? 'Nhân vật';
}

/** Câu SQL của một `[MÀN CHIẾU]`: viết thẳng, hoặc SQL chuẩn của thẻ có vật chứng được trỏ tới. */
export function sqlCuaManChieu(kb: KichBanMvp, nut: Extract<NutMvp, { type: 'projector' }>): string | null {
  const nguon = nut.source;
  if (nguon.kind === 'sql') return nguon.sql;
  const the = Object.values(kb.thuThach).find((t) => t.vatChung?.id === nguon.evidenceId);
  return the?.sqlChuan ?? null;
}

/** Nhãn khung giờ hiện tại cho HUD ("Sáng" … / "Cuối ngày"); ngày theo truyện không có khung → tên ngày. */
export function tenKhungHienTai(kb: KichBanMvp, s: TrangThaiMvp): string {
  if (s.giaiDoan === 'phu') return phuDangLam(kb, s)?.ten ?? '';
  if (s.giaiDoan === 'vu-sau') return vuDangChoi(kb, s)?.ten ?? '';
  if (s.giaiDoan !== 'ngay') return '';
  const ngay = kb.lich.ngay.find((n) => n.so === s.ngay);
  if (ngay?.kieu === 'theo-truyen') return ngay.ten;
  return kb.lich.khung[s.khung]?.ten ?? kb.lich.buoiToi.ten;
}
