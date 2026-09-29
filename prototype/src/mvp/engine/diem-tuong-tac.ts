/**
 * ĐIỂM TƯƠNG TÁC TRÊN NỀN + GHIM BẢN ĐỒ (gói `ban-do-di-lai`, QĐ-077/089) — phần thuần, không React, không ảnh.
 *
 * - Trong một địa điểm, mỗi dữ kiện có dòng `- Ảnh:` là một vật/nhân vật đặt lên nền. Hai dữ kiện dùng chung một vật
 *   (bàn máy, máy in, sổ niêm phong) gộp thành MỘT điểm: bấm mở dữ kiện đang mở; nhiều hơn một → người chơi chọn nhanh.
 *   Luật kiểm (`luat-mvp.ts`) bảo đảm các dữ kiện chung vật có cùng tọa độ.
 * - Bản đồ: ghim chỉ hiện khi có ít nhất một địa điểm của ghim đang mở (theo `Mở từ`); một ghim có thể chứa nhiều
 *   địa điểm (tòa nhiều phòng). Địa điểm không thuộc ghim nào vẫn phải đến được (`noiNgoaiBanDo`).
 * Mọi nhãn người chơi thấy đi qua `nhanChoXem` (không dùng `moTa`, user chốt 29/09).
 */
import type { AnhDuKienMvp, KichBanMvp } from '../../content/mvp/types';
import type { DiaDiemHienMvp, DuKienHienMvp } from './may';
import { nhanChoXemDs } from './nhan-cho-xem';

export type TrangThaiDiem = 'mo' | 'da-xem' | 'khoa';

export interface DiemTuongTac {
  /** Khóa điểm = tên sprite (duy nhất trong một địa điểm). */
  khoa: string;
  anh: AnhDuKienMvp;
  /** Mọi dữ kiện đang hiện (theo mốc) dùng vật này, theo thứ tự trong dia-diem.md. */
  duKien: DuKienHienMvp[];
  /** Dữ kiện chọn được lúc này (chưa làm, đủ điều kiện). */
  moDuoc: DuKienHienMvp[];
  trangThai: TrangThaiDiem;
  /**
   * Nhãn trung tính của điểm: nhãn của dữ kiện đại diện (mở đầu tiên, không thì đầu tiên), đánh số chỉ khi hai ĐIỂM
   * khác nhau trong nơi trùng nhãn (hai dữ kiện chung một vật không làm điểm mang số).
   */
  nhan: string;
}

/** Nhãn trung tính cho từng dữ kiện đang hiện trong nơi (đánh số khi trùng) — dùng chung cho điểm và danh sách chữ. */
export function nhanTrongNoi(kb: KichBanMvp, noi: DiaDiemHienMvp): Map<string, string> {
  const nhan = nhanChoXemDs(
    kb,
    noi.duKien.map((k) => k.duKien),
  );
  return new Map(noi.duKien.map((k, i) => [k.duKien.id, nhan[i] ?? '']));
}

export function diemTrongNoi(kb: KichBanMvp, noi: DiaDiemHienMvp): DiemTuongTac[] {
  const theoVat = new Map<string, DuKienHienMvp[]>();
  for (const k of noi.duKien) {
    const a = k.duKien.anh;
    if (!a) continue;
    const ds = theoVat.get(a.sprite);
    if (ds) ds.push(k);
    else theoVat.set(a.sprite, [k]);
  }
  const ra: DiemTuongTac[] = [];
  const daiDien: DuKienHienMvp[] = [];
  for (const [khoa, duKien] of theoVat) {
    const dau = duKien[0];
    if (!dau?.duKien.anh) continue;
    const moDuoc = duKien.filter((k) => !k.daLam && !k.khoa);
    const trangThai: TrangThaiDiem = moDuoc.length > 0 ? 'mo' : duKien.some((k) => k.khoa) ? 'khoa' : 'da-xem';
    daiDien.push(moDuoc[0] ?? dau);
    ra.push({ khoa, anh: dau.duKien.anh, duKien, moDuoc, trangThai, nhan: '' });
  }
  const nhan = nhanChoXemDs(
    kb,
    daiDien.map((k) => k.duKien),
  );
  return ra.map((d, i) => ({ ...d, nhan: nhan[i] ?? '' }));
}

/** Số chỗ còn mới trong một nơi (chưa làm, đủ điều kiện) — con số trên ghim. */
export function soChoMoi(noi: DiaDiemHienMvp): number {
  return noi.duKien.filter((k) => !k.daLam && !k.khoa).length;
}

/** Một ghim trên bản đồ. (x, y) = ĐẦU NHỌN ghim, % bề rộng / bề cao ảnh bản đồ. */
export interface GhimBanDoMvp {
  id: string;
  ten: string;
  x: number;
  y: number;
  /** Mã địa điểm (dia-diem.md) trong tòa/khu này; một hoặc nhiều. */
  diaDiem: string[];
}

export interface GhimHien {
  ghim: GhimBanDoMvp;
  /** Các nơi của ghim đang mở, theo thứ tự khai trong ghim. */
  noi: DiaDiemHienMvp[];
  conMoi: number;
}

/** Ghim hiện lúc này: chỉ ghim có nơi đang mở (danh sách `diaDiem` từ `danhSachDiaDiem` đã lọc theo `Mở từ`). */
export function ghimHien(ghim: readonly GhimBanDoMvp[], diaDiem: readonly DiaDiemHienMvp[]): GhimHien[] {
  const ra: GhimHien[] = [];
  for (const g of ghim) {
    const noi = g.diaDiem.map((id) => diaDiem.find((d) => d.diaDiem.id === id)).filter((d): d is DiaDiemHienMvp => !!d);
    if (noi.length === 0) continue;
    ra.push({ ghim: g, noi, conMoi: noi.reduce((s, n) => s + soChoMoi(n), 0) });
  }
  return ra;
}

/** Nơi đang mở mà không ghim nào chứa — vẫn phải đến được (hiện dạng chữ dưới bản đồ). */
export function noiNgoaiBanDo(ghim: readonly GhimBanDoMvp[], diaDiem: readonly DiaDiemHienMvp[]): DiaDiemHienMvp[] {
  const co = new Set(ghim.flatMap((g) => g.diaDiem));
  return diaDiem.filter((d) => !co.has(d.diaDiem.id));
}
