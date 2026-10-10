/**
 * KIỂU DỮ LIỆU KỊCH BẢN MVP (gói 12m, đặc tả §18) — hình dạng của `src/content/generated/mvp/kich-ban.gen.ts`
 * (sinh bởi tools/noi-dung/sinh-mvp.ts, `satisfies KichBanMvp`).
 *
 * Chưa có runtime đọc kiểu này (gói kiến trúc MVP, QĐ-077). Mọi mã (id) là chuỗi thường; kiểm tra tham chiếu
 * do bộ đọc làm lúc sinh (luat-mvp.ts), không phải TypeScript.
 */

/** Mốc thời gian trong lịch. */
export type MocMvp = { kind: 'mo-dau' } | { kind: 'ngay'; ngay: number; khung: string } | { kind: 'ngay-hop' };

export type DieuKienMvp =
  | { kind: 'co'; id: string }
  | { kind: 'khong-co'; id: string }
  | { kind: 'va' | 'hoac'; cac: DieuKienMvp[] }
  | { kind: 'bi-mat'; muc: number };

export type HauQuaMvp =
  | { kind: 'mo-manh-moi'; id: string }
  | { kind: 'hien-tai-lieu'; id: string }
  | { kind: 'luu-bang-chung'; id: string }
  | { kind: 'dat-co'; co: string }
  | { kind: 'bo-co'; co: string }
  | { kind: 'di-toi'; chuoi: string }
  | { kind: 'tru-uy-tin' };

export interface LoiMvp {
  speaker: string;
  expression?: string;
  /** Có thể chứa `{{nv.nguoi-choi}}` — runtime thay bằng tên người chơi. */
  text: string;
}

/**
 * Mức một thẻ bằng chứng đáp được giả thuyết của rival ở `[ĐỐI CHẤT]`. Gói B19 (đối chất `· tính vạch`): `dung` = thẻ đúng
 * (`{thẻ} [ĐÚNG]`, đi tiếp), `sai` = thẻ sai có lời riêng (`{thẻ} [SAI] → phản hồi:`, thêm một vạch, chọn lại).
 */
export type MucDoiChatMvp = 'du' | 'ho-tro' | 'goi-y' | 'dung' | 'sai';

/**
 * Gói B19: đuôi `· tính vạch` của `[SỬA TRUY VẤN]`, `[ĐỐI CHẤT]`, `[HỎI]` ở buổi chấm — mỗi lần trình sai Minh Anh gạch một vạch
 * ở lề sổ (`TrangThaiMvp.vach`), `[CHẤM VỤ]` đọc số vạch để chấm A/B/C. Không có hết lượt: sai thì chọn lại tới khi đúng.
 */
export interface TinhVachMvp {
  /** `· câu n/m`: thứ tự câu trong buổi (hiện "Câu n/m" cạnh lề sổ); thiếu = không hiện. */
  cau?: { so: number; tong: number };
  /** Dòng con `[SAI LẦN ĐẦU CẢ BUỔI] → phản hồi:`: lời thêm khi lần sai ở lệnh này là vạch ĐẦU TIÊN của buổi. */
  saiLanDau?: LoiMvp[];
}

/** Gói B19: thẻ tạm của một dòng thời gian tập dượt (lời kể, không vào hồ sơ): `<mã> = <chữ trên thẻ>`. */
export interface TheTamDtgMvp {
  id: string;
  chu: string;
}

/** Gói B19: một ô của dòng thời gian (`### <mã> · <giờ> · <nơi> · <việc>` ở dong-thoi-gian.md). */
export interface ODongThoiGianMvp {
  id: string;
  /** Giờ ("6:44", "trước 9:00", "?"); thiếu = không ghi. */
  gio: string | null;
  /** `· cột: <mã>` sau giờ: cột (người) của bảng chân lý mà ô nằm; bảng không khai `- Cột:` thì thiếu. */
  cot: string | null;
  noi: string | null;
  /** Việc xảy ra; "[?]" trong chữ là phần không điền được (hiện "?"). */
  viec: string;
  /** Thẻ nhận (thẻ hồ sơ hoặc thẻ tạm); thả một thẻ trong danh sách là ô xong. */
  nhan: string[];
  /** `- Khóa sẵn`: ô đã điền sẵn, không cần kéo. */
  khoaSan: boolean;
  /** `- Không điền được: <phần>`: phần ấy hiện "?" mãi (thả gì vào cũng bật lại). */
  khongDien: string | null;
  /** Lời khi kéo sai vào ô này; thiếu = câu chung của dòng thời gian. */
  keoSai: LoiMvp[] | null;
  /** Lời khi thả vào phần không điền được; thiếu = câu kéo sai. */
  keoVaoTrong: LoiMvp[] | null;
}

/** Gói B19: một dòng thời gian (`## <mã> — <tên> {kiểu: tập dượt|chính}` ở dong-thoi-gian.md). */
export interface DongThoiGianMvp {
  id: string;
  ten: string;
  /** `tap-duot`: thẻ là thẻ tạm (lời kể); `chinh`: thẻ là thẻ trong hồ sơ. */
  kieu: 'tap-duot' | 'chinh';
  /** `- Người nhắc khi kéo sai:` (mã nhân vật). */
  nguoiNhac: string | null;
  /** `- Kéo sai:` ở đầu mục: câu nhắc chung khi ô không có câu riêng. */
  keoSai: LoiMvp[] | null;
  /**
   * `- Cột: <mã>=<nhãn>, …` (bảng chân lý): cột = người, theo thứ tự khai; mã `?` là cột "chưa biết". Rỗng = ma trận một cột
   * không tiêu đề (mỗi ô một dòng). Dòng của ma trận = các giờ khác nhau theo thứ tự xuất hiện trong `o`.
   */
  cot: { id: string; nhan: string }[];
  theTam: TheTamDtgMvp[];
  o: ODongThoiGianMvp[];
}

