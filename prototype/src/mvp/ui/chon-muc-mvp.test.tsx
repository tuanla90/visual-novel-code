/**
 * Gói B17 (docs/mua-1/brief/b17-hai-cau-hoi-dau-van.md), giao diện:
 *   - Màn hai câu hỏi (`ChonMucMvp`): đúng chữ đề bài, chọn sẵn nấc giữa / nấc đầu, mũi tên và Enter đi được, "Hủy" + Esc khi mở từ Cài đặt.
 *   - Cảnh khám phá (`KhamPhaMvp`) theo ba nấc nhập vai: dấu trên ghim / người / vật / chi tiết ẩn đúng bảng; không truyền mức (bộ MVP) = như cũ.
 *   - Thanh trên (`HudMvp`): mục "Cách chơi" chỉ có khi được truyền (bộ mùa 1).
 */
import { act, fireEvent, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { KICH_BAN_MUA_1 } from '../engine/testing/mua1-truoc-b19/kich-ban.gen';
import type { KichBanMvp, NutMvp } from '../../content/mvp/types';
import { loiVietSan } from '../engine/dong-hanh-viet-san';
import { diemDangHien, khungNhin, taoTrangThai, xuLy, type KhungNhinMvp } from '../engine/may';
import type { MucNhapVaiMvp } from '../engine/trang-thai';
import { banDangCoMat } from '../engine/tri-nho-dong-hanh';
import { choiTuDong, RE_NHANH_KET_THAT, reNhanhTheo } from '../engine/tu-choi';
import { CAU_HOI_NHAP_VAI, CAU_HOI_SQL, DONG_DOI_SAU, NAC_NHAP_VAI, NAC_SQL } from './chon-muc-chu';
import { ChonMucMvp } from './ChonMucMvp';
import { HudMvp } from './HudMvp';
import { KhamPhaMvp } from './KhamPhaMvp';
import { NhacDanMvp } from './NhacDanMvp';

const kb = KICH_BAN_MUA_1 as unknown as KichBanMvp;

describe('màn hai câu hỏi (ChonMucMvp)', () => {
  it('đúng chữ đề bài; chọn sẵn "Tự dò" và "Ghép khối"; dòng nhỏ và nút "Bắt đầu"', () => {
    render(<ChonMucMvp nhapVai="tu-do" sql="ghep" onXong={vi.fn()} />);
    expect(screen.getByRole('heading', { name: CAU_HOI_NHAP_VAI })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: CAU_HOI_SQL })).toBeInTheDocument();
    expect(CAU_HOI_NHAP_VAI).toBe('Cậu muốn nhập vai thám tử tới mức nào?');
    expect(CAU_HOI_SQL).toBe('Cậu muốn tra dữ liệu tới mức nào?');
    expect(NAC_NHAP_VAI.map((n) => n.ten)).toEqual(['Có người dẫn', 'Tự dò', 'Như thật']);
    expect(NAC_SQL.map((n) => n.ten)).toEqual(['Ghép khối', 'Ghép khối, chữ SQL', 'Tự viết']);
    expect(NAC_NHAP_VAI[0]!.moTa).toBe('Chỗ cần xem có dấu, kể cả chi tiết nhỏ. Hỏi chuyện thì nhân chứng tự kể, cậu ngồi nghe.');
    expect(NAC_NHAP_VAI[1]!.moTa).toBe('Trên bản đồ có dấu, vào trong thì không. Hỏi chuyện bằng cách chọn câu hỏi.');
    expect(NAC_NHAP_VAI[2]!.moTa).toBe('Không dấu nào cả. Muốn biết gì phải tự hỏi bằng lời của mình.');
    expect(NAC_SQL[0]!.moTa).toBe('Ghép câu tra bằng các ô chữ tiếng Việt. Chưa cần biết gì về SQL.');
    expect(NAC_SQL[1]!.moTa).toBe('Vẫn ghép ô, nhưng các ô mang đúng từ của SQL: SELECT, WHERE, LIKE…');
    expect(NAC_SQL[2]!.moTa).toBe('Gõ thẳng câu SQL. Có bảng để xem cột, có bạn đi cùng để hỏi.');
    for (const n of [...NAC_NHAP_VAI, ...NAC_SQL]) {
      expect(screen.getByText(n.moTa)).toBeInTheDocument();
      expect(`${n.ten} ${n.moTa}`).not.toMatch(/—|→/);
    }
    const q1 = screen.getByRole('radiogroup', { name: CAU_HOI_NHAP_VAI });
    const q2 = screen.getByRole('radiogroup', { name: CAU_HOI_SQL });
    expect(within(q1).getByRole('radio', { name: 'Tự dò' })).toHaveAttribute('aria-checked', 'true');
    expect(within(q2).getByRole('radio', { name: 'Ghép khối' })).toHaveAttribute('aria-checked', 'true');
    expect(screen.getByText(DONG_DOI_SAU)).toBeInTheDocument();
    expect(DONG_DOI_SAU).toBe('Đổi lúc nào cũng được, trong Cài đặt.');
    expect(screen.getByRole('button', { name: 'Bắt đầu' })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Hủy' })).toBeNull();
    // Tiêu điểm nằm ở nấc đang chọn của câu 1.
    expect(within(q1).getByRole('radio', { name: 'Tự dò' })).toHaveFocus();
  });

  it('bàn phím: mũi tên đổi nấc trong câu đang đứng, Tab sang câu kia, Enter là Bắt đầu', async () => {
    const u = userEvent.setup();
    const onXong = vi.fn();
    render(<ChonMucMvp nhapVai="tu-do" sql="ghep" onXong={onXong} />);
    const q1 = screen.getByRole('radiogroup', { name: CAU_HOI_NHAP_VAI });
    const q2 = screen.getByRole('radiogroup', { name: CAU_HOI_SQL });
    await u.keyboard('{ArrowRight}');
    expect(within(q1).getByRole('radio', { name: 'Như thật' })).toHaveAttribute('aria-checked', 'true');
    await u.keyboard('{ArrowRight}');
    expect(within(q1).getByRole('radio', { name: 'Có người dẫn' })).toHaveAttribute('aria-checked', 'true');
    await u.keyboard('{ArrowLeft}');
    expect(within(q1).getByRole('radio', { name: 'Như thật' })).toHaveAttribute('aria-checked', 'true');
    await u.tab();
    expect(within(q2).getByRole('radio', { name: 'Ghép khối' })).toHaveFocus();
    await u.keyboard('{ArrowDown}');
    expect(within(q2).getByRole('radio', { name: 'Ghép khối, chữ SQL' })).toHaveAttribute('aria-checked', 'true');
    await u.keyboard('{Enter}');
    expect(onXong).toHaveBeenCalledWith('that', 'ghep-sql');
  });

  it('bấm thẻ rồi "Bắt đầu" trả đúng hai mức; mở từ Cài đặt có "Hủy", Esc đóng, nhãn nút đổi được', async () => {
    const u = userEvent.setup();
    const onXong = vi.fn();
    const onDong = vi.fn();
    render(<ChonMucMvp nhapVai="dan" sql="tu-viet" nhanNut="Áp dụng" onDong={onDong} onXong={onXong} />);
    expect(screen.getByRole('radio', { name: 'Có người dẫn' })).toHaveAttribute('aria-checked', 'true');
    expect(screen.getByRole('radio', { name: 'Tự viết' })).toHaveAttribute('aria-checked', 'true');
    await u.click(screen.getByRole('radio', { name: 'Như thật' }));
    await u.click(screen.getByRole('radio', { name: 'Ghép khối, chữ SQL' }));
    await u.click(screen.getByRole('button', { name: 'Áp dụng' }));
    expect(onXong).toHaveBeenCalledWith('that', 'ghep-sql');
    await u.click(screen.getByRole('button', { name: 'Hủy' }));
    expect(onDong).toHaveBeenCalledTimes(1);
    await u.keyboard('{Escape}');
    expect(onDong).toHaveBeenCalledTimes(2);
  });
});

