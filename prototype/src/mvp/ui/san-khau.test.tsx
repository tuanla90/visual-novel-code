/**
 * Sân khấu MVP: nhân vật chính (`player`) lên dàn chân dung khi nói (user yêu cầu 29/09), dùng ảnh đã tách nền
 * `char-nguoi-choi`, nhãn là tên người chơi; người kể (`narrator`) thì không.
 */
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { KICH_BAN_MVP } from '../../content/generated/mvp/kich-ban.gen';
import type { KichBanMvp } from '../../content/mvp/types';
import { nguoiThamGia, SanKhauMvp, viTriHangSau } from './SanKhauMvp';

const kb = KICH_BAN_MVP as unknown as KichBanMvp;

describe('SanKhauMvp — nhân vật chính lên hình khi nói', () => {
  it('player nói → có chân dung mang tên người chơi, ảnh char-nguoi-choi, đang nói', () => {
    render(<SanKhauMvp kb={kb} canh="cong-truong" speaker="player" tenNguoiChoi="An" />);
    const cd = screen.getByRole('img', { name: 'An' });
    expect(cd.getAttribute('data-art-source')).toBe('image');
    expect(cd.querySelector('img')?.getAttribute('src') ?? '').toContain('char-nguoi-choi');
    expect(cd.closest('.cast-member')?.getAttribute('data-speaking')).toBe('true');
  });

  it('chưa có tên → nhãn "Bạn"', () => {
    render(<SanKhauMvp kb={kb} canh="cong-truong" speaker="player" />);
    expect(screen.getByRole('img', { name: 'Bạn' })).toBeInTheDocument();
  });

  it('người kể nói → không ai lên dàn', () => {
    const { container } = render(<SanKhauMvp kb={kb} canh="cong-truong" speaker="narrator" />);
    expect(container.querySelectorAll('.cast-member')).toHaveLength(0);
  });
});

describe('SanKhauMvp — biểu cảm riêng của MVP', () => {
  const anhCua = (container: HTMLElement): string => container.querySelector('.cast-member img')?.getAttribute('src') ?? '';

  it('Tùng worried (ngoài danh sách prototype) → ảnh char-tung-worried, không phải ảnh neo', () => {
    const { container } = render(<SanKhauMvp kb={kb} canh="cong-truong" speaker="tung" expression="worried" />);
    expect(anhCua(container)).toContain('char-tung-worried');
  });

  it('Minh Anh serious, bác Thịnh smile → ảnh MVP riêng', () => {
    const a = render(<SanKhauMvp kb={kb} canh="cong-truong" speaker="minh-anh" expression="serious" />);
    expect(anhCua(a.container)).toContain('char-minh-anh-serious');
    a.unmount();
    const b = render(<SanKhauMvp kb={kb} canh="cong-truong" speaker="bac-tu" expression="smile" />);
    expect(anhCua(b.container)).toContain('char-bac-tu-smile');
  });

  it('biểu cảm prototype đã biết (Hà Vy thinking) → vẫn đi qua Portrait của prototype', () => {
    const { container } = render(<SanKhauMvp kb={kb} canh="cong-truong" speaker="ha-vy" expression="thinking" />);
    expect(container.querySelector('.mvp-portrait')).toBeNull();
    expect(container.querySelector('.cast-member .portrait')).not.toBeNull();
  });
});

