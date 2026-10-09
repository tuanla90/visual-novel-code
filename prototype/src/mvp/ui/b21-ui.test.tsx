/**
 * Gói B21 — giao diện trên BỘ THỬ B21: màu giấy theo nguồn + tô keyword, nối note trên bảng manh mối (chạm-chạm, kéo thả, sợi rơi),
 * thẻ câu hỏi nối, chú thích màu ở chồng bảng chân lý, đối chất chỉ ô (không lộ ô đích).
 */
import { readFileSync } from 'node:fs';
import { fireEvent, render, screen, within } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { KICH_BAN_THU_B21 } from '../../content/generated/thu-b21/kich-ban.gen';
import type { KichBanMvp } from '../../content/mvp/types';
import { theCuaDongThoiGian } from '../engine/dong-thoi-gian';
import { khungNhin, taoTrangThai, xuLy, type HanhDongMvp, type KhungNhinMvp } from '../engine/may';
import type { TrangThaiMvp } from '../engine/trang-thai';
import { choiTuDong } from '../engine/tu-choi';
import { bangCuaChiO, DoiChatChiOMvp } from './DoiChatChiOMvp';
import { DongThoiGianMvp } from './DongThoiGianMvp';
import { BangGhimMvp } from './v7/BangGhimMvp';

const KB = KICH_BAN_THU_B21 as unknown as KichBanMvp;
const tuDong = (dung: (s: TrangThaiMvp, kn: KhungNhinMvp) => boolean, s0: TrangThaiMvp = taoTrangThai(KB, 1)): TrangThaiMvp => choiTuDong(KB, s0, {}, dung);
const lam = (s: TrangThaiMvp, hd: HanhDongMvp): TrangThaiMvp => xuLy(KB, s, hd);
const bamThe = (el: HTMLElement): void => {
  fireEvent.pointerDown(el, { button: 0, pointerId: 1, clientX: 50, clientY: 50 });
  fireEvent.pointerUp(el, { pointerId: 1, clientX: 52, clientY: 51 });
};
const sauPhongClb = (): TrangThaiMvp => {
  const s0 = tuDong((_s, kn) => kn.kind === 'explore' && kn.nut.id === 'c1-bd');
  return tuDong((st, kn) => kn.kind === 'explore' && !!st.khamPha && !st.khamPha.cha && kn.nut.kieu === 'ban-do', lam(s0, { type: 'xem-diem', chuoi: 'c1-phong-clb' }));
};
const toiHop = (): TrangThaiMvp => {
  let s = lam(sauPhongClb(), { type: 'noi-the', a: 'clue-the-lich', b: 'clue-bc24' });
  s = lam(s, { type: 'xong-thu-thach', thuThach: 'c-hoai-bc' });
  s = tuDong((st, kn) => st.ngay === 2 && kn.kind === 'explore', s);
  s = lam(s, { type: 'xem-diem', chuoi: 'c2-cong' });
  s = tuDong((_st, kn) => kn.kind === 'challenge', s);
  s = lam(s, { type: 'xong-thu-thach', thuThach: 'c-ra-vao' });
  s = tuDong((_st, kn) => kn.kind === 'dong-thoi-gian', s);
  for (const [o, the] of [['o1', 'ev-ra-cong'], ['o2', 'clue-loi-cuong'], ['o4', 'doc-thu']] as const) s = lam(s, { type: 'dat-the-dtg', o, the });
  return lam(s, { type: 'tiep' });
};

describe('B21 · bảng manh mối: màu giấy, keyword, hình theo loại', () => {
  it('giấy vàng cho quan sát / suy luận, hình manh mối; tài liệu trắng ngà hình sự thật; keyword tô theo loại', () => {
    const s = sauPhongClb();
    render(<BangGhimMvp kb={KB} s={s} dienTen={(t) => t} onNoi={() => undefined} />);
    const bang = screen.getByRole('region', { name: 'Bảng điều tra' });
    const the = bang.querySelector('[data-the="clue-the-lich"]') as HTMLElement;
    expect(the).toHaveClass('note-giay--vang', 'the--manh-moi');
    expect(the.querySelector('.nk--dia-diem')).toHaveTextContent('tòa B');
    expect(the.querySelector('.nk--thoi-gian')).toHaveTextContent('thứ Hai');
    const thu = bang.querySelector('[data-the="doc-thu"]') as HTMLElement;
    expect(thu).toHaveClass('note-giay--tai-lieu', 'the--su-that');
    expect(thu.querySelector('.nk--hanh-dong')).toHaveTextContent('thu hồi phòng');
  });

  it('sau khi tra: phiếu tra xanh lơ, hình sự thật', () => {
    const s = lam(sauPhongClb(), { type: 'noi-the', a: 'clue-the-lich', b: 'clue-bc24' });
    const sau = lam(s, { type: 'xong-thu-thach', thuThach: 'c-hoai-bc' });
    render(<BangGhimMvp kb={KB} s={{ ...sau, conTro: sau.conTro }} dienTen={(t) => t} />);
    const phieu = document.querySelector('[data-the="ev-hoai-bc24"]') as HTMLElement;
    expect(phieu).toHaveClass('note-giay--tra', 'the--su-that');
  });
});

