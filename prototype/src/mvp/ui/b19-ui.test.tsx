/**
 * Gói B19 — giao diện (bộ thử `noi-dung-thu-b19/`): màn dòng thời gian (kéo thả trên máy tính, chạm-chọn trên điện thoại, kéo sai
 * bật về kèm câu nhắc, phần "?" không điền được, ô khóa sẵn, xem lại đọc từng ô), màn sửa truy vấn `· tính vạch` (Chạy thử không
 * tính, Trình sai tính vạch), lề sổ Minh Anh (vạch, không số), màn kết kiểu sổ CLB có dấu, giấy nhớ ghép mẫu trên bảng.
 */
import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { KICH_BAN_THU_B19 } from '../../content/generated/thu-b19/kich-ban.gen';
import type { KichBanMvp, TheThuThachMvp } from '../../content/mvp/types';
import { theCuaDongThoiGian } from '../engine/dong-thoi-gian';
import { taoTrangThai } from '../engine/may';
import type { TrangThaiMvp } from '../engine/trang-thai';
import { DongThoiGianMvp } from './DongThoiGianMvp';
import { KetMvp } from './KetMvp';
import { LeSoVachMvp } from './LeSoVachMvp';
import { BangGhimMvp } from './v7/BangGhimMvp';
import { ManTraV7 } from './v7/ManTraV7';

const KB = KICH_BAN_THU_B19 as unknown as KichBanMvp;
const DTG = KB.dongThoiGian?.['dtg-vu1'];
if (!DTG) throw new Error('thiếu dtg-vu1');
const tenNguoi = (ma: string): string => KB.nhanVat.find((n) => n.id === ma)?.ten ?? ma;

/** Ván có đủ năm thẻ hồ sơ của bộ thử. */
function vanDuThe(): TrangThaiMvp {
  const s = taoTrangThai(KB, 1);
  return { ...s, hoSo: { manhMoi: ['clue-loi-co-lan', 'clue-ra-cong', 'clue-loi-chu-cuong'], taiLieu: [], bangChung: ['ev-phieu-gui', 'ev-the-lich'] } };
}

function veDtg(o: { dienThoai?: boolean; daDat?: Record<string, string>; chiXem?: boolean } = {}) {
  const onDat = vi.fn();
  const onTiep = vi.fn();
  const s = vanDuThe();
  if (!DTG) throw new Error('thiếu dtg-vu1');
  render(
    <DongThoiGianMvp
      kb={KB}
      dtg={DTG}
      the={theCuaDongThoiGian(KB, s, DTG)}
      daDat={o.daDat ?? {}}
      xong={false}
      chiXem={o.chiXem ?? false}
      docTungO={o.chiXem ?? false}
      dienThoai={o.dienThoai ?? false}
      dienTen={(t) => t}
      tenNguoiNoi={tenNguoi}
      onDat={onDat}
      onTiep={onTiep}
    />,
  );
  return { onDat, onTiep };
}

/** Kéo thẻ `id` (theo data-the) thả vào phần tử `dich`. */
function keoTha(id: string, dich: Element): void {
  const nguon = document.querySelector(`[data-the="${id}"]`);
  if (!nguon) throw new Error(`không có thẻ ${id}`);
  const du = new Map<string, string>();
  const dataTransfer = { setData: (k: string, v: string) => du.set(k, v), getData: (k: string) => du.get(k) ?? '', effectAllowed: 'move' };
  fireEvent.dragStart(nguon, { dataTransfer });
  fireEvent.dragOver(dich, { dataTransfer });
  fireEvent.drop(dich, { dataTransfer });
}
const o = (id: string): HTMLElement => document.querySelector<HTMLElement>(`[data-o="${id}"]`) as HTMLElement;

beforeEach(() => {
  vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue(null);
});