describe('SanKhauMvp — tối đa 3 người hàng trước', () => {
  // Gói B18: người rời hàng trước lùi xuống hàng sau (data-hang="sau"), nên ở đây chỉ đếm hàng trước.
  const dan = (container: HTMLElement): string[] => [...container.querySelectorAll('.cast-member[data-hang="truoc"]')].map((e) => e.getAttribute('data-nhan-vat') ?? '');

  it('người thứ tư nói → người nói lâu nhất trước đó rời hàng trước, người đang nói ở lại, người mới đứng vào chỗ trống', () => {
    const { container, rerender } = render(<SanKhauMvp kb={kb} canh="cong-truong" speaker="tung" />);
    rerender(<SanKhauMvp kb={kb} canh="cong-truong" speaker="minh-anh" />);
    rerender(<SanKhauMvp kb={kb} canh="cong-truong" speaker="ha-vy" />);
    // Tùng nói lại → người nói lâu nhất trước đó giờ là Minh Anh.
    rerender(<SanKhauMvp kb={kb} canh="cong-truong" speaker="tung" />);
    rerender(<SanKhauMvp kb={kb} canh="cong-truong" speaker="narrator" />);
    expect(dan(container)).toEqual(['tung', 'minh-anh', 'ha-vy']);
    rerender(<SanKhauMvp kb={kb} canh="cong-truong" speaker="quan" />);
    expect(dan(container)).toEqual(['tung', 'quan', 'ha-vy']);
    expect(container.querySelector('.stage__portraits')?.getAttribute('data-so-nguoi')).toBe('3');
    expect(container.querySelector('[data-nhan-vat="quan"]')?.getAttribute('data-speaking')).toBe('true');
    // Người chơi nói → Hà Vy (nói lâu nhất trước đó: Hà Vy < Tùng < Quân) rời dàn.
    rerender(<SanKhauMvp kb={kb} canh="cong-truong" speaker="player" />);
    expect(dan(container)).toEqual(['tung', 'quan', 'player']);
  });

  it('đổi cảnh → dàn trống lại', () => {
    const { container, rerender } = render(<SanKhauMvp kb={kb} canh="cong-truong" speaker="tung" />);
    rerender(<SanKhauMvp kb={kb} canh="phong-clb" speaker="minh-anh" />);
    expect(dan(container)).toEqual(['minh-anh']);
  });
});

