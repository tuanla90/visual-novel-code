/**
 * TỰ CHƠI + NHẢY TỚI (gói giao-dien-mvp) — thuần, không React.
 *
 * `choiTuDong` cho máy tự chơi (chỉ qua `khungNhin`/`xuLy`, như người chơi bấm) theo một `ChienThuat` tới khi gặp điểm
 * dừng. Dùng chung cho test máy (`may.test.ts`) và lối tắt "Nhảy tới" của người quan sát (`?facilitator=1`):
 * trạng thái sau khi nhảy chính là trạng thái của một người đã chơi tới đó bình thường (ngày/khung/hồ sơ/cờ/sổ tay),
 * nên Lưu/Nạp và phần chơi tiếp không có gì đặc biệt.
 */
import type { KichBanMvp } from '../../content/mvp/types';
import { coTrongHoSo, khungNhin, TEN_MAC_DINH, taoTrangThai, xuLy, type HanhDongMvp, type KhungNhinMvp } from './may';
import type { TrangThaiMvp } from './trang-thai';

/** Chiến thuật chơi tự động: chọn gì ở danh sách địa điểm / rẽ nhánh / câu hỏi. */
export interface ChienThuat {
  /** Ngày chọn địa điểm: trả dữ kiện muốn xem, hay `null` để kết thúc ngày sớm. Bỏ trống = luôn `null` (ngày theo truyện không dùng). */
  chonDuKien?: (s: TrangThaiMvp, kn: Extract<KhungNhinMvp, { kind: 'chon-dia-diem' }>) => { diaDiem: string; duKien: string } | null;
  reNhanh?: (id: string) => string;
  /** Mặc định chọn đáp án đúng. */
  traLoi?: (id: string, lan: number) => 'dung' | 'sai';
  /** Tên gõ ở câu hỏi tên (mặc định `TEN_MAC_DINH`). */
  ten?: string;
  /** Tới màn kết của một vụ mà còn vụ sau → chơi tiếp (mặc định dừng ở màn kết). */
  sangVuSau?: boolean;
  /** Ở màn kết có nhiệm vụ phụ đang mở → làm hết rồi mới sang vụ sau (mặc định bỏ qua nhiệm vụ phụ). */
  lamPhu?: boolean;
}

/** Hành động tự chơi cho một khung nhìn (không tính `end` / `error`). */
function hanhDongTuDong(s: TrangThaiMvp, kn: Exclude<KhungNhinMvp, { kind: 'end' | 'error' }>, ct: ChienThuat): HanhDongMvp {
  switch (kn.kind) {
    case 'line':
    case 'feedback':
    case 'show-document':
    case 'image':
    case 'effect':
    case 'projector':
    case 'notebook-lookup':
      return { type: 'tiep' };
    case 'trial-filter':
      return { type: 'chon-o', giaTri: kn.nut.chon.giaTri };
    case 'question': {
      const muon = ct.traLoi?.(kn.nut.id, kn.lanThu) ?? 'dung';
      const c = kn.nut.choices.find((x) => x.correct === (muon === 'dung'));
      if (!c) throw new Error(`Câu hỏi ${kn.nut.id} không có lựa chọn ${muon}`);
      return { type: 'chon', luaChon: c.id };
    }
    case 'doi-chat': {
      // Trình thẻ đủ căn cứ đang có trong hồ sơ; không có thì nhận "chưa đủ căn cứ".
      const b = kn.nut.bangChung.find((x) => x.muc === 'du' && !kn.daTrinh.includes(x.id) && coTrongHoSo(s, x.id));
      return b ? { type: 'trinh-the', the: b.id } : { type: 'chua-du' };
    }
    case 'line-pick': {
      const d = kn.nut.lines.find((x) => x.correct);
      if (!d) throw new Error('Chọn dòng không có dòng đúng');
      return { type: 'chon-dong', index: d.index };
    }
    case 'branch':
      return { type: 'chon', luaChon: ct.reNhanh?.(kn.nut.id) || kn.luaChon[0]?.id || '' };
    case 'challenge':
    case 'fix-query':
      return { type: 'xong-thu-thach', thuThach: kn.thuThach.id };
    case 'chon-dia-diem': {
      const chon = ct.chonDuKien?.(s, kn) ?? null;
      return chon ? { type: 'chon-du-kien', ...chon } : { type: 'ket-thuc-ngay' };
    }
    case 'create-character':
      return kn.nut.truong === 'ten' ? { type: 'dat-ten', ten: ct.ten ?? TEN_MAC_DINH } : { type: 'chon-nganh', nganh: kn.nut.luaChon[0] ?? '' };
    case 'explore': {
      // Bấm chỗ đầu tiên chưa xem (theo thứ tự trong kịch bản); chỗ có "sau:" hiện dần.
      const d = kn.diem.find((x) => !x.daXem);
      return d ? { type: 'xem-diem', chuoi: d.diem.chuoi } : { type: 'tiep' };
    }
  }
}

