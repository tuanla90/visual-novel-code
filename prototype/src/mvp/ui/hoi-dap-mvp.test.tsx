/**
 * Màn hỏi nhân chứng (gói B12, HoiDapMvp + BanDiCungHoiDapMvp) chạy với máy thật trên tờ bác Thịnh của Mùa 1: ba cách chơi,
 * gõ hỏi bằng Enter, giấy nhớ và sổ "Cần làm rõ", bạn đi cùng gợi ý hai bậc, giữ lại khi rời đi, thẻ kết, hết lượt thì khóa ô
 * nhập nhưng vẫn kể nốt và rời đi được. Điện thoại dọc: CSS viết cho cả @media hẹp lẫn .game--portrait.
 */
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import { describe, expect, it } from 'vitest';
import { KICH_BAN_MUA_1 } from '../../content/generated/mua-1/kich-ban.gen';
import type { KichBanMvp, ToHoiDapMvp } from '../../content/mvp/types';
import { khungNhin, taoTrangThai, tenNguoiNoi, xuLy, type HanhDongMvp } from '../engine/may';
import type { TrangThaiMvp } from '../engine/trang-thai';
import { BanDiCungHoiDapMvp, HoiDapMvp } from './HoiDapMvp';
import { HoSoMvp } from './HoSoMvp';

const KB = KICH_BAN_MUA_1 as unknown as KichBanMvp;
const TO = KB.hoiDap!.to['n1-bac-thinh']!;
const BT = (ma: string): ToHoiDapMvp['duKien'][number] => TO.duKien.find((d) => d.ma === ma)!;

function vaoBacThinh(kb: KichBanMvp = KB): TrangThaiMvp {
  const s0 = taoTrangThai(kb, 1);
  const c = kb.chuoi.find((x) => x.id === 'n1-toa-b')!;
  const s = xuLy(kb, { ...s0, giaiDoan: 'ngay', ngay: 1, conTro: { chuoi: 'n1-toa-b', nut: c.nodes.findIndex((n) => n.type === 'explore'), boiCanh: 'truyen' } }, { type: 'sua-con-tro' });
  return xuLy(kb, s, { type: 'xem-diem', chuoi: 'n1-bac-thinh' });
}

/** Ghép hai mảnh giao diện với máy thật, như ManChoiMvp. */
function Man({ kb, s0 }: { kb: KichBanMvp; s0: TrangThaiMvp }) {
  const [s, setS] = useState(s0);
  const kn = khungNhin(kb, s);
  if (kn.kind !== 'hoi-dap') return <p data-testid="khung">{kn.kind}</p>;
  const lam = (hd: HanhDongMvp): void => setS((x) => xuLy(kb, x, hd));
  const ten = (ma: string): string => tenNguoiNoi(kb, ma, s);
  return (
    <>
      <BanDiCungHoiDapMvp kb={kb} hoiDap={kn.hoiDap} dienTen={(t) => t} tenNguoiNoi={ten} onHanhDong={lam} />
      <HoiDapMvp kb={kb} hoiDap={kn.hoiDap} dienTen={(t) => t} tenNguoiNoi={ten} tenNguoiChoi="Khôi" onHanhDong={lam} />
    </>
  );
}

const nhatKy = (): HTMLElement => screen.getByRole('log', { name: 'Nhật ký hỏi đáp' });
const cachChoi = (): HTMLElement => screen.getByRole('group', { name: 'Cách chơi' });

