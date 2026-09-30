/**
 * Nhập câu ở phòng máy (QĐ-092): ba cách cùng ra một câu SQL; kéo thả tự bọc nháy cho giấy nhớ, ✎ giữ nguyên chữ gõ;
 * bấm khối nối liền trong nháy; đổi cách được ghi telemetry; màn thử thách chạy thật câu dựng được (bài 2.2).
 */
import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
// Cơ chế trình dựng (nháy, K24 vào cột số, AND/OR, soi điều kiện) test trên các bài luyện 2.1–2.3 của fixture đóng băng
// Vụ 1 bản cũ — chương 1 thật (30/09/2026) gộp còn c-lop, không còn bài 2.1/2.2 riêng. Máy chấm không phụ thuộc vụ.
import { KICH_BAN_DIA_DIEM as KICH_BAN_MVP } from '../engine/testing/kich-ban-dia-diem.fixture';
import type { KichBanMvp } from '../../content/mvp/types';
import { clearTelemetry, getTelemetryEvents } from '../../shared/telemetry/track';
import type { CachNhap } from '../engine/trinh-dung';
import { ManThuThachMvp } from './ManThuThachMvp';
import { NhapCauMvp, type GiayNhoDung } from './NhapCauMvp';

const kb = KICH_BAN_MVP as unknown as KichBanMvp;
const duLieu = kb.duLieu;
if (!duLieu) throw new Error('thiếu du-lieu.md');
const GIAY: GiayNhoDung[] = [
  { khoa: 'clue-toa-b#0', giaTri: 'B', nguon: '[Tòa B]' },
  { khoa: 'clue-bao-chi-k24#0', giaTri: 'Báo chí', nguon: '[Báo chí K24]' },
  { khoa: 'clue-bao-chi-k24#1', giaTri: 'K24', nguon: '[Báo chí K24]' },
];
const SQL_22 = kb.thuThach['c-loc-toa']?.sqlChuan ?? '';

function Vo({ dau = 'keo' as CachNhap }: { dau?: CachNhap }) {
  const [cach, setCach] = useState<CachNhap>(dau);
  const [sql, setSql] = useState('');
  return (
    <>
      <NhapCauMvp duLieu={duLieu!} sqlChuan={SQL_22} giayNho={GIAY} cachNhap={cach} onDoiCach={setCach} onSql={setSql} onChay={vi.fn()} khoa={false} />
      <output data-testid="sql">{sql}</output>
    </>
  );
}
const sqlHien = (): string => screen.getByTestId('sql').textContent ?? '';

beforeEach(() => {
  sessionStorage.clear();
  clearTelemetry();
});