/** Chơi tự động tới khi gặp `dung(s, kn)` hoặc hết game (`end`); ném lỗi khi máy báo `error` hay từ chối hành động. */
export function choiTuDong(
  kb: KichBanMvp,
  s: TrangThaiMvp,
  ct: ChienThuat,
  dung: (s: TrangThaiMvp, kn: KhungNhinMvp) => boolean,
  toiDa = 5000,
): TrangThaiMvp {
  for (let i = 0; i < toiDa; i++) {
    const kn = khungNhin(kb, s);
    if (kn.kind === 'error') throw new Error(`Máy báo lỗi: ${kn.message} (ngày ${s.ngay}, chuỗi ${s.conTro?.chuoi ?? '-'})`);
    if (dung(s, kn)) return s;
    if (kn.kind === 'end') {
      if (kn.phuXong) {
        s = xuLy(kb, s, { type: 'xong-nhiem-vu-phu' });
        continue;
      }
      const phu = ct.lamPhu ? kn.phu[0] : undefined;
      if (phu) {
        s = xuLy(kb, s, { type: 'lam-nhiem-vu-phu', id: phu.id });
        continue;
      }
      if (!ct.sangVuSau || !kn.vuKe) return s;
      s = xuLy(kb, s, { type: 'sang-vu-sau' });
      continue;
    }
    const hd = hanhDongTuDong(s, kn, ct);
    const sau = xuLy(kb, s, hd);
    if (sau === s) throw new Error(`Hành động ${hd.type} bị từ chối ở khung nhìn ${kn.kind} (ngày ${s.ngay}, khung ${s.khung})`);
    s = sau;
  }
  throw new Error('Chơi quá số bước tối đa');
}

/** Dữ kiện chưa làm, mở được, chọn lọc theo danh sách mã ưu tiên (theo thứ tự), rồi tới bất kỳ dữ kiện nào nếu `vetCan`. */
export function chonTheoUuTien(uuTien: readonly string[], vetCan: boolean): ChienThuat['chonDuKien'] {
  return (_s, kn) => {
    const moDuoc = kn.diaDiem.flatMap((dd) => dd.duKien.filter((k) => !k.daLam && !k.khoa).map((k) => ({ diaDiem: dd.diaDiem.id, duKien: k.duKien.id })));
    for (const id of uuTien) {
      const t = moDuoc.find((m) => m.duKien === id);
      if (t) return t;
    }
    if (vetCan) {
      const t = moDuoc[0];
      if (t) return t;
    }
    return null;
  };
}

/**
 * Chương 1 (ngày theo truyện, ĐÃ CHỐT C 30/09/2026): lựa chọn ở mỗi [RẼ NHÁNH] để tới KẾT THẬT — ghé phòng máy (nhật ký
 * in), mời Hoài vào tự kể. Lời chú Cường từ 01/10/2026 là cảnh bắt buộc, không còn là rẽ nhánh. Rẽ nhánh không có trong
 * bảng thì chọn lựa chọn đầu.
 */
export const RE_NHANH_KET_THAT: Readonly<Record<string, string>> = {
  'r-phong-may': 'ghe',
  'r-moi-hoai': 'tu-ke',
};

export const reNhanhTheo =
  (bang: Readonly<Record<string, string>>): NonNullable<ChienThuat['reNhanh']> =>
  (id) =>
    bang[id] ?? '';

// ---------- Nhảy tới (người quan sát) ----------

export type MaDiemNhayMvp = 'lop' | 'ten-h' | 'nhat-ky-in' | 'hop-sua-or' | 'vu2-tin-don' | 'vu2-tin-goc' | 'vu3-thiet-bi' | 'vu3-toi-07' | 'vu4-noi' | 'vu5-vuot-muc' | 'vu2-buoi' | 'phu-micro' | 'phu-hoan-nhom';