/** Gói B19: kết quả `[CHẤM VỤ]` của một vụ (bảng rank của ván). */
export interface KetQuaChamVuMvp {
  rank: 'a' | 'b' | 'c';
  /** Số vạch lúc chấm. */
  vach: number;
  /** Thẻ / dòng thời gian bắt buộc mà ván chưa có lúc chấm. */
  thieu: string[];
}

/**
 * Gói B21 `[NỐI <a> + <b> → câu hỏi: "<chữ>" · → tra <thẻ thử thách>|→ hiện trường <ghim:<mã> hoặc chuỗi>]`: người chơi nối hai note
 * trên bảng manh mối thì ra giấy nhớ câu hỏi và mở đích. Nối sai cặp: sợi chỉ rơi, không phạt.
 */
export interface CauNoiMvp {
  /** Mã câu hỏi (thẻ câu hỏi; dùng được ở `Chốt khi` và `[NẾU có …]`). Mặc định `cau-<a>-<b>`; `· mã: <mã>` đặt lại. */
  id: string;
  the: [string, string];
  cau: string;
  dich: { kind: 'tra'; thuThach: string } | { kind: 'hien-truong'; ghim: string | null; chuoi: string | null };
}

export interface LuaChonMvp {
  id: string;
  text: string;
  correct: boolean;
  feedback: LoiMvp[];
}

export interface NhanVatMvp {
  id: string;
  ten: string;
  hoTen: string | null;
  trongCau: string;
  vai: string;
  bieuCam: string[];
  xuatHienTu: MocMvp;
  chiQuaLoiKe: boolean;
  /** Thẻ giới thiệu (mở sau câu tự giới thiệu trong thoại, tab Nhân vật của hồ sơ); `null` = không có. */
  gioiThieu: GioiThieuNhanVatMvp | null;
}

/** Một quãng lịch: các thứ (0 = Chủ nhật … 6 = thứ Bảy), từ giờ tới giờ ("HH:MM", tính tới trước giờ kết), ở ghim `noi` của bản đồ. */
export interface QuangLichMvp {
  thu: number[];
  tu: string;
  den: string;
  noi: string;
}

/**
 * Một ô trên thẻ nhân vật (gói B18): họ tên, danh xưng, năm, ngành, lịch, câu nói. Thẻ chỉ ghi ô người chơi ĐÃ BIẾT; ô chưa biết
 * hiện "?" (lịch, câu nói thì ẩn) cho tới khi khung gặp `[BIẾT <mã> <trường>]`.
 */
export type TruongBietMvp = 'ho-ten' | 'danh-xung' | 'nam' | 'nganh' | 'lich' | 'cau-noi';
export const CAC_TRUONG_BIET: readonly TruongBietMvp[] = ['ho-ten', 'danh-xung', 'nam', 'nganh', 'lich', 'cau-noi'];

/** Chữ người chơi thấy về một nhân vật — viết sao cho không lộ tình tiết (nhan-vat.md, đặc tả §18.3). */
export interface GioiThieuNhanVatMvp {
  /**
   * `- Biết lúc gặp:` (gói B18): các ô đã biết khi thẻ mở lần đầu; ô khác chờ `[BIẾT]`. Thiếu dòng = biết hết (bộ MVP và nhân vật
   * chưa khai giữ hành vi cũ).
   */
  bietLucGap?: TruongBietMvp[];
  /** Thói quen đi lại ("Lịch" của nhan-vat.md); có thì ảnh mặt nhân vật hiện trên bản đồ sau khi đã gặp. */
  lich?: string | null;
  /** Lịch theo thứ và giờ ("Thường ở" của nhan-vat.md): bản đồ tính ai đang ở ghim nào (`src/mvp/engine/lich-nhan-vat.ts`). */
  thuongO?: QuangLichMvp[];
  danhXung: string;
  /** Chữ trên thẻ tên trước khi nhân vật được giới thiệu ("Chị khóa trên"); `null` → "???". */
  chuaQuen?: string | null;
  /** Nhân vật không tự xưng tên; thẻ mở ở câu đầu họ nói. */
  khongXungTen?: boolean;
  nam: string | null;
  nganh: string | null;
  cauNoi: string;
  loi: string;
}

export interface CanhMvp {
  id: string;
  ten: string;
  anhNen: string | null;
  moTa?: string | null;
}

export type NhanDuKienMvp = 'chinh' | 'phu' | 'nhieu';

export interface DuKienMvp {
  id: string;
  moTa: string;
  /** Chỉ người viết thấy; không hiển thị. */
  nhan: NhanDuKienMvp;
  moTu: MocMvp;
  can: DieuKienMvp | null;
  hanhDong: { kind: 'chuoi'; chuoi: string } | { kind: 'thu-thach'; thuThach: string };
  moManhMoi: string[];
  hienTaiLieu: string[];
  luuBangChung: string[];
  lap: 'mot-lan' | 'moi-lan';
  /** Vật tương tác trên nền (dòng `- Ảnh:`); `null` = chỉ chọn được qua danh sách chữ. */
  anh: AnhDuKienMvp | null;
}

/**
 * Vị trí ảnh vật tương tác trên nền địa điểm (đặc tả §18, QĐ-089). `sprite`: `obj-…` (ảnh `src/assets/mvp/vat/`)
 * hoặc `nv:<mã nhân vật>` (chân dung). (x, y) = CHÂN ẢNH (giữa cạnh dưới), % bề rộng / bề cao nền; `rong` = % bề rộng nền.
 */
export interface AnhDuKienMvp {
  sprite: string;
  x: number;
  y: number;
  rong: number;
}

export interface DiaDiemMvp {
  id: string;
  ten: string;
  canh: string;
  moTu: MocMvp;
  tonKhung: { vao: number; moiDuKien: number };
  phanBiet: string | null;
  duKien: DuKienMvp[];
}

