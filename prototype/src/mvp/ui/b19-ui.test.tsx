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
import { KhamPhaMvp } from './KhamPhaMvp';
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

function veDtg(o: { dienThoai?: boolean; daDat?: Record<string, string>; chiXem?: boolean; xong?: boolean } = {}) {
  const onDat = vi.fn();
  const onGo = vi.fn();
  const onTiep = vi.fn();
  const s = vanDuThe();
  if (!DTG) throw new Error('thiếu dtg-vu1');
  render(
    <DongThoiGianMvp
      kb={KB}
      dtg={DTG}
      the={theCuaDongThoiGian(KB, s, DTG)}
      daDat={o.daDat ?? {}}
      xong={o.xong ?? false}
      chiXem={o.chiXem ?? false}
      docTungO={o.chiXem ?? false}
      dienThoai={o.dienThoai ?? false}
      dienTen={(t) => t}
      tenNguoiNoi={tenNguoi}
      onDat={onDat}
      onGo={onGo}
      onTiep={onTiep}
    />,
  );
  return { onDat, onGo, onTiep };
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

const DAT_DUNG = { o1: 'clue-ra-cong', o2: 'clue-loi-chu-cuong', o4: 'ev-phieu-gui', o5: 'clue-loi-co-lan' };

describe('B19 · màn bảng chân lý', () => {
  it('vẽ ma trận: 3 cột người (cột "?" gạch chéo), 5 dòng giờ theo thứ tự xuất hiện, ô không khai thì trống mờ', () => {
    veDtg();
    expect([...document.querySelectorAll('.bcl__cot')].map((c) => c.querySelector('.bcl__cot-ten')?.textContent)).toEqual(['Hoài', '?', 'Bác Thịnh']);
    expect(document.querySelectorAll('.bcl__cot--trong')).toHaveLength(1);
    expect(document.querySelector('.bcl__cot--trong')).toHaveTextContent('là ai? để trống');
    expect([...document.querySelectorAll('.bcl__gio')].map((g) => g.textContent)).toEqual(['6:44', '~6:50', '7:00', 'trước 9:00', '9:00']);
    expect(document.querySelectorAll('[data-o]')).toHaveLength(5);
    expect(document.querySelectorAll('.bcl__o--mo')).toHaveLength(10);
    // Ô khai theo (cột, dòng): o2 ở cột "?" dòng 2; o5 ở cột Bác Thịnh dòng 5.
    const luoi = document.querySelector('.bcl__luoi') as HTMLElement;
    expect(luoi.style.getPropertyValue('--n-cot')).toBe('3');
    expect(luoi.style.getPropertyValue('--n-hang')).toBe('5');
    const hang = [...document.querySelectorAll('.bcl__hang')];
    expect(hang[1]?.querySelectorAll('.bcl__o-vo')[1]?.querySelector('[data-o="o2"]')).not.toBeNull();
    expect(hang[4]?.querySelectorAll('.bcl__o-vo')[2]?.querySelector('[data-o="o5"]')).not.toBeNull();
    expect(within(o('o3')).getByText('bác Thịnh mở sảnh')).toBeInTheDocument();
    expect(screen.getByRole('complementary', { name: 'Sự thật chờ đặt' })).toBeInTheDocument();
  });

  it('kéo thả tự do: thả đúng hay sai đều báo máy, không hiện câu đúng sai; chưa đủ ô thì "Tiếp tục" tắt', () => {
    const { onDat } = veDtg();
    keoTha('clue-ra-cong', o('o1'));
    expect(onDat).toHaveBeenLastCalledWith('o1', 'clue-ra-cong');
    keoTha('ev-the-lich', o('o4'));
    expect(onDat).toHaveBeenLastCalledWith('o4', 'ev-the-lich');
    expect(screen.queryByRole('status')).toBeNull();
    expect(screen.getByRole('button', { name: 'Tiếp tục' })).toBeDisabled();
  });

  it('tiêu đề cột "?" (trống bắt buộc): thả note vào là bật về ngay kèm câu riêng, không báo máy', () => {
    const { onDat } = veDtg();
    const tieuDe = document.querySelector('[data-cot="?"]') as HTMLElement;
    expect(within(tieuDe).getByText('là ai? để trống')).toBeInTheDocument();
    keoTha('clue-loi-chu-cuong', tieuDe);
    expect(onDat).not.toHaveBeenCalled();
    expect(screen.getByRole('status')).toHaveTextContent('Chưa ai biết người ấy. Cứ để trống.');
    expect(screen.getByRole('status')).toHaveTextContent('Hà Vy');
    expect(document.querySelector('[data-the="clue-loi-chu-cuong"]')).toHaveClass('is-bat-ve');
  });

  it('chạm note rồi chạm ô để đặt; chạm note trong ô để gỡ về chồng (bàn phím, không kéo)', async () => {
    const { onDat, onGo } = veDtg({ daDat: { o1: 'clue-ra-cong' } });
    const u = userEvent.setup();
    // Note đã đặt rời chồng.
    expect(screen.getByRole('complementary', { name: 'Sự thật chờ đặt' }).querySelector('[data-the="clue-ra-cong"]')).toBeNull();
    await u.click(screen.getByRole('button', { name: /Có người đưa phong bì cho Hoài ở cổng/ }));
    await u.click(within(o('o2')).getByRole('button', { name: /^Ô 2: còn trống/ }));
    expect(onDat).toHaveBeenCalledWith('o2', 'clue-loi-chu-cuong');
    await u.click(within(o('o1')).getByRole('button', { name: /^Ô 1: Hoài ra cổng lúc 6:44/ }));
    expect(onGo).toHaveBeenCalledWith('o1');
  });

  it('"Xong" chỉ sáng khi mọi ô phải đặt đã có note; ô sai: bấm Xong nói câu "Kéo sai" của ô sai đầu tiên rồi báo máy', async () => {
    const { onTiep } = veDtg({ daDat: { ...DAT_DUNG, o4: 'ev-the-lich', o5: 'ev-phieu-gui' }, xong: true });
    const u = userEvent.setup();
    expect(screen.queryByRole('button', { name: 'Tiếp tục' })).toBeNull();
    await u.click(screen.getByRole('button', { name: 'Xong' }));
    expect(screen.getByRole('status')).toHaveTextContent('Thẻ này nói chuyện ở chỗ khác.');
    expect(onTiep).toHaveBeenCalledTimes(1);
  });

  it('đúng hết: bấm "Xong" không nói gì, báo máy đi tiếp', async () => {
    const { onTiep } = veDtg({ daDat: DAT_DUNG, xong: true });
    await userEvent.click(screen.getByRole('button', { name: 'Xong' }));
    expect(screen.queryByRole('status')).toBeNull();
    expect(onTiep).toHaveBeenCalledTimes(1);
  });

  it('điện thoại: hướng dẫn chạm; chạm note rồi chạm ô vẫn đặt được, không có hộp chọn thẻ', async () => {
    const { onDat } = veDtg({ dienThoai: true });
    const u = userEvent.setup();
    expect(document.querySelector('.bcl__huong-dan')).toHaveTextContent('Chạm note rồi chạm ô để đặt');
    await u.click(screen.getByRole('button', { name: /Phiếu gửi do người nộp ký/ }));
    await u.click(within(o('o5')).getByRole('button', { name: /^Ô 5: còn trống/ }));
    expect(onDat).toHaveBeenCalledWith('o5', 'clue-loi-co-lan');
    expect(screen.queryByRole('dialog')).toBeNull();
  });

  it('xem lại ở buổi họp: không chồng note, đọc từng ô rồi mới "Tiếp tục"', async () => {
    const { onTiep } = veDtg({ chiXem: true, daDat: DAT_DUNG });
    const u = userEvent.setup();
    expect(screen.queryByRole('complementary')).toBeNull();
    expect(within(o('o1')).getByText('Hoài ra cổng lúc 6:44', { selector: '.bcl__note-chu' })).toBeInTheDocument();
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

describe('B19 · khám phá kiểu dàn', () => {
  it('chân dung đứng trên dàn, nhãn dưới chân, dấu ! / ?; bấm người thì báo máy; người đã xem thì mờ, không bấm lại', async () => {
    const kp = KB.chuoi.find((c) => c.id === 'md-00')?.nodes.find((n) => n.type === 'explore');
    if (kp?.type !== 'explore') throw new Error('thiếu màn dàn');
    const onXem = vi.fn();
    render(<KhamPhaMvp kb={KB} id={kp.id} canh="san-ktx-trung-thu" kieu="dan" diem={kp.diem.map((d, i) => ({ diem: d, daXem: i === 1 }))} onXem={onXem} />);
    const nguoi = document.querySelectorAll('.mvp-dan__nguoi');
    expect(nguoi).toHaveLength(3);
    expect([...nguoi].map((n) => n.querySelector('.mvp-dan__ten')?.textContent)).toEqual(['Minh Anh', 'Hà Vy', 'Tùng']);
    expect(document.querySelectorAll('.mvp-dan__anh')).toHaveLength(3);
    expect(nguoi[0]?.querySelector('.mvp-dau--chinh')?.textContent).toBe('!');
    expect(nguoi[2]?.querySelector('.mvp-dau--phu')?.textContent).toBe('?');
    expect(nguoi[1]).toBeDisabled();
    await userEvent.click(screen.getByRole('button', { name: /^Minh Anh/ }));
    expect(onXem).toHaveBeenCalledWith('tt-minh-anh');
    expect(screen.queryByText('Vuốt ngang để xem cả cảnh')).toBeNull();
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
