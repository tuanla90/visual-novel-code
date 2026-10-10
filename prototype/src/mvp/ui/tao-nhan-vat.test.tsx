/**
 * Màn tạo nhân vật MVP (gói tao-nhan-vat-mvp) qua giao diện thật `ManChoiMvp`: gõ tên → câu sau có tên; tên sai → báo
 * lỗi, không tiến; xúc xắc (hàm ngẫu nhiên giả) điền tên + lời Tùng; ngành cố định (bỏ bước chọn 04/10); Lưu/Nạp giữ tên;
 * phím tắt VN không bắt phím khi đang gõ; tên KHÔNG có trong bất kỳ sự kiện telemetry nào (QĐ-077).
 */
import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { KICH_BAN_MVP } from '../../content/generated/mvp/kich-ban.gen';
import type { KichBanMvp, NutMvp } from '../../content/mvp/types';
import { clearTelemetry, getTelemetryEvents } from '../../shared/telemetry/track';
import { PRESS_GUARD_MS } from '../../shared/ui/use-press-guard';
import { useVnStore } from '../../shared/vn/vn-store';
import { canGioiThieu, khungNhin, taoTrangThai, TEN_XUC_XAC, xuLy } from '../engine/may';
import type { TrangThaiMvp } from '../engine/trang-thai';
import { useKhoMvp } from '../store/kho-mvp';
import { ManChoiMvp } from './ManChoiMvp';
import { TaoNhanVatMvp } from './TaoNhanVatMvp';

const kb = KICH_BAN_MVP as unknown as KichBanMvp;
const cho = (ms: number) => act(() => new Promise<void>((r) => setTimeout(r, ms)));

function toiCauHoi(s: TrangThaiMvp, truong: 'ten' | 'nganh'): TrangThaiMvp {
  for (let i = 0; i < 200; i++) {
    const kn = khungNhin(kb, s);
    // Người chơi thật đóng màn "Nhân vật mới" khi Tùng nói câu đầu; màn đó mở sẽ bắt phím của ô tên.
    const gt = canGioiThieu(kb, s, kn);
    if (gt) s = xuLy(kb, s, { type: 'da-gioi-thieu', nhanVat: gt });
    if (kn.kind === 'create-character' && kn.nut.truong === truong) return s;
    // Sảnh KTX ([KHÁM PHÁ]): bấm lần lượt các chỗ chưa xem (Tùng hiện sau cùng).
    const choXem = kn.kind === 'explore' ? kn.diem.find((d) => !d.daXem) : undefined;
    s = choXem ? xuLy(kb, s, { type: 'xem-diem', chuoi: choXem.diem.chuoi }) : xuLy(kb, s, { type: 'tiep' });
  }
  throw new Error(`không tới câu hỏi ${truong}`);
}
const oCauTen = (): TrangThaiMvp => toiCauHoi(taoTrangThai(kb, 1), 'ten');
const trangThai = (): TrangThaiMvp => {
  const s = useKhoMvp.getState().trangThai;
  if (!s) throw new Error('kho trống');
  return s;
};
const dangOCauTen = (): boolean => {
  const kn = khungNhin(kb, trangThai());
  return kn.kind === 'create-character' && kn.nut.truong === 'ten';
};

function veManChoi(s: TrangThaiMvp) {
  act(() => useKhoMvp.getState().datTrangThai(s));
  return render(<ManChoiMvp onVeTieuDe={vi.fn()} />);
}

beforeEach(() => {
  clearTelemetry();
});
afterEach(() => {
  act(() => {
    useKhoMvp.getState().xoa();
    useVnStore.getState().setAutoMode(false);
  });
});

describe('câu hỏi tên (ManChoiMvp)', () => {
  it('hiện lời Tùng, ô có nhãn + gợi ý không cần tên thật; không có câu hỏi giới tính', () => {
    veManChoi(oCauTen());
    expect(screen.getByText('Thế cậu tên gì?')).toBeInTheDocument();
    const o = screen.getByLabelText('Tên nhân vật của bạn');
    expect(o).toHaveAccessibleDescription(/Không cần dùng tên thật/);
    expect(o).toHaveAttribute('autocomplete', 'off');
    expect(document.body.textContent).not.toMatch(/giới tính|Nam hay nữ|nam\/nữ/i);
  });

  it('gõ tên hợp lệ + Enter → câu sau của Tùng có đúng tên', async () => {
    veManChoi(oCauTen());
    await userEvent.type(screen.getByLabelText('Tên nhân vật của bạn'), '  Nguyễn Bảo {Enter}');
    expect(trangThai().tenNguoiChoi).toBe('Nguyễn Bảo');
    // Chữ thoại có thể bị tách thành nhiều thẻ (tô sáng từ khóa), nên so theo chữ của cả trang.
    await waitFor(() => expect(document.body.textContent).toContain('Nguyễn Bảo à. Dễ gọi đấy. Cậu học ngành gì?'));
  });

  it.each([
    ['có số', 'Bảo 2', /chữ số/],
    ['quá dài', 'Nguyễn Văn Kiên Trung Dũng', /dài quá/],
    ['ký tự lạ', 'Bảo@', /chữ cái/],
  ])('tên %s → báo lỗi, không tiến', async (_mo, ten, loi) => {
    veManChoi(oCauTen());
    await userEvent.type(screen.getByLabelText('Tên nhân vật của bạn'), ten);
    await userEvent.click(screen.getByRole('button', { name: 'Xong' }));
    expect(screen.getByRole('alert')).toHaveTextContent(loi);
    expect(dangOCauTen()).toBe(true);
    expect(trangThai().tenNguoiChoi).toBe('Khoa');
    expect(screen.getByLabelText('Tên nhân vật của bạn')).toHaveAttribute('aria-invalid', 'true');
  });

  it('ô trống: Enter dồn ngay lúc màn hiện bị bỏ qua lặng lẽ; bấm Xong sau đó → báo "chưa gõ tên"', async () => {
    veManChoi(oCauTen());
    await userEvent.type(screen.getByLabelText('Tên nhân vật của bạn'), '{Enter}');
    expect(screen.queryByRole('alert')).toBeNull();
    await cho(PRESS_GUARD_MS + 50);
    await userEvent.click(screen.getByRole('button', { name: 'Xong' }));
    expect(screen.getByRole('alert')).toHaveTextContent(/chưa gõ tên/);
    expect(dangOCauTen()).toBe(true);
  });

  it('phím tắt VN không bắt phím khi đang gõ: Space / Enter giữa chừng, Auto đang bật → vẫn ở câu hỏi tên', async () => {
    act(() => useVnStore.getState().setAutoMode(true));
    veManChoi(oCauTen());
    const o = screen.getByLabelText('Tên nhân vật của bạn');
    await userEvent.type(o, 'Lê Văn Việt');
    expect(o).toHaveValue('Lê Văn Việt');
    await cho(1600);
    expect(dangOCauTen()).toBe(true);
    await userEvent.keyboard(' ');
    expect(dangOCauTen()).toBe(true);
    expect(o).toHaveValue('Lê Văn Việt ');
  });
});

