/**
 * Màn đối chất (03/10/2026): khay chỉ có thẻ đang trên bảng (không giấy tờ nền) và thẻ cũ chính màn này khai; giả thuyết
 * tô nổi chỗ cần bác; câu hỏi cụ thể hiện dưới giả thuyết. Trạng thái dựng bằng máy tự chơi tới đúng màn đối chất.
 */
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import type { NutMvp } from '../../content/mvp/types';
import { khungNhin, taoTrangThai, TEN_MAC_DINH } from '../engine/may';
import { choiTuDong, RE_NHANH_KET_THAT, reNhanhTheo } from '../engine/tu-choi';
import { KICH_BAN as kb } from '../store/kho-mvp';
import { DoiChatMvp } from './DoiChatMvp';

function veToi(id: string) {
  const s = choiTuDong(kb, taoTrangThai(kb, 0), { reNhanh: reNhanhTheo(RE_NHANH_KET_THAT), ten: TEN_MAC_DINH, sangVuSau: true, lamPhu: true }, (_s, kn) => kn.kind === 'doi-chat' && kn.nut.id === id);
  const kn = khungNhin(kb, s);
  if (kn.kind !== 'doi-chat') throw new Error('không tới được màn đối chất');
  const nut: Extract<NutMvp, { type: 'doi-chat' }> = kn.nut;
  render(<DoiChatMvp kb={kb} s={s} nut={nut} daTrinh={[]} muc="khong" dienTen={(t) => t} tenNguoiNoi={(m) => m} onTrinh={() => {}} onChuaDu={() => {}} />);
  return { nut, ids: screen.getAllByRole('option').map((o) => o.getAttribute('data-the')) };
}

describe('màn đối chất', () => {
  it('Vụ 3 (dc-nam): không độn thẻ vụ khác; thẻ cũ chỉ là thẻ màn này khai; chỗ cần bác tô nổi; có câu hỏi cụ thể', () => {
    const { nut, ids } = veToi('dc-nam');
    expect(ids).toContain('ev-toi-07');
    expect(ids).toContain('ev-tin-goc');
    for (const khac of ['ev-hai-ma', 'ev-nhat-ky-in', 'ev-hai-dong-sua', 'clue-hoai-nguoi-nop', 'clue-loi-chu-cuong']) expect(ids).not.toContain(khac);
    expect(ids.length).toBeLessThanOrEqual(12);
    expect(document.querySelector('.doi-chat__diem')).toHaveTextContent('không ai làm chứng');
    expect(screen.getByText(nut.cauHoi)).toBeInTheDocument();
    expect(document.querySelector('.doi-chat__gt')?.textContent).not.toContain('**');
  });

  it('Vụ 1 (dc-ai-viet): giấy tờ nền không lên khay', () => {
    const { ids } = veToi('dc-ai-viet');
    expect(ids.some((id) => id?.startsWith('doc-'))).toBe(false);
    expect(ids).toContain('ev-nhat-ky-in');
  });
});
