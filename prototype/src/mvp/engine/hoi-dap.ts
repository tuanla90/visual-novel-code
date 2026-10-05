/**
 * HỎI NHÂN CHỨNG (gói B12, docs/mua-1/brief/b12-vu-1.md) — luật chơi thuần, không React, không store.
 * Đặc tả hành vi: `tools/thu-hoi-dap/thu-hoi-dap.html` (màn thử). Tờ dữ kiện: `kb.hoiDap.to[<mã chuỗi>]`.
 *
 * CÁCH GIAO DIỆN GỌI
 *   - Khung nhìn: `khungNhin(kb, s)` (may.ts) trả `{ kind: 'hoi-dap', hoiDap: KhungHoiDapMvp }` khi con trỏ đứng ở nút
 *     `[HỎI ĐÁP]` và buổi hỏi đang mở. `hoiDap.nhatKy` là các dòng hỏi đáp (vẽ như khung chat), `hoiDap.bong` là bóng thoại
 *     của bạn đi cùng (góc phải), `hoiDap.danhSach` là trang "Cần làm rõ" của sổ CLB, `hoiDap.giayNho` là giấy nhớ đã hỏi ra.
 *   - Hành động (gửi qua `xuLy` của may.ts, như mọi hành động khác):
 *       `{ type: 'doi-cach-choi', cach }`       đổi cách chơi (lúc nào cũng được, lưu cùng ván);
 *       `{ type: 'hoi-dap-hoi', cau }`           cách gõ: câu người chơi gõ (máy so chữ xếp lớp);
 *       `{ type: 'hoi-dap-hoi', cau, lop }`      cách bấm / bấm câu gợi ý bậc 2: `cau`, `lop` lấy từ `hoiDap.cauBam` hay `bong`;
 *       `{ type: 'hoi-dap-ke-tiep' }`            cách "xem cả đoạn" giữa buổi: nhân chứng kể nốt điều còn thiếu (`hoiDap.conKe`);
 *       `{ type: 'hoi-dap-goi-y' }`              bấm vào avatar bạn đi cùng: gợi ý bậc 1 rồi bậc 2;
 *       `{ type: 'hoi-dap-dong-bong' }`          đóng bóng thoại ("Hỏi tiếp" sau khi bị giữ lại cũng là đóng bóng);
 *       `{ type: 'hoi-dap-roi-di' }`             nút rời đi (`hoiDap.nutRoiDi`); bị giữ lại một lần, bấm lần nữa ("Vẫn đi") là đi;
 *       `{ type: 'tiep' }`                       sau khi đã chào đi (`hoiDap.daRoi`): đóng khung, chạy tiếp chuỗi.
 *   - Ngoài buổi hỏi: `giayNhoHoiDap(kb, s)` (giấy nhớ cho hồ sơ), `canLamRo(kb, s)` (các dòng còn thiếu cho sổ / nhắc việc),
 *     `cachChoiCua(s)`.
 *
 * LUẬT (theo màn thử)
 *   - Lớp của câu hỏi: dữ kiện của nhân chứng, ý định chung (`chung.json` + câu mẫu riêng trong `lopKhac`), chủ đề không biết
 *     (`chu-de:<mã>`). Dưới ngưỡng: có từ khóa trong chuyện → "khong-ro", không → "ngoai-le".
 *   - Lời: dữ kiện theo kiểu câu hỏi (thẳng, có-không, kể; đã biết thì "lai"); lời ý định chung, chủ đề không biết, từ chối xoay vòng.
 *   - Câu hỏi mở: tự kể dữ kiện `tuKe` theo thứ tự, rồi `nhoRa` khi đủ `sauKhi`, rồi `hetKe`.
 *   - Từ chối: dữ kiện có `canCo` chưa đủ trong hồ sơ → một lời `tuChoi`, không tính là hỏi ra.
 *   - Giới hạn: mỗi câu gõ / bấm tính một lượt (chào, cảm ơn, chào đi thì không); còn `baoTruoc.con` lượt thì kèm lời báo trước;
 *     hết lượt thì lời `het`, buổi hỏi đóng. Làm việc khác trong cảnh (bấm chỗ khác ở [KHÁM PHÁ]) thì lượt nạp lại.
 *     "Xem cả đoạn" (`hoi-dap-ke-tiep`) luôn dùng được, kể cả khi hết lượt.
 *   - Rời đi: còn dòng chưa gạch thì bạn đi cùng giữ lại đúng một lần; vẫn đi thì đi, chỗ bấm của nhân chứng ở [KHÁM PHÁ] coi như
 *     chưa xem (việc chính chưa xong) cho tới khi quay lại hỏi đủ.
 *   - Gạch đủ một dòng có `moManhMoi` → mở manh mối đó. Đóng buổi hỏi thì máy bỏ qua các dòng lời viết sẵn ngay sau `[HỎI ĐÁP]`
 *     và hậu quả mở các manh mối ấy (buổi hỏi đã thay), hậu quả khác vẫn chạy.
 *   - Tờ khai `loiDaThay` (lời của buổi hỏi rải nhiều đoạn, bị ngắt bởi màn soi, `[ẢNH]`, `[HẬU QUẢ]`): đóng buổi hỏi thì chạy
 *     tiếp ngay sau `[HỎI ĐÁP]`, máy bỏ qua đúng các dòng lời của các đoạn đã khai ở bất cứ đâu trong chuỗi (`laLoiDaThay`) và
 *     hậu quả mở manh mối mà danh sách đã lo (`locHauQuaDaThay`); màn soi, ảnh, tài liệu, hậu quả khác vẫn chạy.
 */