export interface DiemNhayMvp {
  id: MaDiemNhayMvp;
  /** Nhãn nút trên bảng người quan sát. */
  nhan: string;
  /** Một dòng giải thích dưới nút. */
  moTa: string;
  /** Điểm dừng: đứng ở màn này là tới. */
  toi: (s: TrangThaiMvp, kn: KhungNhinMvp) => boolean;
}

const dangOThuThach =
  (kind: 'challenge' | 'fix-query', id: string) =>
  (_s: TrangThaiMvp, kn: KhungNhinMvp): boolean =>
    kn.kind === kind && kn.thuThach.id === id;

/**
 * Các điểm nhảy tới phần SQL (chương 1 và Vụ 2). Đường đi cố định: chọn theo `RE_NHANH_KET_THAT`, trả lời đúng mọi câu → hồ sơ
 * có đủ thứ của kết thật, chơi tiếp đúng vẫn tới kết thật.
 */
export const DIEM_NHAY_MVP: readonly DiemNhayMvp[] = [
  { id: 'lop', nhan: 'Ngày 2 · Lớp ở tòa B và học Báo chí', moTa: 'Lần tra đầu, laptop phòng CLB: hai điều kiện, VÀ / HOẶC.', toi: dangOThuThach('challenge', 'c-lop') },
  { id: 'ten-h', nhan: 'Ngày 3 · Tên bắt đầu bằng H', moTa: 'Laptop phòng CLB: phiếu hai lớp + [H]; "bằng" ra 0 dòng → "bắt đầu bằng".', toi: dangOThuThach('challenge', 'c-ten-h') },
  { id: 'nhat-ky-in', nhan: 'Ngày 4 · Nhật ký in', moTa: 'Phòng máy (đã chọn ghé): mã + tên tệp ra 0 dòng → bỏ điều kiện mã.', toi: dangOThuThach('challenge', 'c-in') },
  { id: 'hop-sua-or', nhan: 'Buổi họp · Sửa câu HOẶC của Quân', moTa: 'Buổi họp rà soát, màn sửa truy vấn HOẶC → VÀ.', toi: dangOThuThach('fix-query', 'c-sua-or-quan') },
  { id: 'vu2-tin-don', nhan: 'Vụ 2 · Tin đồn', moTa: 'Sau kết thật Vụ 1, laptop phòng CLB: lọc các tin mang nội dung tin đồn, ghim thành phiếu.', toi: dangOThuThach('challenge', 'c-tin-don') },
  { id: 'vu2-tin-goc', nhan: 'Vụ 2 · Tin gốc (phiếu làm nguồn)', moTa: 'Sau khi gặp Nam: lấy phiếu tin đồn làm nguồn, lọc tiếp ra tin gốc.', toi: dangOThuThach('challenge', 'c-tin-goc') },
  { id: 'vu3-thiet-bi', nhan: 'Vụ 3 · Nhóm bài đăng theo thiết bị', moTa: 'Xưởng Robotics: phiếu chín bài làm nguồn, màn tổng hợp nhóm theo thiết bị và đếm.', toi: dangOThuThach('challenge', 'c-bai-thiet-bi') },
  { id: 'vu3-toi-07', nhan: 'Vụ 3 · Thư viện tối 07/10', moTa: 'Thư viện: lọc đúng ngày trên bản ghi quẹt thẻ, ra Hà Vy và Nam — thẻ đủ căn cứ cho đối chất.', toi: dangOThuThach('challenge', 'c-toi-07') },
  { id: 'vu4-noi', nhan: 'Vụ 4 · Nối đơn với phiên đăng nhập', moTa: 'Phòng CLB: khối "nối với … theo …" — nối sổ đặt hàng với bảng phiên theo mã phiên, lọc đơn của Nam.', toi: dangOThuThach('challenge', 'c-don-nam-may') },
  { id: 'vu5-vuot-muc', nhan: 'Vụ 5 · Lọc nhóm vượt hạn mức', moTa: 'Phòng CLB, màn tổng hợp: gom theo người duyệt, tính tổng, chỉ giữ nhóm vượt một triệu.', toi: dangOThuThach('challenge', 'c-chi-vuot-muc') },
  { id: 'vu2-buoi', nhan: 'Việc phụ · Bốn buổi đã ký', moTa: 'Duy nhờ sau Vụ 2, laptop phòng CLB: gọt mã phòng (dấu cách, hoa/thường), xếp theo ngày.', toi: dangOThuThach('challenge', 'v2-loc-buoi') },
  { id: 'phu-micro', nhan: 'Việc phụ · Chiếc micro (nối bảng)', moTa: 'Duy nhờ sau Vụ 4: nối phiếu luân chuyển với sổ tài sản theo mã tài sản; cột vi_tri trùng tên nhưng khác nghĩa.', toi: dangOThuThach('challenge', 'c-mic-phieu') },
  { id: 'phu-hoan-nhom', nhan: 'Việc phụ · Hoàn tiền (lọc nhóm theo số dòng)', moTa: 'Minh Anh nhờ sau Vụ 5, màn tổng hợp: gom dòng hoàn theo mã phiếu, tính tổng, chỉ giữ nhóm có hơn một dòng.', toi: dangOThuThach('challenge', 'c-hoan-nhom') },
];