describe('nút xúc xắc (TaoNhanVatMvp, hàm ngẫu nhiên giả)', () => {
  const nutTen = (): Extract<NutMvp, { type: 'create-character' }> => {
    const kn = khungNhin(kb, oCauTen());
    if (kn.kind !== 'create-character') throw new Error(kn.kind);
    return kn.nut;
  };

  it('bấm → điền tên đúng theo hàm ngẫu nhiên, Tùng KHÔNG nói thêm (user chốt 29/09); Xong → onDatTen nhận tên đó', async () => {
    const onDatTen = vi.fn();
    render(<TaoNhanVatMvp kb={kb} nut={nutTen()} dienTen={(t) => t} onDatTen={onDatTen} onChonNganh={vi.fn()} ngauNhien={() => 0} />);
    const nut = screen.getByRole('button', { name: 'Bấm xúc xắc: đặt tên ngẫu nhiên' });
    expect(nut).toHaveAttribute('title', 'Bấm xúc xắc: đặt tên ngẫu nhiên');
    expect(nut.querySelector('svg')).not.toBeNull();
    await userEvent.click(nut);
    expect(screen.getByLabelText('Tên nhân vật của bạn')).toHaveValue(TEN_XUC_XAC[0]);
    expect(screen.queryByText(/Ngại nghĩ thì bấm xúc xắc/)).toBeNull();
    // Bấm lại (cùng hàm ngẫu nhiên) → tên khác tên đang có.
    await userEvent.click(nut);
    expect(screen.getByLabelText('Tên nhân vật của bạn')).toHaveValue(TEN_XUC_XAC[1]);
    await userEvent.click(screen.getByRole('button', { name: 'Xong' }));
    expect(onDatTen).toHaveBeenCalledWith(TEN_XUC_XAC[1]);
  });
});

describe('ngành cố định (ManChoiMvp, 04/10/2026)', () => {
  it('đặt tên xong không có nút chọn ngành: Tùng hỏi bằng lời, câu sau là người chơi đáp "Kế toán."', async () => {
    veManChoi(oCauTen());
    await userEvent.type(screen.getByLabelText('Tên nhân vật của bạn'), 'Bảo{Enter}');
    expect(document.body.textContent).toContain('Bảo à. Dễ gọi đấy. Cậu học ngành gì?');
    expect(screen.queryByRole('button', { name: 'Marketing' })).toBeNull();
    act(() => useKhoMvp.getState().hanhDong({ type: 'tiep' }));
    expect(document.body.textContent).toContain('Kế toán.');
    expect(trangThai().nganh).toBe('Kế toán');
  });
});

describe('Lưu / Nạp (kho MVP)', () => {
  it('lưu vào ô sau khi đặt tên, chơi lại, nạp → tên và ngành quay về', () => {
    const s = xuLy(kb, oCauTen(), { type: 'dat-ten', ten: 'Trần Quốc' });
    act(() => {
      useKhoMvp.getState().datTrangThai(s);
      useKhoMvp.getState().luuVaoO(2, 'Mở đầu');
      useKhoMvp.getState().batDau();
    });
    expect(trangThai().tenNguoiChoi).toBe('Khoa');
    act(() => {
      useKhoMvp.getState().napTuO(2);
    });
    expect(trangThai().tenNguoiChoi).toBe('Khoa'); // tên gõ tay cũ bị đổi về tên cố định khi nạp
    expect(trangThai().nganh).toBe('Kế toán');
  });
});

describe('telemetry không chứa tên (QĐ-077)', () => {
  it('đặt tên rồi đi tiếp (kèm bật/tắt Auto để có sự kiện) → không payload nào có tên', async () => {
    const TEN = 'Phạm Khôi Nguyên';
    veManChoi(oCauTen());
    await userEvent.type(screen.getByLabelText('Tên nhân vật của bạn'), `${TEN}{Enter}`);
    expect(trangThai().tenNguoiChoi).toBe(TEN);
    act(() => useVnStore.getState().toggleAutoMode());
    act(() => useVnStore.getState().toggleAutoMode());
    act(() => useKhoMvp.getState().hanhDong({ type: 'tiep' }));
    const suKien = getTelemetryEvents();
    expect(suKien.length).toBeGreaterThan(0);
    const json = JSON.stringify(suKien);
    for (const phan of [TEN, 'Phạm', 'Khôi Nguyên']) expect(json).not.toContain(phan);
  });
});
