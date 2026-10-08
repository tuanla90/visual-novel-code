/**
 * Gói B17 (docs/mua-1/brief/b17-hai-cau-hoi-dau-van.md) trên màn tra thật của bộ mùa 1, sql.js chạy thật:
 *   - "Ghép khối, chữ SQL": cùng giao diện, nhãn đổi thành từ khóa SQL; lời gợi ý bậc 2 đổi chữ lúc hiện; dòng SQL giữ nguyên.
 *   - "Tự viết": ô gõ thay ba cột ghép; chấm bằng tập kết quả (câu tương đương câu chuẩn / câu hẹp B15 vẫn đúng); lỗi cú pháp dịch gọn
 *     dưới ô gõ, không hoạt cảnh; bấm giấy nhớ chèn giá trị; bấm ô lấy giấy nhớ và ghim như cũ; bậc 2 là lời bậc 1 kèm câu mẫu che giá trị.
 *   - Màn sửa câu ở buổi họp không đổi theo mức; "Như thật": bạn đi cùng không tự lên tiếng ở màn tra.
 *   - Không truyền mức (bộ MVP): nhãn tiếng Việt như cũ.
 */
import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { KICH_BAN_MUA_1 } from '../../engine/testing/mua1-truoc-b19/kich-ban.gen';
import type { KichBanMvp, TheThuThachMvp } from '../../../content/mvp/types';
import { giaTriTuHoSo, type GiaTriHoSo } from '../../engine/giay-nho';
import { cheGiaTriSql } from '../../engine/nhan-man-tra';
import type { MucNhapVaiMvp, MucSqlMvp } from '../../engine/trang-thai';
import { nhayToi } from '../../engine/tu-choi';
import { KICH_BAN as kbMvp } from '../../store/kho-mvp';
import { ManTraV7, type CanhTra } from './ManTraV7';

const kb = KICH_BAN_MUA_1 as unknown as KichBanMvp;
const theCua = (bo: KichBanMvp, id: string): TheThuThachMvp => {
  const t = bo.thuThach[id];
  if (!t) throw new Error(`thiếu thẻ ${id}`);
  return t;
};
type U = ReturnType<typeof userEvent.setup>;

function ve(id: string, o: { bo?: KichBanMvp; canh?: CanhTra; giayNho?: GiaTriHoSo[]; mode?: 'challenge' | 'fix-query'; mucSql?: MucSqlMvp; mucNhapVai?: MucNhapVaiMvp } = {}) {
  const bo = o.bo ?? kb;
  const onXong = vi.fn();
  render(
    <ManTraV7
      kb={bo}
      duLieu={bo.duLieu}
      the={theCua(bo, id)}
      mode={o.mode ?? 'challenge'}
      canh={o.canh ?? 'phong-clb'}
      giayNho={o.giayNho ?? []}
      dienTen={(t) => t}
      onXong={onXong}
      {...(o.mucSql ? { mucSql: o.mucSql } : {})}
      {...(o.mucNhapVai ? { mucNhapVai: o.mucNhapVai } : {})}
    />,
  );
  return { onXong, u: userEvent.setup() };
}
async function coDk(u: U, i: number): Promise<void> {
  while (screen.queryAllByRole('button', { name: /^Cột của điều kiện \d+: / }).length < i) await u.click(screen.getByRole('button', { name: 'Thêm điều kiện' }));
}
async function chonCot(u: U, i: number, cot: string): Promise<void> {
  await coDk(u, i);
  for (let k = 0; k < 8; k++) {
    const nut = screen.getByRole('button', { name: new RegExp(`^Cột của điều kiện ${i}: `) });
    if (nut.textContent === cot) return;
    await u.click(nut);
  }
  throw new Error(`không chọn được cột ${cot}`);
}
async function datGiay(u: U, giaTri: string, i: number): Promise<void> {
  await coDk(u, i);
  await u.click(screen.getByRole('button', { name: new RegExp(`^${giaTri} \\(giấy nhớ`) }));
  await u.click(screen.getByRole('button', { name: new RegExp(`^Ô giá trị điều kiện ${i}`) }));
}
const dau = (): string | null => document.querySelector('.v7-dau')?.textContent ?? null;
const bong = (): HTMLElement | null => document.querySelector<HTMLElement>('.v7-ban__bong');
const nhan = (): string[] => [...document.querySelectorAll('.v7-cot__nhan')].map((e) => e.textContent ?? '');
const oGo = (): HTMLTextAreaElement => screen.getByRole('textbox', { name: 'Câu SQL gõ tay' });
const goiYCua = (id: string, khi: 'chung' | string) => {
  const g = (theCua(kb, id).goiY ?? []).find((x) => (khi === 'chung' ? !x.khi : JSON.stringify(x.khi) === khi));
  if (!g) throw new Error(`thẻ ${id} thiếu gợi ý ${khi}`);
  return g;
};
const giayTenH = (): GiaTriHoSo[] => giaTriTuHoSo(kb, nhayToi(kb, 'ten-h', 1).hoSo);
const giayLop = (): GiaTriHoSo[] => giaTriTuHoSo(kb, nhayToi(kb, 'lop', 1).hoSo);