/** Cảnh thử: vật có dấu !, vật thường, chi tiết ẩn có dấu !, người có dấu ?; bản đồ: ghim ! và ghim đã ghé xem hết. */
const CANH: Extract<NutMvp, { type: 'explore' }> = {
  type: 'explore',
  id: 'kp-thu',
  diem: [
    { sprite: 'obj-thong-bao-thang-may', x: 10, y: 40, rong: 5, chuoi: 'c-vat-dau', sau: [], nhan: 'Tờ giấy', dau: 'chinh' },
    { sprite: 'obj-so-do-ktx', x: 40, y: 40, rong: 8, chuoi: 'c-vat-thuong', sau: [], nhan: 'Bảng tin' },
    { sprite: 'vung:lung-ao-xanh', x: 85, y: 44, rong: 9, chuoi: 'c-an', sau: [], nhan: 'Tấm lưng áo xanh', dau: 'chinh' },
    { sprite: 'nv:bac-tu', x: 65, y: 100, rong: 15, chuoi: 'c-nguoi', sau: [], nhan: 'Bác bảo vệ: hỏi chuyện', dau: 'phu' },
  ],
};
const BAN_DO: Extract<NutMvp, { type: 'explore' }> = {
  type: 'explore',
  id: 'kp-bd-thu',
  kieu: 'ban-do',
  diem: [
    { sprite: 'ghim:toa-hanh-chinh', x: 21, y: 54, rong: 5, chuoi: 'g-chinh', sau: [], nhan: 'Phòng Đào tạo', dau: 'chinh' },
    { sprite: 'ghim:toa-b', x: 48, y: 29, rong: 5, chuoi: 'g-phu', sau: [], nhan: 'Sảnh tòa B', dau: 'phu' },
  ],
};
const nut = (chuoi: string): HTMLElement => document.querySelector<HTMLElement>(`[data-diem="${chuoi}"]`)!;
const veCanh = (muc?: MucNhapVaiMvp) => render(<KhamPhaMvp kb={kb} id={CANH.id} canh="sanh-ktx" diem={diemDangHien(CANH, [])} onXem={vi.fn()} {...(muc ? { mucNhapVai: muc } : {})} />);
const veBanDo = (muc?: MucNhapVaiMvp) =>
  render(<KhamPhaMvp kb={kb} id={BAN_DO.id} canh="ban-do" kieu="ban-do" diem={[...diemDangHien(BAN_DO, ['g-phu']).map((d) => (d.daXem ? { ...d, vaoLai: true, xemHet: true } : d))]} onXem={vi.fn()} {...(muc ? { mucNhapVai: muc } : {})} />);