/**
 * Gói B21 (docs/mua-1/loi-note-bang-chan-ly.md §10): CHẶNG thay "ngày" trong vòng điều tra — `## Chặng n · <Tên> {chặng: n · …}` ở
 * lich.md. Chặng là một `NgayMvp` kiểu `theo-truyen` mang thêm trường này: trong chặng KHÔNG có nút "Hết ngày"; chặng hết khi đạt
 * điều kiện chốt (`chotKhi`, máy tự chạy chuỗi `khiChot` rồi sang chặng sau) hoặc khi gặp `[HẾT CHẶNG]`.
 */
export interface ChangMvp {
  /** Ngày truyện của chặng (YYYY-MM-DD); thiếu = giữ ngày hiện tại. */
  ngayTruyen: string | null;
  /** Giờ truyện (HH:MM) hiện cạnh tên chặng. */
  gio: string | null;
  /** `- Chốt khi: có a, b`: mọi mã (thẻ hồ sơ, cờ, câu hỏi nối) đã có thì chặng chốt (VÀ). Rỗng = chỉ `[HẾT CHẶNG]` mới chốt. */
  chotKhi: string[];
  /** `- Khi chốt: <chuỗi>`: chuỗi máy tự chạy khi chặng chốt, hết chuỗi thì sang chặng sau. */
  khiChot: string | null;
  /** `- Có mặt: <nhân vật> ở <ghim>, …`: ai đang ở ghim nào của bản đồ suốt chặng (thay lịch "Thường ở" theo giờ). */
  coMat: { nhanVat: string; noi: string }[];
}

export interface NgayMvp {
  so: number;
  ten: string;
  /** Gói B21: ngày này là một chặng. */
  chang?: ChangMvp;
  /**
   * `dia-diem`: ngày chọn địa điểm × khung giờ (dữ kiện chính, buổi tối — QĐ-086).
   * `theo-truyen` (chương 1, ĐÃ CHỐT C 30/09/2026): chạy MỘT chuỗi `chuoi` từ đầu tới cuối, không bản đồ, không khung giờ;
   * chuỗi hết nút → hết ngày. `duKienChinh`, `buoiToi` rỗng.
   */
  kieu: 'dia-diem' | 'theo-truyen';
  chuoi: string | null;
  /** Nơi bắt đầu ngày (đặc tả A3 mục 14, B1). */
  batDauO?: string | null;
  duKienChinh: string;
  moNgay: string | null;
  buoiToi: string;
}

export interface ViecNgayLeMvp {
  id: string;
  ten: string;
  ngay: string;
  thuocVu: string;
  chuoi: string;
  nguoiGiao: string;
  khiLo: string;
  tieuDeKet?: string;
  loiKet?: string;
}

export interface ViecNguoiQuenMvp {
  id: string;
  moSau: string;
}

export interface NguoiQuenMvp {
  id: string;
  ten: string;
  moSau: string;
  viec: ViecNguoiQuenMvp[];
  anhCg: {
    anh: string;
    chuThich?: string | null;
    moTa?: string | null;
  };
  giupO: string;
}

export interface LichMvp {
  vu: { id: string; ten: string };
  khung: { id: string; ten: string }[];
  buoiToi: { id: string; ten: string };
  luat: { chinhToiDaKhung: number; phuNhieuMin: number; phuNhieuMax: number; uyTin: number | null };
  chuoiDau: string;
  /** Ngày thật của mở đầu (`- Ngày mở đầu:` ở lich.md, dạng YYYY-MM-DD); thiếu → null / không có. Lịch trong game tính từ đây. */
  ngayMoDau?: string | null;
  /** Hạn chót của vụ (YYYY-MM-DD) nếu vụ có hạn chót. */
  hanChot?: string | null;
  /** Tên việc chốt ở hạn. */
  viecChot?: string | null;
  ngay: NgayMvp[];
  ngayHop: { chuoi: string } | null;
  /**
   * `tam` (gói B19, dòng `- Kết tạm:`): chuỗi kết rank C của bộ có `[CHẤM VỤ]`. Bộ chỉ khai "Kết tạm" thì `thuong` = `tam`.
   */
  ket: { that: string; thuong: string; tam?: string } | null;
  /**
   * Các vụ chơi tiếp sau vụ gốc (`## <Tên> {vụ sau: <mã>}` ở lich.md, từ Vụ 2), theo thứ tự. Mỗi vụ chạy MỘT chuỗi
   * (chuỗi tự `[ĐI TỚI]` các chuỗi khác) và kết bằng `[KẾT THÚC]`. Không có = game chỉ có vụ gốc.
   */
  vuSau?: VuSauMvp[];
  /**
   * Nhiệm vụ phụ (`## <Tên> {nhiệm vụ phụ: <mã>}`): việc một NPC giao, không dính truyện chính, để rèn kỹ năng. Mở trong
   * bảng hoạt động sau khi vụ `moSau` đã xong; tuyến đang chơi được cất đúng vị trí để người chơi luân phiên tiến triển.
   */
  nhiemVuPhu?: NhiemVuPhuMvp[];
  /** Việc ngày lễ theo lịch (A5). */
  viecNgayLe?: ViecNgayLeMvp[];
  /** Người quen và việc hảo cảm (A5). */
  nguoiQuen?: NguoiQuenMvp[];
}

export interface NhiemVuPhuMvp extends VuSauMvp {
  /** Mã nhân vật giao việc. */
  nguoiGiao: string;
  /** Mã vụ chính phải xong trước (vụ gốc hay một vụ sau). */
  moSau: string;
}

export interface VuSauMvp {
  id: string;
  ten: string;
  chuoi: string;
  /** Ngày thật của vụ (YYYY-MM-DD) cho màn lịch; thiếu → null. */
  ngay: string | null;
  /** Nơi bắt đầu ngày (nếu vụ chỉ có một ngày). */
  batDauO?: string | null;
  /** Hạn chót của vụ (YYYY-MM-DD) theo cú pháp A5. */
  hanChot?: string | null;
  /** Tên việc chốt theo cú pháp A5. */
  viecChot?: string | null;
  /** Danh sách ngày và chuỗi bắt đầu của từng ngày. */
  cacNgay?: { ngay: string; chuoi: string; batDauO?: string | null }[];
  /** Chữ màn kết của vụ (tiêu đề lớn và một câu dưới). */
  tieuDeKet: string;
  loiKet: string;
}

