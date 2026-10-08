/**
 * DÒNG THỜI GIAN (gói B19, docs/mua-1/brief/b19-vu-1-ban-6.md mục 5.1) — phần thuần, không React.
 *
 * Người chơi kéo thẻ vào ô của một dòng thời gian thiếu chỗ. Mỗi ô khai các thẻ nhận (`nhan`); thả một thẻ trong danh sách là ô
 * xong, thả thẻ khác thì thẻ bật về kèm một câu nhắc nhẹ (không phạt, không tính vạch — máy đứng yên). Ô `khoaSan` đã điền sẵn.
 * Phần "không điền được" (`khongDien`, chữ "[?]" trong việc) hiện "?" mãi: thả gì vào đó cũng bật lại, kèm câu `keoVaoTrong`.
 * Xong khi mọi ô (trừ phần không điền được) đã điền.
 *
 * Thẻ kéo được: dòng tập dượt dùng thẻ tạm (lời kể, không vào hồ sơ); dòng chính dùng thẻ trong hồ sơ của ván (thẻ đang trên
 * bảng, cộng thẻ ô nào đó nhận). Không có thẻ nhiễu: cái khó chỉ là đặt đúng chỗ.
 */
import type { DongThoiGianMvp, KichBanMvp, LoiMvp, ODongThoiGianMvp } from '../../content/mvp/types';
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

/** Thả thẻ `the` vào ô `o`: đúng khi ô chưa có thẻ, không khóa sẵn và nhận thẻ này. */
export function thaDung(o: ODongThoiGianMvp, the: string, daDat: Readonly<Record<string, string>>): boolean {
  return !o.khoaSan && !daDat[o.id] && o.nhan.includes(the);
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

/** Chữ hiện trên một thẻ của dòng thời gian (thẻ tạm: chữ khai; thẻ hồ sơ: tiêu đề; phiếu tra: tiêu đề vật chứng). */
export function tenTheDongThoiGian(kb: KichBanMvp, d: DongThoiGianMvp, id: string): TheDongThoiGianMvp {
  const tam = d.theTam.find((t) => t.id === id);
  if (tam) return { id, nhan: tam.chu, phu: null, tam: true };
  const hs = kb.hoSo[id];
  if (hs) {
    const tieuDe = hs.fields['Tiêu đề'];
    const nhan = (tieuDe ?? hs.heading).replace(/^\[|\]$/g, '');
    return { id, nhan, phu: hs.fields['Nguồn'] ?? null, tam: false };
  }
  const tt = Object.values(kb.thuThach).find((t) => t.vatChung?.id === id);
  return { id, nhan: tt?.vatChung?.title ?? id, phu: tt ? 'Phiếu tra cứu' : null, tam: false };
}

/**
 * Các thẻ ở cột thẻ: dòng tập dượt = thẻ tạm (theo thứ tự khai); dòng chính = thẻ hồ sơ của ván — bằng chứng, giấy nhớ, tài liệu
 * — đang trên bảng (chưa gỡ), cộng thẻ một ô nào đó nhận (kể cả đã gỡ khỏi bảng).
 */
export function theCuaDongThoiGian(kb: KichBanMvp, s: TrangThaiMvp, d: DongThoiGianMvp): TheDongThoiGianMvp[] {
  if (d.kieu === 'tap-duot') return d.theTam.map((t) => tenTheDongThoiGian(kb, d, t.id));
  const nhan = new Set(d.o.flatMap((o) => o.nhan));
  const go = new Set(s.bang?.boGhim ?? []);
  const ds = [...s.hoSo.bangChung, ...s.hoSo.manhMoi, ...s.hoSo.taiLieu].filter((id) => nhan.has(id) || !go.has(id));
  // Thẻ tạm một ô của dòng chính nhận (hiếm) cũng có mặt.
  const tam = d.theTam.filter((t) => nhan.has(t.id)).map((t) => t.id);
  return [...new Set([...ds, ...tam])].map((id) => tenTheDongThoiGian(kb, d, id));
}

/** Tách chữ việc của ô thành các đoạn, "[?]" thành phần không điền được (`null`). */
export function tachViec(viec: string): (string | null)[] {
  return viec.split('[?]').flatMap((doan, i) => (i === 0 ? [doan] : [null, doan])).filter((x) => x !== '');
}