import { Y_DINH_CHUNG, type BoHoiDapMvp, type DuKienHoiDapMvp, type HauQuaMvp, type KichBanMvp, type LopKhacMvp, type NutMvp, type ToHoiDapMvp } from '../../content/mvp/types';
import type { BongDiCungMvp, BuoiHoiMvp, CachChoiMvp, DongHoiDapMvp, TienDoHoiDapMvp, TrangThaiMvp } from './trang-thai';
import { dungMaySoChu, kieuHoi, xepCau, type CauMau, type KetQuaXep, type MaySoChu } from './xep-cau-hoi';

export const CACH_CHOI_MAC_DINH: CachChoiMvp = 'go';
/** Số câu trượt liền nhau (cách gõ) thì bạn đi cùng tự gợi ý. */
export const TRUOT_GOI_Y = 2;
/** Tiền tố lớp của chủ đề nhân chứng không có dữ kiện. */
export const CHU_DE = 'chu-de:';

/** Lớp không tính lượt hỏi. */
const KHONG_TINH_LUOT = new Set(['chao', 'cam-on', 'tam-biet']);
/** Ý định chung thuộc nhóm "ngoài lề" (khi chấm máy xếp coi như "ngoai-le"). */
export const NHOM_NGOAI_LE = new Set(['ngoai-le', 'hoi-rieng-tu', 'pha-game', 'doi-dap-an']);

export function cachChoiCua(s: TrangThaiMvp): CachChoiMvp {
  return s.cachChoi ?? CACH_CHOI_MAC_DINH;
}

export function toHoiDap(kb: KichBanMvp, ma: string): ToHoiDapMvp | undefined {
  return kb.hoiDap?.to[ma];
}

export function tienDoCua(s: TrangThaiMvp, ma: string): TienDoHoiDapMvp {
  return s.tienDoHoiDap?.[ma] ?? { biet: [], bacGoiY: {}, xoay: {}, luot: 0 };
}

function datTienDo(s: TrangThaiMvp, ma: string, td: TienDoHoiDapMvp): TrangThaiMvp {
  return { ...s, tienDoHoiDap: { ...(s.tienDoHoiDap ?? {}), [ma]: td } };
}

function coTrongHoSo(s: TrangThaiMvp, id: string): boolean {
  return s.hoSo.manhMoi.includes(id) || s.hoSo.taiLieu.includes(id) || s.hoSo.bangChung.includes(id) || s.co.includes(id) || s.thuThachXong.includes(id);
}

/** `canCo` nhận mã thẻ hồ sơ (`clue-…`, `ev-…`, `doc-…`), cờ, thử thách đã xong, và mã dữ kiện cùng tờ đã hỏi ra. */
const duCanCo = (s: TrangThaiMvp, d: DuKienHoiDapMvp, biet: ReadonlySet<string> | readonly string[]): boolean =>
  d.canCo.every((c) => coTrongHoSo(s, c) || ('has' in biet ? biet.has(c) : biet.includes(c)));

// ---------- Máy xếp câu hỏi của một tờ ----------

