/**
 * Màn tra kiểu v7 (ĐÃ CHỐT B, 30/09/2026) trên thẻ chương 1 THẬT, sql.js chạy thật: một cách nhập duy nhất — bấm giấy nhớ
 * rồi bấm ô (jsdom không có kéo thả HTML5), bấm cột / phép / nối để đổi, ▶ CHẠY → con dấu số dòng + lời nhân vật; đúng thì
 * nút ghim gọi `onXong` với mã các thẻ đã kéo vào câu. Luật chương 1 (bạn lớp 5 tự chơi): không "Mục tiêu học", không
 * tab cách nhập, chỉ thấy bảng mà câu chuẩn dùng, nhãn máy theo cảnh.
 */
import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { TheThuThachMvp } from '../../../content/mvp/types';
import { clearTelemetry, getTelemetryEvents } from '../../../shared/telemetry/track';
import { giaTriTuHoSo, type GiaTriHoSo } from '../../engine/giay-nho';
import { nhayToi } from '../../engine/tu-choi';
import { KICH_BAN as kb } from '../../store/kho-mvp';
import { ManTraV7, type CanhTra } from './ManTraV7';

const theCua = (id: string): TheThuThachMvp => {
  const t = kb.thuThach[id];
  if (!t) throw new Error(`thiếu thẻ ${id}`);
  return t;
};

function ve(id: string, o: { canh?: CanhTra; giayNho?: GiaTriHoSo[]; mode?: 'challenge' | 'fix-query'; onXong?: (dung: string[]) => void } = {}) {
  const onXong = o.onXong ?? vi.fn();
  render(
    <ManTraV7
      kb={kb}
      duLieu={kb.duLieu}
      the={theCua(id)}
      mode={o.mode ?? 'challenge'}
      canh={o.canh ?? 'phong-clb'}
      giayNho={o.giayNho ?? []}
      dienTen={(t) => t}
      onXong={onXong}
    />,
  );
  return { onXong, u: userEvent.setup() };
}

type U = ReturnType<typeof userEvent.setup>;
/** Bấm ô cột của điều kiện `i` tới khi đúng cột `cot` (ô cột xoay vòng qua các cột của bảng). */
async function chonCot(u: U, i: number, cot: string): Promise<void> {
  for (let k = 0; k < 8; k++) {
    const nut = screen.getByRole('button', { name: new RegExp(`^Cột của điều kiện ${i}: `) });
    if (nut.textContent === cot) return;
    await u.click(nut);
  }
  throw new Error(`không chọn được cột ${cot}`);
}
/** Bấm giấy nhớ (theo chữ trên giấy) rồi bấm ô giá trị của điều kiện `i`. */
async function datGiay(u: U, giaTri: string, i: number): Promise<void> {
  await u.click(screen.getByRole('button', { name: new RegExp(`^${giaTri.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')} \\(giấy nhớ`) }));
  await u.click(screen.getByRole('button', { name: new RegExp(`^Ô giá trị điều kiện ${i}`) }));
}
const cauSql = (): string => screen.getByLabelText('Câu SQL đang dựng').textContent ?? '';
const nutChay = (): HTMLElement => screen.getByRole('button', { name: /CHẠY$/ });
const dau = (): string | null => document.querySelector('.v7-dau')?.textContent ?? null;
const thoai = (): HTMLElement | null => document.querySelector<HTMLElement>('.v7-thoai');

beforeEach(() => {
  clearTelemetry();
  // jsdom không có canvas 2D: đống phiếu bỏ qua phần vẽ; chặn lời "Not implemented" cho log sạch.
  vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue(null);
});