/** Một đầu chương nhảy tới được: mở đầu, từng ngày, buổi họp, từng vụ sau, từng nhiệm vụ phụ. */
export interface DauChuongMvp {
  /** `mo-dau` · `ngay-<số>` · `hop` · `vu-<mã>` · `phu-<mã>`. */
  id: string;
  nhan: string;
  toi: (s: TrangThaiMvp) => boolean;
}

/** Danh sách đầu chương, đọc từ lịch của kịch bản (thêm ngày / vụ / việc phụ là tự có nút). */
export function dauChuongMvp(kb: KichBanMvp): DauChuongMvp[] {
  const ds: DauChuongMvp[] = [{ id: 'mo-dau', nhan: 'Mở đầu', toi: (s) => s.giaiDoan === 'mo-dau' }];
  for (const n of kb.lich.ngay) ds.push({ id: `ngay-${n.so}`, nhan: `Ngày ${n.so} · ${n.ten}`, toi: (s) => s.giaiDoan === 'ngay' && s.ngay === n.so });
  if (kb.lich.ngayHop) ds.push({ id: 'hop', nhan: 'Buổi họp rà soát', toi: (s) => s.giaiDoan === 'hop' });
  (kb.lich.vuSau ?? []).forEach((v, i) => ds.push({ id: `vu-${v.id}`, nhan: `Vụ ${i + 2} · ${v.ten}`, toi: (s) => s.giaiDoan === 'vu-sau' && s.vu === v.id }));
  for (const p of kb.lich.nhiemVuPhu ?? []) ds.push({ id: `phu-${p.id}`, nhan: `Việc phụ · ${p.ten}`, toi: (s) => s.giaiDoan === 'phu' && s.phu?.id === p.id });
  return ds;
}

/** Trạng thái "như đã chơi tới" đầu một chương: ván mới, máy tự chơi theo đường kết thật, dừng ở bước đầu của chương. */
export function nhayToiDauChuong(kb: KichBanMvp, id: string, batDauLuc: number = Date.now()): TrangThaiMvp {
  const chuong = dauChuongMvp(kb).find((c) => c.id === id);
  if (!chuong) throw new Error(`Không có đầu chương ${id}`);
  const ct: ChienThuat = { reNhanh: reNhanhTheo(RE_NHANH_KET_THAT), ten: TEN_MAC_DINH, sangVuSau: true, lamPhu: true };
  const s = choiTuDong(kb, taoTrangThai(kb, batDauLuc), ct, (x) => chuong.toi(x));
  if (!chuong.toi(s)) throw new Error(`Tự chơi không tới được đầu chương ${id}`);
  return s;
}

/**
 * Trạng thái "như đã chơi tới" điểm nhảy: ván mới (tên `TEN_MAC_DINH`, ngành đầu danh sách), máy tự chơi theo
 * `RE_NHANH_KET_THAT` tới màn đích. Ném lỗi nếu nội dung đổi làm đường đi không còn tới được đích.
 */
export function nhayToi(kb: KichBanMvp, id: MaDiemNhayMvp, batDauLuc: number = Date.now()): TrangThaiMvp {
  const diem = DIEM_NHAY_MVP.find((d) => d.id === id);
  if (!diem) throw new Error(`Không có điểm nhảy ${id}`);
  const ct: ChienThuat = { reNhanh: reNhanhTheo(RE_NHANH_KET_THAT), ten: TEN_MAC_DINH, sangVuSau: true, lamPhu: true };
  const s = choiTuDong(kb, taoTrangThai(kb, batDauLuc), ct, diem.toi);
  if (!diem.toi(s, khungNhin(kb, s))) throw new Error(`Tự chơi không tới được điểm nhảy ${id}`);
  return s;
}
