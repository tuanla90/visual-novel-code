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
 *   - Gói B19 (docs/mua-1/brief/b19-vu-1-ban-6.md mục 4–5): `[DÒNG THỜI GIAN]` (kéo thẻ vào ô, `dat-the-dtg`; xong mới đi tiếp),
 *     `[HIỆN DÒNG THỜI GIAN]`, lệnh `· tính vạch` (trình sai thêm một vạch `s.vach`, chọn lại tới khi đúng; màn sửa truy vấn báo
 *     `trinh-sai`), `[CHẤM VỤ]` (cờ `<vụ>-rank-a|b|c`, bảng rank `s.bangRank`), `[RẼ KẾT]` theo rank ở bộ có `[CHẤM VỤ]` (A/B kết
 *     thật, C kết tạm), `[SỔ TỔNG KẾT]`, `[ĐIỂM LƯU VỤ]` (chụp trạng thái; `choi-lai-vu` về đó, bảng rank giữ), `[GHÉP MẪU]`.
 */
// Gộp import giá trị và import kiểu trong MỘT câu (Vite bỏ import giá trị khi có `import type` cùng module riêng).
import {
  CAC_TRUONG_BIET,
  type CauNoiMvp,
  type ChangMvp,
  type ChuoiMvp,
  type DiaDiemMvp,
  type DiemKhamPhaMvp,
  type DieuKienMvp,
  type DongThoiGianMvp,
  type DuKienMvp,
  type GioiThieuNhanVatMvp,
  type HauQuaMvp,
  type KetQuaChamVuMvp,
  type KichBanMvp,
  type LoiMvp,
  type MocMvp,
  type NgayMvp,
  type NutMvp,
  type NhiemVuPhuMvp,
  type TheThuThachMvp,
  type TinhVachMvp,
  type TruongBietMvp,
  type VuSauMvp,
} from '../../content/mvp/types';
import { boCoChamVu, chamVu, rankHienTai, soVaTenVu, vuCoChamVu } from './cham-vu';
import { banDungSan, boTheSai, datTuDo, dongThoiGianDung, dongThoiGianXong, goThe, thaDung } from './dong-thoi-gian';
import { MAU_GHIM, type BoiCanhChuoi, type CachChoiMvp, type HetNgayMvp, type KhamPhaMvp, type MauGhimMvp, type MucNhapVaiMvp, type MucSqlMvp, type TrangThaiMvp, type GhiChuTruyVanMvp, type PhieuTruyVanMvp, type TiepTucTuyenMvp } from './trang-thai';
import { laTheHoiDap } from './bang-dieu-tra';
import { cauHoiDaNoi } from './note';

export { cauHoiDaNoi };
import { apBiet } from './biet-ve';
import { cachChoiCua, dongBong, dongChuaGach, ghiTuDong, goiY, hoi, keTiep, khoiThayThe, khungHoiDap, laLoiDaThay, locHauQuaDaThay, moBuoiHoi, napLaiLuot, roiDi, tienDoCua, toHoiDap, type KhungHoiDapMvp } from './hoi-dap';
import { datMuc, laMucNhapVai, laMucSql, quenCachTamThoi } from './muc-choi';

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
  | { type: 'roi-thu-thach' }
  /** Gói B15: người chơi tự bấm hết ngày (chỉ khi khung nhìn cảnh khám phá có `hetNgay`): chạy chuỗi buổi tối rồi sang ngày kế. */
  | { type: 'het-ngay' }
  /** Gói B17 (bộ mùa 1): đặt mức nhập vai / mức SQL (hai câu hỏi đầu ván, menu Cài đặt); áp ngay, không đổi con trỏ. */
  | { type: 'doi-muc'; nhapVai?: MucNhapVaiMvp; sql?: MucSqlMvp }
  /** Gói B19: thả thẻ vào một ô của dòng thời gian đang dựng. Thả sai thì máy đứng yên (giao diện bật thẻ về kèm câu nhắc). */
  | { type: 'dat-the-dtg'; o: string; the: string }
  /** Bảng chân lý: nhấc note khỏi ô về chồng (dòng chính). */
  | { type: 'go-the-dtg'; o: string }
  /** Gói B21: nối hai note trên bảng manh mối. Cặp có khai (`[NỐI]` đã mở) → ra câu hỏi và mở đích; không khai → máy đứng yên (giao diện cho sợi chỉ rơi, `timCauNoi`). */
  | { type: 'noi-the'; a: string; b: string }
  /** Gói B21: mở lại đích "→ tra" của một câu hỏi đã nối (bấm thẻ câu hỏi trên bảng). */
  | { type: 'mo-tra-noi'; cau: string }
  /** Gói B21: rời màn tra mở từ câu hỏi nối (chưa tra xong) về chỗ đang đứng. */
  | { type: 'dong-tra-noi' }
  /** Gói B21: `[ĐỐI CHẤT … · chỉ ô]` — chỉ một ô của bảng chân lý (`<dtg>:<ô>`, ô trống bắt buộc là `<dtg>:?`). */
  | { type: 'chi-o'; o: string }
  /** Gói B19: màn sửa truy vấn `· tính vạch`, bấm "Trình" mà câu chưa đúng → thêm một vạch (lời do giao diện hiện, `loiTrinhSai`). */
  | { type: 'trinh-sai' }
  /** Gói B19: "Chơi lại Vụ n" — về điểm lưu đầu vụ (`vu` thiếu = vụ đang chơi); bảng rank giữ. `luc` = mốc ván mới. */
  | { type: 'choi-lai-vu'; vu?: string; luc?: number };

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
  /** Gói B15: chỗ đã xem mà vẫn bấm được (ghim nơi đã ghé: vào lại cảnh của nơi đó; nhân chứng đã gặp: hỏi lại). */
  vaoLai?: boolean;
  /** Gói B15: ghim nơi đã ghé mà mọi chỗ bấm ở nơi đó đều đã xem (ghim mang dấu tích; vẫn vào lại được). */
  xemHet?: boolean;
}