describe('SanKhauMvp — hai hàng chân dung (gói B18)', () => {
  const hang = (container: HTMLElement, h: 'truoc' | 'sau'): string[] => [...container.querySelectorAll(`.cast-member[data-hang="${h}"]`)].map((e) => e.getAttribute('data-nhan-vat') ?? '');
  const noiLanLuot = (ten: string[]) => {
    const kq = render(<SanKhauMvp kb={kb} canh="cong-truong" speaker={ten[0]} />);
    for (const t of ten.slice(1)) kq.rerender(<SanKhauMvp kb={kb} canh="cong-truong" speaker={t} />);
    return kq;
  };

  it('người thứ tư nói → người nói lâu nhất lùi hàng sau chứ không mất; hàng sau không nhép môi, không sáng', () => {
    const { container } = noiLanLuot(['tung', 'minh-anh', 'ha-vy', 'quan']);
    expect(hang(container, 'truoc')).toEqual(['quan', 'minh-anh', 'ha-vy']);
    expect(hang(container, 'sau')).toEqual(['tung']);
    const sau = container.querySelector('.cast-member[data-hang="sau"]');
    expect(sau?.getAttribute('data-speaking')).toBe('false');
    expect(sau).toHaveClass('cast-member--idle');
    expect(sau).toHaveClass('cast-member--hang-sau');
    expect(container.querySelector('.stage__portraits')?.getAttribute('data-so-nguoi')).toBe('3');
    expect(container.querySelector('.stage__portraits')?.getAttribute('data-so-hang-sau')).toBe('1');
  });

  it('người hàng sau nói lại → lên hàng trước, đẩy người nói lâu nhất của hàng trước xuống', () => {
    const { container, rerender } = noiLanLuot(['tung', 'minh-anh', 'ha-vy', 'quan']);
    rerender(<SanKhauMvp kb={kb} canh="cong-truong" speaker="tung" />);
    // Minh Anh nói lâu nhất trong hàng trước (Minh Anh < Hà Vy < Quân) → lùi; Tùng đứng vào chỗ đó.
    expect(hang(container, 'truoc')).toEqual(['quan', 'tung', 'ha-vy']);
    expect(hang(container, 'sau')).toEqual(['minh-anh']);
    expect(container.querySelector('[data-nhan-vat="tung"]')?.getAttribute('data-speaking')).toBe('true');
  });

  it('hàng sau tối đa 3: dư thì người xuống lâu nhất rời hẳn', () => {
    const { container } = noiLanLuot(['tung', 'minh-anh', 'ha-vy', 'quan', 'duy', 'hoai', 'bac-tu']);
    // Người mới đứng vào đúng chỗ người vừa lùi (không xê dịch người khác): Quân thế Tùng, Duy thế Minh Anh, Hoài thế Hà Vy, bác Thịnh thế Quân.
    expect(hang(container, 'truoc')).toEqual(['bac-tu', 'duy', 'hoai']);
    expect(hang(container, 'sau')).toEqual(['minh-anh', 'ha-vy', 'quan']);
    expect(container.querySelector('[data-nhan-vat="tung"]')).toBeNull();
  });

  it('thamGia: người đang trên dàn mà không có lời trong chuỗi mới thì lùi hàng sau', () => {
    const { container, rerender } = render(<SanKhauMvp kb={kb} canh="cong-truong" speaker="tung" thamGia={['tung', 'ha-vy', 'player']} />);
    rerender(<SanKhauMvp kb={kb} canh="cong-truong" speaker="ha-vy" thamGia={['tung', 'ha-vy', 'player']} />);
    expect(hang(container, 'truoc')).toEqual(['tung', 'ha-vy']);
    // Sang chuỗi mới chỉ có Hà Vy và người chơi nói chuyện: Tùng lùi hàng sau.
    rerender(<SanKhauMvp kb={kb} canh="cong-truong" speaker="player" thamGia={['ha-vy', 'player']} />);
    expect(hang(container, 'truoc')).toEqual(['ha-vy', 'player']);
    expect(hang(container, 'sau')).toEqual(['tung']);
  });

  it('[RA x] rời hẳn cả hàng sau; đổi cảnh xóa cả hai hàng', () => {
    const { container, rerender } = noiLanLuot(['tung', 'minh-anh', 'ha-vy', 'quan']);
    expect(hang(container, 'sau')).toEqual(['tung']);
    rerender(<SanKhauMvp kb={kb} canh="cong-truong" speaker="quan" raDan={['tung']} />);
    expect(hang(container, 'sau')).toEqual([]);
    rerender(<SanKhauMvp kb={kb} canh="cong-truong" speaker="duy" />);
    expect(hang(container, 'sau')).toEqual(['minh-anh']);
    rerender(<SanKhauMvp kb={kb} canh="phong-clb" speaker="duy" />);
    expect(hang(container, 'truoc')).toEqual(['duy']);
    expect(hang(container, 'sau')).toEqual([]);
  });

  it('vị trí hàng sau nằm ở khe hoặc hai mép theo số người', () => {
    expect(viTriHangSau(3, 2, 0)).toBeLessThan(0.22);
    expect(viTriHangSau(3, 2, 1)).toBeGreaterThan(0.78);
    expect(viTriHangSau(2, 1, 0)).toBe(0.5);
    expect(viTriHangSau(1, 1, 0)).not.toBe(0.5);
  });

  it('nguoiThamGia: gồm người nói trong chuỗi và trong phản hồi [ĐỐI CHẤT] / [HỎI], cộng vaoDan, trừ raDan', () => {
    const chuoi = kb.chuoi.find((c) => c.nodes.some((n) => n.type === 'doi-chat'));
    expect(chuoi).toBeDefined();
    const ds = nguoiThamGia(kb, chuoi?.id, ['hoai'], ['tung']) ?? [];
    const dc = chuoi?.nodes.find((n) => n.type === 'doi-chat');
    const trongPhanHoi = dc?.type === 'doi-chat' ? dc.bangChung.flatMap((b) => b.feedback.map((l) => l.speaker)) : [];
    expect(trongPhanHoi.length).toBeGreaterThan(0);
    for (const x of trongPhanHoi) if (x !== 'tung') expect(ds).toContain(x);
    expect(ds).toContain('hoai');
    expect(ds).not.toContain('tung');
    expect(nguoiThamGia(kb, 'khong-co-chuoi-nay')).toBeNull();
  });
});

