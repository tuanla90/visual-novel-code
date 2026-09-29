/**
 * TỰ CHƠI + NHẢY TỚI (gói giao-dien-mvp) — thuần, không React.
 *
 * `choiTuDong` cho máy tự chơi (chỉ qua `khungNhin`/`xuLy`, như người chơi bấm) theo một `ChienThuat` tới khi gặp điểm
 * dừng. Dùng chung cho test máy (`may.test.ts`) và lối tắt "Nhảy tới" của người quan sát (`?facilitator=1`):
 * trạng thái sau khi nhảy chính là trạng thái của một người đã chơi tới đó bình thường (ngày/khung/hồ sơ/cờ/sổ tay),
 * nên Lưu/Nạp và phần chơi tiếp không có gì đặc biệt.
 */
import type { KichBanMvp } from '../../content/mvp/types';
import { khungNhin, TEN_MAC_DINH, taoTrangThai, xuLy, type HanhDongMvp, type KhungNhinMvp } from './may';
import type { TrangThaiMvp } from './trang-thai';

/** Chiến thuật chơi tự động: chọn gì ở danh sách địa điểm / rẽ nhánh / câu hỏi. */
export interface ChienThuat {
  /** Trả dữ kiện muốn xem (theo ngày), hay `null` để kết thúc ngày sớm. */
  chonDuKien: (s: TrangThaiMvp, kn: Extract<KhungNhinMvp, { kind: 'chon-dia-diem' }>) => { diaDiem: string; duKien: string } | null;
  reNhanh?: (id: string) => string;
  /** Mặc định chọn đáp án đúng. */
  traLoi?: (id: string, lan: number) => 'dung' | 'sai';
  /** Tên gõ ở câu hỏi tên (mặc định `TEN_MAC_DINH`). */
  ten?: string;
}

/** Hành động tự chơi cho một khung nhìn (không tính `end` / `error`). */
function hanhDongTuDong(kb: KichBanMvp, s: TrangThaiMvp, kn: Exclude<KhungNhinMvp, { kind: 'end' | 'error' }>, ct: ChienThuat): HanhDongMvp {
  switch (kn.kind) {
    case 'line':
    case 'feedback':
    case 'show-document':
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
    case 'line-pick': {
      const d = kn.nut.lines.find((x) => x.correct);
      if (!d) throw new Error('Chọn dòng không có dòng đúng');
      return { type: 'chon-dong', index: d.index };
    }
    case 'notebook-copy': {
      const c = kb.soTay[kn.trang]?.chonDoanCode?.find((x) => x.correct);
      if (!c) throw new Error(`Trang ${kn.trang} không có đoạn đúng`);
      return { type: 'chon', luaChon: c.id };
    }
    case 'branch':
      return { type: 'chon', luaChon: ct.reNhanh?.(kn.nut.id) ?? kn.luaChon[0]?.id ?? '' };
    case 'challenge':
    case 'fix-query':
      return { type: 'xong-thu-thach', thuThach: kn.thuThach.id };
    case 'chon-dia-diem': {
      const chon = ct.chonDuKien(s, kn);
      return chon ? { type: 'chon-du-kien', ...chon } : { type: 'ket-thuc-ngay' };
    }
    case 'create-character':
      return kn.nut.truong === 'ten' ? { type: 'dat-ten', ten: ct.ten ?? TEN_MAC_DINH } : { type: 'chon-nganh', nganh: kn.nut.luaChon[0] ?? '' };
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
    if (kn.kind === 'end') return s;
    const hd = hanhDongTuDong(kb, s, kn, ct);
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

/** Đường "tập trung": mỗi ngày làm dữ kiện chính (và dữ kiện nó cần) trước, rồi lấy đủ dữ kiện phụ cho kết thật. */
export const DUONG_DU_BANG_CHUNG: readonly string[] = [
  'dk-bac-thinh-the-lich',
  'dk-co-hanh-cap-quyen',
  'dk-loc-lop',
  'dk-quy-che-so-niem-phong',
  'dk-loi-chu-cuong',
  'dk-ten-h',
  'dk-nhat-ky-in',
  'dk-nop-hai-ma',
  'dk-loi-dat',
];

/** Chỉ dữ kiện chính (và thứ nó cần): thiếu `ev-nhat-ky-in`, `clue-loi-chu-cuong`, `clue-loi-dat`. */
export const DUONG_CHI_CHINH: readonly string[] = [
  'dk-bac-thinh-the-lich',
  'dk-co-hanh-cap-quyen',
  'dk-loc-lop',
  'dk-quy-che-so-niem-phong',
  'dk-ten-h',
  'dk-nop-hai-ma',
];

// ---------- Nhảy tới (người quan sát) ----------

export type MaDiemNhayMvp = 'loc-lop' | 'ten-h' | 'hop-sua-or';

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
 * Ba điểm nhảy tới phần SQL. Đường đi cố định `DUONG_DU_BANG_CHUNG`: mỗi ngày làm dữ kiện chính trước rồi các dữ kiện
 * phụ của kết thật (nhật ký in, lời chú Cường, lời Đạt), trả lời đúng mọi câu → tới buổi họp còn đủ vạch và kết thật
 * vẫn đạt được nếu chơi tiếp đúng.
 */
export const DIEM_NHAY_MVP: readonly DiemNhayMvp[] = [
  { id: 'loc-lop', nhan: 'Ngày 2 · Lọc lớp', moTa: 'Thử thách SQL phòng máy: lớp nào ở tòa B, ngành Báo chí.', toi: dangOThuThach('challenge', 'c-loc-lop') },
  { id: 'ten-h', nhan: 'Ngày 4 · Tên bắt đầu bằng H', moTa: 'Thử thách SQL: sinh viên lớp BC24A có tên bắt đầu bằng H.', toi: dangOThuThach('challenge', 'c-ten-h') },
  { id: 'hop-sua-or', nhan: 'Buổi họp · Sửa câu OR của Quân', moTa: 'Buổi họp rà soát, màn sửa truy vấn OR → AND.', toi: dangOThuThach('fix-query', 'c-sua-or-quan') },
];

/**
 * Trạng thái "như đã chơi tới" điểm nhảy: ván mới (tên `TEN_MAC_DINH`, ngành đầu danh sách), máy tự chơi theo
 * `DUONG_DU_BANG_CHUNG` tới màn đích. Ném lỗi nếu nội dung đổi làm đường đi không còn tới được đích.
 */
export function nhayToi(kb: KichBanMvp, id: MaDiemNhayMvp, batDauLuc: number = Date.now()): TrangThaiMvp {
  const diem = DIEM_NHAY_MVP.find((d) => d.id === id);
  if (!diem) throw new Error(`Không có điểm nhảy ${id}`);
  const ct: ChienThuat = { chonDuKien: chonTheoUuTien(DUONG_DU_BANG_CHUNG, false), ten: TEN_MAC_DINH };
  const s = choiTuDong(kb, taoTrangThai(kb, batDauLuc), ct, diem.toi);
  if (!diem.toi(s, khungNhin(kb, s))) throw new Error(`Tự chơi không tới được điểm nhảy ${id}`);
  return s;
}
