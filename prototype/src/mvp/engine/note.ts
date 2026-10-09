/**
 * NOTE CÓ LOẠI, NGUỒN, KEYWORD (gói B21, docs/mua-1/loi-note-bang-chan-ly.md §2) — phần thuần, không React.
 *
 * Mỗi thẻ hồ sơ là một note. Thẻ khai (ho-so/): `- Loại: manh mối|sự thật`, `- Nguồn: tài liệu|quan sát|suy luận|lời kể|tra`,
 * `- Keyword: <loại>:<chữ> · …` (loại: người, thời gian, địa điểm, hành động). Thiếu thì máy suy mặc định:
 *   - `clue-…` = manh mối / lời kể;  `doc-…` = sự thật / tài liệu;
 *   - `ev-…` do một màn tra lưu (vật chứng của thẻ thử thách, phiếu tra, ghi chú trích từ phiếu) = sự thật / tra;
 *   - `ev-…` khác (nhặt ở hiện trường) = manh mối / quan sát;  giấy nhớ hỏi ra từ nhân chứng (`hoi-dap:…`) = manh mối / lời kể.
 * `[ĐỔI LOẠI <thẻ> → sự thật]` biến một manh mối thành sự thật (`s.doiLoai`). Màu giấy theo NGUỒN (tra xanh lơ, tài liệu trắng
 * ngà, còn lại vàng); màu chữ keyword theo LOẠI keyword. Tên trường `Nguồn` cũ là chữ tự do ("Lời cô Lan, phòng Công tác sinh
 * viên"): chỉ khi cả giá trị đúng là một trong năm nguồn thì mới là nguồn của note, còn lại vẫn là chữ hiện dưới thẻ.
 */
import type { KichBanMvp, TheHoSoMvp } from '../../content/mvp/types';
import type { TrangThaiMvp } from './trang-thai';

export type LoaiNote = 'manh-moi' | 'su-that';
export type NguonNote = 'tai-lieu' | 'quan-sat' | 'suy-luan' | 'loi-ke' | 'tra';
export type LoaiKeyword = 'nguoi' | 'thoi-gian' | 'dia-diem' | 'hanh-dong';

export interface KeywordNote {
  loai: LoaiKeyword;
  chu: string;
}

export interface ThongTinNote {
  loai: LoaiNote;
  nguon: NguonNote;
  keyword: KeywordNote[];
}

/** Chữ viết trong ho-so/ → mã. Dùng cả cho máy kiểm. */
export const CHU_LOAI_NOTE: Readonly<Record<string, LoaiNote>> = { 'manh mối': 'manh-moi', 'sự thật': 'su-that' };
export const CHU_NGUON_NOTE: Readonly<Record<string, NguonNote>> = { 'tài liệu': 'tai-lieu', 'quan sát': 'quan-sat', 'suy luận': 'suy-luan', 'lời kể': 'loi-ke', tra: 'tra' };
export const CHU_LOAI_KEYWORD: Readonly<Record<string, LoaiKeyword>> = { người: 'nguoi', 'thời gian': 'thoi-gian', 'địa điểm': 'dia-diem', 'hành động': 'hanh-dong' };

/** Tên người chơi thấy của từng nguồn / loại (chú thích màu, hộp xem kỹ). */
export const TEN_NGUON_NOTE: Readonly<Record<NguonNote, string>> = { 'tai-lieu': 'Tài liệu', 'quan-sat': 'Quan sát', 'suy-luan': 'Suy luận', 'loi-ke': 'Lời kể', tra: 'Tra dữ liệu' };
export const TEN_LOAI_KEYWORD: Readonly<Record<LoaiKeyword, string>> = { nguoi: 'Người', 'thoi-gian': 'Thời gian', 'dia-diem': 'Địa điểm', 'hanh-dong': 'Hành động' };

const chuan = (t: string): string => t.normalize('NFC').trim().toLowerCase();

/** Nguồn của note nếu trường `Nguồn` đúng là một trong năm nguồn; không thì `null` (đó là chữ nguồn tự do). */
export function nguonKhaiCua(fields: Readonly<Record<string, string>>): NguonNote | null {
  const v = fields['Nguồn'];
  return v === undefined ? null : (CHU_NGUON_NOTE[chuan(v)] ?? null);
}