describe('màn hỏi nhân chứng', () => {
  it('mặc định gõ câu hỏi: Enter gửi, lời nhân chứng hiện trong nhật ký, giấy nhớ và sổ cập nhật', async () => {
    const u = userEvent.setup();
    render(<Man kb={KB} s0={vaoBacThinh()} />);
    expect(within(cachChoi()).getByRole('button', { name: 'Gõ câu hỏi' })).toHaveAttribute('aria-pressed', 'true');
    expect(within(nhatKy()).getByText(TO.moDau)).toBeInTheDocument();
    await u.type(screen.getByRole('textbox'), 'ai mở hộp{Enter}');
    expect(within(nhatKy()).getByText('ai mở hộp')).toBeInTheDocument();
    expect(within(nhatKy()).getByText(BT('mo-hop').bienThe.thang)).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toHaveValue('');
    expect(screen.getByText(BT('mo-hop').giayNho)).toBeInTheDocument();
    const so = screen.getByRole('complementary', { name: 'Sổ CLB: cần làm rõ' });
    expect(within(so).getAllByRole('listitem').length).toBeGreaterThanOrEqual(TO.danhSach.length);
  });

  it('đổi sang bấm câu hỏi giữa buổi: câu hỏi mở đứng đầu, bấm là hỏi; đổi lại gõ vẫn giữ điều đã hỏi', async () => {
    const u = userEvent.setup();
    render(<Man kb={KB} s0={vaoBacThinh()} />);
    await u.click(within(cachChoi()).getByRole('button', { name: 'Bấm câu hỏi' }));
    const nhom = screen.getByRole('group', { name: 'Câu hỏi bấm được' });
    const nut = within(nhom).getAllByRole('button');
    expect(nut[0]).toHaveTextContent(TO.lopKhac['hoi-mo'].cauHoiMau[0]!);
    await u.click(within(nhom).getByRole('button', { name: BT('mo-hop').cauHoiMau[0]! }));
    expect(screen.getByText(BT('mo-hop').giayNho)).toBeInTheDocument();
    await u.click(within(cachChoi()).getByRole('button', { name: 'Gõ câu hỏi' }));
    expect(screen.getByRole('textbox')).toBeEnabled();
    expect(screen.getByText(BT('mo-hop').giayNho)).toBeInTheDocument();
  });

  it('bạn đi cùng: bấm avatar thì gợi ý bậc 1, bấm nữa thì bậc 2 là câu hỏi bấm được; bóng thoại đóng được', async () => {
    const u = userEvent.setup();
    render(<Man kb={KB} s0={vaoBacThinh()} />);
    const ban = screen.getByRole('complementary', { name: 'Bạn đi cùng' });
    const avatar = within(ban).getAllByRole('button', { name: /^Hỏi ý / });
    expect(avatar).toHaveLength(TO.nguoiDiCung.length);
    await u.click(avatar[0]!);
    const dau = TO.danhSach[0]!.can[0]!;
    expect(within(ban).getByText(BT(dau).goiY!.bac1)).toBeInTheDocument();
    await u.click(avatar[0]!);
    expect(within(ban).getByText('Thử hỏi thế này xem.')).toBeInTheDocument();
    await u.click(within(ban).getByRole('button', { name: BT(dau).goiY!.bac2 }));
    expect(screen.getByText(BT(dau).giayNho)).toBeInTheDocument();
    await u.click(avatar[0]!);
    await u.click(within(ban).getByRole('button', { name: 'Đóng' }));
    expect(within(ban).queryByRole('status')).toBeNull();
  });

  it('rời đi khi còn dòng chưa gạch: bị giữ lại với "Hỏi tiếp" / "Vẫn đi"; vẫn đi thì thẻ kết, "Đi tiếp" đóng buổi hỏi', async () => {
    const u = userEvent.setup();
    render(<Man kb={KB} s0={vaoBacThinh()} />);
    await u.click(screen.getByRole('button', { name: TO.roiDi.nut }));
    const ban = screen.getByRole('complementary', { name: 'Bạn đi cùng' });
    expect(within(ban).getByText(TO.danhSach[0]!.cau)).toBeInTheDocument();
    await u.click(within(ban).getByRole('button', { name: 'Vẫn đi' }));
    expect(screen.queryByRole('textbox')).toBeNull();
    expect(screen.getByText(/khi đã rõ 0 trên/)).toBeInTheDocument();
    await u.click(screen.getByRole('button', { name: 'Đi tiếp' }));
    expect(screen.getByTestId('khung')).toHaveTextContent('explore');
  });

  it('"Hỏi tiếp" đóng bóng thoại, đưa tiêu điểm về ô nhập; bạn đi cùng chỉ giữ lại một lần', async () => {
    const u = userEvent.setup();
    render(<Man kb={KB} s0={vaoBacThinh()} />);
    await u.click(screen.getByRole('button', { name: TO.roiDi.nut }));
    const ban = screen.getByRole('complementary', { name: 'Bạn đi cùng' });
    await u.click(within(ban).getByRole('button', { name: 'Hỏi tiếp' }));
    expect(screen.getByRole('textbox')).toHaveFocus();
    expect(within(ban).queryByRole('button', { name: 'Vẫn đi' })).toBeNull();
    await u.click(screen.getByRole('button', { name: TO.roiDi.nut }));
    expect(screen.getByRole('button', { name: 'Đi tiếp' })).toBeInTheDocument();
  });

  it('tờ có giới hạn: hiện số câu còn lại; hết lượt thì khóa ô nhập, vẫn còn nút kể nốt và nút rời đi', async () => {
    const u = userEvent.setup();
    const to = { ...structuredClone(TO), gioiHan: { soCau: 8, lyDo: 'ban' as const, baoTruoc: { con: 2, loi: 'Bác sắp phải lên khóa phòng rồi đấy.' }, het: 'Thôi, bác đi khóa phòng đây.' } };
    const kb: KichBanMvp = { ...KB, hoiDap: { ...KB.hoiDap!, to: { ...KB.hoiDap!.to, 'n1-bac-thinh': to } } };
    let s = vaoBacThinh(kb);
    for (let i = 0; i < 8; i++) s = xuLy(kb, s, { type: 'hoi-dap-hoi', cau: 'trời hôm nay nóng quá' });
    render(<Man kb={kb} s0={s} />);
    expect(screen.getByText('Hết lượt hỏi')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeDisabled();
    expect(screen.getByRole('button', { name: TO.roiDi.nut })).toBeEnabled();
    const ke = screen.getByRole('button', { name: 'Nghe kể nốt' });
    await u.click(ke);
    expect(within(nhatKy()).getByText(BT(TO.tuDongDuKien[0]!).bienThe.thang)).toBeInTheDocument();
  });

  it('chưa hết lượt thì hiện kín đáo số câu còn hỏi được', () => {
    const to = { ...structuredClone(TO), gioiHan: { soCau: 8, lyDo: 'ban' as const, baoTruoc: { con: 2, loi: 'Bác sắp phải lên khóa phòng rồi đấy.' }, het: 'Thôi, bác đi khóa phòng đây.' } };
    const kb: KichBanMvp = { ...KB, hoiDap: { ...KB.hoiDap!, to: { ...KB.hoiDap!.to, 'n1-bac-thinh': to } } };
    render(<Man kb={kb} s0={vaoBacThinh(kb)} />);
    expect(screen.getByText('Còn 8 câu')).toBeInTheDocument();
  });
});

describe('CSS màn hỏi đáp', () => {
  const css = readFileSync(join(dirname(fileURLToPath(import.meta.url)), 'HoiDapMvp.css'), 'utf8');
  it('màn dọc viết cho cả @media hẹp lẫn .game--portrait: một cột, sổ mở bằng nút, đang gõ thì khung dời lên trên', () => {
    const media = css.slice(css.indexOf('@media (max-width: 768px)'));
    for (const chon of ['.mvp-hoidap {', '.mvp-hoidap__so {', '.mvp-hoidap:has(#mvp-hoidap-o:focus) {']) {
      expect(media).toContain(chon);
      expect(css).toContain(`.game--portrait ${chon}`);
    }
  });
  it('avatar bạn đi cùng không có hoạt cảnh', () => {
    const khoi = [...css.matchAll(/([^{}]+)\{([^{}]*)\}/g)].filter((m) => (m[1] ?? '').includes('mvp-hd-ban'));
    for (const m of khoi) expect(m[2]).not.toMatch(/animation|transition/);
  });
});

describe('hồ sơ sau buổi hỏi', () => {
  const sauKhiDi = (): TrangThaiMvp => {
    let s = xuLy(KB, vaoBacThinh(), { type: 'hoi-dap-hoi', cau: 'ai mở hộp' });
    for (const hd of [{ type: 'hoi-dap-roi-di' }, { type: 'hoi-dap-roi-di' }, { type: 'tiep' }] as const) s = xuLy(KB, s, hd);
    return s;
  };
  const ve = (s: TrangThaiMvp, tab: 'ho-so' | 'so-tay') =>
    render(<HoSoMvp kb={KB} trangThai={s} hoSo={s.hoSo} soTay={s.soTay} tenNguoiChoi="Khôi" nganh="" daGap={[]} tab={tab} onDoiTab={() => {}} dienTen={(t) => t} onDong={() => {}} />);

  it('sổ cá nhân có trang "Cần làm rõ" với các dòng còn mở khi đã rời buổi hỏi', () => {
    ve(sauKhiDi(), 'so-tay');
    expect(screen.getByText('CẦN LÀM RÕ')).toBeInTheDocument();
    expect(screen.getByText(TO.danhSach[0]!.cau)).toBeInTheDocument();
  });

  it('giấy nhớ hỏi ra nằm trên bảng điều tra như các giấy nhớ khác', () => {
    ve(sauKhiDi(), 'ho-so');
    const the = screen.getAllByRole('article').find((a) => /Lời /.test(a.getAttribute('aria-label') ?? ''));
    expect(the).toBeDefined();
  });
});
