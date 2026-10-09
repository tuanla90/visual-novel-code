/**
 * BẢNG CHÂN LÝ (trước là "dòng thời gian"; gói B19 + B20, docs/mua-1/loi-note-bang-chan-ly.md §4) — phần thuần, không React.
 *
 * Ma trận: cột = người (`- Cột:`; có thể có cột "?" chưa biết), dòng = mốc giờ, ô = hành động (giấy note). Người chơi kéo note
 * "sự thật" từ chồng bên phải vào ô, tự do: kéo ra, đổi chỗ, thay note đều được và máy KHÔNG báo đúng sai từng lần thả. Chấm một
 * lần khi bấm "Xong" (mọi ô phải đặt đã có note): note sai ô bật về chồng, người nhắc nói câu "Kéo sai" của ô sai đầu tiên.
 * Ô `khoaSan` đã điền sẵn. Cột mang ô `khongDien` ("trống bắt buộc": chưa có căn cứ ai) có tiêu đề gạch chéo: kéo note vào tiêu
 * đề ấy bật về ngay kèm câu `keoVaoTrong` (đây là bài học, không phải chấm).
 * Kiểu `tap-duot` (dtg-banh) giữ luật tức thời cũ: thả đúng thì ô xong, thả sai thì bật về kèm câu nhắc.
 *
 * Thẻ kéo được: dòng tập dượt dùng thẻ tạm (lời kể, không vào hồ sơ); dòng chính dùng thẻ trong hồ sơ của ván (thẻ đang trên
 * bảng, cộng thẻ ô nào đó nhận). Không có thẻ nhiễu: cái khó chỉ là đặt đúng chỗ.
 */
import type { DongThoiGianMvp, KichBanMvp, LoiMvp, ODongThoiGianMvp } from '../../content/mvp/types';
import { boCoLoaiNote, loaiNote, nguonKhaiCua, thongTinNote, type KeywordNote, type NguonNote } from './note';
import type { TrangThaiMvp } from './trang-thai';

/** Một thẻ ở cột thẻ của màn dòng thời gian. */
export interface TheDongThoiGianMvp {
  id: string;
  /** Chữ lớn trên thẻ. */
  nhan: string;
  /** Dòng nhỏ (nguồn của thẻ hồ sơ); thẻ tạm không có. */
  phu: string | null;
  /** Thẻ tạm (lời kể của dòng tập dượt). */
  tam: boolean;
  /** Gói B21: nguồn của note (màu giấy) và keyword (tô màu chữ). */
  nguon?: NguonNote;
  keyword?: KeywordNote[];
}

/** Câu nhắc khi nội dung chưa viết câu nào cho ô / dòng thời gian (máy kiểm đã nhắc thiếu). */
export const CAU_NHAC_MAC_DINH = 'Thẻ này chưa khớp với ô ấy.';

/** Thẻ ô đang mang: ô khóa sẵn mang thẻ nhận đầu tiên (hoặc chuỗi rỗng = điền sẵn không thẻ); ô khác lấy thẻ đã thả. */
export function theTrongO(o: ODongThoiGianMvp, daDat: Readonly<Record<string, string>>): string | null {
  if (o.khoaSan) return o.nhan[0] ?? '';
  return daDat[o.id] ?? null;
}

/** Dòng thời gian đã dựng xong: mọi ô cần kéo đã có thẻ. */
export function dongThoiGianXong(d: DongThoiGianMvp, daDat: Readonly<Record<string, string>>): boolean {
  return d.o.every((o) => theTrongO(o, daDat) !== null);
}

/** Bản dựng sẵn (mỗi ô mang thẻ nhận đầu tiên) — để xem lại khi ván chưa từng dựng (ô lưu cũ, nhảy tới). */
export function banDungSan(d: DongThoiGianMvp): Record<string, string> {
  return Object.fromEntries(d.o.filter((o) => !o.khoaSan && o.nhan[0]).map((o) => [o.id, o.nhan[0] as string]));
}

/** Thả thẻ `the` vào ô `o` (luật tức thời của dòng tập dượt): đúng khi ô chưa có thẻ, không khóa sẵn và nhận thẻ này. */
export function thaDung(o: ODongThoiGianMvp, the: string, daDat: Readonly<Record<string, string>>): boolean {
  return !o.khoaSan && !daDat[o.id] && o.nhan.includes(the);
}

