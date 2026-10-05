/**
 * GIẤY NHỚ QUANH MÀN HÌNH LAPTOP (màn tra v7, màn tổng hợp, màn lọc thử). Gói B14, góp ý của user khi chơi thử:
 * - "Các ảnh giấy nhớ bị dán sát quá": các tờ trong một cột cách nhau đủ để không tờ nào đè lên chữ của tờ khác (`viTriGiay`).
 * - Giấy DÁN TRÊN RÌA MÁY (user 05/10, màn lọc thử: "cần phải di chuyển sang bên trái để sát với rìa của laptop hơn"): mép giấy
 *   chỉ đè lên viền màn hình `CHONG_VIEN` đơn vị, không lấn vào vùng chữ; cùng một phép tính cho màn tra, màn tổng hợp và màn lọc
 *   thử (`traiGiay`, `phaiGiay`). Giấy thò ra ngoài khung 1600 nên `VungV7` co khung lại chừng `leGiay` để cửa sổ hẹp không cắt giấy.
 * - "Các thẻ chữ bị hiển thị tối giản quá": tờ có dòng "Chữ trên giấy" thì in một câu nói giá trị ấy là gì, giá trị kéo vào ô lọc
 *   được làm nổi trong câu (`ChuGiay`); tờ chưa có câu thì in giá trị và tên thẻ như trước.
 *
 * Tệp này giữ phép tính chỗ dán và nhãn; thành phần vẽ chữ trên giấy ở `GiayNhoV7.tsx`.
 */
import type { CSSProperties } from 'react';
import type { GiaTriHoSo } from '../../engine/giay-nho';
import { anhTheoTen } from '../anh-mvp';

type Kinh = { x: number; y: number; w: number; h: number };

/** Bề ngang một tờ giấy và phần mép giấy đè lên viền màn hình (đơn vị của khung cảnh 1600×900). */
export const RONG_GIAY = 136;
export const CHONG_VIEN = 6;

/** Mép trái của tờ giấy dán bên trái / bên phải màn hình. */
export const traiGiay = (kinh: Kinh): number => kinh.x + CHONG_VIEN - RONG_GIAY;
export const phaiGiay = (kinh: Kinh): number => kinh.x + kinh.w - CHONG_VIEN;
/** Chiều cao lớn nhất của một tờ (câu 60 ký tự) dùng để chia khoảng cách. */
const CAO_GIAY = 140;
/** Cột trái chừa góc trái trên cho nút "Về bảng điều tra"; cột phải lùi thêm, chừa góc phải trên cho bạn đi cùng. */
const DAU_TRAI = 96;
const DAU_PHAI = 120;
const DAY = 880;

/** Phần giấy thò ra ngoài khung cảnh 1600 mỗi bên: `VungV7` co khung lại chừng ấy để giấy không bị cắt. */
export function leGiay(kinh: Kinh): number {
  return Math.max(0, 6 - traiGiay(kinh), phaiGiay(kinh) + RONG_GIAY + 6 - 1600);
}

/** Chỗ dán của tờ thứ `i` trong `tong` tờ: nửa đầu bên trái màn hình, nửa sau bên phải, từ trên xuống. */
export function viTriGiay(i: number, tong: number, kinh: Kinh): CSSProperties {
  const nua = Math.ceil(tong / 2);
  const phai = i >= nua;
  const k = phai ? i - nua : i;
  const soTo = phai ? tong - nua : nua;
  const dau = phai ? DAU_PHAI : DAU_TRAI;
  const buoc = soTo <= 1 ? 0 : Math.min(CAO_GIAY + 30, (DAY - dau - CAO_GIAY) / (soTo - 1));
  return {
    left: phai ? phaiGiay(kinh) : traiGiay(kinh),
    top: Math.round(dau + k * buoc),
    ['--r' as string]: `${((i * 37) % 7) - 3}deg`,
    ['--img' as string]: `url("${anhTheoTen(`giay-nho-${String((i % 10) + 1).padStart(2, '0')}`) ?? ''}")`,
  };
}

/** Câu "Chữ trên giấy" bỏ dấu `**` (đọc cho trình đọc màn hình, nhãn nút). */
export const chuTran = (chu: string): string => chu.replace(/\*\*/g, '');

/** Lớp CSS của tờ giấy theo nội dung. */
export function lopGiay(g: GiaTriHoSo): string {
  if (g.chu) return ' v7-giay--cau';
  return `${g.nhieu ? ' is-nhieu' : ''}${(g.nhieu ?? [g.giaTri]).some((v) => v.length > 6) ? ' is-dai' : ''}`;
}

/** Nhãn đọc của tờ giấy: giữ dạng "<giá trị> (giấy nhớ <tên thẻ>)", thêm câu trên giấy nếu có. */
export function nhanGiay(g: GiaTriHoSo, dienTen: (t: string) => string): string {
  return `${g.giaTri} (giấy nhớ ${dienTen(g.nguon)}${g.chu ? `: ${dienTen(chuTran(g.chu))}` : ''})`;
}