const BO_NHO_MAY = new WeakMap<ToHoiDapMvp, MaySoChu>();

/** Bộ câu mẫu của một tờ: dữ kiện, ý định chung (chung.json + câu riêng của nhân chứng), chủ đề không biết. */
export function cauMauCuaTo(bo: Pick<BoHoiDapMvp, 'chung'>, to: ToHoiDapMvp): CauMau[] {
  const mau: CauMau[] = [];
  for (const d of to.duKien) for (const c of d.cauHoiMau) mau.push({ lop: d.ma, cau: c });
  for (const y of Y_DINH_CHUNG) {
    for (const c of bo.chung[y] ?? []) mau.push({ lop: y, cau: c });
    for (const c of to.lopKhac[y]?.cauHoiMau ?? []) mau.push({ lop: y, cau: c });
  }
  for (const k of to.chuDeKhongBiet) for (const c of k.cauHoiMau) mau.push({ lop: CHU_DE + k.ma, cau: c });
  return mau;
}

export function mayCuaTo(bo: Pick<BoHoiDapMvp, 'chung'>, to: ToHoiDapMvp): MaySoChu {
  const co = BO_NHO_MAY.get(to);
  if (co) return co;
  const may = dungMaySoChu(cauMauCuaTo(bo, to));
  BO_NHO_MAY.set(to, may);
  return may;
}

/** Xếp một câu người chơi gõ vào lớp: mã dữ kiện | ý định chung | "khong-ro" | `chu-de:<mã>`. */
export function xepCauHoi(bo: Pick<BoHoiDapMvp, 'chung'>, to: ToHoiDapMvp, cau: string): KetQuaXep {
  return xepCau(mayCuaTo(bo, to), cau, to.tuKhoaTrongChuyen);
}

// ---------- Chọn lời ----------

export interface TraLoiMvp {
  loi: string;
  /** Dữ kiện vừa hỏi ra (chưa biết trước đó). */
  moi: string | null;
  bienThe: string;
  tuChoi: boolean;
}

function xoayLoi(td: TienDoHoiDapMvp, khoa: string, ds: readonly string[]): { loi: string; td: TienDoHoiDapMvp } {
  const i = (td.xoay[khoa] ?? -1) + 1;
  return { loi: ds.length ? (ds[i % ds.length] ?? '') : '', td: { ...td, xoay: { ...td.xoay, [khoa]: i } } };
}

/** Lời nhân chứng cho một lớp (thuần; trả cả tiến độ đã xoay vòng). */
export function chonLoi(s: TrangThaiMvp, to: ToHoiDapMvp, td: TienDoHoiDapMvp, lop: string, cau: string): { tl: TraLoiMvp; td: TienDoHoiDapMvp } {
  const biet = new Set(td.biet);
  if (lop === 'hoi-mo') {
    const ke = to.duKien.find((x) => x.tuKe && !biet.has(x.ma) && duCanCo(s, x, biet));
    if (ke) return { tl: { loi: ke.bienThe['tu-ke'] ?? ke.bienThe.ke ?? ke.bienThe.thang, moi: ke.ma, bienThe: 'tu-ke', tuChoi: false }, td };
    const nho = to.duKien.find((x) => x.nhoRa && !biet.has(x.ma) && x.sauKhi.every((c) => biet.has(c)) && duCanCo(s, x, biet));
    if (nho) return { tl: { loi: nho.bienThe.nho ?? nho.bienThe.thang, moi: nho.ma, bienThe: 'nho', tuChoi: false }, td };
    const x = xoayLoi(td, 'hoi-mo', to.lopKhac['hoi-mo'].hetKe);
    return { tl: { loi: x.loi, moi: null, bienThe: 'het-ke', tuChoi: false }, td: x.td };
  }
  if (lop.startsWith(CHU_DE)) {
    const k = to.chuDeKhongBiet.find((c) => CHU_DE + c.ma === lop);
    const x = xoayLoi(td, lop, k?.loi ?? to.lopKhac['khong-ro'].loi);
    return { tl: { loi: x.loi, moi: null, bienThe: lop, tuChoi: false }, td: x.td };
  }
  const d = to.duKien.find((x) => x.ma === lop);
  if (!d) {
    const lk = to.lopKhac[lop as Exclude<LopKhacMvp, 'hoi-mo'>] ?? to.lopKhac['ngoai-le'];
    const x = xoayLoi(td, lop, lk.loi);
    return { tl: { loi: x.loi, moi: null, bienThe: lop, tuChoi: false }, td: x.td };
  }
  if (!duCanCo(s, d, biet)) {
    const x = xoayLoi(td, 'tu-choi:' + d.ma, d.tuChoi);
    return { tl: { loi: x.loi, moi: null, bienThe: 'tu-choi', tuChoi: true }, td: x.td };
  }
  const k = biet.has(d.ma) ? 'lai' : kieuHoi(cau);
  const bienThe = d.bienThe[k] ? k : 'thang';
  return { tl: { loi: d.bienThe[bienThe] ?? d.bienThe.thang, moi: biet.has(d.ma) ? null : d.ma, bienThe, tuChoi: false }, td };
}