/**
 * Đặt tự do (dòng chính): thẻ vào ô `oId`; thẻ đang ở ô khác thì dọn ô ấy (đổi chỗ), thẻ cũ của ô đích bật về chồng. Trả `null`
 * khi không đổi gì (ô không có / khóa sẵn / thẻ đã nằm đúng ô ấy).
 */
export function datTuDo(d: DongThoiGianMvp, daDat: Readonly<Record<string, string>>, oId: string, the: string): Record<string, string> | null {
  const o = d.o.find((x) => x.id === oId);
  if (!o || o.khoaSan || daDat[oId] === the) return null;
  const moi: Record<string, string> = {};
  for (const [k, v] of Object.entries(daDat)) if (v !== the && k !== oId) moi[k] = v;
  moi[oId] = the;
  return moi;
}

/** Nhấc thẻ khỏi ô (dòng chính): trả `null` khi ô không có thẻ để nhấc. */
export function goThe(d: DongThoiGianMvp, daDat: Readonly<Record<string, string>>, oId: string): Record<string, string> | null {
  const o = d.o.find((x) => x.id === oId);
  if (!o || o.khoaSan || !daDat[oId]) return null;
  return Object.fromEntries(Object.entries(daDat).filter(([k]) => k !== oId));
}

/** Các ô người chơi đặt sai thẻ (theo thứ tự khai); ô khóa sẵn và ô chưa đặt không tính. */
export function oDatSai(d: DongThoiGianMvp, daDat: Readonly<Record<string, string>>): ODongThoiGianMvp[] {
  return d.o.filter((o) => !o.khoaSan && daDat[o.id] !== undefined && !o.nhan.includes(daDat[o.id] as string));
}

/** Chấm xong: mọi ô đã có thẻ và không ô nào sai. */
export function dongThoiGianDung(d: DongThoiGianMvp, daDat: Readonly<Record<string, string>>): boolean {
  return dongThoiGianXong(d, daDat) && oDatSai(d, daDat).length === 0;
}

/** Bỏ các thẻ đặt sai khỏi ô (bật về chồng). */
export function boTheSai(d: DongThoiGianMvp, daDat: Readonly<Record<string, string>>): Record<string, string> {
  const sai = new Set(oDatSai(d, daDat).map((o) => o.id));
  return Object.fromEntries(Object.entries(daDat).filter(([k]) => !sai.has(k)));
}

/** Một cột của ma trận. `trong`: có ô "không điền được" (tiêu đề gạch chéo, "là ai? để trống"). */
export interface CotMaTran {
  id: string;
  nhan: string;
  trong: boolean;
}
/** Một dòng của ma trận: mốc giờ và ô theo cột (thiếu = ô trống mờ, không nhận thả). */
export interface HangMaTran {
  khoa: string;
  gio: string | null;
  o: Record<string, ODongThoiGianMvp>;
}
export interface MaTranDtg {
  /** Có tiêu đề cột (bảng khai `- Cột:`). Không khai thì một cột không tiêu đề, mỗi ô một dòng. */
  coTieuDe: boolean;
  cot: CotMaTran[];
  hang: HangMaTran[];
}

/** Dựng ma trận (cột = người khai ở `- Cột:`, dòng = các giờ khác nhau theo thứ tự xuất hiện). */
export function maTran(d: DongThoiGianMvp): MaTranDtg {
  if (d.cot.length === 0) {
    return {
      coTieuDe: false,
      cot: [{ id: '', nhan: '', trong: false }],
      hang: d.o.map((o) => ({ khoa: o.id, gio: o.gio, o: { '': o } })),
    };
  }
  const cot = d.cot.map((c) => ({ id: c.id, nhan: c.nhan, trong: d.o.some((o) => o.cot === c.id && !!o.khongDien) }));
  const hang: HangMaTran[] = [];
  for (const o of d.o) {
    const khoa = o.gio ?? '';
    let h = hang.find((x) => x.khoa === khoa);
    if (!h) {
      h = { khoa, gio: o.gio, o: {} };
      hang.push(h);
    }
    if (o.cot) h.o[o.cot] = o;
  }
  return { coTieuDe: true, cot, hang };
}

/** Ô "không điền được" của một cột (để lấy câu `Kéo vào chỗ trống`). */
export function oTrongCuaCot(d: DongThoiGianMvp, cotId: string): ODongThoiGianMvp | null {
  return d.o.find((o) => o.cot === cotId && !!o.khongDien) ?? null;
}