beforeEach(() => {
  vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue(null);
});

describe('"Ghép khối, chữ SQL" (c-lop, c-ten-h)', () => {
  it('nhãn các ô là từ khóa SQL; dòng SQL dưới màn vẫn có; đổi phép thành LIKE; bộ MVP không truyền mức thì chữ Việt như cũ', async () => {
    const { u } = ve('c-lop', { giayNho: giayLop(), mucSql: 'ghep-sql' });
    expect(nhan()).toEqual(expect.arrayContaining(['FROM', 'WHERE']));
    expect(nhan()).not.toEqual(expect.arrayContaining(['1. NGUỒN BẢNG', '2. ĐIỀU KIỆN LỌC']));
    expect(screen.getByRole('button', { name: /^Nối điều kiện 2: /, hidden: true })).toHaveTextContent('AND');
    expect(screen.getByRole('button', { name: /^Phép so sánh của điều kiện 1/ })).toHaveTextContent('=');
    await u.click(screen.getByRole('button', { name: /^Phép so sánh của điều kiện 1/ }));
    expect(screen.getByRole('button', { name: /^Phép so sánh của điều kiện 1/ })).toHaveTextContent("LIKE 'x%'");
    await u.click(screen.getByRole('button', { name: /^Nối điều kiện 2: / }));
    expect(screen.getByRole('button', { name: /^Nối điều kiện 2: / })).toHaveTextContent('OR');
    expect([...document.querySelectorAll('.v7-o--dau')].map((e) => e.textContent?.trim())).toContain('WHERE');
    expect(screen.getByRole('button', { name: /RUN$/ })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /CHẠY$/ })).toBeNull();
    expect(document.querySelector('.v7-sql')).not.toBeNull();
    // Chọn cột: "LẤY CỘT" thành "SELECT", "3. CỘT & SẮP XẾP" thành "SELECT · ORDER BY".
    document.body.innerHTML = '';
    ve('c-ten-h', { giayNho: giayTenH(), mucSql: 'ghep-sql' });
    expect(nhan()).toContain('SELECT · ORDER BY');
    expect([...document.querySelectorAll('.v7-o--dau')].map((e) => e.textContent?.trim())).toContain('SELECT');
    document.body.innerHTML = '';
    ve('c-lop', { bo: kbMvp, giayNho: [] });
    expect(nhan()).toEqual(expect.arrayContaining(['1. NGUỒN BẢNG', '2. ĐIỀU KIỆN LỌC']));
    expect(screen.getByRole('button', { name: /CHẠY$/ })).toBeInTheDocument();
  });

  it('lời gợi ý bậc 2 đổi chữ trên màn theo nhãn mới (HOẶC → OR, VÀ → AND, CHẠY → RUN), lời bậc 1 giữ nguyên', async () => {
    const { u } = ve('c-lop', { giayNho: giayLop(), mucSql: 'ghep-sql' });
    await chonCot(u, 1, 'toa_nha');
    await datGiay(u, 'B', 1);
    await chonCot(u, 2, 'nganh');
    await datGiay(u, 'Báo chí', 2);
    await u.click(screen.getByRole('button', { name: /^Nối điều kiện 2: / }));
    const chay = screen.getByRole('button', { name: /RUN$/ });
    await u.click(chay);
    await waitFor(() => expect(dau()).toBe('33 DÒNG'));
    const g = goiYCua('c-lop', JSON.stringify({ kind: 'so-dong', n: 33 }));
    await u.click(chay);
    await waitFor(() => expect(bong()).toHaveTextContent(g.bac1.text));
    await u.click(chay);
    await waitFor(() => expect(bong()).toHaveTextContent('Bấm vào chữ OR giữa hai dòng lọc cho nó đổi thành AND, rồi bấm RUN.'));
    expect(bong()).not.toHaveTextContent('HOẶC');
  });
});