export type NutMvp =
  | { type: 'task'; text: string }
  /** `> NHẮC VIỆC <ai>: …`: việc đang làm, do một nhân vật nhắc — hiện kèm ảnh mặt ở góc sân khấu; `[NHIỆM VỤ]` mới thì xóa. */
  | { type: 'reminder'; speaker: string; expression?: string; text: string }
  | { type: 'line'; speaker: string; expression?: string; display?: 'card'; text: string }
  | { type: 'note'; text: string }
  | { type: 'goto'; to: string }
  | { type: 'show-document'; documentId: string }
  /** `[ẢNH …]`: ảnh chèn giữa hội thoại (chibi, CG), tra theo tên tệp trong src/assets/**. */
  | { type: 'image'; imageId: string; chuThich?: string | null; moTa?: string | null }
  | { type: 'question'; id: string; asker: { speaker: string; text: string }; choices: LuaChonMvp[]; truUyTin: boolean; /** Gói B19. */ tinhVach?: TinhVachMvp }
  /**
   * `[ĐỐI CHẤT <mã>]` (01/10/2026, đề xuất gameplay §4–5): rival nêu giả thuyết, người chơi trình thẻ trong hồ sơ để đáp.
   * Mỗi thẻ khai sẵn một mức: `du` (đủ căn cứ — kết thúc đối chất, đặt cờ `<mã>-du`), `ho-tro` (củng cố, đặt cờ `<mã>-ho-tro`,
   * đối chất tiếp), `goi-y` (chỉ gợi hướng, tiếp). Thẻ không khai → `khac` (sai, trừ uy tín nếu `truUyTin`). Nước đi
   * "Chưa đủ căn cứ để nói" (`chuaDu`) luôn có: kết thúc đối chất ở mức đang đạt.
   * Giả thuyết đánh dấu chỗ cần bác bằng `**…**`; `cauHoi` (`[CÂU HỎI]`, 03/10/2026) là câu hỏi cụ thể người chơi cần trả lời bằng thẻ.
   */
  | {
      type: 'doi-chat';
      id: string;
      asker: { speaker: string; text: string };
      cauHoi: string;
      bangChung: { id: string; muc: MucDoiChatMvp; feedback: LoiMvp[]; /** Gói B21 (`· chỉ ô`): các ô của câu trả lời, dạng `<dtg>:<ô>` hoặc `<dtg>:?` (ô trống bắt buộc). */ o?: string[] }[];
      chuaDu: LoiMvp[];
      khac: LoiMvp[];
      /** `[HẾT LƯỢT]` (03/10/2026): lời khi người chơi trình sai (thẻ không liên quan) đủ số lần cho phép — đối chất dừng ở mức đang đạt. */
      hetLuot: LoiMvp[];
      truUyTin: boolean;
      /** Người quen nói thay khi đủ 3 bậc hảo cảm (A5). */
      nguoiQuen?: { ma: string; noiThay: string } | null;
      /**
       * Gói B19 (`· tính vạch`): thẻ `dung` đi tiếp, thẻ `sai` / thẻ khác thêm một vạch và chọn lại; không có "chưa đủ", hết lượt.
       */
      tinhVach?: TinhVachMvp;
      /** Gói B21 `· chỉ ô`: người chơi trả lời bằng cách chỉ ô trên bảng chân lý (`bangChung[].o`). */
      chiO?: boolean;
    }
  /** `[XONG VIỆC CHÍNH]` (A5): hiện nút "Hết ngày" */
  | { type: 'xong-viec-chinh' }
  /**
   * `[HỎI ĐÁP <mã>]` (gói B12): cảnh hỏi nhân chứng theo tờ dữ kiện `kb.hoiDap.to[ma]`. Cách chơi "xem cả đoạn" thì máy
   * chạy qua (các dòng lời viết sẵn ngay sau rồi hậu quả); cách "bấm" / "gõ" thì mở buổi hỏi (`src/mvp/engine/hoi-dap.ts`).
   */
  | { type: 'hoi-dap'; ma: string }
  | { type: 'challenge'; challengeId: string }
  /** Gói B19: `tinhVach` = màn sửa có hai nút "Chạy thử" (không tính) và "Trình" (sai thì thêm một vạch, lời "Khi trình sai"). */
  | { type: 'fix-query'; challengeId: string; tinhVach?: TinhVachMvp }
  /** Gói B19 `[DÒNG THỜI GIAN <mã>]`: màn kéo thẻ vào ô, xong mới đi tiếp. */
  | { type: 'dong-thoi-gian'; id: string }
  /** Gói B19 `[HIỆN DÒNG THỜI GIAN <mã>]`: hiện bản đã dựng (chỉ xem, đọc từng ô). */
  | { type: 'hien-dong-thoi-gian'; id: string }
  /** Gói B19 `[CHẤM VỤ <vụ>] cần: …`: đọc số vạch + kiểm thẻ bắt buộc, đặt cờ `<vụ>-rank-a|b|c`, ghi bảng rank. Máy tự chạy qua. */
  | { type: 'cham-vu'; vu: string; can: string[] }
  /** Gói B19 `[SỔ TỔNG KẾT <vụ>]`: trang tổng kết trong sổ CLB, con dấu đỏ theo rank, vạch ở lề. */
  | { type: 'so-tong-ket'; vu: string }
  /** Gói B19 `[ĐIỂM LƯU VỤ <vụ>]`: chụp trạng thái để "Chơi lại Vụ n". Máy tự chạy qua. */
  | { type: 'diem-luu-vu'; vu: string }
  /** Gói B19 `[GHÉP MẪU] <ai>: <thẻ> + <thẻ> · giấy nhớ: "…"`: ghim hai thẻ, kéo chỉ đỏ, dán giấy nhớ lên bảng điều tra. */
  | {
      type: 'ghep-mau';
      nguoi: string;
      the: string[];
      giayNho: string;
      /** User 09/10: người ghép làm mẫu ba bước (ghim hai thẻ, nối chỉ đỏ, viết giấy nhớ), mỗi bước một câu. Thiếu = diễn một lần. */
      lamMau?: { speaker: string; expression?: string; text: string }[];
    }
  /** Gói B21 `[HẾT CHẶNG]`: sang chặng kế (hết chặng cuối thì sang buổi họp). Máy tự chạy qua. */
  | { type: 'het-chang' }
  /** Gói B21 `[ĐỔI LOẠI <thẻ> → sự thật]`: manh mối thành sự thật (thẻ chuyển sang chồng của bảng chân lý). Máy tự chạy qua. */
  | { type: 'doi-loai'; the: string }
  /** Gói B21 `[CÁC CÂU NỐI]` … `[HẾT CÁC CÂU NỐI]`: mở các cặp note người chơi nối được trên bảng manh mối. Máy tự chạy qua. */
  | { type: 'cac-cau-noi'; cac: CauNoiMvp[] }
  | { type: 'effect'; effectId: string }
  | { type: 'line-pick'; id: string; lines: { index: number; sql: string; correct: boolean; feedback: LoiMvp[] }[]; truUyTin: boolean }
  | { type: 'projector'; id: string; source: { kind: 'sql'; sql: string } | { kind: 'evidence'; evidenceId: string }; run: boolean; expectedRowCount?: number; /** `· làm mẫu`: người xem bấm qua từng bước (bảng, thêm điều kiện, CHẠY, kết quả). */ lamMau?: boolean }
  | { type: 'end' }
  | { type: 'stage'; action: 'vao' | 'ra'; nhanVat: string }
  /** `- [BIẾT <mã> <trường>, <trường>]` (gói B18): người chơi vừa biết thêm ô ấy của thẻ nhân vật; máy tự chạy qua. */
  | { type: 'biet'; nhanVat: string; truong: TruongBietMvp[] }
  | { type: 'wait'; giay: number }
  | { type: 'set-date'; date: string }
  | { type: 'condition'; dieuKien: DieuKienMvp }
  /** `[NẾU <điều kiện>] → đi tới <chuỗi>`: điều kiện thỏa thì sang chuỗi `to`, không thì chạy tiếp. Máy tự xử lý. */
  | { type: 'jump-if'; dieuKien: DieuKienMvp; to: string }
  | { type: 'consequence'; hauQua: HauQuaMvp[] }
  | { type: 'branch'; id: string; asker: { speaker: string; text: string }; choices: { id: string; text: string; khi: DieuKienMvp | null; hauQua: HauQuaMvp[] }[] }
  | { type: 'notebook-lookup'; trang: string; phan: string }
  /** `[GHI SỔ <trang>]` (QĐ-092): tự thêm dòng "Vào sổ cá nhân" của trang vào sổ cá nhân — không hỏi, máy tự chạy qua. */
  | { type: 'notebook-note'; trang: string }
  | { type: 'create-character'; truong: 'ten' | 'nganh'; asker: LoiMvp; xucXac: string | null; luaChon: string[] }
  | { type: 'trial-filter'; id: string; sql: string; soDong: number; chon: { cot: string; giaTri: string } }
  | { type: 'save-evidence'; evidenceId: string }
  | { type: 'ending-branch' }
  /**
   * `kieu` (02/10/2026): thiếu = cảnh thường (vật / người trên nền cảnh); `ban-do` = bản đồ trường, mỗi điểm một ghim nơi đến;
   * `quan-sat` = soi chi tiết trên chân dung nhân vật `nhanVat` (kiểu Sherlock Holmes: mỗi vùng một chi tiết); `dan` (gói B19) =
   * chân dung những người bấm được đứng trên dàn của cảnh (không x / y / rộng), luật như cảnh thường.
   */
  | { type: 'explore'; id: string; diem: DiemKhamPhaMvp[]; kieu?: 'ban-do' | 'quan-sat' | 'dan'; nhanVat?: string; /** Bản đồ: giờ trong truyện ("HH:MM"). */ gio?: string; /** Quan sát: dáng / bộ đồ của nhân vật được soi. */ dang?: string; /** Quan sát: mở bằng cảnh cắt đôi mắt Hà Vy. */ haVySoi?: boolean; /** Quan sát: Hà Vy tự soi lần lượt từng điểm, người chơi chỉ xem (user 08/10). */ tuDong?: boolean };