// ---------- Ghi nhận điều đã hỏi ra ----------

/** Thêm dữ kiện vào điều đã biết; gạch đủ dòng có `moManhMoi` → mở manh mối. */
function ghiBiet(s: TrangThaiMvp, to: ToHoiDapMvp, ma: string): TrangThaiMvp {
  const td = tienDoCua(s, to.ma);
  if (td.biet.includes(ma)) return s;
  s = datTienDo(s, to.ma, { ...td, biet: [...td.biet, ma] });
  return moManhMoiDu(s, to);
}

function moManhMoiDu(s: TrangThaiMvp, to: ToHoiDapMvp): TrangThaiMvp {
  const biet = new Set(tienDoCua(s, to.ma).biet);
  for (const d of to.danhSach) {
    if (d.moManhMoi && d.can.every((c) => biet.has(c)) && !s.hoSo.manhMoi.includes(d.moManhMoi)) {
      s = { ...s, hoSo: { ...s.hoSo, manhMoi: [...s.hoSo.manhMoi, d.moManhMoi] } };
    }
  }
  return s;
}

/** Cách "xem cả đoạn" chạy đoạn [LỜI] viết sẵn: ghi nhận mọi dữ kiện đoạn ấy đã nói (giấy nhớ), không mở manh mối (hậu quả của chuỗi lo). */
export function ghiTuDong(kb: KichBanMvp, s: TrangThaiMvp, ma: string): TrangThaiMvp {
  const to = toHoiDap(kb, ma);
  if (!to) return s;
  const td = tienDoCua(s, ma);
  const them = to.tuDongDuKien.filter((c) => !td.biet.includes(c));
  return them.length ? datTienDo(s, ma, { ...td, biet: [...td.biet, ...them] }) : s;
}

// ---------- Buổi hỏi ----------

function dongCua(ai: string, chu: string, them: Partial<DongHoiDapMvp> = {}): DongHoiDapMvp {
  return { ai, chu, ...them };
}

/** Mở buổi hỏi ở nút `[HỎI ĐÁP ma]`. Lần trước đã hết lượt mà chưa làm việc khác → mở ở trạng thái đóng (chỉ đi / xem cả đoạn). */
export function moBuoiHoi(kb: KichBanMvp, s: TrangThaiMvp, ma: string): TrangThaiMvp {
  const to = toHoiDap(kb, ma);
  if (!to) return s;
  const td = tienDoCua(s, ma);
  const hetLuot = !!to.gioiHan && td.luot >= to.gioiHan.soCau;
  const nhatKy: DongHoiDapMvp[] = [dongCua('narrator', to.moDau)];
  if (hetLuot && to.gioiHan) nhatKy.push(dongCua(to.nhanChung, to.gioiHan.het));
  const buoi: BuoiHoiMvp = { ma, nhatKy, truot: 0, daGiu: false, dong: hetLuot, daRoi: false, bong: null };
  return { ...s, buoiHoi: buoi };
}

/** Buổi hỏi đang mở của tờ `ma` (con trỏ đang đứng ở nút của nó), nếu có. */
function buoiMo(s: TrangThaiMvp): BuoiHoiMvp | null {
  return s.buoiHoi ?? null;
}

function datBuoi(s: TrangThaiMvp, b: BuoiHoiMvp): TrangThaiMvp {
  return { ...s, buoiHoi: b };
}

