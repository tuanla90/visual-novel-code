/**
 * Sảnh KTX của mở đầu MVP (user yêu cầu 29/09): cảnh [KHÁM PHÁ] dạy bấm vật (thang máy, bảng tin → Tùng mới hiện), màn
 * "Nhân vật mới" như prototype khi Tùng nói câu đầu, và tab Nhân vật của Hồ sơ liệt kê người đã gặp.
 */
import { act, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { KICH_BAN_MVP } from '../../content/generated/mvp/kich-ban.gen';
import type { KichBanMvp } from '../../content/mvp/types';
import { khungNhin, taoTrangThai, xuLy } from '../engine/may';
import type { TrangThaiMvp } from '../engine/trang-thai';
import { useKhoMvp } from '../store/kho-mvp';
import { HoSoMvp } from './HoSoMvp';
import { ManChoiMvp } from './ManChoiMvp';

const kb = KICH_BAN_MVP as unknown as KichBanMvp;

/** Bấm "tiếp" qua các lời mở đầu tới cảnh khám phá ở sảnh KTX. */
function toiSanh(): TrangThaiMvp {
  let s = taoTrangThai(kb, 1);
  for (let i = 0; i < 50 && khungNhin(kb, s).kind === 'line'; i++) s = xuLy(kb, s, { type: 'tiep' });
  return s;
}

function veManChoi(s: TrangThaiMvp) {
  act(() => useKhoMvp.getState().datTrangThai(s));
  return render(<ManChoiMvp onVeTieuDe={vi.fn()} />);
}

afterEach(() => {
  act(() => useKhoMvp.getState().xoa());
});

describe('sảnh KTX: [KHÁM PHÁ]', () => {
  it('hai chỗ bấm có nhãn, chưa có Tùng; bấm tờ giấy trên thang máy → lời kể; về lại cảnh thì chỗ đó mờ', async () => {
    veManChoi(toiSanh());
    const canh = screen.getByRole('region', { name: 'Khám phá: Sảnh ký túc xá' });
    expect(within(canh).getByRole('button', { name: 'Xem tờ giấy trên cửa thang máy' })).toBeEnabled();
    expect(within(canh).getByRole('button', { name: 'Xem bảng tin' })).toBeEnabled();
    expect(within(canh).queryByRole('button', { name: /cậu bạn áo xanh/ })).toBeNull();

    await userEvent.click(screen.getByRole('button', { name: 'Xem tờ giấy trên cửa thang máy' }));
    expect(screen.queryByRole('region', { name: /^Khám phá/ })).toBeNull();
    expect(document.body.textContent).toContain('Thang máy bảo trì đến hết tuần');

    for (let i = 0; i < 5 && !screen.queryByRole('region', { name: /^Khám phá/ }); i++) act(() => useKhoMvp.getState().hanhDong({ type: 'tiep' }));
    expect(screen.getByRole('button', { name: 'Xem tờ giấy trên cửa thang máy' })).toBeDisabled();
  });

  it('màn giới thiệu của Tùng chờ đúng câu tự giới thiệu và cú bấm tiếp sau câu đó', async () => {
    let s = toiSanh();
    for (const c of ['md-00-thang-may', 'md-00-so-do']) {
      s = xuLy(kb, s, { type: 'xem-diem', chuoi: c });
      for (let i = 0; i < 5 && khungNhin(kb, s).kind === 'line'; i++) s = xuLy(kb, s, { type: 'tiep' });
    }
    veManChoi(s);
    // Tùng giờ là chi tiết ẩn giữa đám đông: bấm tấm lưng áo xanh, soi đủ ba chi tiết trên người cậu ấy rồi mới tới câu hỏi đường.
    await userEvent.click(screen.getByRole('button', { name: /Tấm lưng áo xanh giữa đám đông/ }));
    const kho = () => useKhoMvp.getState();
    for (let i = 0; i < 40; i++) {
      const st = kho().trangThai;
      if (!st) break;
      const kn = khungNhin(kb, st);
      if (kn.kind === 'line' && kn.loi.text.includes('thang bộ ở đâu')) break;
      if (kn.kind === 'explore') {
        const d = kn.diem.find((x) => !x.daXem);
        if (!d) break;
        act(() => kho().hanhDong({ type: 'xem-diem', chuoi: d.diem.chuoi }));
      } else act(() => kho().hanhDong({ type: 'tiep' }));
    }
    expect(document.body.textContent).toContain('thang bộ ở đâu');
    expect(screen.queryByRole('dialog', { name: /Giới thiệu nhân vật/ })).toBeNull();

    act(() => useKhoMvp.getState().hanhDong({ type: 'tiep' }));
    expect(document.body.textContent).toContain('Khuất sau hành lang kia');
    expect(screen.queryByRole('dialog', { name: /Giới thiệu nhân vật/ })).toBeNull();
    act(() => useKhoMvp.getState().hanhDong({ type: 'tiep' }));
    act(() => useKhoMvp.getState().hanhDong({ type: 'tiep' }));
    expect(document.body.textContent).toContain('Tớ là Tùng, học Du lịch.');
    expect(screen.queryByRole('dialog', { name: /Giới thiệu nhân vật/ })).toBeNull();
    await userEvent.click(screen.getByRole('button', { name: 'Tiếp tục' }));
    const the = screen.getByRole('dialog', { name: 'Giới thiệu nhân vật: Trần Tùng' });
    expect(the.textContent).toContain('Bạn cùng phòng 408');
    await userEvent.click(within(the).getByRole('button', { name: /Tiếp tục/ }));
    expect(screen.queryByRole('dialog', { name: /Giới thiệu nhân vật/ })).toBeNull();
    expect(useKhoMvp.getState().trangThai?.daGioiThieu).toEqual(['tung']);
  });
});

describe('Hồ sơ: tab Nhân vật', () => {
  const ve = (daGap: string[]) =>
    render(
      <HoSoMvp
        kb={kb}
        hoSo={{ manhMoi: [], taiLieu: [], bangChung: [] }}
        soTay={[]}
        tenNguoiChoi="An"
        nganh="Kế toán"
        daGap={daGap}
        tab="nhan-vat"
        onDoiTab={vi.fn()}
        dienTen={(t) => t}
        onDong={vi.fn()}
      />,
    );

  it('chỉ liệt kê người đã gặp, thẻ có danh xưng, câu nói, giới thiệu', () => {
    ve(['tung']);
    const ds = screen.getByRole('navigation', { name: 'Nhân vật đã gặp' });
    expect(within(ds).getAllByRole('button').map((b) => b.textContent)).toEqual(['Tùng']);
    expect(screen.getByText('Bạn cùng phòng 408')).toBeInTheDocument();
    expect(screen.getByText(/Tớ cá là mười phút/)).toBeInTheDocument();
  });

  it('chưa gặp ai → lời nhắn trống', () => {
    ve([]);
    expect(screen.getByText(/Chưa gặp ai/)).toBeInTheDocument();
  });
});