/**
 * Một chỗ bấm được của `[KHÁM PHÁ]` (đặc tả §18.6): vật/người đặt trên nền cảnh của chuỗi, bấm → chạy `chuoi`; chuỗi hết
 * nút thì quay về cảnh khám phá. `sau`: chỉ hiện khi mọi chuỗi trong danh sách đã xem. `nhan`: nhãn người chơi thấy
 * (không có → dựng từ sprite, xem `nhan-cho-xem.ts`).
 */
export interface DiemKhamPhaMvp extends AnhDuKienMvp {
  chuoi: string;
  sau: string[];
  nhan: string | null;
  /** `chinh` = dấu ! (việc chính: xem hết các điểm ! là đi tiếp được), `phu` = dấu ? (tùy chọn). Thiếu = điểm thường (phải xem hết). */
  dau?: 'chinh' | 'phu';
  /** Nhân vật có mặt ở điểm này (bản đồ hiện ảnh mặt khi người chơi đã biết lịch của họ). */
  co?: string[];
}

export interface ChuoiMvp {
  id: string;
  title: string;
  canh: string;
  /** Cảnh cắt (A3 mục 14, B1): diễn ra ở nơi khác, chạy xong về lại nơi cũ. */
  canhCat?: boolean;
  /** Số thứ tự mốc sớm nhất chuỗi có thể chạy (0 = mở đầu, d·10+i = ngày d khung i, d·10+9 = buổi tối, 1000 = ngày họp). */
  mocSomNhat: number;
  nodes: NutMvp[];
}

