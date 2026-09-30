/**
 * Bản đồ trường + màn trong địa điểm của bản MVP (gói ban-do-di-lai): ghim chỉ cho nơi đang mở, đến nơi không tốn
 * khung, tòa nhiều phòng → chọn phòng; điểm tương tác là nút có nhãn trung tính (không lộ `moTa`), bấm → đúng dữ kiện.
 */
import { act, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { KICH_BAN_MVP } from '../../content/generated/mvp/kich-ban.gen';
import type { KichBanMvp } from '../../content/mvp/types';
import { danhSachDiaDiem, taoTrangThai, type DiaDiemHienMvp } from '../engine/may';
import { nhanChoXem } from '../engine/nhan-cho-xem';
import type { TrangThaiMvp } from '../engine/trang-thai';
import { useKhoMvp } from '../store/kho-mvp';
import { BAN_DO_MVP } from './ban-do-mvp';
import { BanDoMvp } from './BanDoMvp';
import { ManChoiMvp } from './ManChoiMvp';
import { NoiMvp } from './NoiMvp';

// Bản đồ + địa điểm là chế độ ngày × địa điểm (dùng lại từ Vụ 2); chương 1 thật không còn địa điểm (ĐÃ CHỐT C,
// 30/09/2026) nên cả tệp chạy trên fixture đóng băng Vụ 1 bản cũ — kể cả kho (useKhoMvp) và ManChoiMvp.
vi.mock('../../content/generated/mvp/kich-ban.gen', async () => ({
  KICH_BAN_MVP: (await import('../engine/testing/kich-ban-dia-diem.fixture')).KICH_BAN_DIA_DIEM,
}));

const kb = KICH_BAN_MVP as unknown as KichBanMvp;

function tuDo(ngay: number, them: Partial<TrangThaiMvp> & { manhMoi?: string[]; bangChung?: string[] } = {}): TrangThaiMvp {
  const { manhMoi = [], bangChung = [], ...con } = them;
  const s = taoTrangThai(kb, 1);
  return { ...s, giaiDoan: 'ngay', ngay, khung: 0, conTro: null, hoiDap: null, hoSo: { manhMoi, taiLieu: [], bangChung }, ...con };
}
const noiCua = (s: TrangThaiMvp, id: string): DiaDiemHienMvp => {
  const n = danhSachDiaDiem(kb, s).find((d) => d.diaDiem.id === id);
  if (!n) throw new Error(id);
  return n;
};

describe('dữ liệu bản đồ (ban-do-mvp.ts)', () => {
  it('mọi địa điểm của dia-diem.md nằm trong một ghim; tọa độ trong 0–100', () => {
    const coGhim = new Set(BAN_DO_MVP.ghim.flatMap((g) => g.diaDiem));
    expect(kb.diaDiem.map((d) => d.id).filter((id) => !coGhim.has(id))).toEqual([]);
    for (const g of BAN_DO_MVP.ghim) {
      expect(g.x, g.id).toBeGreaterThanOrEqual(0);
      expect(g.x, g.id).toBeLessThanOrEqual(100);
      expect(g.y, g.id).toBeGreaterThanOrEqual(0);
      expect(g.y, g.id).toBeLessThanOrEqual(100);
    }
  });
});

describe('BanDoMvp', () => {
  const ve = (s: TrangThaiMvp) => {
    const onDen = vi.fn();
    const onKetThucNgay = vi.fn();
    render(<BanDoMvp banDo={BAN_DO_MVP} diaDiem={danhSachDiaDiem(kb, s)} khungConLai={3} chinhXong={false} tenBuoiToi="Cuối ngày" onDen={onDen} onKetThucNgay={onKetThucNgay} />);
    return { onDen, onKetThucNgay };
  };

  it('ngày 1: chỉ ghim của nơi đã mở (Tòa B, Cổng KTX, Phòng CLB), kèm số chỗ còn mới', () => {
    ve(tuDo(1));
    const vung = screen.getByRole('region', { name: 'Bản đồ trường' });
    const ghim = within(vung)
      .getAllByRole('button')
      .map((b) => b.getAttribute('data-ghim'))
      .filter(Boolean);
    expect(ghim.sort()).toEqual(['ktx', 'phong-clb', 'toa-b']);
    expect(screen.getByRole('button', { name: 'Tòa B: 3 chỗ còn mới' })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /^Phòng máy/ })).toBeNull();
    expect(screen.queryByRole('button', { name: /^Tòa hành chính/ })).toBeNull();
  });

  it('ghim một nơi: bấm → đến thẳng nơi đó', async () => {
    const { onDen, onKetThucNgay } = ve(tuDo(2));
    await userEvent.click(screen.getByRole('button', { name: /^Phòng máy:/ }));
    expect(onDen).toHaveBeenCalledWith('phong-may');
    expect(onKetThucNgay).not.toHaveBeenCalled();
  });

  it('tòa nhiều phòng: bấm ghim → chọn phòng → đến phòng đã chọn', async () => {
    const { onDen } = ve(tuDo(3));
    await userEvent.click(screen.getByRole('button', { name: /^Tòa hành chính:/ }));
    expect(onDen).not.toHaveBeenCalled();
    const bang = screen.getByRole('dialog', { name: 'Chọn phòng trong Tòa hành chính' });
    await userEvent.click(within(bang).getByRole('button', { name: /Phòng Công tác sinh viên/ }));
    expect(onDen).toHaveBeenCalledWith('phong-ctsv');
  });

  it('ghim đi được bằng bàn phím (Tab tới, Enter)', async () => {
    const { onDen } = ve(tuDo(1));
    const toaB = screen.getByRole('button', { name: /^Tòa B:/ });
    while (document.activeElement !== toaB) await userEvent.tab();
    await userEvent.keyboard('{Enter}');
    expect(onDen).toHaveBeenCalledWith('toa-b');
  });
});