/** Bạn đi cùng gợi ý cho điều đầu tiên còn chưa rõ trong danh sách: bậc 1 nói điều nhóm chưa biết, bậc 2 đưa hẳn câu hỏi. */
export function goiY(kb: KichBanMvp, s: TrangThaiMvp, tuBam: boolean): TrangThaiMvp {
  const b = buoiMo(s);
  const to = b ? toHoiDap(kb, b.ma) : undefined;
  if (!b || !to || b.daRoi) return s;
  const td = tienDoCua(s, to.ma);
  const thieu = to.danhSach.flatMap((m) => m.can).find((c) => !td.biet.includes(c));
  if (!thieu) {
    return tuBam ? datBuoi(s, { ...b, bong: { kieu: 'du', ai: to.roiDi.du.ai, loi: to.roiDi.du.loi } }) : s;
  }
  const d = to.duKien.find((x) => x.ma === thieu);
  if (!d?.goiY) return s;
  const bac = Math.min(2, (td.bacGoiY[thieu] ?? 0) + 1);
  s = datTienDo(s, to.ma, { ...td, bacGoiY: { ...td.bacGoiY, [thieu]: bac } });
  const bong: BongDiCungMvp = bac === 1 ? { kieu: 'goi-y-1', ai: d.goiY.ai, loi: d.goiY.bac1, duKien: d.ma } : { kieu: 'goi-y-2', ai: d.goiY.ai, loi: null, cauHoi: d.goiY.bac2, duKien: d.ma };
  return datBuoi(s, { ...b, bong });
}

/**
 * Người chơi hỏi một câu (gõ, hay bấm khi có `lopSan`). Câu xếp vào "tam-biet" thì là rời đi.
 * Lớp bấm sẵn chỉ nhận mã dữ kiện của tờ hoặc "hoi-mo".
 */
export function hoi(kb: KichBanMvp, s: TrangThaiMvp, cau: string, lopSan?: string): TrangThaiMvp {
  const b = buoiMo(s);
  const to = b ? toHoiDap(kb, b.ma) : undefined;
  const bo = kb.hoiDap;
  const cauGon = cau.normalize('NFC').replace(/\s+/g, ' ').trim();
  if (!b || !to || !bo || b.daRoi || cauGon === '') return s;
  if (lopSan !== undefined && lopSan !== 'hoi-mo' && !to.duKien.some((d) => d.ma === lopSan)) return s;
  const kq: KetQuaXep = lopSan !== undefined ? { lop: lopSan, diem: 1 } : xepCauHoi(bo, to, cauGon);
  const dongNguoiChoi = dongCua('player', cauGon, { lop: kq.lop, diem: Number(kq.diem.toFixed(3)), nguon: lopSan !== undefined ? 'bam' : 'go' });
  if (kq.lop === 'tam-biet') return roiDi(kb, datBuoi(s, { ...b, nhatKy: [...b.nhatKy, dongNguoiChoi] }), true);
  // Hết lượt: nhân chứng không trả lời nữa (chỉ còn chào đi hoặc "xem cả đoạn").
  if (b.dong) return s;

  let td = tienDoCua(s, to.ma);
  const tinhLuot = !KHONG_TINH_LUOT.has(kq.lop);
  const chon = chonLoi(s, to, td, kq.lop, cauGon);
  td = chon.td;
  const nhatKy = [...b.nhatKy, dongNguoiChoi, dongCua(to.nhanChung, chon.tl.loi, { bienThe: chon.tl.bienThe, ...(chon.tl.moi ? { moi: chon.tl.moi } : {}) })];
  let dong = false;
  if (tinhLuot) td = { ...td, luot: td.luot + 1 };
  const gh = to.gioiHan;
  if (gh && tinhLuot) {
    const con = gh.soCau - td.luot;
    if (con <= 0) {
      nhatKy.push(dongCua(to.nhanChung, gh.het));
      dong = true;
    } else if (con === gh.baoTruoc.con) nhatKy.push(dongCua(to.nhanChung, gh.baoTruoc.loi));
  }
  s = datTienDo(s, to.ma, td);
  if (chon.tl.moi) s = ghiBiet(s, to, chon.tl.moi);
  const truot = chon.tl.moi ? 0 : KHONG_TINH_LUOT.has(kq.lop) ? b.truot : b.truot + 1;
  s = datBuoi(s, { ...b, nhatKy, truot, dong, bong: chon.tl.moi ? null : b.bong });
  // Cách gõ: trượt hai câu liền thì bạn đi cùng tự gợi ý (bậc tăng dần).
  if (cachChoiCua(s) === 'go' && !dong && truot >= TRUOT_GOI_Y) s = goiY(kb, s, false);
  return s;
}