export interface TheThuThachMvp {
  id: string;
  tieuDe: string;
  deBai: string;
  manhMoiLienQuan: string[];
  mucTieuHoc: string | null;
  soDongKyVong: number | null;
  sqlChuan: string;
  truyVanNapSan: string | null;
  /** Lời nhân vật sau mỗi lần chạy, theo kết quả (dòng "Khi …" của thẻ — tools/noi-dung/phan-ung-mvp.ts). */
  phanUng: PhanUngMvp[];
  /**
   * Gợi ý hai bậc của bạn đi cùng ở màn tra (gói B14; dòng "- Gợi ý[ khi …]: <bậc 1> <br> <bậc 2>" cạnh các dòng "Khi …",
   * tools/noi-dung/phan-ung-mvp.ts). Thiếu = thẻ chưa có gợi ý (bộ MVP).
   */
  goiY?: GoiYTheMvp[];
  /**
   * Bằng chứng lưu vào hồ sơ khi xong; `null` = bài giữa chuỗi phòng máy, không lưu gì (QĐ-092).
   * `chuTrenGiay` (gói B14): câu in trên tờ giấy nhớ ở màn tra, giá trị bọc `**…**`; một câu cho mỗi tờ.
   * `tachGiay` (gói B14, dòng con "Giấy nhớ: mỗi giá trị một tờ"): phiếu nhiều giá trị thành từng tờ giấy riêng, kéo từng giá trị.
   */
  vatChung: { id: string; title: string; description: string; giaTri: string[]; chuTrenGiay?: string[]; tachGiay?: boolean } | null;
  ghiChu: string[];
  /** Trình dựng tổng hợp chỉ bật rõ ràng trên nội dung Vụ 2; thiếu = trình dựng WHERE chương 1. */
  kieuTrinhDung?: 'tong-hop' | 'loc-tiep';
  /** ID thẻ kết quả có thể dùng làm nguồn ban đầu cho bài tổng hợp. */
  nguon?: string | null;
  /** Thẻ có JOIN: các bảng người chơi được chọn ở khối "nối với" (`- Nối được với: a · b`); thiếu → bảng JOIN trong SQL chuẩn. */
  bangNoi?: string[];
  /** Thẻ có chọn bảng: các bảng người chơi được chọn làm nguồn (`- Bảng chọn: a · b`); nếu có, màn tra hiện dropdown chọn bảng. */
  bangChon?: string[];
  /** Cột nhóm được gợi ý/giới hạn bởi nội dung; null cho phép người chơi chọn. */
  nhomTheo?: string | null;
  /**
   * Bài CHỌN CỘT (`- Chọn cột: a, b` | `- Chọn cột: không`): màn tra hiện hàng "LẤY CỘT", người chơi tự bật / tắt cột của SELECT;
   * giá trị là các cột BẬT SẴN. Thiếu cột của SQL chuẩn → lời "Khi thiếu cột"; thừa cột → lời "Khi thừa cột" (chưa tính là đúng).
   */
  chonCot?: string[];
  /** `- Bấm ô lấy giấy nhớ: <cột>`: tra đúng rồi, người chơi bấm từng ô của cột này để chép ra giấy nhớ, xong mới ghim được (thao tác học ở Ngày hội). */
  bamO?: string;
  /** `- Gõ giá trị: có` (thử thách tự tra đầu tiên, mã của chính người chơi): ô giá trị của điều kiện là ô gõ chữ, không cần giấy nhớ; màn tra hiện chỉ dẫn từng bước. */
  goGiaTri?: boolean;
  /** `- Cột nộp: a, b`: các cột nộp (S12). */
  cotNop?: string[];
  /** Gói B19 `- Khi trình sai:`: lời khi bấm "Trình" mà câu chưa đúng ở màn sửa `· tính vạch`. Thiếu = không có lời riêng. */
  khiTrinhSai?: LoiMvp[];
}

/**
 * Một gợi ý hai bậc của màn tra: bậc 1 nói điều còn thiếu về mặt điều tra, bậc 2 nói thẳng thao tác bằng chữ trên màn hình.
 * `khi`: chỉ dùng khi lần chạy gần nhất khớp điều kiện (như dòng "Khi …"); thiếu = gợi ý chung của thẻ.
 */
export interface GoiYTheMvp {
  khi?: KhiChayMvp;
  bac1: LoiMvp;
  bac2: LoiMvp;
}

/** `cot`: chỉ khớp khi các điều kiện người chơi đã điền dùng đúng tập cột này ("Khi chạy ra 0 dòng với a, b"). */
export type KhiChayMvp =
  | { kind: 'so-dong'; n: number; cot?: string[] }
  | { kind: 'loi-cot' }
  | { kind: 'loi' }
  | { kind: 'dung' }
  /**
   * "Khi đúng mà hẹp hơn" (gói B15 mục E): thẻ "bấm ô lấy giấy nhớ", câu của người chơi hẹp hơn câu chuẩn mà vẫn chứa đủ mọi
   * giá trị của vật chứng (xem `soHep` trong sql-mvp.ts). Thiếu dòng này thì dùng lời "Khi đúng".
   */
  | { kind: 'dung-hep' }
  /** "Khi sai thứ tự": đủ đúng các dòng nhưng thứ tự khác câu chuẩn (thẻ có ORDER BY). */
  | { kind: 'sai-thu-tu' }
  /** Bài chọn cột: đủ đúng dòng nhưng thiếu cột của câu chuẩn / lấy thừa cột. */
  | { kind: 'thieu-cot' }
  | { kind: 'thua-cot' }
  /** "Khi chọn sai cột nộp" (S12). */
  | { kind: 'sai-cot-nop' }
  /** "Khi xem từng bước" (S12). */
  | { kind: 'xem-tung-buoc' };

export interface PhanUngMvp {
  khi: KhiChayMvp;
  loi: LoiMvp[];
}

export interface TheHoSoMvp {
  id: string;
  loai: 'clue' | 'doc' | 'ev';
  heading: string;
  fields: Record<string, string>;
  quotes: Record<string, string[]>;
}