describe('NoiMvp (màn trong địa điểm)', () => {
  const ve = (noi: DiaDiemHienMvp, khungConLai = 3) => {
    const onChon = vi.fn();
    const onVeBanDo = vi.fn();
    render(<NoiMvp kb={kb} noi={noi} khung="sang" khungConLai={khungConLai} onChon={onChon} onVeBanDo={onVeBanDo} />);
    return { onChon, onVeBanDo };
  };

  it('mỗi điểm là nút có aria-label = nhãn trung tính, không chứa moTa; bấm → chọn đúng dữ kiện', async () => {
    const noi = noiCua(tuDo(1), 'toa-b');
    const { onChon } = ve(noi);
    const vung = screen.getByRole('region', { name: 'Ở Sảnh tòa B và hộp kiến nghị' });
    const diem = [...vung.querySelectorAll('button.mvp-diem')];
    expect(diem).toHaveLength(3);
    for (const k of noi.duKien) {
      const nut = vung.querySelector(`button[data-diem="${k.duKien.anh?.sprite ?? ''}"]`);
      // Nhãn trùng trong cùng nơi được đánh số "(1)", "(2)" để trình đọc màn hình còn phân biệt.
      const nhan = nut?.getAttribute('aria-label') ?? '';
      const goc = nhanChoXem(kb, k.duKien);
      expect([goc, `${goc} (1)`, `${goc} (2)`, `${goc} (3)`], k.duKien.id).toContain(nhan);
      expect(nut?.getAttribute('aria-label') ?? '', k.duKien.id).not.toContain(k.duKien.moTa);
      expect(nut?.getAttribute('title') ?? '', k.duKien.id).not.toContain(k.duKien.moTa);
    }
    await userEvent.click(screen.getByRole('button', { name: 'Xem: Thông báo họp rà soát phòng CLB' }));
    expect(onChon).toHaveBeenCalledWith('dk-thong-bao-hop');
  });

  it('điểm đã xem và điểm chưa đủ điều kiện không bấm được', () => {
    ve(noiCua(tuDo(2, { duKienDaLam: ['dk-bac-thinh-the-lich'] }), 'toa-b'));
    expect(document.querySelector('button[data-diem="obj-hop-kien-nghi"]')).toBeDisabled();
  });

  it('vật dùng chung: ngày 4 bàn máy mở dk-ten-h; máy in có hai việc → chọn nhanh bằng nhãn trung tính', async () => {
    const s = tuDo(4, { manhMoi: ['clue-quyen-du-lieu', 'clue-can-ma-va-can-cu'], bangChung: ['ev-hai-ma'], duKienDaLam: ['dk-loc-lop'] });
    const { onChon } = ve(noiCua(s, 'phong-may'));
    await userEvent.click(screen.getByRole('button', { name: 'Ngồi vào máy tính' }));
    expect(onChon).toHaveBeenLastCalledWith('dk-ten-h');

    const mayIn = document.querySelector('button[data-diem="obj-may-in-nhat-ky"]') as HTMLButtonElement;
    await userEvent.click(mayIn);
    expect(onChon).toHaveBeenCalledTimes(1);
    const bang = screen.getByRole('dialog', { name: 'Chọn việc ở chỗ này' });
    const viec = within(bang).getAllByRole('button').filter((b) => b.classList.contains('mvp-dd__nut'));
    expect(viec).toHaveLength(2);
    await userEvent.click(viec[1] as HTMLElement);
    expect(onChon).toHaveBeenLastCalledWith('dk-dong-in-bai-tap');
  });

  it('danh sách chữ dự phòng: mở được, chọn được dữ kiện, nhãn trung tính', async () => {
    const { onChon, onVeBanDo } = ve(noiCua(tuDo(1), 'cong-ktx'));
    await userEvent.click(screen.getByRole('button', { name: 'Danh sách' }));
    const ds = screen.getByRole('dialog', { name: 'Các chỗ xem xét ở Cổng KTX' });
    expect(ds.textContent).not.toContain('Lịch cắt nước bảo trì');
    await userEvent.click(within(ds).getAllByRole('button')[0] as HTMLElement);
    expect(onChon).toHaveBeenCalledWith('dk-lich-cat-nuoc');
    await userEvent.click(screen.getByRole('button', { name: 'Về bản đồ' }));
    expect(onVeBanDo).toHaveBeenCalled();
  });
});

describe('ManChoiMvp: đi lại trên bản đồ không tốn khung', () => {
  afterEach(() => {
    act(() => useKhoMvp.getState().xoa());
  });

  it('bấm ghim → vào nơi; khung và phí "vào" chưa đổi; "Về bản đồ" → lại bản đồ', async () => {
    act(() => useKhoMvp.getState().datTrangThai(tuDo(2, { manhMoi: ['clue-quyen-du-lieu'] })));
    render(<ManChoiMvp onVeTieuDe={vi.fn()} />);
    await userEvent.click(screen.getByRole('button', { name: /^Phòng máy:/ }));
    expect(screen.getByRole('region', { name: 'Ở Phòng máy' })).toBeInTheDocument();
    const s = useKhoMvp.getState().trangThai;
    expect(s?.khung).toBe(0);
    expect(s?.daVaoHomNay).toEqual([]);
    expect(screen.getByRole('button', { name: 'Ngồi vào máy tính' })).toHaveAttribute('title', 'Ngồi vào máy tính — tốn 1 khung');
    await userEvent.click(screen.getByRole('button', { name: 'Về bản đồ' }));
    expect(screen.getByRole('region', { name: 'Bản đồ trường' })).toBeInTheDocument();
    expect(useKhoMvp.getState().trangThai?.khung).toBe(0);
  });
});