describe('màn tra v7 · c-ten-h (ngày 3, laptop phòng CLB)', () => {
  const giay = (): GiaTriHoSo[] => giaTriTuHoSo(kb, nhayToi(kb, 'ten-h', 1).hoSo);

  it('giấy hai lớp vào ma_lop ("là một trong") + H vào ten "bằng" → 0 dòng, Hà Vy rồi Tùng; đổi "bắt đầu bằng" → 2 dòng, ghim → onXong(ev-hai-lop, clue-chu-ky-h)', async () => {
    const { onXong, u } = ve('c-ten-h', { giayNho: giay() });
    // Phiếu hai lớp là MỘT tờ giấy nhớ.
    expect(screen.getAllByRole('button', { name: /\(giấy nhớ Hai lớp/ })).toHaveLength(1);

    await chonCot(u, 1, 'ma_lop');
    await datGiay(u, 'BC24A, BC23A', 1);
    expect(screen.getByRole('button', { name: /^Phép so sánh của điều kiện 1/ })).toHaveTextContent('là một trong');
    await chonCot(u, 2, 'ten');
    await datGiay(u, 'H', 2);
    expect(cauSql()).toBe("SELECT ma_sv, ho_dem, ten, ma_lop FROM sinh_vien WHERE ma_lop IN ('BC24A', 'BC23A') AND ten = 'H'");

    await u.click(nutChay());
    await waitFor(() => expect(dau()).toBe('0 DÒNG'));
    expect(screen.getByText('Không dòng nào.')).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /Ghim lên bảng/ })).toBeNull();
    // Lời "Khi chạy ra 0 dòng với ma_lop, ten": Hà Vy trước, bấm thì tới Tùng, bấm nữa thì tắt.
    expect(thoai()).toHaveAccessibleName(/^Hà Vy: .*một chữ H/);
    await u.click(thoai() as HTMLElement);
    expect(thoai()).toHaveAccessibleName(/^Tùng: /);
    await u.click(thoai() as HTMLElement);
    expect(thoai()).toBeNull();
    expect(getTelemetryEvents().find((e) => e.type === 'mvp_query_run')).toMatchObject({ challengeId: 'c-ten-h', mode: 'keo', rows: 0, error: false, correct: false });

    // Sửa câu sau khi chạy → kết quả cũ không còn là kết quả của câu đang hiện.
    await u.click(screen.getByRole('button', { name: /^Phép so sánh của điều kiện 2/ }));
    expect(screen.getByRole('button', { name: /^Phép so sánh của điều kiện 2/ })).toHaveTextContent('bắt đầu bằng');
    expect(dau()).toBeNull();
    expect(screen.queryByText('Không dòng nào.')).toBeNull();
    expect(screen.queryByRole('button', { name: /Xem từng điều kiện/ })).toBeNull();
    expect(cauSql()).toMatch(/AND ten LIKE 'H%'$/);

    await u.click(nutChay());
    await waitFor(() => expect(dau()).toBe('2 DÒNG'));
    const ketQua = screen.getByLabelText('Kết quả');
    expect(within(ketQua).getAllByRole('row')).toHaveLength(1 + 2);
    expect(within(ketQua).getByText('Hiếu')).toBeInTheDocument();
    expect(within(ketQua).getByText('Hoài')).toBeInTheDocument();
    // Đúng rồi thì khóa câu: không đổi được cột / bỏ giấy nữa.
    expect(screen.getByRole('button', { name: /^Cột của điều kiện 1/ })).toBeDisabled();
    const ghim = screen.getByRole('button', { name: '📌 Ghim lên bảng' });
    await u.click(ghim);
    expect(onXong).toHaveBeenCalledTimes(1);
    expect(onXong).toHaveBeenCalledWith(['ev-hai-lop', 'clue-chu-ky-h']);
    expect(ghim).toBeDisabled();
    await u.click(ghim);
    expect(onXong).toHaveBeenCalledTimes(1);
  });

  it('bấm giấy lần nữa thì bỏ chọn; bấm ô đã có giấy (không cầm giấy) thì gỡ giấy ra', async () => {
    const { u } = ve('c-ten-h', { giayNho: giay() });
    const h = screen.getByRole('button', { name: /^H \(giấy nhớ/ });
    await u.click(h);
    expect(h).toHaveAttribute('aria-pressed', 'true');
    await u.click(h);
    expect(h).toHaveAttribute('aria-pressed', 'false');
    await datGiay(u, 'H', 1);
    expect(cauSql()).toMatch(/WHERE \w+ = 'H'$/);
    await u.click(screen.getByRole('button', { name: /^Giá trị điều kiện 1: H — bấm để gỡ/ }));
    expect(cauSql()).toBe('SELECT ma_sv, ho_dem, ten, ma_lop FROM sinh_vien');
  });

  it('"Xem từng điều kiện" sau khi chạy: bảng soi có cột từng điều kiện', async () => {
    const { u } = ve('c-ten-h', { giayNho: giay() });
    await chonCot(u, 1, 'ma_lop');
    await datGiay(u, 'BC24A, BC23A', 1);
    await chonCot(u, 2, 'ten');
    await datGiay(u, 'H', 2);
    await u.click(nutChay());
    await u.click(await screen.findByRole('button', { name: /Xem từng điều kiện/ }));
    const soi = await screen.findByRole('region', { name: 'Xem từng điều kiện' });
    await waitFor(() => expect(within(soi).getByText("ma_lop IN ('BC24A', 'BC23A')")).toBeInTheDocument());
  });
});

