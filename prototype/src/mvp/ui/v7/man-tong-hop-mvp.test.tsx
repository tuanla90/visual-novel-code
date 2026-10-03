import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import type { TheThuThachMvp } from '../../../content/mvp/types';
import { KICH_BAN as kb } from '../../store/kho-mvp';
import { ManTongHopMvp } from './ManTongHopMvp';

const theGia: TheThuThachMvp = {
  id: 'c-test-tong-hop',
  tieuDe: 'Thử nghiệm tổng hợp',
  deBai: 'Lấy phiếu làm nguồn. Gom theo họ tên: đếm dòng.',
  sqlChuan: 'SELECT ho_ten, COUNT(*) FROM @ev-nguon GROUP BY ho_ten',
  phanHoi: {
    khiDung: 'Đúng rồi!',
  },
};

const nguonGia = [
  {
    id: 'ev-nguon',
    sql: 'SELECT ho_ten, lop FROM sinh_vien',
    cot: [
      { ten: 'ho_ten', kieu: 'TEXT' as const },
      { ten: 'lop', kieu: 'TEXT' as const },
    ],
  },
];

describe('ManTongHopMvp - Bố cục 3 cột & nút xóa lọc', () => {
  it('hiển thị bố cục 3 cột: NGUỒN PHIẾU, LỌC & GOM NHÓM & TÍNH, LỌC THEO NHÓM', () => {
    const { container } = render(
      <ManTongHopMvp
        kb={kb}
        duLieu={kb.duLieu!}
        the={theGia}
        canh="phong-clb"
        nguon={nguonGia}
        giayNho={[]}
        dienTen={(t) => t}
        onXong={vi.fn()}
      />,
    );

    expect(container.querySelector('.v7-cau--3cot')).not.toBeNull();
    expect(screen.getByText('1. NGUỒN PHIẾU')).toBeInTheDocument();
    expect(screen.getByText('2. LỌC, GOM NHÓM & TÍNH')).toBeInTheDocument();
    expect(screen.getByText('3. LỌC THEO NHÓM')).toBeInTheDocument();
  });

  it('khi chọn cột lọc, xuất hiện nút × để bỏ lọc và bấm × sẽ reset về không lọc', async () => {
    const u = userEvent.setup();
    render(
      <ManTongHopMvp
        kb={kb}
        duLieu={kb.duLieu!}
        the={theGia}
        canh="phong-clb"
        nguon={nguonGia}
        giayNho={[]}
        dienTen={(t) => t}
        onXong={vi.fn()}
      />,
    );

    // Ban đầu cột lọc là "không lọc", chưa có nút bỏ lọc
    const nutCotLoc = screen.getByRole('button', { name: /^Cột lọc: không lọc/ });
    expect(screen.queryByRole('button', { name: 'Bỏ lọc' })).toBeNull();

    // Bấm chọn cột lọc -> chuyển sang cột đầu tiên (ho_ten)
    await u.click(nutCotLoc);
    expect(screen.getByRole('button', { name: /^Cột lọc: ho_ten/ })).toBeInTheDocument();

    // Bây giờ có nút × Bỏ lọc
    const nutBoLoc = screen.getByRole('button', { name: 'Bỏ lọc' });
    expect(nutBoLoc).toBeInTheDocument();

    // Bấm nút × -> trở về không lọc
    await u.click(nutBoLoc);
    expect(screen.getByRole('button', { name: /^Cột lọc: không lọc/ })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Bỏ lọc' })).toBeNull();
  });
});