export interface TrangSoMvp {
  id: string;
  ten: string;
  loai: 'cú pháp' | 'tâm đắc' | 'lỗi thường gặp';
  trangChiLinh: string[];
  haVy: LoiMvp[];
  /** Dòng vào sổ cá nhân khi kịch bản `[GHI SỔ]` trang này. */
  chuThich: string | null;
}

/** Cặp (câu SQL, số dòng người viết khai, vị trí) — `kiem-noi-dung:mvp` chạy thật trên `duLieu` và so số dòng (QĐ-089). */
export interface SoDongKhaiMvp {
  sql: string;
  soDong: number;
  noi: string;
  /** Checker-only ID of the evidence card produced by this challenge. */
  resultId?: string;
  /** Checker-only prior result card consumed as FROM source. */
  sourceResultId?: string;
  /** Checker-only GROUP BY key expected from that source. */
  sourceGroupColumn?: string;
}

export interface KichBanMvp {
  tenGame: string;
  tenTruong: string;
  tenCam: string[];
  nhanVat: NhanVatMvp[];
  canh: CanhMvp[];
  diaDiem: DiaDiemMvp[];
  lich: LichMvp;
  chuoi: ChuoiMvp[];
  thuThach: Record<string, TheThuThachMvp>;
  hoSo: Record<string, TheHoSoMvp>;
  soTay: Record<string, TrangSoMvp>;
  loiChung: { matUyTin: { loi: LoiMvp[]; hetVach: LoiMvp } | null };
  soDongKhai: SoDongKhaiMvp[];
  /** Bộ dữ liệu SQL cố định của vụ (noi-dung-mvp/du-lieu.md; QĐ-087, QĐ-089). */
  duLieu: BoDuLieuMvp | null;
  /** Tờ dữ kiện của các cảnh hỏi nhân chứng (`noi-dung-mua-1/hoi-dap/*.json`, gói B12). Bộ MVP không có. */
  hoiDap?: BoHoiDapMvp;
  /**
   * Gói B13 (bộ mùa 1, `sinh-mua1.ts` đặt): điều hướng tự do. `[ĐI CÙNG]` máy tự đi; làm xong một điểm ở cảnh khám phá thì
   * ở lại cảnh, người chơi tự bấm rời đi ("Về bản đồ" / "Đi tiếp"); màn tra lùi được về cảnh đã mở nó. Thiếu = như cũ (bộ MVP).
   */
  dieuHuongTuDo?: boolean;
  /** Gói B19: dòng thời gian (`dong-thoi-gian.md`) theo mã. Thiếu = bộ không có. */
  dongThoiGian?: Record<string, DongThoiGianMvp>;
  /** Gói B21: mọi cặp `[NỐI]` của bộ (gom từ các `[CÁC CÂU NỐI]`). Thiếu = bộ không có. */
  cacCauNoi?: CauNoiMvp[];
}

// ---------- Hỏi nhân chứng (gói B12, docs/mua-1/brief/b12-vu-1.md) ----------

/** Ý định chung, câu hỏi mẫu dùng cho mọi nhân chứng (`hoi-dap/chung.json`). */
export type YDinhChungMvp = 'chao' | 'cam-on' | 'tam-biet' | 'hoi-mo' | 'hoi-rieng-tu' | 'pha-game' | 'doi-dap-an' | 'ngoai-le';
export const Y_DINH_CHUNG: readonly YDinhChungMvp[] = ['chao', 'cam-on', 'tam-biet', 'hoi-mo', 'hoi-rieng-tu', 'pha-game', 'doi-dap-an', 'ngoai-le'];

/** Lớp có lời riêng của nhân chứng: ý định chung + "khong-ro" (trong chuyện nhưng không có dữ kiện). */
export type LopKhacMvp = YDinhChungMvp | 'khong-ro';

/** Biến thể lời của một dữ kiện: hỏi thẳng, hỏi có-không, nhờ kể, hỏi lại, tự kể (câu hỏi mở), nhắc mới nhớ. */
export type KieuBienTheMvp = 'thang' | 'co-khong' | 'ke' | 'lai' | 'tu-ke' | 'nho';

export interface GoiYHoiDapMvp {
  /** Bạn đi cùng nói gợi ý (mã nhân vật). */
  ai: string;
  /** Bậc 1: điều nhóm chưa biết (không lộ chữ bắt buộc). */
  bac1: string;
  /** Bậc 2: câu hỏi bấm được. */
  bac2: string;
}

export interface DuKienHoiDapMvp {
  ma: string;
  /** Chỉ người viết thấy. */
  noiDung: string;
  chuBatBuoc: string[];
  /** Chữ trên tờ giấy nhớ khi hỏi ra. */
  giayNho: string;
  /** Không nằm trong danh sách cần làm rõ: người chơi tự hỏi ra. */
  an: boolean;
  /** Nhân chứng tự kể khi được hỏi mở. */
  tuKe: boolean;
  /** Nhắc mới nhớ: hỏi mở sau khi đã biết đủ `sauKhi`. */
  nhoRa: boolean;
  sauKhi: string[];
  /** Chưa có đủ các thứ này trong hồ sơ thì nhân chứng từ chối nói dữ kiện này. */
  canCo: string[];
  tuChoi: string[];
  bienThe: Partial<Record<KieuBienTheMvp, string>> & { thang: string; lai: string };
  /** Câu đầu là câu hiện ở cách bấm và ở gợi ý bậc 2. */
  cauHoiMau: string[];
  goiY: GoiYHoiDapMvp | null;
}

export interface DongDanhSachMvp {
  ma: string;
  cau: string;
  /** Các dữ kiện phải hỏi ra thì dòng này mới gạch. */
  can: string[];
  /** Gạch đủ dòng thì mở manh mối này. */
  moManhMoi: string | null;
}

export interface LoiLopKhacMvp {
  loi: string[];
  /** Câu hỏi mẫu riêng của nhân chứng này (thêm vào câu mẫu chung); câu đầu dùng ở cách bấm khi có. */
  cauHoiMau: string[];
}

