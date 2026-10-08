/**
 * Gói B14 (docs/mua-1/brief/b14-man-tra.md) trên bộ mùa 1 THẬT, sql.js chạy thật:
 * - A: không kẹt ở màn tra. Lời phản hồi ở lại khi sửa câu; bạn đi cùng đứng ở màn tra, gợi ý hai bậc khi bấm, khi chạy trượt
 *   hai lần liền, và khi chạy sai mà không ai nói gì (đúng ca user gặp ở c-ten-h: hai dòng Hiếu, Hoài mà game im lặng).
 * - D: tờ giấy nhớ in cả câu, giá trị làm nổi; phiếu hai lớp thành hai tờ để tra từng lớp.
 * - E: lần chạy mới làm bảng hẹp lại thì đi tiếp từ bảng đang có; bảng vài nghìn dòng vẫn soi được cho hoạt cảnh.
 * - c-ten-h chơi được tới cùng: tra một lớp, lấy thêm cột mã, bấm đúng hai ô mã rồi ghim.
 * Bộ MVP (không có gợi ý, không có lời viết sẵn) thì màn tra không có bạn đi cùng.
 */
import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { KICH_BAN_MUA_1 } from '../../engine/testing/mua1-truoc-b19/kich-ban.gen';
import type { KichBanMvp, TheThuThachMvp } from '../../../content/mvp/types';
import { giaTriTuHoSo, type GiaTriHoSo } from '../../engine/giay-nho';
import { chaySql } from '../../engine/sql-mvp';
import { nhayToi } from '../../engine/tu-choi';
import { KICH_BAN as kbMvp } from '../../store/kho-mvp';
import { ManTraV7, type CanhTra } from './ManTraV7';
import { PhongTraMvp } from './PhongTraMvp';

const kb = KICH_BAN_MUA_1 as unknown as KichBanMvp;
const theCua = (id: string): TheThuThachMvp => {
  const t = kb.thuThach[id];
  if (!t) throw new Error(`thiếu thẻ ${id}`);
  return t;
};

function ve(id: string, o: { canh?: CanhTra; giayNho?: GiaTriHoSo[]; mode?: 'challenge' | 'fix-query' } = {}) {
  const onXong = vi.fn();
  render(<ManTraV7 kb={kb} duLieu={kb.duLieu} the={theCua(id)} mode={o.mode ?? 'challenge'} canh={o.canh ?? 'phong-clb'} giayNho={o.giayNho ?? []} dienTen={(t) => t} onXong={onXong} />);
  return { onXong, u: userEvent.setup() };
}

type U = ReturnType<typeof userEvent.setup>;
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
const nutChay = (): HTMLElement => screen.getByRole('button', { name: /CHẠY$/ });
const dau = (): string | null => document.querySelector('.v7-dau')?.textContent ?? null;
const thoai = (): HTMLElement | null => document.querySelector<HTMLElement>('.v7-thoai');
const bong = (): HTMLElement | null => document.querySelector<HTMLElement>('.v7-ban__bong');
const goiYCua = (id: string, nhan: 'chung' | string) => {
  const g = (theCua(id).goiY ?? []).find((x) => (nhan === 'chung' ? !x.khi : JSON.stringify(x.khi) === nhan));
  if (!g) throw new Error(`thẻ ${id} thiếu gợi ý ${nhan}`);
  return g;
};

beforeEach(() => {
  vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue(null);
});