describe('SanKhauMvp — nhãn địa điểm tương tác và bong bóng nhắc việc', () => {
  it('nhãn địa điểm là nút bấm, bấm vào chuyển sang trạng thái mở rộng is-expanded', async () => {
    const user = userEvent.setup();
    render(<SanKhauMvp kb={kb} canh="cong-truong" speaker="tung" />);
    const nut = screen.getByRole('button', { name: /Địa điểm: Cổng trường/ });
    expect(nut).toBeInTheDocument();
    expect(nut).toHaveAttribute('aria-expanded', 'false');
    expect(nut).not.toHaveClass('is-expanded');

    await user.click(nut);
    expect(nut).toHaveAttribute('aria-expanded', 'true');
    expect(nut).toHaveClass('is-expanded');

    await user.click(nut);
    expect(nut).toHaveAttribute('aria-expanded', 'false');
    expect(nut).not.toHaveClass('is-expanded');
  });

  it('bong bóng nhắc việc có thể bấm để mở rộng hoặc thu gọn', async () => {
    const user = userEvent.setup();
    const { container } = render(
      <SanKhauMvp
        kb={kb}
        canh="sanh-chinh"
        speaker="tung"
        nhacViec={{ nhanVat: 'tung', text: 'Thang máy hỏng, sơ đồ không vẽ thang bộ. Trong sảnh này ai là người hỏi được?' }}
      />
    );
    const nhac = container.querySelector('.nhac-viec') as HTMLElement;
    expect(nhac).toBeInTheDocument();
    expect(nhac).not.toHaveClass('is-expanded');

    await user.click(nhac);
    expect(nhac).toHaveClass('is-expanded');

    await user.click(nhac);
    expect(nhac).not.toHaveClass('is-expanded');
  });

  it('sảnh KTX: nền sân khấu luôn hiển thị đạo cụ cố định (thông báo thang máy & bản đồ KTX)', () => {
    const { container } = render(<SanKhauMvp kb={kb} canh="sanh-ktx" speaker="narrator" />);
    const daoCu = container.querySelectorAll<HTMLImageElement>('.mvp-stage__dao-cu');
    expect(daoCu.length).toBe(2);
    const srcList = [...daoCu].map((img) => img.src);
    expect(srcList.some((s) => s.includes('obj-thong-bao-thang-may'))).toBe(true);
    expect(srcList.some((s) => s.includes('obj-so-do-ktx'))).toBe(true);
  });
});


describe('SanKhauMvp — [VÀO] khi cả hai hàng đã kín', () => {
  it('bảy người (bốn người [VÀO] + ba người nói): không vẽ lại mãi, dàn giữ tối đa 3 + 3 người', () => {
    // 08/10/2026: Trung thu có player, Minh Anh, Duy, bé Na [VÀO] rồi Tùng, Hà Vy, chú Cường lần lượt nói → "Too many re-renders".
    const vao = ['player', 'minh-anh', 'duy', 'hoai'];
    const kq = render(<SanKhauMvp kb={kb} canh="cong-truong" speaker="tung" vaoDan={vao} />);
    for (const t of ['ha-vy', 'chu-cuong', 'tung']) kq.rerender(<SanKhauMvp kb={kb} canh="cong-truong" speaker={t} vaoDan={vao} />);
    const truoc = kq.container.querySelectorAll('.cast-member[data-hang="truoc"]');
    const sau = kq.container.querySelectorAll('.cast-member[data-hang="sau"]');
    expect(truoc.length).toBe(3);
    expect(sau.length).toBeLessThanOrEqual(3);
    expect(kq.container.querySelector('.cast-member[data-nhan-vat="tung"][data-hang="truoc"]')).not.toBeNull();
  });
});