describe('B19 · màn dòng thời gian', () => {
  it('máy tính: kéo đúng thẻ vào ô thì báo máy; kéo sai thì không báo, hiện câu nhắc chung', () => {
    const { onDat } = veDtg();
    keoTha('clue-ra-cong', o('o1'));
    expect(onDat).toHaveBeenCalledWith('o1', 'clue-ra-cong');
    keoTha('ev-the-lich', o('o4'));
    expect(onDat).toHaveBeenCalledTimes(1);
    expect(screen.getByRole('status')).toHaveTextContent('Thẻ này nói chuyện ở chỗ khác.');
    expect(screen.getByRole('status')).toHaveTextContent('Hà Vy');
  });

  it('phần "?" không điền được: thả gì cũng bật lại kèm câu riêng; ô khóa sẵn đã có; chưa xong thì không đi tiếp được', () => {
    const { onDat } = veDtg();
    const dauHoi = within(o('o2')).getByRole('button', { name: 'ai: chưa biết' });
    keoTha('clue-loi-chu-cuong', dauHoi);
    expect(onDat).not.toHaveBeenCalled();
    expect(screen.getByRole('status')).toHaveTextContent('Chưa ai biết người ấy. Cứ để trống.');
    expect(within(o('o3')).getByText('đã có sẵn')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Tiếp tục' })).toBeDisabled();
  });

  it('bấm thẻ rồi bấm ô cũng thả được (bàn phím, không kéo)', async () => {
    const { onDat } = veDtg();
    const u = userEvent.setup();
    await u.click(screen.getByRole('button', { name: /Có người đưa phong bì cho Hoài ở cổng/ }));
    await u.click(within(o('o2')).getByRole('button', { name: /^Ô 2: còn trống/ }));
    expect(onDat).toHaveBeenCalledWith('o2', 'clue-loi-chu-cuong');
  });

  it('điện thoại: chạm ô → danh sách thẻ → chạm chọn; chọn sai thì danh sách còn mở kèm câu nhắc', async () => {
    const { onDat } = veDtg({ dienThoai: true });
    const u = userEvent.setup();
    expect(screen.queryByRole('complementary', { name: 'Thẻ để kéo' })).toBeNull();
    await u.click(within(o('o5')).getByRole('button', { name: /^Ô 5: còn trống — chạm để chọn thẻ/ }));
    const hop = screen.getByRole('dialog', { name: 'Chọn thẻ cho ô' });
    await u.click(within(hop).getByRole('button', { name: /Phiếu gửi ký/ }));
    expect(onDat).not.toHaveBeenCalled();
    expect(within(hop).getByRole('status')).toHaveTextContent('Thẻ này nói chuyện ở chỗ khác.');
    await u.click(within(hop).getByRole('button', { name: /Phiếu gửi do người nộp ký/ }));
    expect(onDat).toHaveBeenCalledWith('o5', 'clue-loi-co-lan');
    expect(screen.queryByRole('dialog', { name: 'Chọn thẻ cho ô' })).toBeNull();
  });

  it('xem lại ở buổi họp: không cột thẻ, đọc từng ô rồi mới "Tiếp tục"', async () => {
    const { onTiep } = veDtg({ chiXem: true, daDat: { o1: 'clue-ra-cong', o2: 'clue-loi-chu-cuong', o4: 'ev-phieu-gui', o5: 'clue-loi-co-lan' } });
    const u = userEvent.setup();
    expect(screen.queryByRole('complementary', { name: 'Thẻ để kéo' })).toBeNull();
    expect(within(o('o1')).getByText('Hoài ra cổng lúc 6:44')).toBeInTheDocument();
    for (let i = 2; i <= 5; i++) await u.click(screen.getByRole('button', { name: `Ô tiếp (${i}/5)` }));
    await u.click(screen.getByRole('button', { name: 'Tiếp tục' }));
    expect(onTiep).toHaveBeenCalledTimes(1);
  });
});

describe('B19 · màn sửa truy vấn · tính vạch', () => {
  it('"Chạy thử" không tính vạch; "Trình" sai thì tính vạch và hiện lời trình sai; sửa đúng rồi Trình thì đi tiếp', async () => {
    const the = KB.thuThach['c-sua-or'] as TheThuThachMvp;
    const onSai = vi.fn();
    const onXong = vi.fn();
    render(
      <ManTraV7
        kb={KB}
        duLieu={KB.duLieu}
        the={the}
        mode="fix-query"
        canh="man-chieu"
        giayNho={[]}
        dienTen={(t) => t}
        onXong={onXong}
        trinh={{ loiSai: () => [{ speaker: 'quan', expression: 'smug', text: 'Vẫn chưa ra một dòng. Vậy câu của tôi sai ở đâu?' }], onSai }}
      />,
    );
    const u = userEvent.setup();
    expect(screen.queryByRole('button', { name: /CHẠY$/ })).toBeNull();
    await u.click(screen.getByRole('button', { name: /Chạy thử/ }));
    await waitFor(() => expect(document.querySelector('.v7-dau')?.textContent).toBe('6 DÒNG'));
    expect(onSai).not.toHaveBeenCalled();
    await u.click(screen.getByRole('button', { name: /^Trình/ }));
    await waitFor(() => expect(onSai).toHaveBeenCalledTimes(1));
    expect(document.querySelector('.v7-thoai')?.textContent).toContain('Vẫn chưa ra một dòng.');
    expect(onXong).not.toHaveBeenCalled();
    await u.click(screen.getByRole('button', { name: /^Nối điều kiện 2: HOẶC/ }));
    await u.click(screen.getByRole('button', { name: /^Trình/ }));
    await waitFor(() => expect(onXong).toHaveBeenCalledTimes(1));
    expect(onSai).toHaveBeenCalledTimes(1);
  });
});

describe('B19 · lề sổ, màn kết, ghép mẫu', () => {
  it('lề sổ Minh Anh: một nét cho mỗi vạch, không hiện con số vạch', () => {
    const { container, rerender } = render(<LeSoVachMvp vach={0} />);
    expect(container.querySelectorAll('.vach__net')).toHaveLength(0);
    rerender(<LeSoVachMvp vach={2} cau={{ so: 2, tong: 4 }} />);
    expect(container.querySelectorAll('.vach__net')).toHaveLength(2);
    expect(container.querySelector('.vach__net.is-moi')).not.toBeNull();
    expect(container.textContent).toBe('Câu 2/4');
  });

  it('màn kết bộ có [CHẤM VỤ]: "Kết tạm", trang sổ có dấu C và ba vạch, "Chơi lại Vụ 1", "Vụ 2 đang làm", không % / hạng S', async () => {
    const choiLaiVu = vi.fn();
    const choiLai = vi.fn();
    const veTieuDe = vi.fn();
    render(<KetMvp ketQua="tam" chamVu={{ soVu: 1, tenVu: 'Chữ ký Hoài', ket: { rank: 'c', vach: 3, thieu: [] }, choiLai: true }} onChoiLaiVu={choiLaiVu} onChoiLai={choiLai} onVeTieuDe={veTieuDe} />);
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Kết tạm');
    expect(screen.getByRole('figure', { name: /Con dấu C, lề có 3 vạch/ })).toBeInTheDocument();
    expect(document.querySelectorAll('.so-tk__le .vach__net')).toHaveLength(3);
    expect(screen.getByText('Vụ 2 đang làm.')).toBeInTheDocument();
    expect(screen.queryByText(/%/)).toBeNull();
    expect(screen.queryByText('Chơi lại từ đầu')).toBeNull();
    expect(screen.getAllByRole('button').map((b) => b.textContent)).toEqual(['Chơi lại Vụ 1', 'Về màn tiêu đề']);
    await userEvent.click(screen.getByRole('button', { name: 'Chơi lại Vụ 1' }));
    expect(choiLaiVu).toHaveBeenCalledTimes(1);
    expect(choiLai).not.toHaveBeenCalled();
  });

  it('màn kết rank A: "Kết thật", dấu A, lề không vạch', () => {
    render(<KetMvp ketQua="that" chamVu={{ soVu: 1, tenVu: 'Chữ ký Hoài', ket: { rank: 'a', vach: 0, thieu: [] }, choiLai: false }} onChoiLai={vi.fn()} />);
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Kết thật');
    expect(screen.getByRole('figure', { name: /Con dấu A, lề không có vạch nào/ })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /Chơi lại Vụ/ })).toBeNull();
  });

  it('ghép mẫu: bảng có giấy nhớ giữa hai thẻ, ký tên người ghép', () => {
    const s = vanDuThe();
    render(<BangGhimMvp kb={KB} s={s} dienTen={(t) => t} ghep={{ id: 'ev-phieu-gui+ev-the-lich', the: ['ev-phieu-gui', 'ev-the-lich'], chu: 'Hoài nào học Báo chí, khóa 2024?', nguoi: 'minh-anh' }} tenNguoi={tenNguoi} />);
    const giay = screen.getByLabelText('Giấy nhớ ghép mẫu: Hoài nào học Báo chí, khóa 2024?');
    expect(giay).toHaveTextContent('— Minh Anh');
    expect(document.querySelector('.bang__chi--ghep')).not.toBeNull();
  });
});