describe('B21 · nối note trên bảng manh mối', () => {
  it('nút "Nối note" chỉ hiện khi đã mở cặp; chạm hai note đúng cặp → onNoi; cặp lạ → sợi chỉ rơi, không gọi', () => {
    const onNoi = vi.fn();
    const s = sauPhongClb();
    render(<BangGhimMvp kb={KB} s={s} dienTen={(t) => t} onNoi={onNoi} />);
    const nut = screen.getByRole('button', { name: 'Nối note' });
    fireEvent.click(nut);
    expect(screen.getByText('Chạm một note, rồi chạm note muốn nối với nó.')).toBeInTheDocument();
    // Cặp lạ.
    bamThe(document.querySelector('[data-the="clue-the-lich"]') as HTMLElement);
    expect(screen.getByText('Chạm note thứ hai để nối.')).toBeInTheDocument();
    bamThe(document.querySelector('[data-the="doc-thu"]') as HTMLElement);
    expect(onNoi).not.toHaveBeenCalled();
    expect(document.querySelector('path.bang__chi--roi')).not.toBeNull();
    // Cặp đúng (ngược thứ tự cũng được).
    bamThe(document.querySelector('[data-the="clue-bc24"]') as HTMLElement);
    bamThe(document.querySelector('[data-the="clue-the-lich"]') as HTMLElement);
    expect(onNoi).toHaveBeenCalledWith('clue-bc24', 'clue-the-lich');
    // Chạm vào note thì không mở hộp xem kỹ khi đang ở chế độ nối.
    expect(screen.queryByRole('dialog', { name: 'Thẻ đang xem' })).toBeNull();
  });

  it('chưa có cặp nào mở thì không có nút nối', () => {
    const s0 = tuDong((_s, kn) => kn.kind === 'explore' && kn.nut.id === 'c1-bd');
    render(<BangGhimMvp kb={KB} s={s0} dienTen={(t) => t} onNoi={() => undefined} />);
    expect(screen.queryByRole('button', { name: 'Nối note' })).toBeNull();
  });

  it('thẻ câu hỏi nối: hình riêng, nhãn đích, hai sợi chỉ nối tới thẻ; mở hộp xem có nút "Mở màn tra" khi chưa tra', () => {
    const s = lam(sauPhongClb(), { type: 'noi-the', a: 'clue-the-lich', b: 'clue-bc24' });
    // Chưa tra xong: rời màn tra về bảng.
    const dong = lam(s, { type: 'dong-tra-noi' });
    const onMoTra = vi.fn();
    render(<BangGhimMvp kb={KB} s={dong} dienTen={(t) => t} onNoi={() => undefined} onMoTra={onMoTra} />);
    const cau = document.querySelector('.the--cau') as HTMLElement;
    expect(cau).toHaveTextContent('Hoài nào học Báo chí, khóa 2024?');
    expect(cau).toHaveTextContent('→ Tra dữ liệu');
    expect(document.querySelectorAll('path.bang__chi--noi')).toHaveLength(2);
    bamThe(cau);
    const xem = screen.getByRole('dialog', { name: 'Thẻ đang xem' });
    fireEvent.click(within(xem).getByRole('button', { name: 'Mở màn tra' }));
    expect(onMoTra).toHaveBeenCalledWith('cau-hoai-nao');
  });
});

describe('B21 · bảng chân lý: chú thích màu, giấy theo nguồn', () => {
  it('chồng "Sự thật chờ đặt" có dải chú thích 3 màu; note tra xanh lơ, tài liệu trắng ngà, lời kể vàng', () => {
    let s = lam(tuDong((_st, kn) => kn.kind === 'explore' && kn.nut.id === 'c1-bd'), { type: 'xem-diem', chuoi: 'c1-phong-clb' });
    s = tuDong((st, kn) => kn.kind === 'explore' && !!st.khamPha && !st.khamPha.cha && kn.nut.kieu === 'ban-do', s);
    s = lam(s, { type: 'noi-the', a: 'clue-the-lich', b: 'clue-bc24' });
    s = lam(s, { type: 'xong-thu-thach', thuThach: 'c-hoai-bc' });
    s = tuDong((st, kn) => st.ngay === 2 && kn.kind === 'explore', s);
    s = lam(s, { type: 'xem-diem', chuoi: 'c2-cong' });
    s = tuDong((_st, kn) => kn.kind === 'challenge', s);
    s = lam(s, { type: 'xong-thu-thach', thuThach: 'c-ra-vao' });
    s = tuDong((_st, kn) => kn.kind === 'dong-thoi-gian', s);
    const kn = khungNhin(KB, s);
    if (kn.kind !== 'dong-thoi-gian') throw new Error('không tới bảng chân lý');
    render(
      <DongThoiGianMvp kb={KB} dtg={kn.dtg} the={theCuaDongThoiGian(KB, s, kn.dtg)} daDat={kn.daDat} xong={false} chiXem={false} dienThoai={false} dienTen={(t) => t} tenNguoiNoi={(m) => m} />,
    );
    const chong = screen.getByLabelText('Sự thật chờ đặt');
    expect(within(chong).getByLabelText('Màu giấy theo nguồn')).toBeInTheDocument();
    expect(chong.querySelector('[data-the="ev-ra-cong"]')).toHaveClass('note-giay--tra');
    expect(chong.querySelector('[data-the="doc-thu"]')).toHaveClass('note-giay--tai-lieu');
    expect(chong.querySelector('[data-the="clue-loi-cuong"]')).toHaveClass('note-giay--vang');
    expect(chong.querySelector('[data-the="clue-loi-cuong"] .nk--hanh-dong')).toHaveTextContent('đưa phong bì');
    expect(chong.querySelector('[data-the="clue-loi-thinh"]')).toBeNull();
  });
});