export interface HoiMoHoiDapMvp {
  /** Câu hỏi mở ở cách bấm sau khi đã hỏi ra điều gì đó. */
  hoiTiep: string;
  /** Lời khi không còn gì tự kể (xoay vòng). */
  hetKe: string[];
  cauHoiMau: string[];
}

export interface ChuDeKhongBietMvp {
  ma: string;
  cauHoiMau: string[];
  loi: string[];
}

export interface GioiHanHoiDapMvp {
  soCau: number;
  lyDo: 'ban' | 'phien';
  baoTruoc: { con: number; loi: string };
  het: string;
}

export interface LoiBanMvp {
  ai: string;
  loi: string;
}

export interface ToHoiDapMvp {
  /** Trùng mã chuỗi có dòng `- [HỎI ĐÁP <mã>]` trong kich-ban/. */
  ma: string;
  nhanChung: string;
  nguoiDiCung: string[];
  moDau: string;
  /** Các dữ kiện đoạn [LỜI] viết sẵn của chuỗi đã nói ra (cách "xem cả đoạn"), theo thứ tự kể. */
  tuDongDuKien: string[];
  /**
   * Mã các đoạn `[LỜI]` của chuỗi mà buổi hỏi đã thay (cách bấm / gõ). Có khai thì sau buổi hỏi máy bỏ qua đúng các đoạn ấy ở
   * bất cứ đâu trong chuỗi (màn soi, ảnh, tài liệu, hậu quả khác vẫn chạy). Thiếu = hành vi cũ: bỏ khối lời liền sau `[HỎI ĐÁP]`.
   */
  loiDaThay?: string[];
  /** Vị trí trong `chuoi.nodes` của các dòng lời thuộc `loiDaThay` (bộ sinh dò sẵn từ bản đồ ghép lời). */
  nutDaThay?: number[];
  gioiHan: GioiHanHoiDapMvp | null;
  danhSach: DongDanhSachMvp[];
  duKien: DuKienHoiDapMvp[];
  lopKhac: Record<Exclude<LopKhacMvp, 'hoi-mo'>, LoiLopKhacMvp> & { 'hoi-mo': HoiMoHoiDapMvp };
  chuDeKhongBiet: ChuDeKhongBietMvp[];
  tuKhoaTrongChuyen: string[];
  roiDi: { nut: string; loiBan: string; giuLai: LoiBanMvp; du: LoiBanMvp; thieu: LoiBanMvp };
}

export interface BoHoiDapMvp {
  /** Câu hỏi mẫu cho từng ý định chung. */
  chung: Record<YDinhChungMvp, string[]>;
  /** Tờ dữ kiện theo mã chuỗi. */
  to: Record<string, ToHoiDapMvp>;
  /** Câu mẫu và lời viết sẵn khi người chơi hỏi bạn đi cùng "việc chính", "gợi ý" (`hoi-dap/dong-hanh.json`). */
  dongHanh?: DongHanhHoiDapMvp;
}

/** Hai ý định người chơi hỏi bạn đi cùng mà máy trả lời bằng lời viết sẵn, không gọi mạng. */
export type YDinhDongHanhMvp = 'viec-chinh' | 'goi-y';
export const Y_DINH_DONG_HANH: readonly YDinhDongHanhMvp[] = ['viec-chinh', 'goi-y'];

/** Lời viết sẵn của một bạn đi cùng. `{viec}`: nhiệm vụ hiện tại; `{nhac}`: lời nhắc việc; `{dong}`: các dòng "Cần làm rõ" còn mở. */
export interface LoiDongHanhMvp {
  /** Việc chính: có nhiệm vụ. */
  viecChinh: string;
  /** Việc chính: câu nối các dòng "Cần làm rõ" còn mở (đặt sau `viecChinh`). */
  conMo: string;
  /** Việc chính: chưa có nhiệm vụ nào. */
  khongViec: string;
  /** Gợi ý: có lời nhắc việc. */
  goiY: string;
  /** Gợi ý: chưa có lời nhắc việc. */
  khongGoiY: string;
  /** Câu hỏi ngoài hai ý định mà máy chủ trò chuyện không có. */
  khongMay: string;
  /**
   * Gói B15: việc chính của ngày đã xong, người chơi tự bấm hết ngày. `{nhan}`: nhãn của dòng `[HẾT NGÀY]`, viết thường chữ đầu
   * ("về phòng KTX ăn tối"). Dùng cho ô "Việc đang làm" và khi người chơi hỏi bạn đi cùng việc chính / gợi ý.
   */
  hetNgay?: string;
}

export interface DongHanhHoiDapMvp {
  /** Câu mẫu cho hai ý định; `khac` (tùy chọn): câu chuyện phiếm để máy không ép vào hai ý định kia. */
  cauMau: Record<YDinhDongHanhMvp, string[]> & { khac?: string[] };
  /** Lời theo mã bạn đi cùng (`tung`, `ha-vy`). */
  loi: Record<string, LoiDongHanhMvp>;
}

/** Bảng dữ liệu: cột có kiểu SQLite, hàng theo đúng thứ tự cột; `null` = ô NULL. */
export interface BangDuLieuMvp {
  /** Gói B21 `{bảng · nhãn: Sinh viên}`: chữ tiếng Việt hiện trên khối bảng ở màn tra (câu SQL vẫn là tên thật). */
  nhan?: string;
  /** Gói B21 `- Nhãn: ma_sv=Mã sinh viên, …`: chữ tiếng Việt hiện trên khối cột theo tên cột. */
  nhanCot?: Record<string, string | undefined>;
  ten: string;
  cot: { ten: string; kieu: 'TEXT' | 'INTEGER' }[];
  dong: (string | number | null)[][];
}

/** Bảng ảo (VIEW): runtime tạo bằng `CREATE VIEW <ten> AS <sql>` sau khi nạp bảng. */
export interface BangAoMvp {
  ten: string;
  sql: string;
}

export interface BoDuLieuMvp {
  bang: BangDuLieuMvp[];
  bangAo: BangAoMvp[];
}