describe('kéo thả', () => {
  it('bấm giấy nhớ rồi bấm ô: chữ tự bọc nháy; K24 vào cột số vẫn là chữ; ✎ gõ 2024 để trần', async () => {
    render(<Vo />);
    expect(sqlHien()).toBe('SELECT ma_lop, nganh, khoa_hoc, toa_nha FROM lop_sinh_hoat');
    await userEvent.selectOptions(screen.getByRole('combobox', { name: 'Cột của điều kiện 1' }), 'khoa_hoc');
    await userEvent.click(screen.getByRole('button', { name: /^K24 \(giấy nhớ/ }));
    await userEvent.click(screen.getByRole('button', { name: /^Ô giá trị điều kiện 1/ }));
    expect(sqlHien()).toBe("SELECT ma_lop, nganh, khoa_hoc, toa_nha FROM lop_sinh_hoat WHERE khoa_hoc = 'K24'");

    await userEvent.click(screen.getByRole('button', { name: 'Tự gõ giá trị điều kiện 1' }));
    const o = screen.getByRole('textbox', { name: /Gõ giá trị điều kiện 1/ });
    await userEvent.clear(o);
    await userEvent.type(o, '2024{Enter}');
    expect(sqlHien()).toMatch(/WHERE khoa_hoc = 2024$/);
  });

  it('thêm điều kiện, đổi nối AND ↔ OR, "bắt đầu bằng" thành LIKE \'x%\'', async () => {
    render(<Vo />);
    await userEvent.selectOptions(screen.getByRole('combobox', { name: 'Cột của điều kiện 1' }), 'toa_nha');
    await userEvent.click(screen.getByRole('button', { name: /^B \(giấy nhớ/ }));
    await userEvent.click(screen.getByRole('button', { name: /^Ô giá trị điều kiện 1/ }));
    await userEvent.click(screen.getByRole('button', { name: '+ Thêm điều kiện' }));
    await userEvent.selectOptions(screen.getByRole('combobox', { name: 'Cột của điều kiện 2' }), 'nganh');
    await userEvent.click(screen.getByRole('button', { name: /^Báo chí \(giấy nhớ/ }));
    await userEvent.click(screen.getByRole('button', { name: /^Ô giá trị điều kiện 2/ }));
    expect(sqlHien()).toMatch(/WHERE toa_nha = 'B' AND nganh = 'Báo chí'$/);
    await userEvent.click(screen.getByRole('button', { name: /^Nối điều kiện 2: VÀ \(AND\)/ }));
    expect(sqlHien()).toMatch(/WHERE toa_nha = 'B' OR nganh = 'Báo chí'$/);
    await userEvent.click(screen.getByRole('button', { name: /^Phép so sánh của điều kiện 2/ }));
    expect(sqlHien()).toMatch(/OR nganh LIKE 'Báo chí%'$/);
  });
});

describe('bấm khối', () => {
  it('khung sẵn; bấm WHERE toa_nha = B ra thiếu nháy; thêm khối nháy thì liền chữ', async () => {
    render(<Vo dau="khoi" />);
    expect(sqlHien()).toBe('SELECT ma_lop, nganh, khoa_hoc, toa_nha FROM lop_sinh_hoat');
    for (const k of ['WHERE', 'toa_nha', '=', 'B']) await userEvent.click(screen.getByRole('button', { name: `Thêm khối ${k}` }));
    expect(sqlHien()).toMatch(/WHERE toa_nha = B$/);
    await userEvent.click(screen.getByRole('button', { name: 'Xóa khối cuối' }));
    for (const k of ["'", 'B', "'"]) await userEvent.click(screen.getByRole('button', { name: `Thêm khối ${k}` }));
    expect(sqlHien()).toMatch(/WHERE toa_nha = 'B'$/);
  });
});

describe('đổi cách + màn thử thách', () => {
  it('đổi sang Gõ tay: ô chữ bắt đầu bằng khung; đổi cách ghi nhớ phiên và ghi telemetry', async () => {
    render(<ManThuThachMvp kb={kb} duLieu={duLieu} the={kb.thuThach['c-loc-toa']!} mode="challenge" dienTen={(t) => t} onXong={vi.fn()} giayNho={GIAY} />);
    await userEvent.click(screen.getByRole('tab', { name: 'Gõ tay' }));
    expect(screen.getByRole('textbox', { name: 'Câu SQL (gõ tay)' })).toHaveValue('SELECT ma_lop, nganh, khoa_hoc, toa_nha FROM lop_sinh_hoat WHERE ');
    expect(sessionStorage.getItem('clb_mvp_cach_nhap')).toBe('go');
    expect(getTelemetryEvents().map((e) => e.type)).toContain('mvp_input_mode');
  });

  it('bài 2.2 bằng kéo thả: [Tòa B] vào cột tòa → chạy → 4 dòng, đúng, lưu/đi tiếp; ghi mvp_query_run kèm cách nhập', async () => {
    const onXong = vi.fn();
    render(<ManThuThachMvp kb={kb} duLieu={duLieu} the={kb.thuThach['c-loc-toa']!} mode="challenge" dienTen={(t) => t} onXong={onXong} giayNho={GIAY} />);
    await userEvent.selectOptions(screen.getByRole('combobox', { name: 'Cột của điều kiện 1' }), 'toa_nha');
    await userEvent.click(screen.getByRole('button', { name: /^B \(giấy nhớ/ }));
    await userEvent.click(screen.getByRole('button', { name: /^Ô giá trị điều kiện 1/ }));
    await userEvent.click(screen.getByRole('button', { name: 'Chạy truy vấn' }));
    const ketQua = screen.getByRole('region', { name: 'Kết quả' });
    await waitFor(() => expect(within(ketQua).getByText(/Số liệu đây!/)).toBeInTheDocument());
    expect(ketQua.textContent).toContain('4 dòng');
    const chay = getTelemetryEvents().find((e) => e.type === 'mvp_query_run');
    expect(chay).toMatchObject({ challengeId: 'c-loc-toa', mode: 'keo', rows: 4, error: false, correct: true });
    await userEvent.click(screen.getByRole('button', { name: 'Đi tiếp' }));
    expect(onXong).toHaveBeenCalled();
  });

  it('bài 2.2 gõ tay thiếu nháy → lỗi mô tả "máy hiểu chữ không có nháy là tên một cột"', async () => {
    render(<ManThuThachMvp kb={kb} duLieu={duLieu} the={kb.thuThach['c-loc-toa']!} mode="challenge" dienTen={(t) => t} onXong={vi.fn()} giayNho={GIAY} />);
    await userEvent.click(screen.getByRole('tab', { name: 'Gõ tay' }));
    await userEvent.type(screen.getByRole('textbox', { name: 'Câu SQL (gõ tay)' }), 'toa_nha = B');
    await userEvent.click(screen.getByRole('button', { name: 'Chạy truy vấn' }));
    await waitFor(() => expect(screen.getByText(/máy hiểu chữ không có nháy là tên một cột/)).toBeInTheDocument());
    // Lời nhân vật theo dòng "Khi lỗi không có cột" của thẻ.
    expect(document.querySelector('.mvp-chal__phanung[data-speaker="ha-vy"]')?.textContent).toMatch(/^Hà Vy:.*cột tên là B/);
  });

  it('Xem từng điều kiện: bài 2.3 gõ OR → bảng soi 5 dòng, có cột từng điều kiện và "Giữ lại"', async () => {
    render(<ManThuThachMvp kb={kb} duLieu={duLieu} the={kb.thuThach['c-loc-and']!} mode="challenge" dienTen={(t) => t} onXong={vi.fn()} giayNho={GIAY} />);
    await userEvent.click(screen.getByRole('tab', { name: 'Gõ tay' }));
    await userEvent.type(screen.getByRole('textbox', { name: 'Câu SQL (gõ tay)' }), "toa_nha = 'B' OR nganh = 'Báo chí'");
    await userEvent.click(screen.getByRole('button', { name: 'Chạy truy vấn' }));
    await userEvent.click(await screen.findByRole('button', { name: /Xem từng điều kiện/ }));
    const soi = await screen.findByRole('region', { name: 'Xem từng điều kiện' });
    await waitFor(() => expect(within(soi).getAllByRole('row')).toHaveLength(1 + 5));
    expect(within(soi).getByRole('columnheader', { name: 'Giữ lại' })).toBeInTheDocument();
    expect(within(soi).getByText("toa_nha = 'B'")).toBeInTheDocument();
  });
});