describe('B21 · đối chất chỉ ô', () => {
  const mo = (onChi: (o: string) => void, daChon: string[] = []) => {
    const s = tuDong((_st, kn) => kn.kind === 'doi-chat' && kn.nut.id === 'dc-chi-o', toiHop());
    const kn = khungNhin(KB, s);
    if (kn.kind !== 'doi-chat') throw new Error('không tới đối chất');
    render(<DoiChatChiOMvp kb={KB} s={s} nut={kn.nut} oDangChon={daChon} dienTen={(t) => t} tenNguoiNoi={(m) => m} dienThoai={false} onChi={onChi} />);
    return kn.nut;
  };

  it('bảng vẽ ở chế độ chỉ: bấm ô → onChi(<dtg>:<ô>); tiêu đề cột "?" → <dtg>:?; không đầu bảng, không chồng, không nút dưới', () => {
    const onChi = vi.fn();
    const nut = mo(onChi);
    expect(bangCuaChiO(nut)).toBe('dtg-vu1');
    expect(document.querySelector('.bcl--chi-o')).not.toBeNull();
    expect(document.querySelector('.bcl__dau')).toBeNull();
    expect(document.querySelector('.bcl__chong')).toBeNull();
    expect(document.querySelector('.bcl__chan')).toBeNull();
    fireEvent.click(document.querySelector('[data-o="o1"]') as HTMLElement);
    expect(onChi).toHaveBeenLastCalledWith('dtg-vu1:o1');
    fireEvent.click(document.querySelector('[data-o="o3"]') as HTMLElement);
    expect(onChi).toHaveBeenLastCalledWith('dtg-vu1:o3');
    fireEvent.click(document.querySelector('.bcl__cot--trong') as HTMLElement);
    expect(onChi).toHaveBeenLastCalledWith('dtg-vu1:?');
  });

  it('không làm sáng ô đích: không ô nào mang lớp "đang chỉ" trước khi người chơi chỉ; ô đã chỉ dở thì được đánh dấu', () => {
    mo(() => undefined);
    expect(document.querySelectorAll('.bcl__o.is-chi')).toHaveLength(0);
    expect(document.querySelectorAll('.bcl__o.is-chi-duoc').length).toBeGreaterThan(0);
  });

  it('CSS: lớp phủ chỉ ô tự bật pointer-events (.stage__content có none) để ô bấm được; lời người hỏi nằm TRÊN bảng', () => {
    const css = readFileSync('src/mvp/ui/note-bang.css', 'utf8');
    const khoi = (sel: string): string => new RegExp(`${sel.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*\\{([^}]*)\\}`).exec(css)?.[1] ?? '';
    expect(khoi('.doi-chat.doi-chat--chi-o')).toMatch(/pointer-events:\s*auto/);
    expect(khoi('.bcl.bcl--chi-o')).toMatch(/pointer-events:\s*auto/);
    expect(khoi('.bcl__o.is-chi-duoc,\n.bcl__cot.is-chi-duoc')).toMatch(/pointer-events:\s*auto/);
    expect(khoi('.doi-chat--chi-o .doi-chat__hop')).toMatch(/order:\s*1/);
    expect(khoi('.doi-chat--chi-o .doi-chat__bang')).toMatch(/order:\s*2/);
  });

  it('bấm ô (kể cả ô khóa sẵn) và tiêu đề cột trống bắt buộc đều ra câu trả lời', () => {
    const onChi = vi.fn();
    mo(onChi);
    for (const o of ['o1', 'o2', 'o3', 'o4']) fireEvent.click(document.querySelector(`[data-o="${o}"]`) as HTMLElement);
    fireEvent.click(document.querySelector('.bcl__cot--trong') as HTMLElement);
    expect(onChi.mock.calls.map((c) => c[0])).toEqual(['dtg-vu1:o1', 'dtg-vu1:o2', 'dtg-vu1:o3', 'dtg-vu1:o4', 'dtg-vu1:?']);
  });

  it('ô đã chỉ dở hiện đánh dấu và lời hướng dẫn đổi', () => {
    mo(() => undefined, ['dtg-vu1:o1']);
    expect(document.querySelector('[data-o="o1"]')).toHaveClass('is-chi');
    expect(screen.getByText(/Đã chỉ 1 ô/)).toBeInTheDocument();
  });
});