describe('"Tự viết" (c-ten-h)', () => {
  it('ô gõ thay ba cột ghép, có "Khảo sát bảng" và tên cột; câu tương đương (hẹp mà đủ, B15) chấm đúng; chép hai ô mã rồi ghim', async () => {
    const { onXong, u } = ve('c-ten-h', { giayNho: giayTenH(), mucSql: 'tu-viet' });
    expect(document.querySelector('.v7-cau--3cot')).toBeNull();
    expect(document.querySelector('.v7-sql')).toBeNull();
    expect(screen.getByRole('button', { name: 'Xem trước dữ liệu mẫu' })).toHaveTextContent('Khảo sát bảng');
    expect(within(screen.getByLabelText('Các cột của bảng')).getAllByText(/^[a-z_]+$/).map((e) => e.textContent)).toEqual(expect.arrayContaining(['ma_sv', 'ten', 'ma_lop']));
    const chay = screen.getByRole('button', { name: /CHẠY$/ });
    expect(chay).toBeDisabled();
    await u.click(oGo());
    await u.keyboard("SELECT ma_sv, ten, ma_lop FROM sinh_vien WHERE ten LIKE 'H%' AND ma_lop = ");
    // Bấm tờ giấy nhớ: giá trị chèn vào chỗ con trỏ, trong nháy đơn.
    await u.click(screen.getByRole('button', { name: /^BC24A \(giấy nhớ/ }));
    expect(oGo()).toHaveValue("SELECT ma_sv, ten, ma_lop FROM sinh_vien WHERE ten LIKE 'H%' AND ma_lop = 'BC24A'");
    expect(chay).toBeEnabled();
    await u.click(chay);
    const ghim = await screen.findByRole('button', { name: 'Ghim lên bảng' });
    expect(dau()).toBe('2 DÒNG');
    expect(ghim).toBeDisabled();
    await u.click(screen.getByRole('button', { name: 'Ô ma_sv: SV240228' }));
    await u.click(screen.getByRole('button', { name: 'Ô ma_sv: SV240317' }));
    expect(ghim).toBeEnabled();
    await u.click(ghim);
    // Giá trị của tờ "hai lớp" còn trong câu: sợi chỉ nối từ thẻ ấy.
    expect(onXong).toHaveBeenCalledWith(['ev-hai-lop']);
  });

  it('câu đúng cả lớp (y câu chuẩn, khác thứ tự cột) cũng đúng; lỗi cú pháp / sai tên bảng dịch gọn dưới ô gõ, không có con dấu', async () => {
    const { u } = ve('c-ten-h', { giayNho: giayTenH(), mucSql: 'tu-viet' });
    await u.click(oGo());
    await u.keyboard('SELEC * FROM sinh_vien');
    await u.click(screen.getByRole('button', { name: /CHẠY$/ }));
    await waitFor(() => expect(screen.getByRole('alert')).toHaveTextContent('Lỗi cú pháp gần chữ "SELEC".'));
    expect(dau()).toBeNull();
    expect(document.querySelector('.v7-loi')).toBeNull();
    await u.clear(oGo());
    await u.keyboard('SELECT * FROM sinhvien');
    await u.click(screen.getByRole('button', { name: /CHẠY$/ }));
    await waitFor(() => expect(screen.getByRole('alert')).toHaveTextContent(/^Không có bảng tên "sinhvien"/));
    await u.clear(oGo());
    await u.keyboard("SELECT ma_lop, ten, ho_dem, ma_sv FROM sinh_vien WHERE ma_lop = 'BC24A'");
    await u.click(screen.getByRole('button', { name: /CHẠY$/ }));
    await screen.findByRole('button', { name: 'Ghim lên bảng' });
    expect(screen.queryByRole('alert')).toBeNull();
    expect(dau()).toBe(`${theCua(kb, 'c-ten-h').soDongKyVong} DÒNG`);
  });

  it('bạn đi cùng: bậc 1 như cũ; bậc 2 là lời bậc 1 kèm câu SQL chuẩn che giá trị (không nói thao tác ghép)', async () => {
    const { u } = ve('c-ten-h', { giayNho: giayTenH(), mucSql: 'tu-viet' });
    const g = goiYCua('c-ten-h', 'chung');
    await u.click(screen.getAllByRole('button', { name: /^Hỏi ý / })[0]!);
    expect(bong()).toHaveTextContent(g.bac1.text);
    expect(bong()).toHaveAttribute('data-bac', '1');
    await u.click(screen.getByRole('button', { name: 'Gợi ý rõ hơn' }));
    expect(bong()).toHaveAttribute('data-bac', '2');
    expect(bong()).toHaveTextContent(g.bac1.text);
    expect(bong()).toHaveTextContent(cheGiaTriSql(theCua(kb, 'c-ten-h').sqlChuan));
    expect(bong()).not.toHaveTextContent(g.bac2.text);
    expect(bong()).toHaveTextContent("ma_lop = '…'");
  });
});

describe('màn cốt truyện và mức nhập vai', () => {
  it('màn sửa câu ở buổi họp (fix-query) giữ nhãn tiếng Việt dù mức là "chữ SQL" hay "tự viết"', () => {
    for (const mucSql of ['ghep-sql', 'tu-viet'] as const) {
      const { unmount } = render(<ManTraV7 kb={kb} duLieu={kb.duLieu} the={theCua(kb, 'c-sua-or-quan')} mode="fix-query" canh="man-chieu" giayNho={[]} dienTen={(t) => t} onXong={vi.fn()} mucSql={mucSql} />);
      expect(nhan()).toContain('2. ĐIỀU KIỆN LỌC');
      expect(screen.queryByRole('textbox', { name: 'Câu SQL gõ tay' })).toBeNull();
      expect(screen.getByRole('button', { name: /CHẠY$/ })).toBeInTheDocument();
      unmount();
    }
  });

  it('"Như thật": chạy trượt hai lần liền bạn không tự nói; bấm ảnh mặt thì gợi ý bậc 1 rồi bậc 2', async () => {
    const { u } = ve('c-lop', { giayNho: giayLop(), mucNhapVai: 'that' });
    await chonCot(u, 1, 'toa_nha');
    await datGiay(u, 'B', 1);
    await chonCot(u, 2, 'nganh');
    await datGiay(u, 'Báo chí', 2);
    await u.click(screen.getByRole('button', { name: /^Nối điều kiện 2: VÀ/ }));
    const chay = screen.getByRole('button', { name: /CHẠY$/ });
    await u.click(chay);
    await waitFor(() => expect(dau()).toBe('33 DÒNG'));
    await u.click(chay);
    await waitFor(() => expect(dau()).toBe('33 DÒNG'));
    await u.click(chay);
    await waitFor(() => expect(dau()).toBe('33 DÒNG'));
    expect(bong()).toBeNull();
    const g = goiYCua('c-lop', JSON.stringify({ kind: 'so-dong', n: 33 }));
    await u.click(screen.getByRole('button', { name: /^Hỏi ý / }));
    expect(bong()).toHaveTextContent(g.bac1.text);
    await u.click(screen.getByRole('button', { name: 'Gợi ý rõ hơn' }));
    expect(bong()).toHaveTextContent(g.bac2.text);
  });
});