describe('dấu ở cảnh khám phá theo mức nhập vai', () => {
  it('"Có người dẫn": dấu ! / ? giữ nguyên, mọi vật bấm được có một chấm nhỏ tĩnh, kể cả chi tiết ẩn', () => {
    veCanh('dan');
    const goc = screen.getByRole('region', { name: /^Khám phá/ });
    expect(goc).toHaveClass('mvp-khampha--cham');
    expect(goc).not.toHaveClass('mvp-khampha--khong-dau-vat');
    expect(nut('c-vat-dau').querySelector('.mvp-dau--chinh')).not.toBeNull();
    expect(nut('c-vat-thuong').querySelector('.mvp-diem__cham')).not.toBeNull();
    expect(nut('c-an')).toHaveClass('is-co-dau');
    expect(nut('c-an').querySelector('.mvp-dau--chinh')).not.toBeNull();
    expect(nut('c-an').querySelector('.mvp-an__cham')).not.toBeNull();
    expect(nut('c-nguoi').querySelector('.mvp-dau--phu')).not.toBeNull();
    expect(nut('c-vat-dau')).toHaveAccessibleName('Tờ giấy (việc chính)');
  });

  it('"Tự dò": người còn dấu, vật và chi tiết ẩn không dấu, không chấm', () => {
    veCanh('tu-do');
    const goc = screen.getByRole('region', { name: /^Khám phá/ });
    expect(goc).toHaveClass('mvp-khampha--khong-dau-vat');
    expect(nut('c-vat-dau').querySelector('.mvp-dau')).toBeNull();
    expect(nut('c-vat-thuong').querySelector('.mvp-diem__cham')).toBeNull();
    expect(nut('c-an')).not.toHaveClass('is-co-dau');
    expect(nut('c-an').querySelector('.mvp-dau')).toBeNull();
    expect(nut('c-an').querySelector('.mvp-an__cham')).toBeNull();
    expect(nut('c-nguoi').querySelector('.mvp-dau--phu')).not.toBeNull();
    expect(nut('c-vat-dau')).toHaveAccessibleName('Tờ giấy');
    // Vẫn bấm được hết.
    for (const c of ['c-vat-dau', 'c-vat-thuong', 'c-an', 'c-nguoi']) expect(nut(c)).toBeEnabled();
  });

  it('"Như thật": không dấu nào cả, người cũng không; mọi chỗ vẫn bấm được', () => {
    veCanh('that');
    expect(document.querySelectorAll('.mvp-dau')).toHaveLength(0);
    expect(document.querySelectorAll('.mvp-diem__cham, .mvp-an__cham')).toHaveLength(0);
    for (const c of ['c-vat-dau', 'c-vat-thuong', 'c-an', 'c-nguoi']) expect(nut(c)).toBeEnabled();
  });

  it('không truyền mức (bộ MVP): như cũ — dấu đủ, chấm nháy của vật thường, không chấm trên chi tiết ẩn', () => {
    veCanh();
    const goc = screen.getByRole('region', { name: /^Khám phá/ });
    expect(goc).not.toHaveClass('mvp-khampha--cham');
    expect(goc).not.toHaveClass('mvp-khampha--khong-dau-vat');
    expect(nut('c-vat-dau').querySelector('.mvp-dau--chinh')).not.toBeNull();
    expect(nut('c-vat-thuong').querySelector('.mvp-diem__cham')).not.toBeNull();
    expect(nut('c-an')).toHaveClass('is-co-dau');
    expect(nut('c-an').querySelector('.mvp-an__cham')).toBeNull();
  });

  it('ghim bản đồ: dẫn và tự dò có dấu ! / ?; như thật không dấu, ghim vẫn bấm được, ghim đã ghé vẫn đổi trạng thái (dấu tích)', () => {
    for (const muc of ['dan', 'tu-do'] as const) {
      const { unmount } = veBanDo(muc);
      expect(nut('g-chinh')).toHaveClass('is-chinh');
      expect(nut('g-chinh').querySelector('.mvp-dau--chinh')).not.toBeNull();
      expect(nut('g-chinh')).toHaveAccessibleName(/\(việc chính\)/);
      unmount();
    }
    veBanDo('that');
    expect(nut('g-chinh')).not.toHaveClass('is-chinh');
    expect(nut('g-chinh').querySelector('.mvp-dau--chinh')).toBeNull();
    expect(nut('g-chinh')).toBeEnabled();
    expect(nut('g-chinh')).toHaveAccessibleName('Phòng Đào tạo');
    expect(nut('g-phu')).toHaveClass('is-xong');
    expect(nut('g-phu').querySelector('.mvp-dau--het')).not.toBeNull();
    expect(nut('g-phu')).toBeEnabled();
  });
});