/** Cách "xem cả đoạn" giữa buổi hỏi: nhân chứng kể điều kế tiếp còn thiếu của đoạn viết sẵn (lời "thang"). Không tính lượt. */
export function keTiep(kb: KichBanMvp, s: TrangThaiMvp): TrangThaiMvp {
  const b = buoiMo(s);
  const to = b ? toHoiDap(kb, b.ma) : undefined;
  if (!b || !to || b.daRoi) return s;
  const d = dieuKeTiep(s, to);
  if (!d) return s;
  s = ghiBiet(s, to, d.ma);
  return datBuoi(s, { ...b, bong: null, nhatKy: [...b.nhatKy, dongCua(to.nhanChung, d.bienThe.thang, { bienThe: 'thang', moi: d.ma, nguon: 'ke' })] });
}

/** Dữ kiện kế tiếp của đoạn viết sẵn mà người chơi chưa biết (bỏ qua dữ kiện chưa đủ `canCo`). */
function dieuKeTiep(s: TrangThaiMvp, to: ToHoiDapMvp): DuKienHoiDapMvp | undefined {
  const td = tienDoCua(s, to.ma);
  return to.tuDongDuKien.map((c) => to.duKien.find((x) => x.ma === c)).find((x): x is DuKienHoiDapMvp => !!x && !td.biet.includes(x.ma) && duCanCo(s, x, td.biet));
}

/** Rời đi (nút hoặc lời chào). Còn dòng chưa gạch thì bạn đi cùng giữ lại đúng một lần; vẫn đi thì đi. */
export function roiDi(kb: KichBanMvp, s: TrangThaiMvp, daNoiLoiChao: boolean): TrangThaiMvp {
  const b = buoiMo(s);
  const to = b ? toHoiDap(kb, b.ma) : undefined;
  if (!b || !to || b.daRoi) return s;
  const td = tienDoCua(s, to.ma);
  const thieu = to.danhSach.filter((m) => !m.can.every((c) => td.biet.includes(c)));
  if (thieu.length > 0 && !b.daGiu) {
    return datBuoi(s, { ...b, daGiu: true, bong: { kieu: 'giu-lai', ai: to.roiDi.giuLai.ai, loi: to.roiDi.giuLai.loi, dongThieu: thieu[0]?.cau ?? '' } });
  }
  const nhatKy = [...b.nhatKy];
  if (!daNoiLoiChao) nhatKy.push(dongCua('player', to.roiDi.loiBan));
  const x = xoayLoi(td, 'tam-biet', to.lopKhac['tam-biet'].loi);
  nhatKy.push(dongCua(to.nhanChung, x.loi, { bienThe: 'tam-biet' }));
  s = datTienDo(s, to.ma, x.td);
  const k = thieu.length > 0 ? to.roiDi.thieu : to.roiDi.du;
  return datBuoi(s, { ...b, nhatKy, daRoi: true, bong: { kieu: thieu.length > 0 ? 'roi-di-thieu' : 'roi-di-du', ai: k.ai, loi: k.loi } });
}

export function dongBong(s: TrangThaiMvp): TrangThaiMvp {
  const b = buoiMo(s);
  return b && b.bong ? datBuoi(s, { ...b, bong: null }) : s;
}

/** Các dòng danh sách của tờ chưa gạch. */
export function dongChuaGach(s: TrangThaiMvp, to: ToHoiDapMvp): ToHoiDapMvp['danhSach'] {
  const biet = tienDoCua(s, to.ma).biet;
  return to.danhSach.filter((m) => !m.can.every((c) => biet.includes(c)));
}

/**
 * Sau buổi hỏi: các nút ngay sau `[HỎI ĐÁP]` mà buổi hỏi đã thay (dòng lời viết sẵn, ghi chú dàn dựng, hậu quả). Trả vị trí nút
 * chạy tiếp và các hậu quả còn phải áp (bỏ hậu quả mở manh mối mà danh sách đã lo).
 */