/** Đọc `- Keyword: người:Hoài · thời gian:6:44`; phần sai quy ước bị bỏ (máy kiểm đã báo ở tệp nội dung). */
export function docKeyword(chu: string | undefined): KeywordNote[] {
  const ra: KeywordNote[] = [];
  for (const phan of (chu ?? '').split(/\s+·\s+/)) {
    const m = /^(người|thời gian|địa điểm|hành động):\s*(.+)$/u.exec(phan.trim().normalize('NFC'));
    const loai = m ? CHU_LOAI_KEYWORD[m[1] ?? ''] : undefined;
    if (m && loai && (m[2] ?? '').trim() !== '') ra.push({ loai, chu: (m[2] ?? '').trim() });
  }
  return ra;
}

/** Mã này là vật chứng / phiếu / ghi chú do một màn tra tạo (không phải thẻ nhặt ở hiện trường). */
function doTra(kb: KichBanMvp, id: string): boolean {
  return Object.values(kb.thuThach).some((t) => t.vatChung?.id === id);
}

/** Thông tin gốc của note (chưa tính `[ĐỔI LOẠI]`). Mã lạ (phiếu tra người chơi tự tạo, ghi chú trích) = sự thật / tra. */
export function thongTinNote(kb: KichBanMvp, id: string): ThongTinNote {
  const hs: TheHoSoMvp | undefined = kb.hoSo[id];
  const f = hs?.fields ?? {};
  const tienTo = id.split('-')[0];
  const nguonMacDinh: NguonNote = tienTo === 'doc' ? 'tai-lieu' : tienTo === 'ev' ? (doTra(kb, id) ? 'tra' : 'quan-sat') : tienTo === 'clue' || id.startsWith('hoi-dap:') ? 'loi-ke' : 'tra';
  const nguon = nguonKhaiCua(f) ?? nguonMacDinh;
  const loaiMacDinh: LoaiNote = nguon === 'tra' || tienTo === 'doc' ? 'su-that' : 'manh-moi';
  const loai = f['Loại'] !== undefined ? (CHU_LOAI_NOTE[chuan(f['Loại'])] ?? loaiMacDinh) : loaiMacDinh;
  return { loai, nguon, keyword: docKeyword(f['Keyword']) };
}

/** Loại của note trong ván: manh mối có thể đã thành sự thật nhờ `[ĐỔI LOẠI]`. */
export function loaiNote(kb: KichBanMvp, s: Pick<TrangThaiMvp, 'doiLoai'> | null, id: string): LoaiNote {
  return s?.doiLoai?.includes(id) ? 'su-that' : thongTinNote(kb, id).loai;
}

const boCoLoaiBoNho = new WeakMap<KichBanMvp, boolean>();

/**
 * Bộ nội dung có dùng luật note có loại không: có thẻ khai `- Loại:` hay có `[ĐỔI LOẠI]`. Bộ cũ (không khai gì) giữ như trước:
 * chồng "Sự thật chờ đặt" của bảng chân lý nhận mọi thẻ như bộ mùa 1 hiện tại; bộ mới chỉ nhận sự thật.
 */
export function boCoLoaiNote(kb: KichBanMvp): boolean {
  const da = boCoLoaiBoNho.get(kb);
  if (da !== undefined) return da;
  const co =
    Object.values(kb.hoSo).some((t) => t.fields['Loại'] !== undefined) ||
    kb.chuoi.some((c) => c.nodes.some((n) => n.type === 'doi-loai'));
  boCoLoaiBoNho.set(kb, co);
  return co;
}

/** Tách chữ của một note thành các đoạn, đoạn trùng keyword (không phân biệt hoa thường) mang loại keyword. Keyword dài tìm trước. */
export function tachKeyword(chu: string, keyword: readonly KeywordNote[]): { chu: string; loai: LoaiKeyword | null }[] {
  const ds = [...keyword].filter((k) => k.chu !== '').sort((a, b) => b.chu.length - a.chu.length);
  if (ds.length === 0 || chu === '') return [{ chu, loai: null }];
  const thoat = (t: string): string => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const re = new RegExp(ds.map((k) => thoat(k.chu)).join('|'), 'giu');
  const ra: { chu: string; loai: LoaiKeyword | null }[] = [];
  let cuoi = 0;
  for (const m of chu.matchAll(re)) {
    const i = m.index ?? 0;
    if (i > cuoi) ra.push({ chu: chu.slice(cuoi, i), loai: null });
    const khop = m[0];
    ra.push({ chu: khop, loai: ds.find((k) => k.chu.normalize('NFC').toLowerCase() === khop.normalize('NFC').toLowerCase())?.loai ?? null });
    cuoi = i + khop.length;
  }
  if (cuoi < chu.length) ra.push({ chu: chu.slice(cuoi), loai: null });
  return ra;
}