describe('menu Cài đặt (HudMvp): mục "Cách chơi"', () => {
  const s = taoTrangThai(kb, 1);
  const ve = (onMoCachChoi?: () => void) =>
    render(
      <HudMvp
        kb={kb}
        s={s}
        soHoSo={0}
        soTrangSo={0}
        onMoHoSo={vi.fn()}
        onMoSoTay={vi.fn()}
        onMoLuu={vi.fn()}
        onMoNap={vi.fn()}
        onMoLichSu={vi.fn()}
        onMoCaiDat={vi.fn()}
        onBatDauLai={vi.fn()}
        {...(onMoCachChoi ? { onMoCachChoi } : {})}
      />,
    );

  it('có mục "Cách chơi" ngay trên "Cài đặt" khi được truyền (bộ mùa 1); bấm thì gọi, menu đóng', async () => {
    const u = userEvent.setup();
    const mo = vi.fn();
    ve(mo);
    await u.click(screen.getByRole('button', { name: 'Mở menu tạm dừng' }));
    const menu = screen.getByRole('menu', { name: 'Menu tạm dừng' });
    const muc = within(menu).getAllByRole('menuitem').map((m) => m.textContent);
    expect(muc.indexOf('Cách chơi')).toBe(muc.indexOf('Cài đặt (tốc độ chữ, âm thanh)') - 1);
    await u.click(within(menu).getByRole('menuitem', { name: 'Cách chơi' }));
    expect(mo).toHaveBeenCalledTimes(1);
    expect(screen.queryByRole('menu')).toBeNull();
  });

  it('không truyền (bộ MVP): không có mục', async () => {
    const u = userEvent.setup();
    ve();
    await u.click(screen.getByRole('button', { name: 'Mở menu tạm dừng' }));
    expect(within(screen.getByRole('menu', { name: 'Menu tạm dừng' })).queryByRole('menuitem', { name: 'Cách chơi' })).toBeNull();
  });
});