export function khoiThayThe(nodes: readonly NutMvp[], viTriHoiDap: number, to: ToHoiDapMvp): { nutSau: number; hauQua: HauQuaMvp[] } {
  // Tờ khai `loiDaThay`: không bỏ khối liền sau nữa; máy bỏ đúng các đoạn đã khai khi chạy tiếp chuỗi (`laLoiDaThay`).
  if (to.nutDaThay) return { nutSau: viTriHoiDap + 1, hauQua: [] };
  const daLo = manhMoiDaLo(to);
  const hauQua: HauQuaMvp[] = [];
  let i = viTriHoiDap + 1;
  for (; i < nodes.length; i++) {
    const n = nodes[i];
    if (!n) break;
    if (n.type === 'line' || n.type === 'note') continue;
    if (n.type === 'consequence') {
      hauQua.push(...n.hauQua.filter((h) => !(h.kind === 'mo-manh-moi' && daLo.has(h.id))));
      continue;
    }
    break;
  }
  return { nutSau: i, hauQua };
}

/** Manh mối mà danh sách "Cần làm rõ" của tờ tự mở (thay cho `[HẬU QUẢ] mở manh mối` của chuỗi). */
function manhMoiDaLo(to: ToHoiDapMvp): Set<string> {
  return new Set(to.danhSach.map((d) => d.moManhMoi).filter((x): x is string => !!x));
}

/**
 * Buổi hỏi đã thay lời (cách bấm / gõ, tờ khai `loiDaThay`): nút ở vị trí `nut` của chuỗi `chuoi` là dòng lời buổi hỏi đã
 * nói ra, máy bỏ qua.
 */
export function laLoiDaThay(kb: KichBanMvp, s: TrangThaiMvp, chuoi: string, nut: number): boolean {
  if (!s.daThayLoi || s.daThayLoi !== chuoi) return false;
  return toHoiDap(kb, chuoi)?.nutDaThay?.includes(nut) ?? false;
}

/** Hậu quả gặp khi chạy tiếp chuỗi đã có buổi hỏi thay lời: bỏ hậu quả mở manh mối mà danh sách đã lo, hậu quả khác giữ. */
export function locHauQuaDaThay(kb: KichBanMvp, s: TrangThaiMvp, chuoi: string, hauQua: HauQuaMvp[]): HauQuaMvp[] {
  if (!s.daThayLoi || s.daThayLoi !== chuoi) return hauQua;
  const to = toHoiDap(kb, chuoi);
  if (!to?.nutDaThay) return hauQua;
  const daLo = manhMoiDaLo(to);
  return hauQua.filter((h) => !(h.kind === 'mo-manh-moi' && daLo.has(h.id)));
}

/** Làm việc khác trong cảnh (bấm chỗ khác ở [KHÁM PHÁ]): lượt hỏi của các tờ không thuộc chuỗi `chuoiMoi` được nạp lại. */
export function napLaiLuot(kb: KichBanMvp, s: TrangThaiMvp, chuoiMoi: string): TrangThaiMvp {
  const td = s.tienDoHoiDap;
  if (!td) return s;
  const giu = new Set((kb.chuoi.find((c) => c.id === chuoiMoi)?.nodes ?? []).flatMap((n) => (n.type === 'hoi-dap' ? [n.ma] : [])));
  let doi = false;
  const moi: Record<string, TienDoHoiDapMvp> = {};
  for (const [ma, t] of Object.entries(td)) {
    if (t.luot > 0 && !giu.has(ma)) {
      moi[ma] = { ...t, luot: 0 };
      doi = true;
    } else moi[ma] = t;
  }
  return doi ? { ...s, tienDoHoiDap: moi } : s;
}

// ---------- Khung nhìn ----------

export interface DongDanhSachHienMvp {
  ma: string;
  cau: string;
  xong: boolean;
  /** Đã rõ một phần (dòng cần nhiều dữ kiện). */
  motPhan: boolean;
}

export interface GiayNhoHoiDapMvp {
  to: string;
  duKien: string;
  chu: string;
  /** Dữ kiện ngoài danh sách: người chơi tự hỏi ra. */
  an: boolean;
}

export interface CauBamMvp {
  cau: string;
  lop: string;
}

export interface KhungHoiDapMvp {
  to: ToHoiDapMvp;
  nhanChung: string;
  cachChoi: CachChoiMvp;
  nhatKy: DongHoiDapMvp[];
  bong: BongDiCungMvp | null;
  danhSach: DongDanhSachHienMvp[];
  giayNho: GiayNhoHoiDapMvp[];
  /** Cách bấm: câu hỏi mở rồi câu hỏi của các dữ kiện chưa biết (dữ kiện ẩn chỉ hiện khi đã biết điều liên quan). */
  cauBam: CauBamMvp[];
  /** Cách "xem cả đoạn": còn điều để kể nốt. */
  conKe: boolean;
  /** Số câu còn hỏi được; `null` = không giới hạn. */
  conLuot: number | null;
  daDong: boolean;
  daRoi: boolean;
  nutRoiDi: string;
  /** Mọi dòng danh sách đã gạch. */
  du: boolean;
}