export type KhungNhinMvp =
  | { kind: 'line'; loi: LoiMvp; display?: 'card' }
  | { kind: 'feedback'; loi: LoiMvp; viTri: number; tong: number }
  | { kind: 'chon-dia-diem'; diaDiem: DiaDiemHienMvp[]; khungConLai: number }
  | { kind: 'question'; nut: Extract<NutMvp, { type: 'question' }>; lanThu: number }
  /** `[ĐỐI CHẤT]`: thẻ đã trình (mờ, không trình lại), mức cao nhất đã đạt, số lần trình. */
  | { kind: 'doi-chat'; nut: Extract<NutMvp, { type: 'doi-chat' }>; daTrinh: string[]; muc: 'khong' | 'goi-y' | 'ho-tro' | 'du'; lanThu: number; /** Lần trình sai còn lại trước khi hết lượt. */ conLuot: number; /** Gói B21 (`· chỉ ô`): các ô đang chỉ dở của câu trả lời nhiều ô. */ oDangChon: string[] }
  | { kind: 'line-pick'; nut: Extract<NutMvp, { type: 'line-pick' }>; lanThu: number }
  | { kind: 'branch'; nut: Extract<NutMvp, { type: 'branch' }>; luaChon: Extract<NutMvp, { type: 'branch' }>['choices'] }
  | { kind: 'show-document'; documentId: string }
  | { kind: 'image'; imageId: string }
  /** `tinhVach` (gói B19): màn sửa `· tính vạch` (hai nút Chạy thử / Trình). */
  | { kind: 'challenge' | 'fix-query'; thuThach: TheThuThachMvp; tinhVach?: TinhVachMvp }
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
      /**
       * Gói B15: việc chính của ngày đã xong, cảnh có nút hết ngày (`het-ngay`). `nhan` = chữ trên nút; `conChuaGhe` = số ghim
       * có dấu trên bản đồ của ngày chưa ghé (giao diện hỏi lại trước khi hết ngày). `null` / thiếu = chưa hết ngày được.
       */
      hetNgay?: { nhan: string; conChuaGhe: number } | null;
    }
  /** `[HỎI ĐÁP]` (gói B12): buổi hỏi nhân chứng đang mở (xem `hoi-dap.ts`). */
  | { kind: 'hoi-dap'; hoiDap: KhungHoiDapMvp }
  /**
   * Gói B19 `[DÒNG THỜI GIAN]` / `[HIỆN DÒNG THỜI GIAN]` (`chiXem`): `daDat` = ô → thẻ đã thả đúng; `xong` = mọi ô cần kéo đã có thẻ.
   */
  | { kind: 'dong-thoi-gian'; dtg: DongThoiGianMvp; daDat: Record<string, string>; xong: boolean; chiXem: boolean }
  /** Gói B19 `[SỔ TỔNG KẾT]`: trang tổng kết vụ trong sổ CLB; `ket` = kết quả chấm (null = vụ chưa chấm). */
  | { kind: 'so-tong-ket'; vu: string; soVu: number; tenVu: string; ket: KetQuaChamVuMvp | null }
  /** Gói B19 `[GHÉP MẪU]`: bảng điều tra với hai thẻ vừa ghép, chỉ đỏ và giấy nhớ. */
  | { kind: 'ghep-mau'; nut: Extract<NutMvp, { type: 'ghep-mau' }> }
  /** `vu`: vụ sau vừa kết (`null` = vụ gốc, dùng `ketQua`); `vuKe`: vụ chơi tiếp được, nếu còn. */
  | {
      kind: 'end';
      /** `tam` (gói B19): kết tạm của bộ có `[CHẤM VỤ]`. */
      ketQua: 'that' | 'thuong' | 'tam';
      /**
       * Gói B19: vụ vừa kết có `[CHẤM VỤ]` → màn kết kiểu sổ CLB (kết thật / kết tạm, trang sổ có dấu, "Chơi lại Vụ n").
       * `null` / thiếu = màn kết cũ (bộ MVP). `choiLai` = có điểm lưu đầu vụ để chơi lại.
       */
      chamVu?: { vu: string; soVu: number; tenVu: string; ket: KetQuaChamVuMvp | null; choiLai: boolean } | null;
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

/**
 * `[HẾT NGÀY <chuỗi tối>] <nhãn>` (gói B15; bộ chuyển đổi dựng thành rẽ nhánh một lựa chọn `het-ngay-…`): việc chính của ngày
 * đã xong. Bộ điều hướng tự do thì máy không chạy chuỗi tối, chờ người chơi bấm hết ngày; bộ khác coi như `[ĐI CÙNG]`.
 */
function laHetNgay(nut: NutMvp): nut is Extract<NutMvp, { type: 'branch' }> {
  return nut.type === 'branch' && nut.id.startsWith('het-ngay-') && nut.choices.length === 1;
}

/** Gói B15: lời chờ hết ngày còn hiệu lực (đúng ngày đang đứng, bộ điều hướng tự do); không thì `null`. */
export function hetNgayDangCho(kb: KichBanMvp, s: TrangThaiMvp): HetNgayMvp | null {
  const h = s.hetNgay;
  return dieuHuongTuDo(kb) && h && !h.daBam && s.giaiDoan === 'ngay' && h.ngay === s.ngay ? h : null;
}

/** Xóa lời chờ hết ngày (sang ngày, buổi họp, vụ sau); trạng thái không có trường thì giữ nguyên hình dạng. */
function quenHetNgay(s: TrangThaiMvp): TrangThaiMvp {
  return s.hetNgay ? { ...s, hetNgay: null } : s;
}

/** Vị trí nút `[HỎI ĐÁP]` có tờ dữ kiện trong chuỗi của một chỗ bấm (chỗ bấm là một nhân chứng); không có thì `null`. */
function nutHoiDapCua(kb: KichBanMvp, chuoi: string): { nut: number; ma: string } | null {
  const nodes = timChuoi(kb, chuoi)?.nodes ?? [];
  for (let i = 0; i < nodes.length; i++) {
    const n = nodes[i];
    if (n?.type === 'hoi-dap' && toHoiDap(kb, n.ma)) return { nut: i, ma: n.ma };
  }
  return null;
}

/** Gói B15: nhân chứng đã gặp (chuỗi đã chạy một lần, không có việc dở) thì bấm lại là hỏi lại, không chạy lại chuỗi. */
function hoiLaiDuoc(kb: KichBanMvp, s: TrangThaiMvp, chuoi: string): { nut: number; ma: string } | null {
  if (!(s.daXemDiem ?? []).includes(chuoi) || s.dangDo?.[chuoi]) return null;
  return nutHoiDapCua(kb, chuoi);
}

/**
 * Gói B15: cảnh khám phá của một nơi đã ghé (ghim bản đồ `ghim`), dựng lại từ các chỗ đã bấm trong cả ván (`daXemDiem`).
 * Nhân chứng còn dòng chưa gạch và chỗ còn việc dở thì coi như chưa xem. Chuỗi của ghim không có cảnh khám phá thường → `null`.
 */
function canhNoiDaGhe(kb: KichBanMvp, s: TrangThaiMvp, ghim: string, boiCanh: BoiCanhChuoi): KhamPhaMvp | null {
  const nodes = timChuoi(kb, ghim)?.nodes ?? [];
  const i = nodes.findIndex((n) => n.type === 'explore' && laCanhThuong(n));
  const nut = nodes[i];
  if (!nut || nut.type !== 'explore') return null;
  const da = s.daXemDiem ?? [];
  const conThieu = (chuoi: string): boolean => {
    const hd = nutHoiDapCua(kb, chuoi);
    const to = hd ? toHoiDap(kb, hd.ma) : undefined;
    return !!to && dongChuaGach(s, to).length > 0;
  };
  const daXem = nut.diem.filter((d) => da.includes(d.chuoi) && !s.dangDo?.[d.chuoi] && !conThieu(d.chuoi)).map((d) => d.chuoi);
  return { veLai: { chuoi: ghim, nut: i, boiCanh }, daXem, vaoLai: true };
}

/** Gói B15: bản đồ của ngày đang đứng. Lấy gốc của chồng cảnh `goiY` nếu đó là bản đồ, không thì dựng lại từ chuỗi của ngày. */
function banDoCuaNgay(kb: KichBanMvp, s: TrangThaiMvp, goiY: KhamPhaMvp | null): KhamPhaMvp | null {
  let goc = goiY;
  while (goc?.cha) goc = goc.cha;
  if (goc && nutKhamPha(kb, goc)?.kieu === 'ban-do') return goc;
  const ngay = kb.lich.ngay.find((n) => n.so === s.ngay);
  const chuoi = ngay?.chuoi ? timChuoi(kb, ngay.chuoi) : undefined;
  const i = chuoi ? chuoi.nodes.findIndex((n) => n.type === 'explore' && n.kieu === 'ban-do') : -1;
  const nut = chuoi?.nodes[i];
  if (!chuoi || !nut || nut.type !== 'explore') return null;
  const da = s.daXemDiem ?? [];
  // Ghim rời giữa chừng (còn việc dở trong `dangDo`) thì chưa tính là đã ghé.
  return { veLai: { chuoi: chuoi.id, nut: i, boiCanh: 'truyen' }, daXem: nut.diem.filter((d) => da.includes(d.chuoi) && !s.dangDo?.[d.chuoi]).map((d) => d.chuoi) };
}

/**
 * Gói B15: cảnh người chơi đứng lại sau khi việc chính của ngày xong: cảnh đang mở (dòng `[HẾT NGÀY]` nằm trong chuỗi của một
 * chỗ bấm), cảnh vừa đóng vì `[ĐI TỚI]` nếu vẫn cùng nơi (phòng CLB, sau màn tra trên laptop), không thì bản đồ của ngày.
 */
function canhSauViecChinh(kb: KichBanMvp, s: TrangThaiMvp): KhamPhaMvp | null {
  const conTro = s.conTro;
  if (!conTro) return null;
  const kp = s.khamPha ?? null;
  if (kp && conTro.chuoi !== kp.veLai.chuoi && nutKhamPha(kb, kp)) return kp;
  const lui = s.canhLui ?? null;
  if (lui && nutKhamPha(kb, lui) && timChuoi(kb, lui.veLai.chuoi)?.canh === timChuoi(kb, conTro.chuoi)?.canh) return lui;
  return banDoCuaNgay(kb, s, lui ?? kp);
}

/** Lời nhắc việc khi chờ hết ngày: lời viết sẵn của một bạn đi cùng (`hoi-dap/dong-hanh.json`), điền nhãn của nút hết ngày. */
export function loiHetNgay(kb: KichBanMvp, s: TrangThaiMvp, nhan: string): { nhanVat: string; text: string } | null {
  const loi = kb.hoiDap?.dongHanh?.loi ?? {};
  const ban = [s.nhacViec?.nhanVat, 'ha-vy', ...Object.keys(loi)].find((b): b is string => !!b && !!loi[b]?.hetNgay);
  const khuon = ban ? loi[ban]?.hetNgay : undefined;
  if (!ban || !khuon) return null;
  return { nhanVat: ban, text: dienNhanHetNgay(khuon, nhan) };
}

/** Điền `{nhan}` của một lời "hết ngày". Nhãn là một cụm động từ ("Về phòng KTX ăn tối"): đặt giữa câu thì viết thường chữ đầu. */
export function dienNhanHetNgay(khuon: string, nhan: string): string {
  return khuon.replace(/\{nhan\}/g, nhan.charAt(0).toLocaleLowerCase('vi') + nhan.slice(1));
}

/**
 * Gói B15: gặp `[HẾT NGÀY]`. Ghi nhận "hôm nay hết ngày được" rồi đưa người chơi về cảnh đang đứng; không có cảnh nào để về
 * (ngày không có bản đồ) thì chạy luôn chuỗi tối như `[ĐI CÙNG]`.
 */
function choHetNgay(kb: KichBanMvp, s: TrangThaiMvp, nut: Extract<NutMvp, { type: 'branch' }>): TrangThaiMvp {
  const lc = nut.choices[0];
  const chuoiToi = lc?.hauQua.flatMap((h) => (h.kind === 'di-toi' ? [h.chuoi] : []))[0] ?? null;
  const ve = canhSauViecChinh(kb, s);
  if (!ve) return chuoiToi ? nhayToi(kb, s, chuoiToi, 'truyen') : ketThucNgay(kb, { ...s, khamPha: null, hoiDap: null, buoiHoi: null });
  const nhan = lc?.text ?? '';
  const nhac = loiHetNgay(kb, s, nhan);
  return {
    ...s,
    hetNgay: { ngay: s.ngay, chuoi: chuoiToi, nhan },
    ...(nhac ? { nhacViec: { ...nhac, tu: s.conTro?.chuoi ?? '' } } : {}),
    hoiDap: null,
    buoiHoi: null,
    khamPha: ve,
    canhLui: null,
    conTro: { ...ve.veLai },
  };
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
function ketQuaVuGoc(kb: KichBanMvp, s: TrangThaiMvp): 'that' | 'thuong' | 'tam' {
  return s.ketQua ?? (s.conTro?.chuoi === kb.lich.ket?.that ? 'that' : 'thuong');
}

/**
 * Cờ máy đặt khi một vụ tới `[KẾT THÚC]`: `<mã vụ>-hoan-tat`; vụ gốc thêm `<mã vụ>-ket-that` hay `-ket-thuong` (vụ sau đọc
 * bằng `[NẾU]` / `[KHI]`). Chỉ đặt khi lịch có vụ sau — bộ một vụ giữ nguyên trạng thái như trước. Gói B19: bộ có `[CHẤM VỤ]`
 * luôn đặt (`-ket-that` / `-ket-tam`).
 */
function coKhiKet(kb: KichBanMvp, s: TrangThaiMvp): TrangThaiMvp {
  if ((kb.lich.vuSau ?? []).length === 0 && (kb.lich.nhiemVuPhu ?? []).length === 0 && !boCoChamVu(kb)) return s;
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
    ...(s.hetNgay ? { hetNgay: null } : {}),
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

/** Cảnh khám phá "thường" (vật / người trên cảnh): không kiểu, hay kiểu dàn (gói B19: người đứng trên dàn, luật như cảnh thường). */
function laCanhThuong(n: Extract<NutMvp, { type: 'explore' }>): boolean {
  return !n.kieu || n.kieu === 'dan';
}

function nutKhamPha(kb: KichBanMvp, kp: KhamPhaMvp): Extract<NutMvp, { type: 'explore' }> | undefined {
  const n = timChuoi(kb, kp.veLai.chuoi)?.nodes[kp.veLai.nut];
  return n?.type === 'explore' ? n : undefined;
}

/** Chỗ bấm hiện khi mọi chuỗi ở "sau:" đã xem. */
export function diemDangHien(nut: Extract<NutMvp, { type: 'explore' }>, daXem: readonly string[], hienTruong: readonly string[] = []): DiemKhamPhaHienMvp[] {
  // Gói B21: `→ hiện trường` mở thêm chỗ bấm dù "sau:" chưa đủ (`hienTruong` = chuỗi của chỗ bấm đã mở).
  return nut.diem.filter((d) => hienTruong.includes(d.chuoi) || d.sau.every((x) => daXem.includes(x))).map((d) => ({ diem: d, daXem: daXem.includes(d.chuoi) }));
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
  return !!nut && laCanhThuong(nut) && nutKhamPha(kb, kp.cha)?.kieu === 'ban-do';
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
  // Gói B15: đang chờ hết ngày thì cảnh gốc (bản đồ, cảnh không vào từ bản đồ) không có "Đi tiếp": đường ra là nút hết ngày.
  if (!kp.cha && hetNgayDangCho(kb, s)) return null;
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
  // Gói B15: đang chờ hết ngày thì cảnh gốc không tự đi tiếp (kẻo hết chuỗi của ngày là sang ngày kế, bỏ mất buổi tối).
  const choHet = !kp.cha && !!hetNgayDangCho(kb, s);
  const tuDi = !dieuHuongTuDo(kb) || (!laNoiTrenBanDo(kb, kp) && !choHet && nut.diem.every((d) => kp.daXem.includes(d.chuoi)));
  const xong = xongChinhCua(nut, kp.daXem);
  if (xong && tuDi) {
    return { ...s, conTro: { ...kp.veLai, nut: kp.veLai.nut + 1 }, hoiDap: null, khamPha: kp.cha ?? null };
  }
  return { ...goNhacCu(kb, s, nut, xong), conTro: { ...kp.veLai }, hoiDap: null };
}

/**
 * Gói B15 (mục D): vừa xong việc chính ở một cảnh (chuỗi của điểm "!" cuối cùng vừa hết) thì gỡ lời nhắc việc đặt từ TRƯỚC đó
 * (câu nhắc cũ, vd "Tới đó hỏi cô là rõ" sau khi đã hỏi cô xong). Chỉ giữ lời nhắc đặt ở CUỐI chính chuỗi vừa chạy (câu dặn việc
 * kế: sau nó chuỗi không còn dòng lời nào). Chỉ bộ điều hướng tự do.
 */
function goNhacCu(kb: KichBanMvp, s: TrangThaiMvp, nut: Extract<NutMvp, { type: 'explore' }>, xong: boolean): TrangThaiMvp {
  const chuoi = s.conTro?.chuoi;
  const nhac = s.nhacViec;
  if (!dieuHuongTuDo(kb) || !xong || !nhac || !chuoi || hetNgayDangCho(kb, s)) return s;
  const laLoiDan = nhac.tu === chuoi && nhac.tuNut !== undefined && !(timChuoi(kb, chuoi)?.nodes ?? []).slice(nhac.tuNut + 1).some((n) => n.type === 'line');
  if (laLoiDan) return s;
  const d = nut.diem.find((x) => x.chuoi === chuoi);
  const coChinh = nut.diem.some((x) => x.dau === 'chinh');
  if (!d || !laCanhThuong(nut) || (coChinh && d.dau !== 'chinh')) return s;
  return { ...s, nhacViec: null };
}

function loi(s: TrangThaiMvp, message: string): TrangThaiMvp {
  return { ...s, loi: message, conTro: null };
}

// ---------- Gói B21: chặng ----------

/** Chặng đang chơi (giai đoạn `ngay` mà ngày hiện tại là một chặng); không phải chặng → `undefined`. */
export function changHienTai(kb: KichBanMvp, s: TrangThaiMvp): (NgayMvp & { chang: ChangMvp }) | undefined {
  if (s.giaiDoan !== 'ngay') return undefined;
  const n = kb.lich.ngay.find((x) => x.so === s.ngay);
  return n?.chang ? (n as NgayMvp & { chang: ChangMvp }) : undefined;
}

/** Ai đang ở ghim nào trong chặng đang chơi (`- Có mặt:` ở lich.md); không phải chặng hay chặng không khai → `null` (dùng lịch "Thường ở"). */
export function coMatChang(kb: KichBanMvp, s: TrangThaiMvp): { nhanVat: string; noi: string }[] | null {
  const ch = changHienTai(kb, s)?.chang;
  return ch && ch.coMat.length > 0 ? ch.coMat : null;
}

/** Mã `có <mã>` của điều kiện chốt đều đã có (thẻ hồ sơ, cờ, câu hỏi nối đã nối). */
function coMa(s: TrangThaiMvp, id: string): boolean {
  return coTrongHoSo(s, id) || (s.cauNoiXong ?? []).includes(id);
}

/**
 * Đạt điều kiện chốt của chặng đang chơi thì chạy chuỗi `Khi chốt` (hết chuỗi → sang chặng sau; không có chuỗi → sang luôn). Chỉ xét
 * ở chỗ yên (cảnh khám phá, hết chuỗi) để không cắt ngang một đoạn thoại đang đọc; không xét trong chính chuỗi `Khi chốt`.
 */
function chotChang(kb: KichBanMvp, s: TrangThaiMvp): TrangThaiMvp | null {
  const n = changHienTai(kb, s);
  const ch = n?.chang;
  if (!n || !ch || ch.chotKhi.length === 0 || s.conTro?.boiCanh === 'chang-chot' || s.thuThachDangLam) return null;
  if (!ch.chotKhi.every((id) => coMa(s, id))) return null;
  if (ch.khiChot && timChuoi(kb, ch.khiChot)) return nhayToi(kb, { ...s, nhacViec: null, thuThachDangLam: null, traTuNoi: null }, ch.khiChot, 'chang-chot');
  return sangChangKe(kb, s);
}

// ---------- Gói B21: nối note thành câu hỏi ----------

/** Cặp `[NỐI]` đã mở khớp hai thẻ `a`, `b` (thứ tự nào cũng được) mà người chơi đang có cả hai; không có → `null`. */
export function timCauNoi(kb: KichBanMvp, s: TrangThaiMvp, a: string, b: string): CauNoiMvp | null {
  if (a === b || !coMa(s, a) || !coMa(s, b)) return null;
  return (kb.cacCauNoi ?? []).find((c) => (s.cauNoiMo ?? []).includes(c.id) && ((c.the[0] === a && c.the[1] === b) || (c.the[0] === b && c.the[1] === a))) ?? null;
}

/** Mở đích của một câu hỏi vừa nối: `→ tra` mở màn tra (đóng thì về chỗ đang đứng); `→ hiện trường` thêm ghim hoặc chạy một chuỗi. */
function apDichNoi(kb: KichBanMvp, s: TrangThaiMvp, cau: CauNoiMvp): TrangThaiMvp {
  const d = cau.dich;
  if (d.kind === 'tra') return s.thuThachXong.includes(d.thuThach) || s.thuThachDangLam ? s : { ...s, thuThachDangLam: d.thuThach, traTuNoi: d.thuThach };
  if (d.chuoi) return timChuoi(kb, d.chuoi) ? nhayToi(kb, s, d.chuoi, s.conTro?.boiCanh ?? 'truyen') : s;
  // Ghim của bản đồ đang chơi (chuỗi của ngày / chặng hiện tại); không tìm được thì xét mọi bản đồ.
  const chuoiNgay = kb.lich.ngay.find((n) => n.so === s.ngay)?.chuoi;
  const timTrong = (chuoiId: string | null | undefined): string[] =>
    (chuoiId ? (timChuoi(kb, chuoiId)?.nodes ?? []) : []).flatMap((n) => (n.type === 'explore' ? n.diem.filter((p) => p.sprite === `ghim:${d.ghim ?? ''}`).map((p) => p.chuoi) : []));
  const ids = s.giaiDoan === 'ngay' && timTrong(chuoiNgay).length > 0 ? timTrong(chuoiNgay) : kb.chuoi.flatMap((c) => timTrong(c.id));
  return { ...s, hienTruong: ids.reduce((ds, id) => them(ds, id), s.hienTruong ?? []) };
}

/** Cả `[HẾT CHẶNG]` lẫn chặng chốt xong: dọn trạng thái dở của chặng cũ rồi sang chặng kế (hết chặng cuối thì sang buổi họp). */
function sangChangKe(kb: KichBanMvp, s: TrangThaiMvp): TrangThaiMvp {
  return ketThucNgay(kb, { ...s, hoiDap: null, buoiHoi: null, khamPha: null, canhLui: null, nhacViec: null, thuThachDangLam: null, traTuNoi: null });
}

function batDauNgay(kb: KichBanMvp, s: TrangThaiMvp, so: number): TrangThaiMvp {
  const ngay = kb.lich.ngay.find((n) => n.so === so);
  if (!ngay) return batDauHop(kb, s);
  s = {
    ...quenHetNgay(quenCanhLui(s)),
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
  // Chặng: ngày truyện của chặng thay ngày tính từ lịch (HUD, lịch nhân vật theo thứ đều đọc `ngayThang`).
  if (ngay.chang?.ngayTruyen) s = { ...s, ngayThang: ngay.chang.ngayTruyen };
  if (ngay.kieu === 'theo-truyen') return { ...s, conTro: ngay.chuoi ? { chuoi: ngay.chuoi, nut: 0, boiCanh: 'truyen' } : null };
  return s;
}

function batDauHop(kb: KichBanMvp, s: TrangThaiMvp): TrangThaiMvp {
  const hop = kb.lich.ngayHop;
  if (!hop) return loi(s, 'Lịch không có ngày họp.');
  return {
    ...quenHetNgay(quenCanhLui(s)),
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
    case 'truyen': {
      // Gói B15, lưới an toàn (ô lưu tạo trước gói, đứng giữa một chuỗi từng nối liền sang nơi khác): ngày có bản đồ mà chuỗi hết
      // khi người chơi chưa bấm hết ngày và việc chính trên bản đồ chưa xong → về bản đồ của ngày, không sang ngày kế.
      const daBam = !!s.hetNgay?.daBam && s.hetNgay.ngay === s.ngay;
      const ve = dieuHuongTuDo(kb) && s.giaiDoan === 'ngay' && !daBam ? banDoCuaNgay(kb, s, null) : null;
      const nutBanDo = ve ? nutKhamPha(kb, ve) : undefined;
      // Gói B21: chặng không có nút "Hết ngày" — chuỗi hết mà chặng chưa chốt thì về bản đồ (nếu có), xong việc chính cũng vậy.
      const trongChang = !!changHienTai(kb, s);
      if (ve && nutBanDo && (trongChang || !xongChinhCua(nutBanDo, ve.daXem))) return { ...s, khamPha: ve, canhLui: null, hoiDap: null, conTro: { ...ve.veLai } };
      return ketThucNgay(kb, s);
    }
    case 'chang-chot':
      // Gói B21: hết chuỗi "Khi chốt" của chặng → sang chặng sau.
      return sangChangKe(kb, s);
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
    case 'dong-thoi-gian':
    case 'hien-dong-thoi-gian':
    case 'so-tong-ket':
    case 'ghep-mau':
      return true;
    default:
      return false;
  }
}

// ---------- Gói B19: vạch, điểm lưu đầu vụ ----------

/** Thông tin `· tính vạch` của nút con trỏ đang đứng (trắc nghiệm, đối chất, sửa truy vấn); không có → `null`. */
export function tinhVachHienTai(kb: KichBanMvp, s: TrangThaiMvp): TinhVachMvp | null {
  const n = s.conTro ? timChuoi(kb, s.conTro.chuoi)?.nodes[s.conTro.nut] : undefined;
  return n && (n.type === 'question' || n.type === 'doi-chat' || n.type === 'fix-query') && n.tinhVach ? n.tinhVach : null;
}

/** Thêm một vạch; trả kèm lời `[SAI LẦN ĐẦU CẢ BUỔI]` nếu đây là vạch đầu tiên của buổi. */
function themVach(s: TrangThaiMvp, tv: TinhVachMvp | undefined): { s: TrangThaiMvp; them: LoiMvp[] } {
  const truoc = s.vach ?? 0;
  return { s: { ...s, vach: truoc + 1 }, them: truoc === 0 ? (tv?.saiLanDau ?? []) : [] };
}

/**
 * Lời hiện khi bấm "Trình" sai ở màn sửa `· tính vạch` đang đứng: "Khi trình sai" của thẻ, cộng `[SAI LẦN ĐẦU CẢ BUỔI]` nếu lần
 * này là vạch đầu tiên. Giao diện gọi TRƯỚC khi gửi `trinh-sai`.
 */
export function loiTrinhSai(kb: KichBanMvp, s: TrangThaiMvp): LoiMvp[] {
  const n = s.conTro ? timChuoi(kb, s.conTro.chuoi)?.nodes[s.conTro.nut] : undefined;
  if (n?.type !== 'fix-query' || !n.tinhVach) return [];
  return [...(kb.thuThach[n.challengeId]?.khiTrinhSai ?? []), ...((s.vach ?? 0) === 0 ? (n.tinhVach.saiLanDau ?? []) : [])];
}

/** Ảnh chụp của điểm lưu: trạng thái bỏ bảng rank và các điểm lưu (hai thứ này không bị chơi lại chụp đè). */
function chupDiemLuu(s: TrangThaiMvp): TrangThaiMvp {
  const chup: TrangThaiMvp = { ...s };
  delete chup.diemLuuVu;
  delete chup.bangRank;
  return chup;
}

/** Vụ "Chơi lại" được từ trạng thái này (vụ đang chơi có điểm lưu đầu vụ); không → `null`. Việc phụ không có. */
export function vuChoiLai(kb: KichBanMvp, s: TrangThaiMvp): { vu: string; soVu: number; tenVu: string } | null {
  if (s.giaiDoan === 'phu') return null;
  const vu = s.vu ?? kb.lich.vu.id;
  if (!s.diemLuuVu?.[vu]) return null;
  const { so, ten } = soVaTenVu(kb, vu);
  return { vu, soVu: so, tenVu: ten };
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
    if (s.canh !== chuoi.canh) s = { ...s, canh: chuoi.canh, ...(s.raDan?.length ? { raDan: [] } : {}), ...(s.vaoDan?.length ? { vaoDan: [] } : {}) };
    // Gói B21: chặng đạt điều kiện chốt (ở chỗ yên: cảnh khám phá, hết chuỗi) → chạy "Khi chốt" rồi sang chặng sau.
    if (nut === undefined || nut.type === 'explore') {
      const chot = chotChang(kb, s);
      if (chot) {
        s = chot;
        continue;
      }
    }
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
    // Gói B15: `[HẾT NGÀY]` ở ngày điều tra của bộ điều hướng tự do → ghi nhận, về cảnh đang đứng, chờ người chơi bấm hết ngày.
    if (laHetNgay(nut) && dieuHuongTuDo(kb)) {
      if (s.giaiDoan === 'ngay') {
        s = choHetNgay(kb, s, nut);
        continue;
      }
      // Ngoài ngày điều tra (vụ sau, việc phụ): chỉ một đường, đi luôn như `[ĐI CÙNG]`.
      const kq = apHauQua(kb, s, nut.choices[0]?.hauQua ?? []);
      s = kq.daNhay ? kq.s : tienNut(kq.s);
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
        s = tienNut({ ...s, nhacViec: { nhanVat: nut.speaker, ...(nut.expression ? { bieuCam: nut.expression } : {}), text: nut.text, ...(dieuHuongTuDo(kb) ? { tu: conTro.chuoi, tuNut: conTro.nut } : {}) } });
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
      case 'diem-luu-vu': {
        // Gói B19: điểm lưu đầu vụ — vạch về 0, chụp trạng thái ngay sau nút này (không kèm bảng rank / điểm lưu).
        const sach = tienNut({ ...s, vach: 0 });
        s = { ...sach, diemLuuVu: { ...(s.diemLuuVu ?? {}), [nut.vu]: chupDiemLuu(sach) } };
        break;
      }
      case 'cham-vu': {
        // Gói B19: chấm vụ — cờ rank mới thay cờ cũ, bảng rank ghi đè vụ này; vạch về 0 (đã ghi trong bảng rank).
        const ket = chamVu(kb, s, nut);
        const co = s.co.filter((c) => !c.startsWith(`${nut.vu}-rank-`));
        s = tienNut({ ...s, co: [...co, `${nut.vu}-rank-${ket.rank}`], bangRank: { ...(s.bangRank ?? {}), [nut.vu]: ket }, vach: 0 });
        break;
      }
      case 'ending-branch': {
        const ket = kb.lich.ket;
        if (!ket) return loi(s, 'Lịch không có mục Kết.');
        if (boCoChamVu(kb)) {
          // Gói B19: rẽ theo rank của vụ gốc — A/B kết thật, C kết tạm; cờ <vụ>-ket-that / -ket-tam đặt ngay lúc rẽ.
          const vu = kb.lich.vu.id;
          const that = rankHienTai(s, vu) !== 'c';
          const ketQua = that ? 'that' : 'tam';
          const co = s.co.filter((c) => c !== `${vu}-ket-that` && c !== `${vu}-ket-tam`);
          s = { ...nhayToi(kb, s, that ? ket.that : (ket.tam ?? ket.thuong), 'ket'), ketQua, co: [...co, `${vu}-ket-${ketQua}`] };
          break;
        }
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
      case 'het-chang':
        // Gói B21: `[HẾT CHẶNG]` — sang chặng kế (hết chặng cuối thì sang buổi họp).
        s = sangChangKe(kb, s);
        break;
      case 'doi-loai':
        // Gói B21: manh mối thành sự thật — thẻ sang chồng của bảng chân lý.
        s = tienNut({ ...s, doiLoai: them(s.doiLoai ?? [], nut.the) });
        break;
      case 'cac-cau-noi':
        // Gói B21: mở các cặp người chơi nối được trên bảng manh mối.
        s = tienNut({ ...s, cauNoiMo: nut.cac.reduce((ds, n) => them(ds, n.id), s.cauNoiMo ?? []) });
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
      case 'biet':
        // Gói B18: người chơi vừa biết thêm ô thẻ nhân vật (họ tên, năm…); giao diện đọc `bietVe` để ghi vào thẻ và báo một dòng.
        s = tienNut(apBiet(s, nut.nhanVat, nut.truong));
        break;
      case 'stage': {
        // `[RA x]`: x rời dàn chân dung (giao diện đọc `raDan`); `[VÀO x]`: hết rời. Trí nhớ bạn đi cùng đọc thẳng nút này.
        const da = s.raDan ?? [];
        if (nut.action === 'ra' && !da.includes(nut.nhanVat)) s = { ...s, raDan: [...da, nut.nhanVat] };
        else if (nut.action === 'vao') {
          // `[VÀO x]` còn đưa người chưa nói lên dàn (Hà Vy lúc được chào, Quân lúc bị soi, Hoài lúc được gọi vào).
          const vao = s.vaoDan ?? [];
          s = { ...s, ...(da.includes(nut.nhanVat) ? { raDan: da.filter((x) => x !== nut.nhanVat) } : {}), ...(vao.includes(nut.nhanVat) ? {} : { vaoDan: [...vao, nut.nhanVat] }) };
        }
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
      return { kind: 'doi-chat', nut, daTrinh: dc?.daTrinh ?? [], muc: dc?.muc ?? 'khong', lanThu: lanThu(nut.id), conLuot: Math.max(0, SO_LAN_SAI_DOI_CHAT - (dc?.sai ?? 0)), oDangChon: dc?.o ?? [] };
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
      if (!the) return { kind: 'error', message: `Không có thẻ thử thách "${nut.challengeId}".` };
      return nut.type === 'fix-query' && nut.tinhVach ? { kind: nut.type, thuThach: the, tinhVach: nut.tinhVach } : { kind: nut.type, thuThach: the };
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
      const diem = diemDangHien(nut, s.khamPha?.daXem ?? [], s.hienTruong ?? []);
      if (!dieuHuongTuDo(kb)) return { kind: 'explore', nut, diem };
      // Gói B15: ghim nơi đã ghé và nhân chứng đã gặp vẫn bấm được (`vaoLai`); cảnh thường và bản đồ có nút hết ngày khi được.
      const boiCanh = s.conTro?.boiCanh ?? 'truyen';
      const diemLai = diem.map((d) => {
        if (!d.daXem || nut.kieu === 'quan-sat') return d;
        if (nut.kieu !== 'ban-do') return hoiLaiDuoc(kb, s, d.diem.chuoi) ? { ...d, vaoLai: true } : d;
        const trong = canhNoiDaGhe(kb, s, d.diem.chuoi, boiCanh);
        const nutTrong = trong ? nutKhamPha(kb, trong) : undefined;
        if (!trong || !nutTrong) return d;
        return nutTrong.diem.every((p) => trong.daXem.includes(p.chuoi)) ? { ...d, vaoLai: true, xemHet: true } : { ...d, vaoLai: true };
      });
      const hn = nut.kieu === 'quan-sat' ? null : hetNgayDangCho(kb, s);
      return {
        kind: 'explore',
        nut,
        diem: diemLai,
        xongChinh: xongChinhCua(nut, s.khamPha?.daXem ?? []),
        roi: cachRoiCanh(kb, s),
        ...(hn ? { hetNgay: { nhan: hn.nhan, conChuaGhe: soNoiChuaGhe(kb, s) } } : {}),
      };
    }
    case 'hoi-dap': {
      const hd = khungHoiDap(kb, s, nut.ma);
      return hd ? { kind: 'hoi-dap', hoiDap: hd } : { kind: 'error', message: `Không có tờ dữ kiện "${nut.ma}".` };
    }
    case 'dong-thoi-gian':
    case 'hien-dong-thoi-gian': {
      const d = kb.dongThoiGian?.[nut.id];
      if (!d) return { kind: 'error', message: `Không có dòng thời gian "${nut.id}".` };
      const luu = s.dongThoiGian?.[nut.id];
      const chiXem = nut.type === 'hien-dong-thoi-gian';
      // Xem lại mà ván chưa từng dựng (ô lưu cũ, nhảy tới): hiện bản dựng sẵn.
      const daDat = chiXem && !luu?.xong ? banDungSan(d) : (luu?.o ?? {});
      return { kind: 'dong-thoi-gian', dtg: d, daDat, xong: dongThoiGianXong(d, daDat), chiXem };
    }
    case 'so-tong-ket': {
      const { so, ten } = soVaTenVu(kb, nut.vu);
      return { kind: 'so-tong-ket', vu: nut.vu, soVu: so, tenVu: ten, ket: s.bangRank?.[nut.vu] ?? null };
    }
    case 'ghep-mau':
      return { kind: 'ghep-mau', nut };
    case 'end': {
      const vuKet = s.giaiDoan === 'phu' ? null : (vuDangChoi(kb, s)?.id ?? kb.lich.vu.id);
      const coCham = vuKet !== null && vuCoChamVu(kb).has(vuKet);
      const sv = vuKet ? soVaTenVu(kb, vuKet) : null;
      return {
        kind: 'end',
        ketQua: s.ketQua ?? ketQuaVuGoc(kb, s),
        ...(coCham && vuKet && sv ? { chamVu: { vu: vuKet, soVu: sv.so, tenVu: sv.ten, ket: s.bangRank?.[vuKet] ?? null, choiLai: !!s.diemLuuVu?.[vuKet] } } : {}),
        vu: s.giaiDoan === 'phu' ? null : vuDangChoi(kb, s),
        vuKe: s.giaiDoan === 'phu' ? null : vuKeTiep(kb, s),
        phu: phuMoDuoc(kb, s),
        phuXong: s.giaiDoan === 'phu' ? phuDangLam(kb, s) : null,
        phuDangDo: phuDaCat(kb, s),
      };
    }
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
  // Gói B15: buổi hỏi lại một nhân chứng đã gặp → về cảnh, không chạy lại phần sau của chuỗi. Hỏi đủ thì chỗ bấm tính là đã xem.
  if (b.hoiLai && s.khamPha) {
    const kp = s.khamPha;
    const du = dongChuaGach(s, to).length === 0;
    const daXem = du ? them(kp.daXem, conTro.chuoi) : kp.daXem.filter((c) => c !== conTro.chuoi);
    const nut = nutKhamPha(kb, kp);
    const ve: TrangThaiMvp = { ...s, buoiHoi: null, hoiDap: null, khamPha: { ...kp, daXem }, conTro: { ...kp.veLai } };
    return nut ? { ...goNhacCu(kb, { ...ve, conTro }, nut, xongChinhCua(nut, daXem)), conTro: { ...kp.veLai } } : ve;
  }
  const { nutSau, hauQua, biet } = khoiThayThe(ht.chuoi.nodes, conTro.nut, to);
  let moi: TrangThaiMvp = { ...s, buoiHoi: null, conTro: { ...conTro, nut: nutSau }, ...(to.nutDaThay ? { daThayLoi: to.ma } : {}) };
  // Gói B18: `[BIẾT]` nằm trong khối lời bị buổi hỏi thay vẫn phải ghi (điều ấy đã lộ qua buổi hỏi).
  for (const b of biet) moi = apBiet(moi, b.nhanVat, b.truong);
  const kp = moi.khamPha;
  if (kp && dongChuaGach(moi, to).length > 0 && kp.daXem.includes(conTro.chuoi)) {
    moi = { ...moi, khamPha: { ...kp, daXem: kp.daXem.filter((c) => c !== conTro.chuoi) } };
  }
  return apHauQua(kb, moi, hauQua).s;
}

/** Gói B15: số ghim có dấu ("!" / "?") đang hiện trên bản đồ của ngày mà chưa ghé (0 khi không đứng dưới một bản đồ). */
function soNoiChuaGhe(kb: KichBanMvp, s: TrangThaiMvp): number {
  let goc = s.khamPha ?? null;
  while (goc?.cha) goc = goc.cha;
  const nut = goc ? nutKhamPha(kb, goc) : undefined;
  if (!goc || !nut || nut.kieu !== 'ban-do') return 0;
  return diemDangHien(nut, goc.daXem, s.hienTruong ?? []).filter((d) => d.diem.dau && !d.daXem).length;
}

/**
 * Gói B15: bấm một chỗ ĐÃ ghé / đã gặp.
 *   - Bản đồ, ghim đã ghé: vào thẳng cảnh khám phá của nơi đó (không đọc lại lời lúc tới), chỗ đã xem vẫn là đã xem.
 *   - Cảnh thường, nhân chứng đã gặp (kể cả lần trước bỏ đi khi chưa hỏi đủ): mở lại buổi hỏi với tiến độ cũ; đã hỏi đủ thì
 *     nhân chứng nói một câu "hết chuyện để kể" của tờ. Đóng buổi hỏi là về cảnh (`dongBuoiHoi`).
 * Không thuộc hai trường hợp ấy → `null` (máy xử như cũ).
 */
function vaoLaiDiem(kb: KichBanMvp, s: TrangThaiMvp, kp: KhamPhaMvp, nut: Extract<NutMvp, { type: 'explore' }>, d: DiemKhamPhaHienMvp): TrangThaiMvp | null {
  const conTro = s.conTro;
  if (!conTro) return null;
  const chuoi = d.diem.chuoi;
  if (nut.kieu === 'ban-do') {
    if (!d.daXem) return null;
    const trong = canhNoiDaGhe(kb, s, chuoi, conTro.boiCanh);
    if (!trong) return null;
    const moi: TrangThaiMvp = { ...s, hoiDap: null, canhLui: null, khamPha: { ...trong, cha: { ...kp, dangXem: chuoi } }, conTro: { ...trong.veLai } };
    return napLaiLuot(kb, moi, chuoi);
  }
  if (!laCanhThuong(nut)) return null;
  const hd = hoiLaiDuoc(kb, s, chuoi);
  const to = hd ? toHoiDap(kb, hd.ma) : undefined;
  if (!hd || !to) return null;
  let moi: TrangThaiMvp = { ...s, hoiDap: null, daThayLoi: null, khamPha: { ...kp, dangXem: chuoi }, conTro: { chuoi, nut: hd.nut, boiCanh: conTro.boiCanh } };
  moi = moBuoiHoi(kb, napLaiLuot(kb, moi, chuoi), hd.ma);
  const b = moi.buoiHoi;
  if (!b) return null;
  const nhatKy = [...b.nhatKy];
  const hetKe = to.lopKhac['hoi-mo'].hetKe;
  if (!b.dong && dongChuaGach(moi, to).length === 0 && hetKe.length > 0) {
    const td = tienDoCua(moi, to.ma);
    const i = (td.xoay['hoi-lai'] ?? -1) + 1;
    nhatKy.push({ ai: to.nhanChung, chu: hetKe[i % hetKe.length] ?? '', bienThe: 'het-ke' });
    moi = { ...moi, tienDoHoiDap: { ...(moi.tienDoHoiDap ?? {}), [to.ma]: { ...td, xoay: { ...td.xoay, 'hoi-lai': i } } } };
  }
  return { ...moi, buoiHoi: { ...b, nhatKy, hoiLai: true } };
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
  if (hd.type === 'doi-muc') {
    if ((hd.nhapVai !== undefined && !laMucNhapVai(hd.nhapVai)) || (hd.sql !== undefined && !laMucSql(hd.sql))) return s;
    return datMuc(s, hd);
  }
  if (hd.type === 'choi-lai-vu') {
    // Gói B19: về điểm lưu đầu vụ. Bảng rank, các điểm lưu và thiết lập của người chơi (mức, cách hỏi) theo ván hiện tại.
    const vu = hd.vu ?? vuChoiLai(kb, s)?.vu;
    const chup = vu ? s.diemLuuVu?.[vu] : undefined;
    if (!chup) return s;
    const moi: TrangThaiMvp = {
      ...chup,
      batDauLuc: hd.luc ?? s.batDauLuc + 1,
      diemLuuVu: s.diemLuuVu,
      ...(s.bangRank ? { bangRank: s.bangRank } : {}),
      ...(s.mucNhapVai ? { mucNhapVai: s.mucNhapVai } : {}),
      ...(s.mucSql ? { mucSql: s.mucSql } : {}),
      ...(s.cachChoi ? { cachChoi: s.cachChoi } : {}),
    };
    return chayToiNutCanNguoiChoi(kb, moi);
  }
  if (hd.type === 'noi-the') {
    // Gói B21: cặp đã khai (và đã mở) → ra câu hỏi, mở đích; cặp lạ → máy đứng yên (sợi chỉ rơi do giao diện, không phạt).
    const cau = timCauNoi(kb, s, hd.a, hd.b);
    if (!cau || (s.cauNoiXong ?? []).includes(cau.id)) return s;
    return chayToiNutCanNguoiChoi(kb, apDichNoi(kb, { ...s, cauNoiXong: [...(s.cauNoiXong ?? []), cau.id] }, cau));
  }
  if (hd.type === 'mo-tra-noi') {
    const cau = (kb.cacCauNoi ?? []).find((c) => c.id === hd.cau);
    if (!cau || cau.dich.kind !== 'tra' || !(s.cauNoiXong ?? []).includes(cau.id) || s.thuThachXong.includes(cau.dich.thuThach) || s.thuThachDangLam) return s;
    return { ...s, thuThachDangLam: cau.dich.thuThach, traTuNoi: cau.dich.thuThach };
  }
  if (hd.type === 'dong-tra-noi') {
    if (!s.traTuNoi || s.thuThachDangLam !== s.traTuNoi) return s;
    return { ...s, thuThachDangLam: null, traTuNoi: null };
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
        // Gói B17: cách đổi tại chỗ trong khung hỏi chỉ áp cho buổi vừa đóng; buổi sau lại theo mức nhập vai.
        moi = quenCachTamThoi(dongBuoiHoi(kb, s));
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
      } else if (kn.kind === 'dong-thoi-gian') {
        // Bảng chân lý: bản xem lại đi luôn; dòng chính chấm lúc "Xong" — đúng hết thì đi tiếp, có ô sai thì note sai bật về chồng
        // (ở lại màn); dòng tập dượt chấm tức thời nên `xong` là đủ.
        if (kn.chiXem) moi = tienNut(s);
        else if (!kn.xong) return s;
        else if (kn.dtg.kieu === 'chinh' && !dongThoiGianDung(kn.dtg, kn.daDat)) {
          return { ...s, dongThoiGian: { ...(s.dongThoiGian ?? {}), [kn.dtg.id]: { o: boTheSai(kn.dtg, kn.daDat) } } };
        } else moi = tienNut({ ...s, dongThoiGian: { ...(s.dongThoiGian ?? {}), [kn.dtg.id]: { o: kn.daDat, xong: true } } });
      } else if (kn.kind === 'so-tong-ket') {
        moi = tienNut(s);
      } else if (kn.kind === 'ghep-mau') {
        // Gói B19: hai thẻ lên bảng (bỏ khỏi khay "Chưa ghim"), chỉ đỏ và giấy nhớ ở lại.
        const n = kn.nut;
        const bang = s.bang ?? { day: {}, viTri: {} };
        const id = n.the.join('+');
        const ghep = [...(bang.ghepMau ?? []).filter((g) => g.id !== id), { id, the: [...n.the], chu: n.giayNho, nguoi: n.nguoi }];
        const boGhim = (bang.boGhim ?? []).filter((x) => !n.the.includes(x));
        moi = tienNut({ ...s, bang: { ...bang, ghepMau: ghep, ...(bang.boGhim ? { boGhim } : {}) } });
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
        if (kn.nut.tinhVach && !c.correct) {
          // Gói B19: chọn sai ở trắc nghiệm `· tính vạch` → một vạch, lời của lựa chọn (+ lời "sai lần đầu cả buổi"), chọn lại.
          const v = themVach(s, kn.nut.tinhVach);
          moi = batDauPhanHoi(kb, v.s, kn.nut.id, 'question', false, [...c.feedback, ...v.them], false);
          break;
        }
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
      if (nut.tinhVach) {
        // Gói B19: đối chất `· tính vạch` — thẻ [ĐÚNG] đi tiếp; thẻ [SAI] / thẻ khác thêm một vạch, lời phản hồi, chọn lại.
        const dung = b?.muc === 'dung';
        const sai = (s.doiChat?.id === nut.id ? (s.doiChat.sai ?? 0) : 0) + (dung ? 0 : 1);
        const s2: TrangThaiMvp = { ...s, doiChat: { id: nut.id, daTrinh: [...kn.daTrinh, hd.the], muc: kn.muc, sai } };
        if (dung) moi = batDauPhanHoi(kb, s2, nut.id, 'doi-chat', true, b?.feedback ?? [], false);
        else {
          const v = themVach(s2, nut.tinhVach);
          moi = batDauPhanHoi(kb, v.s, nut.id, 'doi-chat', false, [...(b?.muc === 'sai' ? b.feedback : nut.khac), ...v.them], false);
        }
        break;
      }
      const muc = b?.muc === 'dung' || b?.muc === 'sai' ? 'khac' : (b?.muc ?? 'khac');
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
    case 'chi-o': {
      // Gói B21: đối chất `· chỉ ô` — người chơi chỉ ô trên bảng chân lý. Khớp trọn một đáp án [ĐÚNG] → qua; chỉ dở một phần của đáp án
      // nhiều ô → chờ chỉ tiếp; còn lại → một vạch, lời của đáp án [SAI] khớp (hoặc [KHÁC]), chỉ lại.
      if (kn.kind !== 'doi-chat' || !kn.nut.chiO) return s;
      const nut = kn.nut;
      const dc = s.doiChat && s.doiChat.id === nut.id ? s.doiChat : null;
      const dangChon = dc?.o ?? [];
      const luu = (o: string[], sai: number): TrangThaiMvp['doiChat'] => ({ id: nut.id, daTrinh: dc?.daTrinh ?? [], muc: dc?.muc ?? 'khong', sai, o });
      if (dangChon.includes(hd.o)) {
        moi = { ...s, doiChat: luu(dangChon.filter((x) => x !== hd.o), dc?.sai ?? 0) };
        break;
      }
      const chon = [...dangChon, hd.o];
      const khoa = (x: readonly string[]): string => [...x].sort().join('|');
      const khop = nut.bangChung.find((b) => b.o && khoa(b.o) === khoa(chon));
      if (khop?.muc === 'dung') {
        moi = batDauPhanHoi(kb, { ...s, doiChat: luu([], dc?.sai ?? 0) }, nut.id, 'doi-chat', true, khop.feedback, false);
        break;
      }
      if (!khop && nut.bangChung.some((b) => b.muc === 'dung' && b.o && chon.every((x) => b.o?.includes(x)))) {
        moi = { ...s, doiChat: luu(chon, dc?.sai ?? 0) };
        break;
      }
      const sai = (dc?.sai ?? 0) + 1;
      const s2: TrangThaiMvp = { ...s, doiChat: luu([], sai) };
      if (!nut.tinhVach) return s;
      const v = themVach(s2, nut.tinhVach);
      moi = batDauPhanHoi(kb, v.s, nut.id, 'doi-chat', false, [...(khop?.muc === 'sai' ? khop.feedback : nut.khac), ...v.them], false);
      break;
    }
    case 'chua-du': {
      if (kn.kind !== 'doi-chat' || kn.nut.tinhVach) return s;
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
    case 'trinh-sai': {
      // Gói B19: màn sửa `· tính vạch` — "Trình" sai: một vạch, ở lại màn (giao diện hiện lời `loiTrinhSai`).
      const n = s.conTro ? timChuoi(kb, s.conTro.chuoi)?.nodes[s.conTro.nut] : undefined;
      if (kn.kind !== 'fix-query' || n?.type !== 'fix-query' || !n.tinhVach) return s;
      moi = { ...s, vach: (s.vach ?? 0) + 1, lanThu: { ...s.lanThu, [kn.thuThach.id]: (s.lanThu[kn.thuThach.id] ?? 0) + 1 } };
      break;
    }
    case 'dat-the-dtg': {
      // Bảng chân lý: dòng chính đặt tự do (không báo đúng sai); dòng tập dượt vẫn chỉ nhận thả đúng. Thẻ phải có trong hồ sơ.
      if (kn.kind !== 'dong-thoi-gian' || kn.chiXem) return s;
      const o = kn.dtg.o.find((x) => x.id === hd.o);
      if (!o) return s;
      const tam = kn.dtg.theTam.some((t) => t.id === hd.the);
      if (!tam && !coTrongHoSo(s, hd.the)) return s;
      const daDat = kn.dtg.kieu === 'tap-duot' ? (thaDung(o, hd.the, kn.daDat) ? { ...kn.daDat, [o.id]: hd.the } : null) : datTuDo(kn.dtg, kn.daDat, o.id, hd.the);
      if (!daDat) return s;
      moi = { ...s, dongThoiGian: { ...(s.dongThoiGian ?? {}), [kn.dtg.id]: { o: daDat } } };
      break;
    }
    case 'go-the-dtg': {
      if (kn.kind !== 'dong-thoi-gian' || kn.chiXem || kn.dtg.kieu !== 'chinh') return s;
      const daDat = goThe(kn.dtg, kn.daDat, hd.o);
      if (!daDat) return s;
      moi = { ...s, dongThoiGian: { ...(s.dongThoiGian ?? {}), [kn.dtg.id]: { o: daDat } } };
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
      if (s.thuThachDangLam && s.traTuNoi && s.traTuNoi === s.thuThachDangLam) {
        // Gói B21: màn tra mở từ câu hỏi nối `→ tra`: xong thì về lại chỗ đang đứng (con trỏ giữ nguyên), không chạy dữ kiện.
        moi = { ...moi, thuThachDangLam: null, traTuNoi: null };
      } else if (s.thuThachDangLam) {
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
      if (!d) return s;
      const tuDo = dieuHuongTuDo(kb);
      // Gói B15: ghim nơi đã ghé → vào thẳng cảnh của nơi đó; nhân chứng đã gặp → mở lại buổi hỏi với tiến độ cũ.
      const lai = tuDo ? vaoLaiDiem(kb, s, kp, kn.nut, d) : null;
      if (lai) {
        moi = lai;
        break;
      }
      if (d.daXem) return s;
      const daXemDiem = (s.daXemDiem ?? []).includes(d.diem.chuoi) ? s.daXemDiem : [...(s.daXemDiem ?? []), d.diem.chuoi];
      const kpMoi: KhamPhaMvp = { ...kp, daXem: [...kp.daXem, d.diem.chuoi], ...(tuDo ? { dangXem: d.diem.chuoi } : {}) };
      // Màn quan sát (Hà Vy soi một người): người được soi đứng trên dàn suốt lúc đọc từng chi tiết (người xem thử 06/10:
      // lời tả áo Tùng mà trên hình chỉ có người chơi).
      const soi = kn.nut.kieu === 'quan-sat' && kn.nut.nhanVat && !(s.vaoDan ?? []).includes(kn.nut.nhanVat) ? { vaoDan: [...(s.vaoDan ?? []), kn.nut.nhanVat] } : {};
      moi = { ...s, ...soi, daXemDiem, khamPha: kpMoi, conTro: { chuoi: d.diem.chuoi, nut: 0, boiCanh: s.conTro.boiCanh } };
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
      // Gói B15: nơi vào lại từ ghim đã ghé → về thẳng bản đồ (phần sau của chuỗi ghim đã chạy ở lần ghé đầu).
      if (kp.vaoLai && kp.cha) {
        moi = { ...s, hoiDap: null, khamPha: kp.cha, conTro: { ...kp.cha.veLai } };
        break;
      }
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
    case 'het-ngay': {
      // Gói B15: người chơi bấm hết ngày → chuỗi buổi tối (hết chuỗi là sang ngày kế); không có chuỗi tối thì sang ngày kế luôn.
      const h = hetNgayDangCho(kb, s);
      if (kn.kind !== 'explore' || !kn.hetNgay || !h) return s;
      const sach: TrangThaiMvp = { ...s, hetNgay: { ...h, daBam: true }, hoiDap: null, buoiHoi: null, khamPha: null, canhLui: null, nhacViec: null };
      moi = h.chuoi && timChuoi(kb, h.chuoi) ? { ...sach, conTro: { chuoi: h.chuoi, nut: 0, boiCanh: 'truyen' } } : ketThucNgay(kb, sach);
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
  if (!b || b.daRoi || b.hoiLai || !s.conTro || cachChoiCua(s) !== 'tu-dong') return null;
  const n = timChuoi(kb, s.conTro.chuoi)?.nodes[s.conTro.nut];
  if (n?.type !== 'hoi-dap' || n.ma !== b.ma || tienDoCua(s, b.ma).biet.length > 0) return null;
  return quenCachTamThoi({ ...ghiTuDong(kb, s, b.ma), buoiHoi: null, conTro: { ...s.conTro, nut: s.conTro.nut + 1 } });
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
  // Khung hỏi nhân chứng (B12): người "Không xưng tên" (cô Hạnh, cô Lan, bà trà đá) không có câu tự xưng để chờ, thẻ bật ngay
  // khi khung hỏi mở lần đầu (người xem thử 06/10: thẻ của họ bật muộn, ở câu đầu họ nói sau buổi hỏi).
  if (kn.kind === 'hoi-dap') {
    const nc = kn.hoiDap.nhanChung;
    const gt = kb.nhanVat.find((n) => n.id === nc)?.gioiThieu;
    return gt?.khongXungTen && !(s.daGioiThieu ?? []).includes(nc) ? nc : null;
  }
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
    // B19 (Vụ 1 bản 6): người chơi chỉ đứng nhìn mà cả chuỗi không ai gọi tên người này → chưa giới thiệu. Hoài kéo vali ở sảnh
    // ký túc xá không bao giờ tự xưng, thẻ bật ở câu đầu sẽ lộ tên "Hoài" từ Cảnh 1. Chú Cường ở cổng vẫn bật vì Tùng gọi tên chú.
    const ten = kb.nhanVat.find((n) => n.id === nguoi)?.ten;
    if (ten && !chuoi.nodes.some((n) => n.type === 'line' && n.text.normalize('NFC').includes(ten.normalize('NFC')))) return null;
  }
  return nguoi;
}

/**
 * Gói B18: các ô thẻ nhân vật người chơi đã biết. Thẻ không khai "Biết lúc gặp" → biết hết (bộ MVP, nhân vật chưa khai); có khai →
 * các ô ấy cộng với ô `[BIẾT]` đã mở (`daBiet`, thường là `s.bietVe[nhanVat]`). Hàm thuần để giao diện thẻ và tab Nhân vật dùng.
 */
export function truongDaBietTu(gt: GioiThieuNhanVatMvp | null | undefined, daBiet: readonly string[] | undefined): Set<TruongBietMvp> {
  if (!gt?.bietLucGap) return new Set(CAC_TRUONG_BIET);
  const kq = new Set<TruongBietMvp>(gt.bietLucGap);
  for (const t of daBiet ?? []) if ((CAC_TRUONG_BIET as readonly string[]).includes(t)) kq.add(t as TruongBietMvp);
  return kq;
}

/** Gói B18: ô thẻ của `nhanVat` mà người chơi đã biết trong ván `s` (xem `truongDaBietTu`). */
export function truongDaBiet(kb: KichBanMvp, s: TrangThaiMvp, nhanVat: string): Set<TruongBietMvp> {
  return truongDaBietTu(kb.nhanVat.find((n) => n.id === nhanVat)?.gioiThieu, s.bietVe?.[nhanVat]);
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