describe('"Có người dẫn": bạn đi cùng tự nhắc sau 40 giây không bấm gì ở cảnh có việc chính (NhacDanMvp)', () => {
  afterEach(() => vi.useRealTimers());
  /** Tới cảnh khám phá ngày 1 (sảnh tòa B) với lời nhắc việc đang treo. */
  const toiCanh = (muc: MucNhapVaiMvp) => {
    const dau = xuLy(kb, taoTrangThai(kb, 1), { type: 'doi-muc', nhapVai: muc });
    const s = choiTuDong(kb, dau, { ten: 'Nam', reNhanh: reNhanhTheo(RE_NHANH_KET_THAT) }, (x, kn) => kn.kind === 'explore' && !kn.nut.kieu && !!x.nhacViec && banDangCoMat(kb, x).length > 0 && kn.diem.some((d) => d.diem.dau === 'chinh' && !d.daXem), 20000);
    const kn = khungNhin(kb, s) as Extract<KhungNhinMvp, { kind: 'explore' }>;
    return { s, kn };
  };

  it('"dẫn": 40 giây sau hiện bóng thoại của bạn đang có mặt với lời nhắc việc; bấm gì đó thì đếm lại; Đóng rồi không hiện lại', () => {
    vi.useFakeTimers();
    const { s, kn } = toiCanh('dan');
    render(<NhacDanMvp kb={kb} s={s} kn={kn} />);
    expect(screen.queryByRole('status')).toBeNull();
    act(() => vi.advanceTimersByTime(30_000));
    fireEvent.pointerDown(window);
    act(() => vi.advanceTimersByTime(30_000));
    expect(screen.queryByRole('status')).toBeNull();
    act(() => vi.advanceTimersByTime(10_000));
    const bong = screen.getByRole('status');
    const ban = banDangCoMat(kb, s)[0]!;
    expect(bong).toHaveAttribute('data-nhan-vat', ban);
    expect(bong).toHaveTextContent(loiVietSan(kb, s, kb.hoiDap!.dongHanh!.loi[ban]!, 'goi-y'));
    fireEvent.click(within(bong).getByRole('button', { name: 'Đóng' }));
    expect(screen.queryByRole('status')).toBeNull();
    act(() => vi.advanceTimersByTime(90_000));
    expect(screen.queryByRole('status')).toBeNull();
  });

  it('"tự dò" / "như thật": không bao giờ tự nhắc', () => {
    vi.useFakeTimers();
    for (const muc of ['tu-do', 'that'] as const) {
      const { s, kn } = toiCanh(muc);
      const { unmount } = render(<NhacDanMvp kb={kb} s={s} kn={kn} />);
      act(() => vi.advanceTimersByTime(120_000));
      expect(screen.queryByRole('status')).toBeNull();
      unmount();
    }
  });
});