/**
 * Câu nhắc khi thẻ bật về. `phan`: `o` = thả vào ô (sai thẻ), `trong` = thả vào phần không điền được ("?"). Thứ tự: câu riêng
 * của ô → câu chung của dòng thời gian → câu mặc định của máy (người nói: người nhắc của dòng thời gian).
 */
export function loiKeoSai(d: DongThoiGianMvp, o: ODongThoiGianMvp | null, phan: 'o' | 'trong' = 'o'): LoiMvp[] {
  const rieng = phan === 'trong' ? (o?.keoVaoTrong ?? o?.keoSai) : o?.keoSai;
  if (rieng && rieng.length > 0) return rieng;
  if (d.keoSai && d.keoSai.length > 0) return d.keoSai;
  return [{ speaker: d.nguoiNhac ?? 'narrator', text: CAU_NHAC_MAC_DINH }];
}

/**
 * Chữ hiện trên một thẻ của dòng thời gian (thẻ tạm: chữ khai; thẻ hồ sơ: `Trên bảng` nếu có, không thì tiêu đề;
 * phiếu tra: tiêu đề vật chứng). `Trên bảng` / `Nguồn trên bảng` là câu ngắn riêng cho giấy note (user 09/10: tiêu đề hồ sơ
 * dài và tối nghĩa khi đặt lên bảng).
 */
export function tenTheDongThoiGian(kb: KichBanMvp, d: DongThoiGianMvp, id: string): TheDongThoiGianMvp {
  const tam = d.theTam.find((t) => t.id === id);
  if (tam) return { id, nhan: tam.chu, phu: null, tam: true, nguon: 'loi-ke' };
  const hs = kb.hoSo[id];
  if (hs) {
    const tieuDe = hs.fields['Trên bảng'] ?? hs.fields['Tiêu đề'];
    const nhan = (tieuDe ?? hs.heading).replace(/^\[|\]$/g, '');
    const tt = thongTinNote(kb, id);
    // `Nguồn` là một trong năm nguồn của note thì không phải chữ hiện dưới giấy.
    const phu = hs.fields['Nguồn trên bảng'] ?? (nguonKhaiCua(hs.fields) ? null : (hs.fields['Nguồn'] ?? null));
    return { id, nhan, phu, tam: false, nguon: tt.nguon, keyword: tt.keyword };
  }
  const tt = Object.values(kb.thuThach).find((t) => t.vatChung?.id === id);
  return { id, nhan: tt?.vatChung?.title ?? id, phu: tt ? 'Phiếu tra cứu' : null, tam: false, nguon: 'tra' };
}

/**
 * Các thẻ ở cột thẻ: dòng tập dượt = thẻ tạm (theo thứ tự khai); dòng chính = thẻ hồ sơ của ván — bằng chứng, giấy nhớ, tài liệu
 * — đang trên bảng (chưa gỡ), cộng thẻ một ô nào đó nhận (kể cả đã gỡ khỏi bảng).
 */
export function theCuaDongThoiGian(kb: KichBanMvp, s: TrangThaiMvp, d: DongThoiGianMvp): TheDongThoiGianMvp[] {
  if (d.kieu === 'tap-duot') return d.theTam.map((t) => tenTheDongThoiGian(kb, d, t.id));
  const nhan = new Set(d.o.flatMap((o) => o.nhan));
  const go = new Set(s.bang?.boGhim ?? []);
  // Gói B21: bộ dùng note có loại thì chồng "Sự thật chờ đặt" chỉ nhận sự thật (manh mối thành sự thật nhờ `[ĐỔI LOẠI]`);
  // bộ cũ giữ như trước (mọi thẻ).
  const chiSuThat = boCoLoaiNote(kb);
  const ds = [...s.hoSo.bangChung, ...s.hoSo.manhMoi, ...s.hoSo.taiLieu].filter((id) => (nhan.has(id) || !go.has(id)) && (!chiSuThat || loaiNote(kb, s, id) === 'su-that'));
  // Thẻ tạm một ô của dòng chính nhận (hiếm) cũng có mặt.
  const tam = d.theTam.filter((t) => nhan.has(t.id)).map((t) => t.id);
  return [...new Set([...ds, ...tam])].map((id) => tenTheDongThoiGian(kb, d, id));
}

/** Tách chữ việc của ô thành các đoạn, "[?]" thành phần không điền được (`null`). */
export function tachViec(viec: string): (string | null)[] {
  return viec.split('[?]').flatMap((doan, i) => (i === 0 ? [doan] : [null, doan])).filter((x) => x !== '');
}