export function danhSachHien(s: TrangThaiMvp, to: ToHoiDapMvp): DongDanhSachHienMvp[] {
  const biet = new Set(tienDoCua(s, to.ma).biet);
  return to.danhSach.map((m) => {
    const co = m.can.filter((c) => biet.has(c)).length;
    return { ma: m.ma, cau: m.cau, xong: co === m.can.length, motPhan: co > 0 && co < m.can.length };
  });
}

function giayNhoCuaTo(s: TrangThaiMvp, to: ToHoiDapMvp): GiayNhoHoiDapMvp[] {
  const biet = tienDoCua(s, to.ma).biet;
  return biet.flatMap((ma) => {
    const d = to.duKien.find((x) => x.ma === ma);
    return d ? [{ to: to.ma, duKien: d.ma, chu: d.giayNho, an: d.an }] : [];
  });
}

/** Giấy nhớ từ mọi buổi hỏi (theo thứ tự hỏi ra), cho hồ sơ. */
export function giayNhoHoiDap(kb: KichBanMvp, s: TrangThaiMvp): GiayNhoHoiDapMvp[] {
  return Object.values(kb.hoiDap?.to ?? {}).flatMap((to) => giayNhoCuaTo(s, to));
}

/** Các dòng "Cần làm rõ" còn thiếu của những nhân chứng đã gặp (có tiến độ), cho sổ CLB và nhắc việc. */
export function canLamRo(kb: KichBanMvp, s: TrangThaiMvp): { to: string; nhanChung: string; dong: DongDanhSachHienMvp[] }[] {
  return Object.values(kb.hoiDap?.to ?? {})
    .filter((to) => s.tienDoHoiDap?.[to.ma] !== undefined)
    .map((to) => ({ to: to.ma, nhanChung: to.nhanChung, dong: danhSachHien(s, to).filter((d) => !d.xong) }))
    .filter((x) => x.dong.length > 0);
}

export function khungHoiDap(kb: KichBanMvp, s: TrangThaiMvp, ma: string): KhungHoiDapMvp | null {
  const to = toHoiDap(kb, ma);
  if (!to) return null;
  const b: BuoiHoiMvp = s.buoiHoi && s.buoiHoi.ma === ma ? s.buoiHoi : { ma, nhatKy: [{ ai: 'narrator', chu: to.moDau }], truot: 0, daGiu: false, dong: false, daRoi: false, bong: null };
  const td = tienDoCua(s, ma);
  const biet = new Set(td.biet);
  const danhSach = danhSachHien(s, to);
  const cauMo = biet.size > 0 ? to.lopKhac['hoi-mo'].hoiTiep : (to.lopKhac['hoi-mo'].cauHoiMau[0] ?? kb.hoiDap?.chung['hoi-mo'][0] ?? to.lopKhac['hoi-mo'].hoiTiep);
  const cauBam: CauBamMvp[] = [
    { cau: cauMo, lop: 'hoi-mo' },
    ...to.duKien
      .filter((d) => !biet.has(d.ma) && (!d.an || (d.sauKhi.length > 0 && d.sauKhi.every((x) => biet.has(x)))))
      .flatMap((d) => (d.cauHoiMau[0] ? [{ cau: d.cauHoiMau[0], lop: d.ma }] : [])),
  ];
  return {
    to,
    nhanChung: to.nhanChung,
    cachChoi: cachChoiCua(s),
    nhatKy: b.nhatKy,
    bong: b.bong,
    danhSach,
    giayNho: giayNhoCuaTo(s, to),
    cauBam,
    conKe: !b.daRoi && !!dieuKeTiep(s, to),
    conLuot: to.gioiHan ? Math.max(0, to.gioiHan.soCau - td.luot) : null,
    daDong: b.dong,
    daRoi: b.daRoi,
    nutRoiDi: to.roiDi.nut,
    du: danhSach.every((d) => d.xong),
  };
}
