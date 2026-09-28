/**
 * Biến tên trong lời (đặc tả mục 10.4): `{{nv.<mã>}}`, `{{nv.<mã>.<dạng>}}`, `{{truong.<dạng>}}`.
 *
 * Bộ đọc thay biến TRƯỚC khi đọc dòng, nên mọi phép so khớp phía sau nhìn thấy chữ đã thay.
 * Bảng tên do nơi gọi truyền vào (bước 12a-1: dựng từ `CHARACTER_NAMES` của game; từ gói 12b:
 * từ `noi-dung/nhan-vat.yaml`). Tệp này không import gì từ `src/`.
 */

export interface BangTen {
  /** mã nhân vật → dạng tên → chữ. Dạng mặc định (khi viết `{{nv.<mã>}}`) là `ten`. */
  nv: Record<string, Record<string, string>>;
  /** dạng tên trường → chữ (`ten-day-du`, `ten-ngan`). */
  truong: Record<string, string>;
}

/** Dạng tên nhân vật dùng khi không ghi dạng. */
export const DANG_MAC_DINH = 'ten';

/**
 * Mã giữ chỗ, CHƯA dùng được ở bước này: `nguoi-choi` là tên người chơi tự đặt (QĐ-077), chỉ biết
 * lúc chạy game nên bộ đọc không thay được; sẽ mở khi runtime có màn tạo nhân vật.
 */
export const MA_GIU_CHO = ['nguoi-choi'] as const;

const BIEN_RE = /\{\{\s*([^{}]*?)\s*\}\}/g;

function coKhoa(o: Record<string, unknown>, k: string): boolean {
  return Object.prototype.hasOwnProperty.call(o, k);
}

/** Giá trị của một biến, hoặc thông báo lỗi (chuỗi bắt đầu bằng "!"). */
function giaTri(ten: string, bang: BangTen): { chu: string } | { loi: string } {
  const phan = ten.split('.');
  if (phan[0] === 'nv') {
    const [, ma = '', dang = DANG_MAC_DINH, ...du] = phan;
    if (phan.length < 2 || phan.length > 3 || du.length > 0 || ma === '') {
      return { loi: `biến "{{${ten}}}" sai dạng — viết {{nv.<mã>}} hoặc {{nv.<mã>.<dạng>}}` };
    }
    if ((MA_GIU_CHO as readonly string[]).includes(ma)) {
      return { loi: `biến "{{${ten}}}": mã "${ma}" đang giữ chỗ, chưa dùng được (QĐ-077)` };
    }
    if (!coKhoa(bang.nv, ma)) {
      return { loi: `biến "{{${ten}}}": không có nhân vật mã "${ma}" (có: ${Object.keys(bang.nv).join(', ')})` };
    }
    const cacDang = bang.nv[ma] ?? {};
    if (!coKhoa(cacDang, dang)) {
      return { loi: `biến "{{${ten}}}": nhân vật "${ma}" không có dạng tên "${dang}" (có: ${Object.keys(cacDang).join(', ')})` };
    }
    return { chu: cacDang[dang] ?? '' };
  }
  if (phan[0] === 'truong') {
    const dang = phan[1] ?? '';
    if (phan.length !== 2 || !coKhoa(bang.truong, dang)) {
      return { loi: `biến "{{${ten}}}": tên trường chỉ có dạng ${Object.keys(bang.truong).map((d) => `truong.${d}`).join(', ')}` };
    }
    return { chu: bang.truong[dang] ?? '' };
  }
  return { loi: `biến "{{${ten}}}" không tồn tại — bước này chỉ có {{nv.…}} và {{truong.…}}` };
}

/** Thay mọi biến trong một dòng. Biến sai thì giữ nguyên chỗ đó và trả lỗi. */
export function thayBien(dong: string, bang: BangTen): { chu: string; loi: string[] } {
  const loi: string[] = [];
  const chu = dong.replace(BIEN_RE, (nguyen, ten: string) => {
    const kq = giaTri(ten, bang);
    if ('loi' in kq) {
      loi.push(kq.loi);
      return nguyen;
    }
    return kq.chu;
  });
  if (loi.length === 0 && /\{\{|\}\}/.test(chu)) loi.push('dấu {{ hoặc }} lẻ — biến phải viết liền {{…}}');
  return { chu, loi };
}