describe('màn tra v7 · luật chương 1', () => {
  it('c-lop ở phòng CLB: chỉ bảng lớp (khóa), nhãn "laptop CLB", không "Mục tiêu học", không tab cách nhập', () => {
    ve('c-lop', { canh: 'phong-clb' });
    const vung = screen.getByRole('region', { name: 'Tra dữ liệu' });
    expect(vung).toHaveAttribute('data-canh', 'phong-clb');
    expect(vung.querySelectorAll('.v7-o--bang')).toHaveLength(1);
    expect(vung.querySelector('.v7-o--bang')).toHaveTextContent('lop_sinh_hoat');
    expect(screen.getByText(/laptop CLB/)).toBeInTheDocument();
    expect(screen.queryByText('Hôm nay học gì')).toBeNull();
    expect(screen.queryByText(theCua('c-lop').mucTieuHoc || '—')).toBeNull();
    expect(screen.queryByRole('tablist')).toBeNull();
    expect(screen.queryByRole('textbox')).toBeNull();
  });

  it('c-in ở phòng máy: chỉ bảng nhật ký in, nhãn "máy phòng máy"', () => {
    ve('c-in', { canh: 'phong-may' });
    expect(screen.getByRole('region', { name: 'Tra dữ liệu' })).toHaveAttribute('data-canh', 'phong-may');
    expect(document.querySelector('.v7-o--bang')).toHaveTextContent('nhat_ky_in');
    expect(screen.getByText(/máy phòng máy/)).toBeInTheDocument();
  });

  it('c-lop: tòa B + Báo chí nối HOẶC rồi chạy ngay → 33 dòng, không bị chấm đúng; VÀ → 2 dòng, ghim với hai mẩu tin', async () => {
    const { onXong, u } = ve('c-lop', { giayNho: giaTriTuHoSo(kb, nhayToi(kb, 'lop', 1).hoSo) });
    await chonCot(u, 1, 'toa_nha');
    await datGiay(u, 'B', 1);
    await chonCot(u, 2, 'nganh');
    await datGiay(u, 'Báo chí', 2);
    await u.click(screen.getByRole('button', { name: /^Nối điều kiện 2: VÀ/ }));
    await u.click(nutChay());
    await waitFor(() => expect(dau()).toBe('33 DÒNG'));
    expect(screen.queryByRole('button', { name: /Ghim lên bảng/ })).toBeNull();
    expect(nutChay()).toBeEnabled();
    // Lời "Khi chạy ra 5 dòng" (không ghi cột): Tùng trước.
    expect(thoai()).toHaveAccessibleName(/^Tùng: /);
    await u.click(screen.getByRole('button', { name: /^Nối điều kiện 2: HOẶC/ }));
    await u.click(nutChay());
    await waitFor(() => expect(dau()).toBe('2 DÒNG'));
    await u.click(screen.getByRole('button', { name: '📌 Ghim lên bảng' }));
    expect(onXong).toHaveBeenCalledWith(['clue-toa-b', 'clue-bao-chi-k24']);
  });
});

describe('màn tra v7 · buổi họp (fix-query c-sua-or-quan, màn chiếu)', () => {
  it('câu HOẶC của Quân nạp sẵn; không giấy nhớ, không thêm / bỏ điều kiện; chạy → 595 dòng; HOẶC → VÀ → 2 dòng → "Tiếp tục"', async () => {
    const { onXong, u } = ve('c-sua-or-quan', { mode: 'fix-query', canh: 'man-chieu', giayNho: giaTriTuHoSo(kb, nhayToi(kb, 'hop-sua-or', 1).hoSo) });
    expect(screen.getByRole('region', { name: 'Sửa truy vấn' })).toHaveAttribute('data-canh', 'man-chieu');
    expect(cauSql()).toBe("SELECT ma_sv, ten FROM sinh_vien WHERE ten LIKE 'H%' OR ma_lop = 'BC24A'");
    expect(document.querySelectorAll('.v7-giay')).toHaveLength(0);
    expect(screen.queryByRole('button', { name: 'Thêm điều kiện' })).toBeNull();
    expect(screen.queryByRole('button', { name: /^Bỏ điều kiện/ })).toBeNull();

    await u.click(nutChay());
    await waitFor(() => expect(dau()).toBe('595 DÒNG'));
    expect(screen.queryByRole('button', { name: 'Tiếp tục' })).toBeNull();

    await u.click(screen.getByRole('button', { name: /^Nối điều kiện 2: HOẶC \(OR\)/ }));
    expect(screen.getByRole('button', { name: /^Nối điều kiện 2: VÀ \(AND\)/ })).toBeInTheDocument();
    expect(dau()).toBeNull();
    await u.click(nutChay());
    await waitFor(() => expect(dau()).toBe('2 DÒNG'));
    // Màn chiếu không ghim lên bảng: nút là "Tiếp tục"; câu nạp sẵn không kéo thẻ nào.
    expect(screen.queryByRole('button', { name: /Ghim lên bảng/ })).toBeNull();
    await u.click(screen.getByRole('button', { name: 'Tiếp tục' }));
    expect(onXong).toHaveBeenCalledWith([]);
  });
});