describe('gói B14 · c-ten-h (bộ mùa 1): giấy nhớ, gợi ý, chơi được tới cùng', () => {
  const giay = (): GiaTriHoSo[] => giaTriTuHoSo(kb, nhayToi(kb, 'ten-h', 1).hoSo);

  it('D: tờ giấy in cả câu, giá trị làm nổi; phiếu hai lớp là hai tờ riêng; tờ nào cũng dán trên rìa máy, không chồng nhau', () => {
    ve('c-ten-h', { giayNho: giay() });
    const h = screen.getByRole('button', { name: /^H \(giấy nhớ/ });
    expect(h).toHaveTextContent('Chữ ký trên thư bắt đầu bằng chữ H');
    expect(h.querySelector('.v7-giay__gia')).toHaveTextContent(/^H$/);
    expect(screen.getByRole('button', { name: /^BC24A \(giấy nhớ/ }).querySelector('.v7-giay__gia')).toHaveTextContent('BC24A');
    expect(screen.getByRole('button', { name: /^BC23A \(giấy nhớ/ })).toHaveTextContent('Lớp ở tòa B, học Báo chí: BC23A');
    expect(screen.queryByRole('button', { name: /^BC24A, BC23A \(giấy nhớ/ })).toBeNull();
    // Hai cột giấy: mép trái cột trái -40 (đè viền máy 6 đơn vị), cột phải 1504; các tờ cùng cột cách nhau ít nhất 150.
    const to = [...document.querySelectorAll<HTMLElement>('.v7-giay')];
    expect(new Set(to.map((e) => e.style.left))).toEqual(new Set(['-40px', '1504px']));
    for (const ben of ['-40px', '1504px']) {
      const top = to.filter((e) => e.style.left === ben).map((e) => parseFloat(e.style.top));
      for (let i = 1; i < top.length; i++) expect((top[i] ?? 0) - (top[i - 1] ?? 0)).toBeGreaterThanOrEqual(150);
    }
  });

  it('A: bạn đi cùng đứng ở màn tra; bấm vào → bậc 1, "Gợi ý rõ hơn" → bậc 2, "Đóng" thì tắt', async () => {
    const { u } = ve('c-ten-h', { giayNho: giay() });
    const ban = screen.getByRole('complementary', { name: 'Bạn đi cùng' });
    expect(within(ban).getByRole('button', { name: 'Hỏi ý Hà Vy' })).toBeInTheDocument();
    expect(within(ban).getByRole('button', { name: 'Hỏi ý Duy' })).toBeInTheDocument();
    expect(bong()).toBeNull();
    const chung = goiYCua('c-ten-h', 'chung');
    await u.click(within(ban).getByRole('button', { name: 'Hỏi ý Hà Vy' }));
    expect(bong()).toHaveTextContent(chung.bac1.text);
    expect(bong()).toHaveAttribute('data-bac', '1');
    await u.click(within(ban).getByRole('button', { name: 'Gợi ý rõ hơn' }));
    expect(bong()).toHaveTextContent(chung.bac2.text);
    expect(within(ban).queryByRole('button', { name: 'Gợi ý rõ hơn' })).toBeNull();
    await u.click(within(ban).getByRole('button', { name: 'Đóng' }));
    expect(bong()).toBeNull();
  });

  it('ca user gặp: tên bắt đầu bằng H trong lớp → 2 dòng, không ai có lời → bạn đi cùng tự lên tiếng ngay (không còn im lặng)', async () => {
    const { u } = ve('c-ten-h', { giayNho: giay() });
    await chonCot(u, 1, 'ten');
    await datGiay(u, 'H', 1);
    await u.click(screen.getByRole('button', { name: /^Phép so sánh của điều kiện 1/ }));
    await chonCot(u, 2, 'ma_lop');
    await datGiay(u, 'BC24A', 2);
    await u.click(nutChay());
    await waitFor(() => expect(dau()).toBe('2 DÒNG'));
    expect(screen.queryByRole('button', { name: /Ghim lên bảng/ })).toBeNull();
    expect(thoai()).toBeNull();
    const g = goiYCua('c-ten-h', JSON.stringify({ kind: 'so-dong', n: 2 }));
    expect(bong()).toHaveTextContent(g.bac1.text);
    await u.click(screen.getByRole('button', { name: 'Gợi ý rõ hơn' }));
    expect(bong()).toHaveTextContent(g.bac2.text);
  });

  it('tra lớp BC24A thiếu cột mã → lời Duy Ở LẠI khi sửa câu, bảng cũ mờ; lấy thêm ma_sv → đúng; bấm nhầm ô thì gạch, bấm đủ hai ô mã mới ghim', async () => {
    const { onXong, u } = ve('c-ten-h', { giayNho: giay() });
    await chonCot(u, 1, 'ma_lop');
    await datGiay(u, 'BC24A', 1);
    await u.click(nutChay());
    await waitFor(() => expect(dau()).toBe('32 DÒNG'));
    expect(thoai()).toHaveAccessibleName(/^Duy: .*chưa chỉ đúng người/);
    // Chạy trượt một lần và đã có lời: bạn đi cùng chưa tự lên tiếng.
    expect(bong()).toBeNull();
    // Hỏi bạn lúc này: gợi ý "khi thiếu cột" của Duy.
    await u.click(screen.getByRole('button', { name: 'Hỏi ý Duy' }));
    const thieu = goiYCua('c-ten-h', JSON.stringify({ kind: 'thieu-cot' }));
    expect(bong()).toHaveTextContent(thieu.bac1.text);
    expect(bong()).toHaveAttribute('data-nhan-vat', 'duy');

    // Sửa câu: con dấu mất, nhưng lời Duy và bóng gợi ý còn; bảng 32 dòng ở lại, ghi rõ là của lần chạy trước.
    await u.click(screen.getByRole('button', { name: /^Cột ma_sv: chưa lấy/ }));
    expect(dau()).toBeNull();
    expect(thoai()).toHaveAccessibleName(/^Duy: /);
    expect(bong()).toHaveTextContent(thieu.bac1.text);
    expect(document.querySelector('.v7-kq__cu')).toHaveTextContent('Kết quả của lần chạy trước');
    expect(document.querySelector('.v7-kq')).toHaveClass('v7-kq--cu');

    await u.click(nutChay());
    const ghim = await screen.findByRole('button', { name: 'Ghim lên bảng' });
    // Chạy lại thì lời cũ và bóng gợi ý cũ nhường chỗ: giờ là lời "Khi đúng" của Hà Vy.
    expect(thoai()).toHaveAccessibleName(/^Hà Vy: .*Hiếu với Hoài/);
    expect(bong()).toBeNull();
    expect(document.querySelector('.v7-kq__cu')).toBeNull();
    expect(ghim).toBeDisabled();
    expect(screen.getByText(/của những dòng cần giữ để chép ra giấy nhớ \(còn 2\)/)).toBeInTheDocument();
    // Ô của người khác: rung, gạch mờ, không tính.
    const oMai = screen.getByRole('button', { name: 'Ô ma_sv: SV240105' });
    await u.click(oMai);
    expect(oMai).toHaveClass('is-sai');
    expect(ghim).toBeDisabled();
    await u.click(screen.getByRole('button', { name: 'Ô ma_sv: SV240228' }));
    expect(screen.getByText(/\(còn 1\)/)).toBeInTheDocument();
    await u.click(screen.getByRole('button', { name: 'Ô ma_sv: SV240317' }));
    expect(ghim).toBeEnabled();
    await u.click(ghim);
    expect(onXong).toHaveBeenCalledWith(['ev-hai-lop']);
  });

  it('đã đúng mà bấm nhầm ô hai lần → Hà Vy gợi ý "khi đúng"', async () => {
    const { u } = ve('c-ten-h', { giayNho: giay() });
    await chonCot(u, 1, 'ma_lop');
    await datGiay(u, 'BC24A', 1);
    await u.click(screen.getByRole('button', { name: /^Cột ma_sv: chưa lấy/ }));
    await u.click(nutChay());
    await screen.findByRole('button', { name: 'Ghim lên bảng' });
    expect(bong()).toBeNull();
    const sai = within(screen.getByLabelText('Kết quả')).getAllByRole('button', { name: /^Ô ma_sv: / }).filter((b) => !/SV240228|SV240317/.test(b.textContent ?? ''));
    await u.click(sai[0] as HTMLElement);
    await u.click(sai[1] as HTMLElement);
    expect(bong()).toHaveTextContent(goiYCua('c-ten-h', JSON.stringify({ kind: 'dung' })).bac1.text);
  });

  it('lớp BC23A → 30 dòng, lời Hà Vy; gợi ý theo đúng kết quả ấy', async () => {
    const { u } = ve('c-ten-h', { giayNho: giay() });
    await chonCot(u, 1, 'ma_lop');
    await datGiay(u, 'BC23A', 1);
    await u.click(nutChay());
    await waitFor(() => expect(dau()).toBe('30 DÒNG'));
    expect(thoai()).toHaveAccessibleName(/^Hà Vy: Ba mươi người lớp BC23A/);
    await u.click(screen.getByRole('button', { name: 'Hỏi ý Hà Vy' }));
    expect(bong()).toHaveTextContent(goiYCua('c-ten-h', JSON.stringify({ kind: 'so-dong', n: 30 })).bac1.text);
  });
});

describe('gói B14 · c-lop (bộ mùa 1): trượt hai lần liền, đi tiếp từ bảng đang có', () => {
  const giay = (): GiaTriHoSo[] => giaTriTuHoSo(kb, nhayToi(kb, 'lop', 1).hoSo);

  it('HOẶC → 33 dòng (có lời, bạn chưa nói); chạy lại vẫn 33 → trượt hai lần liền, bạn nói bậc 1; lần nữa → bậc 2', async () => {
    const { u } = ve('c-lop', { giayNho: giay() });
    await chonCot(u, 1, 'toa_nha');
    await datGiay(u, 'B', 1);
    await chonCot(u, 2, 'nganh');
    await datGiay(u, 'Báo chí', 2);
    await u.click(screen.getByRole('button', { name: /^Nối điều kiện 2: VÀ/ }));
    await u.click(nutChay());
    await waitFor(() => expect(dau()).toBe('33 DÒNG'));
    expect(thoai()).toHaveAccessibleName(/^Tùng: /);
    expect(bong()).toBeNull();
    const g = goiYCua('c-lop', JSON.stringify({ kind: 'so-dong', n: 33 }));
    await u.click(nutChay());
    await waitFor(() => expect(bong()).toHaveTextContent(g.bac1.text));
    await u.click(nutChay());
    await waitFor(() => expect(bong()).toHaveTextContent(g.bac2.text));
    // Đổi sang VÀ rồi chạy: đúng, bóng gợi ý tắt.
    await u.click(screen.getByRole('button', { name: /^Nối điều kiện 2: HOẶC/ }));
    await u.click(nutChay());
    await screen.findByRole('button', { name: 'Ghim lên bảng' });
    expect(bong()).toBeNull();
  });

  it('E: tòa B → 27 dòng; thêm ngành Báo chí rồi chạy → bảng hẹp lại còn 2 dòng, đi tiếp từ bảng đang có (lớp v7-kq--don)', async () => {
    const { u } = ve('c-lop', { giayNho: giay() });
    await chonCot(u, 1, 'toa_nha');
    await datGiay(u, 'B', 1);
    await u.click(screen.getByRole('button', { name: 'Bỏ điều kiện 2' }));
    await u.click(nutChay());
    await waitFor(() => expect(dau()).toBe('27 DÒNG'));
    // Lần đầu: bảng dựng mới (không phải dồn từ bảng cũ).
    expect(document.querySelector('.v7-kq')).not.toHaveClass('v7-kq--don');
    await chonCot(u, 2, 'nganh');
    await datGiay(u, 'Báo chí', 2);
    // Sửa câu xong bảng 27 dòng vẫn còn trên màn (mờ) để lần chạy sau đi tiếp từ nó.
    expect(within(screen.getByLabelText('Kết quả')).getAllByRole('row')).toHaveLength(1 + 27);
    await u.click(nutChay());
    await waitFor(() => expect(dau()).toBe('2 DÒNG'));
    expect(document.querySelector('.v7-kq')).toHaveClass('v7-kq--don');
    expect(within(screen.getByLabelText('Kết quả')).getAllByRole('row')).toHaveLength(1 + 2);
    expect(screen.getByRole('button', { name: 'Ghim lên bảng' })).toBeInTheDocument();
  });

  it('E: lần chạy sau ra bảng RỘNG hơn (bỏ bớt điều kiện) → diễn như lần đầu, không dồn từ bảng cũ', async () => {
    const { u } = ve('c-lop', { giayNho: giay() });
    await chonCot(u, 1, 'nganh');
    await datGiay(u, 'Báo chí', 1);
    await chonCot(u, 2, 'toa_nha');
    await datGiay(u, 'B', 2);
    await u.click(screen.getByRole('button', { name: /^Nối điều kiện 2: VÀ/ }));
    await u.click(screen.getByRole('button', { name: 'Bỏ điều kiện 2' }));
    await u.click(nutChay());
    await waitFor(() => expect(dau()).toBe('8 DÒNG'));
    await u.click(screen.getByRole('button', { name: 'Bỏ điều kiện 1' }));
    await u.click(nutChay());
    await waitFor(() => expect(dau()).toBe('112 DÒNG'));
    expect(document.querySelector('.v7-kq')).not.toHaveClass('v7-kq--don');
  });

  it('E: câu soi của hoạt cảnh chạy được trên bảng hơn 2000 dòng (trước đây vượt hạn nên bảng sinh viên không có hoạt cảnh)', async () => {
    const soi = "SELECT CASE WHEN ma_lop = 'BC24A' THEN 1 ELSE 0 END FROM sinh_vien";
    expect((await chaySql(kb.duLieu!, soi)).ok).toBe(false);
    const kq = await chaySql(kb.duLieu!, soi, 100_000);
    expect(kq.ok && kq.dong.length).toBeGreaterThan(2000);
  });
});

describe('gói B14 · buổi họp, thẻ chưa có gợi ý, bộ MVP', () => {
  it('màn chiếu c-sua-or-quan: Hà Vy đứng ở góc, gợi ý hai bậc của thẻ', async () => {
    const { u } = ve('c-sua-or-quan', { mode: 'fix-query', canh: 'man-chieu' });
    const g = goiYCua('c-sua-or-quan', 'chung');
    await u.click(screen.getByRole('button', { name: 'Hỏi ý Hà Vy' }));
    expect(bong()).toHaveTextContent(g.bac1.text);
    await u.click(screen.getByRole('button', { name: 'Hỏi ý Hà Vy' }));
    expect(bong()).toHaveTextContent(g.bac2.text);
  });

  it('thẻ mùa 1 chưa có gợi ý: bạn đang có mặt nhắc lại việc đang làm bằng lời viết sẵn', async () => {
    const s = nhayToi(kb, 'lop', 21);
    const the = Object.values(kb.thuThach).find((t) => !t.goiY?.length && !t.kieuTrinhDung && /\bWHERE\b/i.test(t.sqlChuan));
    if (!the) throw new Error('không còn thẻ nào chưa có gợi ý');
    render(<PhongTraMvp kb={kb} s={s} duLieu={kb.duLieu} the={the} mode="challenge" giayNho={[]} dienTen={(t) => t} noi="Trong phòng máy" onDoiCho={vi.fn()} onXong={vi.fn()} />);
    const u = userEvent.setup();
    await u.click(screen.getByRole('button', { name: 'Hỏi ý Tùng' }));
    expect(bong()).toHaveTextContent(/câu nhắc lúc nãy/);
    expect(screen.queryByRole('button', { name: 'Gợi ý rõ hơn' })).toBeNull();
  });

  it('bộ MVP: không gợi ý, không lời viết sẵn → màn tra không có bạn đi cùng', () => {
    const the = kbMvp.thuThach['c-lop'];
    if (!the) throw new Error('thiếu thẻ');
    render(<ManTraV7 kb={kbMvp} duLieu={kbMvp.duLieu} the={the} mode="challenge" canh="phong-clb" giayNho={[]} dienTen={(t) => t} onXong={vi.fn()} />);
    expect(screen.queryByRole('complementary', { name: 'Bạn đi cùng' })).toBeNull();
  });
});
